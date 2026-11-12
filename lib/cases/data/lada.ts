import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lada: ClinicalCase = {
  id: "diabetes-autoinmune-adulto-lada",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Delgado, deportista. Diagnosticado como diabetes tipo 2 hace un año; con metformina no mejora. Vitíligo." },
  frequency: "poco-frecuente",
  intro: "“Me dijeron que tenía diabetes tipo 2, tomo metformina, pero sigo bajando de peso y con sed.”",
  vitals: { TA: "118/72 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "64 kg", Glucemia: "268 mg/dl" },
  anamnesis: [
    act("peso", "¿Bajaste de peso?", "clave", "“Ocho kilos en un año.”", "Déficit de insulina."),
    act("autoinmune", "¿Vitíligo, tiroides, celiaquía?", "clave", "“Vitíligo.”", "Autoinmunidad."),
    act("respuesta", "¿Mejoró con metformina?", "clave", "“No.”", "Falla temprana."),
    act("familia", "¿Familia con diabetes tipo 1?", "util", "“Un primo.”", "Riesgo."),
    act("cetosis", "¿Náuseas o aliento a manzana?", "util", "“No.”", "Cetoacidosis."),
    act("deporte", "¿Qué deporte hacés?", "neutro", "“Ciclismo.”", "No orienta."),
  ],
  exam: [
    act("imc", "IMC", "clave", "IMC 21.", "No obeso."),
    act("piel", "Piel", "clave", "Vitíligo; sin acantosis.", "Sin resistencia a la insulina."),
    act("pies", "Pies", "util", "Normales.", "Complicaciones."),
  ],
  studies: [
    study("Laboratorio", "anticuerpos", "Anticuerpos anti-GAD", "clave", "Positivos en título alto.", "Autoinmune."),
    study("Laboratorio", "peptido-c", "Péptido C", "clave", "Bajo.", "Déficit de insulina."),
    study("Laboratorio", "hba1c", "HbA1c, TSH, antitransglutaminasa", "clave", "HbA1c 10,4 %; TSH normal.", "Control y asociaciones."),
    study("Otros", "mas-orales", "Agregar sulfonilurea", "riesgoso", "No se realizó.", "Acelera la pérdida de célula beta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lada", "Diabetes autoinmune latente del adulto (LADA)", true, "Adulto delgado, autoinmunidad, falla de orales, anti-GAD y péptido C bajo."),
      dx("dm2", "Diabetes tipo 2", false, "No tiene resistencia y anti-GAD positivo."),
      dx("mody", "MODY", false, "Anticuerpos positivos."),
      dx("pancreatica", "Diabetes pancreática", false, "Sin pancreatitis."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "TSH normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("insulina", "Insulina basal y luego esquema según necesidad", "clave", "Déficit de insulina."),
      mg("educacion", "Educación sobre hipoglucemia y cetosis", "clave", "Riesgo."),
      mg("autoinmunes", "Tamizaje periódico de tiroides y celiaquía", "util", "Asociaciones."),
      mg("pies", "Controles de complicaciones", "util", "Prevención."),
      mg("sulfonilurea", "Sulfonilureas", "riesgoso", "Desaconsejadas."),
      mg("dieta-sola", "Solo dieta", "riesgoso", "Progresa."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes autoinmune latente del adulto (LADA) con anti-GAD positivo, en varón de 38 años inicialmente rotulado como tipo 2.",
    pathologies: [
      { name: "LADA", role: "principal", why: "Diabetes autoinmune de lenta progresión." },
      { name: "Vitíligo", role: "asociada", why: "Autoinmunidad." },
      { name: "DM2, MODY", role: "diferencial", why: "Otros tipos." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra células beta.",
      "Mecanismo: destrucción lenta.",
      "Consecuencia: necesidad progresiva de insulina.",
    ],
    epidemiology:
      "Una proporción de adultos rotulados como tipo 2 tiene LADA. Se sospecha en adultos delgados, con autoinmunidad o falla temprana de orales. Pasar a insulina a tiempo evita descompensaciones.",
    management: [
      "Sospechar.",
      "Anti-GAD y péptido C.",
      "Insulina.",
      "Educación.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Clasificación de la diabetes.", "ADA — Standards of Care: Classification and Diagnosis."],
    pearls: ["Adulto delgado sin respuesta: anti-GAD.", "Péptido C bajo.", "Insulina."],
    pitfalls: ["Rotular como tipo 2.", "Sulfonilureas."],
    tribunal: [
      qa("¿Qué es MODY?", "Diabetes monogénica autosómica dominante, en jóvenes, sin autoinmunidad."),
      qa("¿Qué indica un péptido C bajo?", "Producción propia de insulina reducida."),
      qa("¿Qué anticuerpos se asocian a DM1?", "Anti-GAD, anti-IA2, anti-insulina y anti-ZnT8."),
    ],
  },
};
