import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const asmaAines: ClinicalCase = {
  id: "crisis-asma-enfermedad-respiratoria-aines",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Asma desde los 30, pólipos nasales operados, no huele. Tomó ibuprofeno hace una hora por dolor de muelas." },
  frequency: "poco-frecuente",
  intro: "“A la media hora de tomar ibuprofeno se me tapó la nariz, se me puso roja la cara y me falta el aire.”",
  vitals: { TA: "124/78 mmHg", FC: "118 lpm", FR: "30 rpm", "T°": "36,6 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("relacion", "¿Empezó después de un remedio?", "clave", "“Ibuprofeno, media hora después.”", "Gatillo."),
    act("polipos", "¿Pólipos nasales, olfato?", "clave", "“Operada; no huelo.”", "Tríada."),
    act("previo", "¿Te pasó antes con aspirina?", "clave", "“Con aspirina, una vez.”", "Hipersensibilidad."),
    act("anafilaxia", "¿Ronchas o hinchazón en labios?", "util", "“No.”", "Anafilaxia."),
    act("controlador", "¿Usás corticoide inhalado?", "util", "“A veces.”", "Control."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Soy contadora.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Sibilancias difusas, uso de accesorios.", "Crisis grave."),
    act("nariz", "Nariz", "clave", "Congestión y rinorrea.", "Componente nasal."),
    act("piel", "Piel", "util", "Rubor facial sin urticaria.", "No es anafilaxia típica."),
  ],
  studies: [
    study("Otros", "pef", "Pico flujo", "clave", "40 % del predicho.", "Grave."),
    study("Laboratorio", "gases", "Gases", "clave", "pCO₂ 40.", "Normal en crisis: alarma."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Hiperinsuflación.", "Excluye neumotórax."),
    study("Otros", "provocacion", "Provocación con aspirina ahora para confirmar", "riesgoso", "No se realizó.", "Peligroso en crisis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erea", "Crisis asmática grave por enfermedad respiratoria exacerbada por AINE", true, "Asma, pólipos, anosmia y crisis tras ibuprofeno."),
      dx("anafilaxia", "Anafilaxia", false, "Sin urticaria ni hipotensión."),
      dx("viral", "Crisis viral", false, "Gatillo claro."),
      dx("epoc", "EPOC", false, "Asma con tríada."),
      dx("vcd", "Disfunción de cuerdas vocales", false, "Sibilancias difusas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("salbutamol", "Salbutamol e ipratropio", "clave", "Broncodilatación."),
      mg("corticoide", "Corticoide sistémico y oxígeno", "clave", "Crisis grave."),
      mg("magnesio", "Sulfato de magnesio EV", "clave", "Crisis grave."),
      mg("evitar", "Evitar AINE inhibidores de COX-1; paracetamol en dosis moderadas", "clave", "Prevención."),
      mg("aspirina-mg", "Aspirina para el dolor", "riesgoso", "Desencadena."),
      mg("betabloqueante", "Betabloqueante por la taquicardia", "riesgoso", "Broncoespasmo."),
    ],
  },
  debrief: {
    diagnosis: "Crisis asmática grave por enfermedad respiratoria exacerbada por AINE (tríada de Samter), en mujer de 41 años.",
    pathologies: [
      { name: "Enfermedad respiratoria exacerbada por AINE", role: "principal", why: "Asma, pólipos e intolerancia a AINE." },
      { name: "Crisis asmática grave", role: "asociada", why: "Forma de presentación." },
      { name: "Anafilaxia, crisis viral", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: alteración del metabolismo del ácido araquidónico.",
      "Mecanismo: al inhibir COX-1 se desvía la vía a leucotrienos.",
      "Consecuencia: broncoespasmo y congestión nasal.",
    ],
    epidemiology:
      "Afecta a una parte de los adultos asmáticos, más con pólipos nasales. Suele comenzar en la adultez. Los inhibidores COX-2 suelen tolerarse, y puede considerarse desensibilización con aspirina en casos seleccionados.",
    management: [
      "Tratar la crisis.",
      "Identificar la tríada.",
      "Evitar AINE.",
      "Controlador y ORL.",
    ],
    sources: ["Asociación Argentina de Alergia e Inmunología Clínica — EREA.", "GINA — Global Strategy for Asthma Management."],
    pearls: ["Asma, pólipos y anosmia: pensá EREA.", "Evitar AINE.", "pCO₂ normal en crisis: alarma."],
    pitfalls: ["Dar otro AINE.", "No reconocer la tríada."],
    tribunal: [
      qa("¿Qué es la tríada de Samter?", "Asma, pólipos nasales e intolerancia a aspirina y AINE."),
      qa("¿Qué antiinflamatorios se toleran?", "Los inhibidores selectivos de COX-2 suelen tolerarse; el paracetamol en dosis moderadas."),
      qa("¿Qué biológicos se usan en pólipos?", "Dupilumab, omalizumab y mepolizumab."),
    ],
  },
};
