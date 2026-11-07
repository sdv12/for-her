import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const eclampsiaAdolescente: ClinicalCase = {
  id: "eclampsia-adolescente",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "F", context: "Primer embarazo, 35 semanas, sin controles. Llegó en ambulancia de un paraje." },
  frequency: "poco-frecuente",
  intro: "“Le dolía la cabeza desde ayer y veía lucecitas. Hoy se desmayó y tuvo una convulsión de dos minutos. Se quedó dormida.” (relata la madre)",
  vitals: { TA: "178/116 mmHg", FC: "104 lpm", FR: "22 rpm", "T°": "36,9 °C", "SatO₂": "94 %", Glucemia: "92 mg/dl", Glasgow: "12/15" },
  anamnesis: [
    act("convulsion", "¿Cómo fue la convulsión? ¿Tenía epilepsia?", "clave", "“Se puso rígida y sacudió todo; nunca le pasó.”", "Crisis generalizada de novo en el tercer trimestre: eclampsia."),
    act("edad-gest", "¿De cuántas semanas está? ¿Controles?", "clave", "“35, nunca se controló.”", "Sin controles: no se pudo detectar antes."),
    act("sintomas", "¿Dolor de panza arriba, sangrado, pérdidas?", "clave", "“Dolor arriba; no sangra.”", "Busca HELLP y desprendimiento."),
    act("traumatismo", "¿Se golpeó? ¿Drogas?", "util", "“Se golpeó la frente; no.”", "Otras causas."),
    act("movimientos", "¿Se mueve el bebé?", "util", "“No sé.”", "Evaluar bienestar fetal."),
    act("colegio", "¿Va al colegio?", "neutro", "“Dejó.”", "Contexto social, pero no define el diagnóstico."),
  ],
  exam: [
    act("abc", "Vía aérea y posición", "clave", "Respira, lateralizada izquierda.", "Prevenir aspiración y mejorar flujo uterino."),
    act("reflejos", "Reflejos y neurológico", "clave", "Hiperreflexia, sin foco.", "Irritabilidad neurológica."),
    act("obst", "Obstétrico", "clave", "Útero sin hipertonía, latidos 118 lpm.", "Sin desprendimiento; bradicardia transitoria tras la crisis."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, transaminasas, LDH, creatinina, coagulación, proteinuria", "clave", "Plaquetas 138.000, GOT 62, creatinina 1,1, proteinuria +++.", "Evalúa daño y HELLP."),
    study("Otros", "monitoreo", "Monitoreo fetal tras estabilizar", "clave", "Recuperó variabilidad.", "Primero se estabiliza a la madre."),
    study("Imágenes", "tac", "TC de encéfalo si hay foco o no recupera", "util", "Sin lesiones.", "Excluye hemorragia."),
    study("Otros", "antes-estabilizar", "Traslado a quirófano de inmediato, sin magnesio ni control de presión", "riesgoso", "No se realizó.", "Hay que estabilizar antes."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("eclampsia", "Eclampsia en embarazo de 35 semanas", true, "Convulsión de novo, hipertensión grave, proteinuria y síntomas previos."),
      dx("epilepsia", "Epilepsia", false, "Sin antecedentes y con HTA grave."),
      dx("acv", "Hemorragia intracerebral", false, "Es una complicación posible, pero no hay foco y la TC es negativa."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("desprendimiento", "Desprendimiento de placenta", false, "No hay sangrado ni hipertonía."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("magnesio", "Sulfato de magnesio: 4 g EV, luego 1 g/h", "clave", "Trata y previene las crisis, mejor que otros anticonvulsivos."),
      mg("antihta", "Labetalol EV, hidralazina o nifedipina oral", "clave", "Reduce el riesgo de ACV."),
      mg("finalizar", "Finalizar el embarazo tras estabilizar", "clave", "Es el tratamiento definitivo."),
      mg("abc-mg", "Oxígeno, lateralización y control de reflejos, diuresis y respiración", "clave", "Previene toxicidad."),
      mg("diazepam", "Fenitoína o diazepam como primera línea", "riesgoso", "Son menos eficaces y deprimen a madre y feto."),
      mg("social", "Apoyo psicosocial y consejería al alta", "util", "Adolescente con riesgos sociales; anticoncepción."),
    ],
  },
  debrief: {
    diagnosis: "Eclampsia en embarazo de 35 semanas en adolescente de 17 años sin controles prenatales.",
    pathologies: [
      { name: "Eclampsia", role: "principal", why: "Convulsión en preeclampsia." },
      { name: "Preeclampsia grave", role: "asociada", why: "Sustrato." },
      { name: "Epilepsia, hemorragia, hipoglucemia", role: "diferencial", why: "Otras causas de convulsión." },
    ],
    reasoning: [
      "Causa: placentación anormal con disfunción endotelial.",
      "Mecanismo: la HTA y el vasoespasmo producen edema cerebral vasogénico.",
      "Consecuencia: convulsiones, riesgo de ACV, desprendimiento, HELLP y muerte materna y fetal.",
    ],
    epidemiology:
      "Los trastornos hipertensivos son una de las principales causas de mortalidad materna en Argentina. Las adolescentes y las primigestas tienen más riesgo, y la falta de controles prenatales lo agrava, sobre todo en zonas rurales. La mayoría de las muertes es evitable.",
    management: [
      "ABC y lateralización.",
      "Sulfato de magnesio y antihipertensivos.",
      "Estabilizar y finalizar el embarazo.",
      "Vigilancia posparto y seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de trastornos hipertensivos del embarazo.", "FASGO — Consenso de hipertensión y embarazo."],
    pearls: ["Convulsión en el embarazo: eclampsia hasta demostrar lo contrario.", "Magnesio, siempre.", "Primero la madre, después el feto."],
    pitfalls: ["Usar diazepam primero.", "Ir a cirugía sin estabilizar."],
    tribunal: [
      qa("¿Qué es el esquema de Zuspan?", "4 g de sulfato de magnesio EV en 20 minutos, seguidos de 1 g por hora durante 24 horas tras el parto."),
      qa("¿Qué signos de toxicidad por magnesio hay?", "Desaparición de reflejos, depresión respiratoria y paro cardíaco; se trata con gluconato de calcio."),
      qa("¿Qué es la aspirina preventiva?", "Dosis bajas desde antes de las 16 semanas en embarazadas de riesgo: reduce la preeclampsia."),
    ],
  },
};
