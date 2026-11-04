import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const condilomas: ClinicalCase = {
  id: "condilomas-acuminados",
  level: 1,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 20, ageUnit: "años", sex: "M", context: "Varias parejas sexuales en el último año. No recibió la vacuna contra el VPH." },
  frequency: "frecuente",
  intro: "“Me salieron unas verruguitas en el pene y alrededor del ano. No duelen, pero me dan vergüenza.”",
  vitals: { TA: "118/72 mmHg", FC: "72 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("relaciones", "¿Tenés relaciones sexuales con preservativo? ¿Con varones, mujeres o ambos?", "clave", "“Con ambos; a veces sin preservativo.”", "Prácticas sin protección: riesgo de VPH y otras ITS."),
    act("vacuna", "¿Te vacunaste contra el VPH?", "clave", "“No.”", "En Argentina se vacuna a varones desde 2017."),
    act("tiempo", "¿Desde cuándo las tenés?", "util", "“Dos meses, van creciendo.”", "Evolución."),
    act("anal", "¿Sangrado o dolor anal?", "util", "“No.”", "Descarta lesiones internas sintomáticas."),
    act("vih", "¿Te testeaste para VIH y sífilis?", "clave", "“Nunca.”", "Toda ITS obliga a testear otras."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Fútbol 5.”", "No orienta."),
  ],
  exam: [
    act("genitales", "Inspección genital y perianal", "clave", "Pápulas exofíticas en coliflor, del color de la piel, en surco balanoprepucial y región perianal.", "Condilomas acuminados."),
    act("ganglios", "Ganglios inguinales", "util", "Normales.", "Sin adenopatías."),
    act("diferencial", "Buscar pápulas planas húmedas o úlceras", "util", "No.", "Descarta condilomas planos de la sífilis."),
  ],
  studies: [
    study("Laboratorio", "its", "VIH, VDRL, hepatitis B y C", "clave", "Negativos.", "Rastreo de ITS asociadas."),
    study("Otros", "anoscopia", "Anoscopía por lesiones perianales", "util", "Lesiones en el margen anal sin compromiso interno.", "Evalúa extensión."),
    study("Otros", "biopsia", "Biopsia de todas las lesiones", "innecesario", "No se realizó.", "Solo si son atípicas, pigmentadas, ulceradas o no responden."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("condilomas", "Condilomas acuminados genitales y perianales por VPH", true, "Pápulas exofíticas en coliflor, indoloras, en un joven sin vacuna con relaciones sin protección."),
      dx("sifilis", "Condilomas planos sifilíticos", false, "Esos son planos, húmedos y la VDRL sería reactiva."),
      dx("molusco", "Molusco contagioso", false, "Pápulas umbilicadas, no en coliflor."),
      dx("papulas-perladas", "Pápulas perladas del pene", false, "Son normales, en hileras en la corona del glande, no en coliflor."),
      dx("cancer", "Carcinoma escamoso", false, "Sin ulceración ni induración."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tratamiento", "Tratamiento local: crioterapia, podofilotoxina o imiquimod", "clave", "Eliminan las lesiones visibles."),
      mg("preservativo", "Consejería sobre preservativo, PrEP y testeo de parejas", "clave", "Prevención de ITS."),
      mg("vacuna", "Vacuna contra el VPH (según indicación, aunque ya tenga la infección)", "util", "Protege contra otros tipos virales."),
      mg("seguimiento", "Seguimiento por recurrencias", "util", "Son frecuentes."),
      mg("acido", "Productos para verrugas comunes de venta libre en genitales", "riesgoso", "Quemaduras en mucosas."),
      mg("atb", "Antibióticos", "innecesario", "Es viral."),
    ],
  },
  debrief: {
    diagnosis: "Condilomas acuminados genitales y perianales por VPH (tipos de bajo riesgo), en varón de 20 años no vacunado con prácticas sexuales sin protección.",
    pathologies: [
      { name: "Condilomas acuminados", role: "principal", why: "Infección por VPH 6 y 11." },
      { name: "Riesgo de otras ITS", role: "asociada", why: "Misma vía." },
      { name: "Sífilis, molusco, pápulas perladas", role: "diferencial", why: "Otras lesiones genitales." },
    ],
    reasoning: [
      "Causa: VPH de bajo riesgo (6 y 11), transmitido por contacto sexual.",
      "Mecanismo: el virus infecta las células basales del epitelio y produce proliferación (verrugas).",
      "Consecuencia: lesiones benignas recurrentes; los tipos de alto riesgo (16 y 18) se asocian a cánceres anogenitales y orofaríngeos.",
    ],
    epidemiology:
      "El VPH es la ITS más frecuente; la mayoría de las personas sexualmente activas se infecta alguna vez. En Argentina la vacuna se aplica a niñas desde 2011 y a varones desde 2017 a los 11 años. Los condilomas son frecuentes en jóvenes de 15 a 30 años.",
    management: [
      "Diagnóstico clínico.",
      "Tratamiento local según número y localización.",
      "Testeo de otras ITS y consejería.",
      "Vacunación para prevenir.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS y lineamientos de vacunación contra VPH.", "Sociedad Argentina de Dermatología — Consenso de VPH."],
    pearls: ["Coliflor indolora = condiloma.", "Testear VIH y sífilis.", "Vacuna a los 11 años, varones y mujeres."],
    pitfalls: ["Confundir con condilomas planos.", "Usar productos de verrugas comunes."],
    tribunal: [
      qa("¿Qué cánceres se asocian al VPH?", "Cuello uterino (casi todos), ano, pene, vulva, vagina y orofaringe, sobre todo por los tipos 16 y 18."),
      qa("¿Cuál es el esquema de vacunación contra el VPH en Argentina?", "Se aplica a varones y mujeres a los 11 años según el esquema vigente del Calendario Nacional, y hay esquemas especiales para personas con VIH, trasplantadas o con inmunosupresión hasta los 26 años."),
      qa("¿Qué es el molusco contagioso?", "Una infección viral (poxvirus) con pápulas perladas umbilicadas; en niños es frecuente en el cuerpo y en adultos puede ser de transmisión sexual o marcar inmunosupresión."),
    ],
  },
};
