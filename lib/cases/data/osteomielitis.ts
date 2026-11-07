import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const osteomielitis: ClinicalCase = {
  id: "osteomielitis-hematogena-nino",
  level: 3,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "años", sex: "M", context: "Sano. Se golpeó la pierna jugando al fútbol hace una semana. Vacunas al día." },
  frequency: "poco-frecuente",
  intro: "“Hace tres días le duele mucho la pierna abajo de la rodilla, renguea y ahora no quiere apoyar. Tiene fiebre.” (relata la madre)",
  vitals: { TA: "100/62 mmHg", FC: "122 lpm", FR: "24 rpm", "T°": "39 °C", Peso: "28 kg" },
  anamnesis: [
    act("dolor", "¿El dolor es constante? ¿Lo despierta?", "clave", "“Constante, lo despierta y no calma con ibuprofeno.”", "Dolor óseo persistente con fiebre: signo de alarma."),
    act("herida", "¿Tuvo heridas, forúnculos o impétigo?", "clave", "“Un forúnculo en el muslo hace dos semanas.”", "Posible puerta de entrada de S. aureus."),
    act("trauma", "¿Cómo fue el golpe?", "util", "“Un golpe leve.”", "El trauma leve se asocia, pero no explica la fiebre."),
    act("cadera", "¿Le duele la rodilla o la cadera al moverla?", "util", "“La rodilla la mueve bien.”", "Ayuda a distinguir de artritis séptica."),
    act("descenso", "¿Bajó de peso o tuvo moretones?", "util", "“No.”", "Orienta contra leucemia o tumor."),
    act("escuela", "¿A qué grado va?", "neutro", "“A tercero.”", "No orienta."),
  ],
  exam: [
    act("punto", "Palpación de la tibia", "clave", "Dolor puntual en metáfisis proximal de la tibia, calor y edema.", "Localización típica: metáfisis."),
    act("articulacion", "Movilidad de rodilla y cadera", "clave", "Movilidad pasiva de la rodilla conservada y sin derrame.", "Aleja la artritis séptica."),
    act("general", "Estado general y piel", "util", "Decaído, cicatriz de forúnculo.", "Compromiso sistémico."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR y eritrosedimentación", "clave", "Leucocitos 16.000, PCR 95, VSG 70.", "Inflamación; la PCR sirve para seguir la evolución."),
    study("Microbiología", "hemocultivo", "Hemocultivos antes del antibiótico", "clave", "S. aureus sensible a meticilina.", "Identifica al germen en cerca de la mitad de los casos."),
    study("Imágenes", "rmn", "Resonancia magnética de la pierna", "clave", "Edema de médula en metáfisis tibial con pequeño absceso subperióstico.", "Es el estudio más sensible y temprano."),
    study("Imágenes", "rx", "Radiografía", "util", "Normal.", "Los cambios óseos aparecen recién a los 10-14 días: normal no descarta."),
    study("Otros", "biopsia-rutina", "Biopsia ósea abierta a todos los casos antes de tratar", "innecesario", "No se realizó.", "Con hemocultivo positivo y buena respuesta no es necesaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("osteomielitis", "Osteomielitis hematógena aguda de tibia por S. aureus", true, "Fiebre, dolor metafisario puntual, inflamación, hemocultivo y resonancia compatibles."),
      dx("artritis", "Artritis séptica de rodilla", false, "La movilidad articular está conservada y no hay derrame."),
      dx("contusion", "Contusión por el golpe", false, "No explica fiebre ni reactantes tan elevados."),
      dx("leucemia", "Leucemia", false, "Puede dar dolor óseo, pero aquí no hay citopenias."),
      dx("ewing", "Sarcoma de Ewing", false, "Es un diferencial, pero la resonancia y el cultivo orientan a infección."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Antibiótico EV empírico contra S. aureus (cefazolina, o clindamicina/vancomicina según SAMR local)", "clave", "Se inicia tras los cultivos, sin demora."),
      mg("traumato", "Interconsulta con traumatología para drenar el absceso", "clave", "El absceso requiere control quirúrgico."),
      mg("seguimiento", "Pasar a vía oral según respuesta clínica y PCR; duración de 3 a 4 semanas o más", "clave", "Evita la cronicidad."),
      mg("yeso", "Reposo con férula y analgesia", "util", "Alivia el dolor y protege el hueso."),
      mg("aine", "Solo ibuprofeno y control en una semana", "riesgoso", "La demora puede dañar la fisis y cronificar."),
      mg("sin-cultivos", "Empezar antibiótico oral sin cultivos", "riesgoso", "Reduce la posibilidad de identificar el germen."),
    ],
  },
  debrief: {
    diagnosis: "Osteomielitis hematógena aguda de la metáfisis tibial proximal por S. aureus, con absceso subperióstico, en niño de 8 años.",
    pathologies: [
      { name: "Osteomielitis aguda", role: "principal", why: "Infección del hueso por vía hematógena." },
      { name: "Absceso subperióstico", role: "asociada", why: "Requiere drenaje." },
      { name: "Artritis séptica, leucemia, sarcoma de Ewing", role: "diferencial", why: "Dolor óseo con fiebre." },
    ],
    reasoning: [
      "Causa: bacteriemia, a menudo por S. aureus desde la piel.",
      "Mecanismo: la circulación metafisaria lenta facilita la colonización; el pus eleva la presión y despega el periostio.",
      "Consecuencia: necrosis ósea (secuestro), daño de la fisis, trastornos de crecimiento y cronicidad.",
    ],
    epidemiology:
      "Es más frecuente en niños, con mayor incidencia en varones y en huesos largos de los miembros inferiores. S. aureus es el germen principal a toda edad; Kingella kingae es importante en menores de 4 años. La vacunación redujo los casos por Haemophilus.",
    management: [
      "Sospecha ante fiebre y dolor óseo puntual.",
      "Hemocultivos y resonancia.",
      "Antibiótico EV y drenaje si hay absceso.",
      "Seguimiento con PCR y control de crecimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de infecciones osteoarticulares.", "Sociedad Argentina de Infectología Pediátrica — Recomendaciones."],
    pearls: ["Radiografía normal no descarta osteomielitis.", "Metáfisis: típico del niño.", "Dolor que despierta + fiebre: no es una contusión."],
    pitfalls: ["Atribuirlo al golpe.", "Dar antibióticos antes de cultivar sin motivo."],
    tribunal: [
      qa("¿Cómo se diferencia de artritis séptica?", "En la artritis séptica hay dolor intenso a la movilización de la articulación y derrame; en la osteomielitis, el dolor es metafisario y la articulación se mueve."),
      qa("¿Qué es el secuestro y el involucro?", "El secuestro es hueso necrótico separado; el involucro es hueso nuevo formado alrededor por el periostio. Son típicos de la forma crónica."),
      qa("¿Qué gérmenes afectan a pacientes con drepanocitosis?", "Salmonella es característica, además de S. aureus."),
    ],
  },
};
