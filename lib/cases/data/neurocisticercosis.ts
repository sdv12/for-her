import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neurocisticercosis: ClinicalCase = {
  id: "neurocisticercosis",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "M", context: "Nació en Potosí, Bolivia; vive en Buenos Aires hace 3 años. Trabaja en la construcción. Sin antecedentes." },
  frequency: "poco-frecuente",
  intro: "La esposa: “Estaba comiendo y empezó a sacudir el brazo derecho, después se cayó y convulsionó todo el cuerpo.”",
  vitals: { TA: "128/78 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "97 %", Glucemia: "102 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("crisis", "¿Cómo empezó la convulsión?", "clave", "“Por el brazo derecho.”", "Inicio focal: lesión estructural."),
    act("origen", "¿Dónde vivió? ¿Criaban cerdos?", "clave", "“En el campo en Bolivia, había chanchos sueltos.”", "Zona endémica de Taenia solium."),
    act("previas", "¿Convulsiones antes?", "clave", "“Nunca.”", "Primera crisis en adulto."),
    act("cefalea", "¿Dolor de cabeza o vómitos?", "util", "“A veces dolor de cabeza.”", "Hipertensión endocraneana."),
    act("alcohol", "¿Alcohol o drogas?", "util", "“No.”", "Otras causas."),
    act("hijos", "¿Tiene hijos?", "neutro", "“Dos nenas.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Paresia leve del brazo derecho que mejora en horas.", "Parálisis de Todd."),
    act("fondo", "Fondo de ojo", "clave", "Sin papiledema.", "Sin hipertensión endocraneana."),
    act("piel", "Nódulos subcutáneos", "util", "Ausentes.", "Cisticercosis extraneural."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro", "clave", "Calcificaciones puntiformes múltiples y una lesión quística con escólex frontal izquierda.", "Neurocisticercosis."),
    study("Imágenes", "rm", "RM de cerebro con contraste", "clave", "Quiste con escólex y realce anular, edema perilesional.", "Fase coloidal."),
    study("Laboratorio", "serologia", "Serología (EITB) para cisticercosis", "util", "Positiva.", "Apoya."),
    study("Otros", "puncion", "Punción lumbar de rutina", "riesgoso", "No se realizó.", "Lesión con edema."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ncc", "Neurocisticercosis parenquimatosa con quiste en fase coloidal y crisis focal con generalización", true, "Origen en zona endémica, crisis focal, quiste con escólex y calcificaciones."),
      dx("glioma", "Glioma", false, "El escólex es patognomónico."),
      dx("toxoplasmosis", "Toxoplasmosis cerebral", false, "Sin inmunosupresión y con escólex."),
      dx("tuberculoma", "Tuberculoma", false, "Escólex y calcificaciones típicas."),
      dx("epilepsia-generalizada", "Epilepsia generalizada idiopática", false, "Inicio focal y lesión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiepileptico", "Antiepiléptico (levetiracetam)", "clave", "Crisis por lesión."),
      mg("albendazol", "Albendazol con corticoides", "clave", "Quiste viable; corticoide para el edema."),
      mg("fondo-antes", "Fondo de ojo antes de los antiparasitarios", "clave", "Descartar hipertensión endocraneana."),
      mg("convivientes", "Estudiar convivientes por teniasis intestinal", "util", "Fuente de huevos."),
      mg("albendazol-sin-corticoide", "Albendazol sin corticoides", "riesgoso", "La muerte del quiste aumenta el edema."),
      mg("cirugia", "Cirugía del quiste", "riesgoso", "No indicada en parenquimatosa."),
    ],
  },
  debrief: {
    diagnosis: "Neurocisticercosis parenquimatosa con quiste en fase coloidal y crisis focal con generalización, en varón de 28 años nacido en Bolivia.",
    pathologies: [
      { name: "Neurocisticercosis", role: "principal", why: "Infección del SNC por larvas de Taenia solium." },
      { name: "Epilepsia sintomática", role: "asociada", why: "Manifestación más frecuente." },
      { name: "Glioma, tuberculoma", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: ingesta de huevos de Taenia solium por contaminación fecal-oral.",
      "Mecanismo: las larvas forman quistes en el cerebro que inflaman al degenerar.",
      "Consecuencia: crisis epilépticas, hipertensión endocraneana y calcificaciones.",
    ],
    epidemiology:
      "Es la principal causa prevenible de epilepsia adquirida en el mundo. En Argentina se ve sobre todo en migrantes de Bolivia y Perú y en el norte del país. Se adquiere por huevos de un portador de tenia, no por comer cerdo.",
    management: [
      "TC y RM.",
      "Antiepiléptico.",
      "Albendazol con corticoide.",
      "Buscar portadores.",
    ],
    sources: ["Sociedad Argentina de Infectología — Parasitosis del SNC.", "IDSA/ASTMH — Guidelines for the Diagnosis and Treatment of Neurocysticercosis."],
    pearls: ["Crisis en adulto de zona endémica.", "Escólex: diagnóstico.", "Corticoide con el albendazol."],
    pitfalls: ["Albendazol sin corticoide.", "No hacer fondo de ojo."],
    tribunal: [
      qa("¿Qué diferencia hay entre teniasis y cisticercosis?", "Teniasis es la tenia adulta en el intestino por comer cerdo; cisticercosis es la larva en tejidos por ingerir huevos."),
      qa("¿Qué fases tiene el quiste?", "Vesicular, coloidal, granular nodular y calcificada."),
      qa("¿Cuándo no se dan antiparasitarios?", "Con calcificaciones solas o hipertensión endocraneana no controlada."),
    ],
  },
};
