"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ListPlus } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { fold } from "@/lib/plan-import/dates";
import { cycleTopicLevel } from "@/lib/mock/actions/syllabus";
import { addMateriasToTemario } from "@/lib/mock/actions/programa";
import { useDB } from "@/lib/mock/store";
import { EJES } from "@/lib/programa/ejes";
import { casesForMateria } from "@/lib/programa/match";
import { getMateria, YEAR_LABEL } from "@/lib/programa/materias";
import { LEVELS, nextLevel } from "@/lib/syllabus";
import { CaseLinks, ProgramaHeader, Section } from "./bits";
import { temarioCoverage } from "./MateriasView";

export function MateriaDetail({ id }: { id: string }) {
  const m = getMateria(id)!;
  const db = useDB();
  const toast = useToast();
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);
  const cov = temarioCoverage(db, m);
  const cases = m.match.all ? [] : casesForMateria(m);
  const ejes = EJES.map((e) => ({ e, fila: e.filas.find((f) => f.materia === m.id) }))
    .filter((x) => x.fila)
    .sort((a, b) => Number(a.fila!.peso === "secundaria") - Number(b.fila!.peso === "secundaria"));
  const parts = [...new Set(m.unidades.map((u) => u.part ?? ""))];
  const missing = cov ? m.unidades.length - cov.inTemario : m.unidades.length;

  function add() {
    const r = addMateriasToTemario([m.id]);
    toast({
      message: r.topicsAdded ? `Sumé ${r.topicsAdded} unidades de ${m.name} al Temario.` : `${m.name} ya tenía todas sus unidades en el Temario.`,
    });
  }

  return (
    <>
      <ProgramaHeader
        actions={
          missing > 0 && (
            <Button variant="primary" onClick={add} disabled={!db}>
              <ListPlus aria-hidden /> Sumar al Temario
            </Button>
          )
        }
      />
      <div className="flex flex-col gap-6">
        <Link href="/programa/materias" className="inline-flex items-center gap-1.5 self-start rounded-btn py-1 text-sm font-semibold text-accent-text hover:underline">
          <ArrowLeft aria-hidden className="size-4" /> Todas las materias
        </Link>

        <Card className="p-5 desk:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tone="accent">{YEAR_LABEL[m.year]}</Chip>
            <Chip tone="neutral">Área {m.area}</Chip>
          </div>
          <h2 className="mt-2 text-2xl font-semibold desk:text-[1.75rem]">{m.name}</h2>
          {m.official !== m.name && <p className="text-sm text-muted">{m.official}</p>}
          {m.yearNote && <p className="mt-1 text-sm text-muted">{m.yearNote}</p>}
          <p className="mt-4 text-[15px] leading-relaxed">
            <span className="font-semibold">Qué aporta: </span>
            {m.aporte}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed">
            <span className="font-semibold">Núcleos integradores: </span>
            {m.nucleos}
          </p>
        </Card>

        <div className="grid items-start gap-6 desk:grid-cols-[1.4fr_1fr]">
          <Section title="Unidades troncales del programa" id="unidades">
            {cov && cov.inTemario > 0 ? (
              <p className="text-sm text-muted">
                Tocá una unidad para cambiar tu nivel; se guarda en el Temario ({cov.subject?.name}).
              </p>
            ) : (
              <p className="text-sm text-muted">Sumala al Temario para marcar tu nivel en cada unidad.</p>
            )}
            {parts.map((part) => (
              <div key={part} className="flex flex-col gap-2">
                {part && <h3 className="text-sm font-semibold text-muted">{part}</h3>}
                <ol className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
                  {m.unidades
                    .filter((u) => (u.part ?? "") === part)
                    .map((u) => {
                      const topic = cov?.topics.find((t) => fold(t.name) === fold(u.name));
                      const level = topic ? LEVELS[topic.level] : null;
                      return (
                        <li key={u.name} className="flex items-start gap-3 p-3.5">
                          <div className="min-w-0 flex-1">
                            <p className="text-[15px] leading-snug font-semibold">{u.name}</p>
                            <p className="mt-0.5 text-sm text-muted">{u.detail}</p>
                          </div>
                          {topic && level && (
                            <button
                              type="button"
                              onClick={() => cycleTopicLevel(topic.id)}
                              aria-label={`${u.name}: ${level.label}. Tocá para pasar a ${LEVELS[nextLevel(topic.level)].label}.`}
                              className={cn("min-h-11 shrink-0 rounded-full border-[1.5px] px-3 text-xs font-semibold", level.className)}
                            >
                              {level.label}
                            </button>
                          )}
                        </li>
                      );
                    })}
                </ol>
              </div>
            ))}
          </Section>

          <div className="flex flex-col gap-6">
            <Section title="En qué ejes participa" id="ejes-materia">
              <ul className="flex flex-col gap-2">
                {ejes.map(({ e, fila }) => (
                  <li key={e.id}>
                    <Link href={`/programa/eje/${e.id}`} className="flex flex-col gap-1 rounded-card-sm border border-line bg-surface p-3.5 hover:bg-sunken">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-[15px] font-semibold">{e.title}</span>
                        <Chip tone={fila!.peso === "central" ? "sage" : "neutral"}>{fila!.peso === "central" ? "Central" : "Secundaria"}</Chip>
                      </span>
                      <span className="text-sm text-muted">{fila!.text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Casos para practicar" id="casos-materia">
              {m.match.all ? (
                <div className="flex flex-col gap-2">
                  <p className="text-[15px] leading-relaxed">
                    {m.name} entra en todos los casos: en cada resolución, la pestaña Explicación trae la lesión, el mecanismo y el territorio comprometido.
                  </p>
                  <Link href="/casos" className={buttonClasses({ variant: "secondary", className: "self-start" })}>
                    Ir a los casos
                  </Link>
                </div>
              ) : (
                <CaseLinks cases={cases} played={played} max={6} moreHref={`/casos?materia=${m.id}`} />
              )}
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
