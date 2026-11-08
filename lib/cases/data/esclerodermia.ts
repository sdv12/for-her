import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const esclerodermia: ClinicalCase = {
  id: "esclerodermia-difusa",
  level: 3,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 46, ageUnit: "años", sex: "F", context: "Administrativa. Un año de síntomas sin diagnóstico. Toma ibuprofeno seguido." },
  frequency: "poco-frecuente",
  intro: "“Con el frío los dedos se me ponen blancos y después morados. Se me endureció la piel de las manos, me cuesta tragar y me falta el aire.”",
  vitals: { TA: "172/100 mmHg", FC: "92 lpm", FR: "22 rpm", "T°": "36,6 °C", "SatO₂": "92 %", Peso: "54 kg" },
  anamnesis: [
    act("raynaud", "¿Cómo es lo de los dedos? ¿Heridas?", "clave", "“Blancos, morados y rojos; heridas en las yemas.”", "Raynaud secundario grave."),
    act("piel", "¿Qué partes se endurecieron?", "clave", "“Manos, brazos y cara; me cuesta abrir la boca.”", "Difusa."),
    act("visceral", "¿Reflujo, falta de aire, tos?", "clave", "“Todo.”", "Compromiso visceral."),
    act("cefalea", "¿Dolor de cabeza u orina escasa?", "util", "“Dolor de cabeza desde hace unos días.”", "Crisis renal."),
    act("corticoides", "¿Te dieron corticoides?", "util", "“Hace 3 semanas, prednisona en altas dosis.”", "Precipitan crisis renal."),
    act("oficina", "¿Dónde trabajás?", "neutro", "“En una inmobiliaria.”", "No orienta."),
  ],
  exam: [
    act("piel-ex", "Piel y cara", "clave", "Esclerodactilia, piel engrosada hasta el codo, microstomía, telangiectasias.", "Forma difusa."),
    act("capilares", "Dedos y capilaroscopia", "clave", "Cicatrices digitales, megacapilares.", "Microangiopatía."),
    act("pulmon", "Pulmón y fondo de ojo", "clave", "Crepitantes velcro en bases; fondo con exudados.", "Intersticio y crisis."),
  ],
  studies: [
    study("Laboratorio", "autoinmune", "ANA, anti-Scl-70, anticentrómero, anti-RNA pol III", "clave", "ANA +; anti-RNA polimerasa III +.", "Clasifica y predice riesgo renal."),
    study("Laboratorio", "renal", "Creatinina, orina, hemograma con frotis", "clave", "Creatinina 2,4; esquistocitos.", "Crisis renal."),
    study("Imágenes", "tcar", "TC de alta resolución y funcional respiratorio", "clave", "Enfermedad intersticial tipo NINE; DLCO baja.", "Fibrosis."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "PSAP elevada.", "Hipertensión pulmonar."),
    study("Otros", "biopsia-renal", "Biopsia renal antes de tratar", "riesgoso", "No se realizó.", "HTA descontrolada, no se debe demorar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("esclerosis", "Esclerodermia sistémica difusa con crisis renal, enfermedad intersticial e hipertensión pulmonar", true, "Raynaud, esclerodactilia, compromiso pulmonar, anti-RNA pol III y crisis hipertensiva con esquistocitos."),
      dx("crest", "Forma limitada (CREST)", false, "Compromete el tronco proximal; el anticentrómero es negativo."),
      dx("lupus", "Lupus", false, "Faltan anti-dsDNA y eritema."),
      dx("mixta", "Enfermedad mixta del tejido conectivo", false, "No hay anti-RNP."),
      dx("suh", "PTT", false, "La crisis se explica por la esclerodermia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ieca", "IECA de acción corta (captopril), con ajustes rápidos", "clave", "Es el tratamiento de la crisis renal."),
      mg("internar", "Internar, con reumatología y nefrología", "clave", "Riesgo vital."),
      mg("ild", "Micofenolato u otros para pulmón", "clave", "Enfermedad intersticial."),
      mg("raynaud", "Bloqueantes cálcicos, abrigo, dejar tabaco", "util", "Raynaud."),
      mg("corticoide-alto", "Aumentar corticoides en altas dosis", "riesgoso", "Precipitan la crisis renal."),
      mg("sin-ieca", "Evitar IECA porque subió la creatinina", "riesgoso", "Son vitales aunque suba."),
    ],
  },
  debrief: {
    diagnosis: "Esclerodermia sistémica difusa con crisis renal esclerodérmica, enfermedad pulmonar intersticial e hipertensión pulmonar, en mujer de 46 años.",
    pathologies: [
      { name: "Esclerodermia difusa", role: "principal", why: "Enfermedad autoinmune fibrosante." },
      { name: "Crisis renal, fibrosis pulmonar", role: "asociada", why: "Definen pronóstico." },
      { name: "Lupus, mixta, CREST", role: "diferencial", why: "Otras colagenopatías." },
    ],
    reasoning: [
      "Causa: autoinmunidad con factores ambientales.",
      "Mecanismo: daño vascular y fibrosis.",
      "Consecuencia: Raynaud, piel gruesa y daño de órganos.",
    ],
    epidemiology:
      "Es más frecuente en mujeres de 30 a 50 años. La enfermedad intersticial y la hipertensión pulmonar son las principales causas de muerte. La crisis renal cambió gracias a los IECA, y los corticoides en dosis altas son un factor de riesgo reconocido.",
    management: [
      "Raynaud con signos: capilaroscopia.",
      "Anticuerpos.",
      "Screening visceral.",
      "IECA ante crisis.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Esclerosis sistémica.", "EULAR — Recommendations for Systemic Sclerosis."],
    pearls: ["IECA aunque suba la creatinina.", "Cuidado con corticoides.", "Crepitantes velcro."],
    pitfalls: ["Suspender IECA.", "No vigilar la presión."],
    tribunal: [
      qa("¿Qué es CREST?", "Calcinosis, Raynaud, dismotilidad esofágica, esclerodactilia y telangiectasias."),
      qa("¿Qué anticuerpos caracterizan cada forma?", "Anti-Scl-70 y anti-RNA polimerasa III a la difusa; anticentrómero a la limitada."),
      qa("¿Qué es el Raynaud secundario?", "Tiene isquemia digital, capilaroscopia anormal o anticuerpos, a diferencia del primario."),
    ],
  },
};
