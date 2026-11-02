import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const giardiasis: ClinicalCase = {
  id: "giardiasis-nina",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 4, ageUnit: "años", sex: "F", context: "Va al jardín. Viven en una casa con pozo de agua y sin cloacas." },
  frequency: "muy-frecuente",
  intro: "“Hace casi un mes tiene caca blanda, con olor feo, a veces flota. Le duele la panza, tiene muchos gases y no aumenta de peso.” (relata la madre)",
  vitals: { FC: "104 lpm", FR: "22 rpm", "T°": "36,5 °C", Peso: "14 kg" },
  anamnesis: [
    act("deposiciones", "¿Cómo son las deposiciones? ¿Tienen sangre o moco?", "clave", "“Pastosas, amarillentas, con grasa, muy olorosas. Sin sangre.”", "Diarrea crónica con esteatorrea sin sangre: típica de giardiasis (malabsorción en el intestino delgado)."),
    act("agua", "¿De dónde toman el agua? ¿La hierven?", "clave", "“De un pozo, no la hervimos.”", "Los quistes de Giardia se transmiten por agua contaminada."),
    act("jardin", "¿Hay otros chicos con diarrea en el jardín o la casa?", "util", "“El hermano también tuvo.”", "Transmisión fecal-oral entre convivientes."),
    act("peso", "¿Bajó de peso o no crece?", "clave", "“No aumentó en los últimos dos controles.”", "Impacto nutricional: hay que tratar y seguir."),
    act("prurito", "¿Le pica la cola de noche?", "util", "“A veces.”", "Sugiere oxiuriasis asociada."),
    act("muneca", "¿Cómo se llama su muñeca?", "neutro", "“Pepa.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, timpánico, sin dolor localizado.", "Compatible con malabsorción."),
    act("nutricion", "Peso, talla y estado nutricional", "clave", "Peso en percentilo 10 (antes 25), talla en 25.", "Detención del crecimiento ponderal."),
    act("palidez", "Piel y mucosas", "util", "Leve palidez.", "Posible anemia asociada."),
  ],
  studies: [
    study("Laboratorio", "copro", "Coproparasitológico seriado (en tres muestras) y escobillado anal", "clave", "Quistes de Giardia lamblia; escobillado positivo para Enterobius.", "La eliminación de quistes es intermitente: se necesitan muestras seriadas."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Hb 10,8.", "Anemia leve asociada."),
    study("Laboratorio", "coprocultivo", "Coprocultivo", "innecesario", "No se realizó.", "Diarrea crónica sin sangre ni fiebre: no orienta a bacterias."),
    study("Otros", "endoscopia", "Endoscopía con biopsia", "innecesario", "No se realizó.", "Solo si persiste tras el tratamiento o se sospecha celiaquía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("giardia", "Giardiasis con malabsorción y detención del crecimiento ponderal, con oxiuriasis asociada", true, "Diarrea crónica esteatorreica sin sangre, distensión, gases, falta de aumento de peso, agua de pozo sin hervir y quistes de Giardia."),
      dx("celiaquia", "Enfermedad celíaca", false, "Puede dar un cuadro similar, pero se encontró Giardia; si persiste tras el tratamiento, se estudia."),
      dx("amebiasis", "Amebiasis", false, "Daría diarrea con moco y sangre (disentería)."),
      dx("lactosa", "Intolerancia a la lactosa primaria", false, "Es rara a esta edad; puede ser secundaria a la giardiasis."),
      dx("bacteriana", "Diarrea bacteriana", false, "Evolución de un mes, sin fiebre ni sangre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiparasitario", "Metronidazol por 5–7 días (o tinidazol o nitazoxanida) y mebendazol para los oxiuros", "clave", "Trata ambos parásitos."),
      mg("familia", "Tratar a los convivientes con oxiuros y estudiar a los que tienen síntomas", "clave", "Evita la reinfección."),
      mg("agua", "Hervir el agua o clorarla (2 gotas de lavandina por litro, 30 minutos) y lavado de manos", "clave", "Previene la reinfección."),
      mg("nutricion", "Seguimiento del peso y hierro si hay anemia", "util", "Recuperar el crecimiento."),
      mg("antidiarreico", "Loperamida", "riesgoso", "Contraindicada en niños pequeños."),
      mg("antibiotico-amplio", "Amoxicilina", "innecesario", "No actúa sobre parásitos."),
    ],
  },
  debrief: {
    diagnosis: "Giardiasis con diarrea crónica esteatorreica y detención del crecimiento ponderal, con oxiuriasis asociada, en niña de 4 años sin acceso a agua segura.",
    pathologies: [
      { name: "Giardiasis", role: "principal", why: "Quistes de Giardia lamblia con malabsorción." },
      { name: "Oxiuriasis", role: "asociada", why: "Enterobius en el escobillado." },
      { name: "Celiaquía, amebiasis, intolerancia a la lactosa", role: "diferencial", why: "Otras causas de diarrea crónica en niños." },
    ],
    reasoning: [
      "Causa: ingestión de quistes de Giardia en agua o alimentos contaminados o de persona a persona.",
      "Mecanismo: los trofozoítos se adhieren a la mucosa del duodeno y yeyuno, acortan las vellosidades y alteran la absorción de grasas y lactosa.",
      "Consecuencia: diarrea crónica con esteatorrea, distensión, gases, malabsorción y, en niños, desnutrición y retraso del crecimiento.",
    ],
    epidemiology:
      "Las parasitosis intestinales son muy frecuentes en Argentina, sobre todo en niños en edad preescolar y escolar de zonas sin agua potable ni cloacas. Giardia es el protozoo patógeno más frecuente, y los oxiuros, el helminto más común. Son un indicador de condiciones de saneamiento.",
    management: [
      "Coproparasitológico seriado y escobillado anal ante diarrea crónica, dolor abdominal o mal progreso de peso.",
      "Tratamiento específico y de convivientes según el parásito.",
      "Agua segura, saneamiento, lavado de manos y uñas cortas.",
      "Seguimiento nutricional.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de parasitosis intestinales.", "Ministerio de Salud de la Nación — Guía de parasitosis intestinales."],
    pearls: ["Diarrea crónica grasosa sin sangre = Giardia.", "Coproparasitológico seriado.", "Agua: hervir o 2 gotas de lavandina por litro."],
    pitfalls: ["Pedir una sola muestra.", "No tratar el agua."],
    tribunal: [
      qa("¿Qué parasitosis intestinales son más frecuentes en Argentina y cómo se tratan?", "Oxiuriasis (mebendazol o albendazol, a toda la familia, repetir a las 2 semanas), giardiasis (metronidazol, tinidazol o nitazoxanida), ascariasis (mebendazol o albendazol), Blastocystis (tratamiento si hay síntomas) y en el norte uncinarias y Strongyloides (ivermectina)."),
      qa("¿Qué diferencia una diarrea de intestino delgado de una de colon?", "Delgado: deposiciones voluminosas, acuosas o grasosas, poco frecuentes, con dolor periumbilical y malabsorción. Colon: deposiciones pequeñas, frecuentes, con moco o sangre, pujo y tenesmo."),
      qa("¿Cómo se potabiliza el agua en el hogar?", "Hirviéndola al menos un minuto desde que rompe el hervor, o agregando 2 gotas de lavandina de uso doméstico por litro y esperando 30 minutos antes de consumirla."),
    ],
  },
};
