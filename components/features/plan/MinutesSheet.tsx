"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Sheet } from "@/components/ui/Sheet";
import { minutesInput } from "@/lib/data/schemas";

type Props = {
  initialMinutes: number;
  onSave: (minutes: number) => void;
  onClose: () => void;
};

/** Ajusta los minutos del registro sugerido al tildar un día. Se monta solo cuando está abierto. */
export function MinutesSheet({ initialMinutes, onSave, onClose }: Props) {
  const [value, setValue] = useState(String(initialMinutes));
  const [error, setError] = useState<string>();

  function save(e: React.FormEvent) {
    e.preventDefault();
    const parsed = minutesInput.safeParse(value);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message);
    onSave(parsed.data);
  }

  return (
    <Sheet open onClose={onClose} title="¿Cuánto estudiaste?" side="bottom">
      <form onSubmit={save} noValidate className="flex flex-col gap-4">
        <TextField
          label="Minutos"
          type="number"
          inputMode="numeric"
          min={1}
          max={600}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={error}
          hint="Lo ves y lo cambiás cuando quieras desde Registros."
          autoFocus
        />
        <Button type="submit" variant="primary" size="lg">
          Guardar
        </Button>
      </form>
    </Sheet>
  );
}
