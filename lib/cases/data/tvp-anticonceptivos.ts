import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tvpAnticonceptivos: ClinicalCase = {
  id: "tvp-anticonceptivos-viaje",
  level: 1,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Toma anticonceptivos combinados. Fumadora. Volvió hace 3 días de un viaje de 20 horas en micro." },
  frequency: "frecuente",
  intro: "“Hace dos días me duele y se me hinchó la pierna izquierda. Me cuesta apoyar el pie.”",
  vitals: { TA: "116/72 mmHg", FC: "86 lpm", FR: "16 rpm", "T°": "36,8 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("factores", "¿Anticonceptivos, viajes, reposo, cirugía o embarazo?", "clave", "“Pastillas y un viaje de 20 horas.”", "Factores transitorios."),
    act("disnea", "¿Falta de aire, dolor de pecho, síncope?", "clave", "“No.”", "Busca TEP."),
    act("embarazo", "¿Podrías estar embarazada?", "clave", "“Test negativo.”", "Cambia el tratamiento."),
    act("trombosis", "¿Coágulos previos? ¿Abortos? ¿Familia?", "util", "“Nada.”", "Trombofilia."),
    act("trauma", "¿Golpes en la pierna?", "util", "“No.”", "Hematoma, desgarro."),
    act("viaje", "¿A dónde viajaste?", "neutro", "“A Bariloche.”", "No orienta."),
  ],
  exam: [
    act("pierna", "Medir ambas piernas y palpar", "clave", "Izquierda 4 cm mayor, edema con fóvea, dolor en trayecto venoso, venas superficiales visibles.", "Wells de 3."),
    act("piel", "Piel", "clave", "Sin eritema extenso ni fiebre.", "Aleja celulitis."),
    act("pulso", "Pulsos", "util", "Presentes.", "Sin flegmasía."),
  ],
  studies: [
    study("Imágenes", "doppler", "Eco Doppler venoso", "clave", "Trombosis femoropoplítea izquierda, no compresible.", "Prueba de elección."),
    study("Laboratorio", "lab", "Hemograma, función renal y hepática, beta-hCG", "clave", "Normal.", "Antes de anticoagular."),
    study("Laboratorio", "dimero", "Dímero D con Wells alto", "innecesario", "No se realizó.", "Se va directo a imagen."),
    study("Laboratorio", "trombofilia", "Estudio de trombofilia en agudo", "innecesario", "No se realizó.", "Con factores claros, no cambia conducta y puede alterarse."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tvp", "Trombosis venosa profunda femoropoplítea provocada", true, "Pierna asimétrica, factores de riesgo y Doppler no compresible."),
      dx("celulitis", "Celulitis", false, "Sin fiebre ni piel roja."),
      dx("baker", "Quiste de Baker roto", false, "Doppler con trombo."),
      dx("muscular", "Desgarro muscular", false, "Sin trauma."),
      dx("venosa", "Insuficiencia venosa crónica", false, "Es de instalación aguda."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoagular", "Anticoagulante oral directo o heparina con warfarina", "clave", "Previene TEP y extensión."),
      mg("duracion", "Tratar 3 meses por causa transitoria", "clave", "Duración adecuada."),
      mg("estrogenos", "Suspender estrógenos y dar método sin ellos; dejar de fumar", "clave", "Previene recurrencias."),
      mg("caminar", "Caminar y usar medias si hay síntomas", "util", "No hace falta reposo."),
      mg("reposo", "Reposo absoluto por 2 semanas", "riesgoso", "No aporta y aumenta la estasis."),
      mg("aspirina", "Solo aspirina", "riesgoso", "Insuficiente en TVP aguda."),
    ],
  },
  debrief: {
    diagnosis: "Trombosis venosa profunda femoropoplítea izquierda provocada por anticonceptivos combinados y viaje prolongado, en mujer de 26 años.",
    pathologies: [
      { name: "Trombosis venosa profunda", role: "principal", why: "Trombo en venas profundas." },
      { name: "Riesgo de TEP", role: "asociada", why: "Complicación." },
      { name: "Celulitis, quiste de Baker, desgarro", role: "diferencial", why: "Otras causas de pierna hinchada." },
    ],
    reasoning: [
      "Causa: estrógenos, tabaco, inmovilidad.",
      "Mecanismo: mayor coagulabilidad y estasis venosa.",
      "Consecuencia: edema, dolor, TEP, síndrome postrombótico.",
    ],
    epidemiology:
      "En mujeres jóvenes, los anticonceptivos con estrógenos son una causa importante, aunque el riesgo absoluto es bajo. Los viajes de más de 4 horas lo aumentan. Conviene moverse, hidratarse y revisar los factores de riesgo antes de indicar estrógenos.",
    management: [
      "Wells y Doppler.",
      "Anticoagular.",
      "Suspender estrógenos.",
      "Seguimiento y movilización.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de enfermedad tromboembólica.", "CHEST — Guías de tratamiento antitrombótico."],
    pearls: ["Pierna unilateral: Doppler.", "Reposo no.", "Provocada por factor transitorio: 3 meses."],
    pitfalls: ["No preguntar por anticonceptivos.", "Pedir trombofilia en agudo."],
    tribunal: [
      qa("¿Cuáles son los criterios de Wells para TVP?", "Cáncer, parálisis o inmovilización, reposo o cirugía, dolor en trayecto, pierna hinchada, diferencia de 3 cm, edema con fóvea, venas colaterales, TVP previa; resta si hay otro diagnóstico."),
      qa("¿Qué es el síndrome postrombótico?", "Dolor, edema, pesadez y úlceras crónicas por daño valvular."),
      qa("¿Qué método anticonceptivo se indica después?", "DIU, implante o progestágeno, sin estrógenos."),
    ],
  },
};
