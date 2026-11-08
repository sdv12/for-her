import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cadDebutNina: ClinicalCase = {
  id: "cetoacidosis-debut-diabetes-nina",
  level: 3,
  area: "Endocrinología",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "años", sex: "F", context: "Sana hasta ahora. La trae el papá. Volvió a mojar la cama hace dos semanas." },
  frequency: "frecuente",
  intro: "“Toma agua todo el tiempo, adelgazó y hoy vomita, le duele la panza y respira raro.”",
  vitals: { TA: "94/58 mmHg", FC: "134 lpm", FR: "36 rpm", "T°": "36,8 °C", "SatO₂": "98 %", Peso: "22 kg", Glucemia: "486 mg/dl", Glasgow: "14/15" },
  anamnesis: [
    act("poliuria", "¿Orina y toma más? ¿Bajó de peso? ¿Hace cuánto?", "clave", "“Dos semanas; bajó 3 kilos.”", "Síntomas cardinales de debut."),
    act("infeccion", "¿Fiebre o síntomas de infección?", "clave", "“Tos, nada más.”", "Desencadenante."),
    act("conciencia", "¿Dolor de cabeza o está más dormida?", "clave", "“Algo dormida.”", "Alarma de edema cerebral."),
    act("familia", "¿Familiares con diabetes o enfermedades autoinmunes?", "util", "“Una tía tiene tiroides.”", "Autoinmunidad."),
    act("medicacion", "¿Corticoides u otro remedio?", "util", "“No.”", "Causas."),
    act("escuela", "¿Cómo le va en la escuela?", "neutro", "“Bien.”", "No orienta."),
  ],
  exam: [
    act("respiracion", "Respiración y aliento", "clave", "Kussmaul, aliento a manzana.", "Acidosis y cetosis."),
    act("hidratacion", "Mucosas y perfusión", "clave", "Secas, relleno de 3 segundos.", "Deshidratación."),
    act("neuro", "Examen neurológico", "clave", "Glasgow 14; pupilas normales.", "Basal por edema cerebral."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases, cetonemia e ionograma", "clave", "pH 7,09; HCO₃ 6; cetonemia 6,2; Na 131; K 5,1.", "CAD grave."),
    study("Laboratorio", "auto", "HbA1c, anticuerpos anti-GAD e IA2, TSH y antitransglutaminasa", "clave", "HbA1c 12 %; anti-GAD positivo.", "Tipo 1 y asociaciones."),
    study("Electrofisiología", "ecg", "ECG", "util", "Sin alteraciones.", "Potasio."),
    study("Imágenes", "tc-rutina", "TC de cerebro de rutina al ingreso", "innecesario", "No se realizó.", "Solo con signos de deterioro."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cad", "Cetoacidosis diabética grave como debut de diabetes tipo 1", true, "Poliuria, adelgazamiento, glucemia alta, pH 7,09 y cetonemia."),
      dx("gastro", "Gastroenteritis", false, "No explica glucemia ni acidosis."),
      dx("apendicitis", "Apendicitis", false, "El dolor es por la cetoacidosis."),
      dx("asma", "Crisis asmática", false, "La respiración es de Kussmaul, no sibilante."),
      dx("eh", "Estado hiperosmolar", false, "Hay cetosis y acidosis importantes."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("liquidos", "Solución fisiológica lenta, repartida en 24 a 48 horas", "clave", "Corrección gradual."),
      mg("insulina", "Insulina regular EV 0,05 a 0,1 U/kg/h, una hora después del inicio de líquidos", "clave", "Sin bolo."),
      mg("potasio", "Potasio en los líquidos y controles horarios", "clave", "Evita hipopotasemia."),
      mg("neuro", "Monitoreo neurológico en terapia intensiva", "clave", "Edema cerebral."),
      mg("bicarbonato", "Bicarbonato de rutina", "riesgoso", "Asociado a edema cerebral."),
      mg("bolo", "Bolo de insulina y corrección rápida de líquidos", "riesgoso", "Riesgo de edema cerebral."),
    ],
  },
  debrief: {
    diagnosis: "Cetoacidosis diabética grave como debut de diabetes tipo 1 autoinmune, en niña de 8 años.",
    pathologies: [
      { name: "Cetoacidosis diabética", role: "principal", why: "Déficit de insulina." },
      { name: "Diabetes tipo 1", role: "asociada", why: "Causa." },
      { name: "Gastroenteritis, apendicitis", role: "diferencial", why: "Otras causas de vómitos y dolor." },
    ],
    reasoning: [
      "Causa: destrucción autoinmune de células beta.",
      "Mecanismo: sin insulina se forman cuerpos cetónicos y sube la glucosa.",
      "Consecuencia: deshidratación, acidosis, y riesgo de edema cerebral.",
    ],
    epidemiology:
      "En Argentina, una parte importante de las niñas y niños debuta en cetoacidosis, especialmente cuando se pasan por alto síntomas como la enuresis secundaria. La principal causa de muerte por CAD pediátrica es el edema cerebral, lo que hace que la corrección deba ser lenta.",
    management: [
      "Reconocer los síntomas cardinales.",
      "Líquidos e insulina según protocolo.",
      "Vigilar potasio y neurología.",
      "Educación diabetológica.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso sobre cetoacidosis diabética.", "ISPAD — Clinical Practice Consensus Guidelines."],
    pearls: ["Enuresis secundaria.", "Sin bolo de insulina.", "Cefalea o bradicardia: edema cerebral."],
    pitfalls: ["Hidratar rápido.", "Tratarla como gastroenteritis."],
    tribunal: [
      qa("¿Qué signos sugieren edema cerebral?", "Cefalea, bradicardia con hipertensión, cambios de conciencia, vómitos y pupilas alteradas; se trata con manitol o solución hipertónica."),
      qa("¿Cuáles son los criterios de CAD?", "Glucemia mayor de 200, pH menor de 7,3 o bicarbonato menor de 18, y cetonemia o cetonuria."),
      qa("¿Por qué el potasio puede estar normal al inicio?", "Sale de las células por la acidosis y la falta de insulina, aunque el potasio corporal total esté bajo."),
    ],
  },
};
