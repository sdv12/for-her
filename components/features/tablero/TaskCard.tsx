"use client";

import { forwardRef } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Chip, Dot } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";
import type { Task } from "@/lib/data/types";
import { neighborStatus, STATUS_LABEL } from "@/lib/tasks";

export type BoardItem = {
  task: Task;
  subjectName: string | null;
  subjectColor: string | null;
  due: string | null;
};

type Props = {
  item: BoardItem;
  onOpen: () => void;
  /** Botones ← → (desktop). */
  onMove?: (dir: -1 | 1) => void;
  /** Manija de arrastre (desktop). */
  handle?: React.ReactNode;
  /** Acción grande abajo (celular). */
  footer?: React.ReactNode;
  dragging?: boolean;
} & Omit<React.ComponentProps<"article">, "children">;

export const TaskCard = forwardRef<HTMLElement, Props>(function TaskCard(
  { item, onOpen, onMove, handle, footer, dragging, className, ...rest },
  ref,
) {
  const { task, subjectName, subjectColor, due } = item;
  const prev = neighborStatus(task.status, -1);
  const next = neighborStatus(task.status, 1);

  return (
    <article
      ref={ref}
      className={cn(
        "rounded-card-sm border border-line bg-surface p-3 transition-shadow",
        dragging && "shadow-float ring-2 ring-accent-soft",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {handle}
        <span className="flex min-w-0 flex-1 items-center gap-1.5 text-xs font-semibold text-muted">
          {subjectColor && <Dot color={subjectColor} className="size-2" />}
          <span className="truncate">{subjectName ?? "Sin materia"}</span>
        </span>
        <Chip tone={task.origin === "plan" ? "honey" : "sage"}>{task.origin === "plan" ? "Plan" : "Mía"}</Chip>
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="mt-1.5 block w-full rounded-[8px] text-left text-[15px] leading-snug font-semibold hover:text-accent-text"
      >
        <span className="line-clamp-3">{task.title}</span>
      </button>

      {(due || onMove) && (
        <div className="mt-2 flex items-center gap-1">
          {due && (
            <span className="inline-flex flex-1 items-center gap-1.5 text-xs font-semibold text-muted">
              <CalendarDays aria-hidden className="size-3.5" /> {due}
            </span>
          )}
          {onMove && (
            <span className="ml-auto flex gap-0.5">
              <ArrowButton disabled={!prev} label={prev ? `Pasar a ${STATUS_LABEL[prev]}` : "Ya está en la primera columna"} onClick={() => onMove(-1)}>
                <ChevronLeft aria-hidden className="size-4" />
              </ArrowButton>
              <ArrowButton disabled={!next} label={next ? `Pasar a ${STATUS_LABEL[next]}` : "Ya está en la última columna"} onClick={() => onMove(1)}>
                <ChevronRight aria-hidden className="size-4" />
              </ArrowButton>
            </span>
          )}
        </div>
      )}
      {footer}
    </article>
  );
});

function ArrowButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-8 items-center justify-center rounded-[10px] text-muted hover:bg-sunken hover:text-ink disabled:opacity-30"
    >
      {children}
    </button>
  );
}
