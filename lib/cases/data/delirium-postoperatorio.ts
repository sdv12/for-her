import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const deliriumPostoperatorio: ClinicalCase = {
  id: "delirium-postoperatorio-adulta-mayor",
  level: 2,
  area: "Salud mental",
  setting: "Internación",
  patient: { age: 79, ageUnit: "años", sex: "F", context: "Operada de fractura de cadera hace 2 días. Hipoacusia. Sin anteojos en la internación." },
  frequency: "muy-frecuente",
  intro: "Enfermería avisa: “Esta noche se quiso sacar la vía, no sabe dónde está y ve bichos en la pared.”",
  vitals: { TA: "142/82 mmHg", FC: "96 lpm", FR: "18 rpm", "T°": "37,2 °C", "SatO₂": "93 %", Glucemia: "128 mg/dl" },
  anamnesis: [
    act("inicio", "¿Cómo estaba antes de la cirugía?", "clave", "“Independiente, con buena memoria.”", "Cambio agudo."),
    act("fluctuacion", "¿Cambia durante el día?", "clave", "“A la mañana está mejor.”", "Fluctuante."),
    act("farmacos", "¿Qué medicación nueva recibe?", "clave", "“Morfina y lorazepam para dormir.”", "Desencadenantes."),
    act("orina", "¿Orina? ¿Evacúa?", "util", "“Tiene sonda y no evacúa.”", "Retención y constipación."),
    act("dolor", "¿Dolor?", "util", "“Se queja.”", "Factor."),
    act("nietos", "¿Quién la acompaña?", "neutro", "“La nieta.”", "No orienta."),
  ],
  exam: [
    act("cam", "Escala CAM", "clave", "Inicio agudo, fluctuante, inatención y pensamiento desorganizado.", "Delirium."),
    act("neuro", "Examen neurológico", "clave", "Sin foco.", "Excluye ACV."),
    act("abdomen", "Abdomen", "util", "Distendido, fecaloma.", "Factor."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, ionograma, glucemia, función renal, orina", "clave", "Sodio 131; Hb 8,6.", "Factores."),
    study("Laboratorio", "gases", "Saturación y gases", "util", "Hipoxemia leve.", "Factor."),
    study("Electrofisiología", "ecg", "ECG", "util", "Normal.", "Base."),
    study("Imágenes", "tc", "TC de cerebro sin foco ni trauma", "innecesario", "No se realizó.", "Poco rendimiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("delirium", "Delirium hiperactivo posoperatorio multifactorial", true, "Agudo, fluctuante, inatención, con opioides, benzodiacepinas, anemia, dolor y constipación."),
      dx("demencia", "Demencia", false, "Era independiente; es agudo."),
      dx("psicosis", "Psicosis", false, "Inatención y fluctuación."),
      dx("acv", "ACV", false, "Sin foco."),
      dx("abstinencia", "Abstinencia alcohólica", false, "No toma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("causas", "Corregir causas: retirar benzodiacepina, analgesia sin exceso de opioides, constipación, sonda", "clave", "Tratamiento principal."),
      mg("medidas", "Medidas no farmacológicas: anteojos, audífonos, familia, reloj, luz", "clave", "Reduce delirium."),
      mg("anemia", "Corregir anemia, oxígeno e hidratación", "clave", "Factores."),
      mg("antipsicotico", "Antipsicótico en dosis bajas solo si hay riesgo de daño", "util", "Uso puntual."),
      mg("benzo-mg", "Más lorazepam", "riesgoso", "Empeora."),
      mg("sujecion", "Sujeción física", "riesgoso", "Empeora y lesiona."),
    ],
  },
  debrief: {
    diagnosis: "Delirium hiperactivo posoperatorio multifactorial tras cirugía de cadera, en mujer de 79 años.",
    pathologies: [
      { name: "Delirium", role: "principal", why: "Disfunción cerebral aguda." },
      { name: "Fármacos, anemia, dolor, constipación", role: "asociada", why: "Factores." },
      { name: "Demencia, psicosis, ACV", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: múltiples factores sobre un cerebro vulnerable.",
      "Mecanismo: alteración de neurotransmisores e inflamación.",
      "Consecuencia: más caídas, días de internación, mortalidad y deterioro cognitivo.",
    ],
    epidemiology:
      "Afecta hasta a la mitad de los adultos mayores operados de cadera. Muchas veces se previene con medidas simples. Las benzodiacepinas y la sujeción lo empeoran. El delirium hipoactivo es frecuente y suele pasarse por alto.",
    management: [
      "CAM.",
      "Buscar causas.",
      "Medidas no farmacológicas.",
      "Fármacos solo si hay riesgo.",
    ],
    sources: ["Sociedad Argentina de Gerontología y Geriatría — Delirium.", "NICE — Delirium Prevention and Management."],
    pearls: ["Agudo y fluctuante.", "Anteojos y audífonos.", "Sin benzodiacepinas."],
    pitfalls: ["Sedar.", "Atarlo."],
    tribunal: [
      qa("¿Qué es la escala CAM?", "Inicio agudo y fluctuante, inatención, y pensamiento desorganizado o alteración de conciencia."),
      qa("¿Qué tipos de delirium hay?", "Hiperactivo, hipoactivo y mixto."),
      qa("¿Cuándo se usan benzodiacepinas en delirium?", "Solo en abstinencia alcohólica o de benzodiacepinas."),
    ],
  },
};
