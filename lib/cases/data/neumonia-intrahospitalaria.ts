import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumoniaIntrahospitalaria: ClinicalCase = {
  id: "neumonia-intrahospitalaria",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 73, ageUnit: "años", sex: "M", context: "Internado hace 7 días por una colectomía por cáncer de colon. Recibió cefazolina profiláctica." },
  frequency: "frecuente",
  intro: "La enfermera te llama: “El de la cama 12 levantó 38,7 °C y está saturando mal.”",
  vitals: { TA: "112/68 mmHg", FC: "108 lpm", FR: "26 rpm", "SatO₂": "89 % aire ambiente", "T°": "38,7 °C" },
  anamnesis: [
    act("tos", "¿Tiene tos o secreciones?", "clave", "“Tos con flema amarilla desde ayer.”", "Síntomas respiratorios nuevos después de 48 horas de internación."),
    act("dolor", "¿Le duele al toser o respirar?", "util", "“La herida, sí, por eso no toso mucho.”", "El dolor abdominal limita la tos y favorece la neumonía."),
    act("movilidad", "¿Se levantó de la cama estos días?", "clave", "“Casi nada.”", "Inmovilidad: atelectasias y riesgo de TEP."),
    act("vomitos", "¿Vomitó o se atragantó?", "clave", "“Vomité hace dos noches acostado.”", "Posible aspiración."),
    act("atb-previos", "¿Recibió antibióticos en los últimos 90 días?", "clave", "Solo la profilaxis quirúrgica según la historia.", "Define el riesgo de gérmenes multirresistentes."),
    act("comida", "¿Le gusta la comida del hospital?", "neutro", "“Es sin sal.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación pulmonar", "clave", "Crepitantes y soplo tubario en base derecha.", "Consolidación."),
    act("herida", "Herida quirúrgica y abdomen", "clave", "Herida limpia, abdomen blando, ruidos presentes.", "Descarta foco abdominal."),
    act("piernas", "Miembros inferiores", "clave", "Sin edema ni dolor.", "TEP poco probable, aunque no excluido."),
    act("vias", "Accesos venosos y sonda", "util", "Vía periférica de 2 días sin flebitis; sin sonda.", "Otros focos intrahospitalarios."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Consolidación en lóbulo inferior derecho, nueva respecto del prequirúrgico.", "Infiltrado nuevo: criterio de neumonía."),
    study("Microbiología", "hemocultivos", "Hemocultivos x2 y cultivo de esputo", "clave", "Esputo: bacilos gramnegativos; cultivo en curso.", "Antes del antibiótico, para ajustar."),
    study("Laboratorio", "lab", "Hemograma, función renal, lactato", "clave", "Leucocitos 16.800, creatinina 1,2 mg/dl, lactato 1,8 mmol/l.", "Gravedad y ajuste de dosis."),
    study("Laboratorio", "gases", "Gasometría arterial", "util", "PaO₂ 58 mmHg, PaFi 276.", "Insuficiencia respiratoria."),
    study("Microbiología", "antigenuria", "Antígenos urinarios de neumococo y Legionella", "innecesario", "No se pidieron.", "Poco rendimiento en neumonía intrahospitalaria temprana con gramnegativos."),
    study("Imágenes", "tac-abdomen", "TC de abdomen para buscar colección", "util", "Sin colecciones.", "Razonable en un posoperatorio con fiebre si el abdomen no es claro."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nih", "Neumonía intrahospitalaria (no asociada a ventilador) de base derecha", true, "Fiebre, secreciones, hipoxemia e infiltrado nuevo después de 48 horas de internación."),
      dx("atelectasia", "Atelectasia posoperatoria", false, "Hay fiebre alta, secreciones purulentas y soplo tubario."),
      dx("tep", "TEP posoperatorio", false, "Puede dar fiebre e infiltrado, pero la clínica y la consolidación orientan a infección."),
      dx("absceso", "Colección intraabdominal", false, "Abdomen y TC sin colecciones."),
      dx("nac", "Neumonía adquirida en la comunidad", false, "Apareció después de 48 horas internado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb-pseudomonas", "Piperacilina-tazobactam empírico según la epidemiología local", "clave", "Cubre gramnegativos hospitalarios, incluida Pseudomonas."),
      mg("o2", "Oxígeno para saturación de 92–96 %", "clave", "Hipoxemia."),
      mg("kinesio", "Kinesioterapia respiratoria y movilización", "clave", "Tos eficaz y menos atelectasias."),
      mg("desescalar", "Ajustar con cultivos a las 48–72 horas y completar 7 días", "clave", "Uso racional."),
      mg("cabecera", "Cabecera a 30–45° y analgesia que permita toser", "util", "Prevención de aspiración."),
      mg("ceftriaxona", "Ceftriaxona sola", "riesgoso", "No cubre Pseudomonas ni muchos gramnegativos hospitalarios."),
      mg("vancomicina-todos", "Vancomicina de rutina sin factores de riesgo para SAMR", "innecesario", "Se agrega solo con factores de riesgo o alta prevalencia local."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía intrahospitalaria temprana no asociada a ventilador, con insuficiencia respiratoria, en un hombre de 73 años en el posoperatorio de una colectomía.",
    pathologies: [
      { name: "Neumonía intrahospitalaria", role: "principal", why: "Infiltrado nuevo con clínica infecciosa después de 48 horas." },
      { name: "Microaspiración posoperatoria", role: "asociada", why: "Vómito en decúbito, dolor que limita la tos." },
      { name: "TEP", role: "diferencial", why: "Siempre a considerar en el posoperatorio inmóvil." },
    ],
    reasoning: [
      "Causa: colonización orofaríngea por gramnegativos hospitalarios y aspiración.",
      "Mecanismo: tos ineficaz por dolor, decúbito e inmovilidad que impiden limpiar la vía aérea.",
      "Consecuencia: consolidación con hipoxemia y riesgo de sepsis.",
    ],
    epidemiology:
      "Es la segunda infección asociada al cuidado de la salud en frecuencia y la que más muertes causa. Predomina en mayores de 65, posoperatorios de abdomen superior y tórax y pacientes con trastornos de la deglución. En Argentina, los gramnegativos multirresistentes son frecuentes: la elección empírica depende del mapa local.",
    management: [
      "Cultivos antes del antibiótico.",
      "Antibiótico con cobertura de gramnegativos hospitalarios según epidemiología.",
      "Desescalar con cultivos y completar 7 días.",
      "Movilización, kinesioterapia y cabecera elevada.",
    ],
    sources: ["SADI — Guía de neumonía intrahospitalaria.", "IDSA/ATS — Management of hospital-acquired and ventilator-associated pneumonia."],
    pearls: ["Más de 48 horas internado = intrahospitalaria.", "Mirá el mapa microbiológico de tu hospital.", "7 días alcanzan en la mayoría."],
    pitfalls: ["Tratarla como una NAC.", "No descartar TEP en el posoperatorio."],
    tribunal: [
      qa("¿Qué define a una neumonía intrahospitalaria?", "La que aparece 48 horas o más después del ingreso y no estaba incubándose al internarse."),
      qa("¿Qué factores indican riesgo de gérmenes multirresistentes?", "Antibióticos intravenosos en los últimos 90 días, shock séptico, distrés y alta prevalencia local de resistentes."),
      qa("¿Cómo se previene en el posoperatorio?", "Con movilización precoz, kinesioterapia respiratoria, analgesia adecuada, cabecera elevada e higiene oral."),
    ],
  },
};
