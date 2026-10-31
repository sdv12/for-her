import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dispepsiaHp: ClinicalCase = {
  id: "ulcera-duodenal-helicobacter",
  level: 1,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Maestra. Toma mucho mate." },
  frequency: "muy-frecuente",
  intro: "“Hace dos meses tengo un dolor en la boca del estómago, como hambre dolorosa. Se me calma cuando como, pero vuelve a las dos o tres horas y a veces me despierta de noche.”",
  vitals: { TA: "118/76 mmHg", FC: "74 lpm", Peso: "66 kg" },
  anamnesis: [
    act("ritmo", "¿Cómo se relaciona el dolor con las comidas?", "clave", "“Comer me alivia, y a las horas vuelve; me despierta a la madrugada.”", "El dolor que calma con la comida y aparece en ayunas o de noche es típico de úlcera duodenal."),
    act("alarma", "¿Bajó de peso, vomitó, tuvo materia fecal negra o le cuesta tragar?", "clave", "“No, nada de eso.”", "Sin síntomas de alarma ni hemorragia."),
    act("aines", "¿Toma antiinflamatorios o aspirina?", "clave", "“No.”", "Los AINE son la otra gran causa de úlcera péptica."),
    act("familia", "¿Hay cáncer de estómago en la familia?", "util", "“No.”", "Cambia la indicación de endoscopia."),
    act("tabaco", "¿Fuma o toma alcohol?", "util", "“No.”", "El tabaco retrasa la cicatrización."),
    act("pirosis", "¿Tiene acidez que sube al pecho?", "util", "“No, es más abajo.”", "Distingue de la ERGE."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Leer.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Dolor leve en epigastrio, sin defensa, masas ni visceromegalias.", "Examen compatible con úlcera no complicada."),
    act("palidez", "Palidez y ganglios supraclaviculares", "clave", "Sin palidez ni adenopatías.", "Descarta signos de alarma."),
    act("peso", "Peso", "util", "Estable.", "Sin pérdida de peso."),
  ],
  studies: [
    study("Otros", "veda", "Videoendoscopia digestiva alta con biopsias", "clave", "Úlcera duodenal de 8 mm en la cara anterior del bulbo, limpia. Test de ureasa de la biopsia antral positivo.", "Confirma la úlcera y la infección por H. pylori; en mayores de 40–45 años o con dudas se prefiere la endoscopia."),
    study("Laboratorio", "aliento", "Test del aire espirado con urea marcada (alternativa no invasiva)", "util", "Positivo.", "Útil para el diagnóstico y para confirmar la erradicación."),
    study("Laboratorio", "serologia", "Serología para H. pylori para controlar la erradicación", "innecesario", "No se realizó.", "Los anticuerpos persisten meses o años: no sirven para controlar la erradicación."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ulcera", "Úlcera duodenal no complicada asociada a Helicobacter pylori", true, "Dolor epigástrico que alivia con la comida y aparece en ayunas y de noche, sin AINE, con úlcera bulbar y ureasa positiva."),
      dx("erge", "Enfermedad por reflujo", false, "Pirosis y regurgitación retroesternal, no dolor epigástrico con ritmo de comidas."),
      dx("gastrica", "Úlcera gástrica", false, "El dolor suele empeorar con la comida; la endoscopia muestra la lesión en el bulbo duodenal."),
      dx("biliar", "Cólico biliar", false, "Dolor en hipocondrio derecho tras comidas grasas, de horas, no crónico y diario."),
      dx("funcional", "Dispepsia funcional", false, "Requiere endoscopia normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("erradicacion", "Erradicación de H. pylori: IBP + amoxicilina + claritromicina (o esquema con bismuto) por 14 días", "clave", "La erradicación cicatriza la úlcera y casi elimina las recurrencias."),
      mg("ibp", "Continuar IBP hasta completar la cicatrización", "util", "Reduce el ácido y el dolor."),
      mg("control", "Confirmar la erradicación con test del aire o antígeno en materia fecal, al menos 4 semanas después de terminar", "clave", "Verifica el éxito del tratamiento (sin IBP en las 2 semanas previas)."),
      mg("adherencia", "Explicar la importancia de completar los 14 días", "clave", "La falta de adherencia es causa de fracaso y resistencia."),
      mg("ibp-solo", "Solo IBP por tiempo indefinido sin erradicar", "innecesario", "La úlcera recurre si no se elimina la bacteria."),
      mg("cirugia", "Derivar a cirugía", "innecesario", "La úlcera no complicada se trata médicamente."),
    ],
  },
  debrief: {
    diagnosis: "Úlcera duodenal no complicada asociada a Helicobacter pylori.",
    pathologies: [
      { name: "Úlcera duodenal", role: "principal", why: "Lesión de la mucosa del bulbo." },
      { name: "Infección por Helicobacter pylori", role: "asociada", why: "Causa principal." },
      { name: "ERGE y dispepsia funcional", role: "diferencial", why: "Otras causas de dolor epigástrico." },
    ],
    reasoning: [
      "Causa: Helicobacter pylori, bacteria adquirida en la infancia que coloniza el estómago.",
      "Mecanismo: en la gastritis antral aumenta la gastrina y la secreción ácida; el exceso de ácido llega al duodeno, que desarrolla metaplasia gástrica colonizada por la bacteria y se ulcera.",
      "Consecuencia: dolor que calma con la comida (que amortigua el ácido) y reaparece en ayunas; complicaciones: hemorragia, perforación, estenosis.",
    ],
    epidemiology:
      "Helicobacter pylori infecta a cerca de la mitad de la población argentina adulta, con mayor prevalencia en contextos de menor nivel socioeconómico. La úlcera duodenal predomina entre los 30 y 55 años y es algo más frecuente en varones; la gástrica, en mayores. La infección también se asocia a cáncer gástrico y linfoma MALT.",
    management: [
      "Dispepsia sin alarma en jóvenes: test y tratamiento de H. pylori; con alarma o mayor edad, endoscopia.",
      "Erradicación con terapia triple o cuádruple por 14 días.",
      "Confirmar la erradicación con test del aire o antígeno fecal.",
      "Suspender AINE si los toma.",
    ],
    sources: ["Federación Argentina de Gastroenterología — Consenso argentino sobre Helicobacter pylori.", "Sociedad Argentina de Gastroenterología — Recomendaciones de dispepsia."],
    pearls: ["Dolor que calma con la comida: úlcera duodenal.", "Erradicar es curar.", "La serología no sirve para controlar."],
    pitfalls: ["Dar IBP indefinido sin erradicar.", "Controlar con serología."],
    tribunal: [
      qa("¿Qué métodos diagnósticos hay para H. pylori?", "Invasivos (con endoscopia): test de ureasa, histología y cultivo. No invasivos: test del aire espirado con urea marcada, antígeno en materia fecal y serología (solo para diagnóstico inicial, no para control)."),
      qa("¿Qué enfermedades se asocian a H. pylori?", "Gastritis crónica, úlcera duodenal y gástrica, adenocarcinoma gástrico, linfoma MALT, anemia ferropénica y púrpura trombocitopénica inmune."),
      qa("¿Qué complicaciones tiene la úlcera péptica?", "Hemorragia (la más frecuente), perforación (dolor brusco, abdomen en tabla, neumoperitoneo), penetración y estenosis pilórica."),
    ],
  },
};
