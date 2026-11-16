import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sincopeMiccional: ClinicalCase = {
  id: "sincope-miccional",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Comerciante. Anoche cenó con vino. Tiene hiperplasia prostática." },
  frequency: "frecuente",
  intro: "La esposa: “Se levantó a hacer pis de madrugada y lo encontré tirado en el baño. Se despertó enseguida.”",
  vitals: { TA: "128/78 mmHg", FC: "68 lpm", FR: "16 rpm", "SatO₂": "98 %", Glucemia: "102 mg/dl" },
  anamnesis: [
    act("situacion", "¿Qué estaba haciendo justo antes?", "clave", "“Orinando de pie, después de levantarme de golpe.”", "Síncope situacional miccional."),
    act("prodromo", "¿Sintió algo antes?", "clave", "“Calor, sudor y se me nubló la vista.”", "Pródromo vasovagal."),
    act("palpitaciones", "¿Palpitaciones, dolor de pecho o falta de aire?", "clave", "“No.”", "Descarta causa cardíaca."),
    act("recuperacion", "¿Cómo se recuperó?", "clave", "“En segundos, sin confusión.”", "No es convulsión."),
    act("alcohol", "¿Qué tomó anoche?", "util", "“Media botella de vino.”", "Vasodilatación."),
    act("negocio", "¿Qué vende?", "neutro", "“Ropa.”", "No orienta."),
  ],
  exam: [
    act("ortostatismo", "Presión acostado y de pie", "clave", "Sin caída significativa.", "Sin hipotensión ortostática actual."),
    act("cardio", "Corazón", "clave", "Sin soplos.", "Descarta estenosis aórtica."),
    act("trauma", "Traumatismos", "util", "Contusión en la ceja.", "Por la caída."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Normal.", "Obligatorio en todo síncope."),
    study("Laboratorio", "lab", "Hemograma y glucemia", "util", "Normales.", "Anemia o hipoglucemia."),
    study("Imágenes", "tac", "TC de cerebro", "innecesario", "No se pidió.", "Sin TEC significativo ni foco."),
    study("Electrofisiología", "eeg", "EEG", "innecesario", "No se pidió.", "No hubo convulsión."),
    study("Imágenes", "eco-cardio", "Ecocardiograma", "util", "Normal.", "Opcional ante dudas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sincope-miccional", "Síncope reflejo situacional miccional", true, "Síncope al orinar de pie de madrugada tras alcohol, con pródromo vasovagal, recuperación rápida y ECG normal."),
      dx("arritmico", "Síncope arrítmico", false, "Pródromo típico y ECG normal."),
      dx("ortostatico", "Hipotensión ortostática por alfabloqueantes", false, "No toma alfabloqueantes y no hay ortostatismo."),
      dx("convulsion", "Crisis epiléptica", false, "Recuperación inmediata sin confusión."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicar el mecanismo y que es benigno", "clave", "Tranquiliza."),
      mg("sentarse", "Orinar sentado de noche y levantarse despacio", "clave", "Prevención."),
      mg("alcohol", "Moderar el alcohol de noche", "clave", "Vasodilatador."),
      mg("prostata", "Tratar la hiperplasia prostática para reducir las micciones nocturnas", "util", "Menos episodios."),
      mg("marcapasos", "Holter y estudio electrofisiológico de rutina", "innecesario", "Bajo riesgo."),
      mg("alfabloqueante-dormir", "Agregar tamsulosina sin advertir el riesgo de hipotensión", "riesgoso", "Puede empeorar los síncopes."),
    ],
  },
  debrief: {
    diagnosis: "Síncope reflejo situacional miccional, en un hombre de 58 años, tras alcohol.",
    pathologies: [
      { name: "Síncope miccional", role: "principal", why: "Reflejo vagal al vaciar la vejiga." },
      { name: "Alcohol y nicturia por hiperplasia", role: "asociada", why: "Favorecedores." },
      { name: "Síncope arrítmico", role: "diferencial", why: "Siempre a descartar con ECG." },
    ],
    reasoning: [
      "Causa: levantarse de golpe y orinar de pie.",
      "Mecanismo: vasodilatación por calor de la cama y alcohol, más reflejo vagal al vaciar la vejiga.",
      "Consecuencia: hipotensión transitoria y pérdida de conciencia.",
    ],
    epidemiology:
      "El síncope reflejo es la causa más frecuente de síncope a cualquier edad. El miccional predomina en varones, de noche y con alcohol o hiperplasia prostática.",
    management: [
      "Historia y ECG.",
      "Estratificar riesgo.",
      "Medidas preventivas.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de síncope.", "ESC — Guidelines for the diagnosis and management of syncope."],
    pearls: ["Síncope + micción nocturna = situacional.", "ECG siempre.", "Orinar sentado."],
    pitfalls: ["Estudios invasivos en bajo riesgo.", "Olvidar el ECG."],
    tribunal: [
      qa("¿Qué es un síncope situacional?", "Un síncope reflejo desencadenado por micción, defecación, tos, deglución o risa."),
      qa("¿Qué datos sugieren síncope cardíaco?", "Síncope en esfuerzo o acostado, palpitaciones previas, sin pródromo, cardiopatía estructural, ECG anormal o muerte súbita familiar."),
      qa("¿Qué diferencia un síncope de una convulsión?", "En el síncope la recuperación es rápida y sin confusión; en la convulsión hay poscrítico, mordedura lateral y movimientos prolongados."),
    ],
  },
};
