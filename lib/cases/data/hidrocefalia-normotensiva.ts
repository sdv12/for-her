import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hidrocefaliaNormotensiva: ClinicalCase = {
  id: "hidrocefalia-normotensiva",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Hipertenso. Lo trae la hija porque “está cada vez más torpe y olvidadizo”." },
  frequency: "poco-frecuente",
  intro: "“Camina como pegado al piso, se olvida de las cosas y desde hace unos meses se hace pis encima.” (relata la hija)",
  vitals: { TA: "138/82 mmHg", FC: "70 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("marcha", "¿Qué fue lo primero que notaron?", "clave", "“La forma de caminar, hace un año.”", "La marcha precede al resto."),
    act("orina", "¿Cómo es la incontinencia?", "clave", "“Urgencia, no llega al baño.”", "Incontinencia de urgencia."),
    act("memoria", "¿Cómo es el olvido?", "clave", "“Lento para pensar, pero reconoce a todos.”", "Deterioro subcortical."),
    act("antecedentes", "¿Tuvo meningitis, hemorragia cerebral o golpes?", "util", "“No.”", "Hidrocefalia secundaria."),
    act("temblor", "¿Tiembla?", "util", "“No.”", "Parkinson."),
    act("hobby", "¿Qué le gustaba hacer?", "neutro", "“Jugar a las bochas.”", "No orienta."),
  ],
  exam: [
    act("marcha-ex", "Marcha", "clave", "Pasos cortos, base amplia, pies pegados al piso, giros en bloque, sin temblor ni rigidez marcada.", "Marcha magnética."),
    act("cognitivo", "MMSE", "clave", "23/30, con lentitud y fallas ejecutivas.", "Deterioro frontal-subcortical."),
    act("brazos", "Movimientos de los brazos al caminar", "util", "Conservados.", "Menos típico de Parkinson."),
  ],
  studies: [
    study("Imágenes", "rm", "RM de cerebro", "clave", "Ventriculomegalia desproporcionada a la atrofia, surcos de convexidad estrechos.", "Hidrocefalia comunicante."),
    study("Otros", "tap-test", "Punción lumbar evacuadora (tap test) con evaluación de la marcha", "clave", "Presión normal; marcha mejora 30 % tras sacar 40 ml.", "Predice respuesta a la válvula."),
    study("Laboratorio", "lab", "B12, TSH, VDRL", "util", "Normales.", "Demencias reversibles."),
    study("Imágenes", "pet", "PET amiloide", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hnpi", "Hidrocefalia normotensiva del adulto", true, "Tríada de marcha magnética, incontinencia y deterioro, con ventriculomegalia y respuesta al tap test."),
      dx("alzheimer", "Enfermedad de Alzheimer", false, "La memoria no es lo primero y la marcha domina."),
      dx("parkinson", "Enfermedad de Parkinson", false, "Sin temblor ni rigidez y braceo conservado."),
      dx("vascular", "Demencia vascular", false, "Sin infartos en la RM."),
      dx("atrofia", "Atrofia cerebral por la edad", false, "Ventrículos desproporcionados a los surcos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("valvula", "Derivar a neurocirugía para derivación ventriculoperitoneal", "clave", "Tratamiento con mejoría de la marcha."),
      mg("caidas", "Prevención de caídas", "clave", "Riesgo alto."),
      mg("familia", "Explicar a la familia qué síntomas suelen mejorar", "clave", "La marcha mejora más que la memoria."),
      mg("kinesio", "Kinesiología", "util", "Marcha."),
      mg("levodopa", "Levodopa de prueba prolongada", "innecesario", "No responde."),
      mg("anticolinergico", "Oxibutinina para la incontinencia como único tratamiento", "riesgoso", "Empeora la cognición."),
    ],
  },
  debrief: {
    diagnosis: "Hidrocefalia normotensiva del adulto con respuesta al tap test, en varón de 74 años.",
    pathologies: [
      { name: "Hidrocefalia normotensiva", role: "principal", why: "Demencia potencialmente reversible." },
      { name: "Riesgo de caídas", role: "asociada", why: "Trastorno de la marcha." },
      { name: "Alzheimer, Parkinson", role: "diferencial", why: "Otras causas en adultos mayores." },
    ],
    reasoning: [
      "Causa: alteración de la reabsorción del LCR, muchas veces sin causa clara.",
      "Mecanismo: dilatación ventricular que estira las fibras periventriculares.",
      "Consecuencia: marcha magnética, urgencia urinaria y deterioro subcortical.",
    ],
    epidemiology:
      "Es una de las pocas demencias tratables y está subdiagnosticada. Se ve sobre todo después de los 65 años. Cuanto antes se coloca la válvula, mayor la mejoría.",
    management: [
      "Tríada.",
      "RM.",
      "Tap test.",
      "Válvula.",
    ],
    sources: ["Sociedad Neurológica Argentina — Hidrocefalia normotensiva.", "Japanese Society of Normal Pressure Hydrocephalus — Guidelines for Idiopathic NPH."],
    pearls: ["Marcha primero, después orina y memoria.", "Tap test.", "Demencia reversible."],
    pitfalls: ["Rotular como Alzheimer.", "Anticolinérgicos."],
    tribunal: [
      qa("¿Cuál es la tríada de Hakim?", "Trastorno de la marcha, incontinencia urinaria y deterioro cognitivo."),
      qa("¿Qué otras demencias son reversibles?", "Hipotiroidismo, déficit de B12, depresión, hematoma subdural, neurosífilis y fármacos."),
      qa("¿Qué complicaciones tiene la válvula?", "Infección, obstrucción, hiperdrenaje con hematoma subdural."),
    ],
  },
};
