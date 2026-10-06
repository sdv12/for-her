import type { Metadata } from "next";
import { SettingsView } from "@/components/features/ajustes/SettingsView";

export const metadata: Metadata = { title: "Ajustes" };

export default function AjustesPage() {
  return <SettingsView />;
}
