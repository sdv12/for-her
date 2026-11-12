import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dm2Insulinizacion: ClinicalCase = {
  id: "diabetes-tipo-2-insulinizacion",
  level: 2,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 62, ageUnit: "años", sex: "F", context: "Diabetes tipo 2 hace 12 años con metformina y glimepirida. Tiene miedo a la insulina." },
  frequency: "muy-frecuente",
  intro: "“Me dijeron que la hemoglobina glicosilada está en 10. Tengo sed, orino mucho y bajé de peso sin querer.”",
  vitals: { TA: "132/80 mmHg", FC: "80 lpm", "T°": "36,4 °C", Peso: "70 kg", Glucemia: "286 mg/dl" },
  anamnesis: [
    act("sintomas", "¿Sed, orina, pérdida de peso?", "clave", "“Sí, bajé 4 kilos.”", "Catabolismo: déficit de insulina."),
    act("adherencia", "¿Tomás la medicación? ¿Dieta?", "clave", "“Sí, todo.”", "Falla real."),
    act("miedo", "¿Qué te preocupa de la insulina?", "clave", "“Que me deje ciega.”", "Mito frecuente."),
    act("complicaciones", "¿Vista, riñón, pies?", "util", "“Hormigueo en los pies.”", "Complicaciones."),
    act("cardio", "¿Infarto, ACV, insuficiencia cardíaca?", "util", "“No.”", "Fármacos con beneficio."),
    act("nietos", "¿Tenés nietos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("pies", "Pies", "clave", "Monofilamento alterado.", "Neuropatía."),
    act("peso", "Peso y cintura", "clave", "IMC 27.", "Base."),
    act("fondo", "Fondo de ojo", "util", "Retinopatía leve.", "Microvascular."),
  ],
  studies: [
    study("Laboratorio", "lab", "HbA1c, función renal, albuminuria, lípidos", "clave", "HbA1c 10,2 %; filtrado 72; albuminuria 40.", "Control y daño."),
    study("Laboratorio", "cetonas", "Cetonas", "util", "Negativas.", "Sin descompensación aguda."),
    study("Electrofisiología", "ecg", "ECG", "util", "Normal.", "Base."),
    study("Laboratorio", "peptido-c", "Péptido C de rutina", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dm2", "Diabetes tipo 2 con mal control, catabolismo y necesidad de insulina", true, "HbA1c de 10,2 %, síntomas y pérdida de peso con dos fármacos."),
      dx("dm1", "Diabetes tipo 1", false, "Larga evolución sin cetosis."),
      dx("lada", "LADA", false, "Diabetes de larga evolución típica tipo 2."),
      dx("cancer-pancreas", "Cáncer de páncreas", false, "Sin datos; vigilar si hay pérdida de peso inexplicada."),
      dx("hiperosmolar", "Estado hiperosmolar", false, "Glucemia y conciencia lo excluyen."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("basal", "Insulina basal nocturna con titulación", "clave", "Síntomas y HbA1c mayor de 10 %."),
      mg("educacion", "Educación sobre técnica, hipoglucemia y mitos", "clave", "Adherencia."),
      mg("glimepirida", "Revisar la sulfonilurea por hipoglucemias", "clave", "Riesgo."),
      mg("protectores", "Sumar iSGLT2 o GLP-1 según riesgo", "util", "Protección cardiorrenal."),
      mg("esperar", "Esperar 6 meses más con dieta", "riesgoso", "Deterioro."),
      mg("dosis-alta", "Comenzar con dosis altas de insulina rápida sin educación", "riesgoso", "Hipoglucemia."),
    ],
  },
  debrief: {
    diagnosis: "Diabetes tipo 2 con mal control, síntomas catabólicos y complicaciones microvasculares, en mujer de 62 años, con indicación de insulina.",
    pathologies: [
      { name: "Diabetes tipo 2", role: "principal", why: "Falla progresiva de la célula beta." },
      { name: "Neuropatía y retinopatía", role: "asociada", why: "Complicaciones." },
      { name: "DM1, LADA, cáncer de páncreas", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: resistencia a la insulina con pérdida progresiva de células beta.",
      "Mecanismo: déficit relativo creciente de insulina.",
      "Consecuencia: hiperglucemia, catabolismo y complicaciones.",
    ],
    epidemiology:
      "En Argentina, cerca de 1 de cada 8 adultos tiene diabetes. Muchas personas permanecen años con mal control por miedo a la insulina o inercia terapéutica. Iniciar a tiempo previene complicaciones.",
    management: [
      "HbA1c y síntomas.",
      "Insulina basal.",
      "Educación.",
      "Prevención de complicaciones.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Guía de tratamiento de la diabetes tipo 2.", "ADA — Standards of Care in Diabetes."],
    pearls: ["HbA1c mayor de 10 % con síntomas: insulina.", "La insulina no deja ciego.", "Titular con glucemia en ayunas."],
    pitfalls: ["Inercia terapéutica.", "No educar."],
    tribunal: [
      qa("¿Cuándo se indica insulina en DM2?", "HbA1c mayor de 10 %, glucemia mayor de 300, síntomas catabólicos o falla con otros fármacos."),
      qa("¿Cómo se titula la basal?", "Se aumenta cada pocos días según la glucemia en ayunas hasta la meta."),
      qa("¿Qué son los iSGLT2?", "Inhibidores del cotransportador sodio-glucosa 2 que bajan la glucosa y protegen corazón y riñón."),
    ],
  },
};
