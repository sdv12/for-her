import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const kawasakiIncompleto: ClinicalCase = {
  id: "kawasaki-incompleto-lactante",
  level: 3,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 7, ageUnit: "meses", sex: "M", context: "Seis días de fiebre. Recibió amoxicilina por una otitis sin mejoría." },
  frequency: "poco-frecuente",
  intro: "“Sigue con fiebre alta, está muy irritable y tiene los labios rojos. Ningún remedio lo calma.”",
  vitals: { FC: "168 lpm", FR: "34 rpm", "T°": "39,2 °C", "SatO₂": "98 %", Peso: "8 kg" },
  anamnesis: [
    act("fiebre", "¿Cuántos días?", "clave", "“Seis.”", "Fiebre prolongada."),
    act("signos", "¿Ojos rojos, manchas, manos hinchadas?", "clave", "“Ojos rojos sin lagañas.”", "Pocos criterios."),
    act("irritabilidad", "¿Está más irritable?", "clave", "“Muchísimo.”", "Típico en lactantes."),
    act("vacunas", "¿Vacunas?", "util", "“Al día; BCG.”", "Cicatriz BCG."),
    act("contactos", "¿Contactos enfermos?", "util", "“No.”", "Viral."),
    act("hermano", "¿Tiene hermanos?", "neutro", "“Uno.”", "No orienta."),
  ],
  exam: [
    act("ojos", "Ojos y boca", "clave", "Conjuntivitis no exudativa, labios fisurados.", "Criterios."),
    act("bcg", "Cicatriz de BCG", "clave", "Enrojecida e indurada.", "Signo útil en lactantes."),
    act("extremidades", "Manos, pies, piel y ganglios", "util", "Sin cambios ni exantema.", "Incompleto."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, VSG, albúmina, transaminasas, orina", "clave", "PCR 12; plaquetas 520.000; albúmina 2,8; piuria estéril.", "Criterios de laboratorio."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Dilatación de coronaria derecha (Z 3).", "Confirma."),
    study("Laboratorio", "cultivos", "Hemocultivo y urocultivo", "util", "Negativos.", "Excluye infecciones."),
    study("Otros", "esperar", "Esperar más criterios antes de tratar", "riesgoso", "No se realizó.", "Lactantes desarrollan aneurismas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("kawasaki", "Enfermedad de Kawasaki incompleta con dilatación coronaria", true, "Fiebre de 6 días, 2 criterios, laboratorio y eco."),
      dx("viral", "Infección viral", false, "Laboratorio y coronaria."),
      dx("escarlatina", "Escarlatina", false, "Sin exantema y no respondió a amoxicilina."),
      dx("sepsis", "Sepsis", false, "Cultivos negativos."),
      dx("adverso", "Reacción a amoxicilina", false, "No explica la coronaria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("igiv", "Inmunoglobulina EV", "clave", "Reduce aneurismas."),
      mg("aspirina", "Aspirina según protocolo", "clave", "Antiinflamatoria y antiagregante."),
      mg("eco-control", "Ecocardiograma a las 2 y 6 semanas", "clave", "Seguimiento."),
      mg("vacunas", "Diferir vacunas a virus vivos 11 meses", "util", "La inmunoglobulina las inactiva."),
      mg("esperar-mg", "Observación hasta el día 10", "riesgoso", "Más aneurismas."),
      mg("ibuprofeno", "Ibuprofeno junto con aspirina", "riesgoso", "Interfiere con el efecto antiagregante."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Kawasaki incompleta con dilatación de coronaria derecha, en lactante de 7 meses.",
    pathologies: [
      { name: "Enfermedad de Kawasaki", role: "principal", why: "Vasculitis de vasos medianos." },
      { name: "Compromiso coronario", role: "asociada", why: "Riesgo de aneurisma." },
      { name: "Viral, escarlatina, sepsis", role: "diferencial", why: "Otras fiebres." },
    ],
    reasoning: [
      "Causa: respuesta inmune a un gatillo desconocido.",
      "Mecanismo: vasculitis de arterias coronarias.",
      "Consecuencia: aneurismas, trombosis, IAM.",
    ],
    epidemiology:
      "Es la principal causa de cardiopatía adquirida en niños de países desarrollados. Los menores de un año suelen presentar formas incompletas, con más riesgo coronario. La inmunoglobulina en los primeros 10 días reduce mucho el riesgo de aneurismas.",
    management: [
      "Sospechar fiebre de 5 días o más.",
      "Laboratorio y eco.",
      "Inmunoglobulina y aspirina.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Enfermedad de Kawasaki.", "American Heart Association — Kawasaki Disease Scientific Statement."],
    pearls: ["Lactante con fiebre larga e irritable.", "BCG enrojecida.", "Eco aunque falten criterios."],
    pitfalls: ["Esperar criterios.", "Ibuprofeno."],
    tribunal: [
      qa("¿Cuáles son los criterios clásicos?", "Fiebre de 5 días o más y 4 de 5: conjuntivitis, boca, exantema, extremidades y adenopatía cervical."),
      qa("¿Qué es el síndrome de Reye?", "Encefalopatía y daño hepático por aspirina en infecciones virales como varicela o gripe."),
      qa("¿Qué laboratorio apoya Kawasaki incompleto?", "Anemia, plaquetas altas tras el día 7, albúmina baja, transaminasas altas, piuria estéril y leucocitosis."),
    ],
  },
};
