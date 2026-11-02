import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tinaCapitis: ClinicalCase = {
  id: "tina-capitis",
  level: 1,
  area: "Dermatología",
  setting: "CAPS",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Tiene un gatito nuevo en la casa desde hace dos meses." },
  frequency: "frecuente",
  intro: "“Le apareció una parte sin pelo en la cabeza, redonda, que le pica y tiene como escamitas. Le pusimos una crema con corticoide y está igual.” (relata el padre)",
  vitals: { FC: "92 lpm", "T°": "36,5 °C", Peso: "22 kg" },
  anamnesis: [
    act("animales", "¿Tiene contacto con perros o gatos?", "clave", "“Un gatito que trajimos de la calle.”", "Microsporum canis, transmitido por gatos y perros, es la causa más frecuente de tiña de la cabeza en Argentina."),
    act("crema", "¿Qué le pusieron y cómo evolucionó?", "clave", "“Una crema con corticoide, y se agrandó.”", "Los corticoides tópicos empeoran las micosis y modifican su aspecto (tiña incógnita)."),
    act("contactos", "¿Hay otros chicos con lesiones parecidas?", "util", "“Un compañero de la escuela.”", "También se contagia entre personas."),
    act("otras", "¿Tiene otras manchas en el cuerpo?", "util", "“Una redonda en el brazo.”", "Tiña del cuerpo asociada."),
    act("dolor", "¿Le duele, supura o tiene fiebre?", "util", "“No.”", "Descarta querion (forma inflamatoria)."),
    act("deporte", "¿Hace algún deporte?", "neutro", "“Fútbol.”", "No orienta."),
  ],
  exam: [
    act("cuero", "Examen del cuero cabelludo", "clave", "Placa alopécica redonda de 4 cm con descamación grisácea y pelos cortados a la misma altura.", "Tiña microspórica: placa única grande con pelos cortados."),
    act("ganglios", "Ganglios occipitales y cervicales", "util", "Pequeñas adenopatías occipitales.", "Reacción a la infección."),
    act("piel", "Resto de la piel", "util", "Placa anular eritematosa con borde descamativo en el brazo.", "Tiña corporis."),
  ],
  studies: [
    study("Microbiología", "micologico", "Examen micológico directo y cultivo de pelos y escamas", "clave", "Hifas y esporas alrededor del pelo (ectotrix); cultivo: Microsporum canis.", "Confirma y define el hongo."),
    study("Otros", "wood", "Luz de Wood", "util", "Fluorescencia verde.", "Microsporum fluoresce; Trichophyton no."),
    study("Laboratorio", "lab", "Laboratorio y hepatograma de rutina", "innecesario", "No se realizó.", "En niños sanos con tratamientos cortos no es necesario de rutina."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tina", "Tiña de la cabeza microspórica (Microsporum canis) con tiña corporis, modificada por corticoide tópico", true, "Placa alopécica descamativa con pelos cortados al mismo nivel, contacto con gato, fluorescencia verde y cultivo de Microsporum canis."),
      dx("areata", "Alopecia areata", false, "La alopecia areata es lisa, sin descamación ni inflamación, con pelos en signo de exclamación."),
      dx("seborreica", "Dermatitis seborreica", false, "No produce placas alopécicas con pelos cortados."),
      dx("tricotilomania", "Tricotilomanía", false, "Pelos de distinta longitud sin descamación; cultivo negativo."),
      dx("psoriasis", "Psoriasis del cuero cabelludo", false, "Placas eritematosas con escamas gruesas sin alopecia ni hongos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("griseofulvina", "Antifúngico oral: griseofulvina con comidas grasas por 6–8 semanas (o terbinafina según la especie)", "clave", "La tiña de la cabeza no se cura con tratamiento tópico solo: el hongo está en el folículo."),
      mg("champu", "Champú de ketoconazol o sulfuro de selenio para él y los convivientes", "clave", "Reduce las esporas y el contagio."),
      mg("gato", "Llevar al gato al veterinario para tratarlo", "clave", "Fuente de reinfección."),
      mg("escuela", "Puede seguir yendo a la escuela con el tratamiento iniciado; no compartir peines ni gorros", "util", "No hace falta excluirlo."),
      mg("suspender-corticoide", "Suspender el corticoide tópico", "clave", "Empeora la infección."),
      mg("solo-crema", "Solo crema antifúngica", "riesgoso", "No penetra el folículo: la tiña persiste y se contagia."),
    ],
  },
  debrief: {
    diagnosis: "Tiña de la cabeza microspórica por Microsporum canis con tiña corporis, modificada por corticoide tópico, en niño de 6 años con contacto con un gato.",
    pathologies: [
      { name: "Tiña de la cabeza (tinea capitis)", role: "principal", why: "Infección del pelo y folículo por dermatofitos." },
      { name: "Tiña corporis", role: "asociada", why: "Lesión en el brazo por el mismo hongo." },
      { name: "Alopecia areata, dermatitis seborreica, tricotilomanía", role: "diferencial", why: "Otras causas de placas alopécicas." },
    ],
    reasoning: [
      "Causa: Microsporum canis transmitido por un gato.",
      "Mecanismo: el hongo invade el estrato córneo y la vaina del pelo; el pelo se debilita y se corta cerca de la superficie.",
      "Consecuencia: placa alopécica descamativa; si hay mucha inflamación, querion (placa dolorosa y supurativa) que puede dejar cicatriz.",
    ],
    epidemiology:
      "La tiña de la cabeza es casi exclusiva de niños prepúberes, más en varones de 3 a 10 años. En Argentina, Microsporum canis (gatos y perros) es el agente más frecuente; Trichophyton tonsurans, de persona a persona, está en aumento.",
    management: [
      "Sospecharla en todo niño con placa alopécica descamativa.",
      "Confirmar con micológico directo y cultivo.",
      "Antifúngico oral por semanas, champú antifúngico y tratar la fuente animal.",
      "Control clínico y micológico al terminar.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de tiñas.", "Sociedad Argentina de Pediatría — Dermatofitosis en pediatría."],
    pearls: ["Niño + placa alopécica descamativa = tiña.", "La tiña de la cabeza necesita tratamiento oral.", "No usar corticoides tópicos."],
    pitfalls: ["Tratar solo con crema.", "Olvidar al animal."],
    tribunal: [
      qa("¿Qué es un querion de Celso?", "Una forma inflamatoria de tiña de la cabeza: placa dolorosa, elevada, con pústulas y supuración que puede confundirse con un absceso; se trata con antifúngico oral (a veces con corticoide oral) y no se drena; puede dejar alopecia cicatrizal."),
      qa("¿Qué es la tiña incógnita?", "Una tiña cuyo aspecto se modificó por el uso de corticoides tópicos: menos descamación y borde menos definido, con extensión de la lesión; dificulta el diagnóstico."),
      qa("¿Qué dermatofitosis son frecuentes y cómo se tratan?", "Tiña de la cabeza (oral), tiña corporis y crural (tópico, oral si es extensa), tiña de los pies (tópico) y onicomicosis (oral prolongado con terbinafina o itraconazol, o tópico en casos leves)."),
    ],
  },
};
