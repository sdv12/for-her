import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const desprendimientoTrauma: ClinicalCase = {
  id: "desprendimiento-placenta-trauma",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 33 semanas. Choque en moto hace 2 horas, sin casco. Sin controles recientes." },
  frequency: "frecuente",
  intro: "“Me caí de la moto y me golpeé la panza. Ahora me duele fuerte, la panza está dura, y empecé a sangrar un poco. Casi no siento al bebé.”",
  vitals: { TA: "98/60 mmHg", FC: "120 lpm", FR: "24 rpm", "T°": "36,5 °C", "SatO₂": "97 %", Glasgow: "15/15" },
  anamnesis: [
    act("trauma", "¿Cómo fue el golpe? ¿Te pegaste la panza?", "clave", "“De frente, contra el manubrio.”", "Trauma abdominal: causa de desprendimiento."),
    act("dolor", "¿El dolor es constante o va y viene?", "clave", "“Constante, no se afloja.”", "Hipertonía."),
    act("feto", "¿Cuándo sentiste al bebé por última vez?", "clave", "“Antes del choque.”", "Sufrimiento fetal."),
    act("riesgo", "¿Presión alta, cigarrillos o cocaína?", "util", "“Fumo.”", "Factores."),
    act("rh", "¿Grupo y factor?", "util", "“O negativo.”", "Requiere inmunoglobulina."),
    act("moto", "¿De quién era la moto?", "neutro", "“De mi hermano.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Útero", "clave", "Hipertónico, doloroso, sin relajación.", "Clásico."),
    act("fetal", "Latidos fetales", "clave", "Bradicardia de 90 lpm.", "Urgencia."),
    act("trauma-ex", "Evaluación ABCDE y tacto solo tras descartar placenta previa", "clave", "Sin otras lesiones graves. Sangrado escaso y oscuro.", "Primero la madre."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía obstétrica y FAST sin demorar", "clave", "Placenta normoinserta, hematoma retroplacentario, sin líquido libre.", "Normal no descarta."),
    study("Otros", "ctg", "Monitoreo fetal", "clave", "Bradicardia sostenida.", "Indica extracción."),
    study("Laboratorio", "lab", "Hemograma, coagulograma, fibrinógeno, grupo, Kleihauer", "clave", "Hb 9, fibrinógeno 150, plaquetas 110.000.", "CID incipiente."),
    study("Imágenes", "tc", "TC de abdomen antes de actuar", "riesgoso", "No se realizó.", "Hay inestabilidad y sufrimiento fetal."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dppni", "Desprendimiento prematuro de placenta normoinserta postraumático con sufrimiento fetal y CID incipiente", true, "Trauma, dolor, útero hipertónico, bradicardia, coagulopatía."),
      dx("previa", "Placenta previa", false, "Es indolora y la ecografía muestra placenta normal."),
      dx("rotura", "Rotura uterina", false, "No hay antecedentes, y las partes fetales no se palpan fuera."),
      dx("parto", "Trabajo de parto prematuro", false, "No alterna con relajación."),
      dx("esplenica", "Rotura de bazo", false, "FAST negativa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reanimar", "Reanimación: dos vías, cristaloides, sangre, posición lateral izquierda", "clave", "Primero la madre."),
      mg("cesarea", "Cesárea de urgencia", "clave", "Feto vivo con sufrimiento."),
      mg("cid", "Tratar coagulopatía: plasma, crioprecipitado, plaquetas", "clave", "Evita sangrado masivo."),
      mg("rh", "Inmunoglobulina anti-D", "clave", "Previene sensibilización."),
      mg("corticoides", "Esperar 48 horas para maduración pulmonar", "riesgoso", "El feto no puede esperar."),
      mg("alta", "Control ambulatorio", "riesgoso", "Riesgo de muerte."),
    ],
  },
  debrief: {
    diagnosis: "Desprendimiento prematuro de placenta postraumático con sufrimiento fetal y CID, en embarazo de 33 semanas.",
    pathologies: [
      { name: "DPPNI", role: "principal", why: "Separación antes del parto." },
      { name: "CID y riesgo de shock", role: "asociada", why: "Complicaciones." },
      { name: "Placenta previa, rotura uterina", role: "diferencial", why: "Otras hemorragias." },
    ],
    reasoning: [
      "Causa: trauma por fuerzas de desaceleración.",
      "Mecanismo: la placenta se separa, y el hematoma aumenta la presión uterina.",
      "Consecuencia: hipoxia fetal, shock, y CID por consumo.",
    ],
    epidemiology:
      "El trauma afecta hasta el 8 % de los embarazos; los accidentes de tránsito son la causa más frecuente. El desprendimiento puede ocurrir incluso con golpes menores. Por eso se recomienda monitoreo prolongado a toda embarazada viable con trauma.",
    management: [
      "ABCDE; madre primero.",
      "Monitoreo fetal y ecografía.",
      "Cesárea si hay sufrimiento.",
      "Tratar coagulopatía y Rh.",
    ],
    sources: ["FASGO — Consenso de hemorragias de la segunda mitad del embarazo.", "ATLS — Trauma en la embarazada."],
    pearls: ["Útero de madera: desprendimiento.", "Trauma con feto viable: monitoreo.", "Madre Rh negativa: anti-D."],
    pitfalls: ["Confiarse si la eco es normal.", "Hacer tacto antes de descartar previa."],
    tribunal: [
      qa("¿Cómo se diferencia de la placenta previa?", "El desprendimiento duele, con útero tenso; la previa no duele, sangra rojo y útero blando."),
      qa("¿Qué test mide el pasaje de sangre fetal?", "El de Kleihauer-Betke."),
      qa("¿Por qué lateral izquierda?", "Evita la compresión de la cava y mejora el retorno venoso."),
    ],
  },
};
