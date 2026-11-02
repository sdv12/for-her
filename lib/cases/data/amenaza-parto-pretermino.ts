import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const amenazaPartoPretermino: ClinicalCase = {
  id: "amenaza-parto-pretermino",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 19, ageUnit: "años", sex: "F", context: "Embarazo de 31 semanas. Trabaja limpiando casas. Tuvo ardor al orinar la semana pasada y no consultó." },
  frequency: "frecuente",
  intro: "“Desde hace unas horas la panza se me pone dura cada rato y me duele la cintura. Tengo miedo de que nazca.”",
  vitals: { TA: "112/68 mmHg", FC: "94 lpm", FR: "18 rpm", "T°": "37,3 °C" },
  anamnesis: [
    act("contracciones", "¿Cada cuánto se te pone dura la panza?", "clave", "“Cada 8 o 10 minutos.”", "Contracciones regulares antes de la semana 37: sospecha de parto pretérmino."),
    act("liquido", "¿Perdiste líquido o sangre?", "clave", "“No.”", "Descarta rotura de membranas y sangrado del tercer trimestre."),
    act("urinario", "¿Te arde al orinar? ¿Tuviste flujo distinto?", "clave", "“La semana pasada me ardía, ahora un poco.”", "La infección urinaria es una causa tratable de parto pretérmino."),
    act("movimientos", "¿Se mueve el bebé?", "util", "“Sí, mucho.”", "Bienestar fetal."),
    act("antecedentes", "¿Tuviste otros embarazos o partos prematuros?", "util", "“Es el primero.”", "El parto pretérmino previo es el principal factor de riesgo."),
    act("controles", "¿Cuántos controles te hiciste?", "util", "“Dos.”", "Control prenatal insuficiente: factor de riesgo."),
    act("nombre", "¿Ya tiene nombre?", "neutro", "“Valentina.”", "No orienta."),
  ],
  exam: [
    act("dinamica", "Dinámica uterina por palpación durante 10 minutos", "clave", "Una a dos contracciones en 10 minutos, de 30 segundos.", "Contracciones regulares."),
    act("tacto", "Tacto vaginal (con placenta no previa)", "clave", "Cuello posterior, 50 % borrado, 2 cm de dilatación.", "Hay modificaciones cervicales: amenaza de parto pretérmino."),
    act("especulo", "Especuloscopía", "util", "Sin líquido amniótico ni sangrado.", "Membranas íntegras."),
    act("lcf", "Latidos fetales", "clave", "142 lpm.", "Feto en buenas condiciones."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina completa y urocultivo", "clave", "Leucocituria y nitritos positivos; urocultivo pendiente.", "Infección urinaria: tratarla."),
    study("Imágenes", "eco", "Ecografía obstétrica y cervicometría", "clave", "Feto de 31 semanas, 1600 g, cefálico; placenta fúndica; longitud cervical 18 mm.", "Cuello corto (menos de 25 mm) con contracciones: alto riesgo de parto."),
    study("Otros", "monitoreo", "Monitoreo fetal", "util", "Reactivo.", "Bienestar fetal."),
    study("Laboratorio", "estreptococo", "Hisopado para estreptococo B", "util", "Pendiente.", "Define la profilaxis antibiótica si avanza el trabajo de parto."),
    study("Imágenes", "rmn", "Resonancia pelviana", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("app", "Amenaza de parto pretérmino a las 31 semanas, asociada a infección urinaria", true, "Contracciones regulares con modificaciones cervicales y cuello corto, membranas íntegras, entre las semanas 22 y 37, con infección urinaria."),
      dx("contracciones-braxton", "Contracciones de Braxton Hicks", false, "Son irregulares y no modifican el cuello."),
      dx("rpm", "Rotura prematura de membranas", false, "No hay pérdida de líquido en la especuloscopía."),
      dx("desprendimiento", "Desprendimiento de placenta", false, "No hay sangrado, útero leñoso ni sufrimiento fetal."),
      dx("pielonefritis", "Pielonefritis aguda sin trabajo de parto", false, "Hay cambios cervicales; además, sin fiebre alta ni dolor lumbar franco."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Corticoides para maduración pulmonar fetal (betametasona 12 mg IM, dos dosis cada 24 h)", "clave", "Reducen la dificultad respiratoria, la hemorragia intraventricular y la mortalidad neonatal entre las 24 y 34 semanas."),
      mg("tocolisis", "Tocolíticos (nifedipina) por 48 h para completar los corticoides", "clave", "Ganan tiempo para los corticoides y el traslado."),
      mg("traslado", "Internación en un centro con neonatología de nivel adecuado (traslado in utero)", "clave", "El mejor traslado para un prematuro es dentro del útero."),
      mg("atb-itu", "Tratar la infección urinaria con un antibiótico seguro en el embarazo (cefalexina)", "clave", "Elimina un desencadenante."),
      mg("magnesio", "Sulfato de magnesio para neuroprotección si el parto es inminente antes de las 32 semanas", "util", "Reduce el riesgo de parálisis cerebral."),
      mg("reposo-casa", "Reposo en su casa y volver si empeora", "riesgoso", "Con modificaciones cervicales y cuello corto necesita internación y corticoides."),
    ],
  },
  debrief: {
    diagnosis: "Amenaza de parto pretérmino a las 31 semanas, con cuello corto y modificado, membranas íntegras, asociada a infección urinaria, en primigesta de 19 años con control prenatal insuficiente.",
    pathologies: [
      { name: "Amenaza de parto pretérmino", role: "principal", why: "Contracciones con cambios cervicales antes de la semana 37." },
      { name: "Infección urinaria", role: "asociada", why: "Desencadenante tratable." },
      { name: "Braxton Hicks, rotura de membranas, desprendimiento", role: "diferencial", why: "Se descartan con el examen." },
    ],
    reasoning: [
      "Causa: infección (urinaria, vaginal, intraamniótica), sobredistensión uterina, isquemia placentaria o estrés.",
      "Mecanismo: la inflamación libera prostaglandinas y citoquinas que estimulan las contracciones y la maduración del cuello.",
      "Consecuencia: parto antes de término, con riesgo de dificultad respiratoria, hemorragia intraventricular, enterocolitis e infecciones en el recién nacido.",
    ],
    epidemiology:
      "En Argentina alrededor del 8 al 9 % de los nacimientos son prematuros, y la prematurez es la principal causa de mortalidad neonatal. Los factores de riesgo incluyen parto prematuro previo, infecciones, embarazo adolescente, control prenatal insuficiente, tabaquismo, embarazo múltiple y condiciones socioeconómicas adversas.",
    management: [
      "Confirmar el diagnóstico: contracciones con modificaciones cervicales o cuello corto, entre las semanas 22 y 37.",
      "Corticoides entre las 24 y 34 semanas y tocólisis por 48 h si no hay contraindicaciones.",
      "Buscar y tratar la causa (infección urinaria, vaginosis).",
      "Sulfato de magnesio antes de las 32 semanas si el parto es inminente; profilaxis para estreptococo B.",
      "Traslado in utero a un centro de complejidad adecuada.",
    ],
    sources: ["Ministerio de Salud de la Nación — Recomendaciones para la práctica del control preconcepcional, prenatal y puerperal; Guía de prevención y tratamiento del parto pretérmino.", "FASGO — Consenso de amenaza de parto pretérmino."],
    pearls: ["Contracciones + cambios cervicales antes de la semana 37.", "Corticoides de 24 a 34 semanas.", "Traslado in utero."],
    pitfalls: ["Mandarla a la casa.", "No buscar infección urinaria."],
    tribunal: [
      qa("¿Por qué se dan corticoides antenatales?", "Porque aceleran la maduración pulmonar (producción de surfactante) y de otros órganos; reducen la enfermedad de membrana hialina, la hemorragia intraventricular, la enterocolitis necrotizante y la mortalidad neonatal. Su máximo efecto es entre 24 h y 7 días después de la primera dosis."),
      qa("¿Cuándo está contraindicada la tocólisis?", "Ante muerte fetal, malformación incompatible con la vida, corioamnionitis, sufrimiento fetal, preeclampsia grave, desprendimiento de placenta, sangrado importante o inestabilidad materna, y en la semana 34 o más."),
      qa("¿Cómo se clasifica el parto pretérmino?", "Pretérmino extremo (menos de 28 semanas), muy pretérmino (28 a menos de 32), y pretérmino moderado y tardío (32 a menos de 37 semanas)."),
    ],
  },
};
