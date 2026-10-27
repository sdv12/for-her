"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildQuiz, seededShuffle, type QuizQuestion } from "@/lib/cases/engine";
import type { ClinicalCase } from "@/lib/cases/types";
import { cn } from "@/lib/cn";

/** Repaso rápido al final del caso: preguntas armadas con el propio contenido del caso. */
export function Quiz({ c, seed }: { c: ClinicalCase; seed: string }) {
  const questions = useMemo(() => buildQuiz(c, seed), [c, seed]);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [round, setRound] = useState(0);
  if (!questions.length) return null;

  const answered = Object.keys(results).length;
  const right = Object.values(results).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-5">
      {questions.map((q, i) => (
        <div key={`${q.id}-${round}`} className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-muted">
            Pregunta {i + 1} de {questions.length}
          </p>
          {q.kind === "choice" ? (
            <ChoiceQuestion q={q} onAnswer={(ok) => setResults((r) => ({ ...r, [q.id]: ok }))} />
          ) : (
            <OrderQuestion q={q} seed={`${seed}:${round}`} onAnswer={(ok) => setResults((r) => ({ ...r, [q.id]: ok }))} />
          )}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-4">
        <p aria-live="polite" className="text-sm font-semibold">
          {answered === questions.length
            ? `${right} de ${questions.length} bien.${right === questions.length ? " Lo tenés." : " Repasá las que fallaste."}`
            : `${answered} de ${questions.length} respondidas`}
        </p>
        {answered > 0 && (
          <Button
            variant="ghost"
            onClick={() => {
              setResults({});
              setRound((r) => r + 1);
            }}
          >
            <RotateCcw aria-hidden /> Repetir el repaso
          </Button>
        )}
      </div>
    </div>
  );
}

function ChoiceQuestion({ q, onAnswer }: { q: Extract<QuizQuestion, { kind: "choice" }>; onAnswer: (ok: boolean) => void }) {
  const [chosen, setChosen] = useState<string | null>(null);
  const done = chosen !== null;
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-2 text-[15px] font-semibold">{q.prompt}</legend>
      {q.options.map((o) => {
        const isChosen = chosen === o.id;
        return (
          <button
            key={o.id}
            type="button"
            disabled={done}
            aria-pressed={isChosen}
            onClick={() => {
              setChosen(o.id);
              onAnswer(o.correct);
            }}
            className={cn(
              "flex items-start gap-2 rounded-card-sm border px-4 py-2.5 text-left text-sm leading-relaxed transition-colors",
              !done && "border-line bg-surface hover:bg-sunken",
              done && o.correct && "border-sage bg-sage-soft",
              done && isChosen && !o.correct && "border-honey bg-honey-soft",
              done && !o.correct && !isChosen && "border-line bg-surface text-muted",
            )}
          >
            {done && o.correct && <Check aria-hidden className="mt-0.5 size-4 shrink-0" />}
            {done && isChosen && !o.correct && <X aria-hidden className="mt-0.5 size-4 shrink-0" />}
            <span>{o.label}</span>
          </button>
        );
      })}
      {done && (
        <p aria-live="polite" className="rounded-[12px] bg-sunken px-3 py-2 text-sm leading-relaxed">
          <b>{q.options.find((o) => o.id === chosen)?.correct ? "Bien." : "No era esa."}</b> {q.explain}
        </p>
      )}
    </fieldset>
  );
}

function OrderQuestion({ q, seed, onAnswer }: { q: Extract<QuizQuestion, { kind: "order" }>; seed: string; onAnswer: (ok: boolean) => void }) {
  const [order, setOrder] = useState(() => {
    const s = seededShuffle(q.items, `${seed}:order`);
    // Si el azar dejó el orden correcto, lo rotamos para que haya algo que ordenar.
    return s.every((x, i) => x === q.items[i]) ? [...s.slice(1), s[0]] : s;
  });
  const [checked, setChecked] = useState(false);

  function move(i: number, d: -1 | 1) {
    const next = [...order];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    setOrder(next);
  }

  const ok = order.every((x, i) => x === q.items[i]);
  return (
    <div className="flex flex-col gap-2">
      <p className="mb-1 text-[15px] font-semibold">{q.prompt}</p>
      <ol className="flex flex-col gap-2">
        {order.map((item, i) => {
          const good = checked && item === q.items[i];
          return (
            <li
              key={item}
              className={cn(
                "flex items-start gap-2 rounded-card-sm border px-3 py-2 text-sm leading-relaxed",
                !checked && "border-line bg-surface",
                checked && good && "border-sage bg-sage-soft",
                checked && !good && "border-honey bg-honey-soft",
              )}
            >
              <span className="tabular mt-0.5 w-5 shrink-0 font-semibold">{i + 1}.</span>
              <span className="min-w-0 flex-1">{item}</span>
              {!checked && (
                <span className="flex shrink-0 flex-col">
                  <button
                    type="button"
                    aria-label={`Subir paso ${i + 1}`}
                    disabled={i === 0}
                    onClick={() => move(i, -1)}
                    className="inline-flex size-8 items-center justify-center rounded-[8px] hover:bg-sunken disabled:opacity-30"
                  >
                    <ArrowUp aria-hidden className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Bajar paso ${i + 1}`}
                    disabled={i === order.length - 1}
                    onClick={() => move(i, 1)}
                    className="inline-flex size-8 items-center justify-center rounded-[8px] hover:bg-sunken disabled:opacity-30"
                  >
                    <ArrowDown aria-hidden className="size-4" />
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {checked ? (
        <div aria-live="polite" className="rounded-[12px] bg-sunken px-3 py-2 text-sm leading-relaxed">
          <b>{ok ? "Orden correcto." : "Así va el orden:"}</b>
          {!ok && (
            <ol className="mt-1 list-decimal pl-5">
              {q.items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
          )}
        </div>
      ) : (
        <Button
          variant="secondary"
          className="self-start"
          onClick={() => {
            setChecked(true);
            onAnswer(ok);
          }}
        >
          Comprobar orden
        </Button>
      )}
    </div>
  );
}
