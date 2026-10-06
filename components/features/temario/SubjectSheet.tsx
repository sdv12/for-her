"use client";

import { useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/Field";
import { Sheet } from "@/components/ui/Sheet";
import { cn } from "@/lib/cn";
import { fieldErrors, subjectInput, type SubjectInput } from "@/lib/data/schemas";
import type { Subject, SyllabusTopic } from "@/lib/data/types";
import { BASE_SUBJECT_COLORS, ROTATING_SUBJECT_COLORS, subjectColorVar, type SubjectColor } from "@/lib/subjects";

const COLORS: SubjectColor[] = [...Object.values(BASE_SUBJECT_COLORS), ...ROTATING_SUBJECT_COLORS];
const COLOR_NAME: Record<SubjectColor, string> = {
  anatomia: "Terracota",
  bioquimica: "Violeta",
  fisiologia: "Mostaza",
  clinica: "Frambuesa",
  comunitaria: "Azul",
  r1: "Verde azulado",
  r2: "Ciruela",
  r3: "Oliva",
  r4: "Pizarra",
  r5: "Canela",
};

type Props = {
  subject: Subject | null;
  topics: SyllabusTopic[];
  usage: { cards: number; questions: number } | null;
  suggestedColor: SubjectColor;
  onClose: () => void;
  onSave: (data: SubjectInput) => string | null;
  onRenameTopic: (id: string, name: string) => void;
  /** Devuelve el tema borrado para poder deshacerlo desde el mismo sheet. */
  onDeleteTopic: (id: string) => SyllabusTopic;
  onRestoreTopic: (t: SyllabusTopic) => void;
  onDelete?: () => void;
};

export function SubjectSheet({ subject, topics, usage, suggestedColor, onClose, onSave, onRenameTopic, onDeleteTopic, onRestoreTopic, onDelete }: Props) {
  const [values, setValues] = useState<SubjectInput>({ name: subject?.name ?? "", color: subject?.color ?? suggestedColor });
  const [errors, setErrors] = useState<Record<string, string>>({});
  // El aviso global queda detrás del <dialog> modal: el "Deshacer" de un tema borrado vive acá adentro.
  const [lastDeleted, setLastDeleted] = useState<SyllabusTopic | null>(null);
  const blocked = usage && (usage.cards > 0 || usage.questions > 0);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = subjectInput.safeParse(values);
    if (!parsed.success) return setErrors(fieldErrors(parsed.error));
    const error = onSave(values);
    if (error) setErrors({ name: error });
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title={subject ? "Editar materia" : "Nueva materia"}
      footer={
        <Button type="submit" form="subject-form" variant="primary" className="w-full">
          {subject ? "Guardar" : "Crear materia"}
        </Button>
      }
    >
      <form id="subject-form" onSubmit={submit} noValidate className="flex flex-col gap-5">
        <TextField label="Nombre" value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} error={errors.name} autoFocus={!subject} />
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Color</legend>
          <div className="flex flex-wrap gap-2">
            {COLORS.map((c) => (
              <label key={c} className="relative inline-flex size-11 cursor-pointer items-center justify-center rounded-full has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent-text">
                <input
                  type="radio"
                  name="subject-color"
                  value={c}
                  checked={values.color === c}
                  onChange={() => setValues((v) => ({ ...v, color: c }))}
                  className="sr-only"
                  aria-label={COLOR_NAME[c]}
                />
                <span
                  aria-hidden
                  className={cn("inline-flex size-8 items-center justify-center rounded-full ring-offset-2 ring-offset-surface", values.color === c && "ring-2 ring-ink")}
                  style={{ backgroundColor: subjectColorVar(c) }}
                >
                  {values.color === c && <Check className="size-4 text-surface" strokeWidth={3} />}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </form>

      {subject && (topics.length > 0 || lastDeleted) && (
        <section className="mt-6 border-t border-line pt-5" aria-labelledby="temas-edit">
          <h3 id="temas-edit" className="text-sm font-semibold">
            Temas
          </h3>
          <p className="text-xs text-muted">Los cambios de nombre se guardan al salir del campo.</p>
          <ul className="mt-3 flex flex-col gap-2">
            {topics.map((t) => (
              <li key={t.id} className="flex items-center gap-2">
                <label className="sr-only" htmlFor={`topic-${t.id}`}>
                  Nombre del tema
                </label>
                <input
                  id={`topic-${t.id}`}
                  defaultValue={t.name}
                  onBlur={(e) => e.target.value.trim() && e.target.value.trim() !== t.name && onRenameTopic(t.id, e.target.value)}
                  className="min-h-11 flex-1 rounded-btn border border-line bg-surface px-3 text-[15px] focus-visible:border-accent-text focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:outline-none"
                />
                <Button variant="ghost" size="icon" aria-label={`Borrar el tema ${t.name}`} onClick={() => setLastDeleted(onDeleteTopic(t.id))} className="text-muted">
                  <Trash2 aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
          {lastDeleted && (
            <p role="status" className="mt-3 flex items-center justify-between gap-2 rounded-card-sm bg-sunken py-1 pr-1 pl-3 text-sm">
              Borraste “{lastDeleted.name}”.
              <Button
                variant="ghost"
                onClick={() => {
                  onRestoreTopic(lastDeleted);
                  setLastDeleted(null);
                }}
                className="text-accent-text"
              >
                Deshacer
              </Button>
            </p>
          )}
        </section>
      )}

      {subject && onDelete && (
        <section className="mt-6 border-t border-line pt-5">
          <Button variant="ghost" onClick={onDelete} disabled={!!blocked} className="text-muted">
            <Trash2 aria-hidden /> Borrar materia
          </Button>
          {blocked && (
            <p className="mt-1 text-sm text-muted">
              No se puede borrar: tiene {usage!.cards} {usage!.cards === 1 ? "tarjeta" : "tarjetas"} y {usage!.questions}{" "}
              {usage!.questions === 1 ? "pregunta" : "preguntas"}. Pasalas a otra materia primero.
            </p>
          )}
        </section>
      )}
    </Sheet>
  );
}
