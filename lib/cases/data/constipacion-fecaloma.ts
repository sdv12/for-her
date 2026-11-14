import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const constipacionFecaloma: ClinicalCase = {
  id: "fecaloma-adulta-mayor",
  level: 2,
  area: "Gastroenterología",
  setting: "Domicilio",
  patient: { age: 86, ageUnit: "años", sex: "F", context: "Postrada por secuela de ACV. Toma tramadol por dolor de cadera y sulfato ferroso. Toma poca agua." },
  frequency: "muy-frecuente",
  intro: "La hija: “Hace 6 días no va de cuerpo, está inquieta, no quiere comer y ahora le sale un líquido marrón que mancha el pañal.”",
  vitals: { TA: "132/78 mmHg", FC: "92 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("deposiciones", "¿Cuándo fue la última deposición normal?", "clave", "“Hace 6 días.”", "Constipación."),
    act("diarrea", "¿Cómo es lo que sale ahora?", "clave", "“Líquido marrón, poquito y continuo.”", "Diarrea por rebosamiento."),
    act("farmacos", "¿Qué toma?", "clave", "“Tramadol y hierro.”", "Fármacos constipantes."),
    act("orina", "¿Orina bien?", "util", "“Menos.”", "Retención por compresión."),
    act("vomitos", "¿Vomitó?", "util", "“No.”", "Obstrucción."),
    act("nieta", "¿Quién la cuida?", "neutro", "“Yo y una cuidadora.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto rectal", "clave", "Ampolla llena de materia fecal dura.", "Fecaloma."),
    act("abdomen", "Abdomen", "clave", "Distendido, masa en hipogastrio, ruidos presentes.", "Sin peritonitis."),
    act("globo", "Globo vesical", "util", "Presente.", "Retención por compresión."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen", "util", "Abundante materia fecal en recto y colon, sin niveles.", "Confirma sin obstrucción completa."),
    study("Laboratorio", "lab", "Ionograma, calcio, TSH, glucemia", "util", "Potasio 3,3.", "Causas metabólicas."),
    study("Otros", "tacto-hallazgo", "El tacto rectal define el diagnóstico", "clave", "Fecaloma.", "Examen esencial."),
    study("Otros", "loperamida", "Loperamida por la 'diarrea'", "riesgoso", "No se indicó.", "Agrava la impactación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fecaloma", "Impactación fecal (fecaloma) con diarrea por rebosamiento y retención urinaria", true, "Seis días sin deposiciones, escape líquido, fármacos constipantes y fecaloma al tacto."),
      dx("gastroenteritis", "Gastroenteritis", false, "El tacto muestra fecaloma."),
      dx("c-difficile", "Colitis por C. difficile", false, "Sin antibióticos y con fecaloma."),
      dx("obstruccion-cancer", "Obstrucción por cáncer de colon", false, "Fecaloma rectal; igual vigilar."),
      dx("volvulo", "Vólvulo", false, "Sin dilatación ni niveles."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("desimpactacion", "Desimpactación digital y enemas", "clave", "Resolver la impactación."),
      mg("laxantes", "Polietilenglicol diario después", "clave", "Prevenir recurrencia."),
      mg("farmacos-mg", "Revisar tramadol y hierro; agregar laxante si sigue con opioide", "clave", "Causa."),
      mg("sonda", "Sondaje vesical si persiste la retención", "util", "Globo vesical."),
      mg("antidiarreico", "Antidiarreicos", "riesgoso", "Empeora."),
      mg("fosfato-repetido", "Enemas de fosfato repetidos", "riesgoso", "Alteraciones electrolíticas en ancianos."),
    ],
  },
  debrief: {
    diagnosis: "Impactación fecal con diarrea por rebosamiento y retención urinaria, en mujer de 86 años postrada con opioides y hierro.",
    pathologies: [
      { name: "Fecaloma", role: "principal", why: "Impactación de materia fecal dura." },
      { name: "Inmovilidad, fármacos y poca agua", role: "asociada", why: "Factores." },
      { name: "Gastroenteritis, obstrucción tumoral", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: inmovilidad, opioides, hierro y baja ingesta de agua.",
      "Mecanismo: materia fecal dura que no avanza y deja pasar líquido alrededor.",
      "Consecuencia: falsa diarrea, retención urinaria, delirium y riesgo de úlcera estercorácea.",
    ],
    epidemiology:
      "Es muy frecuente en adultos mayores institucionalizados o postrados. Se confunde con diarrea y se trata mal con antidiarreicos. El tacto rectal es el examen clave.",
    management: [
      "Tacto rectal.",
      "Desimpactar.",
      "Laxante de mantenimiento.",
      "Revisar fármacos.",
    ],
    sources: ["Sociedad Argentina de Gerontología y Geriatría — Constipación en el adulto mayor.", "American Gastroenterological Association — Constipation Guideline."],
    pearls: ["Diarrea en postrado: tacto.", "Opioide con laxante siempre.", "Globo vesical."],
    pitfalls: ["Loperamida.", "No hacer tacto."],
    tribunal: [
      qa("¿Qué es la diarrea por rebosamiento?", "Salida de materia fecal líquida alrededor de un fecaloma."),
      qa("¿Qué complicación tiene un fecaloma prolongado?", "Úlcera estercorácea y perforación."),
      qa("¿Qué laxante se asocia al uso de opioides?", "Osmóticos o estimulantes de forma regular, y antagonistas periféricos si fracasan."),
    ],
  },
};
