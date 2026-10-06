import type { Metadata } from "next";
import { CardsView } from "@/components/features/tarjetas/CardsView";

export const metadata: Metadata = { title: "Tarjetas" };

export default function TarjetasPage() {
  return <CardsView />;
}
