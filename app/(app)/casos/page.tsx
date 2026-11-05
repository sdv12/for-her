import type { Metadata } from "next";
import { CasesView } from "@/components/features/casos/CasesView";
import { getEje } from "@/lib/programa/ejes";
import { getMateria } from "@/lib/programa/materias";

export const metadata: Metadata = { title: "Casos clínicos" };

export default async function CasosPage({ searchParams }: PageProps<"/casos">) {
  const { eje, materia } = await searchParams;
  const ejeId = typeof eje === "string" && getEje(eje) ? eje : "";
  const materiaId = typeof materia === "string" && getMateria(materia) ? materia : "";
  return <CasesView key={`${ejeId}|${materiaId}`} initialEje={ejeId} initialMateria={materiaId} />;
}
