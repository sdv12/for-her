import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaRadioNino: ClinicalCase = {
  id: "fractura-rodete-radio-nino",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "años", sex: "M", context: "Se cayó de la bicicleta apoyando la mano." },
  frequency: "muy-frecuente",
  intro: "“Se cayó de la bici con la mano estirada y le duele la muñeca. Puede mover los dedos.”",
  vitals: { FC: "98 lpm", "T°": "36,5 °C", Peso: "27 kg" },
  anamnesis: [
    act("mecanismo", "¿Cómo cayó?", "clave", "“Con la mano estirada.”", "Mecanismo típico."),
    act("dolor", "¿Dónde le duele?", "clave", "“En la muñeca, del lado del pulgar.”", "Radio distal."),
    act("historia", "¿El relato es coherente con lo visto?", "clave", "“Lo vimos todos en la plaza.”", "Descartar maltrato."),
    act("dedos", "¿Siente los dedos?", "util", "“Sí.”", "Nervios."),
    act("otras", "¿Se golpeó en otro lado?", "util", "“No.”", "Lesiones asociadas."),
    act("bici", "¿Usaba casco?", "neutro", "“Sí.”", "Prevención."),
  ],
  exam: [
    act("muneca", "Muñeca", "clave", "Dolor a la palpación del radio distal, edema leve, sin deformidad.", "Fractura estable."),
    act("neurovascular", "Pulsos y sensibilidad", "clave", "Normales.", "Sin compromiso."),
    act("codo", "Codo y escafoides", "util", "Normales.", "Excluye otras lesiones."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de muñeca frente y perfil", "clave", "Abombamiento de la cortical dorsal del radio distal sin desplazamiento.", "Fractura en rodete (torus)."),
    study("Imágenes", "rx-control", "Radiografías de control repetidas", "innecesario", "No se realizaron.", "Fractura estable."),
    study("Imágenes", "tc", "TC de muñeca", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "yeso-largo", "Yeso braquiopalmar por 6 semanas", "riesgoso", "No se indicó.", "Inmovilización excesiva."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("torus", "Fractura en rodete (torus) del radio distal", true, "Caída con mano extendida en niño, dolor en radio distal sin deformidad y abombamiento cortical."),
      dx("tallo-verde", "Fractura en tallo verde", false, "No hay ruptura de una cortical."),
      dx("fisis", "Fractura de la fisis (Salter-Harris)", false, "La línea no compromete la fisis."),
      dx("esguince", "Esguince de muñeca", false, "Hay fractura."),
      dx("escafoides", "Fractura de escafoides", false, "Escafoides normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ferula", "Férula removible por 3 semanas", "clave", "Fractura estable."),
      mg("analgesia", "Analgesia y elevación", "clave", "Confort."),
      mg("alta", "Alta sin control radiológico, con pautas", "clave", "Buena evolución."),
      mg("actividad", "Volver a la actividad gradualmente", "util", "Recuperación."),
      mg("cirugia", "Reducción quirúrgica", "riesgoso", "Innecesaria."),
      mg("yeso-6", "Yeso largo por 6 semanas", "riesgoso", "Rigidez y molestias innecesarias."),
    ],
  },
  debrief: {
    diagnosis: "Fractura en rodete (torus) del radio distal, en niño de 8 años.",
    pathologies: [
      { name: "Fractura en rodete", role: "principal", why: "Fractura por compresión típica de la infancia." },
      { name: "Hueso infantil elástico", role: "asociada", why: "Patrón de fractura." },
      { name: "Tallo verde, fisaria", role: "diferencial", why: "Otras fracturas infantiles." },
    ],
    reasoning: [
      "Causa: caída con la mano extendida.",
      "Mecanismo: compresión axial que abomba la cortical metafisaria.",
      "Consecuencia: fractura estable que consolida en semanas.",
    ],
    epidemiology:
      "Es la fractura más frecuente en niños. Es estable y se trata con férula removible, sin controles radiológicos. Siempre se evalúa la coherencia del relato.",
    management: [
      "Radiografía.",
      "Férula.",
      "Analgesia.",
      "Alta con pautas.",
    ],
    sources: ["Sociedad Argentina de Ortopedia y Traumatología Infantil — Fracturas de antebrazo.", "NICE — Fractures (Non-complex) Guideline."],
    pearls: ["Rodete: férula y listo.", "Sin controles radiológicos.", "Relato coherente."],
    pitfalls: ["Inmovilizar de más.", "No evaluar maltrato cuando no cierra la historia."],
    tribunal: [
      qa("¿Qué es la clasificación de Salter-Harris?", "Clasifica las fracturas que comprometen la fisis según su trazo, del I al V."),
      qa("¿Qué es una fractura en tallo verde?", "Ruptura de una cortical con angulación de la otra, típica del hueso infantil."),
      qa("¿Qué fracturas sugieren maltrato?", "Metafisarias en asa de balde, costales posteriores y múltiples en distintos estadios."),
    ],
  },
};
