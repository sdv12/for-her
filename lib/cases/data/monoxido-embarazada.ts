import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const monoxidoEmbarazada: ClinicalCase = {
  id: "monoxido-embarazada",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Embarazo de 24 semanas. Julio. Calefacción con un calefactor sin salida al exterior. Su pareja también tiene cefalea." },
  frequency: "frecuente",
  intro: "“Me duele mucho la cabeza, estoy mareada y vomité. Mi pareja tiene lo mismo.”",
  vitals: { TA: "112/70 mmHg", FC: "106 lpm", FR: "20 rpm", "SatO₂": "98 %", "T°": "36,6 °C" },
  anamnesis: [
    act("convivientes", "¿Alguien más en la casa con síntomas?", "clave", "“Mi pareja, y el perro está decaído.”", "Varios afectados en un mismo ambiente: monóxido."),
    act("calefaccion", "¿Cómo calefaccionan?", "clave", "“Un calefactor viejo sin tiraje.”", "Fuente."),
    act("mejora-fuera", "¿Mejora al salir de casa?", "util", "“Sí, se me pasaba en el trabajo.”", "Típico."),
    act("movimientos", "¿Siente moverse al bebé?", "clave", "“Sí.”", "Bienestar fetal."),
    act("sincope", "¿Se desmayó?", "clave", "“No.”", "Criterio de gravedad."),
    act("nombre", "¿Qué nombre eligieron?", "neutro", "“Mía.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Neurológico", "clave", "Lúcida, sin foco.", "Sin compromiso grave."),
    act("obstetrico", "Latidos fetales", "clave", "160 lpm.", "Taquicardia fetal."),
    act("piel", "Piel", "util", "Normal.", "El color rojo cereza es tardío y raro."),
  ],
  studies: [
    study("Laboratorio", "cohb", "Carboxihemoglobina", "clave", "COHb 18 %.", "Confirma; la saturometría no sirve."),
    study("Electrofisiología", "ecg", "ECG y troponina", "util", "Taquicardia sinusal, troponina normal.", "Daño miocárdico."),
    study("Otros", "monitoreo", "Monitoreo fetal", "clave", "Taquicardia fetal que mejora con oxígeno.", "Bienestar fetal."),
    study("Otros", "saturometro", "Confiar en la saturometría normal", "riesgoso", "No se hizo.", "El oxímetro no distingue la COHb."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("co-embarazo", "Intoxicación por monóxido de carbono en embarazada de 24 semanas", true, "Cefalea, mareos y vómitos en invierno con calefactor sin tiraje, convivientes afectados y COHb del 18 %."),
      dx("preeclampsia", "Preeclampsia", false, "Presión normal y 24 semanas con varios convivientes afectados."),
      dx("migrana", "Migraña", false, "Convivientes y COHb alta."),
      dx("gastroenteritis", "Gastroenteritis", false, "COHb alta."),
      dx("anemia", "Anemia", false, "Explicación ambiental."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("o2-100", "Oxígeno al 100 % con máscara con reservorio", "clave", "Acorta la vida media de la COHb."),
      mg("camara", "Oxigenoterapia hiperbárica: indicada en embarazadas con COHb mayor de 15 % o sufrimiento fetal", "clave", "La Hb fetal retiene más CO."),
      mg("familia", "Evaluar a la pareja y alejarlos de la fuente", "clave", "Exposición común."),
      mg("notificar", "Notificar y revisión del artefacto por gasista matriculado", "util", "Prevención."),
      mg("o2-mas-largo", "Oxígeno más tiempo que en no embarazadas", "util", "Eliminación fetal más lenta."),
      mg("alta-sin-o2", "Alta con analgésicos", "riesgoso", "Riesgo fetal y secuelas neurológicas."),
      mg("volver-casa", "Volver a casa esa noche", "riesgoso", "Reexposición."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación por monóxido de carbono con COHb del 18 % en una embarazada de 24 semanas, por calefactor sin tiraje.",
    pathologies: [
      { name: "Intoxicación por CO", role: "principal", why: "Hipoxia tisular." },
      { name: "Embarazo", role: "asociada", why: "El feto es más vulnerable." },
      { name: "Preeclampsia, migraña", role: "diferencial", why: "Otras cefaleas del embarazo." },
    ],
    reasoning: [
      "Causa: combustión incompleta en un ambiente sin ventilación.",
      "Mecanismo: el CO se une a la hemoglobina 240 veces más que el oxígeno y la hemoglobina fetal lo retiene más.",
      "Consecuencia: hipoxia materna y fetal, con riesgo de muerte fetal y secuelas.",
    ],
    epidemiology:
      "En Argentina el CO causa muertes evitables cada invierno, sobre todo con calefactores y braseros sin ventilación. Las embarazadas son un grupo prioritario porque el feto tiene niveles más altos y prolongados de COHb.",
    management: [
      "Sospechar con varios afectados.",
      "COHb.",
      "Oxígeno al 100 % y evaluar cámara hiperbárica.",
      "Prevención.",
    ],
    sources: ["Ministerio de Salud de la Nación — Intoxicación por monóxido de carbono.", "Undersea and Hyperbaric Medical Society — Indications for hyperbaric oxygen therapy."],
    pearls: ["Toda la familia con cefalea en invierno = CO.", "El saturómetro miente.", "Embarazada: umbral bajo para hiperbárica."],
    pitfalls: ["Confiar en el saturómetro.", "Volver a la casa."],
    tribunal: [
      qa("¿Por qué el saturómetro no sirve en la intoxicación por CO?", "Porque no distingue la carboxihemoglobina de la oxihemoglobina y muestra valores normales."),
      qa("¿Por qué el feto es más vulnerable al CO?", "Porque la hemoglobina fetal tiene mayor afinidad y elimina el CO más lento, con niveles hasta 10–15 % más altos."),
      qa("¿Cuál es la vida media de la COHb según el tratamiento?", "Unos 300 minutos en aire ambiente, 90 con oxígeno al 100 % y 20–30 con oxígeno hiperbárico."),
    ],
  },
};
