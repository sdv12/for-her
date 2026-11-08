import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const obesidad: ClinicalCase = {
  id: "obesidad-grado-3",
  level: 1,
  area: "Endocrinología",
  setting: "CAPS",
  patient: { age: 42, ageUnit: "años", sex: "F", context: "Cuidadora de adultos mayores, trabaja de noche. Hizo muchas dietas. Madre diabética." },
  frequency: "muy-frecuente",
  intro: "“Quiero bajar de peso. Me duelen las rodillas, ronco y me canso. Ya probé de todo y siempre vuelvo a subir.”",
  vitals: { TA: "144/90 mmHg", FC: "84 lpm", "T°": "36,5 °C", "SatO₂": "96 %", Peso: "118 kg", Glucemia: "118 mg/dl" },
  anamnesis: [
    act("historia", "¿Desde cuándo subís de peso? ¿Qué probaste?", "clave", "“Desde el segundo embarazo. Dietas y pastillas que compré por internet.”", "Trayectoria de peso y tratamientos sin control médico."),
    act("habitos", "¿Cómo comés y dormís? ¿Hacés actividad?", "clave", "“Como de noche en el trabajo; duermo 5 horas; no hago nada.”", "El trabajo nocturno y el mal sueño favorecen la ganancia de peso."),
    act("secundaria", "¿Corticoides, antipsicóticos, frío, estrías oscuras, ciclos irregulares?", "clave", "“Nada de eso.”", "Excluye causas secundarias."),
    act("atracones", "¿Tenés atracones? ¿Te sentís triste?", "util", "“A veces como sin parar cuando estoy angustiada.”", "Salud mental y trastornos alimentarios cambian el abordaje."),
    act("apnea", "¿Ronquidos con pausas o sueño de día?", "util", "“Mi marido dice que dejo de respirar.”", "Apnea obstructiva, comorbilidad frecuente."),
    act("pacientes", "¿A cuántas personas cuidás?", "neutro", "“A dos señoras.”", "No orienta."),
  ],
  exam: [
    act("imc", "Talla, IMC y cintura", "clave", "Talla 1,60 m, IMC 46, cintura 124 cm.", "Obesidad grado 3 con adiposidad central."),
    act("piel", "Piel, cuello y tiroides", "clave", "Acantosis nigricans en cuello, sin estrías violáceas ni bocio.", "Resistencia a la insulina; aleja Cushing e hipotiroidismo."),
    act("rodillas", "Rodillas y edemas", "util", "Crepitación bilateral, edema leve.", "Sobrecarga articular."),
  ],
  studies: [
    study("Laboratorio", "metabolico", "Glucemia, HbA1c, lípidos, hepatograma, creatinina", "clave", "HbA1c 6,1 %, triglicéridos 240, HDL 36, ALT 62.", "Prediabetes, dislipemia y posible hígado graso."),
    study("Laboratorio", "tsh", "TSH", "clave", "Normal.", "Causa simple de descartar."),
    study("Otros", "polisomnografia", "Estudio de sueño", "util", "Índice de apnea-hipopnea de 34 por hora.", "Apnea grave, tratable."),
    study("Imágenes", "tc-cerebro", "RM de hipófisis sin sospecha clínica", "innecesario", "No se realizó.", "No hay datos de causa central."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("obesidad", "Obesidad grado 3 con prediabetes, HTA, apnea del sueño y gonartrosis", true, "IMC de 46 con comorbilidades y sin datos de causa secundaria."),
      dx("cushing", "Síndrome de Cushing", false, "Faltan estrías violáceas, debilidad proximal y fragilidad cutánea."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("sop", "Síndrome de ovario poliquístico", false, "No tiene irregularidad menstrual ni hiperandrogenismo."),
      dx("dm2", "Diabetes tipo 2", false, "La HbA1c de 6,1 % está en rango de prediabetes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("plan", "Plan alimentario y actividad física progresiva, con equipo interdisciplinario", "clave", "Es la base del tratamiento, sin culpabilizar."),
      mg("comorbilidades", "Tratar HTA, apnea, dislipemia y prediabetes", "clave", "Reduce el riesgo cardiovascular."),
      mg("bariatrica", "Evaluar cirugía bariátrica y fármacos como análogos de GLP-1", "clave", "IMC mayor de 40: es candidata; la ley argentina la contempla."),
      mg("mental", "Evaluar atracones y salud mental", "util", "Mejora la adherencia y el resultado."),
      mg("pastillas", "Seguir con las pastillas de internet y dieta de 600 kcal", "riesgoso", "Riesgo de toxicidad, pérdida muscular y rebote."),
      mg("culpa", "Decirle que es falta de voluntad y citar en un año", "riesgoso", "La obesidad es una enfermedad crónica; el estigma aleja del sistema de salud."),
    ],
  },
  debrief: {
    diagnosis: "Obesidad grado 3 con prediabetes, hipertensión, apnea obstructiva del sueño y artrosis de rodillas, en mujer de 42 años.",
    pathologies: [
      { name: "Obesidad", role: "principal", why: "Enfermedad crónica por exceso de tejido adiposo." },
      { name: "Prediabetes, HTA, apnea, gonartrosis", role: "asociada", why: "Comorbilidades que definen el riesgo." },
      { name: "Cushing, hipotiroidismo, SOP", role: "diferencial", why: "Causas o asociaciones a excluir." },
    ],
    reasoning: [
      "Causa: interacción de genética, ambiente, sueño, estrés y tipo de alimentación.",
      "Mecanismo: la adiposidad visceral genera inflamación y resistencia a la insulina.",
      "Consecuencia: enfermedad metabólica y cardiovascular, apnea, artrosis y más riesgo de cáncer.",
    ],
    epidemiology:
      "En la Encuesta Nacional de Factores de Riesgo, más del 60 % de los adultos argentinos tiene exceso de peso y cerca de un tercio, obesidad. Es más frecuente en los niveles de menores ingresos. La ley 26.396 reconoce a los trastornos alimentarios, incluida la obesidad, y garantiza su cobertura.",
    management: [
      "Medir IMC y cintura, y buscar comorbilidades.",
      "Excluir causas secundarias.",
      "Cambios sostenidos, con metas realistas del 5 al 10 %.",
      "Sumar fármacos o cirugía según IMC y comorbilidades.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica de diagnóstico y tratamiento de la obesidad.", "Sociedad Argentina de Nutrición — Consenso sobre obesidad."],
    pearls: ["Perder entre 5 y 10 % ya mejora la salud.", "Acantosis: resistencia a la insulina.", "La obesidad es una enfermedad, no una falla moral."],
    pitfalls: ["No buscar apnea.", "Olvidar causas farmacológicas."],
    tribunal: [
      qa("¿Cómo se clasifica por IMC?", "Sobrepeso de 25 a 29,9; obesidad grado 1 de 30 a 34,9; grado 2 de 35 a 39,9; grado 3 desde 40."),
      qa("¿Cuándo se indica cirugía bariátrica?", "Con IMC de 40 o más, o de 35 o más con comorbilidades, tras fallar el tratamiento y con evaluación interdisciplinaria."),
      qa("¿Qué define síndrome metabólico?", "Tres de cinco: cintura aumentada, triglicéridos altos, HDL bajo, presión elevada y glucemia alterada."),
    ],
  },
};
