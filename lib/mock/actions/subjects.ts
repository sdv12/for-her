"use client";

import type { DB } from "@/lib/data/types";
import { fold } from "@/lib/plan-import/dates";
import { colorForNewSubject } from "@/lib/subjects";
import { newRow } from "../store";

/** Id de la materia con ese nombre (sin importar acentos ni mayúsculas); si no existe, la crea con el próximo color. */
export function ensureSubject(db: DB, name: string | null): string | null {
  const clean = name?.trim();
  if (!clean) return null;
  const found = db.subjects.find((s) => fold(s.name) === fold(clean));
  if (found) return found.id;
  const subject = { ...newRow(), name: clean, color: colorForNewSubject(clean, db.subjects.length), sort: db.subjects.length };
  db.subjects.push(subject);
  return subject.id;
}
