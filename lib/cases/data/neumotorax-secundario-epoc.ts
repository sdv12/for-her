import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumotoraxSecundarioEpoc: ClinicalCase = {
  id: "neumotorax-secundario-epoc",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "EPOC grave con enfisema. Fuma todavía." },
  frequency: "frecuente",
  intro: "“De golpe me dio un puntazo en el costado izquierdo y me falta mucho el aire.”",
  vitals: { TA: "128/78 mmHg", FC: "118 lpm", FR: "32 rpm", "T°": "36,5 °C", "SatO₂": "84 %" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe, tosiendo.”", "Súbito."),
    act("epoc", "¿Cómo estabas antes?", "clave", "“Con poco aire siempre.”", "Reserva baja."),
    act("tabaco", "¿Fumás?", "clave", "“Sí.”", "Factor."),
    act("previos", "¿Neumotórax antes?", "util", "“No.”", "Recurrencia."),
    act("fiebre", "¿Fiebre o catarro?", "util", "“No.”", "Exacerbación."),
    act("hobby", "¿Qué te gusta?", "neutro", "“La radio.”", "No orienta."),
  ],
  exam: [
    act("torax", "Tórax", "clave", "Murmullo abolido e hiperresonancia izquierda.", "Neumotórax."),
    act("tension", "Tráquea y presión", "clave", "Tráquea centrada, sin hipotensión.", "No es a tensión."),
    act("trabajo", "Trabajo respiratorio", "util", "Tiraje.", "Gravedad."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Neumotórax izquierdo de 3 cm en el ápex.", "Grande."),
    study("Imágenes", "tc", "TC si hay dudas con bullas", "util", "Bullas apicales.", "Distingue bulla de neumotórax."),
    study("Laboratorio", "gases", "Gases", "clave", "pO₂ 50; pCO₂ 52.", "Gravedad."),
    study("Otros", "puncion-bulla", "Drenar una bulla grande creyendo que es neumotórax", "riesgoso", "No se realizó.", "Puede causar fístula."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("secundario", "Neumotórax espontáneo secundario por EPOC", true, "Enfisema, dolor súbito, ausencia de murmullo y radiografía."),
      dx("primario", "Neumotórax primario", false, "Tiene enfermedad pulmonar."),
      dx("exacerbacion", "Exacerbación de EPOC", false, "Radiografía con neumotórax."),
      dx("tension", "Neumotórax a tensión", false, "Tráquea y presión normales."),
      dx("iam", "IAM", false, "Radiografía explica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tubo", "Tubo de drenaje pleural e internación", "clave", "Secundario con síntomas."),
      mg("oxigeno", "Oxígeno controlado", "clave", "Hipoxemia."),
      mg("prevencion", "Evaluar pleurodesis o cirugía y dejar de fumar", "clave", "Alta recurrencia."),
      mg("broncodilatadores", "Continuar broncodilatadores", "util", "EPOC."),
      mg("observar", "Observar en casa", "riesgoso", "Poca reserva."),
      mg("avion", "Viajar en avión la semana próxima", "riesgoso", "Riesgo hasta resolver."),
    ],
  },
  debrief: {
    diagnosis: "Neumotórax espontáneo secundario izquierdo grande, en varón de 68 años con EPOC enfisematoso.",
    pathologies: [
      { name: "Neumotórax secundario", role: "principal", why: "Aire en pleura por enfermedad pulmonar." },
      { name: "EPOC", role: "asociada", why: "Causa y poca reserva." },
      { name: "Primario, exacerbación, a tensión", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: rotura de bullas enfisematosas.",
      "Mecanismo: pasa aire a la pleura y colapsa el pulmón.",
      "Consecuencia: hipoxemia grave con poca reserva.",
    ],
    epidemiology:
      "El secundario aparece en mayores con EPOC y es más grave que el primario. Tiene más recurrencias y mortalidad. Siempre se interna, y dejar de fumar es clave.",
    management: [
      "Radiografía.",
      "Tubo de drenaje.",
      "Internación.",
      "Prevenir recurrencias.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Neumotórax.", "British Thoracic Society — Pleural Disease Guideline."],
    pearls: ["EPOC con dolor súbito: neumotórax.", "Secundario: siempre se interna.", "Cuidado con bullas."],
    pitfalls: ["Observar en casa.", "Drenar una bulla."],
    tribunal: [
      qa("¿Cómo diferenciás neumotórax primario y secundario?", "Primario: joven sin enfermedad pulmonar. Secundario: con enfermedad pulmonar, más grave."),
      qa("¿Qué signos indican neumotórax a tensión?", "Hipotensión, desviación traqueal, ingurgitación yugular e hipoxemia grave."),
      qa("¿Cómo se trata el neumotórax a tensión?", "Descompresión inmediata con aguja y luego tubo."),
    ],
  },
};
