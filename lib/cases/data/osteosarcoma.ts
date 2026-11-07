import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const osteosarcoma: ClinicalCase = {
  id: "osteosarcoma-adolescente",
  level: 3,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 15, ageUnit: "años", sex: "M", context: "Juega al rugby. Le dijeron que era un “desgarro” y le dieron antiinflamatorios." },
  frequency: "raro",
  intro: "“Hace tres meses me duele la rodilla, arriba de todo. Ahora me despierta de noche y tengo un bulto duro.”",
  vitals: { TA: "116/70 mmHg", FC: "78 lpm", "T°": "36,6 °C", Peso: "58 kg" },
  anamnesis: [
    act("dolor", "¿El dolor mejora con reposo? ¿Te despierta?", "clave", "“No mejora y me despierta.”", "Dolor nocturno y progresivo: signo de alarma."),
    act("trauma", "¿Hubo un golpe claro?", "clave", "“Un golpe leve, cuando empezó.”", "El golpe suele llamar la atención, no ser la causa."),
    act("sistemico", "¿Fiebre, baja de peso, tos?", "clave", "“Tos a veces.”", "Metástasis pulmonares."),
    act("crecimiento", "¿Creciste mucho este año?", "util", "“10 centímetros.”", "Se asocia con el estirón."),
    act("familia", "¿Tumores en la familia, retinoblastoma?", "util", "“No.”", "Asociados."),
    act("posicion", "¿De qué jugás?", "neutro", "“De ala.”", "No orienta."),
  ],
  exam: [
    act("masa", "Palpar la masa", "clave", "Masa dura, fija, dolorosa en metáfisis distal del fémur, con calor y venas prominentes.", "Sospecha de tumor maligno."),
    act("rodilla", "Movilidad y marcha", "clave", "Flexión limitada, renguea.", "Compromiso funcional."),
    act("ganglios", "Ganglios y pulmones", "util", "Sin adenopatías; pulmones limpios.", "Examen de extensión."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de fémur", "clave", "Lesión mixta metafisaria, reacción perióstica en rayos de sol, triángulo de Codman.", "Muy sugestiva."),
    study("Imágenes", "rmn", "RM de todo el hueso", "clave", "Extensión a partes blandas, sin invadir la articulación.", "Planifica cirugía."),
    study("Imágenes", "tc", "TC de tórax y centellograma o PET", "clave", "Nódulo pulmonar de 6 mm.", "Metástasis más común."),
    study("Otros", "biopsia", "Biopsia por el equipo que operará", "clave", "Osteosarcoma de alto grado.", "Una biopsia mal hecha compromete salvar el miembro."),
    study("Otros", "kine", "Seguir con kinesiología y AINE", "riesgoso", "No se realizó.", "Demora un cáncer curable."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("osteosarcoma", "Osteosarcoma de fémur distal con posible metástasis pulmonar", true, "Adolescente, dolor nocturno, masa metafisaria, sol naciente, Codman y biopsia."),
      dx("ewing", "Sarcoma de Ewing", false, "Es más diafisario, con capas de cebolla."),
      dx("osteomielitis", "Osteomielitis", false, "No hay fiebre ni reactantes; la biopsia define."),
      dx("osgood", "Osgood-Schlatter", false, "Afecta tuberosidad tibial, sin dolor nocturno ni masa."),
      dx("desgarro", "Desgarro muscular", false, "No da masa dura ósea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("centro", "Derivar con urgencia a un centro de sarcomas pediátricos", "clave", "Mejora la sobrevida y la cirugía."),
      mg("quimio", "Quimioterapia neoadyuvante y adyuvante", "clave", "Trata micrometástasis."),
      mg("cirugia", "Cirugía con márgenes amplios, conservando el miembro si es posible", "clave", "Control local."),
      mg("apoyo", "Apoyo psicológico, y preservar fertilidad", "util", "Efectos del tratamiento."),
      mg("aine", "AINE y reposo por un mes más", "riesgoso", "Demora el diagnóstico."),
      mg("curetaje", "Curetaje o resección en un quirófano general sin planificar", "riesgoso", "Disemina y compromete el miembro."),
    ],
  },
  debrief: {
    diagnosis: "Osteosarcoma de alto grado de fémur distal con nódulo pulmonar, en adolescente de 15 años.",
    pathologies: [
      { name: "Osteosarcoma", role: "principal", why: "Tumor óseo maligno primario más frecuente en jóvenes." },
      { name: "Metástasis pulmonar", role: "asociada", why: "Sitio más frecuente." },
      { name: "Ewing, osteomielitis, Osgood-Schlatter", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: mutaciones, como RB1 y TP53, durante el crecimiento rápido.",
      "Mecanismo: células malignas que forman osteoide en la metáfisis.",
      "Consecuencia: dolor, masa, fracturas patológicas y metástasis pulmonares.",
    ],
    epidemiology:
      "Tiene un pico durante el estirón puberal, con mayor frecuencia en varones, en rodilla (fémur distal y tibia proximal). Es poco frecuente, pero es importante, ya que muchos casos se tratan como lesiones deportivas. Con tratamiento, la sobrevida es de 60 a 70 % en formas localizadas.",
    management: [
      "Dolor óseo nocturno: radiografía.",
      "RM y estadificación.",
      "Biopsia planificada.",
      "Quimioterapia y cirugía.",
    ],
    sources: ["Instituto Nacional del Cáncer — Guía de tumores pediátricos.", "Sociedad Argentina de Hematología y Oncología Pediátrica — Recomendaciones."],
    pearls: ["Dolor nocturno y masa en un adolescente: radiografía.", "Rayos de sol y Codman.", "No biopsiar fuera del centro."],
    pitfalls: ["Decir que es una lesión deportiva sin imagen.", "Hacer biopsia sin plan."],
    tribunal: [
      qa("¿Qué diferencia tiene con Ewing?", "Osteosarcoma: metáfisis, sol naciente, forma osteoide. Ewing: diáfisis, capas de cebolla, células redondas pequeñas, t(11;22), fiebre."),
      qa("¿Qué es el triángulo de Codman?", "Periostio elevado por un tumor agresivo que forma un triángulo de hueso nuevo."),
      qa("¿Cuáles son los tumores óseos más frecuentes en adultos?", "Metástasis de mama, próstata, pulmón, riñón y tiroides, y el mieloma."),
    ],
  },
};
