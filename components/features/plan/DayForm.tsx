"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextAreaField, TextField } from "@/components/ui/Field";
import { fieldErrors, planDayInput, type PlanDayInput } from "@/lib/data/schemas";
import { COMMON_MODES, formatRange } from "@/lib/plan";

type Props = {
  initial: PlanDayInput;
  range: { start: string; end: string };
  submitLabel: string;
  onSubmit: (data: PlanDayInput) => void;
  onCancel: () => void;
  onDelete?: () => void;
};

/** Form inline para agregar o editar un día: contenido, modo y fecha (dentro de la semana). */
export function DayForm({ initial, range, submitLabel, onSubmit, onCancel, onDelete }: Props) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = planDayInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    if (parsed.data.date < range.start || parsed.data.date > range.end) {
      return setErrors({ date: `Elegí una fecha de esta semana (${formatRange(range.start, range.end)}).` });
    }
    onSubmit(parsed.data);
  }

  const set = (key: keyof PlanDayInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4 rounded-card-sm bg-sunken p-4">
      <TextAreaField label="Qué toca" rows={2} value={values.content} onChange={set("content")} error={errors.content} autoFocus />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Modo" list="plan-modes" value={values.mode} onChange={set("mode")} error={errors.mode} />
        <TextField
          label="Fecha"
          type="date"
          min={range.start}
          max={range.end}
          value={values.date}
          onChange={set("date")}
          error={errors.date}
        />
      </div>
      <datalist id="plan-modes">
        {COMMON_MODES.map((m) => (
          <option key={m} value={m} />
        ))}
      </datalist>
      <div className="flex flex-wrap items-center gap-2">
        <Button type="submit" variant="primary">
          {submitLabel}
        </Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        {onDelete && (
          <Button variant="ghost" onClick={onDelete} className="ml-auto text-muted">
            <Trash2 aria-hidden /> Borrar día
          </Button>
        )}
      </div>
    </form>
  );
}
