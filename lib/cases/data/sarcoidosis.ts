import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sarcoidosis: ClinicalCase = {
  id: "sarcoidosis-pulmonar",
  level: 3,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "No fuma. Docente. Sin contacto con TBC conocido." },
  frequency: "poco-frecuente",
  intro: "“Hace meses tengo tos seca y me canso. Me salieron unas manchas rojas dolorosas en las piernas y me duelen los tobillos.”",
  vitals: { TA: "118/72 mmHg", FC: "80 lpm", FR: "18 rpm", "T°": "37,4 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("respiratorio", "¿Tos, disnea, cuánto tiempo?", "clave", "“Tres meses de tos seca.”", "Compromiso pulmonar."),
    act("piel", "¿Cómo son las manchas?", "clave", "“Nódulos rojos dolorosos en las canillas.”", "Eritema nudoso."),
    act("tbc", "¿Contacto con TBC, sudoración, pérdida de peso?", "clave", "“No.”", "Diferencial principal."),
    act("ojos", "¿Ojo rojo o visión borrosa?", "util", "“A veces me arden.”", "Uveítis."),
    act("exposicion", "¿Exposición a aves, hongos o polvos?", "util", "“No.”", "Neumonitis por hipersensibilidad."),
    act("materia", "¿Qué enseñás?", "neutro", "“Biología.”", "No orienta."),
  ],
  exam: [
    act("piel-ex", "Piel", "clave", "Nódulos eritematosos dolorosos en región pretibial.", "Eritema nudoso."),
    act("articular", "Tobillos", "clave", "Periartritis bilateral.", "Síndrome de Löfgren."),
    act("pulmon", "Pulmón", "util", "Normal.", "Frecuente pese a imágenes."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía y TC de tórax", "clave", "Adenopatías hiliares bilaterales simétricas; nódulos perilinfáticos.", "Típico."),
    study("Laboratorio", "lab", "Calcio, ECA, función renal, hepatograma", "clave", "Calcio 10,8; ECA elevada.", "Apoya."),
    study("Otros", "ebus", "Biopsia de ganglio por EBUS si la clínica no es típica", "util", "Granulomas no caseificantes.", "Confirma y excluye TBC."),
    study("Otros", "espiro", "Espirometría y DLCO, y evaluación oftalmológica y ECG", "clave", "Leve restricción; uveítis anterior.", "Órganos."),
    study("Otros", "corticoides-sin-dx", "Corticoides antes de excluir TBC", "riesgoso", "No se realizó.", "Puede diseminar una TBC."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sarcoidosis", "Sarcoidosis con síndrome de Löfgren", true, "Adenopatías hiliares bilaterales, eritema nudoso, periartritis de tobillos y granulomas no caseificantes."),
      dx("tbc", "Tuberculosis", false, "Granulomas sin caseificación ni bacilos."),
      dx("linfoma", "Linfoma", false, "La biopsia muestra granulomas."),
      dx("hipersensibilidad", "Neumonitis por hipersensibilidad", false, "Sin exposición; adenopatías hiliares."),
      dx("histoplasmosis", "Histoplasmosis", false, "Sin hongos en la biopsia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aines", "AINE para Löfgren y observación", "clave", "Suele remitir sola."),
      mg("ojos", "Tratar la uveítis con oftalmología", "clave", "Riesgo visual."),
      mg("controles", "Controles de calcio, pulmón, corazón y ojos", "clave", "Detecta progresión."),
      mg("corticoides-si", "Corticoides si hay compromiso de órgano grave", "util", "Selectivo."),
      mg("vitamina-d", "Suplementar vitamina D en altas dosis", "riesgoso", "Empeora la hipercalcemia."),
      mg("corticoides-todos", "Corticoides a todos de entrada", "riesgoso", "Efectos adversos sin necesidad."),
    ],
  },
  debrief: {
    diagnosis: "Sarcoidosis con síndrome de Löfgren y uveítis anterior, en mujer de 36 años.",
    pathologies: [
      { name: "Sarcoidosis", role: "principal", why: "Enfermedad granulomatosa sistémica." },
      { name: "Uveítis e hipercalcemia", role: "asociada", why: "Compromiso de órganos." },
      { name: "TBC, linfoma, histoplasmosis", role: "diferencial", why: "Otros granulomas o adenopatías." },
    ],
    reasoning: [
      "Causa: desconocida, con predisposición genética y ambiental.",
      "Mecanismo: granulomas no caseificantes por respuesta inmune exagerada.",
      "Consecuencia: adenopatías, compromiso pulmonar, ocular, cutáneo, cardíaco y del calcio.",
    ],
    epidemiology:
      "Afecta sobre todo a adultos de 20 a 40 años. En Argentina, la tuberculosis es el diferencial principal, y debe excluirse antes de inmunosuprimir. El síndrome de Löfgren tiene buen pronóstico y suele remitir en meses.",
    management: [
      "Imagen.",
      "Excluir TBC.",
      "Biopsia si es necesaria.",
      "Evaluar órganos.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Enfermedades intersticiales.", "American Thoracic Society — Diagnosis and Detection of Sarcoidosis."],
    pearls: ["Adenopatías hiliares bilaterales.", "Eritema nudoso con tobillos.", "Siempre excluir TBC."],
    pitfalls: ["Corticoides sin excluir TBC.", "Dar vitamina D."],
    tribunal: [
      qa("¿Qué es el síndrome de Löfgren?", "Fiebre, eritema nudoso, adenopatías hiliares bilaterales y periartritis de tobillos."),
      qa("¿Por qué hay hipercalcemia?", "Los macrófagos del granuloma activan la vitamina D."),
      qa("¿Qué compromiso es más grave?", "El cardíaco, por arritmias y muerte súbita, y el neurológico."),
    ],
  },
};
