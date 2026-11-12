import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estenosisCanalLumbar: ClinicalCase = {
  id: "estenosis-canal-lumbar",
  level: 2,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Ex camionero. Artrosis. Diabético e hipertenso." },
  frequency: "frecuente",
  intro: "“Cuando camino dos cuadras me pesan y se me duermen las piernas. Me tengo que sentar o agachar y se me pasa.”",
  vitals: { TA: "138/82 mmHg", FC: "74 lpm", "T°": "36,4 °C", Glucemia: "132 mg/dl" },
  anamnesis: [
    act("postura", "¿Mejora al agacharte o sentarte?", "clave", "“Sí, apoyado en el carrito del súper camino más.”", "Claudicación neurógena."),
    act("alarma", "¿Problemas para orinar, anestesia en silla de montar?", "clave", "“No.”", "Cola de caballo."),
    act("vascular", "¿Duele la pantorrilla en reposo de pie? ¿Pies fríos?", "clave", "“No.”", "Vascular."),
    act("dolor", "¿Dolor lumbar?", "util", "“Crónico.”", "Artrosis."),
    act("cancer", "¿Pérdida de peso?", "util", "“No.”", "Metástasis."),
    act("pasatiempo", "¿Qué te gusta?", "neutro", "“Pescar.”", "No orienta."),
  ],
  exam: [
    act("pulsos", "Pulsos de miembros inferiores", "clave", "Presentes y simétricos.", "Excluye arterial."),
    act("neuro", "Fuerza, reflejos, sensibilidad", "clave", "Aquilianos disminuidos; fuerza conservada.", "Radicular leve."),
    act("columna", "Columna", "util", "Dolor a la extensión lumbar.", "Típico."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de columna lumbar", "clave", "Estenosis de canal en L3-L5 por artrosis facetaria y ligamento amarillo.", "Confirma."),
    study("Otros", "itb", "Índice tobillo-brazo", "clave", "Normal.", "Excluye arterial."),
    study("Laboratorio", "lab", "HbA1c y B12", "util", "HbA1c 7,4; B12 normal.", "Neuropatía."),
    study("Otros", "cirugia-ya", "Cirugía inmediata sin tratamiento previo", "riesgoso", "No se realizó.", "Primero conservador."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("estenosis", "Estenosis de canal lumbar degenerativa con claudicación neurógena", true, "Mejora con flexión, pulsos normales y RM."),
      dx("arterial", "Enfermedad arterial periférica", false, "ITB normal."),
      dx("neuropatia", "Polineuropatía diabética", false, "Postural."),
      dx("hernia", "Hernia discal aguda", false, "Crónico, bilateral."),
      dx("cola", "Síndrome de cola de caballo", false, "Sin alarma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("kinesio", "Kinesioterapia con ejercicios en flexión y actividad", "clave", "Primera línea."),
      mg("analgesia", "Paracetamol; AINE breve con cautela", "clave", "Dolor."),
      mg("cirugia", "Descompresión si falla y afecta mucho la vida", "util", "Selectivo."),
      mg("alarma", "Pautas de alarma", "clave", "Cola de caballo."),
      mg("opioides", "Opioides de largo plazo", "riesgoso", "Riesgos."),
      mg("reposo", "Reposo en cama", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Estenosis de canal lumbar degenerativa L3-L5 con claudicación neurógena, en varón de 71 años.",
    pathologies: [
      { name: "Estenosis lumbar", role: "principal", why: "Compresión de raíces." },
      { name: "Artrosis", role: "asociada", why: "Causa." },
      { name: "Arterial, neuropatía", role: "diferencial", why: "Claudicaciones." },
    ],
    reasoning: [
      "Causa: degeneración de discos, facetas y ligamento amarillo.",
      "Mecanismo: la extensión estrecha el canal; la flexión lo amplía.",
      "Consecuencia: claudicación neurógena.",
    ],
    epidemiology:
      "Es la causa más frecuente de cirugía de columna en mayores de 65. Se confunde con la claudicación vascular. La mejoría al flexionar (signo del carrito del súper) es muy orientadora.",
    management: [
      "Distinguir de vascular.",
      "RM.",
      "Conservador.",
      "Cirugía selectiva.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Patología de columna.", "North American Spine Society — Lumbar Spinal Stenosis Guideline."],
    pearls: ["Signo del carrito.", "Pulsos normales.", "Mejora sentado."],
    pitfalls: ["Confundir con vascular.", "Reposo."],
    tribunal: [
      qa("¿Cómo diferenciás claudicación neurógena y vascular?", "Neurógena: mejora sentado o en flexión, pulsos normales. Vascular: mejora al detenerse de pie, pulsos débiles."),
      qa("¿Qué signos tiene el síndrome de cola de caballo?", "Anestesia en silla de montar, retención urinaria y debilidad bilateral."),
      qa("¿Qué es la espondilolistesis?", "Desplazamiento de una vértebra sobre otra, que puede estrechar el canal."),
    ],
  },
};
