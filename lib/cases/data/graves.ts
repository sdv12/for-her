import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const graves: ClinicalCase = {
  id: "hipertiroidismo-graves",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 32, ageUnit: "años", sex: "F", context: "Fuma. No usa anticonceptivos." },
  frequency: "frecuente",
  intro: "“Bajé ocho kilos comiendo más que nunca, el corazón me late fuerte todo el tiempo, tiemblo, tengo calor y estoy muy nerviosa. Me dicen que tengo los ojos saltones.”",
  vitals: { TA: "138/62 mmHg", FC: "118 lpm, regular", "T°": "37,3 °C", Peso: "52 kg" },
  anamnesis: [
    act("sintomas", "¿Desde cuándo? ¿Tiene diarrea, intolerancia al calor, alteraciones menstruales?", "clave", "“Tres meses. Voy al baño varias veces por día, transpiro mucho y menstrúo poco.”", "Síntomas de hipermetabolismo y exceso de hormona tiroidea."),
    act("ojos", "¿Le arden los ojos, ve doble o le cuesta cerrarlos?", "clave", "“Me arden y lagrimean.”", "Orbitopatía de Graves: específica de esta causa."),
    act("embarazo", "¿Puede estar embarazada o lo planea?", "clave", "“No sé, no me cuido.”", "Cambia el antitiroideo (propiltiouracilo en el primer trimestre) y obliga a un test."),
    act("dolor-cuello", "¿Le duele el cuello? ¿Tuvo un resfrío reciente?", "util", "“No.”", "Dolor cervical tras una virosis orienta a tiroiditis subaguda (hipertiroidismo transitorio)."),
    act("yodo", "¿Recibió contraste iodado, amiodarona o suplementos?", "util", "“No.”", "Causas de hipertiroidismo inducido por yodo."),
    act("familia", "¿Hay enfermedades de tiroides en la familia?", "util", "“Mi tía.”", "Carga autoinmune familiar."),
    act("plantas", "¿Le gustan las plantas?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Palpación y auscultación tiroidea", "clave", "Bocio difuso, blando, indoloro, con soplo.", "Bocio difuso con soplo (hipervascularización): típico de Graves."),
    act("ojos", "Examen ocular", "clave", "Retracción palpebral, exoftalmos bilateral leve, sin alteración de los movimientos oculares.", "Orbitopatía leve."),
    act("piel", "Piel, temblor y reflejos", "util", "Piel caliente y húmeda, temblor fino, reflejos vivos.", "Signos de tirotoxicosis."),
    act("cardio", "Auscultación cardíaca", "util", "Taquicardia regular, soplo sistólico funcional.", "Circulación hiperdinámica; descartar FA."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH y T4 libre (y T3)", "clave", "TSH < 0,01; T4 libre 4,2 ng/dl (alta); T3 alta.", "Hipertiroidismo primario."),
    study("Laboratorio", "trab", "Anticuerpos contra el receptor de TSH (TRAb)", "clave", "Positivos.", "Confirman la enfermedad de Graves."),
    study("Laboratorio", "beta", "Test de embarazo", "clave", "Negativo.", "Necesario antes de elegir el tratamiento."),
    study("Laboratorio", "basal", "Hemograma y hepatograma basales", "util", "Normales.", "Base antes del metimazol (riesgo de agranulocitosis y hepatotoxicidad)."),
    study("Imágenes", "centello", "Centellograma tiroideo", "innecesario", "No se realizó.", "Con TRAb positivos y cuadro típico, no hace falta; sirve en casos dudosos o nódulos."),
    study("Imágenes", "tc", "Tomografía de órbitas", "innecesario", "No se realizó.", "Solo en orbitopatía moderada a grave o dudas diagnósticas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("graves", "Hipertiroidismo por enfermedad de Graves", true, "Tirotoxicosis con bocio difuso con soplo, orbitopatía, TSH suprimida, T4 libre alta y TRAb positivos."),
      dx("subaguda", "Tiroiditis subaguda", false, "Dolor cervical tras una virosis, tiroides dolorosa, hipertiroidismo transitorio y captación baja."),
      dx("nodulo", "Nódulo tóxico", false, "Nódulo palpable único, sin orbitopatía, TRAb negativos."),
      dx("ansiedad", "Trastorno de ansiedad", false, "No explica el bocio, la orbitopatía ni el laboratorio."),
      dx("feo", "Feocromocitoma", false, "Crisis hipertensivas, TSH normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("beta", "Propranolol para los síntomas adrenérgicos", "clave", "Controla taquicardia, temblor y ansiedad mientras actúa el antitiroideo."),
      mg("mmi", "Metimazol y control de T4 libre en 4–6 semanas", "clave", "Bloquea la síntesis de hormonas; es la primera opción en muchas pacientes."),
      mg("agranulocitosis", "Advertir que ante fiebre o dolor de garganta suspenda y consulte para un hemograma", "clave", "La agranulocitosis es rara pero grave."),
      mg("anticoncepcion", "Anticoncepción eficaz y dejar de fumar", "util", "El metimazol es teratogénico en el primer trimestre; el tabaco empeora la orbitopatía."),
      mg("amiodarona", "Amiodarona para la taquicardia", "riesgoso", "Tiene mucho yodo y puede empeorar el hipertiroidismo."),
      mg("yodo131", "Yodo radiactivo inmediato", "innecesario", "Es una opción definitiva, pero no de entrada sin descartar embarazo y con orbitopatía activa (puede empeorarla)."),
    ],
  },
  debrief: {
    diagnosis: "Hipertiroidismo por enfermedad de Graves con orbitopatía leve, en mujer de 32 años fumadora.",
    pathologies: [
      { name: "Enfermedad de Graves", role: "principal", why: "TRAb positivos con bocio difuso y orbitopatía." },
      { name: "Orbitopatía de Graves", role: "asociada", why: "Afectación autoinmune de la órbita." },
      { name: "Tiroiditis subaguda y nódulo tóxico", role: "diferencial", why: "Otras causas de tirotoxicosis." },
    ],
    reasoning: [
      "Causa: autoanticuerpos que estimulan el receptor de TSH (TRAb).",
      "Mecanismo: el anticuerpo actúa como la TSH: la tiroides crece (bocio) y produce hormonas sin freno; los mismos anticuerpos activan fibroblastos de la órbita.",
      "Consecuencia: hipermetabolismo (pérdida de peso, calor, diarrea), hiperactividad adrenérgica (taquicardia, temblor, ansiedad) y orbitopatía (exoftalmos, retracción palpebral).",
      "La TSH cae a casi cero por retroalimentación negativa: es la prueba más sensible.",
    ],
    epidemiology:
      "La enfermedad de Graves es la causa más frecuente de hipertiroidismo en zonas con yodo suficiente, como la Argentina. Es 5 a 10 veces más frecuente en mujeres, con pico entre los 20 y 50 años. El tabaco aumenta el riesgo de orbitopatía y su gravedad.",
    management: [
      "Confirmar con TSH, T4 libre, T3 y TRAb; test de embarazo.",
      "Betabloqueante para los síntomas.",
      "Opciones: antitiroideos (metimazol; propiltiouracilo en el primer trimestre), yodo radiactivo o cirugía.",
      "Controles de función tiroidea, hemograma y hepatograma; advertir sobre agranulocitosis.",
      "Orbitopatía: dejar de fumar, lubricación y derivación a oftalmología si es moderada o grave.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Guía de diagnóstico y tratamiento del hipertiroidismo."],
    pearls: ["Bocio difuso con soplo + exoftalmos = Graves.", "Metimazol: fiebre o dolor de garganta → hemograma.", "Fumar empeora la orbitopatía."],
    pitfalls: ["Diagnosticarlo como ansiedad.", "No descartar embarazo.", "Indicar amiodarona."],
  },
};
