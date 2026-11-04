import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pielonefritisObstructiva: ClinicalCase = {
  id: "pielonefritis-obstructiva-litiasis",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Tuvo cálculos renales antes. Diabética." },
  frequency: "frecuente",
  intro: "“Hace dos días tengo un cólico fuerte en el lado izquierdo, y desde anoche fiebre con escalofríos. Estoy muy mareada.”",
  vitals: { TA: "86/50 mmHg", FC: "122 lpm", FR: "24 rpm", "T°": "39,4 °C", Glucemia: "268 mg/dl" },
  anamnesis: [
    act("colico", "¿Cómo empezó el dolor?", "clave", "“Cólico intenso de la cintura a la ingle izquierda hace dos días.”", "Cólico renal: probable cálculo obstructivo."),
    act("fiebre", "¿Cuándo empezó la fiebre?", "clave", "“Anoche, con escalofríos.”", "Fiebre en un cólico renal: infección por encima de una obstrucción, una urgencia."),
    act("litiasis", "¿Tuviste cálculos antes?", "util", "“Sí, dos veces.”", "Antecedente."),
    act("orina", "¿Orinás normalmente?", "util", "“Poco.”", "Oliguria por hipoperfusión."),
    act("alergia", "¿Sos alérgica a algún antibiótico o al contraste?", "util", "“No.”", "Para el tratamiento."),
    act("trabajo", "¿De qué trabajás?", "neutro", "“Soy peluquera.”", "No orienta."),
  ],
  exam: [
    act("punio", "Puño percusión", "clave", "Muy positiva a la izquierda.", "Compromiso renal izquierdo."),
    act("perfusion", "Perfusión y conciencia", "clave", "Piel fría, relleno 4 s, lúcida.", "Shock séptico."),
    act("abdomen", "Abdomen", "util", "Blando, dolor en flanco izquierdo.", "Sin abdomen agudo."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía renal", "clave", "Hidronefrosis izquierda moderada.", "Confirma la obstrucción."),
    study("Imágenes", "tc", "Tomografía sin contraste", "util", "Cálculo de 8 mm en el uréter proximal izquierdo.", "Localiza el cálculo."),
    study("Laboratorio", "lab", "Hemograma, creatinina, lactato, orina y cultivos (urocultivo y hemocultivos)", "clave", "Leucocitos 22.000, creatinina 2,1, lactato 4,2; orina con leucocitos y nitritos.", "Sepsis de foco urinario."),
    study("Otros", "solo-atb", "Solo antibióticos y esperar que expulse el cálculo", "riesgoso", "No se realizó.", "Un riñón obstruido e infectado debe drenarse."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("obstructiva", "Pielonefritis obstructiva por litiasis ureteral izquierda con shock séptico", true, "Cólico renal seguido de fiebre, hipotensión, hidronefrosis y cálculo ureteral, con orina infecciosa y lactato alto."),
      dx("colico-simple", "Cólico renal no complicado", false, "Hay fiebre y shock."),
      dx("pna-simple", "Pielonefritis no complicada", false, "Hay obstrucción."),
      dx("diverticulitis", "Diverticulitis", false, "Hidronefrosis con cálculo y orina infecciosa."),
      dx("pancreatitis", "Pancreatitis", false, "Foco urinario claro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Desobstrucción urgente: catéter doble J o nefrostomía percutánea", "clave", "Es el control del foco: sin drenaje no hay curación."),
      mg("atb", "Antibiótico EV de amplio espectro en la primera hora", "clave", "Sepsis."),
      mg("reanimacion", "Fluidos y noradrenalina si persiste la hipotensión", "clave", "Shock séptico."),
      mg("litotricia-diferida", "Tratamiento del cálculo cuando se resuelva la infección", "util", "No se rompe el cálculo con infección activa."),
      mg("ureteroscopia-ya", "Ureteroscopía con litotricia en la urgencia", "riesgoso", "Con infección activa puede empeorar la sepsis."),
      mg("aines-alta", "AINE y alta", "riesgoso", "Error grave."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis obstructiva izquierda por litiasis ureteral con shock séptico e insuficiencia renal aguda, en mujer diabética de 49 años.",
    pathologies: [
      { name: "Pielonefritis obstructiva", role: "principal", why: "Infección por encima de un cálculo." },
      { name: "Shock séptico", role: "asociada", why: "Disfunción orgánica." },
      { name: "Cólico simple, diverticulitis", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: cálculo que obstruye el uréter.",
      "Mecanismo: la orina estancada se infecta y la presión alta favorece el paso de bacterias a la sangre.",
      "Consecuencia: sepsis grave de evolución rápida que no responde sin drenaje.",
    ],
    epidemiology:
      "La litiasis renal es muy frecuente en Argentina (alrededor del 5–10 % de la población), más en varones y en verano. La pielonefritis obstructiva es una de las urgencias urológicas más graves; diabéticos y mujeres tienen más riesgo de complicaciones infecciosas.",
    management: [
      "Todo cólico con fiebre: buscar obstrucción.",
      "Antibiótico, reanimación y drenaje urgente.",
      "Tratar el cálculo después.",
      "Prevención de nuevos cálculos.",
    ],
    sources: ["Sociedad Argentina de Urología — Guía de litiasis urinaria.", "Sociedad Argentina de Infectología — Infecciones urinarias complicadas."],
    pearls: ["Cólico + fiebre = urgencia urológica.", "Drenar el riñón.", "No romper el cálculo con infección."],
    pitfalls: ["Solo antibióticos.", "Tratar como cólico simple."],
    tribunal: [
      qa("¿Cuándo se interna un cólico renal?", "Con fiebre o signos de infección, riñón único, insuficiencia renal, dolor o vómitos refractarios, anuria, o cálculos grandes que difícilmente se expulsen."),
      qa("¿Qué tamaño de cálculo suele expulsarse solo?", "Los menores de 5 mm se expulsan espontáneamente en la mayoría de los casos; los mayores de 10 mm rara vez. Los alfa bloqueantes (tamsulosina) favorecen la expulsión de cálculos distales."),
      qa("¿Qué tipos de cálculos hay?", "Oxalato de calcio (los más frecuentes), fosfato de calcio, ácido úrico (radiolúcidos), estruvita (por infección con gérmenes ureolíticos, coraliformes) y cistina (genéticos)."),
    ],
  },
};
