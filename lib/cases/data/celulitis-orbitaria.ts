import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const celulitisOrbitaria: ClinicalCase = {
  id: "celulitis-orbitaria",
  level: 3,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "años", sex: "M", context: "Una semana con mocos y tos. Vacunas completas. Lo trae la mamá." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer tiene el ojo izquierdo hinchado y rojo, hoy le duele al moverlo y dice que ve doble.”",
  vitals: { FC: "116 lpm", FR: "22 rpm", "T°": "38,9 °C", "SatO₂": "98 %", Peso: "30 kg" },
  anamnesis: [
    act("resfrio", "¿Estuvo resfriado?", "clave", "“Una semana con mocos espesos.”", "Sinusitis: origen habitual."),
    act("dolor-movimiento", "¿Duele al mover el ojo?", "clave", "“Mucho.”", "Compromiso postseptal."),
    act("vision", "¿Ve doble o borroso?", "clave", "“Doble cuando mira al costado.”", "Oftalmoplejía."),
    act("trauma", "¿Golpe o picadura cerca del ojo?", "util", "“No.”", "Puerta de entrada cutánea."),
    act("cefalea", "¿Dolor de cabeza fuerte o vómitos?", "util", "“Le duele la frente.”", "Complicación intracraneal."),
    act("escuela", "¿En qué grado está?", "neutro", "“Cuarto.”", "No orienta."),
  ],
  exam: [
    act("ojo", "Párpados y globo ocular", "clave", "Edema y eritema palpebral, proptosis, quemosis.", "Postseptal."),
    act("motilidad", "Motilidad ocular y pupilas", "clave", "Limitación dolorosa de la abducción; pupilas normales.", "Celulitis orbitaria."),
    act("agudeza", "Agudeza visual y visión de colores", "util", "Conservadas.", "Sin compromiso del nervio óptico."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de órbitas y senos con contraste", "clave", "Etmoiditis izquierda con absceso subperióstico medial pequeño.", "Confirma y busca absceso."),
    study("Laboratorio", "lab", "Hemograma, PCR y hemocultivos", "clave", "Leucocitos 18.000; PCR alta.", "Infección."),
    study("Otros", "fondo", "Fondo de ojo y examen oftalmológico", "util", "Normal.", "Nervio óptico."),
    study("Otros", "ambulatorio", "Antibiótico oral y control en 48 horas", "riesgoso", "No se hizo.", "Pérdida visual o complicación intracraneal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("orbitaria", "Celulitis orbitaria (postseptal) con absceso subperióstico secundaria a etmoiditis", true, "Fiebre, proptosis, dolor y limitación de los movimientos oculares, con etmoiditis y absceso en la TC."),
      dx("preseptal", "Celulitis preseptal", false, "Hay proptosis y oftalmoplejía."),
      dx("conjuntivitis", "Conjuntivitis", false, "Hay proptosis y fiebre."),
      dx("alergia", "Edema alérgico palpebral", false, "Fiebre y dolor."),
      dx("trombosis-seno", "Trombosis del seno cavernoso", false, "Unilateral, pupilas normales y sin otros pares."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación con antibiótico EV (ceftriaxona más clindamicina o vancomicina)", "clave", "Infección postseptal."),
      mg("controles", "Control oftalmológico seriado de agudeza visual y pupilas", "clave", "Detectar compromiso del nervio."),
      mg("orl", "Interconsulta con ORL y oftalmología para drenaje si empeora", "clave", "Absceso."),
      mg("lavados", "Lavados nasales y descongestivos", "util", "Sinusitis."),
      mg("corticoides-solos", "Solo corticoides por el edema", "riesgoso", "No trata la infección."),
      mg("alta", "Alta con amoxicilina", "riesgoso", "Riesgo de ceguera."),
    ],
  },
  debrief: {
    diagnosis: "Celulitis orbitaria con absceso subperióstico medial secundaria a etmoiditis, en niño de 9 años.",
    pathologies: [
      { name: "Celulitis orbitaria", role: "principal", why: "Infección postseptal." },
      { name: "Etmoiditis y absceso subperióstico", role: "asociada", why: "Origen y complicación." },
      { name: "Celulitis preseptal, trombosis de seno cavernoso", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: sinusitis etmoidal por neumococo, estreptococo o S. aureus.",
      "Mecanismo: la infección atraviesa la delgada lámina papirácea hacia la órbita.",
      "Consecuencia: absceso, compresión del nervio óptico y extensión intracraneal.",
    ],
    epidemiology:
      "Es más frecuente en niños, casi siempre después de una sinusitis. La celulitis preseptal es mucho más común y benigna. Proptosis, dolor con los movimientos y oftalmoplejía definen la orbitaria.",
    management: [
      "Distinguir pre y postseptal.",
      "TC.",
      "Antibiótico EV.",
      "Drenaje si hace falta.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Celulitis periorbitaria y orbitaria.", "AAO — Preferred Practice Pattern: Orbital Cellulitis."],
    pearls: ["Dolor al mover el ojo y proptosis: postseptal.", "Etmoides.", "Controlá la visión."],
    pitfalls: ["Tratar ambulatorio.", "No pedir TC."],
    tribunal: [
      qa("¿Qué es la clasificación de Chandler?", "Estadios de complicación: preseptal, orbitaria, absceso subperióstico, absceso orbitario y trombosis del seno cavernoso."),
      qa("¿Cuándo se drena?", "Si hay compromiso visual, absceso grande o falta de respuesta en 48 horas."),
      qa("¿Qué signos sugieren trombosis del seno cavernoso?", "Compromiso bilateral, parálisis de varios pares craneales y alteración de conciencia."),
    ],
  },
};
