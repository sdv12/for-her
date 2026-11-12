import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sindromeSheehan: ClinicalCase = {
  id: "hipopituitarismo-sindrome-sheehan",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Parto hace 7 meses con hemorragia grave y transfusiones." },
  frequency: "raro",
  intro: "“Después del parto no me bajó la leche, no me vino más la menstruación, tengo frío y estoy agotada.”",
  vitals: { TA: "92/58 mmHg", FC: "58 lpm", "T°": "36,0 °C", "SatO₂": "98 %", Glucemia: "62 mg/dl" },
  anamnesis: [
    act("parto", "¿Qué pasó en el parto?", "clave", "“Sangré mucho, me transfundieron.”", "Necrosis hipofisaria."),
    act("lactancia", "¿Pudiste dar la teta?", "clave", "“No me bajó la leche.”", "Déficit de prolactina."),
    act("menstruacion", "¿Volvió la menstruación?", "clave", "“No.”", "Déficit de gonadotrofinas."),
    act("sintomas", "¿Frío, constipación, mareos?", "util", "“Todo.”", "Hipotiroidismo y déficit de cortisol."),
    act("vello", "¿Perdiste vello?", "util", "“Sí, en axilas.”", "Déficit hormonal."),
    act("bebe", "¿Cómo se llama el bebé?", "neutro", "“Mateo.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Pálida, seca, sin hiperpigmentación.", "Déficit de ACTH, no primario."),
    act("presion", "Presión y ortostatismo", "clave", "Hipotensión ortostática.", "Cortisol."),
    act("vello-ex", "Vello y mamas", "util", "Escaso vello; mamas atróficas.", "Hipogonadismo."),
  ],
  studies: [
    study("Laboratorio", "hormonas", "Cortisol, ACTH, T4 libre, TSH, FSH, LH, estradiol, prolactina", "clave", "Cortisol bajo con ACTH baja; T4 libre baja con TSH baja; gonadotrofinas bajas; prolactina baja.", "Hipopituitarismo."),
    study("Laboratorio", "iono", "Ionograma y glucemia", "clave", "Sodio 129; glucemia baja.", "Déficit de cortisol."),
    study("Imágenes", "rmn", "RM de silla turca", "clave", "Silla turca vacía.", "Confirma."),
    study("Laboratorio", "tsh-sola", "Ajustar la levotiroxina según TSH", "riesgoso", "No corresponde.", "En causa central la TSH no sirve."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sheehan", "Hipopituitarismo por síndrome de Sheehan", true, "Hemorragia obstétrica, agalactia, amenorrea y déficit hormonal múltiple."),
      dx("hipotiroidismo", "Hipotiroidismo primario", false, "La TSH está baja."),
      dx("addison", "Addison", false, "ACTH baja y sin hiperpigmentación."),
      dx("depresion", "Depresión posparto", false, "Hay déficit hormonal objetivo."),
      dx("prolactinoma", "Prolactinoma", false, "La prolactina está baja."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cortisol-primero", "Hidrocortisona antes que levotiroxina", "clave", "Evita una crisis suprarrenal."),
      mg("tiroides", "Levotiroxina ajustada por T4 libre", "clave", "Déficit central."),
      mg("estrogenos", "Reemplazo de estrógenos y progesterona", "clave", "Hueso y síntomas."),
      mg("educacion", "Educación sobre dosis de estrés y tarjeta de identificación", "clave", "Previene crisis."),
      mg("t4-primero", "Empezar con levotiroxina sola", "riesgoso", "Puede desencadenar crisis suprarrenal."),
      mg("sin-tto", "No tratar porque es posparto", "riesgoso", "Riesgo de muerte."),
    ],
  },
  debrief: {
    diagnosis: "Hipopituitarismo por síndrome de Sheehan, a los 7 meses de una hemorragia posparto grave, en mujer de 31 años.",
    pathologies: [
      { name: "Síndrome de Sheehan", role: "principal", why: "Necrosis isquémica hipofisaria." },
      { name: "Insuficiencia suprarrenal secundaria", role: "asociada", why: "Riesgo vital." },
      { name: "Hipotiroidismo primario, Addison", role: "diferencial", why: "Otros déficits." },
    ],
    reasoning: [
      "Causa: hemorragia obstétrica con shock.",
      "Mecanismo: la hipófisis agrandada en el embarazo sufre isquemia.",
      "Consecuencia: déficit de varias hormonas.",
    ],
    epidemiology:
      "Es más frecuente donde la hemorragia posparto se atiende tarde. Puede tardar años en diagnosticarse. La falta de lactancia tras una hemorragia grave es una señal de alarma muy útil que debe preguntarse.",
    management: [
      "Sospechar.",
      "Perfil hormonal.",
      "Cortisol primero.",
      "Reemplazo de por vida.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Hipopituitarismo.", "Endocrine Society — Hormonal Replacement in Hypopituitarism."],
    pearls: ["Sin leche tras hemorragia: Sheehan.", "Cortisol antes que tiroides.", "No usar TSH."],
    pitfalls: ["Empezar con levotiroxina.", "Ajustar por TSH."],
    tribunal: [
      qa("¿Por qué no hay hiperpigmentación?", "Porque la ACTH está baja; en el Addison primario la ACTH alta estimula los melanocitos."),
      qa("¿Por qué falta la hiperpotasemia?", "La aldosterona depende del sistema renina-angiotensina, que está conservado."),
      qa("¿Qué es la apoplejía hipofisaria?", "Hemorragia o infarto agudo de un adenoma, con cefalea, alteración visual y déficit hormonal."),
    ],
  },
};
