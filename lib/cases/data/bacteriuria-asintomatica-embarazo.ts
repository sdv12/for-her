import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bacteriuriaAsintomaticaEmbarazo: ClinicalCase = {
  id: "bacteriuria-asintomatica-embarazo",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Embarazo de 14 semanas, segundo hijo. Control prenatal." },
  frequency: "muy-frecuente",
  intro: "“Vengo con los análisis del primer trimestre. Me siento bien, no tengo ardor.”",
  vitals: { TA: "108/66 mmHg", FC: "84 lpm", "T°": "36,5 °C", Peso: "64 kg" },
  anamnesis: [
    act("sintomas", "¿Ardor, urgencia, fiebre o dolor lumbar?", "clave", "“Nada.”", "Asintomática."),
    act("previos", "¿Infecciones urinarias previas?", "clave", "“En el embarazo anterior, una pielonefritis.”", "Riesgo."),
    act("alergias", "¿Alergias a antibióticos?", "clave", "“No.”", "Elección."),
    act("diabetes", "¿Diabetes?", "util", "“No.”", "Factor."),
    act("contracciones", "¿Contracciones o pérdidas?", "util", "“No.”", "Bienestar."),
    act("hijo", "¿Cuántos años tiene tu hijo?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("lumbar", "Puño percusión", "clave", "Negativa.", "Sin pielonefritis."),
    act("obstetrico", "Altura uterina y latidos", "clave", "Acordes.", "Normal."),
    act("general", "Hidratación y temperatura", "util", "Normales.", "Sin infección sistémica."),
  ],
  studies: [
    study("Laboratorio", "urocultivo", "Urocultivo de tamizaje", "clave", "E. coli más de 100.000 UFC/ml, sensible a cefalexina y nitrofurantoína.", "Bacteriuria."),
    study("Laboratorio", "control", "Urocultivo de control tras tratar", "clave", "Se pide 1 a 2 semanas después.", "Comprueba erradicación."),
    study("Imágenes", "eco-renal", "Ecografía renal si recurre", "util", "No corresponde ahora.", "Busca causas."),
    study("Otros", "tira-sola", "Usar solo tira reactiva para decidir", "riesgoso", "No se realizó.", "Poco sensible."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ba", "Bacteriuria asintomática en el embarazo", true, "Urocultivo positivo sin síntomas."),
      dx("cistitis", "Cistitis", false, "No tiene síntomas."),
      dx("pielo", "Pielonefritis", false, "Sin fiebre ni dolor lumbar."),
      dx("contaminacion", "Contaminación", false, "Un solo germen con recuento alto."),
      dx("normal", "Hallazgo sin importancia", false, "En el embarazo se trata."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Cefalexina o nitrofurantoína (evitar al término) 5 a 7 días", "clave", "Previene pielonefritis."),
      mg("control", "Urocultivo de control y luego mensual por recurrencia previa", "clave", "Seguimiento."),
      mg("hidratacion", "Hidratación y pautas de alarma", "util", "Prevención."),
      mg("sin-tto", "No tratar por ser asintomática", "riesgoso", "Riesgo de pielonefritis y parto prematuro."),
      mg("quinolona", "Ciprofloxacina", "riesgoso", "Se evita en el embarazo."),
      mg("profilaxis-largo", "Profilaxis continua desde ya", "innecesario", "Solo si recurre."),
    ],
  },
  debrief: {
    diagnosis: "Bacteriuria asintomática por E. coli en embarazo de 14 semanas.",
    pathologies: [
      { name: "Bacteriuria asintomática", role: "principal", why: "Infección urinaria sin síntomas." },
      { name: "Antecedente de pielonefritis", role: "asociada", why: "Mayor riesgo." },
      { name: "Cistitis, pielonefritis, contaminación", role: "diferencial", why: "Otras situaciones." },
    ],
    reasoning: [
      "Causa: colonización por E. coli.",
      "Mecanismo: la progesterona dilata la vía urinaria y favorece el ascenso.",
      "Consecuencia: pielonefritis, parto prematuro y bajo peso.",
    ],
    epidemiology:
      "Afecta a cerca del 2 al 10 % de las embarazadas. Sin tratamiento, hasta un tercio desarrolla pielonefritis. Por eso el urocultivo de tamizaje es parte del control prenatal en Argentina. Fuera del embarazo, la bacteriuria asintomática no se trata en general.",
    management: [
      "Urocultivo.",
      "Tratar.",
      "Control.",
      "Vigilancia.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del embarazo.", "FASGO — Infección urinaria y embarazo."],
    pearls: ["En el embarazo se trata.", "Urocultivo de control.", "Evitar quinolonas."],
    pitfalls: ["No tratar.", "No controlar."],
    tribunal: [
      qa("¿En quiénes se trata la bacteriuria asintomática?", "En embarazadas y antes de procedimientos urológicos con sangrado de mucosa."),
      qa("¿Cuándo se pide el urocultivo?", "En el primer control prenatal, y según riesgo luego."),
      qa("¿Qué antibióticos se evitan en el embarazo?", "Quinolonas, tetraciclinas, y TMS cerca del término o en primer trimestre."),
    ],
  },
};
