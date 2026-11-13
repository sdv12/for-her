import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cushingIatrogenico: ClinicalCase = {
  id: "sindrome-cushing-iatrogenico",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "EPOC. Toma prednisona 20 mg por día hace un año, que le dio un clínico de otra ciudad, sin controles." },
  frequency: "frecuente",
  intro: "“Engordé la panza y la cara, se me hacen moretones con nada, me cuesta levantarme de la silla y me dijeron que tengo azúcar alta.”",
  vitals: { TA: "158/94 mmHg", FC: "84 lpm", "T°": "36,4 °C", Peso: "92 kg", Glucemia: "212 mg/dl" },
  anamnesis: [
    act("corticoides", "¿Qué toma y desde cuándo?", "clave", "“Prednisona 20 por día desde hace un año.”", "Causa exógena."),
    act("debilidad", "¿Le cuesta subir escaleras o levantarse?", "clave", "“Mucho.”", "Miopatía proximal."),
    act("fracturas", "¿Dolor de espalda o fracturas?", "clave", "“Me duele la espalda desde que tosí fuerte.”", "Fractura vertebral."),
    act("infecciones", "¿Infecciones frecuentes?", "util", "“Dos neumonías este año.”", "Inmunosupresión."),
    act("animo", "¿Cambios de ánimo o sueño?", "util", "“Duermo mal, estoy irritable.”", "Efectos neuropsiquiátricos."),
    act("hobby", "¿Qué hace en su tiempo libre?", "neutro", "“Pesco.”", "No orienta."),
  ],
  exam: [
    act("fenotipo", "Inspección", "clave", "Cara de luna llena, giba dorsal, obesidad central, estrías rojo vinosas anchas.", "Fenotipo cushingoide."),
    act("piel", "Piel y fuerza", "clave", "Piel fina con equimosis; debilidad proximal.", "Hipercortisolismo."),
    act("columna", "Columna", "util", "Dolor a la percusión en D11.", "Fractura vertebral."),
  ],
  studies: [
    study("Laboratorio", "lab", "Glucemia, HbA1c, potasio, lípidos", "clave", "HbA1c 8,1 %; K 3,4.", "Diabetes esteroidea."),
    study("Imágenes", "rx-columna", "Radiografía de columna y densitometría", "clave", "Aplastamiento de D11; T-score −2,8.", "Osteoporosis por corticoides."),
    study("Otros", "espirometria", "Espirometría", "util", "EPOC moderado.", "Revisar la indicación."),
    study("Laboratorio", "cortisol-libre", "Cortisol libre urinario y supresión con dexametasona", "innecesario", "No se realizó.", "La causa exógena es clara; además la prednisona interfiere."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cushing-exogeno", "Síndrome de Cushing iatrogénico por prednisona, con diabetes, hipertensión, miopatía y osteoporosis con fractura vertebral", true, "Corticoides crónicos con fenotipo cushingoide y complicaciones metabólicas y óseas."),
      dx("cushing-endogeno", "Enfermedad de Cushing hipofisaria", false, "Hay causa exógena clara."),
      dx("sindrome-metabolico", "Síndrome metabólico", false, "Estrías vinosas, miopatía y piel fina."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "Fenotipo y antecedente farmacológico."),
      dx("polimiositis", "Polimiositis", false, "Miopatía esteroidea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("descenso", "Descenso gradual de la prednisona", "clave", "Evitar insuficiencia suprarrenal."),
      mg("epoc", "Optimizar el EPOC con broncodilatadores inhalados de larga acción", "clave", "Permite retirar el corticoide."),
      mg("hueso", "Bifosfonato, calcio y vitamina D", "clave", "Osteoporosis con fractura."),
      mg("glucemia", "Tratar la diabetes y la presión", "util", "Complicaciones."),
      mg("suspender-brusco", "Suspender la prednisona de golpe", "riesgoso", "Crisis suprarrenal."),
      mg("subir-dosis", "Aumentar la prednisona por la disnea", "riesgoso", "Más complicaciones sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Cushing iatrogénico por prednisona crónica, con diabetes, hipertensión, miopatía y osteoporosis con fractura vertebral, en varón de 58 años con EPOC.",
    pathologies: [
      { name: "Síndrome de Cushing exógeno", role: "principal", why: "Causa más frecuente de Cushing." },
      { name: "Diabetes, osteoporosis y miopatía esteroidea", role: "asociada", why: "Complicaciones." },
      { name: "Cushing endógeno, síndrome metabólico", role: "diferencial", why: "Otros cuadros." },
    ],
    reasoning: [
      "Causa: prednisona en dosis supresivas por un año sin indicación clara.",
      "Mecanismo: exceso de glucocorticoides con supresión del eje hipófiso-suprarrenal.",
      "Consecuencia: diabetes, hipertensión, osteoporosis, miopatía e infecciones.",
    ],
    epidemiology:
      "El uso crónico de corticoides orales es la causa más frecuente de síndrome de Cushing. En EPOC los corticoides orales prolongados no tienen beneficio y sí muchos efectos adversos. Su suspensión debe ser gradual por la supresión suprarrenal.",
    management: [
      "Revisar la indicación.",
      "Descenso gradual.",
      "Hueso y glucemia.",
      "Tratamiento inhalado.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Uso y retiro de glucocorticoides.", "Endocrine Society/ESE — Glucocorticoid-induced Adrenal Insufficiency Guideline."],
    pearls: ["Siempre preguntá por corticoides.", "Retiro gradual.", "Protegé el hueso."],
    pitfalls: ["Estudiar Cushing endógeno.", "Suspender de golpe."],
    tribunal: [
      qa("¿A partir de qué dosis y tiempo hay supresión del eje?", "Con más de 5 mg de prednisona por más de 3 a 4 semanas se considera posible."),
      qa("¿Qué estrías orientan a Cushing?", "Anchas, rojo vinosas, en abdomen, flancos y muslos."),
      qa("¿Cuándo se indica prevención de osteoporosis por corticoides?", "Con 2,5 mg o más de prednisona por más de 3 meses según riesgo."),
    ],
  },
};
