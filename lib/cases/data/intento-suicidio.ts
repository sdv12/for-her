import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const intentoSuicidio: ClinicalCase = {
  id: "intento-suicidio-benzodiacepinas",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "F", context: "La trae la mamá. Estudiante de 5.º año." },
  frequency: "frecuente",
  intro: "“La encontré dormida y no se despertaba bien. Al lado tenía mi caja de clonazepam vacía. Había como veinte pastillas.” (relata la mamá)",
  vitals: { TA: "104/62 mmHg", FC: "76 lpm", FR: "14 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Glasgow: "13 (O3 V4 M6)" },
  anamnesis: [
    act("cuanto", "¿Qué tomó, cuánto y hace cuánto?", "clave", "“Clonazepam de 2 mg, unas veinte. Calculo que hace dos horas.”", "Define la dosis, el tiempo y la ventana para medidas de descontaminación."),
    act("coingesta", "¿Pudo tomar otra cosa? ¿Paracetamol, otros remedios, alcohol?", "clave", "“No sé. En el botiquín había paracetamol también.”", "El paracetamol es la coingesta más peligrosa: no da síntomas al principio y puede causar falla hepática días después. Siempre se busca."),
    act("intencion", "(A solas con ella, cuando puede hablar) ¿Qué querías que pasara cuando tomaste las pastillas?", "clave", "“Quería dormir y no despertarme. No aguanto más.”", "Explorar la intencionalidad, sin juzgar, define el riesgo. Preguntar por el suicidio no induce la idea."),
    act("plan", "¿Lo habías pensado antes? ¿Lo planeaste? ¿Dejaste alguna nota?", "clave", "“Lo pensaba hace semanas. Escribí una carta.”", "Planificación, nota y método letal son indicadores de alto riesgo."),
    act("contexto", "¿Qué está pasando en tu vida? ¿Hay alguien que te lastime?", "clave", "“Me hacen bullying en el colegio y me peleé con mi novio. En casa hay muchos gritos.”", "Busca factores de riesgo y situaciones de violencia que requieran protección."),
    act("previos", "¿Alguna vez intentaste hacerte daño? ¿Te cortás?", "util", "“Me corto los brazos desde el año pasado.”", "Autolesiones e intentos previos son el principal predictor de un nuevo intento."),
    act("consumo", "¿Consumís alcohol u otras sustancias?", "util", "“A veces tomo con amigas.”", "El consumo aumenta la impulsividad y el riesgo."),
  ],
  exam: [
    act("abc", "Vía aérea, respiración y conciencia", "clave", "Vía aérea permeable, respira bien, somnolienta pero despierta con la voz.", "Las benzodiacepinas solas rara vez dan depresión respiratoria grave; si aparece, sospechar coingesta."),
    act("brazos", "Examen de la piel de antebrazos y muslos", "clave", "Cortes lineales superficiales en distintos estadios en el antebrazo izquierdo.", "Autolesiones: marcan riesgo y obligan a una evaluación de salud mental."),
    act("neuro", "Examen neurológico y pupilas", "util", "Pupilas normales, sin foco, nistagmo leve.", "Compatible con benzodiacepinas; descarta otros tóxicos (opioides darían miosis puntiforme)."),
    act("lesiones", "Buscar otras lesiones o signos de violencia", "util", "Sin otras lesiones.", "Es parte de la evaluación de protección."),
  ],
  studies: [
    study("Laboratorio", "paracetamol", "Paracetamolemia (a las 4 h de la ingesta)", "clave", "Por debajo de la línea de tratamiento del nomograma.", "Descarta una coingesta silenciosa y potencialmente mortal."),
    study("Laboratorio", "lab", "Glucemia, ionograma, hepatograma, función renal y prueba de embarazo", "clave", "Normales; prueba de embarazo negativa.", "Evaluación básica de toda intoxicación en una adolescente."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Normal, QTc normal.", "Descarta coingestas cardiotóxicas (antidepresivos tricíclicos)."),
    study("Laboratorio", "toxicos", "Búsqueda de tóxicos en orina", "neutro", "Benzodiacepinas positivas.", "Confirma, pero no cambia el manejo."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Sin traumatismo ni foco, no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("intento", "Intento de suicidio por ingesta de benzodiacepinas en adolescente, de alto riesgo", true, "Ingesta voluntaria con intención de morir, planificación, nota, autolesiones previas y factores de estrés; sin coingesta de paracetamol."),
      dx("accidental", "Intoxicación accidental", false, "Ella misma relata la intención y hay una nota."),
      dx("autolesion", "Autolesión sin intención suicida", false, "Hay intención declarada de morir y planificación."),
      dx("paracetamol", "Intoxicación por paracetamol", false, "La paracetamolemia está por debajo de la línea de tratamiento."),
      dx("opioides", "Intoxicación por opioides", false, "Daría miosis puntiforme y depresión respiratoria marcada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("soporte", "Soporte y monitoreo hasta que recupere la conciencia", "clave", "Las benzodiacepinas solas se manejan con sostén."),
      mg("salud-mental", "Evaluación por salud mental antes del alta e internación si el riesgo es alto, según la Ley 26.657", "clave", "Ningún intento de suicidio se va de alta sin evaluación de riesgo. La internación por riesgo cierto e inminente está prevista por la ley."),
      mg("acompanamiento", "Acompañamiento permanente durante la internación y retiro de objetos peligrosos", "clave", "El riesgo de un nuevo intento en las horas siguientes es alto."),
      mg("notificar", "Notificar el intento al SNVS (Ley 27.130) y dar intervención al sistema de protección si hay vulneración de derechos", "clave", "Es de notificación obligatoria; con un adolescente y violencia en el entorno, se activa la protección (Ley 26.061)."),
      mg("medios", "Con la familia: restringir el acceso a medicamentos y otros medios", "util", "La restricción de medios es una de las medidas de prevención más eficaces."),
      mg("flumazenil", "Flumazenil para despertarla rápido", "riesgoso", "Puede desencadenar convulsiones, sobre todo si hay coingestas o consumo crónico; no hace falta con buen sostén."),
      mg("alta", "Alta cuando se despierte, con turno con psicología en un mes", "riesgoso", "Deja sin evaluar ni proteger a una paciente de alto riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Intento de suicidio de alto riesgo por ingesta de clonazepam en adolescente de 17 años, con autolesiones previas y contexto de violencia y bullying; paracetamol descartado.",
    pathologies: [
      { name: "Intento de suicidio", role: "principal", why: "Conducta autoinfligida con intención de morir." },
      { name: "Intoxicación por benzodiacepinas", role: "asociada", why: "Método utilizado." },
      { name: "Probable episodio depresivo", role: "asociada", why: "A evaluar por salud mental." },
      { name: "Coingesta de paracetamol", role: "diferencial", why: "Silenciosa y potencialmente mortal: siempre se descarta." },
      { name: "Autolesión sin intención suicida", role: "diferencial", why: "Se distingue por la intención." },
    ],
    reasoning: [
      "Causa: confluyen un sufrimiento psíquico (probable depresión), estresores agudos (ruptura, bullying, violencia familiar), impulsividad propia de la adolescencia y acceso a un medio (benzodiacepinas en la casa).",
      "Mecanismo tóxico: las benzodiacepinas potencian el GABA-A y deprimen el sistema nervioso; solas tienen un margen de seguridad alto, pero con alcohol u opioides pueden causar depresión respiratoria.",
      "Consecuencia: somnolencia, ataxia, nistagmo; el riesgo vital mayor está en las coingestas y en un nuevo intento.",
      "Un intento previo es el principal factor de riesgo de suicidio consumado: la intervención en la guardia es una oportunidad de prevención.",
    ],
    epidemiology:
      "El suicidio es una de las principales causas de muerte entre los 15 y 24 años en la Argentina. Los varones concretan más suicidios (métodos más letales), pero las mujeres adolescentes tienen más intentos, en general por ingesta de medicamentos. Son factores de riesgo los intentos previos, las autolesiones, la depresión, el consumo de sustancias, la violencia, el acoso escolar y el acceso a medios.",
    management: [
      "Estabilizar y tratar la intoxicación; buscar siempre coingestas (paracetamolemia).",
      "Entrevista con la adolescente a solas, sin juzgar, sobre intención, planificación y factores de riesgo.",
      "Evaluación de salud mental antes del alta; internación si el riesgo es alto (Ley 26.657), acompañamiento continuo.",
      "Notificar al SNVS (Ley 27.130 de prevención del suicidio) y, ante vulneración de derechos, intervenir con el sistema de protección (Ley 26.061).",
      "Restricción de medios, plan de seguridad, seguimiento cercano y articulación con la escuela y la red de salud.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Lineamientos para la atención del intento de suicidio en adolescentes.",
      "Ley Nacional 27.130 de Prevención del Suicidio; Ley Nacional de Salud Mental 26.657; Ley 26.061 de Protección Integral de Niñas, Niños y Adolescentes.",
    ],
    pearls: [
      "Preguntar por el suicidio no induce la idea: protege.",
      "Toda ingesta intencional: paracetamolemia.",
      "Ningún intento de suicidio se va sin evaluación de salud mental.",
    ],
    pitfalls: ["Minimizarlo como “llamado de atención”.", "Dar flumazenil.", "Dar el alta sin evaluación ni restricción de medios."],
  },
};
