import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mordeduraGato: ClinicalCase = {
  id: "mordedura-gato-pasteurella",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Diabética. Ayer la mordió su gato en la mano al bañarlo." },
  frequency: "frecuente",
  intro: "“Ayer el gato me mordió la mano y hoy está hinchada, roja y me duele mucho al mover el dedo.”",
  vitals: { TA: "130/80 mmHg", FC: "96 lpm", "T°": "38,0 °C", Glucemia: "214 mg/dl" },
  anamnesis: [
    act("tiempo", "¿Cuándo fue la mordedura?", "clave", "“Ayer a la tarde.”", "Pasteurella da celulitis en menos de 24 horas."),
    act("animal", "¿Es su gato y está vacunado?", "clave", "“Es mío, vacunado.”", "Riesgo de rabia bajo."),
    act("dedo", "¿Le duele al mover el dedo?", "clave", "“Muchísimo.”", "Tenosinovitis."),
    act("antitetanica", "¿Vacuna antitetánica?", "util", "“Hace 15 años.”", "Refuerzo."),
    act("lavado", "¿Lavó la herida?", "util", "“Con agua nomás.”", "Base."),
    act("gato", "¿Cómo se llama el gato?", "neutro", "“Michi.”", "No orienta."),
  ],
  exam: [
    act("mano", "Mano", "clave", "Dos punciones profundas en el dorso del índice, celulitis hasta la muñeca.", "Celulitis rápida."),
    act("kanavel", "Signos de Kanavel", "clave", "Dedo en flexión, dolor a la extensión pasiva y en la vaina.", "Tenosinovitis flexora."),
    act("ganglios", "Ganglios", "util", "Epitrocleares dolorosos.", "Linfangitis."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de mano", "clave", "Sin cuerpo extraño ni fractura.", "Excluye diente retenido."),
    study("Microbiología", "cultivo", "Cultivo de la herida", "util", "Pasteurella multocida.", "Germen."),
    study("Laboratorio", "lab", "Hemograma y glucemia", "util", "Leucocitos 13.000.", "Inflamación."),
    study("Otros", "sutura", "Suturar las punciones", "riesgoso", "No se hizo.", "Encierra la infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pasteurella", "Celulitis y tenosinovitis flexora por Pasteurella multocida tras mordedura de gato", true, "Mordedura de gato con celulitis en menos de 24 horas, signos de Kanavel y cultivo positivo."),
      dx("estafilococo", "Celulitis estafilocócica", false, "Evolución rápida tras mordedura de gato."),
      dx("bartonella", "Enfermedad por arañazo de gato", false, "Es aguda y supurativa."),
      dx("gota", "Gota", false, "Hay mordedura y fiebre."),
      dx("artritis", "Artritis séptica de muñeca", false, "Compromiso de vaina flexora."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ampicilina-sulbactam EV y luego amoxicilina-clavulánico", "clave", "Cubre Pasteurella y anaerobios."),
      mg("cirugia", "Consulta urgente a cirugía de mano para drenaje de la vaina", "clave", "Tenosinovitis."),
      mg("antitetanica", "Refuerzo antitetánico", "clave", "Más de 10 años."),
      mg("elevacion", "Elevación de la mano e inmovilización", "util", "Edema."),
      mg("cefalexina", "Cefalexina sola", "riesgoso", "Pasteurella es resistente."),
      mg("sutura-mg", "Cerrar la herida", "riesgoso", "Infección."),
    ],
  },
  debrief: {
    diagnosis: "Celulitis y tenosinovitis flexora por Pasteurella multocida tras mordedura de gato, en mujer diabética de 58 años.",
    pathologies: [
      { name: "Infección por mordedura de gato", role: "principal", why: "Pasteurella multocida." },
      { name: "Tenosinovitis flexora y diabetes", role: "asociada", why: "Gravedad." },
      { name: "Celulitis estafilocócica, Bartonella", role: "diferencial", why: "Otras infecciones." },
    ],
    reasoning: [
      "Causa: dientes finos del gato que inoculan profundo.",
      "Mecanismo: Pasteurella se multiplica rápido en tejidos profundos.",
      "Consecuencia: celulitis, tenosinovitis, artritis u osteomielitis.",
    ],
    epidemiology:
      "Las mordeduras de gato se infectan más que las de perro porque son profundas. Las de la mano son las más riesgosas. Se da profilaxis antibiótica en mordeduras de gato en la mano.",
    management: [
      "Lavar, no suturar.",
      "Amoxicilina-clavulánico.",
      "Tétanos y rabia.",
      "Cirugía si hay tenosinovitis.",
    ],
    sources: ["Sociedad Argentina de Infectología — Mordeduras.", "IDSA — Practice Guidelines for Skin and Soft Tissue Infections."],
    pearls: ["Gato en la mano: antibiótico.", "Pasteurella: menos de 24 horas.", "Kanavel."],
    pitfalls: ["Cefalexina.", "Suturar."],
    tribunal: [
      qa("¿Cuáles son los signos de Kanavel?", "Dedo en flexión, tumefacción fusiforme, dolor en la vaina y dolor a la extensión pasiva."),
      qa("¿Por qué no se usa cefalexina?", "Porque Pasteurella es poco sensible a cefalosporinas de primera generación."),
      qa("¿Cuándo se indica profilaxis antirrábica tras una mordedura de gato?", "Si el animal no es observable o desarrolla síntomas en 10 días."),
    ],
  },
};
