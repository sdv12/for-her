import type { DB, Mistake } from "@/lib/data/types";

export const ORIGIN_LABEL: Record<Mistake["origin"], string> = {
  tarjeta: "Tarjeta",
  simulacro: "Simulacro",
  tribunal: "Tribunal",
  manual: "Anotado a mano",
  caso: "Caso clínico",
};

/** "No recordé: X" / "Flojo en: X" → "X" (para usar como frente de una tarjeta). */
export function mistakeQuestion(text: string): string {
  return text.replace(/^(No recordé|Flojo en):\s*/i, "").trim();
}

/** Materia del error según su origen (la tarjeta o la pregunta de donde salió). */
export function mistakeSubjectId(db: DB, m: Mistake): string | null {
  if (!m.origin_ref) return null;
  if (m.origin === "tarjeta") return db.cards.find((c) => c.id === m.origin_ref)?.subject_id ?? null;
  return db.exam_questions.find((q) => q.id === m.origin_ref)?.subject_id ?? null;
}

/** Abiertos primero los que más se repiten; a igualdad, los más recientes. */
export function sortOpenMistakes(ms: Mistake[]): Mistake[] {
  return ms.filter((m) => !m.resolved_at).sort((a, b) => b.times - a.times || b.updated_at.localeCompare(a.updated_at));
}
