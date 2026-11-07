import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pieDiabeticoIsquemico: ClinicalCase = {
  id: "pie-diabetico-neuroisquemico",
  level: 3,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 67, ageUnit: "años", sex: "F", context: "Diabetes tipo 2 de 20 años, tabaquista, insuficiencia renal leve. Vive sola." },
  frequency: "frecuente",
  intro: "“Tengo una herida en el dedo del pie derecho hace dos meses que no cierra. Me duele a la noche y lo tengo que bajar de la cama para aliviarlo.”",
  vitals: { TA: "148/78 mmHg", FC: "82 lpm", "T°": "36,6 °C", Glucemia: "228 mg/dl", "SatO₂": "96 %" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Mejora con la pierna colgando?", "clave", "“Sí, de noche, y calma colgando.”", "Dolor isquémico de reposo: isquemia crítica."),
    act("herida", "¿Cómo empezó la herida? ¿Sentiste el golpe?", "clave", "“Por un zapato; casi no la sentí.”", "Neuropatía más isquemia."),
    act("infeccion", "¿Fiebre, secreción o mal olor?", "clave", "“No.”", "Evalúa infección."),
    act("control", "¿Cómo controlás la diabetes? ¿Fumás?", "util", "“Glucemias de 200; un atado por día.”", "Factores agravantes."),
    act("claudicacion", "¿Te duele al caminar?", "util", "“Antes, sí; ahora camino poco.”", "Claudicación previa."),
    act("tele", "¿Qué mirás en la tele?", "neutro", "“Novelas.”", "No orienta."),
  ],
  exam: [
    act("herida-ex", "Examinar el pie", "clave", "Úlcera seca de 1,5 cm en la punta del hallux, base pálida, sin secreción, bordes secos.", "Úlcera isquémica."),
    act("pulsos", "Pulsos e índice", "clave", "Pedio y tibial posterior ausentes; relleno lento; pie frío; palidez a la elevación.", "Isquemia."),
    act("monofilamento", "Sensibilidad con monofilamento", "clave", "No percibe en varios puntos.", "Neuropatía protectora perdida."),
  ],
  studies: [
    study("Otros", "itb", "Índice tobillo-brazo y presión del dedo", "clave", "ITB 1,4 (no compresible); presión del dedo 25 mmHg.", "Con calcificación, el ITB engaña: la presión del dedo revela isquemia."),
    study("Imágenes", "doppler", "Eco Doppler o angioTC", "clave", "Oclusión de tibiales en la pierna.", "Patrón típico en diabetes."),
    study("Imágenes", "rx", "Radiografía del pie", "clave", "Sin osteomielitis.", "Evalúa el hueso."),
    study("Laboratorio", "lab", "HbA1c, función renal, hemograma, PCR", "util", "HbA1c 9,6, creatinina 1,4, PCR normal.", "Control y riesgo."),
    study("Microbiología", "hisopado", "Hisopado superficial de una úlcera sin signos de infección", "innecesario", "No se realizó.", "Refleja colonización y lleva a antibióticos innecesarios."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neuroisquemico", "Pie diabético neuroisquémico con isquemia crítica, sin infección", true, "Úlcera seca distal, dolor de reposo, pulsos ausentes, presión del dedo baja y neuropatía."),
      dx("neuropatico", "Úlcera neuropática pura", false, "Se da con pulsos presentes, pie caliente, en zonas de apoyo."),
      dx("venosa", "Úlcera venosa", false, "Suele estar en el maleolo interno con edema y dermatitis ocre."),
      dx("osteomielitis", "Osteomielitis", false, "Radiografía sin lesiones, sin hueso expuesto."),
      dx("gota", "Gota", false, "No explica la úlcera y la isquemia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("derivar", "Derivar con urgencia a cirugía vascular para revascularizar", "clave", "Sin flujo la úlcera no cicatriza y aumenta el riesgo de amputación."),
      mg("heridas", "Equipo de pie diabético: curaciones y descarga de presión", "clave", "Mejora la cicatrización."),
      mg("riesgo", "Antiagregación, estatina, dejar de fumar y controlar glucemia", "clave", "Reduce el riesgo vascular."),
      mg("insulina", "Ajustar el tratamiento de la diabetes, considerando la función renal", "util", "La HbA1c de 9,6 retrasa la cicatrización."),
      mg("desbridar", "Desbridamiento agresivo de la herida seca sin revascularizar", "riesgoso", "Una herida isquémica sin flujo puede empeorar."),
      mg("antibiotico", "Antibióticos sin signos de infección", "innecesario", "No mejoran la cicatrización sin infección."),
    ],
  },
  debrief: {
    diagnosis: "Pie diabético neuroisquémico con isquemia crítica del miembro, sin infección, en mujer de 67 años con diabetes y tabaquismo.",
    pathologies: [
      { name: "Pie diabético neuroisquémico", role: "principal", why: "Neuropatía más enfermedad arterial." },
      { name: "Isquemia crítica", role: "asociada", why: "Dolor de reposo y úlcera." },
      { name: "Úlcera neuropática pura, venosa, osteomielitis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hiperglucemia crónica y tabaco.",
      "Mecanismo: la neuropatía quita sensibilidad y la arteriopatía de vasos distales disminuye el flujo.",
      "Consecuencia: úlcera que no cierra, dolor de reposo, riesgo alto de gangrena y amputación.",
    ],
    epidemiology:
      "Se estima que hasta una de cada cuatro personas con diabetes tendrá una úlcera de pie a lo largo de su vida. El pie diabético es la principal causa de amputación no traumática en Argentina. Muchas amputaciones se evitan con educación y derivación temprana.",
    management: [
      "Examinar pies en cada consulta.",
      "Medir flujo y sensibilidad.",
      "Derivar y revascularizar en isquemia.",
      "Curaciones, descarga y control metabólico.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Consenso de pie diabético.", "IWGDF — Guías de pie diabético."],
    pearls: ["ITB alto en un diabético no significa flujo normal.", "Dolor que calma colgando: isquemia.", "No desbridar lo seco sin flujo."],
    pitfalls: ["Fiarse de un ITB alto.", "Dar antibióticos a toda úlcera."],
    tribunal: [
      qa("¿Qué es la clasificación de Wagner?", "0: pie en riesgo. 1: úlcera superficial. 2: profunda. 3: con absceso u osteomielitis. 4: gangrena localizada. 5: gangrena extensa."),
      qa("¿Qué diferencia una úlcera neuropática de una isquémica?", "Neuropática: en zonas de apoyo, indolora, pie caliente con pulsos. Isquémica: distal, dolorosa, seca, pie frío sin pulsos."),
      qa("¿Qué es el pie de Charcot?", "Una neuroartropatía con destrucción ósea y deformidad, con pie caliente y rojo, que a veces se confunde con infección."),
    ],
  },
};
