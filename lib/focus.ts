/*
 * Pomodoro: modos y cálculo del tiempo. El tiempo se calcula por diferencia (acumulado + now − startedAt),
 * nunca restando segundos de a uno: así sobrevive a cambiar de sección, pestañas en segundo plano, etc.
 */

export type FocusMode = "foco" | "pausa5" | "pausa15";

export const FOCUS_MODES: Array<{ value: FocusMode; label: string; seconds: number }> = [
  { value: "foco", label: "Foco 25", seconds: 25 * 60 },
  { value: "pausa5", label: "Pausa 5", seconds: 5 * 60 },
  { value: "pausa15", label: "Pausa 15", seconds: 15 * 60 },
];

export const BLOCK_MINUTES = 25;

export function plannedSeconds(mode: FocusMode): number {
  return FOCUS_MODES.find((m) => m.value === mode)!.seconds;
}

export type FocusStatus = "idle" | "running" | "paused";

export type FocusState = {
  mode: FocusMode;
  taskId: string | null;
  status: FocusStatus;
  /** Epoch ms del último "Empezar/Continuar" (null si no está corriendo). */
  startedAt: number | null;
  /** Ms ya corridos antes de la última pausa. */
  accumulatedMs: number;
  /** ISO del primer "Empezar" del bloque (para focus_sessions.started_at). */
  sessionStartedAt: string | null;
};

export const INITIAL_FOCUS: FocusState = {
  mode: "foco",
  taskId: null,
  status: "idle",
  startedAt: null,
  accumulatedMs: 0,
  sessionStartedAt: null,
};

export function elapsedMs(s: FocusState, now: number): number {
  return s.accumulatedMs + (s.status === "running" && s.startedAt !== null ? Math.max(0, now - s.startedAt) : 0);
}

export function remainingSeconds(s: FocusState, now: number): number {
  return Math.max(0, Math.ceil((plannedSeconds(s.mode) * 1000 - elapsedMs(s, now)) / 1000));
}

export function formatClock(seconds: number): string {
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

/** Bloques de 25 minutos que hacen falta para el objetivo diario (redondeado hacia arriba). */
export function blocksGoal(dailyGoalMin: number): number {
  return Math.max(1, Math.ceil(dailyGoalMin / BLOCK_MINUTES));
}
