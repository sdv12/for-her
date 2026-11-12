import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epilepsiaAusencias: ClinicalCase = {
  id: "epilepsia-ausencias-infantil",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 7, ageUnit: "años", sex: "F", context: "La maestra dice que está distraída. Sana, buen desarrollo." },
  frequency: "frecuente",
  intro: "“La maestra dice que se queda colgada varias veces al día. Se le pierde la mirada unos segundos y después sigue como si nada.”",
  vitals: { FC: "92 lpm", FR: "20 rpm", "T°": "36,5 °C", Peso: "24 kg" },
  anamnesis: [
    act("episodios", "¿Cuánto duran y cuántos por día?", "clave", "“Segundos, muchas veces.”", "Ausencias."),
    act("recuerdo", "¿Se acuerda? ¿Queda confundida?", "clave", "“No se acuerda; sigue normal.”", "Sin posictal."),
    act("gatillo", "¿Le pasa al respirar rápido?", "clave", "“No sé.”", "Hiperventilación."),
    act("otras", "¿Sacudidas o convulsiones?", "util", "“No.”", "Otras crisis."),
    act("familia", "¿Familia con epilepsia?", "util", "“El papá de chico.”", "Genética."),
    act("juego", "¿Qué le gusta?", "neutro", "“Bailar.”", "No orienta."),
  ],
  exam: [
    act("hiperventilacion", "Hiperventilación por 3 minutos", "clave", "Desencadena una ausencia de 10 segundos.", "Confirma."),
    act("neuro", "Examen neurológico", "clave", "Normal.", "Sin lesión."),
    act("desarrollo", "Desarrollo", "util", "Normal.", "Pronóstico."),
  ],
  studies: [
    study("Otros", "eeg", "EEG", "clave", "Punta-onda generalizada a 3 Hz.", "Típico."),
    study("Laboratorio", "glucemia", "Glucemia", "util", "Normal.", "Base."),
    study("Imágenes", "rmn", "RM de cerebro de rutina", "innecesario", "No se realizó.", "Cuadro típico."),
    study("Otros", "carbamazepina", "Carbamazepina", "riesgoso", "No se indicó.", "Empeora las ausencias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ausencias", "Epilepsia de ausencias infantil", true, "Desconexiones breves frecuentes, sin posictal, gatilladas por hiperventilación, y EEG a 3 Hz."),
      dx("tdah", "TDAH", false, "EEG típico y hiperventilación."),
      dx("focal", "Crisis focales con alteración de conciencia", false, "Breves, sin automatismos ni posictal."),
      dx("ensonacion", "Ensoñación", false, "No se interrumpe con estímulos."),
      dx("sincope", "Síncope", false, "No hay caída."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("etosuximida", "Etosuximida", "clave", "Primera elección."),
      mg("escuela", "Informar a la escuela", "clave", "Rendimiento."),
      mg("seguridad", "Seguridad en natación y bicicleta", "clave", "Prevención."),
      mg("pronostico", "Explicar que suele remitir", "util", "Tranquilidad."),
      mg("carbamazepina-mg", "Carbamazepina", "riesgoso", "Empeora."),
      mg("sin-tto", "No tratar", "riesgoso", "Rendimiento y accidentes."),
    ],
  },
  debrief: {
    diagnosis: "Epilepsia de ausencias infantil, en niña de 7 años.",
    pathologies: [
      { name: "Epilepsia de ausencias", role: "principal", why: "Epilepsia generalizada genética." },
      { name: "Bajo rendimiento escolar", role: "asociada", why: "Consecuencia." },
      { name: "TDAH, crisis focales", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: genética.",
      "Mecanismo: oscilaciones talamocorticales.",
      "Consecuencia: desconexiones breves frecuentes.",
    ],
    epidemiology:
      "Es más frecuente en niñas de 4 a 10 años. Suele confundirse con distracción o TDAH. La mayoría remite en la adolescencia. La hiperventilación en el consultorio ayuda mucho al diagnóstico.",
    management: [
      "Hiperventilación.",
      "EEG.",
      "Etosuximida.",
      "Escuela.",
    ],
    sources: ["Sociedad Argentina de Neurología Infantil — Epilepsias de la infancia.", "ILAE — Childhood Absence Epilepsy."],
    pearls: ["Desconexión breve sin posictal.", "Punta-onda a 3 Hz.", "Sin carbamazepina."],
    pitfalls: ["Rotular como TDAH.", "Carbamazepina."],
    tribunal: [
      qa("¿Qué fármacos empeoran las ausencias?", "Carbamazepina, oxcarbazepina, fenitoína y gabapentina."),
      qa("¿Cómo diferenciás ausencias de crisis focales?", "Ausencias: segundos, sin aura ni posictal. Focales: más largas, con automatismos y confusión."),
      qa("¿Qué alternativas a etosuximida hay?", "Valproato y lamotrigina."),
    ],
  },
};
