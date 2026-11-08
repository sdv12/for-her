import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neumoniaLegionella: ClinicalCase = {
  id: "neumonia-comunidad-legionella",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Fumador. Trabaja en mantenimiento de torres de enfriamiento de un hotel." },
  frequency: "poco-frecuente",
  intro: "“Fiebre alta hace cuatro días, tos seca y diarrea. Mi mujer dice que estoy confundido.”",
  vitals: { TA: "108/66 mmHg", FC: "82 lpm", FR: "28 rpm", "T°": "39,6 °C", "SatO₂": "89 %", Glasgow: "14/15" },
  anamnesis: [
    act("trabajo", "¿Dónde trabajás? ¿Exposición a agua o aerosoles?", "clave", "“Reparo torres de enfriamiento.”", "Fuente típica."),
    act("digestivo", "¿Diarrea, vómitos, dolor de cabeza?", "clave", "“Diarrea y cefalea.”", "Extrapulmonar."),
    act("riesgo", "¿Fumás, diabetes, inmunosupresión?", "clave", "“Fumo.”", "Factor."),
    act("atb", "¿Tomaste amoxicilina?", "util", "“Tres días, sin mejorar.”", "Los betalactámicos no cubren."),
    act("viaje", "¿Viajes o colegas enfermos?", "util", "“Dos compañeros con fiebre.”", "Brote."),
    act("perro", "¿Tenés mascotas?", "neutro", "“Un perro.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Crepitantes bibasales.", "Neumonía."),
    act("pulso", "Pulso y temperatura", "clave", "Frecuencia baja para 39,6 °C.", "Disociación."),
    act("mental", "Conciencia", "util", "Algo confuso.", "Gravedad."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados bilaterales.", "Base."),
    study("Laboratorio", "lab", "Ionograma, CK, hepatograma, gases", "clave", "Na 124; CK alta; TGO alta.", "Hiponatremia típica."),
    study("Microbiología", "antigeno", "Antígeno urinario de Legionella y PCR", "clave", "Positivo.", "Confirma."),
    study("Microbiología", "gram", "Hemocultivos y cultivo", "util", "Negativos.", "Otros gérmenes."),
    study("Imágenes", "tc-abdomen", "TC de abdomen por la diarrea", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("legionella", "Neumonía grave de la comunidad por Legionella", true, "Exposición, diarrea, hiponatremia, disociación pulso-temperatura y antígeno positivo."),
      dx("neumococo", "Neumonía neumocócica", false, "Antígeno de Legionella positivo."),
      dx("influenza", "Influenza", false, "Hallazgos bacterianos."),
      dx("covid", "COVID-19", false, "Antígeno positivo."),
      dx("hanta", "Hantavirus", false, "Sin contexto rural y Legionella positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Levofloxacina o azitromicina", "clave", "Cubren intracelulares."),
      mg("internar", "Internar en terapia, oxígeno", "clave", "CURB-65 alto."),
      mg("sodio", "Corregir la hiponatremia con cuidado", "clave", "Riesgo."),
      mg("notificar", "Avisar a autoridades y empresa", "clave", "Fuente ambiental."),
      mg("amoxi", "Seguir con amoxicilina", "riesgoso", "No cubre."),
      mg("corticoides-altos", "Corticoides en altas dosis sin indicación", "riesgoso", "Sin beneficio."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía grave de la comunidad por Legionella pneumophila, con hiponatremia, en varón de 54 años.",
    pathologies: [
      { name: "Legionelosis", role: "principal", why: "Neumonía atípica grave." },
      { name: "Hiponatremia", role: "asociada", why: "Complicación típica." },
      { name: "Neumococo, influenza, hantavirus", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: inhalación de agua contaminada.",
      "Mecanismo: multiplicación dentro de macrófagos alveolares.",
      "Consecuencia: neumonía grave y compromiso extrapulmonar.",
    ],
    epidemiology:
      "Es causa de un porcentaje de las neumonías graves. Se asocia a torres de refrigeración, hoteles y hospitales. En 2022 hubo un brote en un sanatorio de Tucumán. No se transmite entre personas, y un caso obliga a estudiar la fuente ambiental.",
    management: [
      "CURB-65.",
      "Antígeno urinario.",
      "Macrólido o quinolona.",
      "Fuente.",
    ],
    sources: ["Sociedad Argentina de Infectología — Neumonía de la comunidad.", "Ministerio de Salud de la Nación — Alerta epidemiológica de legionelosis."],
    pearls: ["Neumonía con diarrea e hiponatremia.", "Betalactámicos no sirven.", "Buscar fuente."],
    pitfalls: ["Tratamiento sin atípicos.", "No avisar."],
    tribunal: [
      qa("¿Qué gérmenes causan neumonía atípica?", "Mycoplasma, Chlamydophila y Legionella."),
      qa("¿Qué es el CURB-65?", "Confusión, urea, frecuencia respiratoria, presión baja y edad de 65 o más."),
      qa("¿Por qué no sirven betalactámicos?", "Porque las bacterias intracelulares no están al alcance y no tienen pared típica."),
    ],
  },
};
