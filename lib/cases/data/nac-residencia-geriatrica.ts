import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const nacResidenciaGeriatrica: ClinicalCase = {
  id: "neumonia-residencia-geriatrica",
  level: 3,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 88, ageUnit: "años", sex: "M", context: "Vive en una residencia geriátrica. Demencia moderada, se atraganta con los líquidos. Agosto." },
  frequency: "muy-frecuente",
  intro: "La enfermera de la residencia: “Desde anoche está más dormido, no quiere comer y respira rápido. No tuvo fiebre alta.”",
  vitals: { TA: "100/60 mmHg", FC: "108 lpm", FR: "28 rpm", "T°": "37,6 °C", "SatO₂": "89 %", Glasgow: "13/15" },
  anamnesis: [
    act("basal", "¿Cómo está habitualmente?", "clave", "“Camina con andador y conversa algo.”", "Cambio agudo del estado funcional."),
    act("deglucion", "¿Tose al comer o tomar?", "clave", "“Se atraganta con el agua.”", "Disfagia: aspiración."),
    act("antibioticos", "¿Recibió antibióticos o estuvo internado en los últimos 90 días?", "clave", "“No.”", "Riesgo de gérmenes resistentes."),
    act("vacunas", "¿Vacunas antigripal y antineumocócica?", "util", "“La antigripal sí.”", "Prevención."),
    act("directivas", "¿Hay directivas anticipadas o lo habló la familia?", "util", "“La hija pidió que lo traten pero sin terapia intensiva.”", "Objetivos de cuidado."),
    act("radio", "¿Qué le gusta escuchar?", "neutro", "“Tango en la radio.”", "No orienta."),
  ],
  exam: [
    act("pulmon", "Auscultación", "clave", "Rales y soplo tubario en base derecha.", "Consolidación."),
    act("conciencia", "Estado mental", "clave", "Desorientado, somnoliento.", "Delirium."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas.", "Deshidratación."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Consolidación en lóbulo inferior derecho.", "Neumonía."),
    study("Laboratorio", "lab", "Hemograma, urea, ionograma, gases", "clave", "Leucocitos 15.800; urea 78; Na 148.", "CURB-65 de 4."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Pendientes.", "Germen."),
    study("Imágenes", "tc", "TC de tórax de rutina", "innecesario", "No se realizó.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nac-grave", "Neumonía aspirativa de la comunidad grave en adulto mayor institucionalizado, con delirium", true, "Disfagia, consolidación basal derecha, hipoxemia, delirium y CURB-65 alto."),
      dx("delirium-solo", "Delirium por deshidratación", false, "Hay consolidación e hipoxemia."),
      dx("ic", "Insuficiencia cardíaca", false, "Consolidación unilateral."),
      dx("tep", "TEP", false, "Hay foco pulmonar infeccioso."),
      dx("neumonitis-quimica", "Neumonitis química aislada", false, "Evolución e inflamación sistémica sugieren infección."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Ampicilina-sulbactam EV", "clave", "Cubre flora aspirativa y neumococo."),
      mg("oxigeno", "Oxígeno e hidratación", "clave", "Soporte."),
      mg("objetivos", "Acordar con la familia los objetivos de cuidado", "clave", "Respeta la decisión previa."),
      mg("fonoaudiologia", "Evaluar deglución y adaptar consistencias", "util", "Prevenir recurrencias."),
      mg("sujecion", "Sujeción mecánica por el delirium", "riesgoso", "Empeora el delirium y produce lesiones."),
      mg("antibiotico-amplio", "Carbapenem más vancomicina sin factores de riesgo", "riesgoso", "Selecciona resistencia sin necesidad."),
    ],
  },
  debrief: {
    diagnosis: "Neumonía aspirativa grave de la comunidad con delirium, en varón de 88 años institucionalizado con demencia y disfagia.",
    pathologies: [
      { name: "Neumonía aspirativa", role: "principal", why: "Microaspiración por disfagia." },
      { name: "Delirium y deshidratación", role: "asociada", why: "Presentación atípica." },
      { name: "Insuficiencia cardíaca, TEP", role: "diferencial", why: "Otras causas de disnea." },
    ],
    reasoning: [
      "Causa: aspiración de flora orofaríngea por disfagia.",
      "Mecanismo: infección del lóbulo inferior derecho por la posición del bronquio.",
      "Consecuencia: hipoxemia, delirium y alta mortalidad.",
    ],
    epidemiology:
      "La neumonía es la principal causa infecciosa de muerte en adultos mayores institucionalizados. Suele presentarse con confusión y caída funcional más que con fiebre. La disfagia por demencia o ACV es el mayor factor de riesgo.",
    management: [
      "Gravedad.",
      "Antibiótico.",
      "Objetivos de cuidado.",
      "Deglución.",
    ],
    sources: ["Sociedad Argentina de Infectología — Neumonía aguda de la comunidad.", "ATS/IDSA — Community-acquired Pneumonia Guideline."],
    pearls: ["En el anciano, la neumonía se presenta como confusión.", "Disfagia: aspiración.", "Hablá los objetivos."],
    pitfalls: ["Esperar fiebre.", "Sujetar."],
    tribunal: [
      qa("¿Qué es el CURB-65?", "Escala con confusión, urea, frecuencia respiratoria, presión y edad de 65 o más para estimar gravedad."),
      qa("¿Por qué afecta más el pulmón derecho?", "El bronquio principal derecho es más vertical y ancho."),
      qa("¿Qué medidas previenen neumonía en residencias?", "Higiene oral, evaluación de deglución, vacunas y posición semisentada al comer."),
    ],
  },
};
