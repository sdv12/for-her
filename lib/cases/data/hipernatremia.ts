import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipernatremia: ClinicalCase = {
  id: "hipernatremia-adulto-mayor",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 89, ageUnit: "años", sex: "F", context: "Vive en una residencia geriátrica. Demencia avanzada, no camina. Enero, ola de calor." },
  frequency: "frecuente",
  intro: "La trae la ambulancia de la residencia: “Desde ayer está más dormida, casi no toma agua y tiene fiebre.”",
  vitals: { TA: "96/58 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "38,2 °C", "SatO₂": "94 %", Peso: "44 kg", Glasgow: "10/15" },
  anamnesis: [
    act("ingesta", "¿Quién le da de tomar y cuánto toma?", "clave", "“Le dejamos la jarra; no la pide.”", "Sin acceso al agua y sin sed."),
    act("perdidas", "¿Diarrea, fiebre, orina mucho?", "clave", "“Fiebre desde ayer y orina con olor fuerte.”", "Pérdidas por fiebre e infección."),
    act("farmacos", "¿Toma diuréticos o lactulosa?", "clave", "“Furosemida.”", "Pérdidas renales."),
    act("basal", "¿Cómo está habitualmente?", "util", "“Habla poco, reconoce a la hija.”", "Cambio agudo."),
    act("caidas", "¿Se cayó?", "util", "“No.”", "Otra causa de deterioro."),
    act("hija", "¿La visitan?", "neutro", "“La hija, los domingos.”", "No orienta."),
  ],
  exam: [
    act("mucosas", "Mucosas y signo del pliegue", "clave", "Mucosas muy secas, pliegue positivo.", "Deshidratación."),
    act("neuro", "Examen neurológico", "clave", "Somnolienta, sin foco.", "Encefalopatía por hipernatremia."),
    act("foco", "Búsqueda de foco infeccioso", "util", "Puñopercusión dudosa, pulmones limpios.", "Foco urinario."),
  ],
  studies: [
    study("Laboratorio", "ionograma", "Ionograma, urea, creatinina, glucemia", "clave", "Na 164; urea 140; creatinina 1,9; glucemia 132.", "Hipernatremia con IRA prerrenal."),
    study("Laboratorio", "orina", "Orina completa, urocultivo y osmolaridad urinaria", "clave", "Leucocituria; osmolaridad urinaria 780.", "Riñón que concentra: pérdida extrarrenal o falta de ingesta."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Pendientes.", "Sepsis."),
    study("Imágenes", "tc", "TC de cerebro de rutina", "innecesario", "No se realizó.", "Sin foco ni trauma."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipernatremia", "Hipernatremia hipovolémica por falta de acceso al agua y pérdidas por fiebre, con infección urinaria", true, "Na 164, deshidratación, orina concentrada y foco urinario."),
      dx("diabetes-insipida", "Diabetes insípida", false, "La orina está concentrada."),
      dx("acv", "ACV", false, "Sin foco y con causa metabólica."),
      dx("hiperosmolar", "Estado hiperosmolar hiperglucémico", false, "Glucemia casi normal."),
      dx("demencia", "Progresión de la demencia", false, "Cambio agudo con causa corregible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("expansion", "Primero solución fisiológica para la hipotensión", "clave", "Restaurar la perfusión."),
      mg("agua-libre", "Después reponer agua libre (dextrosa al 5 % o agua por sonda) bajando el sodio no más de 10 a 12 por día", "clave", "Evitar edema cerebral."),
      mg("atb", "Antibiótico para la infección urinaria", "clave", "Causa desencadenante."),
      mg("residencia", "Plan de hidratación supervisada en la residencia", "util", "Prevención."),
      mg("rapido", "Corregir el sodio rápido en pocas horas", "riesgoso", "Edema cerebral y convulsiones."),
      mg("furosemida", "Seguir con furosemida", "riesgoso", "Más pérdida de agua."),
    ],
  },
  debrief: {
    diagnosis: "Hipernatremia hipovolémica grave por falta de acceso al agua y pérdidas por fiebre, con infección urinaria, en mujer de 89 años institucionalizada.",
    pathologies: [
      { name: "Hipernatremia hipovolémica", role: "principal", why: "Déficit de agua libre." },
      { name: "Infección urinaria e IRA prerrenal", role: "asociada", why: "Desencadenante y consecuencia." },
      { name: "Diabetes insípida, estado hiperosmolar", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: dependencia para beber, sed disminuida, calor, fiebre y diurético.",
      "Mecanismo: pérdida de agua mayor que de sodio y aumento de la osmolaridad.",
      "Consecuencia: deshidratación neuronal, encefalopatía e IRA.",
    ],
    epidemiology:
      "La hipernatremia es típica de adultos mayores dependientes, sobre todo en residencias y en olas de calor. Tiene alta mortalidad, más por la causa de base que por el sodio. Es un marcador de calidad de cuidados.",
    management: [
      "Volemia primero.",
      "Agua libre lenta.",
      "Tratar la causa.",
      "Prevención.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Trastornos del sodio.", "European Society of Endocrinology — Hyponatraemia and Dysnatraemia Guidance."],
    pearls: ["Quien no puede pedir agua se deshidrata.", "Orina concentrada: no es diabetes insípida.", "Corregir lento."],
    pitfalls: ["Corrección rápida.", "No buscar infección."],
    tribunal: [
      qa("¿Cómo calculás el déficit de agua libre?", "Agua corporal total por (sodio actual dividido 140 menos 1)."),
      qa("¿Qué pasa si corregís muy rápido?", "Edema cerebral, porque las neuronas adaptadas acumulan osmoles."),
      qa("¿Cómo diferenciás diabetes insípida?", "En la diabetes insípida la orina está diluida pese a la hipernatremia."),
    ],
  },
};
