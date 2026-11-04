import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const deshidratacionGraveLactante: ClinicalCase = {
  id: "deshidratacion-grave-lactante-shock",
  level: 3,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "meses", sex: "M", context: "Enero, ola de calor. Viven en un asentamiento sin agua de red. No recibió la vacuna contra rotavirus." },
  frequency: "frecuente",
  intro: "“Desde hace dos días tiene muchas cacas líquidas y vómitos. Hoy casi no se despierta y no moja los pañales.” (relata la madre)",
  vitals: { TA: "60/30 mmHg", FC: "190 lpm", FR: "48 rpm", "T°": "38,2 °C", Peso: "7 kg", Glucemia: "58 mg/dl" },
  anamnesis: [
    act("perdidas", "¿Cuántas deposiciones y vómitos por día?", "clave", "“Más de diez cacas y vomita todo.”", "Pérdidas importantes con intolerancia oral."),
    act("diuresis", "¿Cuándo mojó el último pañal?", "clave", "“Hace más de 12 horas.”", "Oliguria grave."),
    act("peso-previo", "¿Cuánto pesaba en el último control?", "clave", "“7,8 kilos hace dos semanas.”", "Pérdida de más del 10 %: deshidratación grave."),
    act("liquidos", "¿Qué le dieron de tomar?", "util", "“Agua y gaseosa.”", "Líquidos inadecuados."),
    act("vacuna", "¿Recibió la vacuna contra el rotavirus?", "util", "“No llegamos a ponerla.”", "Riesgo de diarrea grave por rotavirus."),
    act("hermanos", "¿Tiene hermanos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("conciencia", "Estado de conciencia", "clave", "Letárgico, responde poco.", "Signo de deshidratación grave y shock."),
    act("perfusion", "Perfusión y pulsos", "clave", "Pulsos débiles, extremidades frías, relleno capilar de 5 segundos.", "Shock hipovolémico."),
    act("signos", "Ojos, fontanela, pliegue, lágrimas", "clave", "Ojos muy hundidos, fontanela deprimida, pliegue que se borra muy lento, sin lágrimas.", "Deshidratación grave."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar", "clave", "58 mg/dl.", "Hipoglucemia a corregir."),
    study("Laboratorio", "lab", "Ionograma, gases, urea, creatinina", "clave", "Na 136, K 3,1, pH 7,18, bicarbonato 9, creatinina 0,9.", "Deshidratación isonatrémica con acidosis metabólica e insuficiencia renal prerrenal."),
    study("Microbiología", "rotavirus", "Antígeno de rotavirus en heces", "util", "Positivo.", "Etiología y vigilancia."),
    study("Imágenes", "eco", "Ecografía abdominal antes de hidratar", "riesgoso", "No se realizó.", "Retrasa la reanimación del shock."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shock", "Diarrea aguda por rotavirus con deshidratación grave y shock hipovolémico, acidosis e hipoglucemia", true, "Pérdida de más del 10 % del peso, letargo, pulsos débiles, relleno lento, oliguria, acidosis y rotavirus positivo."),
      dx("moderada", "Deshidratación con algunos signos", false, "Hay letargo y shock: es grave."),
      dx("sepsis", "Sepsis bacteriana", false, "El cuadro se explica por las pérdidas; igual se reevalúa si no responde."),
      dx("suh", "Síndrome urémico hemolítico", false, "Sin sangre en heces, anemia ni plaquetopenia."),
      dx("hipernatremica", "Deshidratación hipernatrémica", false, "El sodio es normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("plan-c", "Plan C: solución fisiológica o Ringer 20 ml/kg en bolo rápido, repetir según respuesta (hasta 60 ml/kg) por vía EV o intraósea", "clave", "Revierte el shock."),
      mg("glucosa", "Corregir la hipoglucemia con dextrosa", "clave", "Hipoglucemia sintomática."),
      mg("reevaluar", "Reevaluar después de cada bolo y completar la reposición; pasar a sales cuando pueda beber", "clave", "Ajusta el tratamiento."),
      mg("zinc", "Zinc oral al recuperarse y continuar la lactancia o alimentación", "util", "Reduce la duración y las recurrencias."),
      mg("sro-solo", "Sales de rehidratación por boca como único tratamiento", "riesgoso", "En shock y letárgico no es segura ni suficiente."),
      mg("antidiarreicos", "Antidiarreicos", "riesgoso", "Contraindicados en lactantes."),
    ],
  },
  debrief: {
    diagnosis: "Diarrea aguda por rotavirus con deshidratación grave (más del 10 %), shock hipovolémico, acidosis metabólica, hipoglucemia e insuficiencia renal prerrenal, en lactante de 8 meses no vacunado.",
    pathologies: [
      { name: "Deshidratación grave con shock", role: "principal", why: "Pérdida de volumen con hipoperfusión." },
      { name: "Diarrea por rotavirus", role: "asociada", why: "Causa." },
      { name: "Sepsis, SUH", role: "diferencial", why: "Se consideran si no responde." },
    ],
    reasoning: [
      "Causa: rotavirus que daña las vellosidades del intestino delgado, en un lactante sin vacuna.",
      "Mecanismo: diarrea secretora y malabsortiva con vómitos; los lactantes pierden agua rápido por su mayor superficie corporal y dependencia de otros para tomar.",
      "Consecuencia: hipovolemia, acidosis, hipoglucemia, falla renal y muerte si no se repone a tiempo.",
    ],
    epidemiology:
      "La diarrea es una causa importante de internación en menores de 2 años en Argentina, con pico en verano y en hogares sin agua segura. El rotavirus era la principal causa de diarrea grave hasta la inclusión de la vacuna en el Calendario en 2015, que redujo las internaciones; los no vacunados siguen en riesgo.",
    management: [
      "Evaluar el grado de deshidratación.",
      "Shock: bolos de cristaloides con reevaluación (plan C).",
      "Corregir glucemia y electrolitos; pasar a la vía oral apenas se pueda.",
      "Prevención: vacuna contra rotavirus, agua segura, lactancia, lavado de manos.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de diarrea aguda en la infancia.", "Ministerio de Salud de la Nación — Lineamientos de la vacuna contra rotavirus."],
    pearls: ["Letargo + relleno lento = shock: plan C.", "Glucemia siempre.", "Vacuna contra rotavirus."],
    pitfalls: ["Intentar solo la vía oral en un lactante en shock.", "Dar gaseosas o antidiarreicos."],
    tribunal: [
      qa("¿Cuándo se da la vacuna contra rotavirus?", "Es oral, en dos dosis a los 2 y 4 meses; la primera debe darse antes de las 14 semanas y 6 días de vida y la segunda antes de los 6 meses, por el riesgo de invaginación si se da tarde."),
      qa("¿Qué hacer si no se consigue una vía venosa en un niño en shock?", "Colocar una vía intraósea (tibia proximal) en menos de 90 segundos, por la que se pueden pasar fluidos y fármacos."),
      qa("¿Por qué se da zinc en la diarrea?", "Porque reduce la duración y la gravedad de la diarrea y las recurrencias en los meses siguientes, sobre todo en niños con déficit nutricional; la OMS lo recomienda por 10–14 días."),
    ],
  },
};
