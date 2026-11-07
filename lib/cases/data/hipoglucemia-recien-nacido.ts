import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoglucemiaRecienNacido: ClinicalCase = {
  id: "hipoglucemia-recien-nacido-madre-diabetica",
  level: 2,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 1, ageUnit: "días", sex: "F", context: "Nació a las 38 semanas, 4.300 g. Madre con diabetes gestacional mal controlada." },
  frequency: "frecuente",
  intro: "Enfermería te llama a las 3 horas de vida: “Está temblorosa, no quiere tomar la teta y ahora le cuesta despertarse”.",
  vitals: { FC: "158 lpm", FR: "62 rpm", "T°": "36,3 °C", "SatO₂": "96 %", Peso: "4,3 kg", Glucemia: "28 mg/dl" },
  anamnesis: [
    act("madre", "¿Cómo fue el control de la diabetes materna?", "clave", "“Mal, con insulina irregular.”", "El feto queda con hiperinsulinismo."),
    act("alimentacion", "¿Ya mamó? ¿Cuánto?", "clave", "“Muy poco.”", "Falta de aporte."),
    act("sintomas", "¿Temblores, apneas, convulsiones?", "clave", "“Temblores y una pausa.”", "Síntomas neurológicos: tratar ya."),
    act("parto", "¿Hipoxia, parto difícil?", "util", "“Hombros difíciles.”", "Macrosomía."),
    act("fiebre", "¿Fiebre materna o rotura prolongada?", "util", "“No.”", "Sepsis."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Emma.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Tono, reflejos, conciencia", "clave", "Hipotónica, letárgica, temblor fino.", "Neuroglucopenia."),
    act("macrosomia", "Peso, aspecto y corazón", "clave", "Macrosómica, facies pletórica, soplo leve.", "Hijo de madre diabética."),
    act("clavicula", "Clavículas y plexo braquial", "util", "Clavícula derecha con crepitación.", "Lesión por distocia."),
  ],
  studies: [
    study("Laboratorio", "glucosa", "Glucemia confirmatoria sin demorar el tratamiento", "clave", "26 mg/dl.", "Confirma."),
    study("Laboratorio", "lab", "Calcio, magnesio, hematocrito, bilirrubina", "clave", "Calcio bajo, Hto 68 %.", "Alteraciones asociadas."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Hipertrofia septal.", "Típica, transitoria."),
    study("Otros", "esperar", "Esperar el laboratorio central antes de tratar", "riesgoso", "No se realizó.", "El daño neurológico no espera."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipoglucemia", "Hipoglucemia neonatal sintomática en hijo de madre diabética", true, "Macrosomía, temblor, letargia, glucemia de 28 mg/dl."),
      dx("sepsis", "Sepsis neonatal", false, "Debe considerarse, pero la glucosa y el contexto explican."),
      dx("errores", "Error congénito del metabolismo", false, "Hay una causa clara."),
      dx("hipoxia", "Encefalopatía hipóxica", false, "Sin depresión al nacer."),
      dx("hipocalcemia", "Hipocalcemia aislada", false, "Se asocia, pero no explica la glucosa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dextrosa", "Bolo de dextrosa al 10 % (2 ml/kg) y luego infusión", "clave", "Síntomas: tratamiento EV inmediato."),
      mg("alimentar", "Mantener lactancia temprana y frecuente", "clave", "Sostiene la glucemia."),
      mg("controles", "Controles seriados hasta estabilizar", "clave", "Evita recaídas."),
      mg("asociadas", "Tratar policitemia, calcio e ictericia según corresponda", "util", "Complicaciones."),
      mg("agua", "Dar agua con azúcar por boca y volver a controlar", "riesgoso", "Aporte insuficiente en una neonata letárgica."),
      mg("hiperconcentrada", "Dextrosa al 50 % en bolo", "riesgoso", "Riesgo de hemorragia y rebote."),
    ],
  },
  debrief: {
    diagnosis: "Hipoglucemia neonatal sintomática en recién nacida macrosómica, hija de madre con diabetes gestacional mal controlada.",
    pathologies: [
      { name: "Hipoglucemia neonatal", role: "principal", why: "Hiperinsulinismo transitorio." },
      { name: "Macrosomía, policitemia, hipocalcemia", role: "asociada", why: "Complicaciones." },
      { name: "Sepsis, errores congénitos, hipoxia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hiperglucemia materna que atraviesa la placenta.",
      "Mecanismo: el feto produce insulina en exceso; al cortar el cordón se mantiene el exceso.",
      "Consecuencia: hipoglucemia, daño neurológico si no se corrige.",
    ],
    epidemiology:
      "Afecta a una proporción importante de hijos de madres diabéticas, grandes, pequeños y prematuros. Es una de las causas tratables de daño cerebral neonatal. Se aconseja vigilar la glucemia en estos grupos en las primeras horas.",
    management: [
      "Tamizaje en grupos de riesgo.",
      "Dextrosa si tiene síntomas.",
      "Lactancia precoz.",
      "Buscar y tratar asociadas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones de hipoglucemia neonatal.", "Ministerio de Salud de la Nación — Guía del recién nacido sano."],
    pearls: ["Hijo de madre diabética: vigilá glucemia.", "Síntomas: dextrosa EV.", "Dextrosa al 10 %, no al 50 %."],
    pitfalls: ["Esperar el laboratorio.", "Olvidar las otras complicaciones."],
    tribunal: [
      qa("¿Qué complicaciones tiene el hijo de madre diabética?", "Macrosomía, distocia, hipoglucemia, policitemia, hipocalcemia, ictericia, distrés respiratorio, malformaciones si es pregestacional."),
      qa("¿Qué define hipoglucemia neonatal?", "Generalmente menos de 45 mg/dl, con umbrales según horas de vida y síntomas."),
      qa("¿Por qué hay retraso de madurez pulmonar?", "La hiperinsulinemia reduce la producción de surfactante."),
    ],
  },
};
