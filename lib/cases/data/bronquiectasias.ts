import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bronquiectasias: ClinicalCase = {
  id: "bronquiectasias-post-tuberculosis",
  level: 2,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Tuberculosis tratada a los 20 años. Nunca fumó. Varios antibióticos por año." },
  frequency: "frecuente",
  intro: "“Toso todos los días con mucho catarro amarillo, sobre todo a la mañana. Cada tanto escupo un poco de sangre.”",
  vitals: { TA: "116/72 mmHg", FC: "84 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("esputo", "¿Cuánto catarro? ¿Desde cuándo?", "clave", "“Medio vaso por día, desde hace años.”", "Broncorrea crónica."),
    act("tbc", "¿Tuviste TBC o neumonías graves?", "clave", "“TBC, me trataron.”", "Causa posinfecciosa."),
    act("hemoptisis", "¿Cuánta sangre?", "clave", "“Hilos.”", "Leve; grave sería masiva."),
    act("infecciones", "¿Cuántas exacerbaciones al año?", "util", "“Cuatro o cinco.”", "Gravedad."),
    act("sinusitis", "¿Sinusitis o infertilidad?", "util", "“No.”", "Discinesia ciliar."),
    act("ocio", "¿Tenés mascotas?", "neutro", "“Un gato.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Crepitantes gruesos en el lóbulo superior derecho y algunos roncus.", "Secreciones."),
    act("dedos", "Dedos", "clave", "Hipocratismo leve.", "Supuración crónica."),
    act("nutricion", "Peso", "util", "Delgada.", "Enfermedad crónica."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de alta resolución", "clave", "Bronquiectasias quísticas en lóbulo superior derecho; bronquio más ancho que la arteria.", "Confirma."),
    study("Microbiología", "esputo", "Cultivo de esputo y búsqueda de micobacterias", "clave", "Pseudomonas aeruginosa; BAAR negativo.", "Define el tratamiento."),
    study("Otros", "espiro", "Espirometría", "util", "Obstrucción leve.", "Función."),
    study("Laboratorio", "inmuno", "Inmunoglobulinas y Aspergillus", "util", "Normales.", "Otras causas."),
    study("Otros", "broncoscopia", "Broncoscopía de rutina", "innecesario", "No se realizó.", "Solo si hay hemoptisis importante o sospecha de obstrucción."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bronquiectasias", "Bronquiectasias postuberculosas colonizadas por Pseudomonas", true, "Tos productiva crónica, TBC previa, TC típica y cultivo."),
      dx("tbc", "Reactivación de tuberculosis", false, "BAAR negativo y años de evolución estable."),
      dx("epoc", "EPOC", false, "No fuma; la TC muestra bronquiectasias."),
      dx("cancer", "Cáncer de pulmón", false, "Sin masa."),
      dx("fq", "Fibrosis quística", false, "Edad y antecedente explican."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("kinesio", "Kinesioterapia respiratoria diaria", "clave", "Despeja secreciones."),
      mg("erradicar", "Erradicar Pseudomonas y antibióticos según cultivo en exacerbaciones", "clave", "Reduce daño."),
      mg("prevencion", "Vacunas y rehabilitación", "clave", "Previene infecciones."),
      mg("macrolido", "Macrólido prolongado si hay 3 o más exacerbaciones por año", "util", "Reduce episodios."),
      mg("antitusivo", "Antitusivos potentes", "riesgoso", "Retienen secreciones."),
      mg("atb-ciegos", "Amoxicilina repetida sin cultivo", "riesgoso", "No cubre Pseudomonas."),
    ],
  },
  debrief: {
    diagnosis: "Bronquiectasias postuberculosas con colonización por Pseudomonas aeruginosa, en mujer de 45 años.",
    pathologies: [
      { name: "Bronquiectasias", role: "principal", why: "Dilatación irreversible de bronquios." },
      { name: "Colonización por Pseudomonas", role: "asociada", why: "Peor pronóstico." },
      { name: "TBC, EPOC, cáncer", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: daño por una infección previa grave.",
      "Mecanismo: ciclo vicioso de infección, inflamación y destrucción de la pared.",
      "Consecuencia: broncorrea, exacerbaciones y hemoptisis.",
    ],
    epidemiology:
      "En Argentina, las secuelas de tuberculosis y neumonías de la infancia son causas frecuentes. También se asocian a fibrosis quística, inmunodeficiencias y discinesia ciliar. La colonización por Pseudomonas aumenta exacerbaciones y mortalidad.",
    management: [
      "TC.",
      "Cultivos.",
      "Kinesio y antibióticos.",
      "Prevención.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Bronquiectasias.", "European Respiratory Society — Bronchiectasis Guideline."],
    pearls: ["Tos productiva crónica: pensá bronquiectasias.", "Signo del anillo de sello.", "Cultivo siempre."],
    pitfalls: ["Antitusivos.", "Antibióticos sin cultivo."],
    tribunal: [
      qa("¿Qué es el signo del anillo de sello?", "Bronquio dilatado más ancho que la arteria que lo acompaña."),
      qa("¿Qué causas de bronquiectasias conocés?", "Posinfecciosas, fibrosis quística, inmunodeficiencias, discinesia ciliar, aspergilosis alérgica y obstrucción."),
      qa("¿Qué se hace en hemoptisis masiva?", "Asegurar la vía aérea, acostar del lado sangrante y embolizar la arteria bronquial."),
    ],
  },
};
