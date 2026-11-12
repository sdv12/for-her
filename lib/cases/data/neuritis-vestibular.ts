import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neuritisVestibular: ClinicalCase = {
  id: "neuritis-vestibular",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Tuvo un resfrío hace 10 días. Sin factores de riesgo vascular." },
  frequency: "frecuente",
  intro: "“Desde ayer todo me da vueltas sin parar, vomito y no me puedo levantar. Oigo bien.”",
  vitals: { TA: "128/80 mmHg", FC: "88 lpm", "T°": "36,6 °C", Glucemia: "102 mg/dl" },
  anamnesis: [
    act("continuo", "¿Es continuo o en episodios?", "clave", "“Continuo desde ayer.”", "Síndrome vestibular agudo."),
    act("audicion", "¿Pérdida de audición o zumbido?", "clave", "“No.”", "Laberintitis o Ménière."),
    act("neuro", "¿Visión doble, dificultad para hablar o tragar, debilidad?", "clave", "“No.”", "ACV de fosa posterior."),
    act("cefalea", "¿Dolor de cabeza o nuca?", "util", "“No.”", "Disección vertebral."),
    act("virus", "¿Infección previa?", "util", "“Resfrío.”", "Antecedente."),
    act("hijos", "¿Tenés hijos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("hints", "HINTS: impulso cefálico, nistagmo, skew", "clave", "Impulso cefálico anormal a la derecha; nistagmo horizontal unidireccional; sin desviación vertical.", "Periférico."),
    act("marcha", "Marcha", "clave", "Inestable pero camina.", "Periférico."),
    act("neuro-ex", "Pares y cerebelo", "util", "Normales.", "Excluye ACV."),
  ],
  studies: [
    study("Otros", "hints-test", "Aplicar HINTS completo", "clave", "Periférico.", "Más sensible que la TC para ACV."),
    study("Laboratorio", "glucemia", "Glucemia", "util", "Normal.", "Base."),
    study("Imágenes", "rmn", "RM si HINTS central o factores de riesgo", "util", "No corresponde.", "ACV."),
    study("Imágenes", "tc", "TC de cerebro para descartar ACV de fosa posterior", "innecesario", "No se realizó.", "Poco sensible para ACV de fosa posterior."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neuritis", "Neuritis vestibular derecha", true, "Vértigo continuo sin hipoacusia, HINTS periférico y examen neurológico normal."),
      dx("acv", "ACV cerebeloso", false, "HINTS periférico, sin signos centrales."),
      dx("vppb", "VPPB", false, "Es continuo, no posicional."),
      dx("meniere", "Ménière", false, "No hay hipoacusia ni episodios."),
      dx("laberintitis", "Laberintitis", false, "No hay hipoacusia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Antieméticos y vestibulosupresores por pocos días", "clave", "Síntomas."),
      mg("corticoides", "Corticoides en los primeros días", "util", "Pueden mejorar la recuperación."),
      mg("rehab", "Rehabilitación vestibular temprana", "clave", "Compensación."),
      mg("alarma", "Pautas de alarma neurológica", "clave", "Por si fuera central."),
      mg("supresores-largo", "Vestibulosupresores por semanas", "riesgoso", "Retrasan la compensación."),
      mg("reposo", "Reposo absoluto prolongado", "riesgoso", "Retrasa la recuperación."),
    ],
  },
  debrief: {
    diagnosis: "Neuritis vestibular derecha, en mujer de 41 años tras infección viral.",
    pathologies: [
      { name: "Neuritis vestibular", role: "principal", why: "Inflamación del nervio vestibular." },
      { name: "Vómitos", role: "asociada", why: "Síntomas." },
      { name: "ACV, VPPB, Ménière", role: "diferencial", why: "Otros vértigos." },
    ],
    reasoning: [
      "Causa: probablemente viral.",
      "Mecanismo: desbalance vestibular agudo.",
      "Consecuencia: vértigo intenso que mejora en días.",
    ],
    epidemiology:
      "Es una causa común de síndrome vestibular agudo. Un porcentaje de los vértigos agudos son ACV de fosa posterior, que la TC puede no mostrar. Por eso el HINTS bien hecho es la herramienta clave en la guardia.",
    management: [
      "HINTS.",
      "Síntomas.",
      "Rehabilitación.",
      "Alarma.",
    ],
    sources: ["Sociedad Neurológica Argentina — Vértigo agudo.", "Bárány Society — Acute Vestibular Syndrome Criteria."],
    pearls: ["Impulso anormal: periférico.", "TC no descarta ACV de fosa posterior.", "Rehabilitar pronto."],
    pitfalls: ["Confiar en la TC.", "Supresores largo tiempo."],
    tribunal: [
      qa("¿Qué indica un HINTS central?", "Impulso cefálico normal, nistagmo que cambia de dirección o desviación vertical (skew)."),
      qa("¿Cómo diferenciás periférico y central?", "Periférico: nistagmo unidireccional, impulso anormal, sin signos neurológicos. Central: lo contrario y marcha imposible."),
      qa("¿Qué es la tríada de Ménière?", "Vértigo episódico, hipoacusia fluctuante y acúfenos con plenitud ótica."),
    ],
  },
};
