import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitisCronica: ClinicalCase = {
  id: "pancreatitis-cronica-alcoholica",
  level: 2,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 49, ageUnit: "años", sex: "M", context: "Bebe un litro de vino por día hace 20 años. Fumador. Tres pancreatitis agudas." },
  frequency: "frecuente",
  intro: "“Me duele la boca del estómago y se va a la espalda, sobre todo después de comer. Hago caca grasosa que flota y bajé 10 kilos.”",
  vitals: { TA: "124/76 mmHg", FC: "84 lpm", "T°": "36,5 °C", "SatO₂": "98 %", Peso: "58 kg", Glucemia: "232 mg/dl" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor? ¿Mejora sentado hacia adelante?", "clave", "“Sí, y empeora con la comida.”", "Pancreático."),
    act("heces", "¿Cómo son las heces?", "clave", "“Grasosas, con mal olor.”", "Insuficiencia exocrina."),
    act("alcohol", "¿Cuánto tomás?", "clave", "“Un litro por día.”", "Causa principal."),
    act("diabetes", "¿Sed, orina mucho?", "util", "“Sí.”", "Insuficiencia endocrina."),
    act("ictericia", "¿Amarillo?", "util", "“No.”", "Compresión biliar."),
    act("ocio", "¿Qué hacés los domingos?", "neutro", "“Asado.”", "No orienta."),
  ],
  exam: [
    act("nutricion", "Estado nutricional", "clave", "Delgado, con pérdida muscular.", "Malabsorción."),
    act("abdomen", "Abdomen", "clave", "Dolor epigástrico sin masa.", "Pancreático."),
    act("higado", "Estigmas de hepatopatía", "util", "Sin estigmas.", "Comorbilidad."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de abdomen con contraste", "clave", "Calcificaciones pancreáticas y conducto dilatado.", "Confirma."),
    study("Laboratorio", "elastasa", "Elastasa fecal", "clave", "Muy baja.", "Insuficiencia exocrina."),
    study("Laboratorio", "lab", "HbA1c, vitaminas liposolubles, albúmina", "clave", "HbA1c 8,6 %; vitamina D baja.", "Endocrina y nutricional."),
    study("Laboratorio", "amilasa", "Amilasa para diagnosticar", "innecesario", "No se realizó.", "Suele ser normal en crónica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cronica", "Pancreatitis crónica alcohólica con insuficiencia exocrina y endocrina", true, "Dolor, esteatorrea, diabetes y calcificaciones."),
      dx("cancer", "Cáncer de páncreas", false, "Sin masa; calcificaciones crónicas."),
      dx("celiaquia", "Enfermedad celíaca", false, "Calcificaciones y elastasa baja."),
      dx("ulcera", "Úlcera péptica", false, "No explica esteatorrea."),
      dx("dm2", "Diabetes tipo 2 aislada", false, "Es secundaria."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("alcohol", "Dejar el alcohol y el tabaco con apoyo", "clave", "Frena la progresión."),
      mg("enzimas", "Enzimas pancreáticas con las comidas", "clave", "Trata la esteatorrea."),
      mg("dolor", "Analgesia escalonada", "clave", "Dolor."),
      mg("diabetes", "Insulina con cuidado de hipoglucemias", "util", "Diabetes tipo 3c."),
      mg("opioides", "Opioides potentes sin control a largo plazo", "riesgoso", "Riesgo de dependencia."),
      mg("dieta-sin-grasa", "Dieta sin nada de grasa", "riesgoso", "Empeora la desnutrición."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis crónica alcohólica calcificante con insuficiencia exocrina y diabetes tipo 3c, en varón de 49 años.",
    pathologies: [
      { name: "Pancreatitis crónica", role: "principal", why: "Fibrosis irreversible." },
      { name: "Esteatorrea y diabetes", role: "asociada", why: "Pérdida de función." },
      { name: "Cáncer, celiaquía", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: alcohol y tabaco.",
      "Mecanismo: inflamación repetida, fibrosis y calcificación.",
      "Consecuencia: dolor, malabsorción, diabetes y riesgo de cáncer.",
    ],
    epidemiology:
      "El alcohol es la causa principal en adultos. El tabaco acelera la progresión. Aumenta el riesgo de cáncer de páncreas. La diabetes asociada suele ser lábil, y debe pensarse en la llamada diabetes pancreática.",
    management: [
      "Imagen.",
      "Elastasa.",
      "Suspender tóxicos.",
      "Enzimas e insulina.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Pancreatitis crónica.", "European Pancreatic Club — HaPanEU Guidelines."],
    pearls: ["Calcificaciones.", "Esteatorrea.", "Dejar el alcohol."],
    pitfalls: ["Pedir amilasa.", "Olvidar la diabetes."],
    tribunal: [
      qa("¿Qué tríada clásica tiene?", "Calcificaciones, esteatorrea y diabetes, presente en pocos casos."),
      qa("¿Qué vitaminas se pierden?", "Las liposolubles: A, D, E y K."),
      qa("¿Qué complicaciones tiene?", "Seudoquistes, obstrucción biliar o duodenal, trombosis esplénica y cáncer."),
    ],
  },
};
