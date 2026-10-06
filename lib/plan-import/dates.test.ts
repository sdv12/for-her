import { describe, expect, it } from "vitest";
import { dateForWeekday, weekdayOf } from "./dates";

describe("dateForWeekday", () => {
  // 1–7 oct 2026: arranca jueves.
  it("toma la primera fecha del rango con ese día", () => {
    expect(dateForWeekday("2026-10-01", "2026-10-07", "Jue")).toBe("2026-10-01");
    expect(dateForWeekday("2026-10-01", "2026-10-07", "Vie")).toBe("2026-10-02");
    expect(dateForWeekday("2026-10-01", "2026-10-07", "Lun")).toBe("2026-10-05");
    expect(dateForWeekday("2026-10-01", "2026-10-07", "Mié")).toBe("2026-10-07");
  });

  it("cruza de mes", () => {
    expect(dateForWeekday("2026-11-26", "2026-12-02", "Lun")).toBe("2026-11-30");
    expect(dateForWeekday("2026-11-26", "2026-12-02", "Mar")).toBe("2026-12-01");
  });

  it("devuelve null si el día no cae en el rango", () => {
    expect(dateForWeekday("2026-10-05", "2026-10-07", "Vie")).toBeNull();
  });
});

describe("weekdayOf", () => {
  it("devuelve la etiqueta en español", () => {
    expect(weekdayOf("2026-10-05")).toBe("Lun");
    expect(weekdayOf("2026-10-11")).toBe("Dom");
    expect(weekdayOf("2026-10-07")).toBe("Mié");
  });
});
