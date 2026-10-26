import type { CaseAction, CaseLevel, ClinicalCase, Frequency, ManagementOption, Sex } from "./types";

/*
 * Puntaje de un caso. Tres categorías de 1 a 3 estrellas, siempre con devolución amable:
 * - Diagnóstico: según en qué intento llegaste.
 * - Estudios: pediste lo clave sin gastar en lo que no aportaba.
 * - Conducta: elegiste lo clave y nada riesgoso.
 */

export type Stars = 1 | 2 | 3;
export type CaseScore = { dx: Stars; studies: Stars; management: Stars; total: number; xp: number };

export const LEVEL_LABEL: Record<CaseLevel, string> = { 1: "Básico", 2: "Intermedio", 3: "Avanzado", 4: "Desafío" };
export const FREQUENCY_LABEL: Record<Frequency, string> = {
  "muy-frecuente": "Muy frecuente",
  frecuente: "Frecuente",
  "poco-frecuente": "Poco frecuente",
  raro: "Raro",
};

export function dxStars(attempts: number): Stars {
  if (attempts <= 1) return 3;
  if (attempts === 2) return 2;
  return 1;
}

export type PickReview<T> = { keyMissed: T[]; wasted: T[]; risky: T[]; keyHit: T[] };

export function reviewPicks<T extends { id: string; relevance: CaseAction["relevance"] }>(all: T[], picked: string[]): PickReview<T> {
  const set = new Set(picked);
  return {
    keyHit: all.filter((a) => a.relevance === "clave" && set.has(a.id)),
    keyMissed: all.filter((a) => a.relevance === "clave" && !set.has(a.id)),
    wasted: all.filter((a) => a.relevance === "innecesario" && set.has(a.id)),
    risky: all.filter((a) => a.relevance === "riesgoso" && set.has(a.id)),
  };
}

/** Estudios: 3 si pediste todo lo clave sin nada de más; 2 si faltó uno o sobraron hasta dos; si no, 1. */
export function studiesStars(c: ClinicalCase, picked: string[]): Stars {
  const r = reviewPicks(c.studies, picked);
  if (r.risky.length) return 1;
  if (r.keyMissed.length === 0 && r.wasted.length === 0) return 3;
  if (r.keyMissed.length <= 1 && r.wasted.length <= 2) return 2;
  return 1;
}

/** Conducta: 3 si elegiste todo lo clave y nada riesgoso; 2 si faltó uno (sin riesgos); si no, 1. */
export function managementStars(options: ManagementOption[], picked: string[]): Stars {
  const r = reviewPicks(options, picked);
  if (r.risky.length) return 1;
  if (r.keyMissed.length === 0) return r.wasted.length > 2 ? 2 : 3;
  if (r.keyMissed.length === 1) return 2;
  return 1;
}

export function scoreCase(c: ClinicalCase, input: { dxAttempts: number; studies: string[]; management: string[] }): CaseScore {
  const dx = dxStars(input.dxAttempts);
  const studies = studiesStars(c, input.studies);
  const management = managementStars(c.management.options, input.management);
  const total = dx + studies + management;
  // Los casos más difíciles dan más experiencia.
  return { dx, studies, management, total, xp: total * 10 * c.level };
}

/** Cuánto del interrogatorio/examen clave cubriste (para la devolución, no puntúa). */
export function coverage(actions: CaseAction[], picked: string[]): { hit: number; of: number } {
  const key = actions.filter((a) => a.relevance === "clave");
  return { hit: key.filter((a) => picked.includes(a.id)).length, of: key.length };
}

export const RANKS: Array<{ min: number; title: string }> = [
  { min: 0, title: "Estudiante" },
  { min: 150, title: "PFO" },
  { min: 450, title: "Residente de 1.er año" },
  { min: 900, title: "Residente de 2.º año" },
  { min: 1500, title: "Residente de 3.er año" },
  { min: 2400, title: "Jefatura de residentes" },
  { min: 3600, title: "De guardia con el tribunal" },
];

export function rankFor(xp: number): { title: string; next: { title: string; at: number } | null; progress: number } {
  let i = 0;
  while (i + 1 < RANKS.length && xp >= RANKS[i + 1].min) i++;
  const next = RANKS[i + 1] ?? null;
  const progress = next ? (xp - RANKS[i].min) / (next.min - RANKS[i].min) : 1;
  return { title: RANKS[i].title, next: next ? { title: next.title, at: next.min } : null, progress };
}

export type AgeBand = "Lactantes" | "Niñez" | "Adolescencia" | "Adultez" | "Adultez mayor";

/** Franja etaria para filtrar y para la epidemiología. */
export function ageBand(p: ClinicalCase["patient"]): AgeBand {
  if (p.ageUnit !== "años") return "Lactantes";
  if (p.age < 2) return "Lactantes";
  if (p.age < 12) return "Niñez";
  if (p.age < 18) return "Adolescencia";
  if (p.age < 65) return "Adultez";
  return "Adultez mayor";
}

/** "Mujer de 24 años", "Varón de 7 meses", "Niña de 6 años". */
export function patientLabel(p: ClinicalCase["patient"]): string {
  const child = p.ageUnit !== "años" || p.age < 15;
  const noun = child ? (p.sex === "F" ? "Niña" : "Niño") : p.sex === "F" ? "Mujer" : "Varón";
  const lactante = p.ageUnit !== "años" || p.age < 2;
  return `${lactante ? (p.sex === "F" ? "Lactante mujer" : "Lactante varón") : noun} de ${p.age} ${p.age === 1 ? p.ageUnit.replace(/s$/, "").replace(/e$/, "") : p.ageUnit}`;
}

export function sexLabel(s: Sex): string {
  return s === "F" ? "Femenino" : "Masculino";
}
