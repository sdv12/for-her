"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Timer } from "lucide-react";
import { FOCUS_MODES, formatClock, remainingSeconds } from "@/lib/focus";
import { useFocus, useNow } from "@/lib/focus-store";

/** Celular: el reloj del bloque en curso, arriba de la barra inferior, fuera de la pantalla de Foco. */
export function FocusPill() {
  const focus = useFocus();
  const pathname = usePathname();
  const now = useNow(focus.status === "running", 1000);
  if (focus.status === "idle" || pathname.startsWith("/foco")) return null;

  const label = FOCUS_MODES.find((m) => m.value === focus.mode)!.label;
  return (
    <Link
      href="/foco"
      aria-label={`${label}: quedan ${formatClock(remainingSeconds(focus, now))}${focus.status === "paused" ? ", en pausa" : ""}. Ir a Foco`}
      className="fixed right-4 bottom-[calc(5.75rem+env(safe-area-inset-bottom))] z-40 inline-flex min-h-11 items-center gap-2 rounded-full bg-hero px-4 text-sm font-semibold text-hero-ink shadow-float desk:hidden"
    >
      <Timer aria-hidden className="size-4 text-accent" />
      <span className="tabular">{formatClock(remainingSeconds(focus, now))}</span>
      {focus.status === "paused" && <span className="text-hero-ink/70">en pausa</span>}
    </Link>
  );
}
