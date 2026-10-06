import { addDays, endOfMonth, format, getDay, startOfMonth } from "date-fns";
import type { ISODate } from "@/lib/data/types";

export type CalendarDay = { date: ISODate; day: number; inMonth: boolean };

/** Semanas (lunes a domingo) que cubren el mes. `month` va de 0 a 11. */
export function monthGrid(year: number, month: number): CalendarDay[][] {
  const first = startOfMonth(new Date(year, month, 1));
  const last = endOfMonth(first);
  // getDay: 0 = domingo → corremos para que la semana arranque el lunes.
  let d = addDays(first, -((getDay(first) + 6) % 7));
  const weeks: CalendarDay[][] = [];
  while (d <= last) {
    const week: CalendarDay[] = [];
    for (let i = 0; i < 7; i++) {
      week.push({ date: format(d, "yyyy-MM-dd"), day: d.getDate(), inMonth: d.getMonth() === month });
      d = addDays(d, 1);
    }
    weeks.push(week);
  }
  return weeks;
}

export function shiftMonth(year: number, month: number, delta: number): { year: number; month: number } {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}
