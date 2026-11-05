import { describe, expect, it } from "vitest";
import { MATERIAS } from "@/lib/programa/materias";
import { getDB } from "../store";
import { addMateriasToTemario, resetRoute, restoreRoute, startRoute, toggleRouteKey } from "./programa";
import { readBackup } from "./settings";

describe("Programa → Temario", () => {
  it("suma las materias troncales sin duplicar ni tocar lo que ya había", () => {
    const before = getDB();
    const anatomia = before.subjects.find((s) => s.name === "Anatomía")!;
    const traquea = before.syllabus_topics.find((t) => t.subject_id === anatomia.id && t.name === "Tráquea y bronquios")!;

    const first = addMateriasToTemario();
    const db = getDB();
    // "Anatomía" y "Salud comunitaria" ya existían en el seed: se reusan.
    expect(first.subjectsCreated).toBe(MATERIAS.length - 2);
    expect(db.subjects.filter((s) => s.name === "Anatomía")).toHaveLength(1);
    expect(db.syllabus_topics.find((t) => t.id === traquea.id)?.level).toBe(traquea.level);
    expect(first.topicsAdded).toBe(MATERIAS.reduce((n, m) => n + m.unidades.length, 0));

    expect(addMateriasToTemario()).toEqual({ subjectsCreated: 0, topicsAdded: 0 });
  });
});

describe("ruta integrada", () => {
  it("arranca el lunes, guarda el avance, se puede deshacer y viaja en el respaldo", () => {
    startRoute("2026-11-05");
    expect(getDB().route?.start).toBe("2026-11-02");
    expect(toggleRouteKey("1-0-m")).toBe(true);
    expect(toggleRouteKey("1-0-n")).toBe(true);
    expect(toggleRouteKey("1-0-n")).toBe(false);
    expect(getDB().route?.done).toEqual(["1-0-m"]);

    const r = readBackup(JSON.stringify(getDB()));
    expect(r.ok && r.db.route).toEqual({ start: "2026-11-02", done: ["1-0-m"] });

    const prev = resetRoute();
    expect(getDB().route).toEqual({ start: null, done: [] });
    restoreRoute(prev);
    expect(getDB().route?.done).toEqual(["1-0-m"]);
  });
});
