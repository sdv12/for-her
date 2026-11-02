import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const statusNino: ClinicalCase = {
  id: "estado-de-mal-epileptico-nino",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "años", sex: "M", context: "Epilepsia en tratamiento con valproato; la familia se quedó sin medicación hace una semana." },
  frequency: "poco-frecuente",
  intro: "“Empezó a convulsionar en casa hace 15 minutos, todo el cuerpo, y no para. En la ambulancia le pusieron algo en la nariz y siguió.” (relata el padre)",
  vitals: { FC: "162 lpm", FR: "12 rpm", "T°": "37,8 °C", "SatO₂": "88 %", Glucemia: "104 mg/dl", Peso: "19 kg" },
  anamnesis: [
    act("tiempo", "¿Cuándo empezó exactamente la convulsión?", "clave", "“Hace 15 minutos.”", "Más de 5 minutos: estado de mal epiléptico; cuanto más dura, más difícil de cortar."),
    act("medicacion", "¿Toma la medicación? ¿Le dieron algo para cortarla?", "clave", "“Se quedó sin valproato hace una semana. En la ambulancia, midazolam en la nariz.”", "Abandono de la medicación: causa más frecuente en epilépticos; ya recibió una dosis de benzodiacepina."),
    act("fiebre", "¿Tuvo fiebre o estuvo enfermo?", "util", "“Un poco de mocos.”", "Infecciones como desencadenante."),
    act("golpe", "¿Se golpeó la cabeza? ¿Pudo haber tomado algo?", "util", "“No.”", "Descarta traumatismo e intoxicación."),
    act("alergias", "¿Es alérgico a algún medicamento?", "util", "“No.”", "Antes de los fármacos."),
    act("hermano", "¿Tiene hermanos?", "neutro", "“Una hermana.”", "No orienta."),
  ],
  exam: [
    act("via-aerea", "Vía aérea y respiración", "clave", "Respiración superficial, saturación 88 %.", "Prioridad: abrir la vía aérea, oxígeno, posición lateral."),
    act("convulsion", "Tipo de crisis", "clave", "Crisis tónico-clónica generalizada en curso.", "Estado de mal convulsivo."),
    act("piel", "Piel y signos meníngeos", "util", "Sin petequias; no evaluable por la crisis.", "Buscar infecciones del SNC."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar inmediata", "clave", "104 mg/dl.", "Descarta hipoglucemia como causa tratable."),
    study("Laboratorio", "lab", "Ionograma, calcio, magnesio, niveles de valproato, gases", "clave", "Valproato indetectable; acidosis leve.", "Confirma el abandono y descarta causas metabólicas."),
    study("Imágenes", "tc", "Tomografía antes de tratar la crisis", "riesgoso", "No se realizó.", "Primero se corta la crisis; la imagen después, si hay indicación."),
    study("Otros", "eeg", "EEG si no recupera la conciencia", "util", "Sin actividad epiléptica después del tratamiento.", "Descarta un estado no convulsivo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("status", "Estado de mal epiléptico convulsivo generalizado por abandono del valproato", true, "Crisis tónico-clónica de más de 5 minutos que no cedió con una dosis de benzodiacepina, en un niño epiléptico sin medicación."),
      dx("crisis-aislada", "Crisis epiléptica aislada", false, "Dura más de 5 minutos: es estado de mal."),
      dx("febril", "Convulsión febril", false, "Es epiléptico conocido sin fiebre alta."),
      dx("meningitis", "Meningitis", false, "No hay fiebre importante; el abandono explica la crisis, aunque se evalúa si no recupera."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("abc", "Vía aérea, oxígeno, posición lateral, monitoreo y acceso venoso", "clave", "Primero estabilizar."),
      mg("benzo2", "Segunda dosis de benzodiacepina (lorazepam o diazepam EV, o midazolam)", "clave", "Se pueden dar hasta dos dosis."),
      mg("segunda-linea", "Si persiste: fármaco de segunda línea EV (levetiracetam, valproato o fenitoína)", "clave", "Estado de mal establecido."),
      mg("uti", "Si no cede: terapia intensiva con anestésicos e intubación", "util", "Estado de mal refractario."),
      mg("tres-benzo", "Cuatro o más dosis de benzodiacepinas", "riesgoso", "Aumenta la depresión respiratoria sin más eficacia."),
      mg("sujetar", "Sujetarlo y poner algo en la boca", "riesgoso", "Lesiones y obstrucción de la vía aérea."),
    ],
  },
  debrief: {
    diagnosis: "Estado de mal epiléptico convulsivo generalizado por abandono del valproato, con hipoxemia, en niño de 5 años con epilepsia.",
    pathologies: [
      { name: "Estado de mal epiléptico", role: "principal", why: "Crisis de más de 5 minutos." },
      { name: "Falta de acceso a la medicación", role: "asociada", why: "Desencadenante." },
      { name: "Convulsión febril, meningitis, hipoglucemia", role: "diferencial", why: "Otras causas de crisis." },
    ],
    reasoning: [
      "Causa: suspensión brusca del antiepiléptico.",
      "Mecanismo: fallan los mecanismos que terminan la crisis; con el tiempo los receptores GABA se internalizan y las benzodiacepinas pierden eficacia.",
      "Consecuencia: hipoxia, acidosis, hipertermia, rabdomiólisis y daño neuronal si se prolonga.",
    ],
    epidemiology:
      "El estado de mal epiléptico es la emergencia neurológica más frecuente en pediatría; en niños con epilepsia la causa principal es la falta de adherencia o de acceso a la medicación, y en los menores sin antecedentes, la fiebre o infecciones del SNC.",
    management: [
      "0–5 min: estabilizar, glucemia.",
      "5–20 min: benzodiacepinas (hasta 2 dosis).",
      "20–40 min: segunda línea (levetiracetam, valproato, fenitoína).",
      "Refractario: terapia intensiva; buscar y tratar la causa.",
    ],
    sources: ["Sociedad Argentina de Neurología Infantil — Consenso de estado de mal epiléptico.", "Ley 25.404 de protección de las personas con epilepsia."],
    pearls: ["Más de 5 minutos = tratar como estado de mal.", "Máximo dos dosis de benzodiacepina.", "Glucemia siempre."],
    pitfalls: ["Seguir con benzodiacepinas.", "Hacer imágenes antes de cortar la crisis."],
    tribunal: [
      qa("¿Cómo se define el estado de mal epiléptico?", "Una crisis que dura más de 5 minutos (tiempo a partir del cual hay que tratar) o crisis repetidas sin recuperar la conciencia entre ellas; después de 30 minutos aumenta el riesgo de daño neuronal."),
      qa("¿Qué vías hay para dar benzodiacepinas sin acceso venoso?", "Midazolam bucal, intranasal o intramuscular y diazepam rectal; son útiles en el domicilio, la escuela y la ambulancia."),
      qa("¿Qué efectos adversos tiene la fenitoína EV?", "Hipotensión y arritmias si se infunde rápido, flebitis y síndrome del guante púrpura; por eso se infunde lentamente y con monitoreo."),
    ],
  },
};
