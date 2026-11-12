import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerProstataCompresionMedular: ClinicalCase = {
  id: "compresion-medular-cancer-prostata",
  level: 3,
  area: "Oncología",
  setting: "Guardia",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Nunca se controló la próstata. Dolor de espalda hace 2 meses." },
  frequency: "frecuente",
  intro: "“Hace dos meses me duele la espalda, peor de noche y acostado. Desde ayer se me aflojan las piernas y no puedo orinar.”",
  vitals: { TA: "138/80 mmHg", FC: "88 lpm", "T°": "36,6 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor?", "clave", "“Peor acostado, no se calma.”", "Bandera roja."),
    act("neuro", "¿Debilidad, hormigueo, orina?", "clave", "“Piernas flojas, no orino.”", "Compresión medular."),
    act("prostata", "¿Problemas para orinar antes? ¿PSA?", "clave", "“Chorro fino hace años; nunca me hice PSA.”", "Cáncer de próstata."),
    act("peso", "¿Pérdida de peso?", "util", "“Siete kilos.”", "Constitucional."),
    act("otros", "¿Otro dolor de huesos?", "util", "“Caderas.”", "Metástasis."),
    act("jubilado", "¿A qué te dedicabas?", "neutro", "“Ferretero.”", "No orienta."),
  ],
  exam: [
    act("neuro-ex", "Fuerza, sensibilidad, reflejos", "clave", "Paraparesia 3/5, nivel sensitivo T10, hiperreflexia.", "Compresión."),
    act("globo", "Vejiga", "clave", "Globo vesical.", "Retención."),
    act("tacto", "Tacto rectal", "util", "Próstata pétrea e irregular.", "Cáncer."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de toda la columna urgente", "clave", "Metástasis en T9 con compresión medular.", "Confirma."),
    study("Laboratorio", "psa", "PSA, calcio, función renal, fosfatasa alcalina", "clave", "PSA 680; FAL alta.", "Origen."),
    study("Otros", "biopsia", "Biopsia de próstata luego", "util", "Adenocarcinoma.", "Confirma."),
    study("Imágenes", "rx-sola", "Solo radiografía y analgésicos", "riesgoso", "No se realizó.", "Paraplejia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("compresion", "Compresión medular por metástasis de cáncer de próstata", true, "Dolor nocturno, paraparesia, nivel, retención, PSA alto y RM."),
      dx("hernia", "Hernia discal", false, "Nivel sensitivo y metástasis."),
      dx("hpb", "Hiperplasia prostática", false, "PSA y metástasis."),
      dx("guillain", "Guillain-Barré", false, "Hiperreflexia y nivel."),
      dx("mieloma", "Mieloma", false, "PSA y próstata."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dexametasona", "Dexametasona EV inmediata", "clave", "Reduce edema."),
      mg("radio-cirugia", "Radioterapia o cirugía urgente", "clave", "Preserva función."),
      mg("hormonal", "Bloqueo hormonal", "clave", "Tumor hormonosensible."),
      mg("sonda", "Sonda vesical", "clave", "Retención."),
      mg("esperar", "Esperar la biopsia para actuar", "riesgoso", "Paraplejia."),
      mg("caminar", "Hacerlo caminar", "riesgoso", "Inestabilidad."),
    ],
  },
  debrief: {
    diagnosis: "Compresión medular metastásica en T9 por cáncer de próstata, en varón de 74 años.",
    pathologies: [
      { name: "Compresión medular", role: "principal", why: "Emergencia oncológica." },
      { name: "Cáncer de próstata metastásico", role: "asociada", why: "Causa." },
      { name: "Hernia, Guillain-Barré", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: metástasis vertebral.",
      "Mecanismo: el tumor comprime la médula.",
      "Consecuencia: dolor, paraplejia e incontinencia.",
    ],
    epidemiology:
      "Es una emergencia frecuente en cánceres de próstata, mama y pulmón. La función al momento del diagnóstico define el pronóstico. El dolor de espalda nocturno en una persona mayor es una bandera roja.",
    management: [
      "Sospecha.",
      "RM urgente.",
      "Dexametasona.",
      "Radioterapia o cirugía.",
    ],
    sources: ["Instituto Nacional del Cáncer — Emergencias oncológicas.", "NICE — Metastatic Spinal Cord Compression Guideline."],
    pearls: ["Dolor de espalda nocturno.", "RM de toda la columna.", "Dexametasona ya."],
    pitfalls: ["Esperar.", "Solo radiografía."],
    tribunal: [
      qa("¿Qué tumores dan metástasis óseas?", "Mama, próstata, pulmón, riñón y tiroides."),
      qa("¿Por qué RM de toda la columna?", "Porque a menudo hay varios niveles comprometidos."),
      qa("¿Qué es el bloqueo androgénico?", "Suprimir la testosterona con análogos de GnRH o antagonistas."),
    ],
  },
};
