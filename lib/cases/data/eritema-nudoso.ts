import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const eritemaNudoso: ClinicalCase = {
  id: "eritema-nudoso",
  level: 2,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Empleada de comercio. Toma anticonceptivos combinados. Tuvo dolor de garganta hace 3 semanas." },
  frequency: "frecuente",
  intro: "“Me salieron bultos rojos y dolorosos en las piernas, como moretones.”",
  vitals: { TA: "114/72 mmHg", FC: "84 lpm", "T°": "37,6 °C" },
  anamnesis: [
    act("garganta", "¿Cómo fue el dolor de garganta?", "clave", "“Fuerte, con fiebre y placas, se me pasó solo.”", "Faringitis estreptocócica: causa más común."),
    act("evolucion", "¿Cómo cambian los bultos?", "clave", "“Primero rojos, ahora algunos morados y verdosos.”", "Evolución como un hematoma: típico."),
    act("tos", "¿Tos, sudoración nocturna, pérdida de peso?", "clave", "“No.”", "Tuberculosis y sarcoidosis."),
    act("diarrea", "¿Diarrea con sangre o dolor abdominal?", "clave", "“No.”", "Enfermedad inflamatoria intestinal."),
    act("articulaciones", "¿Dolor en las articulaciones?", "util", "“Los tobillos.”", "Artralgias frecuentes."),
    act("embarazo", "¿Puede estar embarazada?", "util", "“No, tomo pastillas.”", "Embarazo y anticonceptivos son causas."),
  ],
  exam: [
    act("nodulos", "Piernas", "clave", "Nódulos eritematovioláceos de 2–4 cm, calientes y dolorosos, en cara anterior de ambas piernas, sin ulceración.", "Eritema nudoso."),
    act("faringe", "Faringe y ganglios", "util", "Normal.", "Faringitis resuelta."),
    act("tobillos", "Tobillos", "util", "Edema y dolor sin derrame.", "Periartritis."),
  ],
  studies: [
    study("Laboratorio", "aslo", "ASLO y exudado de fauces", "clave", "ASLO 680 UI/ml.", "Infección estreptocócica reciente."),
    study("Imágenes", "rx-torax", "Radiografía de tórax", "clave", "Normal, sin adenopatías hiliares.", "Descarta sarcoidosis y tuberculosis."),
    study("Laboratorio", "lab", "Hemograma y ERS", "util", "ERS 46 mm.", "Inflamación."),
    study("Otros", "ppd", "PPD o IGRA", "util", "Negativa.", "Tuberculosis."),
    study("Otros", "biopsia", "Biopsia de rutina", "innecesario", "No se hizo.", "Solo si es atípico o ulcera."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("en-estreptococo", "Eritema nudoso posestreptocócico", true, "Nódulos dolorosos pretibiales con evolución contusiforme tras una faringitis, ASLO alto y radiografía normal."),
      dx("celulitis", "Celulitis", false, "Lesiones bilaterales nodulares y sin puerta de entrada."),
      dx("vasculitis", "Vasculitis nodular", false, "Afecta pantorrillas y ulcera."),
      dx("sarcoidosis", "Síndrome de Löfgren", false, "Sin adenopatías hiliares."),
      dx("tvp", "Trombosis venosa superficial", false, "No son cordones venosos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aines", "AINE y reposo con piernas elevadas", "clave", "Alivio."),
      mg("explicar", "Explicar que se resuelve en 3–6 semanas sin cicatriz", "clave", "Autolimitado."),
      mg("anticonceptivos", "Considerar cambiar el anticonceptivo si recurre", "util", "Otra causa posible."),
      mg("penicilina", "Penicilina si persiste el estreptococo en fauces", "util", "Erradicación."),
      mg("corticoides", "Corticoides sistémicos sin descartar infección", "riesgoso", "Riesgo si hubiera tuberculosis."),
      mg("biopsiar", "Biopsiar todos los nódulos", "innecesario", "Diagnóstico clínico."),
    ],
  },
  debrief: {
    diagnosis: "Eritema nudoso posestreptocócico, en una mujer de 28 años.",
    pathologies: [
      { name: "Eritema nudoso", role: "principal", why: "Paniculitis septal reactiva." },
      { name: "Faringitis estreptocócica reciente", role: "asociada", why: "Desencadenante." },
      { name: "Sarcoidosis, tuberculosis, EII", role: "diferencial", why: "Causas a buscar." },
    ],
    reasoning: [
      "Causa: hipersensibilidad a un antígeno (estreptococo, TBC, fármacos, EII, sarcoidosis, embarazo).",
      "Mecanismo: inflamación de los tabiques del tejido graso subcutáneo.",
      "Consecuencia: nódulos dolorosos que se resuelven como un hematoma.",
    ],
    epidemiology:
      "Es la paniculitis más frecuente. Predomina en mujeres de 20 a 45 años, 3 a 6 veces más que en varones. En la mitad de los casos no se encuentra causa; entre las identificables, la infección estreptocócica es la primera.",
    management: [
      "Buscar la causa: ASLO, radiografía de tórax, PPD.",
      "AINE y reposo.",
      "Tratar la causa.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Paniculitis.", "Requena L, Yus ES — Erythema nodosum (Dermatol Clin)."],
    pearls: ["Nódulos pretibiales que cambian como moretones.", "Siempre radiografía de tórax.", "No ulcera ni deja cicatriz."],
    pitfalls: ["Corticoides sin descartar TBC.", "No buscar la causa."],
    tribunal: [
      qa("¿Qué es el síndrome de Löfgren?", "Eritema nudoso, adenopatías hiliares bilaterales, fiebre y artritis de tobillos: forma aguda de sarcoidosis de buen pronóstico."),
      qa("¿Cuáles son las causas del eritema nudoso?", "Estreptococo, tuberculosis, sarcoidosis, enfermedad inflamatoria intestinal, embarazo, anticonceptivos y otros fármacos."),
      qa("¿Qué tipo de paniculitis es?", "Septal sin vasculitis, a diferencia del eritema indurado, que es lobulillar con vasculitis."),
    ],
  },
};
