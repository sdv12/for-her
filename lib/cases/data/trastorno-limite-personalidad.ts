import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const trastornoLimitePersonalidad: ClinicalCase = {
  id: "trastorno-limite-personalidad",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 22, ageUnit: "años", sex: "F", context: "Estudiante. Varias consultas previas por cortes en antebrazos. La trae una amiga tras pelearse con el novio." },
  frequency: "frecuente",
  intro: "“Me corté porque no aguantaba más. Siempre me dejan, siento un vacío enorme y paso de amar a odiar a la gente en un segundo.”",
  vitals: { TA: "116/72 mmHg", FC: "98 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("riesgo", "¿Pensaste en matarte? ¿Tenés un plan?", "clave", "“A veces quiero desaparecer, hoy no tengo un plan.”", "Riesgo suicida."),
    act("patron", "¿Cómo son tus relaciones?", "clave", "“Intensas, me peleo con todos y tengo terror a que me abandonen.”", "Inestabilidad e hipersensibilidad al abandono."),
    act("impulsividad", "¿Hacés cosas impulsivas?", "clave", "“Gasto todo, tomo mucho los fines de semana y me corto.”", "Impulsividad."),
    act("animo", "¿Tu ánimo cambia en horas o en semanas?", "util", "“En horas, según lo que pase.”", "Diferencia con bipolar."),
    act("trauma", "¿Pasaste situaciones difíciles de chica?", "util", "“Mi papá era violento.”", "Factor de riesgo."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Psicopedagogía.”", "No orienta."),
  ],
  exam: [
    act("heridas", "Heridas", "clave", "Cortes superficiales lineales en antebrazo izquierdo y cicatrices antiguas.", "Autolesión no suicida."),
    act("mental", "Examen mental", "clave", "Lúcida, afecto lábil, sin psicosis.", "Base."),
    act("intoxicacion", "Signos de intoxicación", "util", "Ausentes.", "Excluye."),
  ],
  studies: [
    study("Otros", "riesgo", "Evaluación estructurada del riesgo suicida", "clave", "Ideación pasiva sin plan, red de apoyo presente.", "Define el nivel de cuidado."),
    study("Laboratorio", "tox", "Alcoholemia y tóxicos en orina", "util", "Negativos.", "Excluye intoxicación."),
    study("Otros", "antitetanica", "Verificar vacuna antitetánica", "util", "Al día.", "Herida."),
    study("Imágenes", "rm", "RM de cerebro", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tlp", "Trastorno límite de la personalidad con autolesiones no suicidas", true, "Inestabilidad afectiva y vincular, miedo al abandono, vacío, impulsividad y autolesiones recurrentes."),
      dx("bipolar", "Trastorno bipolar", false, "Los cambios son de horas y reactivos, no episodios de semanas."),
      dx("depresion", "Depresión mayor aislada", false, "El patrón es crónico y vincular."),
      dx("tept", "Estrés postraumático", false, "No hay reexperimentación ni evitación específica."),
      dx("psicosis", "Primer episodio psicótico", false, "Sin síntomas psicóticos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("curacion", "Curar las heridas con trato respetuoso", "clave", "Cuidado clínico y vínculo."),
      mg("plan-seguridad", "Plan de seguridad y contacto de crisis", "clave", "Riesgo suicida."),
      mg("psicoterapia", "Derivación a psicoterapia específica (terapia dialéctico-conductual o mentalización)", "clave", "Tratamiento de elección."),
      mg("red", "Involucrar a la red de apoyo", "util", "Contención."),
      mg("benzo", "Benzodiacepinas de rutina", "riesgoso", "Desinhiben y se usan en sobreingestas."),
      mg("reproche", "Retarla por \"llamar la atención\"", "riesgoso", "Aumenta el riesgo y rompe el vínculo."),
    ],
  },
  debrief: {
    diagnosis: "Trastorno límite de la personalidad con autolesiones no suicidas y riesgo suicida bajo a moderado, en mujer de 22 años.",
    pathologies: [
      { name: "Trastorno límite de la personalidad", role: "principal", why: "Patrón persistente de inestabilidad." },
      { name: "Autolesiones y consumo de alcohol", role: "asociada", why: "Impulsividad." },
      { name: "Bipolar, depresión", role: "diferencial", why: "Otros trastornos del ánimo." },
    ],
    reasoning: [
      "Causa: vulnerabilidad emocional y entornos invalidantes o traumáticos.",
      "Mecanismo: dificultad para regular emociones ante el rechazo percibido.",
      "Consecuencia: autolesiones, crisis vinculares y riesgo suicida.",
    ],
    epidemiology:
      "Afecta a 1 a 3 % de la población y es frecuente en consultas por autolesiones en guardia. Hasta 1 de cada 10 personas con este diagnóstico muere por suicidio. La psicoterapia específica mejora mucho el pronóstico.",
    management: [
      "Curar con respeto.",
      "Riesgo.",
      "Plan de seguridad.",
      "Psicoterapia.",
    ],
    sources: ["Asociación de Psiquiatras Argentinos — Trastornos de la personalidad.", "NICE — Borderline Personality Disorder Guideline."],
    pearls: ["Toda autolesión merece evaluación.", "Cambios en horas, no en semanas.", "La psicoterapia es el tratamiento."],
    pitfalls: ["Desestimar.", "Benzodiacepinas."],
    tribunal: [
      qa("¿Qué diferencia una autolesión no suicida de un intento?", "La intención: la autolesión busca aliviar el malestar, no morir, aunque ambas aumentan el riesgo de suicidio."),
      qa("¿Qué fármacos se usan?", "No hay fármaco específico; se tratan comorbilidades y síntomas puntuales."),
      qa("¿Qué es la terapia dialéctico-conductual?", "Psicoterapia que enseña regulación emocional, tolerancia al malestar y habilidades interpersonales."),
    ],
  },
};
