"use client";

import type { DB, ISODate, RouteState, Subject } from "@/lib/data/types";
import { fold } from "@/lib/plan-import/dates";
import { getMateria, MATERIAS } from "@/lib/programa/materias";
import type { Materia } from "@/lib/programa/types";
import { routeMonday } from "@/lib/programa/ruta";
import { colorForNewSubject } from "@/lib/subjects";
import { mutate, newRow } from "../store";

function route(db: DB): RouteState {
  db.route ??= { start: null, done: [] };
  return db.route;
}

/** Empieza (o mueve) la ruta al lunes de la semana de `date`. No borra el avance. */
export function startRoute(date: ISODate) {
  mutate((db) => {
    route(db).start = routeMonday(date);
  });
}

/** Saca la ruta de Hoy y borra su avance. Devuelve el estado anterior para deshacer. */
export function resetRoute(): RouteState {
  return mutate((db) => {
    const prev = structuredClone(route(db));
    db.route = { start: null, done: [] };
    return prev;
  });
}

export function restoreRoute(prev: RouteState) {
  mutate((db) => {
    db.route = prev;
  });
}

/** Marca o desmarca una sesión de la ruta o una respuesta de autoevaluación. Devuelve si quedó hecha. */
export function toggleRouteKey(key: string): boolean {
  return mutate((db) => {
    const r = route(db);
    const has = r.done.includes(key);
    r.done = has ? r.done.filter((k) => k !== key) : [...r.done, key];
    return !has;
  });
}

/** La materia del Temario que corresponde (por nombre u otros nombres, sin acentos ni mayúsculas). */
export function findSubjectFor(db: DB, m: Materia): Subject | undefined {
  const names = new Set([m.name, ...m.aliases].map(fold));
  return db.subjects.find((s) => names.has(fold(s.name)));
}

export type TemarioSummary = { subjectsCreated: number; topicsAdded: number };

function addMateria(db: DB, m: Materia, summary: TemarioSummary) {
  let subject = findSubjectFor(db, m);
  if (!subject) {
    subject = { ...newRow(), name: m.name, color: colorForNewSubject(m.name, db.subjects.length), sort: Math.max(-1, ...db.subjects.map((s) => s.sort)) + 1 };
    db.subjects.push(subject);
    summary.subjectsCreated += 1;
  }
  const subjectId = subject.id;
  const siblings = db.syllabus_topics.filter((t) => t.subject_id === subjectId);
  let sort = Math.max(-1, ...siblings.map((t) => t.sort));
  for (const u of m.unidades) {
    if (siblings.some((t) => fold(t.name) === fold(u.name))) continue;
    db.syllabus_topics.push({ ...newRow(), subject_id: subjectId, name: u.name, level: 0, sort: ++sort });
    summary.topicsAdded += 1;
  }
}

/**
 * Suma al Temario las unidades troncales de las materias pedidas (todas si no se pasan).
 * Solo agrega: no renombra, no borra y no cambia el nivel de lo que ya tenías.
 */
export function addMateriasToTemario(ids?: string[]): TemarioSummary {
  const list = ids ? ids.map((id) => getMateria(id)).filter((m): m is Materia => !!m) : MATERIAS;
  return mutate((db) => {
    const summary: TemarioSummary = { subjectsCreated: 0, topicsAdded: 0 };
    for (const m of list) addMateria(db, m, summary);
    return summary;
  });
}

/** Tilde de un ítem de "Tu día" (Hoy). Devuelve si quedó hecho. Guarda solo las últimas 8 semanas. */
export function toggleDayCheck(key: string): boolean {
  return mutate((db) => {
    const list = db.day_checks ?? [];
    const has = list.includes(key);
    const cutoff = new Date(Date.now() - 56 * 86_400_000).toISOString().slice(0, 10);
    db.day_checks = (has ? list.filter((k) => k !== key) : [...list, key]).filter((k) => k.slice(0, 10) >= cutoff);
    return !has;
  });
}
