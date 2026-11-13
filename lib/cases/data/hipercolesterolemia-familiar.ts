import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipercolesterolemiaFamiliar: ClinicalCase = {
  id: "hipercolesterolemia-familiar",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 33, ageUnit: "años", sex: "M", context: "Su padre tuvo un infarto a los 44 y un tío murió de golpe a los 50. Hace deporte, no fuma." },
  frequency: "frecuente",
  intro: "“Me hice un análisis en el trabajo y me salió el colesterol en 340. Como sano y corro. No entiendo.”",
  vitals: { TA: "122/76 mmHg", FC: "62 lpm", "T°": "36,4 °C", Peso: "74 kg" },
  anamnesis: [
    act("familia", "¿Infartos o muertes súbitas tempranas en la familia?", "clave", "“Mi papá a los 44 y un tío a los 50.”", "Enfermedad coronaria prematura."),
    act("habitos", "¿Cómo come y cuánto se mueve?", "clave", "“Sano, corro 30 km por semana.”", "No es por estilo de vida."),
    act("secundarias", "¿Problemas de tiroides, riñón o hígado?", "clave", "“No.”", "Causas secundarias."),
    act("dolor", "¿Dolor de pecho al correr?", "util", "“No.”", "Síntomas coronarios."),
    act("hijos", "¿Tiene hijos?", "util", "“Una nena de 5.”", "Tamizaje en cascada."),
    act("carrera", "¿Qué carreras corre?", "neutro", "“De 10 km.”", "No orienta."),
  ],
  exam: [
    act("xantomas", "Tendones de Aquiles y manos", "clave", "Engrosamiento de ambos tendones de Aquiles (xantomas tendinosos).", "Muy sugestivo."),
    act("arco", "Ojos", "clave", "Arco corneal incompleto.", "Prematuro a esta edad."),
    act("soplos", "Soplos carotídeos", "util", "Ausentes.", "Base."),
  ],
  studies: [
    study("Laboratorio", "lipidos", "Perfil lipídico en ayunas repetido", "clave", "Colesterol total 342; LDL 262; HDL 48; TG 95.", "LDL muy alto."),
    study("Laboratorio", "secundarias-lab", "TSH, glucemia, función renal y hepática, orina", "clave", "Normales.", "Excluye secundarias."),
    study("Otros", "genetico", "Estudio genético (LDLR, APOB, PCSK9)", "util", "Mutación en LDLR.", "Confirma y permite cascada."),
    study("Otros", "prueba-esfuerzo", "Cateterismo coronario de rutina sin síntomas", "riesgoso", "No se realizó.", "Invasivo sin indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hf", "Hipercolesterolemia familiar heterocigota", true, "LDL mayor de 190, xantomas tendinosos, arco corneal precoz y enfermedad coronaria prematura familiar."),
      dx("poligenica", "Hipercolesterolemia poligénica común", false, "Xantomas y mutación en LDLR."),
      dx("hipotiroidismo", "Dislipemia por hipotiroidismo", false, "TSH normal."),
      dx("mixta", "Hiperlipidemia familiar combinada", false, "Triglicéridos normales."),
      dx("nefrotico", "Síndrome nefrótico", false, "Orina normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("estatina", "Estatina de alta intensidad", "clave", "Reducir LDL al menos 50 %."),
      mg("ezetimibe", "Agregar ezetimibe si no llega a la meta", "clave", "Meta de LDL baja."),
      mg("cascada", "Tamizaje en cascada de familiares, incluida la hija", "clave", "Herencia autosómica dominante."),
      mg("ipcsk9", "Inhibidores de PCSK9 si persiste alto", "util", "Tercer escalón."),
      mg("solo-dieta", "Solo dieta y control en un año", "riesgoso", "No alcanza en hipercolesterolemia familiar."),
      mg("esperar-40", "Empezar tratamiento a los 40", "riesgoso", "El daño es acumulativo desde la infancia."),
    ],
  },
  debrief: {
    diagnosis: "Hipercolesterolemia familiar heterocigota por mutación en LDLR, en varón de 33 años con enfermedad coronaria prematura familiar.",
    pathologies: [
      { name: "Hipercolesterolemia familiar", role: "principal", why: "Trastorno genético del receptor de LDL." },
      { name: "Riesgo cardiovascular muy alto", role: "asociada", why: "Exposición al LDL desde el nacimiento." },
      { name: "Poligénica, secundaria", role: "diferencial", why: "Otras causas de LDL alto." },
    ],
    reasoning: [
      "Causa: mutación autosómica dominante del receptor de LDL.",
      "Mecanismo: menor captación hepática del LDL que se acumula en la sangre y en las arterias.",
      "Consecuencia: aterosclerosis y enfermedad coronaria prematura.",
    ],
    epidemiology:
      "La forma heterocigota afecta a alrededor de 1 de cada 250 personas y está muy subdiagnosticada. Sin tratamiento, la mitad de los varones tiene un evento coronario antes de los 50. El tamizaje en cascada de familiares es la estrategia más eficiente.",
    management: [
      "Sospechar con LDL mayor de 190.",
      "Estatina potente.",
      "Combinación.",
      "Cascada familiar.",
    ],
    sources: ["Sociedad Argentina de Lípidos — Consenso de hipercolesterolemia familiar.", "ESC/EAS — Guidelines for the Management of Dyslipidaemias."],
    pearls: ["LDL de 190 o más: pensala.", "Mirá los Aquiles.", "Estudiá a la familia."],
    pitfalls: ["Solo dieta.", "Esperar."],
    tribunal: [
      qa("¿Qué son los criterios de la Red de Clínicas Lipídicas Holandesa?", "Puntaje con antecedentes familiares, clínica, LDL y genética para diagnosticarla."),
      qa("¿Desde qué edad se tratan los niños?", "Desde los 8 a 10 años con estatinas si tienen hipercolesterolemia familiar."),
      qa("¿Cómo actúan los inhibidores de PCSK9?", "Impiden la degradación del receptor de LDL y aumentan su captación."),
    ],
  },
};
