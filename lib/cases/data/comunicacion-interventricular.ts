import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const comunicacionInterventricular: ClinicalCase = {
  id: "cardiopatia-congenita-comunicacion-interventricular",
  level: 2,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 3, ageUnit: "meses", sex: "F", context: "Nació a término, sana. La traen al control de niño sano." },
  frequency: "frecuente",
  intro: "“Le cuesta terminar la mamadera: se cansa, transpira la frente y casi no sube de peso.”",
  vitals: { FC: "156 lpm", FR: "62 rpm", "T°": "36,7 °C", "SatO₂": "98 %", Peso: "4,4 kg" },
  anamnesis: [
    act("alimentacion", "¿Cuánto tarda en comer? ¿Transpira o se agita?", "clave", "“Más de 40 minutos; suda y descansa.”", "Equivale a disnea de esfuerzo del lactante."),
    act("peso", "¿Cómo viene el peso?", "clave", "“Muy poco.”", "Falla de crecimiento."),
    act("cianosis", "¿Se pone morada cuando llora?", "clave", "“Nunca.”", "Orienta a cardiopatía acianótica."),
    act("infecciones", "¿Bronquiolitis o neumonías?", "util", "“Una bronquiolitis.”", "El hiperflujo favorece infecciones."),
    act("gestacion", "¿Diabetes, rubéola o Síndrome de Down?", "util", "“No.”", "Asociaciones."),
    act("ropa", "¿De qué color es la ropa que le gusta?", "neutro", "“Amarilla.”", "No orienta."),
  ],
  exam: [
    act("soplo", "Corazón", "clave", "Soplo holosistólico III/VI en borde esternal izquierdo bajo; segundo ruido aumentado.", "Típico de CIV con hiperflujo."),
    act("congestion", "Hígado y pulmón", "clave", "Hepatomegalia de 3 cm, taquipnea, tiraje.", "Insuficiencia cardíaca."),
    act("crecimiento", "Peso y pulsos", "util", "Peso bajo; pulsos femorales normales.", "Excluye coartación."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecocardiograma Doppler", "clave", "CIV perimembranosa grande, cortocircuito izquierda-derecha, ventrículo izquierdo dilatado.", "Confirma."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Cardiomegalia y flujo pulmonar aumentado.", "Hiperflujo."),
    study("Electrofisiología", "ecg", "ECG y saturación pre y posductal", "util", "Sobrecarga biventricular, saturación normal.", "Sin cianosis."),
    study("Otros", "cateterismo", "Cateterismo de rutina", "innecesario", "No se realizó.", "Solo si hay dudas de resistencia pulmonar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("civ", "Comunicación interventricular grande con insuficiencia cardíaca e hiperflujo pulmonar", true, "Cansancio al comer, soplo holosistólico, hepatomegalia y eco."),
      dx("fallot", "Tetralogía de Fallot", false, "Es cianótica con flujo pulmonar disminuido."),
      dx("cia", "Comunicación interauricular", false, "Rara vez da insuficiencia cardíaca en lactantes y da desdoblamiento fijo."),
      dx("bronquiolitis", "Bronquiolitis", false, "El soplo, la hepatomegalia y la mala curva no se explican."),
      dx("coartacion", "Coartación de aorta", false, "Pulsos femorales normales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivar a cardiología infantil para cierre quirúrgico antes del daño pulmonar", "clave", "CIV grande sintomática."),
      mg("diureticos", "Furosemida y optimizar calorías", "clave", "Mejora síntomas y crecimiento."),
      mg("vacunas", "Vacunas completas y anticuerpo contra VSR", "clave", "Reduce infecciones graves."),
      mg("bacteriana", "Higiene bucal y profilaxis de endocarditis según corresponda", "util", "Prevención."),
      mg("esperar", "Decir que se cierra sola y control en 2 años", "riesgoso", "Con IC, riesgo de hipertensión pulmonar irreversible."),
      mg("oxigeno", "Oxígeno a alto flujo crónico en casa", "riesgoso", "Vasodilata y aumenta el cortocircuito."),
    ],
  },
  debrief: {
    diagnosis: "Comunicación interventricular perimembranosa grande con insuficiencia cardíaca, hiperflujo pulmonar y falla de crecimiento, en lactante de 3 meses.",
    pathologies: [
      { name: "Comunicación interventricular", role: "principal", why: "Cardiopatía congénita más frecuente." },
      { name: "Insuficiencia cardíaca, falla de crecimiento", role: "asociada", why: "Consecuencias." },
      { name: "Fallot, CIA, coartación", role: "diferencial", why: "Otras cardiopatías." },
    ],
    reasoning: [
      "Causa: defecto en el tabique interventricular.",
      "Mecanismo: al bajar la resistencia pulmonar tras el nacimiento, sangre pasa de izquierda a derecha.",
      "Consecuencia: hiperflujo, IC e hipertensión pulmonar; a largo plazo, Eisenmenger.",
    ],
    epidemiology:
      "Las cardiopatías congénitas afectan a cerca de 8 a 10 de cada 1.000 nacidos, y la CIV es la más común. Muchas CIV pequeñas se cierran espontáneamente; las grandes requieren corrección en el primer año para evitar daño vascular pulmonar irreversible.",
    management: [
      "Sospechar ante soplo con mal progreso.",
      "Ecocardiograma.",
      "Tratamiento médico inicial.",
      "Cierre oportuno.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso sobre cardiopatías congénitas.", "Ministerio de Salud de la Nación — Programa Nacional de Cardiopatías Congénitas."],
    pearls: ["Cansancio al comer: disnea del lactante.", "Soplo holosistólico en borde bajo.", "Síntomas a las 4 a 8 semanas."],
    pitfalls: ["Asumir que cierra sola con síntomas.", "Confundirla con bronquiolitis."],
    tribunal: [
      qa("¿Cuáles son las cardiopatías acianóticas y cianóticas?", "Acianóticas: CIV, CIA, ductus, coartación. Cianóticas: Fallot, transposición, atresias, truncus."),
      qa("¿Qué es el síndrome de Eisenmenger?", "La hipertensión pulmonar invierte el cortocircuito y aparece cianosis irreversible."),
      qa("¿Por qué la CIV no da síntomas al nacer?", "La resistencia pulmonar es alta; baja en semanas y entonces aumenta el cortocircuito."),
    ],
  },
};
