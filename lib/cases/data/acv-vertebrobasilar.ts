import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvVertebrobasilar: ClinicalCase = {
  id: "acv-cerebeloso-vertebrobasilar",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Hipertenso, diabético y fumador." },
  frequency: "frecuente",
  intro: "“Hace dos horas todo me da vueltas, vomito y no puedo caminar. Veo doble.”",
  vitals: { TA: "182/98 mmHg", FC: "84 lpm", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "96 %", Glucemia: "176 mg/dl", Glasgow: "15/15" },
  anamnesis: [
    act("hora", "¿Hora de inicio?", "clave", "“Hace dos horas.”", "Ventana."),
    act("diplopia", "¿Visión doble, dificultad para tragar o hablar?", "clave", "“Veo doble.”", "Signos centrales."),
    act("riesgo", "¿Factores vasculares?", "clave", "“Presión, diabetes, fumo.”", "Riesgo."),
    act("previos", "¿Episodios transitorios?", "util", "“Mareos breves la semana pasada.”", "AIT posterior."),
    act("anticoag", "¿Anticoagulantes?", "util", "“No.”", "Trombólisis."),
    act("barrio", "¿Dónde vivís?", "neutro", "“En Alberdi.”", "No orienta."),
  ],
  exam: [
    act("hints", "HINTS", "clave", "Impulso cefálico normal; nistagmo que cambia de dirección; desviación vertical.", "Central."),
    act("cerebelo", "Marcha y coordinación", "clave", "No puede pararse; dismetría derecha.", "Cerebelo."),
    act("pares", "Pares craneales", "util", "Diplopía.", "Tronco."),
  ],
  studies: [
    study("Imágenes", "tc", "TC sin contraste", "clave", "Sin sangrado.", "Habilita trombólisis."),
    study("Imágenes", "angio", "AngioTC", "clave", "Oclusión de arteria vertebral derecha.", "Causa."),
    study("Imágenes", "rmn", "RM con difusión", "clave", "Infarto cerebeloso derecho.", "Confirma."),
    study("Otros", "vppb", "Maniobra de Epley y alta", "riesgoso", "No se realizó.", "Es un ACV."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("acv-cerebelo", "ACV isquémico cerebeloso por oclusión de arteria vertebral", true, "Vértigo con HINTS central, ataxia, diplopía y RM."),
      dx("neuritis", "Neuritis vestibular", false, "HINTS central."),
      dx("vppb", "VPPB", false, "Continuo, con signos centrales."),
      dx("hemorragia", "Hemorragia cerebelosa", false, "TC sin sangre."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombolisis", "Trombólisis o trombectomía según ventana e imagen", "clave", "Reperfusión."),
      mg("unidad", "Unidad de ACV con vigilancia de edema y hidrocefalia", "clave", "Riesgo de compresión del tronco."),
      mg("neurocirugia", "Neurocirugía si hay efecto de masa", "util", "Descompresión."),
      mg("prevencion", "Prevención secundaria", "clave", "Riesgo."),
      mg("alta", "Alta con meclizina", "riesgoso", "Error frecuente."),
      mg("bajar-presion", "Bajar la presión a 120/80", "riesgoso", "Reduce perfusión."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico cerebeloso derecho por oclusión de la arteria vertebral, en varón de 70 años.",
    pathologies: [
      { name: "ACV de fosa posterior", role: "principal", why: "Isquemia cerebelosa." },
      { name: "Riesgo de edema e hidrocefalia", role: "asociada", why: "Complicaciones." },
      { name: "Neuritis, VPPB", role: "diferencial", why: "Vértigos periféricos." },
    ],
    reasoning: [
      "Causa: aterotrombosis vertebral.",
      "Mecanismo: isquemia del cerebelo.",
      "Consecuencia: vértigo, ataxia y riesgo de compresión del tronco.",
    ],
    epidemiology:
      "Los ACV de fosa posterior se confunden con vértigos periféricos y se diagnostican tarde. La TC es poco sensible. En mayores con factores de riesgo, el vértigo continuo merece HINTS y RM.",
    management: [
      "HINTS.",
      "Imagen.",
      "Reperfusión.",
      "Vigilar edema.",
    ],
    sources: ["Sociedad Neurológica Argentina — ACV de circulación posterior.", "AHA/ASA — Acute Ischemic Stroke Guidelines."],
    pearls: ["Vértigo con diplopía: central.", "HINTS.", "TC no alcanza."],
    pitfalls: ["Alta con meclizina.", "Confiar en la TC."],
    tribunal: [
      qa("¿Qué son las cinco D del ACV posterior?", "Diplopía, disartria, disfagia, dismetría y mareo (dizziness)."),
      qa("¿Qué es el síndrome de Wallenberg?", "Infarto bulbar lateral con disfagia, Horner y alteración sensitiva cruzada."),
      qa("¿Por qué el ACV cerebeloso puede ser mortal?", "El edema comprime el tronco y produce hidrocefalia."),
    ],
  },
};
