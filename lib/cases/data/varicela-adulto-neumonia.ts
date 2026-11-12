import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const varicelaAdultoNeumonia: ClinicalCase = {
  id: "varicela-adulto-neumonia",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 32, ageUnit: "años", sex: "M", context: "Fumador. Nunca tuvo varicela. Su hijo tuvo hace 2 semanas." },
  frequency: "poco-frecuente",
  intro: "“Hace 3 días me salieron ampollas en todo el cuerpo y desde ayer tengo tos y me falta el aire.”",
  vitals: { TA: "118/72 mmHg", FC: "112 lpm", FR: "28 rpm", "T°": "38,9 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("contacto", "¿Contacto con varicela?", "clave", "“Mi hijo, hace 2 semanas.”", "Incubación."),
    act("respiratorio", "¿Tos, disnea, dolor de pecho?", "clave", "“Tos y falta de aire.”", "Neumonía."),
    act("riesgo", "¿Fumás? ¿Inmunosupresión?", "clave", "“Fumo.”", "Riesgo."),
    act("antecedente", "¿Tuviste varicela o vacuna?", "util", "“Nunca.”", "Susceptible."),
    act("convivientes", "¿Embarazadas en casa?", "util", "“No.”", "Prevención."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy chofer.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Lesiones en distintos estadios en todo el cuerpo.", "Varicela."),
    act("pulmon", "Pulmón", "clave", "Crepitantes bilaterales.", "Neumonía."),
    act("neuro", "Examen neurológico", "util", "Normal.", "Encefalitis."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados nodulares bilaterales.", "Neumonía."),
    study("Laboratorio", "gases", "Gases", "clave", "pO₂ 58.", "Hipoxemia."),
    study("Microbiología", "pcr", "PCR de lesiones", "util", "Varicela-zóster positiva.", "Confirma."),
    study("Otros", "aspirina", "Aspirina para la fiebre", "riesgoso", "No se indicó.", "Síndrome de Reye."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("varicela", "Neumonía por varicela en adulto fumador", true, "Contacto, exantema en distintos estadios, hipoxemia e infiltrados."),
      dx("bacteriana", "Neumonía bacteriana aislada", false, "Exantema y PCR."),
      dx("viruela", "Mpox", false, "Lesiones en distintos estadios."),
      dx("herpes", "Herpes diseminado", false, "Contacto y patrón."),
      dx("drogas", "Reacción a fármacos", false, "Sin fármacos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aciclovir", "Aciclovir EV", "clave", "Reduce mortalidad."),
      mg("internar", "Internar con oxígeno y aislamiento respiratorio y de contacto", "clave", "Grave y contagiosa."),
      mg("contactos", "Profilaxis a contactos susceptibles", "clave", "Vacuna o inmunoglobulina."),
      mg("tabaco", "Dejar de fumar", "util", "Riesgo."),
      mg("aspirina-mg", "Aspirina", "riesgoso", "Reye."),
      mg("ambulatorio", "Aciclovir oral y alta", "riesgoso", "Hipoxemia."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía por varicela en adulto de 32 años fumador, sin antecedente de enfermedad ni vacuna.",
    pathologies: [
      { name: "Neumonía varicelosa", role: "principal", why: "Complicación grave en adultos." },
      { name: "Tabaquismo", role: "asociada", why: "Riesgo." },
      { name: "Bacteriana, mpox", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus varicela-zóster.",
      "Mecanismo: viremia con compromiso pulmonar.",
      "Consecuencia: hipoxemia y riesgo de muerte.",
    ],
    epidemiology:
      "La varicela es más grave en adultos, embarazadas e inmunosuprimidos, y la neumonía es la complicación principal, sobre todo en fumadores. La vacuna está en el calendario argentino desde 2015.",
    management: [
      "Sospechar.",
      "Aciclovir EV.",
      "Aislar.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Varicela: vigilancia y vacunación.", "Sociedad Argentina de Infectología — Infecciones virales."],
    pearls: ["Adulto con varicela y tos: neumonía.", "Aciclovir EV.", "Sin aspirina."],
    pitfalls: ["Alta.", "No aislar."],
    tribunal: [
      qa("¿Qué complicaciones tiene la varicela?", "Sobreinfección bacteriana, neumonía, encefalitis, ataxia cerebelosa y Reye."),
      qa("¿Cuándo es contagiosa?", "Desde 1 a 2 días antes del exantema hasta que todas las lesiones son costra."),
      qa("¿Qué profilaxis tiene un contacto?", "Vacuna en las primeras 72 a 120 horas o inmunoglobulina en inmunosuprimidos y embarazadas."),
    ],
  },
};
