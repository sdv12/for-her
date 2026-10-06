"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SelectField, TextAreaField, TextField } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Sheet } from "@/components/ui/Sheet";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { minutesInput } from "@/lib/data/schemas";
import { createCard } from "@/lib/mock/actions/cards";
import { createLog } from "@/lib/mock/actions/logs";
import { createQuestion, decrementAsked, findDuplicate, incrementAsked } from "@/lib/mock/actions/questions";
import { createTask } from "@/lib/mock/actions/tasks";
import { useDB } from "@/lib/mock/store";
import { toISODate } from "@/lib/plan-import/dates";
import { selectToday } from "@/lib/today";

type Kind = "pregunta" | "tarea" | "tarjeta" | "registro";

const KINDS = [
  { value: "pregunta", label: "Pregunta" },
  { value: "tarea", label: "Tarea" },
  { value: "tarjeta", label: "Tarjeta" },
  { value: "registro", label: "Registro" },
] as const;

const PLACEHOLDER: Record<Kind, string> = {
  pregunta: "¿Qué te preguntaron? Tal cual.",
  tarea: "Ej.: resumen de IC para el oral",
  tarjeta: "La pregunta de la tarjeta",
  registro: "Qué estudiaste hoy",
};

const QuickAddContext = createContext<(() => void) | null>(null);

export function useQuickAdd() {
  const open = useContext(QuickAddContext);
  if (!open) throw new Error("useQuickAdd tiene que usarse dentro de <QuickAddProvider>.");
  return open;
}

/** Botón "+" (en el encabezado del celular). */
export function QuickAddButton({ className }: { className?: string }) {
  const open = useQuickAdd();
  return (
    <button
      type="button"
      onClick={open}
      aria-label="Agregar rápido"
      aria-keyshortcuts="N"
      className={cn("inline-flex size-11 items-center justify-center rounded-full bg-accent text-accent-ink", className)}
    >
      <Plus aria-hidden className="size-5" strokeWidth={2.5} />
    </button>
  );
}

/**
 * Agregar rápido: anotar una pregunta en dos toques (+ y Guardar).
 * En desktop se abre con la tecla N cuando no estás escribiendo en un campo.
 */
export function QuickAddProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openSheet = useCallback(() => setOpen(true), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key.toLowerCase() !== "n" || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select, [contenteditable=''], [contenteditable='true']")) return;
      if (document.querySelector("dialog[open]")) return;
      e.preventDefault();
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <QuickAddContext.Provider value={openSheet}>
      {children}
      {open && <QuickAddSheet onClose={() => setOpen(false)} />}
    </QuickAddContext.Provider>
  );
}

function QuickAddSheet({ onClose }: { onClose: () => void }) {
  const db = useDB();
  const toast = useToast();
  const router = useRouter();
  const [kind, setKind] = useState<Kind>("pregunta");
  const [text, setText] = useState("");
  const [back, setBack] = useState("");
  const [minutes, setMinutes] = useState("30");
  const [errors, setErrors] = useState<{ text?: string; back?: string; minutes?: string; form?: string }>({});

  const subjects = useMemo(() => (db ? [...db.subjects].sort((a, b) => a.sort - b.sort) : []), [db]);
  // Materia sugerida: la de la tarea de hoy del plan; si no hay, la primera.
  const suggested = useMemo(() => (db ? (selectToday(db).dayTask?.subject_id ?? subjects[0]?.id ?? "") : ""), [db, subjects]);
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const subject = subjectId ?? suggested;

  function done(message: string, href: string, extra?: { label: string; onClick: () => void }) {
    onClose();
    toast({ message, actions: [...(extra ? [extra] : []), { label: "Ver", onClick: () => router.push(href) }] });
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!db) return;
    const value = text.trim();
    if (!value) return setErrors({ text: kind === "registro" ? "Contá en dos palabras qué estudiaste." : "Escribí algo para guardar." });

    try {
      if (kind === "pregunta") {
        const dup = findDuplicate(db, value);
        if (dup) {
          const total = incrementAsked(dup.id);
          return done(`Ya la tenías: ahora la tomaron ${total} veces.`, "/preguntas", { label: "Deshacer", onClick: () => decrementAsked(dup.id) });
        }
        createQuestion({ text: value, subject_id: subject, new_subject: "", source: "", asked_on: "", priority: 2, model_answer: "" });
        return done("Pregunta anotada.", "/preguntas");
      }
      if (kind === "tarea") {
        createTask({ title: value, subject_id: subject || null, kind: "lectura", due_date: null, notes: null });
        return done("Tarea creada en Pendiente.", "/tablero");
      }
      if (kind === "tarjeta") {
        if (!back.trim()) return setErrors({ back: "Falta la respuesta." });
        createCard({ front: value, back, subject_id: subject, tags: "" }, { source: "Agregar rápido", source_ref: null });
        return done("Tarjeta creada. Ya está para repasar.", "/tarjetas");
      }
      const mins = minutesInput.safeParse(minutes);
      if (!mins.success) return setErrors({ minutes: mins.error.issues[0]?.message });
      createLog({ date: toISODate(new Date()), minutes: mins.data, what: value, mood: null });
      return done(`Registrado: ${mins.data} min hoy.`, "/registros");
    } catch {
      setErrors({ form: "No pude guardarlo. Probá de nuevo." });
    }
  }

  return (
    <Sheet
      open
      onClose={onClose}
      title="Agregar rápido"
      side="bottom"
      footer={
        <Button type="submit" form="quick-add" variant="primary" size="lg" className="w-full">
          Guardar
        </Button>
      }
    >
      <form id="quick-add" onSubmit={save} noValidate className="flex flex-col gap-4">
        <SegmentedControl label="Qué querés agregar" options={KINDS} value={kind} onChange={(k) => (setKind(k), setErrors({}))} fullWidth className="[&_button]:px-2" />
        <TextAreaField
          key={kind}
          label={kind === "tarjeta" ? "Pregunta" : kind === "registro" ? "Qué estudiaste" : kind === "pregunta" ? "La pregunta" : "Tarea"}
          rows={3}
          value={text}
          onChange={(e) => (setText(e.target.value), setErrors({}))}
          placeholder={PLACEHOLDER[kind]}
          error={errors.text}
          autoFocus
        />
        {kind === "tarjeta" && (
          <TextAreaField
            label="Respuesta"
            rows={3}
            value={back}
            onChange={(e) => (setBack(e.target.value), setErrors({}))}
            placeholder="Causa → mecanismo → consecuencia clínica"
            error={errors.back}
          />
        )}
        {kind === "registro" ? (
          <TextField
            label="Minutos"
            type="number"
            inputMode="numeric"
            min={1}
            max={600}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            error={errors.minutes}
            className="max-w-40"
          />
        ) : (
          subjects.length > 0 && (
            <SelectField label={kind === "tarea" ? "Materia (opcional)" : "Materia"} value={subject} onChange={(e) => setSubjectId(e.target.value)}>
              {kind === "tarea" && <option value="">Sin materia</option>}
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </SelectField>
          )
        )}
        {errors.form && (
          <p role="alert" className="rounded-card-sm bg-accent-soft p-3 text-sm font-semibold">
            {errors.form}
          </p>
        )}
        <p className="hidden text-xs text-muted desk:block">
          Atajo: tecla <kbd className="rounded-[6px] border border-line bg-sunken px-1.5">N</kbd> desde cualquier pantalla.
        </p>
      </form>
    </Sheet>
  );
}
