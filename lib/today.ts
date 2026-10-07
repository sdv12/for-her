import type { DB, Mistake, PlanDay, PlanPhase, PlanWeek, Task } from "@/lib/data/types";
import { daysUntilExam } from "@/lib/dates";
import { currentWeek, selectActivePlan } from "@/lib/plan";
import { diffDays, toISODate } from "@/lib/plan-import/dates";

export type TodayView = {
  today: string;
  hasPlan: boolean;
  hasCards: boolean;
  /** Día del plan con fecha de hoy (el primero si hay varios). */
  day: PlanDay | null;
  dayTask: Task | null;
  week: PlanWeek | null;
  phase: PlanPhase | null;
  /** Si hoy no hay día del plan: el próximo que viene. */
  nextDay: PlanDay | null;
  isWeekend: boolean;
  weekDays: PlanDay[];
  weekStarted: boolean;
  minutesToday: number;
  goal: number;
  cardsDue: number;
  cardsReviewedToday: number;
  exam: { days: number | null; progress: number };
  recentMistakes: Mistake[];
};

export function selectToday(db: DB, now: Date = new Date()): TodayView {
  const today = toISODate(now);
  const view = selectActivePlan(db);
  const week = view ? currentWeek(view.weeks, today) : null;
  const weekDays = week ? (view!.daysByWeek.get(week.id) ?? []) : [];
  const allDays = view ? view.weeks.flatMap((w) => view.daysByWeek.get(w.id) ?? []) : [];
  const day = allDays.find((d) => d.date === today) ?? null;
  const dayWeek = day && view ? view.weeks.find((w) => w.id === day.week_id)! : week;
  const jsDay = now.getDay();

  const examDays = daysUntilExam(db.profile.exam_date, now);
  // Progreso hacia el examen: desde el inicio del plan (o desde hoy) hasta la fecha.
  let progress = 0;
  if (db.profile.exam_date && view) {
    const total = diffDays(db.profile.exam_date, view.plan.start_date);
    const elapsed = diffDays(today, view.plan.start_date);
    progress = total > 0 ? Math.min(1, Math.max(0, elapsed / total)) : 1;
  }

  return {
    today,
    hasPlan: Boolean(view && view.weeks.length > 0),
    hasCards: db.cards.length > 0,
    day,
    dayTask: day ? (db.tasks.find((t) => t.plan_day_id === day.id) ?? null) : null,
    week: dayWeek,
    phase: dayWeek && view ? (view.phases.find((p) => p.id === dayWeek.phase_id) ?? null) : null,
    nextDay: day ? null : (allDays.filter((d) => d.date > today).sort((a, b) => a.date.localeCompare(b.date))[0] ?? null),
    isWeekend: jsDay === 0 || jsDay === 6,
    weekDays,
    weekStarted: week ? week.start_date <= today : false,
    minutesToday: db.study_logs.filter((l) => l.date === today).reduce((n, l) => n + l.minutes, 0),
    goal: db.profile.daily_goal_min || 60,
    cardsDue: db.cards.filter((c) => new Date(c.due_at) <= now).length,
    cardsReviewedToday: new Set(db.card_reviews.filter((r) => toISODate(new Date(r.reviewed_at)) === today).map((r) => r.card_id)).size,
    exam: { days: examDays, progress },
    recentMistakes: db.mistakes
      .filter((m) => !m.resolved_at)
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
      .slice(0, 2),
  };
}

/** A dónde lleva "Empezar" según el modo del día. */
export function startHref(mode: string, taskId: string | null): string {
  const m = mode.toLowerCase();
  if (m.includes("simulaci")) return "/simulacro?modo=suelta";
  if (m.includes("recall")) return "/tarjetas/repasar";
  return taskId ? `/foco?tarea=${taskId}` : "/foco";
}
