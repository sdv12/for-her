import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipotermia: ClinicalCase = {
  id: "hipotermia-accidental",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "M", context: "En situación de calle. Julio, noche de helada en Córdoba. Lo encontraron en una plaza." },
  frequency: "frecuente",
  intro: "Lo trae el SAME: “Estaba tirado en un banco, muy frío, confundido y casi no tiembla.”",
  vitals: { TA: "92/58 mmHg", FC: "44 lpm", FR: "10 rpm", "T°": "29,8 °C (rectal)", "SatO₂": "no capta", Glucemia: "62 mg/dl", Glasgow: "11/15" },
  anamnesis: [
    act("tiempo", "¿Cuánto tiempo estuvo afuera?", "clave", "Toda la noche, según el SAME.", "Exposición prolongada."),
    act("alcohol", "¿Consumió alcohol o drogas?", "clave", "Botella de vino vacía al lado.", "Vasodilatación y menor percepción."),
    act("trauma", "¿Hay signos de caída o golpe?", "clave", "No se observaron.", "TEC asociado."),
    act("medicacion", "¿Toma medicación?", "util", "Se desconoce.", "Sedantes."),
    act("enfermedades", "¿Diabetes o tiroides?", "util", "Se desconoce.", "Hipotiroidismo e hipoglucemia."),
    act("nombre", "¿Cómo se llama?", "neutro", "Murmura un nombre.", "No orienta."),
  ],
  exam: [
    act("temperatura", "Temperatura central", "clave", "Rectal 29,8 °C con termómetro de baja lectura.", "Hipotermia moderada."),
    act("neuro", "Conciencia y reflejos", "clave", "Somnoliento, sin temblor, pupilas lentas.", "Pérdida del temblor por debajo de 32."),
    act("piel", "Piel", "util", "Fría, sin lesiones por congelamiento.", "Base."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Bradicardia sinusal con ondas J de Osborn.", "Típico de hipotermia."),
    study("Laboratorio", "lab", "Glucemia, ionograma, CPK, gases, alcoholemia, TSH", "clave", "Glucemia 62; K 3,6; acidosis leve; alcoholemia 1,8 g/l.", "Comorbilidad."),
    study("Imágenes", "tc", "TC de cerebro si no mejora la conciencia al recalentar", "util", "Normal.", "Excluye TEC."),
    study("Otros", "movilizacion-brusca", "Movilizarlo bruscamente o colocar sonda y vías centrales en forma agresiva", "riesgoso", "No se realizó.", "Puede desencadenar fibrilación ventricular."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipotermia", "Hipotermia accidental moderada asociada a intoxicación alcohólica", true, "Exposición nocturna al frío, temperatura central de 29,8, sin temblor, bradicardia y ondas J."),
      dx("intoxicacion", "Intoxicación alcohólica sola", false, "No explica la temperatura ni las ondas J."),
      dx("mixedema", "Coma mixedematoso", false, "Hay exposición clara; igual se pide TSH."),
      dx("sepsis", "Sepsis con hipotermia", false, "Exposición al frío explica el cuadro."),
      dx("bloqueo", "Bloqueo AV", false, "Ritmo sinusal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("manipulacion", "Manipulación suave, posición horizontal y monitor", "clave", "El miocardio frío es irritable."),
      mg("recalentar", "Recalentamiento activo externo (mantas térmicas, aire caliente) y sueros tibios", "clave", "Hipotermia moderada."),
      mg("glucosa-tiamina", "Tiamina y dextrosa", "clave", "Hipoglucemia y alcohol."),
      mg("social", "Abordaje social y refugio al alta", "util", "Prevención."),
      mg("declarar-muerte", "Suspender la reanimación si entra en paro antes de recalentar", "riesgoso", "Nadie está muerto hasta estar caliente y muerto."),
      mg("friccion", "Frotar las extremidades con alcohol", "riesgoso", "Más pérdida de calor y arritmias."),
    ],
  },
  debrief: {
    diagnosis: "Hipotermia accidental moderada asociada a intoxicación alcohólica, en varón de 63 años en situación de calle.",
    pathologies: [
      { name: "Hipotermia accidental", role: "principal", why: "Temperatura central menor de 32 °C." },
      { name: "Intoxicación alcohólica e hipoglucemia", role: "asociada", why: "Factores precipitantes." },
      { name: "Coma mixedematoso, sepsis", role: "diferencial", why: "Otras causas de hipotermia." },
    ],
    reasoning: [
      "Causa: exposición al frío con alcohol y sin abrigo.",
      "Mecanismo: la pérdida de calor supera la producción; el alcohol vasodilata y suprime el temblor.",
      "Consecuencia: bradicardia, depresión neurológica y riesgo de fibrilación ventricular.",
    ],
    epidemiology:
      "En Argentina cada invierno hay muertes por hipotermia en personas en situación de calle, muchas con consumo de alcohol. También afecta a adultos mayores en viviendas sin calefacción. Se previene con refugios y operativos de invierno.",
    management: [
      "Temperatura central.",
      "Manipulación suave.",
      "Recalentar.",
      "Abordaje social.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para el invierno.", "Wilderness Medical Society — Clinical Practice Guidelines for Accidental Hypothermia."],
    pearls: ["Termómetro de baja lectura.", "Ondas de Osborn.", "Caliente y muerto."],
    pitfalls: ["Movilizar brusco.", "Suspender la RCP con el paciente frío."],
    tribunal: [
      qa("¿Cómo se clasifica la hipotermia?", "Leve de 32 a 35 °C, moderada de 28 a 32 °C y grave por debajo de 28 °C."),
      qa("¿Qué es la onda J de Osborn?", "Deflexión positiva al final del QRS, típica de la hipotermia."),
      qa("¿Cuándo se usa recalentamiento extracorpóreo?", "En hipotermia grave con inestabilidad o paro cardíaco."),
    ],
  },
};
