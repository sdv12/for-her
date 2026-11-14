import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bocioMultinodularToxico: ClinicalCase = {
  id: "bocio-multinodular-toxico",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 69, ageUnit: "años", sex: "F", context: "Bocio desde joven, nunca controlado. Le hicieron una TC con contraste hace un mes." },
  frequency: "frecuente",
  intro: "“Desde hace unas semanas tengo palpitaciones, duermo mal, bajé de peso y estoy nerviosa.”",
  vitals: { TA: "148/72 mmHg", FC: "116 lpm irregular", "T°": "37,0 °C", Peso: "58 kg" },
  anamnesis: [
    act("bocio", "¿Desde cuándo tiene el bulto en el cuello?", "clave", "“Desde los 30, creció de a poco.”", "Bocio de larga data."),
    act("contraste", "¿Le hicieron estudios con contraste?", "clave", "“Una tomografía hace un mes.”", "Yodo que desencadena (Jod-Basedow)."),
    act("sintomas", "¿Palpitaciones, calor, temblor?", "clave", "“Sí, y bajé 4 kilos.”", "Tirotoxicosis."),
    act("compresion", "¿Le cuesta tragar o respirar?", "util", "“Un poco al tragar.”", "Compresión."),
    act("ojos", "¿Problemas en los ojos?", "util", "“No.”", "Graves."),
    act("hobby", "¿Qué hace?", "neutro", "“Cuido mi jardín.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Tiroides", "clave", "Bocio multinodular grande, sin soplo.", "Bocio multinodular."),
    act("pulso", "Pulso", "clave", "Irregular, 116.", "FA."),
    act("ojos-ex", "Ojos", "util", "Sin orbitopatía.", "No es Graves."),
  ],
  studies: [
    study("Laboratorio", "tiroideo", "TSH, T4L, T3 y TRAb", "clave", "TSH suprimida; T4L y T3 altas; TRAb negativos.", "Hipertiroidismo no autoinmune."),
    study("Imágenes", "centellograma", "Centellograma tiroideo", "clave", "Varios nódulos calientes con supresión del resto.", "Bocio multinodular tóxico."),
    study("Electrofisiología", "ecg", "ECG", "util", "Fibrilación auricular.", "Complicación."),
    study("Otros", "punzar-todos", "Punzar todos los nódulos calientes", "innecesario", "No se realizó.", "Los calientes casi nunca son malignos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bmnt", "Bocio multinodular tóxico desencadenado por contraste iodado, con fibrilación auricular", true, "Bocio antiguo, tirotoxicosis tras contraste, nódulos calientes múltiples y TRAb negativos."),
      dx("graves", "Enfermedad de Graves", false, "TRAb negativos y nódulos calientes."),
      dx("tiroiditis", "Tiroiditis", false, "Captación focal alta."),
      dx("adenoma", "Adenoma tóxico único", false, "Son varios nódulos."),
      dx("cancer", "Cáncer de tiroides", false, "Nódulos hiperfuncionantes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metimazol", "Metimazol y betabloqueante", "clave", "Control del hipertiroidismo y la FC."),
      mg("anticoagular", "Anticoagular por la FA según riesgo", "clave", "Prevención de ACV."),
      mg("definitivo", "Tratamiento definitivo con iodo radiactivo o cirugía", "clave", "No remite solo."),
      mg("yodo", "Evitar nuevas cargas de yodo", "util", "Desencadenante."),
      mg("solo-betabloq", "Solo betabloqueante de por vida", "riesgoso", "No trata la causa."),
      mg("yodo-dosis", "Indicar más yodo", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Bocio multinodular tóxico desencadenado por contraste iodado, con fibrilación auricular, en mujer de 69 años.",
    pathologies: [
      { name: "Bocio multinodular tóxico", role: "principal", why: "Nódulos autónomos." },
      { name: "Fibrilación auricular", role: "asociada", why: "Complicación." },
      { name: "Graves, tiroiditis", role: "diferencial", why: "Otros hipertiroidismos." },
    ],
    reasoning: [
      "Causa: nódulos autónomos en un bocio antiguo.",
      "Mecanismo: la carga de yodo del contraste aumenta la síntesis (Jod-Basedow).",
      "Consecuencia: tirotoxicosis con FA, más riesgosa en ancianos.",
    ],
    epidemiology:
      "Es la causa más frecuente de hipertiroidismo en adultos mayores, en especial en zonas con historia de déficit de yodo. El contraste y la amiodarona son desencadenantes típicos. En ancianos se presenta con FA o insuficiencia cardíaca.",
    management: [
      "TSH en FA.",
      "TRAb y centellograma.",
      "Metimazol.",
      "Tratamiento definitivo.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipertiroidismo.", "ATA — Guidelines for Hyperthyroidism and Other Causes of Thyrotoxicosis."],
    pearls: ["FA nueva: pedí TSH.", "Contraste puede desencadenarlo.", "No remite solo."],
    pitfalls: ["Solo betabloqueante.", "Punzar calientes."],
    tribunal: [
      qa("¿Qué es el fenómeno de Jod-Basedow?", "Hipertiroidismo inducido por una carga de yodo en tiroides con autonomía."),
      qa("¿Qué es el efecto Wolff-Chaikoff?", "Inhibición transitoria de la síntesis hormonal por exceso de yodo en tiroides normal."),
      qa("¿Qué significa nódulo caliente?", "Nódulo que capta más que el resto; casi siempre benigno."),
    ],
  },
};
