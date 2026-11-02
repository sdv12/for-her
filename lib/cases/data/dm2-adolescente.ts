import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dm2Adolescente: ClinicalCase = {
  id: "diabetes-tipo-2-adolescente",
  level: 1,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 14, ageUnit: "años", sex: "F", context: "Obesidad desde los 6 años. Su mamá y su abuela son diabéticas." },
  frequency: "frecuente",
  intro: "“Vengo por el apto físico de la escuela. Me cuesta correr y tengo manchas oscuras en el cuello que no se van lavando.”",
  vitals: { TA: "132/84 mmHg", FC: "88 lpm", "T°": "36,5 °C", Peso: "92 kg" },
  anamnesis: [
    act("sintomas", "¿Tomás mucha agua, orinás mucho o te levantás de noche a orinar?", "clave", "“Un poco más que antes.”", "Poliuria y polidipsia leves: hiperglucemia."),
    act("familia", "¿Quiénes tienen diabetes en tu familia?", "clave", "“Mi mamá y mi abuela, con pastillas.”", "Antecedente familiar fuerte: riesgo de DM2."),
    act("habitos", "¿Qué comés y cuánto te movés?", "clave", "“Gaseosa todos los días, mucho celular; no hago deporte.”", "Sedentarismo y bebidas azucaradas."),
    act("menstruacion", "¿Cómo son tus menstruaciones?", "util", "“Irregulares, a veces cada dos o tres meses.”", "Sugiere síndrome de ovario poliquístico, asociado a resistencia a la insulina."),
    act("bullying", "¿Cómo te sentís con tu cuerpo? ¿Te molestan en la escuela?", "util", "“A veces me cargan.”", "El estigma por el peso afecta la salud mental y la adherencia."),
    act("serie", "¿Qué serie estás mirando?", "neutro", "“Una de animé.”", "No orienta."),
  ],
  exam: [
    act("imc", "Peso, talla, IMC y circunferencia de cintura", "clave", "IMC 36 (más de 2 DE), cintura 108 cm.", "Obesidad grave con adiposidad central."),
    act("acantosis", "Piel", "clave", "Acantosis nigricans en cuello y axilas.", "Marcador de resistencia a la insulina."),
    act("ta-ex", "Presión arterial con manguito adecuado", "util", "132/84 (por encima del percentilo 95).", "Hipertensión asociada."),
  ],
  studies: [
    study("Laboratorio", "glucemia", "Glucemia en ayunas y HbA1c", "clave", "Glucemia 142 mg/dl, HbA1c 7,4 %.", "Cumple criterios de diabetes."),
    study("Laboratorio", "anticuerpos", "Anticuerpos anti-GAD y anti-insulina", "util", "Negativos.", "Descarta DM1 autoinmune en un joven."),
    study("Laboratorio", "comorbilidades", "Perfil lipídico, transaminasas y albuminuria", "clave", "Triglicéridos 240, HDL 32, TGP 68.", "Dislipemia y probable hígado graso."),
    study("Otros", "ptog-repetida", "PTOG con la HbA1c y la glucemia ya diagnósticas", "innecesario", "No se realizó.", "Ya se confirmó el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dm2", "Diabetes tipo 2 en adolescente con obesidad grave, hipertensión, dislipemia e hígado graso", true, "Glucemia de 142 y HbA1c de 7,4 con acantosis, obesidad, antecedentes familiares y anticuerpos negativos."),
      dx("dm1", "Diabetes tipo 1", false, "No hay cetosis, adelgazamiento ni anticuerpos positivos."),
      dx("prediabetes", "Prediabetes", false, "Los valores superan los umbrales de diabetes."),
      dx("mody", "Diabetes monogénica (MODY)", false, "Se piensa con herencia en tres generaciones sin obesidad; aquí la obesidad y la resistencia a la insulina son marcadas."),
      dx("cushing", "Síndrome de Cushing", false, "Sin estrías violáceas, giba ni detención del crecimiento."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metformina", "Metformina con aumento gradual", "clave", "Primera línea en DM2 pediátrica con HbA1c menor de 8,5 y sin cetosis."),
      mg("habitos", "Plan de alimentación y actividad física con la familia, sin culpabilizar", "clave", "El cambio familiar es más eficaz que el individual."),
      mg("equipo", "Equipo interdisciplinario: endocrinología, nutrición y salud mental", "clave", "Enfermedad crónica en adolescente con estigma."),
      mg("comorbilidades", "Tratar la hipertensión y controlar lípidos, hígado y ojos", "util", "La DM2 juvenil progresa rápido y tiene complicaciones tempranas."),
      mg("dieta-extrema", "Dieta de 800 calorías", "riesgoso", "Riesgo de trastornos de la conducta alimentaria y déficits."),
      mg("insulina", "Insulina como primera opción", "innecesario", "Se reserva para cetosis o HbA1c de 8,5 o más."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes tipo 2 en adolescente de 14 años con obesidad grave, acantosis nigricans, hipertensión, dislipemia, probable hígado graso y oligomenorrea.",
    pathologies: [
      { name: "Diabetes tipo 2 juvenil", role: "principal", why: "Hiperglucemia por resistencia a la insulina." },
      { name: "Obesidad, hipertensión, dislipemia, hígado graso", role: "asociada", why: "Síndrome metabólico." },
      { name: "DM1, MODY, Cushing", role: "diferencial", why: "Otras diabetes en jóvenes." },
    ],
    reasoning: [
      "Causa: obesidad, sedentarismo, predisposición genética y pubertad (que aumenta la resistencia a la insulina).",
      "Mecanismo: resistencia a la insulina y agotamiento progresivo de la célula beta, más rápido que en adultos.",
      "Consecuencia: hiperglucemia con complicaciones micro y macrovasculares tempranas.",
    ],
    epidemiology:
      "La DM2 en niños y adolescentes aumentó junto con la obesidad infantil, que en Argentina afecta a una proporción creciente de chicos. Es más frecuente en mujeres adolescentes con antecedentes familiares. Progresa más rápido que en adultos.",
    management: [
      "Rastreo en adolescentes con sobrepeso y factores de riesgo.",
      "Metformina y cambios de hábitos familiares.",
      "Insulina si hay cetosis o HbA1c alta.",
      "Detección de comorbilidades y seguimiento interdisciplinario.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de diabetes tipo 2 en niños y adolescentes.", "Ley 27.642 de Promoción de la Alimentación Saludable (etiquetado frontal)."],
    pearls: ["Acantosis = resistencia a la insulina.", "Metformina primera línea.", "Trabajo con toda la familia."],
    pitfalls: ["Asumir DM1 en todo joven.", "Culpabilizar al adolescente."],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos de diabetes?", "Glucemia en ayunas de 126 mg/dl o más (en dos ocasiones), glucemia de 200 o más a las 2 h de una PTOG, HbA1c de 6,5 % o más, o glucemia al azar de 200 o más con síntomas."),
      qa("¿Qué es la Ley de etiquetado frontal?", "La Ley 27.642 que obliga a rotular con octógonos negros los alimentos con exceso de azúcares, sodio, grasas o calorías, prohíbe su publicidad dirigida a niños y su venta en escuelas."),
      qa("¿Cómo se diferencia la DM1 de la DM2 en un adolescente?", "DM1: inicio agudo, pérdida de peso, cetosis, peso normal, anticuerpos positivos y péptido C bajo. DM2: obesidad, acantosis, antecedentes familiares, sin cetosis, anticuerpos negativos y péptido C normal o alto."),
    ],
  },
};
