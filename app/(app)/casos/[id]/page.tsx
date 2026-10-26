import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CasePlayer } from "@/components/features/casos/CasePlayer";
import { CASES, getCase } from "@/lib/cases";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

export const metadata: Metadata = { title: "Caso clínico" };

export default async function CasoPage({ params }: PageProps<"/casos/[id]">) {
  const { id } = await params;
  if (!getCase(id)) notFound();
  return <CasePlayer id={id} />;
}
