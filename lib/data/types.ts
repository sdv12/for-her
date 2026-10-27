/*
 * Modelo de datos (sección 7 del spec). Mismos nombres de tablas y columnas que tendrá Postgres,
 * sin user_id porque el mock es de una sola persona. Fechas: "YYYY-MM-DD"; timestamps: ISO.
 */

import type { SubjectColor } from "@/lib/subjects";

export type ISODate = string;
export type Timestamp = string;

type Row = { id: string; created_at: Timestamp; updated_at: Timestamp };

export type Profile = {
  display_name: string | null;
  exam_date: ISODate | null;
  daily_goal_min: number;
  theme: "system" | "light" | "dark";
};

export type Subject = Row & { name: string; color: SubjectColor; sort: number };

export type Plan = Row & { title: string; start_date: ISODate; is_active: boolean };
export type PlanPhase = Row & {
  plan_id: string;
  num: number;
  /** Código como figura en el cronograma ("2a", "3+4"). Opcional: si falta se muestra `num`. */
  code?: string | null;
  name: string;
  description: string | null;
  alert: string | null;
};
export type PlanWeek = Row & {
  plan_id: string;
  phase_id: string;
  num: number;
  start_date: ISODate;
  end_date: ISODate;
  title: string;
  /** "Tip del tribunal" de la semana (opcional). */
  tip?: string | null;
  /** Prioridad de la semana según el cronograma: "Alta", "Media", "Crítica"… (opcional). */
  priority?: string | null;
};
export type Weekday = "Lun" | "Mar" | "Mié" | "Jue" | "Vie" | "Sáb" | "Dom";
export type PlanDay = Row & {
  week_id: string;
  date: ISODate;
  weekday: Weekday;
  content: string;
  mode: string;
  done_at: Timestamp | null;
  sort: number;
};

export type TaskStatus = "pend" | "curso" | "repasar" | "dominado";
export type TaskKind = "lectura" | "resumen" | "tarjetas" | "simulacro" | "otro";
export type Task = Row & {
  title: string;
  subject_id: string | null;
  kind: TaskKind;
  status: TaskStatus;
  origin: "plan" | "mia";
  plan_day_id: string | null;
  due_date: ISODate | null;
  position: number;
  notes: string | null;
};

export type Card = Row & {
  subject_id: string;
  front: string;
  back: string;
  tags: string[];
  ease: number;
  interval_days: number;
  reps: number;
  due_at: Timestamp;
  source: string | null;
  source_ref: string | null;
};
export type CardReview = Row & {
  card_id: string;
  rating: "again" | "hard" | "good" | "easy";
  prev_interval: number;
  new_interval: number;
  reviewed_at: Timestamp;
};

export type ExamQuestion = Row & {
  text: string;
  subject_id: string;
  source: string | null;
  asked_on: ISODate | null;
  times_asked: number;
  /** 1 = alta, 2 = media, 3 = baja. */
  priority: 1 | 2 | 3;
  model_answer: string | null;
  follow_up: string | null;
};
export type Simulation = Row & {
  mode: "suelta" | "tribunal";
  session_id: string;
  stage: string | null;
  question_id: string | null;
  question_text: string;
  checks: Record<string, boolean>;
  rating: "flojo" | "aceptable" | "solido" | null;
  audio_path: string | null;
  duration_sec: number | null;
};

export type Mistake = Row & {
  text: string;
  correction: string;
  origin: "tarjeta" | "simulacro" | "tribunal" | "manual" | "caso";
  origin_ref: string | null;
  times: number;
  resolved_at: Timestamp | null;
};

export type Mood = "bien" | "normal" | "pesado";
export type StudyLog = Row & {
  date: ISODate;
  minutes: number;
  what: string;
  mood: Mood | null;
  plan_day_id: string | null;
};
export type FocusSession = Row & {
  task_id: string | null;
  mode: string;
  planned_sec: number;
  started_at: Timestamp;
  ended_at: Timestamp | null;
  completed: boolean;
};

/** Un caso clínico jugado (el contenido del caso es estático; acá queda el resultado). */
export type CaseAttempt = Row & {
  case_id: string;
  dx_attempts: number;
  /** Diagnósticos elegidos que no eran (para Errores y la devolución). */
  wrong_dx: string[];
  anamnesis: string[];
  exam: string[];
  studies: string[];
  management: string[];
  stars_dx: 1 | 2 | 3;
  stars_studies: 1 | 2 | 3;
  stars_management: 1 | 2 | 3;
  xp: number;
  minutes: number;
  /** Agregados después: pueden faltar en intentos viejos. */
  mode?: "examen" | "estudio";
  hints?: number;
  /** Diagnósticos que tenías en mente después del interrogatorio. */
  hypotheses?: string[];
  presentation?: string | null;
};

export type SyllabusTopic = Row & { subject_id: string; name: string; level: 0 | 1 | 2 | 3; sort: number };

export type DB = {
  version: 1;
  profile: Profile;
  subjects: Subject[];
  plans: Plan[];
  plan_phases: PlanPhase[];
  plan_weeks: PlanWeek[];
  plan_days: PlanDay[];
  tasks: Task[];
  cards: Card[];
  card_reviews: CardReview[];
  exam_questions: ExamQuestion[];
  simulations: Simulation[];
  mistakes: Mistake[];
  study_logs: StudyLog[];
  focus_sessions: FocusSession[];
  syllabus_topics: SyllabusTopic[];
  case_attempts: CaseAttempt[];
};
