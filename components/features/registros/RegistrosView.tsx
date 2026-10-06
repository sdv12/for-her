"use client";

import { useMemo, useState } from "react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { Check, Pencil, Trash2 } from "lucide-react";
import { ModeChip } from "@/components/features/plan/ModeChip";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Pill";
import { Sheet } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/Toast";
import { shiftMonth } from "@/lib/calendar";
import type { StudyLog } from "@/lib/data/types";
import { createLog, deleteLog, restoreLog, updateLog } from "@/lib/mock/actions/logs";
import { useDB } from "@/lib/mock/store";
import { toISODate } from "@/lib/plan-import/dates";
import { LogForm, MOODS } from "./LogForm";
import { MonthCalendar } from "./MonthCalendar";

export function RegistrosView({ initialDate }: { initialDate: string | null }) {
  const db = useDB();
  const toast = useToast();
  const [today] = useState(() => toISODate(new Date()));
  const [selected, setSelected] = useState(initialDate ?? today);
  const [view, setView] = useState(() => {
    const d = parseISO(initialDate ?? today);
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const [editing, setEditing] = useState<StudyLog | null>(null);
  const [formKey, setFormKey] = useState(0);

  const data = useMemo(() => {
    if (!db) return null;
    const minutesByDate = new Map<string, number>();
    for (const l of db.study_logs) minutesByDate.set(l.date, (minutesByDate.get(l.date) ?? 0) + l.minutes);
    const planDates = new Set(db.plan_days.map((d) => d.date));
    return { minutesByDate, planDates };
  }, [db]);

  const header = <PageHeader kicker="Planificar" title="Registros" backHref="/mas" backLabel="Volver a Más" />;

  if (!db || !data) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="grid animate-pulse gap-5 desk:grid-cols-[1.25fr_1fr]">
          <div className="h-[28rem] rounded-card bg-sunken" />
          <div className="h-80 rounded-card bg-sunken" />
        </div>
      </>
    );
  }

  const plan = db.plan_days.filter((d) => d.date === selected);
  const logs = db.study_logs.filter((l) => l.date === selected).sort((a, b) => a.created_at.localeCompare(b.created_at));
  const dayTotal = logs.reduce((n, l) => n + l.minutes, 0);
  const title = format(parseISO(selected), "EEEE d 'de' MMMM", { locale: es });
  const isFuture = selected > today;

  function select(date: string) {
    setSelected(date);
    const d = parseISO(date);
    setView({ year: d.getFullYear(), month: d.getMonth() });
    setFormKey((k) => k + 1);
  }

  return (
    <>
      {header}
      <div className="grid items-start gap-5 desk:grid-cols-[1.25fr_1fr]">
        <MonthCalendar
          year={view.year}
          month={view.month}
          today={today}
          selected={selected}
          minutesByDate={data.minutesByDate}
          planDates={data.planDates}
          onSelect={select}
          onMonth={(delta) => setView((v) => shiftMonth(v.year, v.month, delta))}
          onToday={() => select(today)}
        />

        <Card className="flex flex-col gap-5 p-5 desk:p-6" aria-labelledby="dia">
          <div>
            <h2 id="dia" className="text-xl font-semibold first-letter:uppercase">
              {title}
            </h2>
            {dayTotal > 0 && <p className="tabular text-sm text-muted">{dayTotal} min en total</p>}
          </div>

          <section aria-label="Qué decía el plan">
            <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">Qué decía el plan</h3>
            {plan.length === 0 ? (
              <p className="mt-1 text-[15px] text-muted">Sin plan para este día.</p>
            ) : (
              <ul className="mt-2 flex flex-col gap-2">
                {plan.map((d) => (
                  <li key={d.id} className="rounded-card-sm bg-sunken p-3">
                    <p className="text-[15px] leading-snug">{d.content}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <ModeChip mode={d.mode} />
                      {d.done_at && (
                        <Chip tone="sage">
                          <Check aria-hidden /> Hecho
                        </Chip>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section aria-label="Registros del día">
            <h3 className="text-xs font-semibold tracking-wide text-muted uppercase">Registros</h3>
            {logs.length === 0 ? (
              <p className="mt-1 text-[15px] text-muted">
                {isFuture ? "Todavía no llegó este día." : "Sin registros este día. Está bien: lo que importa es la semana, no el día."}
              </p>
            ) : (
              <ul className="mt-2 flex flex-col divide-y divide-line">
                {logs.map((l) => (
                  <li key={l.id} className="flex items-start gap-3 py-2.5">
                    <span className="tabular w-14 shrink-0 font-display text-xl font-semibold">
                      {l.minutes}
                      <span className="ml-0.5 text-xs font-sans font-semibold text-muted">min</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] leading-snug">{l.what}</p>
                      {l.mood && <Chip className="mt-1.5">{MOODS.find((m) => m.value === l.mood)?.label}</Chip>}
                    </div>
                    <Button variant="ghost" size="icon" aria-label={`Editar registro de ${l.minutes} min`} onClick={() => setEditing(l)} className="-my-1 text-muted">
                      <Pencil aria-hidden />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Borrar registro de ${l.minutes} min`}
                      onClick={() => {
                        const removed = deleteLog(l.id);
                        toast({ message: "Borré el registro.", actions: [{ label: "Deshacer", onClick: () => restoreLog(removed) }] });
                      }}
                      className="-my-1 -mr-2 text-muted"
                    >
                      <Trash2 aria-hidden />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {!isFuture && (
            <section aria-label="Registrar" className="border-t border-line pt-5">
              <h3 className="mb-3 text-lg font-semibold">Registrar</h3>
              <LogForm
                key={`${selected}-${formKey}`}
                id="log-form"
                submitLabel="Registrar"
                initial={{ date: selected, minutes: logs.length ? 30 : db.profile.daily_goal_min || 60, what: plan[0]?.content ?? "", mood: null }}
                onSubmit={(input) => {
                  createLog(input);
                  setFormKey((k) => k + 1);
                  toast({ message: `Registrado: ${input.minutes} min.` });
                }}
              />
            </section>
          )}
        </Card>
      </div>

      {editing && (
        <Sheet
          open
          onClose={() => setEditing(null)}
          title="Editar registro"
          footer={
            <Button type="submit" form="log-edit" variant="primary" className="w-full">
              Guardar
            </Button>
          }
        >
          <LogForm
            id="log-edit"
            inlineSubmit={false}
            submitLabel="Guardar"
            initial={{ date: editing.date, minutes: editing.minutes, what: editing.what, mood: editing.mood }}
            onSubmit={(input) => {
              updateLog(editing.id, input);
              setEditing(null);
              toast({ message: "Guardado." });
            }}
          />
        </Sheet>
      )}
    </>
  );
}
