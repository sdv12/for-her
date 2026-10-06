import { addDays, differenceInCalendarDays, format, getDay, isValid, parseISO } from "date-fns";
import type { ISODate, Weekday } from "@/lib/data/types";

export const WEEKDAYS: Weekday[] = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

// getDay(): 0 = domingo.
const BY_JS_DAY: Weekday[] = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export function toISODate(d: Date): ISODate {
  return format(d, "yyyy-MM-dd");
}

export function addDaysISO(date: ISODate, days: number): ISODate {
  return toISODate(addDays(parseISO(date), days));
}

export function diffDays(a: ISODate, b: ISODate): number {
  return differenceInCalendarDays(parseISO(a), parseISO(b));
}

export function weekdayOf(date: ISODate): Weekday {
  return BY_JS_DAY[getDay(parseISO(date))];
}

/** Sin acentos y en minúscula, para comparar etiquetas escritas a mano. */
export function fold(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

const WEEKDAY_WORDS: Record<string, Weekday> = {
  lun: "Lun", lunes: "Lun",
  mar: "Mar", martes: "Mar",
  mie: "Mié", miercoles: "Mié",
  jue: "Jue", jueves: "Jue",
  vie: "Vie", viernes: "Vie",
  sab: "Sáb", sabado: "Sáb",
  dom: "Dom", domingo: "Dom",
};

/** "Lunes", "lun", "Mié", "miercoles." → etiqueta canónica; null si no es un día. */
export function normalizeWeekday(s: string): Weekday | null {
  return WEEKDAY_WORDS[fold(s).replace(/\.$/, "")] ?? null;
}

/**
 * Fecha de un día del plan: dentro del rango de la semana, la primera fecha
 * cuyo día de la semana coincide con la etiqueta. null si no cae en el rango.
 */
export function dateForWeekday(start: ISODate, end: ISODate, weekday: Weekday): ISODate | null {
  let d = parseISO(start);
  const last = parseISO(end);
  while (d <= last) {
    if (BY_JS_DAY[getDay(d)] === weekday) return toISODate(d);
    d = addDays(d, 1);
  }
  return null;
}

/** Primera fecha >= start con ese día de la semana (aunque se pase del rango). */
export function nextWeekday(start: ISODate, weekday: Weekday): ISODate {
  return dateForWeekday(start, addDaysISO(start, 6), weekday)!;
}

const MONTHS: Record<string, number> = {
  ene: 1, enero: 1,
  feb: 2, febrero: 2,
  mar: 3, marzo: 3,
  abr: 4, abril: 4,
  may: 5, mayo: 5,
  jun: 6, junio: 6,
  jul: 7, julio: 7,
  ago: 8, agosto: 8,
  sep: 9, sept: 9, set: 9, septiembre: 9, setiembre: 9,
  oct: 10, octubre: 10,
  nov: 11, noviembre: 11,
  dic: 12, diciembre: 12,
};

function monthOf(word: string | undefined): number | null {
  if (!word) return null;
  return MONTHS[fold(word).replace(/\.$/, "")] ?? null;
}

/** Rango de fechas al principio de un texto: "1–7 Oct", "26 Nov – 2 Dic", "1 al 7 de octubre". */
export const RANGE_RE =
  /^(\d{1,2})(?:\s+(?:de\s+)?([a-záéíóú]+)\.?)?\s*(?:[–—-]|al)\s*(\d{1,2})\s+(?:de\s+)?([a-záéíóú]+)\.?/i;

/**
 * Parsea "fechas" de una semana. El año se infiere de `after`: se usa el año de `after`
 * y, si la fecha queda más de una semana antes, el siguiente (así "5–11 Ene" después de diciembre es del año que viene).
 * Si el rango cruza de año ("29 Dic – 4 Ene"), el fin pasa al año siguiente.
 */
export function parseFechas(text: string, after: ISODate): { start: ISODate; end: ISODate; rest: string } | null {
  const m = text.trim().match(RANGE_RE);
  if (!m) return null;
  const [, d1, m1word, d2, m2word] = m;
  const m2 = monthOf(m2word);
  const m1 = monthOf(m1word) ?? m2;
  if (!m1 || !m2) return null;

  const ref = parseISO(after);
  let year = ref.getFullYear();
  const build = (y: number, mo: number, d: string) => parseISO(`${y}-${String(mo).padStart(2, "0")}-${d.padStart(2, "0")}`);
  let start = build(year, m1, d1);
  if (differenceInCalendarDays(start, ref) < -7) {
    year += 1;
    start = build(year, m1, d1);
  }
  const end = build(m2 < m1 ? year + 1 : year, m2, d2);
  if (!isValid(start) || !isValid(end) || end < start) return null;
  return { start: toISODate(start), end: toISODate(end), rest: text.trim().slice(m[0].length) };
}
