import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epocCorPulmonale: ClinicalCase = {
  id: "epoc-grave-cor-pulmonale",
  level: 2,
  area: "Respiratorio",
  setting: "Consultorio",
  patient: { age: 65, ageUnit: "años", sex: "F", context: "Fuma 40 paquetes/año. Nunca hizo espirometría. Pintora de obra jubilada." },
  frequency: "muy-frecuente",
  intro: "“Me falta el aire para bañarme, toso todas las mañanas y se me hinchan las piernas. Con el cigarrillo me calmo.”",
  vitals: { TA: "132/82 mmHg", FC: "94 lpm", FR: "24 rpm", "T°": "36,5 °C", "SatO₂": "87 %", Peso: "57 kg" },
  anamnesis: [
    act("disnea", "¿Con qué esfuerzo te falta el aire?", "clave", "“Con bañarme.”", "mMRC 3."),
    act("tabaco", "¿Cuánto fumaste?", "clave", "“Un atado por 40 años.”", "Causa."),
    act("exacerbaciones", "¿Cuántas internaciones o antibióticos el último año?", "clave", "“Dos internaciones.”", "Grupo E."),
    act("edemas", "¿Desde cuándo las piernas?", "util", "“Hace meses.”", "Cor pulmonale."),
    act("alfa", "¿Familia con EPOC joven?", "util", "“No.”", "Alfa-1."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("torax", "Tórax", "clave", "Tórax en tonel, murmullo disminuido, espiración prolongada.", "Hiperinsuflación."),
    act("cor", "Yugulares e hígado", "clave", "Ingurgitación, hepatomegalia, edema con fóvea.", "Falla derecha."),
    act("cianosis", "Cianosis e hipocratismo", "util", "Cianosis, sin hipocratismo.", "Hipocratismo: buscar cáncer."),
  ],
  studies: [
    study("Otros", "espiro", "Espirometría posbroncodilatador", "clave", "VEF1/CVF 0,52; VEF1 38 %.", "GOLD 3."),
    study("Laboratorio", "gases", "Gases arteriales y hemograma", "clave", "pO₂ 52, pCO₂ 48; Hto 54.", "Hipoxemia crónica."),
    study("Imágenes", "eco", "Ecocardiograma y BNP", "clave", "VD dilatado, PSAP 58.", "Cor pulmonale."),
    study("Imágenes", "tc", "TC de tórax", "util", "Enfisema; sin nódulos.", "Cáncer."),
    study("Laboratorio", "dimero", "Dímero D en ambulatorio", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epoc", "EPOC grave (GOLD 3, grupo E) con insuficiencia respiratoria crónica y cor pulmonale", true, "Tabaquismo, VEF1/CVF menor de 0,7 y falla derecha."),
      dx("asma", "Asma", false, "Obstrucción fija, tabaquismo y comienzo tardío."),
      dx("ic-izq", "IC izquierda", false, "FEy normal, falla derecha."),
      dx("bronquiectasias", "Bronquiectasias", false, "TC sin dilataciones."),
      dx("tep", "TEP crónico", false, "Hay causa respiratoria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cesacion", "Dejar de fumar con ayuda farmacológica", "clave", "La medida con mayor impacto."),
      mg("oxigeno", "Oxígeno domiciliario más de 15 horas al día", "clave", "pO₂ menor de 55: mejora la supervivencia."),
      mg("broncod", "LABA y LAMA; corticoide inhalado según eosinófilos", "clave", "Reduce exacerbaciones."),
      mg("vacunas", "Vacunas y rehabilitación respiratoria", "clave", "Reduce internaciones."),
      mg("oxi-fumar", "Oxígeno mientras sigue fumando cerca", "riesgoso", "Riesgo de incendio."),
      mg("corticoide-oral", "Corticoide oral crónico", "riesgoso", "Sin beneficio y con daños."),
    ],
  },
  debrief: {
    diagnosis: "EPOC GOLD 3, grupo E, con insuficiencia respiratoria crónica y cor pulmonale, en mujer de 65 años tabaquista.",
    pathologies: [
      { name: "EPOC", role: "principal", why: "Obstrucción persistente." },
      { name: "Cor pulmonale", role: "asociada", why: "Hipertensión pulmonar." },
      { name: "Asma, IC, bronquiectasias", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: tabaco.",
      "Mecanismo: inflamación crónica, destrucción alveolar.",
      "Consecuencia: hipoxemia, vasoconstricción y falla derecha.",
    ],
    epidemiology:
      "El estudio EPOC.AR mostró que cerca de 1 de cada 7 adultos mayores de 40 años la padece, y que la mayoría no lo sabe. El tabaquismo femenino acorta distancias entre sexos. Es una de las principales causas de internación invernal, y la espirometría sigue siendo muy poco utilizada.",
    management: [
      "Espirometría.",
      "Clasificar ABE.",
      "Cesación y broncodilatadores.",
      "Oxígeno y paliativos.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Consenso de EPOC.", "GOLD — Global Strategy for COPD."],
    pearls: ["VEF1/CVF menor de 0,7 posbroncodilatador.", "Oxígeno más de 15 horas.", "Dejar de fumar."],
    pitfalls: ["No hacer espirometría.", "Corticoides orales crónicos."],
    tribunal: [
      qa("¿Qué es la clasificación GOLD ABE?", "Según síntomas y exacerbaciones: A y B según disnea, y E con exacerbaciones frecuentes o internación."),
      qa("¿Cuándo se indica el oxígeno crónico?", "pO₂ de 55 o menos, o de 56 a 59 con hipertensión pulmonar, policitemia o cor pulmonale."),
      qa("¿Qué tratamiento mejora la supervivencia en EPOC?", "Dejar de fumar, oxígeno en hipoxemia, y ventilación no invasiva seleccionada."),
    ],
  },
};
