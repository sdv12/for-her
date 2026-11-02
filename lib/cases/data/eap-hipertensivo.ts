import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const eapHipertensivo: ClinicalCase = {
  id: "edema-agudo-pulmon-hipertensivo",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 69, ageUnit: "años", sex: "F", context: "Hipertensa que dejó la medicación hace un mes. Comió una picada salada anoche." },
  frequency: "frecuente",
  intro: "“Me desperté ahogada a la madrugada, me tuve que sentar en la cama, no puedo respirar y tengo tos con espuma rosada.”",
  vitals: { TA: "220/120 mmHg", FC: "124 lpm", FR: "34 rpm", "T°": "36,6 °C", "SatO₂": "84 %" },
  anamnesis: [
    act("inicio", "¿Cómo empezó? ¿Te despertó?", "clave", "“De golpe, me desperté ahogada.”", "Disnea paroxística nocturna de inicio brusco: edema agudo de pulmón."),
    act("medicacion", "¿Tomás la medicación para la presión?", "clave", "“La dejé hace un mes.”", "Hipertensión no controlada: desencadenante."),
    act("dolor", "¿Te duele el pecho?", "clave", "“Un poco de opresión.”", "Descartar síndrome coronario como causa."),
    act("sal", "¿Comiste algo salado o tomaste mucho líquido?", "util", "“Picada con fiambres anoche.”", "Sobrecarga de sodio."),
    act("previo", "¿Tenés el corazón agrandado o te dijeron que tenías insuficiencia cardíaca?", "util", "“No.”", "Puede ser la primera manifestación."),
    act("serie", "¿Qué mirabas antes de dormir?", "neutro", "“Una película.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación pulmonar", "clave", "Rales crepitantes hasta los vértices en ambos campos.", "Edema pulmonar."),
    act("perfusion", "Perfusión periférica", "clave", "Extremidades tibias, sudorosa.", "Perfil caliente y húmedo: hipertensivo con congestión."),
    act("cardio", "Auscultación cardíaca y yugulares", "util", "Galope por tercer ruido, yugulares ingurgitadas.", "Insuficiencia cardíaca aguda."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Taquicardia sinusal, hipertrofia ventricular izquierda, sin supradesnivel del ST.", "Descarta IAM con elevación del ST como causa."),
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Infiltrados alveolares bilaterales perihiliares en alas de mariposa, cardiomegalia leve.", "Edema pulmonar."),
    study("Laboratorio", "lab", "Troponina, BNP, ionograma, creatinina, gases", "clave", "BNP muy elevado, troponina levemente alta, pCO₂ 48.", "Insuficiencia cardíaca e hipercapnia incipiente."),
    study("Imágenes", "eco", "Ecocardiograma (después de estabilizar)", "util", "Hipertrofia, fracción de eyección 52 %, disfunción diastólica.", "Insuficiencia cardíaca con fracción conservada."),
    study("Imágenes", "tc", "Tomografía de tórax antes de tratar", "riesgoso", "No se realizó.", "Acostarla y demorar el tratamiento es peligroso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("eap", "Edema agudo de pulmón hipertensivo (insuficiencia cardíaca aguda con fracción conservada) por abandono del tratamiento y exceso de sal", true, "Disnea brusca nocturna, esputo rosado, rales hasta vértices, TA de 220/120, hipoxemia e infiltrados alveolares bilaterales sin IAM."),
      dx("nac", "Neumonía bilateral", false, "Sin fiebre, inicio brusco, hipertensión grave y BNP alto."),
      dx("asma", "Crisis asmática", false, "Los rales y el esputo rosado indican edema."),
      dx("iam", "IAM con elevación del ST", false, "El ECG no muestra supradesnivel."),
      dx("tep", "TEP", false, "Hay congestión pulmonar con hipertensión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sentada", "Sentarla, oxígeno y ventilación no invasiva (CPAP o BiPAP)", "clave", "La VNI reduce el trabajo respiratorio, mejora la oxigenación y evita intubaciones."),
      mg("nitratos", "Nitroglicerina en dosis altas (sublingual y luego EV)", "clave", "Baja la precarga y la poscarga: es el tratamiento central en el EAP hipertensivo."),
      mg("diuretico", "Furosemida EV", "clave", "Elimina el exceso de volumen."),
      mg("monitoreo", "Monitoreo en unidad coronaria o de cuidados intensivos", "util", "Riesgo de falla respiratoria."),
      mg("fluidos", "Expansión con solución fisiológica por la taquicardia", "riesgoso", "Empeora el edema."),
      mg("betabloqueante", "Betabloqueante EV en la fase aguda", "riesgoso", "Puede empeorar la insuficiencia cardíaca aguda."),
    ],
  },
  debrief: {
    diagnosis: "Edema agudo de pulmón hipertensivo por insuficiencia cardíaca aguda con fracción de eyección conservada, desencadenado por abandono del tratamiento antihipertensivo y exceso de sodio, en mujer de 69 años.",
    pathologies: [
      { name: "Edema agudo de pulmón hipertensivo", role: "principal", why: "Congestión pulmonar aguda por aumento brusco de la poscarga." },
      { name: "Hipertensión no controlada", role: "asociada", why: "Desencadenante." },
      { name: "Neumonía, asma, IAM, TEP", role: "diferencial", why: "Otras causas de disnea aguda." },
    ],
    reasoning: [
      "Causa: presión arterial muy elevada sobre un ventrículo hipertrófico y rígido.",
      "Mecanismo: el ventrículo no se llena ni vacía bien frente a una poscarga alta; sube la presión en la aurícula y en los capilares pulmonares, y el líquido pasa al alvéolo.",
      "Consecuencia: disnea súbita, hipoxemia, esputo rosado y riesgo de falla respiratoria.",
    ],
    epidemiology:
      "La insuficiencia cardíaca es una de las principales causas de internación en mayores de 65 años en Argentina. El edema agudo de pulmón hipertensivo es frecuente en mujeres mayores con hipertensión y fracción conservada, desencadenado por abandono de tratamiento, sal o arritmias.",
    management: [
      "Sentar, oxígeno y VNI.",
      "Vasodilatadores (nitratos) y diuréticos.",
      "Buscar y tratar desencadenantes (IAM, arritmias, infección, abandono).",
      "Ajustar el tratamiento crónico y educar en sal y adherencia.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de insuficiencia cardíaca aguda.", "Guías ESC de insuficiencia cardíaca."],
    pearls: ["EAP hipertensivo = nitratos + VNI.", "Perfil caliente y húmedo.", "Buscar el desencadenante."],
    pitfalls: ["Dar fluidos por la taquicardia.", "Acostar a la paciente."],
    tribunal: [
      qa("¿Qué son los perfiles hemodinámicos de Stevenson?", "Se clasifica la insuficiencia cardíaca aguda según congestión (húmedo o seco) y perfusión (caliente o frío): caliente-húmedo (el más frecuente, diuréticos y vasodilatadores), frío-húmedo (inotrópicos), frío-seco (volumen con cautela) y caliente-seco (compensado)."),
      qa("¿Qué diferencia la insuficiencia cardíaca con fracción reducida de la conservada?", "Reducida: FEVI de 40 % o menos, disfunción sistólica, con tratamientos que reducen la mortalidad (IECA/ARNI, betabloqueantes, antagonistas de aldosterona, iSGLT2). Conservada: FEVI de 50 % o más, disfunción diastólica, asociada a hipertensión, obesidad y edad; los iSGLT2 reducen internaciones."),
      qa("¿Qué es la ventilación no invasiva y cuándo se usa?", "Soporte ventilatorio con máscara (CPAP o BiPAP) sin intubar; se usa en el edema agudo de pulmón y en la EPOC exacerbada con acidosis respiratoria; está contraindicada si hay deterioro de conciencia, vómitos o inestabilidad grave."),
    ],
  },
};
