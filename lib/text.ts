const SMALL_WORDS = new Set(["de", "del", "la", "las", "el", "los", "y", "e", "o", "u", "en", "con", "por", "para", "a", "al", "vs", "sin"]);

/**
 * Títulos escritos TODO EN MAYÚSCULAS → "Oración normal", conservando siglas cortas
 * ("PLAN DE REINGRESO — MEDICINA FCM-UNC" → "Plan de reingreso — medicina FCM-UNC").
 * Si el texto ya tiene minúsculas, no se toca.
 */
export function niceCase(s: string): string {
  const text = s.trim();
  if (/[a-záéíóúñü]/.test(text)) return text;
  let first = true;
  return text
    .split(/(\s+)/)
    .map((token) => {
      if (/^\s+$/.test(token) || !/[A-ZÁÉÍÓÚÑÜ]/.test(token)) return token;
      const letters = token.replace(/[^A-ZÁÉÍÓÚÑÜ]/g, "");
      const lower = token.toLocaleLowerCase("es");
      const parts = token.split("-").map((x) => x.replace(/[^A-ZÁÉÍÓÚÑÜ]/g, ""));
      const isAcronym =
        (letters.length <= 3 && !SMALL_WORDS.has(lower)) || (parts.length > 1 && parts.every((x) => x.length > 0 && x.length <= 4));
      const out = isAcronym ? token : lower;
      const result = first && !isAcronym ? out.charAt(0).toLocaleUpperCase("es") + out.slice(1) : out;
      first = false;
      return result;
    })
    .join("");
}

/** Saca emojis y símbolos decorativos del principio ("🔴 ALTA", "⚠️  El examen…"). */
export function stripLeadingSymbols(s: string): string {
  return s.replace(/^[\s\p{Extended_Pictographic}️‍•●▪◦*·\-–—]+/u, "").trim();
}
