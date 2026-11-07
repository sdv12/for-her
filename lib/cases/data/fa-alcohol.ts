import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const faAlcohol: ClinicalCase = {
  id: "fibrilacion-auricular-alcohol-joven",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 36, ageUnit: "años", sex: "M", context: "Lunes temprano, después de un fin de semana de fiesta. Sin enfermedades previas." },
  frequency: "frecuente",
  intro: "“Me desperté con el corazón a mil, descontrolado. Estoy mareado y me falta un poco el aire. El sábado y el domingo tomé mucho.”",
  vitals: { TA: "122/76 mmHg", FC: "146 lpm", FR: "20 rpm", "T°": "36,7 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("tiempo", "¿Cuándo empezó exactamente?", "clave", "“Hace 5 horas.”", "Menos de 48 horas: permite cardioversión segura si es de bajo riesgo."),
    act("alcohol", "¿Cuánto alcohol? ¿Cocaína, energizantes?", "clave", "“Mucho fernet; energizantes; sin cocaína.”", "Holiday heart."),
    act("alarma", "¿Dolor de pecho, desmayo, falta de aire intensa?", "clave", "“No.”", "Sin inestabilidad."),
    act("previo", "¿Pasó antes? ¿Soplos, tiroides, apneas?", "util", "“Una vez, y se fue solo.”", "Otras causas."),
    act("anticoag", "¿Tomás medicación?", "util", "“No.”", "Cuidado con interacciones."),
    act("fiesta", "¿Dónde fue la fiesta?", "neutro", "“En un cumple.”", "No orienta."),
  ],
  exam: [
    act("pulso", "Pulso", "clave", "Irregularmente irregular.", "FA."),
    act("hemodinamia", "Estabilidad", "clave", "Sin hipotensión, sin confusión.", "Estable."),
    act("general", "Tiroides, corazón y pulmones", "util", "Sin soplos, sin bocio.", "Otras causas."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Sin ondas P, RR irregular; sin preexcitación.", "Confirma FA."),
    study("Laboratorio", "lab", "Ionograma, magnesio, TSH, función hepática, troponina", "clave", "K 3,3, Mg bajo, TSH normal.", "Corregir factores."),
    study("Imágenes", "eco", "Ecocardiograma ambulatorio", "util", "Corazón estructuralmente normal.", "Descarta cardiopatía."),
    study("Laboratorio", "dimero", "Dímero D de rutina", "innecesario", "No se realizó.", "No hay sospecha de TEP."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("fa", "Fibrilación auricular paroxística desencadenada por alcohol (holiday heart)", true, "Inicio reciente, consumo excesivo, ECG con FA y corazón sano."),
      dx("flutter", "Flutter", false, "El ritmo es regular con ondas en serrucho."),
      dx("tsv", "Taquicardia supraventricular", false, "Es regular."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "TSH normal."),
      dx("panico", "Pánico", false, "ECG con FA."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("electrolitos", "Corregir potasio y magnesio, hidratar", "clave", "Muchas revierten solas."),
      mg("frecuencia", "Control de frecuencia con betabloqueante; o cardioversión si sigue y es menor de 48 horas", "clave", "Estable y bajo riesgo."),
      mg("riesgo", "Calcular CHA₂DS₂-VASc: 0, sin anticoagulación crónica", "clave", "Sin factores de riesgo."),
      mg("alcohol", "Consejo sobre alcohol y estimulantes", "clave", "Evita recurrencias."),
      mg("anticoag-siempre", "Warfarina de por vida a todos", "innecesario", "Puntaje 0."),
      mg("cardioversion-tardia", "Cardiovertir sin revisar el tiempo si fuera mayor de 48 horas sin anticoagular", "riesgoso", "Riesgo de embolia; aquí la hora de inicio es clara."),
    ],
  },
  debrief: {
    diagnosis: "Fibrilación auricular paroxística por alcohol e hipopotasemia, en varón de 36 años con corazón sano.",
    pathologies: [
      { name: "Fibrilación auricular", role: "principal", why: "Arritmia auricular." },
      { name: "Hipopotasemia, hipomagnesemia", role: "asociada", why: "Factores." },
      { name: "Flutter, TSV, hipertiroidismo", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: alcohol y estimulantes.",
      "Mecanismo: toxicidad auricular y aumento adrenérgico, con desencadenantes electrolíticos.",
      "Consecuencia: palpitaciones; riesgo bajo en corazón sano si se evita la recurrencia.",
    ],
    epidemiology:
      "La FA es la arritmia sostenida más frecuente; en jóvenes suele vincularse con alcohol, hipertiroidismo, apneas o cardiopatía estructural. El síndrome del corazón de fin de semana suele revertir en 24 a 48 horas. Con el tiempo, el alcohol crónico aumenta el riesgo.",
    management: [
      "Estabilidad y tiempo de inicio.",
      "Corregir factores.",
      "Frecuencia o ritmo.",
      "CHA₂DS₂-VASc y prevención.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de fibrilación auricular.", "ESC — Guía de fibrilación auricular."],
    pearls: ["Pulso irregularmente irregular.", "Menos de 48 horas: cardioversión posible.", "Mirá el potasio."],
    pitfalls: ["Olvidar la hora de inicio.", "Dar anticoagulación sin riesgo."],
    tribunal: [
      qa("¿Qué es CHA₂DS₂-VASc?", "Insuficiencia cardíaca, HTA, edad de 75 o más (2), diabetes, ACV (2), enfermedad vascular, edad 65-74, sexo femenino."),
      qa("¿Qué hacer en FA con preexcitación?", "Evitar bloqueantes del nodo; usar procainamida o cardioversión."),
      qa("¿Cuándo es urgente cardiovertir?", "Si hay inestabilidad: hipotensión, isquemia, IC aguda o síncope."),
    ],
  },
};
