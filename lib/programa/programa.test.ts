import { describe, expect, it } from "vitest";
import { CASES } from "@/lib/cases";
import { topicName } from "@/lib/data/schemas";
import { EJES } from "./ejes";
import { casesForEje, casesForMateria, ejesForCase, ejesForText, materiasForCase } from "./match";
import { MATERIAS, getMateria } from "./materias";
import { RUTA, FASES, routePosition, routeProgress, sessionKey, sessionsFor, dateOf } from "./ruta";

describe("materias", () => {
  it("son 14, con ids únicos, año y unidades válidas para el Temario", () => {
    expect(MATERIAS).toHaveLength(14);
    expect(new Set(MATERIAS.map((m) => m.id)).size).toBe(14);
    for (const m of MATERIAS) {
      expect(m.year).toBeGreaterThanOrEqual(1);
      expect(m.year).toBeLessThanOrEqual(5);
      expect(m.unidades.length, m.id).toBeGreaterThanOrEqual(5);
      expect(m.name.length).toBeLessThanOrEqual(60);
      for (const u of m.unidades) expect(() => topicName.parse(u.name), u.name).not.toThrow();
      expect(new Set(m.unidades.map((u) => u.name)).size, m.id).toBe(m.unidades.length);
    }
  });

  it("cada materia específica tiene casos para practicar", () => {
    for (const m of MATERIAS) expect(casesForMateria(m).length, m.id).toBeGreaterThanOrEqual(5);
  });
});

describe("ejes", () => {
  it("son 10 ejes y 10 complementarios, con filas de materias que existen", () => {
    expect(EJES.filter((e) => e.kind === "eje")).toHaveLength(10);
    expect(EJES.filter((e) => e.kind === "complementario")).toHaveLength(10);
    expect(new Set(EJES.map((e) => e.id)).size).toBe(EJES.length);
    for (const e of EJES) {
      expect(e.filas.length, e.id).toBeGreaterThanOrEqual(3);
      for (const f of e.filas) expect(getMateria(f.materia), `${e.id} → ${f.materia}`).toBeDefined();
      expect(e.patologias.length, e.id).toBeGreaterThanOrEqual(4);
    }
  });

  it("cada eje tiene casos y todo caso cae en algún eje", () => {
    for (const e of EJES) expect(casesForEje(e).length, e.id).toBeGreaterThanOrEqual(5);
    const sueltos = CASES.filter((c) => ejesForCase(c).length === 0).map((c) => c.id);
    expect(sueltos).toEqual([]);
  });

  it("casi todo caso exige al menos una materia específica (el resto es de Clínica Médica o Neurología)", () => {
    const sueltos = CASES.filter((c) => materiasForCase(c).length === 0).map((c) => c.id);
    expect(sueltos.length, sueltos.join(", ")).toBeLessThanOrEqual(Math.ceil(CASES.length * 0.05));
  });
});

describe("ejes en texto libre (cronograma importado)", () => {
  it("reconoce los ejes de una semana del cronograma", () => {
    const ids = ejesForText("Anatomía del tórax: tráquea, bronquios, anatomía cardíaca, irrigación coronaria, pulmones y mediastino").map((e) => e.id);
    expect(ids).toContain("respiratorio");
    expect(ids).toContain("cardiovascular");
    expect(ejesForText("Ciclo de Krebs")).toEqual([]);
  });
});

describe("ruta de 12 semanas", () => {
  it("tiene 12 semanas en 4 fases, con 7 sesiones cada una y ejes válidos", () => {
    expect(RUTA.map((w) => w.num)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    expect(FASES.map((f) => f.num)).toEqual([1, 2, 3, 4]);
    for (const w of RUTA) {
      for (const id of w.ejes) expect(EJES.some((e) => e.id === id), `${w.num} → ${id}`).toBe(true);
      const s = sessionsFor(w);
      expect(s, `semana ${w.num}`).toHaveLength(7);
      for (const x of s) expect(x.morning.length * x.night.length).toBeGreaterThan(0);
    }
    // Los diez ejes aparecen en alguna semana.
    const vistos = new Set(RUTA.flatMap((w) => w.ejes));
    for (const e of EJES.filter((x) => x.kind === "eje")) expect(vistos.has(e.id), e.id).toBe(true);
  });

  it("ubica el día de hoy en la ruta desde el lunes de inicio", () => {
    expect(routePosition("2026-11-04", "2026-11-02")).toEqual({ status: "en-curso", week: 1, day: 0 });
    expect(routePosition("2026-11-02", "2026-11-10")).toEqual({ status: "en-curso", week: 2, day: 1 });
    expect(routePosition("2026-11-09", "2026-11-04").status).toBe("antes");
    expect(routePosition("2026-11-02", "2027-03-01").status).toBe("terminada");
    expect(dateOf("2026-11-04", 2, 3)).toBe("2026-11-12");
  });

  it("cuenta el avance sin domingos", () => {
    expect(routeProgress([]).total).toBe(144);
    expect(routeProgress([sessionKey(1, 0, "m"), sessionKey(1, 6, "m"), "basura"]).done).toBe(1);
  });
});
