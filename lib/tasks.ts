import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import type { TaskKind, TaskStatus } from "@/lib/data/types";
import { diffDays } from "@/lib/plan-import/dates";

export const STATUSES: Array<{ value: TaskStatus; label: string; dot: string }> = [
  { value: "pend", label: "Pendiente", dot: "bg-muted" },
  { value: "curso", label: "En curso", dot: "bg-accent" },
  { value: "repasar", label: "A repasar", dot: "bg-honey" },
  { value: "dominado", label: "Dominado", dot: "bg-sage" },
];

export const STATUS_LABEL = Object.fromEntries(STATUSES.map((s) => [s.value, s.label])) as Record<TaskStatus, string>;

export function neighborStatus(status: TaskStatus, dir: -1 | 1): TaskStatus | null {
  const i = STATUSES.findIndex((s) => s.value === status) + dir;
  return STATUSES[i]?.value ?? null;
}

export const KIND_LABEL: Record<TaskKind, string> = {
  lectura: "Lectura",
  resumen: "Resumen",
  tarjetas: "Tarjetas",
  simulacro: "Simulacro",
  otro: "Otro",
};

/** Tipos que se ofrecen al crear una tarea. */
export const KIND_OPTIONS: TaskKind[] = ["lectura", "resumen", "tarjetas", "simulacro"];

/**
 * Vencimiento legible: "Hoy", "Mañana", el día de la semana si cae en los próximos 6 días,
 * "Sem N" si es del plan y está más lejos, y si no la fecha. Nunca "atrasado".
 */
export function dueLabel(due: string | null, today: string, planWeek?: number | null): string | null {
  if (!due) return null;
  const diff = diffDays(due, today);
  if (diff === 0) return "Hoy";
  if (diff === 1) return "Mañana";
  if (diff > 1 && diff < 7) {
    const name = format(parseISO(due), "EEEE", { locale: es });
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  if (diff >= 7 && planWeek) return `Sem ${planWeek}`;
  return format(parseISO(due), "d MMM", { locale: es });
}

/** Posición entre dos vecinas (fracciones: no hace falta renumerar la columna). */
export function positionBetween(prev: number | undefined, next: number | undefined): number {
  if (prev !== undefined && next !== undefined) return (prev + next) / 2;
  if (prev !== undefined) return prev + 1;
  if (next !== undefined) return next - 1;
  return 1;
}
