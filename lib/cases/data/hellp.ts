import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hellp: ClinicalCase = {
  id: "sindrome-hellp",
  level: 4,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "F", context: "Primer embarazo, 34 semanas. Con pocos controles." },
  frequency: "poco-frecuente",
  intro: "“Tengo un dolor muy fuerte arriba de la panza, náuseas y dolor de cabeza. En la salita me dijeron que era de la vesícula o un virus.”",
  vitals: { TA: "168/112 mmHg", FC: "98 lpm", FR: "20 rpm", "T°": "36,8 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("dolor", "¿Dónde es el dolor?", "clave", "“En la boca del estómago y a la derecha, debajo de las costillas.”", "Epigastralgia o dolor en hipocondrio derecho: distensión de la cápsula hepática."),
    act("visual", "¿Ves puntitos o luces? ¿Cefalea?", "clave", "“Veo lucecitas.”", "Síntomas de gravedad."),
    act("presion", "¿Te tomaron la presión antes? ¿Hinchazón?", "clave", "“Hace un mes, estaba bien; estoy hinchada.”", "Preeclampsia grave."),
    act("movimientos", "¿Se mueve el bebé?", "util", "“Algo menos.”", "Bienestar fetal."),
    act("sangrado", "¿Sangrás por encías o moretones?", "util", "“Algunos moretones.”", "Plaquetopenia."),
    act("nombre", "¿Ya elegiste el nombre?", "neutro", "“Valentina.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor en hipocondrio derecho, útero de altura acorde, sin hipertonía.", "Compromiso hepático; sin desprendimiento."),
    act("neuro", "Reflejos y neurológico", "clave", "Hiperreflexia, clonus.", "Riesgo de eclampsia."),
    act("latidos", "Latidos fetales", "util", "142 lpm.", "Vitalidad fetal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma con frotis, LDH, bilirrubina, transaminasas, creatinina, coagulograma", "clave", "Plaquetas 62.000, GOT 310, LDH 980, esquistocitos, creatinina 1,2.", "Hemólisis, enzimas hepáticas altas y plaquetas bajas."),
    study("Laboratorio", "orina", "Proteinuria", "clave", "Cociente proteína/creatinina 2,1.", "Confirma compromiso renal; no es imprescindible para HELLP."),
    study("Otros", "monitoreo", "Monitoreo fetal y ecografía con Doppler", "clave", "Reactivo, peso en percentil 10.", "Bienestar fetal."),
    study("Imágenes", "tac", "TC abdominal por el dolor de vesícula", "innecesario", "No se realizó.", "No cambia la conducta; la ecografía alcanza si hay duda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hellp", "Síndrome HELLP con preeclampsia grave a las 34 semanas", true, "Hipertensión grave, dolor en hipocondrio derecho, hemólisis, transaminasas altas y plaquetas de 62.000."),
      dx("colecistitis", "Colecistitis aguda", false, "No explica la HTA, la plaquetopenia ni la hemólisis."),
      dx("higado-graso", "Hígado graso agudo del embarazo", false, "Da hipoglucemia, coagulopatía marcada y amonio alto, más que hemólisis."),
      dx("ptt", "Púrpura trombótica trombocitopénica", false, "Las transaminasas no suelen estar tan altas, y se relaciona con ADAMTS13."),
      dx("hepatitis", "Hepatitis viral", false, "No da plaquetopenia ni hemólisis con HTA."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("magnesio", "Sulfato de magnesio (Zuspan)", "clave", "Previene la eclampsia."),
      mg("antihta", "Labetalol EV o nifedipina oral si PA de 160/110 o más", "clave", "Previene ACV materno."),
      mg("finalizar", "Finalizar el embarazo tras estabilizar, en un centro de alta complejidad", "clave", "El parto es el único tratamiento definitivo."),
      mg("plaquetas", "Transfusión de plaquetas según vía de parto y sangrado", "util", "Para cesárea se considera si son menos de 50.000."),
      mg("expectante", "Conducta expectante hasta las 37 semanas", "riesgoso", "El riesgo materno es muy alto."),
      mg("aines", "Ibuprofeno para el dolor y antiácidos", "riesgoso", "Empeora la función renal y las plaquetas, y demora."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome HELLP con preeclampsia grave en embarazo de 34 semanas, en mujer de 35 años primigesta.",
    pathologies: [
      { name: "Síndrome HELLP", role: "principal", why: "Forma grave de preeclampsia con daño endotelial." },
      { name: "Riesgo de eclampsia y rotura hepática", role: "asociada", why: "Complicaciones mortales." },
      { name: "Colecistitis, hígado graso agudo, PTT, hepatitis", role: "diferencial", why: "Otras causas de epigastralgia y laboratorio alterado." },
    ],
    reasoning: [
      "Causa: placentación anormal con isquemia.",
      "Mecanismo: disfunción endotelial con microangiopatía, depósitos de fibrina en sinusoides y consumo de plaquetas.",
      "Consecuencia: hemólisis, necrosis periportal, plaquetopenia, HTA y riesgo materno-fetal alto.",
    ],
    epidemiology:
      "Complica entre el 10 y el 20 % de las preeclampsias graves y predomina en el tercer trimestre o en el puerperio inmediato. Los trastornos hipertensivos son una de las principales causas de mortalidad materna en Argentina. Muchas veces se confunde con cuadros digestivos.",
    management: [
      "Sospechar ante epigastralgia en el embarazo avanzado.",
      "Magnesio y antihipertensivos.",
      "Finalizar el embarazo tras estabilizar.",
      "Vigilar el puerperio: puede empeorar 48 horas después.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para trastornos hipertensivos del embarazo.", "FASGO — Consenso de preeclampsia."],
    pearls: ["Epigastralgia en el tercer trimestre: tomá la presión y pedí plaquetas.", "HELLP puede cursar sin proteinuria.", "El parto es el tratamiento definitivo."],
    pitfalls: ["Tratarla como gastritis o vesícula.", "Usar AINE."],
    tribunal: [
      qa("¿Qué significa HELLP?", "Hemolysis (hemólisis), Elevated Liver enzymes (enzimas hepáticas elevadas) y Low Platelets (plaquetas bajas)."),
      qa("¿Cómo se diferencia del hígado graso agudo?", "El hígado graso cursa con hipoglucemia, coagulopatía marcada, amonio alto e insuficiencia hepática; HELLP con hemólisis y plaquetopenia predominantes."),
      qa("¿Cómo se controla la toxicidad por magnesio?", "Con reflejos, frecuencia respiratoria y diuresis; el antídoto es el gluconato de calcio."),
    ],
  },
};
