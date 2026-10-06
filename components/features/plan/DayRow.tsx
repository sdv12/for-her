"use client";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Pill";
import type { PlanDay } from "@/lib/data/types";
import { formatShortDate } from "@/lib/plan";
import { cn } from "@/lib/cn";
import { ModeChip } from "./ModeChip";

type Props = {
  day: PlanDay;
  isToday: boolean;
  onToggle: () => void;
  onEdit: () => void;
};

export function DayRow({ day, isToday, onToggle, onEdit }: Props) {
  const done = Boolean(day.done_at);
  return (
    <div className="flex items-start gap-3 py-3">
      <Checkbox
        checked={done}
        onChange={onToggle}
        aria-label={`${day.weekday} ${formatShortDate(day.date)}: ${done ? "hecho" : "marcar como hecho"}`}
        className="-my-2.5 shrink-0"
      />
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-sm font-semibold text-muted">
          <span>
            {day.weekday} {formatShortDate(day.date)}
          </span>
          {isToday && <Chip tone="accent">Hoy</Chip>}
        </p>
        <p className={cn("mt-0.5 text-[15px] leading-snug", done && "text-muted")}>{day.content}</p>
        <div className="mt-2">
          <ModeChip mode={day.mode} />
        </div>
      </div>
      <Button size="icon" variant="ghost" onClick={onEdit} aria-label={`Editar ${day.weekday} ${formatShortDate(day.date)}`} className="-mt-2 -mr-2 text-muted">
        <Pencil aria-hidden />
      </Button>
    </div>
  );
}
