import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const depresionAdultoMayor: ClinicalCase = {
  id: "depresion-adulto-mayor-riesgo-suicida",
  level: 3,
  area: "Salud mental",
  setting: "Consultorio",
  patient: { age: 79, ageUnit: "años", sex: "M", context: "Viudo hace 8 meses. Vive solo en el campo. Hipertenso. Tiene una escopeta en la casa." },
  frequency: "frecuente",
  intro: "“Vine porque me insistió mi hija. No duermo, no tengo hambre, estoy cansado y me duele todo. Ya viví bastante.”",
  vitals: { TA: "138/78 mmHg", FC: "72 lpm", "T°": "36,3 °C", Peso: "62 kg" },
  anamnesis: [
    act("suicidio", "Preguntar en forma directa: ¿pensaste en quitarte la vida? ¿Tenés un plan? ¿Tenés cómo?", "clave", "“A veces pienso que sería mejor. Tengo la escopeta de cazar.”", "Preguntar no induce. Plan y medio: riesgo alto."),
    act("animo", "¿Cómo está tu ánimo, disfrutás algo?", "clave", "“No me interesa nada desde hace meses.”", "Anhedonia y ánimo bajo."),
    act("tiempo", "¿Desde cuándo, y cómo te afecta el día a día?", "clave", "“Hace 6 meses; dejé de salir y de cocinar.”", "Más allá del duelo esperable."),
    act("organico", "¿Bajaste de peso? ¿Medicación nueva? ¿Fallas de memoria?", "util", "“Bajé 6 kilos; olvido cosas.”", "Causas orgánicas y seudodemencia."),
    act("alcohol", "¿Tomás alcohol?", "util", "“Más que antes.”", "Agrava el riesgo."),
    act("caza", "¿Qué cazabas?", "neutro", "“Vizcachas.”", "No define el diagnóstico."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Enlentecido, voz baja, llanto, sin psicosis; atención conservada.", "Depresión; atención conservada aleja delirium."),
    act("cognitivo", "Prueba cognitiva breve y tamizaje de depresión", "clave", "Mini-Cog aceptable con esfuerzo; GDS-15 de 12.", "Depresión; puede simular demencia."),
    act("fisico", "Examen físico", "util", "Adelgazado, sin foco.", "Busca enfermedad física."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, TSH, B12, función renal, sodio, glucemia", "clave", "Normales.", "Se descartan causas orgánicas."),
    study("Otros", "riesgo", "Evaluación estructurada de riesgo suicida", "clave", "Riesgo alto: varón mayor, viudo, solo, plan y medio.", "Determina la conducta."),
    study("Imágenes", "tac", "TC de encéfalo", "util", "Atrofia leve.", "Si hay duda de deterioro."),
    study("Otros", "esperar", "Alta con turno en un mes sin más", "riesgoso", "No se realizó.", "El riesgo es inmediato."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("depresion", "Depresión mayor grave con riesgo suicida alto", true, "Ánimo bajo, anhedonia y síntomas por 6 meses, con plan y medio."),
      dx("duelo", "Duelo normal", false, "Interfiere mucho, con ideación suicida y anhedonia global."),
      dx("demencia", "Demencia", false, "El deterioro aparece con el ánimo y responde al esfuerzo."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("cancer", "Cáncer oculto", false, "Se evalúa, pero no explica todo el cuadro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguridad", "Plan de seguridad inmediato: no dejarlo solo, retirar el arma, avisar a la hija", "clave", "Restringir el medio salva vidas."),
      mg("psiquiatria", "Evaluación psiquiátrica urgente y considerar internación", "clave", "Riesgo alto."),
      mg("isrs", "ISRS (sertralina) en dosis bajas, control de sodio y de caídas", "clave", "Demora semanas; riesgo de hiponatremia."),
      mg("psicoterapia", "Psicoterapia, apoyo social y seguimiento cercano", "clave", "Reduce aislamiento."),
      mg("benzo", "Solo benzodiacepinas para dormir", "riesgoso", "Riesgo de caídas y no trata."),
      mg("triciclicos", "Antidepresivos tricíclicos", "riesgoso", "Letales en sobredosis, con efectos cardíacos y anticolinérgicos."),
    ],
  },
  debrief: {
    diagnosis: "Episodio depresivo mayor grave con riesgo suicida alto, en varón viudo de 79 años que vive solo.",
    pathologies: [
      { name: "Depresión mayor", role: "principal", why: "Trastorno afectivo grave." },
      { name: "Riesgo suicida", role: "asociada", why: "Emergencia." },
      { name: "Duelo, demencia, hipotiroidismo", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: pérdida, soledad, enfermedad física y vulnerabilidad biológica.",
      "Mecanismo: alteración de redes y monoaminas; aislamiento.",
      "Consecuencia: anhedonia, pérdida de peso, deterioro y suicidio.",
    ],
    epidemiology:
      "Los varones mayores tienen las tasas de suicidio más altas en muchos países, incluida Argentina, junto con jóvenes. Suelen consultar por síntomas físicos. El medio y la soledad son factores críticos. La línea 135 en CABA y GBA y los servicios de salud mental ofrecen ayuda.",
    management: [
      "Preguntar directamente.",
      "Plan de seguridad y restricción del medio.",
      "Internación según riesgo; Ley de Salud Mental.",
      "ISRS, psicoterapia y seguimiento.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos de abordaje del intento de suicidio.", "Ley Nacional de Salud Mental 26.657."],
    pearls: ["Preguntar por suicidio no lo induce.", "Hombre mayor, solo, con arma: riesgo alto.", "Síntomas físicos pueden ser depresión."],
    pitfalls: ["No preguntar.", "Normalizar: “está viejo”."],
    tribunal: [
      qa("¿Qué criterios tiene la depresión mayor?", "Cinco o más síntomas por al menos 2 semanas, con ánimo deprimido o anhedonia: SIGECAPS (sueño, interés, culpa, energía, concentración, apetito, psicomotor, suicidio)."),
      qa("¿Qué es la seudodemencia?", "Un deterioro cognitivo por depresión, de inicio más claro, con quejas sobre la memoria y que mejora con el tratamiento."),
      qa("¿Qué dice la ley sobre internar?", "La internación involuntaria se reserva para riesgo cierto e inminente, con evaluación interdisciplinaria y control judicial."),
    ],
  },
};
