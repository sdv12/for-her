import type { Metadata } from "next";
import { EjesView } from "@/components/features/programa/EjesView";

export const metadata: Metadata = { title: "Programa integrado" };

export default function ProgramaPage() {
  return <EjesView />;
}
