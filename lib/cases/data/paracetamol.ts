import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const paracetamol: ClinicalCase = {
  id: "intoxicacion-paracetamol",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Estudiante. Viene acompañada por una amiga." },
  frequency: "poco-frecuente",
  intro: "“Anoche me peleé con mi novio y me tomé una caja entera de paracetamol. Ahora me arrepentí. Me siento bien, solo un poco de náuseas.”",
  vitals: { TA: "116/72 mmHg", FC: "88 lpm", FR: "16 rpm", "T°": "36,6 °C", Peso: "55 kg" },
  anamnesis: [
    act("cantidad", "¿Cuántos comprimidos y de qué dosis?", "clave", "“Veinte de 500 mg.”", "10 g en 55 kg: unos 180 mg/kg, por encima del umbral tóxico (150 mg/kg)."),
    act("hora", "¿A qué hora exactamente los tomó?", "clave", "“A las 2 de la mañana; ahora son las 8.”", "La hora es imprescindible para usar el nomograma (desde las 4 h) y para decidir la N-acetilcisteína (más eficaz antes de las 8 h)."),
    act("otras", "¿Tomó otra cosa? ¿Alcohol?", "clave", "“Unas cervezas.”", "Las coingestas y el alcohol crónico cambian el riesgo."),
    act("intencion", "¿Querías morir? ¿Lo habías pensado antes?", "clave", "“En ese momento sí. Ahora no. Nunca lo había pensado.”", "Todo intento requiere evaluación de salud mental."),
    act("hepatopatia", "¿Tiene alguna enfermedad del hígado, ayuno o desnutrición?", "util", "“No, pero casi no comí ayer.”", "El ayuno y el alcohol crónico disminuyen el glutatión y aumentan el riesgo."),
    act("sintomas", "¿Tiene dolor de panza o vómitos?", "util", "“Náuseas, nada más.”", "En las primeras 24 h los síntomas son mínimos: no tranquilizan."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Psicología.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal y hepática", "clave", "Blando, sin dolor en hipocondrio derecho.", "Todavía no hay daño hepático clínico."),
    act("conciencia", "Estado de conciencia", "util", "Lúcida.", "El paracetamol solo no altera la conciencia temprano: si la altera, buscar coingestas."),
    act("lesiones", "Buscar lesiones autoinfligidas", "util", "Sin lesiones.", "Parte de la evaluación del riesgo."),
  ],
  studies: [
    study("Laboratorio", "nivel", "Paracetamolemia a las 4 h o más de la ingesta", "clave", "A las 6 h: 180 µg/ml, por encima de la línea de tratamiento del nomograma de Rumack-Matthew.", "El nomograma define el tratamiento con N-acetilcisteína en ingestas únicas con hora conocida."),
    study("Laboratorio", "hepatograma", "Hepatograma, tiempo de protrombina, función renal, glucemia", "clave", "Transaminasas normales, RIN 1,0.", "Base para seguir la evolución (el daño aparece a las 24–72 h)."),
    study("Laboratorio", "toxicos", "Alcoholemia, otros tóxicos y prueba de embarazo", "util", "Alcoholemia 0,2 g/l; prueba de embarazo negativa.", "Coingestas y embarazo cambian el manejo."),
    study("Laboratorio", "nivel-temprano", "Paracetamolemia a la hora de la ingesta para decidir", "innecesario", "No se realizó.", "Antes de las 4 h el nivel no es interpretable en el nomograma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("paracetamol", "Intoxicación aguda por paracetamol con nivel tóxico (intento de suicidio), sin daño hepático aún", true, "Ingesta de unos 180 mg/kg hace 6 h, nivel por encima de la línea de tratamiento, transaminasas todavía normales."),
      dx("leve", "Ingesta no tóxica", false, "La dosis y el nivel superan el umbral."),
      dx("hepatitis", "Hepatitis aguda viral", false, "No hay daño hepático aún y la causa es clara."),
      dx("aine", "Intoxicación por AINE", false, "El producto ingerido fue paracetamol."),
      dx("gastritis", "Gastritis por alcohol", false, "No explica el riesgo hepático."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("nac", "N-acetilcisteína endovenosa de inmediato (esquema de 21 horas)", "clave", "Repone el glutatión y previene la hepatotoxicidad; es casi 100 % eficaz si se inicia antes de las 8 h."),
      mg("carbon", "Carbón activado si llega dentro de la primera hora (o hasta 2–4 h en ingestas grandes)", "util", "A las 6 h su utilidad es dudosa."),
      mg("controles", "Controles de hepatograma, RIN y función renal; continuar NAC si hay alteración", "clave", "El daño puede aparecer en 24–72 h."),
      mg("salud-mental", "Evaluación de salud mental antes del alta y notificación del intento (Ley 27.130)", "clave", "Todo intento de suicidio requiere evaluación y seguimiento."),
      mg("alta", "Alta porque está asintomática", "riesgoso", "La fase inicial es silenciosa: puede desarrollar falla hepática en los días siguientes."),
      mg("esperar-dano", "Esperar a que suban las transaminasas para iniciar el antídoto", "riesgoso", "La NAC es más eficaz cuanto antes se da."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación aguda por paracetamol con nivel tóxico (unos 180 mg/kg, 6 h), sin hepatotoxicidad aún, en contexto de intento de suicidio en mujer de 19 años.",
    pathologies: [
      { name: "Intoxicación por paracetamol", role: "principal", why: "Ingesta tóxica con nivel sobre la línea de tratamiento." },
      { name: "Intento de suicidio", role: "asociada", why: "Ingesta intencional." },
      { name: "Insuficiencia hepática aguda", role: "diferencial", why: "Complicación a prevenir." },
    ],
    reasoning: [
      "Causa: ingesta de una dosis tóxica de paracetamol (más de 150 mg/kg, o menos con factores de riesgo).",
      "Mecanismo: el exceso satura la conjugación hepática y se metaboliza por el citocromo P450 a NAPQI, un metabolito tóxico; cuando se agota el glutatión, NAPQI destruye los hepatocitos (centrolobulillares).",
      "Consecuencia: fase silenciosa de 24 h, luego dolor en hipocondrio derecho y transaminasas en miles (24–72 h), y puede llegar a insuficiencia hepática y renal y muerte a los 3–5 días.",
    ],
    epidemiology:
      "El paracetamol es uno de los fármacos más usados en intoxicaciones intencionales, sobre todo en mujeres jóvenes, y una de las principales causas de insuficiencia hepática aguda en el mundo. El tratamiento precoz con N-acetilcisteína es muy eficaz.",
    management: [
      "Hora y dosis de la ingesta; nivel de paracetamol desde las 4 h y nomograma.",
      "N-acetilcisteína si el nivel está sobre la línea, si la hora es desconocida, si hay daño hepático o ingesta mayor de 150 mg/kg cuando no hay nivel disponible.",
      "Controles de función hepática y renal, coagulación y glucemia.",
      "Derivación a centro de trasplante ante criterios de insuficiencia hepática grave.",
      "Evaluación de salud mental y notificación del intento.",
    ],
    sources: ["Centro Nacional de Intoxicaciones (Hospital Posadas) — Recomendaciones sobre intoxicación por paracetamol.", "Ley 27.130 de Prevención del Suicidio."],
    pearls: ["Asintomática no es sinónimo de sana.", "Nomograma: nivel desde las 4 h.", "N-acetilcisteína antes de las 8 h: casi 100 % eficaz."],
    pitfalls: ["Dar el alta por estar asintomática.", "Medir el nivel antes de las 4 h."],
    tribunal: [
      qa("¿Qué es el nomograma de Rumack-Matthew?", "Un gráfico que relaciona el nivel de paracetamol con las horas desde la ingesta (desde las 4 h) para decidir el tratamiento con N-acetilcisteína en ingestas agudas únicas con hora conocida."),
      qa("¿Cómo actúa la N-acetilcisteína?", "Es precursora del glutatión: repone sus depósitos, permite neutralizar el NAPQI y además tiene efectos antioxidantes que benefician aun cuando ya hay daño hepático."),
      qa("¿Qué son los criterios del King's College?", "Criterios de mal pronóstico en la insuficiencia hepática por paracetamol que indican trasplante: pH menor de 7,3 tras reanimación, o la combinación de RIN mayor de 6,5, creatinina mayor de 3,4 mg/dl y encefalopatía grado III–IV."),
    ],
  },
};
