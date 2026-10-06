"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarRange, Ellipsis, Repeat, SquareKanban, Sunrise, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { MORE_ITEMS, isActive } from "./nav";

type Tab = { href: string; label: string; icon: LucideIcon; match: (p: string) => boolean };

const TABS: Tab[] = [
  { href: "/hoy", label: "Hoy", icon: Sunrise, match: (p) => isActive(p, "/hoy") },
  { href: "/plan", label: "Plan", icon: CalendarRange, match: (p) => isActive(p, "/plan") },
  { href: "/tarjetas/repasar", label: "Repasar", icon: Repeat, match: (p) => isActive(p, "/tarjetas") },
  { href: "/tablero", label: "Tablero", icon: SquareKanban, match: (p) => isActive(p, "/tablero") },
  {
    href: "/mas",
    label: "Más",
    icon: Ellipsis,
    match: (p) => isActive(p, "/mas") || MORE_ITEMS.some((i) => isActive(p, i.href)),
  },
];

/** Barra inferior flotante del celular (< 860px). "Repasar" va al centro y destacado. */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Secciones"
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] desk:hidden"
    >
      <ul className="mx-auto flex max-w-md items-center justify-between rounded-full border border-line bg-surface px-2 py-1.5 shadow-float">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          const central = tab.href === "/tarjetas/repasar";
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className="flex min-h-13 flex-col items-center justify-center gap-0.5 rounded-full"
              >
                {central ? (
                  <span className="-mt-1 inline-flex size-11 items-center justify-center rounded-full bg-accent text-accent-ink">
                    <Icon aria-hidden className="size-5" strokeWidth={2.4} />
                  </span>
                ) : (
                  <Icon aria-hidden className={cn("size-[22px]", active ? "text-accent-text" : "text-muted")} />
                )}
                <span
                  className={cn(
                    "text-[11px] leading-none",
                    central && "sr-only",
                    active ? "font-bold text-ink" : "font-semibold text-muted",
                  )}
                >
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
