import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gravesEmbarazo: ClinicalCase = {
  id: "hipertiroidismo-graves-embarazo",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Embarazo de 9 semanas. Bocio desde hace un año sin estudiar." },
  frequency: "poco-frecuente",
  intro: "“Tengo palpitaciones, calor, me tiemblan las manos y no subo de peso aunque como mucho.”",
  vitals: { TA: "128/68 mmHg", FC: "118 lpm", "T°": "37,2 °C", Peso: "54 kg" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo? ¿Antes del embarazo?", "clave", "“Antes del embarazo ya.”", "No es transitorio."),
    act("ojos", "¿Ojos irritados o saltones?", "clave", "“Un poco saltones.”", "Orbitopatía."),
    act("vomitos", "¿Vómitos intensos?", "clave", "“No mucho.”", "Diferencial con hiperemesis."),
    act("familia", "¿Familia con tiroides?", "util", "“Mi mamá.”", "Autoinmunidad."),
    act("cigarrillo", "¿Fumás?", "util", "“No.”", "Orbitopatía."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy cajera.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Tiroides", "clave", "Bocio difuso con soplo.", "Graves."),
    act("ojos-ex", "Ojos", "clave", "Exoftalmos leve.", "Graves."),
    act("piel", "Temblor y piel", "util", "Temblor fino.", "Tirotoxicosis."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH, T4 libre y T3", "clave", "TSH suprimida; T4 libre muy alta.", "Hipertiroidismo."),
    study("Laboratorio", "trab", "TRAb", "clave", "Positivos y altos.", "Graves; riesgo fetal."),
    study("Imágenes", "eco-fetal", "Ecografía obstétrica", "clave", "Embrión acorde.", "Base."),
    study("Otros", "centellograma", "Centellograma o yodo radiactivo", "riesgoso", "No se realizó.", "Contraindicado en el embarazo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("graves", "Hipertiroidismo por enfermedad de Graves en el primer trimestre", true, "Bocio con soplo, exoftalmos, TRAb positivos e inicio previo."),
      dx("gestacional", "Hipertiroidismo gestacional transitorio por hCG", false, "Bocio, orbitopatía y TRAb."),
      dx("mola", "Mola", false, "Ecografía normal."),
      dx("ansiedad", "Ansiedad", false, "Laboratorio alterado."),
      dx("nodulo", "Nódulo tóxico", false, "Bocio difuso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ptu", "Propiltiouracilo en el primer trimestre, luego metimazol", "clave", "Menor teratogenicidad en el primero."),
      mg("dosis", "La menor dosis para T4 libre en el límite alto", "clave", "Evita hipotiroidismo fetal."),
      mg("propranolol", "Propranolol por poco tiempo", "util", "Síntomas."),
      mg("fetal", "Vigilancia fetal por TRAb altos", "clave", "Riesgo de hipertiroidismo fetal y neonatal."),
      mg("yodo", "Yodo radiactivo", "riesgoso", "Contraindicado."),
      mg("sin-tto", "No tratar hasta el parto", "riesgoso", "Riesgo materno y fetal."),
    ],
  },
  debrief: {
    diagnosis: "Hipertiroidismo por enfermedad de Graves con orbitopatía leve, en embarazo de 9 semanas.",
    pathologies: [
      { name: "Enfermedad de Graves", role: "principal", why: "Autoinmunidad con TRAb." },
      { name: "Riesgo fetal", role: "asociada", why: "TRAb atraviesan la placenta." },
      { name: "Hipertiroidismo gestacional, mola", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: anticuerpos que estimulan el receptor de TSH.",
      "Mecanismo: producción hormonal excesiva.",
      "Consecuencia: riesgo de aborto, preeclampsia, parto prematuro y alteración tiroidea fetal.",
    ],
    epidemiology:
      "Es la causa principal de hipertiroidismo autoinmune en el embarazo, aunque el gestacional transitorio por hCG es más frecuente en el primer trimestre. El tratamiento cambia de fármaco según el trimestre. Los TRAb altos requieren vigilancia del feto.",
    management: [
      "TSH, T4 libre y TRAb.",
      "Antitiroideos según trimestre.",
      "Vigilancia fetal.",
      "Neonatología al nacer.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Tiroides y embarazo.", "American Thyroid Association — Thyroid Disease in Pregnancy."],
    pearls: ["PTU en el primer trimestre.", "TRAb altos: feto.", "Sin yodo radiactivo."],
    pitfalls: ["Confundir con gestacional.", "Sobretratar."],
    tribunal: [
      qa("¿Por qué se cambia de PTU a metimazol?", "PTU tiene riesgo hepático; el metimazol se asocia a malformaciones en el primer trimestre."),
      qa("¿Qué efectos adversos comparten los antitiroideos?", "Agranulocitosis, rash y hepatotoxicidad."),
      qa("¿Qué es el hipertiroidismo gestacional transitorio?", "Tirotoxicosis leve por hCG en el primer trimestre, sin bocio ni TRAb."),
    ],
  },
};
