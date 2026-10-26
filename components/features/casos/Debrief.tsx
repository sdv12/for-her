"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Dices, Layers, Lightbulb, RotateCcw, TriangleAlert, Trophy } from "lucide-react";
import { CardSheet } from "@/components/features/tarjetas/CardSheet";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import { CASES } from "@/lib/cases";
import { coverage, patientLabel, rankFor, reviewPicks, type CaseScore } from "@/lib/cases/engine";
import type { CaseAction, ClinicalCase, Pathology } from "@/lib/cases/types";
import type { CaseAttempt } from "@/lib/data/types";
import { createCard } from "@/lib/mock/actions/cards";
import { useDB } from "@/lib/mock/store";
import { RelevanceBadge, Stars } from "./bits";

export type Outcome = { attempt: CaseAttempt; score: CaseScore; mistake: boolean; minutes: number };
type Picks = { asked: string[]; examined: string[]; studies: string[]; mgmt: string[] };

const ROLE_LABEL: Record<Pathology["role"], string> = { principal: "Diagnóstico", diferencial: "Diferencial", asociada: "Asociada" };

function headline(total: number) {
  if (total >= 9) return "Caso redondo.";
  if (total >= 7) return "Muy bien resuelto.";
  if (total >= 5) return "Bien encaminado.";
  return "Ya lo jugaste: ahora repasalo con calma.";
}

export function Debrief({ c, outcome, picks, onRetry }: { c: ClinicalCase; outcome: Outcome; picks: Picks; onRetry: () => void }) {
  const db = useDB();
  const router = useRouter();
  const toast = useToast();
  const [cardOpen, setCardOpen] = useState(false);
  const { score } = outcome;

  const totalXp = (db?.case_attempts ?? []).reduce((n, a) => n + a.xp, 0);
  const before = rankFor(totalXp - score.xp);
  const after = rankFor(totalXp);
  const rankUp = before.title !== after.title;

  const studiesReview = reviewPicks(c.studies, picks.studies);
  const mgmtReview = reviewPicks(c.management.options, picks.mgmt);
  const anam = coverage(c.anamnesis, picks.asked);
  const exam = coverage(c.exam, picks.examined);

  const subjects = db ? [...db.subjects].sort((a, b) => a.sort - b.sort) : [];
  const clinica = subjects.find((s) => s.name === "Clínica") ?? subjects[0];

  function nextRandom() {
    const solved = new Set((db?.case_attempts ?? []).map((a) => a.case_id));
    const pool = CASES.filter((x) => x.id !== c.id && !solved.has(x.id));
    const from = pool.length ? pool : CASES.filter((x) => x.id !== c.id);
    router.push(`/casos/${from[Math.floor(Math.random() * from.length)].id}`);
  }

  return (
    <div className="flex flex-col gap-5">
      <Card tone="hero" className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold opacity-80">{headline(score.total)}</p>
          <h2 className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] desk:text-3xl">{c.debrief.diagnosis}</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 rounded-[14px] bg-surface p-4 text-ink">
          {(
            [
              ["Diagnóstico", score.dx],
              ["Estudios", score.studies],
              ["Conducta", score.management],
            ] as const
          ).map(([label, v]) => (
            <div key={label} className="flex flex-col items-center gap-1 text-center">
              <Stars value={v} label={label} />
              <span className="text-xs font-semibold text-muted">{label}</span>
            </div>
          ))}
        </div>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <Trophy aria-hidden className="size-4" /> +{score.xp} de experiencia
          </span>
          {rankUp ? <span>Subiste a {after.title}.</span> : <span>Rango: {after.title}.</span>}
          {outcome.minutes >= 3 && <span className="opacity-80">{outcome.minutes} min sumados a Registros.</span>}
          {outcome.mistake && <span className="opacity-80">El diagnóstico errado quedó en Errores para repasar.</span>}
        </p>
      </Card>

      <Section title="Patologías en juego">
        <ul className="flex flex-col gap-3">
          {c.debrief.pathologies.map((p) => (
            <li key={p.name} className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{p.name}</span>
                <Chip tone={p.role === "principal" ? "sage" : p.role === "asociada" ? "accent" : "neutral"}>{ROLE_LABEL[p.role]}</Chip>
              </div>
              <p className="text-sm leading-relaxed text-ink/85">{p.why}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="El porqué: causa, mecanismo, clínica">
        <ol className="flex flex-col gap-2">
          {c.debrief.reasoning.map((r, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed">
              <span className="tabular mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold">
                {i + 1}
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="Por qué en esta edad y sexo">
        <p className="text-[15px] leading-relaxed">{c.debrief.epidemiology}</p>
      </Section>

      <Section title="Tu recorrido">
        <div className="flex flex-col gap-5">
          <PathBlock
            title={`Interrogatorio: ${anam.hit} de ${anam.of} preguntas clave`}
            missed={c.anamnesis.filter((a) => a.relevance === "clave" && !picks.asked.includes(a.id))}
          />
          <PathBlock
            title={`Examen físico: ${exam.hit} de ${exam.of} maniobras clave`}
            missed={c.exam.filter((a) => a.relevance === "clave" && !picks.examined.includes(a.id))}
          />
          <div className="flex flex-col gap-2">
            <h3 className="text-[15px] font-semibold">Estudios</h3>
            {studiesReview.keyMissed.length + studiesReview.wasted.length + studiesReview.risky.length === 0 ? (
              <p className="text-sm text-muted">Pediste lo justo.</p>
            ) : (
              <ReviewList items={[...studiesReview.risky, ...studiesReview.keyMissed, ...studiesReview.wasted]} missed={studiesReview.keyMissed} />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[15px] font-semibold">Conducta</h3>
            {mgmtReview.keyMissed.length + mgmtReview.wasted.length + mgmtReview.risky.length === 0 ? (
              <p className="text-sm text-muted">Elegiste todo lo clave y nada de más.</p>
            ) : (
              <ReviewList items={[...mgmtReview.risky, ...mgmtReview.keyMissed, ...mgmtReview.wasted]} missed={mgmtReview.keyMissed} />
            )}
          </div>
        </div>
      </Section>

      <Section title="Conducta según las normativas">
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-relaxed">
          {c.debrief.management.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ol>
      </Section>

      <div className="grid gap-5 desk:grid-cols-2">
        <Section title="Perlas para el tribunal" icon={<Lightbulb aria-hidden className="size-5" />}>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed">
            {c.debrief.pearls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Section>
        <Section title="Errores frecuentes" icon={<TriangleAlert aria-hidden className="size-5" />}>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-[15px] leading-relaxed">
            {c.debrief.pitfalls.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Fuentes" icon={<BookOpen aria-hidden className="size-5" />}>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted">
          {c.debrief.sources.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Section>

      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={nextRandom}>
          <Dices aria-hidden /> Otro caso al azar
        </Button>
        <Button variant="secondary" onClick={() => setCardOpen(true)} disabled={!clinica}>
          <Layers aria-hidden /> Pasar a tarjeta
        </Button>
        <Button variant="ghost" onClick={onRetry}>
          <RotateCcw aria-hidden /> Jugarlo de nuevo
        </Button>
        <Link href="/casos" className={buttonClasses({ variant: "ghost" })}>
          Volver a casos
        </Link>
      </div>

      {cardOpen && clinica && (
        <CardSheet
          card={null}
          subjects={subjects}
          prefill={{
            front: `${patientLabel(c.patient)}: ${c.intro}\n¿Diagnóstico y conducta?`,
            back: `${c.debrief.diagnosis}\n\n${c.debrief.management.map((m, i) => `${i + 1}. ${m}`).join("\n")}`,
            subject_id: clinica.id,
            tags: "caso clínico",
          }}
          onClose={() => setCardOpen(false)}
          onSave={(input) => {
            createCard(input, { source: "Caso clínico", source_ref: c.id });
            setCardOpen(false);
            toast({ message: "Tarjeta creada. Ya está para repasar." });
          }}
        />
      )}
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        {icon}
        {title}
      </h2>
      {children}
    </Card>
  );
}

function PathBlock({ title, missed }: { title: string; missed: CaseAction[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[15px] font-semibold">{title}</h3>
      {missed.length === 0 ? (
        <p className="text-sm text-muted">No te faltó nada clave.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {missed.map((a) => (
            <li key={a.id} className="rounded-[12px] bg-sunken px-3 py-2.5 text-sm leading-relaxed">
              <p className="font-semibold">Te faltó: {a.label}</p>
              <p className="text-muted">{a.result}</p>
              <p className="mt-1">{a.why}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReviewList({ items, missed }: { items: Array<{ id: string; label: string; relevance: CaseAction["relevance"]; why: string }>; missed: { id: string }[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((a) => (
        <li key={a.id} className="rounded-[12px] bg-sunken px-3 py-2.5 text-sm leading-relaxed">
          <div className="flex items-start gap-2">
            <p className="min-w-0 flex-1 font-semibold">
              {missed.some((m) => m.id === a.id) ? "Te faltó: " : "Elegiste: "}
              {a.label}
            </p>
            <RelevanceBadge value={a.relevance} />
          </div>
          <p className="mt-1">{a.why}</p>
        </li>
      ))}
    </ul>
  );
}
