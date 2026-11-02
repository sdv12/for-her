import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaRadio: ClinicalCase = {
  id: "fractura-radio-distal",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 67, ageUnit: "años", sex: "F", context: "Jubilada. Menopausia a los 48. Nunca se hizo densitometría." },
  frequency: "muy-frecuente",
  intro: "“Me resbalé en la vereda mojada y apoyé la mano para no caerme. Me duele muchísimo la muñeca y la tengo deformada.”",
  vitals: { TA: "142/84 mmHg", FC: "90 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("mecanismo", "¿Cómo cayó? ¿Sobre la mano con la muñeca extendida?", "clave", "“Con la mano abierta hacia atrás.”", "Caída sobre la mano en extensión: mecanismo típico de la fractura de Colles."),
    act("cabeza", "¿Se golpeó la cabeza o perdió el conocimiento? ¿Por qué se cayó?", "clave", "“Me resbalé, no me desmayé ni me golpeé la cabeza.”", "Descarta trauma craneal y síncope como causa de la caída."),
    act("hormigueo", "¿Siente hormigueo en los dedos?", "clave", "“Un poco en el pulgar y el índice.”", "Evaluar el nervio mediano, que puede comprimirse."),
    act("osteoporosis", "¿Tuvo fracturas antes? ¿Toma corticoides? ¿Fuma?", "util", "“No. Fumé muchos años.”", "Fractura por fragilidad: sospechar osteoporosis."),
    act("dominante", "¿Es diestra?", "util", "“Sí, y es la derecha.”", "Importa para el pronóstico funcional."),
    act("anticoag", "¿Toma anticoagulantes?", "util", "“No.”", "Relevante si hay que operar."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("deformidad", "Inspección de la muñeca", "clave", "Deformidad en dorso de tenedor, edema y hematoma.", "Típica de la fractura de Colles: desplazamiento dorsal del fragmento distal."),
    act("neurovascular", "Pulsos, relleno capilar y sensibilidad", "clave", "Pulso radial presente, relleno 2 s; hipoestesia leve en el territorio del mediano.", "Documentar el estado neurovascular antes y después de reducir."),
    act("tabaquera", "Palpación de la tabaquera anatómica y del codo", "util", "Sin dolor en tabaquera; codo normal.", "Descarta fractura de escafoides y lesiones asociadas."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de muñeca frente y perfil", "clave", "Fractura extraarticular del radio distal con desplazamiento e inclinación dorsal; fractura de la apófisis estiloides cubital.", "Confirma y clasifica: define si se reduce y si es estable."),
    study("Imágenes", "densitometria", "Densitometría ósea (en el seguimiento)", "util", "T-score de cadera −2,7.", "Una fractura por fragilidad indica estudiar y tratar la osteoporosis."),
    study("Imágenes", "rmn", "Resonancia de muñeca", "innecesario", "No se realizó.", "No hace falta para una fractura de Colles."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colles", "Fractura de Colles (radio distal extraarticular con desplazamiento dorsal), por fragilidad", true, "Caída de propia altura sobre la mano en extensión, deformidad en dorso de tenedor y radiografía compatible, en mujer posmenopáusica."),
      dx("smith", "Fractura de Smith", false, "En la de Smith el desplazamiento es palmar, por caída con la muñeca en flexión."),
      dx("escafoides", "Fractura de escafoides", false, "Sin dolor en la tabaquera y la radiografía muestra fractura del radio."),
      dx("esguince", "Esguince de muñeca", false, "Hay deformidad y fractura en la radiografía."),
      dx("luxacion", "Luxación del semilunar", false, "La radiografía muestra fractura del radio con carpo alineado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reduccion", "Reducción cerrada bajo anestesia (bloqueo del hematoma) e inmovilización con yeso", "clave", "Restaura la anatomía y alivia la compresión del mediano."),
      mg("control", "Radiografía y control neurovascular después de reducir, control a la semana", "clave", "Las fracturas pueden perder la reducción."),
      mg("analgesia", "Analgesia, elevación y movilizar los dedos", "clave", "Previene el edema y la rigidez."),
      mg("osteoporosis", "Estudiar y tratar la osteoporosis (calcio, vitamina D, bifosfonato) y prevenir caídas", "clave", "Una fractura por fragilidad predice nuevas fracturas, incluida la de cadera."),
      mg("vendaje", "Vendaje elástico y alta sin reducir", "riesgoso", "Consolidaría desplazada, con dolor y pérdida de función."),
      mg("cirugia-todas", "Cirugía de urgencia en todos los casos", "innecesario", "La cirugía se reserva para fracturas inestables, intraarticulares o que pierden la reducción."),
    ],
  },
  debrief: {
    diagnosis: "Fractura de Colles del radio distal derecho, extraarticular y desplazada, por fragilidad, en mujer de 67 años con osteoporosis.",
    pathologies: [
      { name: "Fractura de Colles", role: "principal", why: "Fractura del radio distal con desplazamiento dorsal." },
      { name: "Osteoporosis", role: "asociada", why: "Fractura con traumatismo de baja energía." },
      { name: "Fractura de Smith o de escafoides", role: "diferencial", why: "Otras fracturas de muñeca." },
    ],
    reasoning: [
      "Causa: caída de propia altura con la mano extendida, en hueso frágil.",
      "Mecanismo: la fuerza en extensión fractura la metáfisis distal del radio (hueso trabecular, el primero en perder masa en la posmenopausia).",
      "Consecuencia: deformidad en dorso de tenedor, dolor, impotencia funcional y posible compresión del nervio mediano.",
    ],
    epidemiology:
      "La fractura del radio distal es una de las fracturas más frecuentes en adultos, sobre todo en mujeres de más de 50 años, y suele ser la primera fractura por osteoporosis, anticipando años antes la de cadera. También es frecuente en niños y jóvenes por traumatismos de alta energía.",
    management: [
      "Evaluación neurovascular y radiografía.",
      "Reducción e inmovilización por 4 a 6 semanas; cirugía si es inestable o intraarticular desplazada.",
      "Rehabilitación precoz de dedos, codo y hombro.",
      "Estudio y tratamiento de la osteoporosis y prevención de caídas.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Recomendaciones sobre fracturas del radio distal.", "Asociación Argentina de Osteología y Metabolismo Mineral — Guías de osteoporosis."],
    pearls: ["Dorso de tenedor = Colles.", "Fractura por fragilidad = estudiar osteoporosis.", "Revisar el mediano antes y después de reducir."],
    pitfalls: ["No tratar la osteoporosis.", "Olvidar el control neurovascular."],
    tribunal: [
      qa("¿Qué es una fractura por fragilidad?", "La que se produce con un traumatismo de baja energía (caída de propia altura o menos) y es un criterio de osteoporosis, independientemente de la densitometría; las típicas son de muñeca, vértebras, cadera y húmero proximal."),
      qa("¿Cómo se diagnostica la osteoporosis por densitometría?", "T-score de −2,5 o menos en columna o cadera en mujeres posmenopáusicas y varones mayores de 50; entre −1 y −2,5 es osteopenia. También se calcula el riesgo de fractura con FRAX."),
      qa("¿Qué complicaciones tiene la fractura de radio distal?", "Pérdida de la reducción y consolidación viciosa, compresión del nervio mediano (síndrome del túnel carpiano), rotura del tendón extensor largo del pulgar, síndrome de dolor regional complejo y rigidez."),
    ],
  },
};
