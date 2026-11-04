import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ingestaCaustico: ClinicalCase = {
  id: "ingesta-de-causticos-nino",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "M", context: "La madre trasvasó un destapacañerías a una botella de gaseosa." },
  frequency: "frecuente",
  intro: "“Tomó de una botella de gaseosa donde había destapacañerías. Lloró mucho, escupió, babea y no quiere tragar.” (relata la madre, hace 40 minutos)",
  vitals: { FC: "148 lpm", FR: "30 rpm", "T°": "36,8 °C", "SatO₂": "97 %", Peso: "13 kg" },
  anamnesis: [
    act("producto", "¿Qué producto era? ¿Tiene el envase?", "clave", "“Destapacañerías con soda cáustica.”", "Álcali fuerte: lesiones profundas de esófago."),
    act("cantidad", "¿Cuánto tomó?", "util", "“No sé, un trago.”", "Las lesiones graves no dependen de grandes cantidades."),
    act("respiracion", "¿Le cuesta respirar? ¿Cambió la voz? ¿Ruido al respirar?", "clave", "“Tose un poco.”", "Buscar compromiso de la vía aérea."),
    act("vomito", "¿Vomitó? ¿Le dieron algo?", "clave", "“Le dimos leche y vomitó.”", "Inducir el vómito o dar líquidos reexpone el esófago."),
    act("hora", "¿A qué hora fue?", "util", "“Hace 40 minutos.”", "Planifica la endoscopía."),
    act("hermanos", "¿Tiene hermanos?", "neutro", "“Una hermana.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca y orofaringe", "clave", "Lesiones blanquecinas y edema en labios, lengua y paladar; sialorrea.", "Quemadura química oral; la ausencia de lesiones orales no descarta lesión esofágica."),
    act("via-aerea", "Estridor, disfonía, trabajo respiratorio", "clave", "Sin estridor, leve disfonía.", "Vigilar edema laríngeo."),
    act("abdomen", "Abdomen", "util", "Blando, sin defensa.", "Sin perforación evidente."),
  ],
  studies: [
    study("Otros", "endoscopia", "Endoscopía digestiva alta entre las 12 y 48 h", "clave", "Esofagitis cáustica grado IIb (úlceras circunferenciales).", "Clasifica la lesión y define pronóstico y conducta."),
    study("Imágenes", "rx", "Radiografía de tórax y abdomen", "util", "Sin neumomediastino ni neumoperitoneo.", "Descarta perforación."),
    study("Otros", "sonda", "Colocar sonda nasogástrica a ciegas para lavado", "riesgoso", "No se realizó.", "Riesgo de perforación y reexposición."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("caustico", "Ingesta de cáustico alcalino con quemadura oral y esofagitis cáustica grado IIb", true, "Ingesta accidental de soda cáustica con sialorrea, disfagia, lesiones orales y úlceras circunferenciales en la endoscopía."),
      dx("leve", "Ingesta sin lesión esofágica", false, "La endoscopía muestra úlceras."),
      dx("perforacion", "Perforación esofágica", false, "Sin aire en el mediastino ni signos clínicos."),
      dx("cuerpo-extrano", "Cuerpo extraño esofágico", false, "La causa es química."),
      dx("estomatitis", "Estomatitis herpética", false, "El antecedente químico explica las lesiones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ayuno", "Ayuno, no inducir el vómito, no dar neutralizantes ni leche", "clave", "Evitan más daño."),
      mg("internacion", "Internación, vigilancia de la vía aérea, analgesia, IBP e hidratación EV", "clave", "Riesgo de edema y de perforación."),
      mg("endoscopia", "Endoscopía entre las 12 y 48 h por gastroenterología pediátrica", "clave", "Clasifica y orienta."),
      mg("seguimiento", "Seguimiento por estenosis esofágica (aparece en semanas)", "util", "Complicación frecuente en grado IIb o más."),
      mg("prevencion", "Prevención: no trasvasar productos a botellas de bebidas, guardarlos fuera del alcance", "clave", "Las ingestas son evitables."),
      mg("vomito", "Inducir el vómito", "riesgoso", "Reexpone el esófago y la vía aérea."),
    ],
  },
  debrief: {
    diagnosis: "Ingesta accidental de cáustico alcalino (soda cáustica) con quemadura oral y esofagitis grado IIb, en niño de 2 años, por producto trasvasado a una botella de gaseosa.",
    pathologies: [
      { name: "Esofagitis cáustica", role: "principal", why: "Necrosis de la mucosa por álcali." },
      { name: "Riesgo de estenosis", role: "asociada", why: "Complicación tardía." },
      { name: "Perforación, cuerpo extraño", role: "diferencial", why: "Otras complicaciones o causas." },
    ],
    reasoning: [
      "Causa: ingesta de un álcali fuerte.",
      "Mecanismo: necrosis por licuefacción que penetra profundamente en la pared del esófago.",
      "Consecuencia: dolor, disfagia, sialorrea; perforación en los primeros días y estenosis a las semanas.",
    ],
    epidemiology:
      "Las ingestas de cáusticos son una causa importante de lesiones accidentales en niños de 1 a 5 años en Argentina, en general en el hogar, muchas veces por productos trasvasados a envases de bebidas. Los álcalis (soda cáustica, lavandina concentrada) son los más graves.",
    management: [
      "No inducir vómito ni neutralizar; ayuno.",
      "Evaluar la vía aérea.",
      "Endoscopía entre 12 y 48 h.",
      "Seguimiento por estenosis y prevención en el hogar.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de ingesta de cáusticos en pediatría.", "Centro Nacional de Intoxicaciones (Hospital Posadas)."],
    pearls: ["Nunca inducir el vómito.", "Sin lesiones orales no descarta esófago.", "No trasvasar productos."],
    pitfalls: ["Dar leche o vinagre.", "Sonda a ciegas."],
    tribunal: [
      qa("¿Qué es la clasificación de Zargar?", "La clasificación endoscópica de las lesiones por cáusticos: 0 normal, I edema, IIa erosiones superficiales, IIb úlceras profundas o circunferenciales, IIIa necrosis focal, IIIb necrosis extensa; desde IIb aumenta el riesgo de estenosis."),
      qa("¿Qué diferencia los álcalis de los ácidos en la ingesta?", "Los álcalis producen necrosis por licuefacción con penetración profunda (esófago); los ácidos producen necrosis por coagulación, más superficial, y afectan más el estómago."),
      qa("¿Qué hacer ante una ingesta de pilas de botón?", "Es una urgencia: si queda en el esófago, en 2 horas puede producir una perforación por corriente eléctrica; se pide radiografía y extracción endoscópica inmediata."),
    ],
  },
};
