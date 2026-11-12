import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemocromatosis: ClinicalCase = {
  id: "hemocromatosis-hereditaria-cirrosis",
  level: 3,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Diabetes reciente. Abuelos de origen irlandés. Toma alcohol los fines de semana." },
  frequency: "poco-frecuente",
  intro: "“Me duelen los nudillos, estoy muy cansado y me dicen que estoy bronceado aunque no tomo sol.”",
  vitals: { TA: "122/76 mmHg", FC: "78 lpm", "T°": "36,4 °C", "SatO₂": "98 %", Glucemia: "184 mg/dl" },
  anamnesis: [
    act("articular", "¿Qué articulaciones?", "clave", "“Los nudillos del índice y medio.”", "Típico."),
    act("familia", "¿Familiares con hígado o diabetes?", "clave", "“Mi tío murió de cirrosis.”", "Herencia."),
    act("libido", "¿Problemas sexuales?", "clave", "“Bajo deseo.”", "Hipogonadismo."),
    act("transfusiones", "¿Transfusiones o hierro?", "util", "“No.”", "Sobrecarga secundaria."),
    act("alcohol", "¿Cuánto alcohol?", "util", "“Vino los fines de semana.”", "Agrava."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Pádel.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Hiperpigmentación grisácea.", "Depósito."),
    act("higado", "Hígado", "clave", "Hepatomegalia firme.", "Daño hepático."),
    act("manos", "Manos", "util", "Artropatía en metacarpofalángicas 2 y 3.", "Típica."),
  ],
  studies: [
    study("Laboratorio", "hierro", "Saturación de transferrina y ferritina", "clave", "Saturación 82 %; ferritina 2.400.", "Sobrecarga."),
    study("Laboratorio", "hfe", "Mutación HFE", "clave", "C282Y homocigota.", "Confirma."),
    study("Imágenes", "rmn", "RM hepática o elastografía", "clave", "Hierro elevado; fibrosis avanzada.", "Estadifica."),
    study("Imágenes", "eco", "Ecocardiograma y estudio hormonal", "util", "Leve disfunción diastólica; testosterona baja.", "Órganos."),
    study("Otros", "transfusion", "Indicar hierro por cansancio", "riesgoso", "No se realizó.", "Empeora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hh", "Hemocromatosis hereditaria con fibrosis hepática avanzada, diabetes e hipogonadismo", true, "Saturación alta, ferritina, C282Y y daño de órganos."),
      dx("alcohol", "Hepatopatía alcohólica", false, "No explica saturación y genética."),
      dx("addison", "Addison", false, "Hiperpigmentación por hierro."),
      dx("ar", "Artritis reumatoidea", false, "Patrón típico de hemocromatosis."),
      dx("dm2", "Diabetes tipo 2", false, "Es secundaria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("flebotomia", "Flebotomías periódicas hasta ferritina objetivo", "clave", "Tratamiento principal."),
      mg("alcohol", "Evitar alcohol, suplementos de hierro y vitamina C", "clave", "Reduce daño."),
      mg("hcc", "Vigilancia de hepatocarcinoma con ecografía cada 6 meses", "clave", "Fibrosis avanzada."),
      mg("familia", "Estudiar a familiares de primer grado", "clave", "Diagnóstico temprano."),
      mg("mariscos", "Evitar mariscos crudos", "util", "Riesgo de Vibrio vulnificus."),
      mg("hierro", "Suplemento de hierro", "riesgoso", "Agrava."),
    ],
  },
  debrief: {
    diagnosis: "Hemocromatosis hereditaria HFE C282Y con fibrosis hepática avanzada, diabetes e hipogonadismo, en varón de 54 años.",
    pathologies: [
      { name: "Hemocromatosis hereditaria", role: "principal", why: "Sobrecarga de hierro." },
      { name: "Fibrosis, diabetes, hipogonadismo", role: "asociada", why: "Daño de órganos." },
      { name: "Alcohol, Addison, AR", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutación del gen HFE.",
      "Mecanismo: déficit de hepcidina y absorción excesiva de hierro.",
      "Consecuencia: depósito en hígado, páncreas, corazón, piel y gónadas.",
    ],
    epidemiology:
      "Es una de las enfermedades genéticas más comunes en personas con ascendencia del norte de Europa. Los varones se manifiestan antes, porque las mujeres pierden hierro con la menstruación. Detectada a tiempo, la expectativa de vida es normal.",
    management: [
      "Saturación de transferrina.",
      "HFE.",
      "Flebotomías.",
      "Vigilancia y familia.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Enfermedades metabólicas hepáticas.", "EASL — Clinical Practice Guidelines on Haemochromatosis."],
    pearls: ["Diabetes bronceada.", "Saturación mayor de 45 %.", "Flebotomía."],
    pitfalls: ["Pensar solo en alcohol.", "No estudiar a la familia."],
    tribunal: [
      qa("¿Cómo diferenciás ferritina alta por inflamación?", "En la sobrecarga la saturación de transferrina está alta; en la inflamación suele ser normal."),
      qa("¿Qué órganos afecta?", "Hígado, páncreas, corazón, hipófisis y gónadas, piel y articulaciones."),
      qa("¿Qué infección es grave en sobrecarga de hierro?", "Vibrio vulnificus y Yersinia."),
    ],
  },
};
