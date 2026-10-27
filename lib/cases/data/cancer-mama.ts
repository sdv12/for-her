import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerMama: ClinicalCase = {
  id: "cancer-de-mama",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 54, ageUnit: "años", sex: "F", context: "Empleada de comercio. Su última mamografía fue hace 6 años." },
  frequency: "frecuente",
  intro: "“Bañándome me toqué un bulto en la teta izquierda. No me duele. Lo tengo hace como dos meses y creo que está más grande.”",
  vitals: { TA: "126/80 mmHg", FC: "76 lpm", Peso: "72 kg" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo lo nota? ¿Cambió?", "clave", "“Dos meses, y me parece que creció.”", "Un nódulo nuevo que crece en una mujer posmenopáusica es sospechoso hasta demostrar lo contrario."),
    act("dolor", "¿Le duele? ¿Cambia con el ciclo?", "util", "“No duele. No menstrúo hace 3 años.”", "El dolor cíclico orienta a patología benigna; el cáncer suele ser indoloro."),
    act("pezon", "¿Tuvo secreción por el pezón o cambios en la piel?", "clave", "“No vi secreción. La piel creo que está igual.”", "La secreción sanguinolenta unilateral y los cambios cutáneos (piel de naranja, retracción) son signos de alarma."),
    act("familia", "¿Hay cáncer de mama u ovario en la familia?", "clave", "“Mi tía, la hermana de mi mamá, tuvo cáncer de mama a los 60.”", "Los antecedentes familiares (sobre todo de primer grado o jóvenes) aumentan el riesgo y pueden indicar asesoramiento genético."),
    act("hormonas", "¿Tomó terapia hormonal? ¿A qué edad tuvo la primera menstruación y el primer hijo?", "util", "“Me vino a los 11; mi único hijo, a los 34. Hormonas nunca.”", "Menarca temprana, primer embarazo tardío y terapia hormonal prolongada aumentan el riesgo (mayor exposición a estrógenos)."),
    act("habitos", "¿Toma alcohol? ¿Hace actividad física?", "util", "“Vino en las comidas. No hago ejercicio.”", "Alcohol, obesidad posmenopáusica y sedentarismo son factores de riesgo modificables."),
    act("sistemicos", "¿Bajó de peso, tiene dolor de huesos, tos o falta de aire?", "clave", "“No.”", "Síntomas que harían pensar en enfermedad metastásica (hueso, pulmón, hígado)."),
    act("mamografia", "¿Por qué no se hizo la mamografía estos años?", "util", "“No tenía tiempo y me daba miedo.”", "Las barreras al tamizaje son un blanco de intervención."),
    act("receta", "¿Le gusta cocinar?", "neutro", "“Sí, mucho.”", "No orienta."),
  ],
  exam: [
    act("mama", "Examen mamario (inspección y palpación)", "clave", "Nódulo de 2,5 cm en el cuadrante superoexterno izquierdo, duro, irregular, poco móvil. Leve retracción de la piel al elevar los brazos.", "Duro, irregular, fijo y con retracción: características de malignidad."),
    act("axila", "Palpación axilar y supraclavicular", "clave", "Adenopatía axilar izquierda de 1,5 cm, firme, móvil. Fosa supraclavicular libre.", "Sugiere compromiso ganglionar regional."),
    act("contralateral", "Mama derecha", "util", "Sin hallazgos.", "Se examinan siempre ambas mamas."),
    act("higado", "Palpación hepática y columna", "util", "Sin hepatomegalia ni dolor óseo.", "Busca signos de enfermedad a distancia."),
  ],
  studies: [
    study("Imágenes", "mamografia", "Mamografía bilateral más ecografía mamaria y axilar", "clave", "Masa espiculada de 24 mm con microcalcificaciones (BI-RADS 5). Ganglio axilar con cortical engrosada.", "BI-RADS 5: alta sospecha de malignidad (más del 95 %); requiere biopsia."),
    study("Otros", "core", "Biopsia percutánea con aguja gruesa (core) del nódulo y punción del ganglio", "clave", "Carcinoma ductal invasor (no especial), grado 2; receptores de estrógeno y progesterona positivos, HER2 negativo, Ki-67 18 %. Ganglio: metástasis.", "Confirma el diagnóstico y define el subtipo biológico, que guía el tratamiento."),
    study("Laboratorio", "marcadores", "Marcadores tumorales (CA 15-3, CEA) para diagnosticar", "innecesario", "No se realizaron.", "No sirven para diagnosticar ni para tamizar."),
    study("Imágenes", "estadificacion", "Estadificación: tomografía de tórax y abdomen, centellograma óseo (según estadio)", "util", "Sin metástasis a distancia.", "Indicada con compromiso ganglionar o tumores grandes."),
    study("Imágenes", "pet", "PET-TC de rutina", "innecesario", "No se realizó.", "No es estándar en la estadificación inicial de un tumor operable."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cancer", "Carcinoma ductal invasor de mama izquierda, luminal (RH+, HER2−), con compromiso axilar, sin metástasis a distancia", true, "Nódulo duro, irregular y fijo con adenopatía axilar, BI-RADS 5 y biopsia confirmatoria con metástasis ganglionar."),
      dx("fibroadenoma", "Fibroadenoma", false, "Típico de mujeres jóvenes: nódulo elástico, móvil, bien delimitado, sin retracción ni adenopatías."),
      dx("quiste", "Quiste mamario", false, "Redondeado, móvil, a veces doloroso, anecoico en la ecografía; más en la premenopausia."),
      dx("mastitis", "Mastitis o absceso", false, "Dolor, eritema, calor y fiebre, sobre todo en la lactancia."),
      dx("necrosis", "Necrosis grasa", false, "Antecedente de trauma o cirugía; puede imitar un cáncer, pero la biopsia es concluyente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("multidisciplinario", "Derivación a mastología y oncología para decisión en comité multidisciplinario", "clave", "El tratamiento combina cirugía, radioterapia y tratamiento sistémico según el estadio y el subtipo."),
      mg("cirugia", "Cirugía (conservadora o mastectomía) con evaluación axilar, más radioterapia si es conservadora", "clave", "Tratamiento locorregional del cáncer de mama operable."),
      mg("hormono", "Hormonoterapia (inhibidor de aromatasa en posmenopáusica) por al menos 5 años, más quimioterapia según el riesgo", "clave", "Los tumores con receptores hormonales positivos responden a la hormonoterapia."),
      mg("genetica", "Considerar asesoramiento genético según los antecedentes", "util", "Cánceres familiares o tempranos pueden deberse a mutaciones (BRCA1/2)."),
      mg("acompanar", "Acompañamiento psicológico y explicación clara del plan", "util", "Mejora la adherencia y la calidad de vida."),
      mg("controlar", "Control con ecografía en 6 meses para ver si crece", "riesgoso", "Con BI-RADS 5 y adenopatía, la demora empeora el pronóstico."),
      mg("paaf", "Solo punción con aguja fina (citología) para decidir todo", "innecesario", "La biopsia con aguja gruesa es superior: da la histología, el grado y los receptores."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma ductal invasor de mama izquierda, luminal (RH+, HER2−), con metástasis axilar, sin metástasis a distancia, en mujer de 54 años sin tamizaje reciente.",
    pathologies: [
      { name: "Carcinoma ductal invasor de mama", role: "principal", why: "Confirmado por biopsia." },
      { name: "Metástasis ganglionar axilar", role: "asociada", why: "Estadio regional." },
      { name: "Fibroadenoma y quiste", role: "diferencial", why: "Nódulos benignos frecuentes." },
      { name: "Mastitis y necrosis grasa", role: "diferencial", why: "Pueden imitar un cáncer." },
    ],
    reasoning: [
      "Causa: acumulación de mutaciones en el epitelio de los conductos mamarios, favorecida por la exposición estrogénica prolongada, la edad, factores genéticos y el estilo de vida.",
      "Mecanismo: las células malignas atraviesan la membrana basal, invaden el estroma (con reacción desmoplásica que da la consistencia dura y la retracción) y se diseminan por los linfáticos a la axila.",
      "Consecuencia: nódulo duro, irregular, indoloro, con retracción de piel o pezón y adenopatías; luego metástasis en hueso, pulmón, hígado y cerebro.",
      "Los receptores hormonales y el HER2 definen el subtipo y la sensibilidad a la hormonoterapia o a las terapias dirigidas.",
    ],
    epidemiology:
      "El cáncer de mama es el cáncer más frecuente en las mujeres argentinas (alrededor de 22.000 casos nuevos por año) y la primera causa de muerte por cáncer en mujeres. La incidencia aumenta con la edad, sobre todo después de los 50. Solo el 1 % ocurre en varones. El Programa Nacional recomienda mamografía cada 2 años entre los 50 y 69 años.",
    management: [
      "Ante un nódulo: triple evaluación (examen clínico, imágenes y biopsia).",
      "Mamografía y ecografía; BI-RADS 4 o 5 requiere biopsia con aguja gruesa.",
      "Estadificación según el tamaño y la axila; definir subtipo (RE, RP, HER2, Ki-67).",
      "Tratamiento multidisciplinario: cirugía, radioterapia, quimioterapia, hormonoterapia o terapia anti-HER2 según el caso.",
      "Tamizaje poblacional con mamografía y asesoramiento genético en familias de riesgo.",
    ],
    sources: [
      "Instituto Nacional del Cáncer — Programa Nacional de Control de Cáncer de Mama: guías de diagnóstico y tamizaje.",
      "Sociedad Argentina de Mastología — Consensos de tratamiento.",
    ],
    pearls: ["Nódulo duro, irregular y fijo en la posmenopausia: biopsia.", "BI-RADS 5 = biopsia, no control.", "Mamografía cada 2 años de 50 a 69."],
    pitfalls: ["Controlar con ecografía un nódulo sospechoso.", "Pedir marcadores para diagnosticar.", "No palpar la axila."],
    tribunal: [
      qa("¿Qué es el sistema BI-RADS?", "Clasificación de los hallazgos de imagen mamaria: 0 incompleto, 1 negativo, 2 benigno, 3 probablemente benigno (control en 6 meses), 4 sospechoso (biopsia), 5 altamente sugestivo de malignidad (biopsia), 6 malignidad confirmada."),
      qa("¿Cuáles son los subtipos moleculares del cáncer de mama?", "Luminal A (RH+, HER2−, Ki-67 bajo), luminal B (RH+, Ki-67 alto o HER2+), HER2 positivo (no luminal) y triple negativo (RE−, RP−, HER2−), el de peor pronóstico, más frecuente en jóvenes y portadoras de BRCA1."),
      qa("¿Cuáles son los factores de riesgo del cáncer de mama?", "Sexo femenino, edad, antecedentes familiares y mutaciones (BRCA1/2), menarca temprana, menopausia tardía, nuliparidad o primer hijo tardío, terapia hormonal, obesidad posmenopáusica, alcohol, sedentarismo, radiación torácica previa y antecedente personal."),
      qa("¿Cómo se hace el tamizaje en la Argentina?", "Mamografía cada 2 años entre los 50 y 69 años en mujeres de riesgo promedio; en mujeres de alto riesgo se empieza antes y puede sumarse resonancia."),
    ],
  },
};
