import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const herpesGenital: ClinicalCase = {
  id: "herpes-genital-primoinfeccion",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 22, ageUnit: "años", sex: "F", context: "Pareja nueva hace un mes. Usa preservativo a veces." },
  frequency: "frecuente",
  intro: "“Me salieron ampollitas en la vulva que me arden muchísimo. Me duele hasta hacer pis y tengo fiebre.”",
  vitals: { TA: "112/70 mmHg", FC: "92 lpm", "T°": "38,1 °C" },
  anamnesis: [
    act("lesiones", "¿Cómo son las lesiones y cuándo aparecieron?", "clave", "“Ampollitas que se rompieron, hace tres días.”", "Vesículas que dejan úlceras."),
    act("dolor", "¿Duelen?", "clave", "“Muchísimo, y arde al orinar.”", "Las úlceras herpéticas son dolorosas."),
    act("previas", "¿Le pasó antes?", "clave", "“Nunca.”", "Primoinfección."),
    act("sistemicos", "¿Fiebre, dolor de cabeza, ganglios?", "util", "“Fiebre y ganglios en la ingle.”", "Primoinfección florida."),
    act("embarazo", "¿Puede estar embarazada?", "util", "“No, tomo pastillas.”", "Manejo distinto."),
    act("estudio", "¿Estudia o trabaja?", "neutro", "“Estudio Diseño.”", "No orienta."),
  ],
  exam: [
    act("vulva", "Examen genital", "clave", "Múltiples úlceras superficiales dolorosas sobre base eritematosa en labios menores, algunas vesículas.", "Herpes."),
    act("ganglios", "Adenopatías inguinales", "clave", "Bilaterales, dolorosas.", "Primoinfección."),
    act("retencion", "Globo vesical", "util", "Ausente.", "Complicación posible."),
  ],
  studies: [
    study("Laboratorio", "pcr", "PCR de VHS de una lesión", "clave", "VHS-2 positivo.", "Confirma."),
    study("Laboratorio", "its", "VDRL, VIH, hepatitis B y C, clamidia y gonococo", "clave", "Negativos.", "ITS asociadas."),
    study("Laboratorio", "tzanck", "Citodiagnóstico de Tzanck", "util", "Células multinucleadas.", "Apoya, menos específico."),
    study("Imágenes", "eco", "Ecografía pelviana", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("herpes", "Primoinfección por herpes simple genital tipo 2", true, "Vesículas y úlceras múltiples dolorosas, fiebre, adenopatías y PCR positiva."),
      dx("sifilis", "Sífilis primaria", false, "El chancro es único e indoloro."),
      dx("candidiasis", "Candidiasis vulvar", false, "No hace úlceras ni fiebre."),
      dx("chancroide", "Chancroide", false, "Raro, úlcera única profunda y PCR positiva para herpes."),
      dx("behcet", "Enfermedad de Behçet", false, "Sin aftas orales ni recurrencias."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aciclovir", "Aciclovir o valaciclovir oral por 7 a 10 días", "clave", "Acorta la primoinfección."),
      mg("analgesia", "Analgesia y baños de asiento; orinar en el agua si arde", "clave", "Síntomas."),
      mg("consejeria", "Consejería: preservativo, avisar a la pareja, recurrencias", "clave", "Prevención."),
      mg("supresion", "Plan de supresión si tiene recurrencias frecuentes", "util", "Futuro."),
      mg("corticoide-topico", "Corticoide tópico sobre las úlceras", "riesgoso", "Empeora la infección."),
      mg("penicilina", "Penicilina benzatínica empírica", "innecesario", "VDRL negativa y no es sífilis."),
    ],
  },
  debrief: {
    diagnosis: "Primoinfección por herpes simple genital tipo 2, en mujer de 22 años.",
    pathologies: [
      { name: "Herpes genital", role: "principal", why: "ITS frecuente." },
      { name: "Riesgo de otras ITS", role: "asociada", why: "Mismo comportamiento." },
      { name: "Sífilis, chancroide", role: "diferencial", why: "Otras úlceras genitales." },
    ],
    reasoning: [
      "Causa: virus herpes simple tipo 2 por contacto sexual.",
      "Mecanismo: replicación en el epitelio y latencia en ganglios sacros.",
      "Consecuencia: úlceras dolorosas y recurrencias.",
    ],
    epidemiology:
      "El herpes es la causa más frecuente de úlcera genital. Mucha gente se contagia de parejas sin síntomas. En el embarazo, una primoinfección cerca del parto tiene alto riesgo de herpes neonatal.",
    management: [
      "Clínica y PCR.",
      "Antiviral.",
      "Pesquisa de ITS.",
      "Consejería.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS.", "CDC — Sexually Transmitted Infections Treatment Guidelines."],
    pearls: ["Úlcera dolorosa múltiple: herpes.", "Úlcera indolora única: sífilis.", "Pesquisá otras ITS."],
    pitfalls: ["Corticoides tópicos.", "No ofrecer VIH."],
    tribunal: [
      qa("¿Qué riesgo hay si ocurre al final del embarazo?", "Herpes neonatal grave; se considera cesárea si hay lesiones al parto."),
      qa("¿Qué es la terapia supresiva?", "Antiviral diario para quienes tienen muchas recurrencias, que reduce brotes y contagio."),
      qa("¿Por qué recurre?", "Porque el virus queda latente en los ganglios sensitivos sacros."),
    ],
  },
};
