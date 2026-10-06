/*
 * Repaso espaciado: SM-2 simplificado (sección 5.5 del spec).
 *
 * Tarjeta nueva (reps = 0): Otra vez → 10 min · Difícil → 1 d · Bien → 3 d · Fácil → 7 d.
 * Después:
 *   Otra vez → reps = 0, ease − 0.2, vuelve en 10 min.
 *   Difícil  → intervalo × 1.2, ease − 0.15.
 *   Bien     → intervalo × ease.
 *   Fácil    → intervalo × ease × 1.3, ease + 0.15.
 * Los ajustes de ease aplican también a las nuevas. Ease mínimo 1.3; intervalos en días enteros (mínimo 1).
 */

export type Rating = "again" | "hard" | "good" | "easy";

export const RATINGS: Array<{ value: Rating; label: string }> = [
  { value: "again", label: "Otra vez" },
  { value: "hard", label: "Difícil" },
  { value: "good", label: "Bien" },
  { value: "easy", label: "Fácil" },
];

export type SrsState = { ease: number; interval_days: number; reps: number };
export type SrsResult = SrsState & { due_at: Date; minutes: number | null };

export const MIN_EASE = 1.3;
export const AGAIN_MINUTES = 10;
const NEW_INTERVALS: Record<Exclude<Rating, "again">, number> = { hard: 1, good: 3, easy: 7 };
const EASE_DELTA: Record<Rating, number> = { again: -0.2, hard: -0.15, good: 0, easy: 0.15 };

const DAY_MS = 24 * 60 * 60 * 1000;

function roundEase(n: number) {
  return Math.round(Math.max(MIN_EASE, n) * 100) / 100;
}

export function schedule(card: SrsState, rating: Rating, now: Date = new Date()): SrsResult {
  const ease = roundEase(card.ease + EASE_DELTA[rating]);

  if (rating === "again") {
    return { ease, interval_days: 0, reps: 0, minutes: AGAIN_MINUTES, due_at: new Date(now.getTime() + AGAIN_MINUTES * 60_000) };
  }

  let days: number;
  if (card.reps === 0) {
    days = NEW_INTERVALS[rating];
  } else {
    const base = Math.max(1, card.interval_days);
    // Se multiplica con el ease que tenía la tarjeta antes de esta calificación.
    const factor = rating === "hard" ? 1.2 : rating === "good" ? card.ease : card.ease * 1.3;
    days = Math.max(1, Math.round(base * factor));
  }

  return { ease, interval_days: days, reps: card.reps + 1, minutes: null, due_at: new Date(now.getTime() + days * DAY_MS) };
}

/** "10 min", "1 d", "12 d", "2 meses": para mostrar en cada botón. */
export function formatInterval(r: Pick<SrsResult, "interval_days" | "minutes">): string {
  if (r.minutes !== null) return `${r.minutes} min`;
  const d = r.interval_days;
  if (d < 30) return `${d} d`;
  const months = Math.round(d / 30);
  return months === 1 ? "1 mes" : `${months} meses`;
}

/** Los cuatro resultados posibles, para mostrarlos antes de calificar. */
export function previewAll(card: SrsState, now: Date = new Date()): Record<Rating, SrsResult> {
  return {
    again: schedule(card, "again", now),
    hard: schedule(card, "hard", now),
    good: schedule(card, "good", now),
    easy: schedule(card, "easy", now),
  };
}

/** Cola de repaso: vencidas (due_at <= now), primero las que vencieron hace más tiempo. */
export function dueQueue<T extends { id: string; due_at: string }>(cards: T[], now: Date = new Date()): T[] {
  return cards.filter((c) => new Date(c.due_at) <= now).sort((a, b) => a.due_at.localeCompare(b.due_at));
}
