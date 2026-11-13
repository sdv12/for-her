import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const chikungunya: ClinicalCase = {
  id: "chikungunya",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Marzo. Vive en Orán, Salta. Hay casos de dengue y chikungunya en el barrio." },
  frequency: "frecuente",
  intro: "“Hace tres días tengo fiebre alta y me duelen tanto las articulaciones que no puedo agarrar la pava ni caminar.”",
  vitals: { TA: "124/78 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,9 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("articulaciones", "¿Qué articulaciones le duelen?", "clave", "“Las manos, las muñecas y los tobillos, de los dos lados.”", "Poliartralgia simétrica intensa."),
    act("alarma", "¿Dolor de panza, vómitos, sangrados?", "clave", "“No.”", "Signos de alarma de dengue."),
    act("epidemiologia", "¿Hay casos en la zona o viajó?", "clave", "“Hay muchos en el barrio.”", "Contexto epidemiológico."),
    act("piel", "¿Le salieron manchas?", "util", "“Unas manchitas en el pecho.”", "Exantema."),
    act("farmacos", "¿Qué tomó?", "util", "“Ibuprofeno.”", "AINE con dengue posible."),
    act("trabajo", "¿Trabaja?", "neutro", "“Vendo empanadas.”", "No orienta."),
  ],
  exam: [
    act("artritis", "Examen articular", "clave", "Tumefacción de muñecas y tobillos, dolor intenso a la movilización.", "Artritis."),
    act("lazo", "Prueba del lazo y signos de alarma", "clave", "Lazo negativo, abdomen blando, sin hepatomegalia.", "Excluir dengue grave."),
    act("piel-ex", "Piel", "util", "Exantema maculopapular en tronco.", "Arbovirosis."),
  ],
  studies: [
    study("Laboratorio", "pcr", "RT-PCR para chikungunya y dengue (antes del quinto día)", "clave", "Chikungunya positivo, dengue negativo.", "Confirma."),
    study("Laboratorio", "hemograma", "Hemograma con plaquetas y hematocrito", "clave", "Linfopenia; plaquetas 165.000; Hto 39 %.", "Sin hemoconcentración."),
    study("Laboratorio", "hepatograma", "Hepatograma", "util", "Transaminasas levemente elevadas.", "Base."),
    study("Laboratorio", "fr", "Factor reumatoideo y anti-CCP en la fase aguda", "innecesario", "No se realizó.", "No corresponde en la fase aguda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("chik", "Fiebre chikungunya en fase aguda", true, "Fiebre con poliartritis intensa simétrica, brote local y RT-PCR positiva."),
      dx("dengue", "Dengue sin signos de alarma", false, "PCR negativa y el dolor articular predomina."),
      dx("ar", "Artritis reumatoidea", false, "Inicio agudo febril en contexto de brote."),
      dx("zika", "Zika", false, "Es más leve y con conjuntivitis."),
      dx("artritis-septica", "Artritis séptica", false, "Poliarticular y simétrica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("paracetamol", "Paracetamol, hidratación y reposo", "clave", "Sintomático."),
      mg("notificar", "Notificación obligatoria y control del mosquito en el hogar", "clave", "Vigilancia y prevención."),
      mg("pautas", "Pautas de alarma hasta descartar dengue y control", "clave", "Coinfección posible."),
      mg("aine-despues", "AINE recién cuando se descarta dengue", "util", "Para el dolor persistente."),
      mg("aspirina", "Aspirina o ibuprofeno desde el inicio", "riesgoso", "Sangrado si es dengue."),
      mg("corticoides", "Corticoides en la fase aguda", "riesgoso", "Rebote y no están indicados."),
    ],
  },
  debrief: {
    diagnosis: "Fiebre chikungunya en fase aguda, con poliartritis simétrica, en mujer de 52 años de Salta.",
    pathologies: [
      { name: "Fiebre chikungunya", role: "principal", why: "Arbovirosis transmitida por Aedes aegypti." },
      { name: "Poliartritis", role: "asociada", why: "Puede volverse crónica." },
      { name: "Dengue, zika", role: "diferencial", why: "Mismo vector." },
    ],
    reasoning: [
      "Causa: virus chikungunya transmitido por Aedes aegypti.",
      "Mecanismo: replicación en articulaciones y respuesta inflamatoria.",
      "Consecuencia: artritis intensa, que en parte de los pacientes se cronifica.",
    ],
    epidemiology:
      "Argentina tuvo brotes de chikungunya en el norte y en Córdoba en los últimos años, junto con dengue. Es de notificación obligatoria. Hasta un tercio de los adultos queda con dolor articular por meses.",
    management: [
      "Descartar dengue.",
      "Paracetamol.",
      "Notificar.",
      "Seguimiento articular.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de chikungunya.", "OPS — Preparación y respuesta ante el chikungunya."],
    pearls: ["Fiebre con artritis intensa: chikungunya.", "Hasta descartar dengue, sin AINE.", "Notificá."],
    pitfalls: ["Ibuprofeno de entrada.", "Corticoides en fase aguda."],
    tribunal: [
      qa("¿Cuál es el vector?", "El mosquito Aedes aegypti, el mismo del dengue y el zika."),
      qa("¿Qué es la fase crónica?", "Artralgias o artritis que persisten más de tres meses después del cuadro agudo."),
      qa("¿Cómo diferenciás clínicamente del dengue?", "En chikungunya predomina la artritis; en dengue la plaquetopenia y la extravasación."),
    ],
  },
};
