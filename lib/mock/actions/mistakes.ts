"use client";

import { mistakeInput, type MistakeInput } from "@/lib/data/schemas";
import type { DB, Mistake } from "@/lib/data/types";
import { mutate, newRow, touch } from "../store";

function find(db: DB, id: string): Mistake {
  const m = db.mistakes.find((x) => x.id === id);
  if (!m) throw new Error("No encontré ese error.");
  return m;
}

export function createMistake(input: MistakeInput): string {
  const data = mistakeInput.parse(input);
  return mutate((db) => {
    const m: Mistake = { ...newRow(), ...data, origin: "manual", origin_ref: null, times: 1, resolved_at: null };
    db.mistakes.push(m);
    return m.id;
  });
}

export function updateMistake(id: string, input: MistakeInput) {
  const data = mistakeInput.parse(input);
  mutate((db) => {
    Object.assign(touch(find(db, id)), data);
  });
}

/** "Ya lo tengo". */
export function resolveMistake(id: string) {
  mutate((db) => {
    touch(find(db, id)).resolved_at = new Date().toISOString();
  });
}

export function reopenMistake(id: string) {
  mutate((db) => {
    touch(find(db, id)).resolved_at = null;
  });
}

export function deleteMistake(id: string): Mistake {
  return mutate((db) => {
    const m = find(db, id);
    db.mistakes = db.mistakes.filter((x) => x.id !== id);
    return m;
  });
}

export function restoreMistake(m: Mistake) {
  mutate((db) => {
    db.mistakes.push(m);
  });
}
