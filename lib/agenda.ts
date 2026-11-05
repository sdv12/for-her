import { addDays, format, parseISO } from "date-fns";
import { CASES } from "@/lib/cases";
import { patientLabel } from "@/lib/cases/engine";
import type { DB, ExamQuestion } from "@/lib/data/types";
import { daysUntilExam } from "@/lib/dates";
import { integratePlan, type WeekInfo } from "@/lib/integracion";
import { selectActivePlan } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { getEje } from "@/lib/programa/ejes";
import { casesForEje, ejesForText } from "@/lib/programa/match";
import { routePosition, RUTA, sessionKey, sessionsFor } from "@/lib/programa/ruta";
import type { Eje } from "@/lib/programa/types";

/*
 * "Tu día", pensado para un examen oral integrador ante tribunal.
 *
 * Integra tu cronograma, tus preguntas de examen y el plan integrado (lib/integracion.ts):
 * un solo eje por día (el de la semana de tu cronograma; si no hay, el de la ruta integrada) y dos bloques.
 * - Mañana · comprender: recuperar lo de ayer sin apuntes y el tema del cronograma (respetando su modo).
 * - Noche · recuperar y aplicar, como en el plan maestro: lunes patología del eje, martes diagnóstico
 *   diferencial, miércoles tratamiento y efectos adversos, jueves caso clínico integrador, viernes criterio
 *   para avanzar; todas las noches una pregunta de la semana en voz alta y anotar errores.
 * Sábado: errores, repaso espaciado (preguntas de alta prioridad de hace 1 y 3 semanas) y caso acumulativo.
 * Domingo: descanso. A 3 semanas del examen, la noche pasa a ser simulacro en modo tribunal.
 * Cada fuente es opcional: con cronograma, con ruta, con las dos o sin ninguna el día se arma igual.
 */

export type AgendaSlot = "manana" | "noche" | "dia";
export type AgendaSource =
  | "cronograma"
  | "ruta"
  | "recuperar"
  | "conectar"
  | "puente"
  | "transversal"
  | "caso"
  | "oral"
  | "espaciado"
  | "errores"
  | "tarjetas"
  | "tablero"
  | "descanso";

export type AgendaAction =
  | { type: "plan-day"; dayId: string }
  | { type: "route"; key: string }
  /** Tilde propio del día (se guarda en db.day_checks). */
  | { type: "check"; key: string }
  | { type: "link"; href: string };

export type AgendaItem = {
  key: string;
  slot: AgendaSlot;
  source: AgendaSource;
  label: string;
  text: string;
  done: boolean;
  action: AgendaAction;
  /** Enlace extra para hacerlo (el caso, la pregunta, el eje). */
  href?: string;
};

export type RouteToday = { week: number; day: number; title: string; ejeId: string; ejeTitle: string; status: "antes" | "en-curso" };

export type Agenda = {
  items: AgendaItem[];
  route: RouteToday | null;
  /** Eje del día, del que salen la conexión, el caso y la pregunta oral. */
  eje: Eje | null;
  /** De dónde sale el tema del día. */
  focus: "cronograma" | "ruta" | null;
  /** La semana de tu cronograma con su capa integrada (si hay cronograma). */
  week: WeekInfo | null;
  kind: "habil" | "sabado" | "domingo";
  examClose: boolean;
  done: number;
  total: number;
};

export const SLOT_LABEL: Record<AgendaSlot, string> = { manana: "Mañana · comprender", noche: "Noche · recuperar y aplicar", dia: "En cualquier momento" };

const dayKey = (date: string, id: string) => `${date}|${id}`;

/** Índice estable por fecha, para rotar materias, casos y preguntas sin que cambien en el mismo día. */
function seed(date: string): number {
  return Math.floor(parseISO(date).getTime() / 86_400_000);
}

const short = (s: string, max = 70) => (s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s);

export function selectAgenda(db: DB, now: Date = new Date()): Agenda {
  const today = toISODate(now);
  const yesterday = format(addDays(parseISO(today), -1), "yyyy-MM-dd");
  const jsDay = now.getDay();
  const kind: Agenda["kind"] = jsDay === 6 ? "sabado" : jsDay === 0 ? "domingo" : "habil";
  const checks = new Set(db.day_checks ?? []);
  const examDays = daysUntilExam(db.profile.exam_date, now);
  const examClose = examDays !== null && examDays >= 0 && examDays <= 21;
  const n = seed(today);
  const items: AgendaItem[] = [];
  const check = (id: string): AgendaAction => ({ type: "check", key: dayKey(today, id) });
  const checked = (id: string) => checks.has(dayKey(today, id));
  const practiced = new Set(db.simulations.map((s) => s.question_id).filter(Boolean));
  const oralToday = db.simulations.some((s) => toISODate(new Date(s.created_at)) === today);

  // 1. Tu cronograma y su capa integrada.
  const view = selectActivePlan(db);
  const allDays = view ? view.weeks.flatMap((w) => view.daysByWeek.get(w.id) ?? []) : [];
  const planDay = allDays.find((d) => d.date === today) ?? null;
  const prevPlanDay = allDays.filter((d) => d.date < today).sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;
  const currentWeek = view ? (planDay ? view.weeks.find((w) => w.id === planDay.week_id) : view.weeks.find((w) => w.start_date <= today && today <= w.end_date)) : undefined;
  const week: WeekInfo | null = view && currentWeek ? (integratePlan(db, view).get(currentWeek.id) ?? null) : null;

  // 2. Ruta integrada (manda solo los días sin cronograma).
  let route: RouteToday | null = null;
  let routeSession: { m: string; n: string; week: number; day: number } | null = null;
  let routeEje: Eje | null = null;
  if (db.route?.start) {
    const pos = routePosition(db.route.start, today);
    if (pos.status !== "terminada") {
      const w = RUTA[pos.week - 1];
      routeEje = getEje(w.ejes[0])!;
      route = { week: w.num, day: pos.day, title: w.title, ejeId: routeEje.id, ejeTitle: routeEje.title, status: pos.status };
      if (pos.status === "en-curso" && pos.day < 6) {
        const s = sessionsFor(w)[pos.day];
        routeSession = { m: s.morning, n: s.night, week: w.num, day: pos.day };
      }
    }
  }

  const focus: Agenda["focus"] = planDay ? "cronograma" : routeSession ? "ruta" : null;
  const eje: Eje | null = planDay
    ? (week?.eje ?? ejesForText(`${planDay.content} ${currentWeek?.title ?? ""}`, 1)[0] ?? null)
    : routeSession
      ? routeEje
      : null;

  // Si el cronograma ya pone una simulación oral, la noche no suma otra pregunta en voz alta.
  const isSimulation = !!planDay && /simulaci/i.test(planDay.mode);
  const played = new Set(db.case_attempts.map((a) => a.case_id));
  const playedToday = new Set(db.case_attempts.filter((a) => toISODate(new Date(a.created_at)) === today).map((a) => a.case_id));

  if (kind === "domingo") {
    items.push({ key: "descanso", slot: "manana", source: "descanso", label: "Domingo", text: "Descanso o recuperación liviana. Sin obligación de estudio.", done: false, action: { type: "link", href: "/hoy" } });
  } else if (kind === "sabado") {
    const openMistakes = db.mistakes.filter((m) => !m.resolved_at).length;
    items.push({
      key: "errores-semana",
      slot: "manana",
      source: "errores",
      label: "Repaso de la semana",
      text: openMistakes ? `Repasá los ${openMistakes} errores abiertos: leelos y corregilos en voz alta.` : "Repasá lo de la semana sin apuntes: ¿qué no podrías explicar?",
      done: checked("errores-semana"),
      action: check("errores-semana"),
      href: "/errores",
    });
    if (planDay) pushPlanDay();
    if (week?.spaced.length) {
      const weeksLabel = [...new Set(week.spaced.map((q) => q.source?.match(/semana (\d+)/i)?.[1]).filter(Boolean))].join(" y ");
      const first = week.spaced.find((q) => !practiced.has(q.id)) ?? week.spaced[0];
      items.push({
        key: "espaciado",
        slot: "manana",
        source: "espaciado",
        label: `Repaso espaciado${weeksLabel ? ` · semanas ${weeksLabel}` : ""}`,
        text: `${week.spaced.length} preguntas de prioridad alta, en voz alta. Empezá por: «${short(first.text)}»`,
        done: checked("espaciado"),
        action: check("espaciado"),
        href: `/simulacro?pregunta=${first.id}`,
      });
    }
    const pool = CASES.filter((c) => played.has(c.id));
    const acumulativo = pool.length ? pool[n % pool.length] : CASES[n % CASES.length];
    items.push({
      key: "caso-acumulativo",
      slot: "noche",
      source: "caso",
      label: "Caso acumulativo",
      text: `${patientLabel(acumulativo.patient)}: resolvelo sin saber el eje.`,
      done: playedToday.size > 0,
      action: { type: "link", href: `/casos/${acumulativo.id}` },
    });
    if (!week?.spaced.length) pushOral();
  } else {
    // Día hábil. Mañana: recuperar lo de ayer y estudiar el tema.
    const prevText = prevPlanDay && prevPlanDay.date >= format(addDays(parseISO(today), -4), "yyyy-MM-dd") ? prevPlanDay.content : null;
    const prevRoute = !prevText && routeSession && routeSession.day > 0 ? sessionsFor(RUTA[routeSession.week - 1])[routeSession.day - 1].morning : null;
    const recall = prevText ?? prevRoute;
    if (recall) {
      items.push({
        key: "recuperar",
        slot: "manana",
        source: "recuperar",
        label: "10 min · sin apuntes",
        text: `Recuperá lo de ${prevPlanDay?.date === yesterday || prevRoute ? "ayer" : "la última sesión"}: ${recall}`,
        done: checked("recuperar"),
        action: check("recuperar"),
      });
    }
    if (planDay) pushPlanDay();
    else if (routeSession) {
      const key = sessionKey(routeSession.week, routeSession.day, "m");
      items.push({ key: `ruta-${key}`, slot: "manana", source: "ruta", label: `Ruta · semana ${routeSession.week}`, text: routeSession.m, done: (db.route?.done ?? []).includes(key), action: { type: "route", key } });
    }

    // Noche: una integración según el día, la pregunta oral y el cierre.
    if (eje) {
      if (focus === "ruta" && routeSession) {
        const key = sessionKey(routeSession.week, routeSession.day, "n");
        items.push({ key: `ruta-${key}`, slot: "noche", source: "ruta", label: `Ruta · semana ${routeSession.week}`, text: routeSession.n, done: (db.route?.done ?? []).includes(key), action: { type: "route", key } });
        if (!/caso/i.test(routeSession.n)) pushCaso();
      } else if (examClose) {
        pushCaso();
      } else {
        // Noche según el plan maestro: lunes patología, martes diferencial, miércoles tratamiento,
        // jueves caso integrador, viernes preguntas sin apuntes y criterio para avanzar.
        const fila = (materia: string) => eje.filas.find((f) => f.materia === materia)?.text;
        if (jsDay === 1) {
          items.push({ key: "patologia", slot: "noche", source: "conectar", label: "20 min · patología del eje", text: fila("patologia") ?? eje.conexion, done: checked("patologia"), action: check("patologia"), href: `/programa/eje/${eje.id}` });
        } else if (jsDay === 2) {
          items.push({ key: "diferencial", slot: "noche", source: "conectar", label: "20 min · diagnóstico diferencial", text: `Armá 3 hipótesis para el tema de hoy y cómo descartarías cada una. Para orientarte: ${eje.diferenciales}`, done: checked("diferencial"), action: check("diferencial"), href: `/programa/eje/${eje.id}` });
        } else if (jsDay === 3) {
          items.push({ key: "tratamiento", slot: "noche", source: "conectar", label: "20 min · tratamiento y efectos adversos", text: `${eje.tratamiento} ¿Por qué ese tratamiento y no otro?`, done: checked("tratamiento"), action: check("tratamiento"), href: `/programa/eje/${eje.id}` });
        } else if (jsDay === 4) {
          pushCaso();
        } else {
          items.push({
            key: "criterio",
            slot: "noche",
            source: "conectar",
            label: "Criterio para avanzar",
            text: "¿Explicás la fisiopatología sin apuntes, armás 3 diferenciales, justificás el tratamiento, conectás 3 materias y respondés las preguntas de prioridad alta?",
            done: checked("criterio"),
            action: check("criterio"),
            href: `/programa/eje/${eje.id}`,
          });
        }
      }
      pushOral();
    }
    if (planDay || routeSession) {
      items.push({
        key: "anotar",
        slot: "noche",
        source: "errores",
        label: "15 min · cierre",
        text: isSimulation ? "Corregí la simulación: anotá en Errores lo que no pudiste explicar." : "Anotá en Errores lo que no pudiste explicar.",
        done: db.mistakes.some((m) => toISODate(new Date(m.created_at)) === today) || checked("anotar"),
        action: check("anotar"),
        href: "/errores?nuevo=1",
      });
    }
  }

  // Espaciado: tarjetas y un error para repasar (no el sábado, que ya repasa todos).
  const due = db.cards.filter((c) => new Date(c.due_at) <= now).length;
  const reviewedToday = db.card_reviews.some((r) => toISODate(new Date(r.reviewed_at)) === today);
  if (due > 0 || reviewedToday) {
    items.push({ key: "tarjetas", slot: "dia", source: "tarjetas", label: "Repaso espaciado", text: due > 0 ? `Repasar ${due} ${due === 1 ? "tarjeta" : "tarjetas"}` : "Tarjetas al día", done: due === 0, action: { type: "link", href: "/tarjetas/repasar" } });
  }
  if (kind === "habil") {
    const open = db.mistakes.filter((m) => !m.resolved_at).sort((a, b) => b.times - a.times || a.updated_at.localeCompare(b.updated_at));
    if (open.length) {
      const m = open[n % open.length];
      items.push({ key: `error-${m.id}`, slot: "dia", source: "errores", label: "Para no repetir", text: m.text, done: checked(`error-${m.id}`), action: check(`error-${m.id}`), href: "/errores" });
    }
  }
  for (const t of db.tasks) {
    if (t.origin !== "mia" || t.due_date !== today) continue;
    items.push({ key: `tarea-${t.id}`, slot: "dia", source: "tablero", label: "Tablero", text: t.title, done: t.status === "dominado", action: { type: "link", href: "/tablero" } });
  }

  const order: AgendaSlot[] = ["manana", "noche", "dia"];
  items.sort((a, b) => order.indexOf(a.slot) - order.indexOf(b.slot));
  const markable = items.filter((i) => i.source !== "descanso" && i.source !== "tablero");
  return { items, route, eje, focus, week, kind, examClose, done: markable.filter((i) => i.done).length, total: markable.length };

  function pushPlanDay() {
    // Respeta el modo del día del cronograma: estudio, repaso activo o simulación oral.
    const mode = planDay!.mode.toLowerCase();
    const sem = currentWeek ? `, semana ${currentWeek.num}` : "";
    const [label, text, href] = isSimulation
      ? [`Simulación oral${sem}`, `${planDay!.content}. En voz alta y sin apuntes.`, "/simulacro?modo=tribunal"]
      : /recall puro|repaso/.test(mode)
        ? [`Repaso activo${sem}`, `${planDay!.content}. Sin apuntes, en voz alta.`, undefined]
        : [`35 min · cronograma${sem}`, `${planDay!.content}. Recorrelo con DFDCT: definición, fisiopatología, diagnóstico, clínica y tratamiento.`, undefined];
    items.push({ key: `plan-${planDay!.id}`, slot: "manana", source: "cronograma", label, text, done: Boolean(planDay!.done_at), action: { type: "plan-day", dayId: planDay!.id }, href });
  }

  function pushCaso() {
    if (examClose) {
      items.push({ key: "simulacro", slot: "noche", source: "oral", label: "Falta poco para el examen", text: "Simulacro en modo tribunal: preguntas encadenadas, en voz alta.", done: db.simulations.some((s) => toISODate(new Date(s.created_at)) === today && s.mode === "tribunal"), action: { type: "link", href: "/simulacro?modo=tribunal" } });
      return;
    }
    if (!eje) return;
    const cases = casesForEje(eje);
    const pending = cases.filter((c) => !played.has(c.id));
    const list = pending.length ? pending : cases;
    const pick = list[n % Math.max(1, list.length)];
    if (!pick) return;
    items.push({
      key: "caso",
      slot: "noche",
      source: "caso",
      label: "25 min · caso clínico integrador",
      text: `${patientLabel(pick.patient)} (${eje.title.split(",")[0].toLowerCase()})`,
      done: cases.some((c) => playedToday.has(c.id)),
      action: { type: "link", href: `/casos/${pick.id}` },
    });
  }

  function pushOral() {
    if (isSimulation) return;
    // Primero las preguntas de ESTA semana de tu cronograma (sin practicar, alta prioridad primero);
    // si no hay, las de tu banco que tratan el eje; si tampoco, explicar la conexión del eje.
    let q: ExamQuestion | null = null;
    if (week?.questions.length) {
      const pending = week.questions.filter((x) => !practiced.has(x.id));
      const list = (pending.length ? pending : week.questions).slice(0, 6);
      q = list[n % list.length];
    } else {
      const top = db.exam_questions
        .filter((x) => !eje || ejesForText(x.text, 3).some((e) => e.id === eje.id))
        .sort((a, b) => a.priority - b.priority || b.times_asked - a.times_asked)
        .slice(0, 5);
      q = top.length ? top[n % top.length] : null;
    }
    if (q) {
      items.push({ key: "oral", slot: "noche", source: "oral", label: "En voz alta, como en el tribunal", text: q.text, done: oralToday, action: { type: "link", href: `/simulacro?pregunta=${q.id}` } });
    } else if (eje) {
      items.push({ key: "oral", slot: "noche", source: "oral", label: "En voz alta, como en el tribunal", text: `Explicá sin mirar, en 3 minutos, la conexión de ${eje.title.toLowerCase()}.`, done: oralToday || checked("oral"), action: check("oral"), href: `/programa/eje/${eje.id}` });
    }
  }
}
