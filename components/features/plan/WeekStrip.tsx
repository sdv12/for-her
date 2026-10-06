"use client";

import type { PlanDay, PlanPhase, PlanWeek } from "@/lib/data/types";
import { formatRange, isWeekCurrent } from "@/lib/plan";
import { cn } from "@/lib/cn";
import { phaseColor, phaseLabel } from "./phase";

type Props = {
  weeks: PlanWeek[];
  phases: PlanPhase[];
  daysByWeek: Map<string, PlanDay[]>;
  selectedId: string;
  today: string;
  onSelect: (weekId: string) => void;
};

/** Franja de semanas coloreadas por fase. La actual lleva un punto; la elegida, borde. */
export function WeekStrip({ weeks, phases, daysByWeek, selectedId, today, onSelect }: Props) {
  const phaseById = new Map(phases.map((p) => [p.id, p]));

  return (
    <div>
      <div role="group" aria-label="Semanas del cronograma" className="grid grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] gap-1.5">
        {weeks.map((w) => {
          const days = daysByWeek.get(w.id) ?? [];
          const done = days.filter((d) => d.done_at).length;
          const current = isWeekCurrent(w, today);
          const selected = w.id === selectedId;
          const phase = phaseById.get(w.phase_id);
          const num = phase?.num ?? 1;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => onSelect(w.id)}
              aria-pressed={selected}
              aria-label={`Semana ${w.num}, ${formatRange(w.start_date, w.end_date)}, fase ${phase ? phaseLabel(phase) : num}${current ? ", semana actual" : ""}, ${done} de ${days.length} días hechos`}
              className={cn(
                "relative flex min-h-14 flex-col items-center justify-center gap-1.5 rounded-[14px] px-1 text-ink transition-transform",
                selected ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas" : "hover:-translate-y-0.5",
              )}
              style={{ backgroundColor: phaseColor(num) }}
            >
              {current && <span aria-hidden className="absolute top-1.5 right-1.5 size-2 rounded-full bg-ink" />}
              <span className="tabular font-display text-lg leading-none font-bold">{w.num}</span>
              <span aria-hidden className="h-1 w-6 overflow-hidden rounded-full bg-ink/15">
                <span className="block h-full rounded-full bg-ink/70" style={{ width: `${days.length ? (done / days.length) * 100 : 0}%` }} />
              </span>
            </button>
          );
        })}
      </div>

      <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Fases">
        {phases.map((p) => (
          <li key={p.id} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1.5 text-xs font-semibold">
            <span aria-hidden className="size-4 rounded-full" style={{ backgroundColor: phaseColor(p.num) }} />
            F{phaseLabel(p)} · {p.name}
          </li>
        ))}
        <li className="inline-flex items-center gap-2 px-2 text-xs text-muted">
          <span aria-hidden className="size-2 rounded-full bg-ink" /> semana actual
        </li>
      </ul>
    </div>
  );
}
