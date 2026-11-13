import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tiroiditisSubaguda: ClinicalCase = {
  id: "tiroiditis-subaguda",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Hace tres semanas tuvo un cuadro gripal fuerte." },
  frequency: "poco-frecuente",
  intro: "“Me duele mucho el cuello adelante, el dolor me va al oído, tengo palpitaciones y estoy nerviosa.”",
  vitals: { TA: "132/74 mmHg", FC: "108 lpm", "T°": "37,9 °C", Peso: "60 kg" },
  anamnesis: [
    act("dolor", "¿Dónde duele y hacia dónde va?", "clave", "“Adelante del cuello, se me va a la mandíbula y al oído.”", "Dolor tiroideo irradiado."),
    act("viral", "¿Estuvo enferma hace poco?", "clave", "“Un cuadro gripal hace tres semanas.”", "Desencadenante viral."),
    act("tirotoxicosis", "¿Palpitaciones, calor, temblor, bajó de peso?", "clave", "“Todo eso, dos kilos.”", "Tirotoxicosis."),
    act("yodo", "¿Recibió contraste, amiodarona o yodo?", "util", "“No.”", "Otras causas."),
    act("embarazo", "¿Tuvo un parto reciente?", "util", "“No.”", "Tiroiditis posparto."),
    act("trabajo", "¿Qué hace?", "neutro", "“Soy cajera.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Palpación tiroidea", "clave", "Tiroides aumentada, firme y muy dolorosa.", "Tiroiditis subaguda."),
    act("ojos", "Ojos", "clave", "Sin exoftalmos.", "No es Graves."),
    act("temblor", "Temblor fino", "util", "Presente.", "Adrenérgico."),
  ],
  studies: [
    study("Laboratorio", "tiroideo", "TSH, T4 libre", "clave", "TSH suprimida; T4L alta.", "Tirotoxicosis."),
    study("Laboratorio", "vsg", "Eritrosedimentación y PCR", "clave", "VSG 88 mm.", "Inflamación."),
    study("Imágenes", "captacion", "Captación tiroidea de iodo", "util", "Captación casi nula.", "Destrucción, no hiperproducción."),
    study("Otros", "puncion", "Punción con aguja fina", "innecesario", "No se realizó.", "Sin nódulo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("de-quervain", "Tiroiditis subaguda granulomatosa (de De Quervain)", true, "Dolor tiroideo tras cuadro viral, tirotoxicosis, VSG muy alta y captación baja."),
      dx("graves", "Enfermedad de Graves", false, "Captación alta y sin dolor."),
      dx("hashimoto", "Hashimoto", false, "No duele ni sube la VSG."),
      dx("hemorragia-nodulo", "Hemorragia en un nódulo", false, "Sin nódulo y con VSG alta."),
      dx("faringitis", "Faringitis", false, "La tiroides es la que duele."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aine", "AINE en dosis antiinflamatorias", "clave", "Primera línea para el dolor."),
      mg("betabloq", "Propranolol para los síntomas adrenérgicos", "clave", "Control sintomático."),
      mg("prednisona", "Prednisona si el dolor no cede con AINE", "util", "Respuesta rápida."),
      mg("seguimiento", "Control de TSH por fase hipotiroidea posterior", "clave", "Evolución trifásica."),
      mg("metimazol", "Metimazol", "riesgoso", "No hay síntesis aumentada; no sirve."),
      mg("iodo-radiactivo", "Iodo radiactivo", "riesgoso", "Captación nula y cuadro transitorio."),
    ],
  },
  debrief: {
    diagnosis: "Tiroiditis subaguda granulomatosa (De Quervain) en fase tirotóxica, en mujer de 41 años.",
    pathologies: [
      { name: "Tiroiditis subaguda", role: "principal", why: "Inflamación posviral de la tiroides." },
      { name: "Tirotoxicosis transitoria", role: "asociada", why: "Liberación de hormona almacenada." },
      { name: "Graves, Hashimoto", role: "diferencial", why: "Otras tiroidopatías." },
    ],
    reasoning: [
      "Causa: infección viral previa.",
      "Mecanismo: destrucción folicular con liberación de hormona preformada.",
      "Consecuencia: tirotoxicosis, luego hipotiroidismo transitorio y recuperación.",
    ],
    epidemiology:
      "Es la causa más frecuente de tiroides dolorosa. Predomina en mujeres de 30 a 50 años y suele seguir a infecciones respiratorias virales. La mayoría recupera la función tiroidea en meses.",
    management: [
      "Clínica y VSG.",
      "Captación baja.",
      "AINE y betabloqueante.",
      "Seguimiento de TSH.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Tiroiditis.", "ATA — Guidelines for Hyperthyroidism and Other Causes of Thyrotoxicosis."],
    pearls: ["Tiroides dolorosa tras virosis.", "Captación baja.", "No dar antitiroideos."],
    pitfalls: ["Metimazol.", "Confundir con faringitis."],
    tribunal: [
      qa("¿Cuáles son las fases de la tiroiditis subaguda?", "Tirotoxicosis, hipotiroidismo transitorio y recuperación de la función."),
      qa("¿Por qué no sirve el metimazol?", "Porque la tirotoxicosis es por destrucción, no por aumento de síntesis."),
      qa("¿Qué otra tiroiditis cursa con captación baja?", "La tiroiditis posparto y la silente, que son indoloras."),
    ],
  },
};
