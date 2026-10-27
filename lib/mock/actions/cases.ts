"use client";

import { z } from "zod";
import { getCase } from "@/lib/cases";
import { finalXp, patientLabel, scoreCase, type CaseScore } from "@/lib/cases/engine";
import type { CaseAttempt } from "@/lib/data/types";
import { toISODate } from "@/lib/plan-import/dates";
import { mutate, newRow, touch } from "../store";

const attemptInput = z.object({
  caseId: z.string().min(1),
  dxAttempts: z.number().int().min(1),
  wrongDx: z.array(z.string()),
  anamnesis: z.array(z.string()),
  exam: z.array(z.string()),
  studies: z.array(z.string()),
  management: z.array(z.string()),
  /** Minutos que llevó el caso (para sumar a Registros). */
  minutes: z.number().int().min(0).max(240),
  mode: z.enum(["examen", "estudio"]).default("examen"),
  hints: z.number().int().min(0).default(0),
  hypotheses: z.array(z.string()).default([]),
  presentation: z.string().max(5000).nullable().default(null),
});

/**
 * Guarda un caso terminado: calcula las estrellas, suma los minutos al registro del día
 * (si fueron al menos 3) y, si hubo diagnósticos errados, los anota en Errores sin duplicar.
 */
export function finishCase(input: z.input<typeof attemptInput>): { attempt: CaseAttempt; score: CaseScore & { hypothesisHit: boolean }; mistake: boolean } {
  const data = attemptInput.parse(input);
  const c = getCase(data.caseId);
  if (!c) throw new Error("No encontré ese caso.");
  const base = scoreCase(c, { dxAttempts: data.dxAttempts, studies: data.studies, management: data.management });
  const correctId = c.diagnosis.options.find((o) => o.correct)?.id;
  const hypothesisHit = !!correctId && data.hypotheses.includes(correctId);
  const score: CaseScore & { hypothesisHit: boolean } = {
    ...base,
    xp: finalXp(base.xp, { mode: data.mode, hints: data.hints, hypothesisHit, level: c.level }),
    hypothesisHit,
  };

  return mutate((db) => {
    const attempt: CaseAttempt = {
      ...newRow(),
      case_id: c.id,
      dx_attempts: data.dxAttempts,
      wrong_dx: data.wrongDx,
      anamnesis: data.anamnesis,
      exam: data.exam,
      studies: data.studies,
      management: data.management,
      stars_dx: score.dx,
      stars_studies: score.studies,
      stars_management: score.management,
      xp: score.xp,
      minutes: data.minutes,
      mode: data.mode,
      hints: data.hints,
      hypotheses: data.hypotheses,
      presentation: data.presentation?.trim() || null,
    };
    db.case_attempts.push(attempt);

    if (data.minutes >= 3) {
      db.study_logs.push({
        ...newRow(),
        date: toISODate(new Date()),
        minutes: data.minutes,
        what: `Caso clínico: ${c.debrief.diagnosis}`,
        mood: null,
        plan_day_id: null,
      });
    }

    let mistake = false;
    if (data.wrongDx.length) {
      const wrong = c.diagnosis.options.filter((o) => data.wrongDx.includes(o.id));
      const correction = [
        `Era: ${c.debrief.diagnosis}`,
        ...wrong.map((o) => `“${o.label}”: ${o.why}`),
      ].join("\n\n");
      const existing = db.mistakes.find((m) => m.origin === "caso" && m.origin_ref === c.id);
      if (existing) {
        touch(existing).times += 1;
        existing.resolved_at = null;
        existing.correction = correction;
      } else {
        db.mistakes.push({
          ...newRow(),
          text: `Caso clínico (${patientLabel(c.patient).toLowerCase()}): pensé en ${wrong.map((o) => o.label.toLowerCase()).join(" y en ")}`,
          correction,
          origin: "caso",
          origin_ref: c.id,
          times: 1,
          resolved_at: null,
        });
      }
      mistake = true;
    }
    return { attempt, score, mistake };
  });
}
