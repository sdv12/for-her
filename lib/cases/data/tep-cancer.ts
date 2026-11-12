import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tepCancer: ClinicalCase = {
  id: "tep-asociado-cancer",
  level: 3,
  area: "Cardiovascular",
  setting: "Guardia",
  patient: { age: 67, ageUnit: "años", sex: "M", context: "Cáncer de páncreas en quimioterapia. Catéter implantable." },
  frequency: "frecuente",
  intro: "“Hace dos días me falta el aire y me duele el pecho al respirar. Me late rápido el corazón.”",
  vitals: { TA: "112/70 mmHg", FC: "112 lpm", FR: "26 rpm", "T°": "37,3 °C", "SatO₂": "89 %" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe.”", "Súbito."),
    act("cancer", "¿Qué tratamiento recibís?", "clave", "“Quimioterapia.”", "Riesgo trombótico muy alto."),
    act("sangrado", "¿Sangrados o plaquetas bajas?", "clave", "“Plaquetas normales.”", "Anticoagulación."),
    act("piernas", "¿Piernas hinchadas?", "util", "“La izquierda.”", "TVP."),
    act("infeccion", "¿Fiebre o tos con catarro?", "util", "“No.”", "Neumonía."),
    act("nieto", "¿Quién te acompaña?", "neutro", "“Mi nieto.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Tórax", "clave", "Sin rales.", "Hipoxemia con examen normal."),
    act("piernas-ex", "Piernas", "clave", "Edema izquierdo.", "TVP."),
    act("yugulares", "Yugulares", "util", "Normales.", "Sin falla derecha."),
  ],
  studies: [
    study("Imágenes", "angiotc", "AngioTC de tórax", "clave", "TEP segmentario bilateral; VD normal.", "Confirma."),
    study("Laboratorio", "lab", "Plaquetas, función renal, troponina, BNP", "clave", "Normales.", "Riesgo y anticoagulación."),
    study("Imágenes", "doppler", "Doppler de miembros", "util", "TVP poplítea.", "Fuente."),
    study("Laboratorio", "dimero", "Dímero D para decidir", "innecesario", "No se realizó.", "Alta probabilidad clínica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tep", "Tromboembolismo pulmonar asociado a cáncer, de riesgo intermedio-bajo", true, "Disnea súbita, cáncer, TVP y angioTC."),
      dx("neumonia", "Neumonía", false, "Sin consolidación."),
      dx("derrame", "Derrame pleural maligno", false, "AngioTC con trombos."),
      dx("toxicidad", "Neumonitis por quimioterapia", false, "Hay trombos."),
      dx("ic", "Insuficiencia cardíaca", false, "Sin congestión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("anticoag", "Heparina de bajo peso molecular o anticoagulante oral directo según sangrado", "clave", "Tratamiento en cáncer."),
      mg("duracion", "Anticoagular mientras el cáncer esté activo", "clave", "Riesgo persistente."),
      mg("oxigeno", "Oxígeno", "clave", "Hipoxemia."),
      mg("interacciones", "Revisar interacciones y plaquetas con la quimioterapia", "util", "Seguridad."),
      mg("trombolisis", "Trombólisis", "riesgoso", "Sin shock."),
      mg("aspirina", "Aspirina sola", "riesgoso", "Insuficiente."),
    ],
  },
  debrief: {
    diagnosis: "TEP segmentario bilateral con TVP poplítea, asociado a cáncer de páncreas en quimioterapia, en varón de 67 años.",
    pathologies: [
      { name: "Tromboembolismo pulmonar", role: "principal", why: "Trombos en arterias pulmonares." },
      { name: "Cáncer activo", role: "asociada", why: "Hipercoagulabilidad." },
      { name: "Neumonía, derrame, neumonitis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: hipercoagulabilidad tumoral, quimioterapia y catéter.",
      "Mecanismo: factor tisular y trombosis venosa.",
      "Consecuencia: embolia pulmonar.",
    ],
    epidemiology:
      "El cáncer aumenta varias veces el riesgo de trombosis, sobre todo el de páncreas, estómago, pulmón y cerebro. Es una de las principales causas de muerte en pacientes oncológicos. La escala de Khorana ayuda a seleccionar profilaxis.",
    management: [
      "Sospecha alta.",
      "AngioTC.",
      "Anticoagulación.",
      "Mientras el cáncer esté activo.",
    ],
    sources: ["Sociedad Argentina de Hematología — Trombosis y cáncer.", "ASCO — Venous Thromboembolism in Cancer Guideline."],
    pearls: ["Cáncer más disnea: TEP.", "Heparina o anticoagulante directo.", "Duración prolongada."],
    pitfalls: ["Pedir dímero D.", "Aspirina."],
    tribunal: [
      qa("¿Qué es la escala de Khorana?", "Estima el riesgo de trombosis en pacientes con cáncer en quimioterapia."),
      qa("¿Qué es el síndrome de Trousseau?", "Tromboflebitis migratoria asociada a cáncer, típicamente de páncreas."),
      qa("¿Cuándo se prefiere heparina sobre anticoagulante directo?", "En cánceres digestivos o urogenitales con riesgo de sangrado."),
    ],
  },
};
