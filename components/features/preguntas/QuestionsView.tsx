"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, MessageCircleQuestionMark, Mic, Pencil, Plus, Search, Upload } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { CardSheet } from "@/components/features/tarjetas/CardSheet";
import { Button, buttonClasses } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Chip, Dot, Pill } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import type { ExamQuestion } from "@/lib/data/types";
import { createCard } from "@/lib/mock/actions/cards";
import {
  createQuestion,
  decrementAsked,
  deleteQuestion,
  findDuplicate,
  importQuestions,
  incrementAsked,
  restoreQuestion,
  updateQuestion,
} from "@/lib/mock/actions/questions";
import { useDB } from "@/lib/mock/store";
import { normalizeQuestion, sortQuestions } from "@/lib/questions";
import { subjectColorVar } from "@/lib/subjects";
import { ImportBankSheet } from "./ImportBankSheet";
import { QuestionSheet } from "./QuestionSheet";

const PAGE = 40;

type Panel = { kind: "question"; id: string | null } | { kind: "import" } | { kind: "card"; question: ExamQuestion } | null;

export function QuestionsView({ openNew }: { openNew: boolean }) {
  const db = useDB();
  const toast = useToast();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [onlyHigh, setOnlyHigh] = useState(false);
  const [limit, setLimit] = useState(PAGE);
  const [panel, setPanel] = useState<Panel>(openNew ? { kind: "question", id: null } : null);

  const data = useMemo(() => {
    if (!db) return null;
    const q = normalizeQuestion(query);
    const subjects = new Map(db.subjects.map((s) => [s.id, s]));
    const list = sortQuestions(
      db.exam_questions.filter(
        (x) => (!subjectId || x.subject_id === subjectId) && (!onlyHigh || x.priority === 1) && (!q || normalizeQuestion(x.text).includes(q)),
      ),
    );
    const used = db.subjects.filter((s) => db.exam_questions.some((x) => x.subject_id === s.id)).sort((a, b) => a.sort - b.sort);
    return { list, subjects, used };
  }, [db, query, subjectId, onlyHigh]);

  function close() {
    setPanel(null);
    if (openNew) router.replace("/preguntas", { scroll: false });
  }

  const header = (
    <PageHeader
      kicker="Juntar"
      title="Preguntas de examen"
      backHref="/mas"
      backLabel="Volver a Más"
      actions={
        <>
          <Button variant="secondary" onClick={() => setPanel({ kind: "import" })} disabled={!db}>
            <Upload aria-hidden /> Importar banco
          </Button>
          <Button variant="primary" onClick={() => setPanel({ kind: "question", id: null })} disabled={!db}>
            <Plus aria-hidden /> Encontré una pregunta
          </Button>
        </>
      }
    />
  );

  if (!db || !data) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-card-sm bg-sunken" />
          ))}
        </div>
      </>
    );
  }

  function plusOne(q: ExamQuestion) {
    const total = incrementAsked(q.id);
    toast({ message: `Anotado: la tomaron ${total} ${total === 1 ? "vez" : "veces"}.`, actions: [{ label: "Deshacer", onClick: () => decrementAsked(q.id) }] });
  }

  const editing = panel?.kind === "question" && panel.id ? (db.exam_questions.find((x) => x.id === panel.id) ?? null) : null;
  const sortedSubjects = [...db.subjects].sort((a, b) => a.sort - b.sort);

  return (
    <>
      {header}

      {db.exam_questions.length === 0 ? (
        <EmptyState
          icon={MessageCircleQuestionMark}
          title="Todavía no anotaste preguntas"
          action={
            <Button variant="primary" onClick={() => setPanel({ kind: "question", id: null })}>
              <Plus aria-hidden /> Encontré una pregunta
            </Button>
          }
        >
          Cada vez que te cuenten qué tomaron, anotala acá. Las que más se repiten suben solas.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="relative">
              <label htmlFor="q-search" className="sr-only">
                Buscar pregunta
              </label>
              <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
              <input
                id="q-search"
                type="search"
                value={query}
                onChange={(e) => (setQuery(e.target.value), setLimit(PAGE))}
                placeholder="Buscar en tus preguntas"
                className="min-h-11 w-full rounded-full border border-line bg-surface pr-4 pl-10 text-[15px] text-ink placeholder:text-muted focus-visible:border-accent-text focus-visible:ring-2 focus-visible:ring-accent-soft focus-visible:outline-none"
              />
            </div>
            <div role="group" aria-label="Filtros" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 desk:mx-0 desk:flex-wrap desk:px-0">
              <Pill selected={onlyHigh} onClick={() => setOnlyHigh((v) => !v)}>
                Solo prioridad alta
              </Pill>
              <span aria-hidden className="mx-1 my-2 w-px shrink-0 bg-line" />
              <Pill selected={!subjectId} onClick={() => setSubjectId(null)}>
                Todas
              </Pill>
              {data.used.map((s) => (
                <Pill key={s.id} selected={subjectId === s.id} onClick={() => setSubjectId((c) => (c === s.id ? null : s.id))}>
                  <Dot color={subjectColorVar(s.color)} /> {s.name}
                </Pill>
              ))}
            </div>
          </div>

          <p className="text-sm text-muted" aria-live="polite">
            {data.list.length} {data.list.length === 1 ? "pregunta" : "preguntas"} · ordenadas por cuántas veces las tomaron
          </p>

          {data.list.length === 0 ? (
            <p className="rounded-card border border-dashed border-line px-6 py-10 text-center text-[15px] text-muted">
              Ninguna pregunta coincide con el filtro.
            </p>
          ) : (
            <ul className="flex flex-col gap-2">
              {data.list.slice(0, limit).map((q) => {
                const subject = data.subjects.get(q.subject_id);
                return (
                  <li key={q.id} className="flex gap-4 rounded-card-sm border border-line bg-surface p-4">
                    <div className="flex w-12 shrink-0 flex-col items-center pt-0.5 text-center">
                      <span className={cn("tabular font-display text-3xl leading-none font-bold", q.times_asked === 0 && "text-muted/60")}>
                        {q.times_asked}
                      </span>
                      <span className="mt-1 text-[11px] leading-tight text-muted">{q.times_asked === 1 ? "vez" : "veces"}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] leading-snug font-semibold">{q.text}</p>
                      <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-semibold text-muted">
                        {subject && (
                          <span className="inline-flex items-center gap-1.5">
                            <Dot color={subjectColorVar(subject.color)} className="size-2" /> {subject.name}
                          </span>
                        )}
                        {q.source && <span>· {q.source}</span>}
                        {q.priority === 1 && <Chip tone="accent">Prioridad alta</Chip>}
                      </p>
                      {q.model_answer && (
                        <details className="mt-2 text-sm">
                          <summary className="cursor-pointer font-semibold text-accent-text">Respuesta modelo</summary>
                          <p className="mt-1 whitespace-pre-line text-ink/85">{q.model_answer}</p>
                        </details>
                      )}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button variant="secondary" onClick={() => plusOne(q)} aria-label={`+1: la tomaron otra vez. “${q.text}”`}>
                          +1
                        </Button>
                        <Link href={`/simulacro?modo=suelta&pregunta=${q.id}`} className={buttonClasses({ variant: "secondary" })}>
                          <Mic aria-hidden /> Practicar
                        </Link>
                        <Button variant="ghost" onClick={() => setPanel({ kind: "card", question: q })}>
                          <Layers aria-hidden /> Pasar a tarjeta
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Editar “${q.text}”`} onClick={() => setPanel({ kind: "question", id: q.id })} className="text-muted">
                          <Pencil aria-hidden />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
          {data.list.length > limit && (
            <Button variant="ghost" className="self-center text-accent-text" onClick={() => setLimit((l) => l + PAGE)}>
              Ver {Math.min(PAGE, data.list.length - limit)} más
            </Button>
          )}
        </div>
      )}

      {panel?.kind === "question" && (
        <QuestionSheet
          key={panel.id ?? "new"}
          question={editing}
          subjects={sortedSubjects}
          findDuplicate={(text) => findDuplicate(db, text)}
          onClose={close}
          onIncrement={(id) => {
            const total = incrementAsked(id);
            close();
            toast({ message: `Sumada: la tomaron ${total} veces.`, actions: [{ label: "Deshacer", onClick: () => decrementAsked(id) }] });
          }}
          onSave={(input) => {
            if (editing) {
              updateQuestion(editing.id, input);
              toast({ message: "Guardado." });
            } else {
              createQuestion(input);
              toast({ message: "Anotada. Va a aparecer en el simulacro." });
            }
            close();
          }}
          onDelete={
            editing
              ? () => {
                  const removed = deleteQuestion(editing.id);
                  close();
                  toast({ message: "Borré la pregunta.", actions: [{ label: "Deshacer", onClick: () => restoreQuestion(removed) }] });
                }
              : undefined
          }
        />
      )}

      {panel?.kind === "import" && (
        <ImportBankSheet
          existingTexts={db.exam_questions.map((q) => q.text)}
          subjectNames={db.subjects.map((s) => s.name)}
          onClose={close}
          onImport={(rows) => {
            const r = importQuestions(rows);
            close();
            toast({
              message: `Importé ${r.added} ${r.added === 1 ? "pregunta" : "preguntas"}${r.duplicates ? ` (salteé ${r.duplicates} repetidas)` : ""}.`,
            });
          }}
        />
      )}

      {panel?.kind === "card" && (
        <CardSheet
          card={null}
          subjects={sortedSubjects}
          prefill={{ front: panel.question.text, back: panel.question.model_answer ?? "", subject_id: panel.question.subject_id }}
          onClose={close}
          onSave={(input) => {
            createCard(input, { source: "Pregunta", source_ref: panel.question.id });
            close();
            toast({ message: "Tarjeta creada. Ya está para repasar." });
          }}
        />
      )}
    </>
  );
}
