import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dermatomiositis: ClinicalCase = {
  id: "dermatomiositis",
  level: 3,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 56, ageUnit: "años", sex: "F", context: "Ex fumadora. Hace meses le cuesta peinarse." },
  frequency: "raro",
  intro: "“No puedo levantarme de la silla ni subir escaleras, tengo los párpados violetas y unas manchas en los nudillos.”",
  vitals: { TA: "128/78 mmHg", FC: "82 lpm", "T°": "36,8 °C", Peso: "58 kg" },
  anamnesis: [
    act("debilidad", "¿Qué movimientos le cuestan?", "clave", "“Peinarme, levantarme de la silla.”", "Debilidad proximal."),
    act("piel", "¿Qué le pasa en la piel?", "clave", "“Párpados violetas y manchas en los nudillos.”", "Heliotropo y Gottron."),
    act("peso", "¿Bajó de peso?", "clave", "“Cinco kilos.”", "Buscar cáncer asociado."),
    act("disfagia", "¿Le cuesta tragar?", "util", "“Un poco.”", "Compromiso faríngeo."),
    act("tos", "¿Tos o falta de aire?", "util", "“Tos seca.”", "Enfermedad pulmonar intersticial."),
    act("hobby", "¿Qué hacía?", "neutro", "“Bailaba tango.”", "No orienta."),
  ],
  exam: [
    act("fuerza", "Fuerza", "clave", "Debilidad proximal simétrica 3/5 en cinturas.", "Miopatía."),
    act("piel-ex", "Piel", "clave", "Eritema en heliotropo, pápulas de Gottron, signo del chal.", "Dermatomiositis."),
    act("pulmon", "Pulmón", "util", "Rales finos bibasales.", "Intersticial."),
  ],
  studies: [
    study("Laboratorio", "cpk", "CPK, aldolasa, transaminasas", "clave", "CPK 4.800.", "Miositis."),
    study("Laboratorio", "anticuerpos", "Anticuerpos específicos de miositis (anti-Mi2, anti-TIF1γ, anti-Jo1)", "clave", "Anti-TIF1γ positivo.", "Asociado a cáncer."),
    study("Imágenes", "tc", "TC de tórax, abdomen y pelvis, mamografía y ginecológico", "clave", "Masa ovárica derecha.", "Cáncer asociado."),
    study("Otros", "estatinas", "Iniciar estatinas por la CPK", "riesgoso", "No se hizo.", "Empeoran la miopatía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dm", "Dermatomiositis paraneoplásica (anti-TIF1γ) asociada a tumor de ovario", true, "Debilidad proximal, heliotropo, Gottron, CPK alta, anti-TIF1γ y masa ovárica."),
      dx("polimiositis", "Polimiositis", false, "Hay lesiones cutáneas típicas."),
      dx("pmr", "Polimialgia reumática", false, "Debilidad real y CPK alta."),
      dx("hipotiroidismo", "Miopatía hipotiroidea", false, "Lesiones cutáneas específicas."),
      dx("lupus", "Lupus", false, "Gottron y heliotropo son de dermatomiositis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Corticoides en dosis altas", "clave", "Tratamiento inicial."),
      mg("cancer", "Estudiar y tratar el tumor de ovario", "clave", "Paraneoplásica."),
      mg("ahorrador", "Ahorrador de corticoides (metotrexato o azatioprina)", "util", "Mantenimiento."),
      mg("fotoproteccion", "Fotoprotección y evaluación de deglución y pulmón", "clave", "Complicaciones."),
      mg("ejercicio-intenso", "Ejercicio intenso en la fase aguda", "riesgoso", "Empeora el daño muscular."),
      mg("no-buscar-cancer", "Tratar solo la miositis", "riesgoso", "El cáncer define el pronóstico."),
    ],
  },
  debrief: {
    diagnosis: "Dermatomiositis paraneoplásica con anti-TIF1γ asociada a tumor de ovario, en mujer de 56 años.",
    pathologies: [
      { name: "Dermatomiositis", role: "principal", why: "Miopatía inflamatoria con piel." },
      { name: "Cáncer de ovario", role: "asociada", why: "Paraneoplásica." },
      { name: "Polimiositis, PMR", role: "diferencial", why: "Otras causas de debilidad proximal." },
    ],
    reasoning: [
      "Causa: autoinmunidad, a veces gatillada por un tumor.",
      "Mecanismo: vasculopatía mediada por complemento en músculo y piel.",
      "Consecuencia: debilidad proximal, lesiones cutáneas, disfagia y compromiso pulmonar.",
    ],
    epidemiology:
      "Es rara, más en mujeres y en dos picos de edad. En adultos hasta un cuarto se asocia a cáncer, sobre todo ovario, pulmón, mama y digestivo. El anti-TIF1γ indica alto riesgo de cáncer.",
    management: [
      "Clínica y CPK.",
      "Anticuerpos.",
      "Buscar cáncer.",
      "Corticoides.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Miopatías inflamatorias.", "EULAR/ACR — Classification Criteria for Idiopathic Inflammatory Myopathies."],
    pearls: ["Heliotropo y Gottron.", "Buscá el cáncer.", "Mirá el pulmón."],
    pitfalls: ["No buscar tumor.", "Estatinas."],
    tribunal: [
      qa("¿Qué es el signo de Gottron?", "Pápulas eritematovioláceas sobre nudillos y codos."),
      qa("¿Qué anticuerpo se asocia a enfermedad pulmonar intersticial?", "Anti-Jo1 y otros antisintetasa, y anti-MDA5."),
      qa("¿Qué cánceres se asocian?", "Ovario, pulmón, mama, gástrico, colorrectal y linfomas."),
    ],
  },
};
