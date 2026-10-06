"use client";

import { useMemo } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { PageHeader } from "@/components/shell/PageHeader";
import { useDB } from "@/lib/mock/store";
import { selectToday } from "@/lib/today";
import { HeroToday } from "./HeroToday";
import { RecentMistakes } from "./RecentMistakes";
import { Shortcuts } from "./Shortcuts";
import { TodayStats } from "./TodayStats";
import { WeekChecklist } from "./WeekChecklist";

export function HoyView() {
  const db = useDB();
  const v = useMemo(() => (db ? selectToday(db) : null), [db]);

  if (!db || !v) {
    return (
      <>
        <PageHeader kicker="Planificar" title="Hoy" />
        <div aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-5">
          <div className="h-64 rounded-card bg-sunken" />
          <div className="grid grid-cols-2 gap-3 desk:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-32 rounded-card bg-sunken" />
            ))}
          </div>
        </div>
      </>
    );
  }

  const dateLabel = format(new Date(), "EEEE d 'de' MMMM", { locale: es });
  const name = db.profile.display_name?.trim();

  return (
    <>
      <PageHeader kicker={dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1)} title={name ? `Hola, ${name}` : "Hoy"} />
      <div className="flex flex-col gap-5">
        <HeroToday v={v} />
        <TodayStats v={v} />
        <div className="grid items-start gap-5 desk:grid-cols-[1.35fr_1fr]">
          <WeekChecklist v={v} />
          <div className="flex flex-col gap-5">
            <Shortcuts />
            <RecentMistakes mistakes={v.recentMistakes} />
          </div>
        </div>
      </div>
    </>
  );
}
