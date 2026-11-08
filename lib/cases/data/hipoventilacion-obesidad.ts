import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipoventilacionObesidad: ClinicalCase = {
  id: "insuficiencia-respiratoria-hipercapnica-hipoventilacion-obesidad",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 57, ageUnit: "años", sex: "F", context: "IMC 52. No fuma. Ronca fuerte desde hace años. Le dieron un sedante para dormir la semana pasada." },
  frequency: "frecuente",
  intro: "“La encontramos muy dormida, cuesta despertarla. Hace días está con la cara morada, le falta el aire y le duele la cabeza a la mañana.” (relata la hija)",
  vitals: { TA: "148/88 mmHg", FC: "96 lpm", FR: "14 rpm", "T°": "36,6 °C", "SatO₂": "82 %", Peso: "134 kg", Glasgow: "12/15" },
  anamnesis: [
    act("sueno", "¿Ronquidos con pausas y sueño de día?", "clave", "“Se duerme hasta comiendo.”", "Apnea e hipoventilación crónicas."),
    act("sedante", "¿Qué tomó para dormir?", "clave", "“Clonazepam, desde hace 6 días.”", "Los sedantes reducen el estímulo ventilatorio y descompensan."),
    act("cefalea", "¿Cefalea matinal, edemas?", "clave", "“Sí, y las piernas hinchadas.”", "La retención de CO₂ da cefalea matinal; los edemas, cor pulmonale."),
    act("fiebre", "¿Fiebre, tos con catarro?", "util", "“No.”", "Busca infección como desencadenante."),
    act("epoc", "¿Fumó alguna vez? ¿Trabajó con humo?", "util", "“Nunca.”", "Reduce la probabilidad de EPOC."),
    act("mascota", "¿Tienen perro en casa?", "neutro", "“Sí, uno chico.”", "No orienta."),
  ],
  exam: [
    act("conciencia", "Conciencia y asterixis", "clave", "Somnolienta, con asterixis.", "Encefalopatía hipercápnica."),
    act("respiracion", "Patrón respiratorio y pulmón", "clave", "Respiración superficial, murmullo disminuido, sin sibilancias.", "Hipoventilación."),
    act("cor", "Yugulares y edemas", "util", "Yugulares ingurgitadas, edema con fóvea.", "Falla derecha."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pH 7,26; pCO₂ 82; pO₂ 48; HCO₃ 36; gradiente alveoloarterial normal.", "Tipo II agudizada sobre crónica; gradiente normal indica hipoventilación."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Sin consolidación; corazón grande.", "Descarta neumonía y edema."),
    study("Electrofisiología", "ecg", "ECG, hemograma e ionograma", "clave", "Sobrecarga derecha; Hto 56 %.", "Hipoxemia crónica."),
    study("Otros", "espirometria", "Espirometría completa de urgencia", "innecesario", "No se realizó.", "Se hace cuando está estable."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipoventilacion", "Insuficiencia respiratoria tipo II agudizada por síndrome de obesidad-hipoventilación, desencadenada por benzodiacepinas", true, "IMC mayor de 30, hipercapnia crónica con bicarbonato alto, gradiente normal, sin EPOC, y sedante."),
      dx("epoc", "EPOC exacerbado", false, "No hay tabaquismo, sibilancias ni exposición."),
      dx("tep", "TEP", false, "Daría hipocapnia y gradiente aumentado."),
      dx("ic", "Edema agudo de pulmón", false, "No hay rales ni congestión radiológica; hay CO₂ muy alto."),
      dx("acv", "ACV", false, "El deterioro se explica por la hipercapnia, sin foco."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vni", "Ventilación no invasiva con BiPAP", "clave", "Corrige la hipercapnia y evita la intubación en muchos casos."),
      mg("oxigeno", "Oxígeno titulado a saturación de 88 a 92 %", "clave", "El exceso empeora la hipercapnia."),
      mg("sedante", "Suspender el sedante y considerar flumazenil solo con cautela", "clave", "Retira el desencadenante."),
      mg("ingreso", "Internar en área crítica; intubar si falla o no protege la vía aérea", "clave", "Es grave y puede deteriorarse."),
      mg("alto-flujo", "Oxígeno al 100 % con máscara con reservorio y alta sedación", "riesgoso", "Agrava la hipercapnia y la narcosis."),
      mg("alta-cpap", "Alta con turno para estudio de sueño", "riesgoso", "Tiene acidosis respiratoria y compromiso de conciencia."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia respiratoria hipercápnica agudizada por síndrome de obesidad-hipoventilación, desencadenada por clonazepam, en mujer de 57 años.",
    pathologies: [
      { name: "Insuficiencia respiratoria tipo II", role: "principal", why: "Falla ventilatoria con pCO₂ alta." },
      { name: "Obesidad-hipoventilación y cor pulmonale", role: "asociada", why: "Sustrato crónico." },
      { name: "EPOC, TEP, edema agudo de pulmón", role: "diferencial", why: "Otras causas de disnea e hipoxemia." },
    ],
    reasoning: [
      "Causa: obesidad extrema y un sedante.",
      "Mecanismo: disminuye la complacencia torácica, hay apnea y menos respuesta al CO₂; el sedante la deprime aún más.",
      "Consecuencia: acidosis respiratoria, hipoxemia, somnolencia y falla derecha.",
    ],
    epidemiology:
      "La frecuencia aumenta con el IMC y puede afectar a cerca de un tercio de las personas con obesidad muy grave internadas. Suele diagnosticarse tarde, en una descompensación, y a menudo se confunde con EPOC. Tratada con ventilación domiciliaria y descenso de peso, mejora la supervivencia.",
    management: [
      "Interpretar los gases: tipo I o II.",
      "Ventilación no invasiva y oxígeno controlado.",
      "Retirar desencadenantes.",
      "Ventilación domiciliaria y manejo de la obesidad al alta.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Trastornos respiratorios del sueño.", "American Thoracic Society — Guideline on Obesity Hypoventilation Syndrome."],
    pearls: ["Bicarbonato alto en obesidad: pensá en hipercapnia crónica.", "Gradiente normal e hipercapnia: hipoventilación.", "Saturación objetivo de 88 a 92 %."],
    pitfalls: ["Dar benzodiacepinas en apnea grave.", "Rotularlo como EPOC sin espirometría."],
    tribunal: [
      qa("¿Cómo diferenciás insuficiencia respiratoria tipo I y II?", "Tipo I: pO₂ baja con pCO₂ normal o baja. Tipo II: pO₂ baja y pCO₂ mayor de 45 mmHg."),
      qa("¿Qué mide el gradiente alveoloarterial?", "La diferencia entre el oxígeno alveolar y arterial; está alto en shunt, V/Q alterada y difusión, y normal en hipoventilación."),
      qa("¿Cómo interpretás el bicarbonato en la acidosis respiratoria?", "Si está muy elevado indica compensación renal, es decir, un proceso crónico."),
    ],
  },
};
