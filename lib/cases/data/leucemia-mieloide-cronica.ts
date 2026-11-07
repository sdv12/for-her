import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const leucemiaMieloideCronica: ClinicalCase = {
  id: "leucemia-mieloide-cronica",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Maestra. Sin antecedentes. Viene con un laboratorio de rutina." },
  frequency: "poco-frecuente",
  intro: "“Estoy cansada hace meses, sudo de noche y me siento llena apenas como. Me pidieron análisis y salió algo raro.”",
  vitals: { TA: "118/74 mmHg", FC: "82 lpm", "T°": "37,1 °C", "SatO₂": "98 %", Peso: "64 kg" },
  anamnesis: [
    act("saciedad", "¿Te llenás rápido? ¿Dolor del lado izquierdo?", "clave", "“Sí, una molestia.”", "Esplenomegalia."),
    act("b", "¿Fiebre, sudor, peso?", "clave", "“Sudor y bajé 4 kilos.”", "Síntomas constitucionales."),
    act("sangrado", "¿Sangrados, infecciones, dolor de huesos?", "clave", "“Moretones.”", "Función de plaquetas."),
    act("exposicion", "¿Radiación o benceno?", "util", "“No.”", "Factores."),
    act("gota", "¿Dolor articular, priapismo?", "util", "“No.”", "Hiperleucocitosis."),
    act("escuela", "¿En qué escuela trabajás?", "neutro", "“En una de barrio.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Bazo e hígado", "clave", "Bazo a 8 cm del reborde, indoloro.", "Hallazgo principal."),
    act("ganglios", "Ganglios", "util", "Sin adenopatías.", "Las leucemias crónicas mieloides no las tienen."),
    act("piel", "Piel y mucosas", "util", "Palidez leve, equimosis.", "Anemia y función plaquetaria."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y frotis", "clave", "Leucocitos 148.000 con desviación a la izquierda, basofilia, plaquetas 620.000, Hb 10,8.", "Se ven todas las etapas de maduración."),
    study("Otros", "bcrabl", "BCR-ABL por PCR y cariotipo", "clave", "Positivo; t(9;22).", "Confirma."),
    study("Otros", "mo", "Médula ósea", "clave", "Hipercelular, 4 % de blastos.", "Fase crónica."),
    study("Laboratorio", "lab", "Ácido úrico, LDH, hepatograma", "util", "Ácido úrico y LDH altos.", "Riesgo."),
    study("Imágenes", "pet", "PET-TC", "innecesario", "No se realizó.", "No sirve."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lmc", "Leucemia mieloide crónica en fase crónica, BCR-ABL positiva", true, "Leucocitosis con todas las formas, basofilia, bazo grande y t(9;22)."),
      dx("reaccion", "Reacción leucemoide", false, "Sin infección, con basofilia y BCR-ABL."),
      dx("lma", "Leucemia aguda", false, "Menos de 10 % de blastos."),
      dx("llc", "Leucemia linfática crónica", false, "Es de linfocitos en mayores."),
      dx("mieloproliferativa", "Mielofibrosis", false, "BCR-ABL positivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tki", "Inhibidor de tirosina quinasa (imatinib u otro)", "clave", "Revolucionó el pronóstico."),
      mg("monitoreo", "Monitoreo molecular de respuesta", "clave", "Guía el tratamiento."),
      mg("adherencia", "Adherencia e interacciones, y anticoncepción", "clave", "Evita fallas."),
      mg("hidroxiurea", "Hidroxiurea y alopurinol al inicio si hace falta", "util", "Reducción inicial."),
      mg("trasplante", "Trasplante de entrada en fase crónica", "riesgoso", "Solo por fallas o fases avanzadas."),
      mg("transfusion", "Transfusiones por leucocitosis", "innecesario", "Puede empeorar la hiperviscosidad."),
    ],
  },
  debrief: {
    diagnosis: "Leucemia mieloide crónica BCR-ABL positiva en fase crónica, en mujer de 52 años.",
    pathologies: [
      { name: "Leucemia mieloide crónica", role: "principal", why: "Neoplasia mieloproliferativa." },
      { name: "Hiperuricemia, riesgo de progresión", role: "asociada", why: "Complicaciones." },
      { name: "Reacción leucemoide, leucemia aguda", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: translocación t(9;22), el cromosoma Filadelfia.",
      "Mecanismo: la tirosina quinasa BCR-ABL estimula la proliferación mieloide.",
      "Consecuencia: leucocitosis, esplenomegalia y progresión a crisis blástica.",
    ],
    epidemiology:
      "Afecta sobre todo a personas de 50 a 60 años, ligeramente más a varones. Muchos se diagnostican en análisis de rutina. Con inhibidores de tirosina quinasa, la expectativa de vida se acerca a la de la población general, si hay buena adherencia.",
    management: [
      "Hemograma y BCR-ABL.",
      "Médula para fase.",
      "Iniciar inhibidores.",
      "Monitoreo molecular.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de leucemia mieloide crónica.", "European LeukemiaNet — Recomendaciones de LMC."],
    pearls: ["Leucocitosis con basofilia: pensá LMC.", "Bazo grande.", "Imatinib cambió la historia."],
    pitfalls: ["Confundir con reacción leucemoide.", "Olvidar la adherencia."],
    tribunal: [
      qa("¿Cuáles son las fases de la LMC?", "Crónica, acelerada y blástica."),
      qa("¿Cómo diferenciás de una reacción leucemoide?", "Basofilia y BCR-ABL hablan de LMC; la reacción tiene causa y fosfatasa alcalina alta."),
      qa("¿Qué efecto adverso da el imatinib?", "Edemas, calambres, náuseas y citopenias."),
    ],
  },
};
