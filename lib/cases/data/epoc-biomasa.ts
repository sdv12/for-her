import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epocBiomasa: ClinicalCase = {
  id: "epoc-humo-lena-hipercapnia",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Nunca fumó. Cocinó y se calefaccionó con leña toda la vida en el monte santiagueño." },
  frequency: "frecuente",
  intro: "“Hace tres días tiene más falta de aire, más tos con catarro amarillo y hoy está muy dormida.” (relata el hijo)",
  vitals: { TA: "138/80 mmHg", FC: "112 lpm", FR: "30 rpm", "T°": "37,8 °C", "SatO₂": "82 %", Glasgow: "12/15" },
  anamnesis: [
    act("lena", "¿Cocinaba o se calefaccionaba con leña o carbón? ¿Cuántos años?", "clave", "“Toda la vida, en un rancho sin chimenea.”", "La exposición al humo de biomasa es una causa importante de EPOC en mujeres no fumadoras."),
    act("basal", "¿Cómo está habitualmente? ¿Usa inhaladores?", "clave", "“Se agita al caminar media cuadra; usa un aerosol a veces.”", "EPOC grave sin tratamiento adecuado."),
    act("esputo", "¿Cambió el catarro?", "clave", "“Más cantidad y amarillo.”", "Exacerbación probablemente infecciosa (criterios de Anthonisen)."),
    act("oxigeno", "¿Recibe oxígeno en la casa?", "util", "“No.”", "Importante para la oxigenoterapia."),
    act("somnolencia", "¿Desde cuándo está dormida?", "util", "“Desde hoy, después de que le dieron oxígeno a todo en la salita.”", "El exceso de oxígeno puede empeorar la hipercapnia."),
    act("cabras", "¿Tiene animales?", "neutro", "“Gallinas.”", "No orienta."),
  ],
  exam: [
    act("trabajo", "Trabajo respiratorio", "clave", "Uso de músculos accesorios, respiración con labios fruncidos.", "Exacerbación grave."),
    act("conciencia", "Estado de conciencia y asterixis", "clave", "Somnolienta, flapping.", "Encefalopatía hipercápnica."),
    act("auscultacion", "Auscultación", "util", "Murmullo disminuido, sibilancias y roncus.", "Obstrucción."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pH 7,26, pCO₂ 78, pO₂ 50, bicarbonato 34.", "Acidosis respiratoria aguda sobre crónica: indica ventilación no invasiva."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Hiperinsuflación, sin neumonía ni neumotórax.", "Descarta complicaciones."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, P pulmonar.", "Sobrecarga derecha."),
    study("Otros", "espirometria", "Espirometría en la exacerbación", "innecesario", "No se realizó.", "Se hace en estabilidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epoc", "EPOC por humo de biomasa con exacerbación grave e insuficiencia respiratoria hipercápnica (acidosis respiratoria)", true, "Mujer no fumadora expuesta a leña, con aumento de disnea y esputo purulento, somnolencia, flapping y pH 7,26 con pCO₂ 78."),
      dx("asma", "Crisis asmática", false, "Exposición crónica y retención crónica de CO₂ con bicarbonato alto."),
      dx("ic", "Insuficiencia cardíaca", false, "Sin congestión pulmonar en la radiografía."),
      dx("nac", "Neumonía", false, "Sin infiltrados."),
      dx("tep", "TEP", false, "Hipercapnia y exacerbación infecciosa explican el cuadro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vni", "Ventilación no invasiva (BiPAP)", "clave", "Reduce intubaciones y mortalidad en la acidosis respiratoria."),
      mg("o2-controlado", "Oxígeno controlado para saturación de 88–92 %", "clave", "El exceso de oxígeno empeora la hipercapnia."),
      mg("broncodilatadores", "Salbutamol e ipratropio, corticoide sistémico 5 días", "clave", "Tratamiento de la exacerbación."),
      mg("atb", "Antibiótico (esputo purulento)", "clave", "Exacerbación infecciosa."),
      mg("o2-alto", "Oxígeno con máscara de reservorio al máximo", "riesgoso", "Puede llevar a narcosis por CO₂."),
      mg("sedantes", "Sedantes para que duerma tranquila", "riesgoso", "Deprimen la respiración."),
    ],
  },
  debrief: {
    diagnosis: "EPOC por exposición al humo de biomasa con exacerbación infecciosa grave e insuficiencia respiratoria hipercápnica con acidosis, en mujer no fumadora de 72 años.",
    pathologies: [
      { name: "EPOC exacerbada", role: "principal", why: "Empeoramiento agudo de la obstrucción." },
      { name: "Insuficiencia respiratoria hipercápnica", role: "asociada", why: "Indica VNI." },
      { name: "Asma, IC, neumonía, TEP", role: "diferencial", why: "Otras causas de disnea." },
    ],
    reasoning: [
      "Causa: inhalación crónica de humo de leña en ambientes cerrados.",
      "Mecanismo: inflamación crónica de la vía aérea y destrucción alveolar con atrapamiento aéreo; una infección empeora la obstrucción y la ventilación.",
      "Consecuencia: hipoxemia e hipercapnia con acidosis y somnolencia.",
    ],
    epidemiology:
      "Aunque el tabaco es la principal causa de EPOC, el humo de biomasa explica una parte importante de los casos en mujeres no fumadoras de zonas rurales del norte argentino y de Latinoamérica. Las exacerbaciones son más frecuentes en invierno.",
    management: [
      "Preguntar por biomasa en toda persona con síntomas respiratorios crónicos.",
      "Exacerbación: broncodilatadores, corticoides, antibióticos si hay esputo purulento.",
      "Oxígeno controlado y VNI si hay acidosis.",
      "Tratamiento de mantenimiento, rehabilitación, vacunas y mejorar la ventilación de la vivienda.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Guía de EPOC.", "GOLD — Estrategia global para la EPOC."],
    pearls: ["EPOC no es solo tabaco: preguntar por leña.", "Saturación objetivo 88–92 %.", "pH menor de 7,35 con pCO₂ alta = VNI."],
    pitfalls: ["Dar oxígeno sin control.", "Sedar."],
    tribunal: [
      qa("¿Qué son los criterios de Anthonisen?", "Aumento de la disnea, aumento del volumen del esputo y esputo purulento; con los tres, o con dos si uno es la purulencia, se indica antibiótico en la exacerbación de EPOC."),
      qa("¿Cómo se diagnostica la EPOC?", "Con espirometría que muestra un cociente VEF1/CVF menor de 0,7 después del broncodilatador, en una persona con síntomas y exposición a factores de riesgo."),
      qa("¿Cuándo se indica oxígeno domiciliario en la EPOC?", "Con pO₂ de 55 mmHg o menos (o saturación de 88 % o menos) en reposo, o de 56–59 con hipertensión pulmonar, policitemia o insuficiencia cardíaca derecha; mínimo 15 h por día."),
    ],
  },
};
