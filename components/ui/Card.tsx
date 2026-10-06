import { cn } from "@/lib/cn";

type Tone = "surface" | "sunken" | "hero";

const TONES: Record<Tone, string> = {
  surface: "border border-line bg-surface text-ink",
  sunken: "bg-sunken text-ink",
  hero: "bg-hero text-hero-ink",
};

export function Card({
  tone = "surface",
  className,
  ...props
}: React.ComponentProps<"div"> & { tone?: Tone }) {
  return <div className={cn("rounded-card p-5", TONES[tone], className)} {...props} />;
}

/** Encabezado chico de tarjeta: kicker opcional + título. */
export function CardTitle({
  kicker,
  children,
  className,
}: {
  kicker?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-3", className)}>
      {kicker && <p className="mb-1 text-xs font-semibold tracking-wide text-muted uppercase">{kicker}</p>}
      <h3 className="text-lg font-semibold">{children}</h3>
    </div>
  );
}
