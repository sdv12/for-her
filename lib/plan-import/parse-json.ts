import { addDaysISO, parseFechas } from "./dates";
import { dayDate, draftKey, guessSubject } from "./draft";
import { planJsonSchema } from "./schema";
import type { DraftWeek, ParseResult } from "./types";

/** JSON (sección 6) → borrador con fechas calculadas. */
export function parsePlanJson(input: string): ParseResult {
  let raw: unknown;
  try {
    raw = JSON.parse(input);
  } catch (e) {
    return { ok: false, error: "No es un JSON válido. Revisá comas y comillas.", issues: [(e as Error).message] };
  }

  const parsed = planJsonSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      error: "El JSON no tiene el formato esperado.",
      issues: parsed.error.issues.slice(0, 8).map((i) => `${i.path.join(" › ") || "raíz"}: ${i.message}`),
    };
  }

  const data = parsed.data;
  const warnings: string[] = [];
  let after = data.inicio;

  const phases = data.fases.map((f) => ({
    key: draftKey(),
    num: f.num,
    code: String(f.num),
    name: f.nombre,
    description: f.descripcion || null,
    alert: f.alerta || null,
    weeks: f.semanas.map((s): DraftWeek => {
      let start: string;
      let end: string;
      const range = s.fechas ? parseFechas(s.fechas, after) : null;
      if (range) {
        ({ start, end } = range);
      } else {
        if (s.fechas) warnings.push(`Semana ${s.num}: no entendí las fechas “${s.fechas}”; las calculé desde el inicio.`);
        start = addDaysISO(data.inicio, (s.num - 1) * 7);
        end = addDaysISO(start, 6);
      }
      after = start;

      const week = { key: draftKey(), num: s.num, start, end, title: s.titulo || `Semana ${s.num}`, subject: guessSubject(s.titulo), days: [] as DraftWeek["days"] };
      week.days = s.dias.map((d) => {
        const { date, inRange } = dayDate(week, d.dia);
        if (!inRange) warnings.push(`Semana ${s.num}: ${d.dia} no cae entre las fechas de la semana; lo puse el ${date}.`);
        return { key: draftKey(), weekday: d.dia, date, content: d.contenido, mode: d.modo };
      });
      return week;
    }),
  }));

  return { ok: true, draft: { title: data.titulo, start: data.inicio, phases }, warnings };
}
