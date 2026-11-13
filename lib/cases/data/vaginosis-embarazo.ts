import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vaginosisEmbarazo: ClinicalCase = {
  id: "vaginosis-bacteriana-embarazo",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Embarazo de 20 semanas. Tuvo un parto prematuro a las 33 semanas en su primer embarazo." },
  frequency: "frecuente",
  intro: "“Tengo un flujo grisáceo con olor a pescado, sobre todo después de las relaciones. No me pica.”",
  vitals: { TA: "108/66 mmHg", FC: "82 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("flujo", "¿Cómo es el flujo?", "clave", "“Gris, líquido, con olor feo.”", "Típico de vaginosis."),
    act("prurito", "¿Picazón o ardor?", "clave", "“No.”", "No es candidiasis ni tricomonas."),
    act("prematuro", "¿Cómo fueron tus partos anteriores?", "clave", "“Uno prematuro a las 33 semanas.”", "Alto riesgo de prematurez."),
    act("contracciones", "¿Contracciones o pérdida de líquido?", "util", "“No.”", "Amenaza de parto prematuro."),
    act("duchas", "¿Hacés duchas vaginales?", "util", "“Sí, para el olor.”", "Factor de riesgo."),
    act("hijo", "¿Cuántos años tiene tu hijo?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Flujo grisáceo homogéneo adherido a las paredes, sin inflamación.", "Vaginosis."),
    act("cuello", "Cuello uterino", "clave", "Cerrado, sin modificaciones.", "Sin amenaza."),
    act("lcf", "Latidos fetales", "util", "Presentes.", "Vitalidad."),
  ],
  studies: [
    study("Laboratorio", "amsel", "pH vaginal, test de aminas y examen en fresco", "clave", "pH 5,2; aminas positivas; clue cells.", "Criterios de Amsel."),
    study("Laboratorio", "nugent", "Gram de flujo (Nugent)", "util", "Puntaje 8.", "Confirma."),
    study("Imágenes", "cervicometria", "Cervicometría por ecografía", "util", "Cuello de 32 mm.", "Riesgo de prematurez."),
    study("Microbiología", "cultivo", "Cultivo de flujo para Gardnerella", "innecesario", "No se realizó.", "No es diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vaginosis", "Vaginosis bacteriana en el embarazo con antecedente de parto prematuro", true, "Flujo grisáceo con olor a pescado, pH mayor de 4,5, aminas y clue cells."),
      dx("candidiasis", "Candidiasis vulvovaginal", false, "Sin prurito y con pH alto."),
      dx("tricomoniasis", "Tricomoniasis", false, "Sin inflamación ni trofozoítos."),
      dx("rpm", "Rotura prematura de membranas", false, "No hay pérdida de líquido."),
      dx("fisiologico", "Flujo fisiológico del embarazo", false, "Olor y criterios de Amsel positivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metronidazol", "Metronidazol oral o clindamicina", "clave", "Tratamiento en sintomáticas, seguro en el embarazo."),
      mg("control", "Control prenatal de alto riesgo por el parto prematuro previo", "clave", "Riesgo de recurrencia."),
      mg("duchas", "Suspender duchas vaginales", "clave", "Alteran la flora."),
      mg("progesterona", "Progesterona vaginal si el cuello se acorta", "util", "Prevención de prematurez."),
      mg("pareja", "Tratar a la pareja varón", "innecesario", "No reduce recurrencias."),
      mg("no-tratar", "No tratar por estar embarazada", "riesgoso", "Se trata en sintomáticas."),
    ],
  },
  debrief: {
    diagnosis: "Vaginosis bacteriana sintomática en embarazada de 20 semanas con antecedente de parto prematuro.",
    pathologies: [
      { name: "Vaginosis bacteriana", role: "principal", why: "Disbiosis vaginal." },
      { name: "Riesgo de parto prematuro", role: "asociada", why: "Antecedente y asociación." },
      { name: "Candidiasis, tricomoniasis", role: "diferencial", why: "Otras vulvovaginitis." },
    ],
    reasoning: [
      "Causa: reemplazo de lactobacilos por anaerobios y Gardnerella.",
      "Mecanismo: aumento del pH y producción de aminas.",
      "Consecuencia: flujo maloliente y asociación con prematurez y rotura de membranas.",
    ],
    epidemiology:
      "Es la causa más frecuente de flujo vaginal en mujeres en edad fértil. En el embarazo se asocia a parto prematuro, aunque tratar a asintomáticas de bajo riesgo no demostró beneficio. Las duchas vaginales son un factor de riesgo.",
    management: [
      "Amsel.",
      "Metronidazol.",
      "Control de prematurez.",
      "Sin duchas.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de infecciones de transmisión sexual y flujo vaginal.", "CDC — Sexually Transmitted Infections Treatment Guidelines: Bacterial Vaginosis."],
    pearls: ["Olor a pescado sin picazón.", "pH mayor de 4,5.", "Tratar en el embarazo si hay síntomas."],
    pitfalls: ["No tratar.", "Tratar a la pareja."],
    tribunal: [
      qa("¿Cuáles son los criterios de Amsel?", "Flujo homogéneo, pH mayor de 4,5, test de aminas positivo y clue cells; tres de cuatro."),
      qa("¿Qué son las clue cells?", "Células epiteliales cubiertas de cocobacilos que borran sus bordes."),
      qa("¿Qué consejo das con metronidazol?", "Evitar alcohol durante el tratamiento por efecto disulfiram."),
    ],
  },
};
