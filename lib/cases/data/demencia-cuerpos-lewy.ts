import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const demenciaCuerposLewy: ClinicalCase = {
  id: "demencia-cuerpos-lewy",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 73, ageUnit: "años", sex: "M", context: "Lo trae la esposa. Hace años grita y patea dormido." },
  frequency: "frecuente",
  intro: "“Tiene días buenos y días muy confundido, ve chicos en el patio que no están y camina más lento.” (relata la esposa)",
  vitals: { TA: "132/78 mmHg (acostado) – 104/64 (de pie)", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("fluctuaciones", "¿Cambia de un día a otro?", "clave", "“Días lúcido y días perdido.”", "Fluctuaciones cognitivas."),
    act("alucinaciones", "¿Qué ve?", "clave", "“Chicos y perros, muy detallados.”", "Alucinaciones visuales bien formadas."),
    act("sueno", "¿Cómo duerme?", "clave", "“Patea y grita dormido hace años.”", "Trastorno de conducta del sueño REM."),
    act("antipsicotico", "¿Le dieron algo para las alucinaciones?", "util", "“Haloperidol y quedó duro como un palo.”", "Hipersensibilidad a neurolépticos."),
    act("caidas", "¿Se cae?", "util", "“Se mareó al pararse y se cayó.”", "Disautonomía."),
    act("trabajo", "¿Qué hacía?", "neutro", "“Era relojero.”", "No orienta."),
  ],
  exam: [
    act("parkinsonismo", "Tono y movimientos", "clave", "Rigidez y bradicinesia leves bilaterales, sin temblor.", "Parkinsonismo."),
    act("cognitivo", "Evaluación cognitiva", "clave", "Fallas atencionales y visoespaciales mayores que de memoria.", "Perfil típico."),
    act("ortostatismo", "Ortostatismo", "util", "Positivo.", "Disautonomía."),
  ],
  studies: [
    study("Imágenes", "rm", "RM de cerebro", "clave", "Atrofia leve, hipocampos relativamente conservados.", "Diferente del Alzheimer."),
    study("Laboratorio", "lab", "B12, TSH, VDRL, ionograma", "util", "Normales.", "Causas reversibles."),
    study("Imágenes", "datscan", "SPECT con trazador dopaminérgico", "util", "Captación reducida en estriado.", "Apoya."),
    study("Otros", "haloperidol-prueba", "Nueva prueba con haloperidol", "riesgoso", "No se hizo.", "Reacción grave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lewy", "Demencia con cuerpos de Lewy", true, "Fluctuaciones, alucinaciones visuales, trastorno del sueño REM, parkinsonismo y sensibilidad a neurolépticos."),
      dx("alzheimer", "Enfermedad de Alzheimer", false, "Predominan la atención y lo visoespacial, con fluctuaciones y alucinaciones."),
      dx("parkinson-demencia", "Demencia en enfermedad de Parkinson", false, "La demencia apareció antes o junto al parkinsonismo."),
      dx("delirium", "Delirium", false, "Es crónico con fluctuaciones de base."),
      dx("vascular", "Demencia vascular", false, "Sin infartos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rivastigmina", "Rivastigmina o donepecilo", "clave", "Mejoran cognición y alucinaciones."),
      mg("evitar-neurolepticos", "Evitar antipsicóticos típicos; si hace falta, quetiapina a dosis bajas", "clave", "Hipersensibilidad grave."),
      mg("caidas", "Prevención de caídas y manejo del ortostatismo", "clave", "Disautonomía."),
      mg("cuidador", "Apoyo al cuidador", "util", "Carga."),
      mg("haloperidol", "Haloperidol para las alucinaciones", "riesgoso", "Rigidez, caídas y muerte."),
      mg("levodopa-alta", "Levodopa en dosis altas", "riesgoso", "Empeora las alucinaciones."),
    ],
  },
  debrief: {
    diagnosis: "Demencia con cuerpos de Lewy con fluctuaciones, alucinaciones visuales, trastorno del sueño REM y parkinsonismo, en varón de 73 años.",
    pathologies: [
      { name: "Demencia con cuerpos de Lewy", role: "principal", why: "Sinucleinopatía." },
      { name: "Disautonomía y sensibilidad a neurolépticos", role: "asociada", why: "Riesgos clave." },
      { name: "Alzheimer, Parkinson con demencia", role: "diferencial", why: "Otras demencias." },
    ],
    reasoning: [
      "Causa: depósito de alfa-sinucleína (cuerpos de Lewy) en corteza y tronco.",
      "Mecanismo: déficit colinérgico y dopaminérgico.",
      "Consecuencia: fluctuaciones, alucinaciones, parkinsonismo y caídas.",
    ],
    epidemiology:
      "Es la segunda causa de demencia degenerativa después del Alzheimer. Se subdiagnostica y muchos pacientes reciben antipsicóticos que les hacen daño. El trastorno del sueño REM puede preceder por años.",
    management: [
      "Reconocer los rasgos.",
      "Anticolinesterásicos.",
      "Evitar neurolépticos.",
      "Caídas y cuidador.",
    ],
    sources: ["Sociedad Neurológica Argentina — Demencias.", "DLB Consortium — Fourth Consensus Report (McKeith)."],
    pearls: ["Ve personas, fluctúa, patea dormido.", "Nada de haloperidol.", "Rivastigmina."],
    pitfalls: ["Antipsicóticos típicos.", "Llamarlo Alzheimer."],
    tribunal: [
      qa("¿Qué es la regla del año?", "Si la demencia aparece antes o dentro del año del parkinsonismo es Lewy; si es más tarde, Parkinson con demencia."),
      qa("¿Qué es el trastorno de conducta del sueño REM?", "Pérdida de la atonía del REM, con movimientos que actúan los sueños."),
      qa("¿Qué antipsicótico es el menos riesgoso?", "Quetiapina o clozapina a dosis bajas."),
    ],
  },
};
