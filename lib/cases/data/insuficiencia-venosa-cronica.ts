import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const insuficienciaVenosaCronica: ClinicalCase = {
  id: "insuficiencia-venosa-cronica",
  level: 1,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 48, ageUnit: "años", sex: "F", context: "Peluquera, trabaja de pie. Tres embarazos. Madre con várices." },
  frequency: "muy-frecuente",
  intro: "“Al final del día tengo las piernas pesadas, hinchadas y me pican. Tengo venas gruesas que me dan vergüenza.”",
  vitals: { TA: "124/78 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "78 kg" },
  anamnesis: [
    act("sintomas", "¿Cuándo empeoran los síntomas?", "clave", "“A la tarde, mejoran con las piernas en alto.”", "Patrón venoso."),
    act("trombosis", "¿Tuvo trombosis o la pierna muy hinchada de golpe?", "clave", "“No.”", "Síndrome postrombótico."),
    act("arterial", "¿Dolor al caminar que la obliga a parar?", "clave", "“No.”", "Descartar claudicación."),
    act("familia", "¿Familia con várices?", "util", "“Mi mamá.”", "Herencia."),
    act("anticonceptivos", "¿Toma hormonas?", "util", "“No.”", "Factor de riesgo."),
    act("clientas", "¿Cuántas clientas atiende?", "neutro", "“Unas diez por día.”", "No orienta."),
  ],
  exam: [
    act("varices", "Inspección de pie", "clave", "Várices en territorio de safena interna, edema maleolar, pigmentación ocre en tobillos.", "CEAP C4a."),
    act("pulsos", "Pulsos pedios", "clave", "Presentes.", "Sin enfermedad arterial."),
    act("ulcera", "Úlceras", "util", "Ausentes.", "Sin C6."),
  ],
  studies: [
    study("Imágenes", "doppler", "Eco Doppler venoso", "clave", "Reflujo en unión safenofemoral y safena interna, sistema profundo permeable.", "Insuficiencia superficial."),
    study("Otros", "itb", "Índice tobillo-brazo", "util", "1,05.", "Permite compresión."),
    study("Laboratorio", "lab", "Función renal y albúmina", "util", "Normales.", "Otras causas de edema."),
    study("Imágenes", "flebografia", "Flebografía", "innecesario", "No se realizó.", "El Doppler alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ivc", "Insuficiencia venosa crónica con várices de safena interna y cambios tróficos (CEAP C4a)", true, "Pesadez vespertina, várices, edema, pigmentación y reflujo safenofemoral."),
      dx("tvp", "Trombosis venosa profunda", false, "Bilateral, crónico y profundo permeable."),
      dx("arterial", "Enfermedad arterial periférica", false, "Pulsos y ITB normales."),
      dx("linfedema", "Linfedema", false, "Hay várices y mejora al elevar."),
      dx("ic", "Insuficiencia cardíaca", false, "Sin disnea ni congestión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("compresion", "Medias de compresión", "clave", "Base del tratamiento."),
      mg("habitos", "Elevar las piernas, caminar y bajar de peso", "clave", "Mejoran el retorno."),
      mg("ablacion", "Derivar para ablación endovenosa o cirugía de safena", "clave", "Reflujo con cambios de piel."),
      mg("piel", "Emolientes en la piel pigmentada", "util", "Prevenir úlcera."),
      mg("diureticos", "Diuréticos para el edema", "riesgoso", "No trata la causa y deshidrata."),
      mg("rascado", "Corticoide potente permanente en la piel", "riesgoso", "Atrofia y úlceras."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia venosa crónica con várices de safena interna y cambios tróficos (CEAP C4a), en mujer de 48 años.",
    pathologies: [
      { name: "Insuficiencia venosa crónica", role: "principal", why: "Reflujo venoso superficial." },
      { name: "Bipedestación, embarazos y herencia", role: "asociada", why: "Factores de riesgo." },
      { name: "TVP, enfermedad arterial", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: válvulas venosas incompetentes con factores hereditarios y hormonales.",
      "Mecanismo: hipertensión venosa en la pierna al estar de pie.",
      "Consecuencia: edema, pigmentación, dermatitis y úlcera venosa.",
    ],
    epidemiology:
      "Es muy frecuente, sobre todo en mujeres que trabajan de pie y con varios embarazos. Los cambios de piel indican riesgo de úlcera. Antes de indicar compresión se descarta enfermedad arterial.",
    management: [
      "Clínica y Doppler.",
      "Descartar arterial.",
      "Compresión.",
      "Tratamiento del reflujo.",
    ],
    sources: ["Colegio Argentino de Cirugía Venosa y Linfática — Insuficiencia venosa crónica.", "ESVS — Clinical Practice Guidelines on Chronic Venous Disease."],
    pearls: ["Pesadez a la tarde.", "Pigmentación: riesgo de úlcera.", "Pulsos antes de comprimir."],
    pitfalls: ["Diuréticos.", "Compresión con isquemia."],
    tribunal: [
      qa("¿Qué es la clasificación CEAP?", "Clasifica clínica, etiología, anatomía y fisiopatología de la enfermedad venosa crónica."),
      qa("¿Cuándo no se indica compresión?", "Con índice tobillo-brazo menor de 0,5 o insuficiencia arterial grave."),
      qa("¿Dónde aparece la úlcera venosa típica?", "En la cara interna del tobillo, sobre el maléolo medial."),
    ],
  },
};
