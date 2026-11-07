import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacAlcoholista: ClinicalCase = {
  id: "neumonia-grave-alcoholismo",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 56, ageUnit: "años", sex: "M", context: "Situación de calle, consumo diario de alcohol, tabaquista. Sin vacunas. Invierno." },
  frequency: "muy-frecuente",
  intro: "“Hace cuatro días tengo fiebre, escalofríos, me duele al respirar del lado derecho y escupo catarro oscuro.”",
  vitals: { TA: "96/58 mmHg", FC: "118 lpm", FR: "32 rpm", "T°": "39,2 °C", "SatO₂": "88 %", Glasgow: "14/15" },
  anamnesis: [
    act("esputo", "¿Cómo es el catarro? ¿Empezó de golpe?", "clave", "“Herrumbroso; con un escalofrío fuerte.”", "Típico de neumococo."),
    act("alcohol", "¿Cuánto tomás? ¿Último trago? ¿Temblores?", "clave", "“Vino todos los días; ayer.”", "Riesgo de Klebsiella, aspiración y abstinencia."),
    act("tbc", "¿Tos de semanas, sudor de noche, contacto con TBC?", "clave", "“No, solo estos días, aunque hay casos en el parador.”", "En esta población siempre se busca."),
    act("atb", "¿Tomaste antibióticos? ¿Alergias?", "util", "“No.”", "Orienta empírico."),
    act("vih", "¿Te hiciste test de VIH?", "util", "“Hace años.”", "Se ofrece."),
    act("parador", "¿Dónde dormís?", "neutro", "“En un parador.”", "Importa para el alta, no para el diagnóstico."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Matidez, vibraciones aumentadas, soplo tubario y rales en base derecha.", "Síndrome de condensación."),
    act("mental", "Conciencia y temblor", "clave", "Algo confuso, temblor leve.", "CURB-65; abstinencia incipiente."),
    act("hidratacion", "Perfusión", "util", "Relleno de 3 segundos.", "Hipoperfusión."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Consolidación lobar derecha con derrame pequeño.", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, urea, ionograma, gases, lactato", "clave", "Leucocitos 3.200, urea 72, lactato 2,8.", "Leucopenia y urea alta: gravedad."),
    study("Microbiología", "cultivos", "Hemocultivos, esputo, antígeno de neumococo, baciloscopías, VIH", "clave", "S. pneumoniae; BAAR negativo; VIH negativo.", "Identifica germen."),
    study("Imágenes", "tc", "TC de tórax de rutina", "innecesario", "No se realizó.", "Solo si hay complicaciones."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac", "Neumonía neumocócica grave de la comunidad (CURB-65 de 4), en persona con alcoholismo", true, "Inicio brusco, esputo herrumbroso, condensación lobar, confusión, urea, FR y presión baja."),
      dx("tbc", "Tuberculosis", false, "Curso agudo y BAAR negativo."),
      dx("absceso", "Absceso pulmonar", false, "Sin cavidad ni esputo pútrido."),
      dx("tep", "TEP", false, "Hay consolidación con fiebre alta y esputo."),
      dx("cancer", "Cáncer con neumonitis obstructiva", false, "Curso agudo. Se controla la imagen más adelante."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Betalactámico EV (ampicilina-sulbactam o ceftriaxona) más macrólido", "clave", "NAC grave con alcoholismo y riesgo de aspiración."),
      mg("internar", "Internar, en cuidados intensivos o intermedios; oxígeno y líquidos", "clave", "CURB-65 alto."),
      mg("tiamina", "Tiamina antes de glucosa y benzodiacepinas si hay abstinencia", "clave", "Previene Wernicke y delirium tremens."),
      mg("social", "Trabajo social, vacunación y alcohol", "util", "Evita reingresos."),
      mg("ambulatorio", "Amoxicilina y alta", "riesgoso", "Es una neumonía grave."),
      mg("sedar", "Sedación alta sin monitorización", "riesgoso", "Riesgo de depresión respiratoria y aspiración."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía neumocócica grave de la comunidad, con leucopenia, en varón de 56 años con alcoholismo y situación de calle.",
    pathologies: [
      { name: "Neumonía de la comunidad grave", role: "principal", why: "Infección del parénquima." },
      { name: "Alcoholismo, riesgo de abstinencia", role: "asociada", why: "Afecta defensas." },
      { name: "TBC, absceso, TEP", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: S. pneumoniae en un huésped con alcoholismo y mala nutrición.",
      "Mecanismo: alcohol altera tos, cilios y neutrófilos; el alvéolo se llena de exudado.",
      "Consecuencia: hipoxemia, sepsis y empiema.",
    ],
    epidemiology:
      "La neumonía es una de las principales causas de internación y muerte en invierno en Argentina. El neumococo sigue siendo el germen más frecuente. El alcoholismo aumenta el riesgo de bacteriemia, y la leucopenia indica mal pronóstico. La vacuna antineumocócica está indicada en este grupo.",
    management: [
      "Evaluar gravedad con CURB-65.",
      "Antibiótico temprano y oxígeno.",
      "Abstinencia y tiamina.",
      "Vacunas y red social.",
    ],
    sources: ["Sociedad Argentina de Infectología — Consenso de neumonía de la comunidad.", "Ministerio de Salud de la Nación — Vacunación del adulto."],
    pearls: ["Leucopenia en una neumonía: gravedad.", "Alcoholismo: tiamina primero.", "Siempre baciloscopía si hay riesgo."],
    pitfalls: ["No prever abstinencia.", "Olvidar vacunas."],
    tribunal: [
      qa("¿Qué gérmenes causan neumonía en el alcoholismo?", "Neumococo, Klebsiella, anaerobios por aspiración y M. tuberculosis."),
      qa("¿Qué hallazgos da el síndrome de condensación?", "Vibraciones aumentadas, matidez, soplo tubario y rales crepitantes."),
      qa("¿Cuándo controlar la radiografía?", "A las 6 a 8 semanas en fumadores mayores, para excluir un tumor."),
    ],
  },
};
