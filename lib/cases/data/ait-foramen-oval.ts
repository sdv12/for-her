import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const aitForamenOval: ClinicalCase = {
  id: "ait-foramen-oval",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Abogada. Volvió ayer de un vuelo de 12 horas. Sin factores de riesgo vascular." },
  frequency: "poco-frecuente",
  intro: "“Por media hora no pude hablar bien y se me cayó la mano derecha. Ahora estoy bien.”",
  vitals: { TA: "122/76 mmHg", FC: "72 lpm", "SatO₂": "98 %", Glucemia: "94 mg/dl" },
  anamnesis: [
    act("deficit", "¿Qué le pasó exactamente y cuánto duró?", "clave", "“Las palabras no me salían y la mano derecha no respondía, 30 minutos.”", "AIT hemisférico izquierdo."),
    act("valsalva", "¿Estaba haciendo fuerza?", "clave", "“Levantando la valija.”", "Valsalva: favorece el pasaje derecha-izquierda."),
    act("pierna", "¿Alguna pierna hinchada?", "clave", "“La izquierda un poco, después del vuelo.”", "Posible TVP como fuente."),
    act("cefalea", "¿Dolor de cabeza o de cuello?", "util", "“No.”", "Disección."),
    act("hormonas", "¿Anticonceptivos?", "util", "“No.”", "Riesgo trombótico."),
    act("caso", "¿Qué caso lleva?", "neutro", "“Uno laboral.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Normal.", "AIT."),
    act("pierna-ex", "Pierna izquierda", "clave", "Edema leve en pantorrilla.", "TVP probable."),
    act("cardio", "Corazón", "util", "Ritmo regular.", "Sin FA."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia con difusión", "clave", "Pequeño infarto cortical frontal izquierdo.", "Hay lesión pese a la recuperación."),
    study("Imágenes", "vasos", "Angiotomografía de vasos de cuello", "clave", "Sin disección ni placas.", "Descarta otras causas."),
    study("Imágenes", "eco-burbujas", "Ecocardiograma con burbujas", "clave", "Foramen oval permeable con shunt grande y aneurisma del septum.", "Fuente de embolia paradójica."),
    study("Imágenes", "doppler", "Doppler venoso de miembros inferiores", "clave", "TVP poplítea izquierda.", "Fuente."),
    study("Electrofisiología", "holter", "Holter", "util", "Sin FA.", "Descarta otra causa."),
    study("Otros", "eeg", "EEG", "innecesario", "No se pidió.", "No fue una crisis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("embolia-paradojica", "ACV isquémico menor por embolia paradójica a través de foramen oval permeable, con TVP tras vuelo largo", true, "Déficit hemisférico tras Valsalva, infarto cortical, FOP con shunt grande, TVP y sin otras causas."),
      dx("diseccion", "Disección carotídea", false, "Sin disección en la angiotomografía."),
      dx("migrana-aura", "Aura migrañosa", false, "Sin cefalea, con infarto en la resonancia."),
      dx("fa", "Cardioembolia por FA", false, "Holter sin FA."),
      dx("conversivo", "Trastorno funcional", false, "Infarto en la difusión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoagular", "Anticoagulación por la TVP", "clave", "Trata la fuente y previene nuevas embolias."),
      mg("cierre", "Cierre percutáneo del foramen oval tras completar el estudio", "clave", "En menores de 60 con ACV atribuible y shunt grande."),
      mg("neuro", "Seguimiento con neurología y cardiología", "util", "Decisión compartida."),
      mg("vuelos", "Medidas de prevención en vuelos largos", "util", "Movilidad e hidratación."),
      mg("trombolisis", "Trombólisis", "innecesario", "Déficit resuelto."),
      mg("alta-sin-estudio", "Alta sin estudiar por ser joven", "riesgoso", "Riesgo de recurrencia."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico menor por embolia paradójica a través de foramen oval permeable, con TVP tras un vuelo largo, en una mujer de 41 años.",
    pathologies: [
      { name: "Embolia paradójica", role: "principal", why: "Trombo venoso que pasa al circuito arterial." },
      { name: "Foramen oval permeable y TVP", role: "asociada", why: "Sustrato y fuente." },
      { name: "Disección, FA", role: "diferencial", why: "Causas de ACV en jóvenes." },
    ],
    reasoning: [
      "Causa: TVP por inmovilidad en un vuelo largo.",
      "Mecanismo: con Valsalva, la presión derecha supera la izquierda y el trombo cruza el foramen.",
      "Consecuencia: embolia cerebral.",
    ],
    epidemiology:
      "El foramen oval permeable está presente en el 25 % de la población, y en hasta el 40–50 % de los ACV criptogénicos de menores de 60. El cierre reduce la recurrencia en pacientes seleccionados con shunt grande o aneurisma del septum.",
    management: [
      "Resonancia y estudio vascular.",
      "Ecocardiograma con burbujas.",
      "Buscar TVP.",
      "Anticoagulación y cierre en seleccionados.",
    ],
    sources: ["Sociedad Argentina de Neurología — ACV en adultos jóvenes.", "ESO — Guideline on patent foramen ovale closure."],
    pearls: ["ACV joven: buscá FOP.", "Valsalva + TVP = paradójica.", "AIT con imagen positiva es un ACV."],
    pitfalls: ["No estudiar a un joven.", "Atribuirlo a migraña."],
    tribunal: [
      qa("¿Qué es una embolia paradójica?", "Un émbolo venoso que pasa al circuito arterial por un shunt derecha-izquierda, como el foramen oval permeable."),
      qa("¿Qué es el score RoPE?", "Estima la probabilidad de que un ACV criptogénico se deba a un foramen oval permeable; más alto en jóvenes sin factores de riesgo."),
      qa("¿Qué diferencia un AIT de un ACV menor?", "El AIT no deja lesión en la resonancia con difusión; si hay infarto, es un ACV aunque los síntomas se resuelvan."),
    ],
  },
};
