"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, ChevronRight, Circle } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Chip } from "@/components/ui/Pill";
import { patientLabel } from "@/lib/cases/engine";
import type { ClinicalCase } from "@/lib/cases/types";
import { cn } from "@/lib/cn";
import type { Prioridad } from "@/lib/programa/types";

const TABS = [
  { href: "/programa", label: "Ejes clínicos" },
  { href: "/programa/materias", label: "Materias por año" },
  { href: "/programa/ruta", label: "Ruta de 12 semanas" },
  { href: "/programa/metodo", label: "Método" },
];

function tabActive(pathname: string, href: string) {
  if (href === "/programa") return pathname === "/programa" || pathname.startsWith("/programa/eje/");
  if (href === "/programa/materias") return pathname.startsWith("/programa/materia");
  return pathname.startsWith(href);
}

/** Encabezado común del Programa con sus cuatro vistas. */
export function ProgramaHeader({ actions }: { actions?: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <PageHeader kicker="Planificar" title="Programa integrado" backHref="/mas" backLabel="Volver a Más" actions={actions} />
      <nav aria-label="Vistas del programa" className="-mx-4 mb-6 overflow-x-auto px-4 desk:mx-0 desk:px-0">
        <ul className="flex gap-1.5 pb-1">
          {TABS.map((t) => {
            const active = tabActive(pathname, t.href);
            return (
              <li key={t.href}>
                <Link
                  href={t.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                    active ? "bg-ink text-surface" : "bg-sunken text-muted hover:text-ink",
                  )}
                >
                  {t.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

const PRIORITY_LABEL: Record<Prioridad, string> = { P1: "Prioridad alta", P2: "Importante", P3: "Complementaria" };

export function PriorityChip({ p }: { p: Prioridad }) {
  return (
    <Chip tone={p === "P1" ? "accent" : "neutral"}>
      {p} · {PRIORITY_LABEL[p]}
    </Chip>
  );
}

/** Lista corta de casos clínicos con su estado (jugado o no). */
export function CaseLinks({ cases, played, max = 6, moreHref }: { cases: ClinicalCase[]; played: Set<string>; max?: number; moreHref?: string }) {
  // Primero los que todavía no jugaste.
  const sorted = [...cases].sort((a, b) => Number(played.has(a.id)) - Number(played.has(b.id)));
  const shown = sorted.slice(0, max);
  const doneCount = cases.filter((c) => played.has(c.id)).length;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted">
        <span className="tabular font-semibold text-ink">{doneCount}</span> de <span className="tabular">{cases.length}</span> casos resueltos
      </p>
      <ul className="divide-y divide-line overflow-hidden rounded-card-sm border border-line">
        {shown.map((c) => {
          const done = played.has(c.id);
          const principal = c.debrief.pathologies.find((p) => p.role === "principal")?.name ?? c.area;
          return (
            <li key={c.id}>
              <Link href={`/casos/${c.id}`} className="flex min-h-14 items-center gap-3 px-3.5 py-2.5 hover:bg-sunken">
                {done ? (
                  <CheckCircle2 aria-label="Resuelto" className="size-5 shrink-0 text-sage" />
                ) : (
                  <Circle aria-label="Sin resolver" className="size-5 shrink-0 text-muted/60" />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-snug font-semibold">{done ? principal : patientLabel(c.patient)}</span>
                  <span className="block text-xs text-muted">
                    {c.setting} · {c.area}
                  </span>
                </span>
                <ChevronRight aria-hidden className="size-4 shrink-0 text-muted" />
              </Link>
            </li>
          );
        })}
      </ul>
      {moreHref && cases.length > shown.length && (
        <Link href={moreHref} className="self-start rounded-btn py-2 text-sm font-semibold text-accent-text hover:underline">
          Ver los {cases.length} casos
        </Link>
      )}
    </div>
  );
}

export function Section({ title, children, className, id }: { title: string; children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section aria-labelledby={id} className={cn("flex flex-col gap-3", className)}>
      <h2 id={id} className="text-lg font-semibold">
        {title}
      </h2>
      {children}
    </section>
  );
}
