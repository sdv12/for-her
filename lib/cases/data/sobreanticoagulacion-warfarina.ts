import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sobreanticoagulacionWarfarina: ClinicalCase = {
  id: "sobreanticoagulacion-acenocumarol",
  level: 2,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "F", context: "Anticoagulada con acenocumarol por fibrilación auricular. Hace 5 días empezó ciprofloxacina por una infección urinaria." },
  frequency: "frecuente",
  intro: "“Me salieron moretones grandes sin golpearme y me sangran las encías al cepillarme.”",
  vitals: { TA: "132/78 mmHg", FC: "84 lpm irregular", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("farmacos", "¿Le agregaron algún medicamento nuevo?", "clave", "“Un antibiótico para la orina.”", "Interacción."),
    act("sangrado", "¿Sangre en la orina, materia fecal negra, dolor de cabeza?", "clave", "“No.”", "Sangrado mayor."),
    act("control", "¿Cuándo fue el último control de RIN?", "clave", "“Hace un mes, estaba bien.”", "Control irregular."),
    act("dieta", "¿Comió distinto?", "util", "“Casi nada de verdura por la infección.”", "Menos vitamina K."),
    act("caidas", "¿Se cayó?", "util", "“No.”", "Hematoma intracraneal."),
    act("hobby", "¿Qué hace en el día?", "neutro", "“Miro novelas.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Equimosis en brazos y muslos.", "Sangrado menor."),
    act("neuro", "Examen neurológico", "clave", "Normal.", "Sin sangrado intracraneal."),
    act("encias", "Boca", "util", "Gingivorragia leve.", "Menor."),
  ],
  studies: [
    study("Laboratorio", "rin", "RIN y hemograma", "clave", "RIN 7,8; Hb 12,4; plaquetas normales.", "Sobreanticoagulación."),
    study("Laboratorio", "orina", "Orina completa", "clave", "Sin hematuria.", "Sin sangrado oculto urinario."),
    study("Laboratorio", "renal", "Función renal y hepatograma", "util", "Normales.", "Otras causas."),
    study("Imágenes", "tc", "TC de cerebro sin síntomas ni trauma", "innecesario", "No se realizó.", "Examen normal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sobreanticoagulacion", "Sobreanticoagulación por interacción de acenocumarol con ciprofloxacina, con sangrado menor", true, "RIN 7,8 con equimosis y gingivorragia, sin sangrado mayor, tras iniciar antibiótico."),
      dx("pti", "Púrpura trombocitopénica", false, "Plaquetas normales."),
      dx("cid", "Coagulación intravascular diseminada", false, "Sin sepsis ni plaquetopenia."),
      dx("hepatopatia", "Hepatopatía", false, "Hepatograma normal."),
      dx("escorbuto", "Escorbuto", false, "Hay causa farmacológica clara."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender el acenocumarol", "clave", "RIN muy alto."),
      mg("vitk-oral", "Vitamina K oral en dosis baja", "clave", "RIN mayor de 7 con sangrado menor."),
      mg("control-rin", "Control de RIN en 24 horas y reinicio con dosis ajustada", "clave", "Volver a rango."),
      mg("cambiar-atb", "Revisar el antibiótico por uno con menos interacción", "util", "Causa."),
      mg("plasma", "Plasma fresco o complejo protrombínico", "riesgoso", "Reservado para sangrado mayor; riesgo trombótico."),
      mg("vitk-alta", "Vitamina K EV 10 mg", "riesgoso", "Resistencia posterior al anticoagulante."),
    ],
  },
  debrief: {
    diagnosis: "Sobreanticoagulación por interacción de acenocumarol con ciprofloxacina, con sangrado menor, en mujer de 76 años con fibrilación auricular.",
    pathologies: [
      { name: "Sobreanticoagulación", role: "principal", why: "RIN fuera de rango." },
      { name: "Fibrilación auricular", role: "asociada", why: "Indicación de anticoagular." },
      { name: "PTI, CID", role: "diferencial", why: "Otras causas de sangrado." },
    ],
    reasoning: [
      "Causa: interacción farmacológica y menor ingesta de vitamina K.",
      "Mecanismo: la ciprofloxacina inhibe el metabolismo del acenocumarol y altera la flora que produce vitamina K.",
      "Consecuencia: RIN alto y sangrado.",
    ],
    epidemiology:
      "Los antagonistas de la vitamina K siguen siendo muy usados en Argentina y causan muchas consultas por sangrado. Antibióticos, amiodarona y cambios de dieta son los desencadenantes más comunes. Cada nuevo fármaco obliga a controlar el RIN.",
    management: [
      "Clasificar el sangrado.",
      "Suspender.",
      "Vitamina K oral.",
      "Control de RIN.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guía de anticoagulación.", "ACCP — Antithrombotic Therapy Guidelines."],
    pearls: ["Antibiótico nuevo: controlá el RIN.", "Sangrado menor: vitamina K oral.", "Mayor: complejo protrombínico."],
    pitfalls: ["Plasma sin sangrado mayor.", "Vitamina K en dosis altas."],
    tribunal: [
      qa("¿Qué es un sangrado mayor?", "Intracraneal, con descenso de Hb de 2 g, con compromiso hemodinámico o en un órgano crítico."),
      qa("¿Qué antídoto tiene el dabigatrán?", "Idarucizumab, un anticuerpo monoclonal específico."),
      qa("¿Qué fármacos aumentan el RIN?", "Amiodarona, antibióticos como quinolonas y cotrimoxazol, fluconazol y metronidazol."),
    ],
  },
};
