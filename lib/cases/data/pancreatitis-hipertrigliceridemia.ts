import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitisHipertrigliceridemia: ClinicalCase = {
  id: "pancreatitis-hipertrigliceridemia",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Diabetes tipo 2 mal controlada, obesidad, toma anticonceptivos orales. No consume alcohol." },
  frequency: "poco-frecuente",
  intro: "“Tengo un dolor muy fuerte arriba de la panza que va a la espalda, y vomité varias veces. Me pasó de golpe después de un asado.”",
  vitals: { TA: "112/70 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "37,6 °C", "SatO₂": "95 %", Glucemia: "312 mg/dl" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Mejora inclinándote?", "clave", "“En cinturón, mejora hacia adelante.”", "Típico de pancreatitis."),
    act("alcohol", "¿Alcohol, cálculos conocidos, medicación?", "clave", "“No tomo; sin cálculos; uso anticonceptivos.”", "Busca la causa; los estrógenos aumentan los triglicéridos."),
    act("lipidos", "¿Colesterol o triglicéridos altos?", "clave", "“Me dijeron que tenía triglicéridos altos y no volví.”", "Causa sospechada."),
    act("diabetes", "¿Cómo controlás la diabetes?", "util", "“Mal.”", "Se asocia."),
    act("familia", "¿Tu familia tiene triglicéridos altos?", "util", "“Mi papá.”", "Hereditario."),
    act("hijo", "¿Tenés hijos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Epigastrio doloroso, sin defensa; distensión leve, ruidos disminuidos.", "Compatible."),
    act("piel", "Piel", "clave", "Xantomas eruptivos en brazos y glúteos.", "Triglicéridos muy altos."),
    act("volumen", "Volumen y perfusión", "util", "Mucosas secas, relleno normal.", "Pérdidas al tercer espacio."),
  ],
  studies: [
    study("Laboratorio", "lipasa", "Lipasa", "clave", "Lipasa 5 veces el valor normal.", "Diagnóstica; la amilasa puede ser falsamente normal con triglicéridos altos."),
    study("Laboratorio", "tg", "Triglicéridos (suero lechoso)", "clave", "2.450 mg/dl, muestra lechosa.", "Más de 1.000 mg/dl explica la causa."),
    study("Laboratorio", "gravedad", "Función renal, calcio, gases, hemograma, cetonas", "clave", "BUN 24, calcio 7,9, cetonas leves.", "Pronóstico; también descartar cetoacidosis."),
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Sin litiasis.", "Se hace a todos para descartar causa biliar."),
    study("Imágenes", "tac", "TC con contraste al ingreso", "innecesario", "No se realizó.", "Solo si hay dudas o tras 72 horas sin mejoría."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("htg", "Pancreatitis aguda por hipertrigliceridemia grave", true, "Dolor en cinturón, lipasa elevada, triglicéridos de 2.450 mg/dl, xantomas y sin litiasis ni alcohol."),
      dx("biliar", "Pancreatitis biliar", false, "Sin cálculos."),
      dx("ulcera", "Úlcera perforada", false, "No hay neumoperitoneo ni irritación peritoneal."),
      dx("cad", "Cetoacidosis diabética aislada", false, "Puede coexistir, pero la lipasa y el dolor orientan a pancreatitis."),
      dx("iam", "Infarto inferior", false, "No explica lipasa ni xantomas; igual se pide ECG."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación moderada con Ringer lactato, analgesia y nutrición temprana", "clave", "Base del tratamiento."),
      mg("insulina", "Insulina EV con dextrosa, según glucemia", "clave", "Activa la lipoproteína lipasa y baja los triglicéridos."),
      mg("plasmaferesis", "Plasmaféresis si hay falla orgánica o no baja, donde esté disponible", "util", "Reduce rápido en casos seleccionados."),
      mg("largo", "Al alta: fibratos, suspender estrógenos, control de diabetes y dieta", "clave", "Previene recurrencias."),
      mg("carga", "Hidratación agresiva con grandes volúmenes", "riesgoso", "Aumenta la sobrecarga y complicaciones."),
      mg("atb", "Antibióticos profilácticos", "innecesario", "No se indican sin infección."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis aguda por hipertrigliceridemia grave, con diabetes y anticonceptivos con estrógenos, en mujer de 38 años.",
    pathologies: [
      { name: "Pancreatitis aguda", role: "principal", why: "Inflamación pancreática." },
      { name: "Hipertrigliceridemia grave", role: "asociada", why: "Causa." },
      { name: "Pancreatitis biliar, úlcera, infarto inferior", role: "diferencial", why: "Otras causas de epigastralgia." },
    ],
    reasoning: [
      "Causa: exceso de triglicéridos, por diabetes, estrógenos y genética.",
      "Mecanismo: la lipasa pancreática libera ácidos grasos tóxicos, y los quilomicrones obstruyen capilares.",
      "Consecuencia: autodigestión, inflamación sistémica y complicaciones locales.",
    ],
    epidemiology:
      "Es la tercera causa de pancreatitis aguda, tras la biliar y el alcohol, con 1 a 7 % de los casos, y suele ser más grave. Se asocia con diabetes mal controlada, obesidad, embarazo y fármacos como estrógenos, tamoxifeno y retinoides.",
    management: [
      "Diagnóstico con 2 de 3 criterios: dolor, enzimas e imagen.",
      "Hidratación moderada, analgesia, nutrición.",
      "Insulina y descenso de triglicéridos.",
      "Prevenir: fibratos y diabetes.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Recomendaciones de pancreatitis.", "American College of Gastroenterology — Guía de pancreatitis aguda."],
    pearls: ["Suero lechoso y amilasa normal: pedí triglicéridos.", "Más de 1.000 mg/dl: causa posible.", "Ringer lactato moderado."],
    pitfalls: ["Hidratar demasiado.", "Olvidar suspender estrógenos."],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos?", "Dos de tres: dolor típico, lipasa o amilasa de 3 veces el límite superior, e imágenes compatibles."),
      qa("¿Qué es la clasificación de Atlanta?", "Leve: sin falla orgánica ni complicaciones. Moderada: falla transitoria o complicaciones locales. Grave: falla orgánica persistente más de 48 horas."),
      qa("¿Cuáles son las causas de pancreatitis?", "Litiasis, alcohol, triglicéridos, CPRE, hipercalcemia, fármacos, trauma, infecciones y causas autoinmunes."),
    ],
  },
};
