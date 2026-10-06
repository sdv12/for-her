import { cn } from "@/lib/cn";

type Tone = "accent" | "sage" | "honey" | "hero";

const FILL: Record<Tone, string> = {
  accent: "bg-accent",
  sage: "bg-sage",
  honey: "bg-honey",
  hero: "bg-accent",
};

type Props = {
  value: number;
  max?: number;
  /** Nombre accesible, p. ej. "Minutos de hoy". */
  label: string;
  tone?: Tone;
  className?: string;
};

export function ProgressBar({ value, max = 100, label, tone = "accent", className }: Props) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(value, max)}
      className={cn("h-2 w-full overflow-hidden rounded-full", tone === "hero" ? "bg-hero-ink/15" : "bg-sunken", className)}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500 ease-out", FILL[tone])}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
