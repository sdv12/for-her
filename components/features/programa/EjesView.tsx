"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useDB } from "@/lib/mock/store";
import { COMPLEMENTARIOS, EJES_PRINCIPALES } from "@/lib/programa/ejes";
import { casesForEje } from "@/lib/programa/match";

import { AUTOEVALUACION, IDEA_RECTORA } from "@/lib/programa/metodo";
import type { Eje } from "@/lib/programa/types";
import { PriorityChip, ProgramaHeader } from "./bits";

export function EjesView() {
  const db = useDB();
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);
  const done = useMemo(() => new Set(db?.route?.done ?? []), [db]);

  return (
    <>
      <ProgramaHeader />
      <div className="flex flex-col gap-7">
        <Card tone="sunken" className="flex gap-3">
          <Lightbulb aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-text" />
          <div>
            <p className="font-semibold">Idea rectora</p>
            <p className="mt-0.5 text-[15px] leading-relaxed">{IDEA_RECTORA}</p>
            <p className="mt-2 text-sm text-muted">
              Cada eje junta lo que aporta cada materia, las patologías troncales y los casos clínicos para practicarlo. Las materias, con sus unidades oficiales,
              están en{" "}
              <Link href="/programa/materias" className="font-semibold text-accent-text underline-offset-2 hover:underline">
                Materias por año
              </Link>
              .
            </p>
          </div>
        </Card>

        <section aria-labelledby="ejes" className="flex flex-col gap-3">
          <h2 id="ejes" className="text-xl font-semibold">
            Diez ejes clínicos integradores
          </h2>
          <ul className="grid gap-3 desk:grid-cols-2">
            {EJES_PRINCIPALES.map((e) => (
              <li key={e.id}>
                <EjeCard e={e} played={played} done={done} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="complementarios" className="flex flex-col gap-3">
          <div>
            <h2 id="complementarios" className="text-xl font-semibold">
              Problemas complementarios
            </h2>
            <p className="text-sm text-muted">Para que el estudio no quede concentrado solo en diabetes, infecciones y enfermedad cardiovascular.</p>
          </div>
          <ul className="grid gap-3 desk:grid-cols-2">
            {COMPLEMENTARIOS.map((e) => (
              <li key={e.id}>
                <EjeCard e={e} played={played} done={done} />
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-muted">
          La priorización es orientativa: responde al potencial de integración, no a una estadística de preguntas de examen. Validala con los programas y
          exámenes de tu cátedra.
        </p>
      </div>
    </>
  );
}

function EjeCard({ e, played, done }: { e: Eje; played: Set<string>; done: Set<string> }) {
  const cases = casesForEje(e);
  const solved = cases.filter((c) => played.has(c.id)).length;
  const evalDone = AUTOEVALUACION.filter((_, i) => done.has(`eval-${e.id}-${i}`)).length;
  const centrales = e.filas.filter((f) => f.peso === "central").length;
  return (
    <Link href={`/programa/eje/${e.id}`} className="flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-4 transition-colors hover:bg-sunken desk:p-5">
      <div className="flex flex-wrap items-center gap-2">
        {e.code && <span className="tabular text-sm font-semibold text-muted">{e.code}</span>}
        <PriorityChip p={e.priority} />
      </div>
      <div>
        <h3 className="text-[17px] leading-snug font-semibold">{e.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">{e.objetivo}</p>
      </div>
      <p className="mt-auto text-xs text-muted">
        <span className="tabular">{e.filas.length}</span> materias ({centrales} centrales) · <span className="tabular">{solved}</span>/
        <span className="tabular">{cases.length}</span> casos · autoevaluación <span className="tabular">{evalDone}</span>/{AUTOEVALUACION.length}
      </p>
      <ProgressBar label={`Casos resueltos de ${e.title}`} value={solved} max={Math.max(1, cases.length)} tone="sage" />
    </Link>
  );
}
