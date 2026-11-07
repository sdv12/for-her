import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiperparatiroidismo: ClinicalCase = {
  id: "hiperparatiroidismo-primario",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 62, ageUnit: "años", sex: "F", context: "Posmenopáusica. Dos cólicos renales en un año. Toma hidroclorotiazida." },
  frequency: "frecuente",
  intro: "“Estoy cansada, constipada, me duelen los huesos y ando triste. Tuve piedras en el riñón hace poco. En el análisis me salió el calcio alto.”",
  vitals: { TA: "146/84 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "64 kg" },
  anamnesis: [
    act("litiasis", "¿Tuviste cálculos, fracturas o úlceras?", "clave", "“Dos cálculos y una fractura de muñeca.”", "Clásico: litiasis, dolor óseo, síntomas digestivos y neuropsiquiátricos."),
    act("farmacos", "¿Qué tomás? ¿Tiazidas, litio, calcio, vitamina D?", "clave", "“Hidroclorotiazida y calcio con vitamina D.”", "Fármacos que elevan el calcio."),
    act("alarma", "¿Bajaste de peso? ¿Fumás? ¿Tenés algún tumor?", "clave", "“No.”", "La hipercalcemia maligna es la otra gran causa."),
    act("familia", "¿Familiares con calcio alto o tumores endocrinos?", "util", "“No.”", "Formas hereditarias."),
    act("sed", "¿Mucha sed y orinás mucho?", "util", "“Sí.”", "Diabetes insípida nefrogénica por calcio."),
    act("hobby", "¿Qué te gusta hacer?", "neutro", "“Tejer.”", "No orienta."),
  ],
  exam: [
    act("cuello", "Cuello", "clave", "Sin masa palpable.", "Los adenomas suelen no palparse; una masa dura sugiere carcinoma."),
    act("columna", "Columna y talla", "util", "Dolor leve dorsal, 2 cm menos de talla.", "Afectación ósea."),
    act("mental", "Ánimo y memoria", "util", "Enlentecida, sin déficit focal.", "Síntomas neuropsiquiátricos."),
  ],
  studies: [
    study("Laboratorio", "calcio", "Calcio corregido o iónico, fósforo y PTH", "clave", "Calcio 11,4, fósforo bajo, PTH 142 pg/ml.", "Calcio alto con PTH alta o inapropiadamente normal: hiperparatiroidismo."),
    study("Laboratorio", "renal", "Función renal, vitamina D y calcio en orina de 24 h", "clave", "Filtrado 68; 25-OH D baja; calciuria alta.", "Excluye hipercalcemia hipocalciúrica familiar."),
    study("Imágenes", "dmo", "Densitometría incluyendo radio, y ecografía renal", "clave", "T-score -2,8 en radio; litiasis.", "Evalúa criterios quirúrgicos."),
    study("Imágenes", "localizar", "Ecografía de cuello y centellograma con sestamibi, solo para planificar", "util", "Adenoma inferior derecho.", "No se usa para diagnosticar."),
    study("Imágenes", "pet", "PET buscando tumor sin confirmar la PTH", "innecesario", "No se realizó.", "Con PTH alta, el origen es paratiroideo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hpt", "Hiperparatiroidismo primario por adenoma paratiroideo, sintomático", true, "Calcio alto, PTH alta, fósforo bajo, litiasis, osteoporosis cortical y adenoma."),
      dx("maligna", "Hipercalcemia maligna", false, "La PTH estaría suprimida."),
      dx("tiazida", "Hipercalcemia solo por tiazida", false, "La tiazida no eleva la PTH y hay adenoma."),
      dx("fhh", "Hipercalcemia hipocalciúrica familiar", false, "Tiene calciuria alta."),
      dx("secundario", "Hiperparatiroidismo secundario renal", false, "En ese caso, el calcio es bajo o normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Paratiroidectomía", "clave", "Sintomática, con litiasis y osteoporosis: criterio quirúrgico."),
      mg("suspender", "Suspender tiazida y aportes de calcio y vitamina D en exceso, hidratación", "clave", "Reduce la hipercalcemia."),
      mg("vitd", "Corregir déficit de vitamina D con cuidado", "util", "Mejora el resultado posoperatorio."),
      mg("posop", "Vigilar hipocalcemia posoperatoria (hueso hambriento)", "clave", "Complicación típica."),
      mg("digital", "Agregar digoxina y tiazida más alta", "riesgoso", "La hipercalcemia potencia la toxicidad digitálica y las tiazidas elevan el calcio."),
      mg("sin-seguimiento", "Calmantes y control en 2 años", "riesgoso", "Progresa el daño óseo y renal."),
    ],
  },
  debrief: {
    diagnosis: "Hiperparatiroidismo primario por adenoma paratiroideo con litiasis renal y osteoporosis, en mujer de 62 años.",
    pathologies: [
      { name: "Hiperparatiroidismo primario", role: "principal", why: "Secreción autónoma de PTH." },
      { name: "Litiasis y osteoporosis", role: "asociada", why: "Daño de órganos blanco." },
      { name: "Hipercalcemia maligna, tiazidas, FHH", role: "diferencial", why: "Otras causas de calcio alto." },
    ],
    reasoning: [
      "Causa: adenoma único en cerca del 85 % de los casos.",
      "Mecanismo: la PTH moviliza calcio del hueso, lo retiene en el riñón y aumenta la vitamina D activa.",
      "Consecuencia: cálculos, pérdida ósea, síntomas digestivos, neuropsiquiátricos y renales.",
    ],
    epidemiology:
      "Es la causa más frecuente de hipercalcemia en consultorio, con predominio en mujeres posmenopáusicas, mientras que en internados predomina la maligna. Hoy suele detectarse en análisis de rutina, a menudo con pocos síntomas.",
    management: [
      "Calcio y PTH juntos.",
      "Evaluar hueso, riñón y calciuria.",
      "Cirugía si tiene criterios.",
      "Vigilar el calcio posoperatorio.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Recomendaciones de hiperparatiroidismo.", "Taller internacional sobre hiperparatiroidismo primario asintomático."],
    pearls: ["Cálculos, huesos, gemidos y quejas psíquicas.", "Calcio alto con PTH suprimida: pensá en cáncer.", "La imagen no diagnostica: localiza."],
    pitfalls: ["No medir PTH.", "Seguir con tiazida."],
    tribunal: [
      qa("¿Cuáles son los criterios quirúrgicos en asintomáticos?", "Calcio más de 1 mg/dl sobre el límite, T-score -2,5 o fractura, filtrado menor de 60, litiasis o calciuria alta, y edad menor de 50."),
      qa("¿Cómo se trata la hipercalcemia grave?", "Hidratación EV, calcitonina y bifosfonato o denosumab; la diálisis se reserva a casos extremos."),
      qa("¿Qué es el síndrome de hueso hambriento?", "Una hipocalcemia posoperatoria prolongada por el depósito rápido de calcio en el hueso."),
    ],
  },
};
