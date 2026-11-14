import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const muerteFetal: ClinicalCase = {
  id: "muerte-fetal-intrauterina",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Embarazo de 34 semanas. Fumadora. Controles irregulares. Hipertensión en el último control." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer no siento que el bebé se mueva.”",
  vitals: { TA: "148/96 mmHg", FC: "86 lpm", FR: "16 rpm", "T°": "36,7 °C" },
  anamnesis: [
    act("movimientos", "¿Desde cuándo no lo sentís?", "clave", "“Desde ayer a la mañana.”", "Disminución de movimientos."),
    act("sangrado", "¿Sangrado, dolor o contracciones?", "clave", "“No.”", "Desprendimiento."),
    act("presion", "¿Te dijeron que tenías presión alta?", "clave", "“En el último control, no volví.”", "Preeclampsia."),
    act("fiebre", "¿Fiebre o infecciones?", "util", "“No.”", "Infección."),
    act("tabaco", "¿Cuánto fumás?", "util", "“Diez por día.”", "Factor de riesgo."),
    act("hijos", "¿Otros hijos?", "neutro", "“Uno de 5.”", "No orienta."),
  ],
  exam: [
    act("lcf", "Latidos fetales", "clave", "No se auscultan.", "Sospecha de muerte fetal."),
    act("utero", "Útero", "clave", "Blando, sin hipertonía.", "Sin desprendimiento evidente."),
    act("edemas", "Edemas y reflejos", "util", "Edema de manos, reflejos normales.", "Preeclampsia."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía obstétrica", "clave", "Ausencia de actividad cardíaca fetal; feto pequeño para la edad.", "Confirma muerte fetal."),
    study("Laboratorio", "preeclampsia", "Proteinuria, plaquetas, transaminasas, coagulograma y fibrinógeno", "clave", "Proteinuria positiva; fibrinógeno normal.", "Preeclampsia; sin coagulopatía."),
    study("Laboratorio", "causas", "Serologías (sífilis, toxoplasma, parvovirus), Kleihauer-Betke, anticuerpos antifosfolípidos", "util", "VDRL negativa; antifosfolípidos pendientes.", "Buscar causa."),
    study("Otros", "cesarea-urgente", "Cesárea inmediata de rutina", "riesgoso", "No se indicó.", "Se prefiere vía vaginal si no hay contraindicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("obito", "Muerte fetal intrauterina a las 34 semanas, asociada a preeclampsia y restricción de crecimiento", true, "Ausencia de actividad cardíaca en la ecografía, hipertensión con proteinuria y feto pequeño."),
      dx("desprendimiento", "Desprendimiento de placenta", false, "Sin dolor, sangrado ni hipertonía."),
      dx("movimientos-normales", "Disminución percibida con feto vivo", false, "Ecografía sin latido."),
      dx("cid", "CID", false, "Coagulación normal."),
      dx("hellp", "HELLP", false, "Plaquetas y transaminasas normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comunicar", "Comunicar con empatía, en un lugar privado y con acompañante", "clave", "Duelo perinatal."),
      mg("induccion", "Inducción del parto vaginal con misoprostol", "clave", "Vía preferida."),
      mg("presion", "Control de la presión y sulfato de magnesio si hay criterios de gravedad", "clave", "Preeclampsia."),
      mg("estudio", "Autopsia, estudio placentario y seguimiento del duelo", "util", "Causa y prevención."),
      mg("esperar-sin-plan", "Enviarla a casa a esperar sin plan", "riesgoso", "Riesgo de coagulopatía y preeclampsia grave."),
      mg("culpa", "Atribuirle la culpa por el tabaco", "riesgoso", "Daño emocional."),
    ],
  },
  debrief: {
    diagnosis: "Muerte fetal intrauterina a las 34 semanas, asociada a preeclampsia y restricción de crecimiento, en mujer fumadora de 34 años.",
    pathologies: [
      { name: "Muerte fetal intrauterina", role: "principal", why: "Pérdida después de las 20 semanas." },
      { name: "Preeclampsia y restricción", role: "asociada", why: "Causas probables." },
      { name: "Desprendimiento, infección", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: insuficiencia placentaria por preeclampsia y tabaco.",
      "Mecanismo: hipoxia fetal crónica.",
      "Consecuencia: muerte fetal y riesgo materno de coagulopatía si se retiene.",
    ],
    epidemiology:
      "La hipertensión, la restricción de crecimiento, el tabaco y las infecciones son causas frecuentes. Una parte queda sin explicación. La consulta por disminución de movimientos debe ser inmediata.",
    management: [
      "Confirmar con ecografía.",
      "Comunicar.",
      "Inducción.",
      "Buscar causa y acompañar el duelo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de la muerte perinatal.", "RCOG — Late Intrauterine Fetal Death and Stillbirth Guideline."],
    pearls: ["Movimientos menos: consultar ya.", "Vía vaginal preferida.", "Acompañar el duelo."],
    pitfalls: ["Comunicar mal.", "No buscar la causa."],
    tribunal: [
      qa("¿Qué riesgo tiene retener un feto muerto por semanas?", "Coagulopatía por consumo, en general después de 4 semanas."),
      qa("¿Qué estudios se piden para buscar la causa?", "Autopsia, placenta, Kleihauer-Betke, serologías, antifosfolípidos, glucemia y cariotipo."),
      qa("¿Qué cuidados se recomiendan en el duelo?", "Permitir ver y despedir al bebé, recuerdos, y seguimiento psicológico."),
    ],
  },
};
