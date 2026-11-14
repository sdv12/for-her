import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const trastornoNeurologicoFuncional: ClinicalCase = {
  id: "trastorno-neurologico-funcional",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Enfermera. Hace una semana murió su padre. Sin antecedentes neurológicos." },
  frequency: "frecuente",
  intro: "“Desde hoy a la mañana no puedo mover la pierna izquierda. Me levanté y se me dobló.”",
  vitals: { TA: "122/76 mmHg", FC: "84 lpm", "T°": "36,5 °C", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe al levantarme.”", "Inicio brusco."),
    act("estres", "¿Pasó algo difícil en estos días?", "clave", "“Murió mi papá la semana pasada.”", "Factor de estrés (no es necesario para el diagnóstico)."),
    act("otros", "¿Dolor de cabeza, visión doble, dificultad para hablar?", "clave", "“No.”", "Síntomas acompañantes."),
    act("previos", "¿Síntomas parecidos antes?", "util", "“Una vez me quedé sin voz unos días.”", "Antecedente funcional."),
    act("consumo", "¿Alcohol, drogas o medicación?", "util", "“No.”", "Otras causas."),
    act("guardia", "¿En qué servicio trabaja?", "neutro", "“Pediatría.”", "No orienta."),
  ],
  exam: [
    act("hoover", "Signo de Hoover", "clave", "Positivo: la extensión de la cadera izquierda vuelve al flexionar la derecha contra resistencia.", "Signo positivo de debilidad funcional."),
    act("reflejos", "Reflejos y Babinski", "clave", "Reflejos simétricos, plantares flexores.", "Sin signos de lesión de la vía piramidal."),
    act("marcha", "Marcha", "util", "Arrastra la pierna sin circunducción.", "Patrón no orgánico."),
  ],
  studies: [
    study("Imágenes", "rm", "RM de cerebro y médula", "clave", "Normal.", "Descarta lesión estructural."),
    study("Laboratorio", "lab", "Glucemia, ionograma, CPK", "util", "Normales.", "Excluye metabólico."),
    study("Otros", "examen-positivo", "Diagnóstico basado en signos positivos del examen", "clave", "Hoover y marcha funcional.", "No es solo de exclusión."),
    study("Otros", "estudios-repetidos", "Pedir estudios repetidos para estar seguros", "riesgoso", "No se hizo.", "Refuerza la enfermedad y la ansiedad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tnf", "Trastorno neurológico funcional con debilidad del miembro inferior", true, "Signos positivos (Hoover, marcha), reflejos normales y RM normal."),
      dx("acv", "ACV", false, "Hoover positivo, reflejos normales y RM normal."),
      dx("em", "Esclerosis múltiple", false, "RM normal."),
      dx("simulacion", "Simulación", false, "Los síntomas no son voluntarios."),
      dx("guillain", "Guillain-Barré", false, "Reflejos normales y unilateral."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar el diagnóstico con claridad: el problema es real y tiene tratamiento", "clave", "La explicación mejora el pronóstico."),
      mg("kinesio", "Kinesiología específica para trastornos funcionales", "clave", "Rehabilitación."),
      mg("psico", "Psicoterapia y abordaje del duelo", "clave", "Factores asociados."),
      mg("seguimiento", "Seguimiento neurológico", "util", "Sostener el diagnóstico."),
      mg("simuladora", "Decirle que no tiene nada", "riesgoso", "Empeora el pronóstico y rompe el vínculo."),
      mg("benzo", "Benzodiacepinas", "riesgoso", "Sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno neurológico funcional con debilidad del miembro inferior izquierdo, en mujer de 27 años en duelo reciente.",
    pathologies: [
      { name: "Trastorno neurológico funcional", role: "principal", why: "Alteración del funcionamiento cerebral sin lesión estructural." },
      { name: "Duelo", role: "asociada", why: "Factor precipitante posible." },
      { name: "ACV, esclerosis múltiple", role: "diferencial", why: "Causas estructurales." },
    ],
    reasoning: [
      "Causa: interacción de factores biológicos, psicológicos y sociales.",
      "Mecanismo: alteración en la atención y el control del movimiento voluntario.",
      "Consecuencia: debilidad real e involuntaria, con signos clínicos característicos.",
    ],
    epidemiology:
      "Es uno de los diagnósticos más frecuentes en consultorios de neurología. Se diagnostica por signos positivos, no solo por exclusión. No siempre hay un estrés desencadenante, y el término 'histeria' está en desuso.",
    management: [
      "Signos positivos.",
      "Explicación clara.",
      "Rehabilitación.",
      "Psicoterapia.",
    ],
    sources: ["Sociedad Neurológica Argentina — Trastornos neurológicos funcionales.", "Stone J, Carson A — Functional Neurological Disorder, Practical Neurology."],
    pearls: ["Signo de Hoover.", "Diagnóstico positivo.", "No es simulación."],
    pitfalls: ["Decir que no tiene nada.", "Estudios infinitos."],
    tribunal: [
      qa("¿Qué es el signo de Hoover?", "La extensión débil de la cadera vuelve a la normalidad al flexionar la otra cadera contra resistencia."),
      qa("¿Qué diferencia hay con la simulación?", "En el trastorno funcional los síntomas no son voluntarios ni buscan un beneficio consciente."),
      qa("¿Qué otras formas tiene?", "Crisis no epilépticas, temblor funcional, trastornos de la marcha y alteraciones sensitivas."),
    ],
  },
};
