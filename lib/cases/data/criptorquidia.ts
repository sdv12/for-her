import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const criptorquidia: ClinicalCase = {
  id: "criptorquidia",
  level: 1,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 8, ageUnit: "meses", sex: "M", context: "Control de salud. Nació de término. Lo trae la mamá." },
  frequency: "frecuente",
  intro: "“Desde que nació le noto la bolsita del lado izquierdo vacía. Me dijeron que iba a bajar solo.”",
  vitals: { FC: "122 lpm", FR: "30 rpm", "T°": "36,5 °C", Peso: "8.600 g" },
  anamnesis: [
    act("desde", "¿Desde cuándo lo nota?", "clave", "“Desde el nacimiento.”", "Congénito."),
    act("bano", "¿Lo ves bajar en el baño caliente?", "clave", "“Nunca.”", "Diferencia con retráctil."),
    act("prematuro", "¿Fue prematuro?", "clave", "“No, de 39 semanas.”", "En prematuros desciende más tarde."),
    act("genitales", "¿Notaste algo raro en el pene?", "util", "“No.”", "Hipospadias: trastorno del desarrollo sexual."),
    act("hernia", "¿Bultito en la ingle al llorar?", "util", "“No.”", "Hernia asociada."),
    act("hermano", "¿Tiene hermanos?", "neutro", "“Un hermano de 4.”", "No orienta."),
  ],
  exam: [
    act("testiculo", "Palpación escrotal e inguinal en ambiente cálido", "clave", "Testículo izquierdo palpable en el canal inguinal, no se logra bajar al escroto.", "No descendido palpable."),
    act("contralateral", "Testículo derecho", "clave", "En el escroto, normal.", "Unilateral."),
    act("pene", "Pene y meato", "util", "Normales.", "Sin hipospadias."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico por examen físico", "clave", "Suficiente.", "Testículo palpable."),
    study("Otros", "derivacion", "Derivación a cirugía infantil", "clave", "Realizada.", "Orquidopexia."),
    study("Imágenes", "eco", "Ecografía inguinoescrotal", "innecesario", "No se realizó.", "No cambia la conducta en el palpable."),
    study("Laboratorio", "hormonas", "Estudio hormonal y cariotipo en unilateral palpable", "innecesario", "No se realizó.", "Solo si es bilateral no palpable o hay hipospadias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("criptorquidia", "Criptorquidia unilateral izquierda con testículo palpable en el canal inguinal", true, "Ausente desde el nacimiento, no desciende con maniobras y se palpa en el canal."),
      dx("retractil", "Testículo retráctil", false, "No baja al escroto ni en el baño caliente."),
      dx("anorquia", "Anorquia", false, "Se palpa."),
      dx("tds", "Trastorno del desarrollo sexual", false, "Unilateral sin hipospadias."),
      dx("hernia", "Hernia inguinal", false, "No hay saco herniario palpable."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("orquidopexia", "Orquidopexia entre los 6 y 18 meses", "clave", "Protege fertilidad y permite vigilar."),
      mg("explicar", "Explicar el riesgo de infertilidad y cáncer", "clave", "Información."),
      mg("autoexamen", "Enseñar autoexamen testicular en la adolescencia", "clave", "Detección precoz de tumor."),
      mg("seguimiento", "Control posoperatorio de posición y tamaño", "util", "Atrofia o reascenso."),
      mg("esperar", "Esperar a la pubertad a ver si baja", "riesgoso", "Daño germinal progresivo."),
      mg("hcg", "hCG como tratamiento de rutina", "innecesario", "Baja eficacia, no recomendada."),
    ],
  },
  debrief: {
    diagnosis: "Criptorquidia unilateral izquierda con testículo palpable en el canal inguinal, en lactante de 8 meses.",
    pathologies: [
      { name: "Criptorquidia", role: "principal", why: "Testículo no descendido." },
      { name: "Riesgo de infertilidad y tumor", role: "asociada", why: "Consecuencias a largo plazo." },
      { name: "Testículo retráctil, anorquia", role: "diferencial", why: "Otras causas de escroto vacío." },
    ],
    reasoning: [
      "Causa: falla del descenso testicular durante la vida fetal.",
      "Mecanismo: mayor temperatura fuera del escroto que daña las células germinales.",
      "Consecuencia: menor fertilidad y más riesgo de cáncer testicular.",
    ],
    epidemiology:
      "Afecta a 1 a 3 % de los varones de término y más a los prematuros. Si no descendió a los 6 meses, ya no lo hará. La orquidopexia temprana mejora la fertilidad y facilita el autoexamen.",
    management: [
      "Examen en cada control.",
      "Derivación a los 6 meses.",
      "Orquidopexia.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Criptorquidia.", "AUA — Evaluation and Treatment of Cryptorchidism Guideline."],
    pearls: ["A los 6 meses ya no baja.", "Palpar en ambiente cálido.", "Ecografía no hace falta."],
    pitfalls: ["Esperar a la pubertad.", "Pedir ecografía y demorar."],
    tribunal: [
      qa("¿Cuándo se estudia más?", "Si es bilateral no palpable o con hipospadias, por posible trastorno del desarrollo sexual."),
      qa("¿Qué es un testículo retráctil?", "Testículo que asciende por reflejo cremastérico pero baja al escroto y permanece."),
      qa("¿Por qué se recomienda autoexamen?", "Porque aun operado persiste mayor riesgo de cáncer testicular."),
    ],
  },
};
