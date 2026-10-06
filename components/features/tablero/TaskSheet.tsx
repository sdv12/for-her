"use client";

import Link from "next/link";
import { Target, Trash2 } from "lucide-react";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import type { TaskInput } from "@/lib/data/schemas";
import type { PlanDay, Subject, Task } from "@/lib/data/types";
import { formatShortDate } from "@/lib/plan";
import { STATUS_LABEL } from "@/lib/tasks";
import { TaskForm } from "./TaskForm";

type Props = {
  /** null = tarea nueva. */
  task: Task | null;
  planDay: PlanDay | null;
  subjects: Subject[];
  onClose: () => void;
  onSave: (data: TaskInput) => void;
  onDelete?: () => void;
};

/** Panel lateral (desktop) o sheet (celular) para crear o editar una tarea. */
export function TaskSheet({ task, planDay, subjects, onClose, onSave, onDelete }: Props) {
  const initial: TaskInput = task
    ? { title: task.title, subject_id: task.subject_id, kind: task.kind, due_date: task.due_date, notes: task.notes }
    : { title: "", subject_id: null, kind: "lectura", due_date: null, notes: null };

  return (
    <Sheet
      open
      onClose={onClose}
      title={task ? "Tarea" : "Nueva tarea"}
      footer={
        <div className="flex flex-wrap gap-2">
          <Button type="submit" form="task-form" variant="primary" className="flex-1">
            {task ? "Guardar" : "Crear tarea"}
          </Button>
          {task && (
            <Link href={`/foco?tarea=${task.id}`} className={buttonClasses({ variant: "secondary" })}>
              <Target aria-hidden /> Enfocar
            </Link>
          )}
          {onDelete && (
            <Button variant="ghost" onClick={onDelete} aria-label="Borrar tarea" size="icon" className="text-muted">
              <Trash2 aria-hidden />
            </Button>
          )}
        </div>
      }
    >
      {task && (
        <p className="mb-4 text-sm text-muted">
          {STATUS_LABEL[task.status]}
          {planDay && ` · Viene del plan: ${planDay.weekday} ${formatShortDate(planDay.date)}`}
        </p>
      )}
      <TaskForm id="task-form" initial={initial} subjects={subjects} onSubmit={onSave} />
    </Sheet>
  );
}
