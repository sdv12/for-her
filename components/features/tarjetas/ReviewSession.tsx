"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import { CheckCircle2, Layers } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Dot } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { reviewCard } from "@/lib/mock/actions/cards";
import { useDB } from "@/lib/mock/store";
import { dueQueue, formatInterval, previewAll, RATINGS, type Rating } from "@/lib/srs";
import { subjectColorVar } from "@/lib/subjects";

const RATING_STYLE: Record<Rating, string> = {
  again: "bg-accent-soft",
  hard: "bg-honey-soft",
  good: "bg-sage-soft",
  easy: "bg-surface",
};

type Session = { queue: string[]; index: number; requeued: string[]; counts: Record<Rating, number>; mistakes: string[] };

const emptyCounts = (): Record<Rating, number> => ({ again: 0, hard: 0, good: 0, easy: 0 });

export function ReviewSession({ deckId }: { deckId: string | null }) {
  const db = useDB();
  const [session, setSession] = useState<Session | null>(null);
  const [revealed, setRevealed] = useState(false);

  const deck = deckId && db ? db.subjects.find((s) => s.id === deckId) : null;

  // La cola se arma una vez al entrar (y al pedir "Seguir"): calificar no la reordena.
  function buildQueue() {
    if (!db) return [];
    return dueQueue(db.cards.filter((c) => !deckId || c.subject_id === deckId)).map((c) => c.id);
  }
  if (db && session === null) {
    setSession({ queue: buildQueue(), index: 0, requeued: [], counts: emptyCounts(), mistakes: [] });
  }

  const currentId = session && session.index < session.queue.length ? session.queue[session.index] : null;
  const card = currentId && db ? db.cards.find((c) => c.id === currentId) : null;
  const preview = useMemo(() => (card ? previewAll(card) : null), [card]);

  function rate(rating: Rating) {
    if (!card || !session) return;
    const { mistake } = reviewCard(card.id, rating);
    // "Otra vez": vuelve una vez más al final de esta misma sesión.
    const again = rating === "again" && !session.requeued.includes(card.id);
    setSession({
      ...session,
      queue: again ? [...session.queue, card.id] : session.queue,
      requeued: again ? [...session.requeued, card.id] : session.requeued,
      index: session.index + 1,
      counts: { ...session.counts, [rating]: session.counts[rating] + 1 },
      mistakes: mistake && !session.mistakes.includes(card.id) ? [...session.mistakes, card.id] : session.mistakes,
    });
    setRevealed(false);
  }

  // Teclado (desktop): espacio/enter muestra la respuesta; 1–4 califican.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!card || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea, select, [contenteditable]")) return;
      if (!revealed && (e.key === " " || e.key === "Enter")) {
        if (target.closest("button, a")) return;
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && ["1", "2", "3", "4"].includes(e.key)) {
        e.preventDefault();
        rate(RATINGS[Number(e.key) - 1].value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const header = (
    <PageHeader
      kicker={deck ? `Mazo: ${deck.name}` : "Tarjetas · todos los mazos"}
      title="Repasar"
      actions={
        <Link href="/tarjetas" className={buttonClasses({ variant: "ghost" })}>
          Salir
        </Link>
      }
    />
  );

  if (!db || !session) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="h-80 animate-pulse rounded-card bg-sunken" />
      </>
    );
  }

  const total = session.queue.length;
  const reviewed = Object.values(session.counts).reduce((a, b) => a + b, 0);

  if (total === 0) {
    const next = db.cards.filter((c) => !deckId || c.subject_id === deckId).sort((a, b) => a.due_at.localeCompare(b.due_at))[0];
    return (
      <>
        {header}
        <EmptyState
          icon={Layers}
          title="No hay tarjetas para hoy"
          action={
            <Link href="/tarjetas" className={buttonClasses({ variant: "primary" })}>
              Ver tarjetas
            </Link>
          }
        >
          {next
            ? `Estás al día. La próxima toca en ${formatDistanceToNowStrict(new Date(next.due_at), { locale: es })}.`
            : "Creá tarjetas desde una pregunta o un error y aparecen acá."}
        </EmptyState>
      </>
    );
  }

  if (!card) {
    const moreDue = buildQueue().length;
    return (
      <>
        {header}
        <Card tone="hero" className="p-6 desk:p-8">
          <CheckCircle2 aria-hidden className="size-8 text-sage" />
          <h2 className="mt-3 text-3xl font-semibold">Listo por hoy</h2>
          <p className="mt-2 text-[15px] opacity-85">
            Repasaste {reviewed} {reviewed === 1 ? "tarjeta" : "tarjetas"}. Eso es active recall de verdad.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {RATINGS.map((r) => (
              <li key={r.value} className="rounded-card-sm bg-hero-ink/10 px-3 py-2">
                <p className="text-xs font-semibold opacity-80">{r.label}</p>
                <p className="tabular font-display text-2xl font-semibold">{session.counts[r.value]}</p>
              </li>
            ))}
          </ul>
          {session.mistakes.length > 0 && (
            <p className="mt-4 text-sm opacity-85">
              {session.mistakes.length === 1 ? "1 tarjeta fue" : `${session.mistakes.length} tarjetas fueron`} a Errores, para repasar antes del
              próximo simulacro.
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            {moreDue > 0 ? (
              <button
                type="button"
                onClick={() => setSession({ queue: buildQueue(), index: 0, requeued: [], counts: emptyCounts(), mistakes: [] })}
                className={buttonClasses({ variant: "primary", size: "lg" })}
              >
                Seguir con {moreDue} más
              </button>
            ) : (
              <Link href="/hoy" className={buttonClasses({ variant: "primary", size: "lg" })}>
                Volver a Hoy
              </Link>
            )}
            <Link href="/tarjetas" className={buttonClasses({ variant: "hero", size: "lg" })}>
              Ver tarjetas
            </Link>
          </div>
        </Card>
      </>
    );
  }

  const subject = db.subjects.find((s) => s.id === card.subject_id);

  return (
    <>
      {header}
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        <div className="flex items-center gap-3">
          <ProgressBar label="Progreso de la sesión" value={session.index} max={total} className="flex-1" />
          <span className="tabular text-sm font-semibold text-muted">
            {session.index + 1} / {total}
          </span>
        </div>

        <Card className="p-0">
          <button
            type="button"
            onClick={() => setRevealed(true)}
            disabled={revealed}
            className="block w-full rounded-card p-6 text-left disabled:cursor-default desk:p-8"
          >
            {subject && (
              <span className="flex items-center gap-2 text-sm font-semibold text-muted">
                <Dot color={subjectColorVar(subject.color)} /> {subject.name}
              </span>
            )}
            <span className="mt-3 block font-display text-[1.6rem] leading-tight font-semibold tracking-[-0.02em] desk:text-[2rem]">
              {card.front}
            </span>
            {!revealed && <span className="mt-6 block text-sm text-muted">Respondé en voz alta y después tocá para ver la respuesta.</span>}
          </button>
          {revealed && (
            <div className="border-t border-line p-6 desk:p-8" aria-live="polite">
              <p className="text-xs font-semibold tracking-wide text-muted uppercase">Respuesta</p>
              <p className="mt-2 text-[17px] leading-relaxed whitespace-pre-line">{card.back}</p>
            </div>
          )}
        </Card>

        {!revealed ? (
          <button type="button" onClick={() => setRevealed(true)} className={buttonClasses({ variant: "primary", size: "lg", className: "w-full" })}>
            Mostrar respuesta
            <kbd className="ml-2 hidden rounded-[6px] bg-accent-ink/10 px-1.5 text-xs desk:inline">espacio</kbd>
          </button>
        ) : (
          <div
            role="group"
            aria-label="¿Cómo te fue?"
            // En el celular la respuesta larga empuja los botones debajo de la barra: los traemos a la vista.
            ref={(el) => el?.scrollIntoView({ block: "nearest", behavior: "smooth" })}
            className="scroll-mb-28 grid grid-cols-2 gap-2 sm:grid-cols-4 desk:scroll-mb-4"
          >
            {RATINGS.map((r, i) => (
              <button
                key={r.value}
                type="button"
                onClick={() => rate(r.value)}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center rounded-btn border border-line px-2 py-2 text-ink transition-[filter] hover:brightness-95",
                  RATING_STYLE[r.value],
                )}
              >
                <span className="text-[15px] font-bold">{r.label}</span>
                <span className="tabular text-xs text-muted">
                  {preview && formatInterval(preview[r.value])}
                  <span className="hidden desk:inline"> · {i + 1}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
