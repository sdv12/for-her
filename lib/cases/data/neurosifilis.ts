import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neurosifilis: ClinicalCase = {
  id: "sifilis-neurosifilis",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 49, ageUnit: "años", sex: "M", context: "Separado hace años. Parejas sexuales ocasionales. Sin controles." },
  frequency: "poco-frecuente",
  intro: "“Mi hermano está muy raro, olvidadizo, irritable y trastabilla al caminar. Hace meses dice cosas que no son.”",
  vitals: { TA: "124/78 mmHg", FC: "76 lpm", "T°": "36,6 °C", "SatO₂": "98 %", Peso: "70 kg" },
  anamnesis: [
    act("cognitivo", "¿Cómo cambió su conducta?", "clave", "“Gastó todo, está desinhibido.”", "Paresia general."),
    act("its", "¿Tuvo úlceras, manchas o ITS?", "clave", "“Una llaga hace 15 años.”", "Sífilis no tratada."),
    act("marcha", "¿Dolor lancinante, trastabillar en la oscuridad?", "clave", "“Sí, no puede de noche.”", "Tabes dorsal."),
    act("vih", "¿Test de VIH?", "util", "“No.”", "Coinfección."),
    act("sustancias", "¿Alcohol o drogas?", "util", "“No.”", "Otras causas."),
    act("trabajo", "¿A qué se dedica?", "neutro", "“Era plomero.”", "No orienta."),
  ],
  exam: [
    act("pupilas", "Pupilas", "clave", "Pupilas de Argyll-Robertson.", "Muy específico."),
    act("marcha-ex", "Marcha y reflejos", "clave", "Romberg positivo, marcha taloneante, aquilianos abolidos.", "Cordones posteriores."),
    act("cognitivo-ex", "Evaluación cognitiva", "util", "MMSE 22; juicio alterado.", "Paresia."),
  ],
  studies: [
    study("Laboratorio", "serologia", "VDRL y prueba treponémica en sangre", "clave", "VDRL 1/64; FTA-Abs positiva.", "Base."),
    study("Otros", "lcr", "Punción lumbar con VDRL en LCR", "clave", "Linfocitos, proteínas altas, VDRL reactiva.", "Confirma."),
    study("Laboratorio", "vih", "VIH, B12 y TSH", "clave", "VIH negativo; normales.", "Otras causas."),
    study("Imágenes", "rmn", "RM de encéfalo y médula", "util", "Atrofia cortical.", "Excluye."),
    study("Otros", "biopsia", "Biopsia cerebral", "riesgoso", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neuro", "Neurosífilis tardía (paresia general y tabes dorsal)", true, "Argyll-Robertson, Romberg, deterioro y VDRL en LCR."),
      dx("alzheimer", "Alzheimer", false, "Edad joven y VDRL reactiva."),
      dx("b12", "Déficit de B12", false, "B12 normal."),
      dx("esquizofrenia", "Esquizofrenia", false, "Hay signos neurológicos."),
      dx("vih-demencia", "Demencia por VIH", false, "VIH negativo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina G cristalina EV por 10 a 14 días", "clave", "Tratamiento."),
      mg("alergia", "Desensibilizar en caso de alergia", "util", "Sin alternativa adecuada."),
      mg("pareja", "Estudiar a las parejas, notificar", "clave", "Salud pública."),
      mg("seguimiento", "Seguimiento clínico y VDRL", "clave", "Evalúa respuesta."),
      mg("benzatinica", "Penicilina benzatínica IM una dosis", "riesgoso", "No alcanza niveles en el SNC."),
      mg("antipsicotico", "Solo antipsicóticos", "riesgoso", "No trata."),
    ],
  },
  debrief: {
    diagnosis: "Neurosífilis tardía con paresia general y tabes dorsal, en varón de 49 años.",
    pathologies: [
      { name: "Neurosífilis", role: "principal", why: "Infección del SNC." },
      { name: "Deterioro cognitivo", role: "asociada", why: "Consecuencia." },
      { name: "Alzheimer, B12, esquizofrenia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: Treponema pallidum no tratado.",
      "Mecanismo: invasión del SNC con inflamación crónica.",
      "Consecuencia: demencia y ataxia.",
    ],
    epidemiology:
      "Los casos de sífilis han crecido en Argentina durante la última década, sobre todo en jóvenes. La neurosífilis puede aparecer en cualquier estadio y se considera en casos de deterioro cognitivo, ataxia o alteración pupilar. La detección y el tratamiento precoces la evitan.",
    management: [
      "Serologías y LCR.",
      "Penicilina EV.",
      "Parejas.",
      "Seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de sífilis.", "CDC — Sexually Transmitted Infections Treatment Guidelines."],
    pearls: ["Pupilas de Argyll-Robertson: acomodan pero no reaccionan a la luz.", "VDRL en LCR.", "EV siempre."],
    pitfalls: ["Tratar como sífilis tardía común.", "No pedir VDRL en deterioro cognitivo."],
    tribunal: [
      qa("¿Qué etapas tiene la sífilis?", "Primaria con chancro, secundaria con roséola y sifílides, latente y terciaria."),
      qa("¿Cuál es la utilidad de VDRL y treponémicas?", "VDRL sirve para seguimiento y tamizaje; las treponémicas confirman y suelen quedar positivas."),
      qa("¿Qué es la reacción de Jarisch-Herxheimer?", "Fiebre y malestar en las primeras horas de tratamiento, por liberación de antígenos."),
    ],
  },
};
