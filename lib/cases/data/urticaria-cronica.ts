import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const urticariaCronica: ClinicalCase = {
  id: "urticaria-cronica-espontanea",
  level: 1,
  area: "Alergia e inmunología",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "F", context: "Administrativa. Hipotiroidismo por Hashimoto." },
  frequency: "frecuente",
  intro: "“Hace cuatro meses me salen ronchas que pican casi todos los días, cada una dura unas horas. Dejé la leche, el maní y nada cambia.”",
  vitals: { TA: "118/72 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("duracion", "¿Desde cuándo y con qué frecuencia?", "clave", "“Cuatro meses, casi todos los días.”", "Más de 6 semanas: crónica."),
    act("ronchas", "¿Cuánto dura cada roncha? ¿Deja marca?", "clave", "“Unas horas, no deja nada.”", "Urticaria, no vasculitis."),
    act("desencadenante", "¿Algo físico la provoca: frío, presión, rascado?", "clave", "“No, aparece sola.”", "Espontánea."),
    act("aines", "¿Toma antiinflamatorios?", "util", "“Ibuprofeno por los dolores menstruales.”", "Empeoran."),
    act("angioedema", "¿Se le hinchan labios o párpados?", "util", "“A veces los párpados.”", "Angioedema asociado."),
    act("serie", "¿Qué hace para relajarse?", "neutro", "“Miro series.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel", "clave", "Ronchas eritematosas evanescentes en tronco y brazos.", "Urticaria."),
    act("dermografismo", "Dermografismo", "clave", "Leve.", "Acompaña."),
    act("tiroides", "Tiroides", "util", "Bocio pequeño.", "Autoinmunidad."),
  ],
  studies: [
    study("Laboratorio", "basico", "Hemograma, PCR o VSG", "clave", "Normales.", "Laboratorio mínimo."),
    study("Laboratorio", "tiroides-lab", "TSH y anti-TPO", "util", "Anti-TPO positivos.", "Asociación autoinmune."),
    study("Otros", "uas7", "Puntaje de actividad UAS7", "clave", "26.", "Actividad moderada."),
    study("Laboratorio", "panel-alergia", "Panel extenso de IgE para alimentos", "innecesario", "No se realizó.", "Los alimentos casi nunca causan urticaria crónica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("uce", "Urticaria crónica espontánea con angioedema, asociada a autoinmunidad tiroidea", true, "Ronchas diarias de horas, más de 6 semanas, sin desencadenante físico y anti-TPO positivo."),
      dx("alimentaria", "Alergia alimentaria", false, "No cambia al retirar alimentos y es diaria."),
      dx("vasculitis", "Vasculitis urticariana", false, "Las ronchas duran horas y no dejan marca."),
      dx("fisica", "Urticaria física aislada", false, "Aparece sola."),
      dx("angioedema-hereditario", "Angioedema hereditario", false, "Hay ronchas y no es familiar."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antihistaminico", "Antihistamínico de segunda generación diario", "clave", "Primera línea."),
      mg("dosis", "Aumentar hasta cuatro veces la dosis si no responde", "clave", "Segundo escalón."),
      mg("omalizumab", "Omalizumab si persiste", "util", "Tercer escalón."),
      mg("aines", "Evitar AINE", "clave", "Empeoran."),
      mg("corticoides-cronicos", "Corticoides orales crónicos", "riesgoso", "Efectos adversos sin control a largo plazo."),
      mg("dietas", "Dietas restrictivas amplias", "riesgoso", "Sin beneficio y con riesgo nutricional."),
    ],
  },
  debrief: {
    diagnosis: "Urticaria crónica espontánea con angioedema, asociada a autoinmunidad tiroidea, en mujer de 38 años.",
    pathologies: [
      { name: "Urticaria crónica espontánea", role: "principal", why: "Activación de mastocitos sin desencadenante externo." },
      { name: "Hashimoto", role: "asociada", why: "Autoinmunidad frecuente." },
      { name: "Alergia alimentaria, vasculitis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: autoinmunidad contra IgE o su receptor en muchos casos.",
      "Mecanismo: degranulación espontánea de mastocitos cutáneos.",
      "Consecuencia: ronchas diarias, angioedema y mala calidad de vida.",
    ],
    epidemiology:
      "Afecta a alrededor del 1 % de la población, más a mujeres de mediana edad. Se asocia a autoinmunidad tiroidea. Casi nunca es por alimentos, y la mayoría remite en algunos años.",
    management: [
      "Clínica y laboratorio mínimo.",
      "Antihistamínico.",
      "Escalar dosis.",
      "Omalizumab.",
    ],
    sources: ["Asociación Argentina de Alergia e Inmunología Clínica — Urticaria.", "EAACI/GA²LEN/EuroGuiDerm/APAAACI — Guideline for Urticaria."],
    pearls: ["Más de 6 semanas: crónica.", "No es alimentaria.", "Antihistamínico hasta 4 veces."],
    pitfalls: ["Paneles de alergia.", "Corticoides crónicos."],
    tribunal: [
      qa("¿Qué sugiere vasculitis urticariana?", "Ronchas de más de 24 horas, dolorosas, que dejan púrpura o hiperpigmentación."),
      qa("¿Cómo actúa el omalizumab?", "Es un anti-IgE que reduce la activación de mastocitos."),
      qa("¿Por qué no se hacen paneles de alergia?", "Porque la urticaria crónica espontánea no es mediada por alérgenos externos."),
    ],
  },
};
