"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { Pause, Play, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SelectField } from "@/components/ui/Field";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { cn } from "@/lib/cn";
import { blocksGoal, BLOCK_MINUTES, elapsedMs, FOCUS_MODES, formatClock, plannedSeconds, remainingSeconds, type FocusMode } from "@/lib/focus";
import { getFocus, pauseFocus, resetFocus, setFocusMode, setFocusTask, startFocus, useFocus, useNow } from "@/lib/focus-store";
import { recordFocusSession } from "@/lib/mock/actions/focus";
import { useDB } from "@/lib/mock/store";
import { toISODate } from "@/lib/plan-import/dates";
import { STATUS_LABEL } from "@/lib/tasks";

export function FocoView({ initialTaskId }: { initialTaskId: string | null }) {
  const db = useDB();
  const focus = useFocus();
  const now = useNow(focus.status === "running", 250);

  // "Enfocar" desde el Tablero u Hoy: vincula la tarea si no hay un bloque en marcha.
  useEffect(() => {
    if (initialTaskId && getFocus().status === "idle") setFocusTask(initialTaskId);
  }, [initialTaskId]);

  const data = useMemo(() => {
    if (!db) return null;
    const today = toISODate(new Date());
    const order = { curso: 0, pend: 1, repasar: 2, dominado: 3 } as const;
    const tasks = db.tasks
      .filter((t) => t.status !== "dominado")
      .sort((a, b) => order[a.status] - order[b.status] || (a.due_date ?? "9999").localeCompare(b.due_date ?? "9999") || a.position - b.position)
      .slice(0, 60);
    const blocksDone = db.focus_sessions.filter((s) => s.completed && s.mode === "foco" && s.ended_at && toISODate(new Date(s.ended_at)) === today).length;
    const minutesToday = db.study_logs.filter((l) => l.date === today).reduce((n, l) => n + l.minutes, 0);
    return { tasks, blocksDone, minutesToday, goal: db.profile.daily_goal_min || 60 };
  }, [db]);

  const remaining = remainingSeconds(focus, now);
  const planned = plannedSeconds(focus.mode);
  const isBreak = focus.mode !== "foco";
  const task = focus.taskId && db ? db.tasks.find((t) => t.id === focus.taskId) : null;

  function start() {
    // Pedimos permiso para avisar al terminar (solo la primera vez).
    if ("Notification" in window && Notification.permission === "default") void Notification.requestPermission();
    startFocus();
  }

  function reset() {
    const s = getFocus();
    // Un foco cortado después de al menos un minuto queda registrado como incompleto (no suma minutos).
    if (s.mode === "foco" && s.sessionStartedAt && elapsedMs(s, Date.now()) >= 60_000) {
      recordFocusSession({
        task_id: s.taskId,
        mode: s.mode,
        planned_sec: plannedSeconds(s.mode),
        started_at: s.sessionStartedAt,
        ended_at: new Date().toISOString(),
        completed: false,
      });
    }
    resetFocus();
  }

  const goalBlocks = data ? blocksGoal(data.goal) : 3;

  return (
    <>
      <PageHeader kicker="Estudiar" title="Foco" backHref="/mas" backLabel="Volver a Más" />
      <div className="grid items-start gap-5 desk:grid-cols-[1.4fr_1fr]">
        <Card className="flex flex-col items-center gap-6 p-6 text-center desk:p-10">
          <SegmentedControl
            label="Modo"
            options={FOCUS_MODES.map((m) => ({ value: m.value, label: m.label }))}
            value={focus.mode}
            onChange={(m: FocusMode) => setFocusMode(m)}
            disabled={focus.status === "running"}
          />

          <div>
            <p className="text-sm font-semibold text-muted" aria-live="polite">
              {focus.status === "running" ? (isBreak ? "Pausa en curso" : "Bloque en curso") : focus.status === "paused" ? "En pausa" : isBreak ? "Pausa lista" : "Listo para empezar"}
            </p>
            <p
              className="tabular font-display text-[5.5rem] leading-none font-semibold tracking-[-0.04em] desk:text-[8rem]"
              role="timer"
              aria-label={`Quedan ${formatClock(remaining)}`}
            >
              {formatClock(remaining)}
            </p>
          </div>

          <ProgressBar label="Avance del bloque" value={planned - remaining} max={planned} tone={isBreak ? "sage" : "accent"} className="max-w-md" />

          <div className="flex flex-wrap justify-center gap-2">
            {focus.status === "running" ? (
              <Button variant="primary" size="lg" onClick={pauseFocus} className="min-w-40">
                <Pause aria-hidden /> Pausar
              </Button>
            ) : (
              <Button variant="primary" size="lg" onClick={start} className="min-w-40">
                <Play aria-hidden /> {focus.status === "paused" ? "Seguir" : "Empezar"}
              </Button>
            )}
            <Button variant="secondary" size="lg" onClick={reset} disabled={focus.status === "idle"}>
              <RotateCcw aria-hidden /> Reiniciar
            </Button>
          </div>

          <div className="w-full max-w-md text-left">
            {data && (
              <SelectField label="Trabajando en" value={focus.taskId ?? ""} onChange={(e) => setFocusTask(e.target.value || null)}>
                <option value="">Sin tarea</option>
                {task && !data.tasks.some((t) => t.id === task.id) && <option value={task.id}>{task.title}</option>}
                {data.tasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {STATUS_LABEL[t.status]} · {t.title.length > 70 ? `${t.title.slice(0, 70)}…` : t.title}
                  </option>
                ))}
              </SelectField>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <Card>
            <h2 className="text-lg font-semibold">Tu hora de hoy</h2>
            <div className="mt-4 flex gap-1.5" aria-hidden>
              {Array.from({ length: Math.max(goalBlocks, data?.blocksDone ?? 0) }, (_, i) => (
                <span key={i} className={cn("h-10 flex-1 rounded-[10px]", i < (data?.blocksDone ?? 0) ? "bg-sage" : "bg-sunken")} />
              ))}
            </div>
            <p className="mt-3 text-[15px]">
              <b className="tabular">{data?.blocksDone ?? 0}</b> de <b className="tabular">{goalBlocks}</b> bloques de {BLOCK_MINUTES} minutos
            </p>
            <p className="mt-0.5 text-sm text-muted">
              {data ? `${data.minutesToday} min registrados hoy (objetivo ${data.goal}).` : " "}
            </p>
          </Card>

          <Card tone="sunken">
            <p className="text-[15px]">
              <b>En la pausa:</b> 5 tarjetas rápidas o levantarte y caminar.
            </p>
            {isBreak && (
              <Link href="/tarjetas/repasar" className="mt-3 inline-block text-sm font-semibold text-accent-text hover:underline">
                Repasar tarjetas
              </Link>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
