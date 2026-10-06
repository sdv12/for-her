"use client";

import { taskInput, type TaskInput } from "@/lib/data/schemas";
import type { DB, Task, TaskStatus } from "@/lib/data/types";
import { mutate, newRow, touch } from "../store";

function find(db: DB, id: string): Task {
  const task = db.tasks.find((t) => t.id === id);
  if (!task) throw new Error("No encontré esa tarea.");
  return task;
}

/** Tarea propia nueva: entra arriba de "Pendiente". */
export function createTask(input: TaskInput): string {
  const data = taskInput.parse(input);
  return mutate((db) => {
    const pend = db.tasks.filter((t) => t.status === "pend").map((t) => t.position);
    const task: Task = {
      ...newRow(),
      ...data,
      status: "pend",
      origin: "mia",
      plan_day_id: null,
      position: pend.length ? Math.min(...pend) - 1 : 1,
    };
    db.tasks.push(task);
    return task.id;
  });
}

export function updateTask(id: string, input: TaskInput) {
  const data = taskInput.parse(input);
  mutate((db) => {
    Object.assign(touch(find(db, id)), data);
  });
}

/**
 * Cambia de estado y/o de lugar. Sin `position` (botones ← →) la tarea queda
 * arriba de la columna destino, donde se la ve.
 */
export function moveTask(id: string, status: TaskStatus, position?: number) {
  mutate((db) => {
    const task = touch(find(db, id));
    if (position === undefined) {
      const col = db.tasks.filter((t) => t.status === status && t.id !== id).map((t) => t.position);
      position = col.length ? Math.min(...col) - 1 : 1;
    }
    task.status = status;
    task.position = position;
  });
}

export function deleteTask(id: string): Task {
  return mutate((db) => {
    const task = find(db, id);
    db.tasks = db.tasks.filter((t) => t.id !== id);
    return task;
  });
}

export function restoreTask(task: Task) {
  mutate((db) => {
    db.tasks.push(task);
  });
}
