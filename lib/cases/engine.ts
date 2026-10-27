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
  if (p.ageUnit === "días") return `${p.sex === "F" ? "Recién nacida" : "Recién nacido"} de ${p.age} ${p.age === 1 ? "día" : "días"}`;
  const child = p.ageUnit !== "años" || p.age < 15;
  const noun = child ? (p.sex === "F" ? "Niña" : "Niño") : p.sex === "F" ? "Mujer" : "Varón";
  const lactante = p.ageUnit !== "años" || p.age < 2;
  return `${lactante ? (p.sex === "F" ? "Lactante mujer" : "Lactante varón") : noun} de ${p.age} ${p.age === 1 ? p.ageUnit.replace(/s$/, "").replace(/e$/, "") : p.ageUnit}`;
}

export function sexLabel(s: Sex): string {
  return s === "F" ? "Femenino" : "Masculino";
}

/* ------------------------------------------------------------------ */
/* Modo, pistas e hipótesis                                            */
/* ------------------------------------------------------------------ */

export type PlayMode = "examen" | "estudio";

/**
 * Experiencia final del intento. El modo estudio (con devolución inmediata) da la mitad;
 * cada pista descuenta un 10 % (hasta la mitad). Pensar el diagnóstico correcto desde el
 * interrogatorio suma un bonus.
 */
export function finalXp(base: number, o: { mode: PlayMode; hints: number; hypothesisHit: boolean; level: CaseLevel }): number {
  const modeFactor = o.mode === "estudio" ? 0.5 : 1;
  const hintFactor = Math.max(0.5, 1 - 0.1 * o.hints);
  return Math.round(base * modeFactor * hintFactor) + (o.hypothesisHit ? 5 * o.level : 0);
}

/** Primera acción clave que todavía no hiciste (para las pistas). */
export function nextHint<T extends { id: string; relevance: CaseAction["relevance"] }>(actions: T[], done: string[]): T | null {
  return actions.find((a) => a.relevance === "clave" && !done.includes(a.id)) ?? null;
}

/* ------------------------------------------------------------------ */
/* Azar reproducible (para mezclar opciones sin que cambien al renderizar) */
/* ------------------------------------------------------------------ */

function hash(s: string): number {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  let a = hash(seed) || 1;
  const rand = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Repaso rápido: preguntas armadas con el contenido del caso          */
/* ------------------------------------------------------------------ */

export type QuizChoice = { id: string; label: string; correct: boolean };
export type QuizQuestion =
  | { kind: "choice"; id: string; prompt: string; options: QuizChoice[]; explain: string }
  | { kind: "order"; id: string; prompt: string; items: string[] };

export function buildQuiz(c: ClinicalCase, seed: string): QuizQuestion[] {
  const qs: QuizQuestion[] = [];
  const pick = <T,>(list: T[], n: number, s: string) => seededShuffle(list, `${seed}:${s}`).slice(0, n);

  // 1. Lo que no había que hacer.
  const bad = c.management.options.filter((o) => o.relevance === "riesgoso");
  const notNeeded = bad.length ? bad : c.management.options.filter((o) => o.relevance === "innecesario");
  const good = c.management.options.filter((o) => o.relevance === "clave" || o.relevance === "util");
  if (notNeeded.length && good.length >= 2) {
    const wrong = pick(notNeeded, 1, "bad")[0];
    qs.push({
      kind: "choice",
      id: "conducta-mal",
      prompt: bad.length ? "¿Cuál de estas conductas era riesgosa en este caso?" : "¿Cuál de estas conductas no hacía falta en este caso?",
      options: seededShuffle(
        [{ id: wrong.id, label: wrong.label, correct: true }, ...pick(good, 3, "good").map((o) => ({ id: o.id, label: o.label, correct: false }))],
        `${seed}:q1`,
      ),
      explain: wrong.why,
    });
  }

  // 2. El estudio que definía.
  const keyStudies = c.studies.filter((s) => s.relevance === "clave");
  const fillers = c.studies.filter((s) => s.relevance === "innecesario" || s.relevance === "neutro" || s.relevance === "riesgoso");
  if (keyStudies.length && fillers.length >= 2) {
    const right = pick(keyStudies, 1, "study")[0];
    qs.push({
      kind: "choice",
      id: "estudio-clave",
      prompt: "¿Cuál de estos estudios era clave?",
      options: seededShuffle(
        [{ id: right.id, label: right.label, correct: true }, ...pick(fillers, 3, "fill").map((s) => ({ id: s.id, label: s.label, correct: false }))],
        `${seed}:q2`,
      ),
      explain: right.why,
    });
  }

  // 3. Por qué importaba una pregunta o una maniobra.
  // Interrogatorio y examen pueden repetir ids: se prefijan para que las opciones no choquen.
  const keyActions = [
    ...c.anamnesis.map((a) => ({ ...a, id: `a-${a.id}` })),
    ...c.exam.map((a) => ({ ...a, id: `e-${a.id}` })),
  ].filter((a) => a.relevance === "clave");
  if (keyActions.length >= 3) {
    const [target, ...others] = pick(keyActions, 3, "why");
    qs.push({
      kind: "choice",
      id: "por-que",
      prompt: `¿Por qué era clave «${target.label}»?`,
      options: seededShuffle(
        [{ id: target.id, label: target.why, correct: true }, ...others.map((o) => ({ id: o.id, label: o.why, correct: false }))],
        `${seed}:q3`,
      ),
      explain: `En este paciente: ${target.result}`,
    });
  }

  // 4. Por qué no era otro diagnóstico.
  const wrongDx = c.diagnosis.options.filter((o) => !o.correct);
  if (wrongDx.length >= 3) {
    const [target, ...others] = pick(wrongDx, 3, "dx");
    qs.push({
      kind: "choice",
      id: "diferencial",
      prompt: `¿Qué te hacía descartar «${target.label}»?`,
      options: seededShuffle(
        [{ id: target.id, label: target.why, correct: true }, ...others.map((o) => ({ id: o.id, label: o.why, correct: false }))],
        `${seed}:q4`,
      ),
      explain: "Cada diferencial se descarta por un dato concreto: es lo que el tribunal quiere escuchar.",
    });
  }

  // 5. Ordenar la conducta.
  if (c.debrief.management.length >= 3) {
    qs.push({ kind: "order", id: "orden", prompt: "Ordená la conducta, del primer paso al último.", items: c.debrief.management.slice(0, 5) });
  }
  return qs;
}

/* ------------------------------------------------------------------ */
/* Presentación oral modelo                                           */
/* ------------------------------------------------------------------ */

/** Arma, con los datos del caso, cómo se presentaría frente al tribunal. */
export function modelPresentation(c: ClinicalCase): Array<{ label: string; text: string }> {
  const key = (list: CaseAction[]) => list.filter((a) => a.relevance === "clave").map((a) => a.result.replace(/^“|”$/g, ""));
  const vitals = Object.entries(c.vitals)
    .map(([k, v]) => `${k} ${v}`)
    .join(", ");
  const studies = c.studies.filter((s) => s.relevance === "clave" || s.relevance === "util").map((s) => `${s.label}: ${s.result}`);
  const differentials = c.debrief.pathologies.filter((p) => p.role === "diferencial").map((p) => p.name);
  return [
    { label: "Paciente y motivo", text: `${patientLabel(c.patient)}${c.patient.context ? ` (${c.patient.context.replace(/\.$/, "")})` : ""}, que consulta en ${c.setting.toLowerCase()} por: ${c.intro}` },
    { label: "Datos del interrogatorio", text: key(c.anamnesis).join(" ") },
    { label: "Examen físico", text: [vitals && `Signos vitales: ${vitals}.`, ...key(c.exam)].filter(Boolean).join(" ") },
    { label: "Estudios", text: studies.length ? studies.join(" ") : "El diagnóstico es clínico: no hacen falta estudios." },
    { label: "Diagnóstico", text: c.debrief.diagnosis },
    { label: "Diferenciales", text: differentials.length ? `Hay que descartar: ${differentials.join(", ")}.` : "—" },
    { label: "Conducta", text: c.debrief.management.join(" ") },
  ];
}
