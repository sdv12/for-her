import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerTiroides: ClinicalCase = {
  id: "cancer-tiroides-papilar",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Radioterapia de cuello en la infancia por un linfoma." },
  frequency: "frecuente",
  intro: "“Me palpé un bulto en el cuello hace dos meses. No duele, pero no se va.”",
  vitals: { TA: "116/72 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "60 kg" },
  anamnesis: [
    act("radiacion", "¿Radiación en cuello o familia con cáncer de tiroides?", "clave", "“Radioterapia de chica.”", "Factor de riesgo."),
    act("crecimiento", "¿Creció rápido? ¿Ronquera o problemas para tragar?", "clave", "“No.”", "Invasión local."),
    act("funcion", "¿Palpitaciones o cansancio?", "clave", "“No.”", "Función tiroidea."),
    act("familia", "¿Cáncer medular o feocromocitoma en la familia?", "util", "“No.”", "MEN2."),
    act("embarazo", "¿Planes de embarazo?", "util", "“En un año.”", "Planificación."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy arquitecta.”", "No orienta."),
  ],
  exam: [
    act("nodulo", "Tiroides", "clave", "Nódulo de 2 cm duro en lóbulo derecho.", "Sospechoso."),
    act("ganglios", "Ganglios cervicales", "clave", "Ganglio yugular derecho de 1,5 cm.", "Metástasis ganglionar."),
    act("voz", "Voz", "util", "Normal.", "Recurrente."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH", "clave", "Normal.", "Nódulo no funcionante."),
    study("Imágenes", "eco", "Ecografía de tiroides y cuello", "clave", "Nódulo hipoecoico con microcalcificaciones y bordes irregulares (TI-RADS 5); ganglio sospechoso.", "Sospecha."),
    study("Otros", "paaf", "Punción con aguja fina del nódulo y del ganglio", "clave", "Bethesda VI: carcinoma papilar; ganglio positivo.", "Confirma."),
    study("Otros", "centellograma", "Centellograma con TSH normal", "innecesario", "No se realizó.", "Solo si la TSH está baja."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("papilar", "Carcinoma papilar de tiroides con metástasis ganglionar cervical", true, "Radiación previa, nódulo con microcalcificaciones, ganglio y Bethesda VI."),
      dx("adenoma", "Adenoma folicular", false, "Citología papilar."),
      dx("medular", "Carcinoma medular", false, "Citología papilar, sin calcitonina."),
      dx("anaplasico", "Carcinoma anaplásico", false, "Crecimiento lento en joven."),
      dx("linfoma", "Linfoma tiroideo", false, "Citología."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Tiroidectomía total con vaciamiento ganglionar central y lateral", "clave", "Hay ganglios."),
      mg("yodo", "Yodo radiactivo según riesgo", "clave", "Ablación."),
      mg("levotiroxina", "Levotiroxina en dosis supresora según riesgo", "clave", "Reemplazo y supresión."),
      mg("seguimiento", "Tiroglobulina y ecografía de seguimiento", "util", "Recurrencia."),
      mg("embarazo", "Embarazarse inmediatamente después del yodo", "riesgoso", "Se espera 6 a 12 meses."),
      mg("controlar", "Controlar en un año", "riesgoso", "Hay metástasis."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma papilar de tiroides con metástasis ganglionar cervical, en mujer de 34 años con radioterapia previa.",
    pathologies: [
      { name: "Carcinoma papilar", role: "principal", why: "Cáncer de tiroides más frecuente." },
      { name: "Metástasis ganglionar", role: "asociada", why: "Extensión." },
      { name: "Adenoma, medular, linfoma", role: "diferencial", why: "Otros nódulos." },
    ],
    reasoning: [
      "Causa: radiación y mutaciones como BRAF o RET.",
      "Mecanismo: proliferación de células foliculares con diseminación linfática.",
      "Consecuencia: nódulo y ganglios, con muy buen pronóstico.",
    ],
    epidemiology:
      "Es el cáncer endocrino más común y predomina en mujeres jóvenes. Su incidencia creció por el uso de ecografías. Tiene supervivencia muy alta, incluso con ganglios. La radiación en la infancia es un factor de riesgo claro.",
    management: [
      "TSH y ecografía.",
      "Punción según TI-RADS.",
      "Cirugía.",
      "Yodo y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Cáncer diferenciado de tiroides.", "American Thyroid Association — Thyroid Nodules and Cancer Guidelines."],
    pearls: ["Microcalcificaciones.", "Bethesda VI.", "Pronóstico excelente."],
    pitfalls: ["Centellograma con TSH normal.", "No explorar ganglios."],
    tribunal: [
      qa("¿Qué tipos de cáncer de tiroides hay?", "Papilar, folicular, medular y anaplásico."),
      qa("¿Qué marcadores se usan en el seguimiento?", "Tiroglobulina en el diferenciado y calcitonina en el medular."),
      qa("¿Qué es el sistema Bethesda?", "Clasifica la citología tiroidea de I a VI según riesgo de malignidad."),
    ],
  },
};
