"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Sheet } from "@/components/ui/Sheet";
import { fieldErrors, questionInput, type QuestionInput } from "@/lib/data/schemas";
import type { ExamQuestion, Subject } from "@/lib/data/types";

const NEW = "__nueva__";
const SOURCES = ["Examen de un compañero", "Grupo de WhatsApp", "Cátedra", "Clase", "Banco del cronograma"];

type Props = {
  question: ExamQuestion | null;
  subjects: Subject[];
  /** Si el texto ya existe en el banco (para avisar antes de duplicar). */
  findDuplicate: (text: string) => ExamQuestion | null;
  onClose: () => void;
  onSave: (data: QuestionInput) => void;
  onIncrement: (id: string) => void;
  onDelete?: () => void;
};

export function QuestionSheet({ question, subjects, findDuplicate, onClose, onSave, onIncrement, onDelete }: Props) {
  const [values, setValues] = useState<QuestionInput>(
    question
      ? {
          text: question.text,
          subject_id: question.subject_id,
          new_subject: "",
          source: question.source ?? "",
          asked_on: question.asked_on ?? "",
          priority: question.priority,
          model_answer: question.model_answer ?? "",
        }
      : { text: "", subject_id: subjects[0]?.id ?? "", new_subject: "", source: "", asked_on: "", priority: 2, model_answer: "" },
  );
  const [creatingSubject, setCreatingSubject] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [duplicate, setDuplicate] = useState<ExamQuestion | null>(null);

  const set = <K extends keyof QuestionInput>(key: K, value: QuestionInput[K]) => setValues((v) => ({ ...v, [key]: value }));

  function save(force: boolean) {
    const input = creatingSubject ? { ...values, subject_id: "" } : { ...values, new_subject: "" };
    const parsed = questionInput.safeParse(input);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    if (!question && !force) {
      const dup = findDuplicate(input.text);
      if (dup) return setDuplicate(dup);
    }
    onSave(input);
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title={question ? "Editar pregunta" : "Encontré una pregunta"}
      footer={
        <div className="flex gap-2">
          <Button type="submit" form="question-form" variant="primary" className="flex-1">
            {question ? "Guardar" : "Guardar pregunta"}
          </Button>
          {onDelete && (
            <Button variant="ghost" size="icon" aria-label="Borrar pregunta" onClick={onDelete} className="text-muted">
              <Trash2 aria-hidden />
            </Button>
          )}
        </div>
      }
    >
      <form id="question-form" onSubmit={(e) => (e.preventDefault(), save(false))} noValidate className="flex flex-col gap-4">
        <TextAreaField
          label="La pregunta"
          hint="Tal cual te la hicieron, con sus palabras."
          rows={3}
          value={values.text}
          onChange={(e) => (set("text", e.target.value), setDuplicate(null))}
          error={errors.text}
          autoFocus={!question}
        />

        {duplicate && (
          <div role="alert" className="flex flex-col gap-3 rounded-card-sm bg-honey-soft p-4 text-sm">
            <p>
              <span className="font-semibold">Ya la tenés en el banco</span> (la tomaron {duplicate.times_asked}{" "}
              {duplicate.times_asked === 1 ? "vez" : "veces"}): “{duplicate.text}”.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={() => onIncrement(duplicate.id)}>
                Sumarle una vez
              </Button>
              <Button variant="ghost" onClick={() => save(true)}>
                Guardarla igual
              </Button>
            </div>
          </div>
        )}

        {creatingSubject ? (
          <div className="flex items-end gap-2">
            <TextField
              label="Materia nueva"
              className="flex-1"
              value={values.new_subject}
              onChange={(e) => set("new_subject", e.target.value)}
              error={errors.subject_id}
              placeholder="Ej.: Farmacología"
              autoFocus
            />
            <Button variant="ghost" onClick={() => setCreatingSubject(false)}>
              Elegir una
            </Button>
          </div>
        ) : (
          <SelectField
            label="Materia"
            value={values.subject_id}
            error={errors.subject_id}
            onChange={(e) => (e.target.value === NEW ? setCreatingSubject(true) : set("subject_id", e.target.value))}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
            <option value={NEW}>+ Materia nueva…</option>
          </SelectField>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="De dónde salió"
            list="question-sources"
            value={values.source}
            onChange={(e) => set("source", e.target.value)}
            error={errors.source}
            placeholder="Compañero, grupo, cátedra…"
          />
          <TextField label="Cuándo (opcional)" type="date" value={values.asked_on} onChange={(e) => set("asked_on", e.target.value)} error={errors.asked_on} />
        </div>
        <datalist id="question-sources">
          {SOURCES.map((s) => (
            <option key={s} value={s} />
          ))}
        </datalist>

        <div className="flex flex-col gap-1.5">
          <span aria-hidden className="text-sm font-semibold">
            Prioridad
          </span>
          <SegmentedControl
            label="Prioridad"
            fullWidth
            value={String(values.priority) as "1" | "2" | "3"}
            onChange={(v) => set("priority", Number(v) as 1 | 2 | 3)}
            options={[
              { value: "1", label: "Alta" },
              { value: "2", label: "Media" },
              { value: "3", label: "Baja" },
            ]}
          />
        </div>

        <TextAreaField
          label="Respuesta modelo (opcional)"
          rows={5}
          value={values.model_answer}
          onChange={(e) => set("model_answer", e.target.value)}
          error={errors.model_answer}
          placeholder="Causa → mecanismo → consecuencia clínica → diagnóstico → conducta"
        />
      </form>
    </Sheet>
  );
}
