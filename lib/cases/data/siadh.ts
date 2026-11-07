import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const siadh: ClinicalCase = {
  id: "siadh-cancer-pulmon",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Tabaquista de 45 paquetes/año, tos hace meses y descenso de peso. Toma sertralina hace tres semanas." },
  frequency: "poco-frecuente",
  intro: "“Está confundido desde ayer, le duele la cabeza y vomitó. Hoy tuvo como una ausencia.” (relata la hija)",
  vitals: { TA: "130/80 mmHg", FC: "82 lpm", FR: "18 rpm", "T°": "36,5 °C", "SatO₂": "95 %", Glucemia: "98 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("farmacos", "¿Qué medicamentos toma? ¿Algo nuevo? ¿Diuréticos?", "clave", "“Sertralina nueva; sin diuréticos.”", "ISRS: causa frecuente de SIADH. Las tiazidas producen hiponatremia por otro mecanismo."),
    act("perdidas", "¿Tuvo diarrea o vómitos previos, tomó mucha agua?", "clave", "“No; toma lo de siempre.”", "Sin pérdidas ni polidipsia."),
    act("respiratorio", "¿Tos, sangre en el catarro, baja de peso?", "clave", "“Sí, y bajó 7 kilos.”", "Sugiere cáncer de pulmón."),
    act("tiempo", "¿Desde cuándo está así?", "util", "“Dos días.”", "Define si es aguda o crónica."),
    act("alcohol", "¿Toma alcohol o cerveza?", "util", "“Poco.”", "Potomanía: diferencial."),
    act("barrio", "¿De dónde es?", "neutro", "“De Villa María.”", "No orienta."),
  ],
  exam: [
    act("volemia", "Estado de volumen", "clave", "Sin edemas, mucosas húmedas, sin hipotensión ortostática.", "Euvolemia: criterio central."),
    act("neuro", "Neurológico", "clave", "Desorientado, sin foco.", "Encefalopatía por hiponatremia."),
    act("pulmon", "Tórax", "util", "Murmullo disminuido en vértice derecho.", "Orienta a la masa."),
  ],
  studies: [
    study("Laboratorio", "na", "Sodio, osmolalidad plasmática y urinaria, sodio urinario", "clave", "Na 116, osm plasmática 245, osm urinaria 480, Na urinario 58.", "Hipoosmolar con orina concentrada y sodio urinario alto."),
    study("Laboratorio", "excluir", "TSH, cortisol, función renal", "clave", "Normales.", "Es indispensable excluir hipotiroidismo e insuficiencia suprarrenal."),
    study("Imágenes", "tac", "TC de encéfalo y de tórax", "clave", "Encéfalo normal; masa hiliar derecha.", "Busca causa y complicaciones. Carcinoma de células pequeñas probable."),
    study("Laboratorio", "glucosa", "Glucemia para corregir el sodio", "util", "Normal.", "Excluye hiponatremia hipertónica."),
    study("Laboratorio", "orina-24", "Esperar la orina de 24 horas para tratar", "riesgoso", "No se realizó.", "Con síntomas graves, la hipertónica no puede demorarse."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("siadh", "Hiponatremia grave por SIADH (cáncer de pulmón y sertralina)", true, "Hiponatremia hipoosmolar euvolémica con orina concentrada, Na urinario alto, función renal, tiroides y suprarrenal normales."),
      dx("hipovolemica", "Hiponatremia hipovolémica", false, "No hay pérdidas ni signos de hipovolemia, y el Na urinario está alto."),
      dx("addison", "Insuficiencia suprarrenal", false, "Cortisol normal y sin hiperkalemia."),
      dx("potomania", "Polidipsia primaria", false, "La orina estaría diluida (menos de 100 mOsm/kg)."),
      dx("acv", "ACV", false, "La TC es normal y no hay foco."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hipertonica", "Solución salina hipertónica al 3 % en bolos por los síntomas graves", "clave", "Corrige rápido lo necesario para evitar herniación."),
      mg("limite", "No corregir más de 8 a 10 mEq/l en 24 horas, control seriado", "clave", "Evita la mielinólisis osmótica."),
      mg("agua", "Restricción de agua y suspender sertralina", "clave", "Tratamiento de base del SIADH."),
      mg("oncologia", "Estudio y tratamiento de la masa pulmonar", "clave", "Tratar la causa resuelve el cuadro."),
      mg("fisiologica", "Solución fisiológica rápida", "riesgoso", "En SIADH con orina concentrada puede empeorar el sodio."),
      mg("correccion-rapida", "Normalizar el sodio en un día", "riesgoso", "Riesgo de mielinólisis osmótica."),
    ],
  },
  debrief: {
    diagnosis: "SIADH con hiponatremia grave sintomática, por probable carcinoma de pulmón y sertralina, en varón de 66 años tabaquista.",
    pathologies: [
      { name: "SIADH", role: "principal", why: "Liberación inapropiada de hormona antidiurética." },
      { name: "Probable carcinoma de pulmón de células pequeñas", role: "asociada", why: "Causa paraneoplásica." },
      { name: "Hipovolemia, insuficiencia suprarrenal, potomanía, hipotiroidismo", role: "diferencial", why: "Otras causas de hiponatremia." },
    ],
    reasoning: [
      "Causa: producción ectópica de ADH y efecto de fármacos.",
      "Mecanismo: la ADH retiene agua libre en el túbulo colector y diluye el plasma.",
      "Consecuencia: edema cerebral con cefalea, confusión, convulsiones y riesgo de herniación.",
    ],
    epidemiology:
      "La hiponatremia es el trastorno electrolítico más frecuente en pacientes internados, y el SIADH es una de sus principales causas. Se asocia con enfermedades pulmonares, del sistema nervioso, cáncer y fármacos como ISRS, carbamazepina y ciclofosfamida. El carcinoma de células pequeñas es la causa tumoral clásica.",
    management: [
      "Clasificar la hiponatremia por osmolalidad y volumen.",
      "Hipertónica si hay síntomas graves.",
      "Límite de corrección por día.",
      "Restricción hídrica y tratar la causa.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones de hiponatremia.", "Guía europea de diagnóstico y tratamiento de la hiponatremia."],
    pearls: ["SIADH: euvolemia, orina concentrada, Na urinario alto.", "Excluí tiroides y suprarrenal.", "Máximo 8 a 10 mEq/l por día."],
    pitfalls: ["Corregir demasiado rápido.", "Usar fisiológica en vez de hipertónica en síntomas graves."],
    tribunal: [
      qa("¿Qué es la mielinólisis osmótica?", "La desmielinización del puente y otras áreas por corrección rápida de hiponatremia crónica; aparece días después con disartria, disfagia y cuadriparesia."),
      qa("¿Cómo se clasifica la hiponatremia?", "Por osmolalidad plasmática y, en la hipotónica, por volemia: hipovolémica, euvolémica e hipervolémica."),
      qa("¿Qué otros síndromes paraneoplásicos da el carcinoma de células pequeñas?", "Cushing ectópico, síndrome miasténico de Lambert-Eaton y degeneración cerebelosa."),
    ],
  },
};
