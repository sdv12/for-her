import { describe, expect, it } from "vitest";
import { buildSeed } from "./mock/seed";
import { selectToday, startHref } from "./today";

describe("startHref", () => {
  it("simulación → simulacro", () => {
    expect(startHref("Simulación oral", "t1")).toBe("/simulacro?modo=suelta");
  });
  it("recall → repaso de tarjetas", () => {
    expect(startHref("Estudio + recall oral", "t1")).toBe("/tarjetas/repasar");
    expect(startHref("Active recall puro", null)).toBe("/tarjetas/repasar");
  });
  it("el resto → foco con la tarea", () => {
    expect(startHref("Estudio + esquema", "t1")).toBe("/foco?tarea=t1");
    expect(startHref("", null)).toBe("/foco");
  });
});

describe("selectToday (seed)", () => {
  const seedNow = new Date(2026, 9, 5, 10); // lun 5 oct 2026
  const db = buildSeed(seedNow);

  it("encuentra el día del plan de hoy y su semana", () => {
    const v = selectToday(db, seedNow);
    expect(v.day?.content).toMatch(/^Tráquea/);
    expect(v.week?.num).toBe(1);
    expect(v.phase?.num).toBe(1);
    expect(v.dayTask?.status).toBe("pend");
    expect(v.weekDays.filter((d) => d.done_at)).toHaveLength(2);
    expect(v.isWeekend).toBe(false);
  });

  it("fin de semana sin día del plan → muestra el próximo", () => {
    const v = selectToday(db, new Date(2026, 9, 3, 10)); // sáb 3 oct
    expect(v.day).toBeNull();
    expect(v.isWeekend).toBe(true);
    expect(v.nextDay?.date).toBe("2026-10-05");
  });

  it("suma los minutos registrados hoy", () => {
    expect(selectToday(db, new Date(2026, 9, 1, 20)).minutesToday).toBe(60);
  });

  it("progreso al examen desde el inicio del plan", () => {
    const withExam = { ...db, profile: { ...db.profile, exam_date: "2026-10-11" } };
    const v = selectToday(withExam, seedNow); // inicio 1 oct, examen 11 oct, hoy 5 oct
    expect(v.exam.days).toBe(6);
    expect(v.exam.progress).toBeCloseTo(0.4);
  });
});
