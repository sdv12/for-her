import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const desnutricionInfantil: ClinicalCase = {
  id: "desnutricion-aguda-grave-lactante",
  level: 3,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 14, ageUnit: "meses", sex: "M", context: "Paraje rural del Chaco, sin agua segura. Diarreas repetidas. Destete temprano." },
  frequency: "frecuente",
  intro: "“No crece, está flaquito, muy decaído, y hace una semana tiene diarrea.”",
  vitals: { FC: "128 lpm", FR: "34 rpm", "T°": "35,6 °C", "SatO₂": "96 %", Peso: "6,2 kg", Glucemia: "54 mg/dl" },
  anamnesis: [
    act("alimentacion", "¿Qué come? ¿Cuándo dejó la teta?", "clave", "“Mate cocido con pan; dejó a los 3 meses.”", "Aporte insuficiente."),
    act("diarreas", "¿Cuántas diarreas en el año?", "clave", "“Muchas.”", "Círculo infección-desnutrición."),
    act("social", "¿Agua, trabajo, asignaciones?", "clave", "“Agua del aljibe, changas.”", "Determinantes."),
    act("vacunas", "¿Vacunas?", "util", "“Incompletas.”", "Prevención."),
    act("tbc", "¿Tos o contacto con TBC?", "util", "“El abuelo tose.”", "Infección asociada."),
    act("hermanos", "¿Cuántos hermanos?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("antropometria", "Peso/talla y perímetro braquial", "clave", "Peso/talla menor de -3 DE; perímetro braquial de 10,8 cm.", "Desnutrición aguda grave."),
    act("emaciacion", "Aspecto, piel y edemas", "clave", "Emaciado, sin grasa, sin edemas; piel seca.", "Marasmo."),
    act("signos", "Signos de alarma", "util", "Hipotermia y letargia.", "Complicada."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia, hemograma, ionograma", "clave", "Glucemia 54; Hb 8,2; K 2,9.", "Complicaciones."),
    study("Laboratorio", "infeccion", "Orina, hemocultivo, y búsqueda de TBC", "clave", "Infección urinaria.", "Infecciones ocultas."),
    study("Otros", "vulnerabilidad", "Evaluación social", "clave", "Sin agua segura ni ingreso fijo.", "Plan al alta."),
    study("Imágenes", "tc", "TC de cerebro", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("marasmo", "Desnutrición aguda grave complicada (tipo marasmo)", true, "Peso/talla menor de -3 DE, perímetro braquial bajo, hipotermia e hipoglucemia."),
      dx("kwashiorkor", "Kwashiorkor", false, "No tiene edemas."),
      dx("celiaquia", "Enfermedad celíaca", false, "El contexto explica; se evalúa después."),
      dx("baja-talla", "Baja talla constitucional", false, "Hay emaciación."),
      dx("deshidratacion", "Deshidratación aislada", false, "Hay desnutrición."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("estabilizar", "Tratar hipoglucemia, hipotermia, infecciones y electrolitos", "clave", "Fase de estabilización."),
      mg("realimentar", "Realimentación lenta con fórmula de inicio y control de fósforo", "clave", "Evita síndrome de realimentación."),
      mg("antibiotico", "Antibióticos de amplio espectro", "clave", "Infecciones ocultas."),
      mg("social", "Trabajo social y programas alimentarios", "clave", "Determinantes."),
      mg("liquidos-rapido", "Expansión rápida con mucho volumen", "riesgoso", "Riesgo de insuficiencia cardíaca."),
      mg("hierro-temprano", "Hierro desde el primer día", "riesgoso", "Se inicia tras la estabilización."),
    ],
  },
  debrief: {
    diagnosis: "Desnutrición aguda grave complicada, tipo marasmo, con hipoglucemia, hipotermia e infección urinaria, en lactante de 14 meses.",
    pathologies: [
      { name: "Desnutrición aguda grave", role: "principal", why: "Déficit energético-proteico." },
      { name: "Infecciones y alteraciones metabólicas", role: "asociada", why: "Complicaciones." },
      { name: "Kwashiorkor, celiaquía", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: aporte insuficiente, diarreas e infecciones.",
      "Mecanismo: consumo de reservas y adaptación metabólica.",
      "Consecuencia: inmunodeficiencia, hipoglucemia, hipotermia y muerte.",
    ],
    epidemiology:
      "La desnutrición aguda persiste en zonas del norte argentino, con comunidades sin agua segura. La desnutrición crónica es más frecuente que la aguda. La OMS propone un protocolo de 10 pasos que reduce mucho la mortalidad.",
    management: [
      "Antropometría.",
      "Estabilización.",
      "Realimentación gradual.",
      "Intervención social.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de atención de la desnutrición.", "OMS — Management of Severe Acute Malnutrition."],
    pearls: ["Perímetro braquial menor de 11,5 cm.", "Hipotermia e hipoglucemia matan.", "Realimentar lento."],
    pitfalls: ["Hidratar como un eutrófico.", "Olvidar lo social."],
    tribunal: [
      qa("¿Cómo diferenciás marasmo y kwashiorkor?", "Marasmo: emaciación sin edemas. Kwashiorkor: edemas, lesiones de piel y cabello, hígado graso."),
      qa("¿Qué es el síndrome de realimentación?", "Hipofosfatemia, hipopotasemia e hipomagnesemia al reiniciar la ingesta, con falla cardíaca."),
      qa("¿Qué indicador antropométrico refleja desnutrición crónica?", "La talla para la edad baja."),
    ],
  },
};
