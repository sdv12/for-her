"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Moon, Sun } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { integratePlan } from "@/lib/integracion";
import { useDB } from "@/lib/mock/store";
import { formatRange, isWeekCurrent, selectActivePlan } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { phaseColor, phaseLabel } from "./phase";

const DIA = [
  { day: "Lunes a viernes, mañana", icon: Sun, text: "10 min recuperar lo de ayer sin apuntes · 35 min el tema de tu cronograma · cierre con esquema de memoria (o la simulación, si el día es de simulación)." },
  { day: "Lunes, noche", icon: Moon, text: "Puente: recuperá la semana anterior del mismo eje (lo básico) o anticipá la clínica que viene." },
  { day: "Martes, jueves y viernes, noche", icon: Moon, text: "Caso clínico del eje de la semana." },
  { day: "Miércoles, noche", icon: Moon, text: "Materia transversal: una pregunta de tu banco de la materia que el cronograma no tiene como semana propia." },
  { day: "Todas las noches", icon: Moon, text: "Una pregunta de la semana en voz alta, como en el tribunal, y anotar en Errores lo que no salió." },
  { day: "Sábado", icon: Sun, text: "Errores de la semana, repaso espaciado (preguntas de prioridad alta de hace 1 y 3 semanas) y un caso acumulativo." },
  { day: "Domingo", icon: Sun, text: "Descanso. Tarjetas solo si hay vencidas." },
];

/** Tu cronograma con la capa del plan integrado: eje, puentes, materia transversal y preguntas por semana. */
export function IntegratedPlanView() {
  const db = useDB();
  const today = toISODate(new Date());
  const data = useMemo(() => {
    if (!db) return null;
    const view = selectActivePlan(db);
    return view ? { view, info: integratePlan(db, view) } : null;
  }, [db]);

  const back = (
    <Link href="/plan" className="inline-flex items-center gap-1.5 self-start rounded-btn py-1 text-sm font-semibold text-accent-text hover:underline">
      <ArrowLeft aria-hidden className="size-4" /> Volver al plan
    </Link>
  );

  if (!db) return <div aria-busy="true" aria-label="Cargando" className="h-96 animate-pulse rounded-card bg-sunken" />;
  if (!data || data.view.weeks.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        {back}
        <Card className="flex flex-col items-start gap-3">
          <p className="text-[15px]">Para ver el cronograma integrado, primero importá tu cronograma (y si tenés, tu banco de preguntas).</p>
          <Link href="/plan/importar" className={buttonClasses({ variant: "primary" })}>
            Importar cronograma
          </Link>
        </Card>
      </div>
    );
  }

  const { view, info } = data;
  const totalQ = [...info.values()].reduce((n, i) => n + i.questions.length, 0);

  return (
    <div className="flex flex-col gap-6">
      {back}
      <p className="max-w-3xl text-[15px] leading-relaxed text-muted">
        Tu cronograma, sin cambios, con la capa del plan integrado: cada semana tiene su eje clínico, un puente con otra semana del mismo eje (lo básico con su
        clínica), una materia transversal y sus preguntas ({totalQ} entre las del cronograma y las del banco). Hoy arma cada día con esto.
      </p>

      <section aria-labelledby="como-dia" className="flex flex-col gap-3">
        <h2 id="como-dia" className="text-lg font-semibold">
          Cómo es cada día
        </h2>
        <ul className="grid gap-2 desk:grid-cols-2">
          {DIA.map((d) => (
            <li key={d.day} className="flex gap-3 rounded-card-sm border border-line bg-surface p-3.5">
              <d.icon aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
              <span>
                <span className="block text-sm font-semibold">{d.day}</span>
                <span className="block text-[15px] leading-snug text-ink/85">{d.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {view.phases.map((phase) => {
        const weeks = view.weeks.filter((w) => w.phase_id === phase.id);
        if (!weeks.length) return null;
        return (
          <section key={phase.id} aria-labelledby={`fase-${phase.id}`} className="flex flex-col gap-3">
            <h2 id={`fase-${phase.id}`} className="flex items-center gap-2 text-lg font-semibold">
              <span aria-hidden className="size-3 rounded-full" style={{ backgroundColor: phaseColor(phase.num) }} />
              Fase {phaseLabel(phase)} · {phase.name}
            </h2>
            <ol className="flex flex-col gap-2">
              {weeks.map((w) => {
                const i = info.get(w.id)!;
                const days = view.daysByWeek.get(w.id) ?? [];
                const done = days.filter((d) => d.done_at).length;
                const current = isWeekCurrent(w, today);
                return (
                  <li key={w.id}>
                    <Link
                      href={`/plan?semana=${w.num}`}
                      className={cn(
                        "grid gap-2 rounded-card border bg-surface p-4 transition-colors hover:bg-sunken desk:grid-cols-[1.3fr_1fr_1fr] desk:items-center desk:gap-4",
                        current ? "border-accent-text" : "border-line",
                      )}
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
                          Semana {w.num} · {formatRange(w.start_date, w.end_date)}
                          {current && <Chip tone="accent">Esta semana</Chip>}
                          {w.priority && /alta|cr[ií]tica/i.test(w.priority) && <Chip tone="neutral">{w.priority}</Chip>}
                        </span>
                        <span className="mt-0.5 block text-[16px] leading-snug font-semibold">{w.title}</span>
                        <span className="tabular block text-xs text-muted">
                          {done}/{days.length} días hechos
                        </span>
                      </span>
                      <span className="text-sm">
                        <span className="block text-xs font-semibold text-muted">Eje</span>
                        {i.isSimulation ? "Simulación integradora" : (i.eje?.title ?? "Sin eje claro")}
                        {i.puentes.length > 0 && (
                          <span className="block text-xs text-muted">Puente: {i.puentes.map((p) => `S${p.week.num}`).join(" y ")}</span>
                        )}
                      </span>
                      <span className="text-sm">
                        <span className="block text-xs font-semibold text-muted">Transversal y preguntas</span>
                        {i.transversal.name}
                        <span className="tabular block text-xs text-muted">
                          {i.questions.length} preguntas ({i.questions.filter((q) => q.priority === 1).length} de prioridad alta)
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
