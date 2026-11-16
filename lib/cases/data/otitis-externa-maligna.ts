import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const otitisExternaMaligna: ClinicalCase = {
  id: "otitis-externa-maligna",
  level: 4,
  area: "Infectología",
  setting: "Internación",
  patient: { age: 74, ageUnit: "años", sex: "M", context: "Diabético con insulina, HbA1c 10 %. Se limpia los oídos con hisopos." },
  frequency: "raro",
  intro: "“Me duele el oído derecho hace un mes, cada vez más de noche, y me supura. Las gotas no hicieron nada.”",
  vitals: { TA: "142/84 mmHg", FC: "86 lpm", "T°": "37,4 °C", Glucemia: "286 mg/dl" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor?", "clave", "“Intenso, profundo, me despierta. Me duele al masticar.”", "Dolor desproporcionado y nocturno: otitis externa necrotizante."),
    act("tiempo", "¿Cuánto hace?", "clave", "“Un mes, con dos tratamientos con gotas.”", "Otitis externa que no responde en un diabético."),
    act("cara", "¿Se le torció la boca o no cierra el ojo?", "clave", "“Me cuesta silbar desde ayer.”", "Parálisis facial: compromiso de la base de cráneo."),
    act("hisopos", "¿Usa hisopos?", "util", "“Todos los días.”", "Trauma del conducto."),
    act("oido", "¿Oye bien?", "util", "“Del derecho, menos.”", "Hipoacusia de conducción."),
    act("mascota", "¿Tiene mascotas?", "neutro", "“Un loro.”", "No orienta."),
  ],
  exam: [
    act("otoscopia", "Otoscopía", "clave", "Tejido de granulación en el piso del conducto en la unión osteocartilaginosa, otorrea purulenta.", "Signo típico."),
    act("facial", "Nervio facial", "clave", "Paresia facial periférica derecha.", "Osteomielitis de base de cráneo."),
    act("pares", "Otros pares", "util", "Normales.", "Extensión."),
  ],
  studies: [
    study("Microbiología", "cultivo", "Cultivo de la secreción", "clave", "Pseudomonas aeruginosa.", "Germen típico."),
    study("Imágenes", "tac", "TC de hueso temporal", "clave", "Erosión ósea del conducto y de la base del cráneo.", "Osteomielitis."),
    study("Imágenes", "rmn", "Resonancia con gadolinio", "util", "Compromiso de partes blandas infratemporales.", "Extensión."),
    study("Laboratorio", "eritro", "ERS y PCR", "util", "ERS 92 mm.", "Seguimiento."),
    study("Otros", "biopsia", "Biopsia del tejido de granulación", "clave", "Inflamación, sin carcinoma.", "Descarta carcinoma del conducto."),
    study("Microbiología", "hisopado-simple", "Tratar con gotas sin cultivar ni hacer imágenes", "riesgoso", "No se hizo.", "Pierde tiempo en una infección grave."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("oen", "Otitis externa necrotizante (maligna) por Pseudomonas con osteomielitis de base de cráneo y parálisis facial", true, "Diabético mayor con otalgia nocturna intensa, granulación, Pseudomonas, erosión ósea y parálisis facial."),
      dx("otitis-externa", "Otitis externa simple", false, "No da erosión ósea ni parálisis facial."),
      dx("bell", "Parálisis de Bell", false, "Hay otitis y osteomielitis."),
      dx("ramsay-hunt", "Síndrome de Ramsay Hunt", false, "Sin vesículas y con Pseudomonas."),
      dx("carcinoma", "Carcinoma del conducto auditivo", false, "La biopsia lo descarta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antipseudomonas", "Antibióticos antipseudomonas endovenosos (ceftazidima o cefepime ± ciprofloxacina) por 6–8 semanas", "clave", "Osteomielitis."),
      mg("glucemia", "Control estricto de la glucemia", "clave", "Fundamental para la curación."),
      mg("toilette", "Limpieza del conducto por ORL", "clave", "Desbridamiento local."),
      mg("hisopos", "Suspender los hisopos", "util", "Prevención."),
      mg("corticoides", "Corticoides para la parálisis facial", "riesgoso", "Empeoran una infección ósea."),
      mg("gotas-solas", "Seguir solo con gotas", "riesgoso", "Insuficiente."),
    ],
  },
  debrief: {
    diagnosis: "Otitis externa necrotizante por Pseudomonas con osteomielitis de base de cráneo y parálisis facial, en un hombre diabético de 74 años.",
    pathologies: [
      { name: "Otitis externa necrotizante", role: "principal", why: "Infección invasiva del conducto al hueso temporal." },
      { name: "Diabetes mal controlada", role: "asociada", why: "Microangiopatía e inmunidad alterada." },
      { name: "Otitis externa simple, carcinoma", role: "diferencial", why: "Se descartan." },
    ],
    reasoning: [
      "Causa: Pseudomonas aeruginosa.",
      "Mecanismo: desde el conducto pasa por las fisuras de Santorini al hueso y la base del cráneo.",
      "Consecuencia: osteomielitis, parálisis de pares craneales, trombosis de senos y muerte.",
    ],
    epidemiology:
      "Más del 90 % de los casos ocurre en diabéticos mayores; también en inmunosuprimidos. Es rara pero grave, con mortalidad que puede superar el 20 % si compromete varios pares craneales.",
    management: [
      "Sospechar en diabético con otitis que no mejora.",
      "Cultivo, imágenes y biopsia.",
      "Antibióticos prolongados.",
      "Control glucémico.",
    ],
    sources: ["Federación Argentina de Sociedades de Otorrinolaringología — Otitis externa necrotizante.", "Infectious Diseases Society — Osteomyelitis of the skull base."],
    pearls: ["Diabético + otalgia nocturna + granulación.", "Parálisis facial = base de cráneo.", "Semanas de antibiótico."],
    pitfalls: ["Seguir con gotas.", "Corticoides para el facial."],
    tribunal: [
      qa("¿Qué par craneal se afecta primero en la otitis externa necrotizante?", "El facial (VII), por su salida en el agujero estilomastoideo, cerca del foco."),
      qa("¿Qué signo otoscópico es típico?", "Tejido de granulación en el piso del conducto, en la unión osteocartilaginosa."),
      qa("¿Por qué afecta a diabéticos?", "Por microangiopatía, alteración de neutrófilos y un cerumen con pH más alto que favorece a Pseudomonas."),
    ],
  },
};
