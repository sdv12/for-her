import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerMamaLactancia: ClinicalCase = {
  id: "cancer-mama-durante-lactancia",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Amamanta a un bebé de 7 meses. Madre con cáncer de mama a los 44." },
  frequency: "frecuente",
  intro: "“Hace dos meses me noté un bulto en la mama derecha. Me dijeron que era por la leche, pero sigue y no duele.”",
  vitals: { TA: "116/72 mmHg", FC: "76 lpm", "T°": "36,5 °C", "SatO₂": "99 %", Peso: "64 kg" },
  anamnesis: [
    act("nodulo", "¿Cambió? ¿Duele? ¿Fiebre?", "clave", "“Creció, no duele; sin fiebre.”", "Indoloro y persistente: alerta."),
    act("familia", "¿Cáncer de mama u ovario en familia?", "clave", "“Mi mamá.”", "Riesgo hereditario."),
    act("cambios", "¿Cambios en piel, pezón o secreción con sangre?", "clave", "“La piel, un poco retraída.”", "Sospecha."),
    act("gineco", "¿Embarazos, menarca?", "util", "“Dos hijos.”", "Riesgo."),
    act("sintomas", "¿Dolor de huesos, tos?", "util", "“No.”", "Metástasis."),
    act("bebe", "¿Cómo se llama el bebé?", "neutro", "“Lía.”", "No orienta."),
  ],
  exam: [
    act("mama", "Mama derecha", "clave", "Nódulo duro de 3 cm, irregular, poco móvil, con retracción.", "Sospechoso."),
    act("axila", "Axila", "clave", "Un ganglio móvil de 1,5 cm.", "Estadificación."),
    act("otra", "Mama izquierda", "util", "Normal.", "Bilateralidad."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía mamaria y axilar", "clave", "Nódulo sólido e irregular, BI-RADS 5.", "Imagen inicial en la lactancia."),
    study("Otros", "biopsia", "Biopsia con aguja gruesa", "clave", "Carcinoma ductal invasor; RE+, HER2-.", "Confirma."),
    study("Imágenes", "mamografia", "Mamografía", "clave", "Masa espiculada. Se puede hacer si amamanta.", "Evaluación completa."),
    study("Otros", "esperar", "Controlar en 6 meses, al destetar", "riesgoso", "No se realizó.", "Demora un diagnóstico clave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cancer", "Carcinoma ductal invasor de mama asociado a la lactancia", true, "Nódulo persistente, duro, con retracción, con biopsia positiva."),
      dx("galactocele", "Galactocele", false, "Sería quístico y la biopsia lo excluye."),
      dx("mastitis", "Mastitis", false, "Sin dolor ni fiebre."),
      dx("absceso", "Absceso", false, "Sin fluctuación ni fiebre."),
      dx("fibroadenoma", "Fibroadenoma", false, "Es móvil y liso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("multi", "Comité oncológico: cirugía, sistémico y radioterapia según estadio", "clave", "Plan integral."),
      mg("lactancia", "Asesorar sobre suspender lactancia si recibirá quimio u hormonoterapia", "clave", "Fármacos contraindicados."),
      mg("genetica", "Asesoramiento genético y BRCA", "clave", "Joven con antecedentes familiares."),
      mg("fertilidad", "Hablar de fertilidad y anticoncepción no hormonal", "util", "Decisiones."),
      mg("masaje", "Masajes y compresas por 3 meses", "riesgoso", "Demora."),
      mg("drenaje", "Drenar el nódulo como absceso", "riesgoso", "Es un tumor."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma ductal invasor de mama luminal, asociado a la lactancia, en mujer de 38 años.",
    pathologies: [
      { name: "Cáncer de mama", role: "principal", why: "Tumor maligno." },
      { name: "Riesgo hereditario", role: "asociada", why: "Familiar joven." },
      { name: "Galactocele, mastitis, fibroadenoma", role: "diferencial", why: "Nódulos benignos." },
    ],
    reasoning: [
      "Causa: alteración clonal con carga hereditaria o estrogénica.",
      "Mecanismo: células invasoras, más difíciles de identificar en la mama lactante.",
      "Consecuencia: demora diagnóstica y estadio mayor.",
    ],
    epidemiology:
      "Es el cáncer más frecuente en mujeres en Argentina, con cerca de 22.000 casos al año. Un porcentaje se detecta en embarazo o lactancia, con demora de meses porque se lo atribuye a la leche. Por eso, todo nódulo persistente más de 2 semanas debe estudiarse.",
    management: [
      "Estudiar con ecografía.",
      "Biopsia con aguja gruesa.",
      "Estadificar y comité.",
      "Genética y apoyo.",
    ],
    sources: ["Instituto Nacional del Cáncer — Guías de cáncer de mama.", "Sociedad Argentina de Mastología — Consenso."],
    pearls: ["Nódulo que no se va con la lactancia: se biopsia.", "La mamografía puede hacerse.", "La biopsia no impide lactar."],
    pitfalls: ["Decir que es por la leche.", "No pedir genética."],
    tribunal: [
      qa("¿Qué es BI-RADS 5?", "Muy sospechoso de malignidad; se indica biopsia."),
      qa("¿Qué es el ganglio centinela?", "Primer ganglio de drenaje; orienta sobre la axila."),
      qa("¿Qué genes se asocian?", "BRCA1 y BRCA2, además de TP53 y PALB2."),
    ],
  },
};
