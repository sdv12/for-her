"use client";

import { useState } from "react";
import { Info, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { PlanDay, PlanPhase, PlanWeek } from "@/lib/data/types";
import type { PlanDayInput } from "@/lib/data/schemas";
import { formatRange } from "@/lib/plan";
import { addDays, format, parseISO } from "date-fns";
import { DayForm } from "./DayForm";
import { DayRow } from "./DayRow";
import { phaseColor, phaseLabel } from "./phase";

type Props = {
  week: PlanWeek;
  phase: PlanPhase | undefined;
  days: PlanDay[];
  today: string;
  onToggle: (day: PlanDay) => void;
  onUpdate: (day: PlanDay, data: PlanDayInput) => void;
  onAdd: (data: PlanDayInput) => void;
  onDelete: (day: PlanDay) => void;
};

/** Primera fecha de la semana sin día cargado (o el inicio si están todas). */
function firstFreeDate(week: PlanWeek, days: PlanDay[]): string {
  const used = new Set(days.map((d) => d.date));
  for (let d = parseISO(week.start_date); format(d, "yyyy-MM-dd") <= week.end_date; d = addDays(d, 1)) {
    const iso = format(d, "yyyy-MM-dd");
    if (!used.has(iso)) return iso;
  }
  return week.start_date;
}

export function WeekDetail({ week, phase, days, today, onToggle, onUpdate, onAdd, onDelete }: Props) {
  // "new" = agregando; id = editando ese día.
  const [editing, setEditing] = useState<string | null>(null);
  const done = days.filter((d) => d.done_at).length;
  const range = { start: week.start_date, end: week.end_date };

  return (
    <Card className="p-5 desk:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-x-2 text-sm font-semibold text-muted">
            <span>Semana {week.num}</span>
            <span aria-hidden>·</span>
            <span>{formatRange(week.start_date, week.end_date)}</span>
            {phase && (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="size-2.5 rounded-full" style={{ backgroundColor: phaseColor(phase.num) }} />
                  Fase {phaseLabel(phase)}
                </span>
              </>
            )}
          </p>
          <h2 className="mt-1 text-2xl font-semibold desk:text-[1.75rem]">{week.title}</h2>
        </div>
        {days.length > 0 && (
          <p className="tabular rounded-full bg-sage-soft px-3 py-1 text-sm font-semibold">
            {done} de {days.length} días
          </p>
        )}
      </div>

      {phase && (phase.description || phase.alert) && (
        <div className="mt-4 rounded-card-sm bg-sunken p-4 text-sm">
          <p className="font-semibold">{phase.name}</p>
          {phase.description && <p className="mt-0.5 text-muted">{phase.description}</p>}
          {phase.alert && (
            <p className="mt-2 inline-flex items-start gap-2 rounded-[10px] bg-honey-soft px-3 py-2 font-semibold">
              <Info aria-hidden className="mt-0.5 size-4 shrink-0" />
              {phase.alert}
            </p>
          )}
        </div>
      )}

      <ul className="mt-3 divide-y divide-line">
        {days.map((day) => (
          <li key={day.id}>
            {editing === day.id ? (
              <div className="py-3">
                <DayForm
                  initial={{ content: day.content, mode: day.mode, date: day.date }}
                  range={range}
                  submitLabel="Guardar"
                  onSubmit={(data) => {
                    onUpdate(day, data);
                    setEditing(null);
                  }}
                  onCancel={() => setEditing(null)}
                  onDelete={() => {
                    onDelete(day);
                    setEditing(null);
                  }}
                />
              </div>
            ) : (
              <DayRow day={day} isToday={day.date === today} onToggle={() => onToggle(day)} onEdit={() => setEditing(day.id)} />
            )}
          </li>
        ))}
      </ul>

      {days.length === 0 && editing !== "new" && (
        <p className="py-4 text-[15px] text-muted">Esta semana todavía no tiene días. Agregá el primero.</p>
      )}

      <div className="mt-2 border-t border-line pt-4">
        {editing === "new" ? (
          <DayForm
            initial={{ content: "", mode: "Estudio + recall oral", date: firstFreeDate(week, days) }}
            range={range}
            submitLabel="Agregar"
            onSubmit={(data) => {
              onAdd(data);
              setEditing(null);
            }}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <Button variant="secondary" onClick={() => setEditing("new")}>
            <Plus aria-hidden /> Agregar día
          </Button>
        )}
      </div>
    </Card>
  );
}
