import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const miocardiopatiaPeriparto: ClinicalCase = {
  id: "insuficiencia-cardiaca-miocardiopatia-periparto",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Parto vaginal hace 3 semanas. Embarazo gemelar con preeclampsia. Amamanta." },
  frequency: "poco-frecuente",
  intro: "“Me ahogo si me acuesto, las piernas se me hincharon y no puedo con los bebés. Me dijeron que es normal después de un parto.”",
  vitals: { TA: "108/72 mmHg", FC: "118 lpm", FR: "28 rpm", "T°": "36,8 °C", "SatO₂": "90 %", Peso: "76 kg" },
  anamnesis: [
    act("disnea", "¿Ortopnea? ¿Te despertás con falta de aire?", "clave", "“Duermo sentada.”", "Congestión."),
    act("tiempo", "¿Cuándo empezó?", "clave", "“A las 2 semanas del parto.”", "Último mes o 5 meses posparto."),
    act("riesgos", "¿Preeclampsia, gemelos, edad?", "clave", "“Gemelos con preeclampsia.”", "Factores."),
    act("tvp", "¿Dolor en una pierna, dolor de pecho súbito?", "util", "“No.”", "TEP."),
    act("previa", "¿Problemas de corazón?", "util", "“Nunca.”", "Sin cardiopatía previa."),
    act("bebes", "¿Cómo se llaman?", "neutro", "“Ana y Luz.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Pulmón", "clave", "Rales bibasales.", "Congestión."),
    act("cardiaco", "Corazón", "clave", "Tercer ruido, soplo de insuficiencia mitral.", "Dilatación."),
    act("congestion", "Yugulares y edemas", "util", "Yugular ingurgitada y edema.", "Sobrecarga."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "FEy 28 %, VI dilatado, sin trombo.", "Confirma."),
    study("Laboratorio", "bnp", "BNP, troponina, función renal", "clave", "BNP muy alto.", "IC."),
    study("Electrofisiología", "ecg", "ECG y radiografía de tórax", "clave", "Taquicardia; congestión.", "Base."),
    study("Imágenes", "cateter", "Cateterismo de rutina", "innecesario", "No se realizó.", "Sin sospecha isquémica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mpp", "Insuficiencia cardíaca por miocardiopatía periparto", true, "Disnea posparto, FEy baja, sin otra causa."),
      dx("tep", "TEP", false, "Hay congestión y FEy 28 %."),
      dx("preeclampsia", "Edema pulmonar por preeclampsia", false, "Presión normal y FEy muy baja."),
      dx("asma", "Asma", false, "Sin sibilancias."),
      dx("cansancio", "Cansancio posparto", false, "Hay signos objetivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("diureticos", "Furosemida y oxígeno", "clave", "Congestión."),
      mg("gdmt", "Tratamiento de IC con fármacos compatibles", "clave", "Con lactancia se eligen los fármacos."),
      mg("anticoag", "Anticoagulación con FEy muy baja", "clave", "Riesgo de trombos."),
      mg("anticoncepcion", "Consejo sobre futuros embarazos y anticoncepción sin estrógenos", "clave", "Riesgo de recurrencia."),
      mg("alta", "Decir que es cansancio y dar el alta", "riesgoso", "Mortal."),
      mg("estrogenos", "Anticonceptivo combinado con estrógenos", "riesgoso", "Aumenta el riesgo de trombosis con la FEy baja."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia cardíaca por miocardiopatía periparto, FEy 28 %, a las 3 semanas de un parto gemelar con preeclampsia.",
    pathologies: [
      { name: "Miocardiopatía periparto", role: "principal", why: "IC sin otra causa." },
      { name: "Insuficiencia cardíaca aguda", role: "asociada", why: "Forma de presentación." },
      { name: "TEP, preeclampsia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: multifactorial, con predisposición genética.",
      "Mecanismo: estrés oxidativo y fragmentos de prolactina dañan al miocardio.",
      "Consecuencia: dilatación, congestión y trombos.",
    ],
    epidemiology:
      "Aparece en el último mes del embarazo o hasta 5 meses después. Son factores la preeclampsia, los embarazos múltiples, y la edad materna. Muchos síntomas se atribuyen al posparto, y la mitad de las pacientes recupera función con el tiempo. Se aconseja un seguimiento prolongado.",
    management: [
      "Sospecha ante disnea posparto.",
      "Eco y BNP.",
      "Tratamiento de IC.",
      "Seguimiento y planificación.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de embarazo y cardiopatía.", "ESC — Guidelines on Cardiovascular Disease during Pregnancy."],
    pearls: ["Disnea que no es normal.", "Bromocriptina se investiga.", "Riesgo en embarazos futuros."],
    pitfalls: ["Atribuir al puerperio.", "Olvidar la anticoncepción."],
    tribunal: [
      qa("¿Qué define a la insuficiencia cardíaca con FEy reducida?", "Síntomas con FEy menor o igual a 40 %."),
      qa("¿Qué fármacos de IC están contraindicados en el embarazo?", "IECA, ARA II, sacubitrilo y espironolactona; se usan hidralazina con nitratos."),
      qa("¿Cuáles son los cuatro pilares del tratamiento?", "Sacubitrilo-valsartán o IECA, betabloqueante, antagonista mineralocorticoide e iSGLT2."),
    ],
  },
};
