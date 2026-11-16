import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const panicoDolorToracico: ClinicalCase = {
  id: "panico-dolor-toracico",
  level: 2,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "M", context: "Contador. Es su cuarta consulta en guardia en dos meses por lo mismo; ECG y troponinas siempre normales." },
  frequency: "frecuente",
  intro: "“Me apretó el pecho, se me durmieron las manos y pensé que me moría. Otra vez.”",
  vitals: { TA: "138/84 mmHg", FC: "102 lpm", FR: "24 rpm", "SatO₂": "99 %", "T°": "36,4 °C" },
  anamnesis: [
    act("episodio", "¿Cómo empezó y cuánto duró?", "clave", "“De golpe, en el subte. Llegó al máximo en 5 minutos y en media hora se fue.”", "Pico en minutos: típico de crisis de pánico."),
    act("sintomas", "¿Qué más sintió?", "clave", "“Palpitaciones, falta de aire, hormigueo en las manos y la boca, miedo a morirme.”", "Síntomas autonómicos con miedo intenso."),
    act("anticipacion", "¿Tiene miedo de que vuelva a pasar? ¿Evita lugares?", "clave", "“Ya no viajo en subte, vengo en auto.”", "Ansiedad anticipatoria y evitación: trastorno de pánico."),
    act("riesgo-cv", "¿Fuma, presión, colesterol, familiares con infarto joven?", "clave", "“Nada de eso.”", "Bajo riesgo, pero hay que evaluarlo cada vez con criterio."),
    act("sustancias", "¿Café, energizantes, cocaína, alcohol?", "clave", "“Mucho café.”", "Desencadenantes."),
    act("club", "¿De qué club es?", "neutro", "“De Boca.”", "No orienta."),
  ],
  exam: [
    act("cardio", "Cardiovascular", "clave", "Taquicardia sinusal, sin soplos ni frote.", "Normal."),
    act("respiratorio", "Respiratorio", "util", "Hiperventilación, murmullo normal.", "Parestesias por hipocapnia."),
    act("tiroides", "Tiroides", "util", "Normal.", "Diferencial."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal, sin alteraciones del ST.", "Siempre ante dolor torácico."),
    study("Laboratorio", "troponina", "Troponina ultrasensible", "util", "Negativa.", "Según riesgo y presentación."),
    study("Laboratorio", "tsh", "TSH y glucemia", "util", "Normales.", "Causas orgánicas de crisis."),
    study("Imágenes", "cine", "Cinecoronariografía", "riesgoso", "No se hizo.", "Invasiva sin indicación."),
    study("Imágenes", "angiotac-repetida", "Angiotomografía coronaria en cada consulta", "innecesario", "No se pidió.", "Refuerza la conducta de chequeo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("trastorno-panico", "Trastorno de pánico con evitación, con dolor torácico no cardíaco", true, "Crisis recurrentes inesperadas con pico en minutos, miedo a morir, ansiedad anticipatoria y evitación, con evaluaciones cardíacas normales."),
      dx("sca", "Síndrome coronario agudo", false, "ECG y troponinas repetidamente normales en bajo riesgo."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "TSH normal."),
      dx("tsv", "Taquicardia supraventricular", false, "ECG en crisis con taquicardia sinusal."),
      dx("hipocondria", "Trastorno de ansiedad por enfermedad", false, "Hay crisis de pánico definidas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar el mecanismo de los síntomas sin minimizarlos", "clave", "Validar y psicoeducar."),
      mg("tcc", "Terapia cognitivo-conductual", "clave", "Primera línea."),
      mg("isrs", "ISRS (sertralina o escitalopram) empezando con dosis bajas", "clave", "Tratamiento farmacológico de elección."),
      mg("cafe", "Reducir el café", "util", "Desencadenante."),
      mg("respiracion", "Técnicas de respiración", "util", "Manejo de crisis."),
      mg("clonazepam-cronico", "Clonazepam diario sin fecha de suspensión", "riesgoso", "Tolerancia, dependencia y no trata el trastorno."),
      mg("es-nada", "Decirle que no tiene nada", "riesgoso", "Invalida y aumenta las consultas."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno de pánico con evitación y dolor torácico no cardíaco, en un hombre de 41 años con consultas repetidas.",
    pathologies: [
      { name: "Trastorno de pánico", role: "principal", why: "Crisis recurrentes con ansiedad anticipatoria." },
      { name: "Evitación (agorafobia incipiente)", role: "asociada", why: "Deja de usar el subte." },
      { name: "Síndrome coronario agudo", role: "diferencial", why: "Siempre se evalúa con ECG." },
    ],
    reasoning: [
      "Causa: vulnerabilidad biológica y estrés.",
      "Mecanismo: interpretación catastrófica de sensaciones corporales que activa el sistema simpático.",
      "Consecuencia: crisis, miedo a la próxima y evitación.",
    ],
    epidemiology:
      "El trastorno de pánico afecta al 2–3 % de la población por año, más a mujeres jóvenes, aunque los varones consultan más por dolor de pecho. Hasta un cuarto de las consultas por dolor torácico en guardia con estudios normales corresponde a pánico.",
    management: [
      "Descartar causas orgánicas con criterio.",
      "Psicoeducación.",
      "TCC e ISRS.",
      "Benzodiacepinas solo por corto tiempo.",
    ],
    sources: ["Asociación de Psiquiatras Argentinos — Trastornos de ansiedad.", "NICE — Generalised anxiety disorder and panic disorder in adults (CG113)."],
    pearls: ["Pico en 10 minutos.", "Miedo a la próxima crisis.", "ISRS + TCC."],
    pitfalls: ["Decirle que no tiene nada.", "Clonazepam crónico."],
    tribunal: [
      qa("¿Qué diferencia una crisis de pánico del trastorno de pánico?", "El trastorno requiere crisis recurrentes inesperadas seguidas de un mes de preocupación por nuevas crisis o cambios de conducta."),
      qa("¿Por qué aparecen hormigueos en manos y boca?", "Por la hiperventilación, que baja el CO₂ y el calcio iónico."),
      qa("¿Por qué los ISRS se empiezan en dosis bajas en el pánico?", "Porque al inicio pueden aumentar la ansiedad y provocar abandono."),
    ],
  },
};
