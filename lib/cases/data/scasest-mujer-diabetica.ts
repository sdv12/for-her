import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const scasestMujerDiabetica: ClinicalCase = {
  id: "scasest-mujer-diabetica",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 67, ageUnit: "años", sex: "F", context: "Diabética hace 20 años con neuropatía, hipertensa, dislipémica. Jubilada docente." },
  frequency: "muy-frecuente",
  intro: "“Desde la mañana me falta el aire, tengo náuseas y un malestar en la boca del estómago. Pensé que era algo que comí.”",
  vitals: { TA: "158/92 mmHg", FC: "96 lpm", FR: "22 rpm", "SatO₂": "94 %", "T°": "36,4 °C" },
  anamnesis: [
    act("sintomas", "¿Cómo empezó y qué la empeora?", "clave", "“Con el esfuerzo de subir la bolsa del mercado, y no se fue.”", "Equivalente anginoso: disnea y epigastralgia."),
    act("irradiacion", "¿Le duele el brazo, la mandíbula o la espalda?", "clave", "“Un poco la mandíbula.”", "Irradiación típica."),
    act("previos", "¿Le pasó en los últimos días?", "clave", "“Con esfuerzos, cada vez con menos.”", "Angina progresiva."),
    act("aspirina", "¿Toma aspirina o estatina?", "util", "“Estatina sí, aspirina no.”", "Prevención."),
    act("digestivo", "¿Comió algo pesado o tiene acidez habitual?", "util", "“No.”", "Diferencial."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Cuatro.”", "No orienta."),
  ],
  exam: [
    act("cardio", "Cardiovascular", "clave", "R4, sin soplos.", "Disfunción diastólica isquémica."),
    act("pulmon", "Pulmones", "clave", "Crepitantes bibasales finos.", "Killip II."),
    act("abdomen", "Abdomen", "util", "Blando, indoloro.", "No es digestivo."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG en menos de 10 minutos", "clave", "Infradesnivel del ST de 2 mm de V3 a V6, sin supradesnivel.", "SCA sin supradesnivel."),
    study("Laboratorio", "troponina", "Troponina ultrasensible seriada (0 y 1–3 horas)", "clave", "Elevada y en ascenso.", "IAM sin supradesnivel."),
    study("Imágenes", "eco", "Ecocardiograma", "util", "Hipocinesia lateral, FEy 48 %.", "Función ventricular."),
    study("Laboratorio", "lab", "Glucemia, función renal, hemograma", "util", "Glucemia 248, creatinina 1,1.", "Riesgo de contraste y sangrado."),
    study("Otros", "ergometria", "Ergometría para confirmar", "riesgoso", "No se hizo.", "Contraindicada en un SCA en curso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("iamsest", "IAM sin supradesnivel del ST con presentación atípica (equivalente anginoso), Killip II", true, "Disnea y epigastralgia de esfuerzo progresivo en una diabética, infradesnivel del ST y troponina en ascenso."),
      dx("dispepsia", "Dispepsia", false, "ECG y troponina alterados."),
      dx("iamcest", "IAM con supradesnivel del ST", false, "No hay supradesnivel."),
      dx("angina-inestable", "Angina inestable", false, "La troponina está elevada."),
      dx("tep", "TEP", false, "ECG isquémico lateral y hipocinesia segmentaria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aas-p2y12", "Aspirina + inhibidor P2Y12", "clave", "Doble antiagregación."),
      mg("anticoag", "Anticoagulación (enoxaparina o fondaparinux)", "clave", "SCA sin supradesnivel."),
      mg("cateterismo", "Cinecoronariografía en menos de 24 horas", "clave", "Riesgo alto: troponina positiva y diabetes."),
      mg("estatina-alta", "Estatina de alta intensidad, betabloqueante si no hay falla, IECA", "clave", "Prevención secundaria."),
      mg("glucemia", "Control glucémico con insulina en la internación", "util", "Glucemia 140–180."),
      mg("trombolisis", "Trombolíticos", "riesgoso", "No están indicados sin supradesnivel."),
      mg("alta-antiacido", "Alta con antiácidos", "riesgoso", "Error fatal frecuente en mujeres diabéticas."),
    ],
  },
  debrief: {
    diagnosis: "IAM sin supradesnivel del ST con presentación atípica y Killip II, en una mujer diabética de 67 años.",
    pathologies: [
      { name: "IAM sin supradesnivel", role: "principal", why: "Necrosis miocárdica por trombo no oclusivo." },
      { name: "Diabetes con neuropatía", role: "asociada", why: "Menos dolor típico." },
      { name: "Dispepsia", role: "diferencial", why: "El error diagnóstico más común." },
    ],
    reasoning: [
      "Causa: ruptura de placa con trombo no oclusivo.",
      "Mecanismo: la neuropatía autonómica atenúa el dolor; aparece disnea, náuseas o epigastralgia.",
      "Consecuencia: consulta tardía y mayor mortalidad.",
    ],
    epidemiology:
      "Las mujeres, los diabéticos y los mayores de 75 consultan con más frecuencia por síntomas atípicos. Las mujeres reciben menos estudios invasivos y llegan más tarde. La enfermedad coronaria es la primera causa de muerte en mujeres en Argentina.",
    management: [
      "ECG en 10 minutos.",
      "Troponina seriada.",
      "Doble antiagregación y anticoagulación.",
      "Estrategia invasiva temprana.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de SCA sin supradesnivel del ST.", "ESC — Guidelines for the management of acute coronary syndromes."],
    pearls: ["Diabética con epigastralgia: ECG.", "Infradesnivel + troponina = IAMSEST.", "Nada de ergometría en un SCA."],
    pitfalls: ["Alta con antiácidos.", "Trombolíticos sin supradesnivel."],
    tribunal: [
      qa("¿Qué es un equivalente anginoso?", "Un síntoma distinto del dolor de pecho que expresa isquemia, como disnea, epigastralgia, náuseas o fatiga, frecuente en mujeres, diabéticos y ancianos."),
      qa("¿Cuándo se hace cateterismo inmediato en un SCA sin supradesnivel?", "En menos de 2 horas si hay inestabilidad hemodinámica, arritmias graves, dolor refractario o falla cardíaca aguda."),
      qa("¿Por qué los trombolíticos no sirven sin supradesnivel?", "Porque el trombo no es oclusivo y no mejoran la sobrevida, pero sí aumentan el sangrado."),
    ],
  },
};
