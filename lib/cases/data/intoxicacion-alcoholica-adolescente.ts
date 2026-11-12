import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intoxicacionAlcoholicaAdolescente: ClinicalCase = {
  id: "intoxicacion-alcoholica-adolescente",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 15, ageUnit: "años", sex: "F", context: "Sábado, 3 de la mañana. La traen amigas desde una previa." },
  frequency: "frecuente",
  intro: "“Tomó mucho, vomitó y ya no contesta. Le dieron agua y café.” (relata una amiga)",
  vitals: { TA: "96/58 mmHg", FC: "112 lpm", FR: "12 rpm", "T°": "35,4 °C", "SatO₂": "94 %", Glucemia: "56 mg/dl", Glasgow: "9/15" },
  anamnesis: [
    act("cantidad", "¿Qué tomó y cuánto?", "clave", "“Vodka, mucho, rápido.”", "Ingesta en atracón."),
    act("otras", "¿Otras sustancias o pastillas?", "clave", "“No sabemos.”", "Coingesta."),
    act("trauma", "¿Se golpeó la cabeza?", "clave", "“Se cayó.”", "TEC oculto."),
    act("hora", "¿Hace cuánto?", "util", "“Dos horas.”", "Pico."),
    act("familia", "¿Saben los padres?", "util", "“No.”", "Contactar."),
    act("cancion", "¿Qué música escuchaban?", "neutro", "“Reggaetón.”", "No orienta."),
  ],
  exam: [
    act("via", "Vía aérea y reflejos", "clave", "Gag débil, ronquido.", "Riesgo de aspiración."),
    act("cabeza", "Cabeza y pupilas", "clave", "Hematoma frontal pequeño; pupilas iguales.", "TEC."),
    act("temperatura", "Temperatura", "util", "Hipotermia.", "Complicación."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar", "clave", "56 mg/dl.", "Hipoglucemia en adolescentes."),
    study("Laboratorio", "alcoholemia", "Alcoholemia, ionograma, gases, toxicológico", "clave", "Alcoholemia 2,6 g/l; toxicológico negativo.", "Confirma."),
    study("Imágenes", "tc", "TC de cerebro por trauma y Glasgow bajo", "clave", "Normal.", "Excluye hematoma."),
    study("Otros", "cafe", "Café y ducha fría para despertarla", "riesgoso", "No se realizó.", "Inútil y peligroso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("intoxicacion", "Intoxicación alcohólica aguda grave con hipoglucemia e hipotermia", true, "Ingesta, alcoholemia, Glasgow 9 y glucemia baja."),
      dx("tec", "TEC con hematoma", false, "TC normal."),
      dx("benzo", "Intoxicación por benzodiacepinas", false, "Toxicológico negativo."),
      dx("hipoglucemia-sola", "Hipoglucemia aislada", false, "Se explica por alcohol."),
      dx("convulsion", "Estado posictal", false, "No hubo convulsión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("via", "Posición lateral, aspiración y vigilancia de la vía aérea", "clave", "Riesgo de aspiración."),
      mg("dextrosa", "Dextrosa EV y tiamina si hay riesgo", "clave", "Hipoglucemia."),
      mg("calentar", "Calentar y hidratar", "clave", "Hipotermia."),
      mg("familia", "Contactar a la familia y abordar el consumo", "clave", "Prevención."),
      mg("vomito", "Provocar el vómito", "riesgoso", "Aspiración."),
      mg("alta", "Alta con las amigas", "riesgoso", "Riesgo vital."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación alcohólica aguda grave con hipoglucemia e hipotermia, en adolescente de 15 años.",
    pathologies: [
      { name: "Intoxicación alcohólica", role: "principal", why: "Depresión del SNC." },
      { name: "Hipoglucemia e hipotermia", role: "asociada", why: "Complicaciones." },
      { name: "TEC, otras sustancias", role: "diferencial", why: "A excluir." },
    ],
    reasoning: [
      "Causa: consumo en atracón.",
      "Mecanismo: el alcohol deprime el SNC e inhibe la neoglucogénesis.",
      "Consecuencia: coma, aspiración, hipoglucemia e hipotermia.",
    ],
    epidemiology:
      "El consumo en atracón es frecuente entre adolescentes argentinos, y la edad de inicio es temprana. Los adolescentes tienen más hipoglucemia que los adultos. Los fines de semana se concentran estas consultas.",
    management: [
      "Vía aérea.",
      "Glucemia.",
      "Excluir trauma.",
      "Familia y prevención.",
    ],
    sources: ["SEDRONAR — Estudio nacional de consumo en estudiantes.", "Sociedad Argentina de Pediatría — Intoxicaciones."],
    pearls: ["Glucemia siempre.", "Lateral.", "Pensá en trauma."],
    pitfalls: ["Café.", "Alta sin adulto."],
    tribunal: [
      qa("¿Cuál es la relación entre alcoholemia y clínica?", "Mayor de 0,5 g/l: desinhibición; mayor de 2: estupor; mayor de 3: coma y riesgo de muerte."),
      qa("¿Por qué hay hipoglucemia?", "El alcohol inhibe la neoglucogénesis y los niños tienen menos reservas."),
      qa("¿Qué es el consumo episódico excesivo?", "Ingesta de 5 o más tragos en una ocasión."),
    ],
  },
};
