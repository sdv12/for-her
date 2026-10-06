"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import { Layers, Pencil, Plus, Repeat } from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button, buttonClasses } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Chip, Dot, Pill } from "@/components/ui/Pill";
import { useToast } from "@/components/ui/Toast";
import { cn } from "@/lib/cn";
import { createCard, deleteCard, restoreCard, updateCard } from "@/lib/mock/actions/cards";
import { useDB } from "@/lib/mock/store";
import { subjectColorVar } from "@/lib/subjects";
import { CardSheet } from "./CardSheet";

export function CardsView() {
  const db = useDB();
  const toast = useToast();
  const [deck, setDeck] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null | undefined>(undefined);

  const data = useMemo(() => {
    if (!db) return null;
    const now = new Date();
    const decks = [...db.subjects]
      .sort((a, b) => a.sort - b.sort)
      .map((s) => {
        const cards = db.cards.filter((c) => c.subject_id === s.id);
        return { subject: s, total: cards.length, due: cards.filter((c) => new Date(c.due_at) <= now).length };
      })
      .filter((d) => d.total > 0);
    const dueTotal = db.cards.filter((c) => new Date(c.due_at) <= now).length;
    const cards = db.cards
      .filter((c) => !deck || c.subject_id === deck)
      .sort((a, b) => a.due_at.localeCompare(b.due_at))
      .map((c) => ({ card: c, isDue: new Date(c.due_at) <= now, subject: db.subjects.find((s) => s.id === c.subject_id) }));
    return { decks, dueTotal, cards };
  }, [db, deck]);

  const header = (
    <PageHeader
      kicker="Estudiar"
      title="Tarjetas"
      actions={
        <>
          <Button variant="secondary" onClick={() => setOpen(null)} disabled={!db}>
            <Plus aria-hidden /> Nueva tarjeta
          </Button>
          {data && data.dueTotal > 0 && (
            <Link href="/tarjetas/repasar" className={buttonClasses({ variant: "primary" })}>
              <Repeat aria-hidden /> Repasar {data.dueTotal}
            </Link>
          )}
        </>
      }
    />
  );

  if (!db || !data) {
    return (
      <>
        {header}
        <div aria-busy="true" aria-label="Cargando" className="grid animate-pulse gap-3 desk:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-28 rounded-card bg-sunken" />
          ))}
        </div>
      </>
    );
  }

  const editing = open ? (db.cards.find((c) => c.id === open) ?? null) : null;

  return (
    <>
      {header}

      {db.cards.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="Todavía no hay tarjetas"
          action={
            <Button variant="primary" onClick={() => setOpen(null)}>
              <Plus aria-hidden /> Crear la primera
            </Button>
          }
        >
          Una pregunta de un lado, la respuesta con causa → mecanismo → consecuencia del otro. Arrancá con una sola: alcanza.
        </EmptyState>
      ) : (
        <div className="flex flex-col gap-6">
          <section aria-labelledby="mazos">
            <h2 id="mazos" className="mb-3 text-lg font-semibold">
              Mazos
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 desk:grid-cols-3">
              {data.decks.map(({ subject, total, due }) => (
                <li key={subject.id} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-4">
                  <p className="flex items-center gap-2 text-[15px] font-semibold">
                    <Dot color={subjectColorVar(subject.color)} /> {subject.name}
                  </p>
                  <p className="text-sm text-muted">
                    <span className="tabular">{total}</span> {total === 1 ? "tarjeta" : "tarjetas"} ·{" "}
                    <span className="tabular font-semibold text-ink">{due}</span> para hoy
                  </p>
                  <div className="mt-auto flex gap-2">
                    {due > 0 ? (
                      <Link href={`/tarjetas/repasar?mazo=${subject.id}`} className={buttonClasses({ variant: "primary", className: "flex-1" })}>
                        Repasar
                      </Link>
                    ) : (
                      <span className="flex min-h-11 flex-1 items-center text-sm text-muted">Al día</span>
                    )}
                    <Button variant="secondary" onClick={() => setDeck(subject.id)} aria-pressed={deck === subject.id}>
                      Ver
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="todas">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h2 id="todas" className="mr-2 text-lg font-semibold">
                {deck ? db.subjects.find((s) => s.id === deck)?.name : "Todas las tarjetas"}
              </h2>
              <Pill selected={!deck} onClick={() => setDeck(null)}>
                Todas
              </Pill>
            </div>
            <ul className="flex flex-col gap-2">
              {data.cards.map(({ card, isDue, subject }) => (
                <li key={card.id} className="flex items-start gap-3 rounded-card-sm border border-line bg-surface p-4">
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted">
                      {subject && (
                        <span className="inline-flex items-center gap-1.5">
                          <Dot color={subjectColorVar(subject.color)} className="size-2" /> {subject.name}
                        </span>
                      )}
                      <span className={cn(isDue && "text-accent-text")}>
                        {isDue ? "Para hoy" : `En ${formatDistanceToNowStrict(new Date(card.due_at), { locale: es })}`}
                      </span>
                    </p>
                    <p className="mt-1 text-[15px] leading-snug font-semibold">{card.front}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{card.back}</p>
                    {card.tags.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {card.tags.map((t) => (
                          <Chip key={t}>{t}</Chip>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button size="icon" variant="ghost" aria-label={`Editar “${card.front}”`} onClick={() => setOpen(card.id)} className="-mt-2 -mr-2 text-muted">
                    <Pencil aria-hidden />
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {open !== undefined && (
        <CardSheet
          key={open ?? "new"}
          card={editing}
          subjects={[...db.subjects].sort((a, b) => a.sort - b.sort)}
          defaultSubjectId={deck}
          onClose={() => setOpen(undefined)}
          onSave={(input) => {
            if (editing) {
              updateCard(editing.id, input);
              toast({ message: "Guardado." });
            } else {
              createCard(input);
              toast({ message: "Tarjeta creada. Ya está para repasar." });
            }
            setOpen(undefined);
          }}
          onDelete={
            editing
              ? () => {
                  const removed = deleteCard(editing.id);
                  setOpen(undefined);
                  toast({ message: "Borré la tarjeta.", actions: [{ label: "Deshacer", onClick: () => restoreCard(removed) }] });
                }
              : undefined
          }
        />
      )}
    </>
  );
}
