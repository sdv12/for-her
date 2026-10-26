import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const anticoncepcionEmergencia: ClinicalCase = {
  id: "anticoncepcion-de-emergencia",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 16, ageUnit: "años", sex: "F", context: "Viene sola, nerviosa. Pide que no le digan a la mamá." },
  frequency: "muy-frecuente",
  intro: "“Anoche estuve con mi novio y se rompió el preservativo. No quiero quedar embarazada. ¿Me pueden dar la pastilla del día después?”",
  vitals: { TA: "110/68 mmHg", FC: "88 lpm" },
  anamnesis: [
    act("cuando", "¿Hace cuántas horas fue la relación?", "clave", "“Unas 14 horas.”", "La anticoncepción de emergencia es más eficaz cuanto antes se toma; el levonorgestrel se usa hasta las 72 h (con menor eficacia hasta 120 h)."),
    act("fum", "¿Cuándo fue tu última menstruación?", "util", "“Hace dos semanas.”", "Estar cerca de la ovulación aumenta el riesgo de embarazo, pero no cambia la indicación."),
    act("otras", "¿Tuviste otras relaciones sin protección este mes?", "util", "“No.”", "Si hubo otras hace más días, un embarazo previo podría estar en curso (la pastilla no lo afecta)."),
    act("metodo", "¿Usás algún método anticonceptivo habitual?", "clave", "“Solo preservativo.”", "Oportunidad para ofrecer un método regular, idealmente de larga duración."),
    act("consentida", "¿La relación fue con tu consentimiento? ¿Tu novio qué edad tiene?", "clave", "“Sí, quise. Él tiene 17.”", "Se pregunta siempre, en privado, para detectar violencia sexual o abuso."),
    act("serie", "¿Qué estás estudiando?", "neutro", "“Cuarto año.”", "No orienta."),
  ],
  exam: [
    act("general", "Estado general", "clave", "Buen estado general, angustiada.", "No hace falta un examen ginecológico para indicar la anticoncepción de emergencia."),
    act("ta", "Presión arterial", "util", "110/68 mmHg.", "Útil si se va a iniciar un método hormonal combinado."),
    act("gine", "Examen ginecológico con especuloscopía", "innecesario", "No se realizó.", "No es necesario y puede ser una barrera para que vuelva."),
  ],
  studies: [
    study("Laboratorio", "beta", "Test de embarazo antes de darla", "innecesario", "No se realizó.", "No es necesario: la pastilla no afecta un embarazo ya establecido y el test sería negativo tan temprano."),
    study("Imágenes", "eco", "Ecografía ginecológica", "innecesario", "No se realizó.", "No aporta."),
    study("Laboratorio", "its", "Ofrecer testeo de VIH, sífilis y hepatitis B", "util", "Acepta; no reactivos.", "La rotura del preservativo también es una exposición a ITS."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu situación clínica?",
    options: [
      dx("ae", "Relación sexual con falla del método (rotura del preservativo) hace 14 h: indicación de anticoncepción de emergencia", true, "Dentro de la ventana de eficacia, sin método regular."),
      dx("embarazo", "Embarazo", false, "Todavía no puede haberlo: la implantación ocurre días después de la relación."),
      dx("its", "Infección de transmisión sexual", false, "Es un riesgo, no un diagnóstico; se ofrece testeo."),
      dx("abuso", "Abuso sexual", false, "Ella refiere que fue consentida con un compañero de edad similar; siempre se pregunta en privado."),
      dx("nada", "No requiere intervención", false, "Hay riesgo de embarazo no deseado y se puede prevenir."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lng", "Levonorgestrel 1,5 mg en dosis única, en el momento, en el centro de salud", "clave", "Es eficaz, seguro, sin contraindicaciones; actúa retrasando la ovulación y no es abortivo."),
      mg("autonomia", "Atenderla sin exigir la presencia de un adulto, con confidencialidad", "clave", "Por el Código Civil y Comercial, a los 16 años puede decidir sobre su salud (y desde los 13 para prácticas no invasivas). La confidencialidad está garantizada."),
      mg("metodo", "Consejería y oferta de un método regular (implante, DIU, inyectable o pastillas) más preservativo", "clave", "Reduce futuros embarazos no deseados; los métodos de larga duración son los más eficaces en adolescentes."),
      mg("pautas", "Explicar que si la menstruación se atrasa más de 7 días, se haga un test", "util", "Detecta una falla."),
      mg("negar", "Negarla hasta que venga con la mamá", "riesgoso", "Vulnera sus derechos y la demora reduce la eficacia: aumenta el riesgo de embarazo."),
      mg("volver", "Indicar que vuelva en 5 días a ver qué pasa", "riesgoso", "La eficacia cae con el paso de las horas: hay que darla ya."),
    ],
  },
  debrief: {
    diagnosis: "Adolescente de 16 años con relación consentida y rotura del preservativo hace 14 h: anticoncepción de emergencia, consejería en métodos y testeo de ITS.",
    pathologies: [
      { name: "Riesgo de embarazo no intencional", role: "principal", why: "Falla del método." },
      { name: "Exposición a ITS", role: "asociada", why: "Rotura del preservativo." },
      { name: "Violencia o abuso sexual", role: "diferencial", why: "Se pregunta siempre, en privado." },
    ],
    reasoning: [
      "Causa: falla del método de barrera, frecuente por uso incorrecto.",
      "Mecanismo de la anticoncepción de emergencia: el levonorgestrel en dosis alta retrasa o inhibe el pico de LH y la ovulación; si ya ocurrió la fecundación, no actúa (no interrumpe un embarazo).",
      "Consecuencia: la eficacia es mayor en las primeras 24 h y disminuye con el tiempo; el DIU de cobre es el método de emergencia más eficaz hasta 5 días.",
      "Por eso se entrega en el momento, sin exámenes previos.",
    ],
    epidemiology:
      "En la Argentina, cerca del 10 % de los nacimientos son de madres adolescentes, y la mayoría de esos embarazos no fueron intencionales. La tasa bajó mucho desde 2018 con el Plan ENIA y el acceso a métodos de larga duración. La anticoncepción de emergencia es gratuita en el sistema público por la Ley 25.673.",
    management: [
      "Dar levonorgestrel 1,5 mg lo antes posible, sin test ni examen previo.",
      "Atención confidencial respetando la autonomía progresiva (Código Civil y Comercial, art. 26; Ley 26.061).",
      "Preguntar por consentimiento y violencia; actuar según protocolo si hay abuso.",
      "Consejería y oferta de método regular, idealmente de larga duración, más preservativo.",
      "Ofrecer testeo de ITS y vacunas (VPH, hepatitis B).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Anticoncepción hormonal de emergencia: guía de procedimientos para profesionales de la salud.",
      "Ley 25.673 de Salud Sexual y Procreación Responsable; Código Civil y Comercial de la Nación, art. 26.",
      "Plan Nacional de Prevención del Embarazo No Intencional en la Adolescencia (Plan ENIA).",
    ],
    pearls: ["Cuanto antes, mejor: se da en el momento.", "No requiere test de embarazo ni examen.", "No es abortiva."],
    pitfalls: ["Pedir autorización de un adulto.", "Hacerla volver otro día.", "No ofrecer un método regular."],
  },
};
