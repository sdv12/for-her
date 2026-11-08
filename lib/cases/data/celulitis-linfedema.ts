import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const celulitisLinfedema: ClinicalCase = {
  id: "celulitis-linfedema-posmastectomia",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 61, ageUnit: "años", sex: "F", context: "Mastectomía con vaciamiento axilar izquierdo hace 8 años. Linfedema del brazo. Recorta el jardín." },
  frequency: "frecuente",
  intro: "“Se me puso rojo, caliente y duro el brazo izquierdo. Tengo fiebre y escalofríos desde ayer. Me pinché con una rosa.”",
  vitals: { TA: "112/68 mmHg", FC: "104 lpm", FR: "20 rpm", "T°": "38,8 °C", "SatO₂": "97 %", Glucemia: "112 mg/dl" },
  anamnesis: [
    act("puerta", "¿Lastimadura o pinchazo?", "clave", "“Una espina, hace 2 días.”", "Puerta de entrada."),
    act("episodios", "¿Episodios anteriores?", "clave", "“Otro hace un año.”", "Recurrencia."),
    act("alarma", "¿Dolor muy intenso, ampollas, piel oscura?", "clave", "“No.”", "Fascitis."),
    act("alergia", "¿Alergia a penicilina?", "util", "“No.”", "Antibiótico."),
    act("cancer", "¿Controles oncológicos?", "util", "“Al día.”", "Recidiva."),
    act("rosas", "¿Qué plantas tenés?", "neutro", "“Rosas y un limonero.”", "No orienta."),
  ],
  exam: [
    act("brazo", "Brazo", "clave", "Eritema mal delimitado y caliente, sin fluctuación.", "Celulitis."),
    act("necrosis", "Signos de gravedad", "clave", "Sin crepitación ni necrosis; dolor proporcional.", "Excluye fascitis."),
    act("ganglios", "Pulsos, trayecto venoso y axila", "util", "Pulsos normales; sin cordón.", "TVP y recidiva."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, creatinina, glucemia, PCR", "clave", "Leucocitos 15.000.", "Base."),
    study("Laboratorio", "hemocultivos", "Hemocultivos en fiebre alta o linfedema", "clave", "Negativos.", "Riesgo."),
    study("Imágenes", "eco", "Ecografía de partes blandas o Doppler", "util", "Sin absceso ni trombosis.", "Excluye."),
    study("Imágenes", "tc-todos", "TC sin signos de gravedad", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("celulitis", "Celulitis sobre linfedema posmastectomía", true, "Eritema, fiebre, puerta de entrada y linfedema."),
      dx("fascitis", "Fascitis necrotizante", false, "Sin dolor desproporcionado ni necrosis."),
      dx("tvp", "TVP", false, "Doppler negativo."),
      dx("recidiva", "Recidiva tumoral cutánea", false, "Fiebre y buena respuesta a antibióticos."),
      dx("gota", "Gota", false, "No es articular."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Cefalosporina de primera generación o ampicilina-sulbactam EV inicial", "clave", "Cubre estreptococo y estafilococo."),
      mg("elevar", "Elevar el miembro y marcar los bordes", "clave", "Reduce edema."),
      mg("prevencion", "Cuidado de piel, drenaje linfático y guantes", "clave", "Evita recurrencias."),
      mg("profilaxis", "Considerar profilaxis si es recurrente", "util", "Celulitis repetida."),
      mg("no-procedimientos", "Tomar la presión y punzar ese brazo", "riesgoso", "Se evita en linfedema."),
      mg("aines-solos", "AINE solamente", "riesgoso", "Necesita antibiótico."),
    ],
  },
  debrief: {
    diagnosis: "Celulitis del miembro superior izquierdo sobre linfedema posmastectomía, en mujer de 61 años.",
    pathologies: [
      { name: "Celulitis", role: "principal", why: "Infección de dermis y tejido subcutáneo." },
      { name: "Linfedema", role: "asociada", why: "Riesgo de recurrencia." },
      { name: "Fascitis, TVP, recidiva", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: estreptococo betahemolítico o estafilococo.",
      "Mecanismo: linfa estancada favorece la infección.",
      "Consecuencia: eritema, fiebre, y más daño linfático.",
    ],
    epidemiology:
      "Una proporción de las mujeres con vaciamiento axilar desarrolla linfedema, y estas tienen más riesgo de celulitis repetidas. Cada episodio empeora el daño. La rehabilitación y el cuidado cutáneo son clave y no es necesario un tratamiento de larga duración en todos los casos.",
    management: [
      "Evaluar gravedad.",
      "Antibiótico.",
      "Elevación.",
      "Prevenir.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infecciones de piel y partes blandas.", "IDSA — Skin and Soft Tissue Infections Guideline."],
    pearls: ["Linfedema: riesgo aumentado.", "Marcá los bordes.", "Prevención."],
    pitfalls: ["Omitir alarma de fascitis.", "Olvidar la profilaxis."],
    tribunal: [
      qa("¿Cómo diferencias erisipela y celulitis?", "Erisipela: dermis superficial, bordes netos y sobreelevados, suele ser estreptocócica. Celulitis: más profunda, bordes difusos."),
      qa("¿Cuáles son los signos de fascitis necrotizante?", "Dolor desproporcionado, ampollas hemorrágicas, crepitación y deterioro rápido."),
      qa("¿Cuándo cubrís SAMR?", "Ante abscesos, antecedente de colonización, uso de drogas, o falta de respuesta."),
    ],
  },
};
