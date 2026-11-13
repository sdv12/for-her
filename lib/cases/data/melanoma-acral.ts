import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const melanomaAcral: ClinicalCase = {
  id: "melanoma-lentiginoso-acral",
  level: 2,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Piel morena. Diabético. Lo manda el podólogo." },
  frequency: "poco-frecuente",
  intro: "“El podólogo me vio una mancha negra en la planta del pie que creció este año. Pensé que era un golpe.”",
  vitals: { TA: "136/82 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo y cómo cambió?", "clave", "“Hace un año era chiquita, ahora es grande y tiene varios colores.”", "Evolución."),
    act("golpe", "¿Se golpeó?", "clave", "“No me acuerdo.”", "Hematoma no explica crecimiento."),
    act("sangrado", "¿Sangra o hace herida?", "clave", "“A veces sangra con la media.”", "Ulceración."),
    act("ganglios", "¿Bultos en la ingle?", "util", "“No.”", "Metástasis."),
    act("familia", "¿Familia con melanoma?", "util", "“No.”", "Riesgo."),
    act("trabajo", "¿Trabajó al sol?", "neutro", "“En una oficina.”", "No orienta: el acral no depende del sol."),
  ],
  exam: [
    act("lesion", "Lesión plantar", "clave", "Mácula de 2,5 cm, bordes irregulares, varios tonos de marrón y negro, con un sector elevado y ulcerado.", "ABCDE positivo."),
    act("dermatoscopia", "Dermatoscopia", "clave", "Patrón paralelo de la cresta.", "Típico de melanoma acral."),
    act("ganglios-ex", "Ganglios inguinales", "util", "No palpables.", "Estadificación."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia escisional con margen estrecho", "clave", "Melanoma lentiginoso acral, Breslow 2,4 mm, ulcerado.", "Confirma y estadifica."),
    study("Otros", "ganglio-centinela", "Biopsia de ganglio centinela", "util", "Negativo.", "Estadificación."),
    study("Laboratorio", "ldh", "LDH", "util", "Normal.", "Pronóstico."),
    study("Otros", "rasurado", "Biopsia por rasurado superficial", "riesgoso", "No se hizo.", "Impide medir el espesor."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("melanoma-acral", "Melanoma lentiginoso acral plantar ulcerado (Breslow 2,4 mm)", true, "Lesión plantar asimétrica que crece, varios colores, patrón paralelo de la cresta y biopsia."),
      dx("hematoma", "Hematoma subcórneo", false, "Crece durante un año y tiene patrón de la cresta."),
      dx("nevo", "Nevo acral", false, "Patrón de la cresta, más de 2 cm y ulcerado."),
      dx("verruga", "Verruga plantar", false, "Pigmentada y con patrón melanocítico."),
      dx("ulcera-diabetica", "Úlcera de pie diabético", false, "Lesión pigmentada previa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ampliacion", "Ampliación de márgenes de 2 cm", "clave", "Tratamiento según Breslow."),
      mg("comite", "Comité oncológico y evaluar adyuvancia", "clave", "Estadio IIB."),
      mg("seguimiento", "Seguimiento dermatológico y de ganglios", "clave", "Recurrencia."),
      mg("pies", "Enseñar autoexamen de pies", "util", "Detección precoz."),
      mg("crioterapia", "Crioterapia de la lesión", "riesgoso", "No trata ni permite estadificar."),
      mg("observar", "Observar 3 meses", "riesgoso", "Progresión."),
    ],
  },
  debrief: {
    diagnosis: "Melanoma lentiginoso acral plantar ulcerado, Breslow 2,4 mm, en varón de 71 años de piel morena.",
    pathologies: [
      { name: "Melanoma lentiginoso acral", role: "principal", why: "Subtipo en palmas, plantas y uñas." },
      { name: "Diagnóstico tardío", role: "asociada", why: "Localización poco visible." },
      { name: "Hematoma, verruga", role: "diferencial", why: "Lesiones plantares frecuentes." },
    ],
    reasoning: [
      "Causa: mutaciones no vinculadas al sol.",
      "Mecanismo: proliferación de melanocitos atípicos en crestas de la piel acral.",
      "Consecuencia: crecimiento radial y luego vertical con riesgo de metástasis.",
    ],
    epidemiology:
      "Es el subtipo de melanoma más frecuente en personas de piel oscura y en Latinoamérica tiene un peso relativo alto. Se diagnostica tarde por estar en la planta del pie y confundirse con hematomas o verrugas. Podólogos y diabetólogos son clave para detectarlo.",
    management: [
      "Biopsia escisional.",
      "Breslow.",
      "Márgenes y centinela.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de melanoma.", "NCCN — Cutaneous Melanoma Guidelines."],
    pearls: ["Mirá las plantas.", "Patrón paralelo de la cresta.", "No depende del sol."],
    pitfalls: ["Rasurar.", "Llamarlo hematoma."],
    tribunal: [
      qa("¿Qué es el índice de Breslow?", "Espesor del melanoma en milímetros desde la capa granulosa; define márgenes y pronóstico."),
      qa("¿Qué es el signo de Hutchinson?", "Pigmentación del pliegue periungueal en el melanoma subungueal."),
      qa("¿Qué significa ABCDE?", "Asimetría, Bordes, Color, Diámetro y Evolución."),
    ],
  },
};
