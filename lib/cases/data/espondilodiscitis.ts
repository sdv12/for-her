import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const espondilodiscitis: ClinicalCase = {
  id: "osteomielitis-vertebral-espondilodiscitis",
  level: 3,
  area: "Traumatología",
  setting: "Internación",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Diabético, en hemodiálisis por catéter. Dolor lumbar hace 6 semanas." },
  frequency: "poco-frecuente",
  intro: "“El dolor de espalda no me deja dormir. No me pasa con nada, tengo febrícula, y ahora me cuesta levantar las piernas.”",
  vitals: { TA: "136/78 mmHg", FC: "98 lpm", "T°": "38,1 °C", "SatO₂": "97 %", Glucemia: "196 mg/dl" },
  anamnesis: [
    act("nocturno", "¿Empeora a la noche? ¿Mejora en reposo?", "clave", "“Peor de noche.”", "Bandera roja."),
    act("neuro", "¿Debilidad, problemas con la orina, anestesia en silla de montar?", "clave", "“Debilidad; orino bien.”", "Urgencia neurológica."),
    act("foco", "¿Catéter, heridas, fiebre o endocarditis?", "clave", "“Catéter con infección hace dos meses.”", "Bacteriemia."),
    act("tbc", "¿TBC o exposición a animales?", "util", "“No.”", "Pott, brucelosis."),
    act("cancer", "¿Pérdida de peso, cáncer?", "util", "“No.”", "Metástasis."),
    act("aficion", "¿Qué te gusta hacer?", "neutro", "“Pescar.”", "No orienta."),
  ],
  exam: [
    act("espalda", "Columna", "clave", "Dolor a la percusión lumbar.", "Foco."),
    act("neuro-ex", "Fuerza, reflejos y sensibilidad", "clave", "Debilidad 4/5 en ambas piernas, sin nivel.", "Compresión."),
    act("cateter", "Catéter y corazón", "util", "Soplo nuevo mitral.", "Endocarditis."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de columna con contraste urgente", "clave", "Espondilodiscitis L3-L4 con absceso epidural.", "De elección."),
    study("Laboratorio", "hemocultivos", "Hemocultivos y VSG, PCR", "clave", "S. aureus; VSG 110.", "Etiología."),
    study("Otros", "biopsia", "Biopsia de disco si hemocultivos negativos", "util", "Si no se identifica.", "Guía."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Vegetación mitral.", "Endocarditis."),
    study("Imágenes", "rx-solo", "Solo radiografía lumbar y alta", "riesgoso", "No se realizó.", "Es normal al principio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("espondilodiscitis", "Osteomielitis vertebral (espondilodiscitis) por S. aureus con absceso epidural y endocarditis", true, "Dolor nocturno, fiebre, bacteriemia, RM y vegetación."),
      dx("lumbalgia", "Lumbalgia mecánica", false, "Banderas rojas."),
      dx("metastasis", "Metástasis", false, "El disco está comprometido."),
      dx("pott", "Mal de Pott", false, "Hay S. aureus."),
      dx("fractura", "Fractura vertebral", false, "Sin trauma, con infección."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico EV según cultivo, de 6 a 8 semanas o más", "clave", "Infección profunda."),
      mg("neurocirugia", "Neurocirugía urgente por déficit con absceso", "clave", "Previene paraplejia."),
      mg("cateter", "Retirar catéter y tratar la endocarditis", "clave", "Foco."),
      mg("glucemia", "Controlar glucemia y dolor", "util", "Comorbilidades."),
      mg("alta", "Analgésicos y alta", "riesgoso", "Riesgo de paraplejia."),
      mg("corticoide", "Corticoides por dolor", "riesgoso", "Inmunosuprime y enmascara."),
    ],
  },
  debrief: {
    diagnosis: "Espondilodiscitis L3-L4 por S. aureus con absceso epidural y endocarditis, asociada a catéter de hemodiálisis, en varón de 66 años.",
    pathologies: [
      { name: "Osteomielitis vertebral", role: "principal", why: "Infección de disco y vértebra." },
      { name: "Absceso epidural y endocarditis", role: "asociada", why: "Complicaciones." },
      { name: "Lumbalgia, metástasis, Pott", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: bacteriemia asociada a catéter.",
      "Mecanismo: siembra hematógena del disco.",
      "Consecuencia: destrucción, absceso, compresión neurológica.",
    ],
    epidemiology:
      "Aumenta con el envejecimiento, la diabetes, la hemodiálisis y los catéteres. S. aureus es el germen más frecuente. En Argentina hay que pensar también en tuberculosis y brucelosis. La demora en el diagnóstico es frecuente, y las secuelas neurológicas pueden ser permanentes.",
    management: [
      "Banderas rojas.",
      "RM.",
      "Hemocultivos.",
      "Antibióticos y cirugía.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infecciones osteoarticulares.", "IDSA — Native Vertebral Osteomyelitis Guideline."],
    pearls: ["Dolor nocturno con fiebre.", "RM.", "Buscar endocarditis."],
    pitfalls: ["Alta con lumbalgia.", "Biopsiar tras antibióticos."],
    tribunal: [
      qa("¿Cuáles son las banderas rojas de la lumbalgia?", "Cáncer, fiebre, inmunosupresión, trauma, déficit neurológico, pérdida de peso, dolor nocturno y síndrome de cola de caballo."),
      qa("¿Cuáles son las diferencias con la osteomielitis en niños?", "En niños es metafisaria de huesos largos y en adultos, vertebral."),
      qa("¿Qué hallazgo radiográfico tarda en aparecer?", "La pérdida de altura discal y la erosión, que puede demorar semanas."),
    ],
  },
};
