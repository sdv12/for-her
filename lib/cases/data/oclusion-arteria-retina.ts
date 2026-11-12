import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const oclusionArteriaRetina: ClinicalCase = {
  id: "oclusion-arteria-central-retina",
  level: 3,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "M", context: "Hipertenso, diabético, tabaquista. Estenosis carotídea conocida." },
  frequency: "poco-frecuente",
  intro: "“Hace una hora perdí la vista del ojo derecho de golpe, como si bajara una cortina negra. No duele.”",
  vitals: { TA: "168/94 mmHg", FC: "84 lpm", "T°": "36,4 °C", Glucemia: "164 mg/dl" },
  anamnesis: [
    act("inicio", "¿Fue súbito? ¿Duele?", "clave", "“Súbito, sin dolor.”", "Vascular."),
    act("previos", "¿Episodios transitorios antes?", "clave", "“Una vez se me nubló unos minutos.”", "Amaurosis fugaz."),
    act("arteritis", "¿Dolor al masticar, cefalea, dolor de hombros?", "clave", "“No.”", "Arteritis temporal."),
    act("palpitaciones", "¿Palpitaciones?", "util", "“A veces.”", "FA."),
    act("neuro", "¿Debilidad o dificultad para hablar?", "util", "“No.”", "ACV."),
    act("trabajo", "¿A qué te dedicabas?", "neutro", "“Ferroviario.”", "No orienta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual", "clave", "Percepción de luz.", "Grave."),
    act("fondo", "Fondo de ojo", "clave", "Retina pálida con mancha rojo cereza en la mácula.", "Típico."),
    act("cuello", "Soplo carotídeo y pulso", "util", "Soplo carotídeo derecho; pulso irregular.", "Fuente embólica."),
  ],
  studies: [
    study("Laboratorio", "vsg", "VSG y PCR urgentes", "clave", "Normales.", "Excluye arteritis."),
    study("Imágenes", "doppler", "Doppler carotídeo", "clave", "Estenosis del 80 % en carótida derecha.", "Fuente."),
    study("Electrofisiología", "ecg", "ECG y Holter", "clave", "FA.", "Fuente."),
    study("Imágenes", "rmn", "RM de cerebro", "util", "Pequeños infartos silentes.", "Es un equivalente de ACV."),
    study("Otros", "turno", "Turno con oftalmología en una semana", "riesgoso", "No se realizó.", "Es una urgencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("oacr", "Oclusión de la arteria central de la retina embólica", true, "Pérdida súbita indolora con mancha rojo cereza, estenosis carotídea y FA."),
      dx("arteritis", "Arteritis de células gigantes", false, "VSG y PCR normales."),
      dx("desprendimiento", "Desprendimiento de retina", false, "Fondo típico de oclusión."),
      dx("hemorragia", "Hemorragia vítrea", false, "Se ve el fondo."),
      dx("venosa", "Oclusión venosa", false, "Daría hemorragias en llama."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ictus", "Activar protocolo de ACV en centro con experiencia", "clave", "Es un ACV ocular."),
      mg("prevencion", "Prevención secundaria: anticoagulación por FA, estatina", "clave", "Evita ACV cerebral."),
      mg("endarterectomia", "Evaluar endarterectomía carotídea", "clave", "Estenosis sintomática."),
      mg("factores", "Control de presión, diabetes y tabaco", "util", "Prevención."),
      mg("alta", "Alta con control oftalmológico ambulatorio", "riesgoso", "Riesgo de ACV."),
      mg("gotas", "Gotas de lágrimas", "riesgoso", "No trata."),
    ],
  },
  debrief: {
    diagnosis: "Oclusión de la arteria central de la retina derecha de origen embólico, con estenosis carotídea y FA, en varón de 72 años.",
    pathologies: [
      { name: "Oclusión arterial retiniana", role: "principal", why: "ACV ocular." },
      { name: "Estenosis carotídea y FA", role: "asociada", why: "Fuentes." },
      { name: "Arteritis, desprendimiento", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: émbolo desde carótida o corazón.",
      "Mecanismo: isquemia de la retina interna.",
      "Consecuencia: pérdida visual y riesgo de ACV cerebral.",
    ],
    epidemiology:
      "Es una urgencia: la retina tolera minutos u horas de isquemia. Tiene los mismos factores que el ACV. Una parte importante de los pacientes tiene un ACV cerebral posterior si no se previene. En mayores de 50 años se excluye arteritis.",
    management: [
      "Tratar como ACV.",
      "Excluir arteritis.",
      "Buscar fuente.",
      "Prevención secundaria.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Urgencias oftalmológicas.", "American Heart Association — Central Retinal Artery Occlusion Scientific Statement."],
    pearls: ["Mancha rojo cereza.", "Es un ACV.", "Pedí VSG."],
    pitfalls: ["Turno diferido.", "Olvidar la fuente."],
    tribunal: [
      qa("¿Qué es la amaurosis fugaz?", "Pérdida visual monocular transitoria, equivalente de AIT carotídeo."),
      qa("¿Por qué la mácula se ve rojo cereza?", "La fóvea recibe sangre de la coroides y contrasta con la retina pálida."),
      qa("¿Cuándo se opera una estenosis carotídea sintomática?", "Si es del 70 % o más (y en casos seleccionados del 50 %), dentro de las dos semanas."),
    ],
  },
};
