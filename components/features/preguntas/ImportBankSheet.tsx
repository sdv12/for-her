"use client";

import { useMemo, useState } from "react";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/Field";
import { Chip } from "@/components/ui/Pill";
import { Sheet } from "@/components/ui/Sheet";
import { fold } from "@/lib/plan-import/dates";
import { normalizeQuestion, parseBank, PRIORITY_LABEL, type BankParse } from "@/lib/questions";

type Props = {
  existingTexts: string[];
  subjectNames: string[];
  onClose: () => void;
  onImport: (rows: Extract<BankParse, { ok: true }>["rows"]) => void;
};

const EXAMPLE = `pregunta;materia;prioridad;fuente
¿Qué es el ciclo de Krebs y cómo se regula?;Bioquímica;alta;
Gasto cardíaco: determinantes;Fisiología;1;
Incidencia vs prevalencia;Salud comunitaria;media;`;

/** Importar el banco desde CSV o JSON, con vista previa y deduplicación. */
export function ImportBankSheet({ existingTexts, subjectNames, onClose, onImport }: Props) {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<BankParse | null>(null);

  const preview = useMemo(() => {
    if (!result?.ok) return null;
    const existing = new Set(existingTexts.map(normalizeQuestion));
    const inFile = new Set<string>();
    const known = new Set(subjectNames.map(fold));
    const rows = result.rows.map((r) => {
      const key = normalizeQuestion(r.text);
      const status = existing.has(key) ? "existe" : inFile.has(key) ? "repetida" : "nueva";
      inFile.add(key);
      return { ...r, status };
    });
    const newSubjects = [...new Set(result.rows.map((r) => r.subject).filter((s) => !known.has(fold(s))))];
    return { rows, added: rows.filter((r) => r.status === "nueva").length, newSubjects };
  }, [result, existingTexts, subjectNames]);

  async function onFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    const content = await file.text();
    setText(content);
    setResult(parseBank(content));
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title="Importar banco de preguntas"
      footer={
        preview ? (
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" className="flex-1" disabled={preview.added === 0} onClick={() => result?.ok && onImport(result.rows)}>
              {preview.added === 0 ? "No hay preguntas nuevas" : `Importar ${preview.added} ${preview.added === 1 ? "pregunta" : "preguntas"}`}
            </Button>
            <Button variant="ghost" onClick={() => (setResult(null), setFileName(null))}>
              Volver
            </Button>
          </div>
        ) : (
          <Button variant="primary" className="w-full" disabled={!text.trim()} onClick={() => setResult(parseBank(text))}>
            Ver vista previa
          </Button>
        )
      }
    >
      {!preview ? (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted">
            CSV (con coma o punto y coma, como lo exporta Excel) o JSON. Columnas: <b>pregunta</b> (o question), <b>materia</b> (o subject),
            prioridad y fuente. Las preguntas repetidas no se duplican.
          </p>
          <label className="flex cursor-pointer items-center gap-3 rounded-card-sm border border-dashed border-line px-4 py-4 hover:bg-sunken has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-text">
            <FileUp aria-hidden className="size-5 text-accent-text" />
            <span className="text-[15px] font-semibold">{fileName ?? "Elegí un .csv o .json"}</span>
            <input type="file" accept=".csv,.json,.txt,text/csv,application/json" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          <TextAreaField
            label="…o pegalo acá"
            rows={8}
            value={text}
            onChange={(e) => (setText(e.target.value), setResult(null))}
            spellCheck={false}
            className="[&_textarea]:font-mono [&_textarea]:text-[13px]"
          />
          <div>
            <Button variant="ghost" onClick={() => setText(EXAMPLE)}>
              Pegar un ejemplo
            </Button>
          </div>
          {result && !result.ok && (
            <p role="alert" className="rounded-card-sm bg-accent-soft p-3 text-sm font-semibold">
              {result.error}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-[15px]">
            <b>{preview.rows.length}</b> en el archivo · <b>{preview.added}</b> nuevas ·{" "}
            <b>{preview.rows.length - preview.added}</b> repetidas
          </p>
          {preview.newSubjects.length > 0 && (
            <p className="rounded-card-sm bg-honey-soft p-3 text-sm">
              Se crean {preview.newSubjects.length === 1 ? "la materia" : "las materias"} <b>{preview.newSubjects.join(", ")}</b>.
            </p>
          )}
          {result?.ok && result.skipped.length > 0 && (
            <details className="rounded-card-sm bg-sunken p-3 text-sm">
              <summary className="cursor-pointer font-semibold">Salteé {result.skipped.length} filas incompletas</summary>
              <ul className="mt-2 list-disc pl-5">
                {result.skipped.slice(0, 20).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </details>
          )}
          <ul className="flex flex-col divide-y divide-line rounded-card-sm border border-line">
            {preview.rows.slice(0, 60).map((r, i) => (
              <li key={i} className="flex items-start gap-3 px-3 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-snug font-semibold">{r.text}</p>
                  <p className="text-xs text-muted">
                    {r.subject} · Prioridad {PRIORITY_LABEL[r.priority].toLowerCase()}
                    {r.source && ` · ${r.source}`}
                  </p>
                </div>
                <Chip tone={r.status === "nueva" ? "sage" : "neutral"}>
                  {r.status === "nueva" ? "Nueva" : r.status === "existe" ? "Ya está" : "Repetida"}
                </Chip>
              </li>
            ))}
          </ul>
          {preview.rows.length > 60 && <p className="text-sm text-muted">…y {preview.rows.length - 60} más.</p>}
        </div>
      )}
    </Sheet>
  );
}
