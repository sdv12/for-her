import { BASE_SUBJECT_COLORS } from "@/lib/subjects";
import type { Weekday } from "@/lib/data/types";
import { addDaysISO, dateForWeekday, diffDays, fold, nextWeekday } from "./dates";
import type { DraftDay, DraftWeek, PlanDraft } from "./types";

let seq = 0;
export const draftKey = () => `k${++seq}`;

/** Fecha de un día dentro de su semana; si la etiqueta no cae en el rango, la próxima con ese día. */
export function dayDate(week: Pick<DraftWeek, "start" | "end">, weekday: Weekday) {
  const inside = dateForWeekday(week.start, week.end, weekday);
  return { date: inside ?? nextWeekday(week.start, weekday), inRange: inside !== null };
}

/** Recalcula las fechas de los días de una semana (después de cambiarle el rango). */
export function recomputeWeekDays(week: DraftWeek): DraftWeek {
  return { ...week, days: week.days.map((d) => ({ ...d, date: dayDate(week, d.weekday).date })) };
}

/** Corre todo el cronograma para que la primera semana empiece en `newStart`. */
export function shiftDraft(draft: PlanDraft, newStart: string): PlanDraft {
  const first = draft.phases.flatMap((p) => p.weeks)[0];
  if (!first) return { ...draft, start: newStart };
  const delta = diffDays(newStart, first.start);
  return {
    ...draft,
    start: newStart,
    phases: draft.phases.map((p) => ({
      ...p,
      weeks: p.weeks.map((w) =>
        recomputeWeekDays({ ...w, start: addDaysISO(w.start, delta), end: addDaysISO(w.end, delta) }),
      ),
    })),
  };
}

/** Cronograma vacío: N semanas de 7 días desde `start`, en una sola fase. */
export function blankDraft(title: string, start: string, weeks: number): PlanDraft {
  return {
    title,
    start,
    phases: [
      {
        key: draftKey(),
        num: 1,
        code: "1",
        name: "Fase 1",
        description: null,
        alert: null,
        weeks: Array.from({ length: weeks }, (_, i) => ({
          key: draftKey(),
          num: i + 1,
          start: addDaysISO(start, i * 7),
          end: addDaysISO(start, i * 7 + 6),
          title: `Semana ${i + 1}`,
          subject: null,
          days: [],
        })),
      },
    ],
  };
}

const SUBJECT_HINTS: Array<[RegExp, keyof typeof BASE_SUBJECT_COLORS]> = [
  [/anatom|torax|abdomen|retroperitoneo|mediastino|traquea/, "Anatomía"],
  [/bioquim|krebs|metabol|glucolisis|enzima/, "Bioquímica"],
  [/fisiolog/, "Fisiología"],
  [/salud comunitaria|epidemiolog|tasas|incidencia|prevalencia|prevencion|psicosocial/, "Salud comunitaria"],
];

/** Materia sugerida por palabras clave del título; si no hay pista, Clínica. */
export function guessSubject(text: string): string {
  const t = fold(text);
  return SUBJECT_HINTS.find(([re]) => re.test(t))?.[1] ?? "Clínica";
}

const NOT_A_TOPIC = /^(simulaci|repaso|revisi|correcci|descanso|grupo|active|estrategia)/;

/**
 * Temas detectados para el Temario: lo que está antes de ":" en cada día
 * ("HTA 1: definición…" → "HTA"), sin repetir y sin días de repaso o simulación.
 */
export function detectTopics(draft: PlanDraft): Array<{ subject: string; name: string }> {
  const seen = new Set<string>();
  const out: Array<{ subject: string; name: string }> = [];
  for (const w of draft.phases.flatMap((p) => p.weeks)) {
    if (!w.subject) continue;
    for (const d of w.days) {
      const head = d.content.split(":")[0].trim();
      if (head === d.content.trim() || head.length > 40 || NOT_A_TOPIC.test(fold(head))) continue;
      const name = head.replace(/\s+\d+(\s*(y|\+)\s*\d+)?$/, "").trim();
      const id = `${w.subject}|${fold(name)}`;
      if (!name || seen.has(id)) continue;
      seen.add(id);
      out.push({ subject: w.subject, name });
    }
  }
  return out;
}

export function countDays(draft: PlanDraft) {
  return draft.phases.reduce((n, p) => n + p.weeks.reduce((m, w) => m + w.days.length, 0), 0);
}

export function newDraftDay(week: DraftWeek, weekday: Weekday, content: string, mode: string): DraftDay {
  return { key: draftKey(), weekday, date: dayDate(week, weekday).date, content, mode };
}
