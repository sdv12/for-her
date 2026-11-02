import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epistaxis: ClinicalCase = {
  id: "epistaxis-anterior",
  level: 1,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "años", sex: "M", context: "Invierno, calefacción a gas. Se hurga la nariz." },
  frequency: "muy-frecuente",
  intro: "“Le sale sangre de la nariz hace 15 minutos y no para. Le pusimos la cabeza para atrás.” (relata la madre)",
  vitals: { TA: "108/66 mmHg", FC: "100 lpm", FR: "20 rpm", "T°": "36,5 °C" },
  anamnesis: [
    act("lado", "¿De qué lado sangra? ¿Le cae sangre a la garganta?", "clave", "“Solo del lado derecho, adelante.”", "Unilateral anterior: lo más probable es el plexo de Kiesselbach."),
    act("frecuencia", "¿Le pasó antes?", "util", "“Varias veces este invierno.”", "Recurrente con ambiente seco y manipulación."),
    act("sangrados", "¿Tiene moretones, sangrado de encías o en la familia alguien sangra mucho?", "clave", "“No.”", "Descarta trastorno de la coagulación."),
    act("medicacion", "¿Tomó aspirina o ibuprofeno?", "util", "“No.”", "Afectan la hemostasia."),
    act("golpe", "¿Se golpeó la nariz?", "util", "“No.”", "Descarta fractura."),
    act("juego", "¿Qué juego le gusta?", "neutro", "“El fútbol.”", "No orienta."),
  ],
  exam: [
    act("rinoscopia", "Rinoscopía anterior tras compresión", "clave", "Vaso sangrante en el tabique anterior derecho, mucosa seca con costras.", "Plexo de Kiesselbach."),
    act("hemodinamia", "Signos vitales y palidez", "clave", "Estable, sin palidez.", "Sangrado menor."),
    act("piel", "Piel", "util", "Sin petequias ni hematomas.", "Descarta plaquetopenia."),
  ],
  studies: [
    study("Laboratorio", "coagulograma", "Hemograma y coagulograma en la primera epistaxis aislada", "innecesario", "No se realizó.", "Solo si es recurrente grave, hay otros sangrados o antecedentes."),
    study("Imágenes", "tc", "Tomografía de senos", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "observacion", "Observación tras la compresión", "util", "No vuelve a sangrar en 30 minutos.", "Confirma el control."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("anterior", "Epistaxis anterior por sangrado del plexo de Kiesselbach, favorecida por sequedad y manipulación", true, "Sangrado unilateral anterior con vaso visible en el tabique y mucosa seca, sin otros sangrados."),
      dx("posterior", "Epistaxis posterior", false, "La sangre no cae a la faringe y el punto es anterior."),
      dx("coagulopatia", "Trastorno de la coagulación", false, "Sin otros sangrados ni antecedentes."),
      dx("angiofibroma", "Angiofibroma nasofaríngeo juvenil", false, "Se sospecha en varones adolescentes con obstrucción nasal y epistaxis graves."),
      dx("cuerpo-extrano", "Cuerpo extraño nasal", false, "No hay secreción fétida unilateral ni objeto visible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("compresion", "Sentado con la cabeza hacia adelante, compresión firme de las alas nasales por 10–15 minutos", "clave", "Detiene la mayoría de las epistaxis anteriores."),
      mg("humedad", "Humidificar el ambiente, vaselina o solución salina nasal y no hurgarse", "clave", "Previene recurrencias."),
      mg("cauterizacion", "Cauterización química si recurre", "util", "Indicada en sangrados anteriores recurrentes."),
      mg("cabeza-atras", "Cabeza hacia atrás", "riesgoso", "La sangre va a la faringe: vómitos y aspiración, y no comprime."),
      mg("taponaje-posterior", "Taponaje posterior", "innecesario", "Es para la epistaxis posterior que no cede."),
      mg("alarma", "Pautas de alarma: sangrado de más de 20 minutos, abundante o con otros sangrados", "util", "Indica reconsulta."),
    ],
  },
  debrief: {
    diagnosis: "Epistaxis anterior derecha por sangrado del plexo de Kiesselbach, recurrente, favorecida por sequedad ambiental y manipulación, en niño de 9 años.",
    pathologies: [
      { name: "Epistaxis anterior", role: "principal", why: "Sangrado del área de Little." },
      { name: "Sequedad de la mucosa", role: "asociada", why: "Factor causal." },
      { name: "Epistaxis posterior, coagulopatía, angiofibroma", role: "diferencial", why: "Formas más graves." },
    ],
    reasoning: [
      "Causa: sequedad de la mucosa por calefacción y traumatismo digital.",
      "Mecanismo: se rompen los vasos superficiales del plexo de Kiesselbach en el tabique anterior.",
      "Consecuencia: sangrado nasal unilateral, en general autolimitado.",
    ],
    epidemiology:
      "La epistaxis es muy frecuente en niños de 2 a 10 años y en adultos mayores. En niños el 90 % es anterior y benigna; en mayores es más frecuente la posterior, asociada a hipertensión y anticoagulantes.",
    management: [
      "Posición correcta y compresión.",
      "Rinoscopía para localizar el punto.",
      "Cauterización o taponaje anterior si persiste.",
      "Estudiar coagulación si es recurrente grave o hay otros sangrados.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones sobre epistaxis en la infancia.", "Asociación Argentina de Otorrinolaringología — Guía de epistaxis."],
    pearls: ["Cabeza hacia adelante y apretar 10–15 minutos.", "Kiesselbach en el 90 %.", "Humedecer la mucosa."],
    pitfalls: ["Cabeza hacia atrás.", "Estudios innecesarios en epistaxis aislada."],
    tribunal: [
      qa("¿Qué es el plexo de Kiesselbach?", "Una red de vasos en el tabique nasal anterior (área de Little) formada por ramas de las carótidas interna y externa; es el origen de la mayoría de las epistaxis anteriores."),
      qa("¿Qué diferencia la epistaxis anterior de la posterior?", "La anterior es más frecuente, en niños, unilateral y se controla con compresión; la posterior es más frecuente en mayores, con hipertensión o anticoagulantes, abundante, a menudo bilateral, cae a la faringe y puede requerir taponaje posterior o ligadura."),
      qa("¿Cuándo se estudia la coagulación en un niño con epistaxis?", "Ante epistaxis recurrentes graves, bilaterales, prolongadas, con otros sangrados (encías, moretones, menstruaciones abundantes) o antecedentes familiares de trastornos de la coagulación como la enfermedad de von Willebrand."),
    ],
  },
};
