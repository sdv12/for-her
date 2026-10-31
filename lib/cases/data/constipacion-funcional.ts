import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const constipacionFuncional: ClinicalCase = {
  id: "constipacion-funcional-nino",
  level: 1,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 6, ageUnit: "años", sex: "M", context: "Empezó primer grado en marzo." },
  frequency: "muy-frecuente",
  intro: "“Va al baño cada cinco o seis días, hace caca muy grande y dura, llora y se esconde para no ir. Ahora mancha la ropa interior y en la escuela se burlan.”",
  vitals: { FC: "92 lpm", "T°": "36,4 °C", Peso: "22 kg (percentil 50)" },
  anamnesis: [
    act("inicio", "¿Desde cuándo y cómo empezó?", "clave", "“Desde que empezó la escuela; no quiere ir al baño ahí.”", "Inicio en la etapa escolar o del control de esfínteres, con retención voluntaria: típico de la constipación funcional."),
    act("meconio", "¿Eliminó el meconio en las primeras 48 horas de vida?", "clave", "“Sí, el primer día.”", "La eliminación tardía de meconio orienta a enfermedad de Hirschsprung."),
    act("retencion", "¿Adopta posturas para aguantar?", "clave", "“Se pone duro, cruza las piernas, se para en puntas de pie.”", "Las conductas retentivas son características."),
    act("encopresis", "¿Mancha la ropa sin darse cuenta?", "util", "“Sí, casi todos los días.”", "Escurrimiento de heces líquidas alrededor de un fecaloma (incontinencia por rebosamiento)."),
    act("alarma", "¿Tiene vómitos, fiebre, distensión, sangre o bajó de peso?", "clave", "“No. A veces un hilito de sangre en el papel.”", "Sin banderas rojas; la sangre en el papel suele deberse a fisura anal."),
    act("dieta", "¿Qué come y cuánta agua toma?", "util", "“Mucha leche y fideos, pocas frutas y verduras, poca agua.”", "Dieta pobre en fibra y exceso de leche favorecen la constipación."),
    act("orina", "¿Tiene escapes de orina o infecciones urinarias?", "util", "“A veces se moja de noche.”", "La constipación se asocia a enuresis e infecciones urinarias."),
    act("juego", "¿Qué le gusta jugar?", "neutro", "“A la pelota.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal", "clave", "Masa fecal palpable en fosa ilíaca izquierda e hipogastrio, abdomen no distendido.", "Fecaloma palpable."),
    act("perianal", "Inspección perianal", "clave", "Fisura anal posterior pequeña, sin otras lesiones.", "La fisura causa dolor al evacuar y refuerza la retención."),
    act("lumbosacra", "Región lumbosacra y reflejos de miembros inferiores", "util", "Sin fosita, mechón ni lipoma; reflejos normales.", "Signos de disrafismo espinal orientarían a constipación orgánica neurológica."),
    act("crecimiento", "Peso y talla", "util", "En percentil 50.", "Un mal crecimiento sugiere causa orgánica (celiaquía, hipotiroidismo)."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen", "innecesario", "No se realizó.", "El diagnóstico es clínico; no se pide de rutina."),
    study("Laboratorio", "celiaquia", "Anticuerpos para celiaquía y TSH de rutina", "innecesario", "No se realizaron.", "Solo si hay banderas rojas, mal crecimiento o falta de respuesta."),
    study("Otros", "manometria", "Manometría anorrectal o biopsia rectal", "innecesario", "No se realizó.", "Se reservan para sospecha de Hirschsprung."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("funcional", "Constipación funcional con fecaloma, incontinencia por rebosamiento y fisura anal", true, "Deposiciones infrecuentes, duras y dolorosas, conductas retentivas, fecaloma palpable, escurrimiento y fisura, sin banderas rojas."),
      dx("hirschsprung", "Enfermedad de Hirschsprung", false, "Inicio neonatal con meconio tardío, distensión, vómitos, mal crecimiento y ampolla rectal vacía."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "Daría mal crecimiento, cansancio y otros signos; el crecimiento es normal."),
      dx("celiaquia", "Enfermedad celíaca", false, "Diarrea o constipación con distensión, mal progreso de peso y anemia."),
      dx("disrafismo", "Médula anclada (disrafismo espinal)", false, "Signos lumbosacros cutáneos, alteraciones neurológicas de miembros inferiores y vejiga neurogénica."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("desimpactacion", "Desimpactación con polietilenglicol oral en dosis altas por 3–6 días", "clave", "Elimina el fecaloma; el PEG oral es de elección en niños."),
      mg("mantenimiento", "Mantenimiento con polietilenglicol por al menos 2 meses (y hasta un mes sin síntomas)", "clave", "Las recaídas son frecuentes si se suspende pronto."),
      mg("habitos", "Sentarlo en el inodoro 5 minutos después de las comidas, con apoyo para los pies; diario de deposiciones", "clave", "El reflejo gastrocólico ayuda a recuperar el hábito."),
      mg("dieta", "Fibra, agua y menos leche", "util", "Medidas generales de apoyo."),
      mg("enemas-repetidos", "Enemas repetidos día por medio por meses", "riesgoso", "Son traumáticos, refuerzan el miedo y la retención; se prefiere la vía oral."),
      mg("reprender", "Retarlo o castigarlo por mancharse", "riesgoso", "La incontinencia es involuntaria: el castigo empeora la retención."),
    ],
  },
  debrief: {
    diagnosis: "Constipación funcional con fecaloma, incontinencia fecal por rebosamiento y fisura anal en niño de 6 años.",
    pathologies: [
      { name: "Constipación funcional", role: "principal", why: "Sin causa orgánica, con retención voluntaria." },
      { name: "Fisura anal", role: "asociada", why: "Perpetúa el ciclo de dolor y retención." },
      { name: "Hirschsprung, hipotiroidismo, celiaquía, disrafismo", role: "diferencial", why: "Causas orgánicas que se descartan con las banderas rojas." },
    ],
    reasoning: [
      "Causa: retención voluntaria por miedo al dolor o por no querer usar el baño de la escuela, con dieta pobre en fibra.",
      "Mecanismo: el recto acumula heces, se dilata y pierde sensibilidad; el colon absorbe agua y las heces se vuelven duras y grandes, lo que causa dolor y fisuras, y más retención.",
      "Consecuencia: deposiciones espaciadas y dolorosas, fecaloma y escurrimiento de heces líquidas alrededor (encopresis).",
      "Por eso primero se vacía el recto y después se mantiene la evacuación blanda por meses.",
    ],
    epidemiology:
      "La constipación funcional afecta a cerca del 10 % de los niños y explica más del 90 % de las constipaciones pediátricas. Es frecuente en los momentos de control de esfínteres, inicio del jardín y de la escuela. En niños con encopresis predominan los varones.",
    management: [
      "Diagnóstico clínico (criterios de Roma IV) y búsqueda de banderas rojas.",
      "Desimpactación con polietilenglicol oral.",
      "Mantenimiento prolongado con laxantes osmóticos y entrenamiento del hábito.",
      "Dieta, hidratación y apoyo familiar sin castigos.",
      "Estudios solo si hay banderas rojas o falta de respuesta.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Guía de constipación funcional en pediatría.", "Criterios de Roma IV para trastornos funcionales pediátricos."],
    pearls: ["Primero desimpactar, después mantener.", "Meconio tardío = pensar en Hirschsprung.", "La encopresis es involuntaria."],
    pitfalls: ["Suspender el laxante muy pronto.", "Usar enemas repetidos.", "Retar al niño."],
    tribunal: [
      qa("¿Cuáles son los criterios de Roma IV de constipación funcional en niños?", "Al menos 2 durante un mes: 2 o menos deposiciones por semana, un episodio de incontinencia por semana, conductas retentivas, deposiciones dolorosas o duras, masa fecal en el recto, heces de gran diámetro que tapan el inodoro."),
      qa("¿Qué banderas rojas orientan a constipación orgánica?", "Meconio después de las 48 h, inicio antes del mes de vida, distensión importante, vómitos biliosos, mal crecimiento, sangre en heces sin fisura, alteraciones lumbosacras o neurológicas, fiebre."),
      qa("¿Qué es la enfermedad de Hirschsprung?", "La ausencia congénita de células ganglionares en un segmento distal del colon, que no se relaja: constipación desde el nacimiento, meconio tardío, distensión y riesgo de enterocolitis. Se diagnostica con biopsia rectal."),
    ],
  },
};
