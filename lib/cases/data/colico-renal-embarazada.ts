import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colicoRenalEmbarazada: ClinicalCase = {
  id: "colico-renal-embarazada",
  level: 2,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 29, ageUnit: "años", sex: "F", context: "Embarazo de 24 semanas. Toma poco líquido. Tuvo una ITU en el embarazo." },
  frequency: "frecuente",
  intro: "“Hace 4 horas me duele el costado derecho, me va a la ingle. No encuentro posición y tengo ganas de vomitar.”",
  vitals: { TA: "116/72 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "36,9 °C", "SatO₂": "99 %" },
  anamnesis: [
    act("dolor", "¿Viene en oleadas? ¿Se va a la ingle?", "clave", "“Sí.”", "Cólico."),
    act("alarma", "¿Fiebre, sangrado, contracciones, escalofríos?", "clave", "“No, el bebé se mueve.”", "Excluye infección y obstetricia."),
    act("orina", "¿Sangre o ardor al orinar?", "clave", "“Oscura.”", "Hematuria."),
    act("previo", "¿Cálculos previos?", "util", "“Mi papá.”", "Riesgo."),
    act("alimentos", "¿Cuánto líquido tomás?", "util", "“Poco.”", "Factor."),
    act("nombre", "¿Ya saben el nombre del bebé?", "neutro", "“Joaquín.”", "No orienta."),
  ],
  exam: [
    act("lumbar", "Puño percusión y abdomen", "clave", "Dolor en flanco, abdomen sin irritación.", "Cólico."),
    act("obstetrico", "Control fetal y útero", "clave", "Latidos normales, útero blando.", "Normal."),
    act("hidratacion", "Hidratación", "util", "Leve deshidratación.", "Corrige."),
  ],
  studies: [
    study("Laboratorio", "orina", "Orina y urocultivo", "clave", "Hematuria, sin piuria.", "Excluye infección."),
    study("Imágenes", "eco", "Ecografía renal y de vías urinarias", "clave", "Dilatación derecha mayor a la del embarazo, jet ureteral ausente.", "De elección."),
    study("Laboratorio", "lab", "Hemograma y función renal", "clave", "Normal.", "Gravedad."),
    study("Imágenes", "tc", "TC de rutina como primera opción", "riesgoso", "No se realizó.", "Se evita radiación; ecografía primero, RM si hace falta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colico", "Cólico renal no complicado por litiasis ureteral en embarazada", true, "Dolor típico, hematuria, ecografía, sin fiebre."),
      dx("pielo", "Pielonefritis", false, "Sin fiebre ni piuria."),
      dx("apendicitis", "Apendicitis", false, "Abdomen sin irritación; dolor irradiado."),
      dx("dppni", "Desprendimiento de placenta", false, "Útero blando y feto normal."),
      dx("parto", "Trabajo de parto prematuro", false, "Sin contracciones."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("analgesia", "Paracetamol y opioide si hace falta", "clave", "Segura."),
      mg("hidratar", "Hidratación adecuada", "clave", "Ayuda al paso."),
      mg("colar", "Colar orina, control obstétrico", "clave", "Seguimiento."),
      mg("urologia", "Urología si hay fiebre, dolor refractario u obstrucción: catéter doble J", "clave", "Complicaciones."),
      mg("aine", "AINE en altas dosis", "riesgoso", "Contraindicados en la segunda mitad."),
      mg("lito", "Litotricia extracorpórea", "riesgoso", "Contraindicada en el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Cólico renal no complicado por litiasis ureteral derecha, en embarazo de 24 semanas.",
    pathologies: [
      { name: "Litiasis urinaria", role: "principal", why: "Cálculo ureteral." },
      { name: "Embarazo con hidronefrosis fisiológica", role: "asociada", why: "Confunde." },
      { name: "Pielonefritis, apendicitis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hipercalciuria, estasis y poco líquido en el embarazo.",
      "Mecanismo: el cálculo obstruye y distiende el uréter.",
      "Consecuencia: dolor, hematuria, riesgo de infección y parto prematuro.",
    ],
    epidemiology:
      "Es una causa frecuente de dolor no obstétrico en el embarazo, sobre todo en el segundo y tercer trimestre. La mayoría de los cálculos se expulsan con tratamiento conservador. Las complicaciones aumentan el riesgo de parto prematuro.",
    management: [
      "Excluir urgencias.",
      "Ecografía primero.",
      "Analgesia segura.",
      "Derivar si se complica.",
    ],
    sources: ["FASGO — Consenso de infección urinaria y litiasis.", "European Association of Urology — Guía de litiasis."],
    pearls: ["Embarazada con dolor en flanco: ecografía.", "AINE no en la segunda mitad.", "Fiebre más obstrucción: urgencia."],
    pitfalls: ["Hidronefrosis fisiológica.", "Empezar con TC."],
    tribunal: [
      qa("¿Qué cambia el embarazo en la vía urinaria?", "Dilatación por progesterona y compresión uterina, más a la derecha."),
      qa("¿Qué hacer si hay fiebre y cálculo obstruido?", "Antibióticos y drenaje urgente con catéter o nefrostomía."),
      qa("¿Cuál es la composición más común?", "Oxalato de calcio; en embarazo, también fosfato de calcio."),
    ],
  },
};
