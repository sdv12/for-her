import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const penfigo: ClinicalCase = {
  id: "penfigo-vulgar",
  level: 3,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 55, ageUnit: "años", sex: "F", context: "Sin antecedentes. Docente jubilada. Bajó 5 kilos porque le duele comer." },
  frequency: "raro",
  intro: "“Hace dos meses tengo llagas en la boca que no cicatrizan. Ahora me salieron ampollas en el pecho que se rompen enseguida y dejan la piel en carne viva.”",
  vitals: { TA: "118/74 mmHg", FC: "88 lpm", "T°": "36,9 °C", Peso: "58 kg" },
  anamnesis: [
    act("evolucion", "¿Qué apareció primero?", "clave", "“Las llagas en la boca, meses antes.”", "Las mucosas suelen comprometerse primero."),
    act("farmacos", "¿Tomaste medicamentos nuevos (captopril, penicilamina)?", "clave", "“No.”", "Algunos fármacos lo inducen. Sin pródromo como en Stevens-Johnson."),
    act("ampollas", "¿Las ampollas son tensas o se rompen fácil?", "clave", "“Se rompen enseguida.”", "Flácidas: intraepidérmicas."),
    act("infeccion", "¿Fiebre, secreción, mal olor?", "util", "“No.”", "Sobreinfección."),
    act("come", "¿Podés comer y tomar?", "util", "“Con mucho dolor.”", "Riesgo de desnutrición."),
    act("ninos", "¿Cuántos alumnos tuviste?", "neutro", "“Miles.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca", "clave", "Erosiones dolorosas en mucosa yugal y paladar.", "Compromiso mucoso."),
    act("piel", "Piel", "clave", "Ampollas flácidas y erosiones costrosas en tronco.", "Típico."),
    act("nikolsky", "Signo de Nikolsky", "clave", "Positivo.", "Pérdida de adhesión entre queratinocitos."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia de piel perilesional con inmunofluorescencia directa", "clave", "Acantólisis suprabasal; IgG intercelular en panal de abejas.", "Diagnóstico."),
    study("Laboratorio", "anticuerpos", "Anticuerpos antidesmogleína 1 y 3", "clave", "Positivos.", "Confirman y permiten seguir la actividad."),
    study("Laboratorio", "basal", "Laboratorio basal antes de inmunosuprimir: hepatitis, TBC, HIV, glucemia", "clave", "Normales.", "Prepara el tratamiento."),
    study("Microbiología", "cultivo", "Solo cultivo y antibióticos sin biopsia", "riesgoso", "No se realizó.", "Demora el diagnóstico de una enfermedad grave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("penfigo", "Pénfigo vulgar", true, "Erosiones orales, ampollas flácidas, Nikolsky positivo, acantólisis y antidesmogleína positivos."),
      dx("penfigoide", "Penfigoide ampollar", false, "Da ampollas tensas, en personas mayores, sin mucosas y Nikolsky negativo."),
      dx("sjs", "Stevens-Johnson", false, "Es agudo por fármacos, con fiebre."),
      dx("herpes", "Herpes simple", false, "No da ampollas flácidas extendidas por meses."),
      dx("aftas", "Aftas orales", false, "No explica las ampollas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rituximab", "Corticoides sistémicos con rituximab", "clave", "Tratamiento de primera línea."),
      mg("prevencion", "Prevenir efectos de los corticoides: hueso, glucemia, vacunas", "clave", "Reduce complicaciones."),
      mg("heridas", "Curaciones, analgesia y soporte nutricional", "clave", "Riesgo de infección y pérdida de líquidos."),
      mg("seguimiento", "Seguimiento dermatológico prolongado", "util", "Es una enfermedad crónica."),
      mg("corticoide-topico", "Solo corticoide tópico", "riesgoso", "Insuficiente; sin tratamiento tenía alta mortalidad."),
      mg("sin-tratamiento", "Enjuagues para aftas y alta", "riesgoso", "Progresa."),
    ],
  },
  debrief: {
    diagnosis: "Pénfigo vulgar mucocutáneo en mujer de 55 años.",
    pathologies: [
      { name: "Pénfigo vulgar", role: "principal", why: "Autoinmunidad contra desmogleínas." },
      { name: "Riesgo de sobreinfección y desnutrición", role: "asociada", why: "Complicaciones." },
      { name: "Penfigoide, Stevens-Johnson, herpes", role: "diferencial", why: "Otras ampollas." },
    ],
    reasoning: [
      "Causa: predisposición genética, autoanticuerpos IgG.",
      "Mecanismo: los anticuerpos contra desmogleína rompen la unión entre queratinocitos (acantólisis).",
      "Consecuencia: ampollas intraepidérmicas flácidas, erosiones, pérdida de líquidos e infección.",
    ],
    epidemiology:
      "Es poco frecuente, con inicio entre los 40 y los 60 años. Antes de los corticoides su mortalidad era muy alta. Hoy la principal causa de muerte son las complicaciones del tratamiento, por lo que se usa rituximab para reducir corticoides.",
    management: [
      "Sospecha ante erosiones orales crónicas.",
      "Biopsia e inmunofluorescencia.",
      "Corticoides y rituximab.",
      "Soporte y prevención.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de enfermedades ampollares.", "Guía europea de pénfigo."],
    pearls: ["Flácida: pénfigo. Tensa: penfigoide.", "Llagas orales que no cierran: biopsia.", "Nikolsky positivo."],
    pitfalls: ["Tratar como aftas por meses.", "Biopsiar la lesión erosionada y no perilesional."],
    tribunal: [
      qa("¿Cómo se diferencia del penfigoide?", "Penfigoide: anticuerpos contra hemidesmosomas, ampollas tensas subepidérmicas, en mayores, con prurito, IF lineal en membrana basal, y pocas mucosas."),
      qa("¿Qué es la acantólisis?", "La pérdida de adhesión entre queratinocitos por daño en desmosomas."),
      qa("¿Qué antígeno afecta las mucosas?", "La desmogleína 3; la desmogleína 1 predomina en la piel."),
    ],
  },
};
