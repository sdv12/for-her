import type { DB, ExamQuestion, PlanWeek } from "@/lib/data/types";
import type { PlanView } from "@/lib/plan";
import { fold } from "@/lib/plan-import/dates";
import { ejesForText } from "@/lib/programa/match";
import type { Eje, MateriaId } from "@/lib/programa/types";

/*
 * Cronograma integrado: toma TU cronograma (el que importaste) y tus preguntas de examen
 * (las del cronograma y las del banco) y les suma la capa del plan integrado:
 * - el eje clínico de cada semana,
 * - puentes entre semanas del mismo eje (lo básico con su clínica, y al revés),
 * - una materia transversal por semana (lo que el cronograma no tiene como semana propia),
 * - las preguntas de cada semana, y las de prioridad alta de hace 1 y 3 semanas para el sábado.
 * Se calcula: no cambia el cronograma ni las preguntas, y sirve para cualquier cronograma.
 */

export type Transversal = { name: string; materia: MateriaId | null; re: RegExp };

/** Materias que suelen no tener semana propia en un cronograma por sistemas, y cómo se reconocen en el banco. */
const T = {
  farmaco: { name: "Farmacología", materia: "farmacologia-1", re: /farmacolog|fco/ },
  semio: { name: "Semiología", materia: "semiologia", re: /semiolog/ },
  imagenes: { name: "Diagnóstico por imágenes", materia: null, re: /imagen/ },
  pato: { name: "Patología", materia: "patologia", re: /patolog|histolog/ },
  bacterio: { name: "Bacteriología y parasitología", materia: "infectologia", re: /bacteriolog|parasitolog|microbiolog/ },
  cirugia: { name: "Cirugía", materia: "cirugia", re: /cirug/ },
  mental: { name: "Salud mental", materia: null, re: /salud mental|psiquiatr/ },
  comunitaria: { name: "Salud comunitaria", materia: "salud-comunitaria-2", re: /salud comunitaria|epidemiolog/ },
  especialidades: { name: "Dermatología, ORL y oftalmología", materia: "dermatologia", re: /dermatolog|oftalmolog|\borl\b|urolog/ },
  pediatria: { name: "Pediatría", materia: "pediatria", re: /pediatr/ },
} satisfies Record<string, Transversal>;

/** Para cada eje, qué materias transversales pegan mejor (se rotan semana a semana). */
const TRANSVERSAL_BY_EJE: Record<string, Transversal[]> = {
  cardiovascular: [T.semio, T.farmaco, T.imagenes, T.comunitaria],
  respiratorio: [T.imagenes, T.semio, T.farmaco, T.bacterio],
  renal: [T.farmaco, T.pato, T.semio],
  diabetes: [T.farmaco, T.especialidades, T.comunitaria],
  infecciones: [T.bacterio, T.farmaco, T.comunitaria],
  neoplasias: [T.pato, T.imagenes, T.cirugia],
  embarazo: [T.pediatria, T.farmaco, T.comunitaria],
  trauma: [T.cirugia, T.imagenes, T.semio],
  neuro: [T.mental, T.semio, T.imagenes],
  piel: [T.especialidades, T.pato],
  hematologia: [T.pato, T.semio],
  "abdomen-agudo": [T.cirugia, T.imagenes],
  "digestiva-cronica": [T.cirugia, T.pato, T.semio],
  tiroides: [T.especialidades, T.pato],
  osteoarticular: [T.imagenes, T.cirugia],
  "salud-mental": [T.mental, T.farmaco],
  intoxicaciones: [T.farmaco, T.comunitaria],
  "salud-sexual": [T.comunitaria, T.bacterio],
  "recien-nacido": [T.pediatria, T.comunitaria],
  prevencion: [T.comunitaria, T.pediatria],
};
const DEFAULT_TRANSVERSAL = [T.semio, T.farmaco, T.pato, T.imagenes];

export type Puente = { week: PlanWeek; dir: "antes" | "despues" };

export type WeekInfo = {
  week: PlanWeek;
  eje: Eje | null;
  puentes: Puente[];
  transversal: Transversal;
  /** Preguntas de la semana (las del cronograma y las del banco que tratan su tema), alta prioridad primero. */
  questions: ExamQuestion[];
  /** Preguntas de la materia transversal. */
  transversalQuestions: ExamQuestion[];
  /** Para el sábado: las de prioridad alta de hace 1 y 3 semanas. */
  spaced: ExamQuestion[];
  /** Semanas de simulación (no suman contenido nuevo). */
  isSimulation: boolean;
};

const STOP = new Set(["cuales", "cuando", "donde", "porque", "entre", "sobre", "segun", "tiene", "tipos", "explica", "explicame", "describi", "describime", "definicion", "diferencias", "manejo", "tratamiento", "diagnostico", "clinica", "pregunta", "examen", "semana", "estudio", "active", "recall", "simulacion", "simulacion"]);

function tokens(text: string): Set<string> {
  return new Set(
    fold(text)
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 5 && !STOP.has(w))
      .map((w) => w.slice(0, 7)),
  );
}

function weekText(view: PlanView, w: PlanWeek): string {
  return [w.title, w.tip ?? "", ...(view.daysByWeek.get(w.id) ?? []).map((d) => d.content)].join(" · ");
}

const weekFromSource = (q: ExamQuestion): number | null => {
  const m = q.source?.match(/semana (\d+)/i);
  return m ? Number(m[1]) : null;
};

const byPriority = (a: ExamQuestion, b: ExamQuestion) => a.priority - b.priority || b.times_asked - a.times_asked;

export function integratePlan(db: DB, view: PlanView): Map<string, WeekInfo> {
  const weeks = view.weeks;
  const subjectName = new Map(db.subjects.map((s) => [s.id, fold(s.name)]));
  const isSim = (w: PlanWeek) => /simulaci/i.test(w.title) && (view.daysByWeek.get(w.id) ?? []).every((d) => /simulaci/i.test(d.mode));

  // 1. Eje de cada semana.
  const ejeOf = new Map<string, Eje | null>();
  const ejesOf = new Map<string, string[]>();
  const wTokens = new Map<string, Set<string>>();
  for (const w of weeks) {
    const text = weekText(view, w);
    const found = isSim(w) ? [] : ejesForText(text, 2);
    ejeOf.set(w.id, found[0] ?? null);
    ejesOf.set(w.id, found.map((e) => e.id));
    wTokens.set(w.id, tokens(`${w.title} ${(view.daysByWeek.get(w.id) ?? []).map((d) => d.content).join(" ")}`));
  }

  // 2. Preguntas por semana: las del cronograma por su número; las del banco, a la semana con más palabras en común.
  const qWeek = new Map<string, string>();
  const byNum = new Map(weeks.map((w) => [w.num, w]));
  for (const q of db.exam_questions) {
    const n = weekFromSource(q);
    if (n !== null && byNum.has(n)) {
      qWeek.set(q.id, byNum.get(n)!.id);
      continue;
    }
    // Además del texto, cuentan la subsección del banco ("Banco · Cardiovascular") y la materia.
    const qt = tokens(`${q.text} ${(q.source ?? "").replace(/banco( de preguntas)?/i, "")} ${subjectName.get(q.subject_id) ?? ""}`);
    let best: { id: string; score: number } | null = null;
    for (const w of weeks) {
      if (isSim(w)) continue;
      let score = 0;
      for (const t of qt) if (wTokens.get(w.id)!.has(t)) score++;
      if (score > (best?.score ?? 0)) best = { id: w.id, score };
    }
    if (best && best.score >= 2) qWeek.set(q.id, best.id);
  }
  const questionsOf = (w: PlanWeek) => db.exam_questions.filter((q) => qWeek.get(q.id) === w.id).sort(byPriority);

  // 3. Armado por semana.
  const info = new Map<string, WeekInfo>();
  weeks.forEach((w, i) => {
    const eje = ejeOf.get(w.id) ?? null;
    // Puente: otra semana que comparte el eje principal (o, si no hay, alguno de sus dos ejes).
    const mine = ejesOf.get(w.id) ?? [];
    const sharesMain = (x: PlanWeek) => !!eje && ejeOf.get(x.id)?.id === eje.id;
    const sharesAny = (x: PlanWeek) => (ejesOf.get(x.id) ?? []).some((id) => mine.includes(id));
    const others = weeks.filter((x) => x.id !== w.id && !isSim(x));
    const includesMain = (x: PlanWeek) => !!eje && (ejesOf.get(x.id) ?? []).includes(eje.id);
    const same = [sharesMain, includesMain, sharesAny].map((f) => others.filter(f)).find((list) => list.length) ?? [];
    const before = same.filter((x) => x.num < w.num).at(-1);
    const after = same.find((x) => x.num > w.num);
    const puentes: Puente[] = [...(before ? [{ week: before, dir: "antes" as const }] : []), ...(after ? [{ week: after, dir: "despues" as const }] : [])];
    const options = (eje && TRANSVERSAL_BY_EJE[eje.id]) || DEFAULT_TRANSVERSAL;
    const sameBefore = weeks.slice(0, i).filter((x) => ejeOf.get(x.id)?.id === eje?.id).length;
    const transversal = options[sameBefore % options.length];
    const transversalQuestions = db.exam_questions.filter((q) => transversal.re.test(subjectName.get(q.subject_id) ?? "") || transversal.re.test(fold(q.source ?? ""))).sort(byPriority);
    const spaced = [weeks[i - 1], weeks[i - 3]].filter(Boolean).flatMap((x) => questionsOf(x).filter((q) => q.priority === 1).slice(0, 3));
    info.set(w.id, { week: w, eje, puentes, transversal, questions: questionsOf(w), transversalQuestions, spaced, isSimulation: isSim(w) });
  });
  return info;
}
