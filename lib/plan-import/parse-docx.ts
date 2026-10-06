import { addDaysISO, fold, normalizeWeekday, parseFechas } from "./dates";
import { dayDate, draftKey, guessSubject } from "./draft";
import type { DraftPhase, DraftWeek, ParseResult } from "./types";

/*
 * Parser heurístico del texto de un .docx (lo extrae mammoth en el server).
 * Reconoce:
 *   FASE 2a — NOMBRE           (después: Período / Objetivo / Materias, cada uno con su valor en la línea siguiente)
 *   SEMANA 3 · 27 Abril – 3 Mayo — Título
 *   Tablas Día / Contenido / Modo  → líneas "Lunes", "<contenido>", "<modo>"
 *   Líneas sueltas "Lun — contenido · modo" o "Mar: contenido"
 * Todo lo que no entiende lo informa como advertencia; la vista previa permite corregirlo.
 */

const PHASE_RE = /^fase\s+([0-9]+[a-z]?(?:\s*\+\s*[0-9]+[a-z]?)*)\s*[—–:·-]\s*(.+)$/i;
const WEEK_RE = /^semana\s+(\d+)\b\s*(.*)$/i;
const INLINE_DAY_RE =
  /^(lunes|martes|mi[eé]rcoles|jueves|viernes|s[aá]bado|domingo|lun|mar|mi[eé]|jue|vie|s[aá]b|dom)\.?\s*[:—–-]\s*(.+)$/i;
const TABLE_HEADERS = new Set(["dia", "contenido", "modo de estudio", "modo"]);
const PHASE_KEYS = new Set(["periodo", "objetivo", "materias"]);

/** "CIMIENTOS CARDIOVASCULARES" → "Cimientos cardiovasculares"; si ya tiene minúsculas, lo deja. */
function niceCase(s: string): string {
  if (/[a-záéíóúñ]/.test(s)) return s;
  const lower = s.toLocaleLowerCase("es");
  return lower.charAt(0).toLocaleUpperCase("es") + lower.slice(1);
}

function splitMode(text: string): { content: string; mode: string } {
  const parts = text.split(/\s+[·|]\s+/);
  if (parts.length < 2) return { content: text.trim(), mode: "" };
  return { content: parts.slice(0, -1).join(" · ").trim(), mode: parts[parts.length - 1].trim() };
}

export function parsePlanText(text: string): ParseResult {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const warnings: string[] = [];
  const baseYear = text.match(/\b(20\d\d)\b/)?.[1] ?? String(new Date().getFullYear());
  let after = `${baseYear}-01-01`;

  const phases: DraftPhase[] = [];
  let phase: DraftPhase | null = null;
  let week: DraftWeek | null = null;
  let phaseKey: string | null = null;
  let day: { weekday: NonNullable<ReturnType<typeof normalizeWeekday>>; parts: string[] } | null = null;
  let ignored = 0;

  const pushDay = (weekday: NonNullable<typeof day>["weekday"], content: string, mode: string) => {
    if (!week) return;
    const { date, inRange } = dayDate(week, weekday);
    if (!inRange) warnings.push(`Semana ${week.num}: ${weekday} no cae entre las fechas de la semana; lo puse el ${date}.`);
    week.days.push({ key: draftKey(), weekday, date, content, mode: mode === "—" || mode === "-" ? "" : mode });
  };

  const flushDay = () => {
    if (day && day.parts.length > 0) pushDay(day.weekday, day.parts[0], day.parts[1] ?? "");
    else if (day && week) warnings.push(`Semana ${week.num}: ${day.weekday} no tiene contenido.`);
    day = null;
  };

  const ensurePhase = (): DraftPhase => {
    if (!phase) {
      phase = { key: draftKey(), num: phases.length + 1, code: String(phases.length + 1), name: `Fase ${phases.length + 1}`, description: null, alert: null, weeks: [] };
      phases.push(phase);
    }
    return phase;
  };

  for (const line of lines) {
    const ph = line.match(PHASE_RE);
    if (ph) {
      flushDay();
      phase = { key: draftKey(), num: phases.length + 1, code: ph[1].replace(/\s+/g, ""), name: niceCase(ph[2].trim()), description: null, alert: null, weeks: [] };
      phases.push(phase);
      week = null;
      phaseKey = null;
      continue;
    }

    const wk = line.match(WEEK_RE);
    if (wk) {
      flushDay();
      const current = ensurePhase();
      const num = Number(wk[1]);
      const rest = wk[2].replace(/^[\s·:—–-]+/, "");
      const range = parseFechas(rest, after);
      const prev = phases.flatMap((p) => p.weeks).at(-1);
      let start: string;
      let end: string;
      if (range) {
        ({ start, end } = range);
      } else {
        start = prev ? addDaysISO(prev.start, 7) : after;
        end = addDaysISO(start, 6);
        warnings.push(`Semana ${num}: no encontré sus fechas; la puse a continuación de la anterior.`);
      }
      after = start;
      const title = (range ? range.rest : rest).replace(/^[\s·:—–-]+/, "").trim() || `Semana ${num}`;
      week = { key: draftKey(), num, start, end, title, subject: guessSubject(`${title} ${current.name}`), days: [] };
      current.weeks.push(week);
      continue;
    }

    // Bloque de datos de la fase (antes de su primera semana).
    if (phase && !week) {
      const key = fold(line);
      if (PHASE_KEYS.has(key)) {
        phaseKey = key;
      } else if (phaseKey) {
        if (phaseKey === "objetivo") phase.description = line;
        phaseKey = null;
      }
      continue;
    }

    if (!week) continue;
    if (TABLE_HEADERS.has(fold(line))) continue;

    const wd = normalizeWeekday(line);
    if (wd) {
      flushDay();
      day = { weekday: wd, parts: [] };
      continue;
    }

    const inline = line.match(INLINE_DAY_RE);
    if (inline) {
      flushDay();
      const label = normalizeWeekday(inline[1]);
      if (label) {
        const { content, mode } = splitMode(inline[2]);
        pushDay(label, content, mode);
        continue;
      }
    }

    if (day) {
      day.parts.push(line);
      if (day.parts.length === 2) flushDay();
      continue;
    }
    ignored += 1;
  }
  flushDay();

  const weeks = phases.flatMap((p) => p.weeks);
  if (weeks.length === 0) {
    return {
      ok: false,
      error: "No encontré semanas en el documento.",
      issues: ["Cada semana tiene que empezar con una línea “Semana N”, idealmente con sus fechas (“Semana 1 · 1–7 Oct — Título”)."],
    };
  }
  for (const w of weeks) if (w.days.length === 0) warnings.push(`Semana ${w.num}: no encontré días.`);
  if (ignored > 0) warnings.push(
      ignored === 1
        ? "Ignoré 1 línea suelta que no parecía parte de un día."
        : `Ignoré ${ignored} líneas sueltas que no parecían parte de un día.`,
    );

  const firstLine = niceCase(lines[0] ?? "Cronograma");
  return {
    ok: true,
    draft: { title: firstLine.length <= 60 ? firstLine : "Cronograma", start: weeks[0].start, phases: phases.filter((p) => p.weeks.length > 0) },
    warnings,
  };
}
