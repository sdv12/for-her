import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gravesOrbitopatiaVaron: ClinicalCase = {
  id: "graves-orbitopatia-varon",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 44, ageUnit: "años", sex: "M", context: "Fuma 20 cigarrillos por día. Chofer de camión." },
  frequency: "poco-frecuente",
  intro: "“Me dicen que tengo los ojos saltones, me arden, veo doble al mirar para arriba y bajé ocho kilos comiendo más.”",
  vitals: { TA: "142/70 mmHg", FC: "112 lpm", "T°": "37,1 °C", Peso: "70 kg" },
  anamnesis: [
    act("ojos", "¿Qué le pasa en los ojos?", "clave", "“Arden, lagrimean, y veo doble mirando arriba.”", "Orbitopatía activa."),
    act("tirotoxicosis", "¿Calor, palpitaciones, temblor, diarrea?", "clave", "“Todo eso.”", "Hipertiroidismo."),
    act("tabaco", "¿Cuánto fuma?", "clave", "“Un atado por día.”", "Factor de riesgo de orbitopatía."),
    act("vision", "¿Ve menos o los colores más apagados?", "util", "“No.”", "Neuropatía óptica."),
    act("familia", "¿Familia con tiroides?", "util", "“Mi hermana tiene hipotiroidismo.”", "Autoinmunidad."),
    act("ruta", "¿Qué rutas hace?", "neutro", "“Córdoba a Rosario.”", "No orienta."),
  ],
  exam: [
    act("ojos-ex", "Examen ocular", "clave", "Proptosis bilateral, retracción palpebral, edema y enrojecimiento de párpados, limitación de la elevación.", "Orbitopatía de Graves activa."),
    act("tiroides", "Tiroides", "clave", "Bocio difuso con soplo.", "Graves."),
    act("piel", "Piel y temblor", "util", "Piel caliente, temblor fino.", "Tirotoxicosis."),
  ],
  studies: [
    study("Laboratorio", "tiroideo", "TSH, T4L, T3 y TRAb", "clave", "TSH suprimida; T4L y T3 altas; TRAb positivos.", "Graves."),
    study("Otros", "oftalmo", "Evaluación oftalmológica con agudeza, colores y CAS", "clave", "CAS 5/7; agudeza y colores normales.", "Orbitopatía activa moderada sin neuropatía."),
    study("Imágenes", "eco", "Ecografía tiroidea con Doppler", "util", "Glándula aumentada e hipervascular.", "Apoya."),
    study("Otros", "iodo-ya", "Iodo radiactivo inmediato como primera medida", "riesgoso", "No se realizó.", "Empeora la orbitopatía activa, más en fumadores."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("graves-orbitopatia", "Enfermedad de Graves con orbitopatía activa moderada", true, "Tirotoxicosis, bocio difuso con soplo, TRAb positivos y proptosis con signos inflamatorios."),
      dx("bocio-toxico", "Bocio multinodular tóxico", false, "Bocio difuso y orbitopatía."),
      dx("tiroiditis", "Tiroiditis silente", false, "Orbitopatía y TRAb positivos."),
      dx("celulitis-orbitaria", "Celulitis orbitaria", false, "Bilateral, sin fiebre y con tirotoxicosis."),
      dx("tumor-orbita", "Tumor orbitario", false, "Bilateral con contexto tiroideo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metimazol", "Metimazol y betabloqueante", "clave", "Control del hipertiroidismo."),
      mg("tabaco", "Dejar de fumar", "clave", "Empeora la orbitopatía y la respuesta."),
      mg("oftalmo", "Manejo conjunto con oftalmología y corticoides EV si persiste la actividad", "clave", "Orbitopatía activa moderada."),
      mg("selenio", "Lágrimas artificiales y selenio", "util", "Formas leves y síntomas."),
      mg("iodo-sin-corticoide", "Iodo radiactivo sin protección con corticoides", "riesgoso", "Empeora la orbitopatía."),
      mg("manejar", "Seguir manejando de noche con diplopía", "riesgoso", "Riesgo vial."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Graves con orbitopatía activa moderada, en varón fumador de 44 años.",
    pathologies: [
      { name: "Enfermedad de Graves", role: "principal", why: "Hipertiroidismo autoinmune por TRAb." },
      { name: "Orbitopatía de Graves", role: "asociada", why: "Inflamación de tejidos orbitarios." },
      { name: "Bocio tóxico, celulitis orbitaria", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: anticuerpos contra el receptor de TSH.",
      "Mecanismo: estimulan tiroides y fibroblastos orbitarios, con más grasa y músculos inflamados.",
      "Consecuencia: tirotoxicosis, proptosis, diplopía y riesgo de neuropatía óptica.",
    ],
    epidemiology:
      "Graves es más común en mujeres, pero la orbitopatía grave es proporcionalmente más frecuente en varones y fumadores. El tabaco es el factor modificable más importante. La neuropatía óptica es la complicación que amenaza la visión.",
    management: [
      "TRAb.",
      "Metimazol.",
      "Dejar de fumar.",
      "Oftalmología.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipertiroidismo.", "EUGOGO — Guidelines for the Management of Graves' Orbitopathy."],
    pearls: ["Fumar empeora los ojos.", "Iodo puede empeorar la orbitopatía.", "Controlá la visión de colores."],
    pitfalls: ["Iodo sin corticoide.", "No mirar los ojos."],
    tribunal: [
      qa("¿Qué es el CAS?", "Clinical Activity Score: siete signos inflamatorios que definen si la orbitopatía está activa."),
      qa("¿Qué signo indica neuropatía óptica?", "Pérdida de agudeza o de visión de colores y defecto pupilar aferente."),
      qa("¿Qué efecto adverso grave tiene el metimazol?", "Agranulocitosis; consultar ante fiebre y dolor de garganta."),
    ],
  },
};
