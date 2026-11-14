import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const enfermedadNodoSinusal: ClinicalCase = {
  id: "enfermedad-nodo-sinusal",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Hipertensa. Toma amlodipina. Vive con su hija." },
  frequency: "frecuente",
  intro: "“Me mareo de golpe, a veces siento el corazón a mil y otras como que se para. La semana pasada me caí.”",
  vitals: { TA: "138/76 mmHg", FC: "44 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("episodios", "¿Cómo son los episodios?", "clave", "“Palpitaciones rápidas y después un mareo fuerte.”", "Taquicardia seguida de pausa."),
    act("caida", "¿Cómo fue la caída?", "clave", "“Se me nubló todo y me caí en la cocina.”", "Síncope o presíncope."),
    act("farmacos", "¿Toma betabloqueantes, digoxina, diltiazem o donepecilo?", "clave", "“Solo amlodipina.”", "Descartar bradicardia por fármacos."),
    act("esfuerzo", "¿Se cansa con el esfuerzo?", "util", "“Me falta el aire subiendo.”", "Incompetencia cronotrópica."),
    act("tiroides", "¿Frío, constipación, sueño?", "util", "“No.”", "Hipotiroidismo."),
    act("nieta", "¿Qué hace en el día?", "neutro", "“Cuido a mi nieta.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso", "clave", "Lento e irregular.", "Disfunción sinusal."),
    act("caida-ex", "Lesiones por la caída", "clave", "Hematoma en el muslo, sin fracturas.", "Consecuencia."),
    act("ortostatismo", "Ortostatismo", "util", "Negativo.", "No es hipotensión ortostática."),
  ],
  studies: [
    study("Electrofisiología", "holter", "Holter de 24 horas", "clave", "Fibrilación auricular rápida que termina con pausas sinusales de 4,5 segundos sintomáticas.", "Síndrome taqui-bradi."),
    study("Electrofisiología", "ecg", "ECG", "clave", "Bradicardia sinusal de 44.", "Disfunción sinusal."),
    study("Laboratorio", "lab", "TSH, potasio, función renal", "util", "Normales.", "Causas reversibles."),
    study("Imágenes", "tc", "TC de cerebro por mareos", "innecesario", "No se realizó.", "La causa es cardíaca."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("taqui-bradi", "Enfermedad del nódulo sinusal con síndrome taquicardia-bradicardia", true, "FA paroxística que termina en pausas sintomáticas mayores de 3 segundos."),
      dx("bloqueo-av", "Bloqueo AV completo", false, "Las pausas son sinusales."),
      dx("vppb", "Vértigo posicional", false, "Síntomas con pausas documentadas."),
      dx("farmacos", "Bradicardia por fármacos", false, "No toma bradicardizantes."),
      dx("ortostatica", "Hipotensión ortostática", false, "Ortostatismo negativo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("marcapasos", "Marcapasos definitivo", "clave", "Pausas sintomáticas."),
      mg("anticoagular", "Anticoagular según CHA₂DS₂-VASc", "clave", "Tiene FA."),
      mg("control-fc", "Control de frecuencia de la FA después del marcapasos", "clave", "El marcapasos permite dar fármacos."),
      mg("caidas", "Prevención de caídas", "util", "Riesgo."),
      mg("betabloq-sin-mp", "Betabloqueantes para la FA sin marcapasos", "riesgoso", "Empeoran las pausas."),
      mg("teofilina", "Solo teofilina de por vida", "riesgoso", "No resuelve y tiene toxicidad."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad del nódulo sinusal con síndrome taquicardia-bradicardia y caída, en mujer de 79 años.",
    pathologies: [
      { name: "Enfermedad del nódulo sinusal", role: "principal", why: "Degeneración del sistema de conducción." },
      { name: "Fibrilación auricular paroxística", role: "asociada", why: "Parte del síndrome." },
      { name: "Bloqueo AV, ortostatismo", role: "diferencial", why: "Otras causas de síncope." },
    ],
    reasoning: [
      "Causa: fibrosis del nódulo sinusal con la edad.",
      "Mecanismo: el nódulo enfermo no se recupera al terminar la taquicardia.",
      "Consecuencia: pausas con mareo, síncope y caídas.",
    ],
    epidemiology:
      "Es una de las causas más frecuentes de marcapasos en adultos mayores. Se asocia a fibrilación auricular, que complica el tratamiento porque los fármacos que la controlan empeoran las pausas. El Holter es el estudio clave.",
    management: [
      "Holter.",
      "Descartar fármacos.",
      "Marcapasos.",
      "Anticoagulación.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de estimulación cardíaca.", "ESC — Cardiac Pacing and Cardiac Resynchronization Therapy Guidelines."],
    pearls: ["Rápido y después pausa.", "Holter.", "Marcapasos antes de frenar la FA."],
    pitfalls: ["Betabloqueante sin marcapasos.", "Atribuir las caídas a la edad."],
    tribunal: [
      qa("¿Qué es la incompetencia cronotrópica?", "Incapacidad de aumentar la FC con el esfuerzo de manera adecuada."),
      qa("¿Qué pausa se considera significativa?", "Pausas mayores de 3 segundos, sobre todo si dan síntomas."),
      qa("¿Qué fármacos producen bradicardia?", "Betabloqueantes, diltiazem, verapamilo, digoxina, amiodarona y donepecilo."),
    ],
  },
};
