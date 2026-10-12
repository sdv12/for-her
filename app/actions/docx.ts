"use server";

import mammoth from "mammoth";
import { htmlToBlocks, type DocBlock } from "@/lib/docx/blocks";

const MAX_BYTES = 5 * 1024 * 1024;

export type ExtractResult = { ok: true; blocks: DocBlock[]; name: string } | { ok: false; error: string };

/**
 * Lee un .docx en el server y devuelve su contenido como bloques (párrafos y tablas con filas/celdas).
 * No guarda nada: el análisis y la vista previa son del cliente.
 */
export async function extractDocx(formData: FormData): Promise<ExtractResult> {
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Elegí un archivo .docx." };
  if (file.name.toLowerCase().endsWith(".doc")) {
    return { ok: false, error: "Es un .doc (Word viejo). Abrilo en Word y guardalo como .docx (Archivo → Guardar como)." };
  }
  if (!file.name.toLowerCase().endsWith(".docx")) return { ok: false, error: "Tiene que ser un archivo .docx (Word)." };
  if (file.size > MAX_BYTES) return { ok: false, error: "El archivo pesa más de 5 MB." };

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const { value } = await mammoth.convertToHtml({ buffer });
    const blocks = htmlToBlocks(value);
    if (blocks.length === 0) return { ok: false, error: "El documento no tiene texto." };
    return { ok: true, blocks, name: file.name };
  } catch {
    return { ok: false, error: "No pude leer el archivo. ¿Está abierto en Word o dañado?" };
  }
}
