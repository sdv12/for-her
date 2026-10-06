import { differenceInCalendarDays, formatDistanceStrict, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";

/**
 * Días de calendario que faltan para el examen, contando desde `today` (hora local).
 * El día del examen da 0; una fecha pasada también da 0 (nunca negativos).
 * Devuelve null si no hay fecha o es inválida.
 */
export function daysUntilExam(examDate: string | null | undefined, today: Date = new Date()): number | null {
  if (!examDate) return null;
  const exam = parseISO(examDate);
  if (!isValid(exam)) return null;
  return Math.max(0, differenceInCalendarDays(exam, today));
}

/** "recién", "hace 5 minutos", "hace 3 días". */
export function timeAgo(iso: string, now: Date = new Date()): string {
  const date = new Date(iso);
  if (now.getTime() - date.getTime() < 60_000) return "recién";
  return `hace ${formatDistanceStrict(date, now, { locale: es })}`;
}
