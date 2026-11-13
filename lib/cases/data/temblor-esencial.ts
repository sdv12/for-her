import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const temblorEsencial: ClinicalCase = {
  id: "temblor-esencial",
  level: 1,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 62, ageUnit: "años", sex: "F", context: "Costurera. Su padre temblaba igual." },
  frequency: "frecuente",
  intro: "“Me tiemblan las manos cuando enhebro una aguja o llevo la taza a la boca. Con un vaso de vino me calmo.”",
  vitals: { TA: "124/78 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("cuando", "¿En qué momento tiembla?", "clave", "“Cuando uso las manos, no en reposo.”", "Temblor de acción."),
    act("familia", "¿Alguien en la familia tiembla?", "clave", "“Mi papá y mi tía.”", "Herencia."),
    act("alcohol", "¿Mejora con el alcohol?", "clave", "“Sí.”", "Típico."),
    act("farmacos", "¿Toma salbutamol, litio, valproato o antidepresivos?", "util", "“No.”", "Temblor por fármacos."),
    act("tiroides", "¿Palpitaciones, calor, pérdida de peso?", "util", "“No.”", "Hipertiroidismo."),
    act("nietos", "¿Qué cose?", "neutro", "“Ropa para mis nietos.”", "No orienta."),
  ],
  exam: [
    act("temblor-ex", "Temblor con brazos extendidos y prueba dedo-nariz", "clave", "Temblor postural y cinético bilateral; también leve en la cabeza (sí-sí).", "Temblor esencial."),
    act("parkinson", "Rigidez, bradicinesia y marcha", "clave", "Ausentes.", "No es Parkinson."),
    act("espiral", "Dibujo de espiral", "util", "Espiral irregular con oscilaciones en un eje.", "Objetiva el temblor."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH", "clave", "Normal.", "Descartar hipertiroidismo."),
    study("Laboratorio", "lab", "Glucemia, función hepática y renal", "util", "Normales.", "Causas metabólicas."),
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Suficiente.", "No requiere más."),
    study("Imágenes", "datscan", "SPECT con trazador dopaminérgico", "innecesario", "No se realizó.", "Solo si hay dudas con Parkinson."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("esencial", "Temblor esencial", true, "Temblor postural y de acción bilateral, familiar, que mejora con alcohol, sin signos parkinsonianos."),
      dx("parkinson", "Enfermedad de Parkinson", false, "Es de reposo, asimétrico y con bradicinesia."),
      dx("hipertiroidismo", "Temblor por hipertiroidismo", false, "TSH normal."),
      dx("fisiologico", "Temblor fisiológico exacerbado", false, "Es familiar, progresivo y afecta la cabeza."),
      dx("cerebeloso", "Temblor cerebeloso", false, "Sin ataxia ni dismetría."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("propranolol", "Propranolol", "clave", "Primera línea."),
      mg("primidona", "Primidona como alternativa", "clave", "Primera línea."),
      mg("explicar", "Explicar que no es Parkinson y es benigno", "clave", "Tranquilidad."),
      mg("adaptaciones", "Adaptaciones: cubiertos pesados, vasos con tapa", "util", "Funcionalidad."),
      mg("levodopa", "Levodopa", "innecesario", "No responde."),
      mg("alcohol-tto", "Recomendar alcohol diario para el temblor", "riesgoso", "Dependencia y rebote."),
    ],
  },
  debrief: {
    diagnosis: "Temblor esencial familiar de manos y cabeza, en mujer de 62 años.",
    pathologies: [
      { name: "Temblor esencial", role: "principal", why: "Trastorno del movimiento más frecuente." },
      { name: "Impacto funcional", role: "asociada", why: "Limita tareas finas." },
      { name: "Parkinson, hipertiroidismo", role: "diferencial", why: "Otros temblores." },
    ],
    reasoning: [
      "Causa: herencia autosómica dominante en muchos casos.",
      "Mecanismo: oscilación anormal en el circuito cerebelo-tálamo-cortical.",
      "Consecuencia: temblor de acción progresivo.",
    ],
    epidemiology:
      "Es el trastorno del movimiento más frecuente, varias veces más que el Parkinson. Aumenta con la edad y suele ser familiar. Muchos pacientes consultan con miedo a tener Parkinson.",
    management: [
      "Clínica.",
      "TSH.",
      "Propranolol o primidona.",
      "Adaptaciones.",
    ],
    sources: ["Sociedad Neurológica Argentina — Trastornos del movimiento.", "AAN — Evidence-based Guideline Update: Treatment of Essential Tremor."],
    pearls: ["De acción, no de reposo.", "Mejora con alcohol.", "Familiar."],
    pitfalls: ["Rotular Parkinson.", "Recomendar alcohol."],
    tribunal: [
      qa("¿Cómo distinguís temblor esencial de Parkinson?", "El esencial es de acción y bilateral; el de Parkinson es de reposo, asimétrico y con bradicinesia."),
      qa("¿Cuándo no se usa propranolol?", "En asma, bloqueo AV o bradicardia."),
      qa("¿Qué opción hay en casos graves?", "Estimulación cerebral profunda del tálamo o ultrasonido focalizado."),
    ],
  },
};
