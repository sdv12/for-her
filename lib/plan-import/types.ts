import type { ISODate, Weekday } from "@/lib/data/types";

/*
 * Borrador del cronograma: lo que producen los parsers y edita la vista previa
 * antes de guardar. `key` es solo para React; los ids reales se crean al importar.
 */

export type DraftDay = { key: string; weekday: Weekday; date: ISODate; content: string; mode: string };

export type DraftWeek = {
  key: string;
  num: number;
  start: ISODate;
  end: ISODate;
  title: string;
  /** Nombre de materia sugerido (para la tarea del Tablero y los temas). */
  subject: string | null;
  days: DraftDay[];
  /** "Tip del tribunal" de la semana, si el cronograma lo trae. */
  tip?: string | null;
  /** Prioridad de la semana tal como la escribe el cronograma ("Alta", "Media", "Crítica"). */
  priority?: string | null;
  /** Subtemas explícitos (van al Temario). Si no hay, se detectan del contenido de los días. */
  topics?: string[];
};

/** Pregunta de práctica que trae el cronograma (va al banco de Preguntas de examen). */
export type DraftQuestion = { key: string; weekNum: number | null; text: string; priority: 1 | 2 | 3 };

export type DraftPhase = {
  key: string;
  num: number;
  /** Como figura en el documento ("2a", "3+4"); puede no ser un número. */
  code: string;
  name: string;
  description: string | null;
  alert: string | null;
  weeks: DraftWeek[];
};

export type PlanDraft = { title: string; start: ISODate; phases: DraftPhase[]; questions?: DraftQuestion[] };

export type ParseResult =
  | { ok: true; draft: PlanDraft; warnings: string[] }
  | { ok: false; error: string; issues?: string[] };
