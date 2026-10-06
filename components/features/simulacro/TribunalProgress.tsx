import { cn } from "@/lib/cn";
import { STAGES } from "@/lib/simulacro";

/** Barra del tribunal: Anatomía → Bioquímica → Fisiología → Clínica → Repregunta. */
export function TribunalProgress({ index }: { index: number }) {
  return (
    <ol aria-label="Etapas del tribunal" className="grid grid-cols-5 gap-1.5">
      {STAGES.map((stage, i) => (
        <li key={stage} aria-current={i === index ? "step" : undefined} className="flex flex-col gap-1.5">
          <span className={cn("h-1.5 rounded-full", i < index ? "bg-sage" : i === index ? "bg-accent" : "bg-sunken")} />
          <span className={cn("truncate text-[11px] font-semibold desk:text-xs", i === index ? "text-ink" : "text-muted")}>
            <span className="sr-only">{i < index ? "Hecha: " : i === index ? "Ahora: " : "Después: "}</span>
            {stage}
          </span>
        </li>
      ))}
    </ol>
  );
}
