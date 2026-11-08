import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const linfomaNoHodgkin: ClinicalCase = {
  id: "linfoma-no-hodgkin-difuso-celulas-b",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Agricultor de la zona de Marcos Juárez. Sin VIH conocido." },
  frequency: "frecuente",
  intro: "“Hace un mes me salió un bulto en el cuello y crece rápido. Tengo fiebre de noche, transpiro y bajé 7 kilos.”",
  vitals: { TA: "126/78 mmHg", FC: "88 lpm", "T°": "37,9 °C", "SatO₂": "97 %", Peso: "71 kg" },
  anamnesis: [
    act("adenopatia", "¿Cómo creció? ¿Duele? ¿Hay otros bultos?", "clave", "“Crece rápido, no duele; tengo otro en la ingle.”", "Adenopatía sin dolor y progresiva."),
    act("b", "¿Fiebre, sudor nocturno, peso?", "clave", "“Las tres.”", "Síntomas B."),
    act("infeccion", "¿TBC, gatos, dolor de garganta, VIH?", "clave", "“Nada.”", "Causas infecciosas."),
    act("agroquimicos", "¿Expuesto a agroquímicos?", "util", "“Muchos años.”", "Factor asociado."),
    act("compresion", "¿Falta de aire, dolor abdominal, ictericia?", "util", "“Panza molesta.”", "Compromiso abdominal."),
    act("cosecha", "¿Qué cultivás?", "neutro", "“Soja.”", "No orienta."),
  ],
  exam: [
    act("ganglios", "Ganglios", "clave", "Cervical de 5 cm, duro-elástico, indoloro; inguinales.", "Generalizado y patológico."),
    act("bazo", "Bazo, hígado", "clave", "Esplenomegalia a 3 cm.", "Extensión."),
    act("orofaringe", "Anillo de Waldeyer y piel", "util", "Sin lesiones.", "Sitios extranodales."),
  ],
  studies: [
    study("Otros", "biopsia", "Biopsia escisional del ganglio con inmunohistoquímica", "clave", "Linfoma difuso de células B grandes, CD20+.", "Imprescindible: la punción con aguja fina no alcanza."),
    study("Imágenes", "pet", "PET-TC", "clave", "Enfermedad supra e infradiafragmática.", "Estadificación."),
    study("Laboratorio", "lab", "Hemograma, LDH, ácido úrico, función renal, VIH, hepatitis B y C", "clave", "LDH 780; hepatitis B: anti-HBc positivo.", "Pronóstico y riesgo de reactivación con rituximab."),
    study("Otros", "mo", "Biopsia de médula ósea según PET", "util", "Sin infiltración.", "Estadificación."),
    study("Otros", "corticoide", "Dar corticoides antes de biopsiar", "riesgoso", "No se realizó.", "Puede enmascarar el diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lnh", "Linfoma no Hodgkin difuso de células B grandes, estadio III con síntomas B", true, "Adenopatías rápidas, síntomas B, biopsia CD20+."),
      dx("hodgkin", "Linfoma de Hodgkin", false, "No hay células de Reed-Sternberg."),
      dx("tbc", "Tuberculosis ganglionar", false, "La biopsia no muestra granulomas."),
      dx("llc", "Leucemia linfática crónica", false, "Es indolente con linfocitosis."),
      dx("metastasis", "Metástasis de carcinoma", false, "Inmunohistoquímica linfoide."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("rchop", "R-CHOP con hematología", "clave", "Tratamiento estándar, con intención curativa."),
      mg("lisis", "Prevenir lisis tumoral: hidratación, alopurinol", "clave", "Masa grande y LDH alta."),
      mg("hepatitis", "Profilaxis antiviral por anti-HBc positivo", "clave", "Rituximab reactiva hepatitis B."),
      mg("cardiaco", "Ecocardiograma antes de antraciclinas", "util", "Cardiotoxicidad."),
      mg("atb", "Antibióticos dos meses antes de biopsiar", "riesgoso", "Demora un cáncer agresivo y curable."),
      mg("paaf", "Conformarse con punción con aguja fina", "riesgoso", "No permite clasificar."),
    ],
  },
  debrief: {
    diagnosis: "Linfoma no Hodgkin difuso de células B grandes, estadio III con síntomas B, en varón de 66 años.",
    pathologies: [
      { name: "Linfoma difuso de células B grandes", role: "principal", why: "Linfoma agresivo más frecuente." },
      { name: "Anti-HBc positivo, riesgo de lisis tumoral", role: "asociada", why: "Modifica el tratamiento." },
      { name: "Hodgkin, TBC, metástasis", role: "diferencial", why: "Otras adenopatías." },
    ],
    reasoning: [
      "Causa: transformación clonal de linfocitos B.",
      "Mecanismo: proliferación rápida en ganglios y órganos.",
      "Consecuencia: adenopatías, síntomas B, fallo de órganos.",
    ],
    epidemiology:
      "Es el tipo de linfoma no Hodgkin más común; aumenta con la edad. La exposición a algunos pesticidas, inmunosupresión y VIH se han relacionado con riesgo aumentado. Es agresivo, pero con inmunoquimioterapia se cura en más de la mitad de las personas.",
    management: [
      "Biopsia escisional.",
      "Estadificar con PET-TC (Ann Arbor) e IPI.",
      "R-CHOP.",
      "Prevención de complicaciones.",
    ],
    sources: ["Sociedad Argentina de Hematología — Guías de linfomas.", "NCCN — B-Cell Lymphomas Guidelines."],
    pearls: ["Adenopatía que crece y no duele: biopsia.", "Antes de rituximab, hepatitis B.", "No demorar con antibióticos."],
    pitfalls: ["Punción con aguja fina.", "Corticoides antes."],
    tribunal: [
      qa("¿Cómo diferenciás Hodgkin de no Hodgkin?", "Hodgkin: Reed-Sternberg, CD30 y CD15, contiguo, joven. No Hodgkin: más variable, extranodal y no contiguo."),
      qa("¿Qué es el síndrome de lisis tumoral?", "Hiperpotasemia, hiperuricemia, hiperfosfatemia e hipocalcemia por destrucción celular."),
      qa("¿Qué son los síntomas B?", "Fiebre mayor de 38 °C, sudoración nocturna y pérdida de más del 10 % del peso en 6 meses."),
    ],
  },
};
