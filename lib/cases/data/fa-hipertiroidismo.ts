import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const faHipertiroidismo: ClinicalCase = {
  id: "fa-hipertiroidismo",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 48, ageUnit: "años", sex: "M", context: "Remisero. Sin antecedentes. Bajó 8 kilos en 3 meses 'sin hacer dieta'." },
  frequency: "frecuente",
  intro: "“El corazón me late a mil y desordenado. Estoy muy nervioso y transpiro todo el día.”",
  vitals: { TA: "142/70 mmHg", FC: "148 lpm irregular", FR: "20 rpm", "SatO₂": "97 %", "T°": "37,4 °C" },
  anamnesis: [
    act("palpitaciones", "¿Desde cuándo las palpitaciones?", "clave", "“Desde ayer a la noche, sin parar.”", "Menos de 48 horas: importa para cardiovertir."),
    act("peso", "¿Cómo bajó de peso? ¿Come más?", "clave", "“Como como nunca y adelgazo.”", "Hipermetabolismo."),
    act("calor", "¿Le molesta el calor, tiene diarrea, temblor?", "clave", "“Sí, todo eso.”", "Tirotoxicosis."),
    act("ojos", "¿Notó los ojos más saltones?", "util", "“Mi señora dice que sí.”", "Orbitopatía: Graves."),
    act("drogas", "¿Toma algo para adelgazar, amiodarona, cocaína?", "clave", "“No.”", "Otras causas."),
    act("auto", "¿Qué auto maneja?", "neutro", "“Un Corsa.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Tiroides", "clave", "Bocio difuso con soplo.", "Graves."),
    act("ojos-ex", "Ojos", "clave", "Retracción palpebral y exoftalmos leve.", "Orbitopatía."),
    act("cardio", "Cardiovascular", "util", "Arritmia completa, sin signos de falla.", "FA de respuesta rápida."),
    act("temblor", "Manos", "util", "Temblor fino, piel caliente y húmeda.", "Hiperadrenérgico."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Fibrilación auricular a 150 lpm, QRS angosto.", "Diagnóstico de la arritmia."),
    study("Laboratorio", "tiroides-lab", "TSH y T4 libre", "clave", "TSH menor de 0,01, T4 libre 4,8 ng/dl.", "Hipertiroidismo."),
    study("Laboratorio", "trab", "Anticuerpos anti-receptor de TSH", "util", "Positivos.", "Confirma Graves."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Aurícula izquierda normal, FEy conservada.", "Basal."),
    study("Imágenes", "centellograma-urgente", "Centellograma tiroideo urgente", "innecesario", "No se pidió.", "No cambia la conducta en la guardia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fa-graves", "Fibrilación auricular de respuesta rápida secundaria a hipertiroidismo por enfermedad de Graves", true, "FA nueva en un hombre de 48 años con pérdida de peso, bocio con soplo, orbitopatía y TSH suprimida."),
      dx("fa-idiopatica", "FA aislada sin causa", false, "La tirotoxicosis la explica."),
      dx("tormenta", "Tormenta tiroidea", false, "Sin fiebre alta ni alteración del sensorio."),
      dx("panico", "Crisis de pánico", false, "Hay FA documentada."),
      dx("feocromocitoma", "Feocromocitoma", false, "TSH suprimida y bocio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("propranolol", "Propranolol para controlar la frecuencia", "clave", "Controla la FC y los síntomas adrenérgicos."),
      mg("metimazol", "Metimazol", "clave", "Tratar el hipertiroidismo: la FA suele revertir sola al normalizar la tiroides."),
      mg("anticoag", "Evaluar anticoagulación por CHA₂DS₂-VASc", "clave", "Riesgo embólico."),
      mg("endocrino", "Seguimiento con endocrinología", "util", "Tratamiento definitivo."),
      mg("cardioversion-ya", "Cardioversión eléctrica sin tratar la tiroides", "riesgoso", "Recae mientras siga hipertiroideo."),
      mg("amiodarona", "Amiodarona", "riesgoso", "Tiene yodo y puede empeorar el hipertiroidismo."),
    ],
  },
  debrief: {
    diagnosis: "Fibrilación auricular de respuesta rápida por hipertiroidismo de Graves, en un hombre de 48 años.",
    pathologies: [
      { name: "Fibrilación auricular", role: "principal", why: "Arritmia gatillada por el exceso de hormona tiroidea." },
      { name: "Enfermedad de Graves", role: "asociada", why: "Causa." },
      { name: "Tormenta tiroidea", role: "diferencial", why: "Forma grave a reconocer." },
    ],
    reasoning: [
      "Causa: anticuerpos que estimulan el receptor de TSH.",
      "Mecanismo: la T3 acorta el período refractario auricular y aumenta el automatismo.",
      "Consecuencia: FA de respuesta rápida con riesgo de falla y embolia.",
    ],
    epidemiology:
      "Entre el 10 y el 25 % de los hipertiroideos tiene FA, más los varones y mayores de 60. Por eso a toda FA nueva se le pide TSH. La mayoría revierte a sinusal dentro de los 3 meses de lograr el eutiroidismo.",
    management: [
      "TSH en toda FA nueva.",
      "Betabloqueante.",
      "Antitiroideos.",
      "Anticoagulación según riesgo.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de fibrilación auricular.", "ATA — Guidelines for hyperthyroidism and other causes of thyrotoxicosis."],
    pearls: ["FA nueva: pedí TSH.", "Propranolol + metimazol.", "Revierte al normalizar la tiroides."],
    pitfalls: ["Amiodarona.", "Cardiovertir sin tratar la causa."],
    tribunal: [
      qa("¿Por qué se pide TSH ante toda fibrilación auricular nueva?", "Porque el hipertiroidismo es una causa reversible y frecuente, a veces con pocos otros síntomas."),
      qa("¿Por qué se prefiere propranolol en la tirotoxicosis?", "Porque controla la frecuencia y los síntomas adrenérgicos y además reduce la conversión de T4 a T3."),
      qa("¿Qué tratamientos definitivos tiene la enfermedad de Graves?", "Iodo radiactivo, cirugía tiroidea o antitiroideos por 12 a 18 meses con chance de remisión."),
    ],
  },
};
