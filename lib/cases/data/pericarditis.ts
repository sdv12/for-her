import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pericarditis: ClinicalCase = {
  id: "pericarditis-aguda",
  level: 2,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "M", context: "Sano. Tuvo un cuadro gripal hace 10 días." },
  frequency: "frecuente",
  intro: "“Me duele el pecho, como una puntada fuerte, sobre todo cuando respiro hondo o me acuesto boca arriba. Si me siento inclinado hacia adelante mejora.”",
  vitals: { TA: "122/76 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "37,8 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("dolor", "¿Cómo cambia el dolor con la posición y la respiración?", "clave", "“Empeora acostado y al respirar, mejora sentado hacia adelante.”", "Dolor pleurítico y posicional: típico de pericarditis."),
    act("viral", "¿Tuviste un resfrío o gripe reciente?", "clave", "“Hace 10 días.”", "Pericarditis viral (idiopática), la más frecuente."),
    act("riesgo-coronario", "¿Fumás, tenés antecedentes familiares de infarto? ¿Drogas?", "util", "“No.”", "Bajo riesgo coronario."),
    act("disnea", "¿Te falta el aire o te mareaste?", "util", "“No.”", "Descarta taponamiento clínico."),
    act("otras-causas", "¿Tenés enfermedades autoinmunes, tuberculosis, cáncer, problemas renales?", "util", "“No.”", "Descarta causas específicas."),
    act("deporte", "¿Hacés deporte?", "neutro", "“Básquet.”", "Importa luego para el reposo deportivo."),
  ],
  exam: [
    act("frote", "Auscultación cardíaca", "clave", "Frote pericárdico en el borde esternal izquierdo.", "Signo patognomónico."),
    act("taponamiento", "Yugulares, presión y pulso paradójico", "clave", "Normales.", "Sin taponamiento."),
    act("pulmon", "Auscultación pulmonar", "util", "Normal.", "Descarta neumonía."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Supradesnivel del ST difuso, cóncavo, con descenso del PR.", "Patrón de pericarditis (distinto del infarto)."),
    study("Imágenes", "eco", "Ecocardiograma", "clave", "Derrame pericárdico leve, función normal.", "Evalúa derrame y descarta taponamiento."),
    study("Laboratorio", "lab", "PCR, hemograma, troponina", "clave", "PCR elevada, troponina normal.", "Troponina normal descarta miocarditis asociada."),
    study("Otros", "cine", "Cinecoronariografía de urgencia", "riesgoso", "No se realizó.", "Expone a riesgos innecesarios: el cuadro es de pericarditis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pericarditis", "Pericarditis aguda viral (idiopática) sin criterios de mal pronóstico", true, "Dolor pleurítico que mejora inclinado hacia adelante, frote, supradesnivel difuso con descenso del PR, derrame leve, PCR alta y troponina normal tras un cuadro viral."),
      dx("iam", "IAM con elevación del ST", false, "El supradesnivel es difuso y cóncavo, con descenso del PR, y la troponina es normal."),
      dx("miocarditis", "Miopericarditis", false, "La troponina es normal."),
      dx("tep", "TEP", false, "Saturación normal y ECG de pericarditis."),
      dx("repolarizacion", "Repolarización precoz", false, "No da dolor, frote ni derrame."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aine", "Ibuprofeno o aspirina en dosis altas por 1–2 semanas con descenso gradual, con protección gástrica", "clave", "Tratamiento de primera línea."),
      mg("colchicina", "Colchicina por 3 meses", "clave", "Reduce las recurrencias a la mitad."),
      mg("ejercicio", "Restringir la actividad física intensa hasta la resolución (al menos 3 meses en deportistas si hubo compromiso miocárdico)", "clave", "Evita complicaciones."),
      mg("ambulatorio", "Tratamiento ambulatorio con control", "util", "Sin criterios de mal pronóstico."),
      mg("corticoide", "Corticoides de primera línea", "riesgoso", "Aumentan las recurrencias; solo si hay contraindicación o causa específica."),
      mg("anticoagular", "Anticoagulación", "riesgoso", "Riesgo de hemopericardio."),
    ],
  },
  debrief: {
    diagnosis: "Pericarditis aguda viral (idiopática) con derrame leve, sin taponamiento ni compromiso miocárdico, en varón de 28 años.",
    pathologies: [
      { name: "Pericarditis aguda", role: "principal", why: "Inflamación del pericardio." },
      { name: "Derrame pericárdico leve", role: "asociada", why: "Sin repercusión." },
      { name: "IAM, miocarditis, TEP", role: "diferencial", why: "Otras causas de dolor torácico." },
    ],
    reasoning: [
      "Causa: infección viral reciente (la mayoría idiopática en países con baja TBC).",
      "Mecanismo: inflamación de las hojas del pericardio que roza con cada latido.",
      "Consecuencia: dolor pleurítico y posicional, frote, cambios del ECG, derrame; complicaciones: recurrencia, taponamiento, constricción.",
    ],
    epidemiology:
      "La pericarditis aguda causa alrededor del 5 % de las consultas por dolor torácico no isquémico en la guardia; es más frecuente en varones jóvenes. Recurre en 15–30 % de los casos sin colchicina.",
    management: [
      "Diagnóstico con 2 de 4 criterios (dolor típico, frote, ECG, derrame).",
      "Buscar criterios de mal pronóstico (fiebre alta, derrame grande, taponamiento, troponina, inmunosupresión, falta de respuesta).",
      "AINE más colchicina; restricción de ejercicio.",
      "Estudiar causas específicas si no responde o hay criterios de mal pronóstico.",
    ],
    sources: ["Sociedad Argentina de Cardiología — Consenso de enfermedades del pericardio.", "Guías ESC de enfermedades del pericardio."],
    pearls: ["Mejora inclinado hacia adelante.", "Supradesnivel difuso + descenso del PR.", "AINE + colchicina."],
    pitfalls: ["Confundirla con un infarto.", "Corticoides de entrada."],
    tribunal: [
      qa("¿Cuáles son los criterios diagnósticos de pericarditis?", "Al menos 2 de 4: dolor torácico pericárdico (pleurítico, mejora sentado hacia adelante), frote pericárdico, cambios del ECG (supradesnivel difuso, descenso del PR) y derrame pericárdico nuevo o en aumento."),
      qa("¿Qué es la tríada de Beck?", "Hipotensión, ingurgitación yugular y ruidos cardíacos apagados: signos de taponamiento cardíaco."),
      qa("¿Qué es la pericarditis constrictiva?", "El engrosamiento y la rigidez del pericardio que impiden el llenado cardíaco, con signos de insuficiencia cardíaca derecha (ascitis, edemas, ingurgitación yugular, signo de Kussmaul); causas: TBC, cirugía cardíaca, radiación, viral."),
    ],
  },
};
