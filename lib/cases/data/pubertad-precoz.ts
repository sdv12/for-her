import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pubertadPrecoz: ClinicalCase = {
  id: "pubertad-precoz-central",
  level: 3,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 6, ageUnit: "años", sex: "F", context: "Sana. La mamá tuvo la menarca a los 11." },
  frequency: "poco-frecuente",
  intro: "“Le crecieron las mamas hace seis meses, ahora tiene vello y creció mucho este año.”",
  vitals: { FC: "90 lpm", "T°": "36,5 °C", Peso: "27 kg" },
  anamnesis: [
    act("inicio", "¿Qué apareció primero y cuándo?", "clave", "“Las mamas a los cinco y medio.”", "Telarca precoz."),
    act("crecimiento", "¿Cómo creció?", "clave", "“Diez centímetros en un año.”", "Aceleración del crecimiento."),
    act("neuro", "¿Dolor de cabeza, vómitos, problemas de visión?", "clave", "“No.”", "Tumor del SNC."),
    act("exposicion", "¿Cremas con estrógenos o hormonas en la casa?", "util", "“No.”", "Exógena."),
    act("sangrado", "¿Sangrado vaginal?", "util", "“No.”", "Progresión."),
    act("escuela", "¿Qué grado?", "neutro", "“Primero.”", "No orienta."),
  ],
  exam: [
    act("tanner", "Tanner y talla", "clave", "Mamas Tanner 3, vello pubiano 2; talla en percentil 97 (antes 50).", "Pubertad progresiva."),
    act("piel", "Piel", "clave", "Sin manchas café con leche.", "Excluye McCune-Albright."),
    act("neuro-ex", "Fondo de ojo y campo visual", "util", "Normales.", "Sin hipertensión endocraneana."),
  ],
  studies: [
    study("Imágenes", "edad-osea", "Radiografía de mano (edad ósea)", "clave", "Edad ósea de 9 años.", "Adelantada."),
    study("Laboratorio", "lh", "LH basal y tras estímulo con GnRH, estradiol", "clave", "LH estimulada de 12 UI/l.", "Pubertad central."),
    study("Imágenes", "rm", "RM de cerebro", "clave", "Normal.", "Idiopática."),
    study("Otros", "esperar", "Esperar un año para ver evolución", "riesgoso", "No se hizo.", "Pierde talla final."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ppc", "Pubertad precoz central idiopática", true, "Niña de 6 años con telarca progresiva, aceleración del crecimiento, edad ósea adelantada, LH estimulada alta y RM normal."),
      dx("telarca-aislada", "Telarca prematura aislada", false, "Hay vello, estirón y edad ósea adelantada."),
      dx("periferica", "Pubertad precoz periférica", false, "LH estimulada alta."),
      dx("mccune", "McCune-Albright", false, "Sin manchas café con leche."),
      dx("tumor", "Tumor hipotalámico", false, "RM normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("analogos", "Análogos de GnRH (triptorelina o leuprolide) trimestrales", "clave", "Frenan la pubertad."),
      mg("seguimiento", "Control de talla, Tanner y edad ósea", "clave", "Respuesta."),
      mg("psico", "Apoyo emocional a la niña y la familia", "clave", "Impacto."),
      mg("endo", "Seguimiento con endocrinología infantil", "util", "Manejo especializado."),
      mg("estrogenos", "Anticonceptivos para frenar", "riesgoso", "No corresponde."),
      mg("nada", "Explicar que es normal", "riesgoso", "Talla final y psicológico."),
    ],
  },
  debrief: {
    diagnosis: "Pubertad precoz central idiopática, en niña de 6 años.",
    pathologies: [
      { name: "Pubertad precoz central", role: "principal", why: "Activación temprana del eje hipotálamo-hipófiso-gonadal." },
      { name: "Edad ósea adelantada", role: "asociada", why: "Riesgo de talla final baja." },
      { name: "Telarca aislada, periférica", role: "diferencial", why: "Otras formas." },
    ],
    reasoning: [
      "Causa: en niñas, casi siempre idiopática.",
      "Mecanismo: pulsos de GnRH que activan el eje antes de tiempo.",
      "Consecuencia: desarrollo sexual temprano, cierre epifisario precoz y talla final menor.",
    ],
    epidemiology:
      "Se define como inicio antes de los 8 años en niñas y 9 en varones. Es mucho más frecuente en niñas y suele ser idiopática; en varones más a menudo hay lesión del SNC. La RM se pide siempre.",
    management: [
      "Tanner y velocidad de crecimiento.",
      "Edad ósea y LH.",
      "RM.",
      "Análogos.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Pubertad precoz.", "Consenso internacional sobre uso de análogos de GnRH en pediatría."],
    pearls: ["Antes de 8 en niñas.", "Estirón más edad ósea.", "RM siempre."],
    pitfalls: ["Esperar.", "Confundir con telarca aislada."],
    tribunal: [
      qa("¿Qué es la telarca prematura aislada?", "Desarrollo mamario aislado sin estirón ni edad ósea adelantada, benigno."),
      qa("¿Qué es la pubertad precoz periférica?", "Por esteroides sexuales independientes de GnRH, con LH suprimida."),
      qa("¿Qué evalúa la edad ósea?", "La maduración esquelética, que predice el crecimiento restante."),
    ],
  },
};
