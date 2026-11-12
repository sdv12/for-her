import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neuralgiaTrigemino: ClinicalCase = {
  id: "neuralgia-del-trigemino",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Jubilada. Le sacaron dos muelas por el dolor, sin mejoría." },
  frequency: "frecuente",
  intro: "“Me da una descarga eléctrica en la mejilla derecha, dura segundos. Me pasa al lavarme los dientes o si me toca el viento.”",
  vitals: { TA: "128/78 mmHg", FC: "76 lpm", "T°": "36,4 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("caracteristicas", "¿Cómo es el dolor y cuánto dura?", "clave", "“Como un rayo, segundos, muchas veces al día.”", "Paroxístico y breve."),
    act("gatillo", "¿Qué lo desencadena?", "clave", "“Masticar, hablar, el cepillo.”", "Zonas gatillo."),
    act("alarma", "¿Adormecimiento, visión doble, pérdida de audición?", "clave", "“No.”", "Signos de causa secundaria."),
    act("edad-ms", "¿Episodios neurológicos previos?", "util", "“No.”", "Esclerosis múltiple en jóvenes."),
    act("dientes", "¿Qué te hicieron en el dentista?", "util", "“Dos extracciones, sin cambios.”", "Error frecuente."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Dos.”", "No orienta."),
  ],
  exam: [
    act("sensibilidad", "Sensibilidad facial y reflejo corneal", "clave", "Conservados.", "Examen normal: forma clásica."),
    act("pares", "Otros pares craneales", "clave", "Normales.", "Excluye lesión de base."),
    act("gatillo-ex", "Buscar zonas gatillo", "util", "Roce del ala nasal desencadena el dolor.", "Típico."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de encéfalo con secuencias para el trigémino", "clave", "Contacto vascular con la raíz derecha; sin tumor ni desmielinización.", "Excluye causas secundarias."),
    study("Laboratorio", "lab", "Hemograma, sodio y hepatograma antes de carbamazepina", "clave", "Normales.", "Valores basales."),
    study("Otros", "hla", "HLA-B*1502 según ascendencia asiática", "util", "No corresponde en su caso.", "Riesgo de Stevens-Johnson."),
    study("Imágenes", "rx-dental", "Más extracciones dentales para buscar la causa", "riesgoso", "No se realizó.", "No es dental."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("trigemino", "Neuralgia del trigémino clásica (rama maxilar) por compresión vascular", true, "Dolor eléctrico breve, gatillo, examen normal y contacto vascular."),
      dx("dental", "Dolor dental", false, "No mejoró con las extracciones."),
      dx("arteritis", "Arteritis temporal", false, "Es continuo, con claudicación mandibular y VSG alta."),
      dx("cluster", "Cefalea en racimos", false, "Es periocular, dura minutos a horas, con síntomas autonómicos."),
      dx("atm", "Trastorno temporomandibular", false, "Es sordo y empeora con la apertura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("carbamazepina", "Carbamazepina u oxcarbazepina", "clave", "Primera línea."),
      mg("controles", "Controlar sodio, hemograma e interacciones", "clave", "Efectos adversos."),
      mg("cirugia", "Descompresión microvascular si no responde", "util", "Opción con buen resultado."),
      mg("explicar", "Explicar el diagnóstico y evitar procedimientos dentales", "clave", "Evita daño."),
      mg("opioides", "Opioides como tratamiento principal", "riesgoso", "Poco eficaces aquí y con riesgos."),
      mg("extracciones", "Seguir con extracciones", "riesgoso", "Iatrogenia."),
    ],
  },
  debrief: {
    diagnosis: "Neuralgia del trigémino clásica de la rama maxilar derecha por contacto neurovascular, en mujer de 63 años.",
    pathologies: [
      { name: "Neuralgia del trigémino", role: "principal", why: "Dolor neuropático paroxístico." },
      { name: "Extracciones innecesarias", role: "asociada", why: "Consecuencia del diagnóstico tardío." },
      { name: "Dental, arteritis, racimos", role: "diferencial", why: "Otros dolores faciales." },
    ],
    reasoning: [
      "Causa: compresión de la raíz por un vaso, en general la arteria cerebelosa superior.",
      "Mecanismo: desmielinización focal y descargas ectópicas.",
      "Consecuencia: dolor eléctrico con gatillos que limita comer y hablar.",
    ],
    epidemiology:
      "Es más frecuente en mujeres mayores de 50 años. En menores de 40 o con alteraciones del examen hay que pensar en esclerosis múltiple o tumor. Muchas personas pasan por odontólogos y reciben extracciones innecesarias antes del diagnóstico.",
    management: [
      "Clínica y examen.",
      "RM para causas secundarias.",
      "Carbamazepina.",
      "Cirugía si falla.",
    ],
    sources: ["Sociedad Neurológica Argentina — Dolor facial y neuralgias.", "European Academy of Neurology — Trigeminal Neuralgia Guideline."],
    pearls: ["Descarga breve con gatillo.", "Examen normal.", "Carbamazepina."],
    pitfalls: ["Tratarla como dental.", "No pedir RM en jóvenes."],
    tribunal: [
      qa("¿Cuáles son las ramas del trigémino?", "Oftálmica (V1), maxilar (V2) y mandibular (V3), que también tiene función motora."),
      qa("¿Qué efectos adversos tiene la carbamazepina?", "Hiponatremia, mareos, citopenias, hepatotoxicidad, rash grave e interacciones por inducción enzimática."),
      qa("¿Qué sugiere neuralgia bilateral en una persona joven?", "Esclerosis múltiple, por una placa de desmielinización en el tronco."),
    ],
  },
};
