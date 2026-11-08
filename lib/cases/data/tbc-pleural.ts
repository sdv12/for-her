import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcPleural: ClinicalCase = {
  id: "tuberculosis-pleural-mujer-joven",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Estudiante, vive en una pensión. Una compañera tuvo tuberculosis." },
  frequency: "frecuente",
  intro: "“Hace tres semanas me duele el costado izquierdo al respirar, tengo febrícula y me falta el aire.”",
  vitals: { TA: "110/68 mmHg", FC: "98 lpm", FR: "24 rpm", "T°": "37,9 °C", "SatO₂": "94 %", Peso: "52 kg" },
  anamnesis: [
    act("contacto", "¿Contacto con TBC?", "clave", "“Una compañera de cuarto.”", "Exposición."),
    act("tiempo", "¿Cuánto tiempo? ¿Peso?", "clave", "“Tres semanas; bajé 4 kilos.”", "Subagudo."),
    act("vih", "¿Test de VIH, diabetes, corticoides?", "clave", "“No sé.”", "Riesgo."),
    act("sangre", "¿Sangre con la tos?", "util", "“No.”", "Pulmonar."),
    act("embarazo", "¿Posible embarazo?", "util", "“No.”", "Fármacos."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Derecho.”", "No orienta."),
  ],
  exam: [
    act("derrame", "Tórax", "clave", "Matidez y murmullo abolido en base izquierda.", "Derrame."),
    act("ganglios", "Ganglios", "clave", "Sin adenopatías.", "Excluye linfoma."),
    act("piel", "Piel y cicatriz BCG", "util", "BCG presente.", "No excluye."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Derrame izquierdo moderado.", "Base."),
    study("Otros", "toracocentesis", "Toracocentesis con citoquímico, ADA, Xpert y cultivo", "clave", "Exudado linfocitario, ADA 88; Xpert negativo.", "ADA alto: muy sugestivo."),
    study("Laboratorio", "vih", "VIH, baciloscopías de esputo y hepatograma", "clave", "VIH negativo.", "Base."),
    study("Otros", "biopsia", "Biopsia pleural si no se confirma", "util", "Granulomas caseificantes.", "Confirmación."),
    study("Otros", "broncoscopia-rutina", "Broncoscopía de rutina", "innecesario", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc", "Tuberculosis pleural", true, "Contacto, derrame exudativo linfocitario y ADA alto."),
      dx("paraneumonico", "Derrame paraneumónico", false, "Sería con neutrófilos y curso agudo."),
      dx("lupus", "Lupus", false, "Sin compromiso sistémico."),
      dx("linfoma", "Linfoma", false, "Sin adenopatías; granulomas."),
      dx("neoplasico", "Derrame neoplásico", false, "Mujer joven y ADA elevado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hrze", "Tratamiento de 6 meses: 2 meses HRZE y 4 meses HR", "clave", "Estándar."),
      mg("dots", "Tratamiento supervisado y notificación", "clave", "Salud pública."),
      mg("contactos", "Evaluar contactos", "clave", "Cortar transmisión."),
      mg("piridoxina", "Piridoxina si hay riesgo de neuropatía", "util", "Prevención."),
      mg("corticoides", "Corticoides solos", "riesgoso", "Sin antibióticos, empeora."),
      mg("atb", "Levofloxacina como neumonía", "riesgoso", "Enmascara y genera resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pleural con derrame exudativo linfocitario y ADA elevado, en mujer de 23 años.",
    pathologies: [
      { name: "Tuberculosis pleural", role: "principal", why: "Forma extrapulmonar frecuente." },
      { name: "Exposición en convivencia", role: "asociada", why: "Riesgo." },
      { name: "Paraneumónico, neoplásico, lupus", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: M. tuberculosis.",
      "Mecanismo: reacción de hipersensibilidad con foco subpleural.",
      "Consecuencia: derrame y paquipleuritis.",
    ],
    epidemiology:
      "La TBC tiene una tendencia creciente en Argentina, con más casos en jóvenes de 15 a 34 años, sobre todo en grandes ciudades, y barrios populares. La forma pleural es la extrapulmonar más común en jóvenes. El ADA pleural es de gran ayuda en zonas de alta prevalencia.",
    management: [
      "Toracocentesis.",
      "ADA.",
      "HRZE.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de tuberculosis.", "Asociación Argentina de Medicina Respiratoria — Enfermedades pleurales."],
    pearls: ["Derrame linfocitario con ADA alto.", "Baciloscopia a menudo negativa.", "Notificar."],
    pitfalls: ["Tratar como neumonía.", "No evaluar contactos."],
    tribunal: [
      qa("¿Qué dicen los criterios de Light?", "Exudado si proteína pleural/sérica mayor de 0,5, LDH pleural/sérica mayor de 0,6 o LDH mayor de dos tercios del límite normal."),
      qa("¿Cuál es la tasa de positividad de la baciloscopía pleural?", "Baja: menos del 10 % en líquido; el cultivo y la biopsia rinden más."),
      qa("¿Cuál es la toxicidad de la rifampicina?", "Hepatotoxicidad, orina anaranjada e interacciones con anticonceptivos."),
    ],
  },
};
