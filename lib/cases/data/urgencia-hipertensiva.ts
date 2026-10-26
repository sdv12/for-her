import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const urgenciaHipertensiva: ClinicalCase = {
  id: "hipertension-severa-sin-dano",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Hipertensa. Se tomó la presión en la farmacia." },
  frequency: "muy-frecuente",
  intro: "“En la farmacia me dio 20 de máxima y me mandaron urgente para acá. Tengo un poco de dolor de cabeza en la nuca. Hace una semana que me quedé sin las pastillas.”",
  vitals: { TA: "196/112 mmHg (repetida: 192/110)", FC: "84 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("adherencia", "¿Qué medicación toma y cómo la está tomando?", "clave", "“Enalapril 10 mg dos veces por día y amlodipina 5. Se me terminaron hace una semana y no conseguí turno para la receta.”", "La suspensión del tratamiento es la causa más frecuente de hipertensión severa en guardia."),
    act("pecho", "¿Tiene dolor de pecho o le falta el aire?", "clave", "“No.”", "Dolor torácico o disnea podrían indicar síndrome coronario, disección aórtica o edema agudo de pulmón (emergencias)."),
    act("neuro", "¿Tiene debilidad, problemas para hablar, confusión o ve mal?", "clave", "“No, solo la cabeza un poco pesada.”", "Un déficit neurológico, la confusión o los trastornos visuales sugieren ACV o encefalopatía hipertensiva."),
    act("cefalea", "¿Cómo es el dolor de cabeza? ¿Es el peor de su vida?", "clave", "“Es leve, como otras veces cuando estoy nerviosa.”", "Una cefalea súbita e intensa obliga a descartar hemorragia subaracnoidea."),
    act("otros", "¿Tomó algún antigripal, descongestivo o antiinflamatorio?", "util", "“Ibuprofeno estos días por la rodilla.”", "AINE, descongestivos y corticoides suben la presión y reducen el efecto de los antihipertensivos."),
    act("orina", "¿Orina menos o tiene las piernas hinchadas?", "util", "“No.”", "Busca compromiso renal o sobrecarga."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("toma", "Repetir la TA en ambos brazos tras 30 minutos de reposo", "clave", "178/104 mmHg en el brazo derecho, 176/102 en el izquierdo.", "El reposo y la tranquilidad bajan la presión; la diferencia entre brazos mayor a 20 mmHg sugeriría disección aórtica."),
    act("neuro", "Examen neurológico", "clave", "Sin déficit focal; lúcida.", "Descarta daño neurológico agudo."),
    act("cardiopulmonar", "Auscultación cardíaca y pulmonar", "clave", "R4, sin soplos; pulmones limpios.", "Sin signos de insuficiencia cardíaca aguda."),
    act("fondo", "Fondo de ojo", "util", "Estrechamiento arteriolar y cruces arteriovenosos; sin hemorragias, exudados ni papiledema.", "Hemorragias o papiledema indicarían hipertensión maligna (emergencia)."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Ritmo sinusal, signos de hipertrofia ventricular izquierda, sin isquemia aguda.", "Busca isquemia aguda y daño crónico."),
    study("Laboratorio", "renal", "Creatinina, ionograma y orina completa", "util", "Creatinina 0,9 mg/dl, K 4,2. Orina sin proteinuria ni hematuria.", "Descarta daño renal agudo."),
    study("Laboratorio", "troponina", "Troponina", "innecesario", "Normal.", "Sin dolor torácico ni cambios en el ECG no se pide de rutina."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Sin síntomas neurológicos no aporta."),
    study("Imágenes", "rx", "Radiografía de tórax", "neutro", "Índice cardiotorácico en el límite; sin congestión.", "No cambia la conducta en ausencia de síntomas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("urgencia", "Hipertensión arterial severa sin daño agudo de órgano blanco (urgencia hipertensiva) por abandono del tratamiento", true, "Presión ≥ 180/110 sin síntomas ni signos de daño agudo (corazón, cerebro, riñón, retina, aorta), con causa clara."),
      dx("emergencia", "Emergencia hipertensiva", false, "Requiere daño agudo de órgano blanco (ACV, encefalopatía, edema de pulmón, SCA, disección, falla renal aguda, eclampsia). No lo hay."),
      dx("hsa", "Hemorragia subaracnoidea", false, "Cefalea súbita, la peor de la vida, con o sin rigidez de nuca. Esta cefalea es leve y conocida."),
      dx("secundaria", "Hipertensión secundaria (feocromocitoma)", false, "Crisis paroxísticas con palpitaciones, sudoración y cefalea; acá hay abandono del tratamiento."),
      dx("disección", "Disección aórtica", false, "Dolor torácico desgarrante con diferencia de presión entre brazos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("retomar", "Reiniciar su tratamiento oral habitual y bajar la presión en forma gradual en 24–48 h", "clave", "Sin daño agudo, la presión se baja lentamente con fármacos orales; no hace falta un descenso inmediato."),
      mg("reposo", "Reposo en ambiente tranquilo y nueva toma", "clave", "Muchas presiones severas bajan con el reposo y la tranquilidad."),
      mg("aines", "Suspender el ibuprofeno y dar receta y turno de control en 24–72 h", "clave", "Retira un factor que la eleva y asegura la continuidad del tratamiento, que es lo que falló."),
      mg("nifedipina", "Nifedipina sublingual", "riesgoso", "Produce caídas bruscas e imprevisibles de la presión que pueden causar isquemia cerebral o coronaria. No se usa."),
      mg("ev", "Antihipertensivo endovenoso en unidad cerrada", "innecesario", "Se reserva para las emergencias hipertensivas."),
      mg("furosemida", "Furosemida endovenosa", "innecesario", "Sin sobrecarga de volumen puede deshidratar y no corresponde."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión arterial severa sin daño agudo de órgano blanco (urgencia hipertensiva) por abandono del tratamiento y uso de AINE.",
    pathologies: [
      { name: "Hipertensión severa sin daño agudo de órgano blanco", role: "principal", why: "TA ≥ 180/110 sin compromiso agudo." },
      { name: "Hipertensión arterial esencial con daño crónico", role: "asociada", why: "Hipertrofia ventricular y retinopatía hipertensiva leve." },
      { name: "Emergencia hipertensiva", role: "diferencial", why: "Lo que define la conducta: buscar daño agudo de órgano." },
      { name: "Hemorragia subaracnoidea y ACV", role: "diferencial", why: "Cefalea con hipertensión." },
      { name: "Disección aórtica", role: "diferencial", why: "Dolor torácico con diferencia entre brazos." },
    ],
    reasoning: [
      "Causa: hipertensa crónica que suspende el tratamiento y suma AINE, que retienen sodio y bloquean prostaglandinas vasodilatadoras.",
      "Mecanismo: en el hipertenso crónico la curva de autorregulación del flujo cerebral está desplazada hacia la derecha: tolera presiones altas, pero hace isquemia con presiones que en otra persona serían normales.",
      "Consecuencia: sin daño agudo, el riesgo inmediato es bajo; el peligro está en bajarla bruscamente (hipoperfusión cerebral, coronaria o renal).",
      "Por eso lo que define la urgencia no es el número sino la presencia de daño agudo de órgano blanco.",
    ],
    epidemiology:
      "La hipertensión afecta a cerca del 40 % de los adultos argentinos según la Encuesta Nacional de Factores de Riesgo, y alrededor de un tercio no lo sabe. La hipertensión severa sin daño agudo es uno de los motivos más frecuentes de consulta en guardia y suele deberse a falta de adherencia. La prevalencia aumenta con la edad; después de la menopausia las mujeres alcanzan y superan a los varones.",
    management: [
      "Confirmar con tomas repetidas tras el reposo, en ambos brazos.",
      "Buscar daño agudo de órgano blanco con anamnesis, examen (neurológico, fondo de ojo, cardiopulmonar), ECG y laboratorio básico.",
      "Sin daño agudo: reposo, reinicio o ajuste del tratamiento oral, descenso gradual en 24–48 h y control ambulatorio cercano.",
      "Con daño agudo (emergencia): internación en unidad cerrada y fármacos endovenosos con metas según el órgano afectado.",
      "Nunca nifedipina sublingual; revisar adherencia, fármacos que suben la presión y acceso a la medicación.",
    ],
    sources: [
      "Sociedad Argentina de Cardiología — Consenso argentino de hipertensión arterial.",
      "Sociedad Argentina de Hipertensión Arterial — Guía de manejo de las crisis hipertensivas.",
      "4.ª Encuesta Nacional de Factores de Riesgo (INDEC – Ministerio de Salud).",
    ],
    pearls: [
      "El número no hace la emergencia: el daño agudo de órgano blanco sí.",
      "Nifedipina sublingual: nunca.",
      "Lo que más ayuda a esta paciente es una receta y un turno.",
    ],
    pitfalls: ["Bajar bruscamente la presión de un paciente asintomático.", "No buscar daño de órgano blanco.", "Dar el alta sin asegurar la medicación."],
  },
};
