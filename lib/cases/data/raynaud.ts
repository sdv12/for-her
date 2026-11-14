import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const raynaud: ClinicalCase = {
  id: "fenomeno-raynaud",
  level: 1,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 22, ageUnit: "años", sex: "F", context: "Estudiante de Bioquímica. Vive en Bariloche. Fuma algunos cigarrillos." },
  frequency: "frecuente",
  intro: "“Con el frío los dedos se me ponen blancos, después azules y al final rojos, y me duelen. Me pasa desde los 15.”",
  vitals: { TA: "108/68 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("fases", "¿Cómo cambian de color?", "clave", "“Blancos, azules y después rojos.”", "Fenómeno de Raynaud trifásico."),
    act("inicio", "¿Desde qué edad?", "clave", "“Desde los 15.”", "Inicio joven: primario."),
    act("sistemico", "¿Úlceras en los dedos, piel dura, reflujo, dolores articulares?", "clave", "“No.”", "Sin datos de esclerodermia."),
    act("farmacos", "¿Toma descongestivos, ergotamina o anfetaminas?", "util", "“No.”", "Raynaud secundario."),
    act("familia", "¿Su mamá tiene lo mismo?", "util", "“Sí.”", "Herencia del primario."),
    act("carrera", "¿Cómo va la facultad?", "neutro", "“Bien.”", "No orienta."),
  ],
  exam: [
    act("dedos", "Dedos", "clave", "Sin úlceras, cicatrices ni engrosamiento cutáneo.", "Sin daño isquémico."),
    act("pulsos", "Pulsos radiales", "clave", "Simétricos.", "Sin oclusión arterial."),
    act("capilares", "Capilaroscopia periungueal", "util", "Normal.", "Primario."),
  ],
  studies: [
    study("Laboratorio", "fan", "FAN", "clave", "Negativo.", "Apoya primario."),
    study("Laboratorio", "lab", "Hemograma y VSG", "util", "Normales.", "Excluye inflamación."),
    study("Otros", "capilaroscopia", "Capilaroscopia", "clave", "Sin megacapilares ni hemorragias.", "Primario."),
    study("Imágenes", "angiografia", "Angiografía de manos", "innecesario", "No se realizó.", "Sin isquemia fija."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("raynaud-primario", "Fenómeno de Raynaud primario", true, "Inicio joven, cambios trifásicos con frío, sin daño digital, FAN y capilaroscopia normales."),
      dx("esclerodermia", "Esclerodermia", false, "Sin piel engrosada, úlceras ni capilaroscopia patológica."),
      dx("acrocianosis", "Acrocianosis", false, "Hay fases con palidez."),
      dx("lupus", "Lupus", false, "FAN negativo."),
      dx("toracica", "Síndrome del desfiladero torácico", false, "Bilateral y con pulsos normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("abrigo", "Abrigo de manos y todo el cuerpo, evitar cambios bruscos", "clave", "Medida principal."),
      mg("tabaco", "Dejar de fumar", "clave", "Vasoconstrictor."),
      mg("nifedipina", "Nifedipina de liberación prolongada en invierno si es frecuente", "clave", "Primera línea farmacológica."),
      mg("seguimiento", "Control si aparecen síntomas sistémicos", "util", "Puede evolucionar a secundario."),
      mg("betabloq", "Betabloqueantes", "riesgoso", "Pueden empeorar el Raynaud."),
      mg("simpatectomia", "Simpatectomía", "riesgoso", "Sin indicación en primario."),
    ],
  },
  debrief: {
    diagnosis: "Fenómeno de Raynaud primario, en mujer de 22 años.",
    pathologies: [
      { name: "Raynaud primario", role: "principal", why: "Vasoespasmo funcional." },
      { name: "Tabaco y frío", role: "asociada", why: "Gatillos." },
      { name: "Esclerodermia, lupus", role: "diferencial", why: "Raynaud secundario." },
    ],
    reasoning: [
      "Causa: hiperreactividad vascular al frío y al estrés.",
      "Mecanismo: vasoespasmo de arterias digitales seguido de cianosis y reperfusión.",
      "Consecuencia: cambios de color y dolor, sin daño tisular en el primario.",
    ],
    epidemiology:
      "Es frecuente en mujeres jóvenes y en climas fríos. El primario empieza antes de los 30 y no deja úlceras. Inicio tardío, úlceras o capilaroscopia alterada sugieren enfermedad del tejido conectivo.",
    management: [
      "Distinguir primario de secundario.",
      "FAN y capilaroscopia.",
      "Abrigo y tabaco.",
      "Nifedipina.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Fenómeno de Raynaud.", "EULAR — Recommendations for the Treatment of Systemic Sclerosis (Raynaud)."],
    pearls: ["Blanco, azul, rojo.", "Joven sin úlceras: primario.", "Capilaroscopia."],
    pitfalls: ["No buscar secundario.", "Betabloqueantes."],
    tribunal: [
      qa("¿Qué sugiere Raynaud secundario?", "Inicio después de los 30, úlceras digitales, asimetría, FAN positivo o capilaroscopia patológica."),
      qa("¿Qué muestra la capilaroscopia en esclerodermia?", "Megacapilares, hemorragias y zonas avasculares."),
      qa("¿Qué enfermedad se asocia más al Raynaud secundario?", "La esclerosis sistémica, donde aparece en casi todos los pacientes."),
    ],
  },
};
