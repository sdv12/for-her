import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const demenciaVascular: ClinicalCase = {
  id: "demencia-vascular",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Hipertenso y diabético mal controlado, tabaquista, dos ACV pequeños. Lo trae el hijo." },
  frequency: "frecuente",
  intro: "“Desde el último ACV está distinto. Se traba para hacer las cosas, camina a pasitos, y se le escapa la orina. Va empeorando por escalones.” (relata el hijo)",
  vitals: { TA: "168/92 mmHg", FC: "76 lpm", "T°": "36,3 °C", "SatO₂": "96 %", Glucemia: "198 mg/dl" },
  anamnesis: [
    act("evolucion", "¿Fue gradual o a saltos? ¿Tras los ACV?", "clave", "“A saltos, después de cada ACV.”", "Curso escalonado."),
    act("dominio", "¿Qué le cuesta más? ¿Memoria o planificar?", "clave", "“Planificar, pagar cuentas; se acuerda si le dan pistas.”", "Compromiso ejecutivo: típico."),
    act("delirium", "¿Cambió de golpe en los últimos días? ¿Medicación nueva, fiebre?", "clave", "“No.”", "Delirium: diferencial."),
    act("animo", "¿Está triste, duerme mal?", "util", "“Decaído.”", "Depresión asociada."),
    act("alucinaciones", "¿Ve cosas o tiene temblor?", "util", "“No.”", "Lewy y Parkinson."),
    act("oficio", "¿Qué hacía antes?", "neutro", "“Era sastre.”", "No orienta."),
  ],
  exam: [
    act("cognitivo", "Evaluación cognitiva breve", "clave", "MMSE 21, MoCA 16, falla en funciones ejecutivas.", "Patrón."),
    act("neuro", "Examen neurológico", "clave", "Reflejos asimétricos, Babinski derecho, marcha a pasos cortos.", "Signos focales."),
    act("vascular", "Soplos, pulsos y FA", "util", "Soplo carotídeo, ritmo regular.", "Riesgo vascular."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de encéfalo", "clave", "Infartos lacunares y leucoaraiosis extensa.", "Confirma enfermedad vascular."),
    study("Laboratorio", "lab", "TSH, B12, hemograma, glucemia, función renal, VDRL", "clave", "HbA1c 9,1; resto normal.", "Causas reversibles."),
    study("Electrofisiología", "ecg", "ECG y Doppler de vasos del cuello", "util", "Sin FA; estenosis del 50 %.", "Prevención secundaria."),
    study("Otros", "biomarcadores", "Biomarcadores en LCR de rutina", "innecesario", "No se realizó.", "Solo en dudas seleccionadas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vascular", "Demencia vascular subcortical", true, "Escalonada, con factores de riesgo, déficit ejecutivo, focalidad y lesiones en RM."),
      dx("alzheimer", "Alzheimer", false, "Es gradual, con memoria afectada desde el inicio."),
      dx("lewy", "Demencia por cuerpos de Lewy", false, "Sin alucinaciones ni parkinsonismo fluctuante."),
      dx("hidrocefalia", "Hidrocefalia normotensiva", false, "La RM no muestra ventriculomegalia."),
      dx("depresion", "Seudodemencia por depresión", false, "Tiene déficit objetivo y lesiones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("factores", "Controlar presión, diabetes, lípidos, antiagregar y dejar de fumar", "clave", "Previene nuevos eventos."),
      mg("cuidador", "Apoyo al cuidador, seguridad en el hogar, orientación legal", "clave", "Reduce sobrecarga."),
      mg("rehab", "Rehabilitación, ejercicio y estimulación", "util", "Conserva función."),
      mg("animo", "Evaluar y tratar depresión", "util", "Frecuente."),
      mg("benzo", "Benzodiacepinas para dormir", "riesgoso", "Riesgo de caídas y confusión."),
      mg("antipsicotico", "Antipsicóticos para que esté tranquilo", "riesgoso", "Aumentan la mortalidad en demencia."),
    ],
  },
  debrief: {
    diagnosis: "Demencia vascular subcortical por infartos lacunares múltiples y enfermedad de pequeño vaso, en varón de 76 años.",
    pathologies: [
      { name: "Demencia vascular", role: "principal", why: "Deterioro por enfermedad cerebrovascular." },
      { name: "HTA y diabetes mal controladas", role: "asociada", why: "Causa." },
      { name: "Alzheimer, Lewy, hidrocefalia", role: "diferencial", why: "Otras demencias." },
    ],
    reasoning: [
      "Causa: enfermedad de pequeños vasos e infartos.",
      "Mecanismo: el daño de circuitos frontosubcorticales enlentece y altera funciones ejecutivas.",
      "Consecuencia: deterioro funcional, marcha alterada, incontinencia.",
    ],
    epidemiology:
      "Es la segunda causa de demencia tras el Alzheimer, y son frecuentes las formas mixtas. El envejecimiento en Argentina y la mala adherencia al tratamiento de la HTA y la diabetes aumentan su frecuencia. Controlar factores de riesgo es la principal prevención.",
    management: [
      "Evaluación cognitiva e imagen.",
      "Excluir causas reversibles.",
      "Control vascular.",
      "Apoyo a la familia.",
    ],
    sources: ["Sociedad Neurológica Argentina — Consenso de demencia vascular.", "Ministerio de Salud de la Nación — Plan de demencias."],
    pearls: ["Empeora a saltos.", "Falla en planificar más que en memoria.", "Marcha e incontinencia tempranas."],
    pitfalls: ["No buscar causas reversibles.", "Dar antipsicóticos."],
    tribunal: [
      qa("¿Qué causas reversibles de demencia hay?", "Hipotiroidismo, déficit de B12, depresión, fármacos, hidrocefalia normotensiva, hematoma subdural, neurosífilis."),
      qa("¿Qué tríada tiene la hidrocefalia normotensiva?", "Alteración de la marcha, incontinencia y deterioro cognitivo."),
      qa("¿Cómo actúan los inhibidores de la colinesterasa?", "Aumentan acetilcolina; se usan en Alzheimer y Lewy, con beneficio limitado en vascular."),
    ],
  },
};
