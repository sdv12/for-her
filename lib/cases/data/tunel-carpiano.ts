import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tunelCarpiano: ClinicalCase = {
  id: "sindrome-tunel-carpiano",
  level: 1,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Costurera. Tiene sobrepeso y hipotiroidismo." },
  frequency: "muy-frecuente",
  intro: "“Hace meses se me duermen los dedos de la mano derecha, sobre todo de noche. Me despierto y tengo que sacudir la mano. Ahora se me caen las cosas.”",
  vitals: { TA: "130/82 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "82 kg" },
  anamnesis: [
    act("dedos", "¿Qué dedos se te duermen?", "clave", "“El pulgar, el índice y el mayor; el meñique no.”", "Territorio del nervio mediano."),
    act("noche", "¿Cuándo empeora? ¿Te despierta?", "clave", "“De noche y cuando coso; me despierto y sacudo la mano.”", "Parestesias nocturnas que mejoran al sacudir la mano (signo del sacudimiento): muy típicas."),
    act("debilidad", "¿Perdiste fuerza o se te caen cosas?", "clave", "“Se me caen las agujas.”", "Debilidad de la musculatura tenar: compromiso motor."),
    act("cuello", "¿Te duele el cuello o el dolor baja desde el cuello?", "util", "“No.”", "Descarta radiculopatía cervical C6–C7."),
    act("factores", "¿Tenés diabetes, tiroides, artritis o estás embarazada?", "util", "“Hipotiroidismo, tomo levotiroxina.”", "Condiciones asociadas al túnel carpiano."),
    act("costura", "¿Qué cosés?", "neutro", "“Uniformes escolares.”", "La actividad repetitiva sí importa, pero el tipo de prenda no orienta."),
  ],
  exam: [
    act("tinel", "Signo de Tinel en la muñeca", "clave", "Positivo: percutir el carpo reproduce las parestesias.", "Compresión del mediano."),
    act("phalen", "Maniobra de Phalen", "clave", "Positiva a los 30 segundos.", "La flexión mantenida de la muñeca aumenta la presión en el túnel."),
    act("tenar", "Inspección y fuerza de la eminencia tenar", "util", "Atrofia tenar leve, debilidad para la abducción del pulgar.", "Compromiso motor: indica evaluar la cirugía."),
    act("sensibilidad", "Sensibilidad de la mano", "util", "Hipoestesia en pulgar, índice, mayor y mitad del anular.", "Distribución del mediano."),
  ],
  studies: [
    study("Electrofisiología", "emg", "Electromiograma con velocidad de conducción", "clave", "Enlentecimiento de la conducción del mediano en el carpo, moderado a grave.", "Confirma y gradúa la gravedad; útil antes de la cirugía."),
    study("Laboratorio", "lab", "TSH y glucemia", "util", "TSH 6,8 (levemente alta), glucemia normal.", "Hipotiroidismo mal controlado: factor contribuyente."),
    study("Imágenes", "rmn", "Resonancia de columna cervical", "innecesario", "No se realizó.", "Sin síntomas cervicales ni hallazgos radiculares."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("stc", "Síndrome del túnel carpiano derecho moderado a grave, con compromiso motor", true, "Parestesias nocturnas en el territorio del mediano, Tinel y Phalen positivos, atrofia tenar y electromiograma compatible, en mujer con hipotiroidismo y trabajo manual."),
      dx("cervical", "Radiculopatía cervical C6", false, "No hay dolor cervical y el patrón es del mediano en el carpo."),
      dx("cubital", "Neuropatía cubital", false, "Afectaría el meñique y la mitad del anular."),
      dx("polineuropatia", "Polineuropatía diabética", false, "Sería bilateral, simétrica, de predominio en pies; no es diabética."),
      dx("rizartrosis", "Rizartrosis del pulgar", false, "Da dolor en la base del pulgar, no parestesias."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Derivar a cirugía de mano para liberación del túnel carpiano", "clave", "Con atrofia tenar y compromiso moderado a grave, la cirugía evita el daño permanente."),
      mg("ferula", "Férula nocturna en posición neutra mientras espera", "util", "Mejora los síntomas nocturnos en casos leves a moderados."),
      mg("tiroides", "Ajustar la levotiroxina", "clave", "El hipotiroidismo contribuye al edema del túnel."),
      mg("ergonomia", "Pausas y adaptación de la tarea", "util", "Reduce los movimientos repetitivos."),
      mg("infiltracion-repetida", "Infiltraciones con corticoides repetidas cada mes", "riesgoso", "Pueden dañar el nervio y los tendones; no tratan un caso con atrofia."),
      mg("aine-solo", "Solo antiinflamatorios por tiempo prolongado", "innecesario", "No tienen eficacia demostrada en el túnel carpiano."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome del túnel carpiano derecho moderado a grave, con atrofia tenar, en mujer de 52 años con trabajo manual repetitivo, sobrepeso e hipotiroidismo mal controlado.",
    pathologies: [
      { name: "Síndrome del túnel carpiano", role: "principal", why: "Neuropatía por compresión del mediano en la muñeca." },
      { name: "Hipotiroidismo", role: "asociada", why: "Factor predisponente." },
      { name: "Radiculopatía cervical, neuropatía cubital, polineuropatía", role: "diferencial", why: "Otras causas de parestesias en la mano." },
    ],
    reasoning: [
      "Causa: aumento de la presión en el túnel carpiano por movimientos repetitivos, sobrepeso, hipotiroidismo, embarazo, diabetes o artritis.",
      "Mecanismo: el nervio mediano se comprime bajo el ligamento transverso del carpo; primero isquemia y desmielinización, luego daño axonal.",
      "Consecuencia: parestesias nocturnas, dolor, hipoestesia y, en casos avanzados, atrofia tenar y pérdida de la destreza.",
    ],
    epidemiology:
      "El síndrome del túnel carpiano es la neuropatía por atrapamiento más frecuente. Es tres veces más común en mujeres, con pico entre los 40 y 60 años. Se asocia a trabajos manuales repetitivos, embarazo, obesidad, hipotiroidismo, diabetes y artritis reumatoidea; puede ser enfermedad profesional.",
    management: [
      "Diagnóstico clínico (Tinel, Phalen, distribución) y electromiograma si hay dudas o antes de operar.",
      "Leve a moderado: férula nocturna, infiltración, tratar la causa.",
      "Moderado a grave o con atrofia: cirugía de liberación.",
      "Evaluar si es enfermedad profesional.",
    ],
    sources: ["Asociación Argentina de Cirugía de la Mano — Recomendaciones sobre síndrome del túnel carpiano.", "Superintendencia de Riesgos del Trabajo — Listado de enfermedades profesionales."],
    pearls: ["Parestesias nocturnas que mejoran al sacudir la mano.", "Atrofia tenar = cirugía.", "Buscar hipotiroidismo, diabetes y embarazo."],
    pitfalls: ["Confundirlo con un problema cervical.", "Demorar la cirugía con atrofia."],
    tribunal: [
      qa("¿Qué inerva el nervio mediano en la mano?", "Sensibilidad de la cara palmar del pulgar, índice, mayor y mitad radial del anular; motor de la eminencia tenar (abductor corto, oponente y flexor corto del pulgar) y los dos primeros lumbricales."),
      qa("¿Qué son los signos de Tinel y Phalen?", "Tinel: percutir sobre el nervio en la muñeca reproduce las parestesias en su territorio. Phalen: mantener las muñecas en flexión máxima durante 60 segundos reproduce los síntomas."),
      qa("¿Qué es una enfermedad profesional en Argentina?", "Una enfermedad producida por la exposición a agentes o tareas del trabajo, incluida en el listado de la Ley de Riesgos del Trabajo (24.557); la cubre la ART con atención médica y prestaciones."),
    ],
  },
};
