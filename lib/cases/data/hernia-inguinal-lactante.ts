import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const herniaInguinalLactante: ClinicalCase = {
  id: "hernia-inguinal-atascada-lactante",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 4, ageUnit: "meses", sex: "M", context: "Prematuro de 32 semanas. Le habían notado un bulto en la ingle que entraba solo." },
  frequency: "frecuente",
  intro: "“Llora sin parar desde hace 3 horas y el bulto en la ingle derecha está duro y no entra.”",
  vitals: { FC: "172 lpm", FR: "44 rpm", "T°": "37,4 °C", Peso: "5.400 g" },
  anamnesis: [
    act("bulto", "¿El bulto entraba antes?", "clave", "“Sí, al dejar de llorar.”", "Hernia reductible previa."),
    act("tiempo", "¿Hace cuánto no entra?", "clave", "“Tres horas.”", "Atascamiento."),
    act("vomitos", "¿Vomitó?", "clave", "“Dos veces.”", "Obstrucción."),
    act("prematuro", "¿Nació prematuro?", "util", "“A las 32 semanas.”", "Factor de riesgo."),
    act("deposiciones", "¿Hizo caca?", "util", "“Esta mañana.”", "Obstrucción reciente."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Tomás.”", "No orienta."),
  ],
  exam: [
    act("ingle", "Región inguinal", "clave", "Masa inguinoescrotal derecha tensa, dolorosa, que no transilumina.", "Hernia atascada."),
    act("testiculo", "Testículo derecho", "clave", "Palpable en el escroto, normal.", "Sin torsión."),
    act("abdomen", "Abdomen", "util", "Levemente distendido.", "Obstrucción."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía inguinal si hay dudas", "util", "Asa intestinal en el canal con flujo conservado.", "Confirma y evalúa viabilidad."),
    study("Laboratorio", "lab", "Hemograma e ionograma", "util", "Normales.", "Base."),
    study("Otros", "reduccion", "Intento de reducción manual con analgesia y sedación", "clave", "Reducción exitosa.", "Primera medida si no hay signos de isquemia."),
    study("Otros", "esperar-cirugia-meses", "Programar la cirugía para dentro de 6 meses", "riesgoso", "No se hizo.", "Alto riesgo de nuevo atascamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hernia-atascada", "Hernia inguinal indirecta atascada en lactante prematuro", true, "Bulto inguinoescrotal que no reduce, irritabilidad, vómitos y testículo normal."),
      dx("hidrocele", "Hidrocele", false, "No transilumina y es dolorosa."),
      dx("torsion", "Torsión testicular", false, "Testículo normal en el escroto."),
      dx("adenopatia", "Adenopatía inguinal", false, "Es una masa intestinal."),
      dx("invaginacion", "Invaginación intestinal", false, "La masa es inguinal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion-mg", "Reducción manual suave tras analgesia", "clave", "Éxito en la mayoría."),
      mg("cirugia-pronta", "Herniorrafia en 24 a 72 horas tras la reducción", "clave", "Evita nuevo atascamiento."),
      mg("cirugia-urgente", "Cirugía urgente si no reduce o hay signos de isquemia", "clave", "Estrangulación."),
      mg("apneas", "Monitoreo posoperatorio de apneas por prematurez", "util", "Riesgo anestésico."),
      mg("forzar", "Reducción forzada repetida", "riesgoso", "Puede reducir un asa necrótica."),
      mg("faja", "Usar una faja o moneda", "riesgoso", "No sirve y daña."),
    ],
  },
  debrief: {
    diagnosis: "Hernia inguinal indirecta derecha atascada, en lactante de 4 meses prematuro.",
    pathologies: [
      { name: "Hernia inguinal atascada", role: "principal", why: "Persistencia del conducto peritoneovaginal." },
      { name: "Prematurez", role: "asociada", why: "Factor de riesgo." },
      { name: "Hidrocele, torsión", role: "diferencial", why: "Otras masas escrotales." },
    ],
    reasoning: [
      "Causa: conducto peritoneovaginal permeable.",
      "Mecanismo: un asa entra y queda atrapada en el anillo inguinal.",
      "Consecuencia: obstrucción, isquemia del asa y del testículo.",
    ],
    epidemiology:
      "Las hernias inguinales son muy frecuentes en prematuros y varones. En lactantes el riesgo de atascamiento es alto, por eso se operan pronto tras el diagnóstico. Las de los niños son indirectas.",
    management: [
      "Reducción.",
      "Cirugía pronta.",
      "Urgente si no reduce.",
      "Monitoreo de apneas.",
    ],
    sources: ["Sociedad Argentina de Cirugía Infantil — Hernia inguinal.", "APSA — Inguinal Hernia in Infants."],
    pearls: ["Lactante con hernia: operar pronto.", "Transiluminación.", "Testículo normal."],
    pitfalls: ["Diferir meses.", "Forzar."],
    tribunal: [
      qa("¿Por qué las hernias infantiles son indirectas?", "Porque se deben a la persistencia del conducto peritoneovaginal."),
      qa("¿Cómo diferenciás hernia de hidrocele?", "El hidrocele transilumina y no se reduce al abdomen; la hernia sí al reducirla."),
      qa("¿Qué riesgo anestésico tiene un prematuro?", "Apneas posoperatorias, que obligan a monitoreo."),
    ],
  },
};
