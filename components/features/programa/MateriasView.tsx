"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListPlus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import type { DB } from "@/lib/data/types";
import { fold } from "@/lib/plan-import/dates";
import { addMateriasToTemario, findSubjectFor } from "@/lib/mock/actions/programa";
import { useDB } from "@/lib/mock/store";
import { casesForMateria } from "@/lib/programa/match";
import { materiasByYear, OTRAS_MATERIAS, YEAR_LABEL } from "@/lib/programa/materias";
import type { Materia } from "@/lib/programa/types";
import { mastery } from "@/lib/syllabus";
import { ProgramaHeader } from "./bits";

/** Cuántas unidades de la materia ya están en el Temario y cuánto las dominás. */
export function temarioCoverage(db: DB | null, m: Materia) {
  if (!db) return null;
  const subject = findSubjectFor(db, m);
  if (!subject) return { subject: null, inTemario: 0, mastery: null as number | null, topics: [] as DB["syllabus_topics"] };
  const topics = db.syllabus_topics.filter((t) => t.subject_id === subject.id);
  const names = new Set(m.unidades.map((u) => fold(u.name)));
  const matched = topics.filter((t) => names.has(fold(t.name)));
  return { subject, inTemario: matched.length, mastery: mastery(matched), topics };
}

export function MateriasView() {
  const db = useDB();
  const toast = useToast();
  const router = useRouter();
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);

  function addAll() {
    const r = addMateriasToTemario();
    toast({
      message:
        r.topicsAdded === 0
          ? "Tu Temario ya tenía todas las unidades troncales."
          : `Sumé ${r.topicsAdded} temas${r.subjectsCreated ? ` y ${r.subjectsCreated} materias` : ""} al Temario. No toqué lo que ya tenías.`,
      actions: [{ label: "Ver Temario", onClick: () => router.push("/temario") }],
    });
  }

  return (
    <>
      <ProgramaHeader
        actions={
          <Button variant="secondary" onClick={addAll} disabled={!db}>
            <ListPlus aria-hidden /> Sumar todo al Temario
          </Button>
        }
      />
      <div className="flex flex-col gap-8">
        <p className="max-w-3xl text-[15px] leading-relaxed text-muted">
          Las 14 materias del plan integrado, en el año en que se cursan en la carrera de Medicina de la FCM-UNC, con las unidades troncales de sus programas
          oficiales (revisión 2024). Al sumarlas al Temario podés marcar tu nivel en cada unidad; lo que ya tenías cargado queda igual.
        </p>

        {materiasByYear().map(({ year, materias }) => (
          <section key={year} aria-labelledby={`anio-${year}`} className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 id={`anio-${year}`} className="text-xl font-semibold">
                {YEAR_LABEL[year]}
              </h2>
              <p className="text-xs text-muted">También en este año: {OTRAS_MATERIAS[year].join(" · ")}</p>
            </div>
            <ul className="grid gap-3 desk:grid-cols-2">
              {materias.map((m) => (
                <li key={m.id}>
                  <MateriaCard m={m} db={db} played={played} />
                </li>
              ))}
            </ul>
          </section>
        ))}

        <Card tone="sunken" className="text-sm text-muted">
          El año de cada materia sale del listado de asignaturas por año de la FCM-UNC; si tu cohorte cursa con otro plan o correlatividades, guiate por el
          tuyo. Las unidades están resumidas: la bibliografía y la profundidad las define cada cátedra.
        </Card>
      </div>
    </>
  );
}

function MateriaCard({ m, db, played }: { m: Materia; db: DB | null; played: Set<string> }) {
  const cov = temarioCoverage(db, m);
  const cases = m.match.all ? null : casesForMateria(m);
  const solved = cases?.filter((c) => played.has(c.id)).length ?? 0;
  return (
    <Link href={`/programa/materia/${m.id}`} className="flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-4 transition-colors hover:bg-sunken desk:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[17px] leading-snug font-semibold">{m.name}</h3>
          {m.official !== m.name && <p className="text-xs text-muted">{m.official}</p>}
        </div>
        <Chip tone="neutral">{m.unidades.length} unidades</Chip>
      </div>
      <p className="line-clamp-2 text-sm text-muted">{m.nucleos}</p>
      <div className="mt-auto flex flex-col gap-1.5">
        {cov && cov.inTemario > 0 ? (
          <>
            <p className="text-xs text-muted">
              En tu Temario: <span className="tabular">{cov.inTemario}</span>/{m.unidades.length} unidades · <span className="tabular">{cov.mastery ?? 0}</span>% dominado
            </p>
            <ProgressBar label={`Dominio de ${m.name}`} value={cov.mastery ?? 0} tone="sage" />
          </>
        ) : (
          <p className="text-xs text-muted">Todavía no está en tu Temario.</p>
        )}
        <p className="text-xs text-muted">
          {cases ? (
            <>
              <span className="tabular">{solved}</span>/<span className="tabular">{cases.length}</span> casos resueltos
            </>
          ) : (
            "Se integra en todos los casos clínicos"
          )}
        </p>
      </div>
    </Link>
  );
}
