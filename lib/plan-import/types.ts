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
};

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

export type PlanDraft = { title: string; start: ISODate; phases: DraftPhase[] };

export type ParseResult =
  | { ok: true; draft: PlanDraft; warnings: string[] }
  | { ok: false; error: string; issues?: string[] };
