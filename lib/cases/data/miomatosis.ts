import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const miomatosis: ClinicalCase = {
  id: "miomatosis-uterina",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 43, ageUnit: "años", sex: "F", context: "Dos hijos. Sin deseo de más embarazos. Hipertensa controlada." },
  frequency: "muy-frecuente",
  intro: "“Cada menstruación es peor: uso doble toallita, me duran ocho días y estoy agotada. Además siento peso abajo y orino seguido.”",
  vitals: { TA: "126/78 mmHg", FC: "98 lpm", "T°": "36,5 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("patron", "¿Sangrás solo con la menstruación o también entre ciclos o después de las relaciones?", "clave", "“Solo con la menstruación, pero muy abundante.”", "Sangrado uterino abundante cíclico; el sangrado intermenstrual o poscoital obliga a descartar otras causas."),
    act("compresion", "¿Sentís peso, orinás más, tenés constipación?", "clave", "“Sí, voy mucho al baño.”", "Síntomas de compresión por masa uterina."),
    act("anemia", "¿Te cansás, te falta el aire, comés hielo?", "clave", "“Me agito al subir la escalera.”", "Anemia por pérdida crónica."),
    act("embarazo", "¿Podrías estar embarazada?", "util", "“Tengo ligadura.”", "Hay que descartarlo igual en caso de duda."),
    act("pap", "¿Cuándo fue tu último PAP?", "util", "“Hace dos años, normal.”", "Prevención y diagnóstico diferencial."),
    act("barrio", "¿En qué barrio vivís?", "neutro", "“En Alta Córdoba.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal y tacto bimanual", "clave", "Útero aumentado de tamaño, irregular, móvil, de 14 semanas, no doloroso.", "Sugiere miomas."),
    act("palidez", "Mucosas", "util", "Palidez marcada.", "Anemia clínica."),
    act("especuloscopia", "Especuloscopía", "util", "Cuello sano, sin lesiones, sangrado por orificio.", "El sangrado viene del útero."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Múltiples miomas; uno submucoso de 3 cm y uno intramural de 6 cm.", "Confirma y clasifica. Los submucosos son los que más sangran."),
    study("Laboratorio", "hemograma", "Hemograma y ferritina", "clave", "Hb 8,4 g/dl, VCM 70, ferritina 6.", "Anemia ferropénica por sangrado."),
    study("Laboratorio", "hcg", "Beta-hCG y coagulograma", "util", "Negativa; coagulación normal.", "Descarta otras causas."),
    study("Otros", "biopsia", "Biopsia de endometrio, si hay factores de riesgo o sangrado atípico", "util", "Endometrio proliferativo.", "Se considera en mayores de 40-45 años con sangrado anormal."),
    study("Laboratorio", "ca125", "CA-125 de rutina", "innecesario", "Levemente elevado.", "No sirve para miomas y genera confusión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("miomas", "Miomatosis uterina sintomática con anemia ferropénica", true, "Sangrado cíclico abundante, síntomas compresivos, útero irregular aumentado y miomas en la ecografía."),
      dx("adenomiosis", "Adenomiosis", false, "Da útero globular difuso y dismenorrea; la ecografía muestra miomas definidos."),
      dx("endometrio", "Cáncer de endometrio", false, "Es más frecuente en la posmenopausia; la biopsia es benigna."),
      dx("embarazo", "Embarazo", false, "Beta-hCG negativa."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "Puede dar sangrado, pero no explica la masa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hierro", "Hierro oral o EV y estabilizar", "clave", "Corrige la anemia, también de cara a la cirugía."),
      mg("antifibrinoliticos", "Ácido tranexámico en las menstruaciones, o DIU de levonorgestrel si la cavidad lo permite", "clave", "Reducen el sangrado."),
      mg("cirugia", "Derivar a ginecología: histerectomía o miomectomía según deseo y síntomas", "clave", "Sin deseo de embarazo y muy sintomática, la histerectomía es definitiva."),
      mg("transfusion", "Transfundir de rutina", "innecesario", "Solo con inestabilidad o Hb muy baja con síntomas graves."),
      mg("observar", "Solo control anual, sin tratamiento", "riesgoso", "Está sintomática y con anemia significativa."),
      mg("estrogenos", "Terapia hormonal con estrógenos solos", "riesgoso", "Los miomas son hormonodependientes y puede estimular el endometrio."),
    ],
  },
  debrief: {
    diagnosis: "Miomatosis uterina con mioma submucoso, sangrado uterino abundante y anemia ferropénica, en mujer de 43 años.",
    pathologies: [
      { name: "Miomatosis uterina", role: "principal", why: "Tumores benignos del miometrio." },
      { name: "Anemia ferropénica", role: "asociada", why: "Por sangrado menstrual crónico." },
      { name: "Adenomiosis, cáncer de endometrio, coagulopatía", role: "diferencial", why: "Otras causas de sangrado." },
    ],
    reasoning: [
      "Causa: proliferación de músculo liso uterino dependiente de estrógenos y progesterona.",
      "Mecanismo: los miomas submucosos aumentan la superficie endometrial y alteran la contracción; los grandes comprimen órganos vecinos.",
      "Consecuencia: sangrado abundante, anemia, peso pelviano, polaquiuria y a veces infertilidad.",
    ],
    epidemiology:
      "Los miomas son los tumores pelvianos más frecuentes en mujeres: hasta el 70 % los tiene antes de los 50 años, aunque muchas sin síntomas. Son una causa importante de anemia e histerectomía. Regresan tras la menopausia.",
    management: [
      "Descartar embarazo y otras causas de sangrado.",
      "Hemograma y hierro.",
      "Tratamiento médico del sangrado.",
      "Cirugía según síntomas, edad y deseo reproductivo.",
    ],
    sources: ["Federación Argentina de Sociedades de Ginecología y Obstetricia — Recomendaciones de sangrado uterino anormal.", "FIGO — Clasificación PALM-COEIN."],
    pearls: ["Mioma submucoso: el que más sangra.", "Sangrado anormal en mayores de 45 años: pensá en biopsiar.", "Después de la menopausia no deberían crecer: si crecen, sospechá."],
    pitfalls: ["No buscar la anemia.", "Pedir CA-125 de rutina."],
    tribunal: [
      qa("¿Qué es la clasificación PALM-COEIN?", "Ordena las causas de sangrado uterino anormal: estructurales (pólipo, adenomiosis, leiomioma, malignidad) y no estructurales (coagulopatía, ovulatorias, endometriales, iatrogénicas y no clasificadas)."),
      qa("¿Qué es la degeneración roja del mioma?", "Una necrosis hemorrágica aguda, más frecuente en el embarazo, con dolor intenso y fiebre baja; se maneja con analgesia."),
      qa("¿Qué es el leiomiosarcoma?", "Un tumor maligno raro del miometrio; se sospecha ante crecimiento rápido, sobre todo en la posmenopausia, y no deriva habitualmente de un mioma común."),
    ],
  },
};
