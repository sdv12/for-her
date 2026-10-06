import type { SyllabusTopic } from "@/lib/data/types";

export type Level = SyllabusTopic["level"];

export const LEVELS: Array<{ value: Level; label: string; className: string }> = [
  { value: 0, label: "No visto", className: "border-dashed border-muted/60 bg-transparent text-ink" },
  { value: 1, label: "Leído", className: "border-transparent bg-sunken text-ink" },
  { value: 2, label: "Repasado", className: "border-transparent bg-honey-soft text-ink" },
  { value: 3, label: "Dominado", className: "border-transparent bg-sage text-ink dark:text-canvas" },
];

/** No visto → Leído → Repasado → Dominado → No visto. */
export function nextLevel(level: Level): Level {
  return ((level + 1) % 4) as Level;
}

/** % de dominio: suma de niveles / (3 × cantidad de temas). null si no hay temas. */
export function mastery(topics: Pick<SyllabusTopic, "level">[]): number | null {
  if (topics.length === 0) return null;
  const sum = topics.reduce((n, t) => n + t.level, 0);
  return Math.round((sum / (3 * topics.length)) * 100);
}
