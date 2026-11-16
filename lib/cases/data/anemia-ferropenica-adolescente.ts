import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaFerropenicaAdolescente: ClinicalCase = {
  id: "anemia-ferropenica-adolescente",
  level: 1,
  area: "Hematología",
  setting: "CAPS",
  patient: { age: 15, ageUnit: "años", sex: "F", context: "Juega al hockey. Menarca a los 12. Dejó de comer carne hace un año por convicción." },
  frequency: "muy-frecuente",
  intro: "“Me canso en los entrenamientos como nunca, y me mareo al pararme.”",
  vitals: { TA: "104/62 mmHg", FC: "98 lpm", Peso: "50 kg" },
  anamnesis: [
    act("menstruacion", "¿Cómo son tus menstruaciones?", "clave", "“Abundantes, 7 días, cambio la toallita cada 2 horas y mancho de noche.”", "Pérdida menstrual aumentada."),
    act("dieta", "¿Qué comés en un día?", "clave", "“Fideos, pan, verduras. Carne no, legumbres poco.”", "Dieta vegetariana sin planificar."),
    act("pica", "¿Tenés ganas de comer hielo o tierra?", "util", "“Como hielo todo el tiempo.”", "Pica: ferropenia."),
    act("sangrados", "¿Sangrado de encías, nariz, moretones fáciles?", "clave", "“No.”", "Descarta coagulopatía como causa de las menstruaciones abundantes."),
    act("digestivo", "¿Diarrea, dolor, sangre en la materia fecal?", "util", "“No.”", "Celiaquía o pérdida digestiva."),
    act("puesto", "¿En qué puesto jugás?", "neutro", "“Defensora.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Mucosas y uñas", "clave", "Palidez, uñas frágiles.", "Anemia ferropénica."),
    act("soplo", "Corazón", "util", "Soplo sistólico funcional.", "Anemia."),
    act("tiroides", "Tiroides", "util", "Normal.", "Diferencial."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con índices", "clave", "Hb 9,4 g/dl, VCM 70 fl, RDW alto.", "Microcítica con anisocitosis."),
    study("Laboratorio", "ferritina", "Ferritina", "clave", "6 ng/ml.", "Confirma ferropenia."),
    study("Laboratorio", "celiaquia", "Anti-transglutaminasa IgA", "util", "Negativa.", "Causa frecuente de ferropenia."),
    study("Laboratorio", "coagulacion", "Coagulograma y factor de von Willebrand", "util", "Normales.", "Menstruaciones abundantes desde la menarca."),
    study("Otros", "medula", "Punción de médula ósea", "innecesario", "No se hizo.", "El diagnóstico es claro."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ferropenica", "Anemia ferropénica por menstruaciones abundantes y dieta vegetariana sin planificar", true, "Microcitosis con RDW alto, ferritina de 6, pica, menstruaciones abundantes y baja ingesta de hierro."),
      dx("talasemia", "Talasemia menor", false, "Ferritina baja y RDW alto."),
      dx("von-willebrand", "Enfermedad de von Willebrand", false, "Estudios normales."),
      dx("celiaquia", "Celiaquía", false, "Serología negativa."),
      dx("cronica", "Anemia de enfermedad crónica", false, "Ferritina muy baja."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hierro", "Hierro oral 60–120 mg de hierro elemental por día (o días alternos), con vitamina C", "clave", "Tratamiento."),
      mg("duracion", "Seguir 3 meses después de normalizar la hemoglobina", "clave", "Reponer depósitos."),
      mg("nutricion", "Plan vegetariano con legumbres, semillas, cereales fortificados y vitamina C", "clave", "Respetar su elección y hacerla segura."),
      mg("gineco", "Evaluar las menstruaciones con ginecología infantojuvenil", "util", "Sangrado abundante."),
      mg("control", "Control de hemograma y reticulocitos en 4 semanas", "util", "Respuesta."),
      mg("obligar-carne", "Obligarla a comer carne", "riesgoso", "No respeta su decisión y aleja del sistema."),
      mg("con-te", "Tomar el hierro con té o mate", "riesgoso", "Los taninos reducen la absorción."),
    ],
  },
  debrief: {
    diagnosis: "Anemia ferropénica moderada por menstruaciones abundantes y dieta vegetariana sin planificar, en una adolescente deportista de 15 años.",
    pathologies: [
      { name: "Anemia ferropénica", role: "principal", why: "Balance negativo de hierro." },
      { name: "Sangrado menstrual abundante", role: "asociada", why: "Pérdida." },
      { name: "Von Willebrand, celiaquía", role: "diferencial", why: "Causas a descartar." },
    ],
    reasoning: [
      "Causa: más pérdida menstrual, menos ingesta y más demanda por crecimiento y deporte.",
      "Mecanismo: se agotan los depósitos y cae la síntesis de hemoglobina.",
      "Consecuencia: cansancio, menor rendimiento, pica y mareos.",
    ],
    epidemiology:
      "La anemia ferropénica es la carencia nutricional más frecuente del mundo. En adolescentes mujeres afecta hasta al 15–20 % y la deficiencia de hierro sin anemia es aún más común. Las deportistas y vegetarianas tienen más riesgo.",
    management: [
      "Hemograma y ferritina.",
      "Buscar la causa.",
      "Hierro oral bien tomado.",
      "Educación alimentaria.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Deficiencia de hierro y anemia ferropénica.", "Sociedad Argentina de Hematología — Anemias."],
    pearls: ["Ferritina baja = ferropenia.", "Preguntá por la menstruación.", "Hierro sin mate, con vitamina C."],
    pitfalls: ["No preguntar por sangrado.", "Juzgar la dieta."],
    tribunal: [
      qa("¿Qué índice distingue la ferropenia de la talasemia menor?", "El RDW alto en la ferropenia y normal en la talasemia, junto con la ferritina y el índice de Mentzer."),
      qa("¿Qué mejora y qué empeora la absorción del hierro?", "La mejora la vitamina C; la empeoran el té, el mate, el café, los lácteos y los antiácidos."),
      qa("¿Cuándo se espera la respuesta al hierro oral?", "Reticulocitosis a los 7–10 días y suba de 1–2 g/dl de hemoglobina en 4 semanas."),
    ],
  },
};
