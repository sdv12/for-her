import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tromboflebitisSuperficial: ClinicalCase = {
  id: "tromboflebitis-superficial",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 56, ageUnit: "años", sex: "F", context: "Peluquera, trabaja de pie. Várices en las dos piernas hace años." },
  frequency: "frecuente",
  intro: "“Se me puso dura y colorada una vena del muslo y me duele al tocarla.”",
  vitals: { TA: "128/80 mmHg", FC: "76 lpm", "T°": "37,1 °C" },
  anamnesis: [
    act("ubicacion", "¿Dónde exactamente y hasta dónde sube?", "clave", "“Por la cara interna de la pierna, sube hasta casi la ingle.”", "Cercanía al cayado de la safena interna: riesgo de extensión al sistema profundo."),
    act("tiempo", "¿Desde cuándo?", "clave", "“Hace cuatro días.”", "Cuadro agudo."),
    act("riesgo", "¿Toma hormonas, tuvo cirugías, viajes, cáncer o trombosis antes?", "clave", "“Nada de eso.”", "Sin factores mayores; si aparece sin várices hay que pensar en trombofilia o cáncer."),
    act("disnea", "¿Le falta el aire o tuvo dolor en el pecho?", "clave", "“No.”", "Descarta clínica de TEP."),
    act("edema", "¿Se le hinchó toda la pierna?", "util", "“No, solo esa zona.”", "La hinchazón global sugiere TVP."),
    act("tinte", "¿Se tiñe el pelo seguido?", "neutro", "“Todos los meses.”", "No tiene relación."),
  ],
  exam: [
    act("cordon", "Inspección y palpación del trayecto venoso", "clave", "Cordón indurado, eritematoso y doloroso sobre la safena interna, desde el tercio medio de la pierna hasta 5 cm del pliegue inguinal.", "Tromboflebitis superficial extensa y próxima al cayado."),
    act("pantorrilla", "Pantorrilla y perímetros", "clave", "Sin edema, perímetros simétricos.", "No sugiere TVP, pero no la descarta."),
    act("varices", "Várices", "util", "Várices tronculares bilaterales.", "Sustrato más común."),
    act("piel", "Piel", "util", "Sin heridas ni linfangitis.", "No es una celulitis."),
  ],
  studies: [
    study("Imágenes", "doppler", "Eco Doppler venoso de miembro inferior", "clave", "Trombo en safena interna de 18 cm, a 4 cm de la unión safenofemoral. Sistema profundo permeable.", "Obligatorio: mide extensión, distancia al cayado y descarta TVP asociada."),
    study("Laboratorio", "dimero", "Dímero D para decidir", "innecesario", "No se pidió.", "Suele estar elevado y no cambia la conducta: decide el Doppler."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Normal.", "Basal antes de anticoagular."),
    study("Laboratorio", "trombofilia", "Panel de trombofilia en el episodio agudo", "innecesario", "No se pidió.", "Con várices y sin otros eventos no está indicado y se altera en la fase aguda."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tvs", "Trombosis venosa superficial de safena interna extensa, a menos de 5 cm del cayado, sin TVP", true, "Cordón doloroso, Doppler con trombo de 18 cm a 4 cm de la unión safenofemoral y profundo permeable."),
      dx("tvp", "Trombosis venosa profunda", false, "El sistema profundo está permeable."),
      dx("celulitis", "Celulitis", false, "Lesión lineal sobre una vena, con trombo en el Doppler."),
      dx("linfangitis", "Linfangitis", false, "Sin puerta de entrada ni estrías rojas finas."),
      dx("eritema-nudoso", "Eritema nudoso", false, "Nódulos pretibiales, no un cordón venoso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fondaparinux", "Fondaparinux 2,5 mg/día (o HBPM profiláctica) por 45 días", "clave", "Trombo mayor de 5 cm: reduce la extensión a TVP y TEP."),
      mg("cayado", "Si llegara a menos de 3 cm del cayado, anticoagulación a dosis terapéutica", "clave", "Ahí se maneja como una TVP."),
      mg("media", "Medias de compresión y deambulación", "clave", "Alivian y no aumentan el riesgo."),
      mg("aines-locales", "Frío local y AINE tópico", "util", "Síntomas."),
      mg("reposo", "Reposo absoluto en cama", "riesgoso", "La inmovilidad aumenta el riesgo de TVP."),
      mg("antibiotico", "Antibióticos", "innecesario", "Es inflamación por trombosis, no infección."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis venosa superficial extensa de la safena interna, cercana al cayado, sin TVP, en una mujer de 56 años con várices.",
    pathologies: [
      { name: "Trombosis venosa superficial (tromboflebitis)", role: "principal", why: "Trombo en una vena superficial con inflamación de la pared." },
      { name: "Insuficiencia venosa con várices", role: "asociada", why: "Estasis: sustrato más frecuente." },
      { name: "Trombosis venosa profunda", role: "diferencial", why: "Coexiste en hasta un 25 % de los casos." },
    ],
    reasoning: [
      "Causa: estasis en várices por bipedestación prolongada.",
      "Mecanismo: trombosis con reacción inflamatoria de la pared venosa.",
      "Consecuencia: puede progresar por el cayado al sistema profundo y embolizar.",
    ],
    epidemiology:
      "Es más frecuente que la TVP y predomina en mujeres de mediana edad con várices. Hasta un cuarto tiene TVP concomitante y cerca del 4 % hace un TEP. Sin várices, obliga a pensar en cáncer, trombofilia o embarazo.",
    management: [
      "Doppler siempre.",
      "Mayor de 5 cm: fondaparinux o HBPM profiláctica 45 días.",
      "A menos de 3 cm del cayado: anticoagulación terapéutica.",
      "Compresión, frío y deambulación.",
    ],
    sources: ["Sociedad Argentina de Flebología y Linfología — Consenso de trombosis venosa superficial.", "ESVS — Guidelines on the management of venous thrombosis."],
    pearls: ["No es una banalidad: pedí Doppler.", "Más de 5 cm: anticoagular.", "Sin várices: buscá la causa."],
    pitfalls: ["Indicar antibióticos.", "Mandar reposo."],
    tribunal: [
      qa("¿Cuándo se anticoagula una tromboflebitis superficial?", "Cuando mide 5 cm o más, o está cerca de la unión safenofemoral o safenopoplítea, con fondaparinux o HBPM por 45 días."),
      qa("¿Por qué siempre se pide Doppler?", "Porque hasta un cuarto de los pacientes tiene una TVP concomitante que cambia el tratamiento."),
      qa("¿Qué es la tromboflebitis migrans?", "Trombosis superficial recurrente en distintos sitios, asociada a cáncer, sobre todo de páncreas: signo de Trousseau."),
    ],
  },
};
