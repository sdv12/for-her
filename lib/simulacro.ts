import type { ExamQuestion, Simulation, Subject } from "@/lib/data/types";
import { fold } from "@/lib/plan-import/dates";

export const CHECK_ITEMS = [
  { key: "causa", label: "Causa" },
  { key: "mecanismo", label: "Mecanismo" },
  { key: "consecuencia", label: "Consecuencia clínica" },
  { key: "diagnostico", label: "Diagnóstico" },
  { key: "conducta", label: "Conducta / tratamiento" },
] as const;
export type CheckKey = (typeof CHECK_ITEMS)[number]["key"];
export type Checks = Record<CheckKey, boolean>;

export const emptyChecks = (): Checks => ({ causa: false, mecanismo: false, consecuencia: false, diagnostico: false, conducta: false });

export type SelfRating = "flojo" | "aceptable" | "solido";
export const SELF_RATINGS: Array<{ value: SelfRating; label: string }> = [
  { value: "flojo", label: "Flojo" },
  { value: "aceptable", label: "Aceptable" },
  { value: "solido", label: "Sólido" },
];

export const SUGGESTED_SECONDS = 180;

/** "Faltó: mecanismo, conducta / tratamiento" con lo que quedó sin tildar. null si cubrió todo. */
export function missingText(checks: Checks): string | null {
  const missing = CHECK_ITEMS.filter((i) => !checks[i.key]).map((i) => i.label.toLowerCase());
  return missing.length ? `Faltó: ${missing.join(", ")}.` : null;
}

/** Orden de práctica: más veces tomada y prioridad alta primero; lo practicado en las últimas 24 h, al final. */
export function practiceOrder(questions: ExamQuestion[], simulations: Simulation[], now: Date = new Date()): ExamQuestion[] {
  const recent = new Set(
    simulations.filter((s) => s.question_id && now.getTime() - new Date(s.created_at).getTime() < 24 * 3600_000).map((s) => s.question_id),
  );
  return [...questions].sort(
    (a, b) =>
      Number(recent.has(a.id)) - Number(recent.has(b.id)) ||
      b.times_asked - a.times_asked ||
      a.priority - b.priority ||
      a.created_at.localeCompare(b.created_at),
  );
}

/** Próxima pregunta suelta que no salió en esta sesión (si ya salieron todas, vuelve a empezar). */
export function nextSuelta(ordered: ExamQuestion[], seen: string[]): ExamQuestion | null {
  return ordered.find((q) => !seen.includes(q.id)) ?? ordered[0] ?? null;
}

// ─── Modo tribunal ─────────────────────────────────────────────

export const STAGES = ["Anatomía", "Bioquímica", "Fisiología", "Clínica", "Repregunta"] as const;
export type Stage = (typeof STAGES)[number];

/** Preguntas de respaldo (las del seed) si el banco no tiene de esa materia. */
const FALLBACK: Record<Exclude<Stage, "Repregunta">, { text: string; follow_up?: string }> = {
  Anatomía: { text: "Describime la tráquea y sus relaciones" },
  Bioquímica: { text: "Explicame el ciclo de Krebs: dónde ocurre, sus pasos clave y cómo se regula" },
  Fisiología: { text: "¿Qué es el gasto cardíaco y de qué depende?" },
  Clínica: {
    text: "Insuficiencia cardíaca: fisiopatología y tratamiento",
    follow_up: "¿Por qué los IECA mejoran la sobrevida en la insuficiencia cardíaca?",
  },
};

export type TribunalStep = {
  stage: Stage;
  questionId: string | null;
  text: string;
  subjectId: string | null;
  source: string | null;
};

/**
 * Arma las 5 etapas. Cada etapa toma una de las 3 primeras de su materia según `practiceOrder`
 * (con algo de azar para que no sea siempre el mismo tribunal). La repregunta usa el `follow_up`
 * de la pregunta clínica; si no tiene, pide el mecanismo de esa misma pregunta.
 */
export function buildTribunal(
  questions: ExamQuestion[],
  subjects: Subject[],
  simulations: Simulation[],
  random: () => number = Math.random,
  now: Date = new Date(),
): TribunalStep[] {
  const ordered = practiceOrder(questions, simulations, now);
  const steps: TribunalStep[] = [];
  let clinical: { text: string; follow_up: string | null; subjectId: string | null } | null = null;

  for (const stage of STAGES.slice(0, 4) as Array<Exclude<Stage, "Repregunta">>) {
    const subject = subjects.find((s) => fold(s.name) === fold(stage));
    const pool = subject ? ordered.filter((q) => q.subject_id === subject.id).slice(0, 3) : [];
    const q = pool.length ? pool[Math.floor(random() * pool.length)] : null;
    const text = q?.text ?? FALLBACK[stage].text;
    steps.push({ stage, questionId: q?.id ?? null, text, subjectId: subject?.id ?? null, source: q ? q.source : "Pregunta de respaldo" });
    if (stage === "Clínica") {
      clinical = { text, follow_up: q ? q.follow_up : (FALLBACK.Clínica.follow_up ?? null), subjectId: subject?.id ?? null };
    }
  }

  steps.push({
    stage: "Repregunta",
    questionId: null,
    text: clinical?.follow_up || `Volvamos a lo último: explicame el mecanismo, paso a paso. (${clinical?.text ?? "la pregunta clínica"})`,
    subjectId: clinical?.subjectId ?? null,
    source: "Repregunta del tribunal",
  });
  return steps;
}
