import type { Metadata } from "next";
import { HoyView } from "@/components/features/hoy/HoyView";

export const metadata: Metadata = { title: "Hoy" };

export default function HoyPage() {
  return <HoyView />;
}
