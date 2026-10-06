import type { Metadata } from "next";
import { ImportWizard } from "@/components/features/plan-import/ImportWizard";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Importar cronograma" };

export default function ImportarPlanPage() {
  return (
    <>
      <PageHeader kicker="Plan" title="Importar cronograma" backHref="/plan" backLabel="Volver al plan" />
      <ImportWizard />
    </>
  );
}
