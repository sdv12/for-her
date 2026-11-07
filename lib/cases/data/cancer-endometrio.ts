import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerEndometrio: ClinicalCase = {
  id: "cancer-de-endometrio",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Menopausia a los 54. Obesa, diabética e hipertensa. Sin hijos." },
  frequency: "frecuente",
  intro: "“Hace dos meses me volvió a salir sangre abajo. Pensé que era algo de la edad, y no me duele.”",
  vitals: { TA: "150/88 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "98 kg", Glucemia: "142 mg/dl" },
  anamnesis: [
    act("sangrado", "¿Cuánto hace de tu última menstruación? ¿Cómo es el sangrado?", "clave", "“Nueve años; ahora mancho casi todos los días.”", "Sangrado posmenopáusico: cáncer de endometrio hasta demostrar lo contrario."),
    act("estrogenos", "¿Usás hormonas o tamoxifeno?", "clave", "“Tomé estrógenos solos varios años.”", "Exposición a estrógenos sin oposición."),
    act("riesgos", "¿Embarazos, menstruaciones tardías, peso?", "clave", "“Sin hijos, obesa desde joven.”", "Factores de riesgo."),
    act("familia", "¿Cáncer de colon u ovario en la familia?", "util", "“Mi hermana, colon a los 45.”", "Sugiere síndrome de Lynch."),
    act("pap", "¿Último PAP?", "util", "“Hace 10 años.”", "Hay que evaluar el cuello."),
    act("radio", "¿Qué radio escuchás?", "neutro", "“Cadena 3.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Sangrado por orificio cervical, cuello sano, sin atrofia intensa.", "Sangrado de origen uterino."),
    act("tacto", "Tacto vaginal y rectal", "clave", "Útero levemente aumentado, móvil, sin parametrios tomados.", "Sugiere enfermedad localizada."),
    act("ganglios", "Ganglios y abdomen", "util", "Sin masas ni adenopatías.", "Busca diseminación."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Endometrio de 16 mm, heterogéneo.", "En posmenopausia, más de 4-5 mm requiere biopsia."),
    study("Otros", "biopsia", "Biopsia de endometrio", "clave", "Adenocarcinoma endometrioide grado 1.", "Confirma el diagnóstico."),
    study("Imágenes", "rmn", "RM de pelvis y TC de tórax y abdomen", "clave", "Invasión de menos de la mitad del miometrio, sin ganglios.", "Estadificación prequirúrgica."),
    study("Laboratorio", "ca125", "CA-125 para diagnosticar", "innecesario", "Normal.", "No diagnostica cáncer de endometrio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("endometrio", "Adenocarcinoma de endometrio endometrioide en estadio inicial", true, "Sangrado posmenopáusico, factores de riesgo, endometrio grueso y biopsia confirmatoria."),
      dx("atrofia", "Atrofia endometrial", false, "Es la causa más frecuente, pero da endometrio fino."),
      dx("polipo", "Pólipo endometrial", false, "La biopsia muestra carcinoma."),
      dx("cervix", "Cáncer de cuello uterino", false, "Cuello sano."),
      dx("miomas", "Miomatosis", false, "No suele sangrar tras la menopausia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Histerectomía total con anexectomía bilateral y estadificación ganglionar (centinela)", "clave", "Es el tratamiento principal."),
      mg("comite", "Comité oncológico para definir radioterapia adyuvante según riesgo", "clave", "Depende del estadio y del grado."),
      mg("lynch", "Evaluar inestabilidad de microsatélites y derivar a genética", "clave", "Antecedentes de Lynch."),
      mg("comorbilidades", "Controlar peso, diabetes y presión", "util", "Mejora sobrevida y cirugía."),
      mg("hormonas", "Estrógenos para mejorar la atrofia", "riesgoso", "Alimentan el tumor."),
      mg("observar", "Controlar en 6 meses si no vuelve a sangrar", "riesgoso", "Demora un cáncer curable."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de endometrio endometrioide grado 1, estadio inicial, en mujer de 63 años con obesidad y diabetes.",
    pathologies: [
      { name: "Cáncer de endometrio", role: "principal", why: "Tumor maligno del cuerpo uterino." },
      { name: "Obesidad, diabetes, posible Lynch", role: "asociada", why: "Factores de riesgo." },
      { name: "Atrofia, pólipo, cáncer de cuello", role: "diferencial", why: "Otras causas de sangrado." },
    ],
    reasoning: [
      "Causa: estrógenos sin progesterona, por obesidad, anovulación o fármacos.",
      "Mecanismo: hiperplasia atípica que progresa a carcinoma.",
      "Consecuencia: sangrado precoz, por lo que se diagnostica temprano; invasión y metástasis si se demora.",
    ],
    epidemiology:
      "Es el cáncer ginecológico más común en países de altos ingresos, y crece con la obesidad. Afecta sobre todo a mujeres posmenopáusicas. El sangrado temprano permite un buen pronóstico en la mayoría. No hay tamizaje en mujeres sin síntomas.",
    management: [
      "Biopsia ante sangrado posmenopáusico.",
      "Estadificación quirúrgica.",
      "Adyuvancia según riesgo.",
      "Evaluar Lynch y controlar factores.",
    ],
    sources: ["Instituto Nacional del Cáncer — Guías oncológicas.", "FIGO — Estadificación de cáncer de endometrio."],
    pearls: ["Sangrado tras la menopausia: siempre estudiar.", "Endometrio de más de 4 mm: biopsia.", "Tamoxifeno y Lynch aumentan el riesgo."],
    pitfalls: ["Atribuirlo a la edad.", "Usar PAP para diagnosticar."],
    tribunal: [
      qa("¿Qué tipos hay?", "Tipo I: endometrioide, dependiente de estrógenos, bajo grado. Tipo II: seroso o de células claras, más agresivo, en mujeres mayores."),
      qa("¿Cuál es la lesión precursora?", "La hiperplasia endometrial con atipia, o neoplasia intraepitelial endometrial."),
      qa("¿Qué es el síndrome de Lynch?", "Un síndrome autosómico dominante con mutación de reparación del ADN, con riesgo de cáncer colorrectal, de endometrio, ovario y otros."),
    ],
  },
};
