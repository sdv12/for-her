import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const autolesionesAdolescente: ClinicalCase = {
  id: "autolesiones-adolescente",
  level: 2,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 14, ageUnit: "años", sex: "F", context: "La trae la preceptora de la escuela. La madre está en camino." },
  frequency: "frecuente",
  intro: "“Una compañera vio que tenía cortes en el brazo y avisó. Yo estoy bien, no quiero que llamen a mi mamá.”",
  vitals: { TA: "108/68 mmHg", FC: "92 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("espacio", "Hablar a solas, explicar la confidencialidad y sus límites (riesgo de vida)", "clave", "Acepta hablar.", "La adolescente tiene derecho a ser escuchada a solas; la confidencialidad se rompe solo si hay riesgo."),
    act("funcion", "“¿Qué sentís antes y después de cortarte?”", "clave", "“Me calma cuando estoy muy angustiada. Lo hago hace meses.”", "Autolesión como regulación emocional."),
    act("suicidio", "¿Pensaste en matarte? ¿Tenés un plan?", "clave", "“A veces pienso que sería mejor no estar. No tengo plan.”", "Ideación pasiva sin plan: evaluar riesgo en forma estructurada."),
    act("contexto", "¿Qué está pasando en tu vida? ¿Alguien te hace daño? ¿Te molestan en redes?", "clave", "“Me hacen bullying por Instagram. En casa mis papás se pelean.”", "Factores de riesgo: acoso, conflicto familiar."),
    act("consumo", "¿Tomás alcohol o drogas?", "util", "“Alcohol en las juntadas.”", "Aumenta la impulsividad."),
    act("musica", "¿Qué música escuchás?", "neutro", "“K-pop.”", "Ayuda al vínculo."),
  ],
  exam: [
    act("lesiones", "Examen de las lesiones con permiso", "clave", "Cortes superficiales paralelos en antebrazo izquierdo, de distinta antigüedad, sin signos de infección.", "Autolesiones repetidas no suicidas."),
    act("otras", "Buscar otras lesiones o signos de maltrato", "util", "Sin otras lesiones.", "Descarta violencia física."),
    act("mental", "Examen mental", "util", "Ánimo triste, sin psicosis.", "Evalúa depresión."),
  ],
  studies: [
    study("Otros", "riesgo", "Evaluación estructurada del riesgo suicida", "clave", "Riesgo moderado: ideación pasiva, autolesiones repetidas, acoso.", "Define el nivel de atención."),
    study("Laboratorio", "toxicos", "Tóxicos y alcoholemia", "innecesario", "No se realizó.", "No hay intoxicación aguda."),
    study("Otros", "phq-a", "Cuestionario de depresión para adolescentes (PHQ-A)", "util", "Puntaje compatible con depresión moderada.", "Comorbilidad frecuente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("autolesion", "Autolesiones no suicidas repetidas con ideación de muerte pasiva y síntomas depresivos, en contexto de ciberacoso y conflicto familiar", true, "Cortes repetidos para aliviar la angustia, ideación pasiva sin plan, ánimo triste y factores de riesgo."),
      dx("intento", "Intento de suicidio", false, "Las lesiones no tuvieron intención de morir."),
      dx("normal", "Conducta de la edad sin riesgo", false, "Las autolesiones son un factor de riesgo de suicidio."),
      dx("maltrato", "Lesiones por maltrato", false, "Ella refiere haberlas hecho; se evalúa igual el entorno."),
      dx("psicosis", "Psicosis", false, "Sin síntomas psicóticos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("escucha", "Escucha sin juzgar, validar la angustia y no minimizar", "clave", "Primer paso y factor protector."),
      mg("seguimiento", "Seguimiento cercano por salud mental infantojuvenil y plan de seguridad", "clave", "Ley 27.130 y Ley 26.657: atención de toda conducta autolesiva."),
      mg("familia", "Incluir a la familia con su conocimiento, explicando el riesgo", "clave", "Hay riesgo: corresponde informar a los adultos responsables."),
      mg("escuela", "Articular con la escuela por el acoso", "util", "Factor desencadenante."),
      mg("alta-sin", "Curar los cortes y dar el alta", "riesgoso", "Pierde la oportunidad de prevenir un suicidio."),
      mg("reto", "Retarla para que no lo haga más", "riesgoso", "Aumenta la vergüenza y el ocultamiento."),
    ],
  },
  debrief: {
    diagnosis: "Autolesiones no suicidas repetidas con ideación pasiva de muerte y síntomas depresivos, en adolescente de 14 años con ciberacoso y conflicto familiar.",
    pathologies: [
      { name: "Autolesiones no suicidas", role: "principal", why: "Lesiones repetidas para regular emociones." },
      { name: "Síntomas depresivos e ideación pasiva", role: "asociada", why: "Aumentan el riesgo." },
      { name: "Intento de suicidio, maltrato", role: "diferencial", why: "Se evalúan en la entrevista." },
    ],
    reasoning: [
      "Causa: angustia intensa con pocos recursos de afrontamiento, acoso y conflicto familiar.",
      "Mecanismo: el dolor físico alivia transitoriamente el malestar emocional y se refuerza la conducta.",
      "Consecuencia: repetición, cicatrices, aislamiento y mayor riesgo de suicidio.",
    ],
    epidemiology:
      "El suicidio es una de las principales causas de muerte entre los 15 y 24 años en Argentina. Las autolesiones son frecuentes en adolescentes, más en mujeres, y el ciberacoso y el consumo de alcohol son factores de riesgo crecientes. La mayoría consulta primero en la guardia o la escuela.",
    management: [
      "Atender las lesiones y evaluar el riesgo suicida.",
      "Escucha empática y entrevista a solas.",
      "Plan de seguridad, seguimiento por salud mental e inclusión de la familia.",
      "Articular con la escuela y el sistema de protección.",
    ],
    sources: ["Ley 27.130 de Prevención del Suicidio.", "Ministerio de Salud de la Nación — Lineamientos para la atención del intento de suicidio en adolescentes."],
    pearls: ["Toda autolesión merece evaluación de riesgo.", "Preguntar por suicidio no lo induce.", "Plan de seguridad."],
    pitfalls: ["Curar y dar el alta.", "Retar o minimizar."],
    tribunal: [
      qa("¿Qué es un plan de seguridad?", "Una herramienta escrita con la persona que identifica señales de alarma, estrategias para calmarse, personas y lugares de apoyo, profesionales y líneas de ayuda (por ejemplo, 135 o 0800 de salud mental) y cómo reducir el acceso a medios letales."),
      qa("¿Qué dice la Ley 27.130?", "Declara de interés nacional la prevención del suicidio y obliga a atender a toda persona con intento de suicidio o riesgo, con seguimiento, notificación y capacitación de los equipos."),
      qa("¿Cuándo se puede romper la confidencialidad con un adolescente?", "Cuando hay riesgo para su vida o la de terceros, o situaciones de abuso o violencia; se le explica antes y se lo involucra en la decisión."),
    ],
  },
};
