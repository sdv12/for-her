import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipocalcemiaPostiroidectomia: ClinicalCase = {
  id: "hipocalcemia-postiroidectomia",
  level: 2,
  area: "Endocrinología",
  setting: "Internación",
  patient: { age: 44, ageUnit: "años", sex: "F", context: "Tiroidectomía total por bocio hace 30 horas." },
  frequency: "frecuente",
  intro: "“Siento hormigueo alrededor de la boca y en los dedos, y se me acalambran las manos.”",
  vitals: { TA: "124/78 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("cirugia", "¿Qué cirugía y cuándo?", "clave", "“Tiroidectomía total ayer.”", "Lesión de paratiroides."),
    act("sintomas", "¿Hormigueos, calambres, convulsiones?", "clave", "“Hormigueos y calambres.”", "Hipocalcemia."),
    act("respiracion", "¿Falta de aire o voz ronca?", "clave", "“Algo ronca.”", "Laringoespasmo o recurrente."),
    act("palpitaciones", "¿Palpitaciones?", "util", "“No.”", "Arritmias."),
    act("farmacos", "¿Toma diuréticos o bifosfonatos?", "util", "“No.”", "Otras causas."),
    act("familia", "¿Quién la acompaña?", "neutro", "“Mi hermana.”", "No orienta."),
  ],
  exam: [
    act("chvostek", "Signo de Chvostek", "clave", "Positivo.", "Hiperexcitabilidad."),
    act("trousseau", "Signo de Trousseau", "clave", "Positivo.", "Hipocalcemia."),
    act("herida", "Herida y vía aérea", "util", "Sin hematoma; sin estridor.", "Complicaciones."),
  ],
  studies: [
    study("Laboratorio", "calcio", "Calcio total y iónico, albúmina, magnesio, fósforo, PTH", "clave", "Calcio 6,9; iónico bajo; PTH baja; fósforo alto.", "Hipoparatiroidismo."),
    study("Electrofisiología", "ecg", "ECG", "clave", "QT prolongado.", "Riesgo."),
    study("Laboratorio", "mg", "Magnesio", "util", "Normal.", "Corregir si está bajo."),
    study("Imágenes", "tc", "TC de cuello", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipopara", "Hipocalcemia sintomática por hipoparatiroidismo posquirúrgico", true, "Tiroidectomía, Chvostek y Trousseau, calcio bajo y PTH baja."),
      dx("ansiedad", "Hiperventilación por ansiedad", false, "Calcio bajo objetivo."),
      dx("hipomagnesemia", "Hipomagnesemia aislada", false, "Magnesio normal."),
      dx("hueso-hambriento", "Síndrome de hueso hambriento", false, "Es tras paratiroidectomía con PTH alta previa."),
      dx("lesion-recurrente", "Lesión del recurrente aislada", false, "No explica la tetania."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("gluconato", "Gluconato de calcio EV lento con monitor", "clave", "Síntomas y QT largo."),
      mg("oral", "Calcio oral y calcitriol", "clave", "Mantenimiento."),
      mg("controles", "Calcio seriado", "clave", "Ajuste."),
      mg("magnesio", "Corregir magnesio si baja", "util", "Necesario."),
      mg("bolo-rapido", "Bolo rápido sin diluir", "riesgoso", "Arritmias y necrosis."),
      mg("alta", "Alta sin calcio", "riesgoso", "Riesgo de tetania y convulsiones."),
    ],
  },
  debrief: {
    diagnosis: "Hipocalcemia sintomática por hipoparatiroidismo posquirúrgico tras tiroidectomía total, en mujer de 44 años.",
    pathologies: [
      { name: "Hipoparatiroidismo posquirúrgico", role: "principal", why: "Lesión de paratiroides." },
      { name: "QT prolongado", role: "asociada", why: "Riesgo arrítmico." },
      { name: "Ansiedad, hipomagnesemia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: daño o extirpación de paratiroides.",
      "Mecanismo: sin PTH baja el calcio y sube el fósforo.",
      "Consecuencia: tetania, convulsiones, laringoespasmo y arritmias.",
    ],
    epidemiology:
      "Es la complicación más frecuente de la tiroidectomía total, en general transitoria. Una parte queda con hipoparatiroidismo permanente. Se controla el calcio en las primeras 24 a 48 horas.",
    management: [
      "Calcio y PTH.",
      "Calcio EV si hay síntomas.",
      "Calcio oral y calcitriol.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipoparatiroidismo.", "European Society of Endocrinology — Chronic Hypoparathyroidism Guideline."],
    pearls: ["Hormigueo peribucal tras tiroidectomía.", "Chvostek y Trousseau.", "Corregir magnesio."],
    pitfalls: ["Bolo rápido.", "Alta sin controles."],
    tribunal: [
      qa("¿Cómo se corrige el calcio por albúmina?", "Calcio medido más 0,8 por cada gramo de albúmina debajo de 4."),
      qa("¿Qué es el signo de Chvostek?", "Contracción facial al percutir el nervio facial delante del oído."),
      qa("¿Qué otras complicaciones tiene la tiroidectomía?", "Lesión del nervio laríngeo recurrente y hematoma cervical con compromiso de vía aérea."),
    ],
  },
};
