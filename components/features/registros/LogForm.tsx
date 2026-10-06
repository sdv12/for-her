"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { Pill } from "@/components/ui/Pill";
import { fieldErrors, studyLogInput, type StudyLogInput } from "@/lib/data/schemas";
import type { Mood } from "@/lib/data/types";

export const MOODS: Array<{ value: Mood; label: string }> = [
  { value: "bien", label: "Bien" },
  { value: "normal", label: "Normal" },
  { value: "pesado", label: "Pesado" },
];

type Props = {
  id: string;
  initial: StudyLogInput;
  submitLabel: string;
  onSubmit: (data: StudyLogInput) => void;
  /** Si es false, el botón de enviar va afuera (p. ej. en el pie de un sheet) apuntando a `id`. */
  inlineSubmit?: boolean;
};

/** Minutos, qué estudiaste y cómo te sentiste (opcional). */
export function LogForm({ id, initial, submitLabel, onSubmit, inlineSubmit = true }: Props) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = studyLogInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    setErrors({});
    onSubmit(values);
  }

  return (
    <form id={id} onSubmit={submit} noValidate className="flex flex-col gap-4">
      <TextField
        label="Minutos"
        type="number"
        inputMode="numeric"
        min={1}
        max={600}
        value={String(values.minutes)}
        onChange={(e) => setValues((v) => ({ ...v, minutes: e.target.value }))}
        error={errors.minutes}
        className="max-w-40"
      />
      <TextAreaField
        label="Qué estudiaste"
        rows={2}
        value={values.what}
        onChange={(e) => setValues((v) => ({ ...v, what: e.target.value }))}
        error={errors.what}
        placeholder="Ej.: tráquea en voz alta + 10 tarjetas"
      />
      <fieldset>
        <legend className="mb-1.5 text-sm font-semibold">Cómo te sentiste (opcional)</legend>
        <div className="flex flex-wrap gap-2">
          {MOODS.map((m) => (
            <Pill key={m.value} selected={values.mood === m.value} onClick={() => setValues((v) => ({ ...v, mood: v.mood === m.value ? null : m.value }))}>
              {m.label}
            </Pill>
          ))}
        </div>
      </fieldset>
      {inlineSubmit && (
        <div>
          <Button type="submit" variant="primary">
            {submitLabel}
          </Button>
        </div>
      )}
    </form>
  );
}
