"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { Sheet } from "@/components/ui/Sheet";
import { cardInput, fieldErrors, type CardInput } from "@/lib/data/schemas";
import type { Card, Subject } from "@/lib/data/types";

type Props = {
  card: Card | null;
  subjects: Subject[];
  defaultSubjectId?: string | null;
  /** Valores iniciales para una tarjeta nueva (p. ej. desde una pregunta o un error). */
  prefill?: Partial<CardInput>;
  onClose: () => void;
  onSave: (data: CardInput) => void;
  onDelete?: () => void;
};

export function CardSheet({ card, subjects, defaultSubjectId, prefill, onClose, onSave, onDelete }: Props) {
  const [values, setValues] = useState<CardInput>(
    card
      ? { front: card.front, back: card.back, subject_id: card.subject_id, tags: card.tags.join(", ") }
      : { front: "", back: "", subject_id: defaultSubjectId ?? subjects[0]?.id ?? "", tags: "", ...prefill },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = cardInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    onSave(values);
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title={card ? "Editar tarjeta" : "Nueva tarjeta"}
      footer={
        <div className="flex gap-2">
          <Button type="submit" form="card-form" variant="primary" className="flex-1">
            {card ? "Guardar" : "Crear tarjeta"}
          </Button>
          {onDelete && (
            <Button variant="ghost" size="icon" aria-label="Borrar tarjeta" onClick={onDelete} className="text-muted">
              <Trash2 aria-hidden />
            </Button>
          )}
        </div>
      }
    >
      <form id="card-form" onSubmit={submit} noValidate className="flex flex-col gap-4">
        <TextAreaField
          label="Pregunta"
          rows={2}
          value={values.front}
          onChange={(e) => setValues((v) => ({ ...v, front: e.target.value }))}
          error={errors.front}
          placeholder="Ej.: ¿Por qué se aplana Frank-Starling en la IC?"
          autoFocus={!card && !prefill?.front}
        />
        <TextAreaField
          label="Respuesta"
          rows={6}
          value={values.back}
          onChange={(e) => setValues((v) => ({ ...v, back: e.target.value }))}
          error={errors.back}
          placeholder="Causa → mecanismo → consecuencia clínica"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Materia"
            value={values.subject_id}
            onChange={(e) => setValues((v) => ({ ...v, subject_id: e.target.value }))}
            error={errors.subject_id}
          >
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Tags"
            value={values.tags}
            onChange={(e) => setValues((v) => ({ ...v, tags: e.target.value }))}
            error={errors.tags}
            hint="Separados por coma."
            placeholder="tórax, tráquea"
          />
        </div>
      </form>
    </Sheet>
  );
}
