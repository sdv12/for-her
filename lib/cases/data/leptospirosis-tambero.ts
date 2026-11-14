import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const leptospirosisTambero: ClinicalCase = {
  id: "leptospirosis-grave-weil",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Tambero en el sur de Santa Fe. Trabaja con botas rotas en corrales con barro y ratas." },
  frequency: "poco-frecuente",
  intro: "“Hace una semana tuve fiebre alta y dolor fuerte en las pantorrillas. Mejoré y ahora estoy amarillo, orino poco y escupo sangre.”",
  vitals: { TA: "94/58 mmHg", FC: "116 lpm", FR: "28 rpm", "T°": "38,3 °C", "SatO₂": "88 %" },
  anamnesis: [
    act("exposicion", "¿Dónde trabaja y con qué protección?", "clave", "“En el tambo, con botas rotas en el barro.”", "Agua y barro con orina de animales."),
    act("bifasico", "¿Cómo evolucionó?", "clave", "“Fiebre y dolores, mejoré, y después esto.”", "Curso bifásico."),
    act("pantorrillas", "¿Dolor en las pantorrillas?", "clave", "“Muchísimo.”", "Mialgias típicas."),
    act("hemoptisis", "¿Escupe sangre?", "util", "“Sí, hoy.”", "Hemorragia pulmonar."),
    act("orina", "¿Cuánto orina?", "util", "“Muy poco.”", "IRA."),
    act("vacas", "¿Cuántas vacas ordeñan?", "neutro", "“Doscientas.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel y conjuntivas", "clave", "Ictericia rubínica e inyección conjuntival.", "Weil."),
    act("pulmon", "Pulmón", "clave", "Rales bilaterales.", "Hemorragia pulmonar."),
    act("pantorrillas-ex", "Pantorrillas", "util", "Muy dolorosas a la palpación.", "Miositis."),
  ],
  studies: [
    study("Laboratorio", "lab", "Bilirrubina, transaminasas, creatinina, potasio, plaquetas, CPK", "clave", "BT 18; ALT 140; creatinina 4,2; K 3,2; plaquetas 40.000; CPK alta.", "Síndrome de Weil."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados alveolares difusos.", "Hemorragia pulmonar."),
    study("Laboratorio", "serologia", "Serología (MAT) y PCR para Leptospira", "util", "IgM positiva.", "Confirma."),
    study("Otros", "esperar-mat", "Esperar la confirmación para tratar", "riesgoso", "No se esperó.", "Mortalidad alta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("weil", "Leptospirosis grave (síndrome de Weil) con hemorragia pulmonar e IRA", true, "Exposición laboral, curso bifásico, mialgias en pantorrillas, ictericia, IRA, plaquetopenia y hemorragia pulmonar."),
      dx("hepatitis", "Hepatitis viral", false, "Transaminasas poco elevadas para la ictericia e IRA."),
      dx("hantavirus", "Hantavirus", false, "Ictericia e IRA dominan."),
      dx("dengue", "Dengue grave", false, "Exposición rural e ictericia."),
      dx("sepsis-biliar", "Colangitis", false, "Sin obstrucción y con IRA y hemorragia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina G o ceftriaxona EV", "clave", "Tratamiento."),
      mg("uti", "Terapia intensiva con soporte ventilatorio", "clave", "Hemorragia pulmonar."),
      mg("dialisis", "Diálisis temprana si hace falta", "clave", "IRA."),
      mg("notificar", "Notificar y proteger a los compañeros", "util", "Enfermedad laboral."),
      mg("ambulatorio", "Doxiciclina oral ambulatoria", "riesgoso", "Forma grave."),
      mg("aines", "AINE para el dolor", "riesgoso", "IRA y sangrado."),
    ],
  },
  debrief: {
    diagnosis: "Leptospirosis grave (síndrome de Weil) con hemorragia pulmonar e insuficiencia renal, en tambero de 52 años.",
    pathologies: [
      { name: "Síndrome de Weil", role: "principal", why: "Forma grave de leptospirosis." },
      { name: "Hemorragia pulmonar e IRA", role: "asociada", why: "Falla orgánica." },
      { name: "Hepatitis, hantavirus", role: "diferencial", why: "Otras zoonosis graves." },
    ],
    reasoning: [
      "Causa: Leptospira que ingresa por piel lesionada en contacto con agua o barro contaminado.",
      "Mecanismo: vasculitis difusa con daño renal, hepático y pulmonar.",
      "Consecuencia: ictericia, IRA, hemorragias y muerte.",
    ],
    epidemiology:
      "En Argentina es una zoonosis endémica del litoral y la región pampeana, en trabajadores rurales y después de inundaciones. La hemorragia pulmonar tiene mortalidad muy alta. Es de notificación obligatoria.",
    management: [
      "Sospecha epidemiológica.",
      "Antibiótico ya.",
      "Soporte.",
      "Prevención laboral.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de leptospirosis.", "OMS — Human Leptospirosis: Guidance for Diagnosis, Surveillance and Control."],
    pearls: ["Pantorrillas y conjuntivas rojas.", "Curso bifásico.", "Potasio bajo con IRA."],
    pitfalls: ["Esperar confirmación.", "Tratar ambulatorio."],
    tribunal: [
      qa("¿Por qué el potasio suele estar bajo en la IRA por leptospirosis?", "Porque produce una nefropatía con pérdida tubular de potasio."),
      qa("¿Qué profilaxis tienen los expuestos?", "Doxiciclina semanal en situaciones de alto riesgo, y botas y guantes."),
      qa("¿Qué es la ictericia rubínica?", "Ictericia con tinte rojizo por la vasculitis, típica de Weil."),
    ],
  },
};
