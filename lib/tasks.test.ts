import { describe, expect, it } from "vitest";
import { dueLabel, neighborStatus, positionBetween } from "./tasks";

describe("dueLabel", () => {
  const today = "2026-10-05"; // lunes
  it("hoy, mañana y días de la semana", () => {
    expect(dueLabel("2026-10-05", today)).toBe("Hoy");
    expect(dueLabel("2026-10-06", today)).toBe("Mañana");
    expect(dueLabel("2026-10-08", today)).toBe("Jueves");
    expect(dueLabel("2026-10-11", today)).toBe("Domingo");
  });
  it("más lejos: Sem N si es del plan, si no la fecha", () => {
    expect(dueLabel("2026-10-14", today, 2)).toBe("Sem 2");
    expect(dueLabel("2026-10-14", today)).toBe("14 oct");
  });
  it("una fecha pasada se muestra neutra", () => {
    expect(dueLabel("2026-10-01", today, 1)).toBe("1 oct");
  });
  it("sin fecha", () => {
    expect(dueLabel(null, today)).toBeNull();
  });
});

describe("positionBetween", () => {
  it("entre dos, al final, al principio y en columna vacía", () => {
    expect(positionBetween(1, 2)).toBe(1.5);
    expect(positionBetween(5, undefined)).toBe(6);
    expect(positionBetween(undefined, 3)).toBe(2);
    expect(positionBetween(undefined, undefined)).toBe(1);
  });
});

describe("neighborStatus", () => {
  it("avanza y retrocede sin pasarse", () => {
    expect(neighborStatus("pend", 1)).toBe("curso");
    expect(neighborStatus("pend", -1)).toBeNull();
    expect(neighborStatus("dominado", 1)).toBeNull();
    expect(neighborStatus("dominado", -1)).toBe("repasar");
  });
});
