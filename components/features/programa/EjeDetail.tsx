"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Dices, Route } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Pill";
import { toggleRouteKey } from "@/lib/mock/actions/programa";
import { useDB } from "@/lib/mock/store";
import { getEje } from "@/lib/programa/ejes";
import { casesForEje, pickCase } from "@/lib/programa/match";
import { getMateria, YEAR_LABEL } from "@/lib/programa/materias";
import { AUTOEVALUACION, PLANTILLA } from "@/lib/programa/metodo";
import { RUTA } from "@/lib/programa/ruta";
import { CaseLinks, PriorityChip, ProgramaHeader, Section } from "./bits";

export function EjeDetail({ id }: { id: string }) {
  const e = getEje(id)!;
  const db = useDB();
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);
  const done = useMemo(() => new Set(db?.route?.done ?? []), [db]);
  const cases = casesForEje(e);
  const next = pickCase(cases, played);
  const weeks = RUTA.filter((w) => w.ejes.includes(e.id));
  const filas = [...e.filas].sort((a, b) => Number(a.peso === "secundaria") - Number(b.peso === "secundaria"));

  return (
    <>
      <ProgramaHeader
        actions={
          next && (
            <Link href={`/casos/${next.id}`} className={buttonClasses({ variant: "primary" })}>
              <Dices aria-hidden /> Jugar un caso del eje
            </Link>
          )
        }
      />
      <div className="flex flex-col gap-6">
        <Link href="/programa" className="inline-flex items-center gap-1.5 self-start rounded-btn py-1 text-sm font-semibold text-accent-text hover:underline">
          <ArrowLeft aria-hidden className="size-4" /> Todos los ejes
        </Link>

        <Card className="p-5 desk:p-7">
          <div className="flex flex-wrap items-center gap-2">
            {e.code && <span className="tabular text-sm font-semibold text-muted">Eje {e.code}</span>}
            {!e.code && <span className="text-sm font-semibold text-muted">Problema complementario</span>}
            <PriorityChip p={e.priority} />
            {weeks.map((w) => (
              <Link key={w.num} href="/programa/ruta" className="rounded-full">
                <Chip tone="sage">
                  <Route aria-hidden /> Ruta · semana {w.num}
                </Chip>
              </Link>
            ))}
          </div>
          <h2 className="mt-2 text-2xl font-semibold desk:text-[1.75rem]">{e.title}</h2>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">{e.objetivo}</p>
          <div className="mt-4 rounded-card-sm bg-accent-soft p-4">
            <p className="text-sm font-semibold">Conexión que deberías poder explicar</p>
            <p className="mt-1 text-[15px] leading-relaxed">{e.conexion}</p>
          </div>
        </Card>

        <div className="grid items-start gap-6 desk:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <Section title="Qué aporta cada materia" id="aportes">
              <ul className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
                {filas.map((f) => {
                  const m = getMateria(f.materia)!;
                  return (
                    <li key={f.materia + f.text} className="flex flex-col gap-1 p-4 desk:flex-row desk:gap-4">
                      <div className="flex shrink-0 flex-wrap items-center gap-2 desk:w-56 desk:flex-col desk:items-start desk:gap-1">
                        <Link href={`/programa/materia/${m.id}`} className="font-semibold text-accent-text underline-offset-2 hover:underline">
                          {m.name}
                        </Link>
                        <span className="text-xs text-muted">{YEAR_LABEL[m.year]}</span>
                        <Chip tone={f.peso === "central" ? "sage" : "neutral"}>{f.peso === "central" ? "Central" : "Secundaria"}</Chip>
                      </div>
                      <p className="text-[15px] leading-relaxed">{f.text}</p>
                    </li>
                  );
                })}
              </ul>
              <p className="text-xs text-muted">
                Central: relación directa y relevante. Secundaria: conexión complementaria. Que una materia no figure no implica que no tenga el tema en su
                programa.
              </p>
            </Section>

            <Section title="Para la ruta de estudio" id="ruta-eje">
              <dl className="grid gap-3">
                {[
                  ["Clínica y signos de alarma", e.clinica],
                  ["Diagnóstico diferencial", e.diferenciales],
                  ["Tratamiento", e.tratamiento],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-card-sm bg-sunken p-4">
                    <dt className="text-sm font-semibold">{k}</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          </div>

          <div className="flex flex-col gap-6">
            <Section title="Patologías troncales" id="patologias">
              <ul className="flex flex-wrap gap-2">
                {e.patologias.map((p) => (
                  <li key={p} className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm font-semibold">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted">
                Pasá cada una por la{" "}
                <Link href="/programa/metodo#plantilla" className="font-semibold text-accent-text underline-offset-2 hover:underline">
                  plantilla DFDCT
                </Link>{" "}
                ({PLANTILLA.length} apartados, de la definición a la integración).
              </p>
            </Section>

            <Section title="Casos para practicar" id="casos-eje">
              <CaseLinks cases={cases} played={played} max={6} moreHref={`/casos?eje=${e.id}`} />
            </Section>

            <Section title="Autoevaluación del eje" id="autoeval">
              <Card className="p-4">
                <ul className="flex flex-col">
                  {AUTOEVALUACION.map((q, i) => {
                    const key = `eval-${e.id}-${i}`;
                    return (
                      <li key={key}>
                        <Checkbox label={q} checked={done.has(key)} onChange={() => toggleRouteKey(key)} disabled={!db} />
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-2 text-xs text-muted">
                  Si no podés responder una, no releas todo: identificá qué vínculo falta y recuperá ese concepto.
                </p>
              </Card>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
