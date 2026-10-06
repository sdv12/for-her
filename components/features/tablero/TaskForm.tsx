"use client";

import { useState } from "react";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { fieldErrors, taskInput, type TaskInput } from "@/lib/data/schemas";
import type { Subject, TaskKind } from "@/lib/data/types";
import { KIND_LABEL, KIND_OPTIONS } from "@/lib/tasks";

type Props = {
  id: string;
  initial: TaskInput;
  subjects: Subject[];
  onSubmit: (data: TaskInput) => void;
};

/** Campos de una tarea. El botón de enviar vive afuera (en el pie del sheet) y apunta a `id`. */
export function TaskForm({ id, initial, subjects, onSubmit }: Props) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const kinds: TaskKind[] = KIND_OPTIONS.includes(values.kind) ? KIND_OPTIONS : [...KIND_OPTIONS, values.kind];

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = taskInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    onSubmit(values);
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="flex flex-col gap-4">
      <TextAreaField
        label="Tarea"
        rows={2}
        value={values.title}
        onChange={(e) => setValues((v) => ({ ...v, title: e.target.value }))}
        error={errors.title}
        placeholder="Ej.: resumen de insuficiencia cardíaca"
        autoFocus={!initial.title}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Materia"
          value={values.subject_id ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, subject_id: e.target.value || null }))}
        >
          <option value="">Sin materia</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </SelectField>
        <SelectField label="Tipo" value={values.kind} onChange={(e) => setValues((v) => ({ ...v, kind: e.target.value as TaskKind }))}>
          {kinds.map((k) => (
            <option key={k} value={k}>
              {KIND_LABEL[k]}
            </option>
          ))}
        </SelectField>
      </div>
      <TextField
        label="Vence"
        type="date"
        value={values.due_date ?? ""}
        onChange={(e) => setValues((v) => ({ ...v, due_date: e.target.value }))}
        error={errors.due_date}
        hint="Opcional."
      />
      <TextAreaField
        label="Notas"
        rows={3}
        value={values.notes ?? ""}
        onChange={(e) => setValues((v) => ({ ...v, notes: e.target.value }))}
        error={errors.notes}
      />
    </form>
  );
}
