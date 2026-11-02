import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bronquiolitisPrematuro: ClinicalCase = {
  id: "bronquiolitis-grave-prematuro",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "meses", sex: "F", context: "Nació a las 32 semanas. Julio. Tiene dos hermanos que van a la escuela." },
  frequency: "frecuente",
  intro: "“Hace dos días está con mocos y tos. Hoy respira muy rápido, se agita al tomar el pecho y recién se quedó como sin respirar unos segundos y se puso morada.” (relata la madre)",
  vitals: { FC: "172 lpm", FR: "68 rpm", "T°": "37,6 °C", "SatO₂": "88 %", Peso: "3,9 kg" },
  anamnesis: [
    act("apnea", "¿Cuánto duró la pausa? ¿Cambió de color?", "clave", "“Unos 20 segundos, se puso morada y la sacudí.”", "Apnea: signo de gravedad en lactantes pequeños con VSR, sobre todo prematuros."),
    act("alimentacion", "¿Cómo está tomando?", "clave", "“Toma poquito y se cansa; menos pañales mojados.”", "La dificultad para alimentarse es criterio de internación."),
    act("prematurez", "¿Nació antes de tiempo? ¿Recibió alguna inyección para el virus?", "clave", "“A las 32 semanas. No recibió nada.”", "Prematuros menores de 2 meses: alto riesgo de bronquiolitis grave; hay prevención con anticuerpos monoclonales y vacuna materna."),
    act("vacuna-materna", "¿Te dieron la vacuna contra el VSR en el embarazo?", "util", "“No llegué, nació antes.”", "La vacuna materna se aplica entre las semanas 32 y 36; en Argentina se incorporó en 2024."),
    act("contactos", "¿Hay alguien enfermo en la casa?", "util", "“Los hermanos están resfriados.”", "Fuente de contagio."),
    act("chupete", "¿Usa chupete?", "neutro", "“A veces.”", "No orienta."),
  ],
  exam: [
    act("trabajo", "Trabajo respiratorio", "clave", "Tiraje subcostal e intercostal, aleteo nasal, quejido.", "Dificultad respiratoria grave (Tal 10)."),
    act("auscultacion", "Auscultación", "clave", "Rales finos y sibilancias difusas bilaterales.", "Bronquiolitis."),
    act("hidratacion", "Hidratación", "util", "Fontanela levemente deprimida, mucosas secas.", "Deshidratación por baja ingesta."),
  ],
  studies: [
    study("Otros", "oximetria", "Oximetría de pulso continua", "clave", "88 % al aire.", "Hipoxemia: necesita oxígeno e internación."),
    study("Microbiología", "aspirado", "Aspirado nasofaríngeo para virus", "util", "VSR positivo.", "Útil para el aislamiento de cohortes y la vigilancia."),
    study("Laboratorio", "gases", "Gases capilares", "util", "pH 7,30, pCO₂ 56.", "Hipercapnia: riesgo de falla respiratoria."),
    study("Imágenes", "rx", "Radiografía de tórax de rutina", "innecesario", "No se realizó.", "Solo si hay duda diagnóstica o mala evolución."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("grave", "Bronquiolitis grave por VSR con apnea, hipoxemia e hipercapnia, en lactante ex prematura de 2 meses", true, "Pródromo catarral, dificultad respiratoria grave, apnea, saturación de 88 %, hipercapnia y VSR positivo en una ex prematura de 32 semanas."),
      dx("leve", "Bronquiolitis leve", false, "Hay apnea, hipoxemia y Tal alto."),
      dx("coqueluche", "Coqueluche", false, "Puede dar apneas, pero hay rales, sibilancias, VSR y no hay accesos de tos."),
      dx("nac", "Neumonía bacteriana", false, "El cuadro es bilateral, viral, con sibilancias."),
      dx("cardiopatia", "Insuficiencia cardíaca por cardiopatía congénita", false, "Pródromo viral y VSR positivo; sin soplos ni hepatomegalia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación con monitoreo de apneas y evaluación por terapia intensiva", "clave", "Apneas e hipercapnia: riesgo de falla respiratoria."),
      mg("oxigeno", "Oxígeno (cánula de alto flujo si no mejora) para saturación mayor de 92 %", "clave", "Corrige la hipoxemia y reduce el trabajo respiratorio."),
      mg("hidratacion", "Hidratación por sonda nasogástrica o EV y aspiración de secreciones nasales", "clave", "No puede alimentarse en forma segura."),
      mg("aislamiento", "Aislamiento de contacto y gotas", "util", "Evita la transmisión intrahospitalaria."),
      mg("corticoides", "Corticoides sistémicos", "innecesario", "No mejoran la evolución de la bronquiolitis."),
      mg("antibioticos", "Antibióticos de rutina", "innecesario", "Es viral."),
    ],
  },
  debrief: {
    diagnosis: "Bronquiolitis grave por virus sincicial respiratorio con apneas, hipoxemia e hipercapnia, en lactante de 2 meses ex prematura de 32 semanas sin inmunización contra el VSR.",
    pathologies: [
      { name: "Bronquiolitis grave por VSR", role: "principal", why: "Infección viral de la vía aérea pequeña con falla respiratoria incipiente." },
      { name: "Apnea por VSR", role: "asociada", why: "Complicación típica en prematuros y menores de 2 meses." },
      { name: "Coqueluche, neumonía, cardiopatía", role: "diferencial", why: "Otras causas de dificultad respiratoria en lactantes." },
    ],
    reasoning: [
      "Causa: virus sincicial respiratorio, transmitido por los hermanos en invierno.",
      "Mecanismo: necrosis del epitelio bronquiolar, edema y moco que obstruyen bronquiolos muy finos; en prematuros el control respiratorio inmaduro favorece apneas.",
      "Consecuencia: atrapamiento aéreo, atelectasias, hipoxemia, hipercapnia, apneas y dificultad para alimentarse.",
    ],
    epidemiology:
      "La bronquiolitis es la principal causa de internación en menores de un año durante el invierno en Argentina. Prematuros, menores de 3 meses, cardiopatías congénitas, enfermedad pulmonar crónica e inmunodeficiencias son los grupos de mayor riesgo. La vacuna materna contra el VSR (incorporada en 2024) y los anticuerpos monoclonales reducen las formas graves.",
    management: [
      "Evaluar gravedad (Tal, saturación, apneas, alimentación) y factores de riesgo.",
      "Internar si hay hipoxemia, apneas, dificultad grave o para alimentarse, o factores de riesgo.",
      "Oxígeno, hidratación, aspiración nasal; alto flujo o ventilación según evolución.",
      "Prevención: lactancia, evitar humo, lavado de manos, vacuna materna y anticuerpos monoclonales en grupos de riesgo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para el manejo de la infección respiratoria aguda baja; Lineamientos de la vacuna contra el VSR en embarazadas.", "Sociedad Argentina de Pediatría — Recomendaciones para el manejo de la bronquiolitis."],
    pearls: ["Prematuro + menor de 2 meses + VSR = riesgo de apnea.", "Corticoides y antibióticos no sirven.", "Vacuna materna entre las 32 y 36 semanas."],
    pitfalls: ["Mandar a la casa a un lactante con apnea.", "Dar broncodilatadores y corticoides de rutina."],
    tribunal: [
      qa("¿Qué es el score de Tal?", "Una escala clínica de gravedad de la obstrucción bronquial en lactantes que puntúa de 0 a 3 la frecuencia cardíaca, la frecuencia respiratoria, las sibilancias y el uso de músculos accesorios (o cianosis): 4 o menos leve, 5 a 8 moderada y 9 o más grave."),
      qa("¿Cuáles son los criterios de internación en la bronquiolitis?", "Hipoxemia (saturación menor de 92 %), apneas, dificultad respiratoria moderada a grave, rechazo del alimento o deshidratación, factores de riesgo (prematurez, menores de 3 meses, cardiopatía, inmunodeficiencia) y condiciones sociales que impidan el control."),
      qa("¿Cómo se previene el VSR en lactantes?", "Con la vacuna a las embarazadas entre las semanas 32 y 36 durante la temporada, anticuerpos monoclonales (palivizumab o nirsevimab) en grupos de riesgo, lactancia materna, lavado de manos, evitar el humo de tabaco y el contacto con personas resfriadas."),
    ],
  },
};
