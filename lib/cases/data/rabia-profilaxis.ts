import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const rabiaProfilaxis: ClinicalCase = {
  id: "rabia-profilaxis-murcielago",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Vive en una casa con techo de tejas en Córdoba capital. Anoche encontró un murciélago en el dormitorio." },
  frequency: "poco-frecuente",
  intro: "“Me desperté y había un murciélago volando en la pieza. Lo saqué con una toalla y me parece que me rozó la mano.”",
  vitals: { TA: "122/76 mmHg", FC: "84 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("contacto", "¿Hubo mordedura, rasguño o contacto con saliva?", "clave", "“No estoy segura, me tocó la mano.”", "Con murciélago, cualquier contacto cuenta."),
    act("animal", "¿Dónde está el murciélago?", "clave", "“Lo tiene mi marido en una caja.”", "Se puede estudiar."),
    act("vacuna", "¿Recibió vacuna antirrábica antes?", "clave", "“Nunca.”", "Define el esquema."),
    act("otros", "¿Alguien más durmió en la pieza?", "util", "“Mi hijo de 4 años.”", "Exposición posible en dormidos y niños."),
    act("inmuno", "¿Toma algo que baje las defensas?", "util", "“No.”", "Respuesta a la vacuna."),
    act("mascotas", "¿Tiene perros o gatos?", "neutro", "“Un gato vacunado.”", "No orienta directamente."),
  ],
  exam: [
    act("herida", "Examen de manos y cara", "clave", "Dos marcas puntiformes muy pequeñas en el dorso de la mano.", "Mordedura posible."),
    act("hijo", "Examen del hijo", "clave", "Sin lesiones visibles.", "Igual expuesto si dormía."),
    act("general", "Examen general", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Otros", "animal-lab", "Enviar el murciélago a Zoonosis para estudio de rabia", "clave", "Positivo para virus rábico.", "Confirma la exposición."),
    study("Otros", "notificacion", "Notificación a epidemiología", "clave", "Notificado.", "Obligatoria."),
    study("Laboratorio", "lab", "Hemograma", "innecesario", "No se realizó.", "No aporta."),
    study("Otros", "serologia-paciente", "Serología de rabia en la paciente para decidir", "innecesario", "No se realizó.", "No sirve para decidir la profilaxis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("exposicion", "Exposición grave a rabia por murciélago (categoría III) en la madre y su hijo", true, "Contacto con murciélago, marcas en la mano, niño dormido en la habitación y murciélago positivo."),
      dx("sin-riesgo", "Contacto sin riesgo", false, "Con murciélagos toda exposición es grave."),
      dx("categoria-ii", "Exposición leve que solo requiere vacuna diferida", false, "Murciélago positivo y mordedura posible."),
      dx("rabia-clinica", "Rabia clínica", false, "No tiene síntomas."),
      dx("histoplasmosis", "Riesgo de histoplasmosis", false, "No es la preocupación principal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lavado", "Lavado de la herida con agua y jabón por 15 minutos", "clave", "Reduce la carga viral."),
      mg("vacuna", "Vacuna antirrábica a madre e hijo", "clave", "Profilaxis postexposición."),
      mg("gammaglobulina", "Gammaglobulina antirrábica infiltrada en la herida", "clave", "Exposición grave sin vacunación previa."),
      mg("antitetanica", "Verificar vacuna antitetánica", "util", "Herida."),
      mg("esperar", "Esperar síntomas para vacunar", "riesgoso", "La rabia clínica es casi siempre mortal."),
      mg("sutura", "Suturar la herida primero", "riesgoso", "Favorece la inoculación."),
    ],
  },
  debrief: {
    diagnosis: "Exposición grave a rabia por murciélago positivo, en mujer de 38 años y su hijo de 4 años, con profilaxis postexposición completa.",
    pathologies: [
      { name: "Exposición a rabia", role: "principal", why: "Murciélago positivo." },
      { name: "Exposición del niño", role: "asociada", why: "Dormía en la habitación." },
      { name: "Contacto sin riesgo", role: "diferencial", why: "Error frecuente." },
    ],
    reasoning: [
      "Causa: murciélago insectívoro con virus rábico.",
      "Mecanismo: la saliva entra por mordeduras mínimas, muchas veces imperceptibles.",
      "Consecuencia: encefalitis mortal si no se hace profilaxis antes de los síntomas.",
    ],
    epidemiology:
      "En Argentina los murciélagos son hoy la principal fuente de rabia en ciudades, incluida Córdoba. Las mordeduras pueden pasar inadvertidas. Encontrar un murciélago en una habitación con alguien dormido o con un niño se considera exposición.",
    management: [
      "Lavar.",
      "Vacuna.",
      "Gammaglobulina.",
      "Estudiar el animal y notificar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la prevención, vigilancia y control de la rabia.", "OMS — Rabies Vaccines Position Paper."],
    pearls: ["Murciélago: siempre exposición grave.", "Dormidos y niños también.", "La rabia es prevenible, no curable."],
    pitfalls: ["Subestimar el roce.", "Esperar síntomas."],
    tribunal: [
      qa("¿Qué categorías de exposición hay?", "I: tocar sin lesión; II: mordisco leve sin sangrado; III: mordedura transdérmica, saliva en mucosas o murciélagos."),
      qa("¿Qué se hace con un perro que mordió?", "Observación por 10 días; si enferma o muere, vacunar."),
      qa("¿Qué es la hidrofobia?", "Espasmo laríngeo doloroso al intentar tragar, típico de la rabia furiosa."),
    ],
  },
};
