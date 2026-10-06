/*
 * Punto de enganche para corregir respuestas del simulacro con IA (fuera de alcance en v1).
 *
 * La idea: después de grabar (y transcribir) la respuesta, un endpoint del server
 * (p. ej. app/api/simulacro/review/route.ts) recibe este request, le pide al modelo que evalúe
 * la estructura causa → mecanismo → consecuencia clínica → diagnóstico → conducta y devuelve
 * el mismo formato de checks que usa la checklist, para precargarla.
 * Nada de esto se llama todavía: la UI usa solo la autoevaluación.
 */

import type { Checks, SelfRating } from "@/lib/simulacro";

export type SimulationReviewRequest = {
  question: string;
  /** Respuesta transcripta de la grabación. */
  answerTranscript: string;
  /** Respuesta modelo de la pregunta, si existe. */
  modelAnswer: string | null;
};

export type SimulationReviewResponse = {
  checks: Checks;
  suggestedRating: SelfRating;
  /** Qué faltó o qué estuvo mal, en voseo y sin tono culposo. */
  feedback: string;
};

export async function requestSimulationReview(req: SimulationReviewRequest): Promise<SimulationReviewResponse> {
  void req;
  throw new Error("La corrección con IA todavía no está disponible.");
}
