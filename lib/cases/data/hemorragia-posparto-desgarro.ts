import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemorragiaPospartoDesgarro: ClinicalCase = {
  id: "hemorragia-posparto-desgarro",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Internación",
  patient: { age: 22, ageUnit: "años", sex: "F", context: "Parto vaginal hace 30 minutos, bebé de 4 kg, expulsivo rápido con fórceps." },
  frequency: "frecuente",
  intro: "La partera avisa: “Sigue sangrando rojo y continuo, aunque el útero está duro.”",
  vitals: { TA: "100/62 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "36,6 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("parto", "¿Cómo fue el parto?", "clave", "Rápido, con fórceps, bebé de 4 kg.", "Riesgo de desgarros."),
    act("placenta", "¿Salió completa la placenta?", "clave", "Sí, revisada.", "Excluye retención."),
    act("utero", "¿Útero contraído?", "clave", "Sí.", "Excluye atonía."),
    act("coagulacion", "¿Problemas de coagulación?", "util", "No.", "Excluye trombina."),
    act("oxitocina", "¿Recibió oxitocina?", "util", "Sí, al nacer.", "Prevención."),
    act("nombre", "¿Cómo se llama el bebé?", "neutro", "Benjamín.", "No orienta."),
  ],
  exam: [
    act("utero-ex", "Útero", "clave", "Firme, a nivel del ombligo.", "No es atonía."),
    act("canal", "Revisión del canal de parto con buena luz", "clave", "Desgarro cervical y vaginal sangrante.", "Causa."),
    act("perfusion", "Perfusión", "util", "Fría.", "Pérdida."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, fibrinógeno, grupo", "clave", "Hb 8,4; fibrinógeno normal.", "Pérdida."),
    study("Otros", "cuantificar", "Cuantificar la pérdida", "clave", "900 ml.", "Hemorragia."),
    study("Otros", "indice", "Índice de shock", "util", "1,1.", "Gravedad."),
    study("Imágenes", "tc", "TC de pelvis", "innecesario", "No se realizó.", "Diagnóstico clínico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("trauma", "Hemorragia posparto por desgarro cervical y vaginal (causa traumática)", true, "Útero firme, placenta completa y desgarros."),
      dx("atonia", "Atonía uterina", false, "Útero contraído."),
      dx("retencion", "Retención placentaria", false, "Placenta completa."),
      dx("cid", "Coagulopatía", false, "Fibrinógeno normal."),
      dx("inversion", "Inversión uterina", false, "Útero en su lugar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sutura", "Sutura del desgarro en quirófano con anestesia", "clave", "Detiene el sangrado."),
      mg("reanimar", "Dos vías, cristaloides, sangre según necesidad", "clave", "Volumen."),
      mg("acido", "Ácido tranexámico en las primeras 3 horas", "clave", "Reduce mortalidad."),
      mg("hematoma", "Vigilar hematomas", "util", "Complicación."),
      mg("oxitocina-mas", "Solo más oxitocina", "riesgoso", "No es atonía."),
      mg("esperar", "Esperar que se detenga solo", "riesgoso", "Shock."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia posparto por desgarro cervical y vaginal tras parto instrumental, en mujer de 22 años.",
    pathologies: [
      { name: "Hemorragia posparto traumática", role: "principal", why: "Lesión del canal." },
      { name: "Anemia aguda", role: "asociada", why: "Consecuencia." },
      { name: "Atonía, retención, coagulopatía", role: "diferencial", why: "Las cuatro T." },
    ],
    reasoning: [
      "Causa: parto rápido, bebé grande y fórceps.",
      "Mecanismo: desgarro de tejidos vasculares.",
      "Consecuencia: sangrado con útero contraído.",
    ],
    epidemiology:
      "La hemorragia posparto es una causa principal de muerte materna. El trauma del canal es la segunda causa tras la atonía. Si el útero está duro y sigue sangrando, hay que revisar el canal.",
    management: [
      "Cuatro T.",
      "Revisar el canal.",
      "Suturar.",
      "Reanimar y ácido tranexámico.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de hemorragia posparto.", "FIGO — Postpartum Hemorrhage Recommendations."],
    pearls: ["Útero duro que sangra: desgarro.", "Cuatro T.", "Ácido tranexámico."],
    pitfalls: ["Más oxitocina.", "No revisar."],
    tribunal: [
      qa("¿Cuáles son las cuatro T?", "Tono (atonía), trauma (desgarros), tejido (retención) y trombina (coagulopatía)."),
      qa("¿Cómo se define hemorragia posparto?", "Pérdida de 500 ml o más tras parto vaginal o 1.000 ml tras cesárea, o con inestabilidad."),
      qa("¿Qué es el índice de shock?", "Frecuencia cardíaca dividida por presión sistólica; mayor de 0,9 indica gravedad."),
    ],
  },
};
