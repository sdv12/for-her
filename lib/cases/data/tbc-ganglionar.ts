import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tbcGanglionar: ClinicalCase = {
  id: "tuberculosis-ganglionar",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Nació en Bolivia, vive en Córdoba hace 5 años. Trabaja en una verdulería." },
  frequency: "frecuente",
  intro: "“Tengo unos bultos en el cuello hace dos meses que crecen. Uno se puso rojo y supura. Tengo fiebre a la tarde.”",
  vitals: { TA: "112/70 mmHg", FC: "86 lpm", "T°": "37,8 °C", Peso: "52 kg" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo y cómo crecieron?", "clave", "“Dos meses, lento.”", "Crónico."),
    act("sistemico", "¿Fiebre, sudor nocturno, peso?", "clave", "“Fiebre y sudor; bajé 3 kilos.”", "Constitucional."),
    act("contacto", "¿Contacto con TBC?", "clave", "“Mi tío tuvo.”", "Exposición."),
    act("vih", "¿Test de VIH?", "util", "“Nunca.”", "Coinfección."),
    act("gatos", "¿Gatos o rasguños?", "util", "“No.”", "Bartonella."),
    act("verdu", "¿Qué vendés más?", "neutro", "“Papas.”", "No orienta."),
  ],
  exam: [
    act("ganglios", "Ganglios", "clave", "Cervicales posteriores, adheridos entre sí, uno fistulizado.", "Escrófula."),
    act("pulmon", "Pulmón", "clave", "Normal.", "Extrapulmonar."),
    act("bazo", "Hígado y bazo", "util", "Normales.", "Excluye linfoma diseminado."),
  ],
  studies: [
    study("Otros", "biopsia", "Punción o biopsia con cultivo y Xpert", "clave", "Granulomas caseificantes; Xpert positivo sensible a rifampicina.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Normal.", "Pulmonar."),
    study("Laboratorio", "vih", "VIH y hepatograma", "clave", "Negativo.", "Base."),
    study("Otros", "atb-sin-biopsia", "Antibióticos comunes y esperar", "riesgoso", "No se realizó.", "Demora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("escrofula", "Tuberculosis ganglionar cervical (escrófula)", true, "Ganglios adheridos con fístula, síntomas, contacto y biopsia."),
      dx("linfoma", "Linfoma", false, "Granulomas caseificantes."),
      dx("gato", "Enfermedad por arañazo de gato", false, "Sin gatos; Xpert positivo."),
      dx("bacteriana", "Adenitis bacteriana", false, "Crónica."),
      dx("metastasis", "Metástasis", false, "Biopsia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hrze", "HRZE por 2 meses y HR por 4 meses", "clave", "Tratamiento estándar."),
      mg("notificar", "Notificar y evaluar contactos", "clave", "Salud pública."),
      mg("supervisado", "Tratamiento supervisado", "clave", "Adherencia."),
      mg("piridoxina", "Piridoxina", "util", "Neuropatía."),
      mg("drenaje-quirurgico", "Extirpación quirúrgica como único tratamiento", "riesgoso", "No cura."),
      mg("corto", "Tratar un mes", "riesgoso", "Recaída."),
    ],
  },
  debrief: {
    diagnosis: "Tuberculosis ganglionar cervical con fistulización, en mujer de 26 años.",
    pathologies: [
      { name: "Tuberculosis ganglionar", role: "principal", why: "Forma extrapulmonar frecuente." },
      { name: "Fístula", role: "asociada", why: "Complicación." },
      { name: "Linfoma, arañazo de gato", role: "diferencial", why: "Otras adenopatías." },
    ],
    reasoning: [
      "Causa: M. tuberculosis.",
      "Mecanismo: diseminación linfática con granulomas.",
      "Consecuencia: adenopatías adheridas y fístulas.",
    ],
    epidemiology:
      "Es la forma extrapulmonar más común, más frecuente en mujeres jóvenes y migrantes. Puede presentarse sin compromiso pulmonar. En Argentina, el diagnóstico con Xpert es cada vez más accesible.",
    management: [
      "Biopsia.",
      "Xpert y cultivo.",
      "HRZE.",
      "Contactos.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de tuberculosis.", "OMS — Guidelines on Extrapulmonary TB."],
    pearls: ["Ganglios adheridos que fistulizan.", "Rx normal no descarta.", "Seis meses."],
    pitfalls: ["Antibióticos comunes.", "Cirugía sola."],
    tribunal: [
      qa("¿Qué es la escrófula?", "Linfadenitis cervical tuberculosa."),
      qa("¿Qué causas de adenopatía cervical crónica hay?", "TBC, linfoma, metástasis, toxoplasmosis, mononucleosis y arañazo de gato."),
      qa("¿Qué es la reacción paradojal?", "Empeoramiento transitorio de ganglios al iniciar el tratamiento."),
    ],
  },
};
