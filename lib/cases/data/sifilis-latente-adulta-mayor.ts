import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sifilisLatenteAdultaMayor: ClinicalCase = {
  id: "sifilis-latente-tardia-adulta-mayor",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 71, ageUnit: "años", sex: "F", context: "Viuda, tiene una pareja nueva hace 2 años. Prequirúrgico de cataratas." },
  frequency: "frecuente",
  intro: "“En los análisis para la operación me salió algo de sífilis. No entiendo, nunca tuve nada.”",
  vitals: { TA: "132/80 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("pareja", "¿Tuvo parejas nuevas en los últimos años? ¿Usa preservativo?", "clave", "“Una pareja hace 2 años, sin preservativo.”", "Exposición."),
    act("lesiones", "¿Tuvo heridas genitales o manchas en el cuerpo?", "clave", "“No que recuerde.”", "Sin fases tempranas recordadas."),
    act("neuro", "¿Problemas de visión, memoria, oído o equilibrio?", "clave", "“Solo la catarata.”", "Neurosífilis u ocular."),
    act("previos", "¿Algún análisis anterior?", "util", "“Nunca.”", "Tiempo desconocido."),
    act("alergia", "¿Alérgica a la penicilina?", "util", "“No.”", "Tratamiento."),
    act("hobby", "¿Qué hace?", "neutro", "“Taller de cerámica.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Sin lesiones.", "Fase latente."),
    act("neuro-ex", "Examen neurológico y pupilas", "clave", "Normal.", "Sin neurosífilis clínica."),
    act("cardio", "Auscultación cardíaca", "util", "Sin soplos.", "Sin aortitis."),
  ],
  studies: [
    study("Laboratorio", "serologia", "VDRL cuantitativa y prueba treponémica", "clave", "VDRL 1/8; FTA-abs positiva.", "Sífilis activa."),
    study("Laboratorio", "its", "VIH y hepatitis B", "clave", "Negativos.", "Coinfecciones."),
    study("Otros", "oftalmo", "Examen oftalmológico", "util", "Catarata sin uveítis.", "Sin sífilis ocular."),
    study("Laboratorio", "pl", "Punción lumbar de rutina sin síntomas", "innecesario", "No se realizó.", "No indicada sin síntomas neurológicos ni oculares."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("latente-tardia", "Sífilis latente tardía (o de duración desconocida) en adulta mayor", true, "VDRL y treponémica positivas sin síntomas, con exposición de más de un año."),
      dx("falso-positivo", "Falso positivo de VDRL", false, "La treponémica confirma."),
      dx("neurosifilis", "Neurosífilis", false, "Sin síntomas neurológicos."),
      dx("secundaria", "Sífilis secundaria", false, "Sin lesiones."),
      dx("cicatriz", "Sífilis tratada (cicatriz serológica)", false, "Nunca fue tratada y VDRL 1/8."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina benzatínica 2,4 millones semanal por 3 semanas", "clave", "Latente tardía o desconocida."),
      mg("pareja", "Estudiar y tratar a la pareja", "clave", "Transmisión."),
      mg("control", "VDRL a los 6, 12 y 24 meses", "clave", "Respuesta."),
      mg("consejeria", "Consejería sobre ITS sin prejuicios por la edad", "util", "Salud sexual."),
      mg("dosis-unica", "Una sola dosis", "riesgoso", "Insuficiente en latente tardía."),
      mg("no-tratar", "No tratar porque es mayor", "riesgoso", "Riesgo de sífilis terciaria."),
    ],
  },
  debrief: {
    diagnosis: "Sífilis latente tardía en mujer de 71 años detectada en estudios prequirúrgicos.",
    pathologies: [
      { name: "Sífilis latente tardía", role: "principal", why: "Infección sin síntomas de más de un año." },
      { name: "Salud sexual en adultos mayores", role: "asociada", why: "Grupo poco pesquisado." },
      { name: "Falso positivo, neurosífilis", role: "diferencial", why: "Interpretación serológica." },
    ],
    reasoning: [
      "Causa: Treponema pallidum por contacto sexual.",
      "Mecanismo: las fases tempranas pasaron inadvertidas y el treponema persiste.",
      "Consecuencia: riesgo de sífilis terciaria y transmisión.",
    ],
    epidemiology:
      "La sífilis aumentó en Argentina en todas las edades. Los adultos mayores con parejas nuevas rara vez usan preservativo y casi no se los pesquisa. El prequirúrgico es una oportunidad de diagnóstico.",
    management: [
      "No treponémica más treponémica.",
      "Estadificar.",
      "Penicilina x3.",
      "Pareja y control.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de sífilis.", "CDC — Sexually Transmitted Infections Treatment Guidelines: Syphilis."],
    pearls: ["La sexualidad no se jubila.", "Duración desconocida: 3 dosis.", "Tratar a la pareja."],
    pitfalls: ["Una dosis.", "Prejuicios por la edad."],
    tribunal: [
      qa("¿Qué diferencia hay entre latente temprana y tardía?", "Temprana: menos de un año de infección; tardía o desconocida: más de un año."),
      qa("¿Qué se considera respuesta adecuada?", "Caída de cuatro veces (dos diluciones) de la VDRL en 12 a 24 meses."),
      qa("¿Qué es la reacción de Jarisch-Herxheimer?", "Fiebre y malestar en las primeras 24 horas del tratamiento por liberación de antígenos treponémicos."),
    ],
  },
};
