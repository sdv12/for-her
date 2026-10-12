/*
 * Documento de Word como secuencia de bloques: párrafos y tablas (filas × celdas).
 * Se arma a partir del HTML que genera mammoth en el server; así no se pierde la estructura
 * de las tablas (con texto plano, cada celda queda como una línea suelta y no se sabe dónde empieza una fila).
 */

export type DocBlock = { type: "p"; text: string } | { type: "table"; rows: string[][] };

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", "#39": "'" };

function decode(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z#0-9]+);/gi, (m, name) => ENTITIES[name] ?? m);
}

/** Texto de un fragmento HTML: <br> y cambios de párrafo pasan a saltos de línea. */
function textOf(html: string): string {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p[^>]*>/gi, "\n")
      .replace(/<\/li>\s*<li[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

export function htmlToBlocks(html: string): DocBlock[] {
  const blocks: DocBlock[] = [];
  const re = /<table[^>]*>([\s\S]*?)<\/table>|<(p|h[1-6]|li)[^>]*>([\s\S]*?)<\/\2>/gi;
  for (const m of html.matchAll(re)) {
    if (m[1] !== undefined) {
      const rows = [...m[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
        .map((r) => [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => textOf(c[1])))
        .filter((cells) => cells.some(Boolean));
      if (rows.length) blocks.push({ type: "table", rows });
    } else {
      const text = textOf(m[3]);
      if (text) blocks.push({ type: "p", text });
    }
  }
  return blocks;
}

/** Texto plano equivalente (para los parsers por líneas): cada párrafo y cada celda en su línea. */
export function blocksToText(blocks: DocBlock[]): string {
  return blocks.map((b) => (b.type === "p" ? b.text : b.rows.flat().join("\n"))).join("\n");
}
