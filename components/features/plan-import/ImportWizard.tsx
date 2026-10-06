"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ZodError } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { importPlan } from "@/lib/mock/actions/plan-import";
import { useDB } from "@/lib/mock/store";
import { selectActivePlan } from "@/lib/plan";
import { detectTopics } from "@/lib/plan-import/draft";
import type { ImportOptions } from "@/lib/plan-import/schema";
import type { PlanDraft } from "@/lib/plan-import/types";
import { PlanPreview } from "./PlanPreview";
import { BlankSource, DocxSource, JsonSource } from "./sources";

type Source = "docx" | "json" | "blank";

const SOURCES = [
  { value: "docx", label: "Subir .docx" },
  { value: "json", label: "Pegar JSON" },
  { value: "blank", label: "En blanco" },
] as const;

export function ImportWizard() {
  const db = useDB();
  const router = useRouter();
  const toast = useToast();
  const [source, setSource] = useState<Source>("docx");
  const [draft, setDraft] = useState<PlanDraft | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [mode, setMode] = useState<ImportOptions["mode"]>("replace");
  const [createTopics, setCreateTopics] = useState(true);
  const [saveError, setSaveError] = useState<string | null>(null);

  const current = useMemo(() => (db ? selectActivePlan(db) : null), [db]);
  const topics = useMemo(() => (draft ? detectTopics(draft) : []), [draft]);
  const subjects = db?.subjects.map((s) => s.name) ?? [];

  if (!draft) {
    return (
      <Card className="flex flex-col gap-5 p-5 desk:p-7">
        <SegmentedControl label="Cómo traer el cronograma" options={SOURCES} value={source} onChange={setSource} fullWidth />
        {source === "docx" && <DocxSource onDraft={(d, w) => (setDraft(d), setWarnings(w))} />}
        {source === "json" && <JsonSource onDraft={(d, w) => (setDraft(d), setWarnings(w))} />}
        {source === "blank" && <BlankSource onDraft={(d, w) => (setDraft(d), setWarnings(w))} />}
        <p className="text-sm text-muted">Siempre vas a ver una vista previa antes de guardar.</p>
      </Card>
    );
  }

  function save() {
    if (!draft) return;
    try {
      const s = importPlan(draft, { mode: current ? mode : "replace", createTopics });
      const parts = [`${s.weeks} semanas`, `${s.days} días`, `${s.tasks} tareas en el Tablero`];
      if (s.topics) parts.push(`${s.topics} temas`);
      toast({ message: `Listo: ${parts.join(", ")}.` });
      router.push("/plan");
    } catch (e) {
      setSaveError(e instanceof ZodError ? (e.issues[0]?.message ?? "Revisá los datos.") : "No pude guardar el cronograma.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Vista previa</h2>
        <Button variant="ghost" onClick={() => setDraft(null)}>
          <ArrowLeft aria-hidden /> Elegir otro origen
        </Button>
      </div>

      <PlanPreview draft={draft} onChange={setDraft} warnings={warnings} subjects={subjects} />

      <Card className="flex flex-col gap-4 p-5 desk:p-7">
        {current && (
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-[15px] font-semibold">
              Ya tenés un cronograma ({current.weeks.length} semanas). ¿Qué hago con él?
            </legend>
            {(
              [
                ["replace", "Reemplazarlo", "Borra el plan actual y sus tareas del plan. Tus registros de estudio se conservan."],
                ["merge", "Fusionar", "Suma las semanas y los días nuevos sin borrar nada de lo que ya tenés."],
              ] as const
            ).map(([value, label, hint]) => (
              <label
                key={value}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-card-sm border p-3",
                  mode === value ? "border-ink bg-surface" : "border-line hover:bg-sunken",
                )}
              >
                <input
                  type="radio"
                  name="import-mode"
                  value={value}
                  checked={mode === value}
                  onChange={() => setMode(value)}
                  className="mt-1 size-4 accent-[var(--accent-text)]"
                />
                <span>
                  <span className="block text-[15px] font-semibold">{label}</span>
                  <span className="block text-sm text-muted">{hint}</span>
                </span>
              </label>
            ))}
          </fieldset>
        )}

        {topics.length > 0 && (
          <div>
            <Checkbox
              checked={createTopics}
              onChange={(e) => setCreateTopics(e.target.checked)}
              label={`Crear ${topics.length} temas en el Temario`}
            />
            <p className="mt-1 text-sm text-muted">
              {topics.slice(0, 8).map((t) => t.name).join(" · ")}
              {topics.length > 8 && ` y ${topics.length - 8} más`}
            </p>
          </div>
        )}

        {saveError && (
          <p role="alert" className="rounded-card-sm bg-accent-soft p-3 text-sm font-semibold">
            {saveError}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="lg" onClick={save}>
            Guardar cronograma
          </Button>
          <Button variant="ghost" size="lg" onClick={() => setDraft(null)}>
            Cancelar
          </Button>
        </div>
      </Card>
    </div>
  );
}
