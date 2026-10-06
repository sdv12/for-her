import type { Metadata } from "next";
import { FocoView } from "@/components/features/foco/FocoView";

export const metadata: Metadata = { title: "Foco" };

export default async function FocoPage({ searchParams }: PageProps<"/foco">) {
  const { tarea } = await searchParams;
  return <FocoView initialTaskId={typeof tarea === "string" ? tarea : null} />;
}
