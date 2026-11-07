import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const estenosisMitral: ClinicalCase = {
  id: "estenosis-mitral-reumatica",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 46, ageUnit: "años", sex: "F", context: "Nació en un paraje del Chaco. De chica tuvo “dolor en las articulaciones y anginas”. Sin controles." },
  frequency: "poco-frecuente",
  intro: "“Hace meses me agito al subir la escalera. Hoy me ahogué de golpe, me late muy rápido el corazón y escupí un poco de sangre.”",
  vitals: { TA: "112/76 mmHg", FC: "138 lpm", FR: "30 rpm", "T°": "36,8 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("infancia", "¿Tuviste fiebre reumática, anginas a repetición?", "clave", "“Sí, y las rodillas hinchadas de chica.”", "Fiebre reumática: causa principal."),
    act("palpitaciones", "¿Cuándo empezaron las palpitaciones?", "clave", "“Hoy, de golpe, y se puso peor.”", "La FA descompensa porque se pierde la contracción auricular."),
    act("embarazos", "¿Tuviste problemas en los embarazos?", "clave", "“Me ahogaba en el último.”", "El embarazo revela la estenosis."),
    act("embolia", "¿Debilidad o pérdida de fuerza transitoria?", "util", "“No.”", "Embolias: riesgo alto."),
    act("disfagia", "¿Disfonía o dificultad al tragar?", "util", "“Disfonía a veces.”", "Por aurícula grande."),
    act("campo", "¿Qué se siembra en tu zona?", "neutro", "“Algodón.”", "No orienta."),
  ],
  exam: [
    act("cardiaco", "Auscultación en foco mitral, en decúbito lateral izquierdo", "clave", "Primer ruido fuerte, chasquido de apertura, rodada diastólica.", "Típico de estenosis mitral."),
    act("pulso", "Pulso y yugulares", "clave", "Irregular, muy rápido.", "Fibrilación auricular."),
    act("pulmon", "Pulmones y cara", "clave", "Rales bibasales; chapas rojas en las mejillas.", "Edema; facies mitral."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "FA con respuesta ventricular de 140, signos de crecimiento auricular.", "Arritmia."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Válvula en domo, área 1,1 cm², aurícula 55 mm, presión pulmonar 55 mmHg; sin trombo visible.", "Grave."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Doble contorno, redistribución, líneas de Kerley.", "Crecimiento auricular y congestión."),
    study("Otros", "stress", "Prueba de esfuerzo en plena descompensación", "riesgoso", "No se realizó.", "Contraindicada en edema pulmonar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mitral", "Estenosis mitral reumática grave descompensada por fibrilación auricular, con edema de pulmón", true, "Antecedente, chasquido y rodada, FA y ecocardiograma con área 1,1 cm²."),
      dx("im", "Insuficiencia mitral", false, "Da soplo holosistólico."),
      dx("ea", "Estenosis aórtica", false, "Soplo sistólico eyectivo con pulso parvus."),
      dx("eap", "Edema de pulmón hipertensivo", false, "La presión es normal y el ecocardiograma muestra otra causa."),
      dx("tep", "TEP", false, "No explica la rodada ni la válvula."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("frecuencia", "Controlar la frecuencia (betabloqueante o diltiazem, digoxina si hay falla); cardioversión si hay inestabilidad", "clave", "Más tiempo de diástole mejora el llenado."),
      mg("diurético", "Diuréticos y oxígeno", "clave", "Reduce la congestión."),
      mg("warfarina", "Anticoagular con heparina y luego warfarina", "clave", "En estenosis mitral con FA, no se usan anticoagulantes directos."),
      mg("valvuloplastia", "Valvuloplastia percutánea o cirugía", "clave", "Trata la causa."),
      mg("profilaxis", "Profilaxis de fiebre reumática con penicilina según corresponda", "util", "Previene recurrencias."),
      mg("inotropo", "Dopamina o digoxina sola sin control de frecuencia", "riesgoso", "Aumentar la frecuencia acorta la diástole y empeora el edema."),
    ],
  },
  debrief: {
    diagnosis: "Estenosis mitral reumática grave con FA de alta respuesta y edema de pulmón, en mujer de 46 años.",
    pathologies: [
      { name: "Estenosis mitral", role: "principal", why: "Obstrucción al llenado del VI." },
      { name: "Fibrilación auricular", role: "asociada", why: "Descompensa y aumenta el riesgo de embolia." },
      { name: "Insuficiencia mitral, EA, TEP", role: "diferencial", why: "Otras causas de disnea." },
    ],
    reasoning: [
      "Causa: fiebre reumática años antes.",
      "Mecanismo: fusión comisural que eleva la presión auricular y pulmonar.",
      "Consecuencia: disnea, hemoptisis, FA, embolias e hipertensión pulmonar.",
    ],
    epidemiology:
      "La causa más frecuente es la cardiopatía reumática, predominante en mujeres y en zonas con menor acceso a la salud. En Argentina es menos frecuente que antes, pero persiste en poblaciones vulnerables del norte. Tratar la faringitis estreptocócica la previene.",
    management: [
      "Control de frecuencia y diuréticos.",
      "Anticoagular con warfarina.",
      "Valvuloplastia o cirugía.",
      "Profilaxis secundaria.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de valvulopatías.", "ESC/EACTS — Guía de valvulopatías."],
    pearls: ["Chasquido + rodada: mitral.", "Frenar la frecuencia es tratar.", "Warfarina, no directos."],
    pitfalls: ["No auscultar en decúbito lateral.", "Dar anticoagulante directo."],
    tribunal: [
      qa("¿Cómo se ausculta cada valvulopatía?", "Estenosis aórtica: sistólico eyectivo irradiado al cuello. Insuficiencia mitral: holosistólico a la axila. Estenosis mitral: rodada diastólica. Insuficiencia aórtica: diastólico decreciente."),
      qa("¿Por qué el embarazo descompensa?", "Aumentan el volumen y la frecuencia cardíaca, y se acorta la diástole."),
      qa("¿Qué es la facies mitral?", "Rubor malar por bajo gasto y vasoconstricción periférica."),
    ],
  },
};
