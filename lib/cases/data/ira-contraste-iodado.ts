import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const iraContrasteIodado: ClinicalCase = {
  id: "ira-contraste-iodado",
  level: 2,
  area: "Nefrourología",
  setting: "Internación",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Diabético con ERC estadio 3b (creatinina 1,8). Coronariografía con angioplastia hace 48 horas. Toma metformina." },
  frequency: "frecuente",
  intro: "La enfermera avisa: “Orina menos y la creatinina subió en el control de hoy.”",
  vitals: { TA: "134/80 mmHg", FC: "78 lpm", FR: "16 rpm", "T°": "36,5 °C", "SatO₂": "96 %" },
  anamnesis: [
    act("contraste", "¿Cuánto contraste recibió?", "clave", "Unos 250 ml en la angioplastia.", "Volumen alto."),
    act("prevencion", "¿Recibió hidratación antes?", "clave", "No, el procedimiento fue de urgencia.", "Sin prevención."),
    act("metformina", "¿Se suspendió la metformina?", "clave", "No.", "Riesgo de acidosis láctica."),
    act("diuresis", "¿Cuánto orinó?", "util", "600 ml en 24 horas.", "Oliguria leve."),
    act("ateroembolia", "¿Dedos violáceos o lesiones en los pies?", "util", "No.", "Ateroembolia."),
    act("familia", "¿Quién lo acompaña?", "neutro", "Su yerno.", "No orienta."),
  ],
  exam: [
    act("volemia", "Volemia", "clave", "Euvolémico.", "No es prerrenal por hipovolemia."),
    act("pies", "Pies y piel", "clave", "Sin livedo ni dedos azules.", "Excluye ateroembolia."),
    act("puncion", "Sitio de punción", "util", "Sin hematoma.", "Excluye sangrado."),
  ],
  studies: [
    study("Laboratorio", "renal", "Creatinina, potasio, gases, lactato", "clave", "Creatinina 2,9; K 5,1; lactato normal.", "IRA."),
    study("Laboratorio", "orina", "Sedimento urinario", "clave", "Cilindros granulosos pardos.", "Daño tubular."),
    study("Imágenes", "eco", "Ecografía renal", "util", "Riñones de tamaño normal, sin obstrucción.", "Excluye obstrucción."),
    study("Imágenes", "tc-contraste", "TC con contraste para ver los riñones", "riesgoso", "No se realizó.", "Más nefrotoxicidad."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ira-contraste", "Injuria renal aguda asociada a contraste iodado sobre ERC diabética", true, "Aumento de creatinina a las 48 horas de contraste en volumen alto, sin otra causa y con cilindros pardos."),
      dx("ateroembolia", "Ateroembolia renal", false, "Sin livedo, dedos azules ni eosinofilia."),
      dx("prerrenal", "IRA prerrenal", false, "Euvolémico y sedimento activo."),
      dx("obstructiva", "IRA obstructiva", false, "Ecografía normal."),
      dx("glomerulonefritis", "Glomerulonefritis", false, "Sin hematuria ni proteinuria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metformina", "Suspender metformina", "clave", "Riesgo de acidosis láctica."),
      mg("nefrotoxicos", "Evitar nefrotóxicos y ajustar dosis", "clave", "Proteger el riñón."),
      mg("controles", "Control de creatinina, potasio y diuresis", "clave", "Evolución."),
      mg("volemia", "Mantener euvolemia sin sobrehidratar", "util", "Soporte."),
      mg("n-acetilcisteina", "N-acetilcisteína para tratarla", "innecesario", "Sin beneficio demostrado."),
      mg("aines", "AINE para el dolor del sitio de punción", "riesgoso", "Más daño renal."),
    ],
  },
  debrief: {
    diagnosis: "Injuria renal aguda asociada a contraste iodado sobre enfermedad renal crónica diabética, en varón de 67 años.",
    pathologies: [
      { name: "IRA asociada a contraste", role: "principal", why: "Daño tubular por contraste." },
      { name: "ERC diabética y metformina", role: "asociada", why: "Riesgo y complicación potencial." },
      { name: "Ateroembolia, prerrenal", role: "diferencial", why: "Otras causas tras cateterismo." },
    ],
    reasoning: [
      "Causa: contraste iodado en volumen alto sobre riñón con poca reserva.",
      "Mecanismo: vasoconstricción medular y toxicidad tubular directa.",
      "Consecuencia: aumento de creatinina a las 24 a 72 horas, en general reversible.",
    ],
    epidemiology:
      "El riesgo es mayor en ERC avanzada, diabetes, insuficiencia cardíaca y con contraste intraarterial en volumen alto. Con contrastes modernos e intravenosos el riesgo es menor de lo que se creía. La hidratación previa es la principal medida preventiva.",
    management: [
      "Identificar riesgo.",
      "Hidratar antes si se puede.",
      "Suspender metformina.",
      "Controlar.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Nefropatía por contraste.", "ACR/NKF — Consensus Statement on Use of Intravenous Iodinated Contrast Media in Patients with Kidney Disease."],
    pearls: ["Sube a las 48 a 72 horas.", "Suspender metformina.", "Diferenciá de ateroembolia."],
    pitfalls: ["Más contraste.", "AINE."],
    tribunal: [
      qa("¿Cómo se diferencia de la ateroembolia?", "La ateroembolia tarda días a semanas, da livedo, dedos azules, eosinofilia y complemento bajo."),
      qa("¿Qué medida previene la nefropatía por contraste?", "Hidratación con cristaloides isotónicos y usar el menor volumen posible."),
      qa("¿Por qué preocupa la metformina?", "Si cae el filtrado se acumula y puede causar acidosis láctica."),
    ],
  },
};
