import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sopAdolescente: ClinicalCase = {
  id: "sop-adolescente",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 16, ageUnit: "años", sex: "F", context: "Menarca a los 11. Viene con la mamá, que también tuvo ciclos irregulares." },
  frequency: "frecuente",
  intro: "“Me viene cada tres o cuatro meses, tengo muchos granos y pelos en la cara y el pecho.”",
  vitals: { TA: "116/72 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "74 kg (talla 1,62 m)" },
  anamnesis: [
    act("ciclos", "¿Cada cuánto menstruás desde la menarca?", "clave", "“Cada tres o cuatro meses, desde hace tres años.”", "Oligomenorrea persistente más de 2 años tras la menarca."),
    act("hirsutismo", "¿Desde cuándo los pelos?", "clave", "“Desde los 13, de a poco.”", "Hiperandrogenismo gradual."),
    act("virilizacion", "¿Cambió la voz o el clítoris?", "clave", "“No.”", "Descartar tumor."),
    act("familia", "¿Familia con diabetes?", "util", "“Mi abuela.”", "Riesgo metabólico."),
    act("animo", "¿Cómo te afecta?", "util", "“Me da vergüenza.”", "Impacto emocional."),
    act("musica", "¿Qué te gusta hacer?", "neutro", "“Cantar.”", "No orienta."),
  ],
  exam: [
    act("ferriman", "Escala de Ferriman-Gallwey", "clave", "14 puntos.", "Hirsutismo."),
    act("acne", "Acné y acantosis", "clave", "Acné moderado y acantosis en el cuello.", "Hiperandrogenismo e insulinorresistencia."),
    act("imc", "IMC", "util", "28.", "Sobrepeso."),
  ],
  studies: [
    study("Laboratorio", "androgenos", "Testosterona total, 17-OHP, prolactina, TSH", "clave", "Testosterona elevada; 17-OHP, prolactina y TSH normales.", "Hiperandrogenismo bioquímico."),
    study("Laboratorio", "metabolico", "Glucemia, lípidos, HbA1c", "clave", "HbA1c 5,9.", "Prediabetes."),
    study("Laboratorio", "bhcg", "Beta-hCG si corresponde", "util", "Negativa.", "Base."),
    study("Imágenes", "eco-criterio", "Ecografía ovárica como criterio diagnóstico", "innecesario", "No se usó.", "En adolescentes no se usa como criterio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sop", "Síndrome de ovario poliquístico en la adolescencia con prediabetes", true, "Oligomenorrea más de 2 años tras la menarca, hirsutismo, testosterona alta y otras causas excluidas."),
      dx("hsc-noclasica", "Hiperplasia suprarrenal no clásica", false, "17-OHP normal."),
      dx("tumor", "Tumor productor de andrógenos", false, "Sin virilización y evolución gradual."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("inmadurez", "Inmadurez del eje", false, "Persiste más de 2 años tras la menarca."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("habitos", "Cambios de alimentación y actividad física", "clave", "Primera línea."),
      mg("acos", "Anticonceptivos combinados", "clave", "Regulan ciclos y mejoran hirsutismo y acné."),
      mg("metformina", "Metformina por la prediabetes", "util", "Insulinorresistencia."),
      mg("emocional", "Abordar la imagen corporal y el ánimo", "clave", "Impacto."),
      mg("no-tratar", "Esperar a que quiera embarazarse para tratar", "riesgoso", "Riesgo endometrial y metabólico."),
      mg("dieta-extrema", "Dieta muy restrictiva", "riesgoso", "Riesgo de TCA."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de ovario poliquístico en adolescente de 16 años con hirsutismo, acné y prediabetes.",
    pathologies: [
      { name: "Síndrome de ovario poliquístico", role: "principal", why: "Hiperandrogenismo y anovulación." },
      { name: "Prediabetes e insulinorresistencia", role: "asociada", why: "Riesgo metabólico." },
      { name: "HSC no clásica, tumor", role: "diferencial", why: "Otras causas de hiperandrogenismo." },
    ],
    reasoning: [
      "Causa: genética e insulinorresistencia.",
      "Mecanismo: hiperandrogenismo ovárico y anovulación.",
      "Consecuencia: ciclos irregulares, hirsutismo, acné y riesgo metabólico y endometrial.",
    ],
    epidemiology:
      "Es la endocrinopatía más frecuente en mujeres jóvenes. En adolescentes se diagnostica solo con hiperandrogenismo y oligomenorrea persistente, no con ecografía. El abordaje metabólico es parte central.",
    management: [
      "Criterios adolescentes.",
      "Excluir otras causas.",
      "Hábitos.",
      "Anticonceptivos y metformina.",
    ],
    sources: ["Sociedad Argentina de Ginecología Infanto Juvenil — SOP en la adolescencia.", "International Evidence-based Guideline for the Assessment and Management of PCOS."],
    pearls: ["En adolescentes, no usar ecografía.", "Mirá la glucemia.", "Ciclos irregulares más de 2 años."],
    pitfalls: ["Diagnosticar por ecografía.", "No tratar."],
    tribunal: [
      qa("¿Qué son los criterios de Rotterdam?", "Dos de tres: oligoanovulación, hiperandrogenismo y ovarios poliquísticos en ecografía, en adultas."),
      qa("¿Por qué hay riesgo endometrial?", "La anovulación crónica deja al endometrio expuesto a estrógenos sin progesterona."),
      qa("¿Qué es la escala de Ferriman-Gallwey?", "Puntaje del vello en nueve zonas corporales para evaluar hirsutismo."),
    ],
  },
};
