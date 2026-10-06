"use client";

import { studyLogInput, type StudyLogInput } from "@/lib/data/schemas";
import type { StudyLog } from "@/lib/data/types";
import { mutate, newRow, touch } from "../store";

export function createLog(input: StudyLogInput): string {
  const data = studyLogInput.parse(input);
  return mutate((db) => {
    const log: StudyLog = { ...newRow(), ...data, plan_day_id: null };
    db.study_logs.push(log);
    return log.id;
  });
}

export function updateLog(id: string, input: StudyLogInput) {
  const data = studyLogInput.parse(input);
  mutate((db) => {
    const log = db.study_logs.find((l) => l.id === id);
    if (!log) throw new Error("No encontré ese registro.");
    Object.assign(touch(log), data);
  });
}

export function deleteLog(id: string): StudyLog {
  return mutate((db) => {
    const log = db.study_logs.find((l) => l.id === id);
    if (!log) throw new Error("No encontré ese registro.");
    db.study_logs = db.study_logs.filter((l) => l.id !== id);
    return log;
  });
}

export function restoreLog(log: StudyLog) {
  mutate((db) => {
    db.study_logs.push(log);
  });
}
