import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const coAdultoMayor: ClinicalCase = {
  id: "monoxido-carbono-adulto-mayor",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "M", context: "Coronario, vive solo. Calefón en el baño sin ventilación. Julio." },
  frequency: "frecuente",
  intro: "“Lo encontramos confundido en el baño, decía que le dolía la cabeza y el pecho. El gato estaba muerto en el pasillo.” (relata la vecina)",
  vitals: { TA: "148/88 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "98 %", Glasgow: "13/15" },
  anamnesis: [
    act("ambiente", "¿Qué calefacción tiene? ¿Dónde está el calefón?", "clave", "“Calefón en el baño y estufa a gas sin salida.”", "Combustión incompleta en ambientes cerrados: fuente de monóxido."),
    act("animales", "¿Otras personas o animales en la casa con síntomas?", "clave", "“El gato estaba muerto.”", "Muy sugestivo de fuente ambiental."),
    act("dolor", "¿Cómo es el dolor de pecho?", "clave", "“Opresivo, como cuando tuve el infarto.”", "Isquemia miocárdica por monóxido en un coronario."),
    act("sintomas", "¿Dolor de cabeza, náuseas, mareos?", "util", "“Dolor de cabeza desde ayer, como todos en invierno.”", "Síntomas inespecíficos que confunden con gripe."),
    act("tiempo", "¿Cuánto tiempo estuvo en el baño?", "util", "“No sabemos, horas.”", "Exposición prolongada."),
    act("gato", "¿Cómo se llamaba el gato?", "neutro", "“Pancho.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Confuso, sin foco, ataxia.", "Compromiso neurológico: intoxicación grave."),
    act("piel", "Piel", "util", "Normal (el color rojo cereza es raro y tardío).", "No descarta."),
    act("cardio", "Auscultación cardíaca", "util", "Taquicardia, sin soplos.", "Evaluar isquemia."),
  ],
  studies: [
    study("Laboratorio", "cohb", "Carboxihemoglobina (cooximetría)", "clave", "COHb 26 %.", "Confirma; la oximetría de pulso común da valores falsamente normales."),
    study("Electrofisiología", "ecg", "Electrocardiograma y troponina", "clave", "Infradesnivel del ST lateral, troponina elevada.", "Daño miocárdico por monóxido: criterio de gravedad."),
    study("Laboratorio", "lab", "Gases, lactato, CPK", "util", "Acidosis láctica leve.", "Hipoxia tisular."),
    study("Otros", "oximetria-sola", "Confiar en la saturación de 98 % para descartar", "riesgoso", "No se realizó.", "El oxímetro no distingue la carboxihemoglobina de la oxihemoglobina."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("co-grave", "Intoxicación grave por monóxido de carbono con compromiso neurológico e isquemia miocárdica", true, "Calefón sin ventilación, animal muerto, cefalea y confusión, COHb 26 % y troponina elevada con cambios del ST."),
      dx("iam", "IAM primario", false, "La isquemia es secundaria a la hipoxia por monóxido."),
      dx("acv", "ACV", false, "Sin foco; la exposición y la COHb explican el cuadro."),
      dx("gripe", "Gripe", false, "La COHb alta confirma la intoxicación."),
      dx("delirium", "Delirium por otra causa", false, "La causa es la intoxicación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("o2", "Oxígeno al 100 % con máscara de reservorio de inmediato", "clave", "Reduce la vida media de la COHb de 4–6 h a 60–90 minutos."),
      mg("hiperbarica", "Evaluar cámara hiperbárica (compromiso neurológico, isquemia cardíaca, COHb mayor de 25 %)", "clave", "Puede reducir secuelas neurológicas tardías."),
      mg("cardio", "Monitoreo cardíaco y tratamiento de la isquemia", "clave", "Coronario con troponina alta."),
      mg("notificar", "Notificar, revisar la vivienda y alertar a otros vecinos", "util", "Prevenir nuevos casos."),
      mg("alta", "Alta cuando mejore la cefalea", "riesgoso", "Riesgo de síndrome neurológico tardío y de volver al ambiente tóxico."),
      mg("o2-bajo", "Oxígeno por cánula a 2 litros", "riesgoso", "Insuficiente."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación grave por monóxido de carbono (COHb 26 %) por calefón sin ventilación, con compromiso neurológico e isquemia miocárdica, en varón coronario de 78 años que vive solo.",
    pathologies: [
      { name: "Intoxicación por monóxido de carbono", role: "principal", why: "Exposición con COHb alta." },
      { name: "Isquemia miocárdica", role: "asociada", why: "Hipoxia en un coronario." },
      { name: "IAM primario, ACV, gripe", role: "diferencial", why: "Simuladores." },
    ],
    reasoning: [
      "Causa: combustión incompleta de gas en ambientes sin ventilación.",
      "Mecanismo: el monóxido se une a la hemoglobina con mucha más afinidad que el oxígeno y bloquea la cadena respiratoria mitocondrial.",
      "Consecuencia: hipoxia tisular del cerebro y el corazón; secuelas neurológicas tardías.",
    ],
    epidemiology:
      "La intoxicación por monóxido es una causa frecuente de muerte evitable en Argentina en invierno, con brotes en hogares con calefones, braseros y estufas sin salida. Adultos mayores, embarazadas, niños y personas con cardiopatía son los más vulnerables.",
    management: [
      "Sospechar ante cefalea y síntomas en varios convivientes en invierno.",
      "Oxígeno al 100 % de inmediato; cooximetría.",
      "Cámara hiperbárica en casos graves.",
      "Prevención: ventilación, revisión de artefactos, detectores.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de prevención, diagnóstico y tratamiento de la intoxicación por monóxido de carbono.", "Centro Nacional de Intoxicaciones (Hospital Posadas)."],
    pearls: ["Saturación normal no descarta.", "Oxígeno al 100 %.", "Coronario + CO = isquemia."],
    pitfalls: ["Confiar en el oxímetro.", "Dar el alta sin revisar la vivienda."],
    tribunal: [
      qa("¿Cuándo se indica cámara hiperbárica?", "Ante pérdida de conocimiento, síntomas neurológicos, isquemia cardíaca, COHb mayor de 25 % (mayor de 15–20 % en embarazadas), acidosis grave o persistencia de síntomas con oxígeno."),
      qa("¿Qué es el síndrome neurológico tardío?", "Alteraciones cognitivas, de la conducta, parkinsonismo o déficit que aparecen días a semanas después de una intoxicación por monóxido, tras una aparente recuperación."),
      qa("¿Cómo se previene la intoxicación por monóxido?", "Revisar anualmente calefones y estufas por gasistas matriculados, asegurar ventilación y salida de gases, no usar braseros ni hornos para calefaccionar en ambientes cerrados y considerar detectores."),
    ],
  },
};
