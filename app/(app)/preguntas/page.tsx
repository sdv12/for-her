import type { Metadata } from "next";
import { QuestionsView } from "@/components/features/preguntas/QuestionsView";

export const metadata: Metadata = { title: "Preguntas de examen" };

export default async function PreguntasPage({ searchParams }: PageProps<"/preguntas">) {
  const { nueva } = await searchParams;
  return <QuestionsView openNew={nueva === "1"} />;
}
