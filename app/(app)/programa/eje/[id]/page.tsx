import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EjeDetail } from "@/components/features/programa/EjeDetail";
import { EJES, getEje } from "@/lib/programa/ejes";

export function generateStaticParams() {
  return EJES.map((e) => ({ id: e.id }));
}

export async function generateMetadata({ params }: PageProps<"/programa/eje/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getEje(id)?.title ?? "Eje" };
}

export default async function EjePage({ params }: PageProps<"/programa/eje/[id]">) {
  const { id } = await params;
  if (!getEje(id)) notFound();
  return <EjeDetail id={id} />;
}
