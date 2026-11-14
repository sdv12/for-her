import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tallaBaja: ClinicalCase = {
  id: "talla-baja-familiar-retraso-constitucional",
  level: 2,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 13, ageUnit: "años", sex: "M", context: "El más bajo del curso. Padre 1,68 m; madre 1,57 m. El padre 'pegó el estirón' tarde." },
  frequency: "frecuente",
  intro: "“Es el más bajito de la clase y todavía no cambió la voz. Queremos saber si necesita hormonas.”",
  vitals: { FC: "80 lpm", "T°": "36,4 °C", Peso: "33 kg" },
  anamnesis: [
    act("curva", "¿Cómo fue creciendo?", "clave", "“Siempre chiquito, pero parejo.”", "Velocidad de crecimiento normal."),
    act("padres", "¿Qué altura tienen los padres y cuándo se desarrollaron?", "clave", "“Papá bajito y se desarrolló a los 16.”", "Familiar y constitucional."),
    act("sistemicos", "¿Diarrea, dolor de panza, cansancio?", "clave", "“No.”", "Celiaquía y enfermedad crónica."),
    act("comida", "¿Cómo come?", "util", "“Bien.”", "Nutrición."),
    act("nacimiento", "¿Cómo nació?", "util", "“A término, 3.200 g.”", "Pequeño para la edad gestacional."),
    act("juego", "¿Qué le gusta?", "neutro", "“La PlayStation.”", "No orienta."),
  ],
  exam: [
    act("talla", "Talla, peso y proporciones", "clave", "Talla en percentil 3, proporcionada; talla diana en percentil 10.", "Dentro del rango genético."),
    act("tanner", "Tanner", "clave", "Tanner 1.", "Pubertad aún no iniciada."),
    act("dismorfias", "Rasgos dismórficos", "util", "Ausentes.", "Excluye síndromes."),
  ],
  studies: [
    study("Otros", "velocidad", "Velocidad de crecimiento en el último año", "clave", "5 cm/año.", "Normal para su estadio."),
    study("Imágenes", "edad-osea", "Edad ósea", "clave", "Edad ósea de 11 años.", "Retrasada."),
    study("Laboratorio", "lab", "Hemograma, celiaquía, TSH, IGF-1, función renal", "util", "Normales.", "Descarta organicidad."),
    study("Laboratorio", "estimulo-gh", "Pruebas de estímulo de hormona de crecimiento", "innecesario", "No se realizaron.", "Velocidad e IGF-1 normales."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rccd", "Talla baja familiar con retraso constitucional del crecimiento y la pubertad", true, "Velocidad normal, talla diana baja, edad ósea retrasada y padre con desarrollo tardío."),
      dx("deficit-gh", "Déficit de hormona de crecimiento", false, "Velocidad e IGF-1 normales."),
      dx("celiaquia", "Celiaquía", false, "Serología negativa."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("hipogonadismo", "Hipogonadismo", false, "Aún no corresponde sin retraso mayor de 14 años."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar el pronóstico: va a crecer más tarde y alcanzar su talla genética", "clave", "Tranquiliza."),
      mg("seguimiento", "Control de talla cada 6 meses", "clave", "Confirmar evolución."),
      mg("autoestima", "Atender el impacto en la autoestima", "clave", "Bullying."),
      mg("testosterona", "Ciclo corto de testosterona si a los 14 no inicia y le afecta mucho", "util", "Opción en casos seleccionados."),
      mg("gh", "Hormona de crecimiento", "riesgoso", "Sin indicación."),
      mg("suplementos", "Suplementos 'para crecer'", "riesgoso", "Sin evidencia."),
    ],
  },
  debrief: {
    diagnosis: "Talla baja familiar con retraso constitucional del crecimiento y la pubertad, en varón de 13 años.",
    pathologies: [
      { name: "Retraso constitucional", role: "principal", why: "Variante normal del crecimiento." },
      { name: "Talla baja familiar", role: "asociada", why: "Herencia." },
      { name: "Déficit de GH, celiaquía", role: "diferencial", why: "Causas patológicas." },
    ],
    reasoning: [
      "Causa: patrón familiar de maduración tardía.",
      "Mecanismo: el estirón y la pubertad llegan más tarde, con edad ósea retrasada.",
      "Consecuencia: talla baja transitoria con talla final acorde a la familia.",
    ],
    epidemiology:
      "Son las causas más frecuentes de consulta por talla baja. La clave es la velocidad de crecimiento: si es normal, casi siempre es una variante. Celiaquía e hipotiroidismo se descartan siempre.",
    management: [
      "Curva y velocidad.",
      "Talla diana.",
      "Edad ósea.",
      "Tranquilizar y seguir.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de evaluación de talla baja.", "Pediatric Endocrine Society — Guidelines for Growth Hormone Treatment."],
    pearls: ["La velocidad dice más que la talla.", "Edad ósea retrasada.", "Talla diana."],
    pitfalls: ["Dar GH.", "No descartar celiaquía."],
    tribunal: [
      qa("¿Cómo se calcula la talla diana en varones?", "Talla del padre más talla de la madre más 13 cm, dividido 2."),
      qa("¿Qué sugiere patología?", "Velocidad de crecimiento baja, cruce de percentiles, desproporción o dismorfias."),
      qa("¿Qué es el retraso puberal en varones?", "Falta de aumento testicular a los 14 años."),
    ],
  },
};
