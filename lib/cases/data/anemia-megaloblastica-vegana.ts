import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaMegaloblasticaVegana: ClinicalCase = {
  id: "deficit-b12-vegana",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Vegana estricta hace 5 años, sin suplementos. Planea embarazarse." },
  frequency: "frecuente",
  intro: "“Estoy muy cansada, se me duermen los pies y me olvido de las cosas. Tengo la lengua roja y me arde.”",
  vitals: { TA: "108/66 mmHg", FC: "98 lpm", "T°": "36,4 °C", Peso: "54 kg" },
  anamnesis: [
    act("dieta", "¿Qué comés? ¿Suplementos?", "clave", "“Vegana estricta, sin suplementos.”", "Sin fuentes de B12."),
    act("neuro", "¿Hormigueos o inestabilidad?", "clave", "“Hormigueo en los pies y me tambaleo en la oscuridad.”", "Cordones posteriores."),
    act("embarazo", "¿Planeás embarazo?", "clave", "“Sí, este año.”", "Riesgo fetal."),
    act("digestivo", "¿Diarrea o cirugías digestivas?", "util", "“No.”", "Malabsorción."),
    act("animo", "¿Ánimo o memoria?", "util", "“Me olvido de cosas.”", "Neuropsiquiátrico."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy diseñadora textil.”", "No orienta."),
  ],
  exam: [
    act("lengua", "Lengua", "clave", "Glositis atrófica.", "Déficit de B12."),
    act("neuro-ex", "Sensibilidad vibratoria y Romberg", "clave", "Vibratoria disminuida en pies, Romberg positivo.", "Cordones posteriores."),
    act("palidez", "Piel", "util", "Palidez levemente amarillenta.", "Hemólisis intramedular."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y frotis", "clave", "Hb 9,2; VCM 112; neutrófilos hipersegmentados.", "Anemia megaloblástica."),
    study("Laboratorio", "b12", "B12, fólico, homocisteína", "clave", "B12 110; homocisteína alta; fólico normal.", "Déficit de B12."),
    study("Laboratorio", "anti-fi", "Anticuerpos anti-factor intrínseco", "util", "Negativos.", "No es perniciosa."),
    study("Otros", "folico-solo", "Dar solo ácido fólico", "riesgoso", "No se indicó.", "Corrige la anemia y empeora la neuropatía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("b12-dieta", "Anemia megaloblástica y mielopatía por déficit dietario de vitamina B12 en dieta vegana", true, "Vegana sin suplementos, macrocitosis con neutrófilos hipersegmentados, B12 baja y signos de cordones posteriores."),
      dx("perniciosa", "Anemia perniciosa", false, "Anti-factor intrínseco negativos y causa dietaria."),
      dx("folico", "Déficit de ácido fólico", false, "Fólico normal y neurológico."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "Neutrófilos hipersegmentados y B12 baja."),
      dx("em", "Esclerosis múltiple", false, "Causa carencial clara."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("im", "Vitamina B12 IM en dosis de carga por el compromiso neurológico", "clave", "Reposición rápida."),
      mg("mantenimiento", "Suplemento oral de B12 de por vida", "clave", "Dieta vegana."),
      mg("preconcepcional", "Consulta preconcepcional con fólico y B12", "clave", "Defectos del tubo neural y desarrollo fetal."),
      mg("nutricion", "Asesoramiento nutricional sin juzgar la dieta", "util", "Adherencia."),
      mg("folico-mg", "Solo ácido fólico", "riesgoso", "Progresa la neuropatía."),
      mg("dejar-veganismo", "Exigirle que deje la dieta vegana", "riesgoso", "Innecesario con suplementos."),
    ],
  },
  debrief: {
    diagnosis: "Anemia megaloblástica con mielopatía por déficit dietario de vitamina B12, en mujer vegana de 24 años.",
    pathologies: [
      { name: "Déficit de vitamina B12", role: "principal", why: "Dieta sin productos animales ni suplementos." },
      { name: "Mielopatía de cordones posteriores", role: "asociada", why: "Daño neurológico." },
      { name: "Perniciosa, déficit de fólico", role: "diferencial", why: "Otras megaloblásticas." },
    ],
    reasoning: [
      "Causa: ingesta nula de B12 durante años.",
      "Mecanismo: falla de síntesis de ADN y de mielina.",
      "Consecuencia: anemia macrocítica, neuropatía y deterioro cognitivo.",
    ],
    epidemiology:
      "Las dietas veganas sin suplemento de B12 llevan a déficit en años. En el embarazo y la lactancia el déficit materno daña al bebé. Suplementar es simple y suficiente.",
    management: [
      "Dieta.",
      "B12 y frotis.",
      "Reposición IM si hay neurológico.",
      "Suplemento de por vida.",
    ],
    sources: ["Sociedad Argentina de Hematología — Anemias megaloblásticas.", "British Society for Haematology — Guidelines for the Diagnosis and Treatment of Cobalamin and Folate Disorders."],
    pearls: ["Vegano: B12 siempre.", "Fólico solo es peligroso.", "Romberg."],
    pitfalls: ["Fólico solo.", "Juzgar la dieta."],
    tribunal: [
      qa("¿Por qué el fólico solo es riesgoso?", "Mejora la anemia y enmascara el déficit de B12 mientras progresa el daño neurológico."),
      qa("¿Qué marcadores ayudan con B12 limítrofe?", "Homocisteína y ácido metilmalónico elevados."),
      qa("¿Qué riesgo tiene el bebé de una madre con déficit?", "Retraso del desarrollo, hipotonía y anemia."),
    ],
  },
};
