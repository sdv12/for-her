import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeRealimentacion: ClinicalCase = {
  id: "sindrome-realimentacion",
  level: 4,
  area: "Endocrinología",
  setting: "Internación",
  patient: { age: 64, ageUnit: "años", sex: "M", context: "Alcohólico, vive solo. Internado hace 3 días por desnutrición grave: comió casi nada por 3 semanas. Empezaron nutrición enteral completa el primer día." },
  frequency: "poco-frecuente",
  intro: "La enfermera: “Está confuso, le tiembla todo y tiene los pies hinchados. Ayer estaba bien.”",
  vitals: { TA: "100/60 mmHg", FC: "118 lpm irregular", FR: "26 rpm", "SatO₂": "92 %", "T°": "36,4 °C" },
  anamnesis: [
    act("alimentacion", "¿Cuánto se le está dando por la sonda y desde cuándo?", "clave", "Plan completo de 2.200 kcal/día desde el ingreso.", "Aporte pleno de entrada en un desnutrido grave: el error clásico."),
    act("ayuno", "¿Cuánto tiempo estuvo sin comer?", "clave", "Más de 10 días con ingesta mínima.", "Criterio de alto riesgo de realimentación."),
    act("alcohol", "¿Consumo de alcohol?", "clave", "Un litro de vino diario.", "Déficit de tiamina, fósforo y magnesio previos."),
    act("tiamina", "¿Recibió tiamina antes de empezar la comida?", "clave", "No figura en las indicaciones.", "Riesgo de Wernicke al dar hidratos."),
    act("diuresis", "¿Cuánto orina?", "util", "Disminuyó.", "Retención de sodio y agua."),
    act("familia", "¿Tiene familia?", "neutro", "Una hermana en Mendoza.", "Social."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Confuso, temblor, debilidad generalizada, nistagmo horizontal.", "Hipofosfatemia y posible Wernicke."),
    act("cardio", "Cardiovascular", "clave", "Taquicardia irregular, ingurgitación yugular, edemas en piernas.", "Insuficiencia cardíaca por sobrecarga y déficit de fósforo."),
    act("respiratorio", "Respiratorio", "util", "Respiración superficial, crepitantes bibasales.", "Debilidad diafragmática y congestión."),
  ],
  studies: [
    study("Laboratorio", "fosforo", "Fósforo, magnesio y potasio", "clave", "Fósforo 0,9 mg/dl, magnesio 1,1 mg/dl, potasio 2,8 mEq/l.", "La tríada del síndrome de realimentación."),
    study("Laboratorio", "glucemia", "Glucemia y sodio", "util", "Glucemia 180 mg/dl, sodio 134 mEq/l.", "Hiperglucemia por la carga de hidratos."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Extrasístoles ventriculares frecuentes, QT largo, ondas U.", "Riesgo arrítmico."),
    study("Laboratorio", "cpk", "CPK", "util", "Elevada.", "Rabdomiólisis por hipofosfatemia."),
    study("Imágenes", "tac-cerebro", "TC de cerebro urgente como primer paso", "innecesario", "No se pidió de entrada.", "El cuadro tiene una causa metabólica clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("realimentacion", "Síndrome de realimentación con hipofosfatemia, hipopotasemia e hipomagnesemia graves", true, "Desnutrido alcohólico realimentado al 100 % que en 72 horas hace confusión, insuficiencia cardíaca, arritmias y caída de fósforo, potasio y magnesio."),
      dx("abstinencia", "Síndrome de abstinencia alcohólica", false, "Puede coexistir, pero no explica la caída de electrolitos ni la falla cardíaca."),
      dx("sepsis", "Sepsis", false, "Sin fiebre ni foco."),
      dx("ic-chagas", "Insuficiencia cardíaca por miocardiopatía", false, "Apareció con la realimentación y el fósforo bajo."),
      dx("hepatica", "Encefalopatía hepática", false, "Sin hepatopatía descompensada conocida."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reducir", "Bajar el aporte calórico a 10 kcal/kg/día y subir de a poco en 4–7 días", "clave", "Realimentar lento."),
      mg("reponer", "Reponer fósforo, potasio y magnesio por vía endovenosa", "clave", "Corrige la causa del daño."),
      mg("tiamina", "Tiamina endovenosa antes de los hidratos", "clave", "Previene o trata Wernicke."),
      mg("monitoreo", "Monitoreo cardíaco y electrolitos diarios", "clave", "Arritmias y descensos."),
      mg("liquidos", "Restringir sodio y líquidos y dar diurético con cautela", "util", "Sobrecarga."),
      mg("aumentar", "Aumentar las calorías para que se recupere más rápido", "riesgoso", "Empeora el cuadro."),
      mg("dextrosa", "Dextrosa al 10 % sin tiamina para la confusión", "riesgoso", "Puede precipitar o empeorar un Wernicke."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de realimentación con hipofosfatemia grave, hipopotasemia, hipomagnesemia e insuficiencia cardíaca, en un hombre alcohólico de 64 años desnutrido.",
    pathologies: [
      { name: "Síndrome de realimentación", role: "principal", why: "Cambio brusco de catabolismo a anabolismo." },
      { name: "Desnutrición grave y alcoholismo", role: "asociada", why: "Depleción previa de fósforo, magnesio y tiamina." },
      { name: "Encefalopatía de Wernicke", role: "diferencial", why: "Puede superponerse." },
    ],
    reasoning: [
      "Causa: aporte calórico pleno en un organismo depletado.",
      "Mecanismo: la insulina mete fósforo, potasio y magnesio en la célula y consume tiamina.",
      "Consecuencia: arritmias, falla cardíaca y respiratoria, rabdomiólisis, convulsiones y muerte.",
    ],
    epidemiology:
      "Aparece en los primeros 2 a 5 días de la realimentación. Los grupos de riesgo son personas con alcoholismo, anorexia nerviosa, cáncer, ayuno prolongado, posoperatorios y adultos mayores desnutridos. Es frecuente y prevenible en salas de clínica.",
    management: [
      "Identificar el riesgo.",
      "Tiamina antes de alimentar.",
      "Empezar con 10 kcal/kg/día y subir lento.",
      "Medir y reponer fósforo, potasio y magnesio a diario.",
    ],
    sources: ["Sociedad Argentina de Nutrición — Síndrome de realimentación.", "NICE — Nutrition support for adults (CG32)."],
    pearls: ["Desnutrido: empezá lento.", "Fósforo es el marcador.", "Tiamina antes que la glucosa."],
    pitfalls: ["Plan completo el primer día.", "No medir fósforo."],
    tribunal: [
      qa("¿Qué es el síndrome de realimentación?", "El conjunto de alteraciones electrolíticas y de líquidos que aparece al alimentar a una persona desnutrida, con hipofosfatemia como marca."),
      qa("¿Quiénes tienen alto riesgo de realimentación?", "IMC menor de 16, pérdida de peso mayor del 15 %, ingesta mínima por más de 10 días, electrolitos bajos previos, alcoholismo o anorexia."),
      qa("¿Por qué cae el fósforo?", "Porque la insulina estimula la síntesis de ATP y glucógeno que lo consumen y lo mete en la célula."),
    ],
  },
};
