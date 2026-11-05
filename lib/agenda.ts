import { addDays, format, parseISO } from "date-fns";
import { CASES } from "@/lib/cases";
import { patientLabel } from "@/lib/cases/engine";
import type { DB } from "@/lib/data/types";
import { daysUntilExam } from "@/lib/dates";
import { selectActivePlan } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { getEje } from "@/lib/programa/ejes";
import { casesForEje, ejesForText } from "@/lib/programa/match";
import { getMateria } from "@/lib/programa/materias";
import { routePosition, RUTA, sessionKey, sessionsFor } from "@/lib/programa/ruta";
import type { Eje } from "@/lib/programa/types";

/*
 * "Tu día", pensado para un examen oral integrador ante tribunal.
 *
 * Un solo eje por día (el del tema de tu cronograma; si no hay, el de la ruta integrada), y dos bloques:
 * - Mañana · comprender: recuperar lo de ayer sin apuntes y estudiar el tema.
 * - Noche · recuperar y aplicar: conectar con otra materia, resolver un caso, decirlo en voz alta como en el
 *   tribunal y anotar en Errores lo que no salió.
 * Más lo espaciado (tarjetas, un error para repasar) y tus tareas del Tablero.
 * Sábado: repaso de errores y caso acumulativo. Domingo: descanso. A 3 semanas del examen, la noche es simulacro.
 * Cada fuente es opcional: con cronograma, con ruta, con las dos o sin ninguna el día se arma igual.
 */

export type AgendaSlot = "manana" | "noche" | "dia";
export type AgendaSource = "cronograma" | "ruta" | "recuperar" | "conectar" | "caso" | "oral" | "errores" | "tarjetas" | "tablero" | "descanso";

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

  // 1. Tema del día: cronograma primero; si no hay día del cronograma, la ruta integrada.
  const view = selectActivePlan(db);
  const allDays = view ? view.weeks.flatMap((w) => view.daysByWeek.get(w.id) ?? []) : [];
  const planDay = allDays.find((d) => d.date === today) ?? null;
  const planWeek = planDay && view ? view.weeks.find((w) => w.id === planDay.week_id) : undefined;
  const prevPlanDay = allDays.filter((d) => d.date < today).sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;

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
    ? (ejesForText(`${planDay.content} ${planWeek?.title ?? ""}`, 1)[0] ?? ejesForText(planWeek?.title ?? "", 1)[0] ?? null)
    : routeSession
      ? routeEje
      : null;

  const played = new Set(db.case_attempts.map((a) => a.case_id));
  const playedToday = new Set(db.case_attempts.filter((a) => toISODate(new Date(a.created_at)) === today).map((a) => a.case_id));

  if (kind === "domingo") {
    items.push({ key: "descanso", slot: "manana", source: "descanso", label: "Domingo", text: "Descanso o recuperación liviana. Sin obligación de estudio.", done: false, action: { type: "link", href: "/hoy" } });
  } else if (kind === "sabado") {
    // Sábado: errores de la semana a la mañana, caso acumulativo a la noche.
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
    pushOral();
  } else {
    // Día hábil. Mañana: recuperar lo de ayer y estudiar el tema.
    const prevText = prevPlanDay && prevPlanDay.date >= format(addDays(parseISO(today), -4), "yyyy-MM-dd") ? prevPlanDay.content : null;
    const prevRoute =
      !prevText && routeSession && routeSession.day > 0 ? sessionsFor(RUTA[routeSession.week - 1])[routeSession.day - 1].morning : null;
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

    // Noche: conectar, caso, oral, errores.
    if (eje) {
      if (focus === "ruta" && routeSession) {
        const key = sessionKey(routeSession.week, routeSession.day, "n");
        items.push({ key: `ruta-${key}`, slot: "noche", source: "ruta", label: `Ruta · semana ${routeSession.week}`, text: routeSession.n, done: (db.route?.done ?? []).includes(key), action: { type: "route", key } });
      } else {
        const filas = eje.filas.filter((f) => f.peso === "central");
        const fila = filas[n % filas.length];
        const materia = getMateria(fila.materia)!;
        items.push({
          key: "conectar",
          slot: "noche",
          source: "conectar",
          label: `20 min · conectá con ${materia.name}`,
          text: fila.text,
          done: checked("conectar"),
          action: check("conectar"),
          href: `/programa/eje/${eje.id}`,
        });
      }
      if (examClose) {
        items.push({ key: "simulacro", slot: "noche", source: "oral", label: "Falta poco para el examen", text: "Simulacro en modo tribunal: preguntas encadenadas, en voz alta.", done: db.simulations.some((s) => toISODate(new Date(s.created_at)) === today && s.mode === "tribunal"), action: { type: "link", href: "/simulacro?modo=tribunal" } });
      } else if (!(focus === "ruta" && routeSession && /caso/i.test(routeSession.n))) {
        const cases = casesForEje(eje);
        const pending = cases.filter((c) => !played.has(c.id));
        const pick = (pending.length ? pending : cases)[n % Math.max(1, (pending.length ? pending : cases).length)];
        if (pick) {
          items.push({
            key: "caso",
            slot: "noche",
            source: "caso",
            label: "25 min · caso del día",
            text: `${patientLabel(pick.patient)} (${eje.title.split(",")[0].toLowerCase()})`,
            done: cases.some((c) => playedToday.has(c.id)),
            action: { type: "link", href: `/casos/${pick.id}` },
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
        text: "Anotá en Errores lo que no pudiste explicar.",
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
  return { items, route, eje, focus, kind, examClose, done: markable.filter((i) => i.done).length, total: markable.length };

  function pushPlanDay() {
    items.push({
      key: `plan-${planDay!.id}`,
      slot: "manana",
      source: "cronograma",
      label: `35 min · cronograma${planWeek ? `, semana ${planWeek.num}` : ""}`,
      text: `${planDay!.content}. Cerrá con un esquema de memoria.`,
      done: Boolean(planDay!.done_at),
      action: { type: "plan-day", dayId: planDay!.id },
    });
  }

  function pushOral() {
    // Una pregunta de tu banco del eje del día (las más tomadas primero); si no hay, la conexión del eje.
    const qs = db.exam_questions
      .filter((q) => !eje || ejesForText(q.text, 3).some((e) => e.id === eje.id))
      .sort((a, b) => a.priority - b.priority || b.times_asked - a.times_asked);
    const top = qs.slice(0, 5);
    const q = top.length ? top[n % top.length] : null;
    const doneOral = db.simulations.some((s) => toISODate(new Date(s.created_at)) === today);
    if (q) {
      items.push({ key: "oral", slot: "noche", source: "oral", label: "En voz alta, como en el tribunal", text: q.text, done: doneOral, action: { type: "link", href: `/simulacro?pregunta=${q.id}` } });
    } else if (eje) {
      items.push({ key: "oral", slot: "noche", source: "oral", label: "En voz alta, como en el tribunal", text: `Explicá sin mirar, en 3 minutos, la conexión de ${eje.title.toLowerCase()}.`, done: doneOral || checked("oral"), action: check("oral"), href: `/programa/eje/${eje.id}` });
    }
  }
}
