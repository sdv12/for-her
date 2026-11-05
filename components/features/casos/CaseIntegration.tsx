import Link from "next/link";
import type { ClinicalCase } from "@/lib/cases/types";
import { ejesForCase, materiasForCase } from "@/lib/programa/match";
import { YEAR_LABEL } from "@/lib/programa/materias";

/** Ejes y materias del Programa integrado que pone en juego el caso. */
export function CaseIntegration({ c }: { c: ClinicalCase }) {
  const ejes = ejesForCase(c);
  const materias = [...materiasForCase(c)].sort((a, b) => a.year - b.year);
  return (
    <div className="flex flex-col gap-3 text-[15px]">
      {ejes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-muted">Ejes clínicos</p>
          <ul className="mt-1.5 flex flex-wrap gap-2">
            {ejes.map((e) => (
              <li key={e.id}>
                <Link href={`/programa/eje/${e.id}`} className="inline-flex min-h-9 items-center rounded-full bg-sunken px-3 text-sm font-semibold hover:bg-line/60">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <p className="text-sm font-semibold text-muted">Materias</p>
        <ul className="mt-1.5 flex flex-wrap gap-2">
          {materias.map((m) => (
            <li key={m.id}>
              <Link
                href={`/programa/materia/${m.id}`}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line px-3 text-sm font-semibold hover:bg-sunken"
              >
                {m.name}
                <span className="font-normal text-muted">{YEAR_LABEL[m.year]}</span>
              </Link>
            </li>
          ))}
          <li className="inline-flex min-h-9 items-center px-1 text-sm text-muted">+ Anatomía y Patología, como en todo caso</li>
        </ul>
      </div>
      <p className="text-sm text-muted">
        Para cerrarlo, contalo con la{" "}
        <Link href="/programa/metodo#plantilla" className="font-semibold text-accent-text underline-offset-2 hover:underline">
          plantilla DFDCT
        </Link>
        : definición, fisiopatología, diagnóstico, clínica y tratamiento, más complicaciones, prevención e integración.
      </p>
    </div>
  );
}
