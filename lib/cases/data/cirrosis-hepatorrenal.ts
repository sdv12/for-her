import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cirrosisHepatorrenal: ClinicalCase = {
  id: "cirrosis-sindrome-hepatorrenal",
  level: 4,
  area: "Gastroenterología",
  setting: "Internación",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Cirrosis por hígado graso, con ascitis. Internada hace tres días por peritonitis bacteriana." },
  frequency: "poco-frecuente",
  intro: "Enfermería avisa: “Orina muy poco desde ayer y está más dormida.”",
  vitals: { TA: "92/54 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "96 %", Glasgow: "13/15" },
  anamnesis: [
    act("diuresis", "¿Cuánto orinó?", "clave", "Menos de 400 ml en 24 horas.", "Oliguria."),
    act("farmacos", "¿Diuréticos, AINE, contraste?", "clave", "Furosemida y espironolactona.", "Nefrotóxicos."),
    act("albumina", "¿Recibió albúmina con la PBE?", "clave", "No.", "Omisión importante."),
    act("hemorragia", "¿Sangrado digestivo?", "util", "No.", "Prerrenal."),
    act("lactulosa", "¿Evacúa con lactulosa?", "util", "Poco.", "Encefalopatía."),
    act("familia", "¿Quién la acompaña?", "neutro", "La hija.", "No orienta."),
  ],
  exam: [
    act("ascitis", "Ascitis y edemas", "clave", "Ascitis tensa.", "Hipertensión portal."),
    act("asterixis", "Asterixis", "clave", "Presente.", "Encefalopatía."),
    act("volemia", "Volemia", "util", "Sin signos de deshidratación.", "No es prerrenal simple."),
  ],
  studies: [
    study("Laboratorio", "renal", "Creatinina, sodio urinario, sedimento", "clave", "Creatinina de 0,9 a 2,6; sodio urinario menor de 10; sedimento sin hallazgos.", "Funcional."),
    study("Laboratorio", "albumina-prueba", "Respuesta a 48 horas de albúmina y suspensión de diuréticos", "clave", "Sin mejoría.", "Criterio."),
    study("Imágenes", "eco", "Ecografía renal", "clave", "Riñones normales, sin obstrucción.", "Excluye."),
    study("Imágenes", "contraste", "TC con contraste EV", "riesgoso", "No se realizó.", "Nefrotóxico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("shr", "Síndrome hepatorrenal (lesión renal aguda hepatorrenal) desencadenado por PBE", true, "Cirrosis con ascitis, IRA funcional sin respuesta a albúmina."),
      dx("nta", "Necrosis tubular aguda", false, "Sedimento normal y sodio urinario bajo."),
      dx("prerrenal", "Prerrenal por hipovolemia", false, "Sin respuesta a albúmina."),
      dx("glomerulo", "Glomerulonefritis", false, "Sedimento sin hallazgos."),
      dx("obstruccion", "Obstrucción", false, "Ecografía normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("terlipresina", "Terlipresina con albúmina", "clave", "Tratamiento de elección."),
      mg("suspender", "Suspender diuréticos y nefrotóxicos", "clave", "Causa."),
      mg("trasplante", "Evaluar trasplante hepático", "clave", "Tratamiento definitivo."),
      mg("encefalopatia", "Lactulosa y rifaximina", "util", "Encefalopatía."),
      mg("mas-diuretico", "Más furosemida", "riesgoso", "Empeora."),
      mg("aines", "AINE para dolor", "riesgoso", "Nefrotóxicos."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome hepatorrenal desencadenado por peritonitis bacteriana espontánea, con encefalopatía, en mujer de 58 años con cirrosis por hígado graso.",
    pathologies: [
      { name: "Síndrome hepatorrenal", role: "principal", why: "IRA funcional en cirrosis." },
      { name: "PBE y encefalopatía", role: "asociada", why: "Desencadenante y complicación." },
      { name: "NTA, prerrenal, obstrucción", role: "diferencial", why: "Otras IRA." },
    ],
    reasoning: [
      "Causa: vasodilatación esplácnica con infección.",
      "Mecanismo: vasoconstricción renal intensa.",
      "Consecuencia: IRA con mal pronóstico.",
    ],
    epidemiology:
      "Aparece en cirróticos avanzados con ascitis, a menudo tras infecciones o sangrado. La albúmina en la PBE reduce mucho el riesgo. El hígado graso es una causa creciente de cirrosis en Argentina.",
    management: [
      "Albúmina en PBE.",
      "Suspender diuréticos.",
      "Terlipresina.",
      "Trasplante.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Complicaciones de la cirrosis.", "International Club of Ascites — HRS-AKI Criteria."],
    pearls: ["Albúmina en PBE.", "Sodio urinario bajo.", "Terlipresina."],
    pitfalls: ["Más diuréticos.", "No dar albúmina."],
    tribunal: [
      qa("¿Qué dosis de albúmina se usa en PBE?", "1,5 g/kg el día 1 y 1 g/kg el día 3."),
      qa("¿Qué es la PBE?", "Infección del líquido ascítico con más de 250 neutrófilos por mm³, sin foco quirúrgico."),
      qa("¿Qué puntaje se usa para el trasplante?", "MELD, con creatinina, bilirrubina, RIN y sodio."),
    ],
  },
};
