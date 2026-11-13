import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nefritisIntersticialAguda: ClinicalCase = {
  id: "nefritis-intersticial-aguda",
  level: 3,
  area: "Nefrourología",
  setting: "Internación",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Toma omeprazol hace dos meses. Hace 10 días empezó amoxicilina por una sinusitis." },
  frequency: "poco-frecuente",
  intro: "“Me salió un sarpullido en todo el cuerpo, tengo fiebre y me dijeron que los riñones me funcionan mal.”",
  vitals: { TA: "136/82 mmHg", FC: "94 lpm", FR: "18 rpm", "T°": "38,0 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("farmacos", "¿Qué medicamentos empezó en los últimos meses?", "clave", "“Omeprazol y después amoxicilina.”", "Causa principal: fármacos."),
    act("rash", "¿Cuándo empezó el sarpullido?", "clave", "“Hace tres días, pica.”", "Hipersensibilidad."),
    act("diuresis", "¿Orina igual?", "clave", "“Un poco menos.”", "IRA."),
    act("aines", "¿Toma antiinflamatorios?", "util", "“A veces ibuprofeno.”", "Otra causa."),
    act("articulaciones", "¿Dolores articulares?", "util", "“Algo.”", "Tríada clásica."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Tejer.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Exantema maculopapular generalizado.", "Hipersensibilidad."),
    act("volemia", "Volemia", "clave", "Euvolémica, sin edemas.", "No es prerrenal ni nefrítico."),
    act("lumbar", "Puñopercusión", "util", "Molestia bilateral leve.", "Inflamación renal."),
  ],
  studies: [
    study("Laboratorio", "renal", "Creatinina, urea, ionograma, hemograma", "clave", "Creatinina 3,2 (basal 0,8); eosinofilia 9 %.", "IRA con eosinofilia."),
    study("Laboratorio", "orina", "Sedimento urinario y proteinuria", "clave", "Leucocituria estéril, cilindros leucocitarios, proteinuria leve.", "Patrón intersticial."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñones de tamaño normal, sin obstrucción.", "Excluye obstrucción."),
    study("Otros", "biopsia-ya", "Biopsia renal antes de suspender los fármacos", "innecesario", "No se realizó al inicio.", "Primero se suspende; biopsia si no mejora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nia", "Nefritis intersticial aguda por fármacos", true, "Fármaco nuevo, fiebre, exantema, eosinofilia, leucocituria estéril y cilindros leucocitarios."),
      dx("pielonefritis", "Pielonefritis bilateral", false, "Leucocituria estéril y exantema."),
      dx("glomerulonefritis", "Glomerulonefritis aguda", false, "Sin hematuria dismórfica, edemas ni hipertensión."),
      dx("prerrenal", "IRA prerrenal", false, "Euvolémica y sedimento activo."),
      dx("nta", "Necrosis tubular aguda", false, "Sin isquemia y con eosinofilia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender amoxicilina, omeprazol e ibuprofeno", "clave", "Es el tratamiento principal."),
      mg("corticoides", "Corticoides si no mejora en pocos días", "clave", "Pueden acelerar la recuperación."),
      mg("monitoreo", "Control de creatinina, diuresis y potasio", "clave", "Evolución."),
      mg("registro", "Registrar la alergia en la historia clínica", "util", "Evitar reexposición."),
      mg("otro-ibp", "Cambiar a otro inhibidor de bomba sin indicación", "riesgoso", "Puede repetir la reacción."),
      mg("contraste", "TC con contraste para ver los riñones", "riesgoso", "Nefrotóxico y no aporta."),
    ],
  },
  debrief: {
    diagnosis: "Nefritis intersticial aguda por fármacos (betalactámico e inhibidor de bomba de protones), en mujer de 58 años.",
    pathologies: [
      { name: "Nefritis intersticial aguda", role: "principal", why: "Inflamación inmune del intersticio." },
      { name: "Hipersensibilidad a fármacos", role: "asociada", why: "Exantema y eosinofilia." },
      { name: "Pielonefritis, glomerulonefritis", role: "diferencial", why: "Otras causas de IRA." },
    ],
    reasoning: [
      "Causa: betalactámicos, inhibidores de bomba y AINE.",
      "Mecanismo: hipersensibilidad con infiltrado de linfocitos y eosinófilos en el intersticio.",
      "Consecuencia: IRA con leucocituria estéril.",
    ],
    epidemiology:
      "Los fármacos causan la mayoría de las nefritis intersticiales. Los inhibidores de bomba, muy usados sin indicación, son una causa creciente en adultos mayores. La tríada completa de fiebre, exantema y eosinofilia aparece en una minoría.",
    management: [
      "Sospechar ante fármaco nuevo.",
      "Suspender.",
      "Corticoides si no mejora.",
      "Biopsia si hay dudas.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Injuria renal aguda.", "KDIGO — Clinical Practice Guideline for Acute Kidney Injury."],
    pearls: ["IRA con fármaco nuevo: pensala.", "Leucocituria estéril.", "La tríada es la excepción."],
    pitfalls: ["Seguir con el fármaco.", "Tratar como infección."],
    tribunal: [
      qa("¿Cuál es la tríada clásica?", "Fiebre, exantema y eosinofilia, presente en menos de un tercio de los casos."),
      qa("¿Qué otras causas hay además de fármacos?", "Infecciones, sarcoidosis, Sjögren y nefritis tubulointersticial con uveítis."),
      qa("¿Cómo se confirma?", "Con biopsia renal, que muestra infiltrado intersticial con eosinófilos."),
    ],
  },
};
