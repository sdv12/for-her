import { describe, expect, it } from "vitest";
import { buildSeed } from "../seed";
import { readBackup } from "./settings";

describe("readBackup", () => {
  const db = buildSeed(new Date("2026-10-06T12:00:00Z"));

  it("acepta el formato exportado y cuenta lo que trae", () => {
    const r = readBackup(JSON.stringify({ app: "for-her", exported_at: "x", data: db }));
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.counts).toMatchObject({ tarjetas: 4, preguntas: 6, errores: 3 });
  });

  it("acepta también la base sola", () => {
    expect(readBackup(JSON.stringify(db)).ok).toBe(true);
  });

  it("rechaza JSON roto, otra versión o datos incompletos", () => {
    expect(readBackup("{")).toMatchObject({ ok: false, error: "El archivo no es un JSON válido." });
    expect(readBackup(JSON.stringify({ ...db, version: 2 })).ok).toBe(false);
    const { cards: _omit, ...partial } = db;
    void _omit;
    expect(readBackup(JSON.stringify(partial)).ok).toBe(false);
  });
});
