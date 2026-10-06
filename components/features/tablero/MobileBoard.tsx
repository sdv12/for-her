"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import type { TaskStatus } from "@/lib/data/types";
import { neighborStatus, STATUS_LABEL, STATUSES } from "@/lib/tasks";
import { TaskCard, type BoardItem } from "./TaskCard";

type Props = {
  columns: Record<TaskStatus, BoardItem[]>;
  onOpen: (id: string) => void;
  onMove: (id: string, status: TaskStatus) => void;
};

const PAGE = 20;

/** Celular: una pestaña por estado y un botón grande para pasar cada tarea a la siguiente. */
export function MobileBoard({ columns, onOpen, onMove }: Props) {
  const [tab, setTab] = useState<TaskStatus>("pend");
  const [limit, setLimit] = useState(PAGE);
  const all = columns[tab];
  const items = all.slice(0, limit);

  return (
    <div className="flex flex-col gap-4">
      <SegmentedControl
        label="Estado"
        value={tab}
        onChange={(t) => (setTab(t), setLimit(PAGE))}
        fullWidth
        className="[&_button]:px-1.5 [&_button]:text-[13px]"
        options={STATUSES.map((s) => ({
          value: s.value,
          label: (
            <span className="flex flex-col items-center leading-tight">
              <span>{s.label}</span>
              <span className="tabular text-xs font-semibold opacity-70">{columns[s.value].length}</span>
            </span>
          ),
        }))}
      />

      {all.length === 0 ? (
        <p className="rounded-card border border-dashed border-line px-6 py-10 text-center text-[15px] text-muted">
          {tab === "dominado" ? "Lo que domines va a aparecer acá." : `No hay tareas en ${STATUS_LABEL[tab]}.`}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const next = neighborStatus(item.task.status, 1);
            const prev = neighborStatus(item.task.status, -1);
            return (
              <li key={item.task.id}>
                <TaskCard
                  item={item}
                  onOpen={() => onOpen(item.task.id)}
                  className="p-4"
                  footer={
                    next ? (
                      <Button variant="secondary" className="mt-3 w-full justify-between" onClick={() => onMove(item.task.id, next)}>
                        Pasar a {STATUS_LABEL[next]} <ArrowRight aria-hidden />
                      </Button>
                    ) : (
                      prev && (
                        <Button variant="ghost" className="mt-3 w-full justify-between text-muted" onClick={() => onMove(item.task.id, prev)}>
                          <ArrowLeft aria-hidden /> Volver a {STATUS_LABEL[prev]}
                        </Button>
                      )
                    )
                  }
                />
              </li>
            );
          })}
        </ul>
      )}
      {all.length > limit && (
        <Button variant="ghost" onClick={() => setLimit((l) => l + PAGE)} className="text-accent-text">
          Ver {Math.min(PAGE, all.length - limit)} más
        </Button>
      )}
    </div>
  );
}
