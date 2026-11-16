import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const takotsubo: ClinicalCase = {
  id: "takotsubo",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 68, ageUnit: "años", sex: "F", context: "Jubilada docente. Ayer enterró a su marido. Hipertensa con amlodipina." },
  frequency: "poco-frecuente",
  intro: "“Me apretó el pecho en el velorio y no se me va. Siento que me falta el aire.”",
  vitals: { TA: "108/70 mmHg", FC: "102 lpm", FR: "22 rpm", "SatO₂": "94 %", "T°": "36,5 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor y desde cuándo?", "clave", "“Opresivo, en el medio del pecho, hace tres horas. No cambia si respiro.”", "Dolor anginoso: hay que tratarlo como síndrome coronario hasta demostrar lo contrario."),
    act("estres", "¿Pasó algo fuerte en estos días?", "clave", "“Mi marido murió de golpe el sábado. No dormí nada.”", "Estrés emocional intenso: gatillo típico de miocardiopatía por estrés."),
    act("factores", "¿Fuma, es diabética, tiene el colesterol alto?", "clave", "“Nunca fumé. Solo la presión.”", "Pocos factores de riesgo coronario no descartan un IAM."),
    act("disnea", "¿Le cuesta respirar acostada?", "util", "“Un poco desde hoy.”", "Orienta a disfunción ventricular."),
    act("sincope", "¿Se desmayó o tuvo palpitaciones?", "util", "“No.”", "Arritmias graves pueden complicar el cuadro."),
    act("menopausia", "¿A qué edad dejó de menstruar?", "neutro", "“A los 50.”", "La mayoría de los casos son posmenopáusicas, pero no cambia la conducta inicial."),
  ],
  exam: [
    act("cardio", "Auscultación cardíaca", "clave", "Ritmo regular, R3 suave, sin soplos.", "R3: disfunción ventricular."),
    act("pulmon", "Auscultación pulmonar", "clave", "Rales crepitantes bibasales finos.", "Congestión leve, Killip II."),
    act("pulsos", "Pulsos y perfusión periférica", "util", "Pulsos simétricos, relleno capilar de 2 segundos.", "Sin shock ni disección."),
    act("yugular", "Ingurgitación yugular", "util", "No ingurgitada a 45°.", "Sin falla derecha."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG de 12 derivaciones en menos de 10 minutos", "clave", "Supradesnivel del ST de 2 mm de V2 a V5, sin imagen especular inferior.", "Supradesnivel: activa el código infarto."),
    study("Laboratorio", "troponina", "Troponina ultrasensible", "clave", "Elevada en forma moderada, desproporcionadamente baja para la extensión del ECG.", "Discordancia típica del takotsubo."),
    study("Otros", "cateterismo", "Cinecoronariografía urgente", "clave", "Coronarias sin lesiones obstructivas. Ventriculografía: aquinesia apical con hipercinesia basal, imagen en ánfora.", "Es obligatoria: el diagnóstico se hace después de descartar oclusión coronaria."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Fracción de eyección 35 %, balonamiento apical, sin obstrucción del tracto de salida.", "Confirma el patrón y busca obstrucción dinámica."),
    study("Laboratorio", "bnp", "NT-proBNP", "util", "Muy elevado.", "Suele estar más alto que en el IAM."),
    study("Imágenes", "tac-torax", "Angiotomografía de tórax de rutina", "innecesario", "No se realizó.", "No había sospecha de disección ni TEP."),
  ],
  diagnosis: {
    prompt: "Con coronarias sin lesiones, ¿cuál es tu diagnóstico?",
    options: [
      dx("takotsubo", "Miocardiopatía por estrés (takotsubo) con balonamiento apical", true, "Gatillo emocional, supradesnivel anterior, troponina baja para la extensión, coronarias normales y balonamiento apical."),
      dx("iam-anterior", "IAM anterior por oclusión de la descendente anterior", false, "La cinecoronariografía no mostró oclusión."),
      dx("miocarditis", "Miocarditis viral", false, "Sin pródromo viral y con patrón regional típico."),
      dx("pericarditis", "Pericarditis aguda", false, "Dolor no pleurítico, sin frote, y con disfunción segmentaria."),
      dx("tep", "Tromboembolismo de pulmón", false, "Ventrículo derecho normal y patrón ventricular izquierdo típico."),
    ],
  },
  management: {
    prompt: "¿Cómo seguís?",
    options: [
      mg("unidad-coronaria", "Internación en unidad coronaria con monitoreo", "clave", "Riesgo de arritmias, shock y trombo apical en los primeros días."),
      mg("ieca-bb", "IECA y betabloqueante si no hay shock ni obstrucción", "clave", "Tratamiento de la disfunción ventricular."),
      mg("diureticos", "Diurético para la congestión", "clave", "Killip II."),
      mg("eco-control", "Ecocardiograma de control a las 4–8 semanas", "clave", "La recuperación de la función confirma el diagnóstico."),
      mg("duelo", "Acompañamiento del duelo y apoyo psicológico", "util", "El gatillo emocional sigue presente."),
      mg("inotropicos", "Dobutamina si aparece obstrucción del tracto de salida", "riesgoso", "Empeora la obstrucción dinámica; ahí se usan líquidos y betabloqueante."),
      mg("trombolisis", "Trombolíticos sin cateterismo previo en un centro con hemodinamia", "riesgoso", "Con hemodinamia disponible la estrategia es la angioplastia primaria."),
    ],
  },
  debrief: {
    diagnosis: "Miocardiopatía por estrés (takotsubo) con balonamiento apical y Killip II, en una mujer de 68 años tras la muerte de su esposo.",
    pathologies: [
      { name: "Miocardiopatía por estrés (takotsubo)", role: "principal", why: "Disfunción ventricular transitoria sin oclusión coronaria." },
      { name: "Insuficiencia cardíaca aguda", role: "asociada", why: "R3 y rales bibasales." },
      { name: "IAM con supradesnivel del ST", role: "diferencial", why: "Indistinguible al ingreso: se descarta con el cateterismo." },
    ],
    reasoning: [
      "Causa: estrés emocional o físico intenso con descarga de catecolaminas.",
      "Mecanismo: toxicidad catecolaminérgica y espasmo microvascular que aturden el ápex, más rico en receptores beta.",
      "Consecuencia: disfunción sistólica regional que se recupera en semanas, pero que en la fase aguda puede dar shock, arritmias o trombos.",
    ],
    epidemiology:
      "Representa cerca del 2 % de los síndromes coronarios agudos que llegan a hemodinamia. Más del 85 % son mujeres posmenopáusicas, y el gatillo emocional o físico aparece en dos tercios. La mortalidad hospitalaria es parecida a la del IAM.",
    management: [
      "Manejo inicial como síndrome coronario con supradesnivel.",
      "Cinecoronariografía para descartar oclusión.",
      "Ecocardiograma para definir el patrón y buscar obstrucción o trombo.",
      "IECA, betabloqueante y diurético según la hemodinamia.",
      "Ecocardiograma de control para documentar la recuperación.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síndromes coronarios agudos.", "ESC — Position statement on Takotsubo syndrome."],
    pearls: ["Mujer posmenopáusica + duelo + supradesnivel + coronarias limpias.", "Troponina baja para tanto ECG.", "Se recupera en semanas: el eco de control confirma."],
    pitfalls: ["Diagnosticarlo sin cateterismo.", "Usar inotrópicos con obstrucción del tracto de salida."],
    tribunal: [
      qa("¿Se puede diagnosticar takotsubo sin cinecoronariografía?", "No. Primero hay que descartar la oclusión coronaria, porque al ingreso es indistinguible de un IAM."),
      qa("¿Qué complicación temprana obliga a evitar inotrópicos?", "La obstrucción dinámica del tracto de salida del ventrículo izquierdo por hipercinesia basal."),
      qa("¿Por qué se afecta el ápex?", "Tiene mayor densidad de receptores beta y es más sensible a la toxicidad por catecolaminas."),
    ],
  },
};
