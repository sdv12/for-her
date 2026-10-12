import type { ExamQuestion } from "@/lib/data/types";
import type { DocBlock } from "@/lib/docx/blocks";
import { fold } from "@/lib/plan-import/dates";
import { niceCase, stripLeadingSymbols } from "@/lib/text";

/** Texto comparable: sin acentos, mayúsculas, signos ni espacios de más. "¿Qué es el GC?" = "que es el gc". */
export function normalizeQuestion(text: string): string {
  return fold(text)
    .replace(/[¿?¡!.,;:()"'“”«»\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const PRIORITY_LABEL: Record<1 | 2 | 3, string> = { 1: "Alta", 2: "Media", 3: "Baja" };

/** "1", "alta", "🔴", "🔴 ALTA" → 1 · "3", "baja", "🟢" → 3 · el resto (o vacío) → 2 (media). */
export function parsePriority(value: unknown): 1 | 2 | 3 {
  const raw = String(value ?? "");
  if (raw.includes("🔴")) return 1;
  if (raw.includes("🟢")) return 3;
  if (raw.includes("🟡")) return 2;
  const v = fold(raw);
  if (["1", "alta", "a", "high", "critica"].includes(v)) return 1;
  if (["3", "baja", "b", "low"].includes(v)) return 3;
  return 2;
}

/** Más veces tomada primero; a igualdad, mayor prioridad; después las más nuevas. */
export function sortQuestions<T extends Pick<ExamQuestion, "times_asked" | "priority" | "created_at">>(qs: T[]): T[] {
  return [...qs].sort((a, b) => b.times_asked - a.times_asked || a.priority - b.priority || b.created_at.localeCompare(a.created_at));
}

/** CSV mínimo (RFC 4180): comillas dobles, comillas escapadas y saltos de línea dentro de comillas. */
export function parseCsv(text: string, delimiter: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"' && field === "") quoted = true;
    else if (c === delimiter) {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((f) => f.trim() !== ""));
}

export type BankRow = { text: string; subject: string; priority: 1 | 2 | 3; source: string | null };
export type BankParse = { ok: true; rows: BankRow[]; skipped: string[] } | { ok: false; error: string };

const COLUMNS = {
  question: ["question", "pregunta", "text", "texto"],
  subject: ["subject", "materia"],
  priority: ["priority", "prioridad"],
  source: ["source", "fuente", "origen"],
};

function pick(record: Record<string, unknown>, keys: string[]): unknown {
  for (const [k, v] of Object.entries(record)) if (keys.includes(fold(k))) return v;
  return undefined;
}

function toRows(records: Array<Record<string, unknown>>): BankParse {
  const rows: BankRow[] = [];
  const skipped: string[] = [];
  records.forEach((r, i) => {
    const text = String(pick(r, COLUMNS.question) ?? "").trim();
    const subject = String(pick(r, COLUMNS.subject) ?? "").trim();
    if (!text) return skipped.push(`Fila ${i + 1}: sin pregunta.`);
    if (!subject) return skipped.push(`Fila ${i + 1}: sin materia (“${text.slice(0, 40)}…”).`);
    const source = String(pick(r, COLUMNS.source) ?? "").trim();
    rows.push({ text, subject, priority: parsePriority(pick(r, COLUMNS.priority)), source: source || null });
  });
  if (rows.length === 0) return { ok: false, error: "No encontré preguntas con su materia. Revisá las columnas: question (o pregunta) y subject (o materia)." };
  return { ok: true, rows, skipped };
}

/** Banco en JSON (array de objetos) o CSV con encabezado (coma o punto y coma). */
export function parseBank(input: string): BankParse {
  const text = input.replace(/^﻿/, "").trim();
  if (!text) return { ok: false, error: "El archivo está vacío." };

  if (text.startsWith("[") || text.startsWith("{")) {
    try {
      const data: unknown = JSON.parse(text);
      const list = Array.isArray(data) ? data : (data as { preguntas?: unknown; questions?: unknown }).preguntas ?? (data as { questions?: unknown }).questions;
      if (!Array.isArray(list)) return { ok: false, error: "El JSON tiene que ser una lista de preguntas." };
      return toRows(list.filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null));
    } catch {
      return { ok: false, error: "No es un JSON válido." };
    }
  }

  const firstLine = text.split(/\r?\n/, 1)[0];
  const delimiter = (firstLine.match(/;/g)?.length ?? 0) > (firstLine.match(/,/g)?.length ?? 0) ? ";" : firstLine.includes("\t") ? "\t" : ",";
  const [header, ...body] = parseCsv(text, delimiter);
  if (!header || body.length === 0) return { ok: false, error: "El CSV necesita una fila de encabezado y al menos una pregunta." };
  return toRows(body.map((cells) => Object.fromEntries(header.map((h, i) => [h.trim(), cells[i] ?? ""]))));
}

const BASE_SECTIONS: Array<[RegExp, string]> = [
  [/^anatom[a-z]*/, "Anatomía"],
  [/^fisiolog[a-z]*/, "Fisiología"],
  [/^bioquim[a-z]*/, "Bioquímica"],
  [/^clinica( medica)?/, "Clínica"],
  [/^(salud comunitaria|epidemiolog)[a-z ]*/, "Salud comunitaria"],
];

/**
 * Sección de un banco en Word → materia + detalle para la fuente.
 * "ANATOMÍA — TÓRAX" → Anatomía · "Tórax" · "FISIOLOGÍA RENAL" → Fisiología · "Renal" ·
 * "PEDIATRÍA" → materia propia "Pediatría".
 */
export function mapBankSection(section: string): { subject: string; detail: string | null } {
  const clean = niceCase(stripLeadingSymbols(section)).replace(/\s+/g, " ").trim();
  const folded = fold(clean);
  for (const [re, subject] of BASE_SECTIONS) {
    const m = folded.match(re);
    if (!m) continue;
    const rest = clean.slice(m[0].length).replace(/^[\s—–\-:·,y]+/i, "").trim();
    const detail = subject === "Salud comunitaria" || !rest ? null : rest.charAt(0).toLocaleUpperCase("es") + rest.slice(1);
    return { subject, detail };
  }
  return { subject: clean, detail: null };
}

/** Línea que funciona como título de sección (no es una pregunta ni un metadato con números). */
function isSectionHeading(text: string): boolean {
  const t = text.trim();
  return t.length >= 3 && t.length <= 80 && !t.includes("?") && !/^\d/.test(t) && !/[=]/.test(t) && !/\d+\s+preguntas/i.test(t);
}

/**
 * Banco de preguntas en Word: secciones (título + tabla "# | Pregunta | Prioridad"), o listas
 * numeradas "1. ¿…?" debajo de un título. Si la tabla trae columna de materia, se usa esa.
 */
export function parseBankBlocks(blocks: DocBlock[]): BankParse {
  const rows: BankRow[] = [];
  const skipped: string[] = [];
  let section: string | null = null;

  const push = (text: string, sectionName: string | null, priority: unknown, subjectCell?: string, sourceCell?: string) => {
    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean) return;
    const mapped = subjectCell ? { subject: niceCase(subjectCell), detail: null } : sectionName ? mapBankSection(sectionName) : null;
    if (!mapped) return skipped.push(`Sin materia: “${clean.slice(0, 50)}…”.`);
    rows.push({
      text: clean,
      subject: mapped.subject,
      priority: parsePriority(priority),
      source: sourceCell?.trim() || (mapped.detail ? `Banco · ${mapped.detail}` : "Banco de preguntas"),
    });
  };

  for (const b of blocks) {
    if (b.type === "p") {
      const numbered = b.text.match(/^\d{1,3}[.)]\s+([\s\S]+)$/);
      if (numbered) {
        push(numbered[1], section, "");
        continue;
      }
      const week = b.text.match(/^semana\s+\d+\s*[—–:-]\s*(.+)$/i);
      if (week) section = week[1];
      else if (isSectionHeading(b.text)) section = b.text;
      continue;
    }

    const header = b.rows[0].map((c) => fold(stripLeadingSymbols(c)));
    let qCol = header.findIndex((c) => /pregunta|question/.test(c));
    const hasHeader = qCol >= 0;
    const pCol = header.findIndex((c, i) => /prioridad|priority/.test(c) || /[🔴🟡🟢]/u.test(b.rows[0][i]));
    const sCol = header.findIndex((c) => /^materia|subject/.test(c));
    const fCol = header.findIndex((c) => /fuente|source|origen/.test(c));
    if (!hasHeader) {
      // Sin encabezado: la columna con más texto es la de la pregunta.
      const widths = b.rows[0].map((_, i) => b.rows.reduce((n, r) => n + (r[i]?.length ?? 0), 0));
      qCol = widths.indexOf(Math.max(...widths));
    }
    for (const r of b.rows.slice(hasHeader ? 1 : 0)) {
      const text = r[qCol] ?? "";
      if (!text.trim() || !/[a-záéíóú]/i.test(text)) continue;
      const prio = pCol >= 0 ? r[pCol] : (r.find((c) => /[🔴🟡🟢]/u.test(c)) ?? "");
      push(text, section, prio, sCol >= 0 ? r[sCol] : undefined, fCol >= 0 ? r[fCol] : undefined);
    }
  }

  if (rows.length === 0) {
    return { ok: false, error: "No encontré preguntas en el documento. Tienen que estar en tablas con una columna “Pregunta”, o numeradas (1., 2., …) debajo de un título." };
  }
  return { ok: true, rows, skipped };
}
