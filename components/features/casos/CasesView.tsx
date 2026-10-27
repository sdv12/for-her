"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dices, Stethoscope, Trophy } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SelectField } from "@/components/ui/Field";
import { Chip, Pill } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { CASES } from "@/lib/cases";
import { ageBand, FREQUENCY_LABEL, LEVEL_LABEL, patientLabel, rankFor, type AgeBand } from "@/lib/cases/engine";
import type { CaseArea, CaseLevel, ClinicalCase, Sex } from "@/lib/cases/types";
import type { CaseAttempt } from "@/lib/data/types";
import { useDB } from "@/lib/mock/store";
import { PatientIcon, Stars } from "./bits";

type Filters = { level: CaseLevel | 0; band: AgeBand | ""; sex: Sex | ""; area: CaseArea | ""; state: "todos" | "nuevos" | "resueltos" | "mejorar" };
const INITIAL: Filters = { level: 0, band: "", sex: "", area: "", state: "todos" };
const BANDS: AgeBand[] = ["Lactantes", "Niñez", "Adolescencia", "Adultez", "Adultez mayor"];

/** Mejor intento de cada caso (más estrellas). */
function bestAttempts(attempts: CaseAttempt[]) {
  const best = new Map<string, CaseAttempt>();
  for (const a of attempts) {
    const total = a.stars_dx + a.stars_studies + a.stars_management;
    const prev = best.get(a.case_id);
    if (!prev || total > prev.stars_dx + prev.stars_studies + prev.stars_management) best.set(a.case_id, a);
  }
  return best;
}

const total = (a: CaseAttempt) => a.stars_dx + a.stars_studies + a.stars_management;

function matchesState(state: Filters["state"], best: CaseAttempt | undefined) {
  if (state === "todos") return true;
  if (state === "nuevos") return !best;
  if (state === "resueltos") return !!best;
  return !!best && total(best) < 7; // "Para mejorar": resuelto con menos de 7 de 9 estrellas
}

export function CasesView() {
  const db = useDB();
  const router = useRouter();
  const [f, setF] = useState<Filters>(INITIAL);

  const attempts = useMemo(() => db?.case_attempts ?? [], [db]);
  const best = useMemo(() => bestAttempts(attempts), [attempts]);
  const xp = attempts.reduce((n, a) => n + a.xp, 0);
  const rank = rankFor(xp);
  const areas = [...new Set(CASES.map((c) => c.area))].sort();

  const list = CASES.filter(
    (c) =>
      (!f.level || c.level === f.level) &&
      (!f.band || ageBand(c.patient) === f.band) &&
      (!f.sex || c.patient.sex === f.sex) &&
      (!f.area || c.area === f.area) &&
      matchesState(f.state, best.get(c.id)),
  );

  function random() {
    // Prioriza los que todavía no jugaste dentro del filtro actual.
    const pool = list.filter((c) => !best.has(c.id));
    const from = pool.length ? pool : list;
    if (!from.length) return;
    const pick = from[Math.floor(Math.random() * from.length)];
    router.push(`/casos/${pick.id}`);
  }

  return (
    <>
      <PageHeader
        kicker="Estudiar"
        title="Casos clínicos"
        backHref="/mas"
        backLabel="Volver a Más"
        actions={
          <Button variant="primary" onClick={random} disabled={!list.length}>
            <Dices aria-hidden /> Caso al azar
          </Button>
        }
      />

      <div className="flex flex-col gap-5">
        <Card className="flex flex-col gap-4 desk:flex-row desk:items-center">
          <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-honey-soft text-ink">
            <Trophy aria-hidden className="size-6" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-muted">Tu rango</p>
            <p className="font-display text-2xl font-semibold tracking-[-0.02em]">{rank.title}</p>
            <ProgressBar label="Progreso al próximo rango" value={rank.progress} max={1} tone="honey" className="mt-2" />
            <p className="mt-1 text-xs text-muted">
              <span className="tabular">{xp}</span> de experiencia
              {rank.next ? ` · ${rank.next.at - xp} para ${rank.next.title}` : " · rango máximo"}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center desk:w-64">
            <div>
              <p className="tabular font-display text-3xl font-semibold">
                {best.size}
                <span className="text-lg text-muted">/{CASES.length}</span>
              </p>
              <p className="text-xs text-muted">casos resueltos</p>
            </div>
            <div>
              <p className="tabular font-display text-3xl font-semibold">{[...best.values()].reduce((n, a) => n + a.stars_dx + a.stars_studies + a.stars_management, 0)}</p>
              <p className="text-xs text-muted">estrellas</p>
            </div>
          </div>
        </Card>

        <section aria-label="Filtros" className="flex flex-col gap-3">
          <div role="group" aria-label="Nivel" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 desk:mx-0 desk:flex-wrap desk:px-0">
            <Pill selected={f.level === 0} onClick={() => setF({ ...f, level: 0 })}>
              Todos los niveles
            </Pill>
            {([1, 2, 3, 4] as const).map((l) => (
              <Pill key={l} selected={f.level === l} onClick={() => setF({ ...f, level: l })}>
                {LEVEL_LABEL[l]}
              </Pill>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 desk:grid-cols-4">
            <SelectField label="Edad" value={f.band} onChange={(e) => setF({ ...f, band: e.target.value as AgeBand | "" })}>
              <option value="">Todas</option>
              {BANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </SelectField>
            <SelectField label="Sexo" value={f.sex} onChange={(e) => setF({ ...f, sex: e.target.value as Sex | "" })}>
              <option value="">Todos</option>
              <option value="F">Femenino</option>
              <option value="M">Masculino</option>
            </SelectField>
            <SelectField label="Área" value={f.area} onChange={(e) => setF({ ...f, area: e.target.value as CaseArea | "" })}>
              <option value="">Todas</option>
              {areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </SelectField>
            <SelectField label="Estado" value={f.state} onChange={(e) => setF({ ...f, state: e.target.value as Filters["state"] })}>
              <option value="todos">Todos</option>
              <option value="nuevos">Sin resolver</option>
              <option value="resueltos">Resueltos</option>
              <option value="mejorar">Para mejorar</option>
            </SelectField>
          </div>
        </section>

        <p className="text-sm text-muted" aria-live="polite">
          {list.length} {list.length === 1 ? "caso" : "casos"}
        </p>

        {list.length === 0 ? (
          <div className="rounded-card border border-dashed border-line px-6 py-10 text-center">
            <p className="text-[15px] text-muted">Ningún caso coincide con esos filtros.</p>
            <Button variant="ghost" className="mt-2" onClick={() => setF(INITIAL)}>
              Limpiar filtros
            </Button>
          </div>
        ) : (
          <ul className="grid gap-3 desk:grid-cols-2">
            {list.map((c) => (
              <li key={c.id}>
                <CaseCard c={c} best={best.get(c.id)} />
              </li>
            ))}
          </ul>
        )}

        <p className="flex items-start gap-2 text-xs text-muted">
          <Stethoscope aria-hidden className="mt-0.5 size-4 shrink-0" />
          Casos de estudio basados en normativas, guías y consensos usados en Argentina. Son material de práctica: ante una duda, consultá la fuente
          original que figura en cada resolución.
        </p>
      </div>
    </>
  );
}

function CaseCard({ c, best }: { c: ClinicalCase; best: CaseAttempt | undefined }) {
  const principal = c.debrief.pathologies.find((p) => p.role === "principal")?.name;
  return (
    <Link
      href={`/casos/${c.id}`}
      className="flex h-full flex-col gap-3 rounded-card border border-line bg-surface p-4 transition-colors hover:bg-sunken desk:p-5"
    >
      <div className="flex items-start gap-3">
        <PatientIcon patient={c.patient} />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] leading-snug font-semibold">{patientLabel(c.patient)}</p>
          <p className="text-xs text-muted">
            {c.setting} · {c.area}
          </p>
        </div>
        <Chip tone={c.level >= 3 ? "accent" : "neutral"}>{LEVEL_LABEL[c.level]}</Chip>
      </div>
      <p className="line-clamp-2 text-sm text-ink/85">{c.intro}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Chip tone={c.frequency === "raro" || c.frequency === "poco-frecuente" ? "honey" : "sage"}>{FREQUENCY_LABEL[c.frequency]}</Chip>
        {best ? (
          <span className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-muted">
            <span className="hidden sm:inline">{principal}</span>
            <Stars value={Math.round((best.stars_dx + best.stars_studies + best.stars_management) / 3)} label="Mejor resultado" size="sm" />
          </span>
        ) : (
          <span className="ml-auto text-xs font-semibold text-accent-text">Nuevo</span>
        )}
      </div>
    </Link>
  );
}
