import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const policitemiaVera: ClinicalCase = {
  id: "policitemia-vera",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 61, ageUnit: "años", sex: "M", context: "No fuma. Sin enfermedad pulmonar. Hace poco tuvo una trombosis en la pierna." },
  frequency: "poco-frecuente",
  intro: "“Me pica todo el cuerpo después de bañarme, tengo la cara roja y me duele la cabeza. En un análisis me salió la sangre espesa.”",
  vitals: { TA: "148/90 mmHg", FC: "78 lpm", "T°": "36,5 °C", "SatO₂": "97 %", Peso: "80 kg" },
  anamnesis: [
    act("prurito", "¿Cuándo pica?", "clave", "“Después de la ducha caliente.”", "Prurito acuagénico: típico."),
    act("secundaria", "¿Fumás, roncás, vivís en altura, usás testosterona?", "clave", "“Nada de eso.”", "Excluye causas secundarias."),
    act("trombosis", "¿Trombosis, ACV o dolor en dedos?", "clave", "“Trombosis en la pierna; me arden los dedos.”", "Eritromelalgia y trombosis."),
    act("sangrado", "¿Sangrados?", "util", "“Encías a veces.”", "Riesgo hemorrágico."),
    act("saciedad", "¿Te llenás rápido?", "util", "“Sí.”", "Esplenomegalia."),
    act("trabajo", "¿A qué te dedicás?", "neutro", "“Soy contador.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Rubicundez facial.", "Plétora."),
    act("bazo", "Bazo", "clave", "Esplenomegalia a 3 cm.", "Neoplasia mieloproliferativa."),
    act("pulmon", "Pulmón y saturación", "util", "Normales.", "Excluye hipoxemia."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma", "clave", "Hb 19,2; Hto 58 %; leucocitos 13.000; plaquetas 560.000.", "Eritrocitosis con trilinaje."),
    study("Laboratorio", "jak2", "Mutación JAK2 V617F y eritropoyetina", "clave", "JAK2 positivo; eritropoyetina baja.", "Confirma."),
    study("Otros", "mo", "Médula ósea", "util", "Hipercelular trilineal.", "Criterio menor."),
    study("Otros", "sangria-sin-dx", "Sangrías sin estudiar la causa", "riesgoso", "No se realizó.", "Hay que diferenciar de causas secundarias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pv", "Policitemia vera JAK2 positiva con trombosis previa", true, "Eritrocitosis con leucocitosis, trombocitosis, esplenomegalia, prurito acuagénico, JAK2 y eritropoyetina baja."),
      dx("secundaria", "Eritrocitosis secundaria", false, "Eritropoyetina baja y sin hipoxemia."),
      dx("relativa", "Eritrocitosis relativa por deshidratación", false, "Masa eritrocitaria real."),
      dx("lmc", "Leucemia mieloide crónica", false, "Predomina la eritrocitosis y JAK2."),
      dx("te", "Trombocitemia esencial", false, "La eritrocitosis domina."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("flebotomia", "Flebotomías para Hto menor de 45 %", "clave", "Reduce trombosis."),
      mg("aspirina", "Aspirina en dosis bajas", "clave", "Previene trombosis."),
      mg("hidroxiurea", "Hidroxiurea por alto riesgo (edad y trombosis)", "clave", "Citorreducción."),
      mg("factores", "Controlar presión y factores cardiovasculares", "util", "Riesgo."),
      mg("hierro", "Hierro por las flebotomías", "riesgoso", "Estimula la eritropoyesis."),
      mg("testosterona", "Testosterona por cansancio", "riesgoso", "Aumenta el Hto."),
    ],
  },
  debrief: {
    diagnosis: "Policitemia vera JAK2 V617F positiva, de alto riesgo por edad y trombosis previa, en varón de 61 años.",
    pathologies: [
      { name: "Policitemia vera", role: "principal", why: "Neoplasia mieloproliferativa." },
      { name: "Trombosis", role: "asociada", why: "Principal complicación." },
      { name: "Eritrocitosis secundaria, LMC", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutación JAK2 adquirida.",
      "Mecanismo: proliferación independiente de eritropoyetina.",
      "Consecuencia: hiperviscosidad, trombosis y riesgo de mielofibrosis.",
    ],
    epidemiology:
      "Es la neoplasia mieloproliferativa más común junto a la trombocitemia esencial, con pico a los 60 años. Más del 95 % tiene JAK2 positiva. La trombosis es la principal causa de morbimortalidad, y puede evolucionar a mielofibrosis o leucemia.",
    management: [
      "Excluir secundarias.",
      "JAK2 y eritropoyetina.",
      "Flebotomía y aspirina.",
      "Citorreducción en alto riesgo.",
    ],
    sources: ["Sociedad Argentina de Hematología — Neoplasias mieloproliferativas.", "European LeukemiaNet — Recommendations for Philadelphia-negative MPN."],
    pearls: ["Prurito tras la ducha.", "JAK2 con eritropoyetina baja.", "Hto menor de 45 %."],
    pitfalls: ["No buscar causas secundarias.", "Dar hierro."],
    tribunal: [
      qa("¿Qué causas secundarias de eritrocitosis conocés?", "Hipoxemia (EPOC, apnea, altura), tabaquismo, tumores productores de eritropoyetina y testosterona."),
      qa("¿Qué es la eritromelalgia?", "Ardor y enrojecimiento de manos y pies por microtrombosis, que responde a aspirina."),
      qa("¿Qué neoplasias mieloproliferativas clásicas hay?", "LMC, policitemia vera, trombocitemia esencial y mielofibrosis primaria."),
    ],
  },
};
