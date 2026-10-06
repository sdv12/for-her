import type { Metadata } from "next";
import { MoreList } from "@/components/features/mas/MoreList";
import { PageHeader } from "@/components/shell/PageHeader";
import { VersionTag } from "@/components/shell/VersionTag";

export const metadata: Metadata = { title: "Más" };

/** Pestaña "Más" del celular. En desktop todo esto ya está en el sidebar. */
export default function MasPage() {
  return (
    <>
      <PageHeader kicker="Todo lo demás" title="Más" />
      <MoreList />
      <VersionTag className="mt-6 text-center" />
    </>
  );
}
