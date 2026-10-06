"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { INITIAL_FOCUS, type FocusMode, type FocusState } from "@/lib/focus";

/*
 * Estado global del pomodoro (fuera de React, como el store mock) para que el timer siga
 * corriendo al cambiar de sección. Se guarda en sessionStorage: es estado efímero de la UI
 * (sobrevive a una recarga, no a cerrar la pestaña). Las sesiones terminadas sí van a la "base".
 */

const KEY = "forher:focus";
let cache: FocusState | null = null;
const listeners = new Set<() => void>();

function load(): FocusState {
  if (cache) return cache;
  try {
    const raw = sessionStorage.getItem(KEY);
    cache = raw ? { ...INITIAL_FOCUS, ...(JSON.parse(raw) as FocusState) } : INITIAL_FOCUS;
  } catch {
    cache = INITIAL_FOCUS;
  }
  return cache;
}

function set(next: FocusState) {
  cache = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  for (const l of listeners) l();
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useFocus(): FocusState {
  return useSyncExternalStore(subscribe, load, () => INITIAL_FOCUS);
}

export function getFocus(): FocusState {
  return load();
}

/** Date.now() que se refresca mientras `active` (para pintar el reloj). */
export function useNow(active: boolean, everyMs = 500): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setNow(Date.now()), everyMs);
    return () => clearInterval(id);
  }, [active, everyMs]);
  return now;
}

export function startFocus() {
  const s = load();
  if (s.status === "running") return;
  set({ ...s, status: "running", startedAt: Date.now(), sessionStartedAt: s.sessionStartedAt ?? new Date().toISOString() });
}

export function pauseFocus() {
  const s = load();
  if (s.status !== "running" || s.startedAt === null) return;
  set({ ...s, status: "paused", accumulatedMs: s.accumulatedMs + (Date.now() - s.startedAt), startedAt: null });
}

/** Vuelve a cero el bloque actual (mismo modo y tarea). */
export function resetFocus(mode?: FocusMode) {
  const s = load();
  set({ ...INITIAL_FOCUS, mode: mode ?? s.mode, taskId: s.taskId });
}

export function setFocusMode(mode: FocusMode) {
  resetFocus(mode);
}

export function setFocusTask(taskId: string | null) {
  set({ ...load(), taskId });
}
