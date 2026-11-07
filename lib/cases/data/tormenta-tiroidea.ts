import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tormentaTiroidea: ClinicalCase = {
  id: "tormenta-tiroidea",
  level: 4,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Enfermedad de Graves; dejó el metimazol hace 3 meses. Infección respiratoria hace 4 días." },
  frequency: "raro",
  intro: "“Tiene mucha fiebre, el corazón le va a mil, está agitada, vomita y dice cosas raras.” (relata su pareja)",
  vitals: { TA: "148/62 mmHg", FC: "158 lpm", FR: "30 rpm", "T°": "39,8 °C", "SatO₂": "94 %", Glucemia: "118 mg/dl", Glasgow: "13/15" },
  anamnesis: [
    act("tiroides", "¿Tiene algún problema de tiroides? ¿Medicación?", "clave", "“Graves, dejó el metimazol hace 3 meses.”", "Causa frecuente."),
    act("gatillo", "¿Infección, cirugía, parto, yodo?", "clave", "“Una tos con fiebre.”", "Desencadenante."),
    act("sustancias", "¿Cocaína, anfetaminas, fármacos?", "clave", "“No.”", "Simuladores."),
    act("cardiaco", "¿Falta de aire, dolor de pecho?", "util", "“Se ahoga.”", "IC de alto gasto."),
    act("embarazo", "¿Podría estar embarazada?", "util", "“No sabemos.”", "Cambia el tratamiento."),
    act("trabajo", "¿De qué trabaja?", "neutro", "“Vendedora.”", "No orienta."),
  ],
  exam: [
    act("cuello", "Cuello y ojos", "clave", "Bocio difuso con soplo, exoftalmos.", "Graves."),
    act("cardio", "Corazón y pulmones", "clave", "Fibrilación auricular rápida, rales bibasales.", "Compromiso cardíaco."),
    act("neuro", "Neurológico", "clave", "Agitada, desorientada, temblor; sin rigidez.", "Compromiso del sistema nervioso central."),
  ],
  studies: [
    study("Laboratorio", "tiroides", "TSH y T4 libre", "clave", "TSH menor de 0,01; T4 libre 6,2 ng/dl.", "Apoyan, pero el valor no define tormenta: es clínico."),
    study("Otros", "burch", "Puntaje de Burch-Wartofsky", "clave", "Puntaje mayor de 45.", "Muy sugestivo de tormenta."),
    study("Electrofisiología", "ecg", "ECG", "clave", "FA con 160 lpm.", "Arritmia."),
    study("Laboratorio", "lab", "Laboratorio, cultivos, beta-hCG, Rx de tórax", "clave", "Leucocitos 15.000; beta-hCG negativa; infiltrado basal.", "Busca el gatillo."),
    study("Otros", "centello", "Centellograma con yodo ahora", "innecesario", "No se realizó.", "No debe demorar el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tormenta", "Crisis tirotóxica (tormenta tiroidea) por Graves, desencadenada por infección", true, "Hipertiroidismo, fiebre alta, taquiarritmia, delirio, IC y Burch-Wartofsky alto."),
      dx("sepsis", "Sepsis sola", false, "Hay infección, pero el cuadro tiroideo es determinante."),
      dx("feo", "Feocromocitoma", false, "Sin crisis paroxísticas previas, y TSH suprimida con Graves."),
      dx("cocaina", "Intoxicación simpaticomimética", false, "Sin exposición y con Graves."),
      dx("snm", "Síndrome neuroléptico maligno", false, "No hay rigidez ni antipsicóticos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ptu", "Propiltiouracilo o metimazol en altas dosis", "clave", "Bloquea la síntesis; el PTU también la conversión a T3."),
      mg("yodo", "Solución de yodo, al menos 1 hora después del antitiroideo", "clave", "Bloquea la liberación. Si se da antes, sirve de sustrato."),
      mg("bloqueante", "Propranolol, con cautela si hay falla", "clave", "Controla frecuencia y efectos adrenérgicos."),
      mg("hidrocortisona", "Hidrocortisona EV", "clave", "Reduce conversión y cubre insuficiencia suprarrenal relativa."),
      mg("soporte", "Terapia intensiva, enfriar con paracetamol, tratar la infección y anticoagular por FA según riesgo", "clave", "Soporte."),
      mg("aspirina", "Aspirina para la fiebre", "riesgoso", "Desplaza a la T4 de su proteína y empeora."),
    ],
  },
  debrief: {
    diagnosis: "Tormenta tiroidea por enfermedad de Graves con abandono del tratamiento e infección, con FA e IC, en mujer de 34 años.",
    pathologies: [
      { name: "Tormenta tiroidea", role: "principal", why: "Tirotoxicosis descompensada." },
      { name: "FA, insuficiencia cardíaca, neumonía", role: "asociada", why: "Complicaciones y desencadenante." },
      { name: "Sepsis, feocromocitoma, intoxicación", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: Graves sin tratamiento más una infección.",
      "Mecanismo: la hormona aumenta los receptores adrenérgicos y el metabolismo, y el estrés descompensa el cuadro.",
      "Consecuencia: fiebre, taquiarritmia, IC, delirio, falla multiorgánica con mortalidad de hasta 10 a 30 %.",
    ],
    epidemiology:
      "Es una emergencia endocrina rara. Graves predomina en mujeres de 20 a 50 años. Los gatillos más comunes son infecciones, abandono del tratamiento, cirugía, parto y yodo. Se confirma por clínica y no por niveles hormonales.",
    management: [
      "Sospecha clínica.",
      "Antitiroideo, luego yodo, betabloqueante e hidrocortisona.",
      "Terapia intensiva y tratar el gatillo.",
      "Plan definitivo: yodo radiactivo o cirugía.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Recomendaciones de hipertiroidismo.", "American Thyroid Association — Guía de hipertiroidismo."],
    pearls: ["Antitiroideo antes del yodo.", "No uses aspirina.", "El diagnóstico es clínico."],
    pitfalls: ["Dar yodo primero.", "Esperar a laboratorio."],
    tribunal: [
      qa("¿Qué efectos adversos tienen los antitiroideos?", "Agranulocitosis (fiebre y dolor de garganta: hacer hemograma), hepatotoxicidad (sobre todo PTU), rash."),
      qa("¿Qué diferencia a Graves de tiroiditis?", "En Graves hay anticuerpos TRAb, captación alta, bocio con soplo y oftalmopatía. En tiroiditis, captación baja y curso autolimitado."),
      qa("¿Qué antitiroideo se usa en el embarazo?", "Propiltiouracilo en el primer trimestre, y metimazol después, por teratogenicidad del metimazol."),
    ],
  },
};
