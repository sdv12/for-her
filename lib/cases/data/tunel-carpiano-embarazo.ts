import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tunelCarpianoEmbarazo: ClinicalCase = {
  id: "tunel-carpiano-embarazo",
  level: 1,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 32, ageUnit: "años", sex: "F", context: "Embarazo de 31 semanas. Edemas en manos y pies." },
  frequency: "frecuente",
  intro: "“A la noche me despierto con los dedos dormidos en las dos manos y tengo que sacudirlas.”",
  vitals: { TA: "118/74 mmHg", FC: "84 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("dedos", "¿Qué dedos se duermen?", "clave", "“Pulgar, índice y medio.”", "Territorio mediano."),
    act("noche", "¿Cuándo empeora?", "clave", "“De noche, y al sostener el celular.”", "Típico."),
    act("presion", "¿Dolor de cabeza, visión borrosa?", "clave", "“No.”", "Preeclampsia."),
    act("debilidad", "¿Se le caen las cosas?", "util", "“A veces.”", "Compromiso motor."),
    act("cuello", "¿Dolor de cuello?", "util", "“No.”", "Radiculopatía."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy cajera.”", "Uso repetido de manos."),
  ],
  exam: [
    act("phalen", "Phalen y Tinel en muñecas", "clave", "Positivos bilaterales.", "Túnel carpiano."),
    act("tenar", "Eminencia tenar", "clave", "Sin atrofia.", "Leve a moderado."),
    act("edemas", "Edemas y TA", "util", "Edema leve de manos; TA normal.", "Retención hídrica."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Típico.", "En el embarazo no requiere más."),
    study("Laboratorio", "proteinuria", "Proteinuria", "util", "Negativa.", "Descartar preeclampsia."),
    study("Otros", "emg", "Electromiograma en el embarazo", "innecesario", "No se realizó.", "Suele resolverse tras el parto."),
    study("Otros", "cirugia", "Cirugía de liberación en el embarazo", "riesgoso", "No se indicó.", "Casi siempre remite sola."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tunel", "Síndrome de túnel carpiano bilateral asociado al embarazo", true, "Parestesias nocturnas en territorio mediano, Phalen y Tinel positivos, edemas del tercer trimestre."),
      dx("radiculopatia", "Radiculopatía C6-C7", false, "Sin dolor cervical y patrón distal."),
      dx("preeclampsia", "Preeclampsia", false, "TA y proteinuria normales."),
      dx("cubital", "Neuropatía cubital", false, "Afecta pulgar, índice y medio."),
      dx("de-quervain", "Tenosinovitis de De Quervain", false, "Hay parestesias."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ferula", "Férula nocturna en posición neutra", "clave", "Primera línea."),
      mg("explicar", "Explicar que suele resolverse después del parto", "clave", "Tranquiliza."),
      mg("pausas", "Pausas y evitar flexión sostenida", "clave", "Reduce síntomas."),
      mg("infiltracion", "Infiltración con corticoide si es grave", "util", "Opción segura."),
      mg("aines", "AINE de forma regular en el tercer trimestre", "riesgoso", "Cierre del ductus fetal."),
      mg("diureticos", "Diuréticos para el edema", "riesgoso", "No indicados en el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de túnel carpiano bilateral asociado al embarazo de 31 semanas.",
    pathologies: [
      { name: "Túnel carpiano", role: "principal", why: "Compresión del nervio mediano." },
      { name: "Retención hídrica del embarazo", role: "asociada", why: "Causa." },
      { name: "Radiculopatía, preeclampsia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: edema del embarazo dentro del túnel carpiano.",
      "Mecanismo: aumento de presión sobre el nervio mediano.",
      "Consecuencia: parestesias nocturnas, dolor y torpeza.",
    ],
    epidemiology:
      "Es frecuente en el tercer trimestre y suele desaparecer semanas o meses después del parto. La férula nocturna es eficaz. Los AINE se evitan en el tercer trimestre.",
    management: [
      "Clínica.",
      "Férula.",
      "Descartar preeclampsia.",
      "Control posparto.",
    ],
    sources: ["Asociación Argentina de Cirugía de la Mano — Síndrome del túnel carpiano.", "AAOS — Management of Carpal Tunnel Syndrome Guideline."],
    pearls: ["Territorio mediano nocturno.", "Férula.", "Sin AINE al final del embarazo."],
    pitfalls: ["Operar en el embarazo.", "AINE."],
    tribunal: [
      qa("¿Qué es el signo de Phalen?", "Flexión máxima de las muñecas por 60 segundos que reproduce parestesias."),
      qa("¿Qué otras condiciones lo causan?", "Hipotiroidismo, diabetes, artritis reumatoidea, acromegalia y movimientos repetitivos."),
      qa("¿Por qué evitar AINE en el tercer trimestre?", "Por cierre prematuro del ductus arterioso y oligoamnios."),
    ],
  },
};
