import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipertensionIntracranealIdiopatica: ClinicalCase = {
  id: "hipertension-intracraneal-idiopatica",
  level: 3,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Obesidad (IMC 38), subió 10 kg este año. Toma doxiciclina por acné." },
  frequency: "poco-frecuente",
  intro: "“Me duele la cabeza todos los días, peor a la mañana. A veces veo negro unos segundos y escucho un zumbido como el pulso.”",
  vitals: { TA: "122/78 mmHg", FC: "78 lpm", "T°": "36,5 °C", Peso: "98 kg" },
  anamnesis: [
    act("cefalea", "¿Cómo es la cefalea?", "clave", "“Diaria, peor al acostarme.”", "Hipertensión intracraneal."),
    act("vision", "¿Oscurecimientos o visión doble?", "clave", "“Oscurecimientos breves y veo doble.”", "Papiledema y sexto par."),
    act("farmacos", "¿Tetraciclinas, vitamina A, anticonceptivos?", "clave", "“Doxiciclina.”", "Causa."),
    act("zumbido", "¿Zumbido pulsátil?", "util", "“Sí.”", "Típico."),
    act("trombosis", "¿Trombosis, puerperio?", "util", "“No.”", "Trombosis venosa cerebral."),
    act("musica", "¿Qué música escuchás?", "neutro", "“Pop.”", "No orienta."),
  ],
  exam: [
    act("fondo", "Fondo de ojo", "clave", "Papiledema bilateral.", "Clave."),
    act("pares", "Movimientos oculares", "clave", "Paresia del sexto par derecho.", "Signo falsamente localizador."),
    act("neuro", "Resto del examen", "util", "Normal, conciencia normal.", "Sin otras causas."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM con venografía", "clave", "Silla vacía, aplanamiento posterior del globo; sin masa ni trombosis.", "Excluye causas."),
    study("Otros", "puncion", "Punción lumbar con presión de apertura", "clave", "Presión de 36 cm H₂O; LCR normal.", "Confirma."),
    study("Otros", "campimetria", "Campo visual y OCT", "clave", "Agrandamiento de mancha ciega.", "Riesgo visual."),
    study("Otros", "puncion-antes", "Punción lumbar antes de la imagen", "riesgoso", "No se realizó.", "Hay que excluir masa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hii", "Hipertensión intracraneal idiopática asociada a obesidad y tetraciclinas", true, "Mujer joven obesa, papiledema, sexto par, imagen normal y presión alta con LCR normal."),
      dx("tumor", "Tumor cerebral", false, "RM normal."),
      dx("tvc", "Trombosis venosa cerebral", false, "Venografía normal."),
      dx("migrana", "Migraña", false, "Hay papiledema."),
      dx("meningitis", "Meningitis crónica", false, "LCR normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("acetazolamida", "Acetazolamida", "clave", "Reduce producción de LCR."),
      mg("peso", "Descenso de peso", "clave", "Tratamiento de fondo."),
      mg("suspender", "Suspender doxiciclina", "clave", "Causa."),
      mg("vision", "Controles oftalmológicos y cirugía si hay pérdida visual", "clave", "Riesgo de ceguera."),
      mg("triptanes", "Solo analgésicos y triptanes", "riesgoso", "Riesgo visual."),
      mg("corticoides-cronicos", "Corticoides crónicos", "riesgoso", "Aumentan peso."),
    ],
  },
  debrief: {
    diagnosis: "Hipertensión intracraneal idiopática con papiledema y paresia del VI par, asociada a obesidad y doxiciclina, en mujer de 27 años.",
    pathologies: [
      { name: "Hipertensión intracraneal idiopática", role: "principal", why: "Presión alta sin masa." },
      { name: "Riesgo de pérdida visual", role: "asociada", why: "Complicación principal." },
      { name: "Tumor, trombosis venosa", role: "diferencial", why: "Causas a excluir." },
    ],
    reasoning: [
      "Causa: obesidad y fármacos.",
      "Mecanismo: alteración del drenaje de LCR.",
      "Consecuencia: papiledema y riesgo de ceguera.",
    ],
    epidemiology:
      "Afecta sobre todo a mujeres jóvenes con obesidad, y su frecuencia crece con la obesidad. Las tetraciclinas, la vitamina A y los retinoides son desencadenantes. La pérdida visual es la complicación más temida.",
    management: [
      "Fondo de ojo.",
      "RM con venografía.",
      "Punción.",
      "Acetazolamida y peso.",
    ],
    sources: ["Sociedad Neurológica Argentina — Hipertensión intracraneal idiopática.", "Idiopathic Intracranial Hypertension Consensus Guidelines (UK)."],
    pearls: ["Mujer joven obesa con papiledema.", "Imagen antes de punción.", "Vigilar la visión."],
    pitfalls: ["Tratarla como migraña.", "No mirar el fondo."],
    tribunal: [
      qa("¿Por qué el sexto par es falsamente localizador?", "Tiene un trayecto largo y se comprime con cualquier aumento de presión."),
      qa("¿Cuáles son los criterios de Dandy modificados?", "Signos de hipertensión, sin otros déficits salvo VI par, LCR normal con presión alta e imágenes sin causa."),
      qa("¿Qué efecto adverso da la acetazolamida?", "Parestesias, cálculos renales, acidosis metabólica y alteración del gusto."),
    ],
  },
};
