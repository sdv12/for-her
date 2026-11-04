import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sepsisNeonatal: ClinicalCase = {
  id: "sepsis-neonatal-precoz",
  level: 3,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 1, ageUnit: "días", sex: "M", context: "Nació hace 30 horas a las 37 semanas. Bolsa rota 22 horas antes del parto. Madre con hisopado para estreptococo B positivo, sin antibiótico en el parto. Fiebre materna de 38,4 °C." },
  frequency: "poco-frecuente",
  intro: "“Lo veo raro, no quiere prenderse, está como flojito y respira rápido.” (relata la madre durante la internación conjunta)",
  vitals: { FC: "178 lpm", FR: "72 rpm", "T°": "35,9 °C", "SatO₂": "92 %", Glucemia: "38 mg/dl", Peso: "2,9 kg" },
  anamnesis: [
    act("factores", "Revisar factores de riesgo maternos del parto", "clave", "Bolsa rota 22 h, fiebre materna, estreptococo B positivo sin profilaxis.", "Factores de riesgo de sepsis precoz por estreptococo B."),
    act("alimentacion", "¿Cómo se alimenta?", "clave", "“No quiere el pecho desde la madrugada.”", "Rechazo del alimento: signo temprano de sepsis neonatal."),
    act("cambios", "¿Cuándo empezó a verse distinto?", "util", "“Hace unas horas.”", "Evolución rápida."),
    act("apneas", "¿Se puso morado o dejó de respirar?", "util", "“Una vez se puso morado.”", "Apneas y cianosis."),
    act("controles", "¿Cuántos controles tuvo el embarazo?", "util", "“Cuatro.”", "Se hizo el hisopado, pero no se dio la profilaxis."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Thiago.”", "No orienta."),
  ],
  exam: [
    act("general", "Estado general, tono y perfusión", "clave", "Hipotónico, relleno capilar 4 s, piel moteada.", "Mal aspecto: sepsis."),
    act("respiratorio", "Trabajo respiratorio", "clave", "Quejido, tiraje, taquipnea.", "Compromiso respiratorio (neumonía o sepsis)."),
    act("temperatura", "Temperatura", "util", "35,9 °C.", "En recién nacidos la sepsis puede dar hipotermia."),
  ],
  studies: [
    study("Microbiología", "hemocultivo", "Hemocultivos antes del antibiótico", "clave", "Streptococcus agalactiae (grupo B).", "Confirma."),
    study("Laboratorio", "lab", "Hemograma, PCR, glucemia, gases", "clave", "Leucocitos 3.800 con desviación a la izquierda, PCR alta, glucemia 38, acidosis.", "Hallazgos de sepsis; leucopenia es un signo de gravedad."),
    study("Otros", "puncion", "Punción lumbar cuando esté estable", "clave", "LCR normal.", "Descarta meningitis (cambia la duración del tratamiento)."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrado difuso.", "Neumonía asociada."),
    study("Otros", "esperar", "Esperar el hemocultivo para iniciar antibióticos", "riesgoso", "No se realizó.", "La sepsis neonatal puede ser mortal en horas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sepsis", "Sepsis neonatal precoz por estreptococo del grupo B con neumonía, hipoglucemia y shock", true, "Recién nacido de menos de 72 h con factores de riesgo maternos, rechazo del alimento, hipotonía, hipotermia, dificultad respiratoria, mala perfusión y hemocultivo positivo."),
      dx("taquipnea", "Taquipnea transitoria del recién nacido", false, "No da hipotonía, hipotermia ni mala perfusión."),
      dx("cardiopatia", "Cardiopatía congénita", false, "Los factores de riesgo y el hemocultivo indican sepsis."),
      dx("hipoglucemia-sola", "Hipoglucemia aislada", false, "Es parte del cuadro séptico."),
      dx("tardia", "Sepsis neonatal tardía", false, "Es precoz: menos de 72 h de vida."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ampicilina más gentamicina EV de inmediato", "clave", "Esquema empírico de la sepsis precoz (estreptococo B, E. coli, Listeria)."),
      mg("uti", "Neonatología: expansión, soporte respiratorio y corrección de la glucemia", "clave", "Shock e hipoglucemia."),
      mg("glucosa", "Dextrosa EV", "clave", "Hipoglucemia sintomática."),
      mg("prevencion", "Recordar la profilaxis antibiótica intraparto en madres con estreptococo B positivo", "util", "Previene la mayoría de las sepsis precoces por estreptococo B."),
      mg("oral", "Antibiótico oral", "riesgoso", "No es adecuado en la sepsis neonatal."),
      mg("observar", "Observar y control en 12 h", "riesgoso", "Riesgo de muerte."),
    ],
  },
  debrief: {
    diagnosis: "Sepsis neonatal precoz por estreptococo del grupo B con neumonía, hipoglucemia y shock, en recién nacido de 30 horas con factores de riesgo maternos sin profilaxis intraparto.",
    pathologies: [
      { name: "Sepsis neonatal precoz", role: "principal", why: "Infección en las primeras 72 h." },
      { name: "Falta de profilaxis intraparto", role: "asociada", why: "Oportunidad perdida." },
      { name: "Taquipnea transitoria, cardiopatía", role: "diferencial", why: "Otras causas de dificultad respiratoria neonatal." },
    ],
    reasoning: [
      "Causa: estreptococo del grupo B que coloniza la vagina materna, con rotura prolongada de membranas.",
      "Mecanismo: el bebé aspira o ingiere líquido amniótico infectado y el germen pasa a la sangre.",
      "Consecuencia: sepsis, neumonía, meningitis y shock en las primeras horas o días.",
    ],
    epidemiology:
      "La sepsis neonatal es una causa importante de mortalidad neonatal en Argentina. El estreptococo B y E. coli son los principales agentes de la sepsis precoz. La pesquisa con hisopado entre las semanas 35 y 37 y la profilaxis con penicilina en el parto reducen mucho los casos.",
    management: [
      "Hisopado de estreptococo B a todas las embarazadas entre las semanas 35 y 37.",
      "Profilaxis intraparto en positivas o con factores de riesgo.",
      "Ante sospecha de sepsis: cultivos y ampicilina más gentamicina.",
      "Soporte en neonatología.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para la prevención de la infección perinatal por estreptococo del grupo B.", "Sociedad Argentina de Pediatría — Consenso de sepsis neonatal."],
    pearls: ["Recién nacido que no come y está flojo = sepsis hasta demostrar lo contrario.", "Ampicilina + gentamicina.", "Profilaxis intraparto si es positiva."],
    pitfalls: ["Esperar cultivos.", "No revisar los factores de riesgo maternos."],
    tribunal: [
      qa("¿Qué diferencia la sepsis neonatal precoz de la tardía?", "Precoz: primeras 72 h, transmisión vertical (estreptococo B, E. coli, Listeria). Tardía: después de las 72 h, adquirida en la comunidad o en el hospital (estafilococos, gram negativos, Candida en prematuros)."),
      qa("¿Cuándo se indica la profilaxis antibiótica intraparto para estreptococo B?", "En madres con hisopado positivo, bacteriuria por estreptococo B en el embarazo, hijo previo con enfermedad por estreptococo B, o resultado desconocido con parto prematuro, bolsa rota de 18 h o más o fiebre intraparto."),
      qa("¿Qué signos de sepsis tiene un recién nacido?", "Inespecíficos: rechazo del alimento, letargia, hipotonía, inestabilidad térmica (fiebre o hipotermia), apneas, dificultad respiratoria, mala perfusión, ictericia, hipoglucemia o hiperglucemia."),
    ],
  },
};
