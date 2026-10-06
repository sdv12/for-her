"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MORE_ITEMS } from "@/components/shell/nav";
import { useNavBadges } from "@/lib/mock/badges";

export function MoreList() {
  const badges = useNavBadges();

  return (
    <ul className="overflow-hidden rounded-card border border-line bg-surface">
      {MORE_ITEMS.map((item, i) => {
        const Icon = item.icon;
        const badge = item.badge?.(badges);
        return (
          <li key={item.href} className={i > 0 ? "border-t border-line" : undefined}>
            <Link href={item.href} className="flex min-h-14 items-center gap-3.5 px-4 hover:bg-sunken">
              <span className="inline-flex size-9 items-center justify-center rounded-[11px] bg-sunken text-accent-text">
                <Icon aria-hidden className="size-[18px]" />
              </span>
              <span className="flex-1 text-[15px] font-semibold">{item.label}</span>
              {badge != null && (
                <span className="tabular rounded-full bg-sunken px-2 py-0.5 text-xs font-semibold text-muted">{badge}</span>
              )}
              <ChevronRight aria-hidden className="size-4 text-muted" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
