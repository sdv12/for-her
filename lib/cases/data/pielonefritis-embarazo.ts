import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const pielonefritisEmbarazo: ClinicalCase = {
  id: "pielonefritis-embarazada",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 23, ageUnit: "años", sex: "F", context: "Primigesta, embarazo de 22 semanas. Pocos controles prenatales." },
  frequency: "frecuente",
  intro: "“Desde ayer tengo fiebre con chuchos y me duele mucho la cintura del lado derecho. Vomité dos veces.”",
  vitals: { TA: "108/66 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "39,1 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("miccional", "¿Tuvo ardor al orinar o ganas de ir seguido antes de esto?", "clave", "“Sí, hace como una semana me ardía, pero pensé que era por el embarazo.”", "Una cistitis o bacteriuria no tratada en el embarazo progresa fácilmente a pielonefritis."),
    act("urocultivo", "¿Le hicieron un urocultivo en el embarazo?", "clave", "“No, fui a un solo control.”", "La bacteriuria asintomática se busca con urocultivo en el primer control y se trata: es la principal prevención de la pielonefritis gestacional."),
    act("obstetrico", "¿Tiene contracciones, pérdida de líquido o sangrado? ¿Siente al bebé moverse?", "clave", "“Siento la panza dura a veces. Se mueve bien. No perdí nada.”", "La pielonefritis puede desencadenar amenaza de parto prematuro."),
    act("alergia", "¿Es alérgica a algún antibiótico?", "clave", "“No.”", "Define el esquema antibiótico seguro en el embarazo."),
    act("previas", "¿Tuvo infecciones urinarias antes?", "util", "“Alguna cistitis de adolescente.”", "Antecedente que aumenta el riesgo de recurrencia."),
    act("respiratorio", "¿Tiene tos o falta de aire?", "util", "“No.”", "La pielonefritis gestacional puede complicarse con distrés respiratorio; también descarta otro foco."),
    act("comida", "¿Qué desayunó?", "neutro", "“Un té.”", "No orienta."),
  ],
  exam: [
    act("puno", "Puñopercusión lumbar", "clave", "Francamente positiva a derecha.", "Signo de compromiso renal; el lado derecho es el más afectado por la dextrorrotación del útero que comprime el uréter."),
    act("obstetrico", "Examen obstétrico: altura uterina, tono y latidos fetales", "clave", "Altura uterina acorde. Útero con alguna contracción aislada. Latidos fetales 168 lpm.", "Valora el bienestar fetal (la taquicardia fetal acompaña a la fiebre materna) y la actividad uterina."),
    act("perfusion", "Perfusión y estado de conciencia", "clave", "Lúcida, relleno capilar normal.", "Busca signos de sepsis."),
    act("especulo", "Especuloscopía y tacto vaginal", "util", "Cuello posterior, largo y cerrado, sin pérdidas.", "Descarta modificaciones cervicales (amenaza de parto prematuro)."),
    act("faringe", "Fauces", "neutro", "Normales.", "No aporta."),
  ],
  studies: [
    study("Microbiología", "urocultivo", "Urocultivo con antibiograma (antes del antibiótico)", "clave", "E. coli > 100.000 UFC/ml, sensible a cefalosporinas de 1.ª y 3.ª generación; resistente a ampicilina.", "Imprescindible en el embarazo para guiar y controlar el tratamiento."),
    study("Laboratorio", "orina", "Orina completa", "util", "Leucocitos incontables, piocitos, cilindros leucocitarios, nitritos positivos.", "Los cilindros leucocitarios indican compromiso renal."),
    study("Laboratorio", "lab", "Hemograma, creatinina y PCR", "clave", "Leucocitos 18.000, creatinina 0,9 mg/dl, PCR 120 mg/l.", "En el embarazo la creatinina normal es más baja (~0,5): 0,9 indica compromiso de la función renal."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Negativos.", "Indicados en pielonefritis que se interna."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Leve dilatación pielocalicial derecha, sin litiasis ni abscesos.", "Busca obstrucción o absceso; una hidronefrosis leve derecha es fisiológica en el embarazo."),
    study("Imágenes", "tc", "Tomografía de abdomen y pelvis", "riesgoso", "No se realizó.", "Expone al feto a radiación sin necesidad: la ecografía es el método de elección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pielo", "Pielonefritis aguda gestacional", true, "Fiebre alta con escalofríos, dolor lumbar, puñopercusión positiva y urocultivo con E. coli en una embarazada."),
      dx("cistitis", "Cistitis aguda", false, "No da fiebre alta ni dolor lumbar."),
      dx("corioamnionitis", "Corioamnionitis", false, "Fiebre con útero doloroso, taquicardia fetal y, en general, membranas rotas; acá el dolor es lumbar y hay foco urinario."),
      dx("apendicitis", "Apendicitis en el embarazo", false, "El dolor sube con el útero y puede confundir, pero acá la puñopercusión, la orina y el urocultivo muestran el foco renal."),
      dx("litiasis", "Litiasis con cólico renal", false, "Daría dolor cólico y hematuria; la ecografía no muestra litiasis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("internacion", "Internación con hidratación endovenosa", "clave", "En el embarazo la pielonefritis se trata internada por el riesgo de sepsis, distrés y parto prematuro."),
      mg("cefalo", "Cefalosporina endovenosa (por ejemplo ceftriaxona) y luego oral según antibiograma, completando 10–14 días", "clave", "Betalactámicos: seguros en el embarazo y eficaces contra E. coli."),
      mg("obstetrico", "Control obstétrico: actividad uterina y latidos fetales", "clave", "Detecta amenaza de parto prematuro."),
      mg("supresion", "Urocultivo de control y profilaxis (supresión) hasta el final del embarazo", "util", "Disminuye recurrencias, frecuentes en el embarazo."),
      mg("cipro", "Ciprofloxacina oral ambulatoria", "riesgoso", "Las quinolonas no se usan en el embarazo y además una pielonefritis gestacional requiere internación."),
      mg("tms", "Trimetoprima-sulfametoxazol", "riesgoso", "Antifólico en el primer trimestre y riesgo de kernicterus cerca del parto; alta resistencia local."),
      mg("tocolisis", "Tocólisis de rutina", "innecesario", "Solo si hay amenaza de parto prematuro con modificaciones cervicales; contracciones aisladas por la fiebre ceden al tratarla."),
    ],
  },
  debrief: {
    diagnosis: "Pielonefritis aguda gestacional derecha por E. coli, en embarazo de 22 semanas.",
    pathologies: [
      { name: "Pielonefritis aguda gestacional", role: "principal", why: "Fiebre, dolor lumbar y urocultivo positivo en una embarazada." },
      { name: "Bacteriuria asintomática no tratada", role: "asociada", why: "El origen más frecuente: no se hizo el urocultivo prenatal." },
      { name: "Amenaza de parto prematuro", role: "diferencial", why: "Complicación a vigilar." },
      { name: "Corioamnionitis", role: "diferencial", why: "Otra causa de fiebre en la embarazada." },
      { name: "Apendicitis", role: "diferencial", why: "La causa quirúrgica no obstétrica más frecuente en el embarazo." },
    ],
    reasoning: [
      "Causa: E. coli ascendente desde la vejiga; la bacteriuria asintomática sin tratar progresa a pielonefritis en hasta un 30 % de las embarazadas.",
      "Mecanismo: la progesterona relaja el músculo liso del uréter y el útero lo comprime (más el derecho, por la dextrorrotación): hay estasis urinaria e hidronefrosis fisiológica que facilitan el ascenso.",
      "Consecuencia: infección del parénquima y la pelvis renal → fiebre alta, escalofríos, dolor lumbar, cilindros leucocitarios. Las endotoxinas pueden causar sepsis, distrés respiratorio y contracciones uterinas.",
      "Por eso en el embarazo se busca y se trata la bacteriuria aunque no dé síntomas.",
    ],
    epidemiology:
      "La infección urinaria es la complicación médica más frecuente del embarazo. La bacteriuria asintomática afecta a un 2–10 % de las embarazadas y la pielonefritis a un 1–2 %, sobre todo en el segundo y tercer trimestre. Es más frecuente en primigestas jóvenes, con pocos controles, diabetes o antecedentes de ITU.",
    management: [
      "Urocultivo en el primer control prenatal (y repetirlo según normas): tratar toda bacteriuria asintomática.",
      "Pielonefritis gestacional: internación, hidratación, urocultivo y hemocultivos, cefalosporina endovenosa.",
      "Pasar a vía oral tras 48 h afebril, completar 10–14 días según antibiograma.",
      "Control obstétrico y fetal; urocultivo de control y profilaxis hasta el parto.",
      "Evitar quinolonas, tetraciclinas y TMS (sobre todo al inicio y al final del embarazo).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para la atención del embarazo de bajo riesgo (control prenatal y urocultivo).",
      "Consenso intersociedades argentino de infección urinaria (SADI, SOGIBA y otras).",
    ],
    pearls: [
      "Embarazo + fiebre + dolor lumbar = internar.",
      "En el embarazo: betalactámicos y nitrofurantoína (evitarla cerca del término); nada de quinolonas.",
      "El urocultivo es parte del primer control prenatal.",
    ],
    pitfalls: ["Atribuir los síntomas urinarios al embarazo.", "Tratar ambulatoria a una embarazada con pielonefritis.", "Pedir tomografía."],
  },
};
