import { format, isSameMonth, isSameYear, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { DB, ISODate, Plan, PlanDay, PlanPhase, PlanWeek, TaskKind } from "@/lib/data/types";

export type PlanView = {
  plan: Plan;
  phases: PlanPhase[];
  weeks: PlanWeek[];
  daysByWeek: Map<string, PlanDay[]>;
};

/** Plan activo con sus fases, semanas (ordenadas) y días (por fecha). */
export function selectActivePlan(db: DB): PlanView | null {
  const plan = db.plans.find((p) => p.is_active);
  if (!plan) return null;
  const phases = db.plan_phases.filter((p) => p.plan_id === plan.id).sort((a, b) => a.num - b.num);
  const weeks = db.plan_weeks.filter((w) => w.plan_id === plan.id).sort((a, b) => a.num - b.num);
  const weekIds = new Set(weeks.map((w) => w.id));
  const daysByWeek = new Map<string, PlanDay[]>(weeks.map((w) => [w.id, []]));
  for (const d of db.plan_days) {
    if (weekIds.has(d.week_id)) daysByWeek.get(d.week_id)!.push(d);
  }
  for (const days of daysByWeek.values()) days.sort((a, b) => a.date.localeCompare(b.date) || a.sort - b.sort);
  return { plan, phases, weeks, daysByWeek };
}

/**
 * Semana que contiene `today`. Si cae en un hueco entre semanas (o el plan no empezó), la próxima;
 * si el plan ya terminó, la última.
 */
export function currentWeek(weeks: PlanWeek[], today: ISODate): PlanWeek | null {
  if (weeks.length === 0) return null;
  const inside = weeks.find((w) => w.start_date <= today && today <= w.end_date);
  if (inside) return inside;
  const sorted = [...weeks].sort((a, b) => a.start_date.localeCompare(b.start_date));
  return sorted.find((w) => w.start_date > today) ?? sorted[sorted.length - 1];
}

export function isWeekCurrent(week: PlanWeek, today: ISODate) {
  return week.start_date <= today && today <= week.end_date;
}

/** "1–7 oct", "26 nov – 2 dic", y con año si cruza de año. */
export function formatRange(start: ISODate, end: ISODate): string {
  const a = parseISO(start);
  const b = parseISO(end);
  if (!isSameYear(a, b)) return `${format(a, "d MMM yyyy", { locale: es })} – ${format(b, "d MMM yyyy", { locale: es })}`;
  if (isSameMonth(a, b)) return `${format(a, "d", { locale: es })}–${format(b, "d MMM", { locale: es })}`;
  return `${format(a, "d MMM", { locale: es })} – ${format(b, "d MMM", { locale: es })}`;
}

export function formatShortDate(date: ISODate): string {
  return format(parseISO(date), "d MMM", { locale: es });
}

/** Tipo de tarea del tablero según el modo del día. */
export function kindFromMode(mode: string): TaskKind {
  const m = mode.toLowerCase();
  if (m.includes("simulaci")) return "simulacro";
  if (m.includes("esquema") || m.includes("resumen")) return "resumen";
  if (m.includes("tarjeta")) return "tarjetas";
  return "lectura";
}

/** Modos frecuentes para sugerir al editar. */
export const COMMON_MODES = [
  "Estudio + active recall oral",
  "Estudio + recall oral",
  "Estudio + esquema",
  "Active recall puro",
  "Simulación oral",
  "Repaso",
];
