import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colitisUlcerosa: ClinicalCase = {
  id: "colitis-ulcerosa-brote-grave",
  level: 3,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 33, ageUnit: "años", sex: "F", context: "Dejó de fumar hace un año. Diagnóstico previo de “hemorroides”." },
  frequency: "poco-frecuente",
  intro: "“Hace dos semanas voy al baño más de ocho veces por día, con sangre. Me levanto de noche, tengo fiebre y estoy muy débil.”",
  vitals: { TA: "100/62 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "38,2 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("deposiciones", "¿Cuántas deposiciones y con cuánta sangre?", "clave", "“Más de ocho, casi todas con sangre y moco, y ganas de ir sin poder hacer nada.”", "Rectorragia con tenesmo: típico de proctocolitis."),
    act("evolucion", "¿Pasó antes?", "clave", "“Hace un año, más leve, y se me fue.”", "Curso crónico con brotes."),
    act("infeccion", "¿Antibióticos, viajes o comida sospechosa? ¿Personas enfermas?", "clave", "“Tomé amoxicilina hace un mes.”", "Hay que descartar C. difficile y otras infecciones."),
    act("aines", "¿Tomás ibuprofeno u otros?", "util", "“Sí, para el dolor.”", "Los AINE pueden desencadenar brotes."),
    act("embarazo", "¿Podrías estar embarazada?", "util", "“No.”", "Condiciona estudios y tratamiento."),
    act("hobby", "¿Qué hacés en tu tiempo libre?", "neutro", "“Tejo.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Doloroso en hemiabdomen izquierdo, sin distensión marcada ni peritonismo.", "Descarta por ahora megacolon y perforación."),
    act("hemodinamia", "Estado general y mucosas", "clave", "Palidez, taquicardia, deshidratación leve.", "Criterios de brote grave."),
    act("tacto", "Tacto rectal", "util", "Sangre y moco en el dedo de guante.", "Confirma el sangrado."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, albúmina, ionograma", "clave", "Hb 9,5, plaquetas altas, PCR 60, albúmina 2,8, K 3,2.", "Brote grave según criterios de Truelove y Witts."),
    study("Microbiología", "heces", "Coprocultivo y toxina de C. difficile, CMV según el caso", "clave", "Negativos.", "Se excluyen antes de intensificar la inmunosupresión."),
    study("Imágenes", "rx", "Radiografía de abdomen", "clave", "Colon transverso de 4,5 cm, sin aire libre.", "Busca megacolon tóxico y perforación."),
    study("Imágenes", "rectosigmoidoscopia", "Rectosigmoidoscopía con biopsias, sin preparación agresiva", "clave", "Mucosa continua friable y ulcerada desde el recto.", "Confirma; una colonoscopía completa es riesgosa en el brote grave."),
    study("Imágenes", "colono", "Colonoscopía total con preparación", "riesgoso", "No se realizó.", "En el brote grave puede precipitar perforación o megacolon."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cu", "Colitis ulcerosa en brote grave", true, "Más de 6 deposiciones con sangre, fiebre, taquicardia, anemia y PCR alta, con mucosa continua desde el recto e infección descartada."),
      dx("crohn", "Enfermedad de Crohn", false, "Daría lesiones salteadas y compromiso perianal o ileal."),
      dx("hemorroides", "Hemorroides", false, "No causan diarrea, fiebre ni inflamación sistémica."),
      dx("difficile", "Colitis por C. difficile", false, "La toxina es negativa."),
      dx("isquemica", "Colitis isquémica", false, "Afecta a mayores con factores vasculares, respeta el recto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internar, hidratar, corregir potasio y anemia", "clave", "Es una emergencia médica."),
      mg("corticoides", "Corticoides EV", "clave", "Tratamiento de primera línea del brote grave."),
      mg("heparina", "Profilaxis antitrombótica con heparina", "clave", "Alto riesgo de trombosis, aun con sangrado rectal."),
      mg("cirugia", "Evaluación conjunta con cirugía; rescate con infliximab o ciclosporina si no responde al día 3", "clave", "Si falla, se requiere rescate o colectomía."),
      mg("antidiarreicos", "Loperamida y opioides", "riesgoso", "Pueden precipitar megacolon tóxico."),
      mg("aines", "AINE para la fiebre y el dolor", "riesgoso", "Pueden empeorar el brote."),
    ],
  },
  debrief: {
    diagnosis: "Colitis ulcerosa en brote grave, con anemia e hipopotasemia, en mujer de 33 años.",
    pathologies: [
      { name: "Colitis ulcerosa", role: "principal", why: "Inflamación continua de la mucosa colónica." },
      { name: "Riesgo de megacolon tóxico", role: "asociada", why: "Complicación principal." },
      { name: "Crohn, C. difficile, colitis isquémica", role: "diferencial", why: "Otras causas de diarrea sanguinolenta." },
    ],
    reasoning: [
      "Causa: respuesta inmune anormal contra la microbiota colónica en personas predispuestas.",
      "Mecanismo: inflamación de la mucosa que empieza en el recto y se extiende en forma continua, con úlceras y friabilidad.",
      "Consecuencia: diarrea con sangre, tenesmo, anemia; riesgo de megacolon, perforación y cáncer colorrectal a largo plazo.",
    ],
    epidemiology:
      "La colitis ulcerosa tiene un pico entre los 15 y los 35 años y es más frecuente en no fumadores y exfumadores. Muchos pacientes reciben diagnósticos erróneos, como hemorroides o colon irritable, antes de la endoscopía. Los brotes graves requieren internación.",
    management: [
      "Evaluar la gravedad con criterios de Truelove y Witts.",
      "Descartar infecciones.",
      "Corticoides EV, hidratación y profilaxis de trombosis.",
      "Rescate o colectomía si no hay respuesta; vigilancia de cáncer a largo plazo.",
    ],
    sources: ["Grupo Argentino de Enfermedad Inflamatoria Intestinal — Recomendaciones.", "ECCO — Guías de colitis ulcerosa."],
    pearls: ["Rectorragia con tenesmo y diarrea nocturna no son hemorroides.", "Brote grave: 6 o más deposiciones con sangre y un signo sistémico.", "Heparina a pesar del sangrado."],
    pitfalls: ["Hacer colonoscopía total en el brote grave.", "Dar antidiarreicos."],
    tribunal: [
      qa("¿Cuáles son los criterios de Truelove y Witts?", "6 o más deposiciones con sangre por día y al menos uno de: temperatura mayor de 37,8 °C, frecuencia mayor de 90 lpm, Hb menor de 10,5 g/dl o eritrosedimentación mayor de 30 (o PCR elevada)."),
      qa("¿Qué es el megacolon tóxico?", "Una dilatación colónica de más de 6 cm con toxicidad sistémica; es una emergencia y puede perforarse."),
      qa("¿Qué riesgo oncológico tiene la colitis ulcerosa?", "Mayor riesgo de cáncer colorrectal según extensión y duración: se indica vigilancia endoscópica desde los 8 años del diagnóstico."),
    ],
  },
};
