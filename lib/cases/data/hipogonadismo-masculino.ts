import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipogonadismoMasculino: ClinicalCase = {
  id: "hipogonadismo-masculino",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 23, ageUnit: "años", sex: "M", context: "Estudiante. Muy alto y delgado. Su novia lo convenció de consultar." },
  frequency: "poco-frecuente",
  intro: "“Casi no me crece la barba, tengo poco deseo y me crecieron un poco las tetillas.”",
  vitals: { TA: "116/70 mmHg", FC: "68 lpm", Peso: "72 kg (talla 1,91 m)" },
  anamnesis: [
    act("desarrollo", "¿Cómo fue su desarrollo puberal?", "clave", "“Tarde y como incompleto. Nunca me afeité seguido.”", "Pubertad incompleta: hipogonadismo de inicio puberal."),
    act("sexual", "¿Erecciones matinales, deseo sexual?", "clave", "“Pocas, y casi no tengo ganas.”", "Síntomas de déficit de testosterona."),
    act("olfato", "¿Siente bien los olores?", "clave", "“Sí, normal.”", "La anosmia con hipogonadismo orienta a síndrome de Kallmann (central)."),
    act("escolar", "¿Cómo le fue en la escuela?", "util", "“Me costó Lengua, repetí una vez.”", "Dificultades de lenguaje y aprendizaje son comunes en Klinefelter."),
    act("drogas", "¿Usó anabólicos o toma algún medicamento?", "clave", "“No, nunca.”", "Anabólicos causan hipogonadismo secundario."),
    act("deporte", "¿Hace deporte?", "neutro", "“Vóley.”", "No orienta."),
  ],
  exam: [
    act("testiculos", "Testículos con orquidómetro", "clave", "Testículos de 4 ml, firmes.", "Testículos muy pequeños y duros: Klinefelter."),
    act("habito", "Hábito corporal", "clave", "Brazos y piernas largos (envergadura mayor que la talla), vello escaso, ginecomastia bilateral.", "Hábito eunucoide."),
    act("pene", "Pene", "util", "Tamaño normal.", "La virilización fetal fue normal."),
  ],
  studies: [
    study("Laboratorio", "testosterona", "Testosterona total a las 8 de la mañana", "clave", "180 ng/dl (baja).", "Confirma el hipogonadismo; repetir una vez."),
    study("Laboratorio", "lh-fsh", "LH y FSH", "clave", "LH 22 y FSH 38 mUI/ml (altas).", "Hipogonadismo primario (hipergonadotrófico)."),
    study("Laboratorio", "cariotipo", "Cariotipo", "clave", "47,XXY.", "Confirma Klinefelter."),
    study("Otros", "espermograma", "Espermograma", "util", "Azoospermia.", "Orienta la fertilidad."),
    study("Imágenes", "rmn-hipofisis", "Resonancia de hipófisis", "innecesario", "No se pidió.", "Con gonadotrofinas altas el problema es testicular."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("klinefelter", "Hipogonadismo primario por síndrome de Klinefelter (47,XXY)", true, "Testículos pequeños y duros, hábito eunucoide, ginecomastia, testosterona baja con LH y FSH altas y cariotipo 47,XXY."),
      dx("kallmann", "Síndrome de Kallmann", false, "Olfato normal y gonadotrofinas altas: no es central."),
      dx("prolactinoma", "Prolactinoma", false, "Daría gonadotrofinas bajas."),
      dx("anabolicos", "Hipogonadismo por anabólicos", false, "Niega consumo y las gonadotrofinas están altas."),
      dx("retraso-constitucional", "Retraso constitucional del crecimiento y la pubertad", false, "A los 23 años ya no es un retraso, y las gonadotrofinas están altas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("testosterona", "Reemplazo con testosterona", "clave", "Mejora la libido, el vello, la masa muscular y ósea."),
      mg("fertilidad", "Derivar a fertilidad antes de empezar la testosterona (micro-TESE)", "clave", "La testosterona suprime la espermatogénesis residual."),
      mg("densitometria", "Densitometría ósea", "util", "Riesgo de osteoporosis."),
      mg("seguimiento", "Control de hematocrito, PSA y perfil metabólico", "clave", "Seguridad del tratamiento y riesgo metabólico."),
      mg("psico", "Asesoramiento genético y psicológico", "util", "Impacto del diagnóstico."),
      mg("clomifeno", "Clomifeno para estimular los testículos", "innecesario", "No sirve en una falla testicular primaria."),
      mg("decir-esteril", "Decirle que nunca podrá tener hijos", "riesgoso", "Falso: hay opciones con extracción testicular de espermatozoides."),
    ],
  },
  debrief: {
    diagnosis: "Hipogonadismo hipergonadotrófico por síndrome de Klinefelter (47,XXY), en un hombre de 23 años.",
    pathologies: [
      { name: "Síndrome de Klinefelter", role: "principal", why: "Cromosoma X extra que causa falla testicular." },
      { name: "Ginecomastia y riesgo de osteoporosis", role: "asociada", why: "Déficit de andrógenos." },
      { name: "Síndrome de Kallmann", role: "diferencial", why: "Hipogonadismo central con anosmia." },
    ],
    reasoning: [
      "Causa: no disyunción meiótica que deja un cromosoma X extra.",
      "Mecanismo: hialinización de los túbulos seminíferos y falla de las células de Leydig.",
      "Consecuencia: testosterona baja, gonadotrofinas altas, infertilidad y desarrollo puberal incompleto.",
    ],
    epidemiology:
      "Es la causa genética más frecuente de hipogonadismo masculino, con 1 de cada 600 varones. Hasta el 70 % no se diagnostica nunca o se diagnostica en la adultez, a menudo por infertilidad. Aumenta el riesgo de osteoporosis, síndrome metabólico, cáncer de mama y tumores de células germinales mediastínicos.",
    management: [
      "Testosterona matinal, LH y FSH.",
      "Cariotipo si son altas.",
      "Preservación de fertilidad antes de la testosterona.",
      "Reemplazo y seguimiento metabólico y óseo.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipogonadismo masculino.", "Endocrine Society — Testosterone therapy in men with hypogonadism."],
    pearls: ["Testículo chico y duro + alto + ginecomastia.", "LH y FSH altas = primario.", "Fertilidad antes de la testosterona."],
    pitfalls: ["Dar testosterona sin hablar de fertilidad.", "Pedir resonancia con gonadotrofinas altas."],
    tribunal: [
      qa("¿Cómo se distingue el hipogonadismo primario del secundario?", "Por las gonadotrofinas: altas en el primario o testicular, y bajas o inapropiadamente normales en el central."),
      qa("¿Qué riesgos aumenta el síndrome de Klinefelter?", "Osteoporosis, síndrome metabólico, diabetes, cáncer de mama masculino, tumores germinales mediastínicos y enfermedades autoinmunes."),
      qa("¿Por qué no se usa clomifeno en el Klinefelter?", "Porque estimula la hipófisis, que ya está estimulada al máximo; el problema es el testículo que no responde."),
    ],
  },
};
