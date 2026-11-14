import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mielodisplasia: ClinicalCase = {
  id: "sindrome-mielodisplasico",
  level: 3,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Trabajó con solventes (benceno) en una fábrica de pinturas. Le dieron hierro sin mejoría." },
  frequency: "frecuente",
  intro: "“Estoy cansado hace meses, me salen moretones y tuve dos neumonías este año.”",
  vitals: { TA: "128/74 mmHg", FC: "96 lpm", "T°": "36,6 °C", Peso: "70 kg" },
  anamnesis: [
    act("exposicion", "¿Exposición laboral a químicos o quimioterapia previa?", "clave", "“Benceno en pinturas, 30 años.”", "Factor de riesgo."),
    act("infecciones", "¿Infecciones frecuentes?", "clave", "“Dos neumonías.”", "Neutropenia."),
    act("sangrado", "¿Sangrados o moretones?", "clave", "“Moretones fáciles.”", "Plaquetopenia."),
    act("alcohol", "¿Alcohol o mala alimentación?", "util", "“No.”", "Macrocitosis por otras causas."),
    act("peso", "¿Bajó de peso o fiebre?", "util", "“No.”", "Leucemia aguda."),
    act("hobby", "¿Qué hace?", "neutro", "“Juego a las cartas.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Piel y mucosas", "clave", "Palidez y equimosis.", "Citopenias."),
    act("bazo", "Bazo y ganglios", "clave", "No palpables.", "Base."),
    act("pulmon", "Pulmón", "util", "Normal.", "Sin infección actual."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis", "clave", "Hb 8,6 macrocítica; neutrófilos 900; plaquetas 62.000; neutrófilos hipogranulares.", "Pancitopenia con displasia."),
    study("Laboratorio", "carencias", "B12, fólico, ferritina, TSH, VIH, cobre", "clave", "Normales.", "Excluye causas reversibles."),
    study("Otros", "medula", "Punción y biopsia de médula con citogenético", "clave", "Displasia en tres líneas, 4 % de blastos, cariotipo con del(5q).", "Confirma."),
    study("Otros", "hierro-mas", "Seguir dando hierro", "riesgoso", "No se indicó.", "Sobrecarga sin beneficio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("smd", "Síndrome mielodisplásico con displasia multilínea", true, "Pancitopenia macrocítica, displasia en el frotis y médula, blastos menores de 5 % y carencias descartadas."),
      dx("b12", "Anemia megaloblástica", false, "B12 y fólico normales."),
      dx("lma", "Leucemia mieloide aguda", false, "Blastos menores de 20 %."),
      dx("aplasia", "Aplasia medular", false, "Médula con displasia, no vacía."),
      dx("hiperesplenismo", "Hiperesplenismo", false, "Sin esplenomegalia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("riesgo", "Estratificar con IPSS-R y derivar a hematología", "clave", "Define el tratamiento."),
      mg("lenalidomida", "Lenalidomida por la deleción 5q", "clave", "Respuesta específica."),
      mg("soporte", "Transfusiones según síntomas y tratamiento precoz de infecciones", "clave", "Soporte."),
      mg("vacunas", "Vacunas antigripal y antineumocócica", "util", "Prevención."),
      mg("corticoides", "Corticoides para subir las plaquetas", "riesgoso", "Sin beneficio e infecciones."),
      mg("ignorar", "Atribuirlo a la edad", "riesgoso", "Riesgo de leucemia y complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome mielodisplásico con displasia multilínea y deleción 5q, en varón de 74 años con exposición a benceno.",
    pathologies: [
      { name: "Síndrome mielodisplásico", role: "principal", why: "Neoplasia clonal de la médula." },
      { name: "Citopenias con infecciones y sangrados", role: "asociada", why: "Consecuencias." },
      { name: "Anemia megaloblástica, LMA", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutaciones clonales favorecidas por la edad y el benceno.",
      "Mecanismo: hematopoyesis ineficaz con células displásicas que mueren en la médula.",
      "Consecuencia: citopenias y riesgo de evolución a leucemia aguda.",
    ],
    epidemiology:
      "Es una enfermedad de adultos mayores. La anemia macrocítica que no responde a vitaminas debe hacer pensar en ella. El benceno y la quimio o radioterapia previas son factores de riesgo.",
    management: [
      "Excluir carencias.",
      "Médula.",
      "Estratificar.",
      "Tratamiento y soporte.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de síndromes mielodisplásicos.", "NCCN — Myelodysplastic Syndromes Guidelines."],
    pearls: ["Macrocitosis sin causa.", "Pancitopenia en el anciano.", "Del(5q): lenalidomida."],
    pitfalls: ["Dar hierro sin ferropenia.", "Atribuir a la edad."],
    tribunal: [
      qa("¿Qué diferencia hay con la LMA?", "En la LMA los blastos son 20 % o más."),
      qa("¿Qué es el IPSS-R?", "Puntaje pronóstico con citogenético, blastos y citopenias."),
      qa("¿Qué opción es curativa?", "El trasplante alogénico de médula ósea en pacientes seleccionados."),
    ],
  },
};
