import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const icFepAdultaMayor: ClinicalCase = {
  id: "ic-fraccion-preservada-adulta-mayor",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Hipertensa, obesa, con diabetes tipo 2 y fibrilación auricular. Usa ibuprofeno por las rodillas." },
  frequency: "muy-frecuente",
  intro: "“Me agito mucho al caminar, se me hinchan las piernas, y a la noche uso más almohadas.”",
  vitals: { TA: "164/84 mmHg", FC: "88 lpm", FR: "22 rpm", "T°": "36,4 °C", "SatO₂": "93 %", Peso: "86 kg" },
  anamnesis: [
    act("disnea", "¿Desde cuándo y con qué esfuerzo?", "clave", "“Hace un mes, con media cuadra; me despierto ahogada.”", "Disnea paroxística nocturna: congestión."),
    act("aines", "¿Qué medicación tomás? ¿Antiinflamatorios? ¿Sal?", "clave", "“Ibuprofeno todos los días y como salado.”", "Los AINE retienen sodio y descompensan."),
    act("adherencia", "¿Tomás los diuréticos y anticoagulante?", "clave", "“Si me acuerdo.”", "Causa frecuente de descompensación."),
    act("dolor", "¿Dolor de pecho o palpitaciones?", "util", "“Palpitaciones a veces.”", "Isquemia o arritmia como desencadenantes."),
    act("infeccion", "¿Fiebre, tos o ardor al orinar?", "util", "“No.”", "Otros desencadenantes."),
    act("nieta", "¿Quién te acompaña?", "neutro", "“Mi nieta.”", "Útil para el cuidado, pero no define el diagnóstico."),
  ],
  exam: [
    act("congestion", "Signos de congestión", "clave", "Yugulares ingurgitadas, rales bibasales, edema hasta las rodillas.", "IC congestiva."),
    act("corazon", "Corazón", "clave", "Pulso irregular, cuarto ruido ausente por la FA, soplo sistólico leve.", "FA."),
    act("perfusion", "Perfusión", "util", "Extremidades calientes.", "Húmeda y caliente: responde a diuréticos."),
  ],
  studies: [
    study("Laboratorio", "bnp", "BNP o NT-proBNP", "clave", "NT-proBNP 2.400 pg/ml.", "Apoya IC; aumenta con edad, FA y enfermedad renal."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "FEVI 60 %, hipertrofia del VI, aurícula izquierda dilatada, presión pulmonar alta.", "IC con FE preservada."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Cardiomegalia, redistribución de flujo, derrame pequeño.", "Congestión."),
    study("Laboratorio", "lab", "Función renal, ionograma, TSH, hemograma", "clave", "Creatinina 1,3, K 4,4, Hb 11.", "Comorbilidades que cambian el tratamiento."),
    study("Otros", "cateterismo", "Cateterismo de rutina", "innecesario", "No se realizó.", "Solo si hay sospecha de isquemia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("icfep", "Insuficiencia cardíaca con fracción de eyección preservada descompensada", true, "Congestión, NT-proBNP alto, FEVI normal con hipertrofia y aurícula grande, y comorbilidades típicas."),
      dx("icfer", "IC con FE reducida", false, "La FEVI es del 60 %."),
      dx("epoc", "EPOC", false, "No fuma ni tiene obstrucción, y hay congestión."),
      dx("renal", "Síndrome nefrótico", false, "La disnea, yugulares y BNP orientan al corazón."),
      dx("venosa", "Insuficiencia venosa", false, "No explica la disnea ni la ortopnea."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("diuretico", "Diurético de asa y control de peso", "clave", "Alivia la congestión."),
      mg("isglt2", "Inhibidor de SGLT2", "clave", "Reduce las internaciones en IC con FE preservada."),
      mg("comorbilidades", "Controlar presión y FA (anticoagular), descender peso", "clave", "Son el motor de la enfermedad."),
      mg("aines", "Suspender el ibuprofeno; paracetamol y kinesiología", "clave", "Elimina un desencadenante."),
      mg("no-sal", "Ejercicio supervisado, dieta sin sal y vacunas", "util", "Mejoran la capacidad funcional."),
      mg("digoxina", "Digoxina de rutina", "riesgoso", "Sin indicación clara y con riesgo de toxicidad en una adulta mayor."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia cardíaca con FE preservada descompensada por AINE y falta de adherencia, con FA, en mujer de 79 años.",
    pathologies: [
      { name: "IC con FE preservada", role: "principal", why: "Disfunción diastólica con presiones de llenado altas." },
      { name: "Fibrilación auricular, HTA, obesidad, diabetes", role: "asociada", why: "Comorbilidades." },
      { name: "IC con FE reducida, EPOC, insuficiencia venosa", role: "diferencial", why: "Otras causas de disnea y edema." },
    ],
    reasoning: [
      "Causa: HTA, envejecimiento, obesidad y diabetes.",
      "Mecanismo: la rigidez del VI eleva las presiones de llenado con FEVI normal.",
      "Consecuencia: congestión pulmonar y sistémica, intolerancia al ejercicio.",
    ],
    epidemiology:
      "Representa cerca de la mitad de los casos de IC, y es más común en mujeres mayores con hipertensión, obesidad, diabetes y FA. Su prevalencia aumenta con el envejecimiento. Antes tenía pocos tratamientos; los iSGLT2 cambiaron eso.",
    management: [
      "Confirmar con ecocardiograma y BNP.",
      "Diuréticos y iSGLT2.",
      "Tratar comorbilidades y suspender AINE.",
      "Educación, peso diario, vacunas.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de insuficiencia cardíaca.", "ESC — Guía de insuficiencia cardíaca."],
    pearls: ["FEVI normal no descarta IC.", "AINE descompensan.", "iSGLT2 también en FE preservada."],
    pitfalls: ["Decir que es normal por tener FEVI del 60 %.", "Olvidar anticoagular la FA."],
    tribunal: [
      qa("¿Cómo se clasifica la IC por FEVI?", "Reducida: 40 % o menos. Levemente reducida: 41 a 49 %. Preservada: 50 % o más."),
      qa("¿Cuáles son los criterios de Framingham?", "Mayores como disnea paroxística nocturna, ingurgitación yugular, rales, cardiomegalia, edema agudo de pulmón, tercer ruido. Menores como edema, tos nocturna, disnea de esfuerzo, hepatomegalia."),
      qa("¿Por qué los AINE descompensan la IC?", "Inhiben prostaglandinas renales, por lo que retienen sodio y agua, y aumentan la resistencia vascular."),
    ],
  },
};
