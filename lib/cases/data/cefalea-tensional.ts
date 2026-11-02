import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cefaleaTensional: ClinicalCase = {
  id: "cefalea-tensional",
  level: 1,
  area: "Neurología",
  setting: "CAPS",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Trabaja 10 horas frente a la computadora en un call center. Duerme poco." },
  frequency: "muy-frecuente",
  intro: "“Tengo dolor de cabeza casi todas las tardes, como una vincha apretada alrededor de la cabeza. Quiero una tomografía para quedarme tranquila.”",
  vitals: { TA: "122/78 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("caracteristicas", "¿Cómo es el dolor? ¿Late? ¿Empeora al caminar?", "clave", "“Opresivo, en las dos sienes y la nuca, no late; puedo seguir trabajando.”", "Dolor bilateral, opresivo, leve a moderado, que no empeora con la actividad: cefalea tensional."),
    act("asociados", "¿Náuseas, vómitos, molestia con la luz o ruido?", "clave", "“No.”", "Sin síntomas de migraña."),
    act("alarma", "¿Te despierta? ¿Empeora al toser? ¿Fiebre, debilidad o cambios en la visión?", "clave", "“No, nada.”", "Sin banderas rojas."),
    act("estres", "¿Cómo dormís y cómo estás de estrés?", "util", "“Duermo 5 horas, mucho estrés en el trabajo.”", "Factores desencadenantes."),
    act("analgesicos", "¿Cuántos días por mes tomás calmantes?", "util", "“Unos 8.”", "Por debajo del umbral de abuso."),
    act("musica", "¿Qué música escuchás?", "neutro", "“Rock nacional.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico y fondo de ojo", "clave", "Normales.", "Sin signos focales ni edema de papila."),
    act("pericraneal", "Palpación de músculos pericraneales y cervicales", "clave", "Dolor y contractura en trapecios y músculos temporales.", "Hipersensibilidad pericraneal, típica."),
    act("ta-ex", "Presión arterial", "util", "Normal.", "Descarta hipertensión."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro para tranquilizar", "innecesario", "No se realizó.", "Sin banderas rojas no está indicada; puede generar hallazgos incidentales y más ansiedad."),
    study("Otros", "diario", "Diario de cefaleas", "util", "12 días por mes, sobre todo días laborales.", "Patrón y desencadenantes."),
    study("Laboratorio", "lab", "Laboratorio general", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tensional", "Cefalea de tipo tensional episódica frecuente", true, "Dolor bilateral opresivo, leve a moderado, sin náuseas ni foto/fonofobia, con contractura pericraneal, sin banderas rojas."),
      dx("migrana", "Migraña", false, "No es pulsátil ni unilateral, no empeora con la actividad ni da náuseas."),
      dx("tumor", "Tumor cerebral", false, "Sin banderas rojas y examen normal."),
      dx("moh", "Cefalea por abuso de analgésicos", false, "Toma analgésicos menos de 10 días por mes."),
      dx("cervicogenica", "Cefalea cervicogénica", false, "No hay patología cervical ni dolor unilateral desencadenado por el cuello."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar el diagnóstico y por qué no hace falta tomografía", "clave", "La explicación reduce la ansiedad y el uso de estudios."),
      mg("analgesico", "Paracetamol o ibuprofeno en las crisis, limitando a menos de 2–3 días por semana", "clave", "Evita la cefalea por abuso de medicación."),
      mg("habitos", "Sueño, pausas activas, ergonomía, actividad física y manejo del estrés", "clave", "Reducen la frecuencia."),
      mg("preventivo", "Amitriptilina en dosis bajas si se vuelve crónica", "util", "Preventivo eficaz en la forma crónica."),
      mg("opioide", "Tramadol para el dolor", "riesgoso", "Riesgo de dependencia y cronificación."),
      mg("benzo", "Benzodiacepinas a diario para relajarse", "riesgoso", "Dependencia sin beneficio demostrado."),
    ],
  },
  debrief: {
    diagnosis: "Cefalea de tipo tensional episódica frecuente con hipersensibilidad pericraneal, asociada a estrés laboral, mala ergonomía y falta de sueño, en mujer de 38 años.",
    pathologies: [
      { name: "Cefalea tensional", role: "principal", why: "Criterios clínicos sin banderas rojas." },
      { name: "Estrés laboral y privación de sueño", role: "asociada", why: "Desencadenantes." },
      { name: "Migraña, tumor, abuso de analgésicos", role: "diferencial", why: "Se descartan por la clínica." },
    ],
    reasoning: [
      "Causa: estrés, posturas sostenidas, falta de sueño.",
      "Mecanismo: sensibilización de las vías del dolor pericraneales y centrales.",
      "Consecuencia: dolor opresivo bilateral; si se cronifica (15 días o más por mes), mayor discapacidad.",
    ],
    epidemiology:
      "La cefalea tensional es el tipo de cefalea más frecuente en la población (prevalencia anual de hasta 40–80 %), algo más en mujeres. La mayoría de las consultas no requieren imágenes.",
    management: [
      "Diagnóstico clínico y búsqueda de banderas rojas.",
      "Analgésicos simples en las crisis con límite de días.",
      "Medidas no farmacológicas.",
      "Preventivo (amitriptilina) en la forma crónica.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de cefaleas primarias.", "Clasificación internacional de cefaleas (ICHD-3)."],
    pearls: ["Vincha apretada, bilateral, no empeora con actividad.", "Sin banderas rojas: sin imágenes.", "Limitar analgésicos."],
    pitfalls: ["Pedir tomografía para tranquilizar.", "Dar opioides o benzodiacepinas."],
    tribunal: [
      qa("¿Cuáles son los criterios de cefalea tensional?", "Dolor de 30 minutos a 7 días con 2 de: bilateral, opresivo, leve a moderado, no empeora con la actividad; sin náuseas ni vómitos y con a lo sumo fotofobia o fonofobia (no ambas)."),
      qa("¿Qué diferencias hay entre migraña y cefalea tensional?", "Migraña: unilateral, pulsátil, moderada a grave, empeora con la actividad, con náuseas y foto y fonofobia. Tensional: bilateral, opresiva, leve a moderada, sin empeorar con la actividad ni náuseas."),
      qa("¿Qué cefaleas secundarias hay que recordar?", "Hemorragia subaracnoidea, meningitis, tumores, hipertensión intracraneal, arteritis de células gigantes, glaucoma agudo, trombosis venosa, disección arterial, intoxicación por monóxido y abuso de analgésicos."),
    ],
  },
};
