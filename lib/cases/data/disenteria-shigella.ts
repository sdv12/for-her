import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const disenteriaShigella: ClinicalCase = {
  id: "diarrea-disenterica-shigella",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Febrero. Fue a una colonia de vacaciones con pileta." },
  frequency: "frecuente",
  intro: "“Desde ayer tiene fiebre alta y hace caca muchas veces, poquito, con moco y sangre. Le duele la panza y hace fuerza.” (relata la madre)",
  vitals: { FC: "130 lpm", FR: "26 rpm", "T°": "39,2 °C", Peso: "17 kg" },
  anamnesis: [
    act("heces", "¿Cómo es la caca y cuántas veces?", "clave", "“Doce veces, poquito, con moco y sangre.”", "Disentería: diarrea con sangre y moco, escasa y frecuente."),
    act("pujo", "¿Hace fuerza y le duele al hacer?", "clave", "“Hace fuerza y llora.”", "Pujo y tenesmo: compromiso del colon."),
    act("orina", "¿Cuándo orinó? ¿Está pálido o hinchado?", "clave", "“Orinó hace un rato, normal.”", "Vigilar SUH (más ligado a E. coli productora de Shiga)."),
    act("convulsion", "¿Convulsionó?", "util", "“No.”", "Shigella puede dar convulsiones."),
    act("contactos", "¿Hay otros chicos enfermos en la colonia?", "util", "“Dos compañeros.”", "Brote."),
    act("pileta", "¿Sabe nadar?", "neutro", "“Un poco.”", "No orienta."),
  ],
  exam: [
    act("hidratacion", "Hidratación", "clave", "Mucosas algo secas, ojos normales, bebe con ganas.", "Algunos signos de deshidratación."),
    act("abdomen", "Abdomen", "clave", "Dolor difuso, sin defensa.", "Colitis; sin abdomen quirúrgico."),
    act("palidez", "Palidez, petequias, edemas", "util", "No.", "Sin signos de SUH."),
  ],
  studies: [
    study("Microbiología", "coprocultivo", "Coprocultivo con búsqueda de E. coli productora de Shiga", "clave", "Shigella flexneri, sensible a ceftriaxona y azitromicina.", "La diarrea sanguinolenta en niños requiere coprocultivo."),
    study("Laboratorio", "lab", "Hemograma, función renal y orina (por riesgo de SUH)", "clave", "Plaquetas y creatinina normales.", "Línea de base."),
    study("Imágenes", "eco", "Ecografía abdominal", "innecesario", "No se realizó.", "No aporta en una disentería sin signos quirúrgicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shigella", "Diarrea disentérica por Shigella con algunos signos de deshidratación", true, "Fiebre alta, deposiciones escasas con moco y sangre, pujo y tenesmo, brote en colonia, coprocultivo con Shigella."),
      dx("suh", "Síndrome urémico hemolítico", false, "Sin anemia, plaquetopenia ni falla renal."),
      dx("invaginacion", "Invaginación intestinal", false, "Tiene fiebre alta y diarrea frecuente; la invaginación da dolor cólico y heces en jalea."),
      dx("viral", "Diarrea viral", false, "La viral es acuosa, sin sangre."),
      dx("amebiasis", "Amebiasis", false, "El coprocultivo muestra Shigella."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sro", "Sales de rehidratación oral (plan B) y seguir alimentándolo", "clave", "La hidratación es la base."),
      mg("atb", "Antibiótico en la disentería con fiebre (azitromicina o ceftriaxona según sensibilidad)", "clave", "En Shigella acorta la enfermedad y la transmisión."),
      mg("higiene", "Lavado de manos, no ir a la pileta ni a la colonia hasta resolverse, notificar el brote", "clave", "Shigella se contagia con muy pocas bacterias."),
      mg("alarma", "Pautas de alarma de SUH: palidez, orina escasa, edemas", "util", "Aunque es menos probable con Shigella, puede ocurrir."),
      mg("loperamida", "Loperamida", "riesgoso", "Contraindicada en niños y en disentería."),
      mg("dieta-estricta", "Ayuno o dieta de té y arroz", "innecesario", "Se recomienda alimentación habitual."),
    ],
  },
  debrief: {
    diagnosis: "Diarrea disentérica por Shigella flexneri con algunos signos de deshidratación, en niño de 4 años, en el contexto de un brote en una colonia de verano.",
    pathologies: [
      { name: "Shigelosis", role: "principal", why: "Infección invasiva del colon." },
      { name: "Deshidratación leve a moderada", role: "asociada", why: "Pérdidas." },
      { name: "SUH, invaginación, diarrea viral", role: "diferencial", why: "Otras causas de diarrea con o sin sangre." },
    ],
    reasoning: [
      "Causa: Shigella, transmitida de persona a persona o por agua y alimentos; basta una dosis muy baja.",
      "Mecanismo: invade la mucosa del colon y produce úlceras e inflamación.",
      "Consecuencia: fiebre, disentería, pujo, tenesmo y deshidratación; a veces convulsiones o SUH.",
    ],
    epidemiology:
      "La diarrea aguda es una de las principales causas de consulta en guardias pediátricas de Argentina, con pico en verano. Shigella es una de las causas más frecuentes de diarrea con sangre en niños de 1 a 5 años, sobre todo en jardines, colonias y zonas con saneamiento deficiente.",
    management: [
      "Evaluar hidratación y tratar según el plan correspondiente.",
      "Coprocultivo en diarrea sanguinolenta.",
      "Antibióticos en disentería con fiebre o compromiso general.",
      "Medidas de higiene y control del brote; vigilar SUH.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de diarrea aguda en la infancia.", "Ministerio de Salud de la Nación — Vigilancia de diarreas y SUH."],
    pearls: ["Disentería = sangre + moco + pujo.", "Coprocultivo en diarrea con sangre.", "Nunca loperamida en niños."],
    pitfalls: ["Antidiarreicos.", "No vigilar SUH."],
    tribunal: [
      qa("¿Cuáles son los planes de hidratación de la OMS?", "Plan A: sin deshidratación, más líquidos en casa y sales tras cada deposición. Plan B: algunos signos, sales 50–100 ml/kg en 4 h en el centro. Plan C: deshidratación grave o shock, hidratación endovenosa rápida."),
      qa("¿Qué gérmenes causan diarrea con sangre en niños?", "Shigella, E. coli productora de toxina Shiga (riesgo de SUH), Salmonella, Campylobacter, Yersinia y Entamoeba histolytica."),
      qa("¿Por qué no se dan antibióticos en la diarrea por E. coli productora de Shiga?", "Porque pueden aumentar la liberación de toxina y el riesgo de síndrome urémico hemolítico."),
    ],
  },
};
