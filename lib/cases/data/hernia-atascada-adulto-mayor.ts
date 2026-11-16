import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const herniaAtascadaAdultoMayor: ClinicalCase = {
  id: "hernia-atascada-adulto-mayor",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 84, ageUnit: "años", sex: "M", context: "Demencia moderada, vive con la hija. Hernia inguinal derecha 'de siempre' que nunca operaron." },
  frequency: "frecuente",
  intro: "La hija: “Vomita desde anoche, no hace caca y tiene la hernia dura y roja. Se queja si se la toco.”",
  vitals: { TA: "104/62 mmHg", FC: "114 lpm", FR: "22 rpm", "T°": "37,9 °C" },
  anamnesis: [
    act("hernia", "¿Desde cuándo no se reduce la hernia?", "clave", "“Siempre se le metía acostado; desde ayer no.”", "Hernia atascada de más de 12 horas."),
    act("vomitos", "¿Cómo son los vómitos?", "clave", "“Verdes, y ahora con olor feo.”", "Obstrucción intestinal."),
    act("gases", "¿Elimina gases?", "clave", "“No.”", "Obstrucción completa."),
    act("anticoag", "¿Toma anticoagulantes?", "clave", "“Apixabán por una arritmia.”", "Importa para la cirugía."),
    act("voluntades", "¿Hablaron alguna vez sobre qué tratamientos querría?", "util", "“Que se lo operara si hacía falta.”", "Planificación compartida."),
    act("tv", "¿Qué mira en la tele?", "neutro", "“Fútbol.”", "No orienta."),
  ],
  exam: [
    act("hernia-ex", "Región inguinal", "clave", "Tumoración inguinoescrotal derecha dura, eritematosa, caliente y muy dolorosa, irreductible.", "Signos de estrangulación."),
    act("abdomen", "Abdomen", "clave", "Distendido, timpánico, ruidos de lucha.", "Obstrucción."),
    act("hidratacion", "Hidratación", "util", "Muy deshidratado.", "Reanimación."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, lactato, ionograma, función renal, coagulación", "clave", "Leucocitos 17.000, lactato 3,6, creatinina 1,7.", "Sugiere isquemia intestinal."),
    study("Imágenes", "rx", "Radiografía de abdomen", "util", "Niveles hidroaéreos en delgado.", "Obstrucción."),
    study("Imágenes", "tac", "TC si hay dudas, sin demorar la cirugía", "util", "Asa de delgado en el saco herniario con pared engrosada y líquido.", "Confirma."),
    study("Otros", "reducir-fuerza", "Intento de reducción manual forzada", "riesgoso", "No se hizo.", "Con signos de estrangulación puede reducir intestino necrótico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("estrangulada", "Hernia inguinal derecha estrangulada con obstrucción intestinal", true, "Hernia irreductible de más de 12 horas, eritema, dolor intenso, fiebre, lactato alto y obstrucción."),
      dx("atascada-simple", "Hernia atascada sin compromiso vascular", false, "Eritema, fiebre y lactato alto indican estrangulación."),
      dx("orquiepididimitis", "Orquiepididimitis", false, "Hay obstrucción intestinal y asa en el saco."),
      dx("hidrocele", "Hidrocele", false, "No transilumina y es dolorosa."),
      dx("volvulo", "Vólvulo de sigmoides", false, "El asa está en el saco herniario."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia-urgente", "Cirugía urgente con evaluación de la viabilidad intestinal y resección si hace falta", "clave", "Estrangulación: no se espera."),
      mg("reanimar", "Hidratación, sonda nasogástrica y antibióticos", "clave", "Preparación."),
      mg("anticoag", "Manejo del apixabán con hematología/anestesia", "clave", "Tiempo desde la última dosis."),
      mg("delirium", "Prevención del delirium perioperatorio", "util", "Demencia."),
      mg("familia", "Hablar con la familia sobre riesgos y objetivos", "clave", "Decisión compartida."),
      mg("reduccion-forzada", "Reducción manual con sedación y alta", "riesgoso", "Puede devolver al abdomen un asa necrótica."),
      mg("esperar", "Esperar a que mejore la función renal para operar", "riesgoso", "La isquemia avanza."),
    ],
  },
  debrief: {
    diagnosis: "Hernia inguinal derecha estrangulada con obstrucción intestinal, en un hombre de 84 años con demencia y anticoagulado.",
    pathologies: [
      { name: "Hernia inguinal estrangulada", role: "principal", why: "Compromiso vascular del contenido." },
      { name: "Obstrucción intestinal", role: "asociada", why: "Asa atrapada." },
      { name: "Demencia y anticoagulación", role: "asociada", why: "Riesgo perioperatorio." },
    ],
    reasoning: [
      "Causa: hernia crónica no operada.",
      "Mecanismo: el anillo comprime el retorno venoso, aparece edema y luego isquemia arterial.",
      "Consecuencia: necrosis, perforación y sepsis.",
    ],
    epidemiology:
      "La reparación de urgencia de hernias tiene una mortalidad hasta 10 veces mayor que la programada, sobre todo en mayores de 80 y cuando hay resección intestinal. Por eso se recomienda operar las hernias sintomáticas en forma electiva.",
    management: [
      "Reconocer signos de estrangulación.",
      "Reanimar.",
      "Cirugía urgente.",
      "Cuidado geriátrico perioperatorio.",
    ],
    sources: ["Asociación Argentina de Cirugía — Hernias de la pared abdominal.", "HerniaSurge Group — International guidelines for groin hernia management."],
    pearls: ["Roja, dura, caliente: estrangulada.", "No reducir a la fuerza.", "Operar electivamente a tiempo."],
    pitfalls: ["Reducción forzada.", "Demorar la cirugía."],
    tribunal: [
      qa("¿Qué diferencia hay entre hernia atascada y estrangulada?", "La atascada no se reduce; la estrangulada además tiene compromiso vascular del contenido."),
      qa("¿Qué es la reducción en bloque?", "La reducción del saco con el anillo constrictivo al abdomen, que mantiene el asa atrapada y oculta la estrangulación."),
      qa("¿Qué es la hernia de Richter?", "La que atrapa solo parte de la pared del intestino, puede necrosarse sin dar obstrucción."),
    ],
  },
};
