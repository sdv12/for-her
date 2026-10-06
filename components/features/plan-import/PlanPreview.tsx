"use client";

import { ChevronRight, Info, Plus, Trash2 } from "lucide-react";
import { phaseColor } from "@/components/features/plan/phase";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { cn } from "@/lib/cn";
import type { Weekday } from "@/lib/data/types";
import { formatRange } from "@/lib/plan";
import { addDaysISO, nextWeekday, toISODate, WEEKDAYS, weekdayOf } from "@/lib/plan-import/dates";
import { countDays, newDraftDay, recomputeWeekDays, shiftDraft } from "@/lib/plan-import/draft";
import type { DraftDay, DraftWeek, PlanDraft } from "@/lib/plan-import/types";

type Props = {
  draft: PlanDraft;
  onChange: (draft: PlanDraft) => void;
  warnings: string[];
  subjects: string[];
};

const INPUT =
  "min-h-11 w-full rounded-btn border border-line bg-surface px-3 text-sm text-ink focus-visible:border-accent-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-soft";

/** Vista previa editable: fases → semanas → días. Nada se guarda hasta confirmar. */
export function PlanPreview({ draft, onChange, warnings, subjects }: Props) {
  const weeks = draft.phases.flatMap((p) => p.weeks);
  const first = weeks[0];
  const last = weeks.at(-1);
  const today = toISODate(new Date());
  const nextMonday = nextWeekday(addDaysISO(today, 1), "Lun");

  const patchWeek = (weekKey: string, fn: (w: DraftWeek) => DraftWeek) =>
    onChange({ ...draft, phases: draft.phases.map((p) => ({ ...p, weeks: p.weeks.map((w) => (w.key === weekKey ? fn(w) : w)) })) });

  const patchDay = (week: DraftWeek, dayKey: string, patch: Partial<DraftDay>) =>
    patchWeek(week.key, (w) => ({ ...w, days: w.days.map((d) => (d.key === dayKey ? { ...d, ...patch } : d)) }));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <TextField label="Título del cronograma" value={draft.title} onChange={(e) => onChange({ ...draft, title: e.target.value })} />
        {first && (
          <TextField
            label="Empieza el"
            type="date"
            value={first.start}
            onChange={(e) => e.target.value && onChange(shiftDraft(draft, e.target.value))}
            hint="Corre todo el cronograma; los días de la semana se mantienen."
          />
        )}
      </div>

      <p className="text-sm text-muted">
        {draft.phases.length} {draft.phases.length === 1 ? "fase" : "fases"} · {weeks.length} semanas · {countDays(draft)} días
        {first && last && <> · {formatRange(first.start, last.end)}</>}
      </p>

      {first && last && last.end < today && (
        <div className="flex flex-wrap items-center gap-3 rounded-card-sm bg-honey-soft p-4 text-sm">
          <Info aria-hidden className="size-4 shrink-0" />
          <p className="flex-1">Este cronograma ya terminó en el calendario. Podés correrlo para que arranque desde ahora.</p>
          <Button variant="secondary" onClick={() => onChange(shiftDraft(draft, nextMonday))}>
            Que empiece el lunes {nextMonday.slice(8)}/{nextMonday.slice(5, 7)}
          </Button>
        </div>
      )}

      {warnings.length > 0 && (
        <div className="rounded-card-sm bg-sunken p-4 text-sm">
          <p className="font-semibold">Revisá esto antes de guardar</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/85">
            {warnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {draft.phases.map((phase) => (
        <section key={phase.key} aria-label={`Fase ${phase.code}`} className="rounded-card border border-line bg-surface p-4 desk:p-5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="size-4 shrink-0 rounded-full" style={{ backgroundColor: phaseColor(phase.num) }} />
            <span className="shrink-0 text-sm font-semibold text-muted">Fase {phase.code}</span>
            <label className="sr-only" htmlFor={`${phase.key}-name`}>
              Nombre de la fase {phase.code}
            </label>
            <input
              id={`${phase.key}-name`}
              value={phase.name}
              onChange={(e) =>
                onChange({ ...draft, phases: draft.phases.map((p) => (p.key === phase.key ? { ...p, name: e.target.value } : p)) })
              }
              className={cn(INPUT, "font-display text-base font-semibold")}
            />
          </div>
          {phase.description && <p className="mt-2 text-sm text-muted">{phase.description}</p>}

          <ul className="mt-3 flex flex-col gap-1.5">
            {phase.weeks.map((week) => (
              <li key={week.key}>
                <details className="group rounded-card-sm bg-sunken">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-card-sm px-3 py-2 [&::-webkit-details-marker]:hidden">
                    <ChevronRight aria-hidden className="size-4 shrink-0 text-muted transition-transform group-open:rotate-90" />
                    <span className="tabular w-16 shrink-0 text-sm font-semibold">Sem {week.num}</span>
                    <span className="min-w-0 flex-1 truncate text-sm">{week.title}</span>
                    <span className="hidden shrink-0 text-xs text-muted sm:inline">{formatRange(week.start, week.end)}</span>
                    <span className="tabular shrink-0 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-muted">
                      {week.days.length} d
                    </span>
                  </summary>
                  <WeekEditor
                    week={week}
                    subjects={subjects}
                    onWeek={(fn) => patchWeek(week.key, fn)}
                    onDay={(dayKey, patch) => patchDay(week, dayKey, patch)}
                  />
                </details>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function WeekEditor({
  week,
  subjects,
  onWeek,
  onDay,
}: {
  week: DraftWeek;
  subjects: string[];
  onWeek: (fn: (w: DraftWeek) => DraftWeek) => void;
  onDay: (dayKey: string, patch: Partial<DraftDay>) => void;
}) {
  const missing = WEEKDAYS.find((d) => !week.days.some((x) => x.weekday === d)) ?? "Lun";
  const options = week.subject && !subjects.includes(week.subject) ? [...subjects, week.subject] : subjects;

  return (
    <div className="flex flex-col gap-4 px-3 pt-1 pb-4">
      <div className="grid gap-3 sm:grid-cols-2 desk:grid-cols-[2fr_1fr_1fr_1fr]">
        <TextField label="Título" value={week.title} onChange={(e) => onWeek((w) => ({ ...w, title: e.target.value }))} />
        <TextField
          label="Desde"
          type="date"
          value={week.start}
          onChange={(e) => e.target.value && onWeek((w) => recomputeWeekDays({ ...w, start: e.target.value }))}
        />
        <TextField
          label="Hasta"
          type="date"
          value={week.end}
          onChange={(e) => e.target.value && onWeek((w) => recomputeWeekDays({ ...w, end: e.target.value }))}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${week.key}-subject`} className="text-sm font-semibold">
            Materia
          </label>
          <select
            id={`${week.key}-subject`}
            value={week.subject ?? ""}
            onChange={(e) => onWeek((w) => ({ ...w, subject: e.target.value || null }))}
            className={INPUT}
          >
            <option value="">Sin materia</option>
            {options.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {week.days.length === 0 && <p className="text-sm text-muted">Sin días. Podés agregarlos ahora o después desde el Plan.</p>}

      <ul className="flex flex-col gap-3">
        {week.days.map((day) => (
          <li key={day.key} className="grid grid-cols-[3.25rem_1fr_auto] items-start gap-2 rounded-[12px] bg-surface p-2 desk:grid-cols-[3.25rem_10rem_1fr_14rem_auto]">
            <span className="flex min-h-11 items-center justify-center text-sm font-bold">{day.weekday}</span>
            <input
              type="date"
              aria-label={`Fecha del ${day.weekday}`}
              value={day.date}
              onChange={(e) => e.target.value && onDay(day.key, { date: e.target.value, weekday: weekdayOf(e.target.value) as Weekday })}
              className={cn(INPUT, "desk:col-auto")}
            />
            <button
              type="button"
              aria-label={`Quitar ${day.weekday}`}
              onClick={() => onWeek((w) => ({ ...w, days: w.days.filter((d) => d.key !== day.key) }))}
              className="inline-flex size-11 items-center justify-center rounded-btn text-muted hover:bg-sunken desk:order-last"
            >
              <Trash2 aria-hidden className="size-4" />
            </button>
            <input
              aria-label={`Contenido del ${day.weekday}`}
              value={day.content}
              onChange={(e) => onDay(day.key, { content: e.target.value })}
              className={cn(INPUT, "col-span-3 desk:col-span-1")}
            />
            <input
              aria-label={`Modo del ${day.weekday}`}
              value={day.mode}
              placeholder="Modo"
              onChange={(e) => onDay(day.key, { mode: e.target.value })}
              className={cn(INPUT, "col-span-3 desk:col-span-1")}
            />
          </li>
        ))}
      </ul>

      <div>
        <Button variant="ghost" onClick={() => onWeek((w) => ({ ...w, days: [...w.days, newDraftDay(w, missing, "", "")] }))}>
          <Plus aria-hidden /> Agregar día
        </Button>
      </div>
    </div>
  );
}
