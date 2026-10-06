import { describe, expect, it } from "vitest";
import { monthGrid, shiftMonth } from "./calendar";

describe("monthGrid", () => {
  it("octubre 2026: arranca el lunes 28 de septiembre", () => {
    const g = monthGrid(2026, 9);
    expect(g[0][0]).toEqual({ date: "2026-09-28", day: 28, inMonth: false });
    expect(g[0][3]).toEqual({ date: "2026-10-01", day: 1, inMonth: true });
    expect(g.at(-1)!.at(-1)).toEqual({ date: "2026-11-01", day: 1, inMonth: false });
    expect(g).toHaveLength(5);
    expect(g.every((w) => w.length === 7)).toBe(true);
  });

  it("un mes que empieza en lunes no agrega días del anterior", () => {
    expect(monthGrid(2027, 2)[0][0].date).toBe("2027-03-01");
  });

  it("febrero que entra justo en 4 semanas", () => {
    expect(monthGrid(2027, 1)).toHaveLength(4); // 1 feb 2027 es lunes
  });
});

describe("shiftMonth", () => {
  it("cruza de año en ambos sentidos", () => {
    expect(shiftMonth(2026, 11, 1)).toEqual({ year: 2027, month: 0 });
    expect(shiftMonth(2027, 0, -1)).toEqual({ year: 2026, month: 11 });
  });
});
