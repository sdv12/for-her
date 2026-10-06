"use client";

import { useState } from "react";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type Announcements,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TaskStatus } from "@/lib/data/types";
import { positionBetween, STATUS_LABEL, STATUSES } from "@/lib/tasks";
import { TaskCard, type BoardItem } from "./TaskCard";

type Props = {
  columns: Record<TaskStatus, BoardItem[]>;
  onOpen: (id: string) => void;
  onMove: (id: string, status: TaskStatus, position?: number) => void;
};

const COLLAPSE_AT = 15;

export function DesktopBoard({ columns, onOpen, onMove }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<TaskStatus | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const all = STATUSES.flatMap((s) => columns[s.value]);
  const byId = new Map(all.map((i) => [i.task.id, i]));
  const statusOf = (id: string | number): TaskStatus | null => {
    const s = String(id);
    if (s.startsWith("col-")) return s.slice(4) as TaskStatus;
    return byId.get(s)?.task.status ?? null;
  };
  const title = (id: string | number) => byId.get(String(id))?.task.title ?? "la tarea";

  const announcements: Announcements = {
    onDragStart: ({ active }) => `Agarraste “${title(active.id)}”.`,
    onDragOver: ({ over }) => (over ? `Sobre ${STATUS_LABEL[statusOf(over.id) ?? "pend"]}.` : "Fuera de las columnas."),
    onDragEnd: ({ active, over }) =>
      over ? `Soltaste “${title(active.id)}” en ${STATUS_LABEL[statusOf(over.id) ?? "pend"]}.` : "Soltaste la tarea donde estaba.",
    onDragCancel: ({ active }) => `Cancelado. “${title(active.id)}” quedó donde estaba.`,
  };

  function onDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function onDragOver(e: DragOverEvent) {
    setOverStatus(e.over ? statusOf(e.over.id) : null);
  }

  function onDragEnd(e: DragEndEvent) {
    setActiveId(null);
    setOverStatus(null);
    const { active, over } = e;
    if (!over) return;
    const id = String(active.id);
    const from = statusOf(id);
    const to = statusOf(over.id);
    if (!from || !to) return;

    const ids = columns[to].map((i) => i.task.id);
    let order: string[];
    if (from === to) {
      const oldIndex = ids.indexOf(id);
      const newIndex = String(over.id).startsWith("col-") ? ids.length - 1 : ids.indexOf(String(over.id));
      if (oldIndex === newIndex) return;
      order = arrayMove(ids, oldIndex, newIndex);
    } else {
      const at = String(over.id).startsWith("col-") ? ids.length : Math.max(0, ids.indexOf(String(over.id)));
      order = [...ids.slice(0, at), id, ...ids.slice(at)];
    }
    const idx = order.indexOf(id);
    const pos = (n: string | undefined) => (n ? byId.get(n)?.task.position : undefined);
    onMove(id, to, positionBetween(pos(order[idx - 1]), pos(order[idx + 1])));
  }

  const active = activeId ? byId.get(activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={() => (setActiveId(null), setOverStatus(null))}
      accessibility={{
        announcements,
        screenReaderInstructions: {
          draggable:
            "Para mover una tarea, presioná espacio o enter sobre la manija. Usá las flechas para moverla y espacio o enter para soltarla. Escape cancela.",
        },
      }}
    >
      <div className="grid grid-cols-4 items-start gap-3">
        {STATUSES.map((s) => (
          <Column
            key={s.value}
            status={s.value}
            label={s.label}
            dot={s.dot}
            items={columns[s.value]}
            highlighted={overStatus === s.value && activeId !== null}
            onOpen={onOpen}
            onMove={onMove}
          />
        ))}
      </div>
      <DragOverlay dropAnimation={null}>{active && <TaskCard item={active} onOpen={() => {}} dragging />}</DragOverlay>
    </DndContext>
  );
}

function Column({
  status,
  label,
  dot,
  items,
  highlighted,
  onOpen,
  onMove,
}: {
  status: TaskStatus;
  label: string;
  dot: string;
  items: BoardItem[];
  highlighted: boolean;
  onOpen: (id: string) => void;
  onMove: Props["onMove"];
}) {
  const { setNodeRef } = useDroppable({ id: `col-${status}` });
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, COLLAPSE_AT);

  return (
    <section
      ref={setNodeRef}
      aria-label={`${label}, ${items.length} tareas`}
      className={cn("flex min-h-40 flex-col rounded-card bg-sunken p-2.5 transition-colors", highlighted && "ring-2 ring-accent")}
    >
      <h2 className="flex items-center gap-2 px-1.5 pt-1 pb-2.5 font-sans text-sm font-bold tracking-normal">
        <span aria-hidden className={cn("size-2.5 rounded-full", dot)} />
        {label}
        <span className="tabular ml-auto rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-muted">{items.length}</span>
      </h2>
      <SortableContext id={status} items={visible.map((i) => i.task.id)} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {visible.map((item) => (
            <SortableTask key={item.task.id} item={item} onOpen={onOpen} onMove={onMove} />
          ))}
        </ul>
      </SortableContext>
      {items.length === 0 && <p className="px-2 py-6 text-center text-sm text-muted">Arrastrá una tarea acá.</p>}
      {items.length > COLLAPSE_AT && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 min-h-10 rounded-btn text-sm font-semibold text-accent-text hover:bg-surface"
        >
          {expanded ? "Mostrar menos" : `Ver ${items.length - COLLAPSE_AT} más`}
        </button>
      )}
    </section>
  );
}

function SortableTask({ item, onOpen, onMove }: { item: BoardItem; onOpen: (id: string) => void; onMove: Props["onMove"] }) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id: item.task.id });
  const id = item.task.id;
  const status = item.task.status;
  // dnd-kit tipa los listeners como Function genérica.
  const onPointerDown = listeners?.onPointerDown as React.PointerEventHandler<HTMLElement> | undefined;
  const onKeyDown = listeners?.onKeyDown as React.KeyboardEventHandler<HTMLButtonElement> | undefined;

  return (
    <li ref={setNodeRef} style={{ transform: CSS.Translate.toString(transform), transition }} className={cn(isDragging && "opacity-40")}>
      <TaskCard
        item={item}
        onOpen={() => onOpen(id)}
        onMove={(dir) => {
          const i = STATUSES.findIndex((s) => s.value === status) + dir;
          if (STATUSES[i]) onMove(id, STATUSES[i].value);
        }}
        // El mouse arrastra desde cualquier parte de la tarjeta; el teclado, desde la manija.
        onPointerDown={onPointerDown}
        className="cursor-grab active:cursor-grabbing"
        handle={
          <button
            type="button"
            ref={setActivatorNodeRef}
            {...attributes}
            onKeyDown={onKeyDown}
            aria-label={`Mover “${item.task.title}”`}
            className="-my-1 -ml-1 inline-flex size-7 shrink-0 cursor-grab items-center justify-center rounded-[8px] text-muted hover:bg-sunken"
          >
            <GripVertical aria-hidden className="size-4" />
          </button>
        }
      />
    </li>
  );
}
