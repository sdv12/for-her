"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/Toast";
import { playChime } from "@/lib/chime";
import { FOCUS_MODES, formatClock, plannedSeconds, remainingSeconds } from "@/lib/focus";
import { getFocus, setFocusMode, useFocus, useNow } from "@/lib/focus-store";
import { recordFocusSession } from "@/lib/mock/actions/focus";

/**
 * Vive en el layout: detecta cuándo termina un bloque aunque estés en otra sección,
 * guarda la sesión, suena, avisa (notificación del navegador si hay permiso) y
 * muestra el tiempo en el título de la pestaña.
 */
export function FocusRuntime() {
  const focus = useFocus();
  const now = useNow(focus.status === "running", 500);
  const toast = useToast();
  const router = useRouter();
  const baseTitle = useRef<string | null>(null);
  const remaining = remainingSeconds(focus, now);

  useEffect(() => {
    if (focus.status !== "running" || remaining > 0) return;
    const s = getFocus();
    if (s.status !== "running") return;
    const wasFocus = s.mode === "foco";
    const { minutesLogged } = recordFocusSession({
      task_id: s.taskId,
      mode: s.mode,
      planned_sec: plannedSeconds(s.mode),
      started_at: s.sessionStartedAt ?? new Date().toISOString(),
      ended_at: new Date().toISOString(),
      completed: true,
    });
    // Lo que sigue: después de foco, una pausa corta; después de una pausa, otro foco. Queda listo, sin arrancar.
    setFocusMode(wasFocus ? "pausa5" : "foco");
    playChime();

    const message = wasFocus ? `Bloque terminado: sumé ${minutesLogged} min. Tomate 5 minutos.` : "Terminó la pausa. ¿Otro bloque?";
    if ("Notification" in window && Notification.permission === "granted" && document.visibilityState !== "visible") {
      new Notification("For her", { body: message, tag: "forher-focus" });
    }
    toast({ message, actions: [{ label: "Ir a Foco", onClick: () => router.push("/foco") }], duration: 10000 });
  }, [focus.status, remaining, toast, router]);

  useEffect(() => {
    // Next pone el título de cada página; lo guardamos cuando no es el nuestro para poder devolverlo.
    const ours = /^\d{2}:\d{2} · /.test(document.title);
    if (!ours) baseTitle.current = document.title;
    if (focus.status === "idle") {
      if (ours && baseTitle.current) document.title = baseTitle.current;
      return;
    }
    const label = FOCUS_MODES.find((m) => m.value === focus.mode)!.label;
    document.title = `${formatClock(remaining)} · ${label}${focus.status === "paused" ? " (en pausa)" : ""}`;
  }, [focus.status, focus.mode, remaining]);

  return null;
}
