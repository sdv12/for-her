"use client";

import Link from "next/link";
import { Moon, Route, Sun } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { cn } from "@/lib/cn";
import type { DB } from "@/lib/data/types";
import { formatShortDate } from "@/lib/plan";
import { toggleRouteKey } from "@/lib/mock/actions/programa";
import { getEje } from "@/lib/programa/ejes";
import { dateOf, routePosition, RUTA, sessionKey, sessionsFor, WEEKDAYS } from "@/lib/programa/ruta";

/** La sesión de hoy de la ruta integrada (solo si la empezaste desde Programa → Ruta). */
export function RouteToday({ db, today }: { db: DB; today: string }) {
  const start = db.route?.start;
  if (!start) return null;
  const pos = routePosition(start, today);
  if (pos.status === "terminada") return null;
  const week = RUTA[pos.week - 1];
  const eje = getEje(week.ejes[0])!;
  const s = sessionsFor(week)[pos.day];
  const done = new Set(db.route?.done ?? []);
  const rest = pos.day === 6;

  return (
    <Card className="p-5 desk:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Route aria-hidden className="size-5 text-accent-text" /> Ruta integrada
          </h2>
          <p className="text-sm text-muted">
            {pos.status === "antes"
              ? `Empieza el lunes ${formatShortDate(dateOf(start, 1, 0))} · así arranca`
              : `Semana ${week.num} de ${RUTA.length} · ${WEEKDAYS[pos.day]} · ${week.title}`}
          </p>
        </div>
        <Link href="/programa/ruta" className="shrink-0 rounded-btn px-2 py-2 text-sm font-semibold text-accent-text hover:underline">
          Ver la ruta
        </Link>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {(
          [
            ["m", Sun, "Mañana", s.morning],
            ["n", Moon, "Noche", s.night],
          ] as const
        ).map(([part, Icon, label, text]) => {
          const k = sessionKey(week.num, pos.day, part);
          const checked = done.has(k);
          return (
            <li key={part} className="flex items-start gap-3 rounded-card-sm bg-sunken p-3">
              {rest || pos.status === "antes" ? (
                <Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-muted" />
              ) : (
                <Checkbox checked={checked} onChange={() => toggleRouteKey(k)} aria-label={`${label}: ${checked ? "hecha" : "marcar como hecha"}`} className="-my-2.5 shrink-0" />
              )}
              <p className={cn("text-[15px] leading-snug", checked && "text-muted line-through decoration-muted/50")}>
                <span className="font-semibold">{label}: </span>
                {text}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm text-muted">
        Eje:{" "}
        <Link href={`/programa/eje/${eje.id}`} className="font-semibold text-accent-text underline-offset-2 hover:underline">
          {eje.title}
        </Link>
      </p>
    </Card>
  );
}
