import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dislipemia: ClinicalCase = {
  id: "dislipemia-riesgo-cardiovascular",
  level: 1,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Viene con un análisis de rutina. Posmenopáusica." },
  frequency: "muy-frecuente",
  intro: "“Me salió el colesterol alto en el análisis. Me siento bien. ¿Tengo que tomar pastillas o con la dieta alcanza?”",
  vitals: { TA: "142/88 mmHg", FC: "76 lpm", Peso: "78 kg (IMC 29)" },
  anamnesis: [
    act("cardio", "¿Tuvo infarto, ACV, angina o problemas de circulación en las piernas?", "clave", "“No.”", "Sin enfermedad cardiovascular establecida: se trata de prevención primaria."),
    act("tabaco", "¿Fuma?", "clave", "“Sí, diez por día.”", "El tabaco es un factor de riesgo mayor."),
    act("diabetes", "¿Tiene diabetes o presión alta?", "clave", "“La presión me dio alta algunas veces. Diabetes no.”", "La hipertensión suma riesgo."),
    act("familia", "¿Algún familiar tuvo infarto o ACV joven?", "clave", "“Mi hermano tuvo un infarto a los 50.”", "Antecedente familiar de enfermedad coronaria prematura (varón antes de los 55)."),
    act("habitos", "¿Cómo se alimenta? ¿Hace actividad física?", "util", "“Como mucho fiambre y facturas. No camino nada.”", "Blancos del cambio de hábitos."),
    act("secundarias", "¿Tiene hipotiroidismo, problemas renales o toma corticoides?", "util", "“No que sepa.”", "Causas secundarias de dislipemia."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("ta", "Presión arterial repetida", "clave", "140/88 y 142/86 mmHg.", "Probable hipertensión: se confirma con controles."),
    act("cintura", "Perímetro de cintura", "util", "96 cm.", "Obesidad abdominal (mujer mayor de 88 cm)."),
    act("xantomas", "Buscar xantomas y arco corneal", "util", "Ausentes.", "Los xantomas tendinosos sugieren hipercolesterolemia familiar."),
    act("pulsos", "Pulsos periféricos y soplos", "util", "Normales.", "Busca enfermedad vascular periférica."),
  ],
  studies: [
    study("Laboratorio", "lipidos", "Perfil lipídico completo en ayunas", "clave", "Colesterol total 262, LDL 178, HDL 42, triglicéridos 210 mg/dl.", "El LDL es el objetivo principal del tratamiento."),
    study("Laboratorio", "otros", "Glucemia, creatinina, TSH y hepatograma", "clave", "Glucemia 104, creatinina 0,8, TSH normal, hepatograma normal.", "Descartan causas secundarias y sirven de base antes de la estatina."),
    study("Otros", "riesgo", "Calcular el riesgo cardiovascular (tablas OMS/OPS)", "clave", "Riesgo a 10 años entre 10 y 20 % (moderado-alto).", "Define la intensidad del tratamiento."),
    study("Imágenes", "cate", "Cinecoronariografía", "riesgoso", "No se realizó.", "Es invasiva y no está indicada en una persona asintomática."),
    study("Imágenes", "eco-carotidas", "Ecodoppler de vasos de cuello de rutina", "innecesario", "No se realizó.", "No se pide de rutina en la prevención primaria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dlp", "Dislipemia mixta en prevención primaria, con riesgo cardiovascular moderado-alto (tabaco, presión elevada, antecedente familiar)", true, "LDL 178 y triglicéridos altos, sin enfermedad cardiovascular, con varios factores de riesgo."),
      dx("hf", "Hipercolesterolemia familiar", false, "Requiere LDL muy alto (en general más de 190), xantomas o antecedentes familiares de colesterol muy alto."),
      dx("secundaria", "Dislipemia secundaria a hipotiroidismo", false, "La TSH es normal."),
      dx("sin-riesgo", "Colesterol alto aislado sin riesgo", false, "Tiene tabaco, presión elevada y antecedente familiar."),
      dx("coronaria", "Enfermedad coronaria establecida", false, "No hay síntomas ni eventos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("habitos", "Cambios de hábitos: dejar de fumar, dieta mediterránea, 150 minutos de actividad por semana, bajar de peso", "clave", "Reducen el riesgo global; dejar de fumar es lo que más impacta."),
      mg("estatina", "Estatina de intensidad moderada a alta", "clave", "Con riesgo moderado-alto y LDL elevado, la estatina reduce infartos y ACV."),
      mg("ta", "Confirmar y tratar la hipertensión", "clave", "El riesgo se maneja en forma global."),
      mg("control", "Control de lípidos y hepatograma a las 6–12 semanas", "util", "Evalúa la respuesta y la tolerancia."),
      mg("solo-dieta", "Solo dieta por un año y volver a medir", "innecesario", "Con este riesgo, demorar la estatina no se justifica."),
      mg("fibrato-estatina", "Fibrato más estatina de entrada", "innecesario", "Los triglicéridos de 210 no lo justifican; la combinación aumenta el riesgo de miopatía."),
    ],
  },
  debrief: {
    diagnosis: "Dislipemia mixta en prevención primaria, con riesgo cardiovascular moderado-alto por tabaquismo, presión elevada, sobrepeso y antecedente familiar.",
    pathologies: [
      { name: "Dislipemia mixta", role: "principal", why: "LDL y triglicéridos elevados." },
      { name: "Hipertensión arterial probable y tabaquismo", role: "asociada", why: "Factores de riesgo." },
      { name: "Hipercolesterolemia familiar y dislipemias secundarias", role: "diferencial", why: "Se buscan siempre." },
    ],
    reasoning: [
      "Causa: predisposición genética, dieta rica en grasas saturadas, sedentarismo, sobrepeso y menopausia.",
      "Mecanismo: el LDL se acumula en la íntima de las arterias, se oxida y es captado por macrófagos (células espumosas), iniciando la placa de ateroma.",
      "Consecuencia: aterosclerosis silenciosa que, años después, causa infarto, ACV o enfermedad arterial periférica; el riesgo depende de la suma de factores.",
    ],
    epidemiology:
      "Según la Encuesta Nacional de Factores de Riesgo, alrededor del 30 % de los adultos argentinos que se midieron tiene colesterol elevado. En las mujeres el riesgo cardiovascular aumenta después de la menopausia. Las enfermedades cardiovasculares son la primera causa de muerte en el país.",
    management: [
      "Medir lípidos y calcular el riesgo cardiovascular global.",
      "Descartar causas secundarias.",
      "Cambios de hábitos para todos.",
      "Estatinas según el riesgo y el LDL; metas más estrictas a mayor riesgo.",
      "Controlar los otros factores (tabaco, presión, glucemia).",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica de prevención cardiovascular y tablas de riesgo OMS/OPS.", "Sociedad Argentina de Cardiología — Consenso de dislipemias."],
    pearls: ["El objetivo es el riesgo global, no un número aislado.", "Dejar de fumar es la intervención más potente.", "LDL mayor de 190: pensar en hipercolesterolemia familiar."],
    pitfalls: ["Tratar solo el colesterol y no el tabaco.", "Pedir estudios invasivos en asintomáticos."],
    tribunal: [
      qa("¿Cómo se calcula el LDL con la fórmula de Friedewald?", "LDL = colesterol total − HDL − (triglicéridos/5). No es válida con triglicéridos mayores de 400 mg/dl."),
      qa("¿Qué efectos adversos tienen las estatinas?", "Mialgias (las más frecuentes), miopatía y rara vez rabdomiólisis, elevación de transaminasas y leve aumento del riesgo de diabetes; están contraindicadas en el embarazo."),
      qa("¿Qué es la hipercolesterolemia familiar?", "Una enfermedad genética (sobre todo del receptor de LDL) con LDL muy alto desde la infancia, xantomas tendinosos, arco corneal precoz y enfermedad coronaria prematura; se estudia a la familia (cascada)."),
    ],
  },
};
