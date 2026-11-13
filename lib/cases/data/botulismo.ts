import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const botulismo: ClinicalCase = {
  id: "botulismo-alimentario",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Hace 2 días comió en familia escabeche de vizcacha casero en frasco." },
  frequency: "raro",
  intro: "“Veo doble, se me caen los párpados, me cuesta tragar y tengo la boca seca. A mi cuñado le pasa lo mismo.”",
  vitals: { TA: "128/80 mmHg", FC: "88 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("alimento", "¿Qué comió en los últimos días? ¿Conservas caseras?", "clave", "“Escabeche casero de vizcacha que estaba en un frasco.”", "Fuente."),
    act("otros", "¿Alguien más con síntomas?", "clave", "“Mi cuñado, que comió lo mismo.”", "Brote."),
    act("progresion", "¿Cómo avanzan los síntomas?", "clave", "“Empezó por los ojos, ahora me cuesta tragar y siento los brazos flojos.”", "Parálisis descendente."),
    act("sensibilidad", "¿Hormigueos o adormecimiento?", "util", "“No.”", "Sin compromiso sensitivo."),
    act("diarrea", "¿Vómitos o diarrea?", "util", "“Vomité al principio.”", "Pródromo digestivo."),
    act("trabajo", "¿Qué hace?", "neutro", "“Soy administrativa.”", "No orienta."),
  ],
  exam: [
    act("pares", "Pares craneales y pupilas", "clave", "Ptosis bilateral, oftalmoparesia, pupilas midriáticas poco reactivas, disartria.", "Compromiso bulbar."),
    act("fuerza", "Fuerza, reflejos y sensibilidad", "clave", "Debilidad proximal de brazos, reflejos disminuidos, sensibilidad normal, lúcida.", "Parálisis flácida descendente."),
    act("respiratorio", "Capacidad vital y tos", "util", "Tos débil.", "Riesgo de falla respiratoria."),
  ],
  studies: [
    study("Otros", "cv", "Capacidad vital forzada seriada", "clave", "1,8 litros, en descenso.", "Define la intubación."),
    study("Laboratorio", "toxina", "Toxina botulínica en suero, heces y en el alimento", "clave", "Toxina tipo A.", "Confirma."),
    study("Otros", "emg", "Electromiograma con estimulación repetitiva", "util", "Incremento con estímulo de alta frecuencia.", "Bloqueo presináptico."),
    study("Otros", "puncion", "Punción lumbar como estudio prioritario", "innecesario", "No se realizó al inicio.", "LCR normal; demora el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("botulismo", "Botulismo alimentario por conserva casera", true, "Parálisis descendente simétrica con pupilas midriáticas, lúcida, sin sensitivo y caso relacionado."),
      dx("guillain", "Guillain-Barré variante Miller Fisher", false, "Ascendente o con ataxia; no explica el brote."),
      dx("miastenia", "Crisis miasténica", false, "Pupilas comprometidas y brote alimentario."),
      dx("acv", "ACV de tronco", false, "Bilateral simétrico y brote."),
      dx("organofosforados", "Intoxicación por organofosforados", false, "Habría miosis y secreciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antitoxina", "Antitoxina botulínica lo antes posible, sin esperar confirmación", "clave", "Detiene la progresión."),
      mg("uti", "Terapia intensiva con control de capacidad vital e intubación si cae", "clave", "La causa de muerte es respiratoria."),
      mg("notificar", "Notificación inmediata y buscar a todos los que comieron", "clave", "Brote."),
      mg("alimento", "Retener el alimento sospechoso", "util", "Confirmar la fuente."),
      mg("aminoglucosidos", "Aminoglucósidos", "riesgoso", "Empeoran el bloqueo neuromuscular."),
      mg("esperar", "Esperar el resultado de la toxina para tratar", "riesgoso", "La antitoxina no revierte la parálisis ya instalada."),
    ],
  },
  debrief: {
    diagnosis: "Botulismo alimentario por toxina tipo A tras consumir escabeche casero, en mujer de 49 años, en un brote familiar.",
    pathologies: [
      { name: "Botulismo alimentario", role: "principal", why: "Toxina preformada en la conserva." },
      { name: "Riesgo de falla respiratoria", role: "asociada", why: "Debilidad del diafragma." },
      { name: "Miller Fisher, miastenia", role: "diferencial", why: "Otras parálisis." },
    ],
    reasoning: [
      "Causa: Clostridium botulinum en conserva casera sin acidez ni calor suficientes.",
      "Mecanismo: la toxina impide la liberación de acetilcolina en la unión neuromuscular.",
      "Consecuencia: parálisis flácida descendente y falla respiratoria.",
    ],
    epidemiology:
      "Argentina tiene una de las tasas de botulismo alimentario más altas de América, sobre todo en Mendoza, San Juan y la región pampeana, por conservas y escabeches caseros. También hay botulismo del lactante. Es de notificación inmediata.",
    management: [
      "Sospecha clínica.",
      "Antitoxina.",
      "Soporte ventilatorio.",
      "Notificar el brote.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de botulismo.", "CDC — Botulism Clinical Guidelines."],
    pearls: ["Descendente, simétrica, lúcida.", "Pupilas grandes.", "Conserva casera y más de un caso."],
    pitfalls: ["Esperar la confirmación.", "Aminoglucósidos."],
    tribunal: [
      qa("¿Qué es el botulismo del lactante?", "Colonización intestinal por esporas, asociada a miel; da constipación e hipotonía."),
      qa("¿Cómo se previene en conservas?", "Con acidez, salado y calor adecuados, y descartando frascos abombados."),
      qa("¿Por qué no hay fiebre?", "Porque es una intoxicación por toxina, no una infección invasiva."),
    ],
  },
};
