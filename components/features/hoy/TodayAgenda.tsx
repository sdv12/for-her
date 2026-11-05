"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useToggleDay } from "@/components/features/plan/useToggleDay";
import { Checkbox } from "@/components/ui/Checkbox";
import { SLOT_LABEL, type Agenda, type AgendaItem, type AgendaSlot } from "@/lib/agenda";
import { cn } from "@/lib/cn";
import type { DB } from "@/lib/data/types";
import { toggleDayCheck, toggleRouteKey } from "@/lib/mock/actions/programa";

/** "Tu día" dentro de la tarjeta Hoy toca: un eje, mañana para comprender y noche para recuperar y aplicar. */
export function TodayAgenda({ agenda, db }: { agenda: Agenda; db: DB }) {
  const { toggle, sheet } = useToggleDay();
  if (agenda.items.length === 0) return null;
  const slots = (["manana", "noche", "dia"] as AgendaSlot[]).filter((s) => agenda.items.some((i) => i.slot === s));

  function onToggle(item: AgendaItem) {
    const a = item.action;
    if (a.type === "route") toggleRouteKey(a.key);
    else if (a.type === "check") toggleDayCheck(a.key);
    else if (a.type === "plan-day") {
      const day = db.plan_days.find((d) => d.id === a.dayId);
      if (day) toggle(day);
    }
  }

  return (
    <section aria-label="Tu día" className="mt-6 rounded-card-sm bg-hero-ink/8 p-4 desk:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold">Tu día</h3>
        {agenda.total > 0 && (
          <p className="tabular text-sm opacity-80">
            {agenda.done} de {agenda.total} hechas
          </p>
        )}
      </div>
      {agenda.eje && (
        <p className="mt-1 text-sm opacity-85">
          Eje del día:{" "}
          <Link href={`/programa/eje/${agenda.eje.id}`} className="font-semibold text-hero-accent underline-offset-2 hover:underline">
            {agenda.eje.title}
          </Link>
          {agenda.focus === "cronograma" && " (según tu cronograma)"}
        </p>
      )}
      <div className="mt-3 grid gap-4 desk:grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
        {slots.map((slot) => (
          <div key={slot}>
            <p className="text-xs font-semibold tracking-wide uppercase opacity-75">{SLOT_LABEL[slot]}</p>
            <ul className="mt-1.5 flex flex-col gap-1">
              {agenda.items
                .filter((i) => i.slot === slot)
                .map((item) => (
                  <li key={item.key}>
                    <Row item={item} onToggle={() => onToggle(item)} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
      {sheet}
    </section>
  );
}

function Row({ item, onToggle }: { item: AgendaItem; onToggle: () => void }) {
  const body = (
    <span className="min-w-0 flex-1">
      <span className="block text-xs font-semibold opacity-75">{item.label}</span>
      <span className={cn("block text-[15px] leading-snug", item.done && "line-through opacity-60")}>{item.text}</span>
    </span>
  );
  if (item.action.type === "link") {
    return (
      <Link href={item.action.href} className="-mx-2 flex min-h-11 items-center gap-3 rounded-[10px] px-2 py-1.5 hover:bg-hero-ink/10">
        {item.done && <span className="sr-only">Hecho: </span>}
        {body}
        <ChevronRight aria-hidden className="size-4 shrink-0 opacity-70" />
      </Link>
    );
  }
  return (
    <div className="flex items-start gap-3 py-1">
      <Checkbox checked={item.done} onChange={onToggle} aria-label={`${item.label}: ${item.done ? "hecho" : "marcar como hecho"}`} className="-my-2.5 shrink-0" />
      {body}
      {item.href && (
        <Link href={item.href} aria-label={`Abrir: ${item.label}`} className="-my-1.5 inline-flex size-9 shrink-0 items-center justify-center rounded-[10px] hover:bg-hero-ink/10">
          <ArrowUpRight aria-hidden className="size-4 opacity-80" />
        </Link>
      )}
    </div>
  );
}
