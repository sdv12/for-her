import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cervicitisClamidia: ClinicalCase = {
  id: "cervicitis-clamidia",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Usa pastillas anticonceptivas. Dos parejas en el último año, sin preservativo." },
  frequency: "muy-frecuente",
  intro: "“Tengo un poco de flujo y sangrado después de las relaciones. Me arde un poco al orinar.”",
  vitals: { TA: "110/70 mmHg", FC: "74 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("sangrado", "¿Sangrás después de las relaciones?", "clave", "“Sí, un poco.”", "Cervicitis."),
    act("parejas", "¿Parejas nuevas sin preservativo?", "clave", "“Dos en el año.”", "ITS."),
    act("dolor", "¿Dolor abdominal bajo o fiebre?", "clave", "“No.”", "EPI."),
    act("orina", "¿Ardor al orinar?", "util", "“Un poco.”", "Uretritis."),
    act("pareja-sintomas", "¿Tu pareja tiene síntomas?", "util", "“No.”", "Asintomático."),
    act("estudio", "¿Estudiás?", "neutro", "“Enfermería.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Cuello friable con secreción mucopurulenta endocervical.", "Cervicitis."),
    act("tacto", "Tacto bimanual", "clave", "Sin dolor a la movilización ni anexial.", "Sin EPI."),
    act("vulva", "Vulva", "util", "Normal.", "Base."),
  ],
  studies: [
    study("Laboratorio", "naat", "PCR de clamidia y gonococo en muestra endocervical u orina", "clave", "Chlamydia trachomatis positiva.", "Diagnóstico."),
    study("Laboratorio", "its", "VIH, VDRL, hepatitis B", "clave", "Negativos.", "Pesquisa."),
    study("Laboratorio", "pap", "Papanicolaou si corresponde por edad", "util", "Pendiente.", "Tamizaje."),
    study("Imágenes", "eco", "Ecografía pelviana", "innecesario", "No se realizó.", "Sin sospecha de EPI."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("clamidia", "Cervicitis por Chlamydia trachomatis", true, "Sangrado poscoital, secreción mucopurulenta, cuello friable y PCR positiva."),
      dx("epi", "Enfermedad pélvica inflamatoria", false, "Sin dolor a la movilización ni anexial."),
      dx("cancer", "Cáncer de cuello", false, "Joven con cervicitis infecciosa; igual hacer PAP."),
      dx("vaginosis", "Vaginosis", false, "La secreción es endocervical."),
      dx("candidiasis", "Candidiasis", false, "Sin flujo grumoso ni prurito."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("doxiciclina", "Doxiciclina por 7 días (o azitromicina dosis única)", "clave", "Tratamiento."),
      mg("pareja", "Tratar a las parejas de los últimos 60 días", "clave", "Reinfección."),
      mg("abstinencia", "Sin relaciones hasta 7 días después del tratamiento de ambos", "clave", "Transmisión."),
      mg("retest", "Nuevo test a los 3 meses", "util", "Reinfección frecuente."),
      mg("no-tratar-pareja", "No tratar a la pareja porque no tiene síntomas", "riesgoso", "Reinfección."),
      mg("dejar-anticonceptivo", "Suspender anticonceptivos", "riesgoso", "No tiene relación y expone a embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Cervicitis por Chlamydia trachomatis, en mujer de 19 años.",
    pathologies: [
      { name: "Cervicitis por clamidia", role: "principal", why: "ITS bacteriana más frecuente." },
      { name: "Riesgo de EPI e infertilidad", role: "asociada", why: "Complicaciones." },
      { name: "EPI, vaginosis", role: "diferencial", why: "Otras causas de flujo." },
    ],
    reasoning: [
      "Causa: Chlamydia trachomatis por contacto sexual.",
      "Mecanismo: infección del epitelio columnar endocervical.",
      "Consecuencia: puede ascender y causar EPI, embarazo ectópico e infertilidad.",
    ],
    epidemiology:
      "Es la ITS bacteriana más frecuente, sobre todo en menores de 25. La mayoría es asintomática. Se recomienda pesquisa en mujeres jóvenes sexualmente activas.",
    management: [
      "PCR.",
      "Doxiciclina.",
      "Parejas.",
      "Retest.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS.", "CDC — Sexually Transmitted Infections Treatment Guidelines: Chlamydial Infections."],
    pearls: ["Sangrado poscoital: cervicitis.", "Menores de 25: pesquisar.", "Tratar a la pareja."],
    pitfalls: ["No tratar a la pareja.", "No pesquisar otras ITS."],
    tribunal: [
      qa("¿Qué complicaciones tiene la clamidia no tratada?", "EPI, embarazo ectópico, dolor pelviano crónico e infertilidad tubaria."),
      qa("¿Qué es el síndrome de Fitz-Hugh-Curtis?", "Perihepatitis por clamidia o gonococo con dolor en hipocondrio derecho."),
      qa("¿Qué serotipos causan linfogranuloma venéreo?", "Los serotipos L1, L2 y L3 de Chlamydia trachomatis."),
    ],
  },
};
