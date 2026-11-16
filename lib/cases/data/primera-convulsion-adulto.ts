import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const primeraConvulsionAdulto: ClinicalCase = {
  id: "primera-convulsion-adulto",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Empleada doméstica en Salta capital. Se crió en un paraje rural de la Quebrada, con chanchos sueltos y sin cloacas." },
  frequency: "frecuente",
  intro: "La hija: “Se puso rígida, se sacudió y estuvo un rato sin responder. Antes, la mano derecha se le empezó a mover sola.”",
  vitals: { TA: "132/82 mmHg", FC: "92 lpm", "T°": "36,8 °C", Glucemia: "98 mg/dl", Glasgow: "15/15" },
  anamnesis: [
    act("inicio-focal", "¿Cómo empezó exactamente?", "clave", "“Primero la mano derecha, después todo el cuerpo.”", "Inicio focal con evolución a bilateral: crisis estructural."),
    act("previos", "¿Le pasó antes, aunque sea leve?", "clave", "“Hace meses se le movía la mano sola unos segundos.”", "Crisis focales previas."),
    act("cerdo", "¿Come cerdo de criaderos caseros o tiene contacto con gente con tenia?", "clave", "“En el campo los chanchos andaban sueltos y un vecino tenía la lombriz solitaria.”", "Riesgo de neurocisticercosis."),
    act("toxicos", "¿Alcohol, drogas, falta de sueño?", "clave", "“No.”", "Descarta crisis provocada."),
    act("cefalea", "¿Dolor de cabeza nuevo?", "util", "“No.”", "Hipertensión endocraneana."),
    act("trabajo", "¿Dónde trabaja?", "neutro", "“En una casa de familia en el centro.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Paresia leve de mano derecha (Todd) que mejora en horas.", "Foco: lesión estructural izquierda."),
    act("fondo", "Fondo de ojo", "util", "Normal.", "Sin hipertensión endocraneana."),
    act("lengua", "Lengua", "util", "Mordedura lateral.", "Crisis."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de cerebro en la guardia", "clave", "Lesión quística de 1 cm con escólex en corteza frontal izquierda y calcificaciones puntiformes.", "Neurocisticercosis."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "clave", "Quiste vesicular con escólex y otras calcificaciones.", "Confirma y estadifica."),
    study("Laboratorio", "lab", "Glucemia, ionograma, calcio, tóxicos", "clave", "Normales.", "Crisis provocadas."),
    study("Laboratorio", "serologia", "Serología para cisticercosis (EITB)", "util", "Positiva.", "Apoya."),
    study("Electrofisiología", "eeg", "EEG", "util", "Actividad epileptiforme frontal izquierda.", "Riesgo de recurrencia."),
    study("Otros", "sin-imagen", "Alta sin neuroimagen por ser la primera", "riesgoso", "No se hizo.", "Una primera crisis focal requiere imagen."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neurocisticercosis", "Primera crisis focal con evolución a bilateral tónico-clónica por neurocisticercosis parenquimatosa", true, "Inicio en la mano, paresia de Todd, antecedentes epidemiológicos, quiste con escólex y serología positiva."),
      dx("generalizada", "Epilepsia generalizada idiopática", false, "Inicio focal y lesión estructural."),
      dx("tumor", "Tumor cerebral", false, "Quiste con escólex."),
      dx("toxoplasmosis", "Toxoplasmosis", false, "Sin VIH y con escólex."),
      dx("provocada", "Crisis provocada metabólica", false, "Laboratorio normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiepileptico", "Levetiracetam o carbamazepina", "clave", "Crisis estructural: riesgo alto de recurrencia."),
      mg("albendazol", "Albendazol con corticoides para el quiste viable", "clave", "Reduce quistes y crisis."),
      mg("corticoide", "Dexametasona junto con el antiparasitario", "clave", "Previene el edema por la muerte del parásito."),
      mg("manejar", "No manejar ni bañarse sola hasta estar libre de crisis", "clave", "Seguridad."),
      mg("familia", "Buscar teniasis en convivientes", "util", "Fuente de infección."),
      mg("albendazol-sin-cortico", "Albendazol sin corticoides", "riesgoso", "Puede empeorar el edema y las crisis."),
      mg("sin-tratamiento", "Sin antiepilépticos por ser la primera", "riesgoso", "Tiene lesión estructural."),
    ],
  },
  debrief: {
    diagnosis: "Primera crisis focal con evolución a bilateral por neurocisticercosis parenquimatosa, en una mujer de 52 años.",
    pathologies: [
      { name: "Neurocisticercosis", role: "principal", why: "Larvas de Taenia solium en el cerebro." },
      { name: "Epilepsia estructural", role: "asociada", why: "Riesgo alto de recurrencia." },
      { name: "Tumor, toxoplasmosis", role: "diferencial", why: "Lesiones focales." },
    ],
    reasoning: [
      "Causa: ingesta de huevos de T. solium por contacto fecal-oral con un portador.",
      "Mecanismo: el quiste inflama la corteza y genera foco epileptógeno.",
      "Consecuencia: crisis focales que pueden generalizar.",
    ],
    epidemiology:
      "Es la primera causa de epilepsia adquirida en el mundo y es endémica en la región andina. En Argentina se ve en el NOA y en migrantes de Bolivia y Perú. Toda primera crisis focal en un adulto requiere neuroimagen.",
    management: [
      "TC y resonancia.",
      "Antiepiléptico.",
      "Albendazol con corticoides en quistes viables.",
      "Rastreo de teniasis.",
    ],
    sources: ["Sociedad Argentina de Neurología — Primera crisis epiléptica en el adulto.", "IDSA/ASTMH — Guidelines for the diagnosis and treatment of neurocysticercosis."],
    pearls: ["Primera crisis focal: imagen siempre.", "Quiste con escólex.", "Albendazol + corticoide."],
    pitfalls: ["Alta sin imagen.", "Antiparasitario sin corticoide."],
    tribunal: [
      qa("¿Cuándo se indica antiepiléptico tras una primera crisis?", "Con lesión estructural, EEG epileptiforme, crisis nocturna, déficit neurológico o alto riesgo de recurrencia."),
      qa("¿Cómo se adquiere la neurocisticercosis?", "Por ingesta de huevos de Taenia solium eliminados por un portador intestinal, no por comer carne de cerdo."),
      qa("¿Qué es la parálisis de Todd?", "Un déficit focal transitorio después de una crisis, que sugiere un origen focal."),
    ],
  },
};
