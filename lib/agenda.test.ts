import { describe, expect, it } from "vitest";
import { selectAgenda } from "./agenda";
import { buildSeed } from "./mock/seed";

const at = (iso: string) => new Date(`${iso}T12:00:00`);
const shape = (a: ReturnType<typeof selectAgenda>) => a.items.map((i) => `${i.slot}:${i.source}`);

describe("Tu día (Hoy) para un examen oral integrador", () => {
  it("con cronograma: un solo eje, mañana para comprender y noche para conectar, aplicar y decirlo en voz alta", () => {
    const db = buildSeed(at("2026-10-06"));
    db.route = { start: "2026-10-05", done: [] }; // la ruta no compite con el cronograma
    const a = selectAgenda(db, at("2026-10-06")); // martes de la semana 1 (tórax)
    expect(a.focus).toBe("cronograma");
    expect(a.eje?.id).toBe("respiratorio"); // el eje es el de la semana, no el de cada día
    expect(shape(a)).toEqual(["manana:recuperar", "manana:cronograma", "noche:caso", "noche:oral", "noche:errores", "dia:tarjetas", "dia:errores"]);
    expect(a.items.find((i) => i.source === "recuperar")?.text).toContain("Tráquea");
    // La pregunta oral es de ESTA semana del cronograma.
    expect(a.items.find((i) => i.source === "oral")?.text).toMatch(/tráquea/i);
    // Lunes: puente con otra semana del mismo eje; miércoles: conectar (sin preguntas de la materia transversal).
    expect(shape(selectAgenda(db, at("2026-10-05")))).toContain("noche:puente");
    expect(selectAgenda(db, at("2026-10-05")).items.find((i) => i.source === "puente")?.href).toBe("/plan?semana=3");
    expect(shape(selectAgenda(db, at("2026-10-07")))).toContain("noche:conectar");
  });

  it("solo con la ruta: el tema y la conexión salen de la sesión de la ruta", () => {
    const db = buildSeed(at("2026-10-06"));
    db.plans = [];
    db.route = { start: "2026-10-05", done: ["1-1-m"] };
    const a = selectAgenda(db, at("2026-10-06"));
    expect(a.focus).toBe("ruta");
    expect(a.eje?.id).toBe("diabetes");
    expect(shape(a).filter((s) => !s.startsWith("dia"))).toEqual(["manana:recuperar", "manana:ruta", "noche:ruta", "noche:caso", "noche:oral", "noche:errores"]);
    // Si la noche de la ruta ya es un caso, no se suma otro.
    const jueves = selectAgenda(db, at("2026-10-08"));
    expect(shape(jueves).filter((x) => x === "noche:caso")).toEqual([]);
    expect(a.items.find((i) => i.slot === "manana" && i.source === "ruta")?.done).toBe(true);
  });

  it("si el día del cronograma es una simulación oral, no lo trata como estudio ni repite el oral a la noche", () => {
    const db = buildSeed(at("2026-10-06"));
    const a = selectAgenda(db, at("2026-10-02")); // viernes 2: "Simulación: Describime la tráquea…"
    const plan = a.items.find((i) => i.source === "cronograma")!;
    expect(plan.label).toMatch(/^Simulación oral/);
    expect(plan.href).toBe("/simulacro?modo=tribunal");
    expect(a.items.some((i) => i.source === "oral")).toBe(false);
  });

  it("sábado de repaso y caso acumulativo; domingo de descanso", () => {
    const db = buildSeed(at("2026-10-06"));
    expect(shape(selectAgenda(db, at("2026-10-10")))).toEqual(["manana:errores", "manana:espaciado", "noche:caso", "dia:tarjetas"]);
    expect(shape(selectAgenda(db, at("2026-10-11")))).toEqual(["manana:descanso", "dia:tarjetas"]);
  });

  it("a tres semanas del examen la noche pasa a ser simulacro en modo tribunal", () => {
    const db = buildSeed(at("2026-10-06"));
    db.profile.exam_date = "2026-10-20";
    const a = selectAgenda(db, at("2026-10-06"));
    expect(a.examClose).toBe(true);
    expect(a.items.find((i) => i.key === "simulacro")?.action).toEqual({ type: "link", href: "/simulacro?modo=tribunal" });
    expect(a.items.some((i) => i.key === "caso")).toBe(false);
  });

  it("los tildes propios del día se leen de day_checks y las tareas del Tablero se suman", () => {
    const db = buildSeed(at("2026-10-06"));
    db.day_checks = ["2026-10-07|conectar"];
    db.tasks.push({ ...db.tasks[0], id: "x", origin: "mia", plan_day_id: null, title: "Resumen de shock", due_date: "2026-10-06", status: "pend" });
    expect(selectAgenda(db, at("2026-10-07")).items.find((i) => i.source === "conectar")?.done).toBe(true);
    expect(selectAgenda(db, at("2026-10-06")).items.find((i) => i.source === "tablero")?.text).toBe("Resumen de shock");
  });
});
