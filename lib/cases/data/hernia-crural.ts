import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const herniaCrural: ClinicalCase = {
  id: "hernia-crural-estrangulada",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "F", context: "Delgada, tuvo 5 hijos. Toma enalapril. Nunca fue operada." },
  frequency: "frecuente",
  intro: "“Hace un día me duele mucho la panza, vomito y estoy hinchada. Tengo un bultito en la ingle que antes no tenía, y duele.”",
  vitals: { TA: "104/62 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "37,8 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("bulto", "¿Desde cuándo el bulto? ¿Se reduce?", "clave", "“Lo noté hoy, no se mete y duele mucho.”", "Hernia irreductible dolorosa."),
    act("transito", "¿Vas de cuerpo? ¿Vómitos?", "clave", "“No voy desde ayer y vomito todo.”", "Obstrucción."),
    act("tiempo", "¿Cuántas horas de dolor intenso?", "clave", "“Unas 18 horas.”", "Riesgo de necrosis."),
    act("anticoag", "¿Anticoagulantes, alergias?", "util", "“No.”", "Prequirúrgico."),
    act("tos", "¿Tos crónica o constipación?", "util", "“Constipada siempre.”", "Aumentos de presión."),
    act("nietos", "¿Cuántos nietos tenés?", "neutro", "“Once.”", "No orienta."),
  ],
  exam: [
    act("hernia", "Examinar el bulto y su relación con el ligamento inguinal", "clave", "Masa dura, roja y muy dolorosa, por debajo y lateral al tubérculo del pubis, irreductible.", "Hernia crural estrangulada; se suele pasar por alto."),
    act("abdomen", "Abdomen", "clave", "Distendido, timpánico, ruidos metálicos.", "Obstrucción."),
    act("ambas", "Examinar siempre ambas ingles en una obstrucción", "clave", "Izquierda normal.", "Evita omisiones."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, lactato, función renal, ionograma", "clave", "Leucocitos 17.000, lactato 3,6, creatinina 1,4.", "Sugiere sufrimiento intestinal."),
    study("Imágenes", "tac", "TC si hay dudas, sin demorar", "util", "Asa de delgado atrapada, con líquido en el saco.", "Confirma, si no demora."),
    study("Imágenes", "eco", "Ecografía de pared", "util", "Asa sin peristaltismo.", "Alternativa."),
    study("Electrofisiología", "ecg", "ECG prequirúrgico", "util", "Taquicardia sinusal.", "Evaluación."),
    study("Imágenes", "colono", "Colonoscopía antes de operar", "riesgoso", "No se realizó.", "No aporta en una hernia estrangulada y demora la cirugía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crural", "Hernia crural estrangulada con obstrucción de intestino delgado", true, "Masa irreductible debajo del ligamento inguinal, dolorosa, con obstrucción, fiebre y lactato alto."),
      dx("inguinal", "Hernia inguinal directa", false, "Está por encima y medial; en este caso la masa está debajo del ligamento."),
      dx("adenitis", "Adenitis inguinal", false, "No explica la obstrucción."),
      dx("bridas", "Obstrucción por bridas", false, "Nunca fue operada."),
      dx("safena", "Várice de la safena", false, "Sería reductible, con impulso y sin obstrucción."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía de urgencia: reducción, revisar el asa, resecar si está necrótica y cerrar el defecto", "clave", "Es urgencia absoluta."),
      mg("preparar", "Ayuno, sonda nasogástrica, hidratación, antibióticos", "clave", "Estabiliza."),
      mg("analgesia", "Analgesia", "clave", "No enmascara la decisión."),
      mg("reducir", "Reducir a la fuerza en guardia", "riesgoso", "Puede devolver un asa necrótica a la cavidad."),
      mg("alta", "Laxante y control", "riesgoso", "Perforación y muerte."),
      mg("malla", "Malla sin evaluar contaminación", "riesgoso", "Con resección sucia, el riesgo de infección de la malla es alto."),
    ],
  },
  debrief: {
    diagnosis: "Hernia crural estrangulada con obstrucción intestinal, en mujer de 78 años.",
    pathologies: [
      { name: "Hernia crural estrangulada", role: "principal", why: "Compromiso vascular del contenido." },
      { name: "Obstrucción de intestino delgado", role: "asociada", why: "Consecuencia." },
      { name: "Hernia inguinal, adenitis, bridas", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: anillo femoral estrecho en una mujer mayor con multiparidad y pérdida de peso.",
      "Mecanismo: el asa queda atrapada; el edema compromete el retorno venoso y luego arterial.",
      "Consecuencia: obstrucción, necrosis, perforación, peritonitis.",
    ],
    epidemiology:
      "La hernia crural es más común en mujeres mayores, aunque la inguinal sigue siendo la más frecuente en ellas. Tiene el mayor riesgo de estrangulación, por su anillo estrecho. Se recomienda operar siempre las crurales conocidas.",
    management: [
      "Examinar orificios herniarios en toda obstrucción.",
      "Preparar rápido.",
      "Cirugía de urgencia.",
      "Reparación definitiva según contaminación.",
    ],
    sources: ["Asociación Argentina de Cirugía — Relatos de hernias.", "HerniaSurge — Guía internacional de hernias de la ingle."],
    pearls: ["Obstrucción en mayores: mirá las ingles.", "Crural: debajo y lateral al tubérculo del pubis.", "No reducir a la fuerza una estrangulada."],
    pitfalls: ["No destapar y examinar.", "Confundirla con un ganglio."],
    tribunal: [
      qa("¿Qué diferencia una hernia inguinal directa de una indirecta?", "La directa protruye medial a los vasos epigástricos por el triángulo de Hesselbach. La indirecta es lateral y atraviesa el anillo profundo."),
      qa("¿Qué diferencia hernia atascada de estrangulada?", "Atascada: irreductible sin compromiso vascular. Estrangulada: con compromiso vascular: es urgencia."),
      qa("¿Cuáles son las relaciones del conducto femoral?", "En el triángulo femoral se ubican, de lateral a medial, nervio, arteria, vena y conducto crural (NAVEL); la hernia sale por este último, medial a la vena."),
    ],
  },
};
