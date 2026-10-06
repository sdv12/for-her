import { describe, expect, it } from "vitest";
import { mastery, nextLevel } from "./syllabus";

describe("nextLevel", () => {
  it("cicla los cuatro niveles", () => {
    expect([0, 1, 2, 3].map((l) => nextLevel(l as 0 | 1 | 2 | 3))).toEqual([1, 2, 3, 0]);
  });
});

describe("mastery", () => {
  it("suma de niveles / (3 × temas)", () => {
    expect(mastery([{ level: 3 }, { level: 0 }])).toBe(50);
    expect(mastery([{ level: 1 }, { level: 2 }, { level: 0 }])).toBe(33);
    expect(mastery([{ level: 3 }])).toBe(100);
  });
  it("sin temas: null", () => {
    expect(mastery([])).toBeNull();
  });
});
