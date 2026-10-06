import { describe, expect, it } from "vitest";
import { dueQueue, formatInterval, previewAll, schedule } from "./srs";

const now = new Date("2026-10-05T12:00:00Z");
const NEW = { ease: 2.5, interval_days: 0, reps: 0 };

describe("schedule: tarjeta nueva", () => {
  it("intervalos fijos", () => {
    const p = previewAll(NEW, now);
    expect(p.again).toMatchObject({ minutes: 10, interval_days: 0, reps: 0 });
    expect(p.hard).toMatchObject({ interval_days: 1, reps: 1 });
    expect(p.good).toMatchObject({ interval_days: 3, reps: 1 });
    expect(p.easy).toMatchObject({ interval_days: 7, reps: 1 });
  });

  it("Otra vez vuelve en 10 minutos", () => {
    expect(schedule(NEW, "again", now).due_at.toISOString()).toBe("2026-10-05T12:10:00.000Z");
  });

  it("ajusta el ease también en las nuevas", () => {
    expect(schedule(NEW, "again", now).ease).toBe(2.3);
    expect(schedule(NEW, "hard", now).ease).toBe(2.35);
    expect(schedule(NEW, "good", now).ease).toBe(2.5);
    expect(schedule(NEW, "easy", now).ease).toBe(2.65);
  });
});

describe("schedule: tarjeta en repaso", () => {
  const card = { ease: 2.5, interval_days: 10, reps: 3 };

  it("Otra vez reinicia", () => {
    expect(schedule(card, "again", now)).toMatchObject({ reps: 0, interval_days: 0, ease: 2.3, minutes: 10 });
  });

  it("Difícil ×1.2 y baja el ease", () => {
    expect(schedule(card, "hard", now)).toMatchObject({ interval_days: 12, ease: 2.35, reps: 4 });
  });

  it("Bien × ease", () => {
    expect(schedule(card, "good", now)).toMatchObject({ interval_days: 25, ease: 2.5 });
  });

  it("Fácil × ease × 1.3 y sube el ease", () => {
    expect(schedule(card, "easy", now)).toMatchObject({ interval_days: 33, ease: 2.65 });
  });

  it("vence a los días calculados", () => {
    expect(schedule(card, "good", now).due_at.toISOString()).toBe("2026-10-30T12:00:00.000Z");
  });

  it("redondea a días enteros con mínimo 1", () => {
    expect(schedule({ ease: 1.3, interval_days: 1, reps: 1 }, "hard", now).interval_days).toBe(1);
    expect(schedule({ ease: 2.5, interval_days: 0, reps: 2 }, "good", now).interval_days).toBe(3);
  });

  it("el ease no baja de 1.3", () => {
    let state = { ease: 1.4, interval_days: 5, reps: 2 };
    for (let i = 0; i < 5; i++) state = schedule(state, "again", now);
    expect(state.ease).toBe(1.3);
  });
});

describe("formatInterval", () => {
  it("minutos, días y meses", () => {
    expect(formatInterval({ minutes: 10, interval_days: 0 })).toBe("10 min");
    expect(formatInterval({ minutes: null, interval_days: 1 })).toBe("1 d");
    expect(formatInterval({ minutes: null, interval_days: 33 })).toBe("1 mes");
    expect(formatInterval({ minutes: null, interval_days: 75 })).toBe("3 meses");
  });
});

describe("dueQueue", () => {
  it("solo vencidas, primero las más viejas", () => {
    const cards = [
      { id: "a", due_at: "2026-10-05T11:00:00Z" },
      { id: "b", due_at: "2026-10-01T09:00:00Z" },
      { id: "c", due_at: "2026-10-06T09:00:00Z" },
    ];
    expect(dueQueue(cards, now).map((c) => c.id)).toEqual(["b", "a"]);
  });
});
