"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";
import { setThemePreference } from "@/lib/mock/actions/settings";

const noop = () => () => {};

/** Alterna claro/oscuro. Mientras no hidrata muestra el ícono neutro para no parpadear. */
export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noop, () => true, () => false);
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro";

  return (
    <button
      type="button"
      onClick={() => {
        const next = isDark ? "light" : "dark";
        setTheme(next);
        setThemePreference(next);
      }}
      aria-label={withLabel ? undefined : label}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-btn text-ink hover:bg-sunken",
        withLabel ? "px-3 text-sm font-semibold" : "size-11 justify-center",
        className,
      )}
    >
      {isDark ? <Sun aria-hidden className="size-5" /> : <Moon aria-hidden className="size-5" />}
      {withLabel && <span>{isDark ? "Modo claro" : "Modo oscuro"}</span>}
    </button>
  );
}
