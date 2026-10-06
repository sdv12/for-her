import type { Metadata } from "next";
import { ReviewSession } from "@/components/features/tarjetas/ReviewSession";

export const metadata: Metadata = { title: "Repasar" };

export default async function RepasarPage({ searchParams }: PageProps<"/tarjetas/repasar">) {
  const { mazo } = await searchParams;
  const deckId = typeof mazo === "string" ? mazo : null;
  // key: entrar a otro mazo arranca una sesión nueva.
  return <ReviewSession key={deckId ?? "todas"} deckId={deckId} />;
}
