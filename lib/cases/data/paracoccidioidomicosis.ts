import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const paracoccidioidomicosis: ClinicalCase = {
  id: "paracoccidioidomicosis-cronica",
  level: 3,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 54, ageUnit: "años", sex: "M", context: "Trabajador rural de Misiones, tabaquista y bebedor. Sin VIH conocido." },
  frequency: "poco-frecuente",
  intro: "“Hace meses tengo llagas en la boca que no cierran, tos y bajé 12 kilos. Me cuesta tragar y se me cae un diente.”",
  vitals: { TA: "108/66 mmHg", FC: "88 lpm", FR: "22 rpm", "T°": "37,6 °C", "SatO₂": "93 %", Peso: "58 kg" },
  anamnesis: [
    act("trabajo", "¿Dónde vivís y qué hacés?", "clave", "“Yerba, en Misiones, toda la vida.”", "Zona endémica y trabajo rural."),
    act("boca", "¿Cómo son las lesiones?", "clave", "“Granulosas, duelen.”", "Estomatitis moriforme."),
    act("tbc", "¿TBC, contacto, VIH?", "clave", "“Nada.”", "Diferencial principal."),
    act("adrenal", "¿Mareos al pararte, piel oscura?", "util", "“Mareos.”", "Insuficiencia suprarrenal."),
    act("alcohol", "¿Tabaco y alcohol?", "util", "“Mucho.”", "Factores."),
    act("cosecha", "¿Hace cuántos años cosechás?", "neutro", "“Treinta.”", "No orienta."),
  ],
  exam: [
    act("oral", "Boca", "clave", "Lesión granulosa con puntillado hemorrágico (moriforme), dientes móviles.", "Típica."),
    act("ganglios", "Ganglios y piel", "clave", "Adenopatías cervicales.", "Diseminación."),
    act("pulmon", "Pulmón y presión ortostática", "util", "Rales bilaterales; caída de presión.", "Pulmonar y adrenal."),
  ],
  studies: [
    study("Laboratorio", "directo", "Examen directo y cultivo de la lesión y esputo con KOH", "clave", "Levaduras con gemación múltiple, en rueda de timón.", "Confirma."),
    study("Otros", "biopsia", "Biopsia de la lesión", "clave", "Granulomas y levaduras.", "Excluye cáncer."),
    study("Imágenes", "rx", "Radiografía o TC de tórax", "clave", "Infiltrados bilaterales simétricos, en alas de mariposa.", "Clásico."),
    study("Laboratorio", "lab", "Cortisol, BAAR, VIH y función hepática", "clave", "Cortisol bajo; BAAR negativo; VIH negativo.", "Insuficiencia suprarrenal y diferenciales."),
    study("Otros", "antibiotico", "Cefalexina diez días y volver", "riesgoso", "No se realizó.", "Demora, ya lleva meses."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pcm", "Paracoccidioidomicosis crónica multifocal con insuficiencia suprarrenal", true, "Trabajador rural, estomatitis moriforme, infiltrados y rueda de timón."),
      dx("tbc", "Tuberculosis", false, "BAAR negativo y levaduras típicas."),
      dx("cancer", "Cáncer de boca", false, "La biopsia muestra granulomas y hongos."),
      dx("histoplasma", "Histoplasmosis", false, "No tiene gemación en rueda de timón."),
      dx("leishmania", "Leishmaniasis mucosa", false, "Afecta nariz con perforación y no el pulmón."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("itraconazol", "Itraconazol por 9 a 18 meses; anfotericina si es grave", "clave", "Tratamiento de elección."),
      mg("corticoide", "Reemplazo de cortisol", "clave", "Insuficiencia suprarrenal."),
      mg("seguimiento", "Control clínico y serológico prolongado", "clave", "Recurrencias."),
      mg("tabaco", "Nutrición, tabaco y alcohol", "util", "Mejora."),
      mg("corticoide-solo", "Corticoides para la boca sin antifúngico", "riesgoso", "Disemina."),
      mg("corto", "Antifúngico por un mes", "riesgoso", "Recaídas."),
    ],
  },
  debrief: {
    diagnosis: "Paracoccidioidomicosis crónica multifocal con insuficiencia suprarrenal, en trabajador rural de 54 años.",
    pathologies: [
      { name: "Paracoccidioidomicosis", role: "principal", why: "Micosis sistémica endémica." },
      { name: "Insuficiencia suprarrenal, desnutrición", role: "asociada", why: "Complicaciones." },
      { name: "TBC, cáncer, histoplasmosis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: inhalación de Paracoccidioides.",
      "Mecanismo: infección latente que se reactiva con deterioro inmune.",
      "Consecuencia: compromiso pulmonar, mucoso y adrenal.",
    ],
    epidemiology:
      "Es una micosis sistémica de Sudamérica, endémica en el nordeste argentino. Afecta sobre todo a varones rurales, ya que los estrógenos parecen proteger a las mujeres. Se asocia a tabaquismo y alcoholismo, y se confunde con tuberculosis y cáncer.",
    management: [
      "Sospecha epidemiológica.",
      "Directo y biopsia.",
      "Antifúngicos prolongados.",
      "Insuficiencia suprarrenal y secuelas.",
    ],
    sources: ["Sociedad Argentina de Infectología — Micosis sistémicas endémicas.", "Consenso Brasileño de Paracoccidioidomicosis — Directrices clínicas."],
    pearls: ["Rueda de timón.", "Boca moriforme.", "Revisá suprarrenal."],
    pitfalls: ["Asumir TBC.", "Tratar poco tiempo."],
    tribunal: [
      qa("¿Qué micosis endémicas hay en Argentina?", "Paracoccidioidomicosis, histoplasmosis y coccidioidomicosis, según la región."),
      qa("¿Cuáles son las formas de la enfermedad?", "Aguda o juvenil, con ganglios y órganos, y crónica del adulto, pulmonar y mucosa."),
      qa("¿Qué efecto adverso tiene el itraconazol?", "Hepatotoxicidad, interacciones por citocromo e insuficiencia cardíaca."),
    ],
  },
};
