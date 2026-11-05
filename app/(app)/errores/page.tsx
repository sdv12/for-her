import type { Metadata } from "next";
import { MistakesView } from "@/components/features/errores/MistakesView";

export const metadata: Metadata = { title: "Errores" };

export default async function ErroresPage({ searchParams }: PageProps<"/errores">) {
  const { nuevo } = await searchParams;
  return <MistakesView openNew={nuevo === "1"} />;
}
