import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemofilia: ClinicalCase = {
  id: "hemofilia-a-nino",
  level: 3,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "M", context: "Moretones frecuentes desde que empezó a caminar. Tíos maternos con “problemas de sangre”." },
  frequency: "poco-frecuente",
  intro: "“Se golpeó la rodilla jugando y ahora la tiene muy hinchada, no quiere caminar y llora. Ya le pasó algo parecido.” (relata la madre)",
  vitals: { FC: "124 lpm", FR: "26 rpm", "T°": "36,9 °C", Peso: "14 kg", TA: "94/58 mmHg" },
  anamnesis: [
    act("familia", "¿Hay varones de la familia materna con sangrados?", "clave", "“Dos tíos, uno con la rodilla mal.”", "Herencia ligada al X."),
    act("sangrados", "¿Sangró al operarse, al vacunarse, por cortes?", "clave", "“Tras la circuncisión sangró mucho; hematomas tras las vacunas.”", "Sangrados profundos o tardíos: coagulopatía."),
    act("maltrato", "¿Cómo fue el golpe? ¿Quién lo vio?", "clave", "“Fue en el jardín, lo vieron las maestras.”", "Siempre considerar lesiones no accidentales, sin prejuzgar."),
    act("cabeza", "¿Se golpeó la cabeza? ¿Vómitos, somnolencia?", "clave", "“No.”", "Una hemorragia intracraneal es la urgencia más grave."),
    act("medicacion", "¿Le dieron aspirina o ibuprofeno?", "util", "“Ibuprofeno.”", "Agravan el sangrado."),
    act("dibujo", "¿Qué le gusta dibujar?", "neutro", "“Autos.”", "No orienta."),
  ],
  exam: [
    act("rodilla", "Rodilla", "clave", "Hinchada, caliente, dolorosa, en flexión, sin fiebre.", "Hemartrosis típica."),
    act("piel", "Piel y mucosas", "clave", "Hematomas grandes en distintas etapas en piernas y glúteos, sin petequias.", "Sangrado profundo: factores. Petequias orientarían a plaquetas."),
    act("neuro", "Neurológico", "util", "Normal.", "Sin signos de hemorragia cerebral."),
  ],
  studies: [
    study("Laboratorio", "coag", "Hemograma y coagulograma", "clave", "Plaquetas normales, KPTT 92 s, TP normal.", "KPTT prolongado aislado: vía intrínseca."),
    study("Laboratorio", "factores", "Factor VIII, IX y von Willebrand; mezcla con plasma", "clave", "Factor VIII menor de 1 %; IX y von Willebrand normales; KPTT corrige con plasma.", "Hemofilia A grave. La corrección excluye un inhibidor."),
    study("Imágenes", "eco", "Ecografía de rodilla", "util", "Derrame hemático, sin fractura.", "Confirma."),
    study("Otros", "puncion", "Punción de rodilla para descartar artritis séptica sin dar factor", "riesgoso", "No se realizó.", "No se punciona sin factor: empeora el sangrado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hemofilia-a", "Hemofilia A grave con hemartrosis de rodilla", true, "Varón, antecedente materno, hemartrosis, KPTT prolongado y factor VIII menor de 1 %."),
      dx("hemofilia-b", "Hemofilia B", false, "El factor IX es normal."),
      dx("vw", "Enfermedad de von Willebrand", false, "Es normal, y predominan sangrados mucosos."),
      dx("pti", "Púrpura trombocitopénica inmune", false, "Plaquetas normales, sin petequias."),
      dx("septica", "Artritis séptica", false, "No hay fiebre, y el coagulograma explica el cuadro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("factor", "Factor VIII concentrado de inmediato, antes de otros estudios invasivos", "clave", "Detiene el sangrado y evita el daño articular."),
      mg("rice", "Reposo, hielo, férula transitoria y analgesia con paracetamol", "clave", "Alivia y protege."),
      mg("centro", "Derivar a un centro de hemofilia: profilaxis y control de inhibidores", "clave", "La profilaxis evita la artropatía; también emicizumab."),
      mg("familia", "Asesoramiento genético y educación familiar", "util", "Identifica portadoras."),
      mg("aines", "Ibuprofeno o aspirina", "riesgoso", "Alteran la función plaquetaria."),
      mg("im", "Inyecciones intramusculares", "riesgoso", "Causan hematomas."),
    ],
  },
  debrief: {
    diagnosis: "Hemofilia A grave con hemartrosis de rodilla en niño de 3 años.",
    pathologies: [
      { name: "Hemofilia A", role: "principal", why: "Déficit hereditario de factor VIII." },
      { name: "Hemartrosis, riesgo de artropatía", role: "asociada", why: "Sangrados articulares recurrentes." },
      { name: "Hemofilia B, von Willebrand, PTI, maltrato", role: "diferencial", why: "Otras causas de sangrado o hematomas." },
    ],
    reasoning: [
      "Causa: mutación del gen del factor VIII, ligada al X.",
      "Mecanismo: falla la amplificación de la coagulación y el coágulo es inestable.",
      "Consecuencia: hemartrosis, hematomas profundos, artropatía, hemorragia intracraneal.",
    ],
    epidemiology:
      "La hemofilia A afecta aproximadamente a 1 de cada 5.000 varones nacidos vivos. En Argentina se trata por la Fundación de la Hemofilia y centros especializados. Cerca de un tercio de los casos surge sin antecedentes familiares. Las mujeres suelen ser portadoras.",
    management: [
      "Factor temprano ante un sangrado.",
      "Evitar AINE e inyecciones intramusculares.",
      "Profilaxis en formas graves.",
      "Vigilar inhibidores y rehabilitación articular.",
    ],
    sources: ["Fundación de la Hemofilia — Guías de tratamiento.", "Federación Mundial de Hemofilia — Guías."],
    pearls: ["KPTT largo con TP normal y plaquetas normales: hemofilia o von Willebrand.", "Hemartrosis: primero el factor.", "Varón con tíos maternos: ligado al X."],
    pitfalls: ["Puncionar sin factor.", "Dar ibuprofeno."],
    tribunal: [
      qa("¿Cómo se clasifica por gravedad?", "Grave: menos de 1 % de factor. Moderada: 1 a 5 %. Leve: 5 a 40 %."),
      qa("¿Qué diferencia hemostasia primaria de secundaria?", "Primaria (plaquetas y von Willebrand): petequias y sangrado mucoso inmediato. Secundaria (factores): hematomas profundos y hemartrosis tardía."),
      qa("¿Qué es un inhibidor?", "Un anticuerpo contra el factor infundido; el KPTT no corrige con plasma y se trata con agentes de bypass o emicizumab."),
    ],
  },
};
