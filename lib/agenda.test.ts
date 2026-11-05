import { describe, expect, it } from "vitest";
import { selectAgenda } from "./agenda";
import { buildSeed } from "./mock/seed";

const at = (iso: string) => new Date(`${iso}T12:00:00`);

describe("Tu día (agenda de Hoy)", () => {
  it("junta cronograma y ruta en mañana y noche", () => {
    const db = buildSeed(at("2026-10-06"));
    db.route = { start: "2026-10-05", done: ["1-1-n"] };
    const a = selectAgenda(db, at("2026-10-06")); // martes: día del plan + sesión 2 de la ruta
    expect(a.items.map((i) => `${i.slot}:${i.source}`).slice(0, 3)).toEqual(["manana:cronograma", "manana:ruta", "noche:ruta"]);
    expect(a.route).toMatchObject({ week: 1, day: 1, ejeId: "diabetes" });
    expect(a.items.find((i) => i.slot === "noche")?.done).toBe(true);
    expect(a.total).toBe(3);
    expect(a.done).toBe(1);
  });

  it("sin ruta ni día del plan queda solo lo que haya (tarjetas)", () => {
    const db = buildSeed(at("2026-10-06"));
    const a = selectAgenda(db, at("2026-10-10")); // sábado sin día del plan
    expect(a.route).toBeNull();
    expect(a.items.every((i) => i.source === "tarjetas")).toBe(true);
    expect(a.total).toBe(0);
  });

  it("el domingo de la ruta no tiene sesiones para marcar, y antes de empezar tampoco", () => {
    const db = buildSeed(at("2026-10-06"));
    db.route = { start: "2026-10-05", done: [] };
    expect(selectAgenda(db, at("2026-10-11")).items.some((i) => i.source === "ruta")).toBe(false);
    db.route = { start: "2026-10-19", done: [] };
    const before = selectAgenda(db, at("2026-10-06"));
    expect(before.route?.status).toBe("antes");
    expect(before.items.some((i) => i.source === "ruta")).toBe(false);
  });

  it("suma las tareas propias del Tablero que vencen hoy", () => {
    const db = buildSeed(at("2026-10-06"));
    db.tasks.push({ ...db.tasks[0], id: "x", origin: "mia", plan_day_id: null, title: "Resumen de shock", due_date: "2026-10-06", status: "pend" });
    const a = selectAgenda(db, at("2026-10-06"));
    expect(a.items.find((i) => i.source === "tablero")?.text).toBe("Resumen de shock");
  });
});
