import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hemorragiaDigestivaBaja: ClinicalCase = {
  id: "hemorragia-digestiva-baja-diverticular",
  level: 2,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Hipertenso, toma aspirina. Diverticulosis conocida. Colonoscopía hace 3 años sin pólipos." },
  frequency: "frecuente",
  intro: "“Desde la mañana hago sangre roja y coágulos, sin dolor. Fui tres veces al baño y me mareé.”",
  vitals: { TA: "104/62 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "36,4 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("sangre", "¿Cómo es la sangre? ¿Dolor?", "clave", "“Roja, abundante, sin dolor.”", "Diverticular típica."),
    act("farmacos", "¿Aspirina, anticoagulantes, AINE?", "clave", "“Aspirina.”", "Agravante."),
    act("alta", "¿Vómitos con sangre, materia negra, úlceras?", "clave", "“No.”", "Hemorragia alta masiva puede dar sangre roja."),
    act("peso", "¿Pérdida de peso, cambios de hábito?", "util", "“No.”", "Cáncer."),
    act("radiacion", "¿Radioterapia o cirugías?", "util", "“No.”", "Otras causas."),
    act("perro", "¿Vive con alguien?", "neutro", "“Con mi señora.”", "No orienta."),
  ],
  exam: [
    act("hemodinamia", "Perfusión y ortostatismo", "clave", "Ortostatismo positivo.", "Pérdida significativa."),
    act("rectal", "Tacto rectal y anoscopía", "clave", "Sangre roja; sin hemorroides ni masa.", "Excluye causa baja anal."),
    act("abdomen", "Abdomen", "util", "Blando, indoloro.", "Aleja isquemia."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, coagulograma, urea, grupo", "clave", "Hb 8,9; urea normal.", "Urea normal sugiere sangrado bajo."),
    study("Otros", "colono", "Colonoscopía tras preparación rápida", "clave", "Divertículo sigmoideo con estigma de sangrado; hemostasia.", "Diagnóstico y tratamiento."),
    study("Imágenes", "angiotc", "AngioTC si sangra activamente e inestable", "util", "No requirió.", "Ubica el sangrado."),
    study("Imágenes", "bario", "Colon por enema con bario", "riesgoso", "No se realizó.", "Dificulta los estudios."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("diverticular", "Hemorragia digestiva baja diverticular", true, "Sangre roja indolora, diverticulosis y estigma en colonoscopía."),
      dx("hemorroides", "Hemorroides", false, "Anoscopía sin hemorroides; volumen alto."),
      dx("isquemica", "Colitis isquémica", false, "Daría dolor."),
      dx("cancer", "Cáncer de colon", false, "Colonoscopía sin masa."),
      dx("angiodisplasia", "Angiodisplasia", false, "Hay estigma diverticular."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimar", "Dos vías, cristaloides, transfusión restrictiva", "clave", "Estabiliza."),
      mg("colono", "Colonoscopía en 24 horas", "clave", "Diagnóstico y hemostasia."),
      mg("aspirina", "Revisar indicación de aspirina", "clave", "Prevención primaria: suspender."),
      mg("cirugia", "Embolización o cirugía si persiste", "util", "Rescate."),
      mg("alta", "Alta porque no duele", "riesgoso", "Inestable."),
      mg("sonda", "Laxantes estimulantes sin control", "riesgoso", "Puede empeorar la hipovolemia."),
    ],
  },
  debrief: {
    diagnosis: "Hemorragia digestiva baja diverticular con repercusión hemodinámica, en varón de 76 años con aspirina.",
    pathologies: [
      { name: "Hemorragia digestiva baja", role: "principal", why: "Sangrado debajo del ángulo de Treitz." },
      { name: "Diverticulosis y aspirina", role: "asociada", why: "Causa y factor." },
      { name: "Hemorroides, isquemia, cáncer", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: rotura de un vaso en el cuello del divertículo.",
      "Mecanismo: sangrado arterial, indoloro.",
      "Consecuencia: anemia aguda e hipotensión.",
    ],
    epidemiology:
      "La diverticular es la principal causa de hemorragia digestiva baja en mayores, y la mayoría cede sola. Los antiagregantes y AINE aumentan el riesgo. Hay que descartar un sangrado alto masivo cuando hay inestabilidad.",
    management: [
      "Reanimar.",
      "Descartar origen alto.",
      "Colonoscopía.",
      "Revisar fármacos.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Hemorragia digestiva baja.", "ACG — Guideline on Lower GI Bleeding."],
    pearls: ["Sangre roja sin dolor en mayor.", "Urea normal: baja.", "La mayoría cede."],
    pitfalls: ["No excluir sangrado alto.", "No revisar la aspirina."],
    tribunal: [
      qa("¿Dónde se ubica el límite entre alta y baja?", "En el ángulo de Treitz."),
      qa("¿Cuáles son las causas más frecuentes de HDB?", "Divertículos, angiodisplasias, hemorroides, colitis isquémica y cáncer."),
      qa("¿Por qué la urea ayuda?", "Sube en hemorragia alta por la digestión de proteínas de la sangre."),
    ],
  },
};
