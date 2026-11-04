import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ituEscolar: ClinicalCase = {
  id: "infeccion-urinaria-nina-escolar",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 7, ageUnit: "años", sex: "F", context: "Tuvo dos cistitis el año pasado. Retiene el pis en la escuela porque los baños están sucios." },
  frequency: "muy-frecuente",
  intro: "“Desde ayer le arde al hacer pis, va al baño a cada rato y se le escapa un poco. No tiene fiebre.” (relata la madre)",
  vitals: { FC: "92 lpm", FR: "20 rpm", "T°": "36,8 °C", Peso: "24 kg" },
  anamnesis: [
    act("sintomas", "¿Le arde, va seguido, tiene urgencia?", "clave", "“Sí, todo eso.”", "Síntomas urinarios bajos: cistitis."),
    act("fiebre", "¿Tuvo fiebre, dolor de espalda o vómitos?", "clave", "“No.”", "Sin compromiso renal."),
    act("habitos", "¿Cuántas veces orina por día? ¿Aguanta? ¿Cómo va de cuerpo?", "clave", "“Dos o tres veces, aguanta toda la mañana; está constipada.”", "Disfunción vesical e intestinal: principal factor de infecciones urinarias recurrentes en escolares."),
    act("higiene", "¿Cómo se limpia después de ir al baño?", "util", "“De atrás hacia adelante.”", "Higiene incorrecta."),
    act("abuso", "Preguntar por cambios de conducta o algo que le haya pasado (con cuidado)", "util", "Sin indicios.", "En infecciones genitourinarias recurrentes se tiene en cuenta el abuso sexual."),
    act("escuela", "¿En qué grado está?", "neutro", "“En segundo.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen y puño percusión", "clave", "Dolor suprapúbico leve; puño percusión negativa; materia fecal palpable en fosa ilíaca izquierda.", "Cistitis con constipación."),
    act("genitales", "Inspección genital", "clave", "Vulvitis leve, sin lesiones.", "Descarta vulvovaginitis como causa del ardor."),
    act("columna", "Columna lumbosacra", "util", "Normal.", "Descarta disrafia oculta."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo (chorro medio con higiene)", "clave", "Leucocituria, nitritos positivos; urocultivo: E. coli 100.000 UFC/ml.", "Confirma la infección y guía el antibiótico."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "util", "Riñones normales; residuo posmiccional aumentado, pared vesical engrosada.", "En infecciones recurrentes; evalúa disfunción vesical."),
    study("Imágenes", "cuvm", "Cistouretrografía miccional de rutina", "innecesario", "No se realizó.", "No se indica en cistitis sin fiebre con ecografía normal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cistitis", "Infección urinaria baja (cistitis) recurrente asociada a disfunción vesical e intestinal", true, "Disuria, polaquiuria y urgencia sin fiebre, con urocultivo positivo, retención voluntaria, pocas micciones y constipación."),
      dx("pielonefritis", "Pielonefritis", false, "Sin fiebre ni dolor lumbar."),
      dx("vulvovaginitis", "Vulvovaginitis", false, "Hay urocultivo positivo; la vulvitis es leve y asociada."),
      dx("diabetes", "Diabetes", false, "La polaquiuria es por cistitis, no poliuria."),
      dx("reflujo", "Reflujo vesicoureteral", false, "No hay pielonefritis ni dilatación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico oral según sensibilidad (cefalexina o similar) por 3–5 días", "clave", "Tratamiento de la cistitis."),
      mg("habitos", "Micciones programadas cada 3 horas, buena hidratación y tratar la constipación", "clave", "Corrige la disfunción vesical e intestinal y previene recurrencias."),
      mg("escuela", "Hablar con la escuela sobre el acceso a baños limpios", "util", "Factor ambiental."),
      mg("higiene", "Higiene de adelante hacia atrás", "util", "Prevención."),
      mg("profilaxis", "Profilaxis antibiótica prolongada", "innecesario", "Primero se corrige la disfunción; la profilaxis tiene indicaciones acotadas."),
      mg("cistoscopia", "Cistoscopía", "riesgoso", "Invasiva y sin indicación."),
    ],
  },
  debrief: {
    diagnosis: "Cistitis recurrente por E. coli asociada a disfunción vesical e intestinal (retención voluntaria y constipación), en niña de 7 años.",
    pathologies: [
      { name: "Cistitis recurrente", role: "principal", why: "Infección urinaria baja repetida." },
      { name: "Disfunción vesical e intestinal", role: "asociada", why: "Causa de recurrencias." },
      { name: "Pielonefritis, vulvovaginitis, reflujo", role: "diferencial", why: "Otras causas de síntomas urinarios." },
    ],
    reasoning: [
      "Causa: retención de orina y constipación que favorecen la colonización por E. coli.",
      "Mecanismo: la vejiga se vacía poco y queda orina residual; el recto lleno comprime y altera la micción.",
      "Consecuencia: cistitis repetidas, incontinencia diurna y, si asciende, pielonefritis.",
    ],
    epidemiology:
      "Las infecciones urinarias son frecuentes en niñas en edad escolar; alrededor del 3–8 % de las niñas tiene una antes de los 7 años, con recurrencias frecuentes. La disfunción vesical e intestinal es la causa más común de recurrencias en esta edad.",
    management: [
      "Urocultivo antes de tratar.",
      "Antibiótico corto en la cistitis.",
      "Buscar y tratar la disfunción vesical e intestinal.",
      "Estudios por imágenes según edad, fiebre y recurrencias.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de infección urinaria en pediatría.", "Sociedad Argentina de Nefrología Pediátrica — Recomendaciones de disfunción vesical."],
    pearls: ["Escolar con ITU recurrente = preguntar por hábitos y constipación.", "Micciones programadas.", "Urocultivo siempre."],
    pitfalls: ["Profilaxis sin corregir hábitos.", "No tratar la constipación."],
    tribunal: [
      qa("¿Cómo se toma la muestra de orina según la edad?", "En niños que controlan esfínteres: chorro medio con higiene. En lactantes: sondaje vesical o punción suprapúbica; la bolsa colectora solo sirve si es negativa."),
      qa("¿Cuándo se estudia con imágenes a un niño con infección urinaria?", "Ecografía en la primera infección febril en menores de 2 años, en infecciones recurrentes o atípicas; cistouretrografía si la ecografía es anormal o hay pielonefritis recurrentes."),
      qa("¿Qué es la disfunción vesical e intestinal?", "Alteraciones del llenado o vaciado de la vejiga (urgencia, retención, micciones infrecuentes, incontinencia) asociadas a constipación o encopresis; favorece infecciones urinarias y reflujo."),
    ],
  },
};
