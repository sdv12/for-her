import type { Metadata } from "next";
import { RutaView } from "@/components/features/programa/RutaView";

export const metadata: Metadata = { title: "Ruta de 12 semanas" };

export default function RutaPage() {
  return <RutaView />;
}
