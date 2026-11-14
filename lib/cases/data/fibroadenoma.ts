import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fibroadenoma: ClinicalCase = {
  id: "fibroadenoma-mamario",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 21, ageUnit: "años", sex: "F", context: "Estudiante de Odontología. Sin antecedentes familiares de cáncer." },
  frequency: "muy-frecuente",
  intro: "“Me toqué un bulto en la mama derecha que se mueve. No duele. Me asusté mucho.”",
  vitals: { TA: "110/70 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("bulto", "¿Desde cuándo y cambió con el ciclo?", "clave", "“Hace dos meses, no cambia.”", "Nódulo estable."),
    act("familia", "¿Familia con cáncer de mama u ovario?", "clave", "“No.”", "Bajo riesgo."),
    act("pezon", "¿Secreción por el pezón o cambios en la piel?", "clave", "“No.”", "Signos de alarma."),
    act("anticonceptivos", "¿Tomás anticonceptivos?", "util", "“Sí.”", "Contexto."),
    act("crecimiento", "¿Creció rápido?", "util", "“No.”", "Tumor filoides."),
    act("carrera", "¿Qué año cursás?", "neutro", "“Tercero.”", "No orienta."),
  ],
  exam: [
    act("nodulo", "Examen mamario", "clave", "Nódulo de 2 cm, bien delimitado, elástico, muy móvil, indoloro.", "Típico de fibroadenoma."),
    act("axila", "Axilas", "clave", "Sin adenopatías.", "Benigno."),
    act("piel", "Piel y pezón", "util", "Normales.", "Sin signos de malignidad."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía mamaria", "clave", "Nódulo sólido ovalado, paralelo a la piel, bordes circunscriptos, BI-RADS 3.", "Probablemente benigno."),
    study("Otros", "biopsia-core", "Biopsia con aguja gruesa si crece o hay dudas", "util", "No hizo falta.", "Confirmación."),
    study("Imágenes", "mamografia", "Mamografía", "innecesario", "No se realizó.", "No indicada a los 21 años."),
    study("Otros", "cirugia-ya", "Extirpación inmediata", "riesgoso", "No se indicó.", "Sin indicación en BI-RADS 3 estable."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fibroadenoma", "Fibroadenoma mamario (BI-RADS 3)", true, "Mujer joven con nódulo móvil, elástico, bien delimitado y ecografía típica."),
      dx("quiste", "Quiste mamario", false, "Es sólido en la ecografía."),
      dx("cancer", "Cáncer de mama", false, "Bordes circunscriptos, joven y sin alarma."),
      dx("filoides", "Tumor filoides", false, "No creció rápido ni es grande."),
      dx("mastitis", "Mastitis", false, "Sin signos inflamatorios."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("control", "Control ecográfico a los 6 meses", "clave", "BI-RADS 3."),
      mg("tranquilizar", "Explicar que es benigno", "clave", "Reduce la angustia."),
      mg("autoexamen", "Conocer sus mamas y consultar si crece", "clave", "Detección de cambios."),
      mg("biopsia-si-crece", "Biopsia o extirpación si crece más de 20 % o supera 3 cm", "util", "Descartar filoides."),
      mg("suspender-acos", "Suspender anticonceptivos", "riesgoso", "Sin relación causal."),
      mg("mamografia-anual", "Mamografía anual", "riesgoso", "Radiación innecesaria en joven."),
    ],
  },
  debrief: {
    diagnosis: "Fibroadenoma mamario BI-RADS 3, en mujer de 21 años.",
    pathologies: [
      { name: "Fibroadenoma", role: "principal", why: "Tumor benigno fibroepitelial." },
      { name: "Ansiedad", role: "asociada", why: "Miedo al cáncer." },
      { name: "Quiste, filoides", role: "diferencial", why: "Otras masas." },
    ],
    reasoning: [
      "Causa: proliferación del estroma y epitelio sensible a hormonas.",
      "Mecanismo: nódulo encapsulado que crece poco.",
      "Consecuencia: masa móvil benigna, sin riesgo relevante de cáncer.",
    ],
    epidemiology:
      "Es el tumor mamario más frecuente en mujeres jóvenes. En menores de 30 se estudia con ecografía, no con mamografía. Los que crecen rápido se biopsian para descartar tumor filoides.",
    management: [
      "Examen y ecografía.",
      "BI-RADS 3: control.",
      "Biopsia si cambia.",
      "Tranquilizar.",
    ],
    sources: ["Sociedad Argentina de Mastología — Patología mamaria benigna.", "ACR — BI-RADS Atlas."],
    pearls: ["Móvil y elástico.", "Ecografía en jóvenes.", "Controlar."],
    pitfalls: ["Mamografía a los 21.", "Operar todos."],
    tribunal: [
      qa("¿Qué significa BI-RADS 3?", "Probablemente benigno, con menos de 2 % de malignidad; se controla en 6 meses."),
      qa("¿Qué es el tumor filoides?", "Tumor fibroepitelial de crecimiento rápido que puede ser maligno."),
      qa("¿A qué edad se empieza el tamizaje mamográfico?", "En general a los 50 años en población de riesgo promedio (algunos desde los 40)."),
    ],
  },
};
