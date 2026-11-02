import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const convulsionFebrilCompleja: ClinicalCase = {
  id: "convulsion-febril-compleja",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 14, ageUnit: "meses", sex: "F", context: "Sana, vacunas completas. Hace dos días tiene fiebre y mocos." },
  frequency: "frecuente",
  intro: "“Con la fiebre empezó a mover el brazo y la pierna derecha, duró como 20 minutos. Después tuvo otra en el auto. Ahora está muy dormida.” (relatan los padres)",
  vitals: { FC: "152 lpm", FR: "34 rpm", "T°": "39,4 °C", "SatO₂": "97 %", Glucemia: "96 mg/dl", Glasgow: "12/15" },
  anamnesis: [
    act("duracion", "¿Cuánto duró y qué partes del cuerpo movió?", "clave", "“Unos 20 minutos, solo el lado derecho.”", "Más de 15 minutos y focal: criterios de convulsión febril compleja."),
    act("repeticion", "¿Cuántas tuvo?", "clave", "“Dos en una hora.”", "Recurrencia en 24 h: otro criterio de complejidad."),
    act("infeccion", "¿Qué síntomas tenía antes? ¿Vómitos, rechazo del alimento?", "clave", "“Mocos y fiebre; hoy vomitó y no quería comer.”", "Hay que descartar meningitis o encefalitis."),
    act("antibioticos", "¿Tomó antibióticos estos días?", "util", "“Sí, amoxicilina desde ayer.”", "El antibiótico previo puede enmascarar una meningitis."),
    act("familia", "¿Alguien de la familia tuvo convulsiones con fiebre?", "util", "“El papá de chico.”", "Antecedente familiar."),
    act("juguete", "¿Qué le gusta?", "neutro", "“Los bloques.”", "No orienta."),
  ],
  exam: [
    act("conciencia", "Estado de conciencia a la hora del episodio", "clave", "Somnolienta, responde al dolor, no fija la mirada.", "Recuperación lenta: obliga a descartar infección del sistema nervioso."),
    act("meningeo", "Fontanela y signos meníngeos", "clave", "Fontanela anterior abombada.", "Signo de hipertensión endocraneana o meningitis en lactantes."),
    act("piel", "Piel", "util", "Sin petequias.", "Descarta meningococcemia."),
    act("foco", "Examen neurológico", "util", "Hemiparesia derecha leve (parálisis de Todd o lesión).", "Signo focal."),
  ],
  studies: [
    study("Otros", "puncion", "Punción lumbar (tras descartar contraindicaciones)", "clave", "Líquido claro, 4 células, glucosa y proteínas normales, PCR viral negativa.", "Descarta meningitis y encefalitis."),
    study("Laboratorio", "lab", "Glucemia, ionograma, hemograma", "clave", "Normales.", "Descarta causas metabólicas."),
    study("Imágenes", "imagen", "Imagen cerebral por foco persistente", "util", "TC normal; la paresia se resolvió en 12 h.", "Paresia de Todd."),
    study("Otros", "eeg-urgencia", "EEG de urgencia como único estudio", "innecesario", "No se realizó.", "No descarta infección; se considera después."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cfc", "Convulsión febril compleja (focal, prolongada y recurrente) con parálisis de Todd, sin infección del sistema nervioso", true, "Convulsión focal de 20 minutos que se repitió, con fiebre por infección viral, punción lumbar y TC normales, y paresia transitoria."),
      dx("simple", "Convulsión febril simple", false, "La simple es generalizada, dura menos de 15 minutos y no se repite en 24 h."),
      dx("meningitis", "Meningitis bacteriana", false, "La punción lumbar es normal."),
      dx("encefalitis", "Encefalitis herpética", false, "Líquido normal y PCR negativa; recuperación completa."),
      dx("epilepsia", "Epilepsia", false, "Las crisis ocurrieron solo con fiebre; no hay crisis afebriles."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("benzo", "Benzodiacepina (midazolam bucal o nasal, o diazepam rectal) si vuelve a convulsionar más de 5 minutos", "clave", "Corta las crisis prolongadas."),
      mg("observacion", "Internación para observación hasta la recuperación completa", "clave", "Convulsión compleja con recuperación lenta."),
      mg("antitermicos", "Antitérmicos para el confort", "util", "No previenen la recurrencia, pero alivian."),
      mg("neurologia", "Seguimiento con neurología infantil", "util", "Mayor riesgo de epilepsia que la simple."),
      mg("profilaxis", "Antiepiléptico diario de por vida", "innecesario", "No se recomienda de rutina."),
      mg("bano-frio", "Baño con agua fría o alcohol", "riesgoso", "Produce escalofríos y riesgo de intoxicación por alcohol."),
    ],
  },
  debrief: {
    diagnosis: "Convulsión febril compleja (focal, de 20 minutos y recurrente en 24 h) con parálisis de Todd transitoria, en lactante de 14 meses con infección respiratoria viral, sin infección del sistema nervioso central.",
    pathologies: [
      { name: "Convulsión febril compleja", role: "principal", why: "Focal, prolongada y recurrente." },
      { name: "Parálisis de Todd", role: "asociada", why: "Déficit poscrítico transitorio." },
      { name: "Meningitis, encefalitis, epilepsia", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: predisposición genética y un cerebro inmaduro con fiebre (a menudo viral).",
      "Mecanismo: la fiebre baja el umbral convulsivo.",
      "Consecuencia: crisis que, si son complejas, obligan a descartar infección del SNC y aumentan algo el riesgo de epilepsia.",
    ],
    epidemiology:
      "Las convulsiones febriles afectan a 2–5 % de los niños entre los 6 meses y los 5 años; alrededor de un tercio son complejas. El riesgo de epilepsia posterior es mayor en las complejas que en las simples (1–2 %).",
    management: [
      "Cortar la crisis si dura más de 5 minutos.",
      "Evaluar infección del SNC (punción lumbar ante signos meníngeos, mala recuperación o antibiótico previo).",
      "Imagen si hay foco persistente.",
      "Educación a la familia y benzodiacepina de rescate.",
    ],
    sources: ["Sociedad Argentina de Neurología Infantil — Consenso de convulsiones febriles.", "Sociedad Argentina de Pediatría — Recomendaciones sobre convulsión febril."],
    pearls: ["Compleja: focal, más de 15 minutos o recurrente.", "Antibiótico previo + mala recuperación = punción.", "Antitérmicos no previenen recurrencias."],
    pitfalls: ["Tratarla como simple.", "Baños fríos."],
    tribunal: [
      qa("¿Qué es una convulsión febril simple?", "Una crisis generalizada de menos de 15 minutos, que no se repite en 24 h, en un niño de 6 meses a 5 años con fiebre, sin infección del SNC ni antecedentes neurológicos; no requiere estudios de rutina."),
      qa("¿Qué es la parálisis de Todd?", "Un déficit motor transitorio después de una crisis focal, que se resuelve en horas; si persiste, hay que buscar una lesión estructural."),
      qa("¿Qué factores aumentan la recurrencia de convulsión febril?", "Primera crisis antes de los 18 meses, antecedentes familiares, fiebre baja al convulsionar y poco tiempo entre el inicio de la fiebre y la crisis."),
    ],
  },
};
