import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const esclerosisMultipleVaron: ClinicalCase = {
  id: "esclerosis-multiple-mielitis",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "Ingeniero. Hace 3 años tuvo visión borrosa en un ojo que se recuperó sola." },
  frequency: "poco-frecuente",
  intro: "“Hace diez días tengo hormigueo de la cintura para abajo, las piernas pesadas y me cuesta empezar a orinar. Al bajar la cabeza siento una corriente por la espalda.”",
  vitals: { TA: "122/76 mmHg", FC: "72 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("evolucion", "¿Cómo se instaló?", "clave", "“En días, y está estable.”", "Subaguda: desmielinizante."),
    act("previo", "¿Tuvo síntomas antes?", "clave", "“Vista borrosa en un ojo hace tres años.”", "Neuritis óptica previa: diseminación en tiempo."),
    act("lhermitte", "¿Qué siente al flexionar el cuello?", "clave", "“Una descarga eléctrica por la espalda.”", "Signo de Lhermitte."),
    act("infeccion", "¿Infección o vacuna reciente?", "util", "“No.”", "Mielitis postinfecciosa."),
    act("calor", "¿Empeora con el calor?", "util", "“Sí, en la ducha caliente.”", "Fenómeno de Uhthoff."),
    act("hobby", "¿Hace deporte?", "neutro", "“Natación.”", "No orienta."),
  ],
  exam: [
    act("sensitivo", "Sensibilidad", "clave", "Nivel sensitivo en D10.", "Mielopatía."),
    act("motor", "Fuerza y reflejos", "clave", "Paraparesia leve, hiperreflexia y Babinski bilateral.", "Lesión medular."),
    act("ojo", "Pupilas y fondo de ojo", "util", "Defecto pupilar aferente leve izquierdo, palidez temporal.", "Neuritis óptica antigua."),
  ],
  studies: [
    study("Imágenes", "rm", "RM de cerebro y médula con gadolinio", "clave", "Lesión medular corta en D9 que realza; lesiones periventriculares y yuxtacorticales sin realce.", "Diseminación en tiempo y espacio."),
    study("Laboratorio", "lcr", "LCR con bandas oligoclonales", "clave", "Bandas oligoclonales positivas.", "Apoya."),
    study("Laboratorio", "aqp4", "Anticuerpos anti-acuaporina 4 y anti-MOG, B12, VIH, VDRL", "util", "Negativos.", "Diferenciales."),
    study("Imágenes", "tc", "TC de columna como único estudio", "innecesario", "No se realizó.", "No ve la desmielinización."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("em", "Esclerosis múltiple recurrente-remitente con brote medular (mielitis parcial)", true, "Neuritis óptica previa, mielitis actual, lesiones con y sin realce y bandas oligoclonales."),
      dx("nmo", "Neuromielitis óptica", false, "Lesión medular corta y anti-AQP4 negativo."),
      dx("b12", "Degeneración combinada subaguda", false, "B12 normal y lesiones cerebrales."),
      dx("compresion", "Compresión medular", false, "RM sin compresión."),
      dx("guillain", "Guillain-Barré", false, "Hiperreflexia y nivel sensitivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metilpred", "Metilprednisolona EV por 3 a 5 días", "clave", "Acelera la recuperación del brote."),
      mg("dmt", "Iniciar tratamiento modificador de la enfermedad", "clave", "Reduce brotes y progresión."),
      mg("vejiga", "Evaluar la vejiga y el residuo", "clave", "Disfunción urinaria."),
      mg("vitd", "Vitamina D y no fumar", "util", "Factores modificables."),
      mg("sin-tratamiento", "No tratar entre brotes", "riesgoso", "Acumula discapacidad."),
      mg("interferon-nmo", "Usar tratamientos de EM sin descartar neuromielitis", "riesgoso", "Algunos empeoran la neuromielitis."),
    ],
  },
  debrief: {
    diagnosis: "Esclerosis múltiple recurrente-remitente con brote medular, con neuritis óptica previa, en varón de 35 años.",
    pathologies: [
      { name: "Esclerosis múltiple", role: "principal", why: "Enfermedad desmielinizante autoinmune." },
      { name: "Mielitis y disfunción vesical", role: "asociada", why: "Brote actual." },
      { name: "Neuromielitis óptica, déficit de B12", role: "diferencial", why: "Otras mielopatías." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra la mielina del sistema nervioso central.",
      "Mecanismo: placas inflamatorias en distintos sitios y momentos.",
      "Consecuencia: brotes neurológicos y discapacidad acumulada.",
    ],
    epidemiology:
      "La esclerosis múltiple es más común en mujeres jóvenes, pero en varones suele tener peor pronóstico. En Argentina la prevalencia es mayor en el sur. Muchos pacientes tuvieron un síntoma previo que no consultaron.",
    management: [
      "RM y LCR.",
      "Corticoides en el brote.",
      "Tratamiento modificador.",
      "Rehabilitación.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guías de esclerosis múltiple.", "McDonald Criteria 2017 — Diagnosis of Multiple Sclerosis."],
    pearls: ["Diseminación en tiempo y espacio.", "Lhermitte.", "Descartá neuromielitis."],
    pitfalls: ["No iniciar tratamiento.", "Ignorar el síntoma previo."],
    tribunal: [
      qa("¿Qué son los criterios de McDonald?", "Criterios de diseminación en tiempo y espacio con clínica, RM y bandas oligoclonales."),
      qa("¿Qué diferencia la neuromielitis óptica?", "Mielitis longitudinalmente extensa, neuritis grave y anticuerpos anti-acuaporina 4."),
      qa("¿Qué es el fenómeno de Uhthoff?", "Empeoramiento transitorio de síntomas con el aumento de la temperatura corporal."),
    ],
  },
};
