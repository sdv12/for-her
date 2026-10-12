import { z } from "zod";
import { normalizeWeekday } from "./dates";

/** Esquema del JSON de importación (sección 6 del spec). */

const weekday = z.string().transform((s, ctx) => {
  const w = normalizeWeekday(s);
  if (!w) {
    ctx.addIssue({ code: "custom", message: `"${s}" no es un día (usá Lun, Mar, Mié, Jue, Vie, Sáb o Dom).` });
    return z.NEVER;
  }
  return w;
});

const text = (label: string) => z.string(`Falta ${label}.`).trim().min(1, `Falta ${label}.`);

export const planJsonSchema = z.object({
  titulo: text("el título").default("Cronograma"),
  inicio: z.iso.date("\"inicio\" tiene que ser una fecha AAAA-MM-DD."),
  fases: z
    .array(
      z.object({
        num: z.coerce.number().int().positive(),
        nombre: text("el nombre de la fase"),
        descripcion: z.string().trim().optional(),
        alerta: z.string().trim().optional(),
        semanas: z.array(
          z.object({
            num: z.coerce.number().int().positive(),
            fechas: z.string().trim().optional(),
            titulo: z.string().trim().default(""),
            dias: z
              .array(
                z.object({
                  dia: weekday,
                  contenido: text("el contenido del día"),
                  modo: z.string().trim().default(""),
                }),
              )
              .default([]),
          }),
        ),
      }),
    )
    .min(1, "El cronograma no tiene fases."),
});

export type PlanJson = z.infer<typeof planJsonSchema>;

/** Borrador ya revisado en la vista previa: es el input de la acción de importar. */
const weekdayLabel = z.enum(["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]);
export const planDraftSchema = z.object({
  title: z.string().trim().min(1, "Poné un título al cronograma."),
  start: z.iso.date(),
  phases: z.array(
    z.object({
      key: z.string(),
      num: z.number().int().positive(),
      code: z.string(),
      name: z.string().trim().min(1, "Cada fase necesita un nombre."),
      description: z.string().nullable(),
      alert: z.string().nullable(),
      weeks: z.array(
        z
          .object({
            key: z.string(),
            num: z.number().int().positive(),
            start: z.iso.date(),
            end: z.iso.date(),
            title: z.string().trim().min(1, "Cada semana necesita un título."),
            subject: z.string().nullable(),
            tip: z.string().nullable().optional(),
            priority: z.string().nullable().optional(),
            topics: z.array(z.string()).optional(),
            days: z.array(
              z.object({
                key: z.string(),
                weekday: weekdayLabel,
                date: z.iso.date(),
                content: z.string().trim().min(1, "Hay un día sin contenido."),
                mode: z.string().trim(),
              }),
            ),
          })
          .refine((w) => w.start <= w.end, { message: "Una semana termina antes de empezar." }),
      ),
    }),
  ),
  questions: z
    .array(
      z.object({
        key: z.string(),
        weekNum: z.number().int().nullable(),
        text: z.string().trim().min(1),
        priority: z.union([z.literal(1), z.literal(2), z.literal(3)]),
      }),
    )
    .optional(),
});

export const importOptionsSchema = z.object({
  mode: z.enum(["replace", "merge"]),
  createTopics: z.boolean(),
  /** Sumar al banco de Preguntas de examen las preguntas por semana que trae el cronograma. */
  addQuestions: z.boolean().default(false),
});
export type ImportOptions = z.input<typeof importOptionsSchema>;
