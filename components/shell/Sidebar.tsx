"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Settings } from "lucide-react";
import { useFocus } from "@/lib/focus-store";
import { useNavBadges } from "@/lib/mock/badges";
import { cn } from "@/lib/cn";
import { ExamCountdown } from "./ExamCountdown";
import { useQuickAdd } from "./QuickAdd";
import { Logo } from "./Logo";
import { NAV, isActive, type NavItem } from "./nav";
import { ThemeToggle } from "./ThemeToggle";
import { VersionTag } from "./VersionTag";

/** Sidebar fijo de desktop (≥ 860px). */
export function Sidebar() {
  const pathname = usePathname();
  const badges = useNavBadges();
  const focus = useFocus();
  const focusBadge = focus.status === "running" ? "en curso" : focus.status === "paused" ? "en pausa" : null;

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[260px] flex-col border-r border-line bg-canvas desk:flex">
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pt-5 pb-4">
        <Link href="/hoy" className="self-start rounded-btn px-2 py-1">
          <Logo />
        </Link>

        <ExamCountdown />

        <SidebarQuickAdd />

        <nav aria-label="Secciones" className="flex flex-col gap-4">
          {NAV.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-3 text-xs font-semibold tracking-wide text-muted uppercase">{group.label}</p>
              <ul className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <SidebarLink item={item} active={isActive(pathname, item.href)} badge={item.href === "/foco" ? focusBadge : item.badge?.(badges)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-1 border-t border-line px-4 py-3">
        <SidebarLink
          item={{ href: "/ajustes", label: "Ajustes", icon: Settings }}
          active={isActive(pathname, "/ajustes")}
        />
        <div className="flex items-center justify-between">
          <ThemeToggle withLabel />
          <VersionTag className="pr-2" />
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ item, active, badge }: { item: NavItem; active: boolean; badge?: string | number | null }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-h-10 items-center gap-3 rounded-btn px-3 py-1.5 text-[15px] leading-tight transition-colors",
        active ? "bg-surface font-semibold text-ink ring-1 ring-line" : "text-ink/85 hover:bg-sunken",
      )}
    >
      <Icon aria-hidden className={cn("size-[18px] shrink-0", active ? "text-accent-text" : "text-muted")} />
      <span className="flex-1">{item.label}</span>
      {badge != null && (
        <span
          className={cn(
            "tabular rounded-full px-2 py-0.5 text-xs font-semibold",
            active ? "bg-accent-soft text-ink" : "bg-sunken text-muted",
          )}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

function SidebarQuickAdd() {
  const open = useQuickAdd();
  return (
    <button
      type="button"
      onClick={open}
      aria-keyshortcuts="N"
      className="flex min-h-11 items-center gap-3 rounded-btn border border-line bg-surface px-3 text-[15px] font-semibold hover:bg-sunken"
    >
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent text-accent-ink">
        <Plus aria-hidden className="size-4" strokeWidth={2.5} />
      </span>
      <span className="flex-1 text-left">Agregar rápido</span>
      <kbd className="rounded-[6px] border border-line bg-sunken px-1.5 text-xs font-semibold text-muted">N</kbd>
    </button>
  );
}
