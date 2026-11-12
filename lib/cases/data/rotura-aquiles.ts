import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const roturaAquiles: ClinicalCase = {
  id: "rotura-tendon-aquiles",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 43, ageUnit: "años", sex: "M", context: "Juega al pádel los fines de semana. Hace poco tomó ciprofloxacina." },
  frequency: "frecuente",
  intro: "“Jugando al pádel sentí como si me pegaran una patada en el talón. Escuché un chasquido y ahora camino mal.”",
  vitals: { TA: "126/78 mmHg", FC: "82 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue? ¿Chasquido?", "clave", "“Arranqué de golpe; chasquido.”", "Típico."),
    act("farmacos", "¿Quinolonas o corticoides?", "clave", "“Ciprofloxacina hace dos semanas.”", "Riesgo."),
    act("previo", "¿Dolor previo en el tendón?", "clave", "“Molestias.”", "Tendinopatía."),
    act("anticoag", "¿Anticoagulantes?", "util", "“No.”", "Cirugía."),
    act("deporte", "¿Cuánto hace que jugás?", "util", "“Empecé hace poco.”", "Carga."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Contador.”", "No orienta."),
  ],
  exam: [
    act("thompson", "Prueba de Thompson", "clave", "No hay flexión plantar al apretar la pantorrilla.", "Rotura completa."),
    act("gap", "Palpación del tendón", "clave", "Hueco palpable a 4 cm del talón.", "Confirma."),
    act("neurovascular", "Pulsos y sensibilidad", "util", "Normales.", "Sin lesión."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico con Thompson", "clave", "Positivo.", "Suficiente."),
    study("Imágenes", "eco", "Ecografía si hay duda", "util", "Rotura completa con separación de 2 cm.", "Planifica."),
    study("Imágenes", "rx", "Radiografía", "util", "Sin arrancamiento óseo.", "Excluye fractura."),
    study("Otros", "caminar", "Que camine sin protección", "riesgoso", "No se realizó.", "Separación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aquiles", "Rotura completa del tendón de Aquiles", true, "Chasquido, Thompson positivo y hueco palpable."),
      dx("esguince", "Esguince de tobillo", false, "Thompson positivo."),
      dx("desgarro", "Desgarro de gemelos", false, "Hueco en el tendón."),
      dx("tvp", "TVP", false, "Mecanismo y Thompson."),
      dx("fractura", "Fractura de calcáneo", false, "Radiografía normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bota", "Inmovilizar en equino con bota o yeso", "clave", "Aproxima los extremos."),
      mg("decision", "Decidir cirugía o tratamiento funcional con traumatología", "clave", "Ambos válidos."),
      mg("profilaxis", "Profilaxis de trombosis si está inmovilizado", "clave", "Riesgo."),
      mg("rehab", "Rehabilitación progresiva", "util", "Recuperación."),
      mg("corticoide", "Infiltrar corticoide", "riesgoso", "Daña el tendón."),
      mg("seguir", "Seguir jugando con venda", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Rotura completa del tendón de Aquiles derecho durante pádel, con exposición previa a ciprofloxacina, en varón de 43 años.",
    pathologies: [
      { name: "Rotura de Aquiles", role: "principal", why: "Lesión tendinosa." },
      { name: "Quinolonas y tendinopatía", role: "asociada", why: "Factores." },
      { name: "Esguince, desgarro, TVP", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: carga explosiva sobre tendón degenerado.",
      "Mecanismo: rotura en la zona menos irrigada.",
      "Consecuencia: pérdida de la flexión plantar eficaz.",
    ],
    epidemiology:
      "Es típica de varones de 30 a 50 años que hacen deporte ocasional; el pádel es una causa frecuente en Argentina. Las quinolonas y los corticoides aumentan el riesgo. Hasta un cuarto de los casos se pasa por alto como esguince.",
    management: [
      "Thompson.",
      "Inmovilizar en equino.",
      "Decidir con traumatología.",
      "Rehabilitar.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Lesiones del tendón de Aquiles.", "AAOS — Acute Achilles Tendon Rupture Guideline."],
    pearls: ["Patada en el talón.", "Thompson.", "Quinolonas."],
    pitfalls: ["Llamarlo esguince.", "Infiltrar."],
    tribunal: [
      qa("¿Qué es la prueba de Thompson?", "Con la persona boca abajo, apretar la pantorrilla: si no hay flexión plantar, hay rotura."),
      qa("¿Qué fármacos dañan los tendones?", "Las fluoroquinolonas y los corticoides."),
      qa("¿Dónde se rompe con más frecuencia?", "A 2 a 6 cm de la inserción, zona de menor irrigación."),
    ],
  },
};
