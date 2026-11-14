import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisPsoriasica: ClinicalCase = {
  id: "artritis-psoriasica",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 43, ageUnit: "años", sex: "M", context: "Psoriasis en placas desde los 25. Usa solo cremas." },
  frequency: "frecuente",
  intro: "“Se me hinchó entero un dedo del pie como una salchicha y me duelen las articulaciones de las puntas de los dedos de las manos.”",
  vitals: { TA: "132/84 mmHg", FC: "76 lpm", "T°": "36,5 °C", Peso: "90 kg" },
  anamnesis: [
    act("dactilitis", "¿Cómo es la hinchazón del dedo?", "clave", "“Todo el dedo, como salchicha.”", "Dactilitis."),
    act("psoriasis", "¿Tiene psoriasis?", "clave", "“Hace muchos años.”", "Asociación."),
    act("rigidez", "¿Rigidez a la mañana?", "clave", "“Una hora.”", "Inflamatoria."),
    act("lumbar", "¿Dolor de espalda que mejora con el movimiento?", "util", "“A veces.”", "Compromiso axial."),
    act("talon", "¿Dolor en el talón?", "util", "“Sí, al levantarme.”", "Entesitis."),
    act("hobby", "¿Qué hace?", "neutro", "“Toco la guitarra.”", "No orienta."),
  ],
  exam: [
    act("manos", "Manos y uñas", "clave", "Artritis de interfalángicas distales, pitting y onicólisis.", "Patrón típico."),
    act("pie", "Pie", "clave", "Dactilitis del segundo dedo, entesitis aquílea.", "Espondiloartritis."),
    act("piel", "Piel", "util", "Placas en codos y cuero cabelludo.", "Psoriasis."),
  ],
  studies: [
    study("Laboratorio", "fr", "FR, anti-CCP, VSG, PCR", "clave", "FR y anti-CCP negativos; PCR elevada.", "Seronegativa."),
    study("Imágenes", "rx", "Radiografía de manos y pies", "clave", "Erosiones en IFD con proliferación ósea.", "Lápiz en copa incipiente."),
    study("Laboratorio", "urico", "Ácido úrico", "util", "Normal.", "Excluye gota."),
    study("Otros", "corticoides-sistemicos", "Corticoides sistémicos en dosis altas", "riesgoso", "No se indicó.", "Brote de psoriasis pustulosa al retirarlos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aps", "Artritis psoriásica con compromiso de interfalángicas distales, dactilitis y entesitis", true, "Psoriasis, artritis de IFD, dactilitis, uñas con pitting, FR negativo y erosiones típicas."),
      dx("ar", "Artritis reumatoidea", false, "Respeta IFD y FR y anti-CCP positivos."),
      dx("gota", "Gota", false, "Ácido úrico normal."),
      dx("artrosis", "Artrosis erosiva", false, "Dactilitis, entesitis y psoriasis."),
      dx("reactiva", "Artritis reactiva", false, "Sin infección previa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metotrexato", "Metotrexato", "clave", "Trata piel y articulaciones."),
      mg("aines", "AINE para el dolor", "clave", "Sintomático."),
      mg("biologicos", "Biológicos (anti-TNF o anti-IL17) si no responde", "util", "Formas activas."),
      mg("cardio", "Control de riesgo cardiovascular", "clave", "Comorbilidad frecuente."),
      mg("corticoides-altos", "Corticoides orales en dosis altas", "riesgoso", "Rebote de psoriasis."),
      mg("solo-cremas", "Seguir solo con cremas", "riesgoso", "Daño articular progresivo."),
    ],
  },
  debrief: {
    diagnosis: "Artritis psoriásica con compromiso de interfalángicas distales, dactilitis y entesitis, en varón de 43 años.",
    pathologies: [
      { name: "Artritis psoriásica", role: "principal", why: "Espondiloartritis asociada a psoriasis." },
      { name: "Psoriasis en placas y riesgo cardiovascular", role: "asociada", why: "Comorbilidades." },
      { name: "AR, gota", role: "diferencial", why: "Otras artritis." },
    ],
    reasoning: [
      "Causa: inflamación inmune con eje IL-23/IL-17.",
      "Mecanismo: sinovitis, entesitis y proliferación ósea.",
      "Consecuencia: dolor, deformidad y discapacidad.",
    ],
    epidemiology:
      "Hasta un tercio de las personas con psoriasis desarrolla artritis, en general años después de la piel. Las uñas afectadas aumentan el riesgo. Se asocia a síndrome metabólico.",
    management: [
      "Preguntar a todo psoriásico.",
      "Radiografías.",
      "Metotrexato.",
      "Biológicos.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Artritis psoriásica.", "GRAPPA — Treatment Recommendations for Psoriatic Arthritis."],
    pearls: ["IFD y uñas.", "Dedo en salchicha.", "FR negativo."],
    pitfalls: ["Corticoides altos.", "No preguntar por articulaciones."],
    tribunal: [
      qa("¿Qué son los criterios CASPAR?", "Criterios de clasificación con psoriasis, uñas, FR negativo, dactilitis y proliferación ósea."),
      qa("¿Qué es la deformidad en lápiz y copa?", "Erosión de la falange proximal en punta y ensanchamiento de la distal en radiografía."),
      qa("¿Qué forma es la más grave?", "La artritis mutilante."),
    ],
  },
};
