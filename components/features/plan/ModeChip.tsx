import { BookOpen, Mic, Repeat } from "lucide-react";
import { Chip } from "@/components/ui/Pill";

/** Chip del modo de estudio del día, con ícono según el tipo. */
export function ModeChip({ mode, tone = "neutral" }: { mode: string; tone?: "neutral" | "hero" }) {
  if (!mode) return null;
  const m = mode.toLowerCase();
  const Icon = m.includes("simulaci") ? Mic : m.includes("recall") ? Repeat : BookOpen;
  return (
    <Chip tone={tone}>
      <Icon aria-hidden /> {mode}
    </Chip>
  );
}
