import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const amenorreaHipotalamica: ClinicalCase = {
  id: "amenorrea-hipotalamica-funcional",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 20, ageUnit: "años", sex: "F", context: "Atleta de fondo, entrena 2 veces por día. Bajó 6 kg este año." },
  frequency: "frecuente",
  intro: "“Hace seis meses no me viene la menstruación. Tuve una fractura por estrés en el pie.”",
  vitals: { TA: "96/60 mmHg", FC: "48 lpm", "T°": "36,1 °C", Peso: "48 kg (talla 1,68 m)" },
  anamnesis: [
    act("ejercicio", "¿Cuánto entrenás?", "clave", "“Dos veces por día, 120 km por semana.”", "Gasto energético alto."),
    act("alimentacion", "¿Cómo comés?", "clave", "“Poco, para rendir mejor.”", "Baja disponibilidad energética."),
    act("embarazo", "¿Podés estar embarazada?", "clave", "“No tengo relaciones.”", "Igual se descarta."),
    act("fractura", "¿Cómo fue la fractura?", "util", "“Sin golpe, corriendo.”", "Baja masa ósea."),
    act("galactorrea", "¿Secreción por los pezones o dolor de cabeza?", "util", "“No.”", "Prolactinoma."),
    act("prueba", "¿Qué distancia corrés?", "neutro", "“10 km.”", "No orienta."),
  ],
  exam: [
    act("imc", "IMC y signos", "clave", "IMC 17, bradicardia.", "Déficit energético."),
    act("hirsutismo", "Hirsutismo o acné", "clave", "Ausentes.", "Excluye SOP."),
    act("genital", "Mucosa vaginal", "util", "Hipoestrogénica.", "Hipoestrogenismo."),
  ],
  studies: [
    study("Laboratorio", "bhcg", "Beta-hCG", "clave", "Negativa.", "Descarta embarazo."),
    study("Laboratorio", "hormonas", "FSH, LH, estradiol, prolactina, TSH", "clave", "FSH y LH bajas; estradiol bajo; prolactina y TSH normales.", "Hipogonadismo hipogonadotrófico."),
    study("Imágenes", "dmo", "Densitometría", "util", "Z-score −2,2.", "Baja masa ósea."),
    study("Otros", "acos-solos", "Indicar anticonceptivos para que 'vuelva' la menstruación", "riesgoso", "No se hizo.", "Enmascara el problema y no protege el hueso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("aht", "Amenorrea hipotalámica funcional por déficit energético relativo en el deporte", true, "Entrenamiento intenso, baja ingesta, FSH/LH bajas, estradiol bajo, fractura por estrés y baja masa ósea."),
      dx("sop", "Síndrome de ovario poliquístico", false, "Sin hiperandrogenismo y estradiol bajo."),
      dx("prolactinoma", "Prolactinoma", false, "Prolactina normal."),
      dx("iop", "Insuficiencia ovárica prematura", false, "FSH baja."),
      dx("embarazo", "Embarazo", false, "Beta negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("energia", "Aumentar la ingesta y reducir la carga de entrenamiento", "clave", "Tratamiento de fondo."),
      mg("equipo", "Equipo con nutricionista, medicina del deporte y salud mental", "clave", "Abordaje integral."),
      mg("tca", "Evaluar trastorno de la conducta alimentaria", "clave", "Frecuente."),
      mg("estradiol", "Estradiol transdérmico si no recupera", "util", "Protege el hueso."),
      mg("acos", "Solo anticonceptivos orales", "riesgoso", "Sangrado artificial sin tratar la causa."),
      mg("seguir", "Seguir igual porque rinde bien", "riesgoso", "Más fracturas y osteoporosis."),
    ],
  },
  debrief: {
    diagnosis: "Amenorrea hipotalámica funcional por déficit energético relativo en el deporte, con fractura por estrés y baja masa ósea, en atleta de 20 años.",
    pathologies: [
      { name: "Amenorrea hipotalámica funcional", role: "principal", why: "Supresión del eje por déficit energético." },
      { name: "Baja masa ósea y fractura por estrés", role: "asociada", why: "Hipoestrogenismo." },
      { name: "SOP, prolactinoma", role: "diferencial", why: "Otras amenorreas." },
    ],
    reasoning: [
      "Causa: gasto energético mayor que la ingesta.",
      "Mecanismo: el hipotálamo reduce la GnRH para ahorrar energía.",
      "Consecuencia: hipoestrogenismo, amenorrea y pérdida ósea.",
    ],
    epidemiology:
      "Es frecuente en deportistas de resistencia, bailarinas y mujeres con restricción alimentaria o estrés. La tríada de la atleta incluye baja disponibilidad energética, amenorrea y baja masa ósea. La recuperación de peso restaura las menstruaciones.",
    management: [
      "Beta-hCG.",
      "FSH, LH, prolactina, TSH.",
      "Energía.",
      "Hueso y salud mental.",
    ],
    sources: ["Sociedad Argentina de Endocrinología Ginecológica y Reproductiva — Amenorreas.", "Endocrine Society — Functional Hypothalamic Amenorrhea Guideline."],
    pearls: ["Amenorrea con FSH baja.", "Fractura por estrés: mirá el hueso.", "No tapar con anticonceptivos."],
    pitfalls: ["Anticonceptivos solos.", "No buscar TCA."],
    tribunal: [
      qa("¿Qué es el RED-S?", "Déficit energético relativo en el deporte, con efectos hormonales, óseos y de rendimiento."),
      qa("¿Qué estudios iniciales pedís en amenorrea secundaria?", "Beta-hCG, prolactina, TSH y FSH."),
      qa("¿Por qué el estradiol transdérmico y no oral?", "Porque el oral reduce el IGF-1 hepático, que es importante para el hueso."),
    ],
  },
};
