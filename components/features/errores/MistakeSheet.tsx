"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextAreaField } from "@/components/ui/Field";
import { Sheet } from "@/components/ui/Sheet";
import { fieldErrors, mistakeInput, type MistakeInput } from "@/lib/data/schemas";
import type { Mistake } from "@/lib/data/types";

type Props = {
  mistake: Mistake | null;
  onClose: () => void;
  onSave: (data: MistakeInput) => void;
  onDelete?: () => void;
};

export function MistakeSheet({ mistake, onClose, onSave, onDelete }: Props) {
  const [values, setValues] = useState<MistakeInput>({ text: mistake?.text ?? "", correction: mistake?.correction ?? "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = mistakeInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    onSave(values);
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title={mistake ? "Editar error" : "Anotar un error"}
      footer={
        <div className="flex gap-2">
          <Button type="submit" form="mistake-form" variant="primary" className="flex-1">
            {mistake ? "Guardar" : "Anotar"}
          </Button>
          {onDelete && (
            <Button variant="ghost" size="icon" aria-label="Borrar error" onClick={onDelete} className="text-muted">
              <Trash2 aria-hidden />
            </Button>
          )}
        </div>
      }
    >
      <form id="mistake-form" onSubmit={submit} noValidate className="flex flex-col gap-4">
        <TextAreaField
          label="Qué me salió mal"
          rows={3}
          value={values.text}
          onChange={(e) => setValues((v) => ({ ...v, text: e.target.value }))}
          error={errors.text}
          placeholder="Ej.: confundí la irrigación de la circunfleja con la de la coronaria derecha"
          autoFocus={!mistake}
        />
        <TextAreaField
          label="Lo correcto"
          rows={5}
          value={values.correction}
          onChange={(e) => setValues((v) => ({ ...v, correction: e.target.value }))}
          error={errors.correction}
          placeholder="Causa → mecanismo → consecuencia clínica"
        />
      </form>
    </Sheet>
  );
}
