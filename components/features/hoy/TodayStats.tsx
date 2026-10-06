"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/lib/cn";
import { useExamDate } from "@/lib/mock/exam-date";
import type { TodayView } from "@/lib/today";

type Tone = "accent" | "sage" | "honey";

const TILE = "flex flex-col rounded-card border border-line bg-surface p-4 text-left transition-colors hover:bg-sunken";

function Tile({ label, value, sub, bar, tone }: { label: string; value: string; sub: string; bar: number; tone: Tone }) {
  return (
    <>
      <span className="text-sm text-muted">{label}</span>
      <span className="tabular mt-1 font-display text-3xl font-semibold tracking-[-0.03em]">{value}</span>
      <span className="mt-0.5 text-xs text-muted">{sub}</span>
      <ProgressBar label={label} value={bar} max={1} tone={tone} className="mt-3" />
    </>
  );
}

/** Los cuatro números del día, cada uno lleva a su sección. */
export function TodayStats({ v }: { v: TodayView }) {
  const [editingExam, setEditingExam] = useState(false);
  const weekDone = v.weekDays.filter((d) => d.done_at).length;
  const goalMet = v.minutesToday >= v.goal;
  const cardsTotal = v.cardsDue + v.cardsReviewedToday;

  return (
    <div className="grid grid-cols-2 gap-3 desk:grid-cols-4">
      <button type="button" className={TILE} onClick={() => setEditingExam(true)} aria-haspopup="dialog">
        <Tile
          label="Días para el examen"
          value={v.exam.days === null ? "—" : String(v.exam.days)}
          sub={v.exam.days === null ? "Tocá para poner la fecha" : "Tocá para cambiar la fecha"}
          bar={v.exam.progress}
          tone="accent"
        />
      </button>
      <Link href="/registros" className={TILE}>
        <Tile
          label="Minutos hoy"
          value={`${v.minutesToday}/${v.goal}`}
          sub={goalMet ? "Objetivo cumplido" : "Sumá desde Foco o Registros"}
          bar={v.goal ? v.minutesToday / v.goal : 0}
          tone={goalMet ? "sage" : "honey"}
        />
      </Link>
      <Link href="/tarjetas/repasar" className={TILE}>
        <Tile
          label="Tarjetas para hoy"
          value={String(v.cardsDue)}
          sub={v.cardsReviewedToday ? `${v.cardsReviewedToday} repasadas hoy` : v.cardsDue ? "Tocá para repasar" : "Al día"}
          bar={cardsTotal ? v.cardsReviewedToday / cardsTotal : 1}
          tone="accent"
        />
      </Link>
      <Link href="/plan" className={TILE}>
        <Tile
          label="Días del plan"
          value={`${weekDone}/${v.weekDays.length}`}
          sub="hechos esta semana"
          bar={v.weekDays.length ? weekDone / v.weekDays.length : 0}
          tone="sage"
        />
      </Link>
      {editingExam && <ExamDateSheet onClose={() => setEditingExam(false)} />}
    </div>
  );
}

function ExamDateSheet({ onClose }: { onClose: () => void }) {
  const [date, setDate] = useExamDate();
  const [value, setValue] = useState(date ?? "");

  return (
    <Sheet open onClose={onClose} title="Fecha del examen" side="bottom">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          setDate(value || null);
          onClose();
        }}
      >
        <TextField
          label="Fecha"
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hint="Si todavía no la sabés, dejala vacía: se muestra “Marzo 2027”."
          autoFocus
        />
        <div className={cn("flex gap-2")}>
          <Button type="submit" variant="primary" size="lg" className="flex-1">
            Guardar
          </Button>
          {date && (
            <Button variant="ghost" size="lg" onClick={() => (setDate(null), onClose())}>
              Quitar
            </Button>
          )}
        </div>
      </form>
    </Sheet>
  );
}
