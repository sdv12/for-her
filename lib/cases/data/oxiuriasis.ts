import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const oxiuriasis: ClinicalCase = {
  id: "oxiuriasis",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 5, ageUnit: "años", sex: "F", context: "Va al jardín. Tiene un hermano de 8. Comparten cama." },
  frequency: "muy-frecuente",
  intro: "“A la noche se rasca mucho la cola, duerme mal y está irritable. Le vi unos gusanitos blancos.”",
  vitals: { FC: "96 lpm", "T°": "36,4 °C", Peso: "18 kg" },
  anamnesis: [
    act("prurito", "¿Cuándo se rasca?", "clave", "“Sobre todo a la noche.”", "Las hembras ponen huevos de noche."),
    act("gusanos", "¿Cómo eran los gusanitos?", "clave", "“Blancos, finitos, como hilos.”", "Enterobius vermicularis."),
    act("familia", "¿Alguien más en la casa con picazón?", "clave", "“El hermano también.”", "Transmisión familiar."),
    act("vulva", "¿Ardor al orinar o flujo?", "util", "“A veces le arde.”", "Vulvovaginitis por oxiuros."),
    act("abuso", "¿Algún cambio de conducta o algo que te preocupe?", "util", "“No.”", "Diferencial del prurito genital."),
    act("jardin", "¿Qué sala?", "neutro", "“Sala de 5.”", "No orienta."),
  ],
  exam: [
    act("perianal", "Región perianal", "clave", "Lesiones de rascado.", "Prurito."),
    act("vulva-ex", "Vulva", "clave", "Eritema leve.", "Vulvitis."),
    act("general", "Estado general", "util", "Bueno.", "Base."),
  ],
  studies: [
    study("Laboratorio", "test-graham", "Test de Graham (cinta adhesiva) por la mañana, tres días", "clave", "Huevos de Enterobius.", "Diagnóstico."),
    study("Laboratorio", "parasitologico", "Coproparasitológico seriado", "innecesario", "No se realizó.", "Los huevos no suelen estar en heces."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "No se realizó.", "No da eosinofilia significativa."),
    study("Otros", "observacion", "Observar gusanos con linterna de noche", "util", "Visualizados.", "Alternativa diagnóstica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("oxiuros", "Oxiuriasis (Enterobius vermicularis)", true, "Prurito anal nocturno, gusanos blancos finos, convivientes afectados y test de Graham positivo."),
      dx("giardiasis", "Giardiasis", false, "No da prurito anal ni gusanos visibles."),
      dx("candidiasis", "Dermatitis por cándida", false, "Hay huevos de Enterobius."),
      dx("abuso", "Abuso sexual", false, "Hay causa clara, aunque siempre se debe preguntar."),
      dx("ascaris", "Ascaridiasis", false, "Áscaris son grandes y no dan prurito anal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("mebendazol", "Mebendazol o albendazol en dosis única, repetida a las 2 semanas", "clave", "Mata adultos; la repetición cubre las reinfecciones."),
      mg("convivientes", "Tratar a todos los convivientes al mismo tiempo", "clave", "Evita la reinfección."),
      mg("higiene", "Uñas cortas, lavado de manos, cambio y lavado de ropa de cama", "clave", "Corta el ciclo."),
      mg("jardin", "Puede seguir yendo al jardín", "util", "No requiere exclusión."),
      mg("solo-nina", "Tratar solo a la niña", "riesgoso", "Reinfección por los convivientes."),
      mg("dosis-unica", "Dosis única sin repetir", "riesgoso", "Recidiva frecuente."),
    ],
  },
  debrief: {
    diagnosis: "Oxiuriasis (Enterobius vermicularis) con vulvitis, en niña de 5 años con conviviente afectado.",
    pathologies: [
      { name: "Oxiuriasis", role: "principal", why: "Parasitosis intestinal más frecuente en niños." },
      { name: "Vulvitis", role: "asociada", why: "Migración de los parásitos." },
      { name: "Giardiasis, candidiasis", role: "diferencial", why: "Otras causas de síntomas." },
    ],
    reasoning: [
      "Causa: ingesta de huevos por mano-boca.",
      "Mecanismo: las hembras salen de noche a poner huevos en la piel perianal.",
      "Consecuencia: prurito, rascado y autoinfección.",
    ],
    epidemiology:
      "Es muy frecuente en niños en edad escolar en todos los niveles socioeconómicos. Se contagia en la familia y en el jardín. El test de Graham es más útil que el examen de heces.",
    management: [
      "Graham.",
      "Antiparasitario repetido.",
      "Toda la familia.",
      "Higiene.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Parasitosis intestinales.", "CDC — Enterobiasis Resources for Health Professionals."],
    pearls: ["Prurito anal nocturno.", "Graham a la mañana.", "Tratar a todos."],
    pitfalls: ["Pedir solo coproparasitológico.", "No repetir la dosis."],
    tribunal: [
      qa("¿Por qué se repite la dosis a las dos semanas?", "Porque el fármaco no mata los huevos y la autoinfección es frecuente."),
      qa("¿Cómo se hace el test de Graham?", "Se apoya una cinta adhesiva en la región perianal al despertar, antes de higienizarse."),
      qa("¿Qué complicación da en niñas?", "Vulvovaginitis e infecciones urinarias por migración del parásito."),
    ],
  },
};
