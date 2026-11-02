import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const primerEpisodioPsicotico: ClinicalCase = {
  id: "primer-episodio-psicotico",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 20, ageUnit: "años", sex: "M", context: "Dejó la facultad hace unos meses. Consume marihuana a diario." },
  frequency: "poco-frecuente",
  intro: "“Hace meses está encerrado, no duerme, dice que los vecinos lo espían con cámaras y que escucha voces que lo insultan. Hoy rompió el televisor porque dice que le manda mensajes.” (relata la madre)",
  vitals: { TA: "128/80 mmHg", FC: "96 lpm", FR: "16 rpm", "T°": "36,6 °C", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("voces", "¿Escuchás voces que otros no escuchan? ¿Qué te dicen?", "clave", "“Me insultan, comentan lo que hago. Me dicen que me van a matar.”", "Alucinaciones auditivas que comentan sus actos: síntoma positivo."),
    act("ideas", "¿Sentís que alguien te quiere hacer daño o que te mandan mensajes?", "clave", "“Los vecinos y la tele. Saben lo que pienso.”", "Ideas delirantes de persecución y de referencia, difusión del pensamiento."),
    act("riesgo", "¿Pensaste en hacerte daño o en hacerle daño a alguien?", "clave", "“Si me vienen a buscar, me voy a defender.”", "Evaluar riesgo para sí y para terceros: define la urgencia y la necesidad de internación."),
    act("tiempo", "¿Desde cuándo está así?", "clave", "La madre: “Hace seis meses empezó a aislarse; las voces hace dos.”", "Pródromo con aislamiento y luego síntomas positivos."),
    act("consumo", "¿Qué consumís? ¿Cuánto?", "clave", "“Porro todos los días. Nada más.”", "El cannabis aumenta el riesgo y puede desencadenar o empeorar la psicosis."),
    act("familia", "¿Alguien en la familia tuvo un problema parecido?", "util", "La madre: “Un tío tiene esquizofrenia.”", "Antecedente familiar: mayor riesgo."),
    act("musica", "¿Qué música te gusta?", "neutro", "“Trap.”", "No orienta."),
  ],
  exam: [
    act("examen-mental", "Examen mental", "clave", "Lúcido, orientado, desconfiado, afecto aplanado, pensamiento desorganizado por momentos, alucinaciones auditivas.", "Psicosis con conciencia clara: orienta a causa primaria más que orgánica."),
    act("fisico", "Examen físico y neurológico", "clave", "Sin foco neurológico, sin signos de intoxicación aguda.", "Descarta causas orgánicas evidentes."),
    act("introspeccion", "Conciencia de enfermedad", "util", "Niega estar enfermo.", "Influye en la adherencia y en las decisiones de internación."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, glucemia, ionograma, función renal, hepática y tiroidea, VDRL y VIH", "clave", "Normales.", "Descartan causas orgánicas de psicosis."),
    study("Laboratorio", "toxicos", "Tóxicos en orina", "clave", "Positivo para cannabinoides.", "Consumo reciente."),
    study("Imágenes", "tc", "Imagen cerebral (TC o RMN) en el primer episodio", "util", "Normal.", "Se recomienda en el primer episodio para descartar lesiones."),
    study("Otros", "eeg", "Electroencefalograma de rutina", "innecesario", "No se realizó.", "Solo si hay sospecha de epilepsia o encefalitis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("psicosis", "Primer episodio psicótico (probable trastorno del espectro de la esquizofrenia), con consumo de cannabis y riesgo para terceros", true, "Alucinaciones auditivas, ideas delirantes de persecución y referencia, aislamiento y aplanamiento afectivo durante meses, con conciencia lúcida y estudios orgánicos normales."),
      dx("intoxicacion", "Intoxicación aguda por cannabis", false, "La intoxicación dura horas; esto lleva meses."),
      dx("delirium", "Delirium", false, "La conciencia y la atención están conservadas."),
      dx("mania", "Episodio maníaco con síntomas psicóticos", false, "No hay ánimo elevado ni aceleración."),
      dx("organico", "Psicosis por enfermedad médica", false, "Examen y estudios normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antipsicotico", "Antipsicótico (por ejemplo, risperidona) a dosis bajas, con control de efectos adversos", "clave", "Tratamiento de primera línea; dosis bajas en el primer episodio."),
      mg("internacion", "Evaluación interdisciplinaria; internación si hay riesgo cierto e inminente para sí o terceros (Ley 26.657)", "clave", "La internación es un recurso terapéutico excepcional y debe justificarse."),
      mg("familia", "Psicoeducación a la familia y abordaje del consumo", "clave", "Mejora la adherencia y el pronóstico."),
      mg("seguimiento", "Seguimiento en un programa de primer episodio y control metabólico", "util", "La intervención temprana mejora el pronóstico; los antipsicóticos dan aumento de peso y alteraciones metabólicas."),
      mg("policia", "Llamar a la policía y trasladarlo a una comisaría", "riesgoso", "Es una urgencia de salud: se atiende en un hospital general."),
      mg("alta-sin", "Alta sin tratamiento porque es efecto del porro", "riesgoso", "Los síntomas duran meses: requiere tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Primer episodio psicótico con síntomas positivos y negativos de seis meses de evolución, probable trastorno del espectro de la esquizofrenia, con consumo diario de cannabis y riesgo para terceros, en varón de 20 años.",
    pathologies: [
      { name: "Primer episodio psicótico", role: "principal", why: "Alucinaciones e ideas delirantes con conciencia clara." },
      { name: "Consumo problemático de cannabis", role: "asociada", why: "Factor de riesgo y de mal pronóstico." },
      { name: "Intoxicación, delirium, manía, psicosis orgánica", role: "diferencial", why: "Se descartan con la clínica y los estudios." },
    ],
    reasoning: [
      "Causa: vulnerabilidad genética y del neurodesarrollo, con factores ambientales (cannabis, estrés).",
      "Mecanismo: hiperactividad dopaminérgica en la vía mesolímbica (síntomas positivos) e hipofunción en la mesocortical (síntomas negativos y cognitivos).",
      "Consecuencia: alucinaciones, delirios, desorganización, aislamiento y deterioro funcional.",
    ],
    epidemiology:
      "La esquizofrenia afecta a alrededor del 1 % de la población; suele comenzar entre los 15 y los 30 años, antes en varones. El consumo intenso de cannabis en la adolescencia aumenta el riesgo de psicosis. La intervención temprana mejora la evolución.",
    management: [
      "Evaluación de riesgo y descarte de causas orgánicas y tóxicas.",
      "Antipsicótico a dosis bajas y abordaje psicosocial.",
      "Internación solo con riesgo cierto e inminente, en hospital general, con evaluación interdisciplinaria.",
      "Seguimiento, familia, consumo y salud física.",
    ],
    sources: ["Ley 26.657 de Salud Mental.", "Ministerio de Salud de la Nación — Lineamientos para la atención de la urgencia en salud mental."],
    pearls: ["Psicosis con conciencia clara = pensar causa primaria.", "Siempre descartar lo orgánico.", "Internar solo con riesgo cierto e inminente."],
    pitfalls: ["Atribuir todo al cannabis.", "Tratar la urgencia como un problema policial."],
    tribunal: [
      qa("¿Qué síntomas tiene la esquizofrenia?", "Positivos (alucinaciones, delirios, conducta y pensamiento desorganizados), negativos (aplanamiento afectivo, abulia, alogia, aislamiento) y cognitivos (atención, memoria, funciones ejecutivas); se requieren al menos seis meses de alteración."),
      qa("¿Qué dice la Ley 26.657 sobre la internación?", "Que es un recurso terapéutico restrictivo, debe hacerse en hospitales generales y por el menor tiempo posible; la involuntaria solo procede ante riesgo cierto e inminente para sí o terceros, con evaluación interdisciplinaria y comunicación al juez y al órgano de revisión."),
      qa("¿Qué efectos adversos tienen los antipsicóticos?", "Extrapiramidales (distonía aguda, acatisia, parkinsonismo, discinesia tardía), síndrome neuroléptico maligno, hiperprolactinemia, aumento de peso y síndrome metabólico, sedación y prolongación del QT."),
    ],
  },
};
