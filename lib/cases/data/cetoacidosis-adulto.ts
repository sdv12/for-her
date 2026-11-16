import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cetoacidosisAdulto: ClinicalCase = {
  id: "cetoacidosis-adulto",
  level: 3,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 35, ageUnit: "años", sex: "M", context: "Remisero, IMC 33. Nunca le diagnosticaron diabetes. Toma gaseosa azucarada todo el día por la sed." },
  frequency: "frecuente",
  intro: "“Hace semanas que tengo sed y orino mucho. Desde ayer vomito, me duele la panza y respiro rápido.”",
  vitals: { TA: "108/66 mmHg", FC: "118 lpm", FR: "30 rpm", "SatO₂": "98 %", "T°": "36,8 °C", Glucemia: "486 mg/dl" },
  anamnesis: [
    act("poliuria", "¿Desde cuándo la sed y la orina?", "clave", "“Un mes.”", "Hiperglucemia previa."),
    act("gaseosa", "¿Qué toma para la sed?", "clave", "“Gaseosa común, tres litros por día.”", "Carga de azúcar que empeora la toxicidad de la glucosa."),
    act("peso", "¿Bajó de peso?", "util", "“Seis kilos.”", "Catabolismo."),
    act("infeccion", "¿Fiebre, tos, ardor al orinar?", "clave", "“No.”", "Desencadenantes."),
    act("familia", "¿Diabetes en la familia?", "util", "“Mi papá, con pastillas.”", "Riesgo de DM2."),
    act("remis", "¿Trabaja de noche?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("respiracion", "Respiración", "clave", "Kussmaul con aliento cetónico.", "Acidosis metabólica."),
    act("hidratacion", "Hidratación", "clave", "Mucosas muy secas, relleno de 3 segundos.", "Deshidratación grave."),
    act("acantosis", "Piel", "util", "Acantosis nigricans.", "Insulinorresistencia: perfil de DM2."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases, cetonemia, ionograma", "clave", "pH 7,12, HCO₃ 8, anion gap 26, cetonemia 5,2, K 5,1.", "Cetoacidosis moderada a grave."),
    study("Laboratorio", "lab", "Función renal, hemograma, lipasa, HbA1c", "clave", "Creatinina 1,5, HbA1c 12,8 %, lipasa normal.", "Hiperglucemia crónica."),
    study("Electrofisiología", "ecg", "ECG", "util", "Normal.", "Potasio."),
    study("Laboratorio", "anticuerpos", "Anti-GAD y péptido C (diferidos)", "util", "Anti-GAD negativo, péptido C conservado al mes.", "DM2 con tendencia a la cetosis."),
    study("Laboratorio", "bicarbonato-prev", "Indicar bicarbonato de rutina", "riesgoso", "No se indicó.", "Solo con pH menor de 6,9."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cad-dm2", "Cetoacidosis diabética como debut de diabetes tipo 2 con tendencia a la cetosis", true, "Obeso con acantosis, poliuria de semanas, consumo de gaseosas, pH 7,12, cetonemia alta, anti-GAD negativo y péptido C conservado."),
      dx("hiperosmolar", "Estado hiperosmolar", false, "Hay acidosis y cetosis marcadas."),
      dx("dm1", "Diabetes tipo 1", false, "Anti-GAD negativo, péptido C conservado y obesidad."),
      dx("pancreatitis", "Pancreatitis", false, "Lipasa normal."),
      dx("cetoacidosis-alcoholica", "Cetoacidosis alcohólica", false, "Glucemia muy alta y sin alcohol."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Solución fisiológica 1 litro la primera hora y después según estado", "clave", "Primero volumen."),
      mg("potasio", "Potasio en los sueros si es menor de 5,2 y hay diuresis", "clave", "La insulina lo baja."),
      mg("insulina", "Insulina regular endovenosa 0,1 U/kg/h", "clave", "Revierte la cetosis."),
      mg("dextrosa", "Agregar dextrosa cuando la glucemia baja de 250", "clave", "Seguir con insulina hasta cerrar el anion gap."),
      mg("transicion", "Insulina subcutánea al resolver y educación; luego evaluar pasar a orales", "util", "Muchos pueden dejar la insulina."),
      mg("insulina-sin-k", "Insulina antes de saber el potasio", "riesgoso", "Riesgo de hipopotasemia grave."),
      mg("cortar-insulina", "Suspender la insulina al normalizar la glucemia", "riesgoso", "Persiste la cetosis."),
    ],
  },
  debrief: {
    diagnosis: "Cetoacidosis diabética como debut de diabetes tipo 2 con tendencia a la cetosis, en un hombre de 35 años con obesidad.",
    pathologies: [
      { name: "Cetoacidosis diabética", role: "principal", why: "Déficit relativo de insulina." },
      { name: "Diabetes tipo 2 con tendencia a la cetosis", role: "asociada", why: "Toxicidad de la glucosa que agota la célula beta." },
      { name: "Diabetes tipo 1", role: "diferencial", why: "Se distingue por anticuerpos y péptido C." },
    ],
    reasoning: [
      "Causa: hiperglucemia sostenida agravada por bebidas azucaradas.",
      "Mecanismo: la glucotoxicidad deja de golpe a la célula beta sin secretar insulina.",
      "Consecuencia: lipólisis, cetosis y acidosis; la función beta puede recuperarse.",
    ],
    epidemiology:
      "La cetoacidosis también ocurre en DM2, sobre todo en adultos jóvenes con obesidad, de ascendencia afro o latinoamericana. Hasta la mitad puede dejar la insulina en meses. Las bebidas azucaradas para la sed son un círculo vicioso frecuente.",
    management: [
      "Fluidos, potasio e insulina.",
      "Cerrar el anion gap.",
      "Transición a subcutánea.",
      "Clasificar la diabetes después.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Consenso de cetoacidosis.", "ADA — Hyperglycemic crises in adult patients with diabetes (consensus report)."],
    pearls: ["Primero fluidos, después insulina.", "Potasio antes de la insulina.", "Debut en obeso: puede ser DM2."],
    pitfalls: ["Bicarbonato de rutina.", "Cortar la insulina con anion gap abierto."],
    tribunal: [
      qa("¿Cuáles son los criterios de cetoacidosis?", "Glucemia mayor de 250 (o diabetes conocida), pH menor de 7,3 o bicarbonato menor de 18 y cetonemia positiva."),
      qa("¿Qué es la diabetes con tendencia a la cetosis?", "Una diabetes tipo 2 que debuta con cetoacidosis por glucotoxicidad, con anticuerpos negativos y recuperación de la función beta."),
      qa("¿Por qué se agrega dextrosa durante el tratamiento?", "Para seguir dando insulina, que es lo que corrige la cetosis, sin causar hipoglucemia."),
    ],
  },
};
