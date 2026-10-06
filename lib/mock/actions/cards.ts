"use client";

import { cardInput, type CardInput } from "@/lib/data/schemas";
import type { Card, CardReview, DB } from "@/lib/data/types";
import { schedule, type Rating } from "@/lib/srs";
import { mutate, newRow, touch } from "../store";

function find(db: DB, id: string): Card {
  const card = db.cards.find((c) => c.id === id);
  if (!card) throw new Error("No encontré esa tarjeta.");
  return card;
}

/** Tarjeta nueva, para repasar ya. `source` dice de dónde vino ("Pregunta", "Error"…). */
export function createCard(input: CardInput, source: { source: string; source_ref: string | null } = { source: "Manual", source_ref: null }): string {
  const data = cardInput.parse(input);
  return mutate((db) => {
    const card: Card = {
      ...newRow(),
      ...data,
      ease: 2.5,
      interval_days: 0,
      reps: 0,
      due_at: new Date().toISOString(),
      ...source,
    };
    db.cards.push(card);
    return card.id;
  });
}

export function updateCard(id: string, input: CardInput) {
  const data = cardInput.parse(input);
  mutate((db) => {
    Object.assign(touch(find(db, id)), data);
  });
}

export function deleteCard(id: string): { card: Card; reviews: CardReview[] } {
  return mutate((db) => {
    const card = find(db, id);
    const reviews = db.card_reviews.filter((r) => r.card_id === id);
    db.cards = db.cards.filter((c) => c.id !== id);
    db.card_reviews = db.card_reviews.filter((r) => r.card_id !== id);
    return { card, reviews };
  });
}

export function restoreCard({ card, reviews }: { card: Card; reviews: CardReview[] }) {
  mutate((db) => {
    db.cards.push(card);
    db.card_reviews.push(...reviews);
  });
}

/**
 * Califica una tarjeta: reprograma con SM-2, guarda el repaso y, si fue "Otra vez",
 * crea el error (o suma una vez más al que ya existía para esa tarjeta, y lo reabre).
 */
export function reviewCard(id: string, rating: Rating): { mistake: "created" | "incremented" | null } {
  return mutate((db) => {
    const card = touch(find(db, id));
    const now = new Date();
    const next = schedule(card, rating, now);
    db.card_reviews.push({
      ...newRow(),
      card_id: id,
      rating,
      prev_interval: card.interval_days,
      new_interval: next.interval_days,
      reviewed_at: now.toISOString(),
    });
    Object.assign(card, { ease: next.ease, interval_days: next.interval_days, reps: next.reps, due_at: next.due_at.toISOString() });

    if (rating !== "again") return { mistake: null };
    const existing = db.mistakes.find((m) => m.origin === "tarjeta" && m.origin_ref === id);
    if (existing) {
      touch(existing).times += 1;
      existing.resolved_at = null;
      return { mistake: "incremented" as const };
    }
    db.mistakes.push({
      ...newRow(),
      text: `No recordé: ${card.front}`,
      correction: card.back,
      origin: "tarjeta",
      origin_ref: id,
      times: 1,
      resolved_at: null,
    });
    return { mistake: "created" as const };
  });
}
