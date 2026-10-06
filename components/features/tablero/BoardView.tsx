"use client";

import { useMemo, useState } from "react";
import { Plus, SquareKanban } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Dot, Pill } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import type { TaskStatus } from "@/lib/data/types";
import { createTask, deleteTask, moveTask, restoreTask, updateTask } from "@/lib/mock/actions/tasks";
import { useDB } from "@/lib/mock/store";
import { toISODate } from "@/lib/plan-import/dates";
import { subjectColorVar } from "@/lib/subjects";
import { dueLabel, STATUS_LABEL, STATUSES } from "@/lib/tasks";
import { DESKTOP_QUERY, useMediaQuery } from "@/lib/useMediaQuery";
import { DesktopBoard } from "./DesktopBoard";
import { MobileBoard } from "./MobileBoard";
import type { BoardItem } from "./TaskCard";
import { TaskSheet } from "./TaskSheet";

type Origin = "todas" | "plan" | "mia";

export function BoardView() {
  const db = useDB();
  const toast = useToast();
  const isDesktop = useMediaQuery(DESKTOP_QUERY);
  const [origin, setOrigin] = useState<Origin>("todas");
  const [subjectId, setSubjectId] = useState<string | null>(null);
  // undefined = cerrado; null = tarea nueva; id = editando.
  const [open, setOpen] = useState<string | null | undefined>(undefined);

  const data = useMemo(() => {
    if (!db) return null;
    const today = toISODate(new Date());
    const subjects = new Map(db.subjects.map((s) => [s.id, s]));
    const weekOfDay = new Map(db.plan_days.map((d) => [d.id, d.week_id]));
    const weekNum = new Map(db.plan_weeks.map((w) => [w.id, w.num]));

    const columns = Object.fromEntries(STATUSES.map((s) => [s.value, [] as BoardItem[]])) as Record<TaskStatus, BoardItem[]>;
    const sorted = [...db.tasks].sort((a, b) => a.position - b.position);
    for (const task of sorted) {
      if (origin !== "todas" && task.origin !== origin) continue;
      if (subjectId && task.subject_id !== subjectId) continue;
      const subject = task.subject_id ? subjects.get(task.subject_id) : undefined;
      const week = task.plan_day_id ? weekNum.get(weekOfDay.get(task.plan_day_id) ?? "") : undefined;
      columns[task.status].push({
        task,
        subjectName: subject?.name ?? null,
        subjectColor: subject ? subjectColorVar(subject.color) : null,
        due: dueLabel(task.due_date, today, week),
      });
    }
    const usedSubjects = db.subjects.filter((s) => db.tasks.some((t) => t.subject_id === s.id)).sort((a, b) => a.sort - b.sort);
    return { columns, usedSubjects };
  }, [db, origin, subjectId]);

  const header = (
    <PageHeader
      kicker="Planificar"
      title="Tablero"
      actions={
        <Button variant="primary" onClick={() => setOpen(null)} disabled={!db}>
          <Plus aria-hidden /> Nueva tarea
        </Button>
      }
    />
  );

  if (!db || !data) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando el tablero" className="grid animate-pulse grid-cols-1 gap-3 desk:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-72 rounded-card bg-sunken" />
          ))}
        </div>
      </>
    );
  }

  const editing = open ? db.tasks.find((t) => t.id === open) ?? null : null;
  const planDay = editing?.plan_day_id ? (db.plan_days.find((d) => d.id === editing.plan_day_id) ?? null) : null;

  function move(id: string, status: TaskStatus, position?: number) {
    const before = db!.tasks.find((t) => t.id === id);
    moveTask(id, status, position);
    if (before && before.status !== status) toast({ message: `Pasó a ${STATUS_LABEL[status]}.` });
  }

  return (
    <>
      {header}

      {db.tasks.length === 0 ? (
        <EmptyState
          icon={SquareKanban}
          title="El tablero está vacío"
          action={
            <Button variant="primary" onClick={() => setOpen(null)}>
              <Plus aria-hidden /> Nueva tarea
            </Button>
          }
        >
          Cuando importes el cronograma, cada día del plan aparece acá como tarea. También podés sumar las tuyas.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-4">
          <div role="group" aria-label="Filtros" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 desk:mx-0 desk:flex-wrap desk:px-0">
            {(
              [
                ["todas", "Todas"],
                ["plan", "Del plan"],
                ["mia", "Mías"],
              ] as const
            ).map(([value, label]) => (
              <Pill key={value} selected={origin === value} onClick={() => setOrigin(value)}>
                {label}
              </Pill>
            ))}
            <span aria-hidden className="mx-1 my-2 w-px shrink-0 bg-line" />
            {data.usedSubjects.map((s) => (
              <Pill key={s.id} selected={subjectId === s.id} onClick={() => setSubjectId((cur) => (cur === s.id ? null : s.id))}>
                <Dot color={subjectColorVar(s.color)} /> {s.name}
              </Pill>
            ))}
          </div>

          {isDesktop ? (
            <DesktopBoard columns={data.columns} onOpen={setOpen} onMove={move} />
          ) : (
            <MobileBoard columns={data.columns} onOpen={setOpen} onMove={(id, s) => move(id, s)} />
          )}
        </div>
      )}

      {open !== undefined && (
        <TaskSheet
          key={open ?? "new"}
          task={editing}
          planDay={planDay}
          subjects={db.subjects}
          onClose={() => setOpen(undefined)}
          onSave={(input) => {
            if (editing) {
              updateTask(editing.id, input);
              toast({ message: "Guardado." });
            } else {
              createTask(input);
              toast({ message: "Tarea creada en Pendiente." });
            }
            setOpen(undefined);
          }}
          onDelete={
            editing
              ? () => {
                  const removed = deleteTask(editing.id);
                  setOpen(undefined);
                  toast({ message: "Borré la tarea.", actions: [{ label: "Deshacer", onClick: () => restoreTask(removed) }] });
                }
              : undefined
          }
        />
      )}
    </>
  );
}
