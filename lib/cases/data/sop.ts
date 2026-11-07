import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sop: ClinicalCase = {
  id: "sindrome-ovario-poliquistico",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Estudiante. IMC 31. No fuma." },
  frequency: "muy-frecuente",
  intro: "“Me viene la menstruación cada tres o cuatro meses. Además me salen pelos en la cara y granitos que no se van.”",
  vitals: { TA: "124/78 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "84 kg", Glucemia: "102 mg/dl" },
  anamnesis: [
    act("ciclos", "¿Desde cuándo tenés ciclos irregulares?", "clave", "“Desde la adolescencia, siempre fueron así.”", "Oligomenorrea de larga evolución: orienta a anovulación crónica."),
    act("embarazo", "¿Podrías estar embarazada? ¿Usás método?", "clave", "“Preservativo a veces. Test negativo la semana pasada.”", "Siempre descartar embarazo ante la amenorrea."),
    act("androgenos", "¿Cuándo empezaron el vello y el acné? ¿Fue de golpe?", "clave", "“De a poco, hace años.”", "La evolución lenta aleja un tumor virilizante."),
    act("familia", "¿Hay diabetes u ovarios poliquísticos en la familia?", "util", "“Mamá tiene diabetes.”", "Riesgo metabólico."),
    act("deseo", "¿Querés tener hijos pronto?", "util", "“Por ahora no.”", "Define el tratamiento."),
    act("materia", "¿Qué estudiás?", "neutro", "“Abogacía.”", "No orienta."),
  ],
  exam: [
    act("androgenizacion", "Signos de hiperandrogenismo", "clave", "Hirsutismo en labio superior, mentón y línea alba; acné moderado.", "Hiperandrogenismo clínico."),
    act("insulina", "Cintura y piel del cuello", "util", "Cintura 98 cm, acantosis nigricans.", "Resistencia a la insulina."),
    act("virilizacion", "Clitoromegalia o voz grave", "util", "No.", "Su presencia haría sospechar un tumor."),
  ],
  studies: [
    study("Laboratorio", "hormonas", "Testosterona, SHBG, 17-OH progesterona, TSH, prolactina, beta-hCG", "clave", "Testosterona levemente alta, resto normal, beta-hCG negativa.", "Confirma hiperandrogenismo y descarta otras causas."),
    study("Laboratorio", "metabolico", "Glucemia, PTOG y perfil lipídico", "clave", "PTOG 2 h: 152 mg/dl, HDL bajo, triglicéridos altos.", "Tamizaje de intolerancia a la glucosa y riesgo cardiovascular."),
    study("Imágenes", "eco", "Ecografía transvaginal", "util", "Más de 20 folículos por ovario.", "Morfología poliquística, tercer criterio de Rotterdam."),
    study("Imágenes", "rmn", "Resonancia de abdomen y pelvis", "innecesario", "No se realizó.", "Sin virilización ni testosterona muy alta, no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sop", "Síndrome de ovario poliquístico con intolerancia a la glucosa", true, "Oligoanovulación, hiperandrogenismo clínico y bioquímico, y morfología ecográfica, con otras causas descartadas."),
      dx("hiperplasia", "Hiperplasia suprarrenal no clásica", false, "La 17-OH progesterona es normal."),
      dx("tumor", "Tumor virilizante", false, "Evolución lenta, sin virilización y andrógenos apenas elevados."),
      dx("prolactinoma", "Hiperprolactinemia", false, "Prolactina normal."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("habitos", "Cambios de hábitos y descenso de peso", "clave", "Descender un 5 a 10 % puede restablecer ovulaciones y mejora todo el cuadro."),
      mg("aco", "Anticonceptivos hormonales combinados, si no hay contraindicaciones", "clave", "Regulan el ciclo, protegen el endometrio y reducen el hiperandrogenismo."),
      mg("metformina", "Metformina por la intolerancia a la glucosa", "clave", "Mejora la resistencia a la insulina."),
      mg("seguimiento", "Control metabólico periódico y consejería sobre fertilidad", "util", "Mayor riesgo de diabetes, dislipemia y cáncer de endometrio."),
      mg("citrato", "Inducir la ovulación con letrozol ahora", "innecesario", "Solo si busca embarazo."),
      mg("sin-progestageno", "Dejar la amenorrea sin tratar por años", "riesgoso", "El estrógeno sin progesterona aumenta el riesgo de hiperplasia y cáncer de endometrio."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome de ovario poliquístico con intolerancia a la glucosa y obesidad, en mujer de 23 años.",
    pathologies: [
      { name: "Síndrome de ovario poliquístico", role: "principal", why: "Cumple los criterios de Rotterdam." },
      { name: "Intolerancia a la glucosa, síndrome metabólico", role: "asociada", why: "Por resistencia a la insulina." },
      { name: "Hiperplasia suprarrenal, tumor virilizante, hiperprolactinemia, hipotiroidismo", role: "diferencial", why: "Se descartan antes de diagnosticar." },
    ],
    reasoning: [
      "Causa: predisposición genética, resistencia a la insulina y obesidad.",
      "Mecanismo: la hiperinsulinemia y el exceso de LH estimulan los andrógenos ováricos, que detienen el desarrollo folicular.",
      "Consecuencia: anovulación, oligomenorrea, hirsutismo, acné, infertilidad y riesgo metabólico y endometrial.",
    ],
    epidemiology:
      "Es la endocrinopatía más frecuente en mujeres en edad fértil: afecta aproximadamente a 1 de cada 10. Es la principal causa de infertilidad anovulatoria. Suele comenzar en la adolescencia y se asocia con obesidad y diabetes tipo 2.",
    management: [
      "Descartar embarazo y otras causas.",
      "Hábitos y descenso de peso.",
      "Anticonceptivos combinados si no busca embarazo; metformina según el perfil.",
      "Tamizaje metabólico y, si busca embarazo, inducción de la ovulación.",
    ],
    sources: ["Sociedad Argentina de Ginecología Infanto Juvenil y SAEGRE — Recomendaciones sobre SOP.", "Guía internacional basada en evidencia para SOP."],
    pearls: ["Rotterdam: 2 de 3 (oligoanovulación, hiperandrogenismo, ovarios poliquísticos).", "Es diagnóstico de exclusión.", "Sin ciclos: proteger el endometrio."],
    pitfalls: ["Diagnosticar solo por ecografía.", "No hacer tamizaje metabólico."],
    tribunal: [
      qa("¿Cuáles son los criterios de Rotterdam?", "Dos de tres, descartadas otras causas: oligo o anovulación, hiperandrogenismo clínico o bioquímico, y ovarios poliquísticos en la ecografía."),
      qa("¿Por qué aumenta el riesgo de cáncer de endometrio?", "Por la anovulación crónica: el endometrio queda expuesto a estrógenos sin la oposición de la progesterona."),
      qa("¿Qué tratamiento se usa si busca embarazo?", "Descenso de peso y letrozol como primera línea para inducir la ovulación; citrato de clomifeno y gonadotrofinas como alternativas."),
    ],
  },
};
