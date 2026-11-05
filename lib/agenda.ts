import type { DB } from "@/lib/data/types";
import { selectActivePlan } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { getEje } from "@/lib/programa/ejes";
import { routePosition, RUTA, sessionKey, sessionsFor } from "@/lib/programa/ruta";

/*
 * "Tu día": junta en una sola lista lo que toca hoy, venga de donde venga.
 * Cada fuente es opcional (cronograma importado, ruta integrada, tarjetas, Tablero): con cualquiera de ellas
 * el día se arma igual, así sirve para quien tenga solo una o todas.
 */

export type AgendaSlot = "manana" | "noche" | "dia";
export type AgendaSource = "cronograma" | "ruta" | "tarjetas" | "tablero";

export type AgendaItem = {
  key: string;
  slot: AgendaSlot;
  source: AgendaSource;
  /** Etiqueta corta de la fuente ("Cronograma", "Ruta · eje"). */
  label: string;
  text: string;
  done: boolean;
  /** Cómo se marca: el día del plan, una sesión de la ruta, o solo un enlace. */
  action: { type: "plan-day"; dayId: string } | { type: "route"; key: string } | { type: "link"; href: string };
};

export type RouteToday = {
  week: number;
  day: number;
  title: string;
  ejeId: string;
  ejeTitle: string;
  status: "antes" | "en-curso";
};

export type Agenda = { items: AgendaItem[]; route: RouteToday | null; done: number; total: number };

export const SLOT_LABEL: Record<AgendaSlot, string> = { manana: "Mañana", noche: "Noche", dia: "En cualquier momento" };

export function selectAgenda(db: DB, now: Date = new Date()): Agenda {
  const today = toISODate(now);
  const items: AgendaItem[] = [];

  // Cronograma importado: el día de hoy va a la mañana (es el tema que hay que comprender).
  const view = selectActivePlan(db);
  if (view) {
    const day = view.weeks.flatMap((w) => view.daysByWeek.get(w.id) ?? []).find((d) => d.date === today);
    if (day) {
      const week = view.weeks.find((w) => w.id === day.week_id);
      items.push({
        key: `plan-${day.id}`,
        slot: "manana",
        source: "cronograma",
        label: week ? `Cronograma · semana ${week.num}` : "Cronograma",
        text: day.content,
        done: Boolean(day.done_at),
        action: { type: "plan-day", dayId: day.id },
      });
    }
  }

  // Ruta integrada: sesión de mañana y de noche (el domingo es de descanso y no se marca).
  let route: RouteToday | null = null;
  const start = db.route?.start;
  if (start) {
    const pos = routePosition(start, today);
    if (pos.status !== "terminada") {
      const w = RUTA[pos.week - 1];
      const eje = getEje(w.ejes[0])!;
      route = { week: w.num, day: pos.day, title: w.title, ejeId: eje.id, ejeTitle: eje.title, status: pos.status };
      if (pos.status === "en-curso" && pos.day < 6) {
        const s = sessionsFor(w)[pos.day];
        const done = new Set(db.route?.done ?? []);
        for (const [part, slot, text] of [
          ["m", "manana", s.morning],
          ["n", "noche", s.night],
        ] as const) {
          const key = sessionKey(w.num, pos.day, part);
          items.push({ key: `ruta-${key}`, slot, source: "ruta", label: `Ruta · semana ${w.num}`, text, done: done.has(key), action: { type: "route", key } });
        }
      }
    }
  }

  // Tarjetas: si hay vencidas, repasarlas; si ya las repasaste hoy, queda hecho.
  const due = db.cards.filter((c) => new Date(c.due_at) <= now).length;
  const reviewedToday = db.card_reviews.some((r) => toISODate(new Date(r.reviewed_at)) === today);
  if (due > 0 || reviewedToday) {
    items.push({
      key: "tarjetas",
      slot: "dia",
      source: "tarjetas",
      label: "Tarjetas",
      text: due > 0 ? `Repasar ${due} ${due === 1 ? "tarjeta" : "tarjetas"}` : "Tarjetas al día",
      done: due === 0,
      action: { type: "link", href: "/tarjetas/repasar" },
    });
  }

  // Tablero: tus tareas propias que vencen hoy (las del plan ya están arriba).
  for (const t of db.tasks) {
    if (t.origin !== "mia" || t.due_date !== today) continue;
    items.push({
      key: `tarea-${t.id}`,
      slot: "dia",
      source: "tablero",
      label: "Tablero",
      text: t.title,
      done: t.status === "dominado",
      action: { type: "link", href: "/tablero" },
    });
  }

  const order: AgendaSlot[] = ["manana", "noche", "dia"];
  items.sort((a, b) => order.indexOf(a.slot) - order.indexOf(b.slot));
  const markable = items.filter((i) => i.action.type !== "link");
  return { items, route, done: markable.filter((i) => i.done).length, total: markable.length };
}
