"use client";

import { useSyncExternalStore } from "react";
import type { DB } from "@/lib/data/types";
import { buildSeed } from "./seed";

/*
 * PROVISORIO (front sin backend): toda la "base" vive en memoria y se persiste en localStorage.
 * Las acciones de lib/mock/actions/* tienen la forma de las futuras Server Actions;
 * al pasar a Supabase se reemplazan esas funciones y este hook, no los componentes.
 */

const KEY = "forher:db:v1";
const LEGACY_EXAM_KEY = "forher:exam-date";

let cache: DB | null = null;
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    // Sin storage: los cambios duran hasta recargar.
  }
}

function load(): DB {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as DB) : null;
    // Tablas agregadas después de la v1 del formato: se completan vacías para no perder datos guardados.
    if (parsed?.version === 1) cache = { ...parsed, case_attempts: parsed.case_attempts ?? [] };
  } catch {
    cache = null;
  }
  if (!cache) {
    cache = buildSeed();
    // La fecha del examen se guardaba aparte en el paso 3.
    try {
      const legacy = localStorage.getItem(LEGACY_EXAM_KEY);
      if (legacy) cache.profile.exam_date = legacy;
      localStorage.removeItem(LEGACY_EXAM_KEY);
    } catch {}
    persist();
  }
  return cache;
}

function emit() {
  for (const l of listeners) l();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    cache = null;
    emit();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Datos actuales. null en el server y antes de hidratar: mostrar un esqueleto. */
export function useDB(): DB | null {
  return useSyncExternalStore(subscribe, load, () => null);
}

/** Aplica cambios sobre una copia y notifica. Devuelve lo que devuelva la receta. */
export function mutate<T>(recipe: (draft: DB) => T): T {
  const draft = structuredClone(load());
  const result = recipe(draft);
  cache = draft;
  persist();
  emit();
  return result;
}

/** Vuelve a los datos de ejemplo. */
export function resetDB() {
  replaceDB(buildSeed());
}

/** Reemplaza toda la base (restaurar un respaldo, empezar de cero). */
export function replaceDB(next: DB) {
  cache = next;
  persist();
  emit();
}

/** Lectura puntual fuera de React (exportar). */
export function getDB(): DB {
  return load();
}

export function newRow() {
  const ts = new Date().toISOString();
  return { id: crypto.randomUUID(), created_at: ts, updated_at: ts };
}

export function touch<T extends { updated_at: string }>(row: T): T {
  row.updated_at = new Date().toISOString();
  return row;
}
