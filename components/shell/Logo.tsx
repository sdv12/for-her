import { Heart } from "lucide-react";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="inline-flex size-9 items-center justify-center rounded-[12px] bg-accent text-accent-ink">
        <Heart aria-hidden className="size-[18px]" strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-bold tracking-[-0.03em]">For her</span>
    </span>
  );
}
