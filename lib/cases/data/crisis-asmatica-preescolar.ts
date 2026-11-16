import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const crisisAsmaticaPreescolar: ClinicalCase = {
  id: "crisis-asmatica-preescolar",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 3, ageUnit: "años", sex: "F", context: "Va al jardín. Es su cuarto episodio de 'bronquitis' este año. La mamá fuma en la casa." },
  frequency: "muy-frecuente",
  intro: "La mamá: “Está con mocos hace dos días y ahora le silba el pecho y respira agitada.”",
  vitals: { FC: "142 lpm", FR: "44 rpm", "SatO₂": "92 %", "T°": "37,6 °C", Peso: "14 kg" },
  anamnesis: [
    act("episodios", "¿Cuántas veces le pasó y cómo respondió?", "clave", "“Cuatro este año, siempre con resfríos; con el paf mejora.”", "Sibilancias recurrentes con respuesta a broncodilatadores."),
    act("intercrisis", "¿Tose de noche o al correr entre los resfríos?", "clave", "“A veces de noche.”", "Síntomas entre crisis: apoya asma."),
    act("atopia", "¿Tiene dermatitis o alergias? ¿Asma en la familia?", "clave", "“Dermatitis de bebé, y el papá es asmático.”", "Índice predictivo de asma positivo."),
    act("tabaco", "¿Alguien fuma en la casa?", "clave", "“Yo, en el patio.”", "Factor desencadenante."),
    act("cuerpo-extrano", "¿Se atragantó con algo?", "util", "“No.”", "Diferencial."),
    act("muneca", "¿Cómo se llama su muñeca?", "neutro", "“Lola.”", "No orienta."),
  ],
  exam: [
    act("dificultad", "Trabajo respiratorio", "clave", "Tiraje subcostal e intercostal, aleteo leve.", "Crisis moderada."),
    act("auscultacion", "Auscultación", "clave", "Sibilancias espiratorias difusas, espiración prolongada, simétrica.", "Obstrucción bronquial difusa."),
    act("estado", "Estado de conciencia", "util", "Alerta, habla frases cortas.", "No es grave."),
  ],
  studies: [
    study("Otros", "score", "Score de gravedad (Tal modificado) y saturometría", "clave", "Tal 7, saturación 92 %.", "Moderada."),
    study("Imágenes", "rx", "Radiografía de tórax de rutina", "innecesario", "No se pidió.", "Solo si hay asimetría, fiebre alta o mala respuesta."),
    study("Laboratorio", "virus", "Panel viral", "innecesario", "No se pidió.", "No cambia la conducta."),
    study("Laboratorio", "gases", "Gases en sangre", "innecesario", "No se pidieron.", "Saturación y clínica alcanzan en crisis moderada."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crisis-asma", "Crisis asmática moderada desencadenada por infección viral en preescolar con sibilancias recurrentes", true, "Cuarto episodio, respuesta a broncodilatadores, atopia, padre asmático y obstrucción difusa simétrica."),
      dx("bronquiolitis", "Bronquiolitis", false, "Es mayor de 2 años y tiene episodios recurrentes."),
      dx("nac", "Neumonía", false, "Sibilancias difusas simétricas sin foco."),
      dx("cuerpo-extrano", "Cuerpo extraño", false, "Sin atragantamiento y simétrico."),
      dx("crup", "Laringitis", false, "No hay estridor ni tos perruna."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("salbutamol", "Salbutamol con aerocámara: 2–4 puffs cada 20 minutos en la primera hora", "clave", "Primera línea."),
      mg("corticoide", "Corticoide oral (prednisolona o meprednisona) 3 días", "clave", "Crisis moderada."),
      mg("o2", "Oxígeno para saturación mayor de 94 %", "clave", "Hipoxemia leve."),
      mg("controlador", "Al alta, corticoide inhalado de control y plan escrito", "clave", "Sibilancias recurrentes con IPA positivo."),
      mg("tabaco", "Consejería para dejar de fumar", "util", "Ambiente libre de humo."),
      mg("antibiotico", "Amoxicilina", "innecesario", "Es viral."),
      mg("nebulizar-siempre", "Nebulizaciones en lugar de aerocámara", "innecesario", "La aerocámara es igual o más eficaz."),
    ],
  },
  debrief: {
    diagnosis: "Crisis asmática moderada desencadenada por virus, en una niña de 3 años con sibilancias recurrentes e índice predictivo de asma positivo.",
    pathologies: [
      { name: "Asma del preescolar / sibilancias recurrentes", role: "principal", why: "Obstrucción bronquial reversible." },
      { name: "Infección viral", role: "asociada", why: "Gatillo." },
      { name: "Bronquiolitis, cuerpo extraño", role: "diferencial", why: "Otras causas de sibilancias." },
    ],
    reasoning: [
      "Causa: hiperreactividad bronquial con atopia, gatillada por virus y humo.",
      "Mecanismo: broncoespasmo, edema e hipersecreción.",
      "Consecuencia: sibilancias, tiraje e hipoxemia.",
    ],
    epidemiology:
      "Un tercio de los niños tiene sibilancias antes de los 3 años, pero solo una parte será asmático. El índice predictivo de asma (IPA) ayuda a identificarlos: dermatitis atópica o padre asmático aumentan el riesgo. El humo de tabaco empeora las crisis.",
    management: [
      "Score de gravedad.",
      "Salbutamol con aerocámara.",
      "Corticoide oral.",
      "Control de base y plan escrito.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Consenso de asma bronquial en pediatría.", "GINA — Management of asthma in children 5 years and younger."],
    pearls: ["Aerocámara, no nebulizador.", "Preescolar con crisis repetidas: IPA.", "Casa sin humo."],
    pitfalls: ["Antibióticos.", "Radiografía de rutina."],
    tribunal: [
      qa("¿Qué es el índice predictivo de asma?", "Sibilancias recurrentes más un criterio mayor (padre asmático o dermatitis atópica) o dos menores (rinitis, sibilancias sin resfrío, eosinofilia)."),
      qa("¿Por qué se prefiere la aerocámara a la nebulización?", "Porque es igual de eficaz, más rápida, con menos taquicardia y se puede usar en la casa."),
      qa("¿Qué signos indican crisis grave en un niño?", "Saturación menor de 92 %, no puede hablar, cianosis, silencio auscultatorio, confusión o agotamiento."),
    ],
  },
};
