import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiponatremiaPolidipsia: ClinicalCase = {
  id: "hiponatremia-polidipsia",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Esquizofrenia en tratamiento con risperidona. Vive en un hogar de medio camino." },
  frequency: "poco-frecuente",
  intro: "La operadora del hogar: “Toma agua de la canilla todo el día, como 8 litros. Hoy vomitó, está confuso y tuvo una convulsión.”",
  vitals: { TA: "128/80 mmHg", FC: "88 lpm", FR: "18 rpm", "SatO₂": "97 %", "T°": "36,6 °C", Glasgow: "12/15" },
  anamnesis: [
    act("agua", "¿Cuánta agua toma?", "clave", "“Botellas y botellas, 7–8 litros.”", "Polidipsia psicógena."),
    act("convulsion", "¿Cómo fue la convulsión?", "clave", "“Generalizada, un minuto.”", "Hiponatremia grave sintomática."),
    act("farmacos", "¿Toma otras cosas: diuréticos, carbamazepina, ISRS?", "clave", "“Solo risperidona.”", "Fármacos que causan hiponatremia."),
    act("orina", "¿Orina mucho?", "util", "“Todo el tiempo.”", "Orina diluida."),
    act("alcohol", "¿Toma cerveza o mate en exceso?", "util", "“No.”", "Potomanía de cerveza."),
    act("taller", "¿Hace algún taller?", "neutro", "“Carpintería.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Neurológico", "clave", "Somnoliento, sin foco.", "Encefalopatía hiponatrémica."),
    act("volemia", "Volemia", "clave", "Euvolémico.", "Hiponatremia euvolémica."),
    act("trauma", "Traumatismos", "util", "Sin lesiones.", "Por la convulsión."),
  ],
  studies: [
    study("Laboratorio", "sodio", "Sodio, osmolalidad plasmática y glucemia", "clave", "Na 116 mEq/l, osmolalidad 240 mOsm/kg.", "Hiponatremia hipotónica grave."),
    study("Laboratorio", "orina", "Osmolalidad y sodio urinarios", "clave", "Osmolalidad urinaria 70 mOsm/kg.", "Orina máximamente diluida: exceso de agua, no SIADH."),
    study("Laboratorio", "tsh-cortisol", "TSH y cortisol", "util", "Normales.", "Otras causas."),
    study("Imágenes", "tac", "TC de cerebro", "util", "Sin lesiones.", "Convulsión y caída."),
    study("Otros", "restriccion-sola", "Solo restricción de agua con convulsiones", "riesgoso", "No se hizo.", "Es una emergencia: requiere salina hipertónica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("polidipsia", "Hiponatremia hipotónica grave sintomática por polidipsia psicógena", true, "Ingesta de 8 litros, sodio de 116 con convulsión y orina máximamente diluida (70 mOsm/kg), euvolémico."),
      dx("siadh", "SIADH", false, "En el SIADH la orina está concentrada (más de 100 mOsm/kg)."),
      dx("hipovolemica", "Hiponatremia hipovolémica", false, "Euvolémico."),
      dx("pseudohipo", "Pseudohiponatremia", false, "Osmolalidad baja."),
      dx("epilepsia", "Epilepsia", false, "La convulsión se explica por el sodio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hipertonica", "Bolo de salina al 3 % 150 ml en 20 minutos, repetir según clínica", "clave", "Hiponatremia grave sintomática."),
      mg("limite", "No corregir más de 8–10 mEq/l en 24 horas", "clave", "Riesgo de desmielinización osmótica."),
      mg("diuresis", "Controlar diuresis y sodio cada 2–4 horas", "clave", "Al dejar de tomar agua orina mucho y el sodio sube rápido."),
      mg("desmopresina", "Desmopresina o dextrosa al 5 % si la corrección es demasiado rápida", "util", "Relowering."),
      mg("restriccion", "Restricción hídrica y abordaje psiquiátrico", "util", "Prevención."),
      mg("corregir-rapido", "Normalizar el sodio en 24 horas", "riesgoso", "Mielinólisis pontina."),
    ],
  },
  debrief: {
    diagnosis: "Hiponatremia hipotónica grave con convulsión por polidipsia psicógena, en un hombre de 38 años con esquizofrenia.",
    pathologies: [
      { name: "Hiponatremia por polidipsia primaria", role: "principal", why: "Ingesta de agua que supera la capacidad de excretarla." },
      { name: "Esquizofrenia", role: "asociada", why: "Polidipsia frecuente en psicosis crónica." },
      { name: "SIADH", role: "diferencial", why: "Se distingue por la osmolalidad urinaria." },
    ],
    reasoning: [
      "Causa: ingesta masiva de agua.",
      "Mecanismo: el riñón diluye al máximo pero no alcanza a excretar más de 10–15 litros por día.",
      "Consecuencia: edema cerebral, convulsiones y riesgo de muerte.",
    ],
    epidemiology:
      "La polidipsia afecta a hasta un 20 % de las personas con esquizofrenia institucionalizadas y una parte hace hiponatremia. Su corrección suele ser demasiado rápida porque, al cortar el agua, aparece diuresis acuosa intensa.",
    management: [
      "Salina hipertónica si hay síntomas graves.",
      "Límite de corrección.",
      "Control estrecho de diuresis.",
      "Prevención.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Hiponatremia.", "European Clinical Practice Guideline on diagnosis and treatment of hyponatraemia."],
    pearls: ["Orina con menos de 100 mOsm: exceso de agua.", "Convulsión: 3 % en bolo.", "Ojo con la sobrecorrección."],
    pitfalls: ["Solo restricción hídrica en un paciente grave.", "Corregir rápido."],
    tribunal: [
      qa("¿Cómo se distingue la polidipsia primaria del SIADH?", "Por la osmolalidad urinaria: menor de 100 mOsm/kg en la polidipsia y mayor de 100 en el SIADH."),
      qa("¿Qué es la desmielinización osmótica?", "La lesión de mielina, sobre todo pontina, por corregir la hiponatremia crónica demasiado rápido; da cuadriparesia y disartria días después."),
      qa("¿Cuándo se usa salina hipertónica en la hiponatremia?", "Con síntomas graves: convulsiones, coma, vómitos persistentes o deterioro del sensorio."),
    ],
  },
};
