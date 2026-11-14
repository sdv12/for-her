import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const derramePleuralMaligno: ClinicalCase = {
  id: "derrame-pleural-maligno",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Operada de cáncer de mama hace 6 años, con hormonoterapia completa." },
  frequency: "frecuente",
  intro: "“Hace un mes me falta el aire cada vez más, ahora no puedo acostarme del lado izquierdo y tengo tos seca.”",
  vitals: { TA: "126/78 mmHg", FC: "102 lpm", FR: "26 rpm", "T°": "36,8 °C", "SatO₂": "91 %" },
  anamnesis: [
    act("cancer", "¿Qué tratamiento tuvo por el cáncer?", "clave", "“Cirugía, radio y pastillas cinco años.”", "Riesgo de recaída."),
    act("disnea", "¿Cómo avanzó la falta de aire?", "clave", "“En un mes, cada vez peor.”", "Derrame que crece."),
    act("sistemicos", "¿Bajó de peso, dolores de huesos?", "clave", "“Tres kilos y me duele la espalda.”", "Enfermedad diseminada."),
    act("fiebre", "¿Fiebre?", "util", "“No.”", "No sugiere infección."),
    act("cardio", "¿Hinchazón de piernas?", "util", "“No.”", "Trasudado cardíaco."),
    act("hobby", "¿Qué le gusta?", "neutro", "“El coro de la parroquia.”", "No orienta."),
  ],
  exam: [
    act("torax", "Examen del tórax", "clave", "Matidez y murmullo abolido en dos tercios del hemitórax izquierdo.", "Derrame grande."),
    act("mama", "Cicatriz y axila", "clave", "Nódulo en la cicatriz.", "Recaída local."),
    act("yugulares", "Yugulares y edemas", "util", "Normales.", "No es cardíaco."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía y ecografía de tórax", "clave", "Derrame izquierdo masivo con desplazamiento mediastínico contralateral.", "Derrame grande."),
    study("Laboratorio", "toracocentesis", "Toracocentesis con citología, LDH, proteínas, pH, glucosa", "clave", "Exudado hemático, citología con adenocarcinoma de mama.", "Derrame maligno."),
    study("Imágenes", "tc", "TC de tórax, abdomen y pelvis", "util", "Metástasis óseas y pleurales.", "Estadificación."),
    study("Otros", "evacuar-todo", "Evacuar 3 litros de una vez", "riesgoso", "No se hizo.", "Edema de reexpansión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("maligno", "Derrame pleural maligno por recaída de cáncer de mama", true, "Exudado con citología positiva, antecedente de cáncer de mama y metástasis."),
      dx("paraneumonico", "Derrame paraneumónico", false, "Sin fiebre ni neumonía."),
      dx("ic", "Derrame por insuficiencia cardíaca", false, "Es exudado y unilateral."),
      dx("tbc", "Tuberculosis pleural", false, "Citología positiva."),
      dx("tep", "Derrame por TEP", false, "Citología positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("evacuadora", "Toracocentesis evacuadora de hasta 1,5 litros", "clave", "Alivio de la disnea."),
      mg("pleurodesis", "Pleurodesis o catéter pleural tunelizado si recidiva", "clave", "Control a largo plazo."),
      mg("oncologia", "Derivar a oncología para tratamiento sistémico", "clave", "Enfermedad metastásica."),
      mg("paliativos", "Cuidados paliativos en paralelo", "util", "Calidad de vida."),
      mg("toracotomia", "Decorticación por toracotomía", "riesgoso", "Morbilidad sin beneficio."),
      mg("diureticos", "Diuréticos para el derrame", "riesgoso", "No es trasudado."),
    ],
  },
  debrief: {
    diagnosis: "Derrame pleural maligno masivo por recaída de cáncer de mama, en mujer de 63 años.",
    pathologies: [
      { name: "Derrame pleural maligno", role: "principal", why: "Metástasis pleural." },
      { name: "Recaída de cáncer de mama", role: "asociada", why: "Causa." },
      { name: "Paraneumónico, cardíaco", role: "diferencial", why: "Otros derrames." },
    ],
    reasoning: [
      "Causa: implantes tumorales en la pleura.",
      "Mecanismo: aumento de permeabilidad y obstrucción del drenaje linfático.",
      "Consecuencia: derrame recidivante y disnea.",
    ],
    epidemiology:
      "Pulmón, mama y linfomas causan la mayoría de los derrames malignos. Indica enfermedad avanzada. El objetivo es aliviar la disnea con el menor número de procedimientos.",
    management: [
      "Toracocentesis.",
      "Citología.",
      "Control del derrame.",
      "Oncología y paliativos.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Derrame pleural.", "BTS — Pleural Disease Guideline."],
    pearls: ["Cáncer previo más derrame: citología.", "No más de 1,5 litros.", "Catéter tunelizado."],
    pitfalls: ["Evacuar de más.", "Diuréticos."],
    tribunal: [
      qa("¿Qué es el edema de reexpansión?", "Edema pulmonar tras evacuar mucho líquido rápido en un pulmón colapsado."),
      qa("¿Qué hacés si el pulmón no reexpande?", "Catéter pleural tunelizado, porque la pleurodesis fracasa."),
      qa("¿Qué cánceres dan más derrame?", "Pulmón, mama, linfoma, ovario y gástrico."),
    ],
  },
};
