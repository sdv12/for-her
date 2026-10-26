"use client";

import { useMemo, useState } from "react";
import { Check, Layers, NotebookPen, Pencil, Plus, Repeat, RotateCcw } from "lucide-react";
import { CardSheet } from "@/components/features/tarjetas/CardSheet";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pill } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import type { Mistake } from "@/lib/data/types";
import { timeAgo } from "@/lib/dates";
import { createCard } from "@/lib/mock/actions/cards";
import { createMistake, deleteMistake, reopenMistake, resolveMistake, restoreMistake, updateMistake } from "@/lib/mock/actions/mistakes";
import { useDB } from "@/lib/mock/store";
import { mistakeQuestion, mistakeSubjectId, ORIGIN_LABEL, sortOpenMistakes } from "@/lib/mistakes";
import { MistakeReview } from "./MistakeReview";
import { MistakeSheet } from "./MistakeSheet";

type Origin = Mistake["origin"] | "todos";
type Panel = { kind: "edit"; id: string | null } | { kind: "card"; mistake: Mistake } | null;

const ORIGINS: Array<[Origin, string]> = [
  ["todos", "Todos"],
  ["tarjeta", "Tarjetas"],
  ["simulacro", "Simulacro"],
  ["tribunal", "Tribunal"],
  ["caso", "Casos"],
  ["manual", "Anotados"],
];

export function MistakesView() {
  const db = useDB();
  const toast = useToast();
  const [origin, setOrigin] = useState<Origin>("todos");
  const [reviewing, setReviewing] = useState(false);
  const [panel, setPanel] = useState<Panel>(null);

  const data = useMemo(() => {
    if (!db) return null;
    const open = sortOpenMistakes(db.mistakes);
    const resolved = db.mistakes.filter((m) => m.resolved_at).sort((a, b) => (b.resolved_at ?? "").localeCompare(a.resolved_at ?? ""));
    return { open, visible: open.filter((m) => origin === "todos" || m.origin === origin), resolved };
  }, [db, origin]);

  const header = (
    <PageHeader
      kicker="Juntar"
      title="Errores"
      backHref="/mas"
      backLabel="Volver a Más"
      actions={
        !reviewing && (
          <Button variant="secondary" onClick={() => setPanel({ kind: "edit", id: null })} disabled={!db}>
            <Plus aria-hidden /> Anotar un error
          </Button>
        )
      }
    />
  );

  if (!db || !data) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="flex animate-pulse flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-36 rounded-card-sm bg-sunken" />
          ))}
        </div>
      </>
    );
  }

  if (reviewing) {
    return (
      <>
        {header}
        <MistakeReview db={db} onExit={() => setReviewing(false)} />
      </>
    );
  }

  function resolve(m: Mistake) {
    resolveMistake(m.id);
    toast({ message: "Bien ahí. Salió de la lista.", actions: [{ label: "Deshacer", onClick: () => reopenMistake(m.id) }] });
  }

  const editing = panel?.kind === "edit" && panel.id ? (db.mistakes.find((m) => m.id === panel.id) ?? null) : null;
  const subjects = [...db.subjects].sort((a, b) => a.sort - b.sort);

  return (
    <>
      {header}

      <div className="flex flex-col gap-6">
        <Card tone="sunken" className="flex flex-col gap-4 desk:flex-row desk:items-center">
          <p className="flex-1 text-[15px]">
            Se llena solo con lo que marcás <b>“Otra vez”</b> o <b>“Flojo”</b>. Repasalo antes de cada simulacro.
          </p>
          <Button variant="primary" onClick={() => setReviewing(true)} disabled={data.open.length === 0}>
            <Repeat aria-hidden /> Repasar errores{data.open.length > 0 && ` (${data.open.length})`}
          </Button>
        </Card>

        {data.open.length === 0 ? (
          <EmptyState
            icon={NotebookPen}
            title="No hay errores abiertos"
            action={
              <Button variant="secondary" onClick={() => setPanel({ kind: "edit", id: null })}>
                <Plus aria-hidden /> Anotar uno a mano
              </Button>
            }
          >
            Cuando algo no te salga en una tarjeta o en un simulacro, aparece acá con su corrección.
          </EmptyState>
        ) : (
          <section aria-labelledby="abiertos" className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 id="abiertos" className="text-lg font-semibold">
                Abiertos <span className="tabular text-muted">· {data.open.length}</span>
              </h2>
            </div>
            <div role="group" aria-label="Filtrar por origen" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 desk:mx-0 desk:flex-wrap desk:px-0">
              {ORIGINS.map(([value, label]) => (
                <Pill key={value} selected={origin === value} onClick={() => setOrigin(value)}>
                  {label}
                </Pill>
              ))}
            </div>
            {data.visible.length === 0 ? (
              <p className="rounded-card border border-dashed border-line px-6 py-8 text-center text-[15px] text-muted">Nada abierto con ese origen.</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {data.visible.map((m) => (
                  <li key={m.id} className="rounded-card-sm border border-line bg-surface p-4 desk:p-5">
                    <p className="text-xs font-semibold text-muted">
                      {ORIGIN_LABEL[m.origin]} · {m.times === 1 ? "1 vez" : `${m.times} veces`} · {timeAgo(m.updated_at)}
                    </p>
                    <p className="mt-1 text-[15px] leading-snug font-semibold">{m.text}</p>
                    <p className="mt-2 rounded-[12px] bg-sage-soft px-3 py-2.5 text-sm leading-relaxed whitespace-pre-line">{m.correction}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="primary" onClick={() => resolve(m)}>
                        <Check aria-hidden /> Ya lo tengo
                      </Button>
                      <Button variant="ghost" onClick={() => setPanel({ kind: "card", mistake: m })}>
                        <Layers aria-hidden /> Pasar a tarjeta
                      </Button>
                      <Button variant="ghost" onClick={() => setPanel({ kind: "edit", id: m.id })}>
                        <Pencil aria-hidden /> Editar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {data.resolved.length > 0 && (
          <details className="group rounded-card border border-line bg-surface">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
              Ya los tenés <span className="tabular text-sm text-muted">{data.resolved.length}</span>
            </summary>
            <ul className="divide-y divide-line border-t border-line">
              {data.resolved.slice(0, 30).map((m) => (
                <li key={m.id} className="flex items-start gap-3 px-4 py-3">
                  <p className="min-w-0 flex-1 text-sm text-muted">{m.text}</p>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      reopenMistake(m.id);
                      toast({ message: "Lo volví a abrir." });
                    }}
                    className="shrink-0 text-sm"
                  >
                    <RotateCcw aria-hidden /> Volver a abrir
                  </Button>
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {panel?.kind === "edit" && (
        <MistakeSheet
          key={panel.id ?? "new"}
          mistake={editing}
          onClose={() => setPanel(null)}
          onSave={(input) => {
            if (editing) {
              updateMistake(editing.id, input);
              toast({ message: "Guardado." });
            } else {
              createMistake(input);
              toast({ message: "Anotado. Va a estar en el próximo repaso." });
            }
            setPanel(null);
          }}
          onDelete={
            editing
              ? () => {
                  const removed = deleteMistake(editing.id);
                  setPanel(null);
                  toast({ message: "Borré el error.", actions: [{ label: "Deshacer", onClick: () => restoreMistake(removed) }] });
                }
              : undefined
          }
        />
      )}

      {panel?.kind === "card" && (
        <CardSheet
          card={null}
          subjects={subjects}
          prefill={{
            front: mistakeQuestion(panel.mistake.text),
            back: panel.mistake.correction,
            subject_id: mistakeSubjectId(db, panel.mistake) ?? subjects[0]?.id ?? "",
          }}
          onClose={() => setPanel(null)}
          onSave={(input) => {
            createCard(input, { source: "Error", source_ref: panel.mistake.id });
            setPanel(null);
            toast({ message: "Tarjeta creada. Ya está para repasar." });
          }}
        />
      )}
    </>
  );
}
