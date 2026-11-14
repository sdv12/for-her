import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const esofagitisEosinofilica: ClinicalCase = {
  id: "esofagitis-eosinofilica",
  level: 2,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Asma y rinitis alérgica desde chico. Come lento y toma mucha agua con las comidas." },
  frequency: "frecuente",
  intro: "“Comiendo un asado se me quedó atascado un pedazo de carne en el pecho hace dos horas. No puedo tragar ni la saliva.”",
  vitals: { TA: "128/80 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("previos", "¿Te pasó antes?", "clave", "“Dos veces, pero se me pasó tomando agua.”", "Impactaciones recurrentes."),
    act("atopia", "¿Alergias, asma, rinitis?", "clave", "“Asma y rinitis.”", "Atopia."),
    act("disfagia", "¿Te cuesta tragar sólidos habitualmente?", "clave", "“Como despacio y con agua.”", "Disfagia adaptada."),
    act("acidez", "¿Acidez?", "util", "“Poca.”", "Reflujo."),
    act("peso", "¿Bajaste de peso?", "util", "“No.”", "Alarma."),
    act("trabajo", "¿Trabajás?", "neutro", "“Soy diseñador.”", "No orienta."),
  ],
  exam: [
    act("saliva", "Manejo de secreciones", "clave", "Babea, no puede tragar saliva.", "Impactación completa."),
    act("cuello", "Cuello", "clave", "Sin enfisema subcutáneo.", "Sin perforación."),
    act("respiratorio", "Respiración", "util", "Sin dificultad.", "Vía aérea libre."),
  ],
  studies: [
    study("Otros", "veda", "Endoscopia urgente con biopsias", "clave", "Bolo extraído; anillos esofágicos, surcos lineales y exudados blanquecinos.", "Aspecto típico."),
    study("Laboratorio", "biopsia", "Biopsias de esófago proximal y distal", "clave", "Más de 15 eosinófilos por campo.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma", "util", "Eosinofilia leve.", "Apoya."),
    study("Otros", "papaina", "Ablandadores de carne o bebidas gaseosas para desobstruir", "riesgoso", "No se usó.", "Riesgo de perforación y aspiración."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("eoe", "Esofagitis eosinofílica con impactación alimentaria", true, "Joven atópico con impactaciones recurrentes, anillos y surcos, y eosinófilos en la biopsia."),
      dx("erge", "Esofagitis por reflujo", false, "Eosinófilos más de 15 por campo en todo el esófago."),
      dx("cancer", "Cáncer de esófago", false, "Joven sin pérdida de peso."),
      dx("acalasia", "Acalasia", false, "Anillos y eosinófilos."),
      dx("schatzki", "Anillo de Schatzki aislado", false, "Hay compromiso difuso con eosinófilos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("extraccion", "Extracción endoscópica urgente del bolo", "clave", "Más de 24 horas aumenta la perforación."),
      mg("ibp-corticoide", "IBP en dosis altas o budesonida deglutida", "clave", "Tratamiento de mantenimiento."),
      mg("dieta", "Evaluar dieta de eliminación (lácteos, trigo)", "clave", "Alternativa."),
      mg("dilatacion", "Dilatación endoscópica si persisten estenosis", "util", "Complemento."),
      mg("alta-sin-biopsia", "Extraer el bolo sin biopsiar", "riesgoso", "Se pierde el diagnóstico."),
      mg("esperar-24", "Esperar 24 horas a que pase solo", "riesgoso", "Perforación."),
    ],
  },
  debrief: {
    diagnosis: "Esofagitis eosinofílica con impactación alimentaria, en varón atópico de 24 años.",
    pathologies: [
      { name: "Esofagitis eosinofílica", role: "principal", why: "Enfermedad inmunoalérgica del esófago." },
      { name: "Atopia", role: "asociada", why: "Asma y rinitis." },
      { name: "ERGE, cáncer", role: "diferencial", why: "Otras causas de disfagia." },
    ],
    reasoning: [
      "Causa: respuesta inmune tipo Th2 a alérgenos alimentarios.",
      "Mecanismo: infiltración eosinofílica, fibrosis y anillos.",
      "Consecuencia: disfagia e impactaciones.",
    ],
    epidemiology:
      "Es la causa más frecuente de impactación alimentaria en adultos jóvenes. Predomina en varones atópicos. Muchos se adaptan comiendo lento y con agua, lo que retrasa el diagnóstico.",
    management: [
      "Extracción urgente.",
      "Biopsias.",
      "IBP, budesonida o dieta.",
      "Dilatación si hace falta.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Esofagitis eosinofílica.", "AGA/JTF — Clinical Guidelines for the Management of Eosinophilic Esophagitis."],
    pearls: ["Joven atópico con impactación.", "Biopsiar siempre.", "Come lento y con agua."],
    pitfalls: ["No biopsiar.", "Gaseosas para desobstruir."],
    tribunal: [
      qa("¿Cuántas biopsias se toman?", "Al menos seis, de esófago proximal y distal."),
      qa("¿Cómo se usa la budesonida?", "Formulación viscosa o comprimido que se deglute para actuar en el esófago."),
      qa("¿Qué hallazgos endoscópicos son típicos?", "Anillos, surcos lineales, exudados blancos, edema y estenosis."),
    ],
  },
};
