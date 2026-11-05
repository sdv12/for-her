import type { Metadata } from "next";
import { MateriasView } from "@/components/features/programa/MateriasView";

export const metadata: Metadata = { title: "Materias por año" };

export default function MateriasPage() {
  return <MateriasView />;
}
