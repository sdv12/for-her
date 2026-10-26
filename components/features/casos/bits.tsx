import { Baby, Star, User } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ClinicalCase, Relevance } from "@/lib/cases/types";

/** Tres estrellas (llenas hasta `value`). */
export function Stars({ value, label, size = "md" }: { value: number; label: string; size?: "sm" | "md" }) {
  return (
    <span role="img" aria-label={`${label}: ${value} de 3 estrellas`} className="inline-flex gap-0.5">
      {[1, 2, 3].map((i) => (
        <Star
          key={i}
          aria-hidden
          className={cn(size === "sm" ? "size-3.5" : "size-5", i <= value ? "fill-honey text-honey" : "text-line")}
          strokeWidth={2}
        />
      ))}
    </span>
  );
}

const RELEVANCE: Record<Relevance, { label: string; className: string }> = {
  clave: { label: "Clave", className: "bg-sage-soft text-ink" },
  util: { label: "Útil", className: "bg-accent-soft text-ink" },
  neutro: { label: "No cambia", className: "bg-sunken text-muted" },
  innecesario: { label: "No hacía falta", className: "bg-honey-soft text-ink" },
  riesgoso: { label: "Riesgoso", className: "bg-honey text-ink" },
};

export function RelevanceBadge({ value }: { value: Relevance }) {
  const r = RELEVANCE[value];
  return <span className={cn("inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold", r.className)}>{r.label}</span>;
}

export function PatientIcon({ patient, className }: { patient: ClinicalCase["patient"]; className?: string }) {
  const baby = patient.ageUnit !== "años" || patient.age < 3;
  const Icon = baby ? Baby : User;
  return (
    <span className={cn("inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-text", className)}>
      <Icon aria-hidden className="size-5" />
    </span>
  );
}
