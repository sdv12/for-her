import { describe, expect, it } from "vitest";
import { mapBankSection, normalizeQuestion, parseBank, parseBankBlocks, parseCsv, parsePriority, sortQuestions } from "./questions";
import type { DocBlock } from "./docx/blocks";

describe("normalizeQuestion", () => {
  it("ignora mayúsculas, acentos, signos y espacios", () => {
    expect(normalizeQuestion("¿Qué es el Gasto Cardíaco?")).toBe(normalizeQuestion("que es el gasto  cardiaco"));
    expect(normalizeQuestion("Incidencia vs. prevalencia")).toBe("incidencia vs prevalencia");
  });
});

describe("parsePriority", () => {
  it("números y palabras", () => {
    expect(parsePriority("1")).toBe(1);
    expect(parsePriority("Alta")).toBe(1);
    expect(parsePriority(3)).toBe(3);
    expect(parsePriority("baja")).toBe(3);
    expect(parsePriority("")).toBe(2);
    expect(parsePriority(undefined)).toBe(2);
  });
});

describe("parseCsv", () => {
  it("comillas, comas adentro y saltos de línea", () => {
    expect(parseCsv('a,b\n"hola, che","dijo ""sí""\notra línea"\n', ",")).toEqual([
      ["a", "b"],
      ["hola, che", 'dijo "sí"\notra línea'],
    ]);
  });
});

describe("parseBank", () => {
  it("CSV con punto y coma (Excel) y encabezados en español", () => {
    const r = parseBank("﻿pregunta;materia;prioridad;fuente\n¿Qué es el ciclo de Krebs?;Bioquímica;alta;\nCiclo cardíaco;Fisiología;2;Cátedra\n");
    expect(r).toEqual({
      ok: true,
      skipped: [],
      rows: [
        { text: "¿Qué es el ciclo de Krebs?", subject: "Bioquímica", priority: 1, source: null },
        { text: "Ciclo cardíaco", subject: "Fisiología", priority: 2, source: "Cátedra" },
      ],
    });
  });

  it("CSV con coma y encabezados en inglés; saltea filas incompletas", () => {
    const r = parseBank('question,subject,priority,source\n"Tasas: incidencia, prevalencia",Salud comunitaria,1,Grupo\nSin materia,,1,\n');
    expect(r.ok && r.rows).toHaveLength(1);
    expect(r.ok && r.skipped[0]).toMatch(/sin materia/);
  });

  it("JSON lista u objeto con preguntas", () => {
    expect(parseBank('[{"question":"IC","subject":"Clínica","priority":1}]').ok).toBe(true);
    const r = parseBank('{"preguntas":[{"pregunta":"SCA","materia":"Clínica"}]}');
    expect(r.ok && r.rows[0]).toMatchObject({ text: "SCA", subject: "Clínica", priority: 2 });
  });

  it("errores claros", () => {
    expect(parseBank("")).toMatchObject({ ok: false });
    expect(parseBank("{roto")).toMatchObject({ ok: false, error: "No es un JSON válido." });
    expect(parseBank("solo,encabezado")).toMatchObject({ ok: false });
  });
});

describe("sortQuestions", () => {
  it("veces tomada, después prioridad", () => {
    const q = (id: string, times_asked: number, priority: 1 | 2 | 3) => ({ id, times_asked, priority, created_at: "2026-10-01" });
    expect(sortQuestions([q("a", 1, 1), q("b", 3, 2), q("c", 1, 2), q("d", 2, 3)]).map((x) => x.id)).toEqual(["b", "d", "a", "c"]);
  });
});


describe("mapBankSection", () => {
  it("secciones de materias base van a esa materia con su detalle", () => {
    expect(mapBankSection("ANATOMÍA — TÓRAX")).toEqual({ subject: "Anatomía", detail: "Tórax" });
    expect(mapBankSection("FISIOLOGÍA RENAL")).toEqual({ subject: "Fisiología", detail: "Renal" });
    expect(mapBankSection("CLÍNICA — RENAL Y ÁCIDO-BASE")).toEqual({ subject: "Clínica", detail: "Renal y ácido-base" });
    expect(mapBankSection("BIOQUÍMICA")).toEqual({ subject: "Bioquímica", detail: null });
    expect(mapBankSection("SALUD COMUNITARIA Y EPIDEMIOLOGÍA")).toEqual({ subject: "Salud comunitaria", detail: null });
  });
  it("el resto es una materia propia", () => {
    expect(mapBankSection("PEDIATRÍA")).toEqual({ subject: "Pediatría", detail: null });
    expect(mapBankSection("DERMATOLOGÍA, ORL, OFTALMOLOGÍA Y UROLOGÍA").subject).toBe("Dermatología, ORL, oftalmología y urología");
  });
});

describe("parseBankBlocks (Word)", () => {
  const blocks: DocBlock[] = [
    { type: "p", text: "BANCO DE PREGUNTAS — EXAMEN ORAL MEDICINA" },
    { type: "p", text: "450 preguntas · 26 materias · Active Recall" },
    { type: "p", text: "🔴 = casi seguro en el examen   🟡 = probable" },
    { type: "p", text: "ANATOMÍA — TÓRAX" },
    { type: "table", rows: [["#", "PREGUNTA", "PRIORIDAD"], ["1", "¿Dónde termina la tráquea?", "🔴"], ["2", "¿Qué es la língula?", "🟢"]] },
    { type: "p", text: "PEDIATRÍA" },
    { type: "table", rows: [["#", "PREGUNTA", "PRIORIDAD"], ["1", "¿Cuándo se coloca la BCG?", "🟡"]] },
    { type: "p", text: "Semana 3 — Fisiología Renal" },
    { type: "p", text: "1. ¿Qué es la FENa?" },
  ];
  const r = parseBankBlocks(blocks);

  it("lee tablas por sección, prioridad por emoji y listas numeradas", () => {
    expect(r.ok && r.rows).toEqual([
      { text: "¿Dónde termina la tráquea?", subject: "Anatomía", priority: 1, source: "Banco · Tórax" },
      { text: "¿Qué es la língula?", subject: "Anatomía", priority: 3, source: "Banco · Tórax" },
      { text: "¿Cuándo se coloca la BCG?", subject: "Pediatría", priority: 2, source: "Banco de preguntas" },
      { text: "¿Qué es la FENa?", subject: "Fisiología", priority: 2, source: "Banco · Renal" },
    ]);
  });

  it("sin preguntas: error claro", () => {
    expect(parseBankBlocks([{ type: "p", text: "Hola" }]).ok).toBe(false);
  });
});
