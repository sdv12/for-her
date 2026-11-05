"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useToggleDay } from "@/components/features/plan/useToggleDay";
import { Checkbox } from "@/components/ui/Checkbox";
import { SLOT_LABEL, type Agenda, type AgendaItem, type AgendaSlot } from "@/lib/agenda";
import { cn } from "@/lib/cn";
import type { DB } from "@/lib/data/types";
import { toggleRouteKey } from "@/lib/mock/actions/programa";

/** La lista de "Tu día" dentro de la tarjeta Hoy toca: mañana, noche y en cualquier momento. */
export function TodayAgenda({ agenda, db }: { agenda: Agenda; db: DB }) {
  const { toggle, sheet } = useToggleDay();
  if (agenda.items.length === 0) return null;
  const slots = (["manana", "noche", "dia"] as AgendaSlot[]).filter((s) => agenda.items.some((i) => i.slot === s));

  function onToggle(item: AgendaItem) {
    if (item.action.type === "route") toggleRouteKey(item.action.key);
    else if (item.action.type === "plan-day") {
      const dayId = item.action.dayId;
      const day = db.plan_days.find((d) => d.id === dayId);
      if (day) toggle(day);
    }
  }

  return (
    <section aria-label="Tu día" className="mt-6 rounded-card-sm bg-hero-ink/8 p-4 desk:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold">Tu día</h3>
        {agenda.total > 0 && (
          <p className="tabular text-sm opacity-80">
            {agenda.done} de {agenda.total} hechas
          </p>
        )}
      </div>
      <div className="mt-3 grid gap-4 desk:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]">
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
        {body}
        <ChevronRight aria-hidden className="size-4 shrink-0 opacity-70" />
      </Link>
    );
  }
  return (
    <div className="flex items-start gap-3 py-1">
      <Checkbox checked={item.done} onChange={onToggle} aria-label={`${item.label}: ${item.done ? "hecha" : "marcar como hecha"}`} className="-my-2.5 shrink-0" />
      {body}
    </div>
  );
}
