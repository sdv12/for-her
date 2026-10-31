import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const obstruccionBridas: ClinicalCase = {
  id: "obstruccion-intestinal-bridas",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 70, ageUnit: "años", sex: "F", context: "Le sacaron el útero hace 15 años y la vesícula hace 5." },
  frequency: "frecuente",
  intro: "“Desde ayer tengo dolores en la panza que van y vienen, vomito todo y no largo gases ni hago caca. Tengo la panza muy hinchada.”",
  vitals: { TA: "116/70 mmHg", FC: "106 lpm", FR: "20 rpm", "T°": "37,2 °C" },
  anamnesis: [
    act("cirugias", "¿Qué cirugías abdominales tuvo?", "clave", "“Histerectomía y vesícula.”", "Las bridas posquirúrgicas son la primera causa de obstrucción de intestino delgado en adultos."),
    act("gases", "¿Cuándo eliminó gases y materia fecal por última vez?", "clave", "“Ayer a la mañana.”", "Falta de gases y heces: obstrucción completa."),
    act("vomitos", "¿Cómo son los vómitos?", "util", "“Primero comida, ahora verdes y con mal olor.”", "Vómitos biliosos y luego fecaloideos indican obstrucción baja o prolongada."),
    act("dolor", "¿El dolor es en oleadas o constante?", "clave", "“En oleadas, pero desde hace un rato es constante.”", "Un dolor que pasa de cólico a constante sugiere estrangulación."),
    act("hernias", "¿Tiene hernias?", "util", "“No que sepa.”", "Las hernias son la segunda causa: hay que buscarlas."),
    act("peso", "¿Bajó de peso o cambió el ritmo de evacuación antes?", "util", "“No.”", "Orientaría a tumor de colon."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Seis.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Inspección, auscultación y palpación abdominal", "clave", "Distensión, cicatrices de laparotomía, ruidos de lucha metálicos, timpanismo; dolor difuso sin defensa ni Blumberg.", "Obstrucción mecánica sin peritonitis."),
    act("hernias", "Examen de orificios herniarios", "clave", "Sin hernias.", "Siempre se buscan en una obstrucción."),
    act("tacto", "Tacto rectal", "util", "Ampolla vacía, sin masas.", "Descarta fecaloma o tumor rectal."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas, oliguria.", "Pérdida de líquido en la luz intestinal y por vómitos."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen de pie y acostada", "clave", "Asas de delgado dilatadas, centrales, con válvulas conniventes (pila de monedas) y niveles hidroaéreos; colon sin gas.", "Patrón de obstrucción de intestino delgado."),
    study("Imágenes", "tc", "Tomografía de abdomen con contraste", "clave", "Punto de transición en íleon sin masa, sin signos de isquemia.", "Confirma, localiza y descarta estrangulación."),
    study("Laboratorio", "lab", "Ionograma, función renal, lactato, hemograma", "clave", "K 3,2, urea 68, lactato normal, leucocitos 11.000.", "Hipopotasemia y deshidratación; lactato normal aleja isquemia."),
    study("Otros", "colono", "Colonoscopia", "innecesario", "No se realizó.", "No sirve en la obstrucción de delgado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bridas", "Obstrucción de intestino delgado por bridas posquirúrgicas, sin signos de estrangulación", true, "Antecedente de laparotomías, dolor cólico, vómitos, falta de gases, distensión, niveles en delgado y punto de transición sin masa."),
      dx("ileo", "Íleo paralítico", false, "Ruidos ausentes, sin dolor cólico, con gas en delgado y colon; en contexto de cirugía, electrolitos o fármacos."),
      dx("colon", "Obstrucción de colon por tumor", false, "Distensión marcada con colon dilatado y cambio previo del ritmo."),
      dx("hernia", "Hernia atascada", false, "No hay hernias en el examen."),
      dx("volvulo", "Vólvulo de sigma", false, "Distensión masiva con imagen en grano de café en la radiografía."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("snc", "Ayuno, sonda nasogástrica para descomprimir e hidratación con reposición de potasio", "clave", "Sin estrangulación, la mayoría de las obstrucciones por bridas se resuelven con tratamiento conservador."),
      mg("contraste", "Contraste hidrosoluble oral para diagnóstico y tratamiento", "util", "Si llega al colon en 24 h, predice resolución y puede acelerarla."),
      mg("control", "Controles clínicos seriados y cirugía si no resuelve en 48–72 h o aparecen signos de isquemia", "clave", "Fiebre, dolor constante, peritonismo, taquicardia o lactato alto indican cirugía."),
      mg("laxantes", "Laxantes o enemas", "riesgoso", "Pueden empeorar el cuadro y no resuelven una obstrucción mecánica."),
      mg("cirugia-ya", "Laparotomía inmediata en todos los casos", "innecesario", "Sin signos de estrangulación se intenta primero el tratamiento conservador."),
    ],
  },
  debrief: {
    diagnosis: "Obstrucción de intestino delgado por bridas posquirúrgicas, sin signos de estrangulación, con deshidratación e hipopotasemia.",
    pathologies: [
      { name: "Obstrucción de intestino delgado por bridas", role: "principal", why: "Adherencias tras cirugías abdominales." },
      { name: "Estrangulación intestinal", role: "diferencial", why: "Complicación que obliga a operar." },
      { name: "Íleo paralítico, hernia, tumor de colon", role: "diferencial", why: "Otras causas de obstrucción." },
    ],
    reasoning: [
      "Causa: adherencias fibrosas que se forman tras cirugías abdominales.",
      "Mecanismo: una brida acoda o comprime un asa; por encima se acumulan gas y líquido, aumenta la presión en la pared y se compromete el retorno venoso.",
      "Consecuencia: dolor cólico, vómitos, distensión, falta de gases; pérdida de líquido y electrolitos; si se compromete el flujo arterial, isquemia y perforación.",
    ],
    epidemiology:
      "Las bridas son la causa de alrededor del 60–70 % de las obstrucciones de intestino delgado en adultos, seguidas por las hernias y los tumores. Es una consulta frecuente en guardia en personas con cirugías abdominales previas, de cualquier sexo.",
    management: [
      "Confirmar la obstrucción con radiografía y tomografía.",
      "Buscar signos de estrangulación (clínica, laboratorio, tomografía).",
      "Sin estrangulación: tratamiento conservador con sonda, hidratación y electrolitos; contraste hidrosoluble.",
      "Con estrangulación o falla del tratamiento: cirugía.",
    ],
    sources: ["Asociación Argentina de Cirugía — Recomendaciones sobre obstrucción intestinal.", "Guías de Bologna sobre obstrucción adherencial."],
    pearls: ["Cicatrices + vómitos + no largar gases = bridas.", "Sin isquemia: sonda y esperar.", "Siempre buscar hernias."],
    pitfalls: ["Dar laxantes.", "No reponer el potasio."],
    tribunal: [
      qa("¿Qué diferencia una obstrucción de delgado de una de colon en la radiografía?", "Delgado: asas centrales, válvulas conniventes que cruzan toda la luz (pila de monedas), poco gas en el colon. Colon: asas periféricas con haustras que no cruzan toda la luz, gran distensión, imagen en grano de café en el vólvulo de sigma."),
      qa("¿Qué signos sugieren estrangulación?", "Dolor que pasa a constante, fiebre, taquicardia, peritonismo, leucocitosis, lactato elevado y en la tomografía engrosamiento de la pared con mal realce, líquido libre o neumatosis."),
      qa("¿Cuáles son las causas de obstrucción intestinal en adultos?", "Intestino delgado: bridas, hernias, tumores, enfermedad de Crohn, íleo biliar. Colon: cáncer colorrectal, vólvulo, diverticulitis complicada, fecaloma."),
    ],
  },
};
