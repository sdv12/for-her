import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const noduloTiroideo: ClinicalCase = {
  id: "nodulo-tiroideo",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 37, ageUnit: "años", sex: "F", context: "Recibió radioterapia en el cuello por un linfoma a los 15 años." },
  frequency: "frecuente",
  intro: "“Me miré en el espejo y vi un bulto en el cuello del lado derecho, que se mueve cuando trago. No me duele.”",
  vitals: { TA: "118/74 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("radiacion", "¿Recibiste radiación en el cuello?", "clave", "“Sí, por un linfoma a los 15.”", "La radiación en la infancia es un factor de riesgo importante de cáncer de tiroides."),
    act("crecimiento", "¿Creció rápido? ¿Cambió la voz, te cuesta tragar o respirar?", "clave", "“Creció un poco en dos meses; la voz está igual.”", "Crecimiento rápido y síntomas compresivos son signos de alarma."),
    act("familia", "¿Alguien de tu familia tuvo cáncer de tiroides?", "util", "“No.”", "Antecedente familiar."),
    act("funcion", "¿Palpitaciones, nerviosismo, cansancio o frío?", "util", "“No.”", "Función tiroidea clínica normal."),
    act("embarazo", "¿Estás embarazada o planeás estarlo?", "util", "“No por ahora.”", "Cambia algunas conductas."),
    act("hobby", "¿Qué hacés los fines de semana?", "neutro", "“Ciclismo.”", "No orienta."),
  ],
  exam: [
    act("nodulo", "Palpación tiroidea", "clave", "Nódulo de 2 cm en lóbulo derecho, duro, poco móvil.", "Características de sospecha."),
    act("ganglios", "Ganglios cervicales", "clave", "Ganglio laterocervical derecho de 1,5 cm, duro.", "Posible metástasis ganglionar."),
    act("voz", "Voz y respiración", "util", "Normales.", "Sin compromiso del recurrente."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH", "clave", "Normal.", "Con TSH normal o alta se sigue con ecografía y punción; si estuviera baja, centellograma."),
    study("Imágenes", "eco", "Ecografía tiroidea y cervical", "clave", "Nódulo sólido hipoecoico, bordes irregulares, microcalcificaciones, más alto que ancho (TI-RADS 5); ganglio sospechoso.", "Alta sospecha."),
    study("Otros", "paaf", "Punción aspiración con aguja fina (PAAF) del nódulo y del ganglio", "clave", "Bethesda VI: carcinoma papilar; ganglio con metástasis.", "Confirma el diagnóstico."),
    study("Laboratorio", "tiroglobulina", "Tiroglobulina para el diagnóstico", "innecesario", "No se realizó.", "No sirve para diagnosticar; se usa en el seguimiento postoperatorio."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("papilar", "Carcinoma papilar de tiroides con metástasis ganglionar cervical", true, "Nódulo duro con ecografía de alta sospecha y PAAF Bethesda VI, ganglio con metástasis, antecedente de radiación en la infancia."),
      dx("benigno", "Nódulo coloide benigno", false, "La PAAF muestra carcinoma."),
      dx("adenoma-toxico", "Adenoma tóxico", false, "TSH normal."),
      dx("tiroiditis", "Tiroiditis", false, "No hay dolor ni alteración funcional; la PAAF es diagnóstica."),
      dx("linfoma", "Recaída del linfoma", false, "La citología muestra carcinoma papilar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Tiroidectomía total con vaciamiento ganglionar del compartimento afectado", "clave", "Tratamiento del carcinoma con metástasis ganglionar."),
      mg("yodo", "Evaluar yodo radiactivo posoperatorio según riesgo", "clave", "Elimina restos y metástasis."),
      mg("seguimiento", "Levotiroxina y seguimiento con tiroglobulina y ecografía", "clave", "Reemplazo y detección de recurrencias."),
      mg("anticoncepcion", "Evitar el embarazo por 6–12 meses después del yodo radiactivo", "util", "Seguridad fetal."),
      mg("observar", "Control ecográfico en un año", "riesgoso", "Demora el tratamiento de un cáncer confirmado."),
      mg("levo-supresion", "Solo levotiroxina para “achicar” el nódulo", "innecesario", "No trata el cáncer."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma papilar de tiroides con metástasis ganglionar laterocervical, en mujer de 37 años con antecedente de radioterapia cervical en la infancia.",
    pathologies: [
      { name: "Carcinoma papilar de tiroides", role: "principal", why: "Cáncer de tiroides más frecuente." },
      { name: "Metástasis ganglionar cervical", role: "asociada", why: "Diseminación linfática." },
      { name: "Nódulo benigno, adenoma, tiroiditis", role: "diferencial", why: "Otras causas de nódulo." },
    ],
    reasoning: [
      "Causa: mutaciones (BRAF, RET) favorecidas por la radiación ionizante en la infancia.",
      "Mecanismo: proliferación de células foliculares con diseminación linfática.",
      "Consecuencia: nódulo y adenopatías; en general con muy buen pronóstico con tratamiento.",
    ],
    epidemiology:
      "Los nódulos tiroideos son muy frecuentes (palpables en 5 % y ecográficos en hasta 60 % de los adultos) y la gran mayoría son benignos (más del 90 %). El cáncer de tiroides es más frecuente en mujeres; el papilar es el 85 % y tiene excelente supervivencia.",
    management: [
      "TSH y ecografía ante todo nódulo.",
      "PAAF según tamaño y características ecográficas.",
      "Cirugía para Bethesda V–VI; seguimiento para benignos.",
      "Yodo radiactivo y seguimiento según el riesgo.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Consenso de nódulo tiroideo y cáncer diferenciado de tiroides.", "Guías ATA de nódulos tiroideos."],
    pearls: ["Nódulo: TSH y ecografía.", "Radiación infantil = alto riesgo.", "Bethesda guía la conducta."],
    pitfalls: ["Controlar sin punzar un nódulo sospechoso.", "Pedir tiroglobulina para diagnosticar."],
    tribunal: [
      qa("¿Qué características ecográficas sugieren malignidad?", "Nódulo sólido hipoecoico, bordes irregulares o lobulados, microcalcificaciones, más alto que ancho, extensión extratiroidea y ganglios sospechosos."),
      qa("¿Qué es el sistema Bethesda?", "La clasificación de la citología tiroidea en 6 categorías: I no diagnóstica, II benigna, III atipia de significado incierto, IV neoplasia folicular, V sospechosa de malignidad, VI maligna."),
      qa("¿Qué tipos de cáncer de tiroides hay?", "Diferenciados (papilar y folicular, de buen pronóstico), medular (de células C, produce calcitonina, puede ser hereditario en MEN 2) y anaplásico (muy agresivo, en mayores)."),
    ],
  },
};
