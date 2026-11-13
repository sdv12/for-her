import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abstinenciaAlcoholicaConvulsion: ClinicalCase = {
  id: "abstinencia-alcoholica-convulsion",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Toma una botella de vino y cerveza a diario hace 6 años. Dejó de golpe hace 30 horas porque se lo pidió su hija." },
  frequency: "frecuente",
  intro: "La trae la hija: “Tuvo una convulsión en casa, duró un minuto. Desde ayer tiembla, transpira y está muy nerviosa.”",
  vitals: { TA: "152/94 mmHg", FC: "118 lpm", FR: "20 rpm", "T°": "37,6 °C", "SatO₂": "97 %", Glucemia: "84 mg/dl" },
  anamnesis: [
    act("ultima", "¿Cuándo tomó la última vez?", "clave", "“Hace 30 horas.”", "Ventana de convulsiones por abstinencia."),
    act("consumo", "¿Cuánto toma por día?", "clave", "“Una botella de vino y dos litros de cerveza.”", "Dependencia."),
    act("convulsiones-previas", "¿Convulsiones sin alcohol o epilepsia?", "clave", "“Nunca.”", "Provocada."),
    act("alucinaciones", "¿Ve o escucha cosas raras?", "util", "“Veo bichitos en la pared.”", "Alucinosis."),
    act("trauma", "¿Se golpeó la cabeza?", "util", "“Al caer, en la frente.”", "TEC."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy peluquera.”", "No orienta."),
  ],
  exam: [
    act("temblor", "Temblor, sudoración y agitación", "clave", "Temblor grueso, diaforesis, ansiosa, orientada.", "Abstinencia moderada."),
    act("neuro", "Examen neurológico", "clave", "Sin foco; hematoma frontal pequeño.", "Sin déficit."),
    act("higado", "Hígado y estigmas", "util", "Hepatomegalia leve.", "Hepatopatía alcohólica."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, ionograma, magnesio, fósforo, hepatograma, CPK", "clave", "Mg 1,4; fósforo 2,1; GGT 380.", "Déficits a corregir."),
    study("Otros", "ciwa", "Escala CIWA-Ar", "clave", "22 puntos.", "Abstinencia moderada a grave."),
    study("Imágenes", "tc", "TC de cerebro por el golpe", "util", "Normal.", "Excluye hematoma."),
    study("Otros", "fenitoina", "Fenitoína para prevenir nuevas convulsiones", "riesgoso", "No se indicó.", "No sirve en convulsiones por abstinencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("abstinencia", "Síndrome de abstinencia alcohólica moderado a grave con convulsión y alucinosis", true, "Suspensión brusca tras consumo diario, convulsión a las 30 horas, temblor, hiperactividad autonómica y alucinaciones visuales con sensorio claro."),
      dx("delirium-tremens", "Delirium tremens", false, "Está orientada; aparece más tarde."),
      dx("epilepsia", "Epilepsia de debut", false, "Convulsión provocada por la abstinencia."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("tec", "Hematoma intracraneal", false, "TC normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("benzodiacepinas", "Diazepam o lorazepam guiado por CIWA", "clave", "Tratan y previenen convulsiones."),
      mg("tiamina", "Tiamina antes de la glucosa", "clave", "Previene Wernicke."),
      mg("electrolitos", "Reponer magnesio y fósforo", "clave", "Déficits."),
      mg("seguimiento", "Plan de tratamiento del consumo al alta", "util", "Evitar recaídas."),
      mg("haloperidol-solo", "Haloperidol solo para la agitación", "riesgoso", "Baja el umbral convulsivo."),
      mg("alta", "Alta tras la convulsión", "riesgoso", "Puede progresar a delirium tremens."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de abstinencia alcohólica moderado a grave con convulsión y alucinosis, en mujer de 38 años.",
    pathologies: [
      { name: "Abstinencia alcohólica", role: "principal", why: "Hiperexcitabilidad del SNC." },
      { name: "Hipomagnesemia e hipofosfatemia", role: "asociada", why: "Déficits que aumentan el riesgo." },
      { name: "Delirium tremens, epilepsia", role: "diferencial", why: "Otras complicaciones." },
    ],
    reasoning: [
      "Causa: suspensión brusca de un consumo crónico.",
      "Mecanismo: la falta de alcohol deja un sistema GABA deprimido y un glutamato aumentado.",
      "Consecuencia: temblor, convulsiones, alucinosis y delirium tremens.",
    ],
    epidemiology:
      "Las convulsiones por abstinencia aparecen entre las 6 y 48 horas, y una parte progresa a delirium tremens. Las mujeres con consumo problemático consultan menos y más tarde. Dejar de tomar de golpe sin acompañamiento médico es riesgoso.",
    management: [
      "CIWA.",
      "Benzodiacepinas.",
      "Tiamina y electrolitos.",
      "Tratamiento del consumo.",
    ],
    sources: ["SEDRONAR — Abordaje del consumo de alcohol.", "ASAM — Clinical Practice Guideline on Alcohol Withdrawal Management."],
    pearls: ["Convulsión a las 6 a 48 horas.", "Benzodiacepinas, no fenitoína.", "Tiamina siempre."],
    pitfalls: ["Fenitoína.", "Alta temprana."],
    tribunal: [
      qa("¿Cuándo aparece el delirium tremens?", "Entre las 48 y 96 horas de la última ingesta."),
      qa("¿Qué es la alucinosis alcohólica?", "Alucinaciones, sobre todo visuales, con sensorio claro, a las 12 a 24 horas."),
      qa("¿Qué fármacos ayudan a mantener la abstinencia?", "Naltrexona, acamprosato y disulfiram en casos seleccionados."),
    ],
  },
};
