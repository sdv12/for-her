import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artritisSepticaAdulto: ClinicalCase = {
  id: "artritis-septica-rodilla-adulto",
  level: 3,
  area: "Reumatología",
  setting: "Guardia",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Diabético y con artrosis de rodilla. Le infiltraron la rodilla derecha con corticoides hace 10 días." },
  frequency: "frecuente",
  intro: "“Desde hace dos días la rodilla derecha está hinchada, roja, caliente, no la puedo mover y tengo fiebre.”",
  vitals: { TA: "118/70 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "38,7 °C", "SatO₂": "96 %", Glucemia: "286 mg/dl" },
  anamnesis: [
    act("infiltracion", "¿Le hicieron algo en la rodilla?", "clave", "“Una infiltración hace 10 días.”", "Puerta de entrada."),
    act("fiebre", "¿Fiebre?", "clave", "“Sí, con escalofríos.”", "Infección."),
    act("gota", "¿Tuvo gota?", "clave", "“No.”", "Diferencial."),
    act("piel", "¿Heridas en la pierna?", "util", "“No.”", "Otra puerta."),
    act("diabetes", "¿Cómo controla la diabetes?", "util", "“Mal.”", "Factor de riesgo."),
    act("trabajo", "¿Qué hacía?", "neutro", "“Era chapista.”", "No orienta."),
  ],
  exam: [
    act("rodilla", "Rodilla derecha", "clave", "Derrame a tensión, calor, eritema y dolor a cualquier movimiento.", "Artritis aguda."),
    act("piel-ex", "Sitio de infiltración", "clave", "Sin absceso.", "Base."),
    act("otras", "Otras articulaciones", "util", "Normales.", "Monoartritis."),
  ],
  studies: [
    study("Laboratorio", "artrocentesis", "Artrocentesis con recuento, Gram, cultivo y cristales", "clave", "Líquido purulento, 85.000 leucocitos (95 % PMN), cocos grampositivos en racimos, sin cristales.", "Artritis séptica."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "S. aureus.", "Bacteriemia."),
    study("Laboratorio", "lab", "Hemograma, PCR, creatinina", "util", "Leucocitos 16.000; PCR alta.", "Inflamación."),
    study("Otros", "infiltrar-mas", "Infiltrar de nuevo con corticoides", "riesgoso", "No se hizo.", "Empeora la infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("septica", "Artritis séptica de rodilla por S. aureus tras infiltración, en diabético", true, "Monoartritis aguda febril, infiltración reciente, líquido purulento y Gram con cocos en racimos."),
      dx("gota", "Gota", false, "Sin cristales y Gram positivo."),
      dx("pseudogota", "Pseudogota", false, "Sin cristales."),
      dx("artrosis-brote", "Brote de artrosis", false, "Fiebre y líquido purulento."),
      dx("celulitis", "Celulitis prerrotuliana", false, "Hay derrame articular purulento."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje articular (artrocentesis repetidas o artroscopia)", "clave", "Control del foco."),
      mg("atb", "Vancomicina empírica y ajuste según antibiograma", "clave", "Cubre SAMR hasta tener sensibilidad."),
      mg("glucemia", "Control de la glucemia", "clave", "Factor."),
      mg("kinesio", "Movilización temprana tras el drenaje", "util", "Evitar rigidez."),
      mg("aines-solos", "Solo AINE y reposo", "riesgoso", "Destrucción articular."),
      mg("esperar-cultivo", "Esperar el cultivo para empezar antibiótico", "riesgoso", "Destrucción del cartílago en días."),
    ],
  },
  debrief: {
    diagnosis: "Artritis séptica de rodilla por S. aureus con bacteriemia tras infiltración con corticoides, en varón diabético de 70 años.",
    pathologies: [
      { name: "Artritis séptica", role: "principal", why: "Infección intraarticular." },
      { name: "Infiltración, diabetes y artrosis", role: "asociada", why: "Factores." },
      { name: "Gota, pseudogota", role: "diferencial", why: "Otras monoartritis agudas." },
    ],
    reasoning: [
      "Causa: inoculación de S. aureus en la infiltración.",
      "Mecanismo: proliferación bacteriana con enzimas que destruyen cartílago.",
      "Consecuencia: daño articular permanente y sepsis.",
    ],
    epidemiology:
      "Toda monoartritis aguda febril es séptica hasta demostrar lo contrario. S. aureus es el germen más frecuente en adultos. Diabetes, artrosis, prótesis e infiltraciones son factores de riesgo.",
    management: [
      "Punzar.",
      "Antibiótico.",
      "Drenaje.",
      "Rehabilitación.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Artritis séptica.", "EULAR — Recommendations for the Management of Septic Arthritis."],
    pearls: ["Monoartritis caliente: punzar.", "Más de 50.000 leucocitos.", "Gota y séptica pueden coexistir."],
    pitfalls: ["No punzar.", "Infiltrar."],
    tribunal: [
      qa("¿Qué germen sospechar en un joven sexualmente activo?", "Neisseria gonorrhoeae."),
      qa("¿Pueden coexistir cristales e infección?", "Sí, por eso siempre se cultiva aunque haya cristales."),
      qa("¿Cuánto dura el antibiótico?", "En general 3 a 6 semanas según germen y evolución."),
    ],
  },
};
