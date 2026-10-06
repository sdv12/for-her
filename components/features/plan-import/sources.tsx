"use client";

import { useState, useTransition } from "react";
import { FileText, Sparkles } from "lucide-react";
import { extractDocxText } from "@/app/(app)/plan/importar/actions";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { addDaysISO, nextWeekday, toISODate } from "@/lib/plan-import/dates";
import { blankDraft } from "@/lib/plan-import/draft";
import { parsePlanText } from "@/lib/plan-import/parse-docx";
import { parsePlanJson } from "@/lib/plan-import/parse-json";
import type { ParseResult, PlanDraft } from "@/lib/plan-import/types";

export type OnDraft = (draft: PlanDraft, warnings: string[]) => void;

function ParseError({ result }: { result: Extract<ParseResult, { ok: false }> | { error: string; issues?: string[] } }) {
  return (
    <div role="alert" className="rounded-card-sm bg-accent-soft p-4 text-sm">
      <p className="font-semibold">{result.error}</p>
      {result.issues && result.issues.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-ink/85">
          {result.issues.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

const EXAMPLE_JSON = JSON.stringify(
  {
    titulo: "Cronograma examen integrador",
    inicio: "2026-10-05",
    fases: [
      {
        num: 1,
        nombre: "Básicas con foco clínico",
        descripcion: "Sin profundidad de libro, con lógica clínica.",
        alerta: "El examen arranca siempre por acá.",
        semanas: [
          {
            num: 1,
            fechas: "5–11 Oct",
            titulo: "Anatomía del tórax: lo que el tribunal pide",
            dias: [
              { dia: "Lun", contenido: "Tráquea: relaciones, bronquios principales", modo: "Estudio + recall oral" },
              { dia: "Mar", contenido: "Anatomía cardíaca: cavidades, válvulas, irrigación", modo: "Estudio + esquema" },
              { dia: "Vie", contenido: "Simulación: “Describime la tráquea y sus relaciones”", modo: "Simulación oral" },
            ],
          },
        ],
      },
    ],
  },
  null,
  2,
);

export function JsonSource({ onDraft }: { onDraft: OnDraft }) {
  const [text, setText] = useState("");
  const [error, setError] = useState<Extract<ParseResult, { ok: false }> | null>(null);

  function preview() {
    const r = parsePlanJson(text);
    if (!r.ok) return setError(r);
    setError(null);
    onDraft(r.draft, r.warnings);
  }

  return (
    <div className="flex flex-col gap-4">
      <TextAreaField
        label="Pegá el JSON del cronograma"
        hint="Con titulo, inicio y fases → semanas → dias, como en el formato de importación."
        rows={12}
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="[&_textarea]:font-mono [&_textarea]:text-[13px]"
      />
      {error && <ParseError result={error} />}
      <div className="flex flex-wrap gap-2">
        <Button variant="primary" onClick={preview} disabled={!text.trim()}>
          Ver vista previa
        </Button>
        <Button variant="ghost" onClick={() => setText(EXAMPLE_JSON)}>
          <Sparkles aria-hidden /> Pegar un ejemplo
        </Button>
      </div>
    </div>
  );
}

export function DocxSource({ onDraft }: { onDraft: OnDraft }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<{ error: string; issues?: string[] } | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function onFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    setError(null);
    const form = new FormData();
    form.set("file", file);
    startTransition(async () => {
      const res = await extractDocxText(form);
      if (!res.ok) return setError({ error: res.error });
      const parsed = parsePlanText(res.text);
      if (!parsed.ok) return setError(parsed);
      onDraft(parsed.draft, parsed.warnings);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <label className="flex cursor-pointer flex-col items-center gap-2 rounded-card border border-dashed border-line bg-surface px-6 py-10 text-center hover:bg-sunken has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-text">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
          <FileText aria-hidden className="size-6" />
        </span>
        <span className="text-[15px] font-semibold">{pending ? "Leyendo el documento…" : fileName ?? "Elegí el .docx del cronograma"}</span>
        <span className="text-sm text-muted">Busco “Fase…”, “Semana N · fechas — título” y los días con su contenido y modo.</span>
        <input
          type="file"
          accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          disabled={pending}
          onChange={(e) => {
            onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </label>
      {error && <ParseError result={error} />}
    </div>
  );
}

export function BlankSource({ onDraft }: { onDraft: OnDraft }) {
  const [title, setTitle] = useState("Mi cronograma");
  const [start, setStart] = useState(() => nextWeekday(addDaysISO(toISODate(new Date()), 1), "Lun"));
  const [weeks, setWeeks] = useState("23");
  const [error, setError] = useState<string>();

  function create(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(weeks);
    if (!Number.isInteger(n) || n < 1 || n > 60) return setError("Entre 1 y 60 semanas.");
    if (!start) return setError("Elegí la fecha de inicio.");
    setError(undefined);
    onDraft(blankDraft(title.trim() || "Mi cronograma", start, n), []);
  }

  return (
    <form onSubmit={create} noValidate className="flex flex-col gap-4">
      <TextField label="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Empieza el" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
        <TextField label="Semanas" type="number" inputMode="numeric" min={1} max={60} value={weeks} onChange={(e) => setWeeks(e.target.value)} error={error} />
      </div>
      <div>
        <Button type="submit" variant="primary">
          Ver vista previa
        </Button>
      </div>
    </form>
  );
}
