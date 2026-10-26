import { addDays, addMinutes } from "date-fns";
import type { DB, ExamQuestion, Mistake, PlanDay, PlanWeek, StudyLog, SyllabusTopic, Task, Weekday } from "@/lib/data/types";
import { dateForWeekday } from "@/lib/plan-import/dates";
import { kindFromMode } from "@/lib/plan";
import { BASE_SUBJECT_COLORS } from "@/lib/subjects";

/*
 * Seed de desarrollo (sección 9 del spec) en versión mock.
 * Cuando haya backend, esto mismo pasa a supabase/seed.sql.
 */

type WeekSeed = {
  num: number;
  start: string;
  end: string;
  title: string;
  subject: string;
  days: Array<[Weekday, string, string]>;
};

const WEEKS: WeekSeed[] = [
  {
    num: 1,
    start: "2026-10-01",
    end: "2026-10-07",
    title: "Anatomía del tórax: lo que el tribunal pide",
    subject: "Anatomía",
    days: [
      ["Lun", "Tráquea: relaciones (esófago, grandes vasos, recurrentes), bronquios principales", "Estudio + recall oral"],
      ["Mar", "Anatomía cardíaca: cavidades, válvulas, conducción, irrigación coronaria", "Estudio + esquema"],
      ["Mié", "Pulmones, segmentos, hilio; mediastino", "Estudio + recall"],
      ["Jue", "Repaso de tórax completo en voz alta", "Active recall puro"],
      ["Vie", "Simulación: “Describime la tráquea y sus relaciones”", "Simulación oral"],
    ],
  },
  {
    num: 2,
    start: "2026-10-08",
    end: "2026-10-14",
    title: "Abdomen y retroperitoneo",
    subject: "Anatomía",
    days: [
      ["Lun", "Peritoneo y cavidad abdominal: compartimentos, transcavidad de los epiplones", "Estudio + esquema"],
      ["Mar", "Irrigación digestiva: tronco celíaco, mesentéricas, sistema porta", "Estudio + recall oral"],
      ["Mié", "Retroperitoneo: riñón, uréteres, suprarrenales, grandes vasos", "Estudio + recall"],
      ["Jue", "Repaso de abdomen en voz alta", "Active recall puro"],
      ["Vie", "Simulación: “Describime la irrigación del intestino”", "Simulación oral"],
    ],
  },
  {
    num: 3,
    start: "2026-10-15",
    end: "2026-10-21",
    title: "Fisiología cardiovascular",
    subject: "Fisiología",
    days: [
      ["Lun", "Ciclo cardíaco y curvas presión-volumen", "Estudio + esquema"],
      ["Mar", "Gasto cardíaco: precarga, poscarga, contractilidad y frecuencia", "Estudio + recall oral"],
      ["Mié", "Frank-Starling y por qué se aplana en la insuficiencia cardíaca", "Estudio + recall"],
      ["Jue", "Simulación: “¿Qué es el gasto cardíaco y cómo se regula?”", "Simulación oral"],
    ],
  },
];

/** Días del seed que ya pasaron y se marcan hechos (jue 1 y vie 2 de octubre). */
const DONE_DATES = new Set(["2026-10-01", "2026-10-02"]);

export function buildSeed(now: Date = new Date()): DB {
  const ts = now.toISOString();
  const row = () => ({ id: crypto.randomUUID(), created_at: ts, updated_at: ts });

  const subjects = Object.entries(BASE_SUBJECT_COLORS).map(([name, color], i) => ({ ...row(), name, color, sort: i }));
  const sid = (name: string) => subjects.find((s) => s.name === name)!.id;

  const plan = { ...row(), title: "Cronograma examen integrador", start_date: "2026-10-01", is_active: true };
  const phase = {
    ...row(),
    plan_id: plan.id,
    num: 1,
    code: "1",
    name: "Básicas con foco clínico",
    description: "Sin profundidad de libro, con lógica clínica.",
    alert: "El examen arranca siempre por acá.",
  };

  const plan_weeks: PlanWeek[] = [];
  const plan_days: PlanDay[] = [];
  const tasks: Task[] = [];
  const study_logs: StudyLog[] = [];

  for (const w of WEEKS) {
    const week = { ...row(), plan_id: plan.id, phase_id: phase.id, num: w.num, start_date: w.start, end_date: w.end, title: w.title };
    plan_weeks.push(week);
    w.days.forEach(([weekday, content, mode], i) => {
      const date = dateForWeekday(w.start, w.end, weekday)!;
      const done = DONE_DATES.has(date);
      const day: PlanDay = { ...row(), week_id: week.id, date, weekday, content, mode, done_at: done ? ts : null, sort: i };
      plan_days.push(day);
      tasks.push({
        ...row(),
        title: content,
        subject_id: sid(w.subject),
        kind: kindFromMode(mode),
        status: done ? "repasar" : "pend",
        origin: "plan",
        plan_day_id: day.id,
        due_date: date,
        position: tasks.length + 1,
        notes: null,
      });
      if (done) {
        study_logs.push({ ...row(), date, minutes: date === "2026-10-01" ? 60 : 45, what: content, mood: "normal" as const, plan_day_id: day.id });
      }
    });
  }

  const cardSeeds: Array<[string, string, string, string[], number]> = [
    [
      "Anatomía",
      "¿Cuáles son las relaciones de la tráquea?",
      "Anterior: istmo tiroideo en el cuello; tronco braquiocefálico, cayado aórtico y timo en el tórax. Posterior: esófago. Laterales: lóbulos tiroideos y carótidas; a la derecha, vena ácigos y vago; a la izquierda, cayado aórtico. Nervios laríngeos recurrentes en el surco traqueoesofágico.",
      ["tórax", "tráquea"],
      0,
    ],
    [
      "Anatomía",
      "Recorrido del sistema de conducción cardíaco",
      "Nódulo sinusal → vías internodales → nódulo AV (retraso fisiológico) → haz de His → ramas derecha e izquierda (fascículos anterior y posterior) → fibras de Purkinje.",
      ["corazón"],
      0,
    ],
    [
      "Anatomía",
      "Territorio de la arteria descendente anterior",
      "Cara anterior del VI, dos tercios anteriores del tabique interventricular y ápex. Oclusión → infarto anterior / anteroseptal (V1–V4).",
      ["corazón", "coronarias"],
      3,
    ],
    [
      "Fisiología",
      "Frank-Starling en la insuficiencia cardíaca",
      "Causa: daño miocárdico con menor contractilidad. Mecanismo: la curva se aplana y baja; más precarga ya no aumenta el volumen sistólico, solo la presión de llenado. Consecuencia clínica: congestión (edema pulmonar) sin mejora del gasto.",
      ["IC", "gasto cardíaco"],
      0,
    ],
  ];
  const cards = cardSeeds.map(([subject, front, back, tags, dueInDays]) => ({
    ...row(),
    subject_id: sid(subject),
    front,
    back,
    tags,
    ease: 2.5,
    interval_days: dueInDays,
    reps: dueInDays > 0 ? 1 : 0,
    due_at: (dueInDays > 0 ? addDays(now, dueInDays) : addMinutes(now, -30)).toISOString(),
    source: "Seed",
    source_ref: null,
  }));

  const q = (subject: string, text: string, times_asked: number, priority: 1 | 2 | 3, source: string, follow_up: string | null = null): ExamQuestion => ({
    ...row(),
    text,
    subject_id: sid(subject),
    source,
    asked_on: null,
    times_asked,
    priority,
    model_answer: null,
    follow_up,
  });
  const exam_questions = [
    q("Anatomía", "Describime la tráquea y sus relaciones", 3, 1, "Examen de un compañero"),
    q("Bioquímica", "Explicame el ciclo de Krebs y su regulación", 2, 1, "Grupo de WhatsApp"),
    q("Fisiología", "¿Qué es el gasto cardíaco y de qué depende?", 2, 1, "Examen de un compañero"),
    q(
      "Clínica",
      "Insuficiencia cardíaca: fisiopatología y tratamiento",
      2,
      1,
      "Examen de un compañero",
      "¿Por qué los IECA mejoran la sobrevida en la insuficiencia cardíaca?",
    ),
    q("Clínica", "¿Qué diferencia hay entre un SCACEST y un SCASEST?", 1, 2, "Grupo de WhatsApp"),
    q("Salud comunitaria", "Incidencia vs prevalencia; mortalidad vs letalidad", 1, 2, "Grupo de WhatsApp"),
  ];

  const m = (text: string, correction: string, origin: Mistake["origin"], times: number): Mistake => ({
    ...row(),
    text,
    correction,
    origin,
    origin_ref: null,
    times,
    resolved_at: null,
  });
  const mistakes = [
    m(
      "Confundí la irrigación de la circunfleja con la de la coronaria derecha",
      "Circunfleja: cara lateral y posterior del VI. Coronaria derecha: VD, cara inferior del VI y, en la mayoría, los nódulos sinusal y AV.",
      "simulacro",
      2,
    ),
    m(
      "No ubiqué los nervios recurrentes en relación con la tráquea",
      "Suben por el surco traqueoesofágico. El izquierdo rodea el cayado aórtico; el derecho, la subclavia derecha.",
      "tarjeta",
      1,
    ),
    m(
      "No pude explicar por qué se aplana Frank-Starling en la IC",
      "Por la pérdida de contractilidad: el miocardio ya no responde a más estiramiento. Subir la precarga solo aumenta la presión de fin de diástole y produce congestión.",
      "manual",
      1,
    ),
  ];

  const topicSeeds: Record<string, Array<[string, SyllabusTopic["level"]]>> = {
    Anatomía: [["Tráquea y bronquios", 3], ["Corazón", 2], ["Pulmones y mediastino", 1], ["Abdomen", 0], ["Retroperitoneo", 0]],
    Bioquímica: [["Ciclo de Krebs", 1], ["Glucólisis", 2], ["Beta-oxidación", 0]],
    Fisiología: [["Gasto cardíaco", 2], ["Ciclo cardíaco", 1], ["Fisiología renal", 0]],
    Clínica: [["Insuficiencia cardíaca", 1], ["Síndrome coronario agudo", 1], ["Infectología", 0], ["Ginecología", 0]],
    "Salud comunitaria": [["Incidencia y prevalencia", 1], ["Mortalidad y letalidad", 0]],
  };
  const syllabus_topics = Object.entries(topicSeeds).flatMap(([subject, topics]) =>
    topics.map(([name, level], i) => ({ ...row(), subject_id: sid(subject), name, level, sort: i })),
  );

  return {
    version: 1,
    profile: { display_name: null, exam_date: null, daily_goal_min: 60, theme: "system" },
    subjects,
    plans: [plan],
    plan_phases: [phase],
    plan_weeks,
    plan_days,
    tasks,
    cards,
    card_reviews: [],
    exam_questions,
    simulations: [],
    mistakes,
    study_logs,
    focus_sessions: [],
    syllabus_topics,
    case_attempts: [],
  };
}
