"use client";

import Link from "next/link";
import { useToggleDay } from "@/components/features/plan/useToggleDay";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { formatRange, formatShortDate } from "@/lib/plan";
import type { TodayView } from "@/lib/today";

/** "Esta semana del plan": los días con su check, sincronizados con el Plan. */
export function WeekChecklist({ v }: { v: TodayView }) {
  const { toggle, sheet } = useToggleDay();
  if (!v.hasPlan || !v.week) return null;
  const week = v.week;

  return (
    <Card className="p-5 desk:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold">{v.weekStarted ? "Esta semana del plan" : "Primera semana del plan"}</h2>
          <p className="text-sm text-muted">
            Semana {week.num} · {formatRange(week.start_date, week.end_date)} · {week.title}
          </p>
        </div>
        <Link href="/plan" className="shrink-0 rounded-btn px-2 py-2 text-sm font-semibold text-accent-text hover:underline">
          Ver el plan
        </Link>
      </div>

      {!v.weekStarted && <p className="mt-3 text-sm text-muted">Empieza el {formatShortDate(week.start_date)}. Podés ir mirando qué viene.</p>}

      {v.weekDays.length === 0 ? (
        <p className="mt-4 text-[15px] text-muted">Esta semana no tiene días cargados. Agregalos desde el Plan.</p>
      ) : (
        <ul className="mt-2 divide-y divide-line">
          {v.weekDays.map((day) => {
            const done = Boolean(day.done_at);
            return (
              <li key={day.id} className="flex items-start gap-3 py-2.5">
                <Checkbox
                  checked={done}
                  onChange={() => toggle(day)}
                  aria-label={`${day.weekday} ${formatShortDate(day.date)}: ${done ? "hecho" : "marcar como hecho"}`}
                  className="-my-2 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                    {day.weekday} {formatShortDate(day.date)}
                    {day.date === v.today && <Chip tone="accent">Hoy</Chip>}
                  </p>
                  <p className={cn("line-clamp-2 text-[15px] leading-snug", done && "text-muted")}>{day.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {sheet}
    </Card>
  );
}
