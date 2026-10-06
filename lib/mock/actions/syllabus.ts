"use client";

import { subjectInput, topicName, type SubjectInput } from "@/lib/data/schemas";
import type { DB, Subject, SyllabusTopic } from "@/lib/data/types";
import { fold } from "@/lib/plan-import/dates";
import { nextLevel } from "@/lib/syllabus";
import { mutate, newRow, touch } from "../store";

function topic(db: DB, id: string): SyllabusTopic {
  const t = db.syllabus_topics.find((x) => x.id === id);
  if (!t) throw new Error("No encontré ese tema.");
  return t;
}

export function cycleTopicLevel(id: string) {
  mutate((db) => {
    const t = touch(topic(db, id));
    t.level = nextLevel(t.level);
  });
}

/** Agrega un tema al final de la materia. Si ya existe (sin importar acentos), no lo duplica. */
export function addTopic(subjectId: string, name: string): "added" | "exists" {
  const clean = topicName.parse(name);
  return mutate((db) => {
    const siblings = db.syllabus_topics.filter((t) => t.subject_id === subjectId);
    if (siblings.some((t) => fold(t.name) === fold(clean))) return "exists" as const;
    db.syllabus_topics.push({ ...newRow(), subject_id: subjectId, name: clean, level: 0, sort: Math.max(-1, ...siblings.map((t) => t.sort)) + 1 });
    return "added" as const;
  });
}

export function renameTopic(id: string, name: string) {
  const clean = topicName.parse(name);
  mutate((db) => {
    touch(topic(db, id)).name = clean;
  });
}

export function deleteTopic(id: string): SyllabusTopic {
  return mutate((db) => {
    const t = topic(db, id);
    db.syllabus_topics = db.syllabus_topics.filter((x) => x.id !== id);
    return t;
  });
}

export function restoreTopic(t: SyllabusTopic) {
  mutate((db) => {
    db.syllabus_topics.push(t);
  });
}

export function createSubject(input: SubjectInput): string {
  const data = subjectInput.parse(input);
  return mutate((db) => {
    if (db.subjects.some((s) => fold(s.name) === fold(data.name))) throw new Error("Ya tenés una materia con ese nombre.");
    const s: Subject = { ...newRow(), ...data, sort: Math.max(-1, ...db.subjects.map((x) => x.sort)) + 1 };
    db.subjects.push(s);
    return s.id;
  });
}

export function updateSubject(id: string, input: SubjectInput) {
  const data = subjectInput.parse(input);
  mutate((db) => {
    if (db.subjects.some((s) => s.id !== id && fold(s.name) === fold(data.name))) throw new Error("Ya tenés una materia con ese nombre.");
    const s = db.subjects.find((x) => x.id === id);
    if (!s) throw new Error("No encontré esa materia.");
    Object.assign(touch(s), data);
  });
}

/** Lo que impide borrar una materia: tarjetas y preguntas la necesitan. */
export function subjectUsage(db: DB, id: string) {
  return {
    cards: db.cards.filter((c) => c.subject_id === id).length,
    questions: db.exam_questions.filter((q) => q.subject_id === id).length,
    tasks: db.tasks.filter((t) => t.subject_id === id).length,
  };
}

export type DeletedSubject = { subject: Subject; topics: SyllabusTopic[]; taskIds: string[] };

/** Borra la materia y sus temas; las tareas quedan "Sin materia". No se puede si tiene tarjetas o preguntas. */
export function deleteSubject(id: string): DeletedSubject {
  return mutate((db) => {
    const usage = subjectUsage(db, id);
    if (usage.cards || usage.questions) throw new Error("Tiene tarjetas o preguntas: pasalas a otra materia antes de borrarla.");
    const subject = db.subjects.find((s) => s.id === id);
    if (!subject) throw new Error("No encontré esa materia.");
    const topics = db.syllabus_topics.filter((t) => t.subject_id === id);
    const taskIds = db.tasks.filter((t) => t.subject_id === id).map((t) => t.id);
    db.subjects = db.subjects.filter((s) => s.id !== id);
    db.syllabus_topics = db.syllabus_topics.filter((t) => t.subject_id !== id);
    for (const t of db.tasks) if (t.subject_id === id) t.subject_id = null;
    return { subject, topics, taskIds };
  });
}

export function restoreSubject({ subject, topics, taskIds }: DeletedSubject) {
  mutate((db) => {
    db.subjects.push(subject);
    db.syllabus_topics.push(...topics);
    for (const t of db.tasks) if (taskIds.includes(t.id)) t.subject_id = subject.id;
  });
}
