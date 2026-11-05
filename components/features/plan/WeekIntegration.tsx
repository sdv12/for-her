"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeftRight, CalendarCheck2, Layers3, MessageCircleQuestionMark, Network, Stethoscope } from "lucide-react";
import type { PlanDay, PlanWeek } from "@/lib/data/types";
import { integratePlan } from "@/lib/integracion";
import { useDB } from "@/lib/mock/store";
import { selectActivePlan } from "@/lib/plan";
import { casesForEje, ejesForText, pickCase } from "@/lib/programa/match";

/**
 * Capa integrada de la semana: eje, puentes con otras semanas del mismo eje, materia transversal,
 * preguntas de la semana y el repaso espaciado del sábado. Se calcula: no cambia el plan.
 */
export function WeekIntegration({ week, days }: { week: PlanWeek; days: PlanDay[] }) {
  const db = useDB();
  const info = useMemo(() => {
    if (!db) return null;
    const view = selectActivePlan(db);
    return view ? (integratePlan(db, view).get(week.id) ?? null) : null;
  }, [db, week.id]);
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);
  const eje = info ? info.eje : (ejesForText([week.title, ...days.map((d) => d.content)].join(" "), 1)[0] ?? null);
  if (!info && !eje) return null;
  const caso = eje ? pickCase(casesForEje(eje), played) : undefined;
  const top = info?.questions.slice(0, 3) ?? [];

  return (
    <section aria-label="Integración de la semana" className="mt-4 flex flex-col gap-3 rounded-card-sm border border-line p-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Network aria-hidden className="size-4 text-accent-text" /> {info?.isSimulation ? "Semana de simulación: integra todo lo anterior" : "Esta semana integra"}
      </p>

      {eje && (
        <div>
          <Link href={`/programa/eje/${eje.id}`} className="inline-flex min-h-9 items-center rounded-full bg-sunken px-3 text-sm font-semibold hover:bg-line/60">
            {eje.title}
          </Link>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            <span className="font-semibold text-ink">Conexión para explicar: </span>
            {eje.conexion}
          </p>
        </div>
      )}

      {info && (
        <dl className="grid gap-3 text-sm desk:grid-cols-2">
          {info.puentes.length > 0 && (
            <Row icon={ArrowLeftRight} title="Puente (lunes a la noche)">
              {info.puentes.map((p) => (
                <Link key={p.week.id} href={`/plan?semana=${p.week.num}`} className="block font-semibold text-accent-text underline-offset-2 hover:underline">
                  {p.dir === "antes" ? "Recuperá" : "Anticipá"} la semana {p.week.num}: {p.week.title}
                </Link>
              ))}
            </Row>
          )}
          <Row icon={Layers3} title="Materia transversal (miércoles a la noche)">
            {info.transversal.materia ? (
              <Link href={`/programa/materia/${info.transversal.materia}`} className="font-semibold text-accent-text underline-offset-2 hover:underline">
                {info.transversal.name}
              </Link>
            ) : (
              <span className="font-semibold">{info.transversal.name}</span>
            )}{" "}
            · {info.transversalQuestions.length} preguntas en tu banco
          </Row>
          <Row icon={MessageCircleQuestionMark} title={`Preguntas de la semana (${info.questions.length})`}>
            {top.length === 0 ? (
              <span className="text-muted">Todavía no hay preguntas de este tema en tu banco.</span>
            ) : (
              <ul className="flex flex-col gap-1">
                {top.map((q) => (
                  <li key={q.id}>
                    <Link href={`/simulacro?pregunta=${q.id}`} className="underline-offset-2 hover:underline">
                      {q.priority === 1 && <span className="font-semibold">Alta · </span>}
                      {q.text}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Row>
          <Row icon={CalendarCheck2} title="Sábado: repaso espaciado">
            {info.spaced.length ? `${info.spaced.length} preguntas de prioridad alta de hace 1 y 3 semanas, más errores y un caso acumulativo.` : "Errores de la semana y un caso acumulativo."}
          </Row>
        </dl>
      )}

      {caso && (
        <Link href={`/casos/${caso.id}`} className="inline-flex items-center gap-2 self-start rounded-btn py-1 text-sm font-semibold text-accent-text hover:underline">
          <Stethoscope aria-hidden className="size-4" /> Practicalo con un caso
        </Link>
      )}
    </section>
  );
}

function Row({ icon: Icon, title, children }: { icon: typeof Network; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[12px] bg-sunken p-3">
      <dt className="flex items-center gap-1.5 text-xs font-semibold text-muted">
        <Icon aria-hidden className="size-3.5" /> {title}
      </dt>
      <dd className="mt-1 leading-snug">{children}</dd>
    </div>
  );
}
