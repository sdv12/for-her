import { describe, expect, it } from "vitest";
import { niceCase, stripLeadingSymbols } from "../text";
import { blocksToText, htmlToBlocks } from "./blocks";

const HTML =
  '<p><strong>PLAN DE REINGRESO</strong></p><p><em>Arranca: 13 de octubre de 2026</em></p>' +
  "<table><thead><tr><th><p><strong>Sem</strong></p></th><th><p>Fechas</p></th></tr></thead>" +
  "<tbody><tr><td><p><strong>1</strong></p></td><td><p>13–17 Oct</p></td></tr>" +
  "<tr><td><p>2</p></td><td><p>Línea uno\nLínea dos</p><p>tercera &amp; final</p></td></tr></tbody></table>" +
  "<p><br /></p><p><strong>1. </strong>¿Dónde está la carina?</p>";

describe("htmlToBlocks", () => {
  const blocks = htmlToBlocks(HTML);

  it("separa párrafos y tablas, con filas y celdas", () => {
    expect(blocks.map((b) => b.type)).toEqual(["p", "p", "table", "p"]);
    const table = blocks[2];
    expect(table.type === "table" && table.rows).toEqual([
      ["Sem", "Fechas"],
      ["1", "13–17 Oct"],
      ["2", "Línea uno\nLínea dos\ntercera & final"],
    ]);
  });

  it("descarta párrafos vacíos y une el texto con formato", () => {
    expect(blocks[3]).toEqual({ type: "p", text: "1. ¿Dónde está la carina?" });
  });

  it("texto plano: una línea por párrafo y por celda", () => {
    expect(blocksToText(blocks).split("\n").slice(0, 5)).toEqual(["PLAN DE REINGRESO", "Arranca: 13 de octubre de 2026", "Sem", "Fechas", "1"]);
  });
});

describe("niceCase", () => {
  it("pasa a oración y conserva siglas", () => {
    expect(niceCase("PLAN DE REINGRESO — MEDICINA FCM-UNC")).toBe("Plan de reingreso — medicina FCM-UNC");
    expect(niceCase("BÁSICAS CON ENFOQUE CLÍNICO")).toBe("Básicas con enfoque clínico");
    expect(niceCase("CLÍNICA — RENAL Y ÁCIDO-BASE")).toBe("Clínica — renal y ácido-base");
    expect(niceCase("CLÍNICA — HTA Y ECG")).toBe("Clínica — HTA y ECG");
    expect(niceCase("ANATOMÍA — TÓRAX")).toBe("Anatomía — tórax");
    expect(niceCase("Anatomía de Tórax")).toBe("Anatomía de Tórax");
  });
});

describe("stripLeadingSymbols", () => {
  it("saca emojis y viñetas del principio", () => {
    expect(stripLeadingSymbols("🔴 ALTA")).toBe("ALTA");
    expect(stripLeadingSymbols("⚠️  El examen arranca")).toBe("El examen arranca");
    expect(stripLeadingSymbols("● Ritmo base")).toBe("Ritmo base");
  });
});
