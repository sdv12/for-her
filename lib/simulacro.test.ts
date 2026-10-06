import { describe, expect, it } from "vitest";
import type { ExamQuestion, Simulation } from "./data/types";
import { buildSeed } from "./mock/seed";
import { buildTribunal, emptyChecks, missingText, nextSuelta, practiceOrder, STAGES } from "./simulacro";

const now = new Date("2026-10-05T12:00:00Z");

describe("missingText", () => {
  it("lista lo no tildado", () => {
    expect(missingText({ ...emptyChecks(), causa: true, consecuencia: true, diagnostico: true })).toBe("Faltó: mecanismo, conducta / tratamiento.");
  });
  it("null si cubrió todo", () => {
    expect(missingText({ causa: true, mecanismo: true, consecuencia: true, diagnostico: true, conducta: true })).toBeNull();
  });
});

const q = (id: string, times_asked: number, priority: 1 | 2 | 3, subject_id = "s"): ExamQuestion => ({
  id,
  times_asked,
  priority,
  subject_id,
  text: id,
  source: null,
  asked_on: null,
  model_answer: null,
  follow_up: null,
  created_at: "2026-10-01T00:00:00Z",
  updated_at: "2026-10-01T00:00:00Z",
});
const sim = (question_id: string, created_at: string) => ({ question_id, created_at }) as Simulation;

describe("practiceOrder / nextSuelta", () => {
  const qs = [q("a", 1, 2), q("b", 3, 2), q("c", 1, 1), q("d", 3, 1)];

  it("más tomadas y prioridad alta primero", () => {
    expect(practiceOrder(qs, [], now).map((x) => x.id)).toEqual(["d", "b", "c", "a"]);
  });

  it("lo practicado en las últimas 24 h va al final", () => {
    const sims = [sim("d", "2026-10-05T08:00:00Z"), sim("b", "2026-10-03T08:00:00Z")];
    expect(practiceOrder(qs, sims, now).map((x) => x.id)).toEqual(["b", "c", "a", "d"]);
  });

  it("no repite en la sesión y, si ya salieron todas, vuelve a empezar", () => {
    const ordered = practiceOrder(qs, [], now);
    expect(nextSuelta(ordered, ["d", "b"])?.id).toBe("c");
    expect(nextSuelta(ordered, ["a", "b", "c", "d"])?.id).toBe("d");
    expect(nextSuelta([], [])).toBeNull();
  });
});

describe("buildTribunal", () => {
  const db = buildSeed(now);

  it("5 etapas en orden, con preguntas del banco de cada materia", () => {
    const steps = buildTribunal(db.exam_questions, db.subjects, [], () => 0, now);
    expect(steps.map((s) => s.stage)).toEqual([...STAGES]);
    expect(steps[0].text).toMatch(/tráquea/);
    expect(steps[1].text).toMatch(/Krebs/);
    expect(steps[3].text).toMatch(/Insuficiencia cardíaca/);
    // La repregunta usa el follow_up de la clínica.
    expect(steps[4].text).toMatch(/IECA/);
    expect(steps.slice(0, 4).every((s) => s.questionId)).toBe(true);
  });

  it("sin preguntas de una materia usa la de respaldo", () => {
    const steps = buildTribunal([], db.subjects, [], () => 0, now);
    expect(steps[1]).toMatchObject({ questionId: null, source: "Pregunta de respaldo" });
    expect(steps[4].text).toMatch(/IECA/);
  });

  it("si la clínica no tiene follow_up, pide el mecanismo", () => {
    const clinica = db.subjects.find((s) => s.name === "Clínica")!;
    const only = [q("x", 1, 1, clinica.id)];
    const steps = buildTribunal(only, db.subjects, [], () => 0, now);
    expect(steps[4].text).toMatch(/mecanismo/);
    expect(steps[4].text).toMatch(/\(x\)/);
  });
});
