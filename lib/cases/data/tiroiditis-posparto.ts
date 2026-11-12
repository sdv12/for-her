import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tiroiditisPosparto: ClinicalCase = {
  id: "tiroiditis-posparto",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Parto hace 3 meses. Amamanta. Anticuerpos antitiroideos positivos en el embarazo." },
  frequency: "frecuente",
  intro: "“Tengo palpitaciones, estoy nerviosa, duermo mal y bajé de peso. Pensé que era por el bebé.”",
  vitals: { TA: "122/74 mmHg", FC: "108 lpm", "T°": "36,8 °C", Peso: "58 kg" },
  anamnesis: [
    act("tiempo", "¿Cuándo empezó?", "clave", "“Hace un mes.”", "Primeros meses posparto."),
    act("dolor", "¿Dolor en el cuello?", "clave", "“No.”", "Indolora."),
    act("ojos", "¿Ojos saltones o irritados?", "clave", "“No.”", "Graves daría orbitopatía."),
    act("animo", "¿Tristeza o llanto?", "util", "“Algo.”", "Depresión posparto."),
    act("lactancia", "¿Amamantás?", "util", "“Sí.”", "Fármacos."),
    act("bebe", "¿Cómo se llama?", "neutro", "“Lola.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Tiroides", "clave", "Levemente aumentada, indolora.", "Tiroiditis."),
    act("temblor", "Temblor y piel", "clave", "Temblor fino, piel caliente.", "Tirotoxicosis."),
    act("ojos-ex", "Ojos", "util", "Sin orbitopatía.", "Excluye Graves."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH y T4 libre", "clave", "TSH suprimida; T4 libre alta.", "Tirotoxicosis."),
    study("Laboratorio", "trab", "TRAb y anti-TPO", "clave", "TRAb negativos; anti-TPO positivos.", "No es Graves."),
    study("Imágenes", "eco", "Ecografía con Doppler", "util", "Flujo disminuido.", "Destructiva."),
    study("Otros", "centellograma", "Centellograma con yodo radiactivo", "riesgoso", "No se realizó.", "Contraindicado durante la lactancia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tiroiditis", "Tiroiditis posparto en fase tirotóxica", true, "Posparto, indolora, anti-TPO, TRAb negativos y flujo bajo."),
      dx("graves", "Enfermedad de Graves", false, "TRAb negativos y sin orbitopatía."),
      dx("subaguda", "Tiroiditis subaguda", false, "No duele."),
      dx("ansiedad", "Ansiedad posparto", false, "Laboratorio alterado."),
      dx("hashimoto", "Hipotiroidismo", false, "Fase tirotóxica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("betabloqueante", "Propranolol para los síntomas", "clave", "Compatible con lactancia."),
      mg("seguimiento", "Controlar TSH cada 4 a 8 semanas", "clave", "Puede pasar a hipotiroidismo."),
      mg("anual", "Control anual por riesgo de hipotiroidismo permanente", "clave", "Riesgo a largo plazo."),
      mg("animo", "Evaluar el ánimo", "util", "Depresión."),
      mg("antitiroideos", "Metimazol", "riesgoso", "No sirve en tiroiditis destructiva."),
      mg("yodo", "Yodo radiactivo", "riesgoso", "Contraindicado y no indicado."),
    ],
  },
  debrief: {
    diagnosis: "Tiroiditis posparto en fase tirotóxica, en mujer de 29 años con anti-TPO positivos.",
    pathologies: [
      { name: "Tiroiditis posparto", role: "principal", why: "Destrucción autoinmune transitoria." },
      { name: "Riesgo de hipotiroidismo", role: "asociada", why: "Evolución." },
      { name: "Graves, subaguda", role: "diferencial", why: "Otras tirotoxicosis." },
    ],
    reasoning: [
      "Causa: rebote inmune tras el embarazo.",
      "Mecanismo: destrucción de folículos con liberación de hormona.",
      "Consecuencia: fase tirotóxica, luego hipotiroidea.",
    ],
    epidemiology:
      "Afecta a cerca del 5 al 10 % de las mujeres en el año posterior al parto, más en quienes tienen anti-TPO positivos o diabetes tipo 1. Una parte termina con hipotiroidismo permanente. Muchos síntomas se atribuyen al cansancio del puerperio.",
    management: [
      "TSH en síntomas posparto.",
      "TRAb para excluir Graves.",
      "Betabloqueante.",
      "Seguimiento.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Tiroides y embarazo.", "American Thyroid Association — Thyroid Disease in Pregnancy and Postpartum."],
    pearls: ["Posparto con palpitaciones: TSH.", "Sin antitiroideos.", "Vigilar hipotiroidismo."],
    pitfalls: ["Dar metimazol.", "Atribuir todo al puerperio."],
    tribunal: [
      qa("¿Qué fases tiene la tiroiditis posparto?", "Tirotóxica de 1 a 4 meses, luego hipotiroidea, y recuperación en la mayoría."),
      qa("¿Cómo diferenciás Graves de tiroiditis?", "Graves: TRAb positivos, captación alta, flujo aumentado. Tiroiditis: TRAb negativos, captación baja."),
      qa("¿Qué antitiroideo se prefiere en la lactancia?", "Metimazol en dosis bajas, si se necesita en Graves."),
    ],
  },
};
