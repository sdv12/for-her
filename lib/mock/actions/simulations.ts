"use client";

import { simulationInput, type SimulationInput } from "@/lib/data/schemas";
import type { Simulation } from "@/lib/data/types";
import { missingText, type Checks } from "@/lib/simulacro";
import { mutate, newRow, touch } from "../store";

/**
 * Guarda la autoevaluación. "Flojo" crea un error (origen simulacro o tribunal) con lo que faltó
 * como corrección sugerida; si ya había uno para esa pregunta, le suma una vez y lo reabre.
 */
export function saveSimulation(input: SimulationInput): { id: string; mistake: "created" | "incremented" | null } {
  const data = simulationInput.parse(input);
  return mutate((db) => {
    const sim: Simulation = { ...newRow(), ...data, audio_path: null };
    db.simulations.push(sim);
    if (data.rating !== "flojo") return { id: sim.id, mistake: null };

    const origin = data.mode === "tribunal" ? "tribunal" : "simulacro";
    const question = data.question_id ? db.exam_questions.find((q) => q.id === data.question_id) : null;
    const correction = [missingText(data.checks as Checks) ?? "Cubriste todo, pero quedó flojo: repasala en voz alta.", question?.model_answer]
      .filter(Boolean)
      .join("\n\n");
    const text = `Flojo en: ${data.question_text}`;

    const existing = db.mistakes.find((m) =>
      data.question_id ? m.origin_ref === data.question_id && (m.origin === "simulacro" || m.origin === "tribunal") : m.text === text,
    );
    if (existing) {
      touch(existing).times += 1;
      existing.resolved_at = null;
      existing.correction = correction;
      return { id: sim.id, mistake: "incremented" as const };
    }
    db.mistakes.push({ ...newRow(), text, correction, origin, origin_ref: data.question_id, times: 1, resolved_at: null });
    return { id: sim.id, mistake: "created" as const };
  });
}
