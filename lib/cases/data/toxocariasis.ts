import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const toxocariasis: ClinicalCase = {
  id: "toxocariasis-ocular",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 7, ageUnit: "años", sex: "F", context: "Juega en una plaza con muchos perros. Tiene un cachorro sin desparasitar. Come tierra a veces." },
  frequency: "poco-frecuente",
  intro: "“La maestra notó que no ve bien del ojo derecho y en una foto el ojo salió blanco.”",
  vitals: { FC: "92 lpm", "T°": "36,5 °C", Peso: "23 kg" },
  anamnesis: [
    act("perros", "¿Tiene contacto con perros o cachorros?", "clave", "“Un cachorro que no desparasitamos.”", "Toxocara canis."),
    act("geofagia", "¿Come tierra o se lleva las manos a la boca?", "clave", "“Sí, en el arenero.”", "Ingesta de huevos."),
    act("vision", "¿Desde cuándo ve mal?", "clave", "“No sabemos, se quejó hace poco.”", "Unilateral."),
    act("sistemicos", "¿Fiebre, tos, sibilancias?", "util", "“No.”", "Forma visceral."),
    act("familia", "¿Algún tumor de ojos en la familia?", "util", "“No.”", "Retinoblastoma."),
    act("dibujo", "¿Qué le gusta?", "neutro", "“Dibujar.”", "No orienta."),
  ],
  exam: [
    act("reflejo", "Reflejo rojo", "clave", "Leucocoria en el ojo derecho.", "Debe descartarse retinoblastoma."),
    act("fondo", "Fondo de ojo", "clave", "Granuloma periférico con tracción vítrea.", "Toxocariasis ocular."),
    act("abdomen", "Hígado y bazo", "util", "Normales.", "Sin forma visceral."),
  ],
  studies: [
    study("Laboratorio", "serologia", "Serología para Toxocara (ELISA)", "clave", "Positiva.", "Apoya."),
    study("Imágenes", "eco-ocular", "Ecografía ocular y RM de órbitas", "clave", "Granuloma sin calcificaciones.", "Excluye retinoblastoma."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Eosinofilia leve.", "Apoya."),
    study("Otros", "biopsia-ocular", "Biopsia intraocular", "riesgoso", "No se realizó.", "Si fuera retinoblastoma disemina."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("toxocara", "Toxocariasis ocular con granuloma periférico", true, "Contacto con cachorro y geofagia, leucocoria, granuloma sin calcificar y serología positiva."),
      dx("retinoblastoma", "Retinoblastoma", false, "Sin calcificaciones y serología positiva; siempre se descarta."),
      dx("toxoplasma", "Toxoplasmosis ocular", false, "Lesión granulomatosa periférica sin retinocoroiditis activa típica."),
      dx("catarata", "Catarata congénita", false, "El cristalino es normal."),
      dx("coats", "Enfermedad de Coats", false, "Hay granuloma y serología positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("oftalmo", "Seguimiento con oftalmología infantil", "clave", "Riesgo de desprendimiento."),
      mg("corticoides", "Corticoides si hay inflamación activa", "clave", "Reducen el daño."),
      mg("mascotas", "Desparasitar al cachorro y lavado de manos", "clave", "Prevención."),
      mg("albendazol", "Albendazol según criterio", "util", "Uso discutido en forma ocular."),
      mg("sin-control", "Alta sin control", "riesgoso", "Puede perder la visión."),
      mg("enucleacion", "Enucleación", "riesgoso", "Sin indicación."),
    ],
  },
  debrief: {
    diagnosis: "Toxocariasis ocular con granuloma periférico, en niña de 7 años con contacto con un cachorro.",
    pathologies: [
      { name: "Toxocariasis ocular", role: "principal", why: "Larva migrans ocular." },
      { name: "Leucocoria", role: "asociada", why: "Signo de alarma." },
      { name: "Retinoblastoma, toxoplasmosis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: huevos de Toxocara canis en la tierra contaminada por perros.",
      "Mecanismo: la larva migra al ojo y genera un granuloma inflamatorio.",
      "Consecuencia: pérdida visual, tracción y desprendimiento de retina.",
    ],
    epidemiology:
      "Las plazas con heces de perros son una fuente común en Argentina. Afecta a niños con geofagia. Toda leucocoria obliga a descartar retinoblastoma.",
    management: [
      "Leucocoria: urgente.",
      "Imágenes sin biopsia.",
      "Corticoides si hay inflamación.",
      "Prevención con mascotas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Zoonosis parasitarias.", "CDC — Toxocariasis Resources for Health Professionals."],
    pearls: ["Leucocoria: descartá retinoblastoma.", "Perros y arenero.", "Desparasitar mascotas."],
    pitfalls: ["Biopsiar.", "No seguirla."],
    tribunal: [
      qa("¿Qué es la larva migrans visceral?", "Forma sistémica con fiebre, hepatomegalia, sibilancias y eosinofilia."),
      qa("¿Por qué se descarta retinoblastoma?", "Porque también da leucocoria en niños y es un tumor maligno."),
      qa("¿Cómo se previene?", "Desparasitando perros, recogiendo heces y lavando manos tras jugar en la tierra."),
    ],
  },
};
