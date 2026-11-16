import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const lumbalgiaEmbarazo: ClinicalCase = {
  id: "lumbalgia-embarazo",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Embarazo de 26 semanas, segundo hijo. Trabaja en un supermercado como repositora." },
  frequency: "muy-frecuente",
  intro: "“Me duele la cintura y la cola, sobre todo al darme vuelta en la cama y al subir escaleras.”",
  vitals: { TA: "110/70 mmHg", FC: "82 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("localizacion", "¿Dónde duele exactamente?", "clave", "“Abajo, en los huesitos de atrás de la pelvis, a los dos lados.”", "Dolor de cintura pélvica."),
    act("fiebre-orina", "¿Fiebre, ardor al orinar, dolor que va a los costados?", "clave", "“No.”", "Descarta pielonefritis."),
    act("contracciones", "¿Contracciones, pérdida de líquido o sangre?", "clave", "“No.”", "Descarta amenaza de parto pretérmino."),
    act("neuro", "¿Hormigueo en las piernas o problemas para orinar o defecar?", "clave", "“No.”", "Descarta compresión radicular grave."),
    act("trabajo", "¿Levanta peso en el trabajo?", "util", "“Cajas todo el día.”", "Sobrecarga."),
    act("serie", "¿Qué serie mira?", "neutro", "“Una de cocina.”", "No orienta."),
  ],
  exam: [
    act("pelvis", "Pruebas de provocación pélvica (FABER, P4)", "clave", "Positivas a ambos lados.", "Dolor de cintura pélvica."),
    act("neuro-ex", "Lasègue y neurológico", "clave", "Negativo, sin déficit.", "Sin radiculopatía."),
    act("puno", "Puñopercusión", "util", "Negativa.", "Sin pielonefritis."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Dolor pélvico posterior con pruebas positivas.", "No requiere imágenes."),
    study("Laboratorio", "orina", "Orina completa", "util", "Normal.", "Descarta ITU."),
    study("Imágenes", "rx", "Radiografía lumbosacra", "riesgoso", "No se pidió.", "Radiación innecesaria en el embarazo."),
    study("Imágenes", "rmn", "Resonancia lumbar", "innecesario", "No se pidió.", "Sin déficit neurológico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dolor-pelvico", "Dolor lumbopélvico del embarazo (cintura pélvica)", true, "Dolor sacroilíaco bilateral con pruebas de provocación positivas, sin signos de alarma obstétrica, urinaria ni neurológica."),
      dx("pielonefritis", "Pielonefritis", false, "Sin fiebre y orina normal."),
      dx("app", "Amenaza de parto pretérmino", false, "Sin contracciones."),
      dx("hernia", "Hernia discal con radiculopatía", false, "Lasègue negativo."),
      dx("cola-de-caballo", "Síndrome de cola de caballo", false, "Sin alteraciones esfinterianas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ejercicio", "Ejercicio adaptado, kinesiología y agua", "clave", "Primera línea."),
      mg("cinturon", "Cinturón pélvico", "util", "Alivio."),
      mg("paracetamol", "Paracetamol", "clave", "Analgésico seguro."),
      mg("laboral", "Adecuación de tareas: evitar levantar peso", "clave", "Ley de contrato de trabajo."),
      mg("alarma", "Volver si hay fiebre, contracciones o síntomas neurológicos", "util", "Signos de alarma."),
      mg("aines", "Ibuprofeno diario", "riesgoso", "Desaconsejado desde las 20 semanas por riesgo renal fetal y oligoamnios."),
      mg("reposo", "Reposo absoluto en cama", "riesgoso", "Empeora y aumenta el riesgo trombótico."),
    ],
  },
  debrief: {
    diagnosis: "Dolor lumbopélvico del embarazo (cintura pélvica) a las 26 semanas, en una mujer de 31 años con trabajo de carga.",
    pathologies: [
      { name: "Dolor de cintura pélvica del embarazo", role: "principal", why: "Laxitud ligamentaria y cambio de carga." },
      { name: "Sobrecarga laboral", role: "asociada", why: "Agravante." },
      { name: "Pielonefritis, amenaza de parto pretérmino", role: "diferencial", why: "Causas obstétricas y urinarias." },
    ],
    reasoning: [
      "Causa: relaxina y progesterona, más el aumento de peso y la lordosis.",
      "Mecanismo: inestabilidad de las articulaciones sacroilíacas y la sínfisis.",
      "Consecuencia: dolor que limita la movilidad y el trabajo.",
    ],
    epidemiology:
      "Entre la mitad y dos tercios de las embarazadas tiene dolor lumbar o pélvico, más en el segundo y tercer trimestre y con trabajos físicos. La mayoría mejora después del parto.",
    management: [
      "Descartar alarmas.",
      "Ejercicio y kinesiología.",
      "Paracetamol.",
      "Adecuación laboral.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la atención del embarazo de bajo riesgo.", "European guidelines for the diagnosis and treatment of pelvic girdle pain."],
    pearls: ["Dolor sacroilíaco del embarazo: frecuente y benigno.", "Paracetamol, no AINE.", "Movimiento, no reposo."],
    pitfalls: ["Radiografías.", "AINE en la segunda mitad."],
    tribunal: [
      qa("¿Qué signos de alarma tiene una lumbalgia en el embarazo?", "Fiebre, síntomas urinarios, contracciones, sangrado o pérdida de líquido y síntomas neurológicos o esfinterianos."),
      qa("¿Por qué se evitan los AINE en la segunda mitad del embarazo?", "Por riesgo de oligoamnios por daño renal fetal desde las 20 semanas y cierre precoz del ductus en el tercer trimestre."),
      qa("¿Qué es la prueba P4?", "Presión axial sobre el fémur con la cadera flexionada a 90°, que provoca dolor sacroilíaco posterior."),
    ],
  },
};
