import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const organofosforados: ClinicalCase = {
  id: "intoxicacion-organofosforados",
  level: 3,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Trabajador rural del cinturón hortícola. Llega en camioneta con un compañero." },
  frequency: "poco-frecuente",
  intro: "“Estaba fumigando la quinta desde temprano, sin máscara. Hace dos horas empecé con vómitos, diarrea, transpiro a chorros, babeo y me ahogo.”",
  vitals: { TA: "96/60 mmHg", FC: "48 lpm", FR: "28 rpm", "T°": "36,2 °C", "SatO₂": "88 %" },
  anamnesis: [
    act("producto", "¿Qué producto usaba? ¿Trajeron el envase?", "clave", "El compañero trae el envase: clorpirifós (organofosforado).", "Identificar el tóxico orienta el antídoto; los organofosforados y carbamatos inhiben la acetilcolinesterasa."),
    act("via", "¿Cómo fue la exposición? ¿Usaba protección?", "clave", "“Fumigué cuatro horas con mochila, sin guantes ni máscara; la ropa quedó empapada.”", "Exposición dérmica e inhalatoria: la ropa contaminada sigue intoxicando."),
    act("tiempo", "¿Cuándo empezaron los síntomas?", "util", "“Hace dos horas.”", "Los síntomas colinérgicos aparecen en minutos a horas."),
    act("intencional", "¿Pudo haberlo tomado?", "clave", "“No, fue trabajando.”", "La ingesta intencional es otra presentación frecuente y suele ser más grave."),
    act("vision", "¿Ve borroso?", "util", "“Sí, todo borroso.”", "Miosis y espasmo de acomodación (efecto muscarínico)."),
    act("debilidad", "¿Tiene debilidad o calambres?", "clave", "“Me tiemblan los músculos y me siento débil.”", "Fasciculaciones y debilidad: efecto nicotínico, que puede llegar a la parálisis respiratoria."),
    act("otros", "¿Hay otros trabajadores con síntomas?", "util", "“Un compañero tiene dolor de cabeza.”", "Puede haber más expuestos: evaluar y notificar."),
    act("enfermedades", "¿Tiene asma u otra enfermedad?", "util", "“No.”", "El broncoespasmo y la broncorrea empeoran en asmáticos."),
    act("equipo", "¿De dónde es?", "neutro", "“De Florencio Varela.”", "No orienta."),
  ],
  exam: [
    act("pupilas", "Pupilas", "clave", "Miosis puntiforme bilateral.", "Signo muscarínico clásico."),
    act("pulmonar", "Auscultación pulmonar", "clave", "Roncus y sibilancias difusos, abundantes secreciones (broncorrea).", "La broncorrea y el broncoespasmo son la principal causa de muerte temprana."),
    act("piel", "Piel y secreciones", "util", "Sudoración profusa, sialorrea, lagrimeo; olor a solvente en la ropa.", "Síndrome muscarínico: secreciones (DUMBELS)."),
    act("muscular", "Fuerza y fasciculaciones", "clave", "Fasciculaciones en párpados y miembros, fuerza 4/5.", "Efecto nicotínico en la placa motora."),
    act("neuro", "Estado de conciencia", "util", "Lúcido, ansioso.", "La confusión, el coma o las convulsiones indican compromiso central grave."),
  ],
  studies: [
    study("Laboratorio", "colinesterasa", "Colinesterasa plasmática y eritrocitaria", "clave", "Muy disminuidas (menos del 30 % del valor normal).", "Confirma la intoxicación y su magnitud; la eritrocitaria refleja mejor la inhibición a nivel sináptico."),
    study("Laboratorio", "lab", "Gases, ionograma, glucemia, función renal y hepática, CPK, amilasa", "util", "Hipoxemia, acidosis respiratoria leve, hiperglucemia.", "Valoran la gravedad y las complicaciones."),
    study("Electrofisiología", "ecg", "Electrocardiograma y monitoreo", "clave", "Bradicardia sinusal, QTc 480 ms.", "Riesgo de bradiarritmias y de arritmias ventriculares por QT largo."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Infiltrados bilaterales leves.", "Busca edema pulmonar o aspiración."),
    study("Laboratorio", "esperar-colinesterasa", "Esperar el resultado de la colinesterasa para dar atropina", "riesgoso", "No se realizó.", "El diagnóstico es clínico: la atropina se da de inmediato ante el síndrome colinérgico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("op", "Intoxicación aguda por organofosforados (síndrome colinérgico muscarínico y nicotínico)", true, "Exposición laboral a clorpirifós, miosis, broncorrea, broncoespasmo, bradicardia, sudoración, sialorrea, diarrea, fasciculaciones y colinesterasas bajas."),
      dx("anticolinergico", "Síndrome anticolinérgico", false, "Es lo opuesto: midriasis, piel seca y caliente, taquicardia, retención urinaria, delirio."),
      dx("opioides", "Intoxicación por opioides", false, "Da miosis y depresión respiratoria, pero no sudoración profusa, broncorrea, diarrea ni fasciculaciones."),
      dx("gastroenteritis", "Gastroenteritis aguda", false, "No explica la miosis, la broncorrea, la bradicardia ni las fasciculaciones."),
      dx("asma", "Crisis asmática", false, "No explica el cuadro colinérgico global."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("descontaminar", "Descontaminación: retirar toda la ropa, lavar la piel con agua y jabón, con el personal protegido (guantes, camisolín)", "clave", "Detiene la absorción y protege al equipo de la contaminación secundaria."),
      mg("atropina", "Atropina endovenosa en dosis crecientes (duplicando cada 5 minutos) hasta secar las secreciones bronquiales", "clave", "Antagoniza los efectos muscarínicos. El objetivo es la atropinización: pulmón seco, FC mayor de 80, TA sistólica mayor de 80; no la pupila."),
      mg("oxigeno", "Oxígeno, aspiración de secreciones y manejo de la vía aérea (intubar si hay falla respiratoria)", "clave", "La insuficiencia respiratoria es la causa de muerte."),
      mg("oximas", "Oximas (pralidoxima) en forma temprana si están disponibles", "util", "Reactivan la colinesterasa antes de que la unión se vuelva irreversible (envejecimiento); actúan sobre los efectos nicotínicos."),
      mg("notificar", "Notificar al SNVS, consultar al centro de toxicología y evaluar a los compañeros expuestos", "util", "Es una intoxicación laboral de notificación obligatoria."),
      mg("succinilcolina", "Intubar con succinilcolina", "riesgoso", "Su metabolismo depende de la colinesterasa: produce parálisis muy prolongada. Se prefieren bloqueantes no despolarizantes."),
      mg("sin-proteccion", "Atenderlo con la ropa puesta y sin guantes para ganar tiempo", "riesgoso", "El personal se intoxica y el paciente sigue absorbiendo el tóxico."),
    ],
  },
  debrief: {
    diagnosis: "Intoxicación aguda grave por organofosforados (clorpirifós) por exposición laboral dérmica e inhalatoria, con síndrome colinérgico muscarínico y nicotínico e insuficiencia respiratoria.",
    pathologies: [
      { name: "Intoxicación por organofosforados", role: "principal", why: "Inhibición de la acetilcolinesterasa." },
      { name: "Insuficiencia respiratoria", role: "asociada", why: "Broncorrea, broncoespasmo y debilidad muscular." },
      { name: "Síndrome intermedio", role: "diferencial", why: "Debilidad proximal y respiratoria a las 24–96 h." },
      { name: "Intoxicación por carbamatos y opioides", role: "diferencial", why: "Cuadros parecidos." },
    ],
    reasoning: [
      "Causa: exposición a un insecticida organofosforado sin protección, por piel e inhalación.",
      "Mecanismo: el organofosforado fosforila e inhibe la acetilcolinesterasa; la acetilcolina se acumula en las sinapsis muscarínicas, nicotínicas y del sistema nervioso central. Con el tiempo la unión se vuelve irreversible (envejecimiento).",
      "Consecuencia: muscarínico (DUMBELS: diarrea, micción, miosis, bradicardia y broncorrea, broncoespasmo, emesis, lagrimeo, sialorrea, sudoración); nicotínico (fasciculaciones, debilidad, parálisis, taquicardia); central (confusión, convulsiones, coma).",
      "La atropina bloquea solo los receptores muscarínicos; las oximas reactivan la enzima.",
    ],
    epidemiology:
      "Las intoxicaciones por plaguicidas son frecuentes en zonas rurales y en los cinturones hortícolas de la Argentina, sobre todo en varones jóvenes con exposición laboral sin protección; las ingestas intencionales son más graves. Los organofosforados están entre las principales causas de muerte por intoxicación en el mundo. Son eventos de notificación obligatoria.",
    management: [
      "Protección del personal y descontaminación (ropa, piel, ojos).",
      "ABC: oxígeno, aspiración, intubación si es necesario (sin succinilcolina).",
      "Atropina en dosis crecientes hasta la atropinización (secreciones secas); oximas tempranas si están disponibles.",
      "Benzodiacepinas si hay convulsiones o agitación.",
      "Monitoreo por síndrome intermedio y neuropatía tardía; notificación y prevención laboral.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de prevención, diagnóstico, tratamiento y vigilancia epidemiológica de las intoxicaciones agudas por plaguicidas.",
      "Centro Nacional de Intoxicaciones (Hospital Posadas, 0800-333-0160).",
    ],
    pearls: ["Miosis + secreciones + bradicardia + fasciculaciones = organofosforados.", "El objetivo de la atropina son los pulmones secos, no la pupila.", "Nunca succinilcolina."],
    pitfalls: ["Atender sin protección.", "Dosis insuficientes de atropina.", "Esperar el laboratorio para tratar."],
    tribunal: [
      qa("¿Qué es el síndrome colinérgico y qué es DUMBELS?", "El exceso de acetilcolina. DUMBELS resume los efectos muscarínicos: Diarrea, Urination (micción), Miosis, Bradicardia y Broncorrea/Broncoespasmo, Emesis, Lagrimeo, Salivación y Sudoración. Se suman los nicotínicos (fasciculaciones, debilidad) y los centrales."),
      qa("¿Cómo diferenciás los toxíndromes colinérgico, anticolinérgico, simpaticomimético y opioide?", "Colinérgico: miosis, secreciones, bradicardia. Anticolinérgico: midriasis, piel seca y caliente, taquicardia, retención, delirio. Simpaticomimético: midriasis, sudoración, taquicardia, hipertensión, hipertermia, agitación. Opioide: miosis, depresión respiratoria y de conciencia, sin secreciones."),
      qa("¿Qué es el síndrome intermedio?", "Debilidad de músculos proximales, flexores del cuello, pares craneales y músculos respiratorios que aparece 24–96 horas después de la intoxicación, tras la resolución del cuadro colinérgico; puede requerir ventilación."),
      qa("¿Por qué las oximas deben darse temprano?", "Porque reactivan la colinesterasa solo antes del envejecimiento de la unión fosfato-enzima, que se vuelve irreversible en horas según el compuesto."),
    ],
  },
};
