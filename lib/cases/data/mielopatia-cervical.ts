import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mielopatiaCervical: ClinicalCase = {
  id: "mielopatia-cervical-espondilotica",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Albañil jubilado. Dolor de cuello crónico." },
  frequency: "frecuente",
  intro: "“Se me caen las cosas de las manos, no puedo abrocharme la camisa y camino como borracho.”",
  vitals: { TA: "134/82 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("manos", "¿Qué le pasa con las manos?", "clave", "“Torpes, no puedo abotonar.”", "Mano mielopática."),
    act("marcha", "¿Cómo camina?", "clave", "“Inestable, con las piernas duras.”", "Marcha espástica."),
    act("evolucion", "¿Desde cuándo?", "clave", "“Un año, empeorando.”", "Progresivo."),
    act("esfinteres", "¿Problemas para orinar?", "util", "“Urgencia.”", "Compromiso medular."),
    act("b12", "¿Toma metformina o es vegetariano?", "util", "“No.”", "Déficit de B12."),
    act("hobby", "¿Qué hace?", "neutro", "“Arreglo bicicletas.”", "No orienta."),
  ],
  exam: [
    act("hoffmann", "Reflejos y signo de Hoffmann", "clave", "Hiperreflexia en cuatro miembros, Hoffmann y Babinski positivos.", "Lesión de neurona motora superior."),
    act("manos-ex", "Manos", "clave", "Atrofia de interóseos, signo de escape de dedos.", "Compromiso de astas anteriores cervicales."),
    act("marcha-ex", "Marcha y Romberg", "util", "Marcha espástica, Romberg positivo.", "Cordones posteriores."),
  ],
  studies: [
    study("Imágenes", "rm", "RM de columna cervical", "clave", "Estenosis de canal C4-C6 por osteofitos y discos, con hiperintensidad medular en T2.", "Mielopatía compresiva."),
    study("Laboratorio", "b12", "B12, cobre, VDRL, VIH", "util", "Normales.", "Diferenciales."),
    study("Otros", "emg", "Electromiograma", "util", "Sin denervación difusa.", "Excluye ELA."),
    study("Otros", "manipulacion", "Manipulación quiropráctica del cuello", "riesgoso", "No se hizo.", "Puede empeorar la lesión medular."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mce", "Mielopatía cervical espondilótica", true, "Torpeza de manos, marcha espástica, hiperreflexia con Hoffmann y estenosis cervical con señal medular."),
      dx("ela", "Esclerosis lateral amiotrófica", false, "Hay compresión que explica todo y EMG sin denervación difusa."),
      dx("b12", "Degeneración combinada subaguda", false, "B12 normal."),
      dx("tunel", "Túnel carpiano bilateral", false, "Hay signos de primera motoneurona."),
      dx("parkinson", "Parkinson", false, "Hiperreflexia y Babinski."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Derivación a neurocirugía para descompresión", "clave", "Mielopatía progresiva."),
      mg("caidas", "Prevención de caídas", "clave", "Riesgo de traumatismo medular."),
      mg("alarma", "Pautas de alarma ante traumatismos de cuello", "clave", "Lesión medular aguda."),
      mg("kinesio", "Kinesiología", "util", "Función."),
      mg("manipulacion-mg", "Manipulaciones cervicales", "riesgoso", "Lesión medular."),
      mg("collar-solo", "Solo collar y analgésicos", "riesgoso", "Progresa."),
    ],
  },
  debrief: {
    diagnosis: "Mielopatía cervical espondilótica con estenosis C4-C6, en varón de 67 años.",
    pathologies: [
      { name: "Mielopatía cervical espondilótica", role: "principal", why: "Compresión medular degenerativa." },
      { name: "Riesgo de caídas", role: "asociada", why: "Marcha inestable." },
      { name: "ELA, déficit de B12", role: "diferencial", why: "Otras causas de mielopatía." },
    ],
    reasoning: [
      "Causa: artrosis cervical con osteofitos y hernias.",
      "Mecanismo: estrechez del canal que comprime la médula.",
      "Consecuencia: torpeza de manos, marcha espástica y riesgo de lesión medular con traumatismos menores.",
    ],
    epidemiology:
      "Es la causa más frecuente de disfunción medular en mayores de 55. Se diagnostica tarde porque se atribuye a la edad. Un golpe menor puede causar un síndrome centromedular.",
    management: [
      "Signos de motoneurona superior.",
      "RM.",
      "Cirugía.",
      "Caídas.",
    ],
    sources: ["Sociedad Neurológica Argentina — Mielopatías.", "AO Spine — Clinical Practice Guideline for Degenerative Cervical Myelopathy."],
    pearls: ["Manos torpes con hiperreflexia.", "Hoffmann.", "RM cervical."],
    pitfalls: ["Atribuirlo a la edad.", "Manipular el cuello."],
    tribunal: [
      qa("¿Qué es el signo de Hoffmann?", "Flexión del pulgar al percutir la uña del dedo medio, signo de primera motoneurona."),
      qa("¿Qué es el síndrome centromedular?", "Lesión que afecta más los brazos que las piernas, típica tras hiperextensión en canal estrecho."),
      qa("¿Qué escala mide la gravedad?", "La escala mJOA (Japanese Orthopaedic Association modificada)."),
    ],
  },
};
