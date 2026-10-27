/*
 * Casos clínicos: contenido estático (no es dato de la persona) + el progreso, que sí va a la base (case_attempts).
 * Cada caso se juega en etapas: interrogatorio → examen físico → estudios → diagnóstico → conducta → resolución.
 */

export type CaseLevel = 1 | 2 | 3 | 4;
export type Sex = "F" | "M";
export type Frequency = "muy-frecuente" | "frecuente" | "poco-frecuente" | "raro";
export type Setting = "Guardia" | "Consultorio" | "CAPS" | "Internación" | "Domicilio";

export type CaseArea =
  | "Cardiovascular"
  | "Respiratorio"
  | "Infectología"
  | "Nefrourología"
  | "Endocrinología"
  | "Gastroenterología"
  | "Neurología"
  | "Ginecología y obstetricia"
  | "Pediatría"
  | "Hematología"
  | "Cirugía"
  | "Toxicología"
  | "Traumatología"
  | "Salud mental"
  | "Dermatología"
  | "Reumatología"
  | "Oftalmología"
  | "Alergia e inmunología"
  | "Oncología"
  | "Salud comunitaria";

/**
 * Qué tan pertinente es una acción para este caso:
 * - clave: lo que no puede faltar.
 * - util: suma, pero no define.
 * - neutro: no cambia nada (no penaliza).
 * - innecesario: no aporta en este caso (gasta tiempo/recursos).
 * - riesgoso: puede dañar o retrasar lo urgente.
 */
export type Relevance = "clave" | "util" | "neutro" | "innecesario" | "riesgoso";

export type CaseAction = {
  id: string;
  label: string;
  /** Lo que se obtiene al hacerlo: la respuesta del paciente, el hallazgo o el resultado. */
  result: string;
  relevance: Relevance;
  /** Por qué es (o no) pertinente. Se muestra en la resolución. */
  why: string;
};

export type StudyGroup = "Laboratorio" | "Imágenes" | "Electrofisiología" | "Microbiología" | "Otros";
export type CaseStudy = CaseAction & { group: StudyGroup };

export type DiagnosisOption = {
  id: string;
  label: string;
  correct: boolean;
  /** Si es el correcto: por qué. Si no: por qué no es lo más probable (se muestra al elegirlo). */
  why: string;
};

export type ManagementOption = {
  id: string;
  label: string;
  relevance: Relevance;
  why: string;
};

export type Vitals = Partial<{
  TA: string;
  FC: string;
  FR: string;
  "T°": string;
  "SatO₂": string;
  Peso: string;
  Glucemia: string;
  Glasgow: string;
}>;

export type Pathology = {
  name: string;
  /** "principal" = el diagnóstico del caso; "diferencial" = lo que hay que descartar; "asociada" = complicación o comorbilidad. */
  role: "principal" | "diferencial" | "asociada";
  why: string;
};

export type ClinicalCase = {
  id: string;
  level: CaseLevel;
  area: CaseArea;
  setting: Setting;
  patient: { age: number; ageUnit: "días" | "meses" | "años"; sex: Sex; context?: string };
  /** Qué tan frecuente es este cuadro en esta edad y sexo. */
  frequency: Frequency;
  /** Motivo de consulta: lo que se ve al empezar (no revela el diagnóstico). */
  intro: string;
  vitals: Vitals;
  anamnesis: CaseAction[];
  exam: CaseAction[];
  studies: CaseStudy[];
  diagnosis: { prompt: string; options: DiagnosisOption[] };
  management: { prompt: string; options: ManagementOption[] };
  debrief: {
    /** Diagnóstico final, como se diría en el examen. */
    diagnosis: string;
    pathologies: Pathology[];
    /** Causa → mecanismo → consecuencia clínica, en pasos. */
    reasoning: string[];
    /** Por qué en esta edad y sexo: frecuencia, factores de riesgo. */
    epidemiology: string;
    /** Conducta según normativas y consensos usados en Argentina, en orden. */
    management: string[];
    /** Fuentes (normativas, guías y consensos de referencia en Argentina). */
    sources: string[];
    /** Perlas para el tribunal. */
    pearls: string[];
    /** Errores frecuentes. */
    pitfalls: string[];
    /** Lo que te puede preguntar el tribunal sobre el tema, con respuesta modelo. */
    tribunal?: TribunalQA[];
  };
};

export type TribunalQA = { q: string; a: string };

/** Contenido que se suma a un caso ya escrito (más preguntas, maniobras y preguntas del tribunal). */
export type CaseExtra = { anamnesis?: CaseAction[]; exam?: CaseAction[]; tribunal?: TribunalQA[] };
