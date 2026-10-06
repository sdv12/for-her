"use client";

import { questionInput, type QuestionInput } from "@/lib/data/schemas";
import type { DB, ExamQuestion, Simulation } from "@/lib/data/types";
import { normalizeQuestion, type BankRow } from "@/lib/questions";
import { mutate, newRow, touch } from "../store";
import { ensureSubject } from "./subjects";

export const BANK_SOURCE = "Banco del cronograma";

function find(db: DB, id: string): ExamQuestion {
  const q = db.exam_questions.find((x) => x.id === id);
  if (!q) throw new Error("No encontré esa pregunta.");
  return q;
}

function fields(db: DB, input: QuestionInput) {
  const data = questionInput.parse(input);
  return {
    text: data.text,
    subject_id: data.new_subject ? ensureSubject(db, data.new_subject)! : data.subject_id,
    source: data.source || null,
    asked_on: data.asked_on || null,
    priority: data.priority,
    model_answer: data.model_answer || null,
  };
}

/** Pregunta con el mismo texto (normalizado), si ya está en el banco. */
export function findDuplicate(db: DB, text: string, exceptId?: string): ExamQuestion | null {
  const key = normalizeQuestion(text);
  return db.exam_questions.find((q) => q.id !== exceptId && normalizeQuestion(q.text) === key) ?? null;
}

/** "Encontré una pregunta": cuenta como tomada una vez. */
export function createQuestion(input: QuestionInput): string {
  return mutate((db) => {
    const q: ExamQuestion = { ...newRow(), ...fields(db, input), times_asked: 1, follow_up: null };
    db.exam_questions.push(q);
    return q.id;
  });
}

export function updateQuestion(id: string, input: QuestionInput) {
  mutate((db) => {
    Object.assign(touch(find(db, id)), fields(db, input));
  });
}

/** "+1: la tomaron otra vez". Devuelve el total nuevo. */
export function incrementAsked(id: string): number {
  return mutate((db) => {
    const q = touch(find(db, id));
    q.times_asked += 1;
    return q.times_asked;
  });
}

export function decrementAsked(id: string) {
  mutate((db) => {
    const q = touch(find(db, id));
    q.times_asked = Math.max(0, q.times_asked - 1);
  });
}

export function deleteQuestion(id: string): { question: ExamQuestion; simulations: Simulation[] } {
  return mutate((db) => {
    const question = find(db, id);
    // Los simulacros conservan el texto; solo se desvinculan.
    const simulations = db.simulations.filter((s) => s.question_id === id).map((s) => ({ ...s }));
    for (const s of db.simulations) if (s.question_id === id) s.question_id = null;
    db.exam_questions = db.exam_questions.filter((q) => q.id !== id);
    return { question, simulations };
  });
}

export function restoreQuestion({ question, simulations }: { question: ExamQuestion; simulations: Simulation[] }) {
  mutate((db) => {
    db.exam_questions.push(question);
    for (const s of simulations) {
      const current = db.simulations.find((x) => x.id === s.id);
      if (current) current.question_id = question.id;
    }
  });
}

/**
 * Importa el banco. Deduplica por texto normalizado contra lo que ya hay y dentro del mismo archivo.
 * Las del banco entran con 0 "veces tomada": no las tomó nadie todavía, son material del cronograma.
 */
export function importQuestions(rows: BankRow[]): { added: number; duplicates: number; newSubjects: string[] } {
  return mutate((db) => {
    const seen = new Set(db.exam_questions.map((q) => normalizeQuestion(q.text)));
    const before = new Set(db.subjects.map((s) => s.id));
    let added = 0;
    let duplicates = 0;
    for (const r of rows) {
      const key = normalizeQuestion(r.text);
      if (seen.has(key)) {
        duplicates += 1;
        continue;
      }
      seen.add(key);
      db.exam_questions.push({
        ...newRow(),
        text: r.text,
        subject_id: ensureSubject(db, r.subject)!,
        source: r.source ?? BANK_SOURCE,
        asked_on: null,
        times_asked: 0,
        priority: r.priority,
        model_answer: null,
        follow_up: null,
      });
      added += 1;
    }
    return { added, duplicates, newSubjects: db.subjects.filter((s) => !before.has(s.id)).map((s) => s.name) };
  });
}
