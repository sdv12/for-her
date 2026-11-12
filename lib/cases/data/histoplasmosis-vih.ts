import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const histoplasmosisVih: ClinicalCase = {
  id: "histoplasmosis-diseminada-vih",
  level: 3,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 39, ageUnit: "años", sex: "M", context: "VIH sin tratamiento, CD4 de 30. Vive en una zona rural de Buenos Aires con un gallinero." },
  frequency: "poco-frecuente",
  intro: "“Hace un mes tengo fiebre todos los días, diarrea, tos y me salieron granitos en la cara. Bajé mucho de peso.”",
  vitals: { TA: "96/58 mmHg", FC: "112 lpm", FR: "24 rpm", "T°": "38,9 °C", "SatO₂": "92 %", Peso: "52 kg" },
  anamnesis: [
    act("exposicion", "¿Gallinero, cuevas, murciélagos?", "clave", "“Limpio el gallinero.”", "Exposición."),
    act("vih", "¿Tomás el tratamiento?", "clave", "“Lo dejé.”", "Inmunosupresión."),
    act("piel", "¿Cómo son los granitos?", "clave", "“Como pápulas con costra en el centro.”", "Diseminación cutánea."),
    act("tbc", "¿Contacto con TBC?", "util", "“No sé.”", "Diferencial."),
    act("profilaxis", "¿Tomás cotrimoxazol?", "util", "“No.”", "Otras."),
    act("animales", "¿Cuántas gallinas tenés?", "neutro", "“Veinte.”", "No orienta."),
  ],
  exam: [
    act("piel-ex", "Piel", "clave", "Pápulas umbilicadas en la cara.", "Diseminación."),
    act("visceras", "Hígado y bazo", "clave", "Hepatoesplenomegalia.", "Sistémica."),
    act("boca", "Boca", "util", "Úlcera en el paladar.", "Mucosa."),
  ],
  studies: [
    study("Laboratorio", "antigeno", "Antígeno urinario de Histoplasma", "clave", "Positivo.", "Rápido."),
    study("Otros", "biopsia", "Biopsia de piel y hemocultivos para hongos", "clave", "Levaduras intracelulares pequeñas.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, LDH, hepatograma, BAAR, Xpert", "clave", "Pancitopenia; LDH alta; BAAR negativo.", "Gravedad y TBC."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrado micronodulillar.", "Pulmonar."),
    study("Otros", "tarv-ya", "Iniciar TARV ese mismo día sin antifúngico", "riesgoso", "No se realizó.", "Riesgo de reconstitución inmune."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("histo", "Histoplasmosis diseminada en VIH avanzado", true, "CD4 bajos, exposición, lesiones umbilicadas, pancitopenia y antígeno positivo."),
      dx("tbc", "Tuberculosis diseminada", false, "BAAR negativo y antígeno positivo."),
      dx("cripto", "Criptococosis", false, "Levaduras pequeñas intracelulares."),
      dx("mpox", "Mpox", false, "Cuadro sistémico prolongado con hongos."),
      dx("linfoma", "Linfoma", false, "Biopsia con levaduras."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anfotericina", "Anfotericina B liposomal", "clave", "Forma grave."),
      mg("itraconazol", "Itraconazol de mantenimiento", "clave", "Consolidación."),
      mg("tarv", "TARV tras iniciar el antifúngico", "clave", "Recuperar inmunidad."),
      mg("profilaxis", "Profilaxis con cotrimoxazol", "util", "Otras infecciones."),
      mg("fluconazol", "Fluconazol de primera línea", "riesgoso", "Menos eficaz."),
      mg("corticoides", "Corticoides", "riesgoso", "Empeora."),
    ],
  },
  debrief: {
    diagnosis: "Histoplasmosis diseminada en VIH avanzado con CD4 de 30, en varón de 39 años.",
    pathologies: [
      { name: "Histoplasmosis diseminada", role: "principal", why: "Micosis oportunista." },
      { name: "Sida", role: "asociada", why: "Inmunosupresión." },
      { name: "TBC, criptococosis", role: "diferencial", why: "Otras oportunistas." },
    ],
    reasoning: [
      "Causa: Histoplasma capsulatum desde excrementos de aves y murciélagos.",
      "Mecanismo: con CD4 bajos, el hongo se disemina.",
      "Consecuencia: fiebre, pancitopenia, lesiones y shock.",
    ],
    epidemiology:
      "Es endémica en la región pampeana y litoral argentina. Es una causa frecuente de muerte en personas con sida en Latinoamérica, y se confunde con tuberculosis. El antígeno urinario permite un diagnóstico rápido.",
    management: [
      "Sospecha en VIH avanzado.",
      "Antígeno y biopsia.",
      "Anfotericina.",
      "TARV.",
    ],
    sources: ["Sociedad Argentina de Infectología — Micosis endémicas.", "OPS — Guías de histoplasmosis en VIH."],
    pearls: ["Pápulas umbilicadas en VIH.", "Antígeno urinario.", "Anfotericina primero."],
    pitfalls: ["Pensar solo en TBC.", "Fluconazol."],
    tribunal: [
      qa("¿Qué infecciones oportunistas aparecen con CD4 menores de 50?", "Micobacterias atípicas, citomegalovirus, criptococosis e histoplasmosis diseminada."),
      qa("¿Qué es el síndrome inflamatorio de reconstitución?", "Empeoramiento por recuperación inmune tras iniciar TARV."),
      qa("¿Qué toxicidad tiene la anfotericina?", "Nefrotoxicidad, hipopotasemia, hipomagnesemia y reacciones a la infusión."),
    ],
  },
};
