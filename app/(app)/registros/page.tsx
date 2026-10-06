import type { Metadata } from "next";
import { RegistrosView } from "@/components/features/registros/RegistrosView";

export const metadata: Metadata = { title: "Registros" };

export default async function RegistrosPage({ searchParams }: PageProps<"/registros">) {
  const { dia } = await searchParams;
  const date = typeof dia === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dia) ? dia : null;
  return <RegistrosView initialDate={date} />;
}
