import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoPeriamigdalino: ClinicalCase = {
  id: "absceso-periamigdalino",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "M", context: "Fumador. Una semana con angina, tomó amoxicilina solo dos días." },
  frequency: "frecuente",
  intro: "“Me duele mucho el lado izquierdo de la garganta, no puedo abrir la boca ni tragar la saliva, y hablo raro.”",
  vitals: { TA: "122/74 mmHg", FC: "106 lpm", FR: "18 rpm", "T°": "38,7 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("unilateral", "¿De qué lado duele? ¿Empeoró tras mejorar?", "clave", "“Izquierdo, peor.”", "Unilateralidad."),
    act("alarma", "¿Te falta el aire? ¿Babeás?", "clave", "“Babeo, respiro bien.”", "Vía aérea."),
    act("atb", "¿Qué tomaste y cuánto?", "clave", "“Dos días.”", "Tratamiento incompleto."),
    act("mono", "¿Mucho cansancio o ganglios en todo el cuerpo?", "util", "“No.”", "Mononucleosis."),
    act("alergia", "¿Alergia a penicilina?", "util", "“No.”", "Empírico."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Fútbol.”", "No orienta."),
  ],
  exam: [
    act("orofaringe", "Orofaringe", "clave", "Abombamiento periamigdalino izquierdo, úvula desviada a la derecha, trismo.", "Típico."),
    act("voz", "Voz y respiración", "clave", "Voz en papa caliente, sin estridor.", "Sin compromiso de la vía aérea."),
    act("cuello", "Cuello", "util", "Adenopatía, sin rigidez ni tumefacción difusa.", "Sin espacio profundo."),
  ],
  studies: [
    study("Otros", "puncion", "Punción diagnóstica", "clave", "Pus.", "Diagnostica y trata."),
    study("Laboratorio", "lab", "Hemograma, glucemia, cultivo del material", "clave", "Leucocitos 17.000; S. pyogenes.", "Base."),
    study("Imágenes", "tc", "TC de cuello si dudas", "util", "No hizo falta.", "Si hay duda o extensión."),
    study("Imágenes", "rx", "Radiografía de tórax de rutina", "innecesario", "No se realizó.", "No sirve."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso", "Absceso periamigdalino izquierdo", true, "Dolor unilateral, trismo, úvula desviada y pus."),
      dx("amigdalitis", "Amigdalitis simple", false, "No da trismo ni desvía la úvula."),
      dx("epiglotitis", "Epiglotitis", false, "Da estridor y babeo sin abombamiento."),
      dx("retrofaringeo", "Absceso retrofaríngeo", false, "Da dolor al mover el cuello."),
      dx("mono", "Mononucleosis", false, "Es bilateral y sistémica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje por punción o incisión", "clave", "Elimina el pus."),
      mg("atb", "Amoxicilina-clavulánico o ampicilina-sulbactam", "clave", "Cubre flora."),
      mg("hidratar", "Hidratación y analgesia", "clave", "No puede tragar."),
      mg("corticoide", "Una dosis de corticoide", "util", "Reduce trismo."),
      mg("completar", "Reiterar la necesidad de completar antibióticos", "util", "Educación."),
      mg("oral", "Solo paracetamol y alta", "riesgoso", "Puede extenderse."),
    ],
  },
  debrief: {
    diagnosis: "Absceso periamigdalino izquierdo como complicación de faringoamigdalitis, en varón de 23 años.",
    pathologies: [
      { name: "Absceso periamigdalino", role: "principal", why: "Infección profunda." },
      { name: "Riesgo de extensión", role: "asociada", why: "Espacios profundos." },
      { name: "Epiglotitis, retrofaríngeo", role: "diferencial", why: "Otras urgencias." },
    ],
    reasoning: [
      "Causa: estreptococo y anaerobios.",
      "Mecanismo: el pus se acumula fuera de la cápsula.",
      "Consecuencia: trismo, disfagia, extensión al cuello y mediastino.",
    ],
    epidemiology:
      "Es la complicación supurada más común de la faringitis en adolescentes y adultos jóvenes. El tabaquismo es un factor de riesgo reconocido. Puede reaparecer, y la amigdalectomía se considera en casos recidivantes.",
    management: [
      "Evaluar la vía aérea.",
      "Drenar.",
      "Antibióticos.",
      "Control a las 24 horas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Infecciones de las vías aéreas superiores.", "Infectious Diseases Society of America — Pharyngitis Guideline."],
    pearls: ["Trismo con úvula desviada.", "Voz en papa caliente.", "Drenar y antibiótico."],
    pitfalls: ["Solo antibiótico.", "Pasar por alto la vía aérea."],
    tribunal: [
      qa("¿Qué es el síndrome de Lemierre?", "Tromboflebitis yugular séptica por Fusobacterium tras una faringitis."),
      qa("¿Cuál es el criterio de Centor?", "Fiebre, exudado amigdalino, adenopatía cervical anterior y ausencia de tos, con ajuste por edad."),
      qa("¿Cómo se trata la faringitis por estreptococo?", "Penicilina o amoxicilina por 10 días, o macrólido si hay alergia."),
    ],
  },
};
