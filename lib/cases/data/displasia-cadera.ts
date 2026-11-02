import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const displasiaCadera: ClinicalCase = {
  id: "displasia-desarrollo-cadera",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 1, ageUnit: "meses", sex: "F", context: "Primer control de salud del mes. Primera hija, nació en presentación podálica por cesárea." },
  frequency: "frecuente",
  intro: "“Vengo al control del mes. La bebé está bien, toma el pecho. Mi hermana tuvo un problema de caderas de chica.”",
  vitals: { FC: "140 lpm", FR: "40 rpm", "T°": "36,7 °C", Peso: "4,2 kg" },
  anamnesis: [
    act("podalica", "¿Cómo vino en el embarazo? ¿De cola?", "clave", "“De cola, por eso cesárea.”", "La presentación podálica es el principal factor de riesgo de displasia de cadera."),
    act("familia", "¿Alguien en la familia tuvo displasia de cadera?", "clave", "“Mi hermana usó un arnés.”", "Antecedente familiar: factor de riesgo."),
    act("faja", "¿La envuelven con las piernas estiradas y juntas?", "util", "“La abuela quiere fajarla así.”", "El fajado con piernas extendidas aumenta el riesgo."),
    act("primera", "¿Es la primera hija?", "util", "“Sí.”", "Primer hijo, sexo femenino: factores de riesgo."),
    act("lactancia", "¿Cómo toma el pecho?", "util", "“Bien.”", "Control general."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Martina.”", "No orienta."),
  ],
  exam: [
    act("ortolani", "Maniobras de Ortolani y Barlow", "clave", "Barlow positivo en la cadera izquierda (se luxa) y Ortolani positivo (se reduce con un resalte).", "Cadera luxable: displasia del desarrollo."),
    act("pliegues", "Pliegues y longitud de los miembros (Galeazzi)", "util", "Asimetría de pliegues inguinales.", "Signo de sospecha."),
    act("abduccion", "Abducción de caderas", "util", "Abducción completa.", "La limitación aparece más tarde."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía de caderas", "clave", "Cadera izquierda inestable, displásica (Graf tipo IV).", "Estudio de elección antes de los 4–6 meses (la cabeza femoral todavía no está osificada)."),
    study("Imágenes", "rx", "Radiografía de pelvis al mes", "innecesario", "No se realizó.", "No es útil antes de los 4 meses."),
    study("Laboratorio", "lab", "Laboratorio", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ddc", "Displasia del desarrollo de la cadera izquierda (cadera luxable)", true, "Barlow y Ortolani positivos en una niña podálica con antecedente familiar, con ecografía de cadera displásica."),
      dx("laxitud", "Laxitud fisiológica del recién nacido", false, "La ecografía confirma la displasia."),
      dx("artritis", "Artritis séptica de cadera", false, "No hay fiebre ni dolor."),
      dx("normal", "Cadera normal", false, "Las maniobras son positivas."),
      dx("teratologica", "Luxación teratológica", false, "Se asocia a malformaciones y es irreductible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("arnes", "Arnés de Pavlik y seguimiento con ortopedia infantil", "clave", "Mantiene la cadera en flexión y abducción: corrige la mayoría de los casos tempranos."),
      mg("fajado", "Evitar fajar con las piernas juntas y estiradas; porteo en posición de ranita", "clave", "Favorece el desarrollo de la cadera."),
      mg("controles", "Ecografías de control durante el tratamiento", "clave", "Confirma la reducción."),
      mg("doble-panal", "Doble pañal como único tratamiento", "riesgoso", "No es eficaz para una cadera luxable."),
      mg("esperar", "Esperar a que camine para evaluar", "riesgoso", "El tratamiento tardío es más complejo (yeso o cirugía)."),
      mg("rastreo", "Recordar el rastreo ecográfico en niños con factores de riesgo", "util", "Detección temprana."),
    ],
  },
  debrief: {
    diagnosis: "Displasia del desarrollo de la cadera izquierda (cadera luxable, Barlow y Ortolani positivos) en lactante de 1 mes con presentación podálica y antecedente familiar.",
    pathologies: [
      { name: "Displasia del desarrollo de la cadera", role: "principal", why: "Alteración de la relación entre la cabeza femoral y el acetábulo." },
      { name: "Factores de riesgo", role: "asociada", why: "Podálica, mujer, primera hija, antecedente familiar." },
      { name: "Laxitud fisiológica, artritis séptica", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: factores mecánicos intrauterinos (podálica, oligoamnios), hormonales (laxitud ligamentaria) y genéticos.",
      "Mecanismo: la cabeza femoral no queda centrada en el acetábulo, que no se desarrolla con profundidad.",
      "Consecuencia: sin tratamiento, cojera, dismetría y artrosis temprana.",
    ],
    epidemiology:
      "La displasia de cadera afecta a 1–2 de cada 1000 recién nacidos en su forma luxable, más en niñas (hasta 6:1), primogénitos, podálicos y con antecedentes familiares; la cadera izquierda es la más afectada.",
    management: [
      "Maniobras de Ortolani y Barlow en todos los controles hasta los 3 meses, luego abducción y asimetrías.",
      "Ecografía en niños con factores de riesgo o examen anormal.",
      "Arnés de Pavlik antes de los 6 meses.",
      "Después: reducción cerrada y yeso o cirugía.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de displasia del desarrollo de la cadera.", "Sociedad Argentina de Ortopedia y Traumatología Infantil — Recomendaciones de rastreo."],
    pearls: ["Ortolani reduce, Barlow luxa.", "Podálica + niña = ecografía.", "Pavlik antes de los 6 meses."],
    pitfalls: ["Radiografía antes de los 4 meses.", "Fajar con las piernas juntas."],
    tribunal: [
      qa("¿Qué son las maniobras de Ortolani y Barlow?", "Barlow: con la cadera en flexión y aducción se empuja hacia atrás para luxarla (provocación). Ortolani: con flexión y abducción se levanta el trocánter para reducir una cadera luxada, con un resalte (reducción). Son útiles hasta los 3 meses."),
      qa("¿Qué signos tiene la displasia en un niño mayor?", "Limitación de la abducción, signo de Galeazzi (rodilla más baja), asimetría de pliegues, marcha con cojera o en Trendelenburg e hiperlordosis si es bilateral."),
      qa("¿Por qué se usa ecografía y no radiografía antes de los 4 meses?", "Porque la cabeza femoral es cartilaginosa y no se ve en la radiografía hasta que aparece el núcleo de osificación, alrededor de los 4–6 meses."),
    ],
  },
};
