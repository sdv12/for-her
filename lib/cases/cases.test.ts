import { describe, expect, it } from "vitest";
import { ageBand, coverage, dxStars, managementStars, patientLabel, rankFor, scoreCase, studiesStars } from "./engine";
import { CASES, getCase } from "./index";

describe("contenido de los casos", () => {
  it("ids únicos", () => {
    const ids = CASES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  for (const c of CASES) {
    describe(c.id, () => {
      it("un solo diagnóstico correcto", () => {
        expect(c.diagnosis.options.filter((o) => o.correct)).toHaveLength(1);
      });
      it("ids de opciones únicos por etapa", () => {
        for (const list of [c.anamnesis, c.exam, c.studies, c.diagnosis.options, c.management.options]) {
          const ids = list.map((o) => o.id);
          expect(new Set(ids).size).toBe(ids.length);
        }
      });
      it("tiene acciones clave y alguna opción para descartar", () => {
        // Los estudios pueden no tener ninguno clave: hay diagnósticos clínicos (cistitis, diarrea) donde lo correcto es no pedir.
        for (const list of [c.anamnesis, c.exam, c.management.options]) {
          expect(list.some((o) => o.relevance === "clave")).toBe(true);
        }
        expect(c.studies.some((s) => s.relevance === "innecesario" || s.relevance === "riesgoso")).toBe(true);
        expect(c.management.options.some((o) => o.relevance === "innecesario" || o.relevance === "riesgoso")).toBe(true);
      });
      it("resolución completa", () => {
        const d = c.debrief;
        expect(d.pathologies.filter((p) => p.role === "principal").length).toBeGreaterThanOrEqual(1);
        expect(d.reasoning.length).toBeGreaterThanOrEqual(3);
        expect(d.management.length).toBeGreaterThanOrEqual(3);
        expect(d.sources.length).toBeGreaterThanOrEqual(1);
        expect(d.pearls.length).toBeGreaterThanOrEqual(2);
        expect(d.epidemiology.length).toBeGreaterThan(80);
      });
    });
  }
});

describe("puntaje", () => {
  const c = getCase("bronquiolitis-lactante")!;
  const keyStudies = c.studies.filter((s) => s.relevance === "clave").map((s) => s.id);
  const keyMgmt = c.management.options.filter((o) => o.relevance === "clave").map((o) => o.id);

  it("diagnóstico por intentos", () => {
    expect([1, 2, 3, 5].map(dxStars)).toEqual([3, 2, 1, 1]);
  });

  it("estudios: 3 si pediste lo clave sin nada de más", () => {
    expect(studiesStars(c, keyStudies)).toBe(3);
    expect(studiesStars(c, [...keyStudies, "util-que-no-existe", "viral"])).toBe(3);
    expect(studiesStars(c, [...keyStudies, "rx"])).toBe(2);
    expect(studiesStars(c, [])).toBe(2); // falta 1 clave (oximetría), nada de más
    expect(studiesStars(c, ["rx", "hemograma", "gases"])).toBe(1);
  });

  it("conducta: lo riesgoso baja a 1; falta de una clave baja a 2", () => {
    expect(managementStars(c.management.options, keyMgmt)).toBe(3);
    expect(managementStars(c.management.options, keyMgmt.slice(1))).toBe(2);
    expect(managementStars(c.management.options, [...keyMgmt, "antitusivos"])).toBe(1);
  });

  it("puntaje total y experiencia según el nivel", () => {
    const s = scoreCase(c, { dxAttempts: 1, studies: keyStudies, management: keyMgmt });
    expect(s).toMatchObject({ dx: 3, studies: 3, management: 3, total: 9, xp: 90 });
    const hard = getCase("guillain-barre")!;
    expect(scoreCase(hard, { dxAttempts: 1, studies: [], management: [] }).xp).toBeGreaterThan(0);
  });

  it("cobertura del interrogatorio clave", () => {
    const keys = c.anamnesis.filter((a) => a.relevance === "clave").map((a) => a.id);
    expect(coverage(c.anamnesis, keys.slice(0, 2))).toEqual({ hit: 2, of: keys.length });
  });
});

describe("rangos y etiquetas", () => {
  it("rango por experiencia", () => {
    expect(rankFor(0).title).toBe("Estudiante");
    expect(rankFor(150).title).toBe("PFO");
    expect(rankFor(10_000).next).toBeNull();
    expect(rankFor(300).progress).toBeCloseTo(0.5);
  });

  it("paciente y franja etaria", () => {
    expect(patientLabel({ age: 7, ageUnit: "meses", sex: "M" })).toBe("Lactante varón de 7 meses");
    expect(patientLabel({ age: 1, ageUnit: "años", sex: "F" })).toBe("Lactante mujer de 1 año");
    expect(patientLabel({ age: 6, ageUnit: "años", sex: "M" })).toBe("Niño de 6 años");
    expect(patientLabel({ age: 24, ageUnit: "años", sex: "F" })).toBe("Mujer de 24 años");
    expect(ageBand({ age: 78, ageUnit: "años", sex: "F" })).toBe("Adultez mayor");
    expect(ageBand({ age: 15, ageUnit: "años", sex: "F" })).toBe("Adolescencia");
  });
});
