import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperemesis: ClinicalCase = {
  id: "hiperemesis-gravidica",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "F", context: "Embarazo de 9 semanas, el primero." },
  frequency: "frecuente",
  intro: "“Vomito todo lo que como y tomo, hace una semana. Bajé cuatro kilos. Estoy muy débil y casi no hago pis.”",
  vitals: { TA: "96/60 mmHg", FC: "112 lpm", FR: "18 rpm", "T°": "36,6 °C", Peso: "54 kg" },
  anamnesis: [
    act("vomitos", "¿Cuántas veces vomitás por día? ¿Tolerás algo?", "clave", "“Más de diez, ni el agua.”", "Vómitos incoercibles: hiperemesis, no las náuseas habituales del embarazo."),
    act("peso", "¿Cuánto pesabas antes del embarazo?", "clave", "“58 kilos.”", "Pérdida de más del 5 % del peso: criterio de hiperemesis."),
    act("dolor", "¿Tenés dolor de panza, fiebre, diarrea o dolor de cabeza?", "clave", "“No, nada de eso.”", "Sin otros síntomas: orienta a causa obstétrica y no a otra enfermedad."),
    act("orina", "¿Te arde al orinar?", "util", "“No.”", "Descarta infección urinaria."),
    act("tiroides", "¿Palpitaciones, temblor?", "util", "“Algo de palpitaciones.”", "La hCG puede producir hipertiroidismo transitorio."),
    act("antojo", "¿Tuviste antojos?", "neutro", "“De mandarinas.”", "No orienta."),
  ],
  exam: [
    act("hidratacion", "Hidratación", "clave", "Mucosas secas, ojos hundidos, taquicardia.", "Deshidratación."),
    act("abdomen", "Abdomen", "clave", "Blando, indoloro.", "Descarta abdomen agudo."),
    act("neuro", "Examen neurológico y movimientos oculares", "util", "Normal, sin nistagmo.", "Descarta encefalopatía de Wernicke, complicación grave de la hiperemesis."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, función renal, glucemia, hepatograma, gases", "clave", "K 3,0, Na 132, urea 48, alcalosis metabólica hipoclorémica.", "Alteraciones por los vómitos."),
    study("Laboratorio", "orina", "Orina completa con cetonuria", "clave", "Cetonuria +++, densidad 1030.", "Ayuno y deshidratación."),
    study("Imágenes", "eco", "Ecografía obstétrica", "clave", "Embarazo único, vital, de 9 semanas.", "Descarta embarazo múltiple y mola (causas de hCG muy alta)."),
    study("Laboratorio", "tsh", "TSH y T4 libre", "util", "TSH baja, T4 libre levemente alta.", "Hipertiroidismo gestacional transitorio."),
    study("Imágenes", "tc", "Tomografía de abdomen", "riesgoso", "No se realizó.", "Radiación innecesaria en el embarazo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hg", "Hiperemesis gravídica con deshidratación, cetosis, hipopotasemia e hipertiroidismo gestacional transitorio", true, "Vómitos incoercibles en el primer trimestre con pérdida de más del 5 % del peso, cetonuria y alteraciones electrolíticas, con embarazo único normal."),
      dx("emesis", "Náuseas y vómitos leves del embarazo", false, "No toleran ni el agua y hay pérdida de peso y deshidratación."),
      dx("mola", "Enfermedad trofoblástica (mola)", false, "La ecografía muestra un embarazo normal."),
      dx("graves", "Enfermedad de Graves", false, "El hipertiroidismo de la hiperemesis es transitorio, sin bocio ni oftalmopatía."),
      dx("gastroenteritis", "Gastroenteritis", false, "No hay diarrea ni fiebre y lleva una semana."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación EV con solución fisiológica y potasio", "clave", "Corrige la deshidratación y los electrolitos."),
      mg("tiamina", "Tiamina antes de dar soluciones con glucosa", "clave", "Previene la encefalopatía de Wernicke."),
      mg("antiemeticos", "Antieméticos seguros (doxilamina-piridoxina, metoclopramida u ondansetrón según la edad gestacional)", "clave", "Reducen los vómitos."),
      mg("realimentacion", "Realimentación progresiva y apoyo psicológico", "util", "La hiperemesis afecta mucho la calidad de vida."),
      mg("antitiroideo", "Antitiroideos", "innecesario", "El hipertiroidismo gestacional transitorio no se trata."),
      mg("ayuno-prolongado", "Ayuno absoluto por varios días", "riesgoso", "Empeora la cetosis y la desnutrición."),
    ],
  },
  debrief: {
    diagnosis: "Hiperemesis gravídica a las 9 semanas con deshidratación, cetosis, hipopotasemia, alcalosis hipoclorémica e hipertiroidismo gestacional transitorio, en primigesta de 24 años.",
    pathologies: [
      { name: "Hiperemesis gravídica", role: "principal", why: "Vómitos incoercibles con pérdida de peso y alteraciones metabólicas." },
      { name: "Hipertiroidismo gestacional transitorio", role: "asociada", why: "Efecto de la hCG sobre el receptor de TSH." },
      { name: "Mola, Graves, gastroenteritis", role: "diferencial", why: "Otras causas de vómitos en el embarazo." },
    ],
    reasoning: [
      "Causa: niveles altos de hCG y estrógenos, y factores genéticos (GDF15).",
      "Mecanismo: estimulación del centro del vómito; la hCG además estimula el receptor de TSH.",
      "Consecuencia: deshidratación, hipopotasemia, alcalosis, cetosis, pérdida de peso, déficit de tiamina (Wernicke) y deterioro de la calidad de vida.",
    ],
    epidemiology:
      "Las náuseas y vómitos afectan a la mayoría de las embarazadas, pero la hiperemesis gravídica ocurre en el 0,3 a 3 %. Es más frecuente en primigestas, embarazos múltiples, mola y antecedentes de hiperemesis. Es la causa más común de internación en el primer trimestre.",
    management: [
      "Evaluar gravedad (peso, hidratación, cetonuria, electrolitos).",
      "Hidratación, potasio y tiamina; antieméticos escalonados.",
      "Ecografía para descartar embarazo múltiple o mola.",
      "Realimentación y apoyo; nutrición enteral o parenteral si no responde.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del embarazo.", "FASGO — Consenso de náuseas y vómitos del embarazo."],
    pearls: ["Más de 5 % de pérdida de peso + cetonuria = hiperemesis.", "Tiamina antes de la glucosa.", "Ecografía: descartar mola y múltiples."],
    pitfalls: ["Tratar el hipertiroidismo transitorio.", "Dar glucosa sin tiamina."],
    tribunal: [
      qa("¿Qué antieméticos se usan en el embarazo?", "Primera línea: doxilamina con piridoxina; luego metoclopramida, antihistamínicos (dimenhidrinato) y ondansetrón (con cautela en el primer trimestre); corticoides en casos refractarios después de la semana 10."),
      qa("¿Por qué la hiperemesis produce hipertiroidismo transitorio?", "Porque la hCG comparte la subunidad alfa con la TSH y estimula el receptor tiroideo; se normaliza al bajar la hCG después de la semana 14–18 y no requiere antitiroideos."),
      qa("¿Qué es la enfermedad trofoblástica gestacional?", "La proliferación anormal del trofoblasto (mola hidatiforme completa o parcial, y neoplasias trofoblásticas): da sangrado, útero grande, hCG muy alta, hiperemesis, preeclampsia temprana e hipertiroidismo; se diagnostica por ecografía y se trata con evacuación y seguimiento de la hCG."),
    ],
  },
};
