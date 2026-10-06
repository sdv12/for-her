import type { Metadata } from "next";
import { MistakesView } from "@/components/features/errores/MistakesView";

export const metadata: Metadata = { title: "Errores" };

export default function ErroresPage() {
  return <MistakesView />;
}
