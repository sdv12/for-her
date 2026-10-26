"use client";

import { z } from "zod";
import { profileInput, type ProfileInput } from "@/lib/data/schemas";
import type { DB, Profile } from "@/lib/data/types";
import { BASE_SUBJECT_COLORS } from "@/lib/subjects";
import { getDB, mutate, newRow, replaceDB, resetDB } from "../store";

export function updateProfile(input: ProfileInput) {
  const data = profileInput.parse(input);
  mutate((db) => {
    db.profile.display_name = data.display_name || null;
    db.profile.exam_date = data.exam_date || null;
    db.profile.daily_goal_min = data.daily_goal_min;
  });
}

export function setThemePreference(theme: Profile["theme"]) {
  mutate((db) => {
    db.profile.theme = theme;
  });
}

const TABLES = [
  "subjects",
  "plans",
  "plan_phases",
  "plan_weeks",
  "plan_days",
  "tasks",
  "cards",
  "card_reviews",
  "exam_questions",
  "simulations",
  "mistakes",
  "study_logs",
  "focus_sessions",
  "syllabus_topics",
] as const satisfies ReadonlyArray<keyof DB>;

/** Todos los datos en un JSON con metadatos. */
export function exportData(): { filename: string; json: string } {
  const db = getDB();
  const exportedAt = new Date().toISOString();
  return {
    filename: `for-her-datos-${exportedAt.slice(0, 10)}.json`,
    json: JSON.stringify({ app: "for-her", exported_at: exportedAt, data: db }, null, 2),
  };
}

const backupSchema = z.object({
  version: z.literal(1, "El respaldo es de otra versión de la app."),
  profile: z.object({
    display_name: z.string().nullable(),
    exam_date: z.string().nullable(),
    daily_goal_min: z.number(),
    theme: z.enum(["system", "light", "dark"]),
  }),
  ...Object.fromEntries(TABLES.map((t) => [t, z.array(z.object({ id: z.string() }).loose())])),
});

/** Valida un respaldo exportado y devuelve cuántos registros trae. No guarda nada. */
export function readBackup(text: string): { ok: true; db: DB; counts: Record<string, number> } | { ok: false; error: string } {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return { ok: false, error: "El archivo no es un JSON válido." };
  }
  const data = (raw as { app?: string; data?: unknown })?.app === "for-her" ? (raw as { data: unknown }).data : raw;
  const parsed = backupSchema.safeParse(data);
  if (!parsed.success) return { ok: false, error: "No parece un respaldo de For her (falta información o está incompleto)." };
  const db = parsed.data as unknown as DB;
  return {
    ok: true,
    db,
    counts: {
      tareas: db.tasks.length,
      tarjetas: db.cards.length,
      preguntas: db.exam_questions.length,
      registros: db.study_logs.length,
      errores: db.mistakes.length,
    },
  };
}

export function restoreBackup(db: DB) {
  replaceDB(db);
}

/** Base vacía: conserva tu perfil y las 5 materias base, sin datos de ejemplo. */
export function startFresh() {
  const { profile } = getDB();
  replaceDB({
    version: 1,
    profile,
    subjects: Object.entries(BASE_SUBJECT_COLORS).map(([name, color], i) => ({ ...newRow(), name, color, sort: i })),
    plans: [],
    plan_phases: [],
    plan_weeks: [],
    plan_days: [],
    tasks: [],
    cards: [],
    card_reviews: [],
    exam_questions: [],
    simulations: [],
    mistakes: [],
    study_logs: [],
    focus_sessions: [],
    syllabus_topics: [],
    case_attempts: [],
  });
}

export { resetDB as resetToExample };
