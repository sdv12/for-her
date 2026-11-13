import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoacusiaSubita: ClinicalCase = {
  id: "hipoacusia-subita",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 46, ageUnit: "años", sex: "M", context: "Docente de música. Sano." },
  frequency: "poco-frecuente",
  intro: "“Me desperté sin escuchar del oído derecho, con un zumbido fuerte y el oído tapado.”",
  vitals: { TA: "128/80 mmHg", FC: "76 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("inicio", "¿Cuándo lo notó?", "clave", "“Hoy al despertar.”", "Instalación súbita."),
    act("asociados", "¿Mareos, dolor, secreción?", "clave", "“Algo de mareo, sin dolor ni secreción.”", "Sin otitis."),
    act("neuro", "¿Debilidad, visión doble, dificultad para hablar?", "clave", "“No.”", "Descartar ACV de fosa posterior."),
    act("resfrio", "¿Estuvo resfriado o viajó en avión?", "util", "“Resfriado la semana pasada.”", "Viral o barotrauma."),
    act("ototoxicos", "¿Tomó aminoglucósidos o aspirina en dosis altas?", "util", "“No.”", "Ototoxicidad."),
    act("instrumento", "¿Qué instrumento enseña?", "neutro", "“Guitarra.”", "No orienta."),
  ],
  exam: [
    act("otoscopia", "Otoscopia", "clave", "Conducto y tímpano normales.", "Excluye tapón y otitis."),
    act("diapason", "Weber y Rinne", "clave", "Weber lateraliza a la izquierda; Rinne positivo bilateral.", "Hipoacusia neurosensorial derecha."),
    act("neuro-ex", "Examen neurológico", "util", "Normal, sin nistagmo espontáneo.", "Sin signos centrales."),
  ],
  studies: [
    study("Otros", "audiometria", "Audiometría tonal", "clave", "Caída neurosensorial de 45 dB en tres frecuencias contiguas.", "Confirma."),
    study("Imágenes", "rm", "RM de cerebro y conductos auditivos internos", "util", "Sin schwannoma.", "Excluye tumor."),
    study("Laboratorio", "lab", "Glucemia, VDRL", "util", "Normales.", "Causas tratables."),
    study("Otros", "lavado", "Lavado de oído", "innecesario", "No se realizó.", "Conducto limpio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hns", "Hipoacusia neurosensorial súbita idiopática", true, "Pérdida de 30 dB o más en tres frecuencias en menos de 72 horas, con otoscopia normal y Weber hacia el oído sano."),
      dx("tapon", "Tapón de cerumen", false, "Otoscopia normal y patrón neurosensorial."),
      dx("otitis-serosa", "Otitis media serosa", false, "Tímpano normal y Rinne positivo."),
      dx("meniere", "Enfermedad de Ménière", false, "Primer episodio sin vértigo recurrente."),
      dx("schwannoma", "Schwannoma vestibular", false, "RM normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Corticoides orales en dosis altas lo antes posible", "clave", "Ventana terapéutica de días."),
      mg("orl", "Derivación a ORL urgente", "clave", "Seguimiento y corticoide intratimpánico si no mejora."),
      mg("audiometria-control", "Audiometría de control", "clave", "Respuesta."),
      mg("ruido", "Evitar ruido intenso", "util", "Protección."),
      mg("gotas", "Gotas óticas con antibiótico", "innecesario", "No hay otitis."),
      mg("esperar", "Esperar dos semanas a ver si vuelve", "riesgoso", "Se pierde la ventana del tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Hipoacusia neurosensorial súbita idiopática derecha, en varón de 46 años.",
    pathologies: [
      { name: "Hipoacusia neurosensorial súbita", role: "principal", why: "Urgencia otológica." },
      { name: "Acúfenos", role: "asociada", why: "Acompañan con frecuencia." },
      { name: "Tapón, otitis serosa", role: "diferencial", why: "Hipoacusias de conducción." },
    ],
    reasoning: [
      "Causa: probablemente viral, vascular o inmune.",
      "Mecanismo: daño de las células ciliadas de la cóclea.",
      "Consecuencia: pérdida auditiva que puede ser permanente.",
    ],
    epidemiology:
      "Es una urgencia otológica que se subestima a menudo como oído tapado. Cerca de la mitad recupera la audición, más si se trata en los primeros días. Los diapasones permiten distinguirla en la guardia.",
    management: [
      "Weber y Rinne.",
      "Corticoides precoces.",
      "Audiometría.",
      "RM.",
    ],
    sources: ["Federación Argentina de Sociedades de Otorrinolaringología — Hipoacusia súbita.", "AAO-HNS — Clinical Practice Guideline: Sudden Hearing Loss."],
    pearls: ["Oído tapado con tímpano normal: diapasón.", "Weber hacia el sano: neurosensorial.", "Es una urgencia."],
    pitfalls: ["Gotas y esperar.", "No pedir RM."],
    tribunal: [
      qa("¿Cómo interpretás Weber y Rinne en hipoacusia de conducción?", "Weber lateraliza al oído enfermo y Rinne es negativo en ese oído."),
      qa("¿Por qué se pide RM?", "Para descartar schwannoma vestibular u otra lesión retrococlear."),
      qa("¿Qué define la hipoacusia súbita?", "Pérdida neurosensorial de 30 dB o más en tres frecuencias contiguas en menos de 72 horas."),
    ],
  },
};
