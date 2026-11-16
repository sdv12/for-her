import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sangradoUterinoAnovulatorio: ClinicalCase = {
  id: "sangrado-uterino-anovulatorio",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 47, ageUnit: "años", sex: "F", context: "Administrativa. IMC 34. Dos hijos, ligadura tubaria. Ciclos irregulares desde hace un año." },
  frequency: "muy-frecuente",
  intro: "“Me viene cada dos o tres meses y cuando viene es un mar, por diez días.”",
  vitals: { TA: "134/84 mmHg", FC: "86 lpm", Peso: "90 kg" },
  anamnesis: [
    act("patron", "¿Cómo son los ciclos?", "clave", "“Irregulares, a veces 2 meses sin nada y después sangrado abundante con coágulos.”", "Patrón de anovulación."),
    act("anemia", "¿Se cansa, se marea?", "clave", "“Muy cansada, me falta el aire en la escalera.”", "Anemia."),
    act("riesgo-endometrio", "¿Diabetes, ovario poliquístico, toma tamoxifeno?", "clave", "“Prediabetes.”", "Obesidad, anovulación y prediabetes: riesgo de hiperplasia endometrial."),
    act("pap", "¿Último PAP?", "clave", "“Hace un año, normal.”", "Descarta cervical."),
    act("anticoagulantes", "¿Toma anticoagulantes o tiene sangrados en otros lados?", "util", "“No.”", "Coagulopatías."),
    act("calor", "¿Sofocos?", "util", "“Algunos.”", "Perimenopausia."),
  ],
  exam: [
    act("especuloscopia", "Especuloscopía", "clave", "Cuello sano, sangrado escaso que sale por el orificio cervical.", "Origen uterino."),
    act("tacto", "Tacto bimanual", "clave", "Útero de tamaño normal, móvil, sin masas.", "No sugiere miomas grandes."),
    act("palidez", "Piel y mucosas", "util", "Palidez.", "Anemia."),
  ],
  studies: [
    study("Laboratorio", "hcg", "Subunidad beta", "clave", "Negativa.", "Siempre primero."),
    study("Laboratorio", "hemograma", "Hemograma y ferritina", "clave", "Hb 9,6 g/dl, ferritina 6 ng/ml.", "Anemia ferropénica."),
    study("Imágenes", "eco-tv", "Ecografía transvaginal", "clave", "Endometrio de 16 mm heterogéneo; útero y ovarios sin masas.", "Engrosamiento endometrial."),
    study("Otros", "biopsia-endometrio", "Biopsia endometrial (Pipelle o histeroscopía)", "clave", "Hiperplasia endometrial sin atipia.", "Obligatoria en mayores de 45 con sangrado anormal o con factores de riesgo."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal.", "Causa de anovulación."),
    study("Laboratorio", "fsh", "FSH para confirmar la perimenopausia", "innecesario", "No se pidió.", "Fluctúa y no cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sua-anovulatorio", "Sangrado uterino anormal por disfunción ovulatoria (PALM-COEIN: O) con hiperplasia endometrial sin atipia y anemia", true, "Perimenopausia con obesidad, ciclos irregulares, endometrio engrosado e hiperplasia sin atipia en la biopsia."),
      dx("miomas", "Miomatosis uterina", false, "Útero normal y eco sin miomas."),
      dx("cancer-endometrio", "Cáncer de endometrio", false, "La biopsia no muestra carcinoma."),
      dx("polipo", "Pólipo endometrial", false, "La biopsia muestra hiperplasia difusa."),
      dx("coagulopatia", "Coagulopatía", false, "Sin sangrados en otros sitios."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("diu-lng", "DIU de levonorgestrel", "clave", "Controla el sangrado y revierte la hiperplasia sin atipia."),
      mg("hierro", "Hierro oral", "clave", "Anemia ferropénica."),
      mg("peso", "Descenso de peso", "clave", "El tejido graso produce estrógenos que estimulan el endometrio."),
      mg("biopsia-control", "Biopsia endometrial de control a los 6 meses", "clave", "Confirma la regresión."),
      mg("acido-tranexamico", "Ácido tranexámico en los días de sangrado", "util", "Reduce el volumen."),
      mg("histerectomia-ya", "Histerectomía inmediata", "innecesario", "La hiperplasia sin atipia responde a progestágenos."),
      mg("estrogenos", "Terapia hormonal con estrógenos solos", "riesgoso", "Estimula el endometrio y la hiperplasia."),
    ],
  },
  debrief: {
    diagnosis: "Sangrado uterino anormal por anovulación perimenopáusica con hiperplasia endometrial sin atipia y anemia ferropénica, en una mujer de 47 años con obesidad.",
    pathologies: [
      { name: "Sangrado uterino anormal por disfunción ovulatoria", role: "principal", why: "Estrógeno sin oposición de progesterona." },
      { name: "Hiperplasia endometrial sin atipia", role: "asociada", why: "Consecuencia del estímulo estrogénico." },
      { name: "Cáncer de endometrio", role: "diferencial", why: "Se descarta con biopsia." },
    ],
    reasoning: [
      "Causa: ciclos anovulatorios de la perimenopausia y estrógenos de la grasa.",
      "Mecanismo: el endometrio prolifera sin progesterona y descama en forma irregular y abundante.",
      "Consecuencia: sangrado abundante, anemia e hiperplasia que puede progresar a cáncer.",
    ],
    epidemiology:
      "El sangrado uterino anormal es una de las consultas ginecológicas más comunes, y la anovulación es su causa más frecuente en la adolescencia y la perimenopausia. La obesidad, el SOP y la diabetes aumentan el riesgo de hiperplasia y cáncer de endometrio.",
    management: [
      "Beta y hemograma.",
      "Ecografía.",
      "Biopsia endometrial en mayores de 45 o con factores de riesgo.",
      "Progestágenos, idealmente DIU de levonorgestrel.",
      "Hierro y descenso de peso.",
    ],
    sources: ["FASGO — Sangrado uterino anormal.", "FIGO — PALM-COEIN classification of abnormal uterine bleeding."],
    pearls: ["Mayor de 45 con sangrado anormal: biopsia.", "PALM-COEIN.", "DIU de levonorgestrel para hiperplasia sin atipia."],
    pitfalls: ["Atribuirlo a la menopausia sin estudiar.", "Dar estrógenos solos."],
    tribunal: [
      qa("¿Qué significa PALM-COEIN?", "Causas estructurales (Pólipo, Adenomiosis, Leiomioma, Malignidad) y no estructurales (Coagulopatía, Ovulatoria, Endometrial, Iatrogénica, No clasificada)."),
      qa("¿Cuándo se biopsia el endometrio en el sangrado uterino anormal?", "En mayores de 45, o antes si hay obesidad, anovulación crónica, falla del tratamiento o tamoxifeno."),
      qa("¿Cómo se trata la hiperplasia endometrial con atipia?", "Con histerectomía, porque tiene alto riesgo de cáncer coexistente o de progresión."),
    ],
  },
};
