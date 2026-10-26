import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const lumbalgia: ClinicalCase = {
  id: "lumbalgia-aguda-mecanica",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 42, ageUnit: "años", sex: "M", context: "Albañil." },
  frequency: "muy-frecuente",
  intro: "“Ayer levanté una bolsa de cemento y sentí un tirón en la cintura. Hoy casi no me puedo agachar ni levantar de la cama.”",
  vitals: { TA: "130/80 mmHg", FC: "84 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("irradiacion", "¿El dolor baja por la pierna? ¿Hasta dónde?", "clave", "“No, se queda en la cintura, a veces en la nalga derecha.”", "Dolor que no pasa la rodilla es lumbalgia mecánica; si baja por debajo de la rodilla siguiendo un dermatoma, pensar en radiculopatía (ciática)."),
    act("esfinteres", "¿Tiene problemas para orinar, retener la materia fecal o adormecimiento en la zona genital?", "clave", "“No, nada de eso.”", "Retención urinaria, incontinencia o anestesia en silla de montar indican síndrome de cola de caballo: emergencia quirúrgica."),
    act("banderas", "¿Bajó de peso, tiene fiebre, tuvo cáncer o el dolor lo despierta de noche?", "clave", "“No. De noche si me quedo quieto no me duele.”", "Son banderas rojas de infección, tumor o fractura; su ausencia permite manejar sin estudios."),
    act("fuerza", "¿Tiene debilidad en alguna pierna?", "clave", "“No, camino bien, solo que me duele.”", "Un déficit motor progresivo obliga a estudiar y derivar."),
    act("mecanico", "¿Mejora con el reposo y empeora con el movimiento?", "util", "“Sí, al moverme me duele más.”", "Patrón mecánico. El dolor inflamatorio (rigidez matinal larga, mejora con la actividad, menor de 40 años) orienta a espondiloartritis."),
    act("laboral", "¿Cómo es su trabajo? ¿Tiene ART?", "util", "“Cargo peso todo el día. Estoy en negro.”", "Factores laborales y psicosociales (banderas amarillas) predicen cronicidad; también orientan la licencia."),
    act("futbol", "¿De qué cuadro es?", "neutro", "“De Racing.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Fuerza, reflejos y sensibilidad de miembros inferiores", "clave", "Fuerza conservada, reflejos rotulianos y aquilianos presentes y simétricos, sensibilidad normal.", "Un examen neurológico normal descarta compromiso radicular significativo."),
    act("lasegue", "Maniobra de Lasègue", "clave", "Negativa en ambos lados (dolor lumbar a 70°, sin irradiación).", "Positiva (dolor irradiado por debajo de la rodilla entre 30° y 70°) sugiere hernia discal con compromiso de L5 o S1."),
    act("palpacion", "Palpación de la columna y la musculatura paravertebral", "util", "Contractura paravertebral derecha, sin dolor en apófisis espinosas.", "El dolor óseo puntual sugeriría fractura o infección."),
    act("abdomen", "Palpación abdominal y pulsos", "util", "Abdomen normal, sin masa pulsátil.", "En mayores de 50 un aneurisma de aorta puede presentarse como lumbalgia."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de columna lumbosacra", "innecesario", "Leve rectificación de la lordosis.", "Sin banderas rojas no se pide antes de las 6 semanas: los hallazgos no cambian la conducta y suman radiación."),
    study("Imágenes", "rmn", "Resonancia de columna", "innecesario", "Protrusión discal L4-L5 sin compromiso radicular.", "Muchos adultos sin dolor tienen protrusiones: la resonancia sin indicación lleva a sobrediagnóstico. Se reserva para banderas rojas o déficit progresivo."),
    study("Laboratorio", "lab", "Hemograma y eritrosedimentación", "innecesario", "Normales.", "Solo si se sospecha infección o tumor."),
    study("Laboratorio", "orina", "Orina completa", "neutro", "Normal.", "Útil si hubiera dudas con un cólico renal; acá el dolor es mecánico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mecanica", "Lumbalgia aguda mecánica inespecífica", true, "Dolor lumbar tras un esfuerzo, mecánico, sin irradiación por debajo de la rodilla, sin banderas rojas y con examen neurológico normal."),
      dx("hernia", "Hernia de disco con radiculopatía L5-S1", false, "Daría dolor irradiado por la pierna siguiendo un dermatoma, Lasègue positivo y, a veces, déficit sensitivo, motor o de reflejos."),
      dx("cola", "Síndrome de cola de caballo", false, "Retención urinaria, anestesia en silla de montar y déficit bilateral."),
      dx("colico", "Cólico renal", false, "Dolor cólico que no cambia con la posición, irradiado a genitales, con hematuria e inquietud."),
      dx("espondilo", "Espondiloartritis", false, "Dolor inflamatorio crónico (más de 3 meses) en menores de 40, con rigidez matinal y mejoría con el ejercicio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("actividad", "Mantener la actividad dentro de lo tolerable, sin reposo en cama", "clave", "El reposo en cama retrasa la recuperación; mantenerse activo acorta el dolor y la licencia."),
      mg("aines", "AINE (ibuprofeno o diclofenac) por pocos días, con o sin calor local", "clave", "Alivio sintomático con buena evidencia."),
      mg("pautas", "Explicar el buen pronóstico y las pautas de alarma (esfínteres, debilidad, fiebre)", "clave", "La mayoría mejora en 2–6 semanas; tranquilizar reduce la cronicidad."),
      mg("relajante", "Relajante muscular por pocos días", "util", "Puede sumar alivio a corto plazo; da somnolencia (cuidado con trabajos de riesgo)."),
      mg("reposo", "Reposo absoluto en cama por una semana", "innecesario", "Empeora la evolución: genera desacondicionamiento y cronicidad."),
      mg("opioide", "Opioides de entrada", "riesgoso", "Riesgo de dependencia y efectos adversos sin más beneficio que los AINE en lumbalgia aguda inespecífica."),
      mg("corticoides", "Corticoides intramusculares", "innecesario", "No tienen beneficio demostrado en la lumbalgia aguda inespecífica."),
    ],
  },
  debrief: {
    diagnosis: "Lumbalgia aguda mecánica inespecífica, sin banderas rojas ni compromiso radicular.",
    pathologies: [
      { name: "Lumbalgia aguda mecánica inespecífica", role: "principal", why: "Dolor mecánico sin banderas rojas ni déficit neurológico." },
      { name: "Hernia de disco con radiculopatía", role: "diferencial", why: "Dolor irradiado por dermatoma con Lasègue positivo." },
      { name: "Síndrome de cola de caballo", role: "diferencial", why: "La emergencia a no perder." },
      { name: "Fractura, infección o tumor vertebral", role: "diferencial", why: "Se buscan con las banderas rojas." },
      { name: "Cólico renal", role: "diferencial", why: "Dolor lumbar no mecánico." },
    ],
    reasoning: [
      "Causa: sobrecarga o distensión de músculos, ligamentos y articulaciones facetarias de la columna lumbar, en general por un esfuerzo con flexión y rotación.",
      "Mecanismo: la lesión de partes blandas genera inflamación local y una contractura refleja de la musculatura paravertebral, que a su vez aumenta el dolor.",
      "Consecuencia: dolor lumbar que empeora con el movimiento y mejora con el reposo, sin compromiso de raíces nerviosas.",
      "Por eso el diagnóstico es clínico: el trabajo del médico es descartar banderas rojas, no buscar una imagen.",
    ],
    epidemiology:
      "Es uno de los motivos de consulta más frecuentes en guardia y en atención primaria, y una de las primeras causas de ausentismo laboral. Hasta el 80 % de las personas la tendrá alguna vez. El pico es entre los 30 y los 50 años, en trabajos con carga física. Es algo más frecuente en varones en edad laboral. Más del 90 % es inespecífica y mejora sola.",
    management: [
      "Anamnesis y examen dirigidos a banderas rojas: edad mayor de 50 o menor de 20, cáncer previo, fiebre, pérdida de peso, trauma importante, dolor nocturno, déficit neurológico, alteración de esfínteres.",
      "Sin banderas rojas: no pedir imágenes en las primeras 6 semanas.",
      "Mantenerse activo, AINE por pocos días, calor local, relajante si hace falta.",
      "Reevaluar si no mejora en 4–6 semanas; kinesiología y abordaje de banderas amarillas (factores laborales y emocionales) para prevenir la cronicidad.",
      "Derivación urgente si aparecen cola de caballo o déficit progresivo.",
    ],
    sources: [
      "Guías de práctica clínica de lumbalgia aguda usadas en la atención primaria argentina (basadas en la guía europea COST B13 y en NICE).",
      "Sociedad Argentina de Patología de la Columna Vertebral — recomendaciones sobre banderas rojas.",
    ],
    pearls: [
      "Sin banderas rojas, la lumbalgia aguda no necesita radiografía.",
      "Cola de caballo: retención urinaria + anestesia en silla de montar = cirugía urgente.",
      "Reposo en cama, no: mantenerse activo.",
    ],
    pitfalls: ["Pedir resonancia a todos.", "Indicar reposo absoluto.", "No preguntar por los esfínteres."],
  },
};
