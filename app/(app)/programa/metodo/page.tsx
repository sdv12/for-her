import type { Metadata } from "next";
import { MetodoView } from "@/components/features/programa/MetodoView";

export const metadata: Metadata = { title: "Método de estudio" };

export default function MetodoPage() {
  return <MetodoView />;
}
