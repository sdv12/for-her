"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarPlus, ChevronDown, Moon, RotateCcw, Stethoscope, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/plan";
import { toISODate } from "@/lib/plan-import/dates";
import { resetRoute, restoreRoute, startRoute, toggleRouteKey } from "@/lib/mock/actions/programa";
import { useDB } from "@/lib/mock/store";
import { getEje } from "@/lib/programa/ejes";
import { casesForEje, pickCase } from "@/lib/programa/match";
import { BLOQUES, REGLA } from "@/lib/programa/metodo";
import { dateOf, FASES, routePosition, routeProgress, RUTA, sessionKey, sessionsFor, WEEKDAYS } from "@/lib/programa/ruta";
import type { RutaWeek } from "@/lib/programa/types";
import { ProgramaHeader } from "./bits";

const PHASE_TONE = ["", "bg-[var(--phase-1)]", "bg-[var(--phase-2)]", "bg-[var(--phase-3)]", "bg-[var(--phase-4)]"];

export function RutaView() {
  const db = useDB();
  const toast = useToast();
  const today = toISODate(new Date());
  const start = db?.route?.start ?? null;
  const done = useMemo(() => new Set(db?.route?.done ?? []), [db]);
  const played = useMemo(() => new Set((db?.case_attempts ?? []).map((a) => a.case_id)), [db]);
  const pos = start ? routePosition(start, today) : null;
  const progress = routeProgress(db?.route?.done ?? []);
  const [date, setDate] = useState(today);
  const [moving, setMoving] = useState(false);

  function onStart() {
    startRoute(date || today);
    setMoving(false);
    toast({ message: "Listo: la sesión de cada día aparece en Hoy. Tu Plan sigue igual." });
  }

  function onReset() {
    const prev = resetRoute();
    toast({ message: "Saqué la ruta de Hoy y borré su avance.", actions: [{ label: "Deshacer", onClick: () => restoreRoute(prev) }] });
  }

  return (
    <>
      <ProgramaHeader />
      <div className="flex flex-col gap-7">
        <section aria-labelledby="fases" className="flex flex-col gap-3">
          <h2 id="fases" className="text-xl font-semibold">
            Cuatro fases, un primer ciclo de 12 semanas
          </h2>
          <ol className="grid gap-3 desk:grid-cols-4">
            {FASES.map((f) => (
              <li key={f.num} className="flex flex-col gap-2 rounded-card border border-line bg-surface p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-muted">
                  <span aria-hidden className={cn("size-2.5 rounded-full", PHASE_TONE[f.num])} />
                  Fase {f.num} · {f.weeks}
                </p>
                <h3 className="text-[17px] font-semibold">{f.name}</h3>
                <p className="text-sm text-muted">{f.contenidos}</p>
                <p className="mt-auto text-sm">
                  <span className="font-semibold">Resultado: </span>
                  {f.resultado}
                </p>
              </li>
            ))}
          </ol>
          <p className="text-sm text-muted">Después se repite con más profundidad, priorizando errores y temas débiles.</p>
        </section>

        <Card className="flex flex-col gap-4 p-5 desk:p-6">
          {db && start && pos && !moving ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">
                    {pos.status === "antes"
                      ? `Empieza el lunes ${formatShortDate(dateOf(start, 1, 0))}`
                      : pos.status === "terminada"
                        ? "Terminaste el primer ciclo"
                        : `Vas por la semana ${pos.week} de ${RUTA.length}`}
                  </h2>
                  <p className="text-sm text-muted">
                    Desde el lunes {formatShortDate(dateOf(start, 1, 0))} · <span className="tabular">{progress.done}</span> de{" "}
                    <span className="tabular">{progress.total}</span> sesiones hechas · cada día aparece en Hoy
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setMoving(true)}>
                    <CalendarPlus aria-hidden /> Mover
                  </Button>
                  <Button variant="ghost" onClick={onReset}>
                    <RotateCcw aria-hidden /> Reiniciar
                  </Button>
                </div>
              </div>
              <ProgressBar label="Avance de la ruta" value={progress.done} max={progress.total} tone="sage" />
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="text-lg font-semibold">{moving ? "Mover el inicio de la ruta" : "¿Cuándo empezás?"}</h2>
                <p className="text-sm text-muted">
                  La ruta arranca el lunes de la semana que elijas y convive con tu Plan: no lo reemplaza ni lo modifica. {moving && "El avance se conserva."}
                </p>
              </div>
              <form
                className="flex flex-wrap items-end gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  onStart();
                }}
              >
                <label className="flex flex-col gap-1.5 text-sm font-semibold">
                  Fecha de inicio
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="min-h-11 rounded-btn border border-line bg-surface px-3 text-[15px] font-normal focus-visible:border-accent-text focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:outline-none"
                  />
                </label>
                <Button type="submit" variant="primary" disabled={!db}>
                  {moving ? "Guardar" : "Empezar la ruta"}
                </Button>
                {moving && (
                  <Button variant="ghost" onClick={() => setMoving(false)}>
                    Cancelar
                  </Button>
                )}
              </form>
            </div>
          )}
        </Card>

        <section aria-labelledby="semanas" className="flex flex-col gap-3">
          <div>
            <h2 id="semanas" className="text-xl font-semibold">
              Semana por semana
            </h2>
            <p className="text-sm text-muted">
              {BLOQUES.map((b) => `${b.name}: ${b.minutes} min`).join(" · ")}. {REGLA}
            </p>
          </div>
          <ol className="flex flex-col gap-2">
            {RUTA.map((w) => (
              <li key={w.num}>
                <WeekBlock
                  w={w}
                  start={start}
                  current={pos?.status === "en-curso" && pos.week === w.num}
                  todayDay={pos?.status === "en-curso" && pos.week === w.num ? pos.day : null}
                  done={done}
                  played={played}
                  canCheck={!!db}
                  defaultOpen={pos ? pos.status === "en-curso" && pos.week === w.num : w.num === 1}
                />
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}

function WeekBlock({
  w,
  start,
  current,
  todayDay,
  done,
  played,
  canCheck,
  defaultOpen,
}: {
  w: RutaWeek;
  start: string | null;
  current: boolean;
  todayDay: number | null;
  done: Set<string>;
  played: Set<string>;
  canCheck: boolean;
  defaultOpen: boolean;
}) {
  const sessions = sessionsFor(w);
  const doneCount = sessions.slice(0, 6).reduce((n, _, d) => n + Number(done.has(sessionKey(w.num, d, "m"))) + Number(done.has(sessionKey(w.num, d, "n"))), 0);
  const ejes = w.ejes.map((id) => getEje(id)!);
  const caso = pickCase(casesForEje(ejes[0]), played);

  return (
    <details open={defaultOpen} className={cn("group rounded-card border bg-surface", current ? "border-accent-text" : "border-line")}>
      <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 p-4 [&::-webkit-details-marker]:hidden">
        <span aria-hidden className={cn("size-2.5 shrink-0 rounded-full", PHASE_TONE[w.fase])} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-muted">
            Semana {w.num} · Fase {w.fase}
            {start && ` · ${formatShortDate(dateOf(start, w.num, 0))}`}
          </span>
          <span className="block text-[17px] leading-snug font-semibold">{w.title}</span>
        </span>
        {current && <Chip tone="accent">Esta semana</Chip>}
        <span className="tabular hidden text-sm text-muted desk:inline">{doneCount}/12</span>
        <ChevronDown aria-hidden className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="flex flex-col gap-4 border-t border-line p-4 desk:p-5">
        <p className="text-[15px] leading-relaxed">{w.objetivo}</p>
        <div className="flex flex-wrap items-center gap-2">
          {ejes.map((e) => (
            <Link key={e.id} href={`/programa/eje/${e.id}`} className="rounded-full border border-line px-3 py-1.5 text-sm font-semibold hover:bg-sunken">
              {e.code ? `${e.code} · ` : ""}
              {e.title}
            </Link>
          ))}
        </div>
        <ol className="divide-y divide-line">
          {sessions.map((s, d) => {
            const isToday = todayDay === d;
            const rest = d === 6;
            return (
              <li key={d} className={cn("grid gap-1 py-3 desk:grid-cols-[8.5rem_1fr_1fr] desk:gap-4", isToday && "rounded-card-sm bg-accent-soft/50 px-2")}>
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-muted">
                  {WEEKDAYS[d]}
                  {start && <span className="font-normal">{formatShortDate(dateOf(start, w.num, d))}</span>}
                  {isToday && <Chip tone="accent">Hoy</Chip>}
                </p>
                <SessionRow icon={Sun} label="Mañana" text={s.morning} k={sessionKey(w.num, d, "m")} done={done} rest={rest} canCheck={canCheck} />
                <SessionRow icon={Moon} label="Noche" text={s.night} k={sessionKey(w.num, d, "n")} done={done} rest={rest} canCheck={canCheck} />
              </li>
            );
          })}
        </ol>
        {caso && (
          <Link href={`/casos/${caso.id}`} className="inline-flex items-center gap-2 self-start rounded-btn py-1 text-sm font-semibold text-accent-text hover:underline">
            <Stethoscope aria-hidden className="size-4" /> Caso integrador sugerido para esta semana
          </Link>
        )}
      </div>
    </details>
  );
}

function SessionRow({
  icon: Icon,
  label,
  text,
  k,
  done,
  rest,
  canCheck,
}: {
  icon: typeof Sun;
  label: string;
  text: string;
  k: string;
  done: Set<string>;
  rest: boolean;
  canCheck: boolean;
}) {
  const checked = done.has(k);
  return (
    <div className="flex items-start gap-2.5">
      {rest ? null : (
        <Checkbox checked={checked} onChange={() => toggleRouteKey(k)} disabled={!canCheck} aria-label={`${label}: ${checked ? "hecha" : "marcar como hecha"}`} className="-my-2.5 shrink-0" />
      )}
      <p className={cn("text-[15px] leading-snug", checked && "text-muted line-through decoration-muted/50")}>
        <span className="sr-only">{label}: </span>
        <span aria-hidden className="mr-1 inline-flex align-[-3px] text-muted">
          <Icon className="size-4" />
        </span>
        {text}
      </p>
    </div>
  );
}
