"use client";

import { useId } from "react";
import { daysUntilExam } from "@/lib/dates";
import { useExamDate } from "@/lib/mock/exam-date";
import { cn } from "@/lib/cn";

/** Bloque "Examen oral integrador": días que faltan + fecha editable. */
export function ExamCountdown({ className }: { className?: string }) {
  const [date, setDate, hydrated] = useExamDate();
  const inputId = useId();
  const days = daysUntilExam(date);

  return (
    <section aria-label="Examen oral integrador" className={cn("rounded-card bg-sunken p-4", className)}>
      <p className="text-xs font-semibold tracking-wide text-muted uppercase">Examen oral integrador</p>

      <p className="mt-1.5 flex items-baseline gap-1.5" aria-live="polite">
        {!hydrated ? (
          <span className="font-display text-4xl font-semibold text-muted/40">·</span>
        ) : days === null ? (
          <span className="font-display text-2xl font-semibold tracking-[-0.02em]">Marzo 2027</span>
        ) : days === 0 ? (
          <span className="font-display text-2xl font-semibold tracking-[-0.02em]">Es hoy</span>
        ) : (
          <>
            <span className="tabular font-display text-4xl font-semibold tracking-[-0.03em]">{days}</span>
            <span className="text-sm font-semibold text-muted">{days === 1 ? "día" : "días"}</span>
          </>
        )}
      </p>

      <label htmlFor={inputId} className="mt-3 block text-xs font-semibold text-muted">
        Fecha del examen
      </label>
      <input
        id={inputId}
        type="date"
        value={date ?? ""}
        onChange={(e) => setDate(e.target.value || null)}
        className="mt-1 min-h-11 w-full rounded-btn border border-line bg-surface px-3 text-sm text-ink"
      />
    </section>
  );
}
