import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const prolapsoCordon: ClinicalCase = {
  id: "prolapso-de-cordon",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "F", context: "Tercer embarazo, 38 semanas. Feto en presentación podálica. Contracciones desde hace 2 horas." },
  frequency: "raro",
  intro: "“Se me rompió la bolsa recién, salió mucho líquido y siento que algo me quedó ahí abajo, como una soga.”",
  vitals: { TA: "118/74 mmHg", FC: "96 lpm", FR: "20 rpm", "T°": "36,7 °C" },
  anamnesis: [
    act("bolsa", "¿Cuándo rompió bolsa? ¿Cómo salió el líquido?", "clave", "“Hace cinco minutos, de golpe, abundante.”", "Rotura brusca con presentación no encajada: riesgo alto."),
    act("presentacion", "¿Cómo viene el bebé?", "clave", "“Sentado, me dijeron.”", "Presentación podálica, factor de riesgo."),
    act("movimientos", "¿Se mueve?", "util", "“Menos.”", "Compromiso fetal."),
    act("gestas", "¿Cuántos partos tuviste?", "util", "“Dos.”", "La multiparidad es un factor de riesgo."),
    act("cesarea", "¿Cesáreas o alergias?", "util", "“Ninguna.”", "Para la cirugía."),
    act("pareja", "¿Quién te acompaña?", "neutro", "“Mi marido.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto vaginal y especuloscopía", "clave", "Asa de cordón pulsátil en vagina, dilatación 5 cm.", "Prolapso de cordón: diagnóstico clínico."),
    act("latidos", "Latidos fetales", "clave", "Bradicardia de 80 lpm.", "Compresión con hipoxia fetal."),
    act("materno", "Estado materno", "util", "Estable.", "La madre está bien: es urgencia fetal."),
  ],
  studies: [
    study("Otros", "monitoreo", "Registro continuo de latidos, sin demorar", "clave", "Bradicardia sostenida.", "Confirma compromiso fetal."),
    study("Imágenes", "eco", "Ecografía formal completa antes de actuar", "riesgoso", "No se realizó.", "Cada minuto cuenta."),
    study("Laboratorio", "grupo", "Grupo y factor, pedido en paralelo", "util", "O positivo.", "Para cirugía; no demora."),
    study("Laboratorio", "completo", "Esperar el laboratorio para ir al quirófano", "riesgoso", "No se realizó.", "La urgencia es inmediata."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("prolapso", "Prolapso de cordón umbilical con sufrimiento fetal agudo", true, "Rotura de membranas con presentación podálica, cordón pulsátil en vagina y bradicardia."),
      dx("laterocidencia", "Procidencia con membranas íntegras", false, "Las membranas están rotas."),
      dx("dppni", "Desprendimiento de placenta", false, "No hay sangrado ni hipertonía."),
      dx("rotura", "Rotura uterina", false, "No hay dolor súbito ni cicatriz previa."),
      dx("vasa", "Vasa previa", false, "No hay sangrado al romper la bolsa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("elevar", "Elevar la presentación con la mano por vagina, sin soltar, hasta nacer", "clave", "Alivia la compresión del cordón."),
      mg("posicion", "Posición genupectoral o Trendelenburg y llenar la vejiga si hay demora", "clave", "Reduce la presión sobre el cordón."),
      mg("cesarea", "Cesárea de emergencia inmediata", "clave", "Sin dilatación completa, es lo indicado."),
      mg("neo", "Avisar a neonatología y anestesia", "clave", "Reanimación neonatal."),
      mg("reducir", "Volver a introducir el cordón al útero", "riesgoso", "Causa espasmo y demora."),
      mg("manipular", "Manipular y enfriar el cordón expuesto", "riesgoso", "Provoca vasoespasmo."),
    ],
  },
  debrief: {
    diagnosis: "Prolapso de cordón con sufrimiento fetal agudo en embarazo de 38 semanas con presentación podálica.",
    pathologies: [
      { name: "Prolapso de cordón", role: "principal", why: "Cordón por delante de la presentación con membranas rotas." },
      { name: "Sufrimiento fetal agudo", role: "asociada", why: "Por compresión." },
      { name: "Desprendimiento, rotura uterina, vasa previa", role: "diferencial", why: "Otras emergencias obstétricas." },
    ],
    reasoning: [
      "Causa: rotura de membranas con presentación que no ocupa la pelvis.",
      "Mecanismo: el cordón desciende y queda comprimido contra la pelvis, con vasoespasmo.",
      "Consecuencia: hipoxia fetal aguda y muerte en minutos sin tratamiento.",
    ],
    epidemiology:
      "Se presenta en cerca de 1 a 6 por mil partos y aumenta con presentación podálica o transversa, prematurez, embarazo múltiple, polihidramnios y multiparidad. El tiempo hasta el nacimiento es lo que determina el pronóstico fetal.",
    management: [
      "Reconocer: bradicardia tras rotura de membranas.",
      "Elevar la presentación.",
      "Cesárea de emergencia, o parto si está en expulsivo.",
      "Reanimación neonatal.",
    ],
    sources: ["FASGO — Recomendaciones de emergencias obstétricas.", "Ministerio de Salud de la Nación — Guía para la atención del parto."],
    pearls: ["Bradicardia tras romper bolsa: tacto ya.", "No retirar la mano hasta el nacimiento.", "No reducir el cordón."],
    pitfalls: ["Pedir ecografía primero.", "Enfriar el cordón manipulándolo."],
    tribunal: [
      qa("¿Qué diferencia procidencia de prolapso?", "En la procidencia, las membranas están íntegras con cordón por delante. En el prolapso, las membranas están rotas."),
      qa("¿Cuáles son los factores de riesgo?", "Presentaciones anómalas, prematurez, gemelares, polihidramnios, multiparidad, amniotomía con presentación alta."),
      qa("¿Qué clasificación de latidos sugiere hipoxia?", "Bradicardia sostenida, desaceleraciones tardías o variables graves con pérdida de variabilidad."),
    ],
  },
};
