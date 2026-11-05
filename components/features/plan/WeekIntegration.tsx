"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Network, Stethoscope } from "lucide-react";
import type { PlanDay, PlanWeek } from "@/lib/data/types";
import { useDB } from "@/lib/mock/store";
import { casesForEje, ejesForText, pickCase } from "@/lib/programa/match";

/**
 * "Qué integra esta semana": lee el título y los días de la semana del cronograma que importaste
 * y la vincula con los ejes del Programa y un caso para practicar. No cambia el plan.
 */
export function WeekIntegration({ week, days }: { week: PlanWeek; days: PlanDay[] }) {
  const db = useDB();
  const ejes = useMemo(() => ejesForText([week.title, week.tip ?? "", ...days.map((d) => d.content)].join(" · ")), [week, days]);
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);
  if (ejes.length === 0) return null;
  const main = ejes[0];
  const caso = pickCase(casesForEje(main), played);

  return (
    <section aria-label="Integración con el programa" className="mt-4 rounded-card-sm border border-line p-4">
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Network aria-hidden className="size-4 text-accent-text" /> Esta semana integra
      </p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {ejes.map((e) => (
          <li key={e.id}>
            <Link href={`/programa/eje/${e.id}`} className="inline-flex min-h-9 items-center rounded-full bg-sunken px-3 text-sm font-semibold hover:bg-line/60">
              {e.title}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        <span className="font-semibold text-ink">Conexión para explicar: </span>
        {main.conexion}
      </p>
      {caso && (
        <Link href={`/casos/${caso.id}`} className="mt-2 inline-flex items-center gap-2 rounded-btn py-1 text-sm font-semibold text-accent-text hover:underline">
          <Stethoscope aria-hidden className="size-4" /> Practicalo con un caso
        </Link>
      )}
    </section>
  );
}
