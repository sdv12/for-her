import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerPulmonNoFumadora: ClinicalCase = {
  id: "cancer-pulmon-no-fumadora-egfr",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 51, ageUnit: "años", sex: "F", context: "Nunca fumó. Profesora de yoga. Su padre fumaba en la casa." },
  frequency: "frecuente",
  intro: "“Hace dos meses tengo tos seca que no se va y me duele la espalda. Me dieron antibióticos dos veces.”",
  vitals: { TA: "118/72 mmHg", FC: "82 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "95 %", Peso: "57 kg" },
  anamnesis: [
    act("tos", "¿Cuánto hace que tose?", "clave", "“Dos meses, sin mejorar con antibióticos.”", "Tos persistente."),
    act("tabaco", "¿Fumó o convivió con fumadores?", "clave", "“Nunca fumé, mi papá fumaba en casa.”", "Tabaquismo pasivo."),
    act("dolor", "¿Dónde le duele la espalda?", "clave", "“En la columna dorsal, de noche.”", "Metástasis óseas."),
    act("peso", "¿Bajó de peso?", "util", "“Tres kilos.”", "Alarma."),
    act("radon", "¿Vive en casa con sótano o trabajó con asbesto?", "util", "“No.”", "Otros factores."),
    act("yoga", "¿Qué yoga enseña?", "neutro", "“Hatha.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Pulmón", "clave", "Hipoventilación en base izquierda.", "Derrame o masa."),
    act("columna", "Columna", "clave", "Dolor a la percusión de D8.", "Metástasis."),
    act("ganglios", "Ganglios supraclaviculares", "util", "Uno izquierdo de 1 cm.", "Diseminación."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de tórax, abdomen y pelvis", "clave", "Masa periférica de 4 cm en lóbulo inferior izquierdo, derrame y lesión lítica D8.", "Cáncer avanzado."),
    study("Otros", "biopsia", "Biopsia con estudio molecular (EGFR, ALK, PD-L1)", "clave", "Adenocarcinoma con mutación EGFR.", "Terapia dirigida."),
    study("Imágenes", "rm-cerebro", "RM de cerebro", "util", "Sin metástasis.", "Estadificación."),
    study("Otros", "mas-atb", "Tercer ciclo de antibióticos", "riesgoso", "No se indicó.", "Retrasa el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("adenocarcinoma-egfr", "Adenocarcinoma de pulmón estadio IV con mutación EGFR en mujer no fumadora", true, "Tos persistente, masa periférica, metástasis ósea y biopsia con EGFR mutado."),
      dx("nac", "Neumonía que no resuelve", false, "Masa y metástasis."),
      dx("tbc", "Tuberculosis", false, "Biopsia de adenocarcinoma."),
      dx("metastasis-mama", "Metástasis de cáncer de mama", false, "Primario pulmonar por biopsia."),
      dx("escamoso", "Carcinoma escamoso", false, "La biopsia es adenocarcinoma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("osimertinib", "Inhibidor de tirosina quinasa de EGFR (osimertinib)", "clave", "Terapia dirigida de primera línea."),
      mg("comite", "Comité oncológico y radioterapia paliativa de D8", "clave", "Dolor y riesgo de compresión."),
      mg("derrame", "Manejo del derrame si da síntomas", "util", "Disnea."),
      mg("paliativos", "Cuidados paliativos integrados", "clave", "Calidad de vida."),
      mg("quimio-sin-molecular", "Quimioterapia sin esperar el estudio molecular", "riesgoso", "Pierde la mejor opción."),
      mg("sin-estudiar", "No estudiar por no fumar", "riesgoso", "El cáncer de pulmón ocurre en no fumadores."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de pulmón estadio IV con mutación EGFR y metástasis ósea, en mujer de 51 años no fumadora.",
    pathologies: [
      { name: "Adenocarcinoma de pulmón EGFR+", role: "principal", why: "Cáncer con mutación conductora." },
      { name: "Metástasis ósea y derrame", role: "asociada", why: "Estadio IV." },
      { name: "Neumonía, TBC", role: "diferencial", why: "Errores diagnósticos." },
    ],
    reasoning: [
      "Causa: mutación somática de EGFR, tabaquismo pasivo y otros factores.",
      "Mecanismo: activación constitutiva de la señal de crecimiento.",
      "Consecuencia: tumor periférico con metástasis.",
    ],
    epidemiology:
      "Entre el 10 y 25 % de los cánceres de pulmón ocurre en no fumadores, más en mujeres y con adenocarcinoma. Las mutaciones EGFR y ALK son más frecuentes en este grupo. La terapia dirigida mejoró mucho la sobrevida.",
    management: [
      "Tos que no cede: imagen.",
      "Biopsia con molecular.",
      "Terapia dirigida.",
      "Paliativos.",
    ],
    sources: ["Instituto Nacional del Cáncer — Cáncer de pulmón.", "NCCN — Non-Small Cell Lung Cancer Guidelines."],
    pearls: ["No fumar no excluye.", "Pedí estudio molecular.", "Tos de más de 3 semanas: radiografía."],
    pitfalls: ["Antibióticos repetidos.", "Quimio sin molecular."],
    tribunal: [
      qa("¿Qué mutaciones conductoras se buscan?", "EGFR, ALK, ROS1, BRAF, KRAS, RET, MET y NTRK, además de PD-L1."),
      qa("¿Qué es la terapia dirigida?", "Fármacos que bloquean una alteración molecular específica del tumor."),
      qa("¿Qué factores de riesgo hay en no fumadores?", "Tabaquismo pasivo, radón, asbesto, contaminación y humo de biomasa."),
    ],
  },
};
