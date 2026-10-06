"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarRange, Upload } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/ui/Toast";
import type { PlanDay } from "@/lib/data/types";
import type { PlanDayInput } from "@/lib/data/schemas";
import { addPlanDay, deletePlanDay, restorePlanDay, updatePlanDay } from "@/lib/mock/actions/plan";
import { useDB } from "@/lib/mock/store";
import { currentWeek, formatRange, formatShortDate, selectActivePlan } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { WeekDetail } from "./WeekDetail";
import { useToggleDay } from "./useToggleDay";
import { WeekStrip } from "./WeekStrip";

export function PlanView() {
  const db = useDB();
  const toast = useToast();
  const view = useMemo(() => (db ? selectActivePlan(db) : null), [db]);
  const today = toISODate(new Date());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { toggle, sheet } = useToggleDay();

  if (!db) return <PlanSkeleton />;

  if (!view || view.weeks.length === 0) {
    return (
      <EmptyState
        icon={CalendarRange}
        title="Todavía no hay cronograma"
        action={
          <Link href="/plan/importar" className={buttonClasses({ variant: "primary" })}>
            <Upload aria-hidden /> Importá tu cronograma
          </Link>
        }
      >
        Traelo desde el JSON o el .docx que ya tenés, o armalo en blanco desde una fecha.
      </EmptyState>
    );
  }

  const { plan, phases, weeks, daysByWeek } = view;
  const week = weeks.find((w) => w.id === selectedId) ?? currentWeek(weeks, today)!;
  const phase = phases.find((p) => p.id === week.phase_id);

  function onDelete(day: PlanDay) {
    const removed = deletePlanDay(day.id);
    toast({ message: `Borré ${day.weekday} ${formatShortDate(day.date)}.`, actions: [{ label: "Deshacer", onClick: () => restorePlanDay(removed) }] });
  }

  return (
    <div className="flex flex-col gap-6">
      <section aria-labelledby="cronograma" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="cronograma" className="text-xl font-semibold">
              Cronograma · {weeks.length} {weeks.length === 1 ? "semana" : "semanas"}
            </h2>
            <p className="text-sm text-muted">
              {plan.title} · {formatRange(weeks[0].start_date, weeks[weeks.length - 1].end_date)}
            </p>
          </div>
          <Link href="/plan/importar" className={buttonClasses({ variant: "secondary" })}>
            <Upload aria-hidden /> Importar cronograma
          </Link>
        </div>
        <WeekStrip weeks={weeks} phases={phases} daysByWeek={daysByWeek} selectedId={week.id} today={today} onSelect={setSelectedId} />
      </section>

      <WeekDetail
        key={week.id}
        week={week}
        phase={phase}
        days={daysByWeek.get(week.id) ?? []}
        today={today}
        onToggle={toggle}
        onUpdate={(day: PlanDay, data: PlanDayInput) => {
          updatePlanDay(day.id, data);
          toast({ message: "Guardado." });
        }}
        onAdd={(data) => {
          addPlanDay(week.id, data);
          toast({ message: "Agregué el día y su tarea en el Tablero." });
        }}
        onDelete={onDelete}
      />

      {sheet}
    </div>
  );
}

function PlanSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando el plan" className="flex animate-pulse flex-col gap-6">
      <div className="h-6 w-56 rounded-full bg-sunken" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] gap-1.5">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-14 rounded-[14px] bg-sunken" />
        ))}
      </div>
      <div className="h-80 rounded-card bg-sunken" />
    </div>
  );
}
