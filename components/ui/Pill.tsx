import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "sage" | "honey" | "hero";

const CHIP_TONES: Record<Tone, string> = {
  neutral: "bg-sunken text-muted",
  accent: "bg-accent-soft text-accent-text",
  sage: "bg-sage-soft text-ink",
  honey: "bg-honey-soft text-ink",
  hero: "bg-hero-ink/12 text-hero-ink",
};

/** Etiqueta estática (modo del día, origen "Plan"/"Mía", fase…). */
export function Chip({
  tone = "neutral",
  className,
  ...props
}: React.ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold leading-none",
        "[&_svg]:size-3.5",
        CHIP_TONES[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Pill seleccionable para filtros. Comunica el estado con aria-pressed. */
export function Pill({
  selected = false,
  className,
  type = "button",
  ...props
}: React.ComponentProps<"button"> & { selected?: boolean }) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap",
        "transition-colors duration-150",
        selected
          ? "border-ink bg-ink text-canvas"
          : "border-line bg-surface text-ink hover:bg-sunken",
        className,
      )}
      {...props}
    />
  );
}

/** Punto de color de materia. El nombre de la materia siempre acompaña al punto. */
export function Dot({ color, className }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-2.5 shrink-0 rounded-full", className)}
      style={{ backgroundColor: color }}
    />
  );
}
