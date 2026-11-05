import { describe, expect, it } from "vitest";
import { integratePlan } from "./integracion";
import { buildSeed } from "./mock/seed";
import { selectActivePlan } from "./plan";

describe("cronograma integrado", () => {
  const db = buildSeed(new Date("2026-10-06T12:00:00"));
  db.exam_questions.push({ ...db.exam_questions[0], id: "q-s3", text: "¿Qué es el ciclo cardíaco?", source: "Cronograma · semana 3", priority: 1 });
  const view = selectActivePlan(db)!;
  const info = integratePlan(db, view);
  const byNum = (n: number) => [...info.values()].find((i) => i.week.num === n)!;

  it("da un eje por semana y une con puentes las semanas del mismo eje", () => {
    expect(byNum(1).eje?.id).toBe("respiratorio");
    expect(byNum(3).eje?.id).toBe("cardiovascular");
    expect(byNum(1).puentes.map((p) => [p.dir, p.week.num])).toEqual([["despues", 3]]);
    expect(byNum(3).puentes.map((p) => [p.dir, p.week.num])).toEqual([["antes", 1]]);
  });

  it("asigna las preguntas del cronograma a su semana y las del banco por tema", () => {
    expect(byNum(3).questions.map((q) => q.id)).toContain("q-s3");
    expect(byNum(1).questions.some((q) => /tráquea/i.test(q.text))).toBe(true);
  });

  it("elige una materia transversal y guarda para el sábado las de prioridad alta de hace 1 y 3 semanas", () => {
    expect(byNum(1).transversal.name).toBeTruthy();
    expect(byNum(2).spaced.every((q) => q.priority === 1)).toBe(true);
  });
});
