"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { DB } from "@/lib/data/types";
import { resolveMistake } from "@/lib/mock/actions/mistakes";
import { ORIGIN_LABEL, sortOpenMistakes } from "@/lib/mistakes";

/**
 * "Repasar errores": como una sesión de tarjetas. Leés el error, intentás decir lo correcto en voz alta,
 * mirás la corrección y decidís si ya lo tenés.
 */
export function MistakeReview({ db, onExit }: { db: DB; onExit: () => void }) {
  const [queue] = useState(() => sortOpenMistakes(db.mistakes).map((m) => m.id));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [resolved, setResolved] = useState(0);

  const mistake = index < queue.length ? db.mistakes.find((m) => m.id === queue[index]) : null;

  function next(gotIt: boolean) {
    if (gotIt && mistake) {
      resolveMistake(mistake.id);
      setResolved((r) => r + 1);
    }
    setIndex((i) => i + 1);
    setRevealed(false);
  }

  if (!mistake) {
    const stillOpen = queue.length - resolved;
    return (
      <Card tone="hero" className="p-6 desk:p-8">
        <CheckCircle2 aria-hidden className="size-8 text-sage" />
        <h2 className="mt-3 text-3xl font-semibold">Repaso de errores listo</h2>
        <p className="mt-2 text-[15px] opacity-85">
          {resolved > 0 ? `Ya tenés ${resolved} de ${queue.length}. ` : ""}
          {stillOpen > 0 ? `${stillOpen === 1 ? "Queda 1 abierto" : `Quedan ${stillOpen} abiertos`} para la próxima: está perfecto que vuelvan.` : "No quedan errores abiertos."}
        </p>
        <Button variant="primary" size="lg" className="mt-6" onClick={onExit}>
          Volver a la lista
        </Button>
      </Card>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <div className="flex items-center gap-3">
        <ProgressBar label="Progreso del repaso" value={index} max={queue.length} className="flex-1" />
        <span className="tabular text-sm font-semibold text-muted">
          {index + 1} / {queue.length}
        </span>
        <Button variant="ghost" onClick={onExit}>
          Salir
        </Button>
      </div>

      <Card className="p-0">
        <div className="p-6 desk:p-8">
          <p className="text-sm font-semibold text-muted">
            {ORIGIN_LABEL[mistake.origin]}
            {mistake.times > 1 && ` · ${mistake.times} veces`}
          </p>
          <p className="mt-3 font-display text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] desk:text-[1.9rem]">{mistake.text}</p>
          {!revealed && <p className="mt-5 text-sm text-muted">Decí en voz alta cómo es lo correcto y después mirá la corrección.</p>}
        </div>
        {revealed && (
          <div className="border-t border-line p-6 desk:p-8" aria-live="polite">
            <p className="text-xs font-semibold tracking-wide text-muted uppercase">Lo correcto</p>
            <p className="mt-2 rounded-card-sm bg-sage-soft p-4 text-[16px] leading-relaxed whitespace-pre-line">{mistake.correction}</p>
          </div>
        )}
      </Card>

      {!revealed ? (
        <Button variant="primary" size="lg" className="w-full" onClick={() => setRevealed(true)}>
          Mostrar la corrección
        </Button>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="lg" onClick={() => next(false)}>
            Todavía no
          </Button>
          <Button variant="primary" size="lg" onClick={() => next(true)}>
            Ya lo tengo
          </Button>
        </div>
      )}
    </div>
  );
}
