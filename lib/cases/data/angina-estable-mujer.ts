import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anginaEstableMujer: ClinicalCase = {
  id: "angina-estable-mujer-diabetica",
  level: 2,
  area: "Cardiovascular",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "F", context: "Diabética tipo 2 hace 15 años. Hipertensa. No fuma. Menopausia a los 46." },
  frequency: "frecuente",
  intro: "“Hace dos meses, cuando camino rápido o subo la cuesta del barrio, me falta el aire y me agarra una presión en la mandíbula. Se me pasa al parar.”",
  vitals: { TA: "142/84 mmHg", FC: "78 lpm", "T°": "36,4 °C", Peso: "76 kg" },
  anamnesis: [
    act("sintomas", "¿Qué siente y cuándo?", "clave", "“Falta de aire y presión en la mandíbula al esfuerzo.”", "Equivalente anginoso."),
    act("alivio", "¿Se le pasa al parar?", "clave", "“En dos o tres minutos.”", "Angina estable."),
    act("reposo", "¿Le pasó en reposo o empeoró?", "clave", "“No.”", "Descartar inestable."),
    act("diabetes", "¿Cómo está la diabetes?", "util", "“HbA1c de 8.”", "Factor de riesgo."),
    act("colesterol", "¿Toma estatina?", "util", "“No.”", "Prevención no hecha."),
    act("nietos", "¿Con quién vive?", "neutro", "“Con mi marido.”", "No orienta."),
  ],
  exam: [
    act("cardio", "Examen cardiovascular", "clave", "Normal.", "Frecuente en angina estable."),
    act("pulsos", "Pulsos periféricos", "clave", "Pedios disminuidos.", "Aterosclerosis difusa."),
    act("pies", "Pies", "util", "Hipoestesia en calcetín.", "Neuropatía: síntomas atípicos."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG en reposo", "clave", "Normal.", "No descarta."),
    study("Imágenes", "estres", "Prueba funcional (eco estrés o perfusión) o angio-TC coronaria", "clave", "Isquemia inferolateral moderada.", "Confirma."),
    study("Laboratorio", "lab", "Lípidos, HbA1c, función renal", "util", "LDL 142; HbA1c 8,1 %.", "Factores."),
    study("Otros", "tranquilizar", "Atribuirlo a ansiedad o a la edad sin estudiar", "riesgoso", "No se hizo.", "Las mujeres son subdiagnosticadas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("angina", "Angina estable con equivalente anginoso (disnea y dolor mandibular) en mujer diabética", true, "Síntomas reproducibles con el esfuerzo que ceden al reposo e isquemia en la prueba funcional."),
      dx("ansiedad", "Ansiedad", false, "Isquemia demostrada."),
      dx("scasest", "Síndrome coronario agudo", false, "Patrón estable."),
      dx("dental", "Dolor dental", false, "Es de esfuerzo y cede al reposo."),
      dx("epoc", "EPOC", false, "No fuma e isquemia demostrada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aspirina-estatina", "Aspirina y estatina de alta intensidad", "clave", "Prevención de eventos."),
      mg("antianginoso", "Betabloqueante y nitrato sublingual", "clave", "Síntomas."),
      mg("diabetes", "Optimizar diabetes con arGLP-1 o iSGLT2", "clave", "Beneficio cardiovascular."),
      mg("pautas", "Pautas de angina inestable", "util", "Consultar si cambia."),
      mg("aines", "AINE para el dolor mandibular", "riesgoso", "Riesgo cardiovascular."),
      mg("sin-tratar", "Tranquilizar sin tratar", "riesgoso", "Infarto."),
    ],
  },
  debrief: {
    diagnosis: "Angina estable con equivalente anginoso, en mujer diabética de 64 años.",
    pathologies: [
      { name: "Angina estable", role: "principal", why: "Isquemia con el esfuerzo." },
      { name: "Diabetes y neuropatía", role: "asociada", why: "Síntomas atípicos." },
      { name: "Ansiedad, SCA", role: "diferencial", why: "Errores frecuentes." },
    ],
    reasoning: [
      "Causa: aterosclerosis coronaria acelerada por diabetes e hipertensión.",
      "Mecanismo: desbalance entre oferta y demanda de oxígeno en el esfuerzo.",
      "Consecuencia: síntomas reproducibles y riesgo de infarto.",
    ],
    epidemiology:
      "La enfermedad coronaria es la principal causa de muerte en mujeres. Las mujeres y los diabéticos presentan más a menudo disnea, fatiga o dolor en mandíbula. Esto lleva a subdiagnóstico y menos tratamiento.",
    management: [
      "Sospechar.",
      "Prueba funcional.",
      "Prevención secundaria.",
      "Antianginosos.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síndromes coronarios crónicos.", "ESC — Chronic Coronary Syndromes Guidelines."],
    pearls: ["Disnea de esfuerzo es equivalente anginoso.", "Mujer diabética: síntomas atípicos.", "Estatina."],
    pitfalls: ["Llamarlo ansiedad.", "No estudiar."],
    tribunal: [
      qa("¿Qué define angina típica?", "Dolor retroesternal, desencadenado por esfuerzo o emoción y que cede con reposo o nitratos."),
      qa("¿Qué es un equivalente anginoso?", "Síntoma distinto al dolor, como disnea o fatiga, que representa isquemia."),
      qa("¿Qué fármacos para diabetes reducen eventos cardiovasculares?", "Agonistas de GLP-1 e inhibidores de SGLT2."),
    ],
  },
};
