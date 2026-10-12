"use client";

import type { DB, PlanDay, PlanPhase, PlanWeek } from "@/lib/data/types";
import { dayDate, detectTopics } from "@/lib/plan-import/draft";
import { fold } from "@/lib/plan-import/dates";
import { importOptionsSchema, planDraftSchema, type ImportOptions } from "@/lib/plan-import/schema";
import type { PlanDraft } from "@/lib/plan-import/types";
import { kindFromMode } from "@/lib/plan";
import { normalizeQuestion } from "@/lib/questions";
import { mutate, newRow } from "../store";
import { ensureSubject } from "./subjects";

export type ImportSummary = { weeks: number; days: number; tasks: number; topics: number; questions: number };

/** Borra el plan activo con su estructura y sus tareas del plan. Los registros quedan, desvinculados. */
function removeActivePlan(db: DB) {
  const plan = db.plans.find((p) => p.is_active);
  if (!plan) return;
  const weekIds = new Set(db.plan_weeks.filter((w) => w.plan_id === plan.id).map((w) => w.id));
  const dayIds = new Set(db.plan_days.filter((d) => weekIds.has(d.week_id)).map((d) => d.id));
  db.plans = db.plans.filter((p) => p.id !== plan.id);
  db.plan_phases = db.plan_phases.filter((p) => p.plan_id !== plan.id);
  db.plan_weeks = db.plan_weeks.filter((w) => w.plan_id !== plan.id);
  db.plan_days = db.plan_days.filter((d) => !dayIds.has(d.id));
  db.tasks = db.tasks.filter((t) => !(t.plan_day_id && dayIds.has(t.plan_day_id)));
  for (const log of db.study_logs) if (log.plan_day_id && dayIds.has(log.plan_day_id)) log.plan_day_id = null;
}

/**
 * Guarda el cronograma revisado.
 * - replace: reemplaza el plan activo (y sus tareas del plan).
 * - merge: suma al plan activo las fases y semanas nuevas (por número) y, en las que ya existen,
 *   los días que no estaban (misma fecha y contenido). No borra nada.
 * Crea una tarea "Plan" por día nuevo y, si se pide, los temas detectados en el Temario.
 */
export function importPlan(input: PlanDraft, options: ImportOptions): ImportSummary {
  const draft = planDraftSchema.parse(input);
  const { mode, createTopics, addQuestions } = importOptionsSchema.parse(options);

  return mutate((db) => {
    const summary: ImportSummary = { weeks: 0, days: 0, tasks: 0, topics: 0, questions: 0 };
    if (mode === "replace") removeActivePlan(db);

    let plan = db.plans.find((p) => p.is_active);
    if (!plan) {
      plan = { ...newRow(), title: draft.title, start_date: draft.start, is_active: true };
      db.plans.push(plan);
    }
    const planId = plan.id;
    let position = Math.max(0, ...db.tasks.map((t) => t.position));

    for (const dp of draft.phases) {
      let phase = db.plan_phases.find((p) => p.plan_id === planId && p.num === dp.num);
      if (!phase) {
        phase = { ...newRow(), plan_id: planId, num: dp.num, code: dp.code, name: dp.name, description: dp.description, alert: dp.alert } satisfies PlanPhase;
        db.plan_phases.push(phase);
      }

      for (const dw of dp.weeks) {
        let week = db.plan_weeks.find((w) => w.plan_id === planId && w.num === dw.num);
        if (!week) {
          week = {
            ...newRow(),
            plan_id: planId,
            phase_id: phase.id,
            num: dw.num,
            start_date: dw.start,
            end_date: dw.end,
            title: dw.title,
            tip: dw.tip ?? null,
            priority: dw.priority ?? null,
          } satisfies PlanWeek;
          db.plan_weeks.push(week);
          summary.weeks += 1;
        } else {
          // Fusión: completa lo que la semana existente no tenía.
          week.tip ??= dw.tip ?? null;
          week.priority ??= dw.priority ?? null;
        }
        const weekId = week.id;
        const range = { start: week.start_date, end: week.end_date };
        const existing = db.plan_days.filter((d) => d.week_id === weekId);
        const subjectId = ensureSubject(db, dw.subject);

        dw.days.forEach((dd, i) => {
          // Si la semana ya existía (fusión), el día va dentro de SU rango de fechas.
          const date = range.start === dw.start && range.end === dw.end ? dd.date : dayDate(range, dd.weekday).date;
          if (existing.some((d) => d.date === date && fold(d.content) === fold(dd.content))) return;
          const day: PlanDay = {
            ...newRow(),
            week_id: weekId,
            date,
            weekday: dd.weekday,
            content: dd.content,
            mode: dd.mode,
            done_at: null,
            sort: existing.length + i,
          };
          db.plan_days.push(day);
          summary.days += 1;
          db.tasks.push({
            ...newRow(),
            title: dd.content,
            subject_id: subjectId,
            kind: kindFromMode(dd.mode),
            status: "pend",
            origin: "plan",
            plan_day_id: day.id,
            due_date: date,
            position: ++position,
            notes: null,
          });
          summary.tasks += 1;
        });
      }
    }

    if (createTopics) {
      for (const t of detectTopics(draft)) {
        const subjectId = ensureSubject(db, t.subject)!;
        const topics = db.syllabus_topics.filter((x) => x.subject_id === subjectId);
        if (topics.some((x) => fold(x.name) === fold(t.name))) continue;
        db.syllabus_topics.push({ ...newRow(), subject_id: subjectId, name: t.name, level: 0, sort: topics.length });
        summary.topics += 1;
      }
    }

    if (addQuestions && draft.questions?.length) {
      const seen = new Set(db.exam_questions.map((q) => normalizeQuestion(q.text)));
      const subjectOfWeek = new Map(draft.phases.flatMap((p) => p.weeks).map((w) => [w.num, w.subject]));
      for (const q of draft.questions) {
        const key = normalizeQuestion(q.text);
        if (seen.has(key)) continue;
        seen.add(key);
        db.exam_questions.push({
          ...newRow(),
          text: q.text,
          subject_id: ensureSubject(db, (q.weekNum !== null ? subjectOfWeek.get(q.weekNum) : null) ?? "Clínica")!,
          source: q.weekNum !== null ? `Cronograma · semana ${q.weekNum}` : "Cronograma",
          asked_on: null,
          times_asked: 0,
          priority: q.priority,
          model_answer: null,
          follow_up: null,
        });
        summary.questions += 1;
      }
    }

    return summary;
  });
}
