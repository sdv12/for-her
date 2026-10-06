import type { Metadata } from "next";
import { SimulacroView } from "@/components/features/simulacro/SimulacroView";

export const metadata: Metadata = { title: "Simulacro y tribunal" };

export default async function SimulacroPage({ searchParams }: PageProps<"/simulacro">) {
  const { modo, pregunta } = await searchParams;
  const questionId = typeof pregunta === "string" ? pregunta : null;
  return <SimulacroView key={questionId ?? "sin-pregunta"} initialMode={modo === "tribunal" ? "tribunal" : "suelta"} questionId={questionId} />;
}
