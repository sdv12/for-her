import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const membranaHialina: ClinicalCase = {
  id: "enfermedad-membrana-hialina",
  level: 3,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 1, ageUnit: "días", sex: "M", context: "Pretérmino de 30 semanas, 1.350 g. Parto por preeclampsia, sin corticoides prenatales." },
  frequency: "frecuente",
  intro: "Te llaman de neonatología: “A las dos horas de vida está quejoso, respira rápido y le cuesta cada vez más”.",
  vitals: { FC: "168 lpm", FR: "74 rpm", "T°": "36,2 °C", "SatO₂": "82 %", Peso: "1,35 kg", Glucemia: "52 mg/dl" },
  anamnesis: [
    act("edad-gest", "¿De cuántas semanas nació? ¿Peso?", "clave", "“30 semanas, 1.350 g.”", "A menor edad gestacional, menos surfactante."),
    act("corticoides", "¿La madre recibió corticoides prenatales?", "clave", "“No hubo tiempo.”", "Factor de riesgo clave."),
    act("infeccion", "¿Rotura prolongada, fiebre materna, líquido fétido?", "clave", "“No.”", "Sepsis y neumonía son diferenciales."),
    act("diabetes", "¿Diabetes materna? ¿Cesárea sin trabajo de parto?", "util", "“Cesárea, sin diabetes.”", "Aumentan el riesgo."),
    act("reanimacion", "¿Requirió reanimación?", "util", "“CPAP en sala.”", "Evolución inicial."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Benjamín.”", "No orienta."),
  ],
  exam: [
    act("distres", "Trabajo respiratorio", "clave", "Quejido, aleteo nasal, tiraje; Silverman 7.", "Distrés respiratorio grave."),
    act("auscultacion", "Auscultación", "clave", "Entrada de aire disminuida bilateral.", "Colapso alveolar difuso."),
    act("perfusion", "Perfusión y temperatura", "util", "Relleno de 3 segundos, frío.", "Riesgo de hipotermia."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tórax", "clave", "Patrón reticulogranular difuso, broncograma aéreo, volumen bajo.", "Típico."),
    study("Laboratorio", "gases", "Gases", "clave", "pH 7,22, pCO₂ 62, pO₂ 44.", "Acidosis respiratoria e hipoxemia."),
    study("Microbiología", "sepsis", "Hemocultivo, hemograma y PCR", "clave", "En curso; leucocitos normales.", "No se puede excluir sepsis por clínica."),
    study("Imágenes", "tac", "TC de tórax", "innecesario", "No se realizó.", "No hace falta, y la radiación y el traslado son riesgosos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("emh", "Enfermedad de membrana hialina (síndrome de distrés respiratorio del pretérmino)", true, "Pretérmino de 30 semanas sin corticoides, distrés precoz progresivo y radiografía reticulogranular."),
      dx("ttrn", "Taquipnea transitoria del recién nacido", false, "Se da en término o cesárea, leve, con líquido en cisuras."),
      dx("sam", "Síndrome de aspiración meconial", false, "Es de término o postérmino, con meconio."),
      dx("neumonia", "Neumonía o sepsis neonatal", false, "Puede coexistir: se cubre, pero el cuadro es típico."),
      dx("cardiopatia", "Cardiopatía congénita", false, "La radiografía y la evolución no la sugieren."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cpap", "CPAP temprano; intubar si falla", "clave", "Reduce displasia broncopulmonar."),
      mg("surfactante", "Surfactante exógeno temprano", "clave", "Reduce mortalidad."),
      mg("soporte", "Incubadora, normotermia y nutrición", "clave", "Reducen complicaciones."),
      mg("atb", "Ampicilina y gentamicina hasta descartar sepsis", "clave", "No se puede excluir de entrada."),
      mg("oxigeno-alto", "Oxígeno al 100 % sin objetivo", "riesgoso", "Retinopatía del prematuro y displasia broncopulmonar."),
      mg("alimentar", "Alimentar por boca", "riesgoso", "Riesgo de aspiración y enterocolitis."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de membrana hialina en recién nacido pretérmino de 30 semanas, sin corticoides prenatales.",
    pathologies: [
      { name: "Enfermedad de membrana hialina", role: "principal", why: "Déficit de surfactante." },
      { name: "Prematurez extrema", role: "asociada", why: "Causa de base." },
      { name: "Taquipnea transitoria, aspiración meconial, sepsis, cardiopatía", role: "diferencial", why: "Otras causas de distrés." },
    ],
    reasoning: [
      "Causa: inmadurez de los neumocitos tipo II.",
      "Mecanismo: sin surfactante, aumenta la tensión superficial y los alvéolos colapsan.",
      "Consecuencia: hipoxemia, acidosis, membranas hialinas y distrés.",
    ],
    epidemiology:
      "La prematurez es la principal causa de mortalidad infantil en Argentina. La incidencia de esta enfermedad es inversa a la edad gestacional, y es muy alta antes de las 28 semanas. Los corticoides prenatales son la intervención que más la previene.",
    management: [
      "Corticoides prenatales.",
      "CPAP desde sala de partos.",
      "Surfactante y oxígeno con objetivo.",
      "Cuidados de la prematurez.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones de distrés del recién nacido.", "Ministerio de Salud de la Nación — Guía de prematurez."],
    pearls: ["Pretérmino con quejido en las primeras horas.", "Vidrio esmerilado + broncograma.", "Oxígeno con objetivo."],
    pitfalls: ["Olvidar sepsis.", "Saturación 100 % sin control."],
    tribunal: [
      qa("¿Qué es el test de Silverman?", "Un puntaje de dificultad respiratoria neonatal que evalúa aleteo, quejido, tiraje, retracción y disociación toracoabdominal."),
      qa("¿Qué función tiene el surfactante?", "Reduce la tensión superficial y evita el colapso alveolar al final de la espiración."),
      qa("¿Qué complicaciones tiene el prematuro?", "Displasia broncopulmonar, hemorragia intraventricular, enterocolitis, retinopatía y ductus."),
    ],
  },
};
