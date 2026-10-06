import type { Metadata } from "next";
import { SyllabusView } from "@/components/features/temario/SyllabusView";

export const metadata: Metadata = { title: "Temario" };

export default function TemarioPage() {
  return <SyllabusView />;
}
