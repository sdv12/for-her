import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionOpioides: ClinicalCase = {
  id: "intoxicacion-opioides-tramadol-morfina",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 68, ageUnit: "años", sex: "F", context: "Cáncer de mama con metástasis óseas. Le subieron la morfina hace 3 días. Insuficiencia renal leve." },
  frequency: "frecuente",
  intro: "“La encontramos muy dormida, casi no respira, no la podemos despertar.” (relata la hija)",
  vitals: { TA: "100/60 mmHg", FC: "58 lpm", FR: "6 rpm", "T°": "36,1 °C", "SatO₂": "82 %", Glucemia: "112 mg/dl", Glasgow: "8/15" },
  anamnesis: [
    act("dosis", "¿Qué toma y cuánto? ¿Cambió la dosis?", "clave", "“Le subieron la morfina; también toma tramadol.”", "Sobredosis."),
    act("renal", "¿Cómo están los riñones?", "clave", "“Algo alterados.”", "Acumulación de metabolitos."),
    act("otros", "¿Benzodiacepinas, alcohol?", "clave", "“Clonazepam a la noche.”", "Potencia la depresión respiratoria."),
    act("intento", "¿Pudo haber tomado de más a propósito?", "util", "“No creemos.”", "Riesgo suicida."),
    act("convulsion", "¿Convulsionó?", "util", "“No.”", "Tramadol."),
    act("perro", "¿Vive sola?", "neutro", "“Con mi hermana.”", "No orienta."),
  ],
  exam: [
    act("pupilas", "Pupilas", "clave", "Mióticas puntiformes.", "Toxíndrome opioide."),
    act("respiracion", "Respiración", "clave", "Superficial y lenta.", "Riesgo de paro."),
    act("piel", "Piel y parches", "util", "Sin parches.", "Fuente."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar", "clave", "Normal.", "Excluye hipoglucemia."),
    study("Laboratorio", "gases", "Gases, función renal, ionograma", "clave", "pCO₂ 68; creatinina 1,8.", "Hipoventilación."),
    study("Electrofisiología", "ecg", "ECG", "util", "Bradicardia sinusal.", "Base."),
    study("Imágenes", "tc", "TC de cerebro antes de la naloxona", "riesgoso", "No se realizó.", "Retrasa un tratamiento que diagnostica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("opioides", "Intoxicación por opioides con depresión respiratoria", true, "Miosis, bradipnea, coma y aumento de dosis con IR."),
      dx("acv", "ACV de tronco", false, "Responde a naloxona; miosis con contexto."),
      dx("hipercalcemia", "Hipercalcemia", false, "Debe controlarse, pero no da miosis."),
      dx("benzo", "Intoxicación solo por benzodiacepinas", false, "No da miosis ni bradipnea tan marcada."),
      dx("sepsis", "Sepsis", false, "Sin fiebre ni foco."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ventilacion", "Ventilar con bolsa y oxígeno", "clave", "Primero la vía aérea."),
      mg("naloxona", "Naloxona en dosis bajas tituladas, con infusión si recurre", "clave", "Revierte; dosis bajas evitan abstinencia y dolor."),
      mg("observar", "Observar por recurrencia", "clave", "La morfina dura más que la naloxona."),
      mg("ajuste", "Ajustar analgesia con paliativos y revisar benzodiacepinas", "clave", "Previene."),
      mg("naloxona-alta", "Bolo alto de naloxona", "riesgoso", "Dolor intenso, abstinencia, edema pulmonar."),
      mg("flumazenil", "Flumazenil de entrada", "riesgoso", "Riesgo de convulsiones."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación por opioides con depresión respiratoria, por aumento de morfina con insuficiencia renal y benzodiacepinas, en mujer de 68 años con cáncer.",
    pathologies: [
      { name: "Intoxicación por opioides", role: "principal", why: "Depresión del centro respiratorio." },
      { name: "Insuficiencia renal y benzodiacepinas", role: "asociada", why: "Potencian." },
      { name: "ACV, hipercalcemia, sepsis", role: "diferencial", why: "Otras causas de coma." },
    ],
    reasoning: [
      "Causa: dosis alta con metabolitos acumulados.",
      "Mecanismo: agonismo mu en el tronco.",
      "Consecuencia: hipoventilación, hipoxia y paro.",
    ],
    epidemiology:
      "En Argentina se ve sobre todo en pacientes con dolor crónico o cáncer, con combinaciones con benzodiacepinas y ajustes sin considerar la función renal. La metabolización de la morfina genera un metabolito activo que se acumula en la IR.",
    management: [
      "Vía aérea.",
      "Naloxona titulada.",
      "Observación.",
      "Revisar el esquema.",
    ],
    sources: ["Centro Nacional de Intoxicaciones (Hospital Posadas) — Intoxicación por opioides.", "Asociación Argentina de Medicina y Cuidados Paliativos — Uso de opioides."],
    pearls: ["Miosis con bradipnea: opioide.", "Naloxona en dosis bajas.", "Morfina en IR: cuidado."],
    pitfalls: ["Bolo alto de naloxona.", "No observar."],
    tribunal: [
      qa("¿Qué toxíndromes conocés?", "Opioide, anticolinérgico, colinérgico, simpaticomimético y sedante-hipnótico."),
      qa("¿Cuánto dura la naloxona?", "Entre 30 y 90 minutos; menos que muchos opioides."),
      qa("¿Qué opioide es preferible en IR?", "Fentanilo, metadona o hidromorfona con precaución."),
    ],
  },
};
