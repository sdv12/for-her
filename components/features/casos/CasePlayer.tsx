"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Brain,
  Check,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  Hand,
  Lightbulb,
  MessagesSquare,
  Mic,
  Pill as PillIcon,
  Search,
  Stethoscope,
} from "lucide-react";
import { PageHeader } from "@/components/shell/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { TextAreaField } from "@/components/ui/Field";
import { Chip } from "@/components/ui/Pill";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { useToast } from "@/components/ui/Toast";
import { getCase } from "@/lib/cases";
import { FREQUENCY_LABEL, LEVEL_LABEL, nextHint, patientLabel, seededShuffle, type PlayMode } from "@/lib/cases/engine";
import type { CaseAction, CaseStudy, ClinicalCase, StudyGroup } from "@/lib/cases/types";
import { cn } from "@/lib/cn";
import { finishCase } from "@/lib/mock/actions/cases";
import { PatientIcon, RelevanceBadge } from "./bits";
import { Debrief, type Outcome } from "./Debrief";

const STEPS = [
  { id: "paciente", label: "Paciente", icon: Stethoscope },
  { id: "anamnesis", label: "Interrogatorio", icon: MessagesSquare },
  { id: "hipotesis", label: "Hipótesis", icon: Brain },
  { id: "examen", label: "Examen físico", icon: Hand },
  { id: "estudios", label: "Estudios", icon: FlaskConical },
  { id: "diagnostico", label: "Diagnóstico", icon: Search },
  { id: "conducta", label: "Conducta", icon: PillIcon },
  { id: "presentacion", label: "Presentación", icon: Mic },
  { id: "resolucion", label: "Resolución", icon: ClipboardList },
] as const;
type Step = (typeof STEPS)[number]["id"];
type HintStep = "anamnesis" | "examen" | "estudios";

const GROUPS: StudyGroup[] = ["Laboratorio", "Imágenes", "Electrofisiología", "Microbiología", "Otros"];
const MAX_HYPOTHESES = 3;

export function CasePlayer({ id }: { id: string }) {
  const c = getCase(id)!;
  // Cambiar de caso (o repetirlo) arranca de cero: el estado vive en Game, con key.
  const [round, setRound] = useState(0);
  return <Game key={`${id}-${round}`} c={c} round={round} onRetry={() => setRound((r) => r + 1)} />;
}

function Game({ c, round, onRetry }: { c: ClinicalCase; round: number; onRetry: () => void }) {
  const toast = useToast();
  const [step, setStep] = useState<Step>("paciente");
  const [mode, setMode] = useState<PlayMode>("examen");
  const [startedAt, setStartedAt] = useState(0);
  const [asked, setAsked] = useState<string[]>([]);
  const [hypotheses, setHypotheses] = useState<string[]>([]);
  const [examined, setExamined] = useState<string[]>([]);
  const [studies, setStudies] = useState<string[]>([]);
  const [wrongDx, setWrongDx] = useState<string[]>([]);
  const [dxDone, setDxDone] = useState(false);
  const [mgmt, setMgmt] = useState<string[]>([]);
  const [mgmtSent, setMgmtSent] = useState(false);
  const [presentation, setPresentation] = useState("");
  const [notes, setNotes] = useState("");
  const [hints, setHints] = useState(0);
  const [hinted, setHinted] = useState<Partial<Record<HintStep, string>>>({});
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  // Las opciones de diagnóstico se muestran mezcladas (el orden del archivo no debe dar pistas).
  const dxOptions = useMemo(() => seededShuffle(c.diagnosis.options, `${c.id}:${round}`), [c, round]);
  const study = mode === "estudio";

  function go(next: Step) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function askHint(s: HintStep, list: Array<CaseAction | CaseStudy>, done: string[]) {
    const h = nextHint(list, done);
    if (!h) {
      setHinted({ ...hinted, [s]: "" });
      return;
    }
    setHints(hints + 1);
    setHinted({ ...hinted, [s]: h.id });
  }

  function finish() {
    const minutes = Math.min(240, Math.round((Date.now() - startedAt) / 60000));
    try {
      const res = finishCase({
        caseId: c.id,
        dxAttempts: wrongDx.length + 1,
        wrongDx,
        anamnesis: asked,
        exam: examined,
        studies,
        management: mgmt,
        minutes,
        mode,
        hints,
        hypotheses,
        presentation: presentation || null,
      });
      setOutcome({ ...res, minutes });
      go("resolucion");
    } catch (e) {
      toast({ message: e instanceof Error ? e.message : "No pude guardar el caso." });
    }
  }

  const current = STEPS.findIndex((s) => s.id === step);
  const add = (list: string[], set: (v: string[]) => void, id: string) => set(list.includes(id) ? list : [...list, id]);
  const hintProps = (s: HintStep, list: Array<CaseAction | CaseStudy>, done: string[]) => ({
    hintId: hinted[s],
    onHint: () => askHint(s, list, done),
  });

  return (
    <>
      <PageHeader kicker={`Caso clínico · ${LEVEL_LABEL[c.level]}`} title={patientLabel(c.patient)} backHref="/casos" backLabel="Volver a casos" />

      <ol aria-label="Etapas del caso" className="-mx-4 mb-5 flex gap-1.5 overflow-x-auto px-4 pb-1 desk:mx-0 desk:flex-wrap desk:px-0">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <li
              key={s.id}
              aria-current={i === current ? "step" : undefined}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
                i === current ? "bg-accent text-accent-ink" : i < current ? "bg-sage-soft text-ink" : "bg-sunken text-muted",
              )}
            >
              {i < current ? <Check aria-hidden className="size-3.5" /> : <Icon aria-hidden className="size-3.5" />}
              {s.label}
            </li>
          );
        })}
      </ol>

      {step === "resolucion" && outcome ? (
        <Debrief c={c} outcome={outcome} picks={{ asked, examined, studies, mgmt, hypotheses, presentation }} onRetry={onRetry} />
      ) : (
        <div className="grid gap-5 desk:grid-cols-[minmax(0,1fr)_300px] desk:items-start">
          <div className="flex min-w-0 flex-col gap-4">
            {step !== "paciente" && study && (
              <p className="flex items-center gap-2 rounded-[12px] bg-accent-soft px-3 py-2 text-sm">
                <GraduationCap aria-hidden className="size-4 shrink-0" />
                Modo estudio: ves el porqué de cada decisión en el momento.
              </p>
            )}

            {step === "paciente" && (
              <Card className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <PatientIcon patient={c.patient} />
                  <div>
                    <p className="font-semibold">{patientLabel(c.patient)}</p>
                    <p className="text-sm text-muted">
                      {c.setting} · {c.area}
                    </p>
                  </div>
                </div>
                {c.patient.context && <p className="text-sm text-muted">{c.patient.context}</p>}
                <blockquote className="rounded-[12px] bg-sunken px-4 py-3 text-[15px] leading-relaxed">{c.intro}</blockquote>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold">¿Cómo lo querés jugar?</p>
                  <SegmentedControl
                    label="Modo de juego"
                    value={mode}
                    onChange={setMode}
                    options={[
                      { value: "examen", label: "Modo examen" },
                      { value: "estudio", label: "Modo estudio" },
                    ]}
                  />
                  <p className="text-sm text-muted">
                    {study
                      ? "Después de cada pregunta, maniobra o estudio te digo si era clave y por qué. Da la mitad de experiencia."
                      : "Decidís sin ayuda y la devolución llega al final, como en el examen. Da la experiencia completa."}
                  </p>
                </div>
                <p className="text-sm text-muted">
                  Vas a interrogar, plantear hipótesis, examinar, pedir estudios, decidir el diagnóstico y la conducta, y presentar el caso como frente
                  al tribunal. Pedí lo que harías de verdad: no suma pedir todo. Si te trabás, podés pedir una pista (descuenta un poco de experiencia).
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  className="self-start"
                  onClick={() => {
                    setStartedAt(Date.now());
                    go("anamnesis");
                  }}
                >
                  Empezar <ArrowRight aria-hidden />
                </Button>
              </Card>
            )}

            {step === "anamnesis" && (
              <ActionStep
                title="Interrogatorio"
                hint="Elegí qué preguntar. Cada respuesta queda en la conversación."
                actions={c.anamnesis}
                done={asked}
                onPick={(id) => add(asked, setAsked, id)}
                chat
                study={study}
                {...hintProps("anamnesis", c.anamnesis, asked)}
                next={{ label: "Plantear hipótesis", onClick: () => go("hipotesis") }}
              />
            )}

            {step === "hipotesis" && (
              <section aria-labelledby="hipo" className="flex flex-col gap-3">
                <div>
                  <h2 id="hipo" className="text-lg font-semibold">
                    ¿Qué estás pensando?
                  </h2>
                  <p className="text-sm text-muted">
                    Con lo que preguntaste, elegí hasta {MAX_HYPOTHESES} diagnósticos posibles. No hay devolución ahora: al final ves si lo tuviste en
                    mente desde el principio (y si acertaste, suma un bonus).
                  </p>
                </div>
                <ul className="flex flex-col gap-2">
                  {dxOptions.map((o) => {
                    const on = hypotheses.includes(o.id);
                    const full = !on && hypotheses.length >= MAX_HYPOTHESES;
                    return (
                      <li key={o.id} className="rounded-card-sm border border-line bg-surface px-4 py-1">
                        <Checkbox
                          label={o.label}
                          checked={on}
                          disabled={full}
                          onChange={() => setHypotheses(on ? hypotheses.filter((x) => x !== o.id) : [...hypotheses, o.id])}
                        />
                      </li>
                    );
                  })}
                </ul>
                <p className="text-sm text-muted" aria-live="polite">
                  {hypotheses.length} de {MAX_HYPOTHESES}
                </p>
                <Button variant="primary" size="lg" className="self-start" disabled={!hypotheses.length} onClick={() => go("examen")}>
                  Pasar al examen físico <ArrowRight aria-hidden />
                </Button>
              </section>
            )}

            {step === "examen" && (
              <ActionStep
                title="Examen físico"
                hint="Elegí qué examinar. Los hallazgos se suman a la ficha."
                actions={c.exam}
                done={examined}
                onPick={(id) => add(examined, setExamined, id)}
                study={study}
                {...hintProps("examen", c.exam, examined)}
                next={{ label: "Pasar a los estudios", onClick: () => go("estudios") }}
              />
            )}

            {step === "estudios" && (
              <section aria-labelledby="estudios" className="flex flex-col gap-4">
                <div>
                  <h2 id="estudios" className="text-lg font-semibold">
                    Estudios complementarios
                  </h2>
                  <p className="text-sm text-muted">
                    Pedí solo lo que cambia tu conducta. Al pedirlo ves el resultado. A veces lo correcto es no pedir nada.
                  </p>
                </div>
                <HintBox
                  hintId={hinted.estudios}
                  label={c.studies.find((s) => s.id === hinted.estudios)?.label}
                  verb="pedir"
                  onHint={() => askHint("estudios", c.studies, studies)}
                />
                {GROUPS.map((g) => {
                  const items = c.studies.filter((s) => s.group === g);
                  if (!items.length) return null;
                  return (
                    <div key={g} className="flex flex-col gap-2">
                      <h3 className="text-sm font-semibold text-muted">{g}</h3>
                      <ul className="flex flex-col gap-2">
                        {items.map((s) => (
                          <StudyItem
                            key={s.id}
                            s={s}
                            done={studies.includes(s.id)}
                            highlighted={hinted.estudios === s.id}
                            study={study}
                            onPick={() => add(studies, setStudies, s.id)}
                          />
                        ))}
                      </ul>
                    </div>
                  );
                })}
                <Button variant="primary" size="lg" className="self-start" onClick={() => go("diagnostico")}>
                  Tengo un diagnóstico <ArrowRight aria-hidden />
                </Button>
              </section>
            )}

            {step === "diagnostico" && (
              <section aria-labelledby="dx" className="flex flex-col gap-3">
                <div>
                  <h2 id="dx" className="text-lg font-semibold">
                    {c.diagnosis.prompt}
                  </h2>
                  <p className="text-sm text-muted">Si no es, te digo por qué y probás otra vez.</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {dxOptions.map((o) => {
                    const wrong = wrongDx.includes(o.id);
                    const right = dxDone && o.correct;
                    return (
                      <li key={o.id}>
                        <button
                          type="button"
                          disabled={wrong || dxDone}
                          onClick={() => (o.correct ? setDxDone(true) : setWrongDx([...wrongDx, o.id]))}
                          className={cn(
                            "w-full rounded-card-sm border px-4 py-3 text-left text-[15px] transition-colors",
                            right ? "border-sage bg-sage-soft" : wrong ? "border-line bg-sunken" : "border-line bg-surface hover:bg-sunken",
                            (wrong || dxDone) && "cursor-default",
                          )}
                        >
                          <span className={cn("font-semibold", wrong && "text-muted line-through decoration-1")}>{o.label}</span>
                          {hypotheses.includes(o.id) && !wrong && !right && (
                            <span className="ml-2 text-xs font-semibold text-muted">(estaba en tus hipótesis)</span>
                          )}
                          {(wrong || right) && <span className="mt-1 block text-sm leading-relaxed text-ink/85">{o.why}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <p aria-live="polite" className="text-sm font-semibold">
                  {dxDone ? "Eso es." : wrongDx.length ? "Todavía no. Mirá la ficha y probá otra." : ""}
                </p>
                {dxDone && (
                  <Button variant="primary" size="lg" className="self-start" onClick={() => go("conducta")}>
                    Definir la conducta <ArrowRight aria-hidden />
                  </Button>
                )}
              </section>
            )}

            {step === "conducta" && (
              <section aria-labelledby="mg" className="flex flex-col gap-3">
                <div>
                  <h2 id="mg" className="text-lg font-semibold">
                    {c.management.prompt}
                  </h2>
                  <p className="text-sm text-muted">Marcá todo lo que harías. Ojo con lo que puede hacer daño.</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {c.management.options.map((o) => {
                    const on = mgmt.includes(o.id);
                    return (
                      <li key={o.id} className={cn("rounded-card-sm border border-line bg-surface px-4 py-1", mgmtSent && "py-3")}>
                        {mgmtSent ? (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-start gap-2">
                              <span className={cn("min-w-0 flex-1 text-[15px]", on ? "font-semibold" : "text-muted")}>
                                {on ? "Elegiste: " : "No elegiste: "}
                                {o.label}
                              </span>
                              <RelevanceBadge value={o.relevance} />
                            </div>
                            {(on || o.relevance === "clave") && <p className="text-sm leading-relaxed text-ink/85">{o.why}</p>}
                          </div>
                        ) : (
                          <Checkbox label={o.label} checked={on} onChange={() => setMgmt(on ? mgmt.filter((x) => x !== o.id) : [...mgmt, o.id])} />
                        )}
                      </li>
                    );
                  })}
                </ul>
                {mgmtSent ? (
                  <Button variant="primary" size="lg" className="self-start" onClick={() => go("presentacion")}>
                    Presentar el caso <ArrowRight aria-hidden />
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" className="self-start" disabled={!mgmt.length} onClick={() => setMgmtSent(true)}>
                    Confirmar conducta
                  </Button>
                )}
              </section>
            )}

            {step === "presentacion" && (
              <section aria-labelledby="pres" className="flex flex-col gap-3">
                <div>
                  <h2 id="pres" className="text-lg font-semibold">
                    Presentalo como frente al tribunal
                  </h2>
                  <p className="text-sm text-muted">
                    Escribilo o decilo en voz alta: paciente y motivo, datos clave, examen, estudios, diagnóstico, diferenciales y conducta. En la
                    resolución lo comparás con una presentación modelo.
                  </p>
                </div>
                <TextAreaField
                  label="Tu presentación (opcional)"
                  rows={8}
                  value={presentation}
                  onChange={(e) => setPresentation(e.target.value)}
                  placeholder="Paciente de … años que consulta por …"
                />
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="lg" onClick={finish}>
                    Ver la resolución <ArrowRight aria-hidden />
                  </Button>
                  {!presentation && (
                    <Button variant="ghost" size="lg" onClick={finish}>
                      La dije en voz alta
                    </Button>
                  )}
                </div>
              </section>
            )}
          </div>

          <PatientChart c={c} asked={asked} examined={examined} studies={studies} hypotheses={hypotheses} notes={notes} onNotes={setNotes} />
        </div>
      )}
    </>
  );
}

function HintBox({ hintId, label, verb, onHint }: { hintId: string | undefined; label: string | undefined; verb: string; onHint: () => void }) {
  if (hintId === undefined) {
    return (
      <Button variant="ghost" className="self-start" onClick={onHint}>
        <Lightbulb aria-hidden /> Pedir una pista
      </Button>
    );
  }
  return (
    <p aria-live="polite" className="flex items-start gap-2 rounded-[12px] bg-honey-soft px-3 py-2.5 text-sm">
      <Lightbulb aria-hidden className="mt-0.5 size-4 shrink-0" />
      {hintId ? (
        <span>
          Pista: te conviene {verb} <b>«{label}»</b>.
        </span>
      ) : (
        <span>Ya cubriste todo lo clave de esta etapa. No te descuento nada.</span>
      )}
    </p>
  );
}

function StudyFeedback({ a }: { a: { relevance: CaseAction["relevance"]; why: string } }) {
  return (
    <div className="mt-2 flex items-start gap-2 border-t border-line pt-2">
      <RelevanceBadge value={a.relevance} />
      <p className="text-sm leading-relaxed text-ink/85">{a.why}</p>
    </div>
  );
}

function ActionStep({
  title,
  hint,
  actions,
  done,
  onPick,
  chat,
  study,
  hintId,
  onHint,
  next,
}: {
  title: string;
  hint: string;
  actions: CaseAction[];
  done: string[];
  onPick: (id: string) => void;
  chat?: boolean;
  study: boolean;
  hintId: string | undefined;
  onHint: () => void;
  next: { label: string; onClick: () => void };
}) {
  const asked = done.map((id) => actions.find((a) => a.id === id)!);
  const pending = actions.filter((a) => !done.includes(a.id));
  return (
    <section aria-label={title} className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-muted">{hint}</p>
      </div>

      {asked.length > 0 && (
        <ol aria-live="polite" className="flex flex-col gap-3">
          {asked.map((a) =>
            chat ? (
              <li key={a.id} className="flex flex-col gap-1.5">
                <p className="max-w-[85%] self-end rounded-[16px] rounded-br-[4px] bg-accent px-3.5 py-2 text-[15px] text-accent-ink">{a.label}</p>
                <div className="max-w-[85%] self-start rounded-[16px] rounded-bl-[4px] bg-sunken px-3.5 py-2 text-[15px] leading-relaxed">
                  {a.result}
                  {study && <StudyFeedback a={a} />}
                </div>
              </li>
            ) : (
              <li key={a.id} className="rounded-card-sm border border-line bg-surface px-4 py-3">
                <p className="text-xs font-semibold text-muted">{a.label}</p>
                <p className="mt-0.5 text-[15px] leading-relaxed">{a.result}</p>
                {study && <StudyFeedback a={a} />}
              </li>
            ),
          )}
        </ol>
      )}

      {pending.length > 0 && (
        <div role="group" aria-label={chat ? "Preguntas posibles" : "Maniobras posibles"} className="flex flex-wrap gap-2">
          {pending.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onPick(a.id)}
              className={cn(
                "min-h-11 rounded-[14px] border bg-surface px-3.5 py-2 text-left text-sm font-medium transition-colors hover:bg-sunken",
                hintId === a.id ? "border-honey ring-2 ring-honey" : "border-line",
              )}
            >
              {a.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="primary" size="lg" onClick={next.onClick} disabled={!done.length}>
          {next.label} <ArrowRight aria-hidden />
        </Button>
        <HintBox hintId={hintId} label={actions.find((a) => a.id === hintId)?.label} verb={chat ? "preguntar" : "hacer"} onHint={onHint} />
      </div>
    </section>
  );
}

function StudyItem({ s, done, highlighted, study, onPick }: { s: CaseStudy; done: boolean; highlighted: boolean; study: boolean; onPick: () => void }) {
  if (done) {
    return (
      <li className="rounded-card-sm border border-line bg-surface px-4 py-3">
        <p className="text-xs font-semibold text-muted">{s.label}</p>
        <p className="mt-0.5 text-[15px] leading-relaxed">{s.result}</p>
        {study && <StudyFeedback a={s} />}
      </li>
    );
  }
  return (
    <li>
      <button
        type="button"
        onClick={onPick}
        className={cn(
          "flex min-h-11 w-full items-center justify-between gap-3 rounded-card-sm border border-dashed px-4 py-2 text-left text-[15px] transition-colors hover:bg-sunken",
          highlighted ? "border-honey ring-2 ring-honey" : "border-line",
        )}
      >
        {s.label}
        <span className="shrink-0 text-xs font-semibold text-accent-text">Pedir</span>
      </button>
    </li>
  );
}

function PatientChart({
  c,
  asked,
  examined,
  studies,
  hypotheses,
  notes,
  onNotes,
}: {
  c: ClinicalCase;
  asked: string[];
  examined: string[];
  studies: string[];
  hypotheses: string[];
  notes: string;
  onNotes: (v: string) => void;
}) {
  const vitals = Object.entries(c.vitals);
  const findings = c.exam.filter((a) => examined.includes(a.id));
  const results = c.studies.filter((s) => studies.includes(s.id));
  const hypo = c.diagnosis.options.filter((o) => hypotheses.includes(o.id));
  const total = asked.length + findings.length + results.length;
  const body = (
    <div className="flex flex-col gap-3 text-sm">
      <div className="flex flex-wrap gap-1.5">
        <Chip>{c.setting}</Chip>
        <Chip tone="sage">{FREQUENCY_LABEL[c.frequency]}</Chip>
      </div>
      {c.patient.context && <p className="text-muted">{c.patient.context}</p>}
      {vitals.length > 0 && (
        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5">
          {vitals.map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs text-muted">{k}</dt>
              <dd className="tabular font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      )}
      {asked.length > 0 && (
        <p className="text-xs text-muted">
          Interrogatorio: {asked.length} {asked.length === 1 ? "pregunta" : "preguntas"}
        </p>
      )}
      {hypo.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted">Tus hipótesis</p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {hypo.map((h) => (
              <li key={h.id}>
                <Chip tone="accent">{h.label}</Chip>
              </li>
            ))}
          </ul>
        </div>
      )}
      {findings.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted">Examen</p>
          <ul className="mt-1 flex list-disc flex-col gap-1 pl-4">
            {findings.map((f) => (
              <li key={f.id}>{f.result}</li>
            ))}
          </ul>
        </div>
      )}
      {results.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted">Estudios</p>
          <ul className="mt-1 flex list-disc flex-col gap-1 pl-4">
            {results.map((s) => (
              <li key={s.id}>
                <b>{s.label}:</b> {s.result}
              </li>
            ))}
          </ul>
        </div>
      )}
      <TextAreaField label="Mis notas" rows={3} value={notes} onChange={(e) => onNotes(e.target.value)} placeholder="Lo que te llama la atención…" />
    </div>
  );
  return (
    <>
      <details className="order-first rounded-card border border-line bg-surface desk:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
          Ficha del paciente
          <span className="text-xs text-muted">
            {total} {total === 1 ? "dato" : "datos"}
          </span>
        </summary>
        <div className="border-t border-line p-4">{body}</div>
      </details>
      <aside aria-label="Ficha del paciente" className="sticky top-6 hidden max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-card border border-line bg-surface p-5 desk:block">
        <p className="mb-3 font-semibold">Ficha del paciente</p>
        {body}
      </aside>
    </>
  );
}
