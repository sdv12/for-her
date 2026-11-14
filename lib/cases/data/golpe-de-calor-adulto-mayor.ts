import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const golpeDeCalorAdultoMayor: ClinicalCase = {
  id: "golpe-de-calor-clasico-adulta-mayor",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 82, ageUnit: "años", sex: "F", context: "Vive sola en un departamento sin aire acondicionado. Ola de calor de tres días. Toma furosemida y amitriptilina." },
  frequency: "frecuente",
  intro: "La vecina: “La encontré tirada, confundida y caliente. Hace tres días que hace 40 grados.”",
  vitals: { TA: "92/56 mmHg", FC: "124 lpm", FR: "26 rpm", "T°": "41,2 °C (rectal)", "SatO₂": "94 %", Glasgow: "11/15" },
  anamnesis: [
    act("ambiente", "¿Cómo estaba la casa?", "clave", "“Cerrada, sin ventilador.”", "Exposición."),
    act("farmacos", "¿Qué medicación toma?", "clave", "“Furosemida y amitriptilina.”", "Deshidratación y menos sudoración."),
    act("liquidos", "¿Tomaba agua?", "clave", "“Muy poco.”", "Sin sed."),
    act("infeccion", "¿Tos, ardor al orinar?", "util", "“No sé.”", "Sepsis."),
    act("caidas", "¿Se golpeó?", "util", "“No se ve.”", "Trauma."),
    act("gato", "¿Tiene mascotas?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Caliente y seca.", "Falla de la termorregulación."),
    act("neuro", "Examen neurológico", "clave", "Confusa, sin foco ni rigidez de nuca.", "Disfunción del SNC."),
    act("volemia", "Volemia", "util", "Muy deshidratada.", "Hipovolemia."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, creatinina, CPK, hepatograma, coagulograma, glucemia", "clave", "Na 151; creatinina 2,4; CPK 3.800; transaminasas altas.", "Daño multiorgánico."),
    study("Laboratorio", "infeccion", "Hemocultivos, orina y radiografía de tórax", "clave", "Sin foco.", "Descartar sepsis."),
    study("Electrofisiología", "ecg", "ECG", "util", "Taquicardia sinusal.", "Base."),
    study("Otros", "antipireticos", "Paracetamol como tratamiento", "riesgoso", "No se indicó.", "No baja la temperatura en el golpe de calor y daña el hígado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("golpe-calor-clasico", "Golpe de calor clásico (no por esfuerzo) con daño multiorgánico en adulta mayor", true, "Ola de calor, vivienda sin ventilación, temperatura mayor de 40, piel seca, encefalopatía y fármacos predisponentes."),
      dx("sepsis", "Sepsis", false, "Sin foco y contexto de calor extremo."),
      dx("neuroleptico", "Síndrome neuroléptico maligno", false, "No toma antipsicóticos."),
      dx("acv", "ACV", false, "Sin foco."),
      dx("agotamiento", "Agotamiento por calor", false, "Hay encefalopatía y temperatura mayor de 40."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("enfriar", "Enfriamiento rápido: evaporación con agua y ventiladores, compresas en axilas e ingles", "clave", "Bajar a menos de 39 cuanto antes."),
      mg("fluidos", "Cristaloides con cuidado", "clave", "Hipovolemia."),
      mg("farmacos", "Suspender furosemida y amitriptilina", "clave", "Predisponentes."),
      mg("social", "Plan de prevención para las olas de calor", "util", "Recurrencia."),
      mg("paracetamol", "Paracetamol y esperar", "riesgoso", "Ineficaz."),
      mg("enfriar-despacio", "Bajar la temperatura de a poco en horas", "riesgoso", "La mortalidad depende de la rapidez."),
    ],
  },
  debrief: {
    diagnosis: "Golpe de calor clásico con daño multiorgánico, en mujer de 82 años durante una ola de calor.",
    pathologies: [
      { name: "Golpe de calor clásico", role: "principal", why: "Falla de la termorregulación." },
      { name: "Fármacos y aislamiento", role: "asociada", why: "Factores de riesgo." },
      { name: "Sepsis, neuroléptico maligno", role: "diferencial", why: "Otras hipertermias." },
    ],
    reasoning: [
      "Causa: exposición prolongada al calor ambiental.",
      "Mecanismo: el calor supera la capacidad de disiparlo, agravado por diuréticos y anticolinérgicos.",
      "Consecuencia: encefalopatía, rabdomiólisis, IRA y falla hepática.",
    ],
    epidemiology:
      "Las olas de calor aumentan la mortalidad de adultos mayores, sobre todo los que viven solos. A diferencia del golpe de calor por esfuerzo, se instala en días. La prevención comunitaria salva vidas.",
    management: [
      "Temperatura central.",
      "Enfriar rápido.",
      "Soporte.",
      "Prevención.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones ante olas de calor.", "Wilderness Medical Society — Clinical Practice Guidelines for Heat Illness."],
    pearls: ["Ancianos solos en olas de calor.", "Enfriar ya.", "Antitérmicos no sirven."],
    pitfalls: ["Paracetamol.", "Pensar solo en sepsis."],
    tribunal: [
      qa("¿Qué diferencia hay entre golpe de calor clásico y por esfuerzo?", "El clásico afecta a ancianos y enfermos por exposición en días; el de esfuerzo a jóvenes en actividad intensa."),
      qa("¿Qué fármacos predisponen?", "Diuréticos, anticolinérgicos, antipsicóticos, betabloqueantes y antihistamínicos."),
      qa("¿Por qué no sirven los antitérmicos?", "Porque el punto de regulación hipotalámico no está alterado."),
    ],
  },
};
