"use client";

import { useMemo, useState } from "react";
import { ListChecks, Pencil, Plus } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Dot } from "@/components/ui/Pill";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import type { Subject } from "@/lib/data/types";
import {
  addTopic,
  createSubject,
  cycleTopicLevel,
  deleteSubject,
  deleteTopic,
  renameTopic,
  restoreSubject,
  restoreTopic,
  subjectUsage,
  updateSubject,
} from "@/lib/mock/actions/syllabus";
import { useDB } from "@/lib/mock/store";
import { colorForNewSubject, subjectColorVar } from "@/lib/subjects";
import { LEVELS, mastery, nextLevel } from "@/lib/syllabus";
import { SubjectSheet } from "./SubjectSheet";
import { SyllabusProgress } from "./SyllabusProgress";

export function SyllabusView() {
  const db = useDB();
  const toast = useToast();
  const [editing, setEditing] = useState<string | null | undefined>(undefined);

  const data = useMemo(() => {
    if (!db) return null;
    const subjects = [...db.subjects].sort((a, b) => a.sort - b.sort);
    const topics = (s: Subject) => db.syllabus_topics.filter((t) => t.subject_id === s.id).sort((a, b) => a.sort - b.sort);
    return { subjects, sections: subjects.map((s) => ({ subject: s, topics: topics(s) })) };
  }, [db]);

  const header = (
    <PageHeader
      kicker="Juntar"
      title="Temario"
      backHref="/mas"
      backLabel="Volver a Más"
      actions={
        <Button variant="secondary" onClick={() => setEditing(null)} disabled={!db}>
          <Plus aria-hidden /> Nueva materia
        </Button>
      }
    />
  );

  if (!db || !data) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-40 rounded-card bg-sunken" />
          ))}
        </div>
      </>
    );
  }

  const current = editing ? data.sections.find((s) => s.subject.id === editing) : null;

  return (
    <>
      {header}

      {data.subjects.length === 0 ? (
        <EmptyState
          icon={ListChecks}
          title="Todavía no hay materias"
          action={
            <Button variant="primary" onClick={() => setEditing(null)}>
              <Plus aria-hidden /> Nueva materia
            </Button>
          }
        >
          Cargá las materias y sus temas para ver cuánto dominás de cada una. Al importar el cronograma se pueden crear solas.
        </EmptyState>
      ) : (
        <div className="grid items-start gap-5 desk:grid-cols-[1fr_20rem]">
          <div className="flex flex-col gap-4">
            <ul aria-label="Niveles" className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <li className="mr-1 text-muted">Tocá un tema para cambiar su nivel:</li>
              {LEVELS.map((l) => (
                <li key={l.value} className={cn("rounded-full border px-2.5 py-1", l.className)}>
                  {l.label}
                </li>
              ))}
            </ul>

            {data.sections.map(({ subject, topics }) => {
              const pct = mastery(topics);
              return (
                <Card key={subject.id} className="p-5" aria-labelledby={`subj-${subject.id}`}>
                  <div className="flex items-center gap-3">
                    <Dot color={subjectColorVar(subject.color)} className="size-3" />
                    <h2 id={`subj-${subject.id}`} className="flex-1 text-lg font-semibold">
                      {subject.name}
                    </h2>
                    <span className="tabular text-sm font-semibold text-muted">{pct === null ? "Sin temas" : `${pct}% dominado`}</span>
                    <Button variant="ghost" size="icon" aria-label={`Editar ${subject.name}`} onClick={() => setEditing(subject.id)} className="-mr-2 text-muted">
                      <Pencil aria-hidden />
                    </Button>
                  </div>
                  {pct !== null && <ProgressBar label={`Dominio de ${subject.name}`} value={pct} tone="sage" className="mt-2" />}

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {topics.map((t) => {
                      const level = LEVELS[t.level];
                      return (
                        <li key={t.id}>
                          <button
                            type="button"
                            onClick={() => cycleTopicLevel(t.id)}
                            aria-label={`${t.name}: ${level.label}. Tocá para pasar a ${LEVELS[nextLevel(t.level)].label}.`}
                            className={cn("min-h-11 rounded-full border-[1.5px] px-4 text-sm font-semibold transition-colors", level.className)}
                          >
                            {t.name}
                          </button>
                        </li>
                      );
                    })}
                    <li>
                      <AddTopic
                        subjectName={subject.name}
                        onAdd={(name) => {
                          if (addTopic(subject.id, name) === "exists") toast({ message: `“${name.trim()}” ya está en ${subject.name}.` });
                        }}
                      />
                    </li>
                  </ul>
                </Card>
              );
            })}
          </div>

          <div className="desk:sticky desk:top-6">
            <SyllabusProgress subjects={data.subjects} topics={db.syllabus_topics} />
          </div>
        </div>
      )}

      {editing !== undefined && (
        <SubjectSheet
          key={editing ?? "new"}
          subject={current?.subject ?? null}
          topics={current?.topics ?? []}
          usage={current ? subjectUsage(db, current.subject.id) : null}
          suggestedColor={colorForNewSubject("", db.subjects.length)}
          onClose={() => setEditing(undefined)}
          onSave={(input) => {
            try {
              if (current) updateSubject(current.subject.id, input);
              else createSubject(input);
            } catch (e) {
              return (e as Error).message;
            }
            setEditing(undefined);
            toast({ message: current ? "Guardado." : "Materia creada." });
            return null;
          }}
          onRenameTopic={(id, name) => renameTopic(id, name)}
          onDeleteTopic={(id) => deleteTopic(id)}
          onRestoreTopic={(t) => restoreTopic(t)}
          onDelete={
            current
              ? () => {
                  const removed = deleteSubject(current.subject.id);
                  setEditing(undefined);
                  toast({ message: `Borré ${removed.subject.name}.`, actions: [{ label: "Deshacer", onClick: () => restoreSubject(removed) }] });
                }
              : undefined
          }
        />
      )}
    </>
  );
}

function AddTopic({ subjectName, onAdd }: { subjectName: string; onAdd: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-accent-text hover:bg-sunken"
      >
        <Plus aria-hidden className="size-4" /> Tema
      </button>
    );
  }

  return (
    <form
      className="flex items-center gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim()) onAdd(value);
        setValue("");
      }}
    >
      <label className="sr-only" htmlFor={`add-${subjectName}`}>
        Tema nuevo en {subjectName}
      </label>
      <input
        id={`add-${subjectName}`}
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => !value.trim() && setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && (setValue(""), setOpen(false))}
        placeholder="Nuevo tema"
        maxLength={80}
        className="min-h-11 w-44 rounded-full border border-line bg-surface px-4 text-sm focus-visible:border-accent-text focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:outline-none"
      />
      <Button type="submit" variant="primary" size="icon" aria-label="Agregar tema" className="rounded-full">
        <Plus aria-hidden />
      </Button>
    </form>
  );
}
