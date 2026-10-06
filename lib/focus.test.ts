import { describe, expect, it } from "vitest";
import { blocksGoal, elapsedMs, formatClock, INITIAL_FOCUS, remainingSeconds, type FocusState } from "./focus";

describe("remainingSeconds", () => {
  const t0 = 1_000_000;

  it("quieto: el tiempo completo del modo", () => {
    expect(remainingSeconds(INITIAL_FOCUS, t0)).toBe(25 * 60);
    expect(remainingSeconds({ ...INITIAL_FOCUS, mode: "pausa5" }, t0)).toBe(300);
  });

  it("corriendo: por diferencia de tiempo", () => {
    const s: FocusState = { ...INITIAL_FOCUS, status: "running", startedAt: t0 };
    expect(remainingSeconds(s, t0 + 61_000)).toBe(25 * 60 - 61);
    // Aunque no hubo "ticks" en el medio (pestaña en segundo plano), el cálculo es el mismo.
    expect(remainingSeconds(s, t0 + 20 * 60_000)).toBe(5 * 60);
  });

  it("pausado: conserva lo acumulado y no avanza", () => {
    const s: FocusState = { ...INITIAL_FOCUS, status: "paused", startedAt: null, accumulatedMs: 90_000 };
    expect(remainingSeconds(s, t0)).toBe(25 * 60 - 90);
    expect(remainingSeconds(s, t0 + 3_600_000)).toBe(25 * 60 - 90);
  });

  it("acumulado + tramo actual", () => {
    const s: FocusState = { ...INITIAL_FOCUS, status: "running", startedAt: t0, accumulatedMs: 60_000 };
    expect(elapsedMs(s, t0 + 30_000)).toBe(90_000);
  });

  it("nunca negativo", () => {
    const s: FocusState = { ...INITIAL_FOCUS, mode: "pausa5", status: "running", startedAt: t0 };
    expect(remainingSeconds(s, t0 + 10 * 60_000)).toBe(0);
  });
});

describe("formatClock / blocksGoal", () => {
  it("mm:ss", () => {
    expect(formatClock(1500)).toBe("25:00");
    expect(formatClock(61)).toBe("01:01");
  });
  it("bloques redondeando hacia arriba", () => {
    expect(blocksGoal(60)).toBe(3);
    expect(blocksGoal(50)).toBe(2);
    expect(blocksGoal(10)).toBe(1);
  });
});
