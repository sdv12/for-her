import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const incompetenciaCervical: ClinicalCase = {
  id: "insuficiencia-cervical",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 14 semanas. Dos pérdidas previas a las 19 y 21 semanas, sin dolor. Conización hace 4 años." },
  frequency: "poco-frecuente",
  intro: "“Perdí dos embarazos en el segundo trimestre, sin contracciones, de golpe. Tengo miedo de que vuelva a pasar.”",
  vitals: { TA: "112/70 mmHg", FC: "78 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("perdidas", "¿Cómo fueron las pérdidas?", "clave", "“Sin dolor, se rompió la bolsa y nació.”", "Dilatación indolora."),
    act("conizacion", "¿Cirugías en el cuello uterino?", "clave", "“Una conización.”", "Factor de riesgo."),
    act("semanas", "¿A qué semana fueron?", "clave", "“19 y 21.”", "Segundo trimestre."),
    act("infecciones", "¿Flujo o fiebre en esos embarazos?", "util", "“No.”", "Corioamnionitis."),
    act("anomalias", "¿Te dijeron que tenés útero con forma especial?", "util", "“No.”", "Malformación uterina."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy bibliotecaria.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Cuello cerrado, cicatriz de conización.", "Base."),
    act("utero", "Altura uterina", "clave", "Acorde a 14 semanas.", "Base."),
    act("infeccion", "Flujo", "util", "Normal.", "Sin infección."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía obstétrica", "clave", "Feto vivo, acorde.", "Vitalidad."),
    study("Imágenes", "cervicometria", "Cervicometría transvaginal seriada desde las 16 semanas", "util", "Cuello de 32 mm a las 14 semanas.", "Seguimiento."),
    study("Laboratorio", "cultivos", "Urocultivo y estudio de flujo", "util", "Negativos.", "Tratar infecciones antes del cerclaje."),
    study("Otros", "esperar-acortamiento", "Esperar a que el cuello se acorte para decidir pese a dos pérdidas", "riesgoso", "No se hizo.", "Con historia típica se indica cerclaje electivo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("insuficiencia", "Insuficiencia cervical con antecedente de dos pérdidas indoloras del segundo trimestre", true, "Pérdidas de segundo trimestre sin contracciones, conización previa."),
      dx("aborto-habitual", "Aborto recurrente del primer trimestre", false, "Las pérdidas fueron en el segundo trimestre."),
      dx("antifosfolipido", "Síndrome antifosfolipídico", false, "Patrón de dilatación indolora; igual se puede estudiar."),
      dx("infeccion", "Corioamnionitis recurrente", false, "Sin fiebre ni infección."),
      dx("parto-prematuro", "Amenaza de parto prematuro", false, "No hay contracciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cerclaje", "Cerclaje electivo entre las 12 y 14 semanas", "clave", "Indicado por historia."),
      mg("seguimiento", "Control de alto riesgo y cervicometría", "clave", "Vigilancia."),
      mg("pautas", "Pautas de alarma: pérdida de líquido, presión pelviana", "clave", "Detección temprana."),
      mg("progesterona", "Considerar progesterona vaginal", "util", "Complemento según caso."),
      mg("reposo", "Reposo absoluto todo el embarazo", "riesgoso", "Sin beneficio y con riesgo trombótico."),
      mg("nada", "Control habitual", "riesgoso", "Alto riesgo de nueva pérdida."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia cervical con dos pérdidas indoloras del segundo trimestre y conización previa, en embarazada de 14 semanas.",
    pathologies: [
      { name: "Insuficiencia cervical", role: "principal", why: "Cuello que se dilata sin contracciones." },
      { name: "Conización", role: "asociada", why: "Factor de riesgo." },
      { name: "Antifosfolipídico, aborto recurrente", role: "diferencial", why: "Otras pérdidas recurrentes." },
    ],
    reasoning: [
      "Causa: debilidad estructural del cuello por cirugía o congénita.",
      "Mecanismo: el cuello se acorta y dilata sin contracciones.",
      "Consecuencia: pérdidas o partos muy prematuros en el segundo trimestre.",
    ],
    epidemiology:
      "Es causa de una parte de las pérdidas del segundo trimestre. Las conizaciones y dilataciones repetidas aumentan el riesgo. El cerclaje puede indicarse por historia, por ecografía o de emergencia.",
    management: [
      "Historia obstétrica.",
      "Cerclaje electivo.",
      "Cervicometría.",
      "Pautas.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de parto prematuro.", "ACOG — Practice Bulletin: Cerclage for the Management of Cervical Insufficiency."],
    pearls: ["Pérdida indolora del segundo trimestre.", "Cerclaje a las 12-14.", "Conización es factor."],
    pitfalls: ["Reposo absoluto.", "Esperar sin plan."],
    tribunal: [
      qa("¿Qué tipos de cerclaje hay?", "Por historia (electivo), por ecografía (cuello corto) y de emergencia (con dilatación)."),
      qa("¿Cuándo se retira el cerclaje?", "A las 36-37 semanas o si hay trabajo de parto o rotura de membranas."),
      qa("¿Qué es cuello corto en la ecografía?", "Menos de 25 mm antes de las 24 semanas."),
    ],
  },
};
