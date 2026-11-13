import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaFerropenicaVaron: ClinicalCase = {
  id: "anemia-ferropenica-varon",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Jubilado ferroviario. Nunca se hizo colonoscopia. Come carne a diario." },
  frequency: "frecuente",
  intro: "“Me canso subiendo una escalera, estoy pálido y tengo ganas de comer hielo.”",
  vitals: { TA: "124/72 mmHg", FC: "96 lpm", "T°": "36,4 °C", Peso: "70 kg" },
  anamnesis: [
    act("sangrado", "¿Sangre en la materia fecal o materia fecal negra?", "clave", "“No vi nada.”", "Pérdida oculta."),
    act("habito", "¿Cambió el hábito intestinal?", "clave", "“Algo más de diarrea.”", "Colon derecho."),
    act("dieta", "¿Come carne?", "clave", "“Todos los días.”", "No es carencial."),
    act("aines", "¿Toma aspirina o antiinflamatorios?", "util", "“No.”", "Otras causas."),
    act("peso", "¿Bajó de peso?", "util", "“Tres kilos.”", "Alarma."),
    act("trenes", "¿Qué hacía en el ferrocarril?", "neutro", "“Era guarda.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Piel y mucosas", "clave", "Palidez, coiloniquia leve.", "Ferropenia crónica."),
    act("abdomen", "Abdomen", "clave", "Masa dudosa en fosa ilíaca derecha.", "Tumor de colon derecho."),
    act("tacto", "Tacto rectal", "util", "Sin sangre visible.", "Base."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y ferritina", "clave", "Hb 8,6; VCM 68; ferritina 6.", "Anemia ferropénica."),
    study("Otros", "colonoscopia", "Endoscopia alta y colonoscopia", "clave", "Endoscopia normal; tumor ulcerado en ciego, biopsia adenocarcinoma.", "Causa."),
    study("Laboratorio", "celiaquia", "Antitransglutaminasa", "util", "Negativa.", "Malabsorción."),
    study("Otros", "hierro-solo", "Dar hierro y controlar en 6 meses sin estudiar", "riesgoso", "No se hizo.", "Retrasa el diagnóstico de cáncer."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anemia-colon", "Anemia ferropénica por pérdida digestiva oculta de un adenocarcinoma de ciego", true, "Varón mayor con ferropenia sin dieta deficiente, masa en fosa ilíaca derecha y tumor en la colonoscopia."),
      dx("carencial", "Anemia ferropénica por dieta", false, "Come carne a diario."),
      dx("talasemia", "Talasemia menor", false, "Ferritina baja."),
      dx("enfermedad-cronica", "Anemia de enfermedad crónica", false, "Ferritina muy baja."),
      dx("celiaquia", "Celiaquía", false, "Serología negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Estadificación y derivación a cirugía (hemicolectomía derecha)", "clave", "Tratamiento del tumor."),
      mg("hierro", "Hierro EV antes de la cirugía", "clave", "Repone rápido."),
      mg("explicar", "Explicar el diagnóstico con tiempo y acompañamiento", "clave", "Comunicación."),
      mg("familia", "Indicar colonoscopia a familiares de primer grado", "util", "Prevención."),
      mg("transfusion", "Transfundir con Hb 8,6 estable", "riesgoso", "Sin indicación."),
      mg("solo-hierro", "Solo hierro oral sin estudiar", "riesgoso", "Retrasa el cáncer."),
    ],
  },
  debrief: {
    diagnosis: "Anemia ferropénica por pérdida digestiva oculta secundaria a adenocarcinoma de ciego, en varón de 66 años.",
    pathologies: [
      { name: "Anemia ferropénica", role: "principal", why: "Pérdida crónica de sangre." },
      { name: "Adenocarcinoma de colon derecho", role: "asociada", why: "Causa." },
      { name: "Talasemia, celiaquía", role: "diferencial", why: "Otras anemias microcíticas." },
    ],
    reasoning: [
      "Causa: tumor de ciego que sangra en forma oculta.",
      "Mecanismo: pérdida crónica de hierro que agota los depósitos.",
      "Consecuencia: anemia microcítica, fatiga y pica.",
    ],
    epidemiology:
      "En varones y mujeres posmenopáusicas, la anemia ferropénica es pérdida digestiva hasta demostrar lo contrario. Los tumores de colon derecho suelen sangrar en forma oculta y presentarse como anemia. El tamizaje de cáncer colorrectal empieza a los 50 años.",
    management: [
      "Confirmar ferropenia.",
      "Endoscopia alta y baja.",
      "Hierro.",
      "Tratar la causa.",
    ],
    sources: ["Sociedad Argentina de Hematología — Anemia ferropénica.", "British Society of Gastroenterology — Guidelines for the Management of Iron Deficiency Anaemia in Adults."],
    pearls: ["Varón con ferropenia: estudiá el tubo digestivo.", "Colon derecho sangra oculto.", "Pica de hielo."],
    pitfalls: ["Solo hierro.", "Asumir dieta."],
    tribunal: [
      qa("¿Qué es la pagofagia?", "Deseo compulsivo de comer hielo, típico de la ferropenia."),
      qa("¿Qué estudios pedís en anemia ferropénica sin causa en un varón?", "Endoscopia alta y colonoscopia, y serología de celiaquía."),
      qa("¿Por qué el colon derecho sangra oculto?", "Porque la materia fecal es líquida y la sangre se mezcla y degrada antes de salir."),
    ],
  },
};
