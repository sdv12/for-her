import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoglucemiaAlcohol: ClinicalCase = {
  id: "hipoglucemia-alcoholica",
  level: 2,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 47, ageUnit: "años", sex: "M", context: "Vive en situación de calle. Lo trae la ambulancia desde una plaza en julio." },
  frequency: "frecuente",
  intro: "“Lo encontramos tirado, con olor a alcohol, casi no responde.” (relatan los paramédicos)",
  vitals: { TA: "102/64 mmHg", FC: "104 lpm", FR: "14 rpm", "T°": "34,9 °C", Glucemia: "34 mg/dl", Glasgow: "9/15" },
  anamnesis: [
    act("glucemia-primero", "Medir glucemia capilar de inmediato a todo paciente con alteración de conciencia", "clave", "34 mg/dl.", "La hipoglucemia es una causa tratable que se descarta en segundos."),
    act("ingesta", "Preguntar a acompañantes: ¿qué tomó y cuándo comió?", "clave", "“Toma vino todo el día; hace días que no come.”", "El alcohol con ayuno inhibe la gluconeogénesis y produce hipoglucemia."),
    act("golpe", "¿Se golpeó la cabeza?", "clave", "“Tiene un raspón en la frente.”", "Riesgo de hematoma subdural."),
    act("farmacos", "¿Toma medicación o insulina?", "util", "No se sabe.", "Otras causas de hipoglucemia."),
    act("convulsion", "¿Convulsionó?", "util", "No vieron.", "Complicaciones."),
    act("nombre", "¿Cómo se llama?", "neutro", "Documento: Ramón.", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico y pupilas", "clave", "Somnoliento, sin foco, pupilas reactivas.", "Sin signos focales."),
    act("temperatura", "Temperatura central", "clave", "34,9 °C.", "Hipotermia: frecuente en alcohol, frío y calle."),
    act("cabeza", "Cabeza", "util", "Excoriación frontal, sin hundimiento.", "Lesión menor."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, magnesio, fósforo, gases, lactato, alcoholemia", "clave", "Alcoholemia 2,4 g/l, Mg bajo, acidosis leve.", "Alteraciones frecuentes en el alcoholismo."),
    study("Imágenes", "tc", "Tomografía de cerebro si no recupera la conciencia tras corregir glucosa o hay signos de trauma", "util", "Sin lesiones.", "Descarta hematoma."),
    study("Laboratorio", "esperar-lab", "Esperar el laboratorio central antes de dar glucosa", "riesgoso", "No se realizó.", "La hipoglucemia daña el cerebro en minutos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipoglucemia", "Hipoglucemia grave inducida por alcohol con ayuno, con intoxicación alcohólica e hipotermia", true, "Glucemia de 34 con alteración de conciencia en un bebedor sin ingesta de alimentos, con alcoholemia alta e hipotermia."),
      dx("intoxicacion-sola", "Solo intoxicación alcohólica", false, "La glucemia de 34 explica gran parte del cuadro y es tratable."),
      dx("hematoma", "Hematoma subdural", false, "Se descarta con la tomografía y la mejoría tras la glucosa."),
      dx("insulina", "Hipoglucemia por insulina", false, "No usa insulina."),
      dx("wernicke", "Encefalopatía de Wernicke sola", false, "Puede coexistir, pero la glucemia baja es lo principal ahora."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tiamina", "Tiamina EV y dextrosa al 50 % (o al 10 %) EV de inmediato", "clave", "La glucosa salva el cerebro; la tiamina previene el Wernicke en alcohólicos."),
      mg("glucosa-infusion", "Infusión de dextrosa y controles de glucemia frecuentes", "clave", "Sin depósitos de glucógeno, la hipoglucemia recurre."),
      mg("recalentar", "Recalentamiento pasivo y activo externo", "clave", "Hipotermia."),
      mg("social", "Articular con servicio social y salud mental antes del alta", "util", "Situación de calle y consumo."),
      mg("glucagon", "Glucagón IM como única medida", "riesgoso", "No funciona sin depósitos de glucógeno (ayuno y alcohol)."),
      mg("dormir", "Dejarlo dormir “la borrachera”", "riesgoso", "Omite una causa grave y tratable."),
    ],
  },
  debrief: {
    diagnosis: "Hipoglucemia grave inducida por alcohol con ayuno prolongado, intoxicación alcohólica e hipotermia, en varón de 47 años en situación de calle.",
    pathologies: [
      { name: "Hipoglucemia alcohólica", role: "principal", why: "Glucemia de 34 con alteración neurológica." },
      { name: "Intoxicación alcohólica e hipotermia", role: "asociada", why: "Contexto." },
      { name: "Hematoma subdural, Wernicke", role: "diferencial", why: "Se evalúan." },
    ],
    reasoning: [
      "Causa: alcohol con ayuno prolongado.",
      "Mecanismo: el metabolismo del alcohol consume NAD+ y bloquea la gluconeogénesis; sin glucógeno por el ayuno, no hay producción de glucosa.",
      "Consecuencia: hipoglucemia con alteración de conciencia, convulsiones, daño cerebral y muerte; agravada por hipotermia.",
    ],
    epidemiology:
      "El consumo problemático de alcohol es frecuente en Argentina, más en varones. Las personas en situación de calle tienen muy alto riesgo de hipoglucemia, hipotermia, traumatismos e infecciones, sobre todo en invierno.",
    management: [
      "Glucemia capilar en toda alteración de conciencia.",
      "Tiamina y glucosa EV; infusión posterior.",
      "Buscar trauma, hipotermia y otras causas.",
      "Abordaje social y del consumo.",
    ],
    sources: ["Sociedad Argentina de Toxicología — Recomendaciones sobre intoxicación alcohólica.", "Ley 26.657 de Salud Mental (consumos problemáticos)."],
    pearls: ["Glucemia capilar siempre.", "Tiamina + glucosa en alcohólicos.", "El glucagón no sirve sin glucógeno."],
    pitfalls: ["Asumir que es solo alcohol.", "Dejarlo dormir."],
    tribunal: [
      qa("¿Qué es la tríada de Whipple?", "Síntomas de hipoglucemia, glucemia baja documentada y mejoría al corregirla; confirma una hipoglucemia verdadera."),
      qa("¿Cómo se clasifica la hipotermia?", "Leve 32–35 °C (temblor, confusión), moderada 28–32 °C (sin temblor, bradicardia, somnolencia) y grave menor de 28 °C (coma, arritmias); se mide con termómetro central."),
      qa("¿Qué causas de coma se descartan primero?", "Hipoglucemia, hipoxia, intoxicaciones (opioides: naloxona), hipotermia o hipertermia, trauma craneal, ACV, infecciones del SNC y convulsiones; se recuerdan con mnemotecnias como AEIOU-TIPS."),
    ],
  },
};
