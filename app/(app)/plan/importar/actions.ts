"use server";

import mammoth from "mammoth";

const MAX_BYTES = 5 * 1024 * 1024;

export type ExtractResult = { ok: true; text: string; name: string } | { ok: false; error: string };

/** Saca el texto plano de un .docx (server-side). No guarda nada: el parseo y la vista previa son del cliente. */
export async function extractDocxText(formData: FormData): Promise<ExtractResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Elegí un archivo .docx." };
  if (!file.name.toLowerCase().endsWith(".docx")) return { ok: false, error: "Tiene que ser un archivo .docx (Word)." };
  if (file.size > MAX_BYTES) return { ok: false, error: "El archivo pesa más de 5 MB." };

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { value } = await mammoth.extractRawText({ buffer });
    if (!value.trim()) return { ok: false, error: "El documento no tiene texto." };
    return { ok: true, text: value, name: file.name };
  } catch {
    return { ok: false, error: "No pude leer el archivo. ¿Está abierto en Word o dañado?" };
  }
}
