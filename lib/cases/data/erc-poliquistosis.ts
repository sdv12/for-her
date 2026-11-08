import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ercPoliquistosis: ClinicalCase = {
  id: "enfermedad-renal-cronica-poliquistosis-uremia",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 48, ageUnit: "años", sex: "F", context: "Hipertensa, poliquistosis renal familiar. Dejó de ir al nefrólogo hace 3 años." },
  frequency: "frecuente",
  intro: "“Vomito hace días, me pica todo el cuerpo, estoy confundida y me falta el aire.”",
  vitals: { TA: "186/104 mmHg", FC: "92 lpm", FR: "26 rpm", "T°": "36,4 °C", "SatO₂": "92 %", Glasgow: "14/15" },
  anamnesis: [
    act("uremicos", "¿Náuseas, picazón, sabor metálico, sueño?", "clave", "“Todo.”", "Síndrome urémico."),
    act("familia", "¿Quiénes tuvieron poliquistosis?", "clave", "“Mi mamá se dializó.”", "Herencia."),
    act("cefalea", "¿Cefalea súbita o aneurismas?", "clave", "“No.”", "Asociación."),
    act("farmacos", "¿AINE o remedios?", "util", "“Ibuprofeno por el dolor.”", "Agravante."),
    act("orina", "¿Cuánto orinás? ¿Sangre?", "util", "“Poco.”", "Volumen."),
    act("oficio", "¿Tenés un oficio?", "neutro", "“Soy modista.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Riñones grandes palpables, hígado con quistes.", "Poliquistosis."),
    act("cardio", "Corazón y pulmón", "clave", "Frote pericárdico, rales bibasales.", "Pericarditis urémica y sobrecarga."),
    act("neuro", "Asterixis", "util", "Asterixis.", "Encefalopatía."),
  ],
  studies: [
    study("Laboratorio", "renal", "Urea, creatinina, potasio, gases, fósforo, calcio, PTH", "clave", "Urea 310; creatinina 12; K 6,4; pH 7,18.", "Fallo."),
    study("Laboratorio", "hemograma", "Hemograma, ferritina", "clave", "Hb 7,8.", "Anemia."),
    study("Imágenes", "eco", "Ecografía renal", "clave", "Riñones aumentados con múltiples quistes.", "Confirma."),
    study("Electrofisiología", "ecg", "ECG", "clave", "T picudas.", "Hiperpotasemia."),
    study("Imágenes", "contraste", "TC con contraste", "riesgoso", "No se realizó.", "Nefrotóxico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erc", "Enfermedad renal crónica G5 por poliquistosis autosómica dominante, con síndrome urémico e indicación de diálisis", true, "Uremia, riñones poliquísticos, acidosis, hiperpotasemia y pericarditis."),
      dx("ira", "IRA pura", false, "Antecedentes y riñones grandes crónicos."),
      dx("glomerulo", "Glomerulonefritis rápidamente progresiva", false, "Ecografía poliquística."),
      dx("hipertensiva", "Encefalopatía hipertensiva aislada", false, "Hay uremia."),
      dx("hepatica", "Encefalopatía hepática", false, "Función renal explica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dialisis", "Hemodiálisis urgente", "clave", "Uremia, pericarditis, hiperpotasemia."),
      mg("potasio", "Calcio EV, insulina y glucosa mientras tanto", "clave", "Estabiliza."),
      mg("trasplante", "Derivar a trasplante e inscribir en INCUCAI", "clave", "Mejor sobrevida."),
      mg("anemia", "Eritropoyetina y hierro", "clave", "Anemia."),
      mg("aines", "Mantener AINE", "riesgoso", "Nefrotóxicos."),
      mg("heparina-alta", "Anticoagular por el frote", "riesgoso", "Pericarditis urémica: riesgo de hemopericardio."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad renal crónica G5 por poliquistosis autosómica dominante, con uremia, pericarditis, sobrecarga e hiperpotasemia, en mujer de 48 años.",
    pathologies: [
      { name: "Enfermedad renal crónica", role: "principal", why: "Pérdida crónica del filtrado." },
      { name: "Poliquistosis", role: "asociada", why: "Causa." },
      { name: "IRA, glomerulonefritis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutación de PKD1 o PKD2.",
      "Mecanismo: quistes reemplazan el parénquima.",
      "Consecuencia: HTA, uremia, y necesidad de reemplazo renal.",
    ],
    epidemiology:
      "La poliquistosis es la enfermedad renal hereditaria más común y representa cerca del 5 % de las personas en diálisis. En Argentina, el registro del INCUCAI muestra que la diabetes es la primera causa de ingreso. El abandono del seguimiento favorece los comienzos no programados.",
    management: [
      "Estadificar.",
      "Reemplazo renal.",
      "Control de HTA.",
      "Asesoramiento familiar y neuroimagen.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Poliquistosis renal.", "KDIGO — Chronic Kidney Disease Guideline."],
    pearls: ["Frote: urgencia de diálisis.", "Evaluar familiares.", "Aneurismas."],
    pitfalls: ["Anticoagular.", "Demorar acceso vascular."],
    tribunal: [
      qa("¿Cuáles son los estadios de ERC?", "Según filtrado: G1 90 o más, G2 60 a 89, G3a 45 a 59, G3b 30 a 44, G4 15 a 29 y G5 menos de 15."),
      qa("¿Qué complicaciones extrarrenales tiene la poliquistosis?", "Aneurismas cerebrales, quistes hepáticos, valvulopatía y diverticulosis."),
      qa("¿Qué es el tolvaptán?", "Antagonista de vasopresina que enlentece la progresión en casos seleccionados."),
    ],
  },
};
