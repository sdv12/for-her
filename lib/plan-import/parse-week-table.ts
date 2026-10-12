import type { DocBlock } from "@/lib/docx/blocks";
import type { Weekday } from "@/lib/data/types";
import { niceCase, stripLeadingSymbols } from "@/lib/text";
import { addDaysISO, fold, monthOf, parseFechas, toISODate, weekdayOf } from "./dates";
import { draftKey, guessSubject, newDraftDay } from "./draft";
import type { DraftDay, DraftPhase, DraftQuestion, DraftWeek, ParseResult } from "./types";

/*
 * Cronograma "semana por fila" (p. ej. "PLAN DE REINGRESO — MEDICINA FCM-UNC"):
 *   Arranca: 13 de octubre de 2026 · 24 semanas · 1h/día · 5 días/semana
 *   Tabla resumen:  FASE 1 · Oct–Dic | …   /   Básicas clínicas 8 semanas | …
 *   Tabla principal: Sem | Fechas | FASE | Tema Principal | Subtemas Clave | Tip del Tribunal | 🔴/🟡
 *   PREGUNTAS TIPO EXAMEN — POR SEMANA:  "Semana 1 — Anatomía de Tórax"  +  "1. ¿…?"
 * No trae días: se arman de lunes a viernes repartiendo los subtemas (lunes a jueves estudio
 * con active recall, viernes simulación con las preguntas de la semana).
 */

type Columns = { sem: number; fechas: number; fase: number; tema: number; subtemas: number; tip: number; prioridad: number };

function findColumns(header: string[]): Columns | null {
  const h = header.map((c) => fold(stripLeadingSymbols(c)));
  const find = (re: RegExp) => h.findIndex((c) => re.test(c));
  const cols: Columns = {
    sem: find(/^sem/),
    fechas: find(/fecha/),
    fase: find(/^fase/),
    tema: find(/tema principal|^tema$|^tema /),
    subtemas: find(/subtema|contenido/),
    tip: find(/tip|tribunal/),
    prioridad: h.findIndex((c, i) => /prioridad/.test(c) || (/[🔴🟡🟢]/u.test(header[i]) && !/[a-z]{4}/.test(c))),
  };
  return cols.sem >= 0 && cols.fechas >= 0 && cols.tema >= 0 ? cols : null;
}

/** "13 de octubre de 2026" → "2026-10-13". */
function parseStartDate(text: string): string | null {
  const m = text.match(/arranca:?\s*(?:el\s+)?(\d{1,2})\s+de\s+([a-záéíóú]+)(?:\s+(?:de\s+)?(\d{4}))?/i);
  if (!m) return null;
  const month = monthOf(m[2]);
  const year = m[3] ?? text.match(/\b(20\d\d)\b/)?.[1];
  if (!month || !year) return null;
  return `${year}-${String(month).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

export function priorityNumber(label: string | null | undefined): 1 | 2 | 3 {
  const v = fold(label ?? "");
  if (/alta|critica|🔴/u.test(v)) return 1;
  if (/baja|🟢/u.test(v)) return 3;
  return 2;
}

/** Reparte `items` en `n` grupos lo más parejos posible, sin cambiar el orden. */
function chunk<T>(items: T[], n: number): T[][] {
  const groups = Math.min(n, items.length);
  const out: T[][] = [];
  let i = 0;
  for (let g = 0; g < groups; g++) {
    const size = Math.ceil((items.length - i) / (groups - g));
    out.push(items.slice(i, i + size));
    i += size;
  }
  return out;
}

const WEEKDAYS_5: Weekday[] = ["Lun", "Mar", "Mié", "Jue", "Vie"];

/** Lunes de la semana de `date` (si cae sábado o domingo, el lunes siguiente). */
function mondayOf(date: string): string {
  const idx = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].indexOf(weekdayOf(date));
  return idx >= 5 ? addDaysISO(date, 7 - idx) : addDaysISO(date, -idx);
}

function buildDays(week: DraftWeek, subtemas: string[], simulation: boolean): DraftDay[] {
  if (simulation) {
    const groups = chunk(subtemas.length ? subtemas : [week.title], 5).map((g) => g.join(" · "));
    while (groups.length < 5) groups.push("Simulación integradora: preguntas mixtas del banco, en voz alta");
    return groups.map((g, i) => newDraftDay(week, WEEKDAYS_5[i], g, "Simulación oral"));
  }
  const study = chunk(subtemas.length ? subtemas : [week.title], 4);
  const days = study.map((g, i) => newDraftDay(week, WEEKDAYS_5[i], g.join(" · "), "Estudio + active recall oral"));
  days.push(newDraftDay(week, "Vie", `Simulación de la semana: ${week.title} (preguntas tipo examen en voz alta)`, "Simulación oral"));
  return days;
}

/** Tema para el Temario: lo que está antes de ":" si es corto ("Arterias coronarias: territorios" → "Arterias coronarias"). */
function topicName(subtema: string): string {
  const head = subtema.split(":")[0].trim();
  const name = head.length >= 3 && head.length <= 50 ? head : subtema;
  return name.length > 80 ? `${name.slice(0, 77)}…` : name;
}

/** Devuelve null si el documento no tiene una tabla "semana por fila". */
export function parseWeekTablePlan(blocks: DocBlock[]): ParseResult | null {
  const table = blocks.find((b): b is Extract<DocBlock, { type: "table" }> => b.type === "table" && findColumns(b.rows[0]) !== null);
  if (!table) return null;
  const cols = findColumns(table.rows[0])!;
  const cell = (row: string[], i: number) => (i >= 0 ? (row[i] ?? "").trim() : "");

  const paragraphs = blocks.filter((b): b is Extract<DocBlock, { type: "p" }> => b.type === "p").map((b) => b.text);
  const fullText = paragraphs.join("\n");
  const warnings: string[] = [];
  const declaredStart = parseStartDate(fullText);
  const baseYear = fullText.match(/\b(20\d\d)\b/)?.[1] ?? String(new Date().getFullYear());
  let after = declaredStart ?? `${baseYear}-01-01`;

  // Resumen de fases: columnas "FASE 1 · Oct–Dic" con "Básicas clínicas 8 semanas" debajo.
  const summary = blocks.find(
    (b): b is Extract<DocBlock, { type: "table" }> => b.type === "table" && b.rows[0].length > 0 && b.rows[0].every((c) => /^fase\s*\w+/i.test(c)),
  );
  const phaseInfo = (summary?.rows[0] ?? []).map((head, i) => {
    const [, code = String(i + 1), period = ""] = head.match(/^fase\s*([\w+]+)\s*[·:—–-]?\s*(.*)$/i) ?? [];
    const detail = (summary?.rows[1]?.[i] ?? "").split("\n").map((s) => s.trim()).filter(Boolean);
    return { code, description: [period, ...detail].filter(Boolean).join(" · ") || null };
  });

  const phases: DraftPhase[] = [];
  const shifted: number[] = [];
  const phaseByName = new Map<string, DraftPhase>();
  const weekPriority = new Map<number, string>();

  for (const row of table.rows.slice(1)) {
    const num = Number.parseInt(cell(row, cols.sem), 10);
    if (!Number.isFinite(num)) continue;

    const phaseName = niceCase(stripLeadingSymbols(cell(row, cols.fase))) || "Plan";
    let phase = phaseByName.get(fold(phaseName));
    if (!phase) {
      const info = phaseInfo[phases.length];
      phase = { key: draftKey(), num: phases.length + 1, code: info?.code ?? String(phases.length + 1), name: phaseName, description: info?.description ?? null, alert: null, weeks: [] };
      phases.push(phase);
      phaseByName.set(fold(phaseName), phase);
    }

    const fechas = cell(row, cols.fechas);
    const range = parseFechas(fechas, after);
    let start: string;
    let end: string;
    if (range) {
      ({ start, end } = range);
    } else {
      const prev = phases.flatMap((p) => p.weeks).at(-1);
      start = prev ? addDaysISO(prev.start, 7) : (declaredStart ?? toISODate(new Date()));
      end = addDaysISO(start, 4);
      warnings.push(`Semana ${num}: no entendí las fechas “${fechas}”; la puse a continuación de la anterior.`);
    }
    after = start;
    // Semanas de lunes a viernes (5 días/semana): si el documento las corre (p. ej. martes a sábado),
    // se alinean al lunes de esa semana. La semana cubre hasta el domingo para que no queden huecos.
    const monday = mondayOf(start);
    if (monday !== start) shifted.push(num);
    start = monday;
    end = addDaysISO(monday, 6);

    const title = cell(row, cols.tema) || `Semana ${num}`;
    const subtemas = cell(row, cols.subtemas)
      .split(/\s*·\s*|\n|;\s+/)
      .map((s) => stripLeadingSymbols(s))
      .filter(Boolean);
    const tip = cell(row, cols.tip) || null;
    const priorityRaw = stripLeadingSymbols(cell(row, cols.prioridad));
    const priority = priorityRaw ? niceCase(priorityRaw).replace(/^./, (c) => c.toUpperCase()) : null;
    if (priority) weekPriority.set(num, priority);

    // Semanas que son solo simulación ("SIMULACIONES I — …"): todos los días son de práctica oral.
    const simulation = /^simulaci/i.test(title);
    const week: DraftWeek = {
      key: draftKey(),
      num,
      start,
      end,
      title,
      subject: guessSubject(title),
      days: [],
      tip,
      priority,
      topics: simulation ? [] : subtemas.map(topicName),
    };
    week.days = buildDays(week, subtemas, simulation);
    phase.weeks.push(week);
  }

  const weeks = phases.flatMap((p) => p.weeks);
  if (weeks.length === 0) return { ok: false, error: "Encontré la tabla del cronograma pero ninguna semana con número." };

  // Preguntas por semana: "Semana 3 — Tema" seguido de "1. ¿…?".
  const questions: DraftQuestion[] = [];
  let currentWeek: number | null = null;
  for (const text of paragraphs) {
    const head = text.match(/^semana\s+(\d+)\s*[—–:-]/i);
    if (head) {
      currentWeek = Number(head[1]);
      continue;
    }
    const q = text.match(/^\d{1,3}[.)]\s+([\s\S]+)$/);
    // Los recordatorios no son preguntas para practicar.
    if (q && currentWeek !== null && !/^recordatorio\b/i.test(q[1])) {
      questions.push({ key: draftKey(), weekNum: currentWeek, text: q[1].replace(/\s+/g, " ").trim(), priority: priorityNumber(weekPriority.get(currentWeek)) });
    }
  }

  if (shifted.length) {
    const first = table.rows.slice(1).find((r) => Number.parseInt(cell(r, cols.sem), 10) === shifted[0]);
    warnings.push(
      `Las fechas del documento no empiezan en lunes (por ejemplo “${cell(first ?? [], cols.fechas)}”). ` +
        `Acomodé ${shifted.length === weeks.length ? "todas las semanas" : `${shifted.length} semanas`} de lunes a viernes.`,
    );
  }

  return {
    ok: true,
    draft: {
      title: niceCase(paragraphs[0] ?? "Cronograma").slice(0, 80),
      start: weeks[0].start,
      phases,
      questions,
    },
    warnings,
  };
}
