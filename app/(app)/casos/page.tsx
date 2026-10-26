import type { Metadata } from "next";
import { CasesView } from "@/components/features/casos/CasesView";

export const metadata: Metadata = { title: "Casos clínicos" };

export default function CasosPage() {
  return <CasesView />;
}
