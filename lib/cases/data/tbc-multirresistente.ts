import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcMultirresistente: ClinicalCase = {
  id: "tuberculosis-multirresistente",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 30, ageUnit: "años", sex: "M", context: "Tuberculosis hace 3 años; abandonó el tratamiento al segundo mes. Vive en un barrio popular de Buenos Aires." },
  frequency: "poco-frecuente",
  intro: "“Volví a toser con sangre, tengo fiebre de tarde y bajé mucho de peso. Como la otra vez.”",
  vitals: { TA: "108/66 mmHg", FC: "102 lpm", FR: "22 rpm", "T°": "38,1 °C", "SatO₂": "93 %", Peso: "54 kg" },
  anamnesis: [
    act("abandono", "¿Completaste el tratamiento anterior?", "clave", "“No, dejé a los dos meses.”", "Riesgo de resistencia."),
    act("contactos", "¿Con quién vivís? ¿Hay chicos?", "clave", "“Con seis personas, dos chicos.”", "Contactos."),
    act("vih", "¿Test de VIH?", "clave", "“Negativo hace un año.”", "Se repite."),
    act("diabetes", "¿Diabetes, alcohol, drogas?", "util", "“Alcohol.”", "Factores."),
    act("motivo", "¿Por qué dejaste?", "util", "“Me sentía mejor y trabajaba.”", "Barreras."),
    act("barrio", "¿Hace cuánto vivís ahí?", "neutro", "“Diez años.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Crepitantes apicales bilaterales.", "Afectación pulmonar."),
    act("nutricion", "Estado nutricional", "clave", "IMC 18.", "Desnutrición."),
    act("ganglios", "Ganglios", "util", "Sin adenopatías.", "Extrapulmonar."),
  ],
  studies: [
    study("Microbiología", "xpert", "Xpert MTB/RIF y cultivo con sensibilidad", "clave", "MTB detectado; resistencia a rifampicina; isoniazida resistente en cultivo.", "Multirresistente."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Cavidades apicales bilaterales.", "Extensión."),
    study("Laboratorio", "lab", "VIH, hepatograma, función renal, audiometría, ECG", "clave", "VIH negativo; QT normal.", "Antes de los fármacos."),
    study("Otros", "repetir", "Repetir el esquema estándar con HRZE", "riesgoso", "No se realizó.", "Amplifica la resistencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tbc-mdr", "Tuberculosis pulmonar multirresistente (resistente a rifampicina e isoniazida) tras abandono", true, "Abandono, cavidades y Xpert con resistencia."),
      dx("recaida-sensible", "Recaída de tuberculosis sensible", false, "Hay resistencia."),
      dx("micobacteria", "Micobacteria no tuberculosa", false, "Xpert detecta M. tuberculosis."),
      dx("cancer", "Cáncer de pulmón", false, "Bacteriología positiva."),
      dx("absceso", "Absceso pulmonar", false, "Bacteriología positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("esquema", "Esquema para TB-MDR con bedaquilina y otros, según el programa nacional", "clave", "Tratamiento adecuado."),
      mg("supervisado", "Tratamiento directamente observado y apoyo social", "clave", "Evita otro abandono."),
      mg("contactos", "Estudio de contactos y aislamiento respiratorio", "clave", "Salud pública."),
      mg("toxicidad", "Controlar QT, audición y función hepática", "util", "Efectos adversos."),
      mg("hrze", "Volver a HRZE", "riesgoso", "Amplifica la resistencia."),
      mg("agregar-uno", "Agregar un solo fármaco a un esquema que falla", "riesgoso", "Genera más resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis pulmonar multirresistente cavitaria tras abandono de tratamiento, en varón de 30 años.",
    pathologies: [
      { name: "Tuberculosis multirresistente", role: "principal", why: "Resistencia a rifampicina e isoniazida." },
      { name: "Desnutrición y alcohol", role: "asociada", why: "Factores." },
      { name: "Recaída sensible, micobacterias", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: tratamiento incompleto que selecciona mutantes resistentes.",
      "Mecanismo: mutaciones en genes como rpoB.",
      "Consecuencia: tratamiento más largo, más tóxico y contagio de cepas resistentes.",
    ],
    epidemiology:
      "En Argentina los casos de tuberculosis aumentan cada año, y una proporción pequeña pero creciente es resistente. El abandono es el principal factor. El Programa Nacional de Control de la Tuberculosis provee esquemas y acompañamiento.",
    management: [
      "Xpert con resistencia.",
      "Esquema adecuado.",
      "Supervisión y apoyo.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de tuberculosis resistente.", "OMS — Consolidated Guidelines on Drug-Resistant TB."],
    pearls: ["Abandono previo: pensá en resistencia.", "Xpert detecta rifampicina.", "Nunca agregar un solo fármaco."],
    pitfalls: ["Repetir HRZE.", "No apoyar la adherencia."],
    tribunal: [
      qa("¿Qué define TB-MDR y XDR?", "MDR: resistente a isoniazida y rifampicina. XDR: además resistente a quinolonas y otro fármaco del grupo A."),
      qa("¿Qué efecto adverso da la bedaquilina?", "Prolongación del QT, que obliga a controlar con ECG."),
      qa("¿Qué es el tratamiento directamente observado?", "Que un agente de salud vea la toma de cada dosis."),
    ],
  },
};
