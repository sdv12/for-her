import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tosIecas: ClinicalCase = {
  id: "tos-iecas",
  level: 1,
  area: "Respiratorio",
  setting: "CAPS",
  patient: { age: 61, ageUnit: "años", sex: "F", context: "Ama de casa. Le diagnosticaron hipertensión hace 3 meses. No fuma." },
  frequency: "muy-frecuente",
  intro: "“Hace dos meses que tengo una tos seca que no me deja dormir. Ya tomé tres jarabes.”",
  vitals: { TA: "128/78 mmHg", FC: "70 lpm", FR: "14 rpm", "SatO₂": "98 %", "T°": "36,2 °C" },
  anamnesis: [
    act("medicacion", "¿Qué medicación empezó en los últimos meses?", "clave", "“Enalapril para la presión, hace como 10 semanas.”", "La tos aparece entre 1 semana y 6 meses después de iniciar un IECA."),
    act("caracter", "¿Es seca o con flema?", "clave", "“Seca, como un cosquilleo en la garganta.”", "Típico de la tos por IECA."),
    act("alarma", "¿Fiebre, sangre, pérdida de peso, falta de aire?", "clave", "“No, nada de eso.”", "Sin signos de alarma."),
    act("goteo", "¿Mocos que le bajan por la garganta o acidez?", "clave", "“No.”", "Las otras causas comunes de tos crónica: goteo nasal, asma y reflujo."),
    act("tabaco", "¿Fuma o convive con fumadores?", "util", "“No.”", "Descarta causa frecuente."),
    act("mascotas", "¿Tiene mascotas?", "neutro", "“Un gato.”", "Poco relevante sin síntomas alérgicos."),
  ],
  exam: [
    act("pulmon", "Auscultación pulmonar", "clave", "Murmullo vesicular conservado, sin sibilancias ni rales.", "Normal."),
    act("orofaringe", "Orofaringe y fosas nasales", "util", "Sin rinorrea posterior ni empedrado.", "No sugiere goteo posnasal."),
    act("edema", "Labios y lengua", "clave", "Sin edema.", "El angioedema es la otra complicación del IECA y obliga a suspenderlo."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Normal.", "Razonable en tos de más de 8 semanas para descartar patología estructural."),
    study("Otros", "espirometria", "Espirometría", "innecesario", "No hizo falta.", "Se pide si persiste después de suspender el IECA."),
    study("Imágenes", "tac", "TC de tórax", "innecesario", "No se pidió.", "Sin alarmas ni radiografía anormal."),
    study("Otros", "prueba-suspension", "Prueba terapéutica: suspender el IECA", "clave", "La tos mejoró a las 3 semanas y desapareció a las 6.", "Es el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tos-ieca", "Tos crónica por inhibidores de la enzima convertidora (enalapril)", true, "Tos seca que empezó con el enalapril, sin alarmas, examen normal y resolución al suspenderlo."),
      dx("asma", "Asma tusígena", false, "Sin sibilancias ni atopía; mejoró al suspender el IECA."),
      dx("erge", "Tos por reflujo", false, "Sin síntomas de reflujo."),
      dx("goteo", "Síndrome de tos de vía aérea superior", false, "Sin rinorrea ni goteo posterior."),
      dx("cancer", "Cáncer de pulmón", false, "No fumadora, sin alarmas y radiografía normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender el enalapril", "clave", "La tos desaparece en 1 a 4 semanas, a veces hasta 3 meses."),
      mg("ara2", "Cambiar a un ARA II (losartán)", "clave", "No aumentan la bradicinina y casi no dan tos."),
      mg("explicar", "Explicar que no es una infección", "clave", "Evita más jarabes y antibióticos."),
      mg("control", "Control en 4–6 semanas", "util", "Si persiste, buscar otra causa."),
      mg("antitusivo-codeina", "Codeína para la tos y mantener el enalapril", "riesgoso", "Tapa el síntoma, deja la causa y tiene efectos adversos."),
      mg("antibiotico", "Amoxicilina por si es bronquitis", "innecesario", "No hay infección."),
    ],
  },
  debrief: {
    diagnosis: "Tos crónica seca por enalapril, en una mujer de 61 años hipertensa.",
    pathologies: [
      { name: "Tos por IECA", role: "principal", why: "Efecto adverso de clase." },
      { name: "Hipertensión arterial", role: "asociada", why: "Motivo del IECA." },
      { name: "Asma, reflujo, goteo posnasal", role: "diferencial", why: "Causas más comunes de tos crónica en no fumadores." },
    ],
    reasoning: [
      "Causa: inhibición de la enzima convertidora, que también degrada bradicinina y sustancia P.",
      "Mecanismo: acumulación de bradicinina y prostaglandinas que sensibiliza el reflejo tusígeno.",
      "Consecuencia: tos seca persistente que cede al suspender el fármaco.",
    ],
    epidemiology:
      "La tos aparece en el 5 al 20 % de quienes toman IECA, más en mujeres, no fumadores y personas de ascendencia asiática. No depende de la dosis. Es una de las causas más fáciles de corregir de tos crónica y una de las más olvidadas.",
    management: [
      "Preguntar siempre por la medicación.",
      "Suspender el IECA.",
      "Cambiar a ARA II.",
      "Buscar otra causa si persiste a las 4–6 semanas.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Tos crónica.", "ACCP — Cough guidelines: ACE inhibitor-induced cough."],
    pearls: ["Tos crónica: preguntá por enalapril.", "Es de clase: no sirve cambiar a otro IECA.", "ARA II es la alternativa."],
    pitfalls: ["Dar jarabes uno tras otro.", "Cambiar a otro IECA."],
    tribunal: [
      qa("¿Por qué los IECA dan tos y los ARA II casi no?", "Porque el IECA impide degradar bradicinina, y el ARA II bloquea el receptor de angiotensina sin tocar esa vía."),
      qa("¿Qué otro efecto adverso grave del IECA comparte el mecanismo?", "El angioedema, mediado por bradicinina, que puede comprometer la vía aérea y contraindica el fármaco."),
      qa("¿Cuáles son las causas más frecuentes de tos crónica en un no fumador con radiografía normal?", "Goteo posnasal o tos de vía aérea superior, asma, reflujo gastroesofágico y fármacos como los IECA."),
    ],
  },
};
