import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tdah: ClinicalCase = {
  id: "trastorno-deficit-atencion-hiperactividad",
  level: 2,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 8, ageUnit: "años", sex: "M", context: "Tercer grado. Lo mandan de la escuela." },
  frequency: "frecuente",
  intro: "“La maestra dice que no se queda quieto, interrumpe, no termina las tareas y pierde las cosas. En casa es igual desde que era chiquito.” (relata la madre)",
  vitals: { TA: "100/64 mmHg", FC: "88 lpm", Peso: "26 kg" },
  anamnesis: [
    act("ambitos", "¿Le pasa en la casa, en la escuela y en otros lugares?", "clave", "“En todos lados: casa, escuela, cumpleaños.”", "Los síntomas deben aparecer en dos o más ámbitos."),
    act("inicio", "¿Desde cuándo?", "clave", "“Desde los 4 o 5 años.”", "Inicio antes de los 12 años."),
    act("impacto", "¿Cómo le va en la escuela y con los amigos?", "clave", "“Repite tareas, lo retan mucho, le cuesta tener amigos.”", "Deterioro funcional."),
    act("sueno", "¿Cómo duerme? ¿Ronca?", "util", "“Duerme bien, no ronca.”", "La apnea del sueño puede simular TDAH."),
    act("contexto", "¿Pasó algo en la familia, mudanzas, separaciones, violencia?", "util", "“No, todo tranquilo.”", "Estrés y trauma pueden causar síntomas similares."),
    act("audicion-vision", "¿Le controlaron la vista y la audición?", "util", "“Sí, normales.”", "Descartan causas sensoriales."),
    act("juego", "¿Qué le gusta?", "neutro", "“Los dinosaurios y el fútbol.”", "No orienta."),
  ],
  exam: [
    act("conducta", "Observación en la consulta", "clave", "Se levanta, toca todo, interrumpe, contesta antes de que termine la pregunta.", "Hiperactividad e impulsividad."),
    act("neuro", "Examen neurológico y del desarrollo", "util", "Normal.", "Descarta otras causas neurológicas."),
    act("cardio", "Auscultación y presión arterial", "util", "Normales.", "Línea de base antes de estimulantes."),
  ],
  studies: [
    study("Otros", "escalas", "Escalas de padres y maestros (por ejemplo, SNAP-IV o Conners)", "clave", "Puntajes altos en inatención e hiperactividad en ambos informantes.", "Apoyan el diagnóstico."),
    study("Otros", "eeg", "Electroencefalograma de rutina", "innecesario", "No se realizó.", "No sirve para diagnosticar TDAH."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se realizó.", "No tiene indicación diagnóstica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tdah", "Trastorno por déficit de atención e hiperactividad, presentación combinada", true, "Inatención, hiperactividad e impulsividad desde antes de los 12 años, en varios ámbitos, con deterioro escolar y social, sin otra causa."),
      dx("normal", "Conducta normal para la edad", false, "La intensidad y el deterioro superan lo esperable."),
      dx("tea", "Trastorno del espectro autista", false, "No hay alteraciones de la comunicación social ni intereses restringidos."),
      dx("ansiedad", "Trastorno de ansiedad", false, "No hay preocupaciones ni miedos excesivos."),
      dx("apnea", "Apnea del sueño", false, "Duerme bien, sin ronquidos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("psicoeducacion", "Psicoeducación a la familia y orientación a padres", "clave", "Base del tratamiento."),
      mg("escuela", "Trabajo con la escuela (adecuaciones, ubicación en el aula, pausas)", "clave", "Mejora el rendimiento."),
      mg("farmaco", "Metilfenidato si persiste el deterioro, con control de peso, presión y sueño", "clave", "En mayores de 6 años con impacto significativo, combinado con intervenciones conductuales."),
      mg("terapia", "Terapia cognitivo-conductual", "util", "Mejora habilidades y conducta."),
      mg("dietas", "Dietas de eliminación sin indicación", "innecesario", "Sin evidencia sólida."),
      mg("castigo", "Castigos físicos para controlar la conducta", "riesgoso", "Dañinos y vulneran sus derechos."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno por déficit de atención e hiperactividad, presentación combinada, con deterioro escolar y social, en niño de 8 años.",
    pathologies: [
      { name: "TDAH presentación combinada", role: "principal", why: "Inatención e hiperactividad-impulsividad persistentes." },
      { name: "Dificultades escolares y sociales", role: "asociada", why: "Impacto funcional." },
      { name: "TEA, ansiedad, apnea del sueño", role: "diferencial", why: "Simuladores o comorbilidades." },
    ],
    reasoning: [
      "Causa: trastorno del neurodesarrollo con fuerte componente genético.",
      "Mecanismo: alteraciones en circuitos frontoestriatales y en la regulación dopaminérgica y noradrenérgica de las funciones ejecutivas.",
      "Consecuencia: dificultad para sostener la atención, controlar impulsos y organizarse, con impacto escolar, familiar y social.",
    ],
    epidemiology:
      "El TDAH afecta a alrededor del 5 % de los niños en edad escolar, más a varones (2–3:1). Muchas veces persiste en la adolescencia y la adultez, y se asocia a trastornos del aprendizaje, ansiedad y conductas de riesgo.",
    management: [
      "Diagnóstico clínico con información de padres y escuela.",
      "Descartar causas médicas y psicosociales.",
      "Psicoeducación, intervenciones conductuales y escolares.",
      "Fármacos (metilfenidato) cuando hay deterioro significativo, con seguimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso sobre TDAH.", "Ley 27.306 de Abordaje Integral de las Dificultades Específicas del Aprendizaje."],
    pearls: ["Varios ámbitos, antes de los 12 años, con deterioro.", "Información de la escuela.", "No hay estudio que diagnostique TDAH."],
    pitfalls: ["Diagnosticar con un solo informante.", "Pedir EEG o resonancia."],
    tribunal: [
      qa("¿Qué presentaciones tiene el TDAH?", "Predominantemente inatenta, predominantemente hiperactiva-impulsiva y combinada, según los síntomas de los últimos 6 meses."),
      qa("¿Qué efectos adversos tiene el metilfenidato?", "Disminución del apetito y del peso, insomnio, cefalea, dolor abdominal, aumento de la frecuencia cardíaca y la presión, y a veces tics o irritabilidad."),
      qa("¿Qué comorbilidades tiene el TDAH?", "Trastornos del aprendizaje (dislexia), trastorno negativista desafiante, ansiedad, depresión, tics, trastornos del sueño y, en adolescentes, consumo de sustancias."),
    ],
  },
};
