import { describe, expect, it } from "vitest";
import { daysUntilExam, timeAgo } from "./dates";

const at = (y: number, m: number, d: number, h = 12) => new Date(y, m - 1, d, h);

describe("daysUntilExam", () => {
  it("cuenta días de calendario hasta la fecha", () => {
    expect(daysUntilExam("2027-03-15", at(2026, 10, 5))).toBe(161);
  });

  it("mañana es 1 aunque falten menos de 24 h", () => {
    expect(daysUntilExam("2026-10-06", at(2026, 10, 5, 23))).toBe(1);
  });

  it("el mismo día es 0, a cualquier hora", () => {
    expect(daysUntilExam("2026-10-05", at(2026, 10, 5, 0))).toBe(0);
    expect(daysUntilExam("2026-10-05", at(2026, 10, 5, 23))).toBe(0);
  });

  it("una fecha pasada da 0, nunca negativo", () => {
    expect(daysUntilExam("2026-09-01", at(2026, 10, 5))).toBe(0);
  });

  it("cruza fin de año y febrero", () => {
    expect(daysUntilExam("2027-03-01", at(2026, 12, 31))).toBe(60);
  });

  it("sin fecha o fecha inválida da null", () => {
    expect(daysUntilExam(null)).toBeNull();
    expect(daysUntilExam("")).toBeNull();
    expect(daysUntilExam("no-es-fecha")).toBeNull();
  });
});

describe("timeAgo", () => {
  const now = new Date("2026-10-06T12:00:00Z");
  it("recién, minutos y días", () => {
    expect(timeAgo("2026-10-06T11:59:30Z", now)).toBe("recién");
    expect(timeAgo("2026-10-06T11:55:00Z", now)).toBe("hace 5 minutos");
    expect(timeAgo("2026-10-03T12:00:00Z", now)).toBe("hace 3 días");
  });
});
