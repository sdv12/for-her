import Link from "next/link";
import { BookOpenCheck, Moon, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import {
  AUTOEVALUACION,
  BLOQUES,
  COMO_USARLO,
  CRITERIO_AVANCE,
  FUENTES,
  IDEA_FINAL,
  PIE_DIABETICO,
  PLANTILLA,
  RECUPERACION,
  REGLA,
  SEMANA_TIPO,
} from "@/lib/programa/metodo";
import { ProgramaHeader, Section } from "./bits";

const RECUPERACION_LINKS: Record<string, { href: string; label: string }> = {
  Espaciada: { href: "/tarjetas/repasar", label: "Repasar tarjetas" },
  Aplicación: { href: "/casos", label: "Ir a los casos" },
  Inmediata: { href: "/simulacro", label: "Simulacro oral" },
};

export function MetodoView() {
  return (
    <>
      <ProgramaHeader />
      <div className="flex flex-col gap-8">
        <Section title="Cómo se reparte el día" id="dia">
          <div className="grid gap-3 desk:grid-cols-2">
            {BLOQUES.map((b) => {
              const Icon = b.name === "Mañana" ? Sun : Moon;
              return (
                <Card key={b.name} className="p-5">
                  <h3 className="flex items-center gap-2 text-[17px] font-semibold">
                    <Icon aria-hidden className="size-5 text-accent-text" /> {b.name} · {b.minutes} minutos
                  </h3>
                  <ol className="mt-3 flex flex-col gap-2">
                    {b.steps.map((s) => (
                      <li key={s.text} className="flex gap-3 text-[15px] leading-snug">
                        <span className="tabular w-14 shrink-0 font-semibold text-muted">{s.min} min</span>
                        <span>{s.text}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              );
            })}
          </div>
          <p className="rounded-card-sm bg-accent-soft p-4 text-[15px]">
            <span className="font-semibold">Regla: </span>
            {REGLA}
          </p>
        </Section>

        <Section title="La semana tipo" id="semana">
          <div className="overflow-x-auto rounded-card border border-line bg-surface">
            <table className="w-full min-w-[32rem] text-left text-[15px]">
              <caption className="sr-only">Qué se estudia cada día, a la mañana y a la noche</caption>
              <thead className="bg-sunken text-sm text-muted">
                <tr>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Día
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Mañana
                  </th>
                  <th scope="col" className="px-4 py-2.5 font-semibold">
                    Noche
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SEMANA_TIPO.map((d) => (
                  <tr key={d.day}>
                    <th scope="row" className="px-4 py-2.5 font-semibold">
                      {d.day}
                    </th>
                    <td className="px-4 py-2.5">{d.morning}</td>
                    <td className="px-4 py-2.5">{d.night}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted">
            La{" "}
            <Link href="/programa/ruta" className="font-semibold text-accent-text underline-offset-2 hover:underline">
              ruta de 12 semanas
            </Link>{" "}
            ya trae cada día armado con este esquema y el eje de la semana.
          </p>
        </Section>

        <div className="grid items-start gap-8 desk:grid-cols-2">
          <Section title="Plantilla de razonamiento clínico" id="plantilla">
            <p className="text-sm text-muted">Para cada enfermedad, la misma estructura. No hace falta escribir páginas: tenés que poder responder cada apartado en voz alta.</p>
            <ol className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
              {PLANTILLA.map((p, i) => (
                <li key={p.apartado} className="flex gap-3 p-3.5">
                  <span className="tabular inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold">{i + 1}</span>
                  <span>
                    <span className="block font-semibold">{p.apartado}</span>
                    <span className="block text-sm text-muted">{p.pregunta}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Ejemplo integrador: pie diabético" id="pie-diabetico">
            <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-surface">
              {PIE_DIABETICO.map((r) => (
                <div key={r.dimension} className="p-3.5">
                  <dt className="font-semibold">{r.dimension}</dt>
                  <dd className="text-[15px] text-ink/85">{r.aplicacion}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm text-muted">
              Un caso permite recuperar Anatomía, Patología, Farmacología, Infectología, Dermatología, Traumatología, Cirugía y Salud Comunitaria.{" "}
              <Link href="/casos/pie-diabetico-infectado" className="font-semibold text-accent-text underline-offset-2 hover:underline">
                Jugalo como caso
              </Link>
              .
            </p>
          </Section>
        </div>

        <div className="grid items-start gap-8 desk:grid-cols-2">
          <Section title="Tres instancias de recuperación" id="recuperacion">
            <p className="text-sm text-muted">El avance no se mide en páginas leídas, sino en lo que podés recuperar, explicar y aplicar.</p>
            <ul className="flex flex-col gap-2">
              {RECUPERACION.map((r) => (
                <li key={r.name} className="flex flex-wrap items-center justify-between gap-2 rounded-card-sm bg-sunken p-4">
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{r.name}</span>
                    <span className="block text-[15px]">{r.text}</span>
                  </span>
                  {RECUPERACION_LINKS[r.name] && (
                    <Link href={RECUPERACION_LINKS[r.name].href} className="rounded-btn py-2 text-sm font-semibold text-accent-text hover:underline">
                      {RECUPERACION_LINKS[r.name].label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Autoevaluación semanal" id="autoevaluacion">
            <ul className="flex flex-col gap-2 rounded-card border border-line bg-surface p-4">
              {AUTOEVALUACION.map((q) => (
                <li key={q} className="flex gap-2.5 text-[15px]">
                  <BookOpenCheck aria-hidden className="mt-0.5 size-4 shrink-0 text-accent-text" />
                  {q}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">Cada eje tiene esta lista para tildar en su página.</p>
          </Section>
        </div>

        <Section title="Cómo usarlo" id="uso">
          <ol className="flex list-decimal flex-col gap-1.5 pl-5 text-[15px] leading-relaxed">
            {COMO_USARLO.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ol>
          <p className="rounded-card-sm bg-honey-soft p-4 text-[15px]">
            <span className="font-semibold">Criterio para avanzar: </span>
            {CRITERIO_AVANCE}
          </p>
          <p className="text-[15px] leading-relaxed">
            <span className="font-semibold">Idea final: </span>
            {IDEA_FINAL}
          </p>
        </Section>

        <Card tone="sunken" className="flex flex-col gap-2 text-sm text-muted">
          <p>
            Es un mapa de integración académica, no una matriz oficial de contenidos: las relaciones entre materias son orientativas y conviene validarlas con
            los programas, las clases y los exámenes de cada cátedra.
          </p>
          <p className="font-semibold text-ink">Fuentes</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            {FUENTES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
