import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const roturaLca: ClinicalCase = {
  id: "rotura-ligamento-cruzado-anterior",
  level: 1,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Juega al handball. Se lesionó el domingo." },
  frequency: "frecuente",
  intro: "“Giré sobre la pierna y sentí un chasquido en la rodilla. Se me hinchó en un rato, y ahora siento que se me va.”",
  vitals: { TA: "116/72 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("mecanismo", "¿Cómo fue? ¿Te golpearon o giraste con el pie fijo?", "clave", "“Giré sola, con el pie fijo.”", "Mecanismo de pivote: típico."),
    act("chasquido", "¿Sentiste un chasquido? ¿Cuándo se hinchó?", "clave", "“Sí; a las dos horas.”", "Hemartrosis rápida: 70 % son lesión de LCA."),
    act("bloqueo", "¿La rodilla se traba o falla?", "clave", "“Falla, no se traba.”", "Inestabilidad; el bloqueo sugiere menisco."),
    act("previo", "¿Lesiones previas?", "util", "“Ninguna.”", "Antecedentes."),
    act("objetivo", "¿Querés seguir compitiendo?", "util", "“Sí.”", "Define la cirugía."),
    act("equipo", "¿Qué equipo?", "neutro", "“Del barrio.”", "No orienta."),
  ],
  exam: [
    act("lachman", "Prueba de Lachman y pivot shift", "clave", "Lachman positivo sin tope firme.", "La más sensible."),
    act("meniscos", "Línea articular y McMurray", "clave", "Dolor en la línea interna, McMurray positivo.", "Lesión asociada."),
    act("colaterales", "Valgo y varo forzado, pulso y sensibilidad", "util", "Estables; neurovascular normal.", "Otras lesiones."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de rodilla", "clave", "Sin fracturas; fractura de Segond ausente.", "Excluye fracturas."),
    study("Imágenes", "rmn", "RM de rodilla", "clave", "Rotura completa de LCA y lesión de menisco interno.", "Confirma y planifica."),
    study("Otros", "artroscopia", "Artroscopía diagnóstica de entrada", "innecesario", "No se realizó.", "La RM es suficiente."),
    study("Laboratorio", "lab", "Laboratorio de rutina", "innecesario", "No se realizó.", "Sin utilidad para el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lca", "Rotura completa del ligamento cruzado anterior con lesión de menisco interno", true, "Pivote, chasquido, hemartrosis rápida, Lachman positivo y RM."),
      dx("rotula", "Luxación de rótula", false, "La rótula se desplaza; Lachman negativo."),
      dx("meniscal", "Lesión meniscal aislada", false, "No explica Lachman ni la hemartrosis rápida."),
      dx("colateral", "Esguince de colateral medial", false, "Prueba de valgo estable."),
      dx("fractura", "Fractura de platillo", false, "Rx sin fractura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rice", "Protección, frío, elevación, analgesia y kinesiología temprana", "clave", "Reduce inflamación y mantiene movilidad."),
      mg("cirugia", "Reconstrucción del ligamento y sutura del menisco, si vuelve al pivote", "clave", "Reduce la inestabilidad y protege el menisco."),
      mg("rehab", "Rehabilitación prolongada y prevención de nuevas lesiones", "clave", "Evita recaídas."),
      mg("inmovil", "Yeso por 6 semanas", "riesgoso", "Rigidez y atrofia."),
      mg("infiltrar", "Infiltrar corticoide y volver a jugar", "riesgoso", "No repara y deja la rodilla inestable."),
      mg("punzar", "Punción si la tensión es muy dolorosa", "util", "Alivio en casos seleccionados."),
    ],
  },
  debrief: {
    diagnosis: "Rotura completa del ligamento cruzado anterior con lesión del menisco interno en mujer de 23 años, jugadora de handball.",
    pathologies: [
      { name: "Rotura de LCA", role: "principal", why: "Restringe el desplazamiento anterior." },
      { name: "Lesión meniscal", role: "asociada", why: "Frecuente." },
      { name: "Luxación de rótula, colaterales, fractura", role: "diferencial", why: "Otras causas de hemartrosis." },
    ],
    reasoning: [
      "Causa: pivote o salto, con pie fijo y valgo.",
      "Mecanismo: la tensión excede la resistencia del ligamento, y sangra.",
      "Consecuencia: inestabilidad, daño meniscal, artrosis precoz.",
    ],
    epidemiology:
      "Es una lesión común en deportes con giros, como fútbol, handball y básquet. Las mujeres tienen entre 2 y 8 veces más riesgo por factores anatómicos y neuromusculares. Los programas de entrenamiento neuromuscular reducen su frecuencia.",
    management: [
      "Lachman tras la inflamación.",
      "Rx y RM.",
      "Rehabilitación temprana.",
      "Cirugía según demanda e inestabilidad.",
    ],
    sources: ["Asociación Argentina de Traumatología del Deporte — Recomendaciones.", "Asociación Argentina de Artroscopía — Recomendaciones."],
    pearls: ["Pivote + chasquido + hinchazón rápida.", "Lachman: la más sensible.", "Fractura de Segond: casi siempre LCA."],
    pitfalls: ["Yeso.", "Decir que es un esguince sin examinar."],
    tribunal: [
      qa("¿Qué es la tríada de O'Donoghue?", "Lesión de LCA, ligamento colateral medial y menisco, clásicamente descrita por valgo y rotación."),
      qa("¿Qué función tienen los ligamentos cruzados?", "El anterior evita el desplazamiento anterior de la tibia; el posterior, el posterior."),
      qa("¿Qué hallazgos sugieren lesión meniscal?", "Bloqueo, dolor en la línea articular y derrame que aparece horas después."),
    ],
  },
};
