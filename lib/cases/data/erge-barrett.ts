import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ergeBarrett: ClinicalCase = {
  id: "esofago-barrett",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "Acidez desde hace 20 años, se automedica con antiácidos. Obeso, ex fumador." },
  frequency: "frecuente",
  intro: "“Tengo acidez casi todos los días hace años. Mi hermano tuvo cáncer de esófago y quiero chequearme.”",
  vitals: { TA: "134/84 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "98 kg" },
  anamnesis: [
    act("cronico", "¿Cuántos años con acidez?", "clave", "“Más de 20.”", "Factor de riesgo de Barrett."),
    act("alarma", "¿Le cuesta tragar, vomita sangre, bajó de peso?", "clave", "“No.”", "Sin alarma."),
    act("familia", "¿Familiares con cáncer de esófago?", "clave", "“Mi hermano.”", "Riesgo."),
    act("habitos", "¿Come tarde, fuma, toma alcohol?", "util", "“Ceno tarde y abundante.”", "Reflujo."),
    act("farmacos", "¿Qué toma?", "util", "“Antiácidos cuando me agarra.”", "Tratamiento insuficiente."),
    act("trabajo", "¿Trabaja?", "neutro", "“Tengo una ferretería.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Obesidad central, sin masas.", "Base."),
    act("ganglios", "Ganglio supraclavicular", "clave", "No palpable.", "Sin metástasis."),
    act("boca", "Boca y dientes", "util", "Erosiones dentales.", "Reflujo."),
  ],
  studies: [
    study("Otros", "veda", "Endoscopia alta con biopsias (protocolo de Seattle)", "clave", "Mucosa color salmón de 4 cm sobre la unión gastroesofágica.", "Barrett largo."),
    study("Laboratorio", "biopsia", "Biopsias", "clave", "Metaplasia intestinal sin displasia.", "Confirma Barrett."),
    study("Laboratorio", "hp", "Helicobacter pylori", "util", "Negativo.", "Base."),
    study("Imágenes", "pet", "PET-TC", "innecesario", "No se realizó.", "Sin cáncer."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("barrett", "Esófago de Barrett largo sin displasia por ERGE crónica", true, "Reflujo de 20 años, mucosa color salmón y metaplasia intestinal sin displasia."),
      dx("esofagitis", "Esofagitis péptica sola", false, "Hay metaplasia intestinal."),
      dx("adenocarcinoma", "Adenocarcinoma de esófago", false, "Sin displasia ni tumor."),
      dx("eosinofilica", "Esofagitis eosinofílica", false, "Metaplasia, no eosinófilos."),
      dx("hernia", "Hernia hiatal sola", false, "Hay metaplasia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ibp", "IBP diario", "clave", "Control del reflujo."),
      mg("vigilancia", "Endoscopia de vigilancia cada 3 a 5 años", "clave", "Detectar displasia."),
      mg("peso", "Bajar de peso y no cenar tarde", "clave", "Reduce el reflujo."),
      mg("ablacion-si-displasia", "Ablación endoscópica si aparece displasia", "util", "Prevención del cáncer."),
      mg("esofagectomia", "Esofagectomía", "riesgoso", "Desproporcionada sin displasia."),
      mg("solo-antiacidos", "Seguir con antiácidos a demanda sin control", "riesgoso", "Riesgo de progresión sin vigilancia."),
    ],
  },
  debrief: {
    diagnosis: "Esófago de Barrett largo sin displasia por ERGE crónica, en varón obeso de 61 años con antecedente familiar.",
    pathologies: [
      { name: "Esófago de Barrett", role: "principal", why: "Metaplasia intestinal por reflujo." },
      { name: "ERGE crónica y obesidad", role: "asociada", why: "Causa y factor." },
      { name: "Esofagitis, adenocarcinoma", role: "diferencial", why: "Espectro." },
    ],
    reasoning: [
      "Causa: reflujo ácido y biliar crónico.",
      "Mecanismo: reemplazo del epitelio escamoso por columnar intestinal.",
      "Consecuencia: riesgo de displasia y adenocarcinoma.",
    ],
    epidemiology:
      "Se encuentra en una parte de los pacientes con reflujo crónico, sobre todo varones blancos mayores de 50, obesos y fumadores. El riesgo anual de cáncer sin displasia es bajo pero real. La vigilancia endoscópica detecta displasia tratable.",
    management: [
      "Endoscopia en reflujo crónico con factores.",
      "Biopsias.",
      "IBP.",
      "Vigilancia.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Esófago de Barrett.", "ACG — Diagnosis and Management of Barrett's Esophagus Guideline."],
    pearls: ["Mucosa color salmón.", "Varón, obeso, reflujo crónico.", "Vigilancia."],
    pitfalls: ["Automedicación por años.", "Cirugía sin displasia."],
    tribunal: [
      qa("¿Qué es el protocolo de Seattle?", "Biopsias en cuatro cuadrantes cada 1 a 2 cm del segmento de Barrett."),
      qa("¿Qué cáncer se asocia al Barrett?", "El adenocarcinoma de esófago distal."),
      qa("¿Qué hacés si hay displasia de alto grado?", "Resección endoscópica y ablación por radiofrecuencia."),
    ],
  },
};
