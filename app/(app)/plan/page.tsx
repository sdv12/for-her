import type { Metadata } from "next";
import { PlanView } from "@/components/features/plan/PlanView";
import { PageHeader } from "@/components/shell/PageHeader";

export const metadata: Metadata = { title: "Plan" };

export default async function PlanPage({ searchParams }: PageProps<"/plan">) {
  const { semana } = await searchParams;
  const weekNum = typeof semana === "string" && /^\d+$/.test(semana) ? Number(semana) : null;
  return (
    <>
      <PageHeader kicker="Planificar" title="Plan" />
      <PlanView key={weekNum ?? "actual"} initialWeekNum={weekNum} />
    </>
  );
}
