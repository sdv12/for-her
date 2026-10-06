"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Gavel, MessageCircleQuestionMark } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useToast } from "@/components/ui/Toast";
import type { DB } from "@/lib/data/types";
import { saveSimulation } from "@/lib/mock/actions/simulations";
import { useDB } from "@/lib/mock/store";
import { buildTribunal, CHECK_ITEMS, nextSuelta, practiceOrder, STAGES, type SelfRating, type TribunalStep } from "@/lib/simulacro";
import { subjectColorVar } from "@/lib/subjects";
import { PracticePanel, type PracticeQuestion } from "./PracticePanel";
import { RatingChip } from "./RatingChip";
import { TribunalProgress } from "./TribunalProgress";

type Mode = "suelta" | "tribunal";
type Tribunal = { sessionId: string; steps: TribunalStep[]; index: number; results: Array<SelfRating | null> };

const MODES = [
  { value: "suelta", label: "Pregunta suelta" },
  { value: "tribunal", label: "Modo tribunal" },
] as const;

function subjectInfo(db: DB, subjectId: string | null) {
  const s = subjectId ? db.subjects.find((x) => x.id === subjectId) : null;
  return { subjectName: s?.name ?? null, subjectColor: s ? subjectColorVar(s.color) : null };
}

export function SimulacroView({ initialMode, questionId }: { initialMode: Mode; questionId: string | null }) {
  const db = useDB();
  const toast = useToast();
  const [mode, setMode] = useState<Mode>(initialMode);

  // Suelta
  const [sueltaSession] = useState(() => crypto.randomUUID());
  const [seen, setSeen] = useState<string[]>([]);
  const [currentId, setCurrentId] = useState<string | null | undefined>(undefined);
  const [round, setRound] = useState(0);

  // Tribunal
  const [tribunal, setTribunal] = useState<Tribunal | null>(null);

  const ordered = useMemo(() => (db ? practiceOrder(db.exam_questions, db.simulations) : []), [db]);
  if (db && currentId === undefined) {
    const fromLink = questionId && db.exam_questions.some((q) => q.id === questionId) ? questionId : null;
    setCurrentId(fromLink ?? nextSuelta(ordered, [])?.id ?? null);
  }

  function changeMode(m: Mode) {
    setMode(m);
    // Solo actualiza la URL (para compartir/volver); sin navegar, así no se pierde una sesión en curso.
    window.history.replaceState(null, "", `/simulacro?modo=${m}`);
  }

  const header = (
    <PageHeader
      kicker="Estudiar"
      title="Simulacro y tribunal"
      backHref="/mas"
      backLabel="Volver a Más"
      actions={<SegmentedControl label="Modo" options={MODES} value={mode} onChange={changeMode} />}
    />
  );

  if (!db) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="h-96 animate-pulse rounded-card bg-sunken" />
      </>
    );
  }

  function goNextSuelta(current: string) {
    const nextSeen = [...seen, current];
    setSeen(nextSeen);
    setCurrentId(nextSuelta(ordered, nextSeen)?.id ?? null);
    setRound((r) => r + 1);
  }

  let body: React.ReactNode;

  if (mode === "suelta") {
    const q = currentId ? db.exam_questions.find((x) => x.id === currentId) : null;
    body = !q ? (
      <EmptyState
        icon={MessageCircleQuestionMark}
        title="Todavía no hay preguntas para practicar"
        action={
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/preguntas?nueva=1" className={buttonClasses({ variant: "primary" })}>
              Anotar una pregunta
            </Link>
            <Button variant="secondary" onClick={() => changeMode("tribunal")}>
              Probar el modo tribunal
            </Button>
          </div>
        }
      >
        La pregunta suelta sale de tu banco de Preguntas de examen. El tribunal funciona igual, con preguntas de respaldo.
      </EmptyState>
    ) : (
      <PracticePanel
        key={`${q.id}-${round}`}
        question={{ text: q.text, source: q.source, ...subjectInfo(db, q.subject_id) }}
        nextLabel="Otra pregunta"
        onNext={() => goNextSuelta(q.id)}
        onRate={(rating, checks, duration) => {
          saveSimulation({
            mode: "suelta",
            session_id: sueltaSession,
            stage: null,
            question_id: q.id,
            question_text: q.text,
            checks,
            rating,
            duration_sec: duration,
          });
          if (rating !== "flojo") {
            toast({ message: rating === "solido" ? "Sólida. Vamos con otra." : "Guardada como aceptable. Vamos con otra." });
            goNextSuelta(q.id);
          }
        }}
      />
    );
  } else if (!tribunal) {
    body = (
      <Card className="p-6 desk:p-8">
        <Gavel aria-hidden className="size-7 text-accent-text" />
        <h2 className="mt-3 text-2xl font-semibold">Como en la mesa: primero básicas, después clínica</h2>
        <p className="mt-2 max-w-2xl text-[15px] text-muted">
          Cinco preguntas seguidas, en el orden en que suele preguntar el tribunal. Si las básicas salen firmes, llegás a mostrar la clínica.
        </p>
        <ol className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
          {STAGES.map((s, i) => (
            <li key={s} className="rounded-full bg-sunken px-3 py-1.5">
              {i + 1}. {s}
            </li>
          ))}
        </ol>
        <Button
          variant="primary"
          size="lg"
          className="mt-6"
          onClick={() =>
            setTribunal({
              sessionId: crypto.randomUUID(),
              steps: buildTribunal(db.exam_questions, db.subjects, db.simulations),
              index: 0,
              results: STAGES.map(() => null),
            })
          }
        >
          Empezar tribunal
        </Button>
      </Card>
    );
  } else if (tribunal.index >= tribunal.steps.length) {
    const rated = tribunal.results.filter(Boolean).length;
    const solid = tribunal.results.filter((r) => r === "solido").length;
    body = (
      <Card className="p-6 desk:p-8">
        <h2 className="text-2xl font-semibold">Tribunal terminado</h2>
        <p className="mt-1 text-[15px] text-muted">
          {rated} de {tribunal.steps.length} etapas evaluadas · {solid} sólidas. Lo flojo quedó en Errores para repasarlo antes del próximo.
        </p>
        <ol className="mt-5 flex flex-col divide-y divide-line">
          {tribunal.steps.map((s, i) => (
            <li key={s.stage} className="flex items-start gap-3 py-3">
              <span className="tabular w-6 shrink-0 font-display text-lg font-bold text-muted">{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted">{s.stage}</p>
                <p className="text-[15px] leading-snug font-semibold">{s.text}</p>
              </div>
              <RatingChip rating={tribunal.results[i]} />
            </li>
          ))}
        </ol>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button variant="primary" onClick={() => setTribunal(null)}>
            Otro tribunal
          </Button>
          <Link href="/errores" className={buttonClasses({ variant: "secondary" })}>
            Ver errores
          </Link>
        </div>
      </Card>
    );
  } else {
    const step = tribunal.steps[tribunal.index];
    const advance = (rating: SelfRating | null) =>
      setTribunal((t) => t && { ...t, index: t.index + 1, results: t.results.map((r, i) => (i === t.index && rating ? rating : r)) });
    const question: PracticeQuestion = { text: step.text, source: step.source, stage: step.stage, ...subjectInfo(db, step.subjectId) };
    body = (
      <div className="flex flex-col gap-4">
        <TribunalProgress index={tribunal.index} />
        <PracticePanel
          key={`${tribunal.sessionId}-${tribunal.index}`}
          question={question}
          nextLabel={tribunal.index === tribunal.steps.length - 1 ? "Terminar el tribunal" : "Siguiente del tribunal"}
          onNext={() => advance(null)}
          onRate={(rating, checks, duration) => {
            saveSimulation({
              mode: "tribunal",
              session_id: tribunal.sessionId,
              stage: step.stage,
              question_id: step.questionId,
              question_text: step.text,
              checks,
              rating,
              duration_sec: duration,
            });
            if (rating === "flojo") {
              setTribunal((t) => t && { ...t, results: t.results.map((r, i) => (i === t.index ? rating : r)) });
            } else {
              advance(rating);
            }
          }}
        />
      </div>
    );
  }

  return (
    <>
      {header}
      <div className="flex flex-col gap-8">
        {body}
        <History db={db} />
      </div>
    </>
  );
}

function History({ db }: { db: DB }) {
  const recent = [...db.simulations].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 8);
  if (recent.length === 0) return null;
  return (
    <section aria-labelledby="historial">
      <h2 id="historial" className="mb-3 text-lg font-semibold">
        Últimas prácticas
      </h2>
      <ul className="flex flex-col divide-y divide-line rounded-card border border-line bg-surface">
        {recent.map((s) => {
          const covered = CHECK_ITEMS.filter((i) => s.checks[i.key]).length;
          return (
            <li key={s.id} className="flex items-start gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted">
                  {format(new Date(s.created_at), "d MMM, HH:mm", { locale: es })} · {s.mode === "tribunal" ? `Tribunal · ${s.stage}` : "Suelta"} · cubriste{" "}
                  {covered}/5
                </p>
                <p className="line-clamp-2 text-[15px] leading-snug">{s.question_text}</p>
              </div>
              <RatingChip rating={s.rating} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
