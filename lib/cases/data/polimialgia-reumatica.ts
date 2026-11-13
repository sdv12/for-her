import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const polimialgiaReumatica: ClinicalCase = {
  id: "polimialgia-reumatica",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Viuda, independiente. Hipertensa." },
  frequency: "frecuente",
  intro: "“Hace dos meses me duelen los hombros y las caderas; a la mañana estoy dura más de una hora y me cuesta peinarme y levantarme de la cama.”",
  vitals: { TA: "134/80 mmHg", FC: "80 lpm", "T°": "37,2 °C", Peso: "60 kg" },
  anamnesis: [
    act("rigidez", "¿Cuánto dura la rigidez de la mañana?", "clave", "“Más de una hora.”", "Inflamatoria."),
    act("cefalea", "¿Dolor de cabeza, dolor al masticar, ve mal?", "clave", "“No.”", "Arteritis de células gigantes."),
    act("sistemicos", "¿Cansancio, bajó de peso, febrícula?", "clave", "“Muy cansada y bajé dos kilos.”", "Síntomas sistémicos."),
    act("estatinas", "¿Toma estatinas?", "util", "“No.”", "Miopatía por fármacos."),
    act("debilidad", "¿Le falta fuerza o le duele?", "util", "“Me duele, no es que no tenga fuerza.”", "No es miositis."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Ir al club de jubilados.”", "No orienta."),
  ],
  exam: [
    act("hombros", "Movilidad de hombros y caderas", "clave", "Dolor y limitación activa en ambos hombros y caderas.", "Cinturas."),
    act("fuerza", "Fuerza muscular", "clave", "Conservada.", "No es miopatía."),
    act("temporales", "Arterias temporales", "util", "Pulsátiles, no dolorosas.", "Sin arteritis."),
  ],
  studies: [
    study("Laboratorio", "reactantes", "Eritrosedimentación y PCR", "clave", "VSG 74; PCR 4,2.", "Inflamación."),
    study("Laboratorio", "cpk", "CPK, TSH, FR, anti-CCP, calcio", "clave", "Normales.", "Excluye miositis, hipotiroidismo y artritis reumatoidea."),
    study("Imágenes", "eco", "Ecografía de hombros", "util", "Bursitis subacromial bilateral.", "Apoya."),
    study("Otros", "biopsia-muscular", "Biopsia muscular", "innecesario", "No se realizó.", "CPK normal y fuerza conservada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pmr", "Polimialgia reumática", true, "Mayor de 50 con dolor y rigidez de cinturas, VSG alta, CPK normal y bursitis en la ecografía."),
      dx("ar", "Artritis reumatoidea de inicio tardío", false, "Sin sinovitis periférica y FR y anti-CCP negativos."),
      dx("polimiositis", "Polimiositis", false, "Fuerza y CPK normales."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "TSH normal."),
      dx("fibromialgia", "Fibromialgia", false, "Reactantes elevados."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("prednisona", "Prednisona en dosis bajas (12,5 a 25 mg) con descenso lento", "clave", "Respuesta rápida y diagnóstica."),
      mg("osteoporosis", "Calcio, vitamina D y evaluar bifosfonato", "clave", "Corticoides prolongados."),
      mg("alarma-acg", "Pautas de alarma de arteritis temporal", "clave", "Asociación del 15 al 20 %."),
      mg("seguimiento", "Control de glucemia y presión", "util", "Efectos del corticoide."),
      mg("dosis-altas", "Prednisona 1 mg/kg", "riesgoso", "Dosis de arteritis; efectos adversos innecesarios."),
      mg("aines-cronicos", "AINE crónicos como único tratamiento", "riesgoso", "Insuficientes y tóxicos a esta edad."),
    ],
  },
  debrief: {
    diagnosis: "Polimialgia reumática, en mujer de 72 años.",
    pathologies: [
      { name: "Polimialgia reumática", role: "principal", why: "Inflamación de bursas y estructuras periarticulares." },
      { name: "Riesgo de arteritis de células gigantes", role: "asociada", why: "Enfermedades relacionadas." },
      { name: "AR, polimiositis", role: "diferencial", why: "Otros cuadros de cinturas." },
    ],
    reasoning: [
      "Causa: inmunomediada, en mayores de 50.",
      "Mecanismo: bursitis y sinovitis de las cinturas escapular y pelviana.",
      "Consecuencia: dolor, rigidez y limitación funcional.",
    ],
    epidemiology:
      "Es la enfermedad inflamatoria más frecuente de adultos mayores después de la artritis reumatoidea. Predomina en mujeres mayores de 50. La respuesta espectacular a dosis bajas de prednisona apoya el diagnóstico.",
    management: [
      "Clínica y reactantes.",
      "Excluir diferenciales.",
      "Prednisona baja.",
      "Vigilar arteritis.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Polimialgia reumática.", "EULAR/ACR — Recommendations for the Management of Polymyalgia Rheumatica."],
    pearls: ["Cinturas, rigidez y VSG alta.", "Fuerza normal.", "Preguntá por cefalea y visión."],
    pitfalls: ["Dosis altas.", "Olvidar la arteritis."],
    tribunal: [
      qa("¿Qué síntomas sugieren arteritis temporal asociada?", "Cefalea nueva, claudicación mandibular, alteraciones visuales y arteria temporal engrosada."),
      qa("¿Qué pasa si no responde a la prednisona en dosis baja?", "Hay que replantear el diagnóstico."),
      qa("¿Cuánto dura el tratamiento?", "En general uno a dos años con descenso lento."),
    ],
  },
};
