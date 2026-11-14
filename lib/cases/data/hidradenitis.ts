import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hidradenitis: ClinicalCase = {
  id: "hidradenitis-supurativa",
  level: 2,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Fuma. IMC 34. La drenaron varias veces en la guardia por 'forúnculos'." },
  frequency: "frecuente",
  intro: "“Me salen bultos dolorosos en las axilas y la ingle que supuran y dejan marcas. Me pasa desde los 17.”",
  vitals: { TA: "122/78 mmHg", FC: "78 lpm", "T°": "36,6 °C", Peso: "92 kg" },
  anamnesis: [
    act("localizacion", "¿Dónde salen?", "clave", "“Axilas, ingles y debajo de las mamas.”", "Zonas de pliegues."),
    act("recurrencia", "¿Cuántas veces?", "clave", "“Varias por año desde los 17.”", "Crónico y recurrente."),
    act("tabaco", "¿Fumás?", "clave", "“Un atado por día.”", "Factor de riesgo."),
    act("impacto", "¿Cómo te afecta?", "util", "“No uso remeras sin manga y estoy deprimida.”", "Impacto en calidad de vida."),
    act("intestino", "¿Diarrea o dolor abdominal?", "util", "“No.”", "Crohn asociado."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy recepcionista.”", "No orienta."),
  ],
  exam: [
    act("axilas", "Axilas e ingles", "clave", "Nódulos inflamatorios, túneles con drenaje, cicatrices en puente y comedones dobles.", "Hurley II."),
    act("otras", "Otras zonas", "clave", "Sin lesiones en cara o tronco.", "Patrón típico."),
    act("acanthosis", "Cuello", "util", "Acantosis nigricans.", "Insulinorresistencia."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Criterios cumplidos.", "Lesiones típicas, sitios típicos, recurrencia."),
    study("Laboratorio", "metabolico", "Glucemia, HbA1c y lípidos", "util", "HbA1c 6,1.", "Comorbilidad."),
    study("Microbiología", "cultivo", "Cultivo de las lesiones de rutina", "innecesario", "No se realizó.", "No es infección primaria."),
    study("Otros", "drenajes-repetidos", "Seguir drenando cada brote en guardia", "riesgoso", "No se indicó.", "No trata y genera cicatrices."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hs", "Hidradenitis supurativa Hurley II", true, "Nódulos y túneles recurrentes en pliegues desde la adolescencia, cicatrices y comedones dobles."),
      dx("forunculosis", "Forunculosis recurrente", false, "Túneles, cicatrices y localización en pliegues."),
      dx("crohn-cutaneo", "Crohn cutáneo", false, "Sin síntomas intestinales."),
      dx("acne", "Acné conglobata", false, "Respeta la cara y el tronco."),
      dx("quiste", "Quiste epidérmico infectado", false, "Múltiples lesiones en pliegues."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tabaco-peso", "Dejar de fumar y bajar de peso", "clave", "Mejoran la evolución."),
      mg("atb", "Doxiciclina o clindamicina más rifampicina por ciclos", "clave", "Tratamiento médico."),
      mg("dermato", "Derivar a dermatología y evaluar biológicos (adalimumab)", "clave", "Formas moderadas a graves."),
      mg("psico", "Abordar el impacto emocional", "util", "Depresión frecuente."),
      mg("drenaje-solo", "Solo drenajes en cada brote", "riesgoso", "Recidiva."),
      mg("rasurado", "Depilación agresiva con cera", "riesgoso", "Traumatiza y empeora."),
    ],
  },
  debrief: {
    diagnosis: "Hidradenitis supurativa Hurley II, en mujer fumadora con obesidad de 26 años.",
    pathologies: [
      { name: "Hidradenitis supurativa", role: "principal", why: "Enfermedad inflamatoria del folículo." },
      { name: "Tabaco, obesidad e insulinorresistencia", role: "asociada", why: "Factores agravantes." },
      { name: "Forunculosis, Crohn", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: oclusión folicular con inflamación inmune.",
      "Mecanismo: ruptura del folículo y formación de túneles.",
      "Consecuencia: nódulos dolorosos, supuración y cicatrices.",
    ],
    epidemiology:
      "Afecta a alrededor del 1 % de la población, más a mujeres jóvenes fumadoras y con obesidad. Se diagnostica años tarde porque se trata como forúnculos. El tabaco es el factor modificable más importante.",
    management: [
      "Reconocer.",
      "Tabaco y peso.",
      "Antibióticos por ciclos.",
      "Biológicos.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Hidradenitis supurativa.", "EADV/EHSF — Guidelines for Hidradenitis Suppurativa."],
    pearls: ["Forúnculos en pliegues que vuelven.", "Comedones dobles.", "Tabaco."],
    pitfalls: ["Drenajes repetidos.", "Tratarla como infección."],
    tribunal: [
      qa("¿Qué es la clasificación de Hurley?", "I: abscesos sin túneles; II: recurrentes con túneles separados; III: compromiso difuso con túneles interconectados."),
      qa("¿Qué biológico está aprobado?", "Adalimumab, y más recientemente secukinumab."),
      qa("¿Con qué enfermedades se asocia?", "Crohn, síndrome metabólico, depresión y artritis."),
    ],
  },
};
