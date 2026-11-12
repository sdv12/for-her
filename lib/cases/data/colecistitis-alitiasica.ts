import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colecistitisAlitiasica: ClinicalCase = {
  id: "colecistitis-aguda-alitiasica",
  level: 3,
  area: "Cirugía",
  setting: "Internación",
  patient: { age: 72, ageUnit: "años", sex: "M", context: "En terapia intensiva hace 12 días por un politrauma. Nutrición parenteral y opioides." },
  frequency: "poco-frecuente",
  intro: "Enfermería avisa: “Tiene fiebre nueva, más leucocitos y se queja del lado derecho.”",
  vitals: { TA: "102/62 mmHg", FC: "112 lpm", FR: "22 rpm", "T°": "38,7 °C", "SatO₂": "95 %" },
  anamnesis: [
    act("contexto", "¿Cuánto hace que está internado? ¿Come?", "clave", "Doce días, parenteral.", "Factores."),
    act("dolor", "¿Dónde duele?", "clave", "Hipocondrio derecho.", "Foco."),
    act("focos", "¿Otras fuentes: catéter, pulmón, orina?", "clave", "Sin otros focos.", "Excluye."),
    act("calculos", "¿Cálculos previos?", "util", "No.", "Alitiásica."),
    act("opioides", "¿Recibe opioides?", "util", "Sí.", "Estasis."),
    act("familia", "¿Quién lo visita?", "neutro", "Su hijo.", "No orienta."),
  ],
  exam: [
    act("murphy", "Murphy", "clave", "Positivo.", "Colecistitis."),
    act("masa", "Vesícula palpable", "clave", "Palpable y dolorosa.", "Distendida."),
    act("perfusion", "Perfusión", "util", "Fría.", "Sepsis."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía al lado de la cama", "clave", "Vesícula distendida, pared engrosada, líquido perivesicular, sin cálculos.", "Diagnóstico."),
    study("Laboratorio", "lab", "Hemograma, hepatograma, lactato", "clave", "Leucocitos 19.000; FAL alta.", "Gravedad."),
    study("Microbiología", "cultivos", "Hemocultivos", "util", "Pendientes.", "Germen."),
    study("Otros", "esperar", "Esperar 72 horas con antibióticos sin drenar", "riesgoso", "No se realizó.", "Riesgo de gangrena y perforación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("alitiasica", "Colecistitis aguda alitiásica en paciente crítico", true, "UTI prolongada, parenteral, Murphy y ecografía sin cálculos."),
      dx("litiasica", "Colecistitis litiásica", false, "Sin cálculos."),
      dx("colangitis", "Colangitis", false, "Vía biliar sin dilatación."),
      dx("hepatitis", "Hepatitis isquémica", false, "Vesícula patológica."),
      dx("neumonia", "Neumonía basal", false, "Foco vesicular."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("colecistostomia", "Colecistostomía percutánea o colecistectomía según estado", "clave", "Control del foco."),
      mg("atb", "Antibióticos de amplio espectro", "clave", "Sepsis."),
      mg("enteral", "Iniciar nutrición enteral si es posible", "util", "Previene."),
      mg("soporte", "Soporte hemodinámico", "clave", "Sepsis."),
      mg("solo-atb", "Solo antibióticos", "riesgoso", "Alta mortalidad."),
      mg("mas-opioides", "Aumentar opioides sin control del foco", "riesgoso", "No trata."),
    ],
  },
  debrief: {
    diagnosis: "Colecistitis aguda alitiásica en paciente crítico con nutrición parenteral, en varón de 72 años.",
    pathologies: [
      { name: "Colecistitis alitiásica", role: "principal", why: "Inflamación sin cálculos." },
      { name: "Paciente crítico", role: "asociada", why: "Factor." },
      { name: "Colangitis, hepatitis isquémica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: estasis e isquemia de la vesícula.",
      "Mecanismo: ayuno, opioides, hipoperfusión.",
      "Consecuencia: gangrena y perforación.",
    ],
    epidemiology:
      "Aparece sobre todo en pacientes críticos: politrauma, quemados, sepsis, nutrición parenteral. Tiene alta mortalidad por gangrena y perforación. La colecistostomía percutánea es una buena opción en pacientes inestables.",
    management: [
      "Sospechar en UTI.",
      "Ecografía.",
      "Drenar.",
      "Antibióticos.",
    ],
    sources: ["Sociedad Argentina de Cirugía Digestiva — Patología biliar.", "Tokyo Guidelines — Acute Cholecystitis."],
    pearls: ["Fiebre en UTI: mirá la vesícula.", "Sin cálculos.", "Colecistostomía."],
    pitfalls: ["Solo antibiótico.", "No buscar."],
    tribunal: [
      qa("¿Qué factores de riesgo tiene?", "Ayuno prolongado, nutrición parenteral, opioides, sepsis, quemaduras y trauma."),
      qa("¿Qué es la colecistitis enfisematosa?", "Infección por anaerobios formadores de gas, más en diabéticos varones."),
      qa("¿Qué complicación es más grave?", "La gangrena con perforación y peritonitis."),
    ],
  },
};
