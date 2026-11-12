import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacEmbarazada: ClinicalCase = {
  id: "neumonia-comunidad-embarazada",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 28 semanas. Asmática leve. Sin vacuna antigripal este año." },
  frequency: "frecuente",
  intro: "“Hace 3 días tengo fiebre, tos con catarro y me duele el costado derecho al respirar.”",
  vitals: { TA: "108/66 mmHg", FC: "114 lpm", FR: "26 rpm", "T°": "38,8 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("sintomas", "¿Tos, catarro, dolor pleurítico?", "clave", "“Catarro amarillo y puntada.”", "Neumonía."),
    act("feto", "¿Mueve el bebé? ¿Contracciones?", "clave", "“Se mueve; contracciones no.”", "Bienestar."),
    act("vacunas", "¿Vacuna antigripal y triple bacteriana?", "clave", "“Ninguna todavía.”", "Prevención."),
    act("asma", "¿Silbidos?", "util", "“Un poco.”", "Comorbilidad."),
    act("contactos", "¿Alguien enfermo en casa?", "util", "“Mi hijo con gripe.”", "Influenza."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy cajera.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Crepitantes y soplo tubario en base derecha.", "Condensación."),
    act("obstetrico", "Útero y latidos", "clave", "Taquicardia fetal leve.", "Por fiebre materna."),
    act("perfusion", "Perfusión", "util", "Buena.", "Sin shock."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax con protección abdominal", "clave", "Consolidación basal derecha.", "Indicada; la dosis es mínima."),
    study("Microbiología", "pcr", "PCR de influenza y SARS-CoV-2, hemocultivos", "clave", "Influenza A positiva.", "Antiviral."),
    study("Laboratorio", "lab", "Hemograma, función renal, gases", "clave", "Leucocitos 15.000.", "Gravedad."),
    study("Otros", "no-rx", "Evitar la radiografía por el embarazo", "riesgoso", "No se realizó.", "Su beneficio supera el riesgo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac", "Neumonía de la comunidad con influenza A en embarazo de 28 semanas", true, "Fiebre, condensación y PCR positiva."),
      dx("tep", "TEP", false, "Hay consolidación y fiebre."),
      dx("pielo", "Pielonefritis", false, "Foco pulmonar."),
      dx("asma", "Crisis asmática", false, "Consolidación."),
      dx("covid", "COVID-19", false, "PCR negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internar: embarazo con hipoxemia", "clave", "Riesgo materno y fetal."),
      mg("atb", "Ceftriaxona más azitromicina", "clave", "Seguros en el embarazo."),
      mg("oseltamivir", "Oseltamivir", "clave", "Influenza en embarazada."),
      mg("oxigeno", "Oxígeno para saturación de 95 % o más", "clave", "Feto."),
      mg("quinolona", "Levofloxacina de primera línea", "riesgoso", "Se evita."),
      mg("tetraciclina", "Doxiciclina", "riesgoso", "Contraindicada."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía de la comunidad basal derecha asociada a influenza A, en embarazo de 28 semanas.",
    pathologies: [
      { name: "Neumonía en el embarazo", role: "principal", why: "Infección grave." },
      { name: "Influenza", role: "asociada", why: "Desencadenante." },
      { name: "TEP, pielonefritis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: bacterias tras influenza.",
      "Mecanismo: el embarazo reduce la reserva respiratoria e inmunidad.",
      "Consecuencia: hipoxemia con riesgo fetal y parto prematuro.",
    ],
    epidemiology:
      "Las embarazadas tienen más riesgo de complicaciones por influenza. La vacuna antigripal está indicada en cualquier trimestre y también protege al bebé. La neumonía es una causa importante de muerte materna no obstétrica.",
    management: [
      "Radiografía.",
      "Antibióticos seguros.",
      "Antiviral.",
      "Oxígeno y vacuna.",
    ],
    sources: ["Ministerio de Salud de la Nación — Vacunación en embarazadas.", "Sociedad Argentina de Infectología — Neumonía de la comunidad."],
    pearls: ["Radiografía sí.", "Oseltamivir.", "Vacunar."],
    pitfalls: ["Evitar la placa.", "Quinolonas."],
    tribunal: [
      qa("¿Qué vacunas se indican en el embarazo?", "Antigripal, triple bacteriana acelular y la vacuna contra VSR según calendario."),
      qa("¿Por qué la saturación objetivo es mayor?", "Para asegurar oxigenación fetal."),
      qa("¿Qué antibióticos son seguros?", "Betalactámicos y macrólidos como azitromicina."),
    ],
  },
};
