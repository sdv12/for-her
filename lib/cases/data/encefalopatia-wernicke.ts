import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const encefalopatiaWernicke: ClinicalCase = {
  id: "encefalopatia-wernicke",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 51, ageUnit: "años", sex: "M", context: "En situación de calle. Toma alcohol a diario. Come poco." },
  frequency: "poco-frecuente",
  intro: "Lo trae el SAME: “Lo encontramos confundido, no puede caminar derecho y dice que ve doble.”",
  vitals: { TA: "108/68 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "36,1 °C", "SatO₂": "96 %", Glucemia: "68 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("alcohol", "¿Cuánto toma y cuándo fue la última vez?", "clave", "“Vino todos los días, ayer.”", "Consumo crónico."),
    act("comida", "¿Cuándo comió algo?", "clave", "“Hace días que casi no como.”", "Déficit de tiamina."),
    act("vision", "¿Desde cuándo ve doble?", "clave", "“Desde ayer.”", "Oftalmoplejía."),
    act("caidas", "¿Se golpeó la cabeza?", "util", "“No me acuerdo.”", "Hematoma subdural."),
    act("convulsiones", "¿Tuvo convulsiones o temblores?", "util", "“No.”", "Abstinencia."),
    act("familia", "¿Tiene familia?", "neutro", "“Una hermana en Rosario.”", "No orienta."),
  ],
  exam: [
    act("ojos", "Movimientos oculares", "clave", "Nistagmo horizontal y paresia del sexto par bilateral.", "Oftalmoplejía."),
    act("marcha", "Marcha", "clave", "Ataxia de tronco, base amplia.", "Ataxia."),
    act("conciencia", "Estado mental", "util", "Desorientado, apático.", "Confusión."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, ionograma, magnesio, hepatograma, alcoholemia", "clave", "Glucemia 68; Mg 1,3; alcoholemia negativa.", "Desencadenantes y diferencial."),
    study("Imágenes", "tc", "TC de cerebro", "clave", "Sin hematomas.", "Excluye trauma."),
    study("Imágenes", "rm", "RM de cerebro", "util", "Hiperintensidad en tálamos mediales y cuerpos mamilares.", "Apoya, no hace falta para tratar."),
    study("Laboratorio", "tiamina-espera", "Dosar tiamina y esperar el resultado para tratar", "riesgoso", "No se esperó.", "El retraso deja secuelas permanentes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("wernicke", "Encefalopatía de Wernicke por déficit de tiamina", true, "Alcoholismo y desnutrición con confusión, oftalmoplejía y ataxia."),
      dx("intoxicacion", "Intoxicación alcohólica aguda", false, "Alcoholemia negativa."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia de 68 no explica la oftalmoplejía."),
      dx("subdural", "Hematoma subdural", false, "TC normal."),
      dx("acv-cerebeloso", "ACV cerebeloso", false, "Signos bilaterales y simétricos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tiamina", "Tiamina EV en dosis altas antes de la glucosa", "clave", "Tratamiento urgente."),
      mg("magnesio", "Reponer magnesio", "clave", "Cofactor de la tiamina."),
      mg("glucosa-despues", "Dextrosa después de la tiamina", "clave", "Corregir glucemia sin precipitar."),
      mg("social", "Abordaje social y de consumo al alta", "util", "Causa de fondo."),
      mg("glucosa-sola", "Dextrosa hipertónica sin tiamina", "riesgoso", "Consume la tiamina y empeora."),
      mg("alta", "Alta cuando se le pase", "riesgoso", "Progresa a Korsakoff."),
    ],
  },
  debrief: {
    diagnosis: "Encefalopatía de Wernicke por déficit de tiamina, en varón de 51 años con alcoholismo y desnutrición en situación de calle.",
    pathologies: [
      { name: "Encefalopatía de Wernicke", role: "principal", why: "Déficit agudo de tiamina." },
      { name: "Alcoholismo, desnutrición, hipomagnesemia", role: "asociada", why: "Causa y agravantes." },
      { name: "Intoxicación, subdural", role: "diferencial", why: "Otras causas de confusión." },
    ],
    reasoning: [
      "Causa: baja ingesta y mala absorción de tiamina por alcohol.",
      "Mecanismo: falla del metabolismo energético en tálamo, cuerpos mamilares y tronco.",
      "Consecuencia: confusión, oftalmoplejía, ataxia y, si no se trata, síndrome de Korsakoff.",
    ],
    epidemiology:
      "Está subdiagnosticada: en autopsias se encuentra mucho más que en vida. La tríada completa aparece en menos de un tercio. También ocurre tras cirugía bariátrica, hiperemesis y desnutrición grave.",
    management: [
      "Sospechar.",
      "Tiamina antes de glucosa.",
      "Magnesio.",
      "Abordaje social.",
    ],
    sources: ["Sociedad Neurológica Argentina — Encefalopatías carenciales.", "EFNS — Guidelines for Diagnosis, Therapy and Prevention of Wernicke Encephalopathy."],
    pearls: ["Tiamina antes de glucosa.", "La tríada es incompleta.", "Tratá con la sospecha."],
    pitfalls: ["Glucosa sola.", "Pensar que es solo borrachera."],
    tribunal: [
      qa("¿Qué es el síndrome de Korsakoff?", "Amnesia anterógrada con confabulación, secuela de Wernicke no tratado."),
      qa("¿En qué otros pacientes aparece?", "Tras cirugía bariátrica, hiperemesis gravídica, desnutrición y nutrición parenteral sin vitaminas."),
      qa("¿Por qué la glucosa puede empeorarla?", "Porque su metabolismo consume la poca tiamina disponible."),
    ],
  },
};
