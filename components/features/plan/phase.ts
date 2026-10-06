import type { PlanPhase } from "@/lib/data/types";

/** Color de fondo de una fase (F1–F6, y rota si hay más). */
export function phaseColor(num: number): string {
  return `var(--phase-${((num - 1) % 6) + 1})`;
}

/** Etiqueta corta de la fase: su código del cronograma ("2a") o el número. */
export function phaseLabel(phase: Pick<PlanPhase, "num" | "code">): string {
  return phase.code || String(phase.num);
}
