import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const convulsionFebril: ClinicalCase = {
  id: "convulsion-febril-simple",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 18, ageUnit: "meses", sex: "M", context: "Llegan asustados en un taxi." },
  frequency: "frecuente",
  intro: "“Tenía fiebre desde la tarde y de repente se puso duro, puso los ojos para arriba y temblaba todo. Pensamos que se moría.”",
  vitals: { FC: "140 lpm", FR: "30 rpm", "T°": "39,4 °C", "SatO₂": "98 %", Peso: "11 kg", Glucemia: "96 mg/dl" },
  anamnesis: [
    act("duracion", "¿Cuánto duró? ¿Fue de todo el cuerpo o de un solo lado?", "clave", "“Como dos minutos. Temblaba todo, los dos brazos y las piernas.”", "Generalizada y menor de 15 minutos: criterios de convulsión febril simple."),
    act("despues", "¿Cómo quedó después? ¿Ya está como siempre?", "clave", "“Se quedó dormido un rato y ahora ya nos reconoce y quiere jugar.”", "La recuperación completa en poco tiempo es tranquilizadora; un compromiso de conciencia persistente obliga a descartar meningitis o encefalitis."),
    act("repetida", "¿Se repitió desde entonces?", "clave", "“No, una sola vez.”", "Más de una en 24 h la vuelve compleja y cambia el estudio."),
    act("foco", "¿Tiene tos, mocos, diarrea o algún otro síntoma?", "clave", "“Mocos desde ayer.”", "Busca la causa de la fiebre: en general, una infección viral."),
    act("familia", "¿Alguien de la familia tuvo convulsiones con fiebre?", "util", "“El papá de chico.”", "El antecedente familiar es frecuente y aumenta el riesgo de recurrencia."),
    act("vacunas", "¿Tiene las vacunas al día? ¿Tomó antibióticos?", "util", "“Sí, completas. Antibióticos no.”", "Vacunado y sin antibiótico previo hace menos probable una meningitis enmascarada."),
    act("desarrollo", "¿Camina y dice palabras como los chicos de su edad?", "util", "“Sí, camina y dice mamá, papá, agua.”", "Un desarrollo normal es parte de la definición de convulsión febril simple."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Vigil, conectado, sin déficit focal, pupilas normales.", "Un foco neurológico o la persistencia de la alteración de conciencia descarta la convulsión simple."),
    act("meningeos", "Fontanela y signos meníngeos", "clave", "Fontanela cerrada; sin rigidez de nuca.", "Descartar meningitis es lo primero."),
    act("piel", "Piel completa", "clave", "Sin petequias ni lesiones.", "Fiebre con petequias = meningococcemia hasta demostrar lo contrario."),
    act("orl", "Otoscopía y fauces", "util", "Rinorrea serosa; fauces congestivas; tímpanos normales.", "Foco: infección viral de vía aérea superior."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia capilar", "util", "96 mg/dl.", "Descarta hipoglucemia como causa."),
    study("Otros", "pl", "Punción lumbar", "innecesario", "No se realizó.", "En convulsión febril simple con niño recuperado, vacunado y sin signos meníngeos no está indicada."),
    study("Electrofisiología", "eeg", "Electroencefalograma", "innecesario", "No se realizó.", "No predice recurrencia ni epilepsia en la convulsión febril simple."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Irradia sin beneficio en la convulsión simple."),
    study("Laboratorio", "lab", "Hemograma, ionograma y calcio", "innecesario", "Normales.", "No se piden de rutina; sí si hay deshidratación o vómitos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cfs", "Convulsión febril simple", true, "Niño de 18 meses con fiebre, crisis generalizada de 2 minutos, única, con recuperación completa y examen normal."),
      dx("compleja", "Convulsión febril compleja", false, "Sería focal, de más de 15 minutos o repetida en 24 horas."),
      dx("meningitis", "Meningitis", false, "Habría compromiso de conciencia persistente, signos meníngeos, petequias o letargia."),
      dx("epilepsia", "Primera crisis de epilepsia", false, "La epilepsia se diagnostica con crisis sin fiebre; acá la fiebre es el disparador."),
      dx("escalofrio", "Escalofríos febriles", false, "En los escalofríos no hay pérdida de conciencia ni desviación de la mirada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar a los padres que es benigna, que no daña el cerebro y que puede repetirse", "clave", "La angustia familiar es enorme: la educación es parte central del tratamiento."),
      mg("crisis", "Enseñar qué hacer si se repite: ponerlo de costado, no meter nada en la boca y consultar si dura más de 5 minutos", "clave", "Evita lesiones y maniobras peligrosas."),
      mg("fiebre", "Tratar la fiebre para el confort y buscar su causa", "clave", "Mejora el malestar; hay que diagnosticar el foco infeccioso."),
      mg("antitermicos", "Antitérmicos de horario para evitar otra convulsión", "innecesario", "No previenen la recurrencia de la convulsión febril."),
      mg("anticonvulsivo", "Anticonvulsivante crónico (por ejemplo, ácido valproico)", "riesgoso", "No está indicado en la convulsión febril simple y tiene efectos adversos graves."),
      mg("bano", "Baño con agua fría o paños con alcohol", "riesgoso", "Generan malestar, escalofríos y, con alcohol, riesgo de intoxicación."),
    ],
  },
  debrief: {
    diagnosis: "Convulsión febril simple asociada a infección viral de vía aérea superior, en niño de 18 meses.",
    pathologies: [
      { name: "Convulsión febril simple", role: "principal", why: "Crisis generalizada breve, única, con fiebre y recuperación completa." },
      { name: "Infección viral de vía aérea superior", role: "asociada", why: "Causa de la fiebre." },
      { name: "Meningitis o encefalitis", role: "diferencial", why: "Lo que no hay que perder." },
      { name: "Convulsión febril compleja", role: "diferencial", why: "Focal, prolongada o repetida." },
      { name: "Epilepsia", role: "diferencial", why: "Crisis sin fiebre." },
    ],
    reasoning: [
      "Causa: fiebre, en general por una infección viral, en un cerebro inmaduro con predisposición genética.",
      "Mecanismo: el cerebro entre los 6 meses y los 5 años tiene un umbral convulsivo más bajo; la fiebre (sobre todo el ascenso rápido) y las citoquinas aumentan la excitabilidad neuronal.",
      "Consecuencia: crisis tónico-clónica generalizada breve con recuperación completa; no deja daño neurológico.",
      "El riesgo de recurrencia es de alrededor del 30 %, mayor si es antes de los 18 meses o hay antecedentes familiares. El riesgo de epilepsia es apenas mayor que en la población general.",
    ],
    epidemiology:
      "Es la causa más frecuente de convulsiones en la infancia: afecta al 2–5 % de los niños entre los 6 meses y los 5 años, con un pico a los 18 meses. Es algo más frecuente en varones y tiene fuerte carga familiar. Aumenta en invierno, con las infecciones respiratorias.",
    management: [
      "Estabilizar si la crisis sigue: si dura más de 5 minutos, benzodiacepina (midazolam o diazepam).",
      "Descartar infección del sistema nervioso; punción lumbar solo con signos meníngeos, mal estado general, vacunación incompleta en menores de 12 meses o antibiótico previo.",
      "Buscar y tratar el foco de la fiebre; antitérmicos para el confort.",
      "Educación a la familia: benigna, puede repetirse, cómo actuar.",
      "No pedir EEG, imágenes ni indicar anticonvulsivantes en la convulsión febril simple.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Consenso sobre convulsión febril y Guía de manejo de la primera convulsión.",
      "Sociedad Argentina de Neurología Infantil — recomendaciones sobre convulsiones febriles.",
    ],
    pearls: [
      "Simple: generalizada, menos de 15 minutos, única en 24 h, de 6 meses a 5 años.",
      "Los antitérmicos no previenen la próxima convulsión.",
      "Más de 5 minutos de crisis: benzodiacepina.",
    ],
    pitfalls: ["Pedir EEG o tomografía de rutina.", "Indicar anticonvulsivantes.", "No buscar meningitis."],
  },
};
