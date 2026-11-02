import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const preeclampsiaPosparto: ClinicalCase = {
  id: "preeclampsia-posparto",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 37, ageUnit: "años", sex: "F", context: "Parto vaginal hace 5 días. Embarazo con presión “un poco alta” al final, sin tratamiento. Obesidad." },
  frequency: "poco-frecuente",
  intro: "“Desde ayer tengo un dolor de cabeza muy fuerte que no se me va con nada, veo lucecitas y tengo náuseas. Pensé que era por no dormir con el bebé.”",
  vitals: { TA: "172/112 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "36,6 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("cefalea", "¿Cómo es el dolor de cabeza? ¿Tuviste antes así?", "clave", "“Intenso, en la frente y la nuca, nunca tuve así.”", "Cefalea nueva e intensa en el puerperio con hipertensión: síntoma de preeclampsia grave."),
    act("vision", "¿Ves borroso o lucecitas?", "clave", "“Lucecitas, como chispas.”", "Fotopsias: síntoma neurológico de gravedad."),
    act("epigastrio", "¿Te duele la boca del estómago o debajo de las costillas derechas?", "clave", "“Un poco arriba a la derecha.”", "Dolor en epigastrio o hipocondrio derecho: compromiso hepático (HELLP)."),
    act("embarazo", "¿Te dijeron que tenías la presión alta o proteínas en la orina en el embarazo?", "util", "“La presión un poco alta al final.”", "Hipertensión gestacional no tratada."),
    act("disnea", "¿Te falta el aire o te hinchaste?", "util", "“Me hinché de las piernas.”", "Descarta edema pulmonar."),
    act("bebe", "¿Cómo está el bebé?", "neutro", "“Bien, tomando la teta.”", "No orienta, aunque importa para planificar."),
  ],
  exam: [
    act("ta", "Presión arterial repetida", "clave", "172/112 y 168/110 a los 15 minutos.", "Hipertensión grave (160/110 o más)."),
    act("neuro", "Examen neurológico y reflejos", "clave", "Hiperreflexia con clonus aquileo, sin foco.", "Irritabilidad del sistema nervioso: riesgo de eclampsia."),
    act("pulmon", "Auscultación pulmonar", "util", "Normal.", "Sin edema pulmonar."),
    act("utero", "Útero y loquios", "util", "Útero involucionado, loquios normales.", "Descarta infección puerperal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma con plaquetas, LDH, transaminasas, creatinina, ácido úrico, frotis", "clave", "Plaquetas 132.000, TGO 68, LDH 520, creatinina 0,9.", "Busca HELLP; leve compromiso hepático."),
    study("Laboratorio", "orina", "Proteinuria (índice proteína/creatinina)", "clave", "0,6.", "Proteinuria significativa."),
    study("Imágenes", "tc", "Imagen cerebral si hay foco, convulsión o dudas (para descartar trombosis venosa o PRES)", "util", "No hizo falta.", "La trombosis de senos venosos es otro diagnóstico en el puerperio."),
    study("Otros", "esperar", "Darle analgésicos y controlar en su casa", "riesgoso", "No se realizó.", "La preeclampsia posparto puede convulsionar o hacer un ACV."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pe-posparto", "Preeclampsia posparto con criterios de gravedad (hipertensión grave y síntomas neurológicos)", true, "Hipertensión de 172/112 con cefalea intensa, fotopsias, hiperreflexia, dolor en hipocondrio derecho y proteinuria, al quinto día del puerperio."),
      dx("migrana", "Migraña posparto", false, "No explica la hipertensión grave, la hiperreflexia ni la proteinuria."),
      dx("pospuncion", "Cefalea pospunción dural", false, "Mejora al acostarse y no explica la hipertensión grave ni la proteinuria."),
      dx("trombosis", "Trombosis de senos venosos", false, "Es un diferencial, pero la hipertensión grave con proteinuria orienta a preeclampsia."),
      dx("hta-cronica", "Hipertensión crónica descompensada", false, "No era hipertensa antes del embarazo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("magnesio", "Sulfato de magnesio EV (carga y mantenimiento por 24 h), controlando reflejos, diuresis y respiración", "clave", "Previene la eclampsia, también en el puerperio."),
      mg("antihipertensivo", "Antihipertensivo rápido (labetalol EV o nifedipina oral) con meta de 140–150/90–100", "clave", "Previene el ACV hemorrágico."),
      mg("internacion", "Internación con controles y laboratorio seriado", "clave", "Vigilar HELLP, edema pulmonar y eclampsia."),
      mg("lactancia", "Continuar la lactancia (labetalol, nifedipina y enalapril son compatibles)", "util", "No hay que suspenderla."),
      mg("aine", "Ibuprofeno para la cefalea y el alta", "riesgoso", "Los AINE empeoran la hipertensión y no tratan la causa."),
      mg("ergot", "Ergotamina para la cefalea", "riesgoso", "Vasoconstrictor: contraindicado con hipertensión."),
    ],
  },
  debrief: {
    diagnosis: "Preeclampsia posparto con criterios de gravedad (hipertensión grave, cefalea, fotopsias, hiperreflexia y compromiso hepático leve) al quinto día del puerperio, en mujer de 37 años con obesidad e hipertensión gestacional no tratada.",
    pathologies: [
      { name: "Preeclampsia posparto con criterios de gravedad", role: "principal", why: "Hipertensión grave con síntomas neurológicos y proteinuria en el puerperio." },
      { name: "Riesgo de eclampsia y HELLP", role: "asociada", why: "Complicaciones a prevenir." },
      { name: "Migraña, cefalea pospunción, trombosis venosa cerebral", role: "diferencial", why: "Otras cefaleas del puerperio." },
    ],
    reasoning: [
      "Causa: disfunción placentaria y endotelial que persiste días después del parto.",
      "Mecanismo: los factores antiangiogénicos liberados por la placenta dañan el endotelio y tardan en eliminarse; en el puerperio además se moviliza líquido al espacio vascular.",
      "Consecuencia: hipertensión grave, edema cerebral (cefalea, fotopsias, convulsiones), daño hepático y renal y riesgo de ACV.",
    ],
    epidemiology:
      "Hasta un tercio de las eclampsias ocurre en el posparto, la mayoría en la primera semana. Los trastornos hipertensivos del embarazo son una de las principales causas de mortalidad materna en Argentina. Obesidad, edad mayor de 35, primer embarazo e hipertensión gestacional aumentan el riesgo.",
    management: [
      "Controlar la presión en el puerperio y dar pautas de alarma al alta a toda puérpera.",
      "Ante hipertensión grave o síntomas: sulfato de magnesio y antihipertensivos.",
      "Laboratorio para HELLP y evaluación de diagnósticos diferenciales.",
      "Seguimiento cardiovascular a largo plazo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica: estados hipertensivos del embarazo.", "FASGO — Consenso de hipertensión y embarazo."],
    pearls: ["La preeclampsia puede aparecer después del parto.", "Cefalea en el puerperio = tomar la presión.", "Magnesio también en el puerperio."],
    pitfalls: ["Atribuir la cefalea al cansancio.", "Dar AINE o ergotamina."],
    tribunal: [
      qa("¿Qué son los criterios de gravedad de la preeclampsia?", "Presión de 160/110 o más, plaquetas menores de 100.000, transaminasas al doble, dolor en hipocondrio derecho o epigastrio, creatinina mayor de 1,1 o el doble de la basal, edema pulmonar, y síntomas neurológicos o visuales (cefalea, fotopsias, escotomas)."),
      qa("¿Cuáles son los signos de intoxicación por sulfato de magnesio y su antídoto?", "Pérdida del reflejo rotuliano (primer signo), depresión respiratoria (FR menor de 12), oliguria y, en niveles altos, paro cardíaco; el antídoto es el gluconato de calcio EV."),
      qa("¿Qué riesgos a largo plazo tiene una mujer que tuvo preeclampsia?", "Mayor riesgo de hipertensión crónica, enfermedad coronaria, ACV, insuficiencia cardíaca y enfermedad renal; requiere controles cardiovasculares y de factores de riesgo de por vida."),
    ],
  },
};
