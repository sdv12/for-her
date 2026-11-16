import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacDiabetica: ClinicalCase = {
  id: "nac-diabetica",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Diabética tipo 2 con metformina y glargina. Cocinera en un comedor escolar. Junio." },
  frequency: "muy-frecuente",
  intro: "“Hace tres días tengo fiebre, tos con flema y me duele el costado derecho al respirar. Las glucemias están en 300.”",
  vitals: { TA: "118/72 mmHg", FC: "104 lpm", FR: "24 rpm", "SatO₂": "91 %", "T°": "38,6 °C", Glucemia: "312 mg/dl" },
  anamnesis: [
    act("tos", "¿Cómo es la tos y la flema?", "clave", "“Con flema herrumbrosa desde ayer.”", "Esputo herrumbroso: neumococo."),
    act("dolor", "¿Cómo es el dolor del costado?", "clave", "“Como una puntada al respirar hondo.”", "Dolor pleurítico."),
    act("confusion", "¿Está confundida? ¿La notan rara?", "clave", "La hija: “No, está lúcida.”", "La C del CURB-65."),
    act("atb", "¿Tomó antibióticos en los últimos 3 meses?", "clave", "“No.”", "Define el esquema."),
    act("vacunas", "¿Tiene vacunas antigripal y antineumocócica?", "util", "“Ninguna.”", "Oportunidad perdida en una diabética."),
    act("comedor", "¿Cuántos chicos van al comedor?", "neutro", "“Unos ochenta.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Crepitantes y soplo tubario en base derecha, matidez.", "Consolidación."),
    act("hidratacion", "Hidratación y pies", "util", "Mucosas secas, pies sin lesiones.", "Deshidratación por hiperglucemia."),
    act("sensorio", "Sensorio", "util", "Lúcida.", "CURB-65."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Consolidación en lóbulo inferior derecho, sin derrame.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, urea, creatinina, ionograma, gases", "clave", "Leucocitos 17.500, urea 48 mg/dl, sin cetoacidosis, PaO₂ 62.", "CURB-65 = 1 (solo la urea), pero la hipoxemia y la diabetes descompensada justifican internar."),
    study("Microbiología", "hemocultivos", "Hemocultivos x2 y esputo", "util", "Hemocultivo: Streptococcus pneumoniae.", "En internados."),
    study("Laboratorio", "cetonas", "Cetonemia", "util", "Negativa.", "Descarta cetoacidosis."),
    study("Imágenes", "tac", "TC de tórax de rutina", "innecesario", "No se pidió.", "La radiografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac-neumococo", "Neumonía adquirida en la comunidad neumocócica de lóbulo inferior derecho con descompensación diabética", true, "Fiebre, esputo herrumbroso, dolor pleurítico, consolidación, hemocultivo con neumococo e hiperglucemia sin cetosis."),
      dx("tep", "Tromboembolismo de pulmón", false, "Fiebre alta, esputo y consolidación lobar."),
      dx("tbc", "Tuberculosis", false, "Cuadro agudo de 3 días."),
      dx("cad", "Cetoacidosis diabética", false, "Cetonas negativas."),
      dx("bronquitis", "Bronquitis aguda", false, "Hay consolidación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internar", "Internación en sala general", "clave", "Hipoxemia y comorbilidad."),
      mg("ampicilina-sulbactam", "Ampicilina-sulbactam endovenosa (o ceftriaxona) y ajustar a penicilina con el antibiograma", "clave", "Cobertura de neumococo."),
      mg("insulina", "Insulina basal-bolo y suspender metformina mientras esté internada", "clave", "Control glucémico en internación."),
      mg("o2", "Oxígeno para saturación de 92–96 %", "clave", "Hipoxemia."),
      mg("vacunas", "Vacunar contra gripe y neumococo al alta", "util", "Prevención."),
      mg("quinolona-todas", "Levofloxacina como primera elección", "innecesario", "Se reservan; no hacen falta para neumococo sensible."),
      mg("escala-sola", "Solo insulina rápida por escala", "riesgoso", "Control glucémico deficiente."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía neumocócica bacteriémica de lóbulo inferior derecho con hiperglucemia, en una mujer diabética de 63 años no vacunada.",
    pathologies: [
      { name: "Neumonía adquirida en la comunidad", role: "principal", why: "Neumococo, el germen más frecuente." },
      { name: "Diabetes descompensada", role: "asociada", why: "La infección sube la glucemia y la hiperglucemia empeora la infección." },
      { name: "TEP, tuberculosis", role: "diferencial", why: "Otras causas de fiebre e infiltrado." },
    ],
    reasoning: [
      "Causa: Streptococcus pneumoniae.",
      "Mecanismo: la hiperglucemia altera la función de los neutrófilos.",
      "Consecuencia: más bacteriemia, más internación y mayor mortalidad en diabéticos.",
    ],
    epidemiology:
      "La neumonía es una de las principales causas de internación en adultos en invierno. Las personas con diabetes tienen el doble de riesgo de neumonía y más bacteriemia neumocócica. En Argentina la vacuna antineumocócica está indicada y es gratuita para diabéticos.",
    management: [
      "Radiografía y CURB-65.",
      "Antibiótico empírico dirigido a neumococo.",
      "Insulina basal-bolo en internación.",
      "Vacunación.",
    ],
    sources: ["Sociedad Argentina de Infectología — Guía de neumonía adquirida en la comunidad.", "Ministerio de Salud de la Nación — Vacuna antineumocócica en adultos con factores de riesgo."],
    pearls: ["Esputo herrumbroso = neumococo.", "Diabético internado: basal-bolo.", "Al alta: vacunas."],
    pitfalls: ["Escala móvil sola.", "Olvidar vacunar."],
    tribunal: [
      qa("¿Qué es el CURB-65?", "Confusión, urea mayor de 42 mg/dl, frecuencia respiratoria de 30 o más, presión baja y edad de 65 o más; de 2 en adelante se interna."),
      qa("¿Por qué se suspende la metformina en un diabético internado con neumonía?", "Por el riesgo de acidosis láctica con hipoxemia, sepsis o falla renal, y porque la insulina se ajusta mejor."),
      qa("¿Qué vacunas corresponden a una persona diabética?", "Antigripal anual, antineumocócica conjugada, hepatitis B, doble adultos y COVID-19 según calendario."),
    ],
  },
};
