import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const miocardiopatiaDilatadaAlcoholica: ClinicalCase = {
  id: "insuficiencia-cardiaca-miocardiopatia-alcoholica",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 48, ageUnit: "años", sex: "M", context: "Bebe más de un litro de vino por día hace 20 años. Sin hipertensión ni diabetes." },
  frequency: "frecuente",
  intro: "“Hace un mes me ahogo al caminar, duermo sentado y se me hincharon las piernas.”",
  vitals: { TA: "112/74 mmHg", FC: "112 lpm", FR: "26 rpm", "T°": "36,4 °C", "SatO₂": "91 %", Peso: "78 kg" },
  anamnesis: [
    act("alcohol", "¿Cuánto bebés?", "clave", "“Más de un litro de vino por día.”", "Causa."),
    act("disnea", "¿Ortopnea, disnea nocturna?", "clave", "“Duermo sentado.”", "Congestión."),
    act("isquemia", "¿Dolor de pecho?", "clave", "“No.”", "Isquémica."),
    act("chagas", "¿Chagas o vinchucas?", "util", "“No.”", "Otra causa."),
    act("drogas", "¿Cocaína?", "util", "“No.”", "Tóxica."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy mozo.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Pulmón", "clave", "Rales bibasales.", "Congestión."),
    act("corazon", "Corazón", "clave", "Tercer ruido, choque desplazado.", "Dilatación."),
    act("hepato", "Hígado y edemas", "util", "Hepatomegalia y edema.", "Derecha."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma", "clave", "VI dilatado con FEy 25 %, hipoquinesia global.", "Miocardiopatía dilatada."),
    study("Laboratorio", "bnp", "BNP, troponina, función renal, hepatograma", "clave", "BNP alto; GGT alta.", "IC y alcohol."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal.", "Base."),
    study("Otros", "coronarias", "Evaluación coronaria no invasiva", "util", "Normal.", "Excluye isquémica."),
    study("Otros", "sin-eco", "Tratar sin ecocardiograma", "riesgoso", "No se realizó.", "No define."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("alcoholica", "Insuficiencia cardíaca con FEy reducida por miocardiopatía dilatada alcohólica", true, "Consumo alto, VI dilatado con FEy 25 % y coronarias normales."),
      dx("isquemica", "Miocardiopatía isquémica", false, "Coronarias normales."),
      dx("chagasica", "Miocardiopatía chagásica", false, "Sin antecedentes."),
      dx("cirrosis", "Cirrosis con ascitis", false, "Hay congestión pulmonar y FEy baja."),
      dx("tep", "TEP", false, "FEy baja."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("diureticos", "Furosemida EV y oxígeno", "clave", "Descongestión."),
      mg("abstinencia", "Suspender alcohol y prevenir abstinencia con tiamina", "clave", "Puede revertir."),
      mg("pilares", "Cuatro pilares de IC con FEy reducida", "clave", "Mortalidad."),
      mg("seguimiento", "Seguimiento ecocardiográfico", "util", "Recuperación."),
      mg("aines", "AINE para dolores", "riesgoso", "Descompensan."),
      mg("verapamilo", "Verapamilo para la frecuencia", "riesgoso", "Inotrópico negativo."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia cardíaca descompensada con FEy de 25 % por miocardiopatía dilatada alcohólica, en varón de 48 años.",
    pathologies: [
      { name: "Insuficiencia cardíaca", role: "principal", why: "FEy reducida." },
      { name: "Alcoholismo", role: "asociada", why: "Causa." },
      { name: "Isquémica, chagásica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: toxicidad directa del alcohol.",
      "Mecanismo: daño de miocitos y dilatación.",
      "Consecuencia: congestión y arritmias.",
    ],
    epidemiology:
      "El consumo crónico de alcohol es una causa importante de miocardiopatía dilatada en varones jóvenes. Dejar de beber puede mejorar mucho la función. En Argentina siempre se busca también Chagas e isquemia.",
    management: [
      "Eco.",
      "Descongestionar.",
      "Abstinencia.",
      "Tratamiento de IC.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de insuficiencia cardíaca.", "ESC — Heart Failure Guidelines."],
    pearls: ["Alcohol: causa reversible.", "Tiamina.", "Excluir Chagas e isquemia."],
    pitfalls: ["No preguntar por alcohol.", "AINE."],
    tribunal: [
      qa("¿Qué causas tiene la miocardiopatía dilatada?", "Isquémica, alcohol, Chagas, miocarditis, genética, periparto, quimioterapia."),
      qa("¿Qué es el beriberi húmedo?", "IC de alto gasto por déficit de tiamina."),
      qa("¿Qué es la clasificación NYHA?", "De I (sin síntomas) a IV (síntomas en reposo)."),
    ],
  },
};
