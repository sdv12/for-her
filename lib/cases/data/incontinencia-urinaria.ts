import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const incontinenciaUrinaria: ClinicalCase = {
  id: "incontinencia-urinaria-esfuerzo",
  level: 1,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Tres partos vaginales, uno con fórceps. Sobrepeso. Posmenopáusica." },
  frequency: "muy-frecuente",
  intro: "“Cuando toso, estornudo o salto con mis nietos se me escapa el pis. Uso protector todos los días y me da vergüenza.”",
  vitals: { TA: "128/80 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "82 kg" },
  anamnesis: [
    act("cuando", "¿Cuándo se le escapa?", "clave", "“Al toser, reír o levantar peso.”", "Esfuerzo."),
    act("urgencia", "¿Tiene urgencia y no llega al baño?", "clave", "“No, eso no.”", "Excluye urgencia."),
    act("partos", "¿Cómo fueron sus partos?", "clave", "“Tres, uno con fórceps.”", "Daño del piso pelviano."),
    act("infeccion", "¿Ardor o sangre al orinar?", "util", "“No.”", "Infección."),
    act("farmacos", "¿Toma diuréticos?", "util", "“No.”", "Factores."),
    act("nietos", "¿Cuántos nietos tiene?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("tos", "Prueba de esfuerzo con tos en camilla", "clave", "Escape de orina simultáneo a la tos.", "Confirma esfuerzo."),
    act("prolapso", "Examen genital", "clave", "Atrofia leve, sin prolapso significativo.", "Base."),
    act("piso", "Contracción del piso pelviano", "util", "Débil.", "Rehabilitable."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa", "clave", "Normal.", "Excluye infección y hematuria."),
    study("Otros", "diario", "Diario miccional de 3 días", "clave", "Escapes con esfuerzo, sin urgencia.", "Caracteriza."),
    study("Imágenes", "residuo", "Residuo posmiccional por ecografía", "util", "20 ml.", "Excluye retención."),
    study("Otros", "urodinamia", "Urodinamia de rutina antes de tratamiento conservador", "innecesario", "No se realizó.", "Solo si se planea cirugía o hay dudas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("esfuerzo", "Incontinencia urinaria de esfuerzo por debilidad del piso pelviano", true, "Escapes con tos y esfuerzo, partos vaginales, prueba de tos positiva y sin urgencia."),
      dx("urgencia", "Vejiga hiperactiva", false, "No tiene urgencia."),
      dx("rebosamiento", "Incontinencia por rebosamiento", false, "Residuo normal."),
      dx("itu", "Infección urinaria", false, "Orina normal."),
      dx("fistula", "Fístula vesicovaginal", false, "La pérdida es solo con esfuerzo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("kinesio", "Kinesiología del piso pelviano supervisada", "clave", "Primera línea."),
      mg("peso", "Bajar de peso", "clave", "Reduce la presión abdominal."),
      mg("estrogenos", "Estrógenos vaginales por la atrofia", "util", "Mejora el trofismo."),
      mg("cirugia", "Cinta suburetral si no mejora", "clave", "Tratamiento quirúrgico eficaz."),
      mg("oxibutinina", "Oxibutinina", "riesgoso", "Es para urgencia; anticolinérgico sin beneficio aquí."),
      mg("sonda", "Sonda vesical permanente", "riesgoso", "Infecciones y no corresponde."),
    ],
  },
  debrief: {
    diagnosis: "Incontinencia urinaria de esfuerzo por debilidad del piso pelviano, en mujer de 52 años con tres partos vaginales.",
    pathologies: [
      { name: "Incontinencia de esfuerzo", role: "principal", why: "Falla del cierre uretral." },
      { name: "Partos, obesidad y menopausia", role: "asociada", why: "Factores de riesgo." },
      { name: "Vejiga hiperactiva, rebosamiento", role: "diferencial", why: "Otros tipos." },
    ],
    reasoning: [
      "Causa: daño del soporte uretral por partos, menopausia y sobrepeso.",
      "Mecanismo: con el esfuerzo, la presión vesical supera a la de cierre uretral.",
      "Consecuencia: escapes que limitan la vida social.",
    ],
    epidemiology:
      "Afecta a una de cada tres mujeres adultas, pero pocas consultan por vergüenza. Hay que preguntar activamente. La kinesiología del piso pelviano resuelve o mejora a muchas.",
    management: [
      "Preguntar.",
      "Tipo de incontinencia.",
      "Kinesiología y peso.",
      "Cirugía si falla.",
    ],
    sources: ["Sociedad Argentina de Urología — Incontinencia urinaria femenina.", "ICS/NICE — Urinary Incontinence and Pelvic Organ Prolapse in Women."],
    pearls: ["Preguntá: no lo cuentan.", "Esfuerzo vs urgencia.", "Piso pelviano primero."],
    pitfalls: ["Anticolinérgicos para esfuerzo.", "Normalizarlo."],
    tribunal: [
      qa("¿Qué es la incontinencia mixta?", "Combinación de esfuerzo y urgencia; se trata primero el componente que predomina."),
      qa("¿Qué fármacos se usan en vejiga hiperactiva?", "Antimuscarínicos como oxibutinina o solifenacina y mirabegrón."),
      qa("¿Qué son los ejercicios de Kegel?", "Contracciones repetidas del piso pelviano para fortalecerlo."),
    ],
  },
};
