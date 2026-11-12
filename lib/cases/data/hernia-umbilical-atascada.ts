import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const herniaUmbilicalAtascada: ClinicalCase = {
  id: "hernia-umbilical-atascada",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Obesa, cinco embarazos. Hernia umbilical hace años, nunca operada." },
  frequency: "frecuente",
  intro: "“La hernia del ombligo se me puso dura y no vuelve a entrar. Me duele mucho y vomité.”",
  vitals: { TA: "138/84 mmHg", FC: "106 lpm", FR: "20 rpm", "T°": "37,6 °C" },
  anamnesis: [
    act("tiempo", "¿Hace cuánto no entra?", "clave", "“Diez horas.”", "Tiempo de isquemia."),
    act("transito", "¿Gases y deposiciones?", "clave", "“No desde ayer.”", "Obstrucción."),
    act("color", "¿Cambió de color?", "clave", "“Está roja.”", "Estrangulación."),
    act("previo", "¿Se reducía antes?", "util", "“Sí, sola.”", "Reductible."),
    act("anticoag", "¿Anticoagulantes?", "util", "“No.”", "Cirugía."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Seis.”", "No orienta."),
  ],
  exam: [
    act("hernia", "Hernia", "clave", "Tumoración umbilical dura, dolorosa, eritematosa, irreductible.", "Estrangulación."),
    act("abdomen", "Abdomen", "clave", "Distendido, ruidos aumentados.", "Obstrucción."),
    act("perfusion", "Perfusión", "util", "Taquicardia.", "Gravedad."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, lactato, ionograma", "clave", "Leucocitos 15.000; lactato 3.", "Isquemia."),
    study("Imágenes", "tc", "TC o ecografía si hay dudas", "util", "Asa intestinal encarcerada con signos de sufrimiento.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de abdomen", "util", "Niveles hidroaéreos.", "Obstrucción."),
    study("Otros", "reducir-forzado", "Reducción forzada repetida", "riesgoso", "No se realizó.", "Puede introducir un asa necrótica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("estrangulada", "Hernia umbilical atascada con signos de estrangulación y obstrucción intestinal", true, "Irreductible, dolorosa, roja, con obstrucción y lactato."),
      dx("lipoma", "Lipoma", false, "Obstrucción."),
      dx("eventracion", "Eventración", false, "Sin cirugía previa."),
      dx("absceso", "Absceso umbilical", false, "Obstrucción."),
      dx("onfalitis", "Onfalitis", false, "Adulto con hernia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía urgente con evaluación del asa", "clave", "Estrangulación."),
      mg("reanimar", "Hidratación, sonda nasogástrica y antibiótico", "clave", "Preparación."),
      mg("malla", "Reparación con malla si el campo lo permite", "util", "Reduce recurrencia."),
      mg("analgesia", "Analgesia", "clave", "Dolor."),
      mg("alta", "Reducir y dar el alta", "riesgoso", "Riesgo de necrosis."),
      mg("faja", "Faja y control", "riesgoso", "Demora."),
    ],
  },
  debrief: {
    diagnosis: "Hernia umbilical atascada con estrangulación y obstrucción intestinal, en mujer de 58 años.",
    pathologies: [
      { name: "Hernia umbilical estrangulada", role: "principal", why: "Compromiso vascular del contenido." },
      { name: "Obstrucción intestinal", role: "asociada", why: "Complicación." },
      { name: "Lipoma, absceso", role: "diferencial", why: "Otras masas." },
    ],
    reasoning: [
      "Causa: defecto de pared con aumento de presión.",
      "Mecanismo: el contenido queda atrapado y se compromete el flujo.",
      "Consecuencia: necrosis y perforación.",
    ],
    epidemiology:
      "Las hernias umbilicales son frecuentes en adultos con obesidad, múltiples embarazos o ascitis. Se recomienda operar las sintomáticas antes de que se compliquen. La estrangulación requiere cirugía urgente.",
    management: [
      "Evaluar.",
      "Laboratorio.",
      "Cirugía.",
      "Prevenir.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Hernias de pared abdominal.", "European Hernia Society — Umbilical and Epigastric Hernia Guidelines."],
    pearls: ["Dura, roja e irreductible: estrangulada.", "Lactato.", "No forzar."],
    pitfalls: ["Reducir a la fuerza.", "Alta."],
    tribunal: [
      qa("¿Cómo diferenciás atascada y estrangulada?", "Atascada: irreductible sin compromiso vascular. Estrangulada: con isquemia."),
      qa("¿Qué es una hernia de Richter?", "Pinzamiento de solo una parte de la pared intestinal, sin obstrucción completa."),
      qa("¿Qué hernia es más frecuente?", "La inguinal indirecta."),
    ],
  },
};
