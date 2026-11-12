import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const diabetesInsipida: ClinicalCase = {
  id: "diabetes-insipida-central-postraumatica",
  level: 3,
  area: "Endocrinología",
  setting: "Internación",
  patient: { age: 23, ageUnit: "años", sex: "M", context: "Internado por un TEC grave en moto hace 4 días." },
  frequency: "poco-frecuente",
  intro: "Enfermería avisa: “Orinó 7 litros en 24 horas, la orina es como agua y pide agua todo el tiempo.”",
  vitals: { TA: "112/68 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "36,8 °C", "SatO₂": "97 %", Glucemia: "96 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("diuresis", "¿Cuánto orina y bebe?", "clave", "7 litros de diuresis.", "Poliuria."),
    act("trauma", "¿Qué lesión tuvo?", "clave", "Fractura de base de cráneo.", "Lesión hipotalámica."),
    act("farmacos", "¿Recibió manitol, diuréticos o litio?", "clave", "No.", "Otras causas."),
    act("glucemia", "¿Glucemia controlada?", "util", "Normal.", "Excluye diabetes."),
    act("sueros", "¿Qué sueros recibe?", "util", "Solución fisiológica a mantenimiento.", "Excluye poliuria por sueros."),
    act("familia", "¿Lo visita la familia?", "neutro", "Sí, la madre.", "No orienta."),
  ],
  exam: [
    act("hidratacion", "Mucosas", "clave", "Secas.", "Deshidratación."),
    act("neuro", "Examen neurológico", "clave", "Algo irritable.", "Hipernatremia."),
    act("peso", "Peso", "util", "Bajó 2 kg.", "Pérdida de agua."),
  ],
  studies: [
    study("Laboratorio", "osmolaridad", "Sodio, osmolaridad plasmática y urinaria", "clave", "Na 152; osmolaridad plasmática 310; urinaria 110.", "Orina diluida con plasma concentrado."),
    study("Laboratorio", "desmopresina", "Respuesta a desmopresina", "clave", "La osmolaridad urinaria sube más de 50 %.", "Central."),
    study("Imágenes", "rmn", "RM de hipófisis", "util", "Lesión del tallo.", "Confirma."),
    study("Otros", "restriccion", "Prueba de restricción hídrica con sodio de 152", "riesgoso", "No se realizó.", "Ya está hipernatrémico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("di-central", "Diabetes insípida central postraumática con hipernatremia", true, "Poliuria hipotónica tras TEC con respuesta a desmopresina."),
      dx("nefrogenica", "Diabetes insípida nefrogénica", false, "Responde a desmopresina."),
      dx("polidipsia", "Polidipsia primaria", false, "Tendría sodio bajo."),
      dx("siadh", "SIADH", false, "Es lo opuesto."),
      dx("pierde-sal", "Síndrome pierde sal cerebral", false, "Daría hiponatremia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("desmopresina", "Desmopresina", "clave", "Tratamiento."),
      mg("agua", "Reponer agua libre gradualmente", "clave", "Corrige el sodio."),
      mg("controles", "Controles de sodio y diuresis frecuentes", "clave", "Evita sobrecorrección."),
      mg("trifasica", "Vigilar la evolución trifásica, con SIADH posterior", "util", "Puede invertirse."),
      mg("rapido", "Bajar el sodio rápido", "riesgoso", "Edema cerebral."),
      mg("fisiologica", "Más solución fisiológica", "riesgoso", "Aporta sodio."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes insípida central postraumática con hipernatremia, en varón de 23 años tras TEC grave.",
    pathologies: [
      { name: "Diabetes insípida central", role: "principal", why: "Déficit de vasopresina." },
      { name: "Hipernatremia", role: "asociada", why: "Consecuencia." },
      { name: "Nefrogénica, polidipsia, SIADH", role: "diferencial", why: "Otros trastornos del agua." },
    ],
    reasoning: [
      "Causa: lesión del hipotálamo o tallo hipofisario.",
      "Mecanismo: sin ADH, el riñón no concentra la orina.",
      "Consecuencia: poliuria, deshidratación e hipernatremia.",
    ],
    epidemiology:
      "Aparece tras neurocirugías, TEC graves y tumores de la región. Si la persona no puede beber, la hipernatremia aparece rápido. Puede ser transitoria, permanente o trifásica.",
    management: [
      "Medir osmolaridades.",
      "Desmopresina.",
      "Reponer agua.",
      "Controles seriados.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Trastornos del agua.", "Endocrine Society — Arginine Vasopressin Deficiency."],
    pearls: ["Orina diluida con sodio alto.", "Desmopresina: central si responde.", "Ojo con la fase de SIADH."],
    pitfalls: ["Restricción hídrica con sodio alto.", "Corregir rápido."],
    tribunal: [
      qa("¿Cómo se define poliuria?", "Más de 3 litros por día en adultos, o más de 40 a 50 ml/kg."),
      qa("¿Qué fármacos causan diabetes insípida nefrogénica?", "El litio, sobre todo, y la demeclociclina."),
      qa("¿A qué velocidad se corrige la hipernatremia crónica?", "No más de 10 a 12 mEq/l por día."),
    ],
  },
};
