import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaCostal: ClinicalCase = {
  id: "fractura-costal",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 78, ageUnit: "años", sex: "F", context: "Vive con su hija. EPOC leve. Se cayó en el baño contra el borde de la bañera." },
  frequency: "muy-frecuente",
  intro: "“Me duele mucho el costado izquierdo al respirar. No puedo toser.”",
  vitals: { TA: "142/82 mmHg", FC: "98 lpm", FR: "24 rpm", "SatO₂": "93 %", "T°": "36,4 °C" },
  anamnesis: [
    act("mecanismo", "¿Cómo se golpeó?", "clave", "“Me resbalé y pegué con el costado en el borde de la bañera.”", "Trauma directo."),
    act("anticoag", "¿Toma anticoagulantes o aspirina?", "clave", "“Aspirina.”", "Riesgo de hemotórax."),
    act("tos", "¿Puede toser y respirar hondo?", "clave", "“No, me duele mucho.”", "El dolor lleva a hipoventilación y neumonía."),
    act("cabeza", "¿Se golpeó la cabeza?", "clave", "“No.”", "Descarta TEC."),
    act("caidas", "¿Por qué se cayó? ¿Se mareó?", "util", "“Resbalé, sin mareo.”", "Causa mecánica."),
    act("cuadro", "¿Le gusta el cuadro del baño?", "neutro", "“Me lo regaló mi nieta.”", "No orienta."),
  ],
  exam: [
    act("torax", "Palpación del tórax", "clave", "Dolor puntual con crepitación en arcos costales 8 y 9 izquierdos en línea axilar; sin movimiento paradójico.", "Fracturas sin tórax inestable."),
    act("auscultacion", "Auscultación", "clave", "Murmullo algo disminuido en base izquierda por hipoventilación.", "Buscar neumotórax o hemotórax."),
    act("abdomen", "Abdomen", "clave", "Dolor leve en hipocondrio izquierdo.", "Costillas bajas izquierdas: descartar lesión esplénica."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Fracturas de arcos 8 y 9 izquierdos, sin neumotórax ni hemotórax.", "Complicaciones."),
    study("Imágenes", "eco-fast", "Ecografía FAST", "clave", "Sin líquido libre.", "Descarta lesión esplénica sangrante."),
    study("Laboratorio", "lab", "Hemograma y gases", "util", "Hb 12,4, PaCO₂ 44 mmHg.", "Basal."),
    study("Imágenes", "rx-parrilla", "Radiografías de parrilla costal seriadas para contar fracturas", "innecesario", "No se pidieron.", "No cambian la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fx-costal", "Fracturas costales 8 y 9 izquierdas sin complicaciones, en adulta mayor con EPOC", true, "Trauma directo, dolor y crepitación localizados, radiografía con dos fracturas sin neumo ni hemotórax y FAST negativo."),
      dx("volet", "Tórax inestable (volet costal)", false, "No hay movimiento paradójico."),
      dx("neumotorax", "Neumotórax traumático", false, "Radiografía sin neumotórax."),
      dx("bazo", "Lesión esplénica", false, "FAST negativo y estable."),
      dx("contusion", "Contusión de partes blandas", false, "Hay fracturas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("analgesia", "Analgesia pautada eficaz (paracetamol + opioide débil o bloqueo regional)", "clave", "Permite toser y respirar."),
      mg("kinesio", "Kinesioterapia respiratoria e incentivador", "clave", "Previene atelectasia y neumonía."),
      mg("internar", "Internar para observación por edad, EPOC y dos fracturas", "clave", "Mayores de 65 con 2 o más fracturas tienen alta morbimortalidad."),
      mg("control-rx", "Radiografía de control a las 24–48 horas", "util", "Hemotórax tardío."),
      mg("vendaje", "Vendaje compresivo del tórax", "riesgoso", "Limita la expansión y favorece la neumonía."),
      mg("alta-sin-analgesia", "Alta con ibuprofeno a demanda", "riesgoso", "Dolor mal controlado y riesgo de neumonía en una adulta mayor con EPOC."),
    ],
  },
  debrief: {
    diagnosis: "Fracturas costales 8 y 9 izquierdas no complicadas por caída, en una mujer de 78 años con EPOC.",
    pathologies: [
      { name: "Fracturas costales", role: "principal", why: "Trauma directo." },
      { name: "EPOC", role: "asociada", why: "Menor reserva respiratoria." },
      { name: "Neumotórax, hemotórax, lesión esplénica", role: "diferencial", why: "Complicaciones." },
    ],
    reasoning: [
      "Causa: caída contra un borde duro.",
      "Mecanismo: el dolor impide toser y respirar profundo.",
      "Consecuencia: atelectasia, neumonía e insuficiencia respiratoria, sobre todo en mayores.",
    ],
    epidemiology:
      "Son las lesiones más frecuentes del trauma torácico. En mayores de 65, cada costilla fracturada aumenta la mortalidad y la neumonía; las caídas desde la propia altura son la causa principal. Las costillas bajas se asocian a lesiones de hígado y bazo.",
    management: [
      "Radiografía y FAST.",
      "Analgesia eficaz.",
      "Kinesioterapia.",
      "Internar a mayores con dos o más fracturas o con enfermedad pulmonar.",
    ],
    sources: ["Asociación Argentina de Cirugía — Trauma torácico.", "Eastern Association for the Surgery of Trauma — Pain management in blunt thoracic trauma."],
    pearls: ["El enemigo es el dolor.", "Costillas bajas: mirá el bazo o el hígado.", "No vendar."],
    pitfalls: ["Vendaje compresivo.", "Subestimar al adulto mayor."],
    tribunal: [
      qa("¿Qué es un tórax inestable?", "Dos o más costillas consecutivas fracturadas en dos o más sitios, con movimiento paradójico del segmento."),
      qa("¿Qué lesiones sugieren las fracturas de las primeras costillas?", "Un trauma de alta energía con posible lesión de grandes vasos y plexo braquial."),
      qa("¿Por qué se internan los adultos mayores con fracturas costales?", "Porque tienen mayor riesgo de neumonía, insuficiencia respiratoria y muerte por cada costilla rota."),
    ],
  },
};
