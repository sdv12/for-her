import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaVertebral: ClinicalCase = {
  id: "fractura-vertebral-osteoporosis",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 74, ageUnit: "años", sex: "F", context: "Menopausia a los 44 años. Delgada. Corticoides por EPOC varias veces. Fumó 30 años." },
  frequency: "muy-frecuente",
  intro: "“Levanté una maceta y me dio un dolor fuerte en la espalda. No me caí. Mis hijas dicen que estoy más bajita.”",
  vitals: { TA: "132/78 mmHg", FC: "76 lpm", "T°": "36,3 °C", "SatO₂": "95 %", Peso: "48 kg" },
  anamnesis: [
    act("mecanismo", "¿Cómo empezó? ¿Te caíste?", "clave", "“Solo levanté una maceta.”", "Fractura con trauma mínimo: fractura por fragilidad."),
    act("alarma", "¿Fiebre, pérdida de peso, dolor nocturno, debilidad en las piernas, problemas para orinar?", "clave", "“No.”", "Busca banderas rojas: tumor, infección, cola de caballo."),
    act("riesgo", "¿Corticoides, fracturas previas, antecedentes familiares?", "clave", "“Mi madre se fracturó la cadera; yo, la muñeca a los 65.”", "Factores FRAX."),
    act("caidas", "¿Te caés? ¿Tomás algún medicamento para dormir?", "util", "“Dos veces este año; clonazepam.”", "Prevención de caídas."),
    act("alimentacion", "¿Tomás lácteos y salís al sol?", "util", "“Poco.”", "Calcio y vitamina D."),
    act("plantas", "¿Qué plantas tenés?", "neutro", "“Malvones.”", "No orienta."),
  ],
  exam: [
    act("columna", "Columna y talla", "clave", "Dolor a la percusión en D12, cifosis, talla 4 cm menor.", "Fractura y aplastamientos previos."),
    act("neuro", "Neurológico de miembros inferiores", "clave", "Fuerza, reflejos y sensibilidad normales.", "Sin compromiso medular."),
    act("marcha", "Marcha y equilibrio", "util", "Levantarse y andar: 16 segundos.", "Riesgo de caídas."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de columna dorsolumbar", "clave", "Aplastamiento en cuña de D12 y L2 antiguo.", "Confirma la fractura; se considera osteoporosis clínica."),
    study("Otros", "dmo", "Densitometría ósea", "clave", "T-score -3,1 en columna y -2,7 en cuello femoral.", "Confirma y sirve de base."),
    study("Laboratorio", "secundarias", "Calcio, fósforo, vitamina D, función renal, TSH, proteinograma", "clave", "25-OH vitamina D 14 ng/ml; proteinograma normal.", "Busca causas secundarias como mieloma."),
    study("Imágenes", "pet", "PET de cuerpo entero", "innecesario", "No se realizó.", "Sin banderas rojas no se indica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("osteoporosis", "Osteoporosis posmenopáusica y por corticoides con fractura vertebral por fragilidad", true, "Trauma mínimo, cifosis, pérdida de talla, aplastamiento y T-score bajo."),
      dx("lumbalgia", "Lumbalgia mecánica", false, "Hay fractura radiológica."),
      dx("mieloma", "Mieloma múltiple", false, "Sin anemia, hipercalcemia ni pico monoclonal."),
      dx("metastasis", "Metástasis vertebral", false, "Sin antecedentes, con imagen típica benigna."),
      dx("osteomalacia", "Osteomalacia", false, "La vitamina D está baja, pero la fractura y la densitometría orientan a osteoporosis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("analgesia", "Analgesia con paracetamol, movilización precoz", "clave", "Evita complicaciones por reposo."),
      mg("bifosfonato", "Bifosfonato (alendronato o zoledrónico) tras corregir vitamina D", "clave", "Reduce nuevas fracturas."),
      mg("calcio", "Calcio y vitamina D", "clave", "Base del tratamiento."),
      mg("caidas", "Prevención de caídas, revisar clonazepam, ejercicio y dejar de fumar", "clave", "Las caídas causan las fracturas."),
      mg("reposo", "Reposo absoluto por semanas", "riesgoso", "Empeora la masa ósea y causa trombosis y neumonía."),
      mg("aine", "AINE en altas dosis", "riesgoso", "Riesgo gástrico y renal en una adulta mayor."),
    ],
  },
  debrief: {
    diagnosis: "Osteoporosis posmenopáusica y por corticoides, con fractura por fragilidad de D12, en mujer de 74 años.",
    pathologies: [
      { name: "Osteoporosis", role: "principal", why: "Disminución de masa y calidad ósea." },
      { name: "Fractura vertebral por fragilidad", role: "asociada", why: "Evento centinela." },
      { name: "Mieloma, metástasis, osteomalacia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: déficit de estrógenos, edad, corticoides, tabaco y bajo peso.",
      "Mecanismo: predomina la resorción por osteoclastos, y se pierden trabéculas.",
      "Consecuencia: fracturas con traumas mínimos, cifosis, pérdida de talla, dolor crónico.",
    ],
    epidemiology:
      "En Argentina, cerca de una de cada cuatro mujeres mayores de 50 años tiene osteoporosis. Una fractura vertebral aumenta varias veces el riesgo de nuevas fracturas. Muchas pasan inadvertidas y, por eso, una cifosis o una pérdida de talla deben hacer pensar en ellas.",
    management: [
      "Excluir banderas rojas.",
      "Analgesia y movilización temprana.",
      "Densitometría y causas secundarias.",
      "Bifosfonato, calcio, vitamina D y prevención de caídas.",
    ],
    sources: ["Asociación Argentina de Osteología y Metabolismo Mineral — Guías de osteoporosis.", "Sociedad Argentina de Osteoporosis — Recomendaciones."],
    pearls: ["Fractura por fragilidad = osteoporosis, aun sin densitometría.", "Pérdida de talla: buscá fracturas.", "Tratá también el riesgo de caídas."],
    pitfalls: ["No tratar tras la fractura.", "Reposo prolongado."],
    tribunal: [
      qa("¿Cómo se define la osteoporosis por densitometría?", "Un T-score menor o igual a -2,5; de -1 a -2,5 es osteopenia. En posmenopáusicas y mayores de 50 años se usa el T-score."),
      qa("¿Cómo se toman los bifosfonatos orales?", "En ayunas, con agua y permaneciendo erguido 30 minutos, para evitar esofagitis."),
      qa("¿Qué efectos adversos raros tienen?", "Osteonecrosis de la mandíbula y fractura atípica de fémur, con tratamientos prolongados."),
    ],
  },
};
