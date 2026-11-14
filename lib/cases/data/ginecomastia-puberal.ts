import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ginecomastiaPuberal: ClinicalCase = {
  id: "ginecomastia-puberal",
  level: 1,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 14, ageUnit: "años", sex: "M", context: "Lo trae la mamá. No quiere ir a natación por vergüenza." },
  frequency: "muy-frecuente",
  intro: "“Me creció un bultito debajo del pezón izquierdo, me duele un poco y los chicos me cargan.”",
  vitals: { TA: "112/70 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "52 kg" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo?", "clave", "“Hace cuatro meses.”", "Ginecomastia puberal típica."),
    act("farmacos", "¿Tomás algo: anabólicos, suplementos, marihuana, cremas?", "clave", "“Nada.”", "Causas secundarias."),
    act("pubertad", "¿Cómo viene tu desarrollo (vello, voz, estirón)?", "clave", "“Empecé el año pasado.”", "Pubertad media."),
    act("testiculo", "¿Notaste algún bulto en los testículos?", "util", "“No.”", "Tumor productor de estrógenos o hCG."),
    act("animo", "¿Cómo te sentís con esto?", "util", "“Mal, no quiero ir a la pileta.”", "Impacto psicológico."),
    act("deporte", "¿Qué deporte hacés?", "neutro", "“Natación.”", "No orienta."),
  ],
  exam: [
    act("mama", "Palpación mamaria", "clave", "Disco de tejido glandular firme de 2,5 cm retroareolar izquierdo, levemente doloroso.", "Ginecomastia verdadera."),
    act("tanner", "Tanner y testículos", "clave", "Tanner 3, testículos de 10 ml simétricos sin masas.", "Puberal normal."),
    act("imc", "IMC y signos endocrinos", "util", "IMC normal, sin hipertiroidismo.", "Excluye otras causas."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Suficiente.", "Cuadro típico."),
    study("Laboratorio", "hormonas", "Estudio hormonal (hCG, estradiol, testosterona, LH)", "innecesario", "No se realizó.", "Solo si es atípica."),
    study("Imágenes", "mamografia", "Mamografía", "innecesario", "No se realizó.", "No corresponde en adolescentes."),
    study("Otros", "cirugia", "Cirugía inmediata", "riesgoso", "No se indicó.", "Suele resolverse en 1 a 2 años."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ginecomastia", "Ginecomastia puberal fisiológica", true, "Disco glandular retroareolar en adolescente Tanner 3, sin fármacos ni masas testiculares."),
      dx("lipomastia", "Pseudoginecomastia por grasa", false, "Hay disco glandular y IMC normal."),
      dx("tumor-testicular", "Tumor testicular", false, "Testículos normales."),
      dx("cancer-mama", "Cáncer de mama", false, "Muy raro y es un disco central blando."),
      dx("klinefelter", "Síndrome de Klinefelter", false, "Testículos de tamaño normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tranquilizar", "Explicar que es frecuente y se resuelve sola", "clave", "La mayoría remite."),
      mg("control", "Control en 6 meses", "clave", "Seguimiento."),
      mg("bullying", "Hablar sobre las cargadas y ofrecer apoyo", "clave", "Impacto psicológico."),
      mg("evitar", "Evitar anabólicos y marihuana", "util", "Pueden empeorarla."),
      mg("hormonas", "Tratamiento hormonal de rutina", "riesgoso", "Sin indicación."),
      mg("estudios", "Batería de estudios hormonales e imágenes", "riesgoso", "Innecesario y ansiógeno."),
    ],
  },
  debrief: {
    diagnosis: "Ginecomastia puberal fisiológica unilateral, en adolescente de 14 años.",
    pathologies: [
      { name: "Ginecomastia puberal", role: "principal", why: "Desequilibrio transitorio estrógenos-andrógenos." },
      { name: "Impacto psicosocial", role: "asociada", why: "Vergüenza y cargadas." },
      { name: "Pseudoginecomastia, tumor testicular", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: aumento relativo de estrógenos al inicio de la pubertad.",
      "Mecanismo: estimulación del tejido glandular mamario.",
      "Consecuencia: disco retroareolar, a veces doloroso, que suele remitir.",
    ],
    epidemiology:
      "Aparece en más de la mitad de los varones en la pubertad media. Remite en 1 a 2 años en casi todos. Se estudia si es mayor de 4 cm, aparece antes o después de la pubertad o hay signos de otra enfermedad.",
    management: [
      "Clínica.",
      "Examen testicular.",
      "Tranquilizar.",
      "Seguir.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Ginecomastia en la adolescencia.", "Endocrine Society — Gynecomastia Clinical Review."],
    pearls: ["Pubertad media: frecuente.", "Palpá testículos.", "Abordá lo emocional."],
    pitfalls: ["Estudiar de más.", "No mirar los testículos."],
    tribunal: [
      qa("¿Qué fármacos causan ginecomastia?", "Espironolactona, anabólicos, ketoconazol, antiandrógenos, digoxina y marihuana."),
      qa("¿Cuándo se estudia?", "Si es grande, rápida, fuera de la pubertad, con masa testicular o signos sistémicos."),
      qa("¿Cuándo se opera?", "Si persiste más de 2 años o causa malestar psicológico importante."),
    ],
  },
};
