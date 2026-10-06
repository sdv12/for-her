import { z } from "zod";

/** Alta/edición de un día del plan. */
export const planDayInput = z.object({
  content: z.string().trim().min(1, "Escribí qué toca ese día.").max(500, "Muy largo: hasta 500 caracteres."),
  mode: z.string().trim().max(80, "Hasta 80 caracteres."),
  date: z.iso.date("Elegí una fecha."),
});
export type PlanDayInput = z.infer<typeof planDayInput>;

export const minutesInput = z.coerce
  .number("Poné un número de minutos.")
  .int("Minutos enteros.")
  .min(1, "Al menos 1 minuto.")
  .max(600, "Hasta 600 minutos.");

/** Primer mensaje de error por campo, para mostrar en el form. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "_");
    out[key] ??= issue.message;
  }
  return out;
}

/** Alta/edición de una tarea del Tablero. */
export const taskInput = z.object({
  title: z.string().trim().min(1, "Escribí la tarea.").max(300, "Hasta 300 caracteres."),
  subject_id: z.string().nullable(),
  kind: z.enum(["lectura", "resumen", "tarjetas", "simulacro", "otro"]),
  due_date: z.union([z.iso.date("Fecha inválida."), z.literal("").transform(() => null), z.null()]),
  notes: z
    .string()
    .trim()
    .max(2000, "Hasta 2000 caracteres.")
    .transform((s) => s || null)
    .nullable(),
});
export type TaskInput = z.input<typeof taskInput>;

/** Alta/edición de una tarjeta. Tags como texto separado por comas. */
export const cardInput = z.object({
  front: z.string().trim().min(1, "Escribí la pregunta.").max(1000, "Hasta 1000 caracteres."),
  back: z.string().trim().min(1, "Escribí la respuesta.").max(4000, "Hasta 4000 caracteres."),
  subject_id: z.string("Elegí una materia.").min(1, "Elegí una materia."),
  tags: z
    .string()
    .transform((s) => [...new Set(s.split(",").map((t) => t.trim()).filter(Boolean))])
    .pipe(z.array(z.string().max(40, "Cada tag, hasta 40 caracteres.")).max(12, "Hasta 12 tags.")),
});
export type CardInput = z.input<typeof cardInput>;

/** "Encontré una pregunta" (y edición). Materia existente por id, o una nueva por nombre. */
export const questionInput = z
  .object({
    text: z.string().trim().min(1, "Escribí la pregunta tal cual te la hicieron.").max(1000, "Hasta 1000 caracteres."),
    subject_id: z.string(),
    new_subject: z.string().trim().max(60, "Hasta 60 caracteres."),
    source: z.string().trim().max(120, "Hasta 120 caracteres."),
    asked_on: z.union([z.iso.date("Fecha inválida."), z.literal("")]),
    priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
    model_answer: z.string().trim().max(4000, "Hasta 4000 caracteres."),
  })
  .refine((v) => v.subject_id !== "" || v.new_subject !== "", { message: "Elegí una materia o escribí una nueva.", path: ["subject_id"] });
export type QuestionInput = z.input<typeof questionInput>;

/** Resultado de una pregunta del simulacro o del tribunal. */
export const simulationInput = z.object({
  mode: z.enum(["suelta", "tribunal"]),
  session_id: z.uuid(),
  stage: z.string().nullable(),
  question_id: z.string().nullable(),
  question_text: z.string().trim().min(1),
  checks: z.record(z.string(), z.boolean()),
  rating: z.enum(["flojo", "aceptable", "solido"]),
  duration_sec: z.number().int().nonnegative().nullable(),
});
export type SimulationInput = z.input<typeof simulationInput>;

/** Alta manual / edición de un error. */
export const mistakeInput = z.object({
  text: z.string().trim().min(1, "Escribí qué te salió mal.").max(1000, "Hasta 1000 caracteres."),
  correction: z.string().trim().min(1, "Escribí cómo es lo correcto.").max(4000, "Hasta 4000 caracteres."),
});
export type MistakeInput = z.input<typeof mistakeInput>;

/** Registro de estudio de un día. */
export const studyLogInput = z.object({
  date: z.iso.date("Fecha inválida."),
  minutes: minutesInput,
  what: z.string().trim().min(1, "Contá en dos palabras qué estudiaste.").max(500, "Hasta 500 caracteres."),
  mood: z.enum(["bien", "normal", "pesado"]).nullable(),
});
export type StudyLogInput = z.input<typeof studyLogInput>;

export const topicName = z.string().trim().min(1, "Escribí el tema.").max(80, "Hasta 80 caracteres.");

export const subjectInput = z.object({
  name: z.string().trim().min(1, "Poné un nombre.").max(60, "Hasta 60 caracteres."),
  color: z.enum(["anatomia", "bioquimica", "fisiologia", "clinica", "comunitaria", "r1", "r2", "r3", "r4", "r5"]),
});
export type SubjectInput = z.input<typeof subjectInput>;

/** Ajustes del perfil. */
export const profileInput = z.object({
  display_name: z.string().trim().max(40, "Hasta 40 caracteres."),
  exam_date: z.union([z.iso.date("Fecha inválida."), z.literal("")]),
  daily_goal_min: z.coerce
    .number("Poné un número de minutos.")
    .int("Minutos enteros.")
    .min(15, "Al menos 15 minutos.")
    .max(480, "Hasta 480 minutos (8 horas)."),
});
export type ProfileInput = z.input<typeof profileInput>;
