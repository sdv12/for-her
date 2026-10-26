import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const maltratoInfantil: ClinicalCase = {
  id: "lesiones-no-accidentales-lactante",
  level: 4,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "meses", sex: "M", context: "Lo trae la pareja de la madre, de noche. La mamá está trabajando." },
  frequency: "poco-frecuente",
  intro: "“Se cayó del cambiador mientras le cambiaba los pañales. Llora mucho y no mueve la pierna derecha.”",
  vitals: { FC: "168 lpm", FR: "40 rpm", "T°": "36,8 °C", "SatO₂": "98 %", Peso: "6,4 kg" },
  anamnesis: [
    act("relato", "¿Cómo fue exactamente? ¿A qué hora? ¿Desde qué altura?", "clave", "“Hace un rato, no sé, unas horas. Estaba en el cambiador, me di vuelta y se cayó. Es bajito.”", "Un relato vago, con demora en la consulta y un mecanismo de baja energía que no explica la lesión es un indicador de lesión no accidental."),
    act("desarrollo", "¿Ya se da vuelta solo? ¿Gatea?", "clave", "“No, todavía no se da vuelta.”", "Un bebé que no rota no puede caerse solo: el mecanismo relatado no coincide con el desarrollo."),
    act("previas", "¿Tuvo golpes o consultas anteriores?", "clave", "“El mes pasado se golpeó la cara con la baranda de la cuna.”", "Lesiones repetidas con explicaciones poco claras son un patrón de alerta."),
    act("controles", "¿Tiene los controles y las vacunas al día?", "util", "“Me parece que le falta alguna.”", "Controles irregulares pueden reflejar negligencia; también afectan el diferencial."),
    act("salud", "¿Tiene alguna enfermedad, sangra fácil o tuvo fracturas antes? ¿Hay huesos frágiles en la familia?", "util", "“No que yo sepa.”", "Osteogénesis imperfecta, raquitismo o coagulopatías son diferenciales que se deben descartar."),
    act("cuidadores", "¿Quién lo cuida habitualmente?", "util", "“La mamá. Yo cuando ella trabaja.”", "Información necesaria para la evaluación de protección, obtenida sin acusar."),
    act("nombre", "¿Cómo se llama el bebé?", "neutro", "“Thiago.”", "No orienta, pero ayuda a humanizar la consulta."),
  ],
  exam: [
    act("pierna", "Examen del miembro inferior derecho", "clave", "Muslo derecho tumefacto, doloroso, con impotencia funcional.", "Sugiere fractura de fémur."),
    act("piel", "Examen completo de la piel (desvestido)", "clave", "Equimosis en distintos estadios de coloración en tórax, espalda y detrás de las orejas; pequeña equimosis en el frenillo labial.", "Hematomas en un bebé que no se desplaza, en zonas no expuestas y de distinta antigüedad: muy sugestivos de maltrato."),
    act("neuro", "Fontanela y estado neurológico", "clave", "Fontanela normotensa, reactivo, sin foco.", "Hay que descartar traumatismo de cráneo abusivo (que puede estar oculto)."),
    act("fondo", "Fondo de ojo", "util", "Sin hemorragias retinianas.", "Las hemorragias retinianas múltiples orientan a trauma craneal abusivo por sacudida."),
    act("general", "Estado nutricional e higiene", "util", "Peso en percentil 10, higiene regular, dermatitis del pañal extensa.", "Puede reflejar negligencia."),
  ],
  studies: [
    study("Imágenes", "rx-femur", "Radiografía de fémur", "clave", "Fractura espiroidea del tercio medio del fémur derecho.", "Una fractura de fémur en un lactante que no camina es altamente sugestiva de lesión no accidental."),
    study("Imágenes", "serie", "Serie ósea completa", "clave", "Fracturas costales posteriores consolidando (5.ª y 6.ª izquierdas) y lesión metafisaria en la tibia izquierda.", "Encuentra lesiones ocultas: las fracturas costales posteriores y las metafisarias son muy específicas de maltrato."),
    study("Laboratorio", "coagulacion", "Hemograma, coagulograma, calcio, fósforo, fosfatasa alcalina y vitamina D", "clave", "Normales.", "Descartan coagulopatía y enfermedad ósea metabólica como explicación."),
    study("Imágenes", "tc", "Tomografía de cerebro", "util", "Sin hemorragias.", "En lactantes con sospecha de maltrato se busca trauma craneal oculto."),
    study("Imágenes", "densitometria", "Densitometría ósea", "innecesario", "No se realizó.", "No está validada en lactantes para este fin y no reemplaza a la serie ósea ni al laboratorio metabólico."),
    study("Laboratorio", "hepatico", "Transaminasas y amilasa", "util", "Normales.", "Buscan trauma abdominal oculto."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("maltrato", "Lesiones no accidentales: sospecha de maltrato físico infantil", true, "Fractura de fémur en un lactante que no se desplaza, relato inconsistente y con demora, hematomas de distinta antigüedad en zonas no expuestas, fracturas costales posteriores y metafisarias, con laboratorio normal."),
      dx("accidente", "Caída accidental del cambiador", false, "Una caída de baja altura no explica una fractura de fémur en un lactante que no rota, ni las lesiones antiguas."),
      dx("oi", "Osteogénesis imperfecta", false, "Daría escleróticas azules, antecedentes familiares, dentinogénesis imperfecta y osteopenia; no explica las equimosis."),
      dx("raquitismo", "Raquitismo", false, "Calcio, fósforo, fosfatasa alcalina y vitamina D normales."),
      dx("coagulopatia", "Coagulopatía", false, "El coagulograma es normal y no explica las fracturas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internación para tratamiento, estudio completo y protección", "clave", "La internación protege al niño mientras se evalúa la situación; el riesgo de nuevas lesiones es alto."),
      mg("comunicar", "Comunicación obligatoria al organismo de protección de derechos de niñas, niños y adolescentes (y denuncia según la jurisdicción)", "clave", "Ante la sospecha, el equipo de salud está obligado a comunicar (Ley 26.061); no hace falta certeza."),
      mg("equipo", "Intervención del equipo interdisciplinario (pediatría, trabajo social, salud mental) y documentación detallada de lesiones y relatos textuales", "clave", "El abordaje es en equipo y la documentación cuidadosa es clave para la protección."),
      mg("traumato", "Tratamiento ortopédico de la fractura", "util", "Necesario, pero no es el único problema."),
      mg("confrontar", "Acusar al acompañante y amenazarlo con la policía", "riesgoso", "Puede llevar a que se retire con el niño y pone en riesgo al bebé y al equipo; la sospecha se maneja con calma y siguiendo el protocolo."),
      mg("alta", "Yeso pelvipédico y alta con control en una semana", "riesgoso", "Devuelve al niño al entorno donde probablemente se lesionó."),
    ],
  },
  debrief: {
    diagnosis: "Sospecha de maltrato físico infantil: fractura espiroidea de fémur, fracturas costales posteriores en consolidación, lesión metafisaria y equimosis de distinta antigüedad en lactante de 5 meses.",
    pathologies: [
      { name: "Maltrato físico infantil (lesiones no accidentales)", role: "principal", why: "Lesiones múltiples, de distinta antigüedad, no explicadas por el relato ni el desarrollo." },
      { name: "Posible negligencia", role: "asociada", why: "Controles incompletos, peso bajo, higiene." },
      { name: "Osteogénesis imperfecta", role: "diferencial", why: "Causa de fracturas con traumas mínimos." },
      { name: "Raquitismo y coagulopatías", role: "diferencial", why: "Se descartan con el laboratorio." },
    ],
    reasoning: [
      "Causa: violencia física de un adulto a cargo, en un contexto con factores de riesgo (estrés, cuidadores no biológicos, aislamiento, violencia familiar, consumo).",
      "Mecanismo: las fracturas espiroideas de huesos largos se producen por torsión; las costales posteriores, por compresión del tórax al sujetar al bebé; las metafisarias (“en asa de balde”), por tracción y sacudida.",
      "Consecuencia: lesiones múltiples en distintos momentos, con relatos cambiantes, vagos o que no coinciden con el desarrollo motor del niño.",
      "“Los bebés que no se desplazan no se golpean”: hematomas o fracturas en un lactante sin desplazamiento autónomo requieren siempre evaluación de maltrato.",
    ],
    epidemiology:
      "El maltrato infantil es un problema subregistrado en la Argentina. Los menores de un año son el grupo con mayor riesgo de lesiones graves y muerte por maltrato físico, en especial por trauma craneal abusivo. Los varones lactantes aparecen algo más representados en las lesiones físicas graves. El equipo de salud es muchas veces el primer lugar donde se lo puede detectar.",
    management: [
      "Sospechar ante relatos inconsistentes, demora en la consulta, lesiones que no coinciden con el desarrollo, lesiones repetidas o en distintos estadios.",
      "Examen completo desvestido; serie ósea en menores de 2 años, fondo de ojo y TC de cerebro en lactantes, laboratorio para diferenciales.",
      "Internar para proteger; documentar lesiones y relatos textuales.",
      "Comunicar al organismo de protección de derechos (Ley 26.061) y denunciar según la normativa local; abordaje interdisciplinario.",
      "No confrontar ni acusar: el objetivo es proteger al niño.",
    ],
    sources: [
      "Ministerio de Salud de la Nación y UNICEF — Guía de atención de niñas, niños y adolescentes víctimas de violencia.",
      "Sociedad Argentina de Pediatría — Consenso sobre maltrato infantil.",
      "Ley 26.061 de Protección Integral de los Derechos de Niñas, Niños y Adolescentes.",
    ],
    pearls: [
      "Los bebés que no se desplazan no se golpean.",
      "Fracturas costales posteriores y metafisarias: muy específicas de maltrato.",
      "La sospecha alcanza para comunicar: no hace falta certeza.",
    ],
    pitfalls: ["Tratar solo la fractura y dar el alta.", "Confrontar al acompañante.", "No hacer la serie ósea."],
  },
};
