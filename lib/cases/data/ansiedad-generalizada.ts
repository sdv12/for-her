import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ansiedadGeneralizada: ClinicalCase = {
  id: "trastorno-ansiedad-generalizada",
  level: 1,
  area: "Salud mental",
  setting: "CAPS",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Madre de dos hijos, trabaja de cajera. Toma café varias veces por día." },
  frequency: "muy-frecuente",
  intro: "“Vivo preocupada por todo: la plata, los chicos, el trabajo. No puedo parar de pensar, me duele la nuca, duermo mal y estoy siempre tensa.”",
  vitals: { TA: "124/80 mmHg", FC: "92 lpm", "T°": "36,4 °C", Peso: "64 kg" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo te sentís así? ¿La mayoría de los días?", "clave", "“Hace más de un año, casi todos los días.”", "Preocupación excesiva por más de 6 meses: criterio de ansiedad generalizada."),
    act("control", "¿Podés controlar las preocupaciones?", "clave", "“No, aunque sé que exagero.”", "Dificultad para controlar la preocupación."),
    act("sintomas", "¿Tensión muscular, cansancio, irritabilidad, problemas de sueño o de concentración?", "clave", "“Todo eso.”", "Síntomas físicos y cognitivos asociados."),
    act("panico", "¿Tuviste crisis bruscas de miedo intenso con palpitaciones y sensación de muerte?", "util", "“No, es algo constante.”", "Diferencia con el trastorno de pánico."),
    act("depresion-suicidio", "¿Te sentís triste o pensaste en hacerte daño?", "clave", "“Triste a veces, nunca pensé en hacerme daño.”", "Comorbilidad con depresión y evaluación del riesgo."),
    act("sustancias", "¿Cuánto café, mate, alcohol o pastillas tomás?", "util", "“Seis cafés y mate; una pastilla de clonazepam de mi mamá cuando no duermo.”", "La cafeína empeora la ansiedad; uso de benzodiacepinas sin indicación."),
    act("hobby", "¿Qué te gusta hacer?", "neutro", "“Bailar.”", "Puede ser un recurso, pero no orienta."),
  ],
  exam: [
    act("general", "Examen general y tiroides", "clave", "Tensión en trapecios, tiroides normal, sin temblor fino.", "Descarta hipertiroidismo clínico."),
    act("mental", "Examen mental", "util", "Ansiosa, lúcida, sin psicosis.", "Evaluación."),
    act("cardio", "Auscultación cardíaca", "util", "Taquicardia leve, sin soplos.", "Sin cardiopatía evidente."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH y hemograma", "util", "Normales.", "Descartan hipertiroidismo y anemia."),
    study("Otros", "gad7", "Cuestionario GAD-7", "clave", "Puntaje 15: ansiedad moderada a grave.", "Mide la gravedad y permite el seguimiento."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se realizó.", "Sin indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tag", "Trastorno de ansiedad generalizada moderado a grave", true, "Preocupación excesiva e incontrolable por múltiples temas por más de 6 meses, con tensión, cansancio, irritabilidad, insomnio y dificultad para concentrarse."),
      dx("panico", "Trastorno de pánico", false, "No hay crisis bruscas recurrentes."),
      dx("depresion", "Depresión mayor", false, "Predomina la preocupación; la tristeza es ocasional."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "TSH normal."),
      dx("normal", "Estrés normal", false, "La intensidad, la duración y el deterioro superan lo esperable."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tcc", "Psicoterapia (cognitivo-conductual)", "clave", "Tratamiento de primera línea."),
      mg("isrs", "ISRS (sertralina o escitalopram) si es moderado a grave, con aumento gradual", "clave", "Eficaces para la ansiedad generalizada."),
      mg("cafeina", "Reducir la cafeína, actividad física y técnicas de relajación", "clave", "Medidas eficaces."),
      mg("seguimiento", "Seguimiento en el primer nivel", "util", "Ajuste y adherencia."),
      mg("benzo-cronico", "Benzodiacepinas a largo plazo como tratamiento principal", "riesgoso", "Dependencia, deterioro cognitivo y caídas; solo por tiempo breve."),
      mg("nada", "Decirle que “son nervios” sin tratamiento", "riesgoso", "Es un trastorno tratable con impacto en la vida."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno de ansiedad generalizada moderado a grave, con consumo elevado de cafeína y uso de benzodiacepinas sin prescripción, en mujer de 34 años.",
    pathologies: [
      { name: "Trastorno de ansiedad generalizada", role: "principal", why: "Preocupación excesiva crónica." },
      { name: "Cafeína y benzodiacepinas sin indicación", role: "asociada", why: "Agravan o complican." },
      { name: "Pánico, depresión, hipertiroidismo", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: predisposición biológica y temperamental con estresores crónicos.",
      "Mecanismo: hiperactividad de los circuitos del miedo y del eje del estrés con preocupación persistente.",
      "Consecuencia: tensión, insomnio, síntomas físicos, deterioro funcional y riesgo de depresión y consumo.",
    ],
    epidemiology:
      "Los trastornos de ansiedad son los trastornos mentales más frecuentes en Argentina y en el mundo; la ansiedad generalizada es casi dos veces más frecuente en mujeres, con inicio en la adultez joven. La mayoría consulta primero por síntomas físicos en el primer nivel.",
    management: [
      "Diagnóstico clínico y descarte de causas orgánicas y sustancias.",
      "Psicoterapia y, si es moderado a grave, ISRS.",
      "Evitar el uso crónico de benzodiacepinas.",
      "Seguimiento y abordaje de comorbilidades.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos para la atención de los trastornos de ansiedad en el primer nivel.", "Ley 26.657 de Salud Mental."],
    pearls: ["Preocupación excesiva más de 6 meses.", "TCC e ISRS.", "Cafeína empeora."],
    pitfalls: ["Benzodiacepinas crónicas.", "Minimizar con “son nervios”."],
    tribunal: [
      qa("¿Cuáles son los criterios de trastorno de ansiedad generalizada?", "Ansiedad y preocupación excesivas la mayoría de los días por al menos 6 meses, difíciles de controlar, con 3 o más de: inquietud, fatiga, dificultad para concentrarse, irritabilidad, tensión muscular y alteración del sueño, con malestar o deterioro."),
      qa("¿Qué diferencia la ansiedad generalizada del trastorno de pánico?", "La ansiedad generalizada es una preocupación constante por varios temas; el pánico tiene crisis bruscas de miedo intenso con síntomas físicos que llegan al máximo en minutos y miedo a nuevas crisis."),
      qa("¿Qué causas orgánicas pueden producir ansiedad?", "Hipertiroidismo, arritmias, hipoglucemia, feocromocitoma, asma o EPOC, cafeína, estimulantes, abstinencia de alcohol o benzodiacepinas, y fármacos como corticoides o salbutamol."),
    ],
  },
};
