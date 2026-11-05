import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MateriaDetail } from "@/components/features/programa/MateriaDetail";
import { getMateria, MATERIAS } from "@/lib/programa/materias";

export function generateStaticParams() {
  return MATERIAS.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: PageProps<"/programa/materia/[id]">): Promise<Metadata> {
  const { id } = await params;
  return { title: getMateria(id)?.name ?? "Materia" };
}

export default async function MateriaPage({ params }: PageProps<"/programa/materia/[id]">) {
  const { id } = await params;
  if (!getMateria(id)) notFound();
  return <MateriaDetail id={id} />;
}
