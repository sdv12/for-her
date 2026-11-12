import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const toc: ClinicalCase = {
  id: "trastorno-obsesivo-compulsivo",
  level: 2,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 22, ageUnit: "años", sex: "M", context: "Estudiante de Arquitectura. Lo trae la madre." },
  frequency: "frecuente",
  intro: "“Me lavo las manos muchas veces porque pienso que voy a contagiar a mi familia. Tengo las manos lastimadas y llego tarde a todo.”",
  vitals: { TA: "118/72 mmHg", FC: "82 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("obsesiones", "¿Qué pensamientos aparecen? ¿Te parecen exagerados?", "clave", "“Que voy a contagiar; sé que es exagerado.”", "Obsesión con insight."),
    act("compulsiones", "¿Qué hacés para calmarte? ¿Cuánto tiempo?", "clave", "“Lavar las manos, tres horas por día.”", "Compulsiones."),
    act("riesgo", "¿Te sentís triste? ¿Pensaste en lastimarte?", "clave", "“Triste a veces; no pensé en morir.”", "Comorbilidad."),
    act("tics", "¿Movimientos o sonidos que no podés controlar?", "util", "“No.”", "Tics."),
    act("sustancias", "¿Consumo de sustancias?", "util", "“No.”", "Factor."),
    act("carrera", "¿Qué año cursás?", "neutro", "“Tercero.”", "No orienta."),
  ],
  exam: [
    act("manos", "Manos", "clave", "Dermatitis por lavado.", "Consecuencia."),
    act("mental", "Examen mental", "clave", "Ansioso, sin ideas delirantes; reconoce lo irracional.", "Insight conservado."),
    act("tiroides", "Tiroides", "util", "Normal.", "Excluye causas."),
  ],
  studies: [
    study("Otros", "ybocs", "Escala Y-BOCS", "clave", "Puntaje de 26: moderado a grave.", "Gravedad."),
    study("Otros", "phq", "Pesquisa de depresión", "clave", "Leve.", "Comorbilidad."),
    study("Laboratorio", "lab", "TSH", "util", "Normal.", "Excluye."),
    study("Imágenes", "rmn", "RM de cerebro de rutina", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("toc", "Trastorno obsesivo-compulsivo con buen insight", true, "Obsesiones y compulsiones que ocupan más de una hora y deterioran."),
      dx("ansiedad", "Ansiedad generalizada", false, "No hay rituales."),
      dx("psicosis", "Esquizofrenia", false, "Reconoce lo irracional."),
      dx("tpoc", "Trastorno de personalidad obsesivo-compulsiva", false, "No hay obsesiones ni compulsiones egodistónicas."),
      dx("fobia", "Fobia específica", false, "Hay rituales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("terapia", "Terapia cognitivo-conductual con exposición y prevención de respuesta", "clave", "Primera línea."),
      mg("isrs", "ISRS en dosis altas por tiempo prolongado", "clave", "Fármaco de elección."),
      mg("familia", "Psicoeducación familiar", "clave", "Evita reforzar rituales."),
      mg("piel", "Cremas para la dermatitis", "util", "Síntoma."),
      mg("benzo", "Benzodiacepinas a largo plazo", "riesgoso", "No tratan el TOC y generan dependencia."),
      mg("reforzar", "Que la familia lave por él para calmarlo", "riesgoso", "Refuerza el ciclo."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno obsesivo-compulsivo con buen insight, obsesión de contaminación y lavado, en varón de 22 años.",
    pathologies: [
      { name: "Trastorno obsesivo-compulsivo", role: "principal", why: "Obsesiones y compulsiones." },
      { name: "Depresión y dermatitis", role: "asociada", why: "Comorbilidades." },
      { name: "Ansiedad, psicosis, personalidad", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: genética y neurobiológica, con factores ambientales.",
      "Mecanismo: alteración de circuitos corticoestriatales.",
      "Consecuencia: rituales que alivian la ansiedad y la perpetúan.",
    ],
    epidemiology:
      "Afecta a cerca del 2 % de la población y suele empezar en la adolescencia o adultez temprana. Se demora años en diagnosticar por vergüenza. Se asocia a depresión y tics, y responde bien al tratamiento combinado.",
    management: [
      "Preguntar.",
      "Escala.",
      "TCC con exposición.",
      "ISRS.",
    ],
    sources: ["Asociación de Psiquiatras Argentinos — Trastornos de ansiedad y TOC.", "American Psychiatric Association — Practice Guideline for OCD."],
    pearls: ["Rituales que alivian.", "Insight variable.", "ISRS en dosis altas."],
    pitfalls: ["Benzodiacepinas.", "Que la familia participe del ritual."],
    tribunal: [
      qa("¿En qué se diferencian obsesiones y delirios?", "Las obsesiones se viven como propias y absurdas; el delirio es una convicción no criticable."),
      qa("¿Cuánto tarda la respuesta a ISRS?", "Entre 8 y 12 semanas, y suelen necesitarse dosis altas."),
      qa("¿Qué es PANDAS?", "Inicio brusco de TOC o tics en niños tras infección estreptocócica."),
    ],
  },
};
