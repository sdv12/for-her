import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const erc: ClinicalCase = {
  id: "enfermedad-renal-cronica",
  level: 2,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 62, ageUnit: "años", sex: "M", context: "Diabético e hipertenso hace 15 años. Toma metformina, enalapril y diclofenac seguido por la rodilla." },
  frequency: "muy-frecuente",
  intro: "“Vengo a traer los análisis. Me dijeron que la creatinina está alta. Me siento bien, algo cansado.”",
  vitals: { TA: "152/92 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "88 kg" },
  anamnesis: [
    act("cronologia", "¿Tenés análisis anteriores para comparar?", "clave", "“Hace un año la creatinina era 1,4.”", "Alteración sostenida por más de 3 meses: enfermedad renal crónica, no aguda."),
    act("aine", "¿Cuántos antiinflamatorios tomás?", "clave", "“Diclofenac casi todos los días.”", "Nefrotóxico que hay que suspender."),
    act("orina", "¿Orina con espuma, sangre, menos cantidad?", "util", "“Con espuma.”", "Proteinuria."),
    act("sintomas", "¿Picazón, náuseas, falta de apetito, calambres?", "util", "“Algo de cansancio.”", "Síntomas tempranos."),
    act("familia", "¿Alguien en la familia está en diálisis?", "util", "“No.”", "Antecedentes."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("ta", "Presión arterial repetida", "clave", "152/92 y 150/90.", "Hipertensión no controlada."),
    act("edemas", "Edemas", "util", "Edema leve en tobillos.", "Retención."),
    act("fondo", "Fondo de ojo", "util", "Retinopatía diabética leve.", "Microangiopatía: apoya nefropatía diabética."),
  ],
  studies: [
    study("Laboratorio", "filtrado", "Creatinina con filtrado estimado (CKD-EPI)", "clave", "Creatinina 1,9, filtrado 38 ml/min/1,73 m².", "Estadio G3b."),
    study("Laboratorio", "albuminuria", "Índice albúmina/creatinina en orina", "clave", "420 mg/g.", "A3: albuminuria grave; alto riesgo de progresión."),
    study("Laboratorio", "lab", "Ionograma, hemograma, calcio, fósforo, PTH, bicarbonato, HbA1c", "util", "K 5,1, Hb 11,2, HbA1c 8,1.", "Complicaciones de la ERC."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñones de tamaño normal, ecogenicidad aumentada.", "Descarta obstrucción; en la nefropatía diabética el tamaño puede conservarse."),
    study("Imágenes", "tc-contraste", "Tomografía con contraste para estudiar los riñones", "riesgoso", "No se realizó.", "El contraste puede empeorar la función renal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erc", "Enfermedad renal crónica G3b A3 por nefropatía diabética e hipertensiva, agravada por AINE", true, "Filtrado de 38 sostenido más de 3 meses con albuminuria de 420, diabetes e hipertensión de larga data, retinopatía y uso de diclofenac."),
      dx("ira", "Insuficiencia renal aguda", false, "La alteración es sostenida y progresiva."),
      dx("gn", "Glomerulonefritis rápidamente progresiva", false, "Sin hematuria ni deterioro rápido."),
      dx("obstructiva", "Uropatía obstructiva", false, "Ecografía sin hidronefrosis."),
      dx("estenosis-renal", "Estenosis de arteria renal", false, "No hay asimetría renal ni deterioro con IECA."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bloqueo-sra", "Optimizar IECA (o ARA II) a dosis máxima tolerada con control de potasio y creatinina", "clave", "Reducen la albuminuria y la progresión."),
      mg("isglt2", "Agregar un iSGLT2 (dapagliflozina o empagliflozina)", "clave", "Reducen la progresión de la ERC y los eventos cardiovasculares."),
      mg("aine", "Suspender el diclofenac y ajustar la metformina al filtrado", "clave", "Nefrotóxico; la metformina se reduce con filtrado de 30–45."),
      mg("metas", "Metas de presión menor de 130/80, estatina, control glucémico y derivación a nefrología", "util", "Riesgo cardiovascular y renal alto."),
      mg("vacunas", "Vacunas (hepatitis B, neumococo, antigripal)", "util", "Prevención."),
      mg("dieta-proteica", "Dieta sin proteínas", "riesgoso", "Riesgo de desnutrición; se recomienda una ingesta moderada."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad renal crónica estadio G3b A3 por nefropatía diabética e hipertensiva, con hipertensión no controlada, anemia leve y uso crónico de AINE, en varón de 62 años.",
    pathologies: [
      { name: "Enfermedad renal crónica", role: "principal", why: "Filtrado reducido y albuminuria sostenidos." },
      { name: "Diabetes e hipertensión", role: "asociada", why: "Principales causas." },
      { name: "IRA, glomerulonefritis, obstrucción", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: hiperglucemia e hipertensión de larga data, con AINE.",
      "Mecanismo: hiperfiltración, daño glomerular y fibrosis progresiva.",
      "Consecuencia: pérdida de filtrado, albuminuria, anemia, alteraciones del metabolismo óseo, hiperpotasemia y alto riesgo cardiovascular.",
    ],
    epidemiology:
      "La enfermedad renal crónica afecta a alrededor del 10–12 % de los adultos en Argentina y la mayoría no lo sabe. La diabetes y la hipertensión son las principales causas de ingreso a diálisis. Es más frecuente en mayores de 60 años.",
    management: [
      "Rastreo con creatinina y albuminuria en diabéticos, hipertensos y mayores.",
      "Clasificar por filtrado y albuminuria (KDIGO).",
      "IECA o ARA II, iSGLT2, control de factores y evitar nefrotóxicos.",
      "Derivación a nefrología y preparación para terapia de reemplazo si progresa.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Guía de enfermedad renal crónica.", "Guías KDIGO de enfermedad renal crónica."],
    pearls: ["Creatinina + albuminuria a todo diabético.", "IECA + iSGLT2.", "Suspender AINE."],
    pitfalls: ["Confundirla con IRA.", "Contraste innecesario."],
    tribunal: [
      qa("¿Cómo se clasifica la ERC según KDIGO?", "Por filtrado: G1 90 o más, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 menor de 15; y por albuminuria: A1 menor de 30, A2 30–300, A3 mayor de 300 mg/g. Se define por alteración por más de 3 meses."),
      qa("¿Qué complicaciones tiene la ERC avanzada?", "Anemia, hiperpotasemia, acidosis metabólica, alteraciones del calcio, fósforo y PTH (osteodistrofia), hipertensión, sobrecarga de volumen, uremia y alto riesgo cardiovascular."),
      qa("¿Qué opciones de terapia de reemplazo renal hay?", "Hemodiálisis, diálisis peritoneal y trasplante renal; también el tratamiento conservador en casos seleccionados."),
    ],
  },
};
