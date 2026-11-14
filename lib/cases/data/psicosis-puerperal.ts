import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const psicosisPuerperal: ClinicalCase = {
  id: "psicosis-puerperal",
  level: 4,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Puérpera de 8 días, primer hijo. Su madre tiene trastorno bipolar." },
  frequency: "raro",
  intro: "El marido: “Hace tres días no duerme, habla sin parar, dice que el bebé no es nuestro y que lo cambiaron.”",
  vitals: { TA: "124/78 mmHg", FC: "102 lpm", "T°": "36,8 °C" },
  anamnesis: [
    act("inicio", "¿Cuándo empezó?", "clave", "“A los cinco días del parto.”", "Inicio en las primeras 2 semanas."),
    act("bebe", "¿Qué dice del bebé? ¿Habló de hacerle daño?", "clave", "“Que lo cambiaron. Dijo que había que 'salvarlo'.”", "Riesgo para el bebé."),
    act("familia", "¿Antecedentes psiquiátricos en la familia?", "clave", "“Su mamá es bipolar.”", "Factor de riesgo fuerte."),
    act("sueno", "¿Cuánto duerme?", "util", "“Casi nada en tres días.”", "Manía."),
    act("parto", "¿Cómo fue el parto? ¿Fiebre, sangrado?", "util", "“Normal, sin fiebre.”", "Causas orgánicas."),
    act("nombre", "¿Cómo se llama el bebé?", "neutro", "“Mateo.”", "No orienta."),
  ],
  exam: [
    act("mental", "Examen mental", "clave", "Agitada, desorientada a ratos, delirio de sustitución, alucinaciones auditivas.", "Psicosis con confusión."),
    act("fisico", "Examen físico", "clave", "Sin fiebre, útero involucionando, sin signos de infección.", "Excluye causa orgánica."),
    act("neuro", "Examen neurológico", "util", "Sin foco.", "Base."),
  ],
  studies: [
    study("Laboratorio", "organicas", "Hemograma, glucemia, ionograma, calcio, TSH, función renal y hepática", "clave", "Normales.", "Descartar orgánicas."),
    study("Laboratorio", "tox", "Tóxicos en orina", "util", "Negativos.", "Excluye consumo."),
    study("Imágenes", "tc", "TC de cerebro si hay foco o síntomas atípicos", "util", "Normal.", "Descartar trombosis venosa."),
    study("Otros", "alta-domiciliaria", "Manejo ambulatorio con la familia", "riesgoso", "No se hizo.", "Riesgo de suicidio e infanticidio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("psicosis-puerperal", "Psicosis puerperal (episodio maníaco con síntomas psicóticos en el posparto)", true, "Inicio en la primera semana, insomnio, delirio sobre el bebé, confusión y madre bipolar."),
      dx("baby-blues", "Tristeza posparto (baby blues)", false, "Hay psicosis."),
      dx("depresion-posparto", "Depresión posparto", false, "Predominan manía y delirio."),
      dx("delirium", "Delirium por infección", false, "Sin fiebre ni foco."),
      dx("tvc", "Trombosis venosa cerebral", false, "Sin cefalea ni foco; igual se considera."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación psiquiátrica urgente, idealmente unidad madre-bebé", "clave", "Emergencia psiquiátrica."),
      mg("seguridad", "Supervisión permanente del bebé", "clave", "Riesgo de daño."),
      mg("farmacos", "Antipsicótico y estabilizador del ánimo (litio)", "clave", "Tratamiento."),
      mg("lactancia", "Evaluar la lactancia según fármacos", "util", "Seguridad."),
      mg("benzo-solo", "Solo benzodiacepinas y alta", "riesgoso", "No trata la psicosis."),
      mg("separar-sin-plan", "Separar al bebé sin plan de vínculo", "riesgoso", "Daña el vínculo; se busca contacto supervisado."),
    ],
  },
  debrief: {
    diagnosis: "Psicosis puerperal con síntomas maníacos y delirio de sustitución del bebé, en mujer de 26 años con madre bipolar.",
    pathologies: [
      { name: "Psicosis puerperal", role: "principal", why: "Emergencia psiquiátrica posparto." },
      { name: "Vulnerabilidad bipolar", role: "asociada", why: "Factor de riesgo principal." },
      { name: "Depresión posparto, delirium", role: "diferencial", why: "Otros cuadros del puerperio." },
    ],
    reasoning: [
      "Causa: caída hormonal brusca, privación de sueño y vulnerabilidad bipolar.",
      "Mecanismo: desestabilización afectiva con psicosis.",
      "Consecuencia: riesgo de suicidio e infanticidio.",
    ],
    epidemiology:
      "Afecta a 1 o 2 de cada 1.000 partos, con inicio en las primeras dos semanas. El trastorno bipolar personal o familiar es el principal factor de riesgo. Con tratamiento, el pronóstico es bueno.",
    management: [
      "Reconocer la emergencia.",
      "Descartar orgánicas.",
      "Internar.",
      "Tratar y cuidar el vínculo.",
    ],
    sources: ["Asociación de Psiquiatras Argentinos — Salud mental perinatal.", "NICE — Antenatal and Postnatal Mental Health Guideline."],
    pearls: ["Inicio en la primera semana.", "Bipolaridad familiar.", "Es una emergencia."],
    pitfalls: ["Confundir con baby blues.", "Manejo ambulatorio."],
    tribunal: [
      qa("¿Qué diferencia hay con el baby blues?", "El baby blues es leve, autolimitado en 2 semanas y sin psicosis."),
      qa("¿Qué riesgo tiene en próximos embarazos?", "Alto riesgo de recurrencia; se planifica profilaxis."),
      qa("¿Qué causa orgánica se descarta?", "Infección, tiroiditis, trombosis venosa cerebral, eclampsia y fármacos."),
    ],
  },
};
