import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colangiocarcinoma: ClinicalCase = {
  id: "colangiocarcinoma",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 68, ageUnit: "años", sex: "M", context: "Diabético. Sin antecedentes biliares." },
  frequency: "poco-frecuente",
  intro: "“Me puse amarillo de a poco, me pica todo el cuerpo, el pis está oscuro y bajé seis kilos.”",
  vitals: { TA: "126/78 mmHg", FC: "82 lpm", "T°": "36,7 °C", Peso: "66 kg" },
  anamnesis: [
    act("ictericia", "¿Cómo empezó la ictericia? ¿Con dolor?", "clave", "“De a poco, sin dolor.”", "Ictericia indolora: tumoral."),
    act("prurito", "¿Picazón, heces claras?", "clave", "“Mucha picazón, la materia fecal está blanca.”", "Colestasis obstructiva."),
    act("peso", "¿Bajó de peso?", "clave", "“Seis kilos en dos meses.”", "Consunción."),
    act("fiebre", "¿Fiebre o escalofríos?", "util", "“No.”", "Colangitis."),
    act("colangitis-esclerosante", "¿Tiene colitis ulcerosa o enfermedad de las vías biliares?", "util", "“No.”", "Factor de riesgo."),
    act("pueblo", "¿De dónde es?", "neutro", "“De Villa María.”", "No orienta."),
  ],
  exam: [
    act("ictericia-ex", "Piel", "clave", "Ictericia verdínica con lesiones de rascado.", "Colestasis prolongada."),
    act("vesicula", "Palpación de la vesícula", "clave", "No palpable.", "Obstrucción por encima del cístico."),
    act("higado", "Hígado", "util", "Hepatomegalia lisa.", "Colestasis."),
  ],
  studies: [
    study("Laboratorio", "hepatograma", "Hepatograma y coagulograma", "clave", "BT 14 (directa 12), FAL y GGT muy altas; RIN 1,4.", "Patrón colestásico."),
    study("Imágenes", "colangio-rm", "Ecografía y colangiorresonancia", "clave", "Dilatación de vías intrahepáticas con estenosis en la confluencia de los hepáticos; colédoco distal normal.", "Tumor de Klatskin."),
    study("Laboratorio", "ca199", "CA 19-9", "util", "620 U/ml.", "Apoya, no diagnostica."),
    study("Otros", "biopsia-percutanea", "Biopsia percutánea transhepática de rutina", "riesgoso", "No se realizó.", "Riesgo de diseminación en candidatos a cirugía."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("klatskin", "Colangiocarcinoma perihiliar (tumor de Klatskin)", true, "Ictericia indolora progresiva, vía intrahepática dilatada con estenosis hiliar, vesícula no palpable y CA 19-9 alto."),
      dx("pancreas", "Cáncer de cabeza de páncreas", false, "El colédoco distal es normal y la vesícula no está distendida."),
      dx("coledocolitiasis", "Coledocolitiasis", false, "Sin dolor ni cálculos."),
      dx("cbp", "Colangitis biliar primaria", false, "Hay estenosis focal y es varón."),
      dx("hepatitis", "Hepatitis viral", false, "Patrón obstructivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("comite", "Estadificación con TC y comité multidisciplinario", "clave", "Definir resecabilidad."),
      mg("drenaje", "Drenaje biliar endoscópico o percutáneo si hay colangitis o antes de la cirugía", "clave", "Colestasis."),
      mg("vitk", "Vitamina K", "clave", "RIN alto por malabsorción."),
      mg("prurito", "Colestiramina para el prurito", "util", "Síntomas."),
      mg("cpre-sin-plan", "CPRE con stent metálico antes de evaluar resecabilidad", "riesgoso", "Puede dificultar la cirugía."),
      mg("ursodiol", "Solo ácido ursodesoxicólico", "riesgoso", "No trata la obstrucción."),
    ],
  },
  debrief: {
    diagnosis: "Colangiocarcinoma perihiliar (tumor de Klatskin) con ictericia obstructiva, en varón de 68 años.",
    pathologies: [
      { name: "Colangiocarcinoma perihiliar", role: "principal", why: "Adenocarcinoma de la vía biliar." },
      { name: "Colestasis y coagulopatía", role: "asociada", why: "Consecuencias de la obstrucción." },
      { name: "Cáncer de páncreas, coledocolitiasis", role: "diferencial", why: "Otras ictericias obstructivas." },
    ],
    reasoning: [
      "Causa: inflamación crónica biliar o factores no identificados.",
      "Mecanismo: tumor que estenosa la confluencia de los conductos hepáticos.",
      "Consecuencia: ictericia, prurito, malabsorción de vitamina K y colangitis.",
    ],
    epidemiology:
      "Es raro pero de mal pronóstico, y menos de un tercio es resecable al diagnóstico. La colangitis esclerosante primaria es el principal factor de riesgo en Occidente. El signo de Courvoisier ayuda a ubicar el nivel de la obstrucción.",
    management: [
      "Imágenes.",
      "Estadificación.",
      "Comité.",
      "Drenaje y soporte.",
    ],
    sources: ["Asociación Argentina de Cirugía — Tumores de la vía biliar.", "ESMO — Biliary Cancer Clinical Practice Guidelines."],
    pearls: ["Ictericia indolora con peso perdido.", "Vesícula no palpable: obstrucción alta.", "Comité antes del stent."],
    pitfalls: ["Biopsia percutánea en resecables.", "Stent sin plan."],
    tribunal: [
      qa("¿Qué es el signo de Courvoisier-Terrier?", "Vesícula palpable e indolora con ictericia, que sugiere obstrucción distal tumoral."),
      qa("¿Qué es la clasificación de Bismuth?", "Clasifica el colangiocarcinoma perihiliar según la extensión a los conductos hepáticos."),
      qa("¿Qué factores de riesgo tiene?", "Colangitis esclerosante primaria, quistes de colédoco, litiasis intrahepática y parásitos hepáticos."),
    ],
  },
};
