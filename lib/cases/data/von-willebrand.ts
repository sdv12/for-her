import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vonWillebrand: ClinicalCase = {
  id: "enfermedad-von-willebrand",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 16, ageUnit: "años", sex: "F", context: "Menarca a los 12. Viene con la mamá, que también menstrúa mucho." },
  frequency: "frecuente",
  intro: "“Me vienen menstruaciones muy abundantes, cambio la toallita cada hora y estoy muy cansada. Cuando me sacaron una muela sangré dos días.”",
  vitals: { TA: "104/64 mmHg", FC: "96 lpm", "T°": "36,4 °C", Peso: "52 kg" },
  anamnesis: [
    act("menstruacion", "¿Cuánto dura y cuánto sangra?", "clave", "“Ocho días, con coágulos, mancho la cama.”", "Sangrado menstrual abundante."),
    act("otros-sangrados", "¿Sangrado de nariz, encías, después de extracciones?", "clave", "“Me sangra la nariz seguido y la muela sangró dos días.”", "Sangrado mucocutáneo."),
    act("familia", "¿Alguien en la familia sangra mucho?", "clave", "“Mi mamá tuvo que transfundirse en el parto.”", "Herencia autosómica dominante."),
    act("farmacos", "¿Toma aspirina o ibuprofeno?", "util", "“Ibuprofeno para los cólicos.”", "Empeora el sangrado."),
    act("relaciones", "¿Tenés relaciones? ¿Podés estar embarazada?", "util", "“No tuve.”", "Descartar embarazo."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Hándbol.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Piel y mucosas", "clave", "Palidez y algunos hematomas en piernas.", "Anemia y sangrado cutáneo."),
    act("articulaciones", "Articulaciones", "clave", "Normales.", "Sin hemartrosis: no hemofilia."),
    act("tiroides", "Tiroides", "util", "Normal.", "Otras causas de sangrado uterino."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y ferritina", "clave", "Hb 9,4, microcítica; ferritina 5.", "Anemia ferropénica."),
    study("Laboratorio", "coagulacion", "Plaquetas, TP, KPTT, factor VIII, antígeno y actividad de factor von Willebrand", "clave", "Plaquetas normales; KPTT levemente prolongado; FVW antígeno 32 % y actividad 28 %.", "Enfermedad de von Willebrand tipo 1."),
    study("Imágenes", "eco", "Ecografía ginecológica", "util", "Normal.", "Excluye causa estructural."),
    study("Otros", "histeroscopia", "Histeroscopia", "innecesario", "No se realizó.", "Adolescente con causa clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vwd", "Enfermedad de von Willebrand tipo 1 con anemia ferropénica", true, "Sangrado mucocutáneo y menstrual abundante desde la menarca, historia familiar y FVW bajo."),
      dx("hemofilia", "Hemofilia A", false, "Sin hemartrosis y FVW bajo."),
      dx("pti", "PTI", false, "Plaquetas normales."),
      dx("sop", "Sangrado anovulatorio por SOP", false, "Hay sangrado de otros sitios y FVW bajo."),
      dx("mioma", "Mioma", false, "Ecografía normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tranexamico", "Ácido tranexámico durante la menstruación", "clave", "Reduce el sangrado."),
      mg("hormonal", "Anticonceptivos hormonales o DIU con levonorgestrel", "clave", "Control del sangrado menstrual."),
      mg("hierro", "Hierro oral", "clave", "Anemia."),
      mg("desmopresina", "Prueba de desmopresina para procedimientos", "util", "Libera FVW."),
      mg("aines", "Ibuprofeno para los cólicos", "riesgoso", "Empeora el sangrado."),
      mg("aspirina", "Aspirina", "riesgoso", "Antiagregante."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de von Willebrand tipo 1 con sangrado menstrual abundante y anemia ferropénica, en adolescente de 16 años.",
    pathologies: [
      { name: "Enfermedad de von Willebrand", role: "principal", why: "Trastorno hereditario de la hemostasia más frecuente." },
      { name: "Anemia ferropénica", role: "asociada", why: "Pérdidas menstruales." },
      { name: "Hemofilia, PTI", role: "diferencial", why: "Otros trastornos hemorrágicos." },
    ],
    reasoning: [
      "Causa: déficit cuantitativo hereditario del factor von Willebrand.",
      "Mecanismo: falla de la adhesión plaquetaria y menor vida del factor VIII.",
      "Consecuencia: sangrado de mucosas y menstrual abundante.",
    ],
    epidemiology:
      "Es el trastorno hemorrágico hereditario más frecuente. Muchas mujeres conviven años con menstruaciones abundantes sin diagnóstico. Toda adolescente con sangrado menstrual abundante desde la menarca merece estudio de hemostasia.",
    management: [
      "Historia de sangrado.",
      "Estudio de FVW.",
      "Tranexámico y hormonal.",
      "Hierro.",
    ],
    sources: ["Sociedad Argentina de Hematología — Enfermedad de von Willebrand.", "ASH/ISTH/NHF/WFH — Guidelines on the Diagnosis of von Willebrand Disease."],
    pearls: ["Sangrado abundante desde la menarca.", "Mamá que también sangra.", "Sin AINE."],
    pitfalls: ["Asumir que es normal.", "Indicar ibuprofeno."],
    tribunal: [
      qa("¿Cómo actúa la desmopresina?", "Libera factor von Willebrand y factor VIII de las células endoteliales."),
      qa("¿Qué diferencia el sangrado plaquetario del de factores?", "El plaquetario es mucocutáneo e inmediato; el de factores, en articulaciones y músculos y tardío."),
      qa("¿Qué valores pueden variar el FVW?", "Grupo sanguíneo 0, estrés, embarazo, inflamación y estrógenos."),
    ],
  },
};
