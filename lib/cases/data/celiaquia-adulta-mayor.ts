import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const celiaquiaAdultaMayor: ClinicalCase = {
  id: "celiaquia-adulta-mayor",
  level: 3,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 66, ageUnit: "años", sex: "F", context: "Jubilada. Anemia que no responde al hierro oral. Osteoporosis con fractura de muñeca a los 62." },
  frequency: "frecuente",
  intro: "“Me dan hierro hace un año y sigo anémica. Estoy cansada y a veces tengo la panza hinchada.”",
  vitals: { TA: "118/72 mmHg", FC: "82 lpm", Peso: "52 kg" },
  anamnesis: [
    act("hierro", "¿Cómo toma el hierro y cómo respondió?", "clave", "“Bien tomado, y la hemoglobina no sube.”", "Ferropenia refractaria: malabsorción."),
    act("digestivo", "¿Diarrea, gases, distensión?", "clave", "“Distensión y deposiciones blandas a veces.”", "Síntomas leves: típicos en adultos."),
    act("sangrado", "¿Sangrado digestivo, menstruación, colonoscopía?", "clave", "“Colonoscopía normal hace un año.”", "Descartada pérdida colónica."),
    act("familia", "¿Algún familiar celíaco?", "util", "“Una nieta.”", "Primer o segundo grado."),
    act("tiroides", "¿Tiroides, diabetes, otras autoinmunes?", "util", "“Hipotiroidismo.”", "Asociación autoinmune."),
    act("tejido", "¿Qué teje?", "neutro", "“Bufandas para los nietos.”", "No orienta."),
  ],
  exam: [
    act("palidez", "Mucosas", "clave", "Pálidas, queilitis angular.", "Ferropenia."),
    act("piel", "Piel", "util", "Sin dermatitis herpetiforme.", "Diferencial."),
    act("abdomen", "Abdomen", "util", "Distendido, timpánico.", "Malabsorción."),
  ],
  studies: [
    study("Laboratorio", "serologia", "Anti-transglutaminasa IgA con IgA total", "clave", "Anti-tTG IgA 10 veces el normal, IgA normal.", "Muy sugestiva."),
    study("Otros", "endoscopia", "Endoscopía alta con biopsias de duodeno", "clave", "Atrofia vellositaria Marsh 3b.", "Confirma."),
    study("Laboratorio", "lab", "Ferritina, B12, folato, vitamina D, calcio", "clave", "Ferritina 5, vitamina D 12 ng/ml.", "Déficits."),
    study("Imágenes", "densitometria", "Densitometría", "util", "Osteoporosis.", "Seguimiento."),
    study("Otros", "dieta-antes", "Indicar dieta sin gluten antes de la biopsia", "riesgoso", "No se indicó.", "Normaliza la mucosa y falsea el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("celiaquia", "Enfermedad celíaca del adulto mayor con anemia ferropénica refractaria y osteoporosis", true, "Ferropenia que no responde al hierro, osteoporosis, síntomas digestivos leves, anti-tTG alta y atrofia Marsh 3b."),
      dx("cancer-gastrico", "Cáncer gástrico", false, "Endoscopía sin tumor."),
      dx("anemia-cronica", "Anemia de enfermedad crónica", false, "Ferritina muy baja."),
      dx("linfoma", "Linfoma intestinal", false, "No hay lesión; se vigila en celíacos mayores."),
      dx("sii", "Intestino irritable", false, "Hay malabsorción y atrofia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dieta-sin-tacc", "Dieta estricta sin TACC de por vida con nutricionista", "clave", "Único tratamiento."),
      mg("hierro-ev", "Hierro endovenoso si no tolera o no absorbe", "util", "Repleción rápida."),
      mg("vitd-calcio", "Vitamina D y calcio", "clave", "Osteoporosis."),
      mg("familiares", "Serología a familiares de primer grado", "clave", "Riesgo del 10 %."),
      mg("control", "Control serológico a los 6–12 meses", "util", "Adherencia."),
      mg("pequenas-cantidades", "Permitir pequeñas cantidades de gluten", "riesgoso", "Mantienen el daño y el riesgo de linfoma."),
      mg("aumentar-hierro-oral", "Duplicar la dosis de hierro oral", "innecesario", "No se absorbe con la mucosa atrófica."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad celíaca diagnosticada a los 66 años por anemia ferropénica refractaria y osteoporosis.",
    pathologies: [
      { name: "Enfermedad celíaca", role: "principal", why: "Enteropatía autoinmune por gluten." },
      { name: "Anemia ferropénica y osteoporosis", role: "asociada", why: "Malabsorción de hierro, calcio y vitamina D." },
      { name: "Linfoma T asociado a enteropatía", role: "diferencial", why: "Complicación en mayores." },
    ],
    reasoning: [
      "Causa: gluten en una persona HLA-DQ2/DQ8.",
      "Mecanismo: atrofia de vellosidades en el duodeno, donde se absorben hierro y calcio.",
      "Consecuencia: anemia refractaria, osteoporosis y riesgo de linfoma.",
    ],
    epidemiology:
      "Afecta a 1 de cada 100 argentinos y la mayoría no está diagnosticada. Hasta un cuarto de los diagnósticos se hace después de los 60 años, a menudo por anemia u osteoporosis y no por diarrea.",
    management: [
      "Serología con IgA total.",
      "Biopsia con dieta con gluten.",
      "Dieta sin TACC.",
      "Corregir déficits y estudiar familiares.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica sobre diagnóstico y tratamiento de la enfermedad celíaca en el adulto.", "ACG — Clinical Guidelines: diagnosis and management of celiac disease."],
    pearls: ["Anemia que no responde al hierro: pedí anti-tTG.", "No sacar el gluten antes de la biopsia.", "Puede debutar a cualquier edad."],
    pitfalls: ["Dieta antes de la biopsia.", "Pensar que es solo de niños."],
    tribunal: [
      qa("¿Qué significa TACC?", "Trigo, avena, cebada y centeno, los cereales que contienen gluten o se contaminan con él."),
      qa("¿Por qué se pide IgA total junto con la anti-transglutaminasa?", "Porque el déficit de IgA, más frecuente en celíacos, da falsos negativos."),
      qa("¿Qué es la clasificación de Marsh?", "Gradúa la lesión duodenal: 1 linfocitosis intraepitelial, 2 hiperplasia de criptas, 3 atrofia vellositaria (a, b, c)."),
    ],
  },
};
