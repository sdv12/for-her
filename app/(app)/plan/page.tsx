import type { Metadata } from "next";
import { PlanView } from "@/components/features/plan/PlanView";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Plan" };

export default function PlanPage() {
  return (
    <>
      <PageHeader kicker="Planificar" title="Plan" />
      <PlanView />
    </>
  );
}
