import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pieDiabetico: ClinicalCase = {
  id: "pie-diabetico-infectado",
  level: 2,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Diabético tipo 2 hace 18 años, mal controlado. Fuma." },
  frequency: "frecuente",
  intro: "“Tengo una herida en la planta del pie hace un mes que no me duele, pero ahora está hinchado, rojo y sale pus con mal olor.”",
  vitals: { TA: "138/84 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "37,8 °C", Glucemia: "312 mg/dl" },
  anamnesis: [
    act("dolor", "¿Le duele la herida?", "clave", "“No, por eso no le di importancia.”", "La ausencia de dolor por neuropatía explica que la úlcera avance sin consultar."),
    act("como", "¿Cómo empezó?", "util", "“Una ampolla por un zapato nuevo.”", "El calzado inadecuado es un desencadenante frecuente."),
    act("claudicacion", "¿Le duelen las pantorrillas al caminar y se le pasa al parar?", "clave", "“Sí, a las dos cuadras.”", "Claudicación intermitente: enfermedad arterial periférica, que dificulta la cicatrización."),
    act("glucemia", "¿Cómo controla la diabetes?", "util", "“Tomo las pastillas cuando me acuerdo.”", "El mal control favorece la infección y retrasa la curación."),
    act("previas", "¿Tuvo amputaciones o úlceras antes?", "util", "“Una úlcera hace dos años.”", "Una úlcera previa es el mayor predictor de nuevas úlceras."),
    act("fiebre", "¿Tuvo fiebre o escalofríos?", "clave", "“Escalofríos anoche.”", "Signos sistémicos de infección: gravedad."),
    act("tv", "¿Qué le gusta mirar?", "neutro", "“Fútbol.”", "No orienta."),
  ],
  exam: [
    act("ulcera", "Inspección de la úlcera", "clave", "Úlcera de 3 cm en la cabeza del 1.er metatarsiano, con secreción purulenta, celulitis de 3 cm alrededor y mal olor.", "Infección moderada (celulitis mayor de 2 cm)."),
    act("sonda", "Prueba de sonda a hueso", "clave", "Se toca hueso con un estilete estéril.", "Sugiere osteomielitis."),
    act("pulsos", "Pulsos pedios y tibiales posteriores", "clave", "Pedio débil, tibial posterior ausente; índice tobillo-brazo 0,6.", "Isquemia moderada: requiere evaluación vascular."),
    act("monofilamento", "Monofilamento", "util", "No percibe en la planta.", "Neuropatía sensitiva."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía del pie", "clave", "Erosión cortical de la cabeza del 1.er metatarsiano.", "Apoya osteomielitis."),
    study("Microbiología", "cultivo", "Cultivo de tejido profundo (curetaje o biopsia ósea)", "clave", "S. aureus y enterobacterias.", "El cultivo profundo guía el antibiótico."),
    study("Microbiología", "hisopado", "Hisopado superficial de la úlcera", "innecesario", "Flora mixta.", "Refleja colonización, no la infección profunda."),
    study("Laboratorio", "lab", "Hemograma, PCR, eritrosedimentación, función renal, HbA1c", "util", "Leucocitos 13.000, ERS 85, HbA1c 10,8 %.", "La eritrosedimentación alta apoya osteomielitis."),
    study("Imágenes", "doppler", "Ecodoppler arterial", "util", "Estenosis tibial significativa.", "Planifica la revascularización."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pie", "Pie diabético neuroisquémico con infección moderada y osteomielitis del 1.er metatarsiano", true, "Úlcera neuropática plantar infectada con celulitis, sonda a hueso positiva, erosión ósea e isquemia por enfermedad arterial."),
      dx("celulitis", "Celulitis simple", false, "Hay úlcera profunda con hueso expuesto."),
      dx("charcot", "Pie de Charcot", false, "Pie caliente, deformado, sin úlcera infectada."),
      dx("gota", "Gota", false, "Inflamación articular sin úlcera ni pus."),
      dx("isquemia-critica", "Isquemia crítica sin infección", false, "Hay pus y celulitis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación, antibiótico endovenoso de amplio espectro y ajuste según cultivo", "clave", "Infección moderada con osteomielitis e isquemia."),
      mg("desbridamiento", "Desbridamiento quirúrgico del tejido necrótico y del hueso infectado", "clave", "Sin retirar el tejido infectado no hay curación."),
      mg("descarga", "Descarga del pie (no apoyar)", "clave", "La presión impide la cicatrización."),
      mg("vascular", "Evaluación por cirugía vascular para revascularizar", "clave", "Sin flujo no cicatriza."),
      mg("glucemia", "Control glucémico con insulina y dejar de fumar", "util", "Mejora la respuesta a la infección y la cicatrización."),
      mg("pomada", "Curaciones en casa con pomada antibiótica", "riesgoso", "Insuficiente: riesgo de progresión y amputación mayor."),
      mg("amputar", "Amputación mayor de entrada", "innecesario", "Primero se intenta salvar el miembro con desbridamiento, antibióticos y revascularización."),
    ],
  },
  debrief: {
    diagnosis: "Pie diabético neuroisquémico con infección moderada y osteomielitis del primer metatarsiano, en diabético mal controlado y fumador.",
    pathologies: [
      { name: "Pie diabético infectado", role: "principal", why: "Úlcera neuropática con infección." },
      { name: "Osteomielitis", role: "asociada", why: "Sonda a hueso y erosión radiológica." },
      { name: "Enfermedad arterial periférica", role: "asociada", why: "Isquemia que impide cicatrizar." },
      { name: "Pie de Charcot", role: "diferencial", why: "Otra complicación del pie diabético." },
    ],
    reasoning: [
      "Causa: neuropatía diabética (pérdida de sensibilidad), enfermedad arterial periférica y deformidades, más un traumatismo (calzado).",
      "Mecanismo: la falta de dolor permite que la lesión progrese; la isquemia y la hiperglucemia alteran la cicatrización y la defensa contra las bacterias.",
      "Consecuencia: úlcera crónica que se infecta, puede llegar al hueso (osteomielitis) y terminar en amputación.",
    ],
    epidemiology:
      "Hasta un cuarto de las personas con diabetes tendrá una úlcera en el pie, y el pie diabético es la primera causa de amputación no traumática. Es más frecuente en varones, fumadores, con diabetes de larga evolución y mal control.",
    management: [
      "Clasificar la úlcera (profundidad, infección, isquemia).",
      "Infección: antibiótico según gravedad y cultivo profundo; desbridamiento.",
      "Descarga, curaciones y revascularización si hay isquemia.",
      "Control glucémico y de factores de riesgo.",
      "Prevención: examen anual de pies, educación, calzado adecuado.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Consenso de pie diabético.", "Grupo de Trabajo Internacional sobre Pie Diabético (IWGDF)."],
    pearls: ["Sonda a hueso positiva = pensar en osteomielitis.", "El hisopado superficial no sirve.", "Sin flujo no cicatriza."],
    pitfalls: ["Tratar con pomadas en casa.", "No evaluar los pulsos."],
    tribunal: [
      qa("¿Qué factores producen el pie diabético?", "Neuropatía (sensitiva, motora con deformidades y autonómica con piel seca), enfermedad arterial periférica, traumatismos e infección."),
      qa("¿Qué es el índice tobillo-brazo?", "La relación entre la presión sistólica del tobillo y la del brazo: normal 0,9–1,3; menor de 0,9 indica enfermedad arterial; mayor de 1,3 indica arterias calcificadas no compresibles (frecuente en diabéticos)."),
      qa("¿Qué cuidados de prevención se enseñan?", "Inspección diaria de los pies, higiene y secado entre los dedos, no caminar descalzo, calzado adecuado, corte recto de uñas, no usar callicidas y consultar ante cualquier lesión."),
    ],
  },
};
