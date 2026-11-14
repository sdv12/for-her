import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sepsisNeonatalTardia: ClinicalCase = {
  id: "sepsis-neonatal-tardia-meningitis",
  level: 4,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "días", sex: "F", context: "Nacida de término por parto vaginal. La madre no tuvo hisopado de estreptococo B. Lactancia exclusiva." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer está muy dormida, no quiere el pecho, tiene fiebre y hoy hizo como sacudidas.”",
  vitals: { FC: "192 lpm", FR: "64 rpm", "T°": "38,7 °C", "SatO₂": "94 %", Peso: "3.300 g", Glucemia: "54 mg/dl" },
  anamnesis: [
    act("alimentacion", "¿Cómo se alimenta?", "clave", "“Casi no toma desde ayer.”", "Rechazo del alimento."),
    act("sacudidas", "¿Cómo fueron las sacudidas?", "clave", "“De brazos y piernas, un minuto.”", "Convulsión: meningitis."),
    act("hisopado", "¿Le hicieron el hisopado del estreptococo en el embarazo?", "clave", "“No.”", "Factor de riesgo."),
    act("contactos", "¿Alguien enfermo en la casa?", "util", "“El hermano con resfrío.”", "Contagio."),
    act("vacunas", "¿Qué vacunas recibió?", "util", "“BCG y hepatitis B.”", "Base."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Emilia.”", "No orienta."),
  ],
  exam: [
    act("perfusion", "Perfusión y conciencia", "clave", "Relleno de 4 segundos, hipotónica, quejido.", "Shock séptico."),
    act("fontanela", "Fontanela", "clave", "Abombada.", "Meningitis."),
    act("piel", "Piel", "util", "Moteada, sin petequias.", "Hipoperfusión."),
  ],
  studies: [
    study("Microbiología", "hemocultivo", "Hemocultivo y urocultivo antes del antibiótico", "clave", "Streptococcus agalactiae.", "Germen."),
    study("Laboratorio", "lcr", "Punción lumbar cuando esté estable", "clave", "LCR turbio, 1.800 células, glucosa baja, cocos grampositivos.", "Meningitis."),
    study("Laboratorio", "lab", "Hemograma, PCR, glucemia, gases", "util", "Leucopenia, PCR alta, acidosis.", "Gravedad."),
    study("Otros", "esperar-pl", "Esperar la punción lumbar para dar antibiótico", "riesgoso", "No se esperó.", "Retraso letal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sepsis-tardia-sgb", "Sepsis neonatal tardía con meningitis por estreptococo del grupo B", true, "Recién nacida de 19 días con fiebre, rechazo, convulsión, fontanela abombada y S. agalactiae."),
      dx("bronquiolitis", "Bronquiolitis", false, "Fontanela abombada y LCR purulento."),
      dx("ivu", "Infección urinaria aislada", false, "Meningitis demostrada."),
      dx("hsv", "Herpes neonatal", false, "Germen bacteriano identificado; igual se cubre si hay dudas."),
      dx("metabolica", "Error congénito del metabolismo", false, "Fiebre y LCR purulento."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ampicilina más cefotaxima EV en dosis meníngeas", "clave", "Cubre SGB, Listeria y gramnegativos."),
      mg("reanimacion", "Expansión, oxígeno y glucosa", "clave", "Shock e hipoglucemia."),
      mg("uti", "Terapia intensiva neonatal", "clave", "Gravedad."),
      mg("aciclovir", "Aciclovir hasta descartar herpes si hay dudas", "util", "Convulsión neonatal."),
      mg("oral", "Antibiótico oral y control", "riesgoso", "Mortalidad."),
      mg("ceftriaxona", "Ceftriaxona en la neonata ictérica con calcio EV", "riesgoso", "Precipitados y desplaza bilirrubina."),
    ],
  },
  debrief: {
    diagnosis: "Sepsis neonatal tardía con meningitis por estreptococo del grupo B y shock, en recién nacida de 19 días.",
    pathologies: [
      { name: "Sepsis tardía con meningitis", role: "principal", why: "Infección grave después de la primera semana." },
      { name: "Shock e hipoglucemia", role: "asociada", why: "Gravedad." },
      { name: "Herpes, metabólica", role: "diferencial", why: "Otras causas de deterioro neonatal." },
    ],
    reasoning: [
      "Causa: estreptococo del grupo B adquirido de la madre o del entorno.",
      "Mecanismo: bacteriemia con invasión meníngea.",
      "Consecuencia: shock, convulsiones y secuelas neurológicas.",
    ],
    epidemiology:
      "La sepsis tardía por SGB ocurre entre los 7 y 90 días y no se previene con la profilaxis intraparto. Toda fiebre en menores de 28 días se interna y estudia. La meningitis es más frecuente en la forma tardía.",
    management: [
      "Cultivos.",
      "Antibiótico ya.",
      "Soporte.",
      "Punción lumbar.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Sepsis neonatal.", "AAP — Management of Infants at Risk for Group B Streptococcal Disease."],
    pearls: ["Fiebre en menor de 28 días: internar.", "Fontanela abombada.", "Ampicilina más cefotaxima."],
    pitfalls: ["Esperar la punción.", "Manejo ambulatorio."],
    tribunal: [
      qa("¿Qué diferencia hay entre sepsis precoz y tardía?", "Precoz: primeras 72 horas, transmisión vertical; tardía: después, del ambiente u hospital."),
      qa("¿Qué gérmenes cubre la ampicilina en neonatos?", "Estreptococo del grupo B, Listeria y enterococo."),
      qa("¿Previene la profilaxis intraparto la sepsis tardía?", "No, la profilaxis intraparto solo previene la forma precoz."),
    ],
  },
};
