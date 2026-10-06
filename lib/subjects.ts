/**
 * Colores de materia. En la base se guarda la clave (no el hex) para que
 * el mismo color tenga su variante clara y oscura vía CSS variables.
 */
export const BASE_SUBJECT_COLORS = {
  Anatomía: "anatomia",
  Bioquímica: "bioquimica",
  Fisiología: "fisiologia",
  Clínica: "clinica",
  "Salud comunitaria": "comunitaria",
} as const;

export const ROTATING_SUBJECT_COLORS = ["r1", "r2", "r3", "r4", "r5"] as const;

export type SubjectColor =
  | (typeof BASE_SUBJECT_COLORS)[keyof typeof BASE_SUBJECT_COLORS]
  | (typeof ROTATING_SUBJECT_COLORS)[number];

/** Color para una materia nueva: el de base si coincide el nombre, si no el siguiente de la rotación. */
export function colorForNewSubject(name: string, existingCount: number): SubjectColor {
  const base = BASE_SUBJECT_COLORS[name as keyof typeof BASE_SUBJECT_COLORS];
  if (base) return base;
  return ROTATING_SUBJECT_COLORS[existingCount % ROTATING_SUBJECT_COLORS.length];
}

export function subjectColorVar(color: SubjectColor): string {
  return `var(--subj-${color})`;
}
