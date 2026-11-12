import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitisNecrotizante: ClinicalCase = {
  id: "pancreatitis-necrotizante-infectada",
  level: 4,
  area: "Gastroenterología",
  setting: "Internación",
  patient: { age: 55, ageUnit: "años", sex: "M", context: "Internado hace 3 semanas por pancreatitis biliar grave. Obeso." },
  frequency: "poco-frecuente",
  intro: "Enfermería avisa: “Volvió a tener fiebre alta, está taquicárdico y le duele más la panza.”",
  vitals: { TA: "96/58 mmHg", FC: "124 lpm", FR: "26 rpm", "T°": "39,1 °C", "SatO₂": "93 %" },
  anamnesis: [
    act("tiempo", "¿Cuándo empezó la pancreatitis?", "clave", "Hace 3 semanas.", "Fase tardía."),
    act("evolucion", "¿Venía mejorando?", "clave", "Mejoraba y empeoró.", "Infección de la necrosis."),
    act("otros-focos", "¿Catéter, orina, pulmón?", "clave", "Catéter central sin signos; orina normal.", "Otros focos."),
    act("alimentacion", "¿Come?", "util", "Por sonda nasoyeyunal.", "Nutrición."),
    act("atb", "¿Recibió antibióticos?", "util", "No.", "Base."),
    act("familia", "¿Quién lo visita?", "neutro", "La esposa.", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor y distensión en epigastrio.", "Foco."),
    act("perfusion", "Perfusión", "clave", "Fría.", "Sepsis."),
    act("pulmon", "Pulmón", "util", "Derrame izquierdo.", "Asociado."),
  ],
  studies: [
    study("Imágenes", "tc", "TC con contraste", "clave", "Necrosis encapsulada con gas.", "Infección."),
    study("Laboratorio", "lab", "Hemograma, PCR, procalcitonina, lactato", "clave", "Leucocitos 22.000; procalcitonina alta.", "Infección."),
    study("Microbiología", "cultivos", "Hemocultivos y cultivo por punción si hay duda", "util", "E. coli.", "Guía."),
    study("Otros", "necrosectomia-temprana", "Necrosectomía abierta inmediata", "riesgoso", "No se realizó.", "Mayor mortalidad que el abordaje escalonado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("necrosis", "Pancreatitis aguda grave con necrosis encapsulada infectada", true, "Deterioro a las 3 semanas, fiebre, gas en la necrosis."),
      dx("seudoquiste", "Seudoquiste", false, "Contenido necrótico con gas."),
      dx("cateter", "Bacteriemia por catéter", false, "Gas en necrosis."),
      dx("neumonia", "Neumonía", false, "Foco abdominal."),
      dx("colangitis", "Colangitis", false, "Hay gas en la necrosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("carbapenem", "Carbapenem", "clave", "Buena penetración."),
      mg("escalonado", "Drenaje percutáneo o endoscópico y necrosectomía mínimamente invasiva escalonada", "clave", "Reduce mortalidad."),
      mg("soporte", "UTI y nutrición enteral", "clave", "Soporte."),
      mg("colecistectomia", "Colecistectomía diferida", "util", "Prevención."),
      mg("profilaxis-temprana", "Antibióticos profilácticos desde el día 1 en toda pancreatitis", "riesgoso", "No se recomienda."),
      mg("ayuno", "Ayuno prolongado con nutrición parenteral", "riesgoso", "Más infecciones."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis aguda biliar grave con necrosis encapsulada infectada a las 3 semanas, en varón de 55 años.",
    pathologies: [
      { name: "Necrosis pancreática infectada", role: "principal", why: "Complicación tardía grave." },
      { name: "Sepsis y derrame", role: "asociada", why: "Gravedad." },
      { name: "Seudoquiste, bacteriemia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: necrosis pancreática colonizada.",
      "Mecanismo: translocación bacteriana intestinal.",
      "Consecuencia: sepsis y falla de órganos.",
    ],
    epidemiology:
      "Una minoría de las pancreatitis es necrotizante, y una parte se infecta, en general después de la primera semana. La nutrición enteral reduce infecciones. El abordaje escalonado mínimamente invasivo mejoró los resultados.",
    management: [
      "Sospechar infección tardía.",
      "TC.",
      "Antibiótico.",
      "Drenaje escalonado.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Pancreatitis aguda.", "IAP/APA — Evidence-Based Guidelines for Acute Pancreatitis."],
    pearls: ["Gas en necrosis.", "Carbapenem.", "Escalonado."],
    pitfalls: ["Cirugía abierta temprana.", "Profilaxis antibiótica de rutina."],
    tribunal: [
      qa("¿Qué es la clasificación de Atlanta?", "Clasifica la pancreatitis en leve, moderada o grave según falla de órganos y complicaciones locales."),
      qa("¿Qué colecciones locales hay?", "Colección líquida aguda, seudoquiste, colección necrótica aguda y necrosis encapsulada."),
      qa("¿Cuándo se colecistectomiza en pancreatitis biliar?", "En la misma internación en las leves; diferida en las graves."),
    ],
  },
};
