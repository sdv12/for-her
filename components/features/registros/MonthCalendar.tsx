"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { monthGrid } from "@/lib/calendar";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

type Props = {
  year: number;
  month: number;
  today: string;
  selected: string;
  minutesByDate: Map<string, number>;
  planDates: Set<string>;
  onSelect: (date: string) => void;
  onMonth: (delta: number) => void;
  onToday: () => void;
};

export function MonthCalendar({ year, month, today, selected, minutesByDate, planDates, onSelect, onMonth, onToday }: Props) {
  const weeks = monthGrid(year, month);
  const title = format(new Date(year, month, 1), "MMMM yyyy", { locale: es });
  const inMonth = weeks.flat().filter((d) => d.inMonth);
  const daysWithLogs = inMonth.filter((d) => minutesByDate.has(d.date)).length;
  const totalMinutes = inMonth.reduce((n, d) => n + (minutesByDate.get(d.date) ?? 0), 0);

  return (
    <Card className="p-4 desk:p-6">
      <div className="flex items-center gap-1">
        <h2 className="flex-1 text-xl font-semibold first-letter:uppercase" aria-live="polite">
          {title}
        </h2>
        <Button variant="ghost" onClick={onToday} className="text-sm">
          Hoy
        </Button>
        <Button variant="ghost" size="icon" aria-label="Mes anterior" onClick={() => onMonth(-1)}>
          <ChevronLeft aria-hidden />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Mes siguiente" onClick={() => onMonth(1)}>
          <ChevronRight aria-hidden />
        </Button>
      </div>

      <div role="grid" aria-label={`Calendario de ${title}`} className="mt-3">
        <div role="row" className="grid grid-cols-7 gap-1">
          {WEEKDAYS.map((w) => (
            <span key={w} role="columnheader" className="py-1 text-center text-xs font-semibold text-muted">
              {w}
            </span>
          ))}
        </div>
        {weeks.map((week) => (
          <div role="row" key={week[0].date} className="mt-1 grid grid-cols-7 gap-1">
            {week.map((d) => {
              const minutes = minutesByDate.get(d.date);
              const plan = planDates.has(d.date);
              const isToday = d.date === today;
              const isSelected = d.date === selected;
              const label = [
                format(new Date(`${d.date}T12:00:00`), "EEEE d 'de' MMMM", { locale: es }),
                minutes ? `${minutes} minutos registrados` : plan && d.date <= today ? "había plan, sin registro" : null,
                isToday ? "hoy" : null,
              ]
                .filter(Boolean)
                .join(", ");
              return (
                <div role="gridcell" key={d.date} aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => onSelect(d.date)}
                    aria-label={label}
                    aria-current={isToday ? "date" : undefined}
                    className={cn(
                      "flex aspect-square min-h-11 w-full flex-col items-center justify-center gap-1 rounded-[12px] border-2 text-sm font-semibold transition-colors",
                      minutes ? "bg-sage-soft" : "hover:bg-sunken",
                      !d.inMonth && "opacity-40",
                      isSelected ? "border-ink" : isToday ? "border-accent" : "border-transparent",
                    )}
                  >
                    <span className="tabular">{d.day}</span>
                    {minutes ? (
                      <span aria-hidden className="size-1.5 rounded-full bg-sage" />
                    ) : plan && d.date <= today ? (
                      <span aria-hidden className="size-1.5 rounded-full border border-muted" />
                    ) : (
                      <span aria-hidden className="size-1.5" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm text-muted">
        <b className="tabular text-ink">{daysWithLogs}</b> {daysWithLogs === 1 ? "día" : "días"} con registro ·{" "}
        <b className="tabular text-ink">{totalMinutes}</b> min en total
      </p>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full bg-sage" /> con registro
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden className="size-1.5 rounded-full border border-muted" /> había plan
        </span>
      </p>
    </Card>
  );
}
