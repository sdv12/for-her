import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const zosterRamsayHunt: ClinicalCase = {
  id: "zoster-otico-ramsay-hunt",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Diabético. Muy estresado por una mudanza." },
  frequency: "poco-frecuente",
  intro: "“Hace tres días me duele mucho el oído derecho, me salieron ampollas en la oreja y hoy se me torció la cara.”",
  vitals: { TA: "134/80 mmHg", FC: "82 lpm", "T°": "37,6 °C", Glucemia: "198 mg/dl" },
  anamnesis: [
    act("dolor", "¿Cómo empezó el dolor?", "clave", "“Muy fuerte en el oído, antes de las ampollas.”", "Dolor prodrómico."),
    act("cara", "¿Qué le pasa en la cara?", "clave", "“No puedo cerrar el ojo derecho y se me cae la comida.”", "Parálisis facial periférica."),
    act("audicion", "¿Escucha bien? ¿Mareos o zumbido?", "clave", "“Escucho menos y tengo zumbido.”", "Compromiso del VIII par."),
    act("varicela", "¿Tuvo varicela?", "util", "“De chico.”", "Reactivación."),
    act("vacuna", "¿Se vacunó contra el zóster?", "util", "“No.”", "Prevención."),
    act("mudanza", "¿A dónde se muda?", "neutro", "“A Carlos Paz.”", "No orienta."),
  ],
  exam: [
    act("oreja", "Pabellón y conducto", "clave", "Vesículas en concha y conducto auditivo externo derechos.", "Zóster ótico."),
    act("facial", "Pares craneales", "clave", "Parálisis facial periférica derecha completa, incluye frente.", "VII par periférico."),
    act("ojo", "Cierre ocular y córnea", "util", "Cierre incompleto, córnea sana.", "Riesgo de queratitis."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Suficiente.", "Tríada típica."),
    study("Otros", "audiometria", "Audiometría", "clave", "Hipoacusia neurosensorial leve derecha.", "Compromiso coclear."),
    study("Laboratorio", "pcr-vzv", "PCR de VZV de vesícula", "util", "Positiva.", "Confirma si hay dudas."),
    study("Imágenes", "tc", "TC de cerebro urgente", "innecesario", "No se realizó.", "Parálisis periférica típica con vesículas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ramsay-hunt", "Síndrome de Ramsay Hunt (zóster ótico) con parálisis facial y compromiso coclear", true, "Otalgia, vesículas en conducto y concha, parálisis facial periférica e hipoacusia."),
      dx("bell", "Parálisis de Bell", false, "Hay vesículas y compromiso auditivo."),
      dx("otitis-externa", "Otitis externa", false, "Hay parálisis facial y vesículas."),
      dx("acv", "ACV", false, "La parálisis compromete la frente: periférica."),
      dx("otitis-maligna", "Otitis externa maligna", false, "Vesículas y sin otorrea purulenta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiviral", "Valaciclovir o aciclovir", "clave", "Reduce secuelas."),
      mg("corticoides", "Corticoides orales con control de la glucemia", "clave", "Mejoran la recuperación facial."),
      mg("ojo", "Protección ocular: lágrimas, gel y oclusión nocturna", "clave", "Prevenir queratitis."),
      mg("vacuna", "Vacuna recombinante contra zóster al recuperarse", "util", "Prevención."),
      mg("gotas-atb", "Solo gotas óticas antibióticas", "riesgoso", "No trata la causa."),
      mg("sin-ojo", "No proteger el ojo", "riesgoso", "Úlcera corneal."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de Ramsay Hunt (zóster ótico) derecho con parálisis facial periférica e hipoacusia neurosensorial, en varón diabético de 58 años.",
    pathologies: [
      { name: "Síndrome de Ramsay Hunt", role: "principal", why: "Reactivación de VZV en el ganglio geniculado." },
      { name: "Parálisis facial e hipoacusia", role: "asociada", why: "Compromiso del VII y VIII par." },
      { name: "Parálisis de Bell, otitis externa", role: "diferencial", why: "Otras causas de parálisis facial y otalgia." },
    ],
    reasoning: [
      "Causa: virus varicela-zóster latente en el ganglio geniculado.",
      "Mecanismo: reactivación con estrés y diabetes, e inflamación de los nervios VII y VIII.",
      "Consecuencia: vesículas, parálisis facial, hipoacusia y vértigo.",
    ],
    epidemiology:
      "Es la segunda causa de parálisis facial periférica atraumática y tiene peor pronóstico que la de Bell. Afecta más a mayores de 50 e inmunodeprimidos. Las vesículas pueden aparecer después de la parálisis.",
    management: [
      "Mirar el oído.",
      "Antiviral y corticoide.",
      "Proteger el ojo.",
      "Audiometría.",
    ],
    sources: ["Sociedad Argentina de Infectología — Herpes zóster.", "AAO-HNS — Clinical Practice Guideline: Bell's Palsy."],
    pearls: ["Toda parálisis facial: mirá el oído.", "Peor pronóstico que Bell.", "Protegé la córnea."],
    pitfalls: ["Llamarlo Bell.", "Gotas solas."],
    tribunal: [
      qa("¿Cómo se diferencia la parálisis facial central de la periférica?", "En la central se respeta la frente; en la periférica se afecta toda la hemicara."),
      qa("¿Qué ganglio se afecta?", "El ganglio geniculado del nervio facial."),
      qa("¿Qué vacuna contra el zóster se recomienda?", "La recombinante adyuvantada, en dos dosis, en mayores de 50."),
    ],
  },
};
