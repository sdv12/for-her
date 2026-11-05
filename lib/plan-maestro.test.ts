import { describe, expect, it } from "vitest";
import { integratePlan } from "./integracion";
import { importPlan } from "./mock/actions/plan-import";
import { getDB } from "./mock/store";
import { selectActivePlan } from "./plan";
import { planDraftSchema } from "./plan-import/schema";
import { buildPlanMaestro, MAESTRO_WEEKS } from "./plan-maestro";

describe("plan maestro integrado", () => {
  const draft = buildPlanMaestro("2026-11-05");
  const weeks = draft.phases.flatMap((p) => p.weeks);

  it("tiene 24 semanas en 4 fases y es un cronograma válido", () => {
    expect(weeks.map((w) => w.num)).toEqual(MAESTRO_WEEKS.map((w) => w.num));
    expect(draft.phases.map((p) => p.weeks.length)).toEqual([4, 10, 6, 4]);
    expect(() => planDraftSchema.parse(draft)).not.toThrow();
  });

  it("arranca esta semana: la semana 1 va del jueves 5 al viernes 13, con 7 días", () => {
    expect(weeks[0].start).toBe("2026-11-05");
    expect(weeks[0].days.map((d) => d.date)).toEqual(["2026-11-05", "2026-11-06", "2026-11-09", "2026-11-10", "2026-11-11", "2026-11-12", "2026-11-13"]);
    expect(weeks[0].days.at(-2)?.content).toMatch(/^Integración/);
    expect(weeks[1].start).toBe("2026-11-16");
    // Corte de fiestas: la 6 termina en diciembre y la 7 empieza el 4 de enero.
    expect(weeks[6].start).toBe("2027-01-04");
    expect(weeks[23].days.at(-1)?.date).toBe("2027-05-07");
  });

  it("cada semana tiene lunes a viernes, sin días fuera de su rango, y todos los temas troncales", () => {
    weeks.forEach((w, i) => {
      for (const d of w.days) expect(d.date >= w.start && d.date <= w.end, `S${w.num} ${d.date}`).toBe(true);
      const text = w.days.map((d) => d.content).join(" · ");
      for (const [t] of MAESTRO_WEEKS[i].temas) expect(text, `S${w.num}`).toContain(t);
      expect(w.days.at(-1)?.mode).toMatch(/recall puro|Simulación/);
    });
  });

  it("al importarlo, el cronograma integrado toma el eje del código de cada semana", () => {
    importPlan(buildPlanMaestro("2026-11-05"), { mode: "replace", createTopics: true, addQuestions: false });
    const db = getDB();
    const info = integratePlan(db, selectActivePlan(db)!);
    const eje = (n: number) => [...info.values()].find((i) => i.week.num === n)?.eje?.id;
    expect(eje(1)).toBe("diabetes");
    expect(eje(9)).toBe("renal");
    expect(eje(16)).toBe("piel");
    expect(db.syllabus_topics.some((t) => t.name === "Pie diabético")).toBe(true);
  });
});
