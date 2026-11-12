import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neuritisOptica: ClinicalCase = {
  id: "neuritis-optica-desmielinizante",
  level: 2,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Hace un año tuvo hormigueo en una pierna que pasó solo." },
  frequency: "poco-frecuente",
  intro: "“Veo borroso con el ojo izquierdo desde hace 3 días y me duele al mover el ojo. Los colores se ven apagados.”",
  vitals: { TA: "112/70 mmHg", FC: "76 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("dolor", "¿Duele al mover el ojo?", "clave", "“Sí.”", "Típico."),
    act("colores", "¿Cómo ves los colores?", "clave", "“Apagados.”", "Discromatopsia."),
    act("previo", "¿Síntomas neurológicos antes?", "clave", "“Hormigueo hace un año.”", "Sugiere esclerosis múltiple."),
    act("bilateral", "¿Ambos ojos? ¿Vómitos o hipo?", "util", "“No.”", "Neuromielitis óptica."),
    act("infeccion", "¿Fiebre o infección reciente?", "util", "“No.”", "Otras causas."),
    act("trabajo", "¿Qué estudiás?", "neutro", "“Psicología.”", "No orienta."),
  ],
  exam: [
    act("agudeza", "Agudeza visual", "clave", "Izquierdo 20/100.", "Pérdida."),
    act("pupila", "Reflejo pupilar alternante", "clave", "Defecto pupilar aferente izquierdo (Marcus Gunn).", "Afectación del nervio."),
    act("fondo", "Fondo de ojo", "util", "Normal.", "Neuritis retrobulbar."),
  ],
  studies: [
    study("Imágenes", "rmn", "RM de cerebro y órbitas con contraste", "clave", "Realce del nervio óptico izquierdo y lesiones periventriculares.", "Riesgo de esclerosis múltiple."),
    study("Laboratorio", "anticuerpos", "Anti-acuaporina 4 y anti-MOG", "clave", "Negativos.", "Excluye otras."),
    study("Otros", "campo", "Campo visual y OCT", "util", "Escotoma central.", "Seguimiento."),
    study("Otros", "corticoide-oral-bajo", "Prednisona oral en dosis bajas", "riesgoso", "No se realizó.", "Aumenta recurrencias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("neuritis", "Neuritis óptica desmielinizante como forma de presentación de esclerosis múltiple", true, "Pérdida visual dolorosa, discromatopsia, Marcus Gunn y lesiones en RM."),
      dx("nmo", "Neuromielitis óptica", false, "Anticuerpos negativos."),
      dx("isquemica", "Neuropatía óptica isquémica", false, "Edad, dolor y RM."),
      dx("glaucoma", "Glaucoma", false, "No es agudo doloroso."),
      dx("desprendimiento", "Desprendimiento de retina", false, "Fondo normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metilprednisolona", "Metilprednisolona EV en pulsos", "clave", "Acelera recuperación."),
      mg("neurologia", "Neurología para tratamiento modificador de esclerosis múltiple", "clave", "Reduce brotes."),
      mg("seguimiento", "Seguimiento visual", "clave", "Recuperación."),
      mg("vitamina-d", "Vitamina D y dejar de fumar", "util", "Factores."),
      mg("sin-control", "Alta sin seguimiento", "riesgoso", "Se pierde la esclerosis."),
      mg("prednisona-baja", "Prednisona oral en dosis bajas", "riesgoso", "Recurrencias."),
    ],
  },
  debrief: {
    diagnosis: "Neuritis óptica izquierda desmielinizante, con lesiones compatibles con esclerosis múltiple, en mujer de 26 años.",
    pathologies: [
      { name: "Neuritis óptica", role: "principal", why: "Inflamación del nervio óptico." },
      { name: "Esclerosis múltiple", role: "asociada", why: "Causa." },
      { name: "NMO, isquémica", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: desmielinización autoinmune.",
      "Mecanismo: inflamación del nervio óptico.",
      "Consecuencia: pérdida visual dolorosa, generalmente recuperable.",
    ],
    epidemiology:
      "Es la forma de inicio de esclerosis múltiple en cerca de un 20 % y aparece en mujeres jóvenes. La mayoría recupera la visión en semanas. Con lesiones en RM, el riesgo de esclerosis múltiple es alto.",
    management: [
      "Agudeza y pupila.",
      "RM.",
      "Corticoides EV.",
      "Neurología.",
    ],
    sources: ["Sociedad Neurológica Argentina — Esclerosis múltiple.", "Optic Neuritis Treatment Trial — Resultados."],
    pearls: ["Duele al mover el ojo.", "Marcus Gunn.", "Colores apagados."],
    pitfalls: ["Prednisona oral baja.", "No pedir RM."],
    tribunal: [
      qa("¿Qué es el defecto pupilar aferente?", "Al iluminar el ojo afectado las pupilas se dilatan, porque llega menos señal."),
      qa("¿Qué son los criterios de McDonald?", "Criterios de diseminación en tiempo y espacio para diagnosticar esclerosis múltiple."),
      qa("¿Qué es el fenómeno de Uhthoff?", "Empeoramiento transitorio de síntomas con el calor."),
    ],
  },
};
