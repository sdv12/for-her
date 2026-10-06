"use client";

import { useMemo } from "react";
import { currentWeek, selectActivePlan } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { useDB } from "./store";

export type NavBadges = {
  tareasAbiertas: number;
  tarjetasHoy: number;
  preguntas: number;
  erroresAbiertos: number;
  semanaActual: number | null;
};

const EMPTY: NavBadges = { tareasAbiertas: 0, tarjetasHoy: 0, preguntas: 0, erroresAbiertos: 0, semanaActual: null };

/** Conteos de los badges de navegación, calculados desde los datos. */
export function useNavBadges(): NavBadges {
  const db = useDB();
  return useMemo(() => {
    if (!db) return EMPTY;
    const now = new Date();
    const view = selectActivePlan(db);
    return {
      tareasAbiertas: db.tasks.filter((t) => t.status !== "dominado").length,
      tarjetasHoy: db.cards.filter((c) => new Date(c.due_at) <= now).length,
      preguntas: db.exam_questions.length,
      erroresAbiertos: db.mistakes.filter((m) => !m.resolved_at).length,
      semanaActual: view ? (currentWeek(view.weeks, toISODate(now))?.num ?? null) : null,
    };
  }, [db]);
}
