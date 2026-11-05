/*
 * Programa integrado: contenido estático (como los casos clínicos).
 * Une el plan de estudio integrado (10 ejes clínicos + problemas complementarios + ruta de 12 semanas)
 * con los programas oficiales de la FCM-UNC (revisión 2024), materia por materia y año por año.
 * Lo único que se guarda de la persona es el avance de la ruta (db.route) y lo que se suma al Temario.
 */

import type { CaseArea } from "@/lib/cases/types";

export type MateriaId =
  | "anatomia"
  | "salud-comunitaria-1"
  | "salud-comunitaria-2"
  | "salud-comunitaria-3"
  | "patologia"
  | "farmacologia-1"
  | "farmacologia-2"
  | "dermatologia"
  | "oftalmologia"
  | "ginecologia"
  | "infectologia"
  | "cirugia"
  | "traumatologia"
  | "pediatria"
  | "bioquimica"
  | "histologia"
  | "fisiologia"
  | "semiologia"
  | "farmacologia-general"
  | "clinica-medica";

export type Year = 1 | 2 | 3 | 4 | 5;

/** Unidad troncal del programa oficial, resumida. `part` separa programas de una misma materia (I y II, Ginecología y Obstetricia). */
export type Unidad = { name: string; detail: string; part?: string };

/** Qué casos se vinculan: por área, por palabras en el id o el diagnóstico, por edad, o todos. */
export type CaseMatch = {
  areas?: CaseArea[];
  keywords?: RegExp;
  /** Pacientes menores de esta edad en años (pediatría). */
  underAge?: number;
  all?: boolean;
};

export type Materia = {
  id: MateriaId;
  /** Nombre corto, como figura en el plan integrado. */
  name: string;
  /** Asignatura o asignaturas de la FCM-UNC que la componen. */
  official: string;
  year: Year;
  /** Aclaración cuando la materia se cursa en dos años (I y II). */
  yearNote?: string;
  /** Área curricular de la FCM. */
  area: string;
  /** Otros nombres con los que puede estar en tu Temario (para no duplicarla). */
  aliases: string[];
  /** Núcleos integradores prioritarios (matriz rápida del plan). */
  nucleos: string;
  /** Qué aporta al razonamiento clínico integrado. */
  aporte: string;
  unidades: Unidad[];
  match: CaseMatch;
};

export type Peso = "central" | "secundaria";

export type EjeFila = { materia: MateriaId; text: string; peso: Peso };

export type Prioridad = "P1" | "P2" | "P3";

export type Eje = {
  id: string;
  /** "2.1"… para los diez ejes; null en los problemas complementarios. */
  code: string | null;
  kind: "eje" | "complementario";
  title: string;
  priority: Prioridad;
  /** Para qué sirve el eje (una línea). */
  objetivo: string;
  filas: EjeFila[];
  /** "Conexión que deberías poder explicar". */
  conexion: string;
  /** Patologías troncales del eje (las que no pueden faltar). */
  patologias: string[];
  /** Para la ruta: clínica y signos de alarma, diferenciales y tratamiento, en una línea cada uno. */
  clinica: string;
  diferenciales: string;
  tratamiento: string;
  match: CaseMatch;
};

export type Session = { morning: string; night: string };

export type RutaWeek = {
  num: number;
  fase: 1 | 2 | 3 | 4;
  title: string;
  /** Ejes que trabaja la semana; el primero es el principal. */
  ejes: string[];
  objetivo: string;
  /** Sesiones a medida (si faltan, se arman con la plantilla semanal y el eje principal). */
  sessions?: Session[];
};

export type Fase = { num: 1 | 2 | 3 | 4; name: string; weeks: string; contenidos: string; resultado: string };
