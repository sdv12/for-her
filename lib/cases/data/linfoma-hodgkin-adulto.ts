import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const linfomaHodgkinAdulto: ClinicalCase = {
  id: "linfoma-hodgkin-adulto-mayor",
  level: 3,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Jubilado. Picazón generalizada hace meses que no mejora con antialérgicos." },
  frequency: "poco-frecuente",
  intro: "“Me pica todo el cuerpo, tengo sudores de noche que empapan la cama y un bulto en la axila. Cuando tomo vino me duele el bulto.”",
  vitals: { TA: "128/78 mmHg", FC: "88 lpm", "T°": "37,9 °C", Peso: "70 kg" },
  anamnesis: [
    act("b", "¿Fiebre, sudores, pérdida de peso?", "clave", "“Sudores de noche y bajé 8 kilos.”", "Síntomas B."),
    act("prurito", "¿Desde cuándo la picazón?", "clave", "“Seis meses.”", "Prurito como síntoma."),
    act("alcohol", "¿Le duele el bulto con alcohol?", "clave", "“Sí.”", "Signo raro pero típico."),
    act("infecciones", "¿Infecciones recientes?", "util", "“No.”", "Adenopatía reactiva."),
    act("tbc", "¿Contacto con tuberculosis?", "util", "“No.”", "Diferencial."),
    act("hobby", "¿Qué hace?", "neutro", "“Pinto cuadros.”", "No orienta."),
  ],
  exam: [
    act("ganglios", "Ganglios", "clave", "Axilar izquierdo de 4 cm y supraclavicular de 2 cm, elásticos.", "Linfoma."),
    act("bazo", "Bazo", "clave", "Palpable.", "Extensión."),
    act("piel", "Piel", "util", "Excoriaciones.", "Prurito."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia excisional de ganglio", "clave", "Células de Reed-Sternberg CD15 y CD30 positivas.", "Hodgkin clásico."),
    study("Imágenes", "pet", "PET-TC", "clave", "Compromiso supra e infradiafragmático y esplénico.", "Estadio III."),
    study("Laboratorio", "lab", "Hemograma, VSG, albúmina, VIH, hepatitis", "util", "VSG 70; albúmina 3,2.", "Factores pronósticos."),
    study("Otros", "paaf-sola", "Diagnosticar con punción con aguja fina", "riesgoso", "No se hizo.", "Insuficiente para el diagnóstico de linfoma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hodgkin", "Linfoma de Hodgkin clásico estadio III con síntomas B", true, "Adenopatías, síntomas B, prurito, dolor con alcohol, Reed-Sternberg y PET con compromiso a ambos lados del diafragma."),
      dx("lnh", "Linfoma no Hodgkin", false, "Células de Reed-Sternberg."),
      dx("tbc", "Tuberculosis ganglionar", false, "Biopsia de linfoma."),
      dx("metastasis", "Metástasis de carcinoma", false, "Biopsia de linfoma."),
      dx("dermatitis", "Dermatitis pruriginosa", false, "El prurito es paraneoplásico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("quimio", "Quimioterapia (ABVD u otros esquemas según edad)", "clave", "Alta tasa de curación."),
      mg("funcion", "Evaluar función cardíaca y pulmonar antes", "clave", "Toxicidad de antraciclinas y bleomicina."),
      mg("hematologia", "Derivación a hematología", "clave", "Manejo."),
      mg("vacunas", "Vacunas antes del tratamiento", "util", "Inmunosupresión."),
      mg("corticoides-solos", "Corticoides solos para la fiebre", "riesgoso", "Dificultan el diagnóstico y no curan."),
      mg("antihistaminicos", "Seguir con antihistamínicos", "riesgoso", "Retrasa el diagnóstico."),
    ],
  },
  debrief: {
    diagnosis: "Linfoma de Hodgkin clásico estadio III con síntomas B, en varón de 64 años.",
    pathologies: [
      { name: "Linfoma de Hodgkin", role: "principal", why: "Neoplasia linfoide con Reed-Sternberg." },
      { name: "Síntomas B y prurito", role: "asociada", why: "Pronóstico." },
      { name: "LNH, TBC", role: "diferencial", why: "Otras adenopatías." },
    ],
    reasoning: [
      "Causa: transformación de linfocitos B, a veces relacionada con Epstein-Barr.",
      "Mecanismo: pocas células tumorales rodeadas de inflamación.",
      "Consecuencia: adenopatías, síntomas B y prurito.",
    ],
    epidemiology:
      "El Hodgkin tiene dos picos: adultos jóvenes y mayores de 55. En mayores el pronóstico es peor y la toxicidad mayor. El prurito persistente sin causa puede ser la primera manifestación.",
    management: [
      "Biopsia excisional.",
      "PET.",
      "Quimioterapia adaptada.",
      "Soporte.",
    ],
    sources: ["Sociedad Argentina de Hematología — Linfoma de Hodgkin.", "NCCN — Hodgkin Lymphoma Guidelines."],
    pearls: ["Prurito y sudores.", "Dolor con alcohol.", "Biopsia excisional."],
    pitfalls: ["Punción fina.", "Corticoides antes de la biopsia."],
    tribunal: [
      qa("¿Qué son los síntomas B?", "Fiebre, sudoración nocturna y pérdida de más del 10 % del peso en 6 meses."),
      qa("¿Qué es la clasificación de Ann Arbor?", "Estadificación según regiones ganglionares y su relación con el diafragma."),
      qa("¿Qué toxicidad tiene la bleomicina?", "Fibrosis pulmonar, más en mayores y con oxígeno en altas concentraciones."),
    ],
  },
};
