import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeSerotoninergico: ClinicalCase = {
  id: "sindrome-serotoninergico",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 44, ageUnit: "años", sex: "F", context: "Toma sertralina por depresión. Hace 2 días empezó tramadol por una lumbalgia." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer estoy muy inquieta, transpiro, tengo diarrea, tiemblo y las piernas se me sacuden solas.”",
  vitals: { TA: "158/96 mmHg", FC: "124 lpm", FR: "22 rpm", "T°": "38,6 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("farmacos", "¿Qué medicamentos toma y qué agregó?", "clave", "“Sertralina y ahora tramadol.”", "Dos serotoninérgicos."),
    act("inicio", "¿Cuándo empezaron los síntomas?", "clave", "“Al día siguiente del tramadol.”", "Inicio rápido."),
    act("otros", "¿Tomó algo más: antigripales, triptanes, drogas?", "clave", "“Un antigripal con dextrometorfano.”", "Otro serotoninérgico."),
    act("neurolepticos", "¿Toma antipsicóticos?", "util", "“No.”", "Neuroléptico maligno."),
    act("drogas", "¿Consumió éxtasis o cocaína?", "util", "“No.”", "Simpaticomiméticos."),
    act("trabajo", "¿Qué hace?", "neutro", "“Soy cajera de supermercado.”", "No orienta."),
  ],
  exam: [
    act("clonus", "Reflejos y clonus", "clave", "Hiperreflexia y clonus inducible en tobillos, más en piernas.", "Criterios de Hunter."),
    act("pupilas", "Pupilas y piel", "clave", "Midriasis, diaforesis.", "Exceso serotoninérgico."),
    act("abdomen", "Ruidos hidroaéreos", "util", "Aumentados.", "Diferencia con anticolinérgico."),
  ],
  studies: [
    study("Laboratorio", "lab", "CPK, función renal, ionograma, hepatograma", "clave", "CPK 1.200; creatinina normal.", "Rabdomiólisis incipiente."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal, QTc normal.", "Arritmias."),
    study("Laboratorio", "tox", "Paracetamol y otras coingestas", "util", "Negativo.", "Excluye otras."),
    study("Otros", "puncion", "Punción lumbar de rutina", "innecesario", "No se realizó.", "Hay causa tóxica clara y sin meningismo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("serotoninergico", "Síndrome serotoninérgico moderado por sertralina, tramadol y dextrometorfano", true, "Combinación de serotoninérgicos, inicio en 24 horas, clonus, hiperreflexia, hipertermia, diaforesis y diarrea."),
      dx("nms", "Síndrome neuroléptico maligno", false, "Sin antipsicóticos, inicio rápido y con clonus en vez de rigidez en tubo de plomo."),
      dx("anticolinergico", "Toxíndrome anticolinérgico", false, "Hay diaforesis y ruidos aumentados."),
      dx("meningitis", "Meningitis", false, "Sin meningismo y causa farmacológica."),
      dx("tirotoxicosis", "Tormenta tiroidea", false, "No explica el clonus en contexto farmacológico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender todos los serotoninérgicos", "clave", "Retirar la causa."),
      mg("benzodiacepinas", "Benzodiacepinas para la agitación", "clave", "Reducen la hiperactividad."),
      mg("soporte", "Hidratación, enfriamiento y monitoreo", "clave", "Rabdomiólisis e hipertermia."),
      mg("ciproheptadina", "Ciproheptadina si no mejora", "util", "Antagonista 5-HT2A."),
      mg("sujecion", "Sujeción mecánica prolongada", "riesgoso", "Aumenta la hipertermia y la rabdomiólisis."),
      mg("antipireticos", "Paracetamol como medida principal para la fiebre", "riesgoso", "La fiebre es muscular; no responde."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome serotoninérgico moderado por interacción de sertralina con tramadol y dextrometorfano, en mujer de 44 años.",
    pathologies: [
      { name: "Síndrome serotoninérgico", role: "principal", why: "Exceso de serotonina en sinapsis." },
      { name: "Rabdomiólisis incipiente", role: "asociada", why: "Actividad muscular." },
      { name: "Neuroléptico maligno, anticolinérgico", role: "diferencial", why: "Otros toxíndromes con hipertermia." },
    ],
    reasoning: [
      "Causa: combinación de ISRS con tramadol y dextrometorfano.",
      "Mecanismo: aumento de serotonina con estimulación de receptores 5-HT2A.",
      "Consecuencia: alteración mental, hiperactividad autonómica y neuromuscular.",
    ],
    epidemiology:
      "Es subdiagnosticado porque las formas leves se confunden con ansiedad o virosis. Las interacciones más frecuentes son ISRS con tramadol, triptanes, linezolid o dextrometorfano. Al revisar recetas se evita la mayoría de los casos.",
    management: [
      "Criterios de Hunter.",
      "Suspender.",
      "Benzodiacepinas.",
      "Ciproheptadina.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de pacientes intoxicados.", "Hunter Serotonin Toxicity Criteria — Dunkley et al."],
    pearls: ["Clonus en las piernas.", "Inicio en horas.", "Tramadol con ISRS."],
    pitfalls: ["Sujetar.", "Confundir con ansiedad."],
    tribunal: [
      qa("¿Cuáles son los criterios de Hunter?", "En presencia de un serotoninérgico: clonus espontáneo, inducible u ocular con agitación o diaforesis, temblor e hiperreflexia, o hipertonía con fiebre."),
      qa("¿Cómo lo diferenciás del neuroléptico maligno?", "El serotoninérgico empieza en horas con clonus e hiperreflexia; el neuroléptico maligno en días con rigidez y bradirreflexia."),
      qa("¿Qué antibiótico puede desencadenarlo?", "El linezolid, porque inhibe la monoaminooxidasa."),
    ],
  },
};
