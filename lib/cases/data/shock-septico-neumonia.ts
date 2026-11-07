import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const shockSepticoNeumonia: ClinicalCase = {
  id: "shock-septico-neumonia",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "EPOC y diabetes tipo 2. Sin vacunas antigripal ni antineumocócica." },
  frequency: "frecuente",
  intro: "“Hace tres días tiene tos con catarro y fiebre. Hoy está dormida, respira rápido y orinó poco.” (relata la hija)",
  vitals: { TA: "82/48 mmHg", FC: "124 lpm", FR: "32 rpm", "T°": "39,1 °C", "SatO₂": "86 %", Glucemia: "246 mg/dl", Glasgow: "12/15" },
  anamnesis: [
    act("foco", "¿Tos, catarro, dolor al respirar?", "clave", "“Sí, con catarro verde y dolor del lado derecho.”", "Foco respiratorio."),
    act("alergias", "¿Alergias a antibióticos? ¿Internaciones o antibióticos recientes?", "clave", "“No, sin internaciones.”", "Define el tratamiento empírico."),
    act("urinario", "¿Ardor al orinar, dolor abdominal, heridas?", "clave", "“No.”", "Busca otros focos."),
    act("basal", "¿Cómo está habitualmente?", "util", "“Autónoma, con EPOC leve.”", "Orienta objetivos de tratamiento."),
    act("vacunas", "¿Vacunas al día?", "util", "“Ninguna este año.”", "Prevención perdida."),
    act("perro", "¿Tiene mascotas?", "neutro", "“Un perro.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación pulmonar", "clave", "Rales crepitantes y soplo tubario en base derecha.", "Consolidación."),
    act("perfusion", "Perfusión", "clave", "Piel moteada, relleno de 5 segundos, oliguria.", "Hipoperfusión."),
    act("conciencia", "Estado de conciencia", "util", "Somnolienta y desorientada.", "Disfunción orgánica."),
  ],
  studies: [
    study("Laboratorio", "lactato", "Lactato y gases", "clave", "Lactato 5,8, acidosis metabólica, pO₂ 54.", "Marca hipoperfusión y sirve para guiar la reanimación."),
    study("Microbiología", "cultivos", "Hemocultivos y cultivo de esputo antes del antibiótico, sin demorarlo", "clave", "S. pneumoniae en hemocultivos.", "Identifica el germen."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Consolidación lobar derecha, sin derrame significativo.", "Confirma el foco."),
    study("Laboratorio", "lab", "Hemograma, función renal, hepática, coagulación", "clave", "Leucocitos 22.000, creatinina 2,1, plaquetas 98.000.", "Disfunción orgánica: SOFA."),
    study("Laboratorio", "pct", "Esperar procalcitonina para iniciar antibiótico", "riesgoso", "No se realizó.", "Cada hora de demora aumenta la mortalidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shock", "Shock séptico por neumonía neumocócica grave de la comunidad", true, "Foco pulmonar, hipotensión, lactato elevado y disfunción orgánica múltiple."),
      dx("epoc", "Exacerbación de EPOC", false, "No explica consolidación, shock ni lactato."),
      dx("tep", "TEP masivo", false, "Hay fiebre, catarro y consolidación."),
      dx("cardiogenico", "Shock cardiogénico", false, "Hay foco infeccioso y no congestión."),
      dx("cad", "Cetoacidosis diabética aislada", false, "No hay cetosis; la hiperglucemia es por estrés."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bundle", "Bundle de la primera hora: cultivos, lactato, antibiótico y 30 ml/kg de cristaloides", "clave", "Reduce la mortalidad."),
      mg("atb", "Betalactámico (ampicilina-sulbactam o ceftriaxona) más macrólido", "clave", "Cubre neumococo y atípicos en NAC grave."),
      mg("noradrenalina", "Noradrenalina para PAM de 65 mmHg o más", "clave", "Primera línea."),
      mg("oxigeno", "Oxígeno con objetivo de 88-92 % por EPOC y terapia intensiva", "clave", "Evita hipercapnia."),
      mg("vacunas", "Vacunas al alta", "util", "Antigripal, antineumocócica y COVID-19."),
      mg("corticoide", "Corticoides en dosis altas a todos", "innecesario", "Solo hidrocortisona en shock refractario."),
    ],
  },
  debrief: {
    diagnosis: "Shock séptico por neumonía neumocócica de la comunidad con falla renal, respiratoria y neurológica, en mujer de 72 años.",
    pathologies: [
      { name: "Shock séptico", role: "principal", why: "Sepsis con vasopresores y lactato alto." },
      { name: "Neumonía neumocócica", role: "asociada", why: "Foco." },
      { name: "TEP, exacerbación de EPOC, shock cardiogénico", role: "diferencial", why: "Otras causas de hipoxemia e hipotensión." },
    ],
    reasoning: [
      "Causa: infección por S. pneumoniae en una persona con EPOC y diabetes.",
      "Mecanismo: respuesta inflamatoria desregulada con vasodilatación y daño microvascular.",
      "Consecuencia: hipotensión, hipoperfusión y disfunción orgánica.",
    ],
    epidemiology:
      "La neumonía es el foco más frecuente de sepsis. En mayores de 65 años y personas con comorbilidades, el neumococo es un germen importante, y las vacunas del Calendario Nacional reducen las formas graves. La mortalidad del shock séptico supera el 30 %.",
    management: [
      "Reconocer: qSOFA, lactato, hipotensión.",
      "Bundle en la primera hora.",
      "Noradrenalina y control del foco.",
      "Reevaluar y desescalar a las 48-72 horas.",
    ],
    sources: ["Sociedad Argentina de Terapia Intensiva — Recomendaciones de sepsis.", "Surviving Sepsis Campaign — Guías."],
    pearls: ["Shock séptico = vasopresor para PAM de 65 + lactato mayor de 2.", "Antibiótico en la primera hora.", "NAC grave: betalactámico + macrólido."],
    pitfalls: ["Demorar el antibiótico.", "Administrar oxígeno sin objetivo en EPOC."],
    tribunal: [
      qa("¿Qué es el CURB-65?", "Confusión, urea mayor de 42 mg/dl, frecuencia respiratoria de 30 o más, presión baja y edad de 65 o más. Con 3 o más: neumonía grave."),
      qa("¿Qué define sepsis según Sepsis-3?", "Disfunción orgánica potencialmente mortal por una respuesta desregulada a la infección: aumento de 2 puntos o más en el SOFA."),
      qa("¿Qué vacunas recomiendan para adultos mayores?", "Antigripal anual, antineumocócica, COVID-19, doble adultos y otras según el calendario vigente."),
    ],
  },
};
