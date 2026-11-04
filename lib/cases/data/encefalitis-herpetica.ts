import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const encefalitisHerpetica: ClinicalCase = {
  id: "encefalitis-herpetica",
  level: 4,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 51, ageUnit: "años", sex: "F", context: "Sana. Docente." },
  frequency: "raro",
  intro: "“Desde hace tres días tiene fiebre y dolor de cabeza. Hoy empezó a decir cosas raras, sentía olores feos que nadie sentía y tuvo una convulsión.” (relata el esposo)",
  vitals: { TA: "132/82 mmHg", FC: "108 lpm", FR: "18 rpm", "T°": "38,9 °C", "SatO₂": "96 %", Glucemia: "104 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("conducta", "¿Qué cambios de conducta notaron?", "clave", "“Está confundida, agresiva, no recuerda lo que pasó ayer.”", "Alteración de conducta y memoria: compromiso del lóbulo temporal."),
    act("olores", "¿Sintió olores raros?", "clave", "“Olor a quemado que nadie sentía.”", "Alucinaciones olfatorias: crisis del lóbulo temporal."),
    act("convulsion", "¿Cómo fue la convulsión?", "util", "“Empezó en la cara y el brazo y se generalizó.”", "Crisis focal con generalización."),
    act("viajes", "¿Viajes, picaduras de mosquitos o contacto con animales?", "util", "“No.”", "Diferenciales de encefalitis."),
    act("inmuno", "¿Toma inmunosupresores o tiene VIH?", "util", "“No.”", "Factores de riesgo de otras encefalitis."),
    act("materia", "¿Qué materia enseña?", "neutro", "“Historia.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Desorientada, afasia leve, sin signos meníngeos francos, sin foco motor.", "Encefalitis (alteración del parénquima) más que meningitis."),
    act("piel", "Piel y mucosas", "util", "Sin lesiones herpéticas.", "Su ausencia no descarta encefalitis herpética."),
    act("fondo", "Fondo de ojo", "util", "Sin edema de papila.", "Permite la punción."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia de cerebro", "clave", "Hiperintensidad en el lóbulo temporal izquierdo y la ínsula, asimétrica.", "Muy característica de encefalitis herpética."),
    study("Otros", "lcr", "Punción lumbar con PCR para virus herpes simple", "clave", "Linfocitos 120, hematíes, proteínas 90, glucosa normal; PCR VHS-1 positiva.", "Confirma."),
    study("Otros", "eeg", "Electroencefalograma", "util", "Actividad epileptiforme temporal izquierda.", "Apoya y orienta el tratamiento de las crisis."),
    study("Otros", "esperar-pcr", "Esperar la PCR para iniciar aciclovir", "riesgoso", "No se realizó.", "La demora en el aciclovir aumenta mucho la mortalidad y las secuelas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hse", "Encefalitis por virus herpes simple 1 con compromiso temporal izquierdo y crisis", true, "Fiebre, cefalea, alteración de conducta, alucinaciones olfatorias y crisis, con lesión temporal en la resonancia y PCR positiva en el LCR."),
      dx("meningitis-bacteriana", "Meningitis bacteriana", false, "El LCR es linfocitario con glucosa normal."),
      dx("psicosis", "Brote psicótico", false, "Hay fiebre, crisis y lesión cerebral."),
      dx("autoinmune", "Encefalitis autoinmune", false, "Puede parecerse, pero la PCR es positiva; puede aparecer después."),
      dx("abceso", "Absceso cerebral", false, "No hay lesión con realce en anillo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aciclovir", "Aciclovir EV 10 mg/kg cada 8 h por 14–21 días, iniciado ante la sospecha", "clave", "Reduce la mortalidad del 70 % a menos del 20 %."),
      mg("anticonvulsivante", "Antiepiléptico (levetiracetam) y tratamiento de las crisis", "clave", "Crisis frecuentes."),
      mg("uti", "Monitoreo en terapia intensiva e hidratación (cuidado renal del aciclovir)", "clave", "Riesgo de edema cerebral e insuficiencia renal."),
      mg("rehabilitacion", "Rehabilitación neurocognitiva y seguimiento", "util", "Secuelas de memoria y conducta frecuentes."),
      mg("antipsicoticos", "Antipsicóticos como tratamiento principal", "riesgoso", "Tratar como psicosis demora el aciclovir."),
      mg("corticoides", "Corticoides de rutina", "innecesario", "No tienen beneficio demostrado de rutina."),
    ],
  },
  debrief: {
    diagnosis: "Encefalitis por virus herpes simple 1 con compromiso temporal e insular izquierdo, crisis focales con generalización y alteración de conducta y memoria, en mujer de 51 años.",
    pathologies: [
      { name: "Encefalitis herpética", role: "principal", why: "Infección del parénquima cerebral por VHS-1." },
      { name: "Crisis epilépticas", role: "asociada", why: "Por compromiso temporal." },
      { name: "Meningitis bacteriana, psicosis, encefalitis autoinmune", role: "diferencial", why: "Otras causas de fiebre y alteración mental." },
    ],
    reasoning: [
      "Causa: reactivación o primoinfección del VHS-1, que llega al cerebro por vías olfatorias o trigeminales.",
      "Mecanismo: necrosis hemorrágica del lóbulo temporal y frontal orbitario.",
      "Consecuencia: fiebre, alteración de conducta, afasia, alucinaciones olfatorias, convulsiones; sin tratamiento, alta mortalidad y secuelas graves.",
    ],
    epidemiology:
      "La encefalitis herpética es la causa más frecuente de encefalitis esporádica grave en adultos, con picos en jóvenes y en mayores de 50. Es rara pero tratable; el inicio temprano del aciclovir es el principal factor pronóstico.",
    management: [
      "Sospechar ante fiebre con alteración de conducta, convulsiones o foco.",
      "Aciclovir EV inmediato, antes de los estudios.",
      "Resonancia, punción lumbar con PCR y EEG.",
      "Manejo de crisis y rehabilitación.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de encefalitis.", "Sociedad Argentina de Infectología — Recomendaciones de infecciones del sistema nervioso central."],
    pearls: ["Fiebre + conducta rara + convulsión = aciclovir ya.", "Lóbulo temporal en la resonancia.", "PCR en LCR."],
    pitfalls: ["Tratarla como psicosis.", "Esperar la PCR."],
    tribunal: [
      qa("¿Qué diferencia la encefalitis de la meningitis?", "La meningitis afecta las meninges (cefalea, rigidez de nuca, fotofobia, conciencia conservada al inicio); la encefalitis afecta el parénquima (alteración de conciencia y conducta, convulsiones, foco); a veces coexisten (meningoencefalitis)."),
      qa("¿Qué es la encefalitis autoinmune anti-NMDA?", "Una encefalitis por anticuerpos contra el receptor NMDA, más en mujeres jóvenes (a veces con teratoma de ovario), con síntomas psiquiátricos, convulsiones, movimientos anormales y disautonomía; puede aparecer después de una encefalitis herpética."),
      qa("¿Qué efecto adverso renal tiene el aciclovir?", "Puede cristalizar en los túbulos y causar insuficiencia renal aguda; se previene con hidratación y ajuste de dosis."),
    ],
  },
};
