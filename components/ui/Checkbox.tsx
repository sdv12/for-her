import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

type Props = Omit<React.ComponentProps<"input">, "type"> & {
  /** Texto visible. Si no hay, pasar aria-label. */
  label?: React.ReactNode;
};

/** Checkbox nativo con caja propia. Tildado = sage (hecho). */
export function Checkbox({ label, className, ...input }: Props) {
  return (
    <label className={cn("inline-flex min-h-11 cursor-pointer items-center gap-3", className)}>
      <span className="relative inline-flex size-6 shrink-0">
        <input
          type="checkbox"
          className={cn(
            "peer size-6 cursor-pointer appearance-none rounded-[8px] border-[1.5px] border-muted/60 bg-surface",
            "transition-colors checked:border-sage checked:bg-sage",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text",
          )}
          {...input}
        />
        <Check
          aria-hidden
          strokeWidth={3}
          className="pointer-events-none absolute inset-0 m-auto size-4 text-surface opacity-0 peer-checked:opacity-100"
        />
      </span>
      {label && <span className="text-[15px]">{label}</span>}
    </label>
  );
}
