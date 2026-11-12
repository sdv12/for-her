import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const talasemiaMenor: ClinicalCase = {
  id: "talasemia-menor-beta",
  level: 1,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Familia de origen italiano. Lleva un año con hierro sin mejorar. Planea un embarazo." },
  frequency: "frecuente",
  intro: "“Me dijeron que tengo anemia y tomé hierro un año. Sigo igual. Me siento bien.”",
  vitals: { TA: "112/70 mmHg", FC: "74 lpm", "T°": "36,4 °C", "SatO₂": "99 %", Peso: "58 kg" },
  anamnesis: [
    act("hierro", "¿Tomaste hierro? ¿Mejoró?", "clave", "“Un año, sin cambios.”", "Falta de respuesta."),
    act("familia", "¿Familiares con anemia?", "clave", "“Mi papá y mi abuela.”", "Herencia."),
    act("sangrado", "¿Menstruaciones abundantes o sangrado?", "clave", "“Normales.”", "Ferropenia."),
    act("sintomas", "¿Cansancio o ictericia?", "util", "“No.”", "Rasgo leve."),
    act("pareja", "¿Tu pareja se estudió?", "util", "“No.”", "Riesgo de talasemia mayor."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy maestra.”", "No orienta."),
  ],
  exam: [
    act("general", "Palidez y piel", "clave", "Leve palidez.", "Anemia leve."),
    act("bazo", "Bazo", "clave", "No palpable.", "Rasgo."),
    act("facie", "Facies y huesos", "util", "Normal.", "Excluye formas mayores."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con índices", "clave", "Hb 10,9; VCM 63; glóbulos rojos 5,9 millones; RDW normal.", "Mentzer menor de 13."),
    study("Laboratorio", "ferritina", "Ferritina", "clave", "Normal.", "Sin ferropenia."),
    study("Laboratorio", "electroforesis", "Electroforesis de hemoglobina", "clave", "HbA2 5,2 %.", "Beta talasemia menor."),
    study("Otros", "mo", "Médula ósea", "innecesario", "No se realizó.", "No hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("talasemia", "Beta talasemia menor (rasgo talasémico)", true, "Microcitosis marcada con glóbulos rojos altos, ferritina normal y HbA2 alta."),
      dx("ferropenia", "Anemia ferropénica", false, "Ferritina normal."),
      dx("cronica", "Anemia de enfermedad crónica", false, "No tiene enfermedad crónica."),
      dx("sideroblastica", "Sideroblástica", false, "Electroforesis típica."),
      dx("intermedia", "Talasemia intermedia", false, "Sin esplenomegalia ni hemólisis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender el hierro", "clave", "Riesgo de sobrecarga."),
      mg("pareja", "Estudiar a la pareja y asesoramiento genético", "clave", "Riesgo de hijo con talasemia mayor."),
      mg("folico", "Ácido fólico preconcepcional", "clave", "Embarazo."),
      mg("explicar", "Explicar que es benigno", "util", "Evita estudios innecesarios."),
      mg("hierro-ev", "Hierro EV", "riesgoso", "Sobrecarga."),
      mg("transfundir", "Transfundir", "riesgoso", "No corresponde."),
    ],
  },
  debrief: {
    diagnosis: "Beta talasemia menor en mujer de 26 años, tratada de manera errónea con hierro.",
    pathologies: [
      { name: "Beta talasemia menor", role: "principal", why: "Rasgo heterocigota." },
      { name: "Hierro innecesario", role: "asociada", why: "Error frecuente." },
      { name: "Ferropenia, anemia crónica", role: "diferencial", why: "Microcíticas." },
    ],
    reasoning: [
      "Causa: mutación de un gen de la cadena beta.",
      "Mecanismo: menor síntesis de beta globina.",
      "Consecuencia: microcitosis con anemia leve, sin síntomas.",
    ],
    epidemiology:
      "Es frecuente en personas con ascendencia mediterránea, comunes en Argentina por la inmigración italiana y española. Suele confundirse con ferropenia y llevar a tratamientos con hierro innecesarios. Si los dos miembros de la pareja tienen el rasgo, hay un 25 % de probabilidad de un hijo con talasemia mayor.",
    management: [
      "Índices.",
      "Ferritina.",
      "Electroforesis.",
      "Consejo genético.",
    ],
    sources: ["Sociedad Argentina de Hematología — Talasemias.", "Thalassaemia International Federation — Guidelines."],
    pearls: ["VCM muy bajo con glóbulos rojos altos.", "Ferritina normal.", "HbA2 alta."],
    pitfalls: ["Dar hierro.", "No estudiar a la pareja."],
    tribunal: [
      qa("¿Qué es el índice de Mentzer?", "VCM dividido por el recuento de glóbulos rojos: menos de 13 sugiere talasemia; más de 13, ferropenia."),
      qa("¿Qué diferencia hay entre alfa y beta talasemia?", "En la alfa la electroforesis puede ser normal; en la beta, sube la HbA2."),
      qa("¿Qué manifestaciones tiene la talasemia mayor?", "Anemia grave, esplenomegalia, deformidades óseas y dependencia de transfusiones."),
    ],
  },
};
