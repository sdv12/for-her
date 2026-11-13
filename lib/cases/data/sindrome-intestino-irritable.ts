import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeIntestinoIrritable: ClinicalCase = {
  id: "sindrome-intestino-irritable",
  level: 1,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Analista de sistemas. Mucho estrés laboral." },
  frequency: "muy-frecuente",
  intro: "“Hace un año tengo dolor de panza que se alivia cuando voy al baño, y alterno diarrea con constipación. Me hincho mucho.”",
  vitals: { TA: "112/70 mmHg", FC: "76 lpm", "T°": "36,5 °C", Peso: "58 kg" },
  anamnesis: [
    act("relacion", "¿El dolor cambia con la evacuación?", "clave", "“Mejora cuando voy al baño.”", "Criterio de Roma."),
    act("alarma", "¿Sangre, bajó de peso, despierta a la noche, fiebre?", "clave", "“Nada de eso.”", "Sin signos de alarma."),
    act("familia", "¿Familia con cáncer de colon, celiaquía o enfermedad inflamatoria?", "clave", "“No.”", "Riesgo."),
    act("alimentos", "¿Algún alimento la empeora?", "util", "“Las legumbres y el lácteo.”", "Fermentables."),
    act("animo", "¿Ansiedad o ánimo bajo?", "util", "“Mucha ansiedad.”", "Eje intestino-cerebro."),
    act("hobby", "¿Qué hace para despejarse?", "neutro", "“Voy a yoga cuando puedo.”", "No orienta directamente."),
  ],
  exam: [
    act("abdomen", "Examen abdominal", "clave", "Dolor leve difuso, sin masas ni visceromegalias.", "Sin hallazgos orgánicos."),
    act("peso-ex", "Peso y estado nutricional", "clave", "Estable.", "Sin pérdida."),
    act("perianal", "Región perianal", "util", "Normal.", "Excluye Crohn perianal."),
  ],
  studies: [
    study("Laboratorio", "basico", "Hemograma, PCR, TSH", "clave", "Normales.", "Descartar organicidad."),
    study("Laboratorio", "celiaquia", "Anticuerpos antitransglutaminasa IgA con IgA total", "clave", "Negativos.", "Descartar celiaquía."),
    study("Laboratorio", "calprotectina", "Calprotectina fecal", "util", "Normal.", "Excluye inflamación."),
    study("Imágenes", "colonoscopia", "Colonoscopia sin signos de alarma", "innecesario", "No se realizó.", "No corresponde a los 28 años sin alarma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sii", "Síndrome del intestino irritable con hábito mixto", true, "Dolor relacionado con la evacuación y cambio de hábito por más de 6 meses, sin alarma y con estudios básicos normales."),
      dx("celiaquia", "Enfermedad celíaca", false, "Serología negativa."),
      dx("crohn", "Enfermedad de Crohn", false, "PCR y calprotectina normales."),
      dx("lactosa", "Intolerancia a la lactosa aislada", false, "Explica parte pero no todo el cuadro."),
      dx("cancer", "Cáncer colorrectal", false, "Joven, sin alarma ni antecedentes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar el diagnóstico positivo y la benignidad", "clave", "Base de la relación terapéutica."),
      mg("dieta", "Dieta baja en FODMAP guiada, por tiempo limitado", "clave", "Mejora la distensión."),
      mg("sintomas", "Antiespasmódico, fibra soluble o loperamida según síntomas", "clave", "Sintomático."),
      mg("psico", "Abordar la ansiedad (psicoterapia o antidepresivo en dosis bajas)", "util", "Eje intestino-cerebro."),
      mg("estudios-repetidos", "Pedir estudios repetidos en cada consulta", "riesgoso", "Refuerza la ansiedad y expone a riesgos."),
      mg("dieta-sin-gluten", "Dieta sin gluten estricta de por vida", "innecesario", "No es celíaca."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome del intestino irritable con hábito mixto, en mujer de 28 años.",
    pathologies: [
      { name: "Síndrome del intestino irritable", role: "principal", why: "Trastorno de la interacción intestino-cerebro." },
      { name: "Ansiedad", role: "asociada", why: "Modula los síntomas." },
      { name: "Celiaquía, Crohn", role: "diferencial", why: "Causas orgánicas." },
    ],
    reasoning: [
      "Causa: alteración del eje intestino-cerebro, microbiota y hipersensibilidad visceral.",
      "Mecanismo: percepción aumentada de la distensión y alteración de la motilidad.",
      "Consecuencia: dolor, distensión y cambio del hábito.",
    ],
    epidemiology:
      "Afecta a uno de cada diez adultos, más a mujeres jóvenes. Es un diagnóstico positivo con los criterios de Roma IV, no solo de exclusión. Los signos de alarma definen quién necesita colonoscopia.",
    management: [
      "Criterios de Roma.",
      "Descartar alarma y celiaquía.",
      "Explicar.",
      "Dieta y síntomas.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Síndrome de intestino irritable.", "Rome Foundation — Rome IV Criteria."],
    pearls: ["Dolor que mejora al evacuar.", "Signos de alarma deciden los estudios.", "Descartá celiaquía."],
    pitfalls: ["Estudiar de más.", "Desestimar los síntomas."],
    tribunal: [
      qa("¿Cuáles son los criterios de Roma IV?", "Dolor abdominal al menos un día por semana en 3 meses, asociado a evacuación o cambios de frecuencia o forma."),
      qa("¿Cuáles son los signos de alarma?", "Sangrado, anemia, pérdida de peso, síntomas nocturnos, fiebre, inicio después de los 50 y antecedentes familiares."),
      qa("¿Qué son los FODMAP?", "Hidratos de carbono fermentables poco absorbidos que aumentan gas y distensión."),
    ],
  },
};
