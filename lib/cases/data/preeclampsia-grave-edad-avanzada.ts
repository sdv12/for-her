import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const preeclampsiaGraveEdadAvanzada: ClinicalCase = {
  id: "preeclampsia-grave-edad-materna-avanzada",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 42, ageUnit: "años", sex: "F", context: "Embarazo de 30 semanas por ovodonación. Hipertensión crónica. Dejó de tomar aspirina." },
  frequency: "frecuente",
  intro: "“Me duele mucho la cabeza, veo puntitos brillantes y me duele acá arriba del estómago.”",
  vitals: { TA: "178/114 mmHg", FC: "96 lpm", FR: "20 rpm", "T°": "36,7 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("sintomas", "¿Cefalea, visión, dolor epigástrico?", "clave", "“Todo.”", "Síntomas premonitorios."),
    act("feto", "¿Mueve el bebé?", "clave", "“Menos.”", "Bienestar fetal."),
    act("riesgo", "¿Hipertensión, embarazo por ovodonación, aspirina?", "clave", "“Hipertensa, ovodonación; dejé la aspirina.”", "Riesgo alto."),
    act("convulsion", "¿Convulsiones?", "util", "“No.”", "Eclampsia."),
    act("sangrado", "¿Pérdida de sangre o líquido?", "util", "“No.”", "Desprendimiento."),
    act("barrio", "¿Dónde vivís?", "neutro", "“En Nueva Córdoba.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Reflejos", "clave", "Hiperreflexia con clonus.", "Inminencia de eclampsia."),
    act("abdomen", "Hipocondrio derecho y útero", "clave", "Dolor en epigastrio, útero blando.", "Hepático."),
    act("edema", "Edemas", "util", "Edema en cara y manos.", "Inespecífico."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, LDH, transaminasas, creatinina, proteinuria", "clave", "Plaquetas 142.000; TGO 74; creatinina 1,2; proteína/creatinina 2,4.", "Afectación orgánica."),
    study("Otros", "fetal", "Monitoreo fetal, ecografía y Doppler", "clave", "RCIU, Doppler umbilical alterado.", "Compromiso fetal."),
    study("Otros", "fondo", "Fondo de ojo si persiste la visión", "util", "Vasoespasmo.", "Retina."),
    study("Otros", "esperar", "Esperar 24 horas de proteinuria antes de tratar", "riesgoso", "No se realizó.", "Es una emergencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("preeclampsia", "Preeclampsia grave sobreimpuesta a hipertensión crónica, con restricción del crecimiento fetal", true, "TA de 178/114, síntomas neurológicos, epigastralgia y proteinuria."),
      dx("hta", "Hipertensión gestacional", false, "Hay proteinuria y daño orgánico."),
      dx("hellp", "HELLP", false, "Sin hemólisis ni plaquetas menores de 100.000."),
      dx("migrana", "Migraña", false, "No explica la hipertensión."),
      dx("pancreatitis", "Pancreatitis", false, "Hay preeclampsia grave."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("magnesio", "Sulfato de magnesio", "clave", "Previene la eclampsia y neuroprotege."),
      mg("hta-tto", "Labetalol EV o hidralazina", "clave", "Meta de presión."),
      mg("corticoide", "Betametasona", "clave", "Maduración fetal."),
      mg("finalizar", "Interrumpir tras estabilizar, en centro de alta complejidad", "clave", "Grave con compromiso fetal."),
      mg("ieca", "Enalapril", "riesgoso", "Contraindicado."),
      mg("alta", "Reposo en casa", "riesgoso", "Puede convulsionar."),
    ],
  },
  debrief: {
    diagnosis: "Preeclampsia grave sobreimpuesta a hipertensión crónica con RCIU, a las 30 semanas, en mujer de 42 años por ovodonación.",
    pathologies: [
      { name: "Preeclampsia grave", role: "principal", why: "Enfermedad multisistémica." },
      { name: "Restricción del crecimiento", role: "asociada", why: "Disfunción placentaria." },
      { name: "HELLP, HTA gestacional", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: placentación anormal.",
      "Mecanismo: isquemia placentaria y daño endotelial.",
      "Consecuencia: HTA, daño de órganos y RCIU.",
    ],
    epidemiology:
      "Los trastornos hipertensivos son una de las principales causas de muerte materna en Argentina. La edad mayor de 40, la HTA crónica y la ovodonación aumentan el riesgo. La aspirina en dosis bajas desde el primer trimestre reduce el riesgo en los grupos seleccionados.",
    management: [
      "Identificar criterios de gravedad.",
      "Magnesio y antihipertensivos.",
      "Corticoides.",
      "Definir el momento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de trastornos hipertensivos del embarazo.", "FASGO — Consenso de preeclampsia."],
    pearls: ["Síntomas: urgencia.", "Magnesio.", "Sin IECA."],
    pitfalls: ["Esperar proteinuria.", "Suspender aspirina."],
    tribunal: [
      qa("¿Cuáles son los signos de toxicidad por magnesio?", "Pérdida de reflejos, depresión respiratoria y paro; se trata con gluconato de calcio."),
      qa("¿Cuáles son los criterios de gravedad?", "Presión de 160/110, plaquetas menores de 100.000, daño hepático o renal, edema de pulmón y síntomas neurológicos."),
      qa("¿Cuándo se indica la aspirina preventiva?", "En riesgo alto, desde las 12 semanas a las 36 aproximadamente."),
    ],
  },
};
