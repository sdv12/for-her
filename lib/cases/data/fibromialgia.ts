import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fibromialgia: ClinicalCase = {
  id: "fibromialgia",
  level: 1,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Empleada doméstica. Cuida a su madre con demencia. Consultó a muchos médicos." },
  frequency: "muy-frecuente",
  intro: "“Me duele todo el cuerpo hace años, me levanto más cansada de lo que me acosté y me olvido de las cosas. Nadie me encuentra nada.”",
  vitals: { TA: "118/74 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "70 kg" },
  anamnesis: [
    act("dolor", "¿Dónde le duele y desde cuándo?", "clave", "“En todos lados, hace más de tres años.”", "Dolor difuso crónico."),
    act("sueno", "¿Cómo duerme?", "clave", "“Duermo pero no descanso.”", "Sueño no reparador."),
    act("animo", "¿Cómo está su ánimo? ¿Ansiedad?", "clave", "“Angustiada, sobrecargada con mi mamá.”", "Comorbilidad frecuente."),
    act("inflamatorio", "¿Articulaciones hinchadas, rigidez de más de una hora, fiebre?", "util", "“No.”", "Sin inflamación."),
    act("intestino", "¿Problemas intestinales o dolor de cabeza?", "util", "“Colon irritable y migrañas.”", "Síndromes de sensibilización central."),
    act("madre", "¿Cómo se llama su mamá?", "neutro", "“Teresa.”", "No orienta."),
  ],
  exam: [
    act("dolor-palpacion", "Palpación de puntos dolorosos", "clave", "Dolor difuso a la presión en múltiples sitios.", "Hiperalgesia."),
    act("articular", "Examen articular", "clave", "Sin sinovitis.", "No es artritis."),
    act("fuerza", "Fuerza y reflejos", "util", "Normales.", "Sin miopatía ni neuropatía."),
  ],
  studies: [
    study("Laboratorio", "basicos", "Hemograma, VSG, PCR, TSH, CPK, vitamina D", "clave", "Normales.", "Descartar causas tratables."),
    study("Otros", "escala", "Índice de dolor generalizado y escala de severidad", "clave", "Criterios cumplidos.", "Diagnóstico positivo."),
    study("Otros", "phq", "Tamizaje de depresión y ansiedad", "util", "Depresión moderada.", "Comorbilidad."),
    study("Laboratorio", "fan-repetido", "FAN y paneles de autoinmunidad repetidos", "innecesario", "No se realizó.", "Falsos positivos y ansiedad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fibromialgia", "Fibromialgia con depresión asociada", true, "Dolor difuso de más de 3 meses, fatiga, sueño no reparador, alteración cognitiva, sin inflamación y con laboratorio normal."),
      dx("pmr", "Polimialgia reumática", false, "Edad y reactantes normales."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("lupus", "Lupus", false, "Sin compromiso orgánico ni laboratorio inflamatorio."),
      dx("simulacion", "Simulación", false, "Es un trastorno real del procesamiento del dolor."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("educacion", "Explicar el diagnóstico y validar el dolor", "clave", "Base del tratamiento."),
      mg("ejercicio", "Ejercicio aeróbico gradual", "clave", "Intervención con mejor evidencia."),
      mg("farmaco", "Amitriptilina en dosis baja o duloxetina", "clave", "Dolor, sueño y ánimo."),
      mg("tcc", "Terapia cognitivo-conductual y apoyo para la sobrecarga de cuidado", "util", "Factores psicosociales."),
      mg("opioides", "Opioides fuertes", "riesgoso", "Sin beneficio y con riesgo de dependencia."),
      mg("corticoides", "Corticoides", "riesgoso", "No hay inflamación."),
    ],
  },
  debrief: {
    diagnosis: "Fibromialgia con depresión asociada y sobrecarga de cuidadora, en mujer de 45 años.",
    pathologies: [
      { name: "Fibromialgia", role: "principal", why: "Dolor por sensibilización central." },
      { name: "Depresión y colon irritable", role: "asociada", why: "Comorbilidades frecuentes." },
      { name: "PMR, hipotiroidismo, lupus", role: "diferencial", why: "Causas orgánicas de dolor difuso." },
    ],
    reasoning: [
      "Causa: interacción de factores genéticos, estrés y trauma.",
      "Mecanismo: sensibilización central con amplificación del dolor.",
      "Consecuencia: dolor difuso, fatiga y alteración del sueño.",
    ],
    epidemiology:
      "Afecta al 2 a 4 % de la población, sobre todo mujeres de mediana edad. Es una de las causas más frecuentes de consulta reumatológica. El peregrinaje por estudios empeora el cuadro.",
    management: [
      "Diagnóstico positivo.",
      "Ejercicio.",
      "Fármaco.",
      "Abordaje psicosocial.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Fibromialgia.", "EULAR — Revised Recommendations for the Management of Fibromyalgia."],
    pearls: ["Dolor difuso con laboratorio normal.", "Ejercicio es el tratamiento.", "Validar."],
    pitfalls: ["Opioides.", "Estudios sin fin."],
    tribunal: [
      qa("¿Qué criterios usa el ACR 2016?", "Índice de dolor generalizado y escala de severidad de síntomas, con más de 3 meses de duración."),
      qa("¿Qué fármacos tienen evidencia?", "Amitriptilina, duloxetina y pregabalina."),
      qa("¿Por qué no sirven los antiinflamatorios?", "Porque el mecanismo es central, no inflamatorio periférico."),
    ],
  },
};
