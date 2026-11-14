import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pericarditisUremica: ClinicalCase = {
  id: "pericarditis-uremica",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 56, ageUnit: "años", sex: "M", context: "Enfermedad renal crónica estadio 5 por nefropatía diabética. Todavía no empezó diálisis porque no tiene acceso." },
  frequency: "poco-frecuente",
  intro: "“Me duele el pecho, peor acostado y mejor sentado para adelante, y estoy con muchas náuseas.”",
  vitals: { TA: "104/76 mmHg", FC: "110 lpm", FR: "22 rpm", "T°": "37,4 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor?", "clave", "“Punzante, mejora inclinado hacia adelante.”", "Pericárdico."),
    act("renal", "¿Cómo está su riñón?", "clave", "“Muy mal, me dijeron que necesito diálisis.”", "Uremia."),
    act("uremia", "¿Náuseas, picazón, falta de apetito?", "clave", "“Todo eso hace semanas.”", "Síndrome urémico."),
    act("disnea", "¿Falta de aire?", "util", "“Me agito.”", "Taponamiento."),
    act("infeccion", "¿Estuvo resfriado?", "util", "“No.”", "Viral."),
    act("trabajo", "¿Trabajaba?", "neutro", "“Era plomero.”", "No orienta."),
  ],
  exam: [
    act("frote", "Auscultación", "clave", "Frote pericárdico.", "Pericarditis."),
    act("taponamiento", "Signos de taponamiento", "clave", "Ingurgitación yugular y pulso paradójico de 14 mmHg.", "Derrame con compromiso."),
    act("aliento", "Aliento y piel", "util", "Aliento urémico, piel con escoriaciones.", "Uremia."),
  ],
  studies: [
    study("Laboratorio", "renal", "Urea, creatinina, potasio, gases", "clave", "Urea 310; creatinina 9,2; K 5,8.", "Uremia grave."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Derrame pericárdico moderado con colapso diastólico de la aurícula derecha.", "Compromiso hemodinámico inicial."),
    study("Electrofisiología", "ecg", "ECG", "util", "Bajo voltaje, sin supradesnivel difuso.", "Típico de urémica."),
    study("Otros", "aines-altos", "AINE en dosis altas como en la pericarditis viral", "riesgoso", "No se indicó.", "Nefrotóxicos y sangrado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("uremica", "Pericarditis urémica con derrame y riesgo de taponamiento", true, "ERC sin diálisis, uremia grave, frote, derrame con colapso auricular y ECG sin supradesnivel típico."),
      dx("viral", "Pericarditis viral", false, "Uremia grave sin cuadro viral."),
      dx("iam", "IAM", false, "Dolor pleurítico postural con frote."),
      dx("tbc", "Pericarditis tuberculosa", false, "Contexto urémico claro."),
      dx("ic", "Insuficiencia cardíaca", false, "Derrame pericárdico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dialisis", "Hemodiálisis urgente (sin heparina o con heparina mínima)", "clave", "Trata la causa."),
      mg("pericardiocentesis", "Pericardiocentesis si progresa el taponamiento", "clave", "Riesgo vital."),
      mg("monitoreo", "Monitoreo en unidad cerrada", "clave", "Inestabilidad."),
      mg("acceso", "Planificar acceso vascular definitivo", "util", "Diálisis crónica."),
      mg("anticoagular", "Heparina plena en la diálisis", "riesgoso", "Hemopericardio."),
      mg("diureticos", "Furosemida para bajar el derrame", "riesgoso", "Reduce la precarga en taponamiento."),
    ],
  },
  debrief: {
    diagnosis: "Pericarditis urémica con derrame y colapso auricular, en varón de 56 años con ERC estadio 5 sin diálisis.",
    pathologies: [
      { name: "Pericarditis urémica", role: "principal", why: "Inflamación pericárdica por toxinas urémicas." },
      { name: "Uremia y riesgo de taponamiento", role: "asociada", why: "Gravedad." },
      { name: "Viral, IAM", role: "diferencial", why: "Otras causas de dolor torácico." },
    ],
    reasoning: [
      "Causa: retención de toxinas urémicas.",
      "Mecanismo: inflamación fibrinosa y hemorrágica del pericardio.",
      "Consecuencia: derrame que puede llevar a taponamiento.",
    ],
    epidemiology:
      "Es indicación urgente de diálisis. Aparece en pacientes con ERC avanzada sin diálisis o con diálisis insuficiente. El ECG suele no mostrar el supradesnivel difuso típico.",
    management: [
      "Eco.",
      "Diálisis.",
      "Pericardiocentesis si hace falta.",
      "Acceso definitivo.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Indicaciones de diálisis.", "ESC — Pericardial Diseases Guidelines."],
    pearls: ["ERC con frote: diálisis.", "ECG engañoso.", "Sin heparina."],
    pitfalls: ["AINE.", "Diuréticos."],
    tribunal: [
      qa("¿Cuáles son las indicaciones urgentes de diálisis?", "Hiperpotasemia refractaria, acidosis grave, sobrecarga refractaria, pericarditis y encefalopatía urémicas, e intoxicaciones dializables."),
      qa("¿Qué es el pulso paradójico?", "Caída de más de 10 mmHg de la TA sistólica en la inspiración."),
      qa("¿Qué es la tríada de Beck?", "Hipotensión, ingurgitación yugular y ruidos cardíacos apagados."),
    ],
  },
};
