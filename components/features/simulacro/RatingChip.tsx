import { Chip } from "@/components/ui/Pill";
import type { SelfRating } from "@/lib/simulacro";

const LABEL: Record<SelfRating, string> = { flojo: "Flojo", aceptable: "Aceptable", solido: "Sólido" };

export function RatingChip({ rating }: { rating: SelfRating | null }) {
  if (!rating) return <Chip>Sin evaluar</Chip>;
  return <Chip tone={rating === "solido" ? "sage" : rating === "aceptable" ? "honey" : "accent"}>{LABEL[rating]}</Chip>;
}
