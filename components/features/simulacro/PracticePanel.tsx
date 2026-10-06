"use client";

import { useEffect, useState } from "react";
import { Play, Square } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip, Dot } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import { CHECK_ITEMS, emptyChecks, missingText, SELF_RATINGS, SUGGESTED_SECONDS, type Checks, type SelfRating } from "@/lib/simulacro";

export type PracticeQuestion = {
  text: string;
  subjectName: string | null;
  subjectColor: string | null;
  source: string | null;
  stage?: string;
};

type Props = {
  question: PracticeQuestion;
  onRate: (rating: SelfRating, checks: Checks, durationSec: number | null) => void;
  /** Pasar sin calificar ("Otra pregunta" / "Siguiente del tribunal"). */
  onNext: () => void;
  nextLabel: string;
};

const RATING_STYLE: Record<SelfRating, string> = {
  flojo: "bg-accent-soft",
  aceptable: "bg-honey-soft",
  solido: "bg-sage-soft",
};

function mmss(total: number) {
  const s = Math.abs(total);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Una pregunta para responder en voz alta: timer opcional (por diferencia de tiempo, no restando segundos),
 * checklist "¿Qué cubriste?" y autoevaluación. Aceptable/Sólido avanzan; Flojo ofrece reintentar.
 */
export function PracticePanel({ question, onRate, onNext, nextLabel }: Props) {
  const [checks, setChecks] = useState<Checks>(emptyChecks);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [stoppedAt, setStoppedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [flojo, setFlojo] = useState(false);

  const running = startedAt !== null && stoppedAt === null;
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(id);
  }, [running]);

  const elapsed = startedAt === null ? 0 : Math.floor(((stoppedAt ?? now) - startedAt) / 1000);
  const remaining = SUGGESTED_SECONDS - elapsed;

  function rate(rating: SelfRating) {
    onRate(rating, checks, startedAt === null ? null : elapsed);
    if (rating === "flojo") {
      setFlojo(true);
      setStoppedAt((s) => s ?? Date.now());
    }
  }

  function retry() {
    setChecks(emptyChecks());
    setStartedAt(null);
    setStoppedAt(null);
    setFlojo(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <Card className="p-6 desk:p-8">
        <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
          {question.stage && <Chip tone="accent">{question.stage}</Chip>}
          {question.subjectName && question.subjectName !== question.stage && (
            <span className="inline-flex items-center gap-1.5">
              {question.subjectColor && <Dot color={question.subjectColor} />} {question.subjectName}
            </span>
          )}
          {question.source && <span>· {question.source}</span>}
        </div>
        <h2 className="mt-3 font-display text-[1.6rem] leading-tight font-semibold desk:text-[2.1rem]">{question.text}</h2>
        <p className="mt-3 text-[15px] text-muted">Respondé en voz alta como si estuvieras frente a la mesa.</p>

        <div className="mt-6 flex flex-wrap items-center gap-4 rounded-card-sm bg-sunken p-4">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-muted">{startedAt === null ? "Tiempo sugerido" : remaining >= 0 ? "Te quedan" : "Te pasaste"}</p>
            <p className="tabular font-display text-3xl font-semibold tracking-[-0.03em]" aria-live="off">
              {startedAt === null ? mmss(SUGGESTED_SECONDS) : remaining >= 0 ? mmss(remaining) : `+${mmss(remaining)}`}
            </p>
          </div>
          {startedAt === null ? (
            <Button variant="primary" onClick={() => (setStartedAt(Date.now()), setNow(Date.now()))}>
              <Play aria-hidden /> Empezar a responder
            </Button>
          ) : running ? (
            <Button variant="secondary" onClick={() => setStoppedAt(Date.now())}>
              <Square aria-hidden /> Terminé
            </Button>
          ) : (
            <span className="text-sm font-semibold text-muted">Respondiste en {mmss(elapsed)}</span>
          )}
        </div>
      </Card>

      {flojo ? (
        <Card tone="sunken" className="flex flex-col gap-3" role="status">
          <p className="text-[15px] font-semibold">Lo anoté en Errores para repasarlo antes del próximo simulacro.</p>
          {missingText(checks) && <p className="text-sm text-muted">{missingText(checks)}</p>}
          <p className="text-sm text-muted">Pasa: para eso se practica. ¿La intentás de nuevo ahora o seguís?</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={retry}>
              Intentar de nuevo
            </Button>
            <Button variant="secondary" onClick={onNext}>
              {nextLabel}
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 desk:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold">¿Qué cubriste?</h3>
            <div className="mt-2 flex flex-col">
              {CHECK_ITEMS.map((i) => (
                <Checkbox key={i.key} label={i.label} checked={checks[i.key]} onChange={(e) => setChecks((c) => ({ ...c, [i.key]: e.target.checked }))} />
              ))}
            </div>
          </Card>
          <Card className="flex flex-col">
            <h3 className="text-lg font-semibold">¿Cómo te salió?</h3>
            <div role="group" aria-label="Autoevaluación" className="mt-3 grid grid-cols-3 gap-2">
              {SELF_RATINGS.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => rate(r.value)}
                  className={cn("min-h-14 rounded-btn border border-line text-[15px] font-bold text-ink hover:brightness-95", RATING_STYLE[r.value])}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">Aceptable y Sólido pasan a la siguiente. Flojo va a Errores con lo que faltó.</p>
            <Button variant="ghost" onClick={onNext} className="mt-auto self-start text-muted">
              {nextLabel} sin evaluar
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
