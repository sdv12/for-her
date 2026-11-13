import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const depresionPostinfarto: ClinicalCase = {
  id: "depresion-postinfarto",
  level: 2,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 59, ageUnit: "años", sex: "M", context: "IAM con angioplastia hace 3 meses. Taxista. Lo trae la esposa al control cardiológico." },
  frequency: "frecuente",
  intro: "“Desde el infarto no tengo ganas de nada, no volví a trabajar, duermo mal y siento que soy una carga.”",
  vitals: { TA: "128/78 mmHg", FC: "66 lpm", "T°": "36,4 °C", Peso: "80 kg" },
  anamnesis: [
    act("animo", "¿Cuánto hace que se siente así, casi todos los días?", "clave", "“Hace dos meses, todos los días.”", "Duración mayor a dos semanas."),
    act("anhedonia", "¿Disfruta algo?", "clave", "“Nada, ni el fútbol.”", "Anhedonia."),
    act("suicidio", "¿Pensó que estaría mejor muerto o en hacerse daño?", "clave", "“A veces pienso que sería mejor no despertarme.”", "Ideación pasiva."),
    act("adherencia", "¿Toma la medicación del corazón?", "util", "“Me olvido seguido.”", "La depresión reduce la adherencia."),
    act("alcohol", "¿Toma alcohol?", "util", "“Más que antes.”", "Comorbilidad."),
    act("equipo", "¿De qué equipo es?", "neutro", "“De Belgrano.”", "No orienta."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Hipomímico, discurso lento, sin psicosis.", "Depresión."),
    act("cardio", "Examen cardiovascular", "clave", "Sin signos de insuficiencia cardíaca.", "Descartar causa orgánica de la fatiga."),
    act("peso-ex", "Peso", "util", "Bajó 4 kg.", "Síntoma somático."),
  ],
  studies: [
    study("Otros", "phq9", "PHQ-9", "clave", "17 puntos.", "Depresión moderada a grave."),
    study("Otros", "riesgo", "Evaluación de riesgo suicida", "clave", "Ideación pasiva, sin plan ni intentos.", "Riesgo bajo a moderado."),
    study("Laboratorio", "lab", "TSH, hemograma, función renal, ionograma", "util", "Normales.", "Descartar causas orgánicas."),
    study("Imágenes", "rm", "RM de cerebro", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("depresion", "Episodio depresivo mayor posinfarto", true, "Ánimo bajo y anhedonia por más de dos semanas, insomnio, pérdida de peso, culpa e ideación pasiva tras un IAM."),
      dx("adaptativo", "Trastorno adaptativo", false, "Cumple criterios de episodio depresivo mayor."),
      dx("ic", "Insuficiencia cardíaca", false, "Sin signos de congestión."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("betabloqueante", "Depresión por betabloqueantes", false, "Los betabloqueantes no causan depresión significativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sertralina", "Sertralina", "clave", "ISRS seguro en cardiopatía isquémica."),
      mg("psicoterapia", "Psicoterapia", "clave", "Efectiva y combinable."),
      mg("rehabilitacion", "Rehabilitación cardíaca", "clave", "Mejora el ánimo y el pronóstico."),
      mg("seguimiento", "Plan de seguridad y control cercano", "util", "Ideación."),
      mg("triciclicos", "Antidepresivos tricíclicos", "riesgoso", "Arritmias y toxicidad cardíaca."),
      mg("normalizar", "Decirle que es normal y esperar", "riesgoso", "La depresión posinfarto aumenta la mortalidad."),
    ],
  },
  debrief: {
    diagnosis: "Episodio depresivo mayor posinfarto con ideación suicida pasiva, en varón de 59 años.",
    pathologies: [
      { name: "Depresión mayor", role: "principal", why: "Trastorno del ánimo." },
      { name: "Cardiopatía isquémica y mala adherencia", role: "asociada", why: "Relación bidireccional." },
      { name: "Trastorno adaptativo, IC", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: impacto psicológico del infarto y factores biológicos compartidos.",
      "Mecanismo: inflamación, activación autonómica y conductas de salud deficientes.",
      "Consecuencia: peor adherencia, más eventos y mayor mortalidad cardiovascular.",
    ],
    epidemiology:
      "Alrededor de uno de cada cinco pacientes tiene depresión mayor después de un infarto. Duplica el riesgo de nuevos eventos y muerte. Los varones consultan menos por síntomas emocionales y suelen manifestarlos como irritabilidad o consumo de alcohol.",
    management: [
      "Tamizaje en el posinfarto.",
      "Riesgo suicida.",
      "Sertralina y psicoterapia.",
      "Rehabilitación cardíaca.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Rehabilitación cardiovascular.", "AHA — Depression as a Risk Factor for Poor Prognosis Among Patients with Acute Coronary Syndrome."],
    pearls: ["Preguntá por el ánimo en el posinfarto.", "Sertralina es segura.", "Rehabilitación ayuda."],
    pitfalls: ["Tricíclicos.", "Normalizar."],
    tribunal: [
      qa("¿Qué preguntas tiene el PHQ-2?", "Pérdida de interés o placer y sentirse triste o sin esperanza en las últimas dos semanas."),
      qa("¿Por qué la depresión empeora el pronóstico cardíaco?", "Por menor adherencia, inflamación, menor variabilidad de la FC y conductas de riesgo."),
      qa("¿Qué ISRS tiene más evidencia en cardiopatía?", "La sertralina y el escitalopram, este último cuidando el QT."),
    ],
  },
};
