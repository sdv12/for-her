import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const icDescompensadaAines: ClinicalCase = {
  id: "insuficiencia-cardiaca-aines",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "M", context: "Insuficiencia cardíaca con fracción de eyección reducida por infarto previo. Hace 10 días toma diclofenac por artrosis de rodilla." },
  frequency: "muy-frecuente",
  intro: "“No puedo dormir acostado, me ahogo, tengo las piernas hinchadas y subí cuatro kilos en una semana.”",
  vitals: { TA: "152/90 mmHg", FC: "102 lpm", FR: "26 rpm", "T°": "36,4 °C", "SatO₂": "89 %", Peso: "84 kg" },
  anamnesis: [
    act("disnea", "¿Cómo es la falta de aire?", "clave", "“Me ahogo acostado y me despierto ahogado.”", "Ortopnea y disnea paroxística nocturna."),
    act("aines", "¿Qué medicamentos nuevos tomó?", "clave", "“Diclofenac tres veces por día.”", "Retención de sodio."),
    act("adherencia", "¿Toma bien el enalapril, el carvedilol y la furosemida?", "clave", "“Sí.”", "Descartar abandono."),
    act("sal", "¿Comió con más sal?", "util", "“Fiambre en un cumpleaños.”", "Otro desencadenante."),
    act("dolor", "¿Dolor de pecho o palpitaciones?", "util", "“No.”", "Isquemia o arritmia."),
    act("nietos", "¿Con quién vive?", "neutro", "“Con mi esposa.”", "No orienta."),
  ],
  exam: [
    act("congestion", "Rales y yugulares", "clave", "Rales bibasales hasta campos medios, ingurgitación yugular.", "Congestión."),
    act("edemas", "Edemas", "clave", "Edema hasta las rodillas.", "Retención hidrosalina."),
    act("perfusion", "Perfusión", "util", "Caliente, buen relleno.", "Perfil caliente y húmedo."),
  ],
  studies: [
    study("Laboratorio", "lab", "BNP, función renal, ionograma, troponina", "clave", "BNP 1.800; creatinina 1,7 (basal 1,1); K 5,2; troponina sin curva.", "Congestión y daño renal por AINE."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Redistribución de flujo y derrame bilateral.", "Congestión."),
    study("Electrofisiología", "ecg", "ECG", "util", "Sinusal, ondas Q anteriores antiguas.", "Sin isquemia aguda."),
    study("Imágenes", "eco-urgente", "Esperar ecocardiograma para iniciar diurético", "riesgoso", "No se esperó.", "Retrasa el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ic-aines", "Insuficiencia cardíaca descompensada (caliente y húmeda) precipitada por AINE, con deterioro renal", true, "Congestión, aumento de peso, BNP alto y diclofenac reciente con creatinina en ascenso."),
      dx("nac", "Neumonía", false, "Sin fiebre y rales bilaterales con congestión."),
      dx("sca", "Síndrome coronario agudo", false, "Troponina sin curva y sin dolor."),
      dx("epoc", "EPOC exacerbado", false, "Signos de congestión."),
      dx("nefrotico", "Síndrome nefrótico", false, "Hay congestión pulmonar y causa cardíaca."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("furosemida", "Furosemida EV", "clave", "Descongestión."),
      mg("suspender-aine", "Suspender el diclofenac", "clave", "Desencadenante."),
      mg("oxigeno", "Oxígeno y posición sentada", "clave", "Hipoxemia."),
      mg("artrosis", "Analgesia alternativa: paracetamol y kinesiología", "util", "Tratar la artrosis sin AINE."),
      mg("betabloq-suspender", "Suspender el carvedilol de rutina", "riesgoso", "Solo si hay shock o bajo gasto."),
      mg("aine-otro", "Cambiar a otro AINE", "riesgoso", "Mismo efecto."),
    ],
  },
  debrief: {
    diagnosis: "Insuficiencia cardíaca con fracción de eyección reducida descompensada por AINE, perfil caliente y húmedo, con deterioro renal, en varón de 76 años.",
    pathologies: [
      { name: "Insuficiencia cardíaca descompensada", role: "principal", why: "Congestión sistémica y pulmonar." },
      { name: "Daño renal por AINE", role: "asociada", why: "Menor perfusión renal." },
      { name: "Neumonía, SCA", role: "diferencial", why: "Otros desencadenantes o causas." },
    ],
    reasoning: [
      "Causa: diclofenac en un corazón con poca reserva.",
      "Mecanismo: inhibición de prostaglandinas renales con retención de sodio y agua.",
      "Consecuencia: congestión y empeoramiento renal.",
    ],
    epidemiology:
      "Los AINE son una causa frecuente y evitable de descompensación de insuficiencia cardíaca en adultos mayores. Muchos se compran sin receta. Hay que preguntar siempre por ellos en la anamnesis.",
    management: [
      "Perfil hemodinámico.",
      "Diurético.",
      "Suspender AINE.",
      "Optimizar tratamiento.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de insuficiencia cardíaca.", "ESC — Heart Failure Guidelines."],
    pearls: ["Preguntá por AINE.", "Peso diario.", "No suspendas el betabloqueante sin motivo."],
    pitfalls: ["Cambiar de AINE.", "Esperar el eco."],
    tribunal: [
      qa("¿Qué son los perfiles de Stevenson?", "Clasifican por congestión (seco o húmedo) y perfusión (caliente o frío) para guiar el tratamiento."),
      qa("¿Qué fármacos reducen la mortalidad en IC con FEy reducida?", "Betabloqueantes, IECA o sacubitrilo-valsartán, antagonistas de aldosterona e iSGLT2."),
      qa("¿Qué otros desencadenantes hay?", "Abandono de fármacos, sal, infecciones, arritmias, isquemia e hipertensión."),
    ],
  },
};
