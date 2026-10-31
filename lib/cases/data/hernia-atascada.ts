import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const herniaAtascada: ClinicalCase = {
  id: "hernia-inguinal-atascada",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Albañil. Tiene una hernia hace años que “se metía sola”." },
  frequency: "frecuente",
  intro: "“Levantando una bolsa se me salió la hernia de la ingle derecha y no la puedo meter. Me duele mucho, hace seis horas. Vomité una vez.”",
  vitals: { TA: "142/86 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "37,4 °C" },
  anamnesis: [
    act("tiempo", "¿Hace cuánto no se reduce?", "clave", "“Seis horas.”", "Más de 4–6 horas de atascamiento con dolor aumenta el riesgo de estrangulación."),
    act("dolor", "¿Cómo es el dolor? ¿Cambió?", "clave", "“Cada vez más fuerte y constante.”", "Un dolor intenso y persistente sugiere compromiso vascular (estrangulación)."),
    act("obstruccion", "¿Elimina gases y materia fecal? ¿Tiene la panza hinchada?", "clave", "“No largo gases desde hace unas horas.”", "Signos de obstrucción intestinal por el asa atrapada."),
    act("previa", "¿Le habían indicado operarse?", "util", "“Sí, pero lo fui dejando.”", "La cirugía programada evita esta complicación."),
    act("anticoag", "¿Toma anticoagulantes?", "util", "“No.”", "Importa para la cirugía."),
    act("tos", "¿Tiene tos crónica, constipación o le cuesta orinar?", "util", "“Fumo y toso.”", "Factores que aumentan la presión abdominal y favorecen la hernia."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“De Huracán.”", "No orienta."),
  ],
  exam: [
    act("hernia", "Examen de la región inguinal", "clave", "Masa inguinoescrotal derecha, tensa, muy dolorosa, irreductible, con piel levemente eritematosa.", "Hernia irreductible dolorosa con cambios en la piel: sospecha de estrangulación."),
    act("abdomen", "Palpación abdominal", "clave", "Distendido, timpánico, ruidos aumentados; sin peritonismo.", "Obstrucción intestinal sin peritonitis aún."),
    act("testiculo", "Testículo", "util", "Palpable, normal.", "Descarta torsión o patología testicular."),
    act("otras", "Otros orificios herniarios", "util", "Sin otras hernias.", "Busca hernias bilaterales o femorales."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, ionograma, lactato, función renal, coagulograma", "clave", "Leucocitos 14.500, lactato 2,6.", "Leucocitosis y lactato elevado sugieren isquemia intestinal."),
    study("Imágenes", "rx", "Radiografía de abdomen de pie", "util", "Asas de intestino delgado dilatadas con niveles hidroaéreos.", "Confirma la obstrucción."),
    study("Imágenes", "eco", "Ecografía de la región inguinal", "util", "Asa intestinal en el saco herniario, con paredes engrosadas y escaso flujo al doppler.", "Ayuda a confirmar compromiso vascular."),
    study("Imágenes", "tc-demora", "Esperar una tomografía para decidir la cirugía", "riesgoso", "No se realizó.", "La clínica es suficiente: demorar aumenta el riesgo de necrosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("estrangulada", "Hernia inguinal atascada con probable estrangulación y obstrucción intestinal", true, "Hernia irreductible de 6 horas, dolorosa, con eritema, obstrucción, leucocitosis y lactato alto."),
      dx("atascada-simple", "Hernia atascada no complicada", false, "Sería irreductible pero sin dolor intenso progresivo, sin obstrucción ni signos de isquemia."),
      dx("hidrocele", "Hidrocele", false, "Masa escrotal indolora que transilumina, sin relación con el abdomen."),
      dx("torsion", "Torsión testicular", false, "El testículo es normal."),
      dx("adenopatia", "Adenopatía inguinal", false, "Nódulo firme por debajo del ligamento inguinal, sin obstrucción."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía de urgencia: reducción del contenido, evaluación de la viabilidad del asa (resección si está necrótica) y hernioplastia", "clave", "La estrangulación es una emergencia quirúrgica."),
      mg("soporte", "Ayuno, hidratación endovenosa, sonda nasogástrica y analgesia", "clave", "Preparación prequirúrgica de la obstrucción."),
      mg("atb", "Antibiótico profiláctico prequirúrgico", "util", "Reduce la infección del sitio quirúrgico."),
      mg("taxis-forzada", "Intentar reducir a la fuerza (taxis) una hernia con signos de estrangulación", "riesgoso", "Puede reintroducir un asa necrótica en el abdomen (reducción en bloque) y causar peritonitis."),
      mg("alta", "Alta con analgésicos y cirugía programada", "riesgoso", "Riesgo de necrosis y perforación."),
      mg("faja", "Indicar una faja herniaria", "innecesario", "No sirve en la urgencia."),
    ],
  },
  debrief: {
    diagnosis: "Hernia inguinal derecha atascada con probable estrangulación y obstrucción de intestino delgado, en varón de 58 años.",
    pathologies: [
      { name: "Hernia inguinal estrangulada", role: "principal", why: "Contenido atrapado con compromiso vascular." },
      { name: "Obstrucción intestinal", role: "asociada", why: "Por el asa atrapada." },
      { name: "Hidrocele, torsión testicular, adenopatía", role: "diferencial", why: "Otras masas inguinoescrotales." },
    ],
    reasoning: [
      "Causa: debilidad de la pared abdominal en la región inguinal (indirecta por el conducto inguinal o directa por el triángulo de Hesselbach) y aumento de la presión intraabdominal.",
      "Mecanismo: el contenido (intestino, epiplón) queda atrapado en el anillo herniario (atascamiento); el edema compromete el retorno venoso y luego el flujo arterial (estrangulación).",
      "Consecuencia: dolor intenso, obstrucción intestinal, isquemia, necrosis y perforación si no se opera.",
    ],
    epidemiology:
      "Las hernias inguinales son mucho más frecuentes en varones (casi 10 a 1), con un pico en la infancia y otro después de los 50 años. Las hernias femorales son más frecuentes en mujeres y se estrangulan más. El trabajo físico, la tos crónica y la constipación favorecen su aparición.",
    management: [
      "Hernias sintomáticas: cirugía programada para evitar complicaciones.",
      "Atascada sin signos de estrangulación y de pocas horas: intento de reducción cuidadosa y cirugía programada pronto.",
      "Estrangulada (dolor intenso, piel cambiada, obstrucción, fiebre, laboratorio alterado): cirugía de urgencia.",
      "Evaluar la viabilidad intestinal y resecar si hay necrosis.",
    ],
    sources: ["Asociación Argentina de Cirugía — Recomendaciones sobre hernias de la pared abdominal.", "Guías internacionales HerniaSurge, adoptadas en el país."],
    pearls: ["Hernia irreductible + dolor intenso + obstrucción = estrangulación.", "No forzar la reducción si hay signos de isquemia.", "Siempre examinar los orificios herniarios en una obstrucción."],
    pitfalls: ["Reducir a la fuerza.", "Demorar la cirugía por imágenes."],
    tribunal: [
      qa("¿Qué diferencia una hernia inguinal directa de una indirecta?", "La indirecta sale por el anillo inguinal profundo, lateral a los vasos epigástricos inferiores, por un conducto peritoneovaginal permeable (congénita, más frecuente). La directa protruye por el triángulo de Hesselbach, medial a los vasos, por debilidad de la pared posterior (adquirida, en mayores)."),
      qa("¿Qué es una hernia atascada y una estrangulada?", "Atascada (incarcerada): irreductible, sin compromiso vascular. Estrangulada: con compromiso de la irrigación del contenido, con riesgo de necrosis."),
      qa("¿Por qué las hernias femorales son más peligrosas?", "Porque el anillo femoral es estrecho y rígido: se atascan y estrangulan con más frecuencia; son más comunes en mujeres."),
    ],
  },
};
