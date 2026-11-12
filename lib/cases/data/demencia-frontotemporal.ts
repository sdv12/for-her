import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const demenciaFrontotemporal: ClinicalCase = {
  id: "demencia-frontotemporal-conductual",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 57, ageUnit: "años", sex: "M", context: "Bancario. Lo trae la esposa. Su padre tuvo “problemas psiquiátricos” a los 60." },
  frequency: "poco-frecuente",
  intro: "“Está cambiado. Hace comentarios inapropiados, gastó los ahorros, come compulsivamente dulces y no le importa nada.” (relata la esposa)",
  vitals: { TA: "126/80 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "86 kg" },
  anamnesis: [
    act("conducta", "¿Qué cambió en su conducta?", "clave", "“Desinhibido, sin empatía.”", "Conductual."),
    act("comida", "¿Cambios en la alimentación?", "clave", "“Come dulces sin parar.”", "Hiperoralidad."),
    act("memoria", "¿Olvida cosas recientes?", "clave", "“No tanto.”", "Memoria relativamente conservada."),
    act("depresion", "¿Tristeza o psicosis?", "util", "“No.”", "Psiquiátrico."),
    act("familia", "¿Familia con demencia o ELA?", "util", "“Mi padre.”", "Genética."),
    act("hobby", "¿Qué le gustaba?", "neutro", "“El ajedrez.”", "No orienta."),
  ],
  exam: [
    act("cognitivo", "Evaluación cognitiva y frontal", "clave", "Falla en funciones ejecutivas y frontales; memoria relativamente conservada.", "Patrón frontal."),
    act("neuro", "Examen neurológico", "clave", "Reflejos de liberación frontal; sin fasciculaciones.", "Excluye ELA asociada."),
    act("insight", "Conciencia de enfermedad", "util", "Nula.", "Típico."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de encéfalo", "clave", "Atrofia frontal y temporal anterior.", "Apoya."),
    study("Laboratorio", "lab", "TSH, B12, VDRL, VIH", "clave", "Normales.", "Causas reversibles."),
    study("Imágenes", "pet", "PET con FDG si hay dudas", "util", "Hipometabolismo frontal.", "Confirma."),
    study("Otros", "solo-psiquiatria", "Derivar solo a psiquiatría sin estudiar", "riesgoso", "No se realizó.", "Enfermedad neurológica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dft", "Demencia frontotemporal, variante conductual", true, "Desinhibición, apatía, hiperoralidad, falla ejecutiva y atrofia frontotemporal."),
      dx("alzheimer", "Alzheimer", false, "Memoria conservada al inicio."),
      dx("bipolar", "Episodio maníaco", false, "No hay euforia ni episodios."),
      dx("depresion", "Depresión", false, "Atrofia y patrón."),
      dx("tumor", "Tumor frontal", false, "RM sin masa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("familia", "Apoyo a la familia y protección legal y económica", "clave", "Riesgo patrimonial."),
      mg("isrs", "ISRS para síntomas conductuales", "clave", "Ayudan en la conducta."),
      mg("genetica", "Consejo genético", "util", "Antecedente familiar."),
      mg("seguridad", "Manejo de conducción y seguridad", "clave", "Riesgo."),
      mg("anticolinesterasicos", "Inhibidores de colinesterasa", "riesgoso", "Pueden empeorar la conducta."),
      mg("antipsicoticos", "Antipsicóticos en altas dosis", "riesgoso", "Efectos adversos."),
    ],
  },
  debrief: {
    diagnosis: "Demencia frontotemporal variante conductual, en varón de 57 años con antecedente familiar.",
    pathologies: [
      { name: "Demencia frontotemporal", role: "principal", why: "Degeneración frontotemporal." },
      { name: "Riesgo patrimonial y social", role: "asociada", why: "Consecuencias." },
      { name: "Alzheimer, bipolar, depresión", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: degeneración con proteínas tau o TDP-43, a veces genética.",
      "Mecanismo: pérdida neuronal frontal y temporal anterior.",
      "Consecuencia: cambios de personalidad, conducta y lenguaje.",
    ],
    epidemiology:
      "Es una de las causas principales de demencia antes de los 65 años. Suele diagnosticarse tarde porque se confunde con cuadros psiquiátricos. Una parte tiene herencia y algunos casos se asocian a ELA.",
    management: [
      "Sospechar ante cambio de conducta en adultos.",
      "RM.",
      "Apoyo y protección.",
      "Síntomas.",
    ],
    sources: ["Sociedad Neurológica Argentina — Demencias.", "International bvFTD Criteria Consortium — Rascovsky Criteria."],
    pearls: ["Cambio de personalidad a los 50.", "Memoria conservada al inicio.", "Sin inhibidores de colinesterasa."],
    pitfalls: ["Rotular como psiquiátrico.", "No proteger los bienes."],
    tribunal: [
      qa("¿Qué variantes tiene la demencia frontotemporal?", "Conductual y afasias primarias progresivas (semántica y no fluente)."),
      qa("¿Qué enfermedad de motoneurona se asocia?", "La ELA, con la mutación C9orf72."),
      qa("¿Qué evalúa la batería frontal?", "Funciones ejecutivas: abstracción, fluencia, inhibición y planificación."),
    ],
  },
};
