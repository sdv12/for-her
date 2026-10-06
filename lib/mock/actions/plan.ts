"use client";

import { planDayInput, minutesInput, type PlanDayInput } from "@/lib/data/schemas";
import type { DB, PlanDay, StudyLog, Task } from "@/lib/data/types";
import { weekdayOf } from "@/lib/plan-import/dates";
import { kindFromMode } from "@/lib/plan";
import { mutate, newRow, touch } from "../store";

/*
 * Acciones del Plan. Misma forma que tendrán las Server Actions:
 * validan con Zod, devuelven datos planos y nunca dejan la base a medias.
 */

function assertInWeek(db: DB, weekId: string, date: string) {
  const week = db.plan_weeks.find((w) => w.id === weekId);
  if (!week) throw new Error("No encontré esa semana del plan.");
  if (date < week.start_date || date > week.end_date) throw new Error("La fecha tiene que caer dentro de la semana.");
}

type ToggleResult = { done: true; logId: string; minutes: number } | { done: false };

/**
 * Tildar: marca el día, pasa su tarea a "A repasar" (si estaba pendiente o en curso)
 * y crea un registro sugerido con el objetivo diario. Destildar revierte las tres cosas.
 */
export function togglePlanDay(dayId: string): ToggleResult {
  return mutate((db) => {
    const day = db.plan_days.find((d) => d.id === dayId);
    if (!day) throw new Error("No encontré ese día del plan.");
    const task = db.tasks.find((t) => t.plan_day_id === dayId);

    if (!day.done_at) {
      touch(day).done_at = new Date().toISOString();
      if (task && (task.status === "pend" || task.status === "curso")) touch(task).status = "repasar";
      const minutes = db.profile.daily_goal_min || 60;
      const log: StudyLog = { ...newRow(), date: day.date, minutes, what: day.content, mood: null, plan_day_id: day.id };
      db.study_logs.push(log);
      return { done: true as const, logId: log.id, minutes };
    }

    touch(day).done_at = null;
    if (task?.status === "repasar") touch(task).status = "pend";
    db.study_logs = db.study_logs.filter((l) => l.plan_day_id !== dayId);
    return { done: false as const };
  });
}

export function updatePlanDay(dayId: string, input: PlanDayInput) {
  const data = planDayInput.parse(input);
  mutate((db) => {
    const day = db.plan_days.find((d) => d.id === dayId);
    if (!day) throw new Error("No encontré ese día del plan.");
    assertInWeek(db, day.week_id, data.date);
    Object.assign(touch(day), { ...data, weekday: weekdayOf(data.date) });
    const task = db.tasks.find((t) => t.plan_day_id === dayId);
    if (task) Object.assign(touch(task), { title: data.content, kind: kindFromMode(data.mode), due_date: data.date });
  });
}

export function addPlanDay(weekId: string, input: PlanDayInput): string {
  const data = planDayInput.parse(input);
  return mutate((db) => {
    assertInWeek(db, weekId, data.date);
    const siblings = db.plan_days.filter((d) => d.week_id === weekId);
    const day: PlanDay = {
      ...newRow(),
      week_id: weekId,
      ...data,
      weekday: weekdayOf(data.date),
      done_at: null,
      sort: Math.max(-1, ...siblings.map((d) => d.sort)) + 1,
    };
    db.plan_days.push(day);
    // La materia la hereda de las otras tareas de la misma semana.
    const siblingIds = new Set(siblings.map((d) => d.id));
    const subjectId = db.tasks.find((t) => t.plan_day_id && siblingIds.has(t.plan_day_id))?.subject_id ?? null;
    db.tasks.push({
      ...newRow(),
      title: data.content,
      subject_id: subjectId,
      kind: kindFromMode(data.mode),
      status: "pend",
      origin: "plan",
      plan_day_id: day.id,
      due_date: data.date,
      position: Math.max(0, ...db.tasks.map((t) => t.position)) + 1,
      notes: null,
    });
    return day.id;
  });
}

export type DeletedPlanDay = { day: PlanDay; tasks: Task[]; logs: StudyLog[] };

/** Borra el día con su tarea y registros vinculados. Devuelve lo necesario para deshacer. */
export function deletePlanDay(dayId: string): DeletedPlanDay {
  return mutate((db) => {
    const day = db.plan_days.find((d) => d.id === dayId);
    if (!day) throw new Error("No encontré ese día del plan.");
    const tasks = db.tasks.filter((t) => t.plan_day_id === dayId);
    const logs = db.study_logs.filter((l) => l.plan_day_id === dayId);
    db.plan_days = db.plan_days.filter((d) => d.id !== dayId);
    db.tasks = db.tasks.filter((t) => t.plan_day_id !== dayId);
    db.study_logs = db.study_logs.filter((l) => l.plan_day_id !== dayId);
    return { day, tasks, logs };
  });
}

export function restorePlanDay({ day, tasks, logs }: DeletedPlanDay) {
  mutate((db) => {
    db.plan_days.push(day);
    db.tasks.push(...tasks);
    db.study_logs.push(...logs);
  });
}

export function setStudyLogMinutes(logId: string, minutes: unknown) {
  const value = minutesInput.parse(minutes);
  mutate((db) => {
    const log = db.study_logs.find((l) => l.id === logId);
    if (log) touch(log).minutes = value;
  });
}

export function deleteStudyLog(logId: string) {
  mutate((db) => {
    db.study_logs = db.study_logs.filter((l) => l.id !== logId);
  });
}
