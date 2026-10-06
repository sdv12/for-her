import type { ExamQuestion } from "@/lib/data/types";
import { fold } from "@/lib/plan-import/dates";

/** Texto comparable: sin acentos, mayúsculas, signos ni espacios de más. "¿Qué es el GC?" = "que es el gc". */
export function normalizeQuestion(text: string): string {
  return fold(text)
    .replace(/[¿?¡!.,;:()"'“”«»\-–—]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export const PRIORITY_LABEL: Record<1 | 2 | 3, string> = { 1: "Alta", 2: "Media", 3: "Baja" };

/** "1", "alta", "Alta ", "A" → 1. Sin dato o desconocido → 2 (media). */
export function parsePriority(value: unknown): 1 | 2 | 3 {
  const v = fold(String(value ?? ""));
  if (["1", "alta", "a", "high"].includes(v)) return 1;
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
