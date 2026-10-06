import { Construction } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

/** Placeholder de las secciones que todavía no están construidas. */
export function ComingSoon({ step, children }: { step: number; children: React.ReactNode }) {
  return (
    <EmptyState icon={Construction} title={`Llega en el paso ${step}`}>
      {children}
    </EmptyState>
  );
}
