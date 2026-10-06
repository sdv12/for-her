import { describe, expect, it } from "vitest";
import type { Mistake } from "./data/types";
import { mistakeQuestion, sortOpenMistakes } from "./mistakes";

describe("mistakeQuestion", () => {
  it("saca los prefijos automáticos", () => {
    expect(mistakeQuestion("No recordé: ¿Relaciones de la tráquea?")).toBe("¿Relaciones de la tráquea?");
    expect(mistakeQuestion("Flojo en: Gasto cardíaco")).toBe("Gasto cardíaco");
    expect(mistakeQuestion("Confundí CX con CD")).toBe("Confundí CX con CD");
  });
});

describe("sortOpenMistakes", () => {
  const m = (id: string, times: number, updated_at: string, resolved_at: string | null = null) =>
    ({ id, times, updated_at, resolved_at }) as Mistake;
  it("solo abiertos, más repetidos y más recientes primero", () => {
    const list = [m("a", 1, "2026-10-01"), m("b", 3, "2026-09-01"), m("c", 1, "2026-10-05"), m("d", 5, "2026-10-05", "2026-10-06")];
    expect(sortOpenMistakes(list).map((x) => x.id)).toEqual(["b", "c", "a"]);
  });
});
