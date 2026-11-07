import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cushing: ClinicalCase = {
  id: "sindrome-de-cushing",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Administrativa. Hipertensión y diabetes diagnosticadas en el último año." },
  frequency: "poco-frecuente",
  intro: "“En dos años subí 15 kilos, sobre todo en la panza y la cara. Me salen moretones por nada, y me cuesta levantarme de una silla.”",
  vitals: { TA: "158/96 mmHg", FC: "82 lpm", FR: "16 rpm", "T°": "36,5 °C", "SatO₂": "98 %", Glucemia: "186 mg/dl" },
  anamnesis: [
    act("corticoides", "¿Tomás o te aplicás corticoides? ¿Cremas, gotas, inyecciones, remedios naturales?", "clave", "“No, nada de eso.”", "La causa más frecuente de Cushing es la exógena: hay que descartarla primero."),
    act("debilidad", "¿Cómo es esa dificultad para levantarte?", "clave", "“Me fallan los muslos, subo las escaleras agarrada.”", "Miopatía proximal: muy específica de hipercortisolismo."),
    act("menstruacion", "¿Cómo son tus menstruaciones?", "util", "“Irregulares desde hace un año.”", "El exceso de cortisol altera el eje gonadal."),
    act("animo", "¿Cómo está tu ánimo y tu sueño?", "util", "“Irritable, duermo mal.”", "Frecuentes alteraciones neuropsiquiátricas."),
    act("infecciones", "¿Tuviste infecciones o fracturas?", "util", "“Hongos en la piel y una fractura de costilla al toser.”", "Inmunosupresión y osteoporosis."),
    act("mascota", "¿Tenés mascotas?", "neutro", "“Un perro.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Estrías rojo vinosas anchas en el abdomen, equimosis, piel fina.", "Las estrías violáceas anchas y las equimosis son los signos más discriminativos."),
    act("distribucion", "Distribución de la grasa", "clave", "Facies de luna llena, giba dorsal, obesidad central con extremidades delgadas.", "Distribución centrípeta típica."),
    act("fuerza", "Fuerza proximal", "clave", "No se levanta de la silla sin usar los brazos.", "Miopatía proximal."),
  ],
  studies: [
    study("Laboratorio", "tamizaje", "Cortisol libre urinario de 24 h, cortisol salival nocturno y supresión con 1 mg de dexametasona", "clave", "Cortisol urinario 3 veces el normal; cortisol tras dexametasona 9 µg/dl.", "Confirma hipercortisolismo: se piden al menos dos pruebas alteradas."),
    study("Laboratorio", "acth", "ACTH plasmática", "clave", "ACTH 62 pg/ml (no suprimida).", "ACTH dependiente: origen hipofisario o ectópico."),
    study("Imágenes", "rmn", "Resonancia de hipófisis", "clave", "Microadenoma de 6 mm.", "Se pide después de confirmar el diagnóstico bioquímico y la dependencia de ACTH."),
    study("Laboratorio", "cortisol-azar", "Cortisol sérico matinal aislado como único estudio", "innecesario", "Cortisol 22 µg/dl.", "Un valor aislado no diagnostica: el ritmo y la supresión son lo que se altera."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cushing", "Síndrome de Cushing ACTH dependiente por adenoma hipofisario (enfermedad de Cushing)", true, "Miopatía proximal, estrías violáceas, equimosis, HTA y diabetes, con hipercortisolismo confirmado, ACTH no suprimida y microadenoma."),
      dx("metabolico", "Síndrome metabólico simple", false, "No explica estrías violáceas, miopatía ni hipercortisolismo."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "No da estrías violáceas, HTA ni diabetes de novo."),
      dx("sop", "Síndrome de ovario poliquístico", false, "Puede dar irregularidad y obesidad, no equimosis ni miopatía."),
      dx("suprarrenal", "Adenoma suprarrenal productor de cortisol", false, "En ese caso la ACTH estaría suprimida."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("neurocirugia", "Derivar para cirugía transesfenoidal", "clave", "Es el tratamiento de elección de la enfermedad de Cushing."),
      mg("comorbilidades", "Tratar HTA, diabetes y osteoporosis, y prevenir infecciones y trombosis", "clave", "Son la principal causa de morbimortalidad."),
      mg("endocrino", "Seguimiento por endocrinología: controlar insuficiencia suprarrenal posoperatoria", "clave", "Tras la cirugía puede requerir hidrocortisona transitoria."),
      mg("dieta", "Solo dieta y ejercicio por obesidad", "riesgoso", "Deja sin tratar una enfermedad con alta morbimortalidad."),
      mg("corticoide", "Iniciar prednisona por la debilidad", "riesgoso", "Agrega glucocorticoide a un cuadro de exceso."),
      mg("sin-confirmar", "Pedir resonancia y operar sin pruebas hormonales", "innecesario", "Los incidentalomas hipofisarios son frecuentes: primero se confirma la bioquímica."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Cushing por microadenoma hipofisario productor de ACTH con HTA, diabetes y osteoporosis, en mujer de 41 años.",
    pathologies: [
      { name: "Enfermedad de Cushing", role: "principal", why: "Hipercortisolismo por exceso hipofisario de ACTH." },
      { name: "HTA, diabetes y osteoporosis secundarias", role: "asociada", why: "Efectos del exceso de cortisol." },
      { name: "Cushing exógeno, adenoma suprarrenal, ACTH ectópica", role: "diferencial", why: "Otras causas de hipercortisolismo." },
    ],
    reasoning: [
      "Causa: adenoma hipofisario corticotropo que secreta ACTH sin control.",
      "Mecanismo: el exceso de cortisol aumenta la gluconeogénesis y el catabolismo proteico, redistribuye la grasa y potencia la acción de las catecolaminas.",
      "Consecuencia: obesidad central, atrofia cutánea y muscular, HTA, diabetes, osteoporosis, inmunosupresión.",
    ],
    epidemiology:
      "El Cushing endógeno es raro; la enfermedad de Cushing es su causa más frecuente y predomina en mujeres de 20 a 50 años. La causa global más común sigue siendo el uso de corticoides, incluso de venta libre o en preparados naturales.",
    management: [
      "Descartar corticoides exógenos.",
      "Confirmar con dos pruebas: cortisol urinario, salival nocturno o supresión con dexametasona.",
      "Medir ACTH para ubicar el origen; recién después, imágenes.",
      "Cirugía según el origen y tratamiento de las comorbilidades.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Recomendaciones sobre síndrome de Cushing.", "Endocrine Society — Guía de diagnóstico del síndrome de Cushing."],
    pearls: ["Estrías violáceas + equimosis + miopatía proximal: pensá en Cushing.", "Primero la bioquímica, después la imagen.", "ACTH baja: suprarrenal. ACTH normal o alta: hipófisis o ectópica."],
    pitfalls: ["No preguntar por corticoides.", "Pedir resonancia antes de confirmar."],
    tribunal: [
      qa("¿Qué diferencia síndrome de enfermedad de Cushing?", "El síndrome es el conjunto clínico del hipercortisolismo de cualquier causa; la enfermedad es la forma debida a un adenoma hipofisario productor de ACTH."),
      qa("¿Cómo diferenciás el origen hipofisario del ectópico?", "Con la prueba de alta dosis de dexametasona o CRH y, si hay dudas, el cateterismo de senos petrosos; el ectópico suele tener ACTH muy alta, hipopotasemia marcada y evolución rápida."),
      qa("¿Por qué se produce hipopotasemia en el Cushing?", "Porque el exceso de cortisol satura la enzima que lo inactiva en el riñón (11-beta-HSD2) y activa el receptor de mineralocorticoides."),
    ],
  },
};
