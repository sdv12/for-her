import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const chagasArritmia: ClinicalCase = {
  id: "miocardiopatia-chagasica-taquicardia-ventricular",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "M", context: "Nacido en Santiago del Estero. Serología positiva para Chagas que nunca controló." },
  frequency: "frecuente",
  intro: "“Estaba trabajando y sentí el corazón muy rápido, me mareé y me desmayé. Me desperté en el piso.”",
  vitals: { TA: "96/62 mmHg", FC: "176 lpm", FR: "22 rpm", "T°": "36,5 °C", "SatO₂": "95 %", Glasgow: "15/15" },
  anamnesis: [
    act("sincope", "¿Te desmayaste? ¿Haciendo esfuerzo?", "clave", "“Sí, cargando bolsas.”", "Síncope arrítmico."),
    act("chagas", "¿Te dijeron que tenías Chagas?", "clave", "“Hace años, no seguí.”", "Miocardiopatía."),
    act("familia", "¿Muerte súbita en la familia?", "clave", "“Un tío de repente.”", "Riesgo."),
    act("disnea", "¿Falta de aire o edemas?", "util", "“Me canso más.”", "Disfunción."),
    act("digestivo", "¿Problemas para tragar o constipación?", "util", "“Constipación.”", "Forma mixta."),
    act("obra", "¿Qué trabajás?", "neutro", "“Albañil.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso y perfusión", "clave", "Rápido y regular; algo pálido, lúcido.", "Taquicardia regular de complejo ancho."),
    act("cardiaco", "Corazón", "clave", "Soplo de insuficiencia mitral.", "Dilatación."),
    act("congestion", "Pulmón y yugulares", "util", "Sin congestión.", "Base."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia de QRS ancho regular, disociación AV.", "Taquicardia ventricular."),
    study("Electrofisiología", "ecg-basal", "ECG basal tras revertir", "clave", "Bloqueo de rama derecha con hemibloqueo anterior izquierdo.", "Típico de Chagas."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Aneurisma apical; FEy 38 %.", "Miocardiopatía."),
    study("Laboratorio", "lab", "Ionograma, magnesio, troponina", "util", "Normales.", "Factores."),
    study("Otros", "verapamilo", "Verapamilo para la taquicardia", "riesgoso", "No se realizó.", "Puede llevar a colapso en TV."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("chagas", "Taquicardia ventricular sostenida con síncope por miocardiopatía chagásica", true, "Chagas, QRS ancho con disociación AV, BRD con HBAI y aneurisma apical."),
      dx("tsv", "TSV con aberrancia", false, "Disociación AV y cardiopatía: TV."),
      dx("iam", "IAM", false, "Troponina normal."),
      dx("vasovagal", "Síncope vasovagal", false, "Ocurrió con esfuerzo y taquicardia."),
      dx("hcm", "Miocardiopatía hipertrófica", false, "Eco con aneurisma apical."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cardioversion", "Amiodarona o cardioversión según estabilidad", "clave", "Revierte la TV."),
      mg("cdi", "Cardiodesfibrilador implantable", "clave", "Prevención secundaria."),
      mg("ic", "Tratamiento de IC con FEy reducida", "clave", "Pronóstico."),
      mg("familia", "Serología a familiares", "util", "Detección."),
      mg("verapamilo-mg", "Verapamilo", "riesgoso", "Puede causar colapso."),
      mg("alta", "Alta porque revirtió", "riesgoso", "Alto riesgo de muerte súbita."),
    ],
  },
  debrief: {
    diagnosis: "Taquicardia ventricular sostenida con síncope por miocardiopatía chagásica con aneurisma apical y FEy de 38 %, en varón de 52 años.",
    pathologies: [
      { name: "Miocardiopatía chagásica", role: "principal", why: "Forma cardíaca crónica." },
      { name: "Taquicardia ventricular", role: "asociada", why: "Riesgo de muerte súbita." },
      { name: "TSV con aberrancia, IAM", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: infección crónica por T. cruzi.",
      "Mecanismo: miocarditis crónica con fibrosis y circuitos de reentrada.",
      "Consecuencia: arritmias, aneurismas, IC y embolias.",
    ],
    epidemiology:
      "Cerca de un tercio de las personas con Chagas crónico desarrolla cardiopatía. La muerte súbita es la principal causa de muerte en Chagas. El bloqueo de rama derecha con hemibloqueo anterior izquierdo es el patrón más típico.",
    management: [
      "ECG.",
      "Revertir.",
      "Eco.",
      "CDI y tratamiento de IC.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedad de Chagas.", "Ministerio de Salud de la Nación — Guía de Chagas."],
    pearls: ["QRS ancho en cardiopatía: TV.", "BRD con HBAI: Chagas.", "Aneurisma apical."],
    pitfalls: ["Verapamilo.", "No preguntar por Chagas."],
    tribunal: [
      qa("¿Qué criterios sugieren TV sobre TSV aberrante?", "Disociación AV, latidos de captura o fusión, QRS muy ancho y concordancia precordial."),
      qa("¿Qué hallazgos tiene el ECG del Chagas?", "BRD, HBAI, extrasístoles ventriculares, bloqueos AV y ondas Q."),
      qa("¿Se trata con benznidazol al adulto con cardiopatía?", "En cardiopatía establecida no mejora la evolución; se trata en niños y adultos jóvenes sin cardiopatía avanzada."),
    ],
  },
};
