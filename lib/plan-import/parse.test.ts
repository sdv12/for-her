import { describe, expect, it } from "vitest";
import { normalizeWeekday, parseFechas } from "./dates";
import { detectTopics, shiftDraft } from "./draft";
import { parsePlanText } from "./parse-docx";
import { parsePlanJson } from "./parse-json";

describe("parseFechas", () => {
  it("rango dentro de un mes", () => {
    expect(parseFechas("1–7 Oct", "2026-10-01")).toMatchObject({ start: "2026-10-01", end: "2026-10-07" });
  });

  it("rango que cruza de mes", () => {
    expect(parseFechas("26 Nov – 2 Dic", "2026-11-19")).toMatchObject({ start: "2026-11-26", end: "2026-12-02" });
  });

  it("rango que cruza de año", () => {
    expect(parseFechas("29 Dic – 4 Ene", "2026-12-22")).toMatchObject({ start: "2026-12-29", end: "2027-01-04" });
  });

  it("enero después de diciembre es del año siguiente", () => {
    expect(parseFechas("5–11 Ene", "2026-12-29")).toMatchObject({ start: "2027-01-05", end: "2027-01-11" });
  });

  it("acepta meses completos, guiones comunes y 'al … de'", () => {
    expect(parseFechas("13-19 Abril", "2026-01-01")).toMatchObject({ start: "2026-04-13", end: "2026-04-19" });
    expect(parseFechas("1 al 7 de octubre", "2026-10-01")).toMatchObject({ start: "2026-10-01", end: "2026-10-07" });
    expect(parseFechas("31 Ago – 6 Sep", "2026-08-24")).toMatchObject({ start: "2026-08-31", end: "2026-09-06" });
  });

  it("devuelve el resto del texto", () => {
    expect(parseFechas("27 Abril – 3 Mayo  —  IAM 1 y 2", "2026-04-20")?.rest).toBe("  —  IAM 1 y 2");
  });

  it("null si no hay fechas", () => {
    expect(parseFechas("Base fisiológica", "2026-01-01")).toBeNull();
    expect(parseFechas("1–7 Xyz", "2026-01-01")).toBeNull();
  });
});

describe("normalizeWeekday", () => {
  it("acepta abreviaturas y nombres completos, con o sin acento", () => {
    expect(normalizeWeekday("Lunes")).toBe("Lun");
    expect(normalizeWeekday("mie")).toBe("Mié");
    expect(normalizeWeekday("Miércoles")).toBe("Mié");
    expect(normalizeWeekday("sábado")).toBe("Sáb");
    expect(normalizeWeekday("Marzo")).toBeNull();
  });
});

const EXAMPLE = {
  titulo: "Cronograma examen integrador",
  inicio: "2026-10-01",
  fases: [
    {
      num: 1,
      nombre: "Básicas con foco clínico",
      descripcion: "Sin profundidad de libro, con lógica clínica.",
      alerta: "El examen arranca siempre por acá.",
      semanas: [
        {
          num: 1,
          fechas: "1–7 Oct",
          titulo: "Anatomía del tórax",
          dias: [
            { dia: "Lun", contenido: "Tráquea: relaciones", modo: "Estudio + recall oral" },
            { dia: "Jue", contenido: "Repaso de tórax", modo: "Active recall puro" },
          ],
        },
        { num: 9, fechas: "26 Nov – 2 Dic", titulo: "Cardio", dias: [{ dia: "Mar", contenido: "IC: fisiopatología" }] },
        { num: 10, titulo: "Sin fechas", dias: [] },
      ],
    },
  ],
};

describe("parsePlanJson", () => {
  it("calcula las fechas de cada día con la regla del día de la semana", () => {
    const r = parsePlanJson(JSON.stringify(EXAMPLE));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const [w1, w9, w10] = r.draft.phases[0].weeks;
    expect(w1.days.map((d) => d.date)).toEqual(["2026-10-05", "2026-10-01"]);
    expect(w9).toMatchObject({ start: "2026-11-26", end: "2026-12-02" });
    expect(w9.days[0].date).toBe("2026-12-01");
    // Sin "fechas": inicio + (num-1)*7.
    expect(w10).toMatchObject({ start: "2026-12-03", end: "2026-12-09" });
    expect(r.draft.phases[0]).toMatchObject({ description: EXAMPLE.fases[0].descripcion, alert: EXAMPLE.fases[0].alerta });
  });

  it("explica los errores de formato", () => {
    const bad = parsePlanJson(JSON.stringify({ ...EXAMPLE, inicio: "octubre", fases: [{ ...EXAMPLE.fases[0], semanas: [{ num: 1, dias: [{ dia: "Lunch", contenido: "x" }] }] }] }));
    expect(bad.ok).toBe(false);
    if (bad.ok) return;
    expect(bad.issues?.join("\n")).toMatch(/inicio/);
    expect(bad.issues?.join("\n")).toMatch(/Lunch/);
  });

  it("JSON roto", () => {
    expect(parsePlanJson("{ titulo: ").ok).toBe(false);
  });
});

// Mismo formato que el texto que mammoth saca del cronograma real.
const DOCX_TEXT = `PLAN DE ESTUDIO

Examen de Reingreso — Medicina

Abril → Octubre 2026

RESUMEN DE FASES
Fase
Período
1
Abril

FASE 1 — CIMIENTOS CARDIOVASCULARES
Período
Abril 2026
Objetivo
Construir la base clínica del sistema cardiovascular.
Materias
Clínica 1 · Semiología

SEMANA 1  ·  13–19 Abril  —  Base fisiológica cardiovascular + HTA 1
Día
Contenido
Modo de estudio
Lunes
Fisiología cardiovascular: ciclo cardíaco, precarga
Estudio + completar plantilla SISTEMA
Martes
Regulación de la PA: SRAA
Estudio + esquema fisiopato
Viernes
HTA 1: tratamiento + primera simulación oral
Active recall + simulación oral

SEMANA 3  ·  27 Abril – 3 Mayo  —  IAM 1 y 2
Lunes
IAM 1: SCASEST vs SCACEST
Estudio + plantilla

FASE 2a — CARDIOVASCULAR COMPLETO + RESPIRATORIO
Objetivo
Cerrar el bloque cardiovascular.
SEMANA 12  ·  29 Jun – 5 Jul  —  Sistema renal
Domingo
Descanso. Estás listo.
—
Este plan se ajusta mes a mes.`;

describe("parsePlanText (.docx)", () => {
  const r = parsePlanText(DOCX_TEXT);

  it("arma fases, semanas y días", () => {
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const { phases } = r.draft;
    expect(phases.map((p) => [p.code, p.name])).toEqual([
      ["1", "Cimientos cardiovasculares"],
      ["2a", "Cardiovascular completo + respiratorio"],
    ]);
    expect(phases[0].description).toBe("Construir la base clínica del sistema cardiovascular.");
    const [w1, w3] = phases[0].weeks;
    expect(w1).toMatchObject({ num: 1, start: "2026-04-13", end: "2026-04-19", title: "Base fisiológica cardiovascular + HTA 1" });
    expect(w1.days.map((d) => [d.weekday, d.date, d.mode])).toEqual([
      ["Lun", "2026-04-13", "Estudio + completar plantilla SISTEMA"],
      ["Mar", "2026-04-14", "Estudio + esquema fisiopato"],
      ["Vie", "2026-04-17", "Active recall + simulación oral"],
    ]);
    expect(w3).toMatchObject({ start: "2026-04-27", end: "2026-05-03", title: "IAM 1 y 2" });
    const w12 = phases[1].weeks[0];
    expect(w12).toMatchObject({ start: "2026-06-29", end: "2026-07-05" });
    expect(w12.days[0]).toMatchObject({ weekday: "Dom", content: "Descanso. Estás listo.", mode: "" });
  });

  it("avisa lo que ignoró", () => {
    if (!r.ok) return;
    expect(r.warnings.some((w) => w.includes("Ignoré 1 línea"))).toBe(true);
  });

  it("detecta temas sin números ni días de repaso", () => {
    if (!r.ok) return;
    expect(detectTopics(r.draft).map((t) => t.name)).toEqual(["Fisiología cardiovascular", "Regulación de la PA", "HTA", "IAM"]);
  });

  it("mover el cronograma conserva los días de la semana", () => {
    if (!r.ok) return;
    const moved = shiftDraft(r.draft, "2026-10-12");
    const w1 = moved.phases[0].weeks[0];
    expect(w1).toMatchObject({ start: "2026-10-12", end: "2026-10-18" });
    expect(w1.days.map((d) => d.date)).toEqual(["2026-10-12", "2026-10-13", "2026-10-16"]);
  });

  it("sin semanas, error claro", () => {
    expect(parsePlanText("Hola\nNada por acá").ok).toBe(false);
  });
});
