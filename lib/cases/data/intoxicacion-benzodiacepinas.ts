import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionBenzodiacepinas: ClinicalCase = {
  id: "intoxicacion-benzodiacepinas",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 37, ageUnit: "años", sex: "F", context: "Trastorno de ansiedad; toma clonazepam. Discutió con la pareja. La trae la hermana." },
  frequency: "muy-frecuente",
  intro: "“La encontré dormida en la cama y al lado el blíster de clonazepam vacío. No sé cuántas tomó.” (relata la hermana)",
  vitals: { TA: "108/68 mmHg", FC: "76 lpm", FR: "12 rpm", "T°": "36,2 °C", "SatO₂": "95 %", Glucemia: "96 mg/dl", Glasgow: "11/15" },
  anamnesis: [
    act("cantidad", "¿Cuántas pastillas faltan y de qué dosis?", "clave", "“Unas 20 de 2 mg.”", "Dosis."),
    act("hora", "¿A qué hora pudo haberlas tomado?", "clave", "“Hace unas tres horas.”", "Tiempo."),
    act("coingesta", "¿Alcohol, antidepresivos u otras pastillas?", "clave", "“Había una botella de vino abierta. También toma sertralina.”", "La coingesta define el riesgo."),
    act("nota", "¿Dejó una nota o dijo algo?", "util", "“Me mandó un mensaje despidiéndose.”", "Intención suicida."),
    act("previos", "¿Intentos previos?", "util", "“Uno hace dos años.”", "Riesgo."),
    act("trabajo", "¿A qué se dedica?", "neutro", "“Es maestra jardinera.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Conciencia, pupilas y reflejos", "clave", "Somnolienta, responde al dolor, pupilas normales, sin clonus.", "Toxíndrome sedativo."),
    act("via-aerea", "Vía aérea y reflejo nauseoso", "clave", "Protege la vía aérea, respira bien.", "No requiere intubación."),
    act("piel", "Piel y signos de autolesión", "util", "Cortes antiguos en antebrazos.", "Riesgo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, alcoholemia, paracetamol, salicilatos, ionograma", "clave", "Alcoholemia 0,9 g/l; paracetamol y salicilatos negativos.", "Coingestas ocultas."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Normal, QTc 440.", "Sertralina y otras coingestas."),
    study("Laboratorio", "embarazo", "Prueba de embarazo", "util", "Negativa.", "Mujer en edad fértil."),
    study("Otros", "lavado", "Lavado gástrico", "riesgoso", "No se realizó.", "Riesgo de aspiración y sin beneficio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("intoxicacion-bzd", "Intoxicación aguda intencional por clonazepam con alcohol, en contexto de intento de suicidio", true, "Sedación con signos vitales conservados, blíster vacío, alcohol y mensaje de despedida."),
      dx("serotoninergico", "Síndrome serotoninérgico", false, "Sin clonus, hipertermia ni agitación."),
      dx("opioides", "Intoxicación por opioides", false, "Pupilas normales y FR conservada."),
      dx("acv", "ACV", false, "Sin foco y con causa tóxica."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("soporte", "Soporte, monitoreo y vigilancia de la vía aérea", "clave", "Base del tratamiento."),
      mg("salud-mental", "Evaluación de salud mental y riesgo antes del alta", "clave", "Intento de suicidio."),
      mg("acompanante", "Acompañamiento permanente y retirar medios lesivos", "clave", "Seguridad."),
      mg("cat", "Llamar al Centro de Toxicología", "util", "Asesoramiento."),
      mg("flumazenil", "Flumazenil de rutina", "riesgoso", "Convulsiones en usuarias crónicas de benzodiacepinas."),
      mg("alta-temprana", "Alta al despertar sin evaluación", "riesgoso", "Alto riesgo de repetir."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación aguda intencional por clonazepam con alcohol, en contexto de intento de suicidio, en mujer de 37 años.",
    pathologies: [
      { name: "Intoxicación por benzodiacepinas", role: "principal", why: "Depresión del sistema nervioso central." },
      { name: "Intento de suicidio y consumo de alcohol", role: "asociada", why: "Riesgo y potenciación." },
      { name: "Opioides, síndrome serotoninérgico", role: "diferencial", why: "Otros toxíndromes." },
    ],
    reasoning: [
      "Causa: ingesta voluntaria de clonazepam con alcohol.",
      "Mecanismo: potenciación del GABA-A, sumada al alcohol.",
      "Consecuencia: sedación y, con coingestas, depresión respiratoria.",
    ],
    epidemiology:
      "Las benzodiacepinas son el fármaco más usado en intentos de suicidio en Argentina, muchas veces combinadas con alcohol. Solas rara vez matan; el riesgo está en las coingestas. Todo intento obliga a evaluación de salud mental.",
    management: [
      "Vía aérea.",
      "Coingestas.",
      "Soporte.",
      "Salud mental.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de pacientes intoxicados.", "Ley Nacional de Salud Mental 26.657 y Ley 27.130 de Prevención del Suicidio."],
    pearls: ["Pedí paracetamol siempre.", "Flumazenil casi nunca.", "El intento importa más que la dosis."],
    pitfalls: ["Flumazenil en usuaria crónica.", "Alta sin evaluación."],
    tribunal: [
      qa("¿Cuándo se puede usar flumazenil?", "En sedación iatrogénica en pacientes sin uso crónico ni coingesta proconvulsivante."),
      qa("¿Por qué se dosa paracetamol en toda intoxicación intencional?", "Porque es frecuente, al inicio no da síntomas y tiene antídoto eficaz."),
      qa("¿Qué dice la Ley 27.130?", "Establece la prevención del suicidio y la atención obligatoria de quien realizó un intento."),
    ],
  },
};
