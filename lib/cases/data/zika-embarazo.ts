import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const zikaEmbarazo: ClinicalCase = {
  id: "zika-embarazo",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 25, ageUnit: "años", sex: "F", context: "Embarazo de 11 semanas. Volvió hace 5 días de visitar a su familia en Salvador de Bahía, donde hay casos de zika." },
  frequency: "raro",
  intro: "“Me salió un sarpullido que pica, tengo los ojos rojos y me duelen las articulaciones. Estoy embarazada y tengo miedo.”",
  vitals: { TA: "112/70 mmHg", FC: "84 lpm", "T°": "37,6 °C" },
  anamnesis: [
    act("viaje", "¿Dónde viajó y cuándo volvió?", "clave", "“A Bahía, volví hace 5 días.”", "Zona con transmisión."),
    act("sintomas", "¿Qué síntomas tiene?", "clave", "“Granitos que pican, ojos rojos, dolor de muñecas.”", "Cuadro típico de zika."),
    act("pareja", "¿Su pareja viajó también?", "clave", "“Sí, y tuvimos relaciones sin preservativo.”", "Transmisión sexual."),
    act("alarma", "¿Dolor abdominal, sangrados, vómitos?", "util", "“No.”", "Signos de alarma de dengue."),
    act("debilidad", "¿Debilidad en las piernas u hormigueos?", "util", "“No.”", "Síndrome de Guillain-Barré, días a semanas después de la infección."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy maestra de música.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Exantema maculopapular pruriginoso en tronco y brazos.", "Arbovirosis."),
    act("ojos", "Ojos", "clave", "Conjuntivitis no purulenta.", "Típico de zika."),
    act("articulaciones", "Articulaciones", "util", "Edema leve de muñecas.", "Artritis leve."),
  ],
  studies: [
    study("Laboratorio", "pcr", "RT-PCR para zika, dengue y chikungunya en sangre y orina", "clave", "Zika positivo en sangre y orina.", "Confirma."),
    study("Laboratorio", "hemograma", "Hemograma y plaquetas", "util", "Normales.", "Diferencial con dengue."),
    study("Imágenes", "eco-seriada", "Ecografías seriadas fetales con perímetro cefálico", "clave", "Normal por ahora.", "Vigilar microcefalia."),
    study("Otros", "aborto-indicado", "Indicar interrupción solo por el diagnóstico", "riesgoso", "No se hizo.", "La decisión requiere información y consejería según la ley."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("zika", "Infección por virus zika en el primer trimestre del embarazo", true, "Viaje a zona con transmisión, exantema pruriginoso, conjuntivitis, artralgias y PCR positiva."),
      dx("dengue", "Dengue", false, "PCR para dengue negativa y plaquetas normales."),
      dx("rubeola", "Rubéola", false, "PCR de zika positiva."),
      dx("alergia", "Reacción alérgica", false, "Fiebre, conjuntivitis y PCR positiva."),
      dx("sarampion", "Sarampión", false, "Sin Koplik y PCR de zika positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("seguimiento", "Control de alto riesgo con ecografías seriadas", "clave", "Detectar síndrome congénito."),
      mg("paracetamol", "Paracetamol y repelente", "clave", "Síntomas y evitar transmisión local."),
      mg("pareja", "Preservativo con la pareja durante todo el embarazo", "clave", "Transmisión sexual."),
      mg("consejeria", "Consejería sobre riesgos y opciones según la normativa vigente", "util", "Decisión informada."),
      mg("aines", "Ibuprofeno para el dolor", "riesgoso", "Hasta descartar dengue y en el embarazo."),
      mg("alta-sin-control", "Tranquilizarla y control habitual", "riesgoso", "Riesgo fetal en el primer trimestre."),
    ],
  },
  debrief: {
    diagnosis: "Infección por virus zika adquirida en Brasil, en embarazada de 11 semanas.",
    pathologies: [
      { name: "Infección por zika", role: "principal", why: "Arbovirosis teratogénica." },
      { name: "Riesgo de síndrome congénito", role: "asociada", why: "Primer trimestre." },
      { name: "Dengue, rubéola", role: "diferencial", why: "Otros exantemas febriles." },
    ],
    reasoning: [
      "Causa: virus zika por Aedes o transmisión sexual.",
      "Mecanismo: el virus atraviesa la placenta y afecta células progenitoras neurales.",
      "Consecuencia: microcefalia y otras alteraciones del síndrome congénito.",
    ],
    epidemiology:
      "El zika circuló en Brasil y otros países de la región y hubo casos en Argentina. El riesgo de síndrome congénito es mayor en el primer trimestre. Es de notificación obligatoria.",
    management: [
      "Antecedente de viaje.",
      "PCR.",
      "Ecografías seriadas.",
      "Prevención de transmisión.",
    ],
    sources: ["Ministerio de Salud de la Nación — Zika: guía para el equipo de salud.", "OPS — Vigilancia del síndrome congénito asociado a zika."],
    pearls: ["Exantema que pica con ojos rojos.", "Preguntá por viajes.", "Transmisión sexual."],
    pitfalls: ["AINE.", "No seguir al feto."],
    tribunal: [
      qa("¿Qué incluye el síndrome congénito por zika?", "Microcefalia, calcificaciones cerebrales, alteraciones oculares, contracturas y pérdida auditiva."),
      qa("¿Qué complicación neurológica da en adultos?", "Síndrome de Guillain-Barré, días a semanas después de la infección."),
      qa("¿Cuánto puede persistir en semen?", "Meses, por eso se recomienda preservativo."),
    ],
  },
};
