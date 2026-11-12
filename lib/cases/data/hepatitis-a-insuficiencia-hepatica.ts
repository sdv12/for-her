import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hepatitisAInsuficienciaHepatica: ClinicalCase = {
  id: "hepatitis-a-insuficiencia-hepatica-aguda",
  level: 4,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Hepatitis C crónica no tratada. Su hijo tuvo hepatitis A hace un mes. No vacunada." },
  frequency: "raro",
  intro: "“Hace una semana estoy amarilla, muy cansada, y hoy está confundida y muy dormida.” (relata la hermana)",
  vitals: { TA: "102/62 mmHg", FC: "102 lpm", FR: "18 rpm", "T°": "37,4 °C", "SatO₂": "96 %", Glucemia: "58 mg/dl", Glasgow: "12/15" },
  anamnesis: [
    act("contacto", "¿Contacto con hepatitis?", "clave", "“Su hijo, hace un mes.”", "Transmisión."),
    act("hepatopatia", "¿Enfermedad hepática previa?", "clave", "“Hepatitis C sin tratar.”", "Riesgo de fallo."),
    act("farmacos", "¿Paracetamol, hierbas, alcohol?", "clave", "“Paracetamol por el malestar.”", "Agravante."),
    act("sangrado", "¿Sangrados?", "util", "“Encías.”", "Coagulopatía."),
    act("vacuna", "¿Vacuna contra hepatitis A?", "util", "“No.”", "Prevención."),
    act("barrio", "¿Dónde vive?", "neutro", "“En Villa Libertador.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Conciencia y asterixis", "clave", "Somnolienta, asterixis.", "Encefalopatía."),
    act("ictericia", "Ictericia", "clave", "Intensa.", "Hepatitis."),
    act("higado", "Hígado", "util", "Pequeño, doloroso.", "Mal pronóstico."),
  ],
  studies: [
    study("Laboratorio", "lab", "RIN, bilirrubina, transaminasas, glucemia, amonio, función renal", "clave", "RIN 3,1; BT 18; ALT 3.400; glucemia baja.", "Fallo hepático."),
    study("Laboratorio", "serologia", "IgM anti-VHA, paracetamol, otras serologías", "clave", "IgM anti-VHA positiva; paracetamol no tóxico.", "Causa."),
    study("Imágenes", "eco", "Ecografía Doppler", "util", "Sin trombosis.", "Excluye."),
    study("Otros", "biopsia", "Biopsia hepática", "riesgoso", "No se realizó.", "Coagulopatía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fha", "Insuficiencia hepática aguda por hepatitis A sobre hepatitis C crónica", true, "IgM anti-VHA, RIN mayor de 1,5 y encefalopatía."),
      dx("paracetamol", "Hepatotoxicidad por paracetamol", false, "Nivel no tóxico."),
      dx("hepatitis-a-simple", "Hepatitis A sin complicaciones", false, "Encefalopatía y coagulopatía."),
      dx("autoinmune", "Hepatitis autoinmune", false, "IgM positiva."),
      dx("budd", "Budd-Chiari", false, "Doppler normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trasplante", "Derivar a centro de trasplante hepático (INCUCAI)", "clave", "Puede necesitarlo."),
      mg("uti", "Terapia intensiva, glucosa, vigilancia neurológica", "clave", "Soporte."),
      mg("n-acetil", "N-acetilcisteína", "util", "Puede ayudar en fallo no paracetamol."),
      mg("contactos", "Vacunar a contactos", "clave", "Prevención."),
      mg("sedantes", "Benzodiacepinas por agitación", "riesgoso", "Empeora encefalopatía."),
      mg("plasma-rutina", "Plasma para corregir el RIN sin sangrado", "riesgoso", "Oculta el marcador pronóstico."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia hepática aguda por hepatitis A sobre hepatitis C crónica, en mujer de 41 años no vacunada.",
    pathologies: [
      { name: "Insuficiencia hepática aguda", role: "principal", why: "Encefalopatía y coagulopatía." },
      { name: "Hepatitis C crónica", role: "asociada", why: "Factor de riesgo." },
      { name: "Paracetamol, autoinmune", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: virus de hepatitis A sobre hígado enfermo.",
      "Mecanismo: necrosis hepatocelular masiva.",
      "Consecuencia: encefalopatía, coagulopatía e hipoglucemia.",
    ],
    epidemiology:
      "La hepatitis A grave es rara en niños, pero más frecuente en adultos y personas con hepatopatía crónica. La vacuna está en el calendario desde 2005, lo que redujo mucho los casos y los trasplantes por hepatitis A en Argentina.",
    management: [
      "RIN y encefalopatía.",
      "Causa.",
      "Centro de trasplante.",
      "Contactos.",
    ],
    sources: ["Sociedad Argentina de Hepatología — Insuficiencia hepática aguda.", "AASLD — Acute Liver Failure Guidance."],
    pearls: ["RIN más encefalopatía: fallo hepático.", "Derivar temprano.", "Vacunar hepatópatas."],
    pitfalls: ["Corregir el RIN.", "Sedar."],
    tribunal: [
      qa("¿Qué son los criterios del King's College?", "Criterios pronósticos para indicar trasplante en insuficiencia hepática aguda."),
      qa("¿A quiénes se vacuna contra hepatitis A?", "A los 12 meses en el calendario y a adultos con riesgo, como hepatopatías crónicas."),
      qa("¿Qué causa más frecuente de fallo hepático agudo hay en el mundo?", "El paracetamol en países desarrollados y las hepatitis virales en otros."),
    ],
  },
};
