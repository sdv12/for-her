import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const prolapsoGenital: ClinicalCase = {
  id: "prolapso-genital-incontinencia",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 66, ageUnit: "años", sex: "F", context: "Cuatro partos vaginales, uno con fórceps. Constipación crónica. Obesidad." },
  frequency: "frecuente",
  intro: "“Siento como una bola que se me sale por la vagina, sobre todo al final del día. Se me escapa el pis cuando toso.”",
  vitals: { TA: "132/80 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "84 kg" },
  anamnesis: [
    act("bulto", "¿Cuándo aparece el bulto?", "clave", "“De pie, a la tarde.”", "Prolapso."),
    act("orina", "¿Se escapa al toser, o con urgencia?", "clave", "“Al toser o reír.”", "Incontinencia de esfuerzo."),
    act("partos", "¿Partos, cómo fueron?", "clave", "“Cuatro, uno con fórceps.”", "Factor principal."),
    act("vaciamiento", "¿Orinás bien? ¿Infecciones?", "util", "“A veces me cuesta.”", "Obstrucción."),
    act("sangrado", "¿Sangrado vaginal?", "util", "“No.”", "Úlcera o cáncer."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Siete.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Examen ginecológico con pujo", "clave", "Descenso de vejiga y cuello hasta el introito.", "Prolapso de pared anterior y apical."),
    act("tos", "Prueba de esfuerzo con tos", "clave", "Pérdida de orina.", "Incontinencia."),
    act("piel", "Mucosa", "util", "Atrófica, sin úlceras.", "Hipoestrogenismo."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina y urocultivo", "clave", "Normales.", "Excluye infección."),
    study("Otros", "residuo", "Residuo posmiccional", "clave", "60 ml.", "Vaciamiento."),
    study("Imágenes", "eco", "Ecografía ginecológica", "util", "Sin masas.", "Base."),
    study("Otros", "urodinamia-rutina", "Urodinamia en todas", "innecesario", "No se realizó.", "Solo si se planea cirugía compleja."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("prolapso", "Prolapso genital (cistocele y descenso apical) con incontinencia de orina de esfuerzo", true, "Bulto vaginal, pérdida al toser y examen."),
      dx("tumor", "Tumor vaginal", false, "Prolapso de órganos."),
      dx("urgencia", "Incontinencia de urgencia", false, "Pérdida al esfuerzo."),
      dx("fistula", "Fístula vesicovaginal", false, "Pérdida al esfuerzo, no continua."),
      dx("infeccion", "Infección urinaria", false, "Orina normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("piso-pelvico", "Ejercicios de piso pélvico supervisados", "clave", "Primera línea."),
      mg("pesario", "Pesario según preferencia", "clave", "Alternativa a cirugía."),
      mg("habitos", "Bajar de peso, tratar constipación y estrógenos vaginales", "clave", "Factores."),
      mg("cirugia", "Cirugía si falla o lo prefiere", "util", "Opción."),
      mg("panales", "Solo pañales", "riesgoso", "No trata."),
      mg("cirugia-sin-evaluar", "Cirugía sin evaluar la incontinencia", "riesgoso", "Puede empeorarla."),
    ],
  },
  debrief: {
    diagnosis: "Prolapso genital de pared anterior y apical con incontinencia de orina de esfuerzo, en mujer de 66 años multípara.",
    pathologies: [
      { name: "Prolapso de órganos pélvicos", role: "principal", why: "Descenso por falla del soporte." },
      { name: "Incontinencia de esfuerzo", role: "asociada", why: "Comorbilidad." },
      { name: "Tumor, fístula", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: daño del piso pélvico por partos, edad y obesidad.",
      "Mecanismo: debilidad de fascias y músculos.",
      "Consecuencia: bulto, incontinencia y alteración de la calidad de vida.",
    ],
    epidemiology:
      "Es muy frecuente en mujeres multíparas posmenopáusicas, y muchas no consultan por vergüenza. Los partos vaginales, la obesidad y la constipación son factores. El tratamiento conservador ayuda a una gran parte.",
    management: [
      "Examen con pujo.",
      "Evaluar incontinencia.",
      "Piso pélvico y pesario.",
      "Cirugía selectiva.",
    ],
    sources: ["FASGO — Uroginecología.", "International Urogynecological Association — Pelvic Organ Prolapse Recommendations."],
    pearls: ["Bulto a la tarde.", "Preguntar por incontinencia.", "Pesario es una opción."],
    pitfalls: ["No preguntar.", "Solo pañales."],
    tribunal: [
      qa("¿Qué tipos de incontinencia hay?", "De esfuerzo, de urgencia, mixta y por rebosamiento."),
      qa("¿Qué es el sistema POP-Q?", "Cuantifica el prolapso en estadios según puntos de referencia."),
      qa("¿Qué fármacos tratan la urgencia?", "Antimuscarínicos y mirabegrón."),
    ],
  },
};
