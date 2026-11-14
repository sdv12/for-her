import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const abscesoCerebral: ClinicalCase = {
  id: "absceso-cerebral",
  level: 4,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Hace 3 semanas tuvo una infección dental y una sinusitis tratadas sin antibiótico completo." },
  frequency: "raro",
  intro: "“Hace diez días tengo dolor de cabeza cada vez más fuerte, ayer vomité y hoy noto el brazo izquierdo débil.”",
  vitals: { TA: "142/88 mmHg", FC: "88 lpm", FR: "18 rpm", "T°": "37,9 °C", "SatO₂": "97 %", Glasgow: "14/15" },
  anamnesis: [
    act("cefalea", "¿Cómo evolucionó el dolor?", "clave", "“Progresivo, peor a la mañana.”", "Hipertensión endocraneana."),
    act("foco", "¿Infecciones recientes en dientes, oídos o senos?", "clave", "“Un flemón y sinusitis.”", "Foco contiguo."),
    act("inmuno", "¿VIH, diabetes, cardiopatía congénita?", "clave", "“No.”", "Factores de riesgo."),
    act("convulsiones", "¿Convulsiones?", "util", "“No.”", "Complicación."),
    act("fiebre", "¿Fiebre?", "util", "“Febrícula.”", "Puede faltar."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy chef.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Hemiparesia izquierda leve.", "Lesión focal derecha."),
    act("fondo", "Fondo de ojo", "clave", "Papiledema bilateral.", "Hipertensión endocraneana."),
    act("dientes", "Boca", "util", "Molar con caries profunda.", "Foco."),
  ],
  studies: [
    study("Imágenes", "rm", "RM de cerebro con contraste y difusión", "clave", "Lesión frontal derecha con realce anular fino y restricción central en difusión, edema perilesional.", "Absceso."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "clave", "Negativos.", "Germen."),
    study("Microbiología", "aspiracion", "Aspiración estereotáctica con cultivo", "util", "Streptococcus anginosus y anaerobios.", "Germen."),
    study("Otros", "pl", "Punción lumbar", "riesgoso", "No se realizó.", "Riesgo de herniación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("absceso", "Absceso cerebral frontal derecho de origen odontógeno/sinusal", true, "Cefalea progresiva, foco motor, papiledema, foco dental y lesión anular con restricción en difusión."),
      dx("glioblastoma", "Glioblastoma", false, "La restricción central en difusión sugiere pus."),
      dx("metastasis", "Metástasis", false, "Foco infeccioso y difusión típica."),
      dx("meningitis", "Meningitis bacteriana", false, "Lesión focal sin meningismo."),
      dx("toxoplasmosis", "Toxoplasmosis cerebral", false, "Sin inmunosupresión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ceftriaxona en dosis altas más metronidazol EV", "clave", "Cubre estreptococos y anaerobios."),
      mg("drenaje", "Aspiración neuroquirúrgica", "clave", "Absceso mayor de 2,5 cm."),
      mg("foco", "Tratar el foco dental y sinusal", "clave", "Evita recurrencia."),
      mg("antiepileptico", "Considerar antiepiléptico", "util", "Riesgo de crisis."),
      mg("pl-mg", "Hacer punción lumbar para identificar el germen", "riesgoso", "Herniación."),
      mg("corticoides-solos", "Solo corticoides", "riesgoso", "Disemina la infección."),
    ],
  },
  debrief: {
    diagnosis: "Absceso cerebral frontal derecho por estreptococos y anaerobios de origen odontógeno y sinusal, en varón de 38 años.",
    pathologies: [
      { name: "Absceso cerebral", role: "principal", why: "Colección purulenta intraparenquimatosa." },
      { name: "Foco dental y sinusal", role: "asociada", why: "Origen por contigüidad." },
      { name: "Glioblastoma, metástasis", role: "diferencial", why: "Lesiones anulares." },
    ],
    reasoning: [
      "Causa: diseminación desde dientes y senos paranasales.",
      "Mecanismo: cerebritis que evoluciona a cápsula con pus.",
      "Consecuencia: efecto de masa, convulsiones y herniación.",
    ],
    epidemiology:
      "Es raro y la fiebre falta en la mitad de los casos. Los focos más frecuentes son dentales, sinusales, óticos y endocarditis. La RM con difusión ayuda a diferenciarlo de tumores.",
    management: [
      "RM con difusión.",
      "Antibiótico.",
      "Drenaje.",
      "Foco.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infecciones del sistema nervioso central.", "ESCMID — Guideline on Brain Abscess."],
    pearls: ["Cefalea progresiva con foco.", "Difusión restringida: pus.", "Sin punción lumbar."],
    pitfalls: ["Punzar.", "Pensar solo en tumor."],
    tribunal: [
      qa("¿Por qué la RM con difusión ayuda?", "El pus restringe la difusión; la mayoría de los tumores necróticos no."),
      qa("¿Cuánto dura el tratamiento antibiótico?", "Entre 6 y 8 semanas EV."),
      qa("¿Qué cardiopatía predispone?", "Las cardiopatías congénitas cianóticas con shunt derecha-izquierda."),
    ],
  },
};
