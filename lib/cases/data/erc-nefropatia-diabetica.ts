import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ercNefropatiaDiabetica: ClinicalCase = {
  id: "nefropatia-diabetica-erc",
  level: 2,
  area: "Nefrourología",
  setting: "CAPS",
  patient: { age: 61, ageUnit: "años", sex: "F", context: "Diabetes tipo 2 de 15 años e hipertensión. Retinopatía tratada con láser." },
  frequency: "muy-frecuente",
  intro: "“Vengo a control. Me hincho un poco las piernas y me dijeron que tengo la orina espumosa.”",
  vitals: { TA: "152/88 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "78 kg", Glucemia: "176 mg/dl" },
  anamnesis: [
    act("evolucion", "¿Cuánto hace que tenés diabetes? ¿Se te controló la vista y el riñón?", "clave", "“15 años; con láser en los ojos, y al riñón nunca lo miraron.”", "La retinopatía apoya el origen diabético."),
    act("nefrotoxicos", "¿Tomás antiinflamatorios u otros remedios?", "clave", "“Diclofenac muy seguido.”", "Nefrotóxico evitable."),
    act("uremia", "¿Náuseas, picazón, poca orina?", "clave", "“No.”", "Busca síntomas urémicos."),
    act("medicacion", "¿Qué tratamiento hacés?", "util", "“Metformina 2 g y amlodipina.”", "Ajustar metformina según filtrado; falta IECA."),
    act("hematuria", "¿Orinaste con sangre?", "util", "“No.”", "Hematuria orienta a otra causa."),
    act("comida", "¿Qué comida te gusta?", "neutro", "“Locro.”", "No orienta."),
  ],
  exam: [
    act("volumen", "Edemas y volemia", "clave", "Edema leve de tobillos.", "Por proteinuria y retención."),
    act("fondo", "Fondo de ojo", "clave", "Retinopatía diabética con cicatrices de láser.", "Casi siempre acompaña a la nefropatía."),
    act("pies", "Pies", "util", "Sensibilidad disminuida, pulsos presentes.", "Neuropatía."),
  ],
  studies: [
    study("Laboratorio", "filtrado", "Creatinina con filtrado estimado", "clave", "Creatinina 1,6; filtrado 36 ml/min/1,73 m².", "Estadio G3b."),
    study("Laboratorio", "albuminuria", "Cociente albúmina/creatinina en orina", "clave", "420 mg/g.", "Categoría A3: alto riesgo. Repetir para confirmar."),
    study("Laboratorio", "metabolico", "HbA1c, potasio, calcio, fósforo, hemograma", "clave", "HbA1c 8,6, K 4,8, Hb 11.", "Evalúa complicaciones."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñones de tamaño conservado, sin obstrucción.", "En diabetes puede conservarse el tamaño."),
    study("Otros", "biopsia", "Biopsia renal de rutina", "innecesario", "No se realizó.", "Solo si el cuadro es atípico: hematuria, caída rápida, sin retinopatía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nefropatia", "Enfermedad renal crónica por nefropatía diabética, G3b A3", true, "Diabetes de larga data, retinopatía, albuminuria alta y caída del filtrado sin hematuria."),
      dx("glomerulo", "Glomerulonefritis aguda", false, "No hay hematuria ni instalación aguda."),
      dx("ira", "Insuficiencia renal aguda", false, "La evolución crónica y la retinopatía orientan a daño crónico."),
      dx("obstruccion", "Uropatía obstructiva", false, "Ecografía sin obstrucción."),
      dx("renovascular", "Nefropatía isquémica", false, "No explicaría la albuminuria alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("iecaarb", "IECA o ARA II a dosis máxima tolerada, controlando potasio y creatinina", "clave", "Reduce la proteinuria y enlentece la progresión."),
      mg("isglt2", "Inhibidor de SGLT2", "clave", "Protege el riñón y el corazón."),
      mg("metformina", "Reducir la metformina a la mitad por el filtrado", "clave", "Riesgo de acidosis láctica: se suspende si es menor de 30."),
      mg("suspender-aine", "Suspender diclofenac y evitar nefrotóxicos", "clave", "Previene caídas del filtrado."),
      mg("derivar", "Derivar a nefrología, controlar presión y lípidos", "util", "Enlentece la progresión y prepara a tiempo."),
      mg("dual", "Combinar IECA más ARA II", "riesgoso", "Mayor riesgo de hiperpotasemia y falla renal."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad renal crónica estadio G3b A3 por nefropatía diabética, con AINE, en mujer de 61 años.",
    pathologies: [
      { name: "Nefropatía diabética", role: "principal", why: "Daño glomerular por hiperglucemia." },
      { name: "HTA, retinopatía y neuropatía", role: "asociada", why: "Otras complicaciones." },
      { name: "Glomerulonefritis, obstrucción, nefropatía isquémica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hiperglucemia crónica y HTA.",
      "Mecanismo: hiperfiltración, engrosamiento de la membrana basal y esclerosis nodular.",
      "Consecuencia: albuminuria, caída del filtrado y riesgo de diálisis y eventos cardiovasculares.",
    ],
    epidemiology:
      "La diabetes es la principal causa de enfermedad renal crónica en Argentina, y de ingreso a diálisis. Muchos casos no se detectan porque no se pide albuminuria. Las personas con diabetes deben hacerse creatinina y cociente albúmina/creatinina cada año.",
    management: [
      "Tamizaje anual.",
      "IECA o ARA II, iSGLT2 y control de glucemia y presión.",
      "Ajustar dosis según filtrado.",
      "Evitar nefrotóxicos y derivar a tiempo.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones de ERC.", "KDIGO — Guías de diabetes y enfermedad renal."],
    pearls: ["Pedí filtrado y albuminuria.", "Retinopatía apoya el origen diabético.", "Metformina: ajustar con menos de 45; suspender con menos de 30."],
    pitfalls: ["Combinar IECA y ARA II.", "Seguir con AINE."],
    tribunal: [
      qa("¿Cómo se estadifica la ERC?", "Por filtrado (G1 a G5) y albuminuria (A1 menos de 30, A2 de 30 a 300, A3 más de 300 mg/g), con persistencia por más de 3 meses."),
      qa("¿Qué lesión histológica es típica?", "La glomeruloesclerosis nodular de Kimmelstiel-Wilson."),
      qa("¿Qué complicaciones tiene la ERC avanzada?", "Anemia, hiperpotasemia, acidosis, alteraciones de calcio y fósforo, sobrecarga de volumen, uremia."),
    ],
  },
};
