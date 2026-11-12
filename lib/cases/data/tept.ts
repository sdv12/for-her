import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tept: ClinicalCase = {
  id: "trastorno-estres-postraumatico",
  level: 2,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Sufrió un asalto con arma hace 5 meses volviendo del trabajo." },
  frequency: "frecuente",
  intro: "“No duermo, sueño con el asalto, me sobresalto con cualquier ruido y dejé de tomar el colectivo.”",
  vitals: { TA: "128/80 mmHg", FC: "92 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("reexperimentar", "¿Recuerdos que aparecen solos o pesadillas?", "clave", "“Todo el tiempo.”", "Reexperimentación."),
    act("evitacion", "¿Evitás lugares o situaciones?", "clave", "“No tomo el colectivo y falté al trabajo.”", "Evitación."),
    act("riesgo", "¿Pensaste en lastimarte?", "clave", "“A veces que no quiero seguir así.”", "Riesgo suicida."),
    act("consumo", "¿Alcohol o pastillas para dormir?", "util", "“Tomo vino para dormir.”", "Automedicación."),
    act("hipervigilancia", "¿Estás alerta o irritable?", "util", "“Muy irritable.”", "Hiperactivación."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy enfermera.”", "No orienta."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Ansiosa, hipervigilante, sin psicosis.", "Base."),
    act("animo", "Ánimo", "clave", "Triste, culpa.", "Depresión comórbida."),
    act("fisico", "Examen general", "util", "Taquicardia leve.", "Hiperactivación."),
  ],
  studies: [
    study("Otros", "pcl5", "Escala PCL-5", "clave", "Puntaje alto.", "Gravedad."),
    study("Otros", "riesgo", "Evaluación de riesgo suicida estructurada", "clave", "Ideación pasiva, sin plan.", "Plan de seguridad."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal.", "Excluye."),
    study("Imágenes", "rmn", "RM de cerebro", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tept", "Trastorno por estrés postraumático con síntomas depresivos", true, "Trauma, reexperimentación, evitación e hiperactivación por más de un mes."),
      dx("agudo", "Trastorno por estrés agudo", false, "Más de un mes."),
      dx("panico", "Trastorno de pánico", false, "Ligado al trauma."),
      dx("adaptativo", "Trastorno adaptativo", false, "Cumple criterios de TEPT."),
      dx("depresion", "Depresión mayor aislada", false, "Hay síntomas específicos de trauma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("psicoterapia", "Psicoterapia centrada en el trauma (TCC, EMDR)", "clave", "Primera línea."),
      mg("isrs", "ISRS (sertralina o paroxetina)", "clave", "Fármaco de elección."),
      mg("seguridad", "Plan de seguridad y contacto de crisis", "clave", "Ideación."),
      mg("alcohol", "Abordar el alcohol", "util", "Comorbilidad."),
      mg("benzo", "Benzodiacepinas", "riesgoso", "Empeoran el pronóstico."),
      mg("debriefing", "Contar el trauma en detalle sin preparación en la primera consulta", "riesgoso", "Puede retraumatizar."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno por estrés postraumático tras un asalto con arma, con síntomas depresivos y consumo de alcohol, en mujer de 33 años.",
    pathologies: [
      { name: "Trastorno por estrés postraumático", role: "principal", why: "Respuesta patológica al trauma." },
      { name: "Depresión y alcohol", role: "asociada", why: "Comorbilidad." },
      { name: "Estrés agudo, pánico", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: exposición a un evento traumático.",
      "Mecanismo: alteración de la memoria del miedo.",
      "Consecuencia: reexperimentación, evitación e hiperactivación.",
    ],
    epidemiology:
      "Una parte de las personas expuestas a trauma desarrolla TEPT, y es más frecuente en mujeres. La violencia urbana, la violencia de género y los accidentes son causas comunes. Las benzodiacepinas no previenen ni tratan el TEPT.",
    management: [
      "Preguntar por trauma.",
      "Riesgo suicida.",
      "Psicoterapia.",
      "ISRS.",
    ],
    sources: ["Asociación de Psiquiatras Argentinos — Trastornos relacionados con trauma.", "NICE — Post-traumatic Stress Disorder Guideline."],
    pearls: ["Reexperimentación, evitación e hiperactivación.", "Más de un mes.", "Sin benzodiacepinas."],
    pitfalls: ["Benzodiacepinas.", "No evaluar suicidio."],
    tribunal: [
      qa("¿Cuánto debe durar para diagnosticar TEPT?", "Más de un mes; si es menos, se habla de estrés agudo."),
      qa("¿Qué es la terapia de exposición?", "Abordaje gradual y controlado de recuerdos y situaciones evitadas."),
      qa("¿Qué fármaco ayuda con pesadillas?", "Prazosina, en casos seleccionados."),
    ],
  },
};
