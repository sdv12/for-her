import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hidatidosisPulmonarNino: ClinicalCase = {
  id: "hidatidosis-pulmonar-nino",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 10, ageUnit: "años", sex: "M", context: "Vive en un campo en Chubut. Juegan con perros que comen vísceras de ovejas faenadas." },
  frequency: "poco-frecuente",
  intro: "“Tosió de golpe un líquido salado con unas cosas como piel de uva y después tiene fiebre y tos.”",
  vitals: { FC: "112 lpm", FR: "28 rpm", "T°": "38,4 °C", "SatO₂": "94 %", Peso: "32 kg" },
  anamnesis: [
    act("vomica", "¿Cómo era lo que tosió?", "clave", "“Agua salada con pedacitos blancos.”", "Vómica hidatídica."),
    act("perros", "¿Tienen perros? ¿Qué comen?", "clave", "“Comen las achuras de las ovejas.”", "Ciclo perro-oveja."),
    act("alergia", "¿Ronchas o falta de aire fuerte?", "clave", "“Le salieron ronchas.”", "Reacción anafiláctica por rotura."),
    act("dolor", "¿Dolor en el pecho?", "util", "“Sí, a la derecha.”", "Localización."),
    act("familia", "¿Otros familiares con quistes?", "util", "“Un tío operado del hígado.”", "Zona endémica."),
    act("escuela", "¿Va a la escuela rural?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Pulmón", "clave", "Hipoventilación y rales en base derecha.", "Quiste roto."),
    act("piel", "Piel", "clave", "Urticaria en tronco.", "Reacción alérgica."),
    act("higado", "Hígado", "util", "No palpable.", "Buscar otros quistes."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Imagen con nivel hidroaéreo y membrana flotante (signo del camalote).", "Quiste roto."),
    study("Imágenes", "eco-abdominal", "Ecografía abdominal", "clave", "Hígado sin quistes.", "Descartar compromiso hepático."),
    study("Laboratorio", "serologia", "Serología para hidatidosis", "util", "Positiva.", "Apoya."),
    study("Otros", "puncion", "Punción percutánea del quiste pulmonar", "riesgoso", "No se realizó.", "Anafilaxia y siembra."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hidatidosis-pulmonar", "Hidatidosis pulmonar con quiste roto (vómica) e infección secundaria", true, "Vómica salada con membranas, signo del camalote, urticaria y epidemiología."),
      dx("absceso", "Absceso pulmonar", false, "Membranas y epidemiología."),
      dx("tbc", "Tuberculosis cavitada", false, "Membrana flotante y vómica salada."),
      dx("nac", "Neumonía con derrame", false, "Quiste con membrana."),
      dx("secuestro", "Secuestro pulmonar", false, "Vómica con membranas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía conservadora (quistectomía con cierre de fístulas)", "clave", "Tratamiento del quiste pulmonar."),
      mg("albendazol", "Albendazol perioperatorio", "clave", "Reduce siembra y recurrencia."),
      mg("atb", "Antibióticos por la infección secundaria", "clave", "Sobreinfección."),
      mg("prevencion", "Desparasitar perros y no darles vísceras crudas", "util", "Corta el ciclo."),
      mg("albendazol-solo", "Solo albendazol sin cirugía", "riesgoso", "Quiste complicado."),
      mg("notificar-no", "No notificar", "riesgoso", "Es de notificación obligatoria."),
    ],
  },
  debrief: {
    diagnosis: "Hidatidosis pulmonar con quiste roto e infección secundaria, en niño de 10 años de Chubut.",
    pathologies: [
      { name: "Hidatidosis pulmonar", role: "principal", why: "Quiste de Echinococcus granulosus." },
      { name: "Rotura con vómica y urticaria", role: "asociada", why: "Complicación." },
      { name: "Absceso, TBC", role: "diferencial", why: "Otras cavidades." },
    ],
    reasoning: [
      "Causa: ingesta de huevos de Echinococcus eliminados por perros.",
      "Mecanismo: la larva forma un quiste en el pulmón, más frecuente en niños.",
      "Consecuencia: rotura con vómica, anafilaxia e infección.",
    ],
    epidemiology:
      "Es endémica en la Patagonia y otras zonas ganaderas. En niños el pulmón se afecta más que en adultos. Dar vísceras crudas a los perros mantiene el ciclo.",
    management: [
      "Radiografía y ecografía.",
      "Cirugía con albendazol.",
      "Antibióticos.",
      "Prevención y notificación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de hidatidosis.", "OMS/WHO-IWGE — Expert Consensus for Echinococcosis."],
    pearls: ["Vómica salada.", "Signo del camalote.", "No punzar."],
    pitfalls: ["Punzar.", "No prevenir."],
    tribunal: [
      qa("¿Por qué en niños es más frecuente pulmonar?", "Se postula por la mayor elasticidad del pulmón que permite el crecimiento del quiste."),
      qa("¿Qué es el signo del camalote?", "Membrana del quiste flotando en el líquido, visible en radiografía o TC."),
      qa("¿Cómo se previene?", "Desparasitando perros con praziquantel y no dándoles vísceras crudas."),
    ],
  },
};
