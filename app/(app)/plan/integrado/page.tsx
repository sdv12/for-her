import type { Metadata } from "next";
import { IntegratedPlanView } from "@/components/features/plan/IntegratedPlanView";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Cronograma integrado" };

export default function IntegradoPage() {
  return (
    <>
      <PageHeader kicker="Planificar" title="Cronograma integrado" backHref="/plan" backLabel="Volver al plan" />
      <IntegratedPlanView />
    </>
  );
}
