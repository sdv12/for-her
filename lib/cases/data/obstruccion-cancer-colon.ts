import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const obstruccionCancerColon: ClinicalCase = {
  id: "obstruccion-intestinal-cancer-colon",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 73, ageUnit: "años", sex: "M", context: "Hace meses tiene constipación y heces finas. Nunca se hizo colonoscopía. Sin cirugías." },
  frequency: "frecuente",
  intro: "“Hace tres días no voy de cuerpo ni largo gases. Tengo la panza muy hinchada, y vomito verde desde hoy.”",
  vitals: { TA: "110/68 mmHg", FC: "108 lpm", FR: "22 rpm", "T°": "37,1 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("transito", "¿Cuándo fue la última deposición y gases?", "clave", "“Hace tres días.”", "Obstrucción completa."),
    act("cirugias", "¿Operaciones previas? ¿Hernias?", "clave", "“Ninguna.”", "Sin bridas: se debe pensar en un tumor en mayores."),
    act("alarma", "¿Cambios en el hábito, sangre, pérdida de peso?", "clave", "“Hace meses, con sangre y 8 kilos menos.”", "Signos de cáncer colorrectal."),
    act("familia", "¿Familiares con cáncer de colon?", "util", "“Mi hermano.”", "Factor de riesgo."),
    act("medicamentos", "¿Opioides o medicación?", "util", "“Nada.”", "Pseudoobstrucción."),
    act("campo", "¿Dónde vivís?", "neutro", "“En Río Cuarto.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Muy distendido, timpánico, ruidos metálicos, dolor difuso sin peritonismo.", "Obstrucción mecánica."),
    act("tacto", "Tacto rectal y hernias", "clave", "Ampolla vacía, sangre oscura en el guante; sin hernias.", "Busca causa."),
    act("deshidratacion", "Hidratación", "util", "Mucosas secas, ortostatismo.", "Tercer espacio."),
  ],
  studies: [
    study("Imágenes", "tac", "TC de abdomen con contraste", "clave", "Masa estenosante en sigmoides, colon proximal dilatado 9 cm, ciego 10 cm, sin aire libre; metástasis hepáticas únicas.", "Causa, sitio, y estadificación."),
    study("Imágenes", "rx", "Radiografía de abdomen", "util", "Colon dilatado con niveles.", "Primera aproximación."),
    study("Laboratorio", "lab", "Hemograma, función renal, ionograma, lactato, CEA", "clave", "Hb 9,2, K 3,1, creatinina 1,5, lactato normal.", "Deshidratación y anemia."),
    study("Imágenes", "colono", "Colonoscopía con preparación por boca", "riesgoso", "No se realizó.", "La preparación oral puede perforar un colon obstruido."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cancer", "Obstrucción intestinal baja por cáncer de sigmoides", true, "Cambios previos, pérdida de peso, sin cirugía, y TC con masa estenosante."),
      dx("bridas", "Obstrucción por bridas", false, "No tiene cirugías."),
      dx("volvulo", "Vólvulo de sigmoides", false, "Daría signo de grano de café, sin masa."),
      dx("ogilvie", "Pseudoobstrucción", false, "Hay causa mecánica."),
      dx("diverticulitis", "Diverticulitis", false, "No hay fiebre ni signos inflamatorios."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("resucitar", "Ayuno, sonda nasogástrica, hidratación y corregir potasio", "clave", "Primeras medidas."),
      mg("cirugia", "Cirugía urgente (resección u ostomía) o stent como puente", "clave", "El ciego de 10 cm tiene riesgo de perforación."),
      mg("onco", "Evaluación oncológica y estadificación", "clave", "Metástasis cambian el plan."),
      mg("familia", "Consejo a familiares y tamizaje", "util", "Riesgo hereditario."),
      mg("laxantes", "Laxantes o enemas de gran volumen", "riesgoso", "Riesgo de perforación."),
      mg("atb-no", "Control ambulatorio en 48 horas", "riesgoso", "Obstrucción completa es urgencia."),
    ],
  },
  debrief: {
    diagnosis: "Obstrucción intestinal baja por adenocarcinoma de sigmoides con metástasis hepáticas, en varón de 73 años.",
    pathologies: [
      { name: "Cáncer colorrectal obstructivo", role: "principal", why: "Masa que ocluye la luz." },
      { name: "Riesgo de perforación cecal", role: "asociada", why: "Por válvula competente." },
      { name: "Vólvulo, bridas, pseudoobstrucción", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: adenocarcinoma de colon izquierdo, de luz más estrecha.",
      "Mecanismo: la obstrucción progresiva dilata el colon; el ciego es el más distensible.",
      "Consecuencia: vómitos, deshidratación, isquemia y perforación.",
    ],
    epidemiology:
      "El cáncer colorrectal es el segundo más frecuente en Argentina y una causa importante de muerte por cáncer. Cerca de 1 de cada 5 casos debuta como urgencia. El tamizaje desde los 50 años con sangre oculta o colonoscopía permite detectarlo antes.",
    management: [
      "Estabilizar e imagen.",
      "Cirugía o stent según el caso.",
      "Estadificación y oncología.",
      "Tamizaje a familiares.",
    ],
    sources: ["Instituto Nacional del Cáncer — Programa de prevención de cáncer colorrectal.", "Asociación Argentina de Cirugía — Recomendaciones."],
    pearls: ["Mayor sin cirugías con obstrucción: pensá en tumor.", "Ciego mayor de 10-12 cm: riesgo de perforación.", "Heces finas: pensá en izquierda."],
    pitfalls: ["Dar laxantes.", "No investigar la anemia antes."],
    tribunal: [
      qa("¿Cuál es la diferencia entre cáncer de colon derecho e izquierdo?", "Derecho: anemia y masa, sin obstrucción al inicio. Izquierdo: cambios del hábito, heces finas, sangre y obstrucción."),
      qa("¿Cuáles son las causas de obstrucción baja y alta?", "Baja: cáncer, vólvulo, diverticulitis. Alta: bridas, hernias, tumores."),
      qa("¿Qué es la secuencia adenoma-carcinoma?", "Mutaciones de APC, KRAS y p53 llevan de un adenoma a un carcinoma en años: por eso sirve el tamizaje."),
    ],
  },
};
