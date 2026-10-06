"use client";

import { z } from "zod";
import type { FocusSession } from "@/lib/data/types";
import { toISODate } from "@/lib/plan-import/dates";
import { mutate, newRow } from "../store";

const focusSessionInput = z.object({
  task_id: z.string().nullable(),
  mode: z.enum(["foco", "pausa5", "pausa15"]),
  planned_sec: z.number().int().positive(),
  started_at: z.iso.datetime(),
  ended_at: z.iso.datetime(),
  completed: z.boolean(),
});

/**
 * Guarda una sesión de foco. Si es un bloque de Foco completo, suma sus minutos
 * al registro del día (un registro por bloque, con la tarea en el detalle).
 */
export function recordFocusSession(input: z.input<typeof focusSessionInput>): { minutesLogged: number } {
  const data = focusSessionInput.parse(input);
  return mutate((db) => {
    const session: FocusSession = { ...newRow(), ...data };
    db.focus_sessions.push(session);
    if (!(data.completed && data.mode === "foco")) return { minutesLogged: 0 };
    const minutes = Math.round(data.planned_sec / 60);
    const task = data.task_id ? db.tasks.find((t) => t.id === data.task_id) : null;
    db.study_logs.push({
      ...newRow(),
      date: toISODate(new Date(data.ended_at)),
      minutes,
      what: task ? `Foco: ${task.title}` : "Bloque de foco",
      mood: null,
      // Sin vínculo al día del plan: destildar el día no tiene que borrar el tiempo de foco.
      plan_day_id: null,
    });
    return { minutesLogged: minutes };
  });
}
