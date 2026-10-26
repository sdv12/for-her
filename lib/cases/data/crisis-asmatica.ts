import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const crisisAsmatica: ClinicalCase = {
  id: "crisis-asmatica-nino",
  level: 1,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "años", sex: "M", context: "Mayo. Lo trae la mamá desde la escuela." },
  frequency: "muy-frecuente",
  intro: "“Desde anoche tiene tos y hoy en la escuela empezó con el pecho apretado y silbidos. Le di el aerosol dos veces y no le hizo mucho.”",
  vitals: { FC: "122 lpm", FR: "32 rpm", "T°": "36,9 °C", "SatO₂": "93 % (aire ambiente)", Peso: "30 kg" },
  anamnesis: [
    act("asma", "¿Tiene diagnóstico de asma? ¿Qué medicación usa todos los días?", "clave", "“Sí, desde los cinco años. Le dieron un corticoide inhalado pero lo dejamos en verano porque estaba bien.”", "El abandono del tratamiento de control es una de las causas más frecuentes de crisis."),
    act("graves", "¿Estuvo internado por asma alguna vez? ¿En terapia?", "clave", "“Una vez internado en sala, nunca en terapia.”", "Antecedentes de crisis graves o terapia intensiva marcan alto riesgo de crisis fatal."),
    act("desencadenante", "¿Qué pudo desencadenarla? ¿Estuvo resfriado o en contacto con humo o animales?", "clave", "“Está resfriado desde el fin de semana.”", "Las infecciones virales son el desencadenante más común en niños."),
    act("salbutamol", "¿Cuánto salbutamol usó y cómo lo usa?", "clave", "“Dos disparos sin aerocámara, a las 7 y a las 10.”", "Sin aerocámara llega poco fármaco al pulmón; saber cuánto usó orienta la gravedad y la dosis a dar."),
    act("habla", "¿Puede hablar frases completas? ¿Se cansa al hablar?", "util", "“Habla, pero entrecortado.”", "Hablar con frases cortas es parte de la valoración de gravedad."),
    act("fiebre", "¿Tuvo fiebre alta o dolor en un costado?", "util", "“No, nada de fiebre.”", "Fiebre alta y dolor pleural harían pensar en neumonía."),
    act("cuerpo", "¿Pudo haberse atragantado con algo?", "util", "“No, empezó de a poco con la tos.”", "Un inicio brusco con atragantamiento orienta a cuerpo extraño."),
    act("deportes", "¿Qué deporte hace?", "neutro", "“Fútbol los sábados.”", "No cambia la conducta en la crisis."),
  ],
  exam: [
    act("trabajo", "Trabajo respiratorio", "clave", "Tiraje subcostal e intercostal, uso leve de músculos accesorios. Habla con frases cortas.", "Junto con FR, saturación y sibilancias define la gravedad de la crisis."),
    act("auscultacion", "Auscultación pulmonar", "clave", "Sibilancias espiratorias difusas bilaterales, espiración prolongada; buena entrada de aire.", "Un tórax silencioso (sin sibilancias por poca entrada de aire) sería signo de gravedad extrema."),
    act("sensorio", "Estado de conciencia y coloración", "clave", "Alerta, algo ansioso, sin cianosis.", "La somnolencia o confusión indican fallo respiratorio inminente."),
    act("orl", "Rinofaringe", "util", "Rinorrea serosa, faringe congestiva.", "Confirma el desencadenante viral."),
    act("abdomen", "Palpación abdominal", "neutro", "Blando, indoloro.", "No aporta a este cuadro."),
  ],
  studies: [
    study("Otros", "oximetria", "Oximetría de pulso seriada", "clave", "93 % al ingreso; 96 % luego de la primera hora de tratamiento.", "Mide gravedad y respuesta; una saturación < 92 % tras el tratamiento inicial indica internación."),
    study("Otros", "pef", "Pico flujo espiratorio (PEF) antes y después del broncodilatador", "util", "55 % del predicho al ingreso; 78 % tras la primera hora.", "Objetiva la obstrucción y la respuesta en niños que colaboran (en general mayores de 6 años)."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "Hiperinsuflación, sin consolidaciones.", "No se pide de rutina en la crisis asmática; solo si se sospecha neumonía, neumotórax o cuerpo extraño, o si no responde."),
    study("Laboratorio", "gases", "Gasometría arterial", "innecesario", "No se realizó.", "Se reserva para crisis graves con saturación baja persistente o deterioro."),
    study("Laboratorio", "hemograma", "Hemograma y PCR", "innecesario", "Normales.", "No modifican el manejo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("asma", "Crisis asmática moderada desencadenada por infección viral", true, "Asmático conocido, sin tratamiento de control, con sibilancias difusas, tiraje, habla entrecortada, saturación 93 % y PEF 55 %: gravedad moderada."),
      dx("neumonia", "Neumonía", false, "Daría fiebre, compromiso del estado general y signos focales (rales localizados, hipoventilación)."),
      dx("cuerpo", "Cuerpo extraño en vía aérea", false, "Inicio súbito con atragantamiento, signos asimétricos y sin antecedentes de asma."),
      dx("anafilaxia", "Anafilaxia", false, "Broncoespasmo de inicio brusco con urticaria, edema o hipotensión tras un alérgeno."),
      dx("disfuncion", "Disfunción de cuerdas vocales", false, "Estridor inspiratorio sin hipoxemia, con mala respuesta a broncodilatadores."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("salbutamol", "Salbutamol con aerocámara: 4–8 disparos cada 20 minutos durante la primera hora", "clave", "Broncodilatador de rescate; el aerosol con aerocámara es tan eficaz como la nebulización."),
      mg("corticoide", "Corticoide sistémico precoz (prednisona o meprednisona 1–2 mg/kg/día por vía oral)", "clave", "Reduce la inflamación, las internaciones y las recaídas; su efecto empieza a las 4–6 horas, por eso va en la primera hora."),
      mg("oxigeno", "Oxígeno para mantener saturación ≥ 94 %", "clave", "Corrige la hipoxemia y el broncoespasmo empeorado por ella."),
      mg("alta", "Al alta: retomar corticoide inhalado, técnica con aerocámara, plan escrito y control en 48–72 h", "clave", "Sin tratamiento de control vuelve a pasar: es la intervención que previene la próxima crisis."),
      mg("ipratropio", "Agregar bromuro de ipratropio en la primera hora", "util", "Suma en crisis moderadas a graves."),
      mg("atb", "Amoxicilina", "innecesario", "El desencadenante es viral: el antibiótico no cambia la evolución."),
      mg("sedante", "Antihistamínico sedante para que descanse", "riesgoso", "Los sedantes deprimen el centro respiratorio y pueden precipitar un paro en una crisis asmática."),
    ],
  },
  debrief: {
    diagnosis: "Crisis asmática moderada en niño de 9 años, desencadenada por infección viral y por abandono del corticoide inhalado.",
    pathologies: [
      { name: "Asma bronquial (crisis moderada)", role: "principal", why: "Obstrucción reversible con sibilancias, tiraje y PEF 55 %." },
      { name: "Infección viral de vía aérea superior", role: "asociada", why: "Desencadenante de la crisis." },
      { name: "Neumonía", role: "diferencial", why: "Fiebre y signos focales." },
      { name: "Cuerpo extraño", role: "diferencial", why: "Inicio súbito y asimetría." },
      { name: "Anafilaxia", role: "diferencial", why: "Broncoespasmo con compromiso cutáneo o cardiovascular." },
    ],
    reasoning: [
      "Causa: inflamación crónica de la vía aérea (en niños, casi siempre de tipo alérgico) más un desencadenante agudo, en este caso un virus, sin tratamiento de control.",
      "Mecanismo: broncoespasmo del músculo liso, edema de la mucosa y tapones de moco reducen el calibre bronquial; el aire queda atrapado en espiración.",
      "Consecuencia: sibilancias, espiración prolongada, hiperinsuflación, más trabajo respiratorio y alteración de la ventilación-perfusión → hipoxemia.",
      "Al principio el niño hiperventila (pCO₂ baja). Una pCO₂ normal o alta en plena crisis indica agotamiento muscular.",
    ],
    epidemiology:
      "El asma es la enfermedad crónica más frecuente de la infancia: en la Argentina afecta a cerca de 1 de cada 10 escolares. En la niñez es más frecuente en varones (en la adolescencia se invierte a favor de las mujeres). Las crisis aumentan en otoño e invierno con los virus respiratorios y al volver a clases.",
    management: [
      "Valorar la gravedad (habla, FR, tiraje, sibilancias, saturación, PEF) y descartar signos de paro inminente.",
      "Primera hora: salbutamol con aerocámara cada 20 minutos, oxígeno si satura < 94 % y corticoide sistémico precoz; ipratropio en crisis moderadas o graves.",
      "Reevaluar a la hora: buena respuesta → alta; respuesta parcial → seguir en observación; mala respuesta o saturación < 92 % → internación (sulfato de magnesio en graves).",
      "Al alta: corticoide oral 3–5 días, salbutamol a demanda, retomar el corticoide inhalado, plan de acción escrito y control en 48–72 h.",
      "Educar en técnica inhalatoria y evitar desencadenantes (humo de tabaco).",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Consenso de asma bronquial en pediatría y Guía de crisis asmática.",
      "Global Initiative for Asthma (GINA), adoptada en las recomendaciones locales.",
    ],
    pearls: [
      "Tórax silencioso = gravedad extrema, no mejoría.",
      "Aerocámara con salbutamol es igual o mejor que la nebulización.",
      "El corticoide sistémico va en la primera hora, no cuando el broncodilatador fracasó.",
    ],
    pitfalls: ["Pedir radiografía de rutina.", "Dar el alta sin retomar el tratamiento de control.", "Indicar antibióticos por la tos."],
  },
};
