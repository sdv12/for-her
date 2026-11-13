import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vihProfilaxisPostexposicion: ClinicalCase = {
  id: "vih-profilaxis-postexposicion",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Enfermera de terapia intensiva. Hace 40 minutos se pinchó con una aguja hueca al sacar sangre a un paciente con VIH." },
  frequency: "frecuente",
  intro: "“Me pinché con la aguja después de sacarle sangre a un paciente con VIH. Sangró un poco.”",
  vitals: { TA: "118/72 mmHg", FC: "96 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("tipo", "¿Qué aguja y qué tan profundo?", "clave", "“Aguja hueca con sangre, profundo en el dedo.”", "Exposición de alto riesgo."),
    act("fuente", "¿Qué sabés del paciente fuente?", "clave", "“VIH con carga viral detectable, abandonó el tratamiento.”", "Riesgo mayor."),
    act("hora", "¿Cuándo fue?", "clave", "“Hace 40 minutos.”", "Ventana ideal: menos de 2 horas."),
    act("vacuna-hb", "¿Estás vacunada contra hepatitis B?", "util", "“Sí, con anticuerpos positivos.”", "Protegida."),
    act("embarazo", "¿Podés estar embarazada?", "util", "“No, uso implante.”", "Elección de fármacos."),
    act("turno", "¿Qué turno hacés?", "neutro", "“Noche.”", "No orienta."),
  ],
  exam: [
    act("herida", "Herida", "clave", "Punción en pulpejo del índice.", "Exposición percutánea."),
    act("lavado", "¿Se lavó?", "clave", "“Con agua y jabón.”", "Correcto."),
    act("general", "Examen general", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Laboratorio", "basal", "Serologías basales: VIH, hepatitis B y C", "clave", "Negativas; anti-HBs protector.", "Línea de base."),
    study("Laboratorio", "fuente-lab", "Serologías y carga viral del paciente fuente si se puede", "clave", "VIH con carga detectable; VHC negativo.", "Define riesgo."),
    study("Laboratorio", "lab", "Función renal y hepatograma", "util", "Normales.", "Antes de los antirretrovirales."),
    study("Otros", "exprimir", "Exprimir o cauterizar la herida con lavandina", "riesgoso", "No se hizo.", "Daña el tejido sin beneficio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pep", "Exposición ocupacional percutánea de alto riesgo a VIH, con indicación de profilaxis postexposición", true, "Aguja hueca con sangre, profunda, fuente con carga viral detectable y consulta temprana."),
      dx("sin-riesgo", "Exposición sin riesgo", false, "Aguja hueca con sangre de fuente con VIH."),
      dx("vih-agudo", "Infección aguda por VIH", false, "Serología basal negativa y sin síntomas."),
      dx("hepatitis-b", "Exposición de riesgo para hepatitis B", false, "Está protegida por la vacuna."),
      dx("pep-tardia", "Exposición fuera de ventana", false, "Consulta a los 40 minutos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("pep", "Profilaxis con tres antirretrovirales (tenofovir, emtricitabina y dolutegravir) por 28 días", "clave", "Iniciar cuanto antes, idealmente antes de 2 horas."),
      mg("seguimiento", "Serologías de control a las 6 semanas y 3 meses", "clave", "Detectar seroconversión."),
      mg("art", "Denunciar a la ART como accidente laboral", "clave", "Derecho y registro."),
      mg("preservativo", "Preservativo y no donar sangre hasta el alta del seguimiento", "util", "Prevención secundaria."),
      mg("esperar-resultado", "Esperar el resultado de la fuente para empezar", "riesgoso", "Cada hora reduce la eficacia."),
      mg("siete-dias", "Profilaxis por 7 días", "riesgoso", "Duración insuficiente."),
    ],
  },
  debrief: {
    diagnosis: "Exposición ocupacional percutánea de alto riesgo a VIH en enfermera de 26 años, con indicación de profilaxis postexposición.",
    pathologies: [
      { name: "Exposición ocupacional a VIH", role: "principal", why: "Accidente cortopunzante." },
      { name: "Riesgo de hepatitis B y C", role: "asociada", why: "Otras exposiciones a evaluar." },
      { name: "Sin riesgo, fuera de ventana", role: "diferencial", why: "Otras situaciones." },
    ],
    reasoning: [
      "Causa: punción con aguja hueca con sangre de una fuente con viremia.",
      "Mecanismo: inoculación de virus que, sin profilaxis, puede establecer infección en horas o días.",
      "Consecuencia: riesgo bajo pero real de seroconversión, que la profilaxis reduce mucho.",
    ],
    epidemiology:
      "El riesgo de transmisión de VIH por pinchazo es de alrededor de 0,3 %, mayor con aguja hueca, punción profunda y fuente con carga alta. La vacunación contra hepatitis B del personal de salud es obligatoria. Muchos accidentes no se denuncian.",
    management: [
      "Lavar.",
      "Evaluar riesgo.",
      "Profilaxis temprana.",
      "Seguimiento y denuncia.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para la profilaxis postexposición.", "CDC — Updated Guidelines for Management of Occupational Exposures to HIV."],
    pearls: ["Antes de 2 horas, hasta 72.", "28 días.", "No esperar a la fuente."],
    pitfalls: ["Esperar resultados.", "No denunciar."],
    tribunal: [
      qa("¿Hasta cuándo se puede iniciar la profilaxis?", "Hasta las 72 horas, idealmente en las primeras 2 horas."),
      qa("¿Qué riesgo tiene la hepatitis B en un no vacunado?", "Mucho mayor que el VIH, hasta 30 % si la fuente es HBeAg positiva."),
      qa("¿Qué es la PrEP?", "Profilaxis preexposición con antirretrovirales en personas con riesgo sostenido."),
    ],
  },
};
