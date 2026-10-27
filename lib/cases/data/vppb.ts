import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vppb: ClinicalCase = {
  id: "vertigo-posicional-paroxistico",
  level: 1,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 62, ageUnit: "años", sex: "F", context: "Jubilada. Hipertensa controlada." },
  frequency: "muy-frecuente",
  intro: "“Esta mañana, al darme vuelta en la cama, empezó a girar toda la pieza. Me duró un ratito, pero cada vez que me acuesto o me agacho vuelve. Vomité una vez.”",
  vitals: { TA: "138/82 mmHg", FC: "78 lpm", FR: "16 rpm", "T°": "36,4 °C", Glucemia: "102 mg/dl" },
  anamnesis: [
    act("tipo", "¿Gira todo o siente que se va a desmayar?", "clave", "“Gira todo, como en una calesita.”", "Vértigo verdadero (sensación de giro) orienta a patología vestibular; la sensación de desmayo (presíncope) orienta a causas cardiovasculares."),
    act("duracion", "¿Cuánto dura cada episodio?", "clave", "“Menos de un minuto, pero me deja mareada.”", "Segundos y desencadenado por la posición: típico del VPPB. Horas sugieren Ménière; días, neuritis vestibular o ACV."),
    act("posicion", "¿Qué lo desencadena?", "clave", "“Darme vuelta a la derecha en la cama, acostarme o mirar para arriba.”", "Los cambios de posición de la cabeza disparan el vértigo en el VPPB."),
    act("neuro", "¿Tuvo visión doble, dificultad para hablar o tragar, debilidad o falta de coordinación?", "clave", "“No, nada de eso.”", "Signos de alarma de ACV de fosa posterior: su ausencia tranquiliza."),
    act("audicion", "¿Escucha menos, tiene zumbidos u oído tapado?", "clave", "“No.”", "Hipoacusia, acúfenos y plenitud ótica orientan a enfermedad de Ménière."),
    act("cefalea", "¿Tiene dolor de cabeza o de cuello?", "util", "“No.”", "Cefalea o dolor cervical brusco con vértigo obligan a descartar disección vertebral o hemorragia."),
    act("previos", "¿Le pasó antes?", "util", "“Hace dos años, parecido, y se fue solo.”", "El VPPB recurre con frecuencia."),
    act("farmacos", "¿Cambió alguna medicación?", "util", "“No.”", "Algunos fármacos producen mareo (antihipertensivos, sedantes)."),
    act("traumatismo", "¿Se golpeó la cabeza hace poco?", "util", "“No.”", "Los traumatismos craneales favorecen el desprendimiento de otoconias."),
    act("nietos", "¿Tiene nietos?", "neutro", "“Cinco.”", "No orienta."),
  ],
  exam: [
    act("dix", "Maniobra de Dix-Hallpike", "clave", "Hacia la derecha: tras 5 segundos de latencia, nistagmo torsional y vertical hacia arriba, con vértigo, que dura 30 segundos y se agota al repetir. Hacia la izquierda: negativa.", "Positiva a derecha: VPPB del conducto semicircular posterior derecho (el más frecuente). La latencia y la fatigabilidad son de origen periférico."),
    act("neuro", "Examen neurológico: pares craneales, coordinación (dedo-nariz, talón-rodilla) y marcha", "clave", "Normal; marcha estable entre los episodios.", "Un examen neurológico normal y la marcha conservada alejan un ACV cerebeloso."),
    act("nistagmo-reposo", "Buscar nistagmo espontáneo en reposo", "util", "Sin nistagmo en reposo.", "Un nistagmo espontáneo persistente orientaría a neuritis vestibular o lesión central."),
    act("otoscopia", "Otoscopía", "util", "Normal.", "Descarta otitis o colesteatoma."),
    act("ta-ortostatica", "Presión acostada y de pie", "util", "Sin caída ortostática.", "Descarta hipotensión ortostática como causa de mareo."),
  ],
  studies: [
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "En un VPPB típico con examen neurológico normal no aporta; además la TC es poco sensible para ACV de fosa posterior."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se realizó.", "Se reserva para vértigo con signos centrales o atípico."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "neutro", "Normal.", "Útil si el mareo fuera presíncope; acá es vértigo posicional."),
    study("Laboratorio", "lab", "Hemograma, ionograma y glucemia", "innecesario", "Normales.", "No cambian la conducta en un VPPB."),
    study("Otros", "audiometria", "Audiometría", "neutro", "Normal para la edad.", "Útil si hay síntomas auditivos (Ménière); acá no los hay."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vppb", "Vértigo posicional paroxístico benigno del conducto posterior derecho", true, "Vértigo rotatorio breve desencadenado por los cambios de posición, Dix-Hallpike positivo a derecha con latencia y fatigabilidad, examen neurológico y audición normales."),
      dx("neuritis", "Neuritis vestibular", false, "Vértigo continuo de días, con nistagmo espontáneo y sin relación con la posición, a menudo tras un cuadro viral."),
      dx("meniere", "Enfermedad de Ménière", false, "Crisis de 20 minutos a horas con hipoacusia fluctuante, acúfenos y plenitud del oído."),
      dx("acv", "ACV de fosa posterior (cerebelo o tronco)", false, "Vértigo continuo con signos neurológicos, ataxia, imposibilidad de caminar o HINTS central."),
      dx("hipotension", "Hipotensión ortostática", false, "Da presíncope al pararse, no vértigo rotatorio al acostarse o girar en la cama."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("epley", "Maniobra de reposicionamiento de Epley", "clave", "Lleva las otoconias del conducto posterior de vuelta al utrículo: resuelve la mayoría de los casos en una o dos sesiones."),
      mg("explicar", "Explicar que es benigno, que puede recurrir y enseñar pautas de alarma neurológicas", "clave", "Tranquiliza y detecta un cuadro central."),
      mg("caidas", "Prevención de caídas: levantarse despacio, luz de noche, apoyo", "clave", "Los episodios de vértigo en adultos mayores aumentan el riesgo de caídas."),
      mg("antiemetico", "Antiemético por única vez si tiene náuseas", "util", "Alivio sintomático."),
      mg("meclizina", "Meclizina o dimenhidrinato diarios por un mes", "innecesario", "Los supresores vestibulares no curan el VPPB, retrasan la compensación central y en adultos mayores causan somnolencia y caídas."),
      mg("reposo", "Reposo en cama con la cabeza inmóvil por varios días", "innecesario", "No sirve y favorece el desacondicionamiento."),
    ],
  },
  debrief: {
    diagnosis: "Vértigo posicional paroxístico benigno del conducto semicircular posterior derecho, en mujer de 62 años.",
    pathologies: [
      { name: "VPPB del conducto posterior", role: "principal", why: "Vértigo posicional breve con Dix-Hallpike positivo." },
      { name: "Neuritis vestibular", role: "diferencial", why: "Vértigo agudo continuo periférico." },
      { name: "Enfermedad de Ménière", role: "diferencial", why: "Vértigo con síntomas auditivos." },
      { name: "ACV de fosa posterior", role: "diferencial", why: "El diagnóstico que no hay que perder." },
    ],
    reasoning: [
      "Causa: otoconias (cristales de carbonato de calcio) que se desprenden del utrículo, con la edad, tras traumatismos o en reposos prolongados.",
      "Mecanismo: las otoconias caen al conducto semicircular posterior (el más declive). Al mover la cabeza en su plano, se desplazan y arrastran la endolinfa, estimulando la cúpula como si la cabeza girara.",
      "Consecuencia: vértigo rotatorio intenso de segundos, con nistagmo torsional-vertical característico, que aparece tras una latencia y se agota (el sistema se adapta).",
      "La maniobra de Epley usa la gravedad para llevar las otoconias de vuelta al utrículo.",
    ],
    epidemiology:
      "El VPPB es la causa más frecuente de vértigo, tanto en consultorio como en guardia. Es dos veces más frecuente en mujeres y aumenta con la edad, con un pico entre los 50 y 70 años. Recurre en hasta la mitad de los pacientes en 5 años.",
    management: [
      "Distinguir vértigo de presíncope y desequilibrio; buscar signos neurológicos.",
      "Vértigo posicional episódico: Dix-Hallpike (conducto posterior) y prueba de giro en decúbito (conducto horizontal).",
      "Vértigo agudo continuo: examen HINTS (impulso cefálico, nistagmo, skew) para distinguir periférico de central.",
      "VPPB: maniobra de reposicionamiento (Epley); evitar supresores vestibulares prolongados.",
      "Imágenes solo con signos centrales, examen atípico o falta de respuesta.",
    ],
    sources: [
      "Federación Argentina de Sociedades de Otorrinolaringología — Recomendaciones sobre vértigo posicional paroxístico benigno.",
      "Sociedad Neurológica Argentina — Abordaje del paciente con vértigo agudo.",
    ],
    pearls: ["Vértigo de segundos al girar en la cama: VPPB.", "Latencia y fatigabilidad = periférico.", "Epley cura; la meclizina no."],
    pitfalls: ["Pedir tomografía a todo vértigo.", "Indicar antivertiginosos por semanas.", "No examinar la marcha y la coordinación."],
    tribunal: [
      qa("¿Cómo diferenciás un vértigo periférico de uno central?", "Periférico: vértigo intenso con náuseas, nistagmo horizontal-torsional unidireccional que se inhibe con la fijación, sin otros signos neurológicos y marcha posible. Central: nistagmo que cambia de dirección o vertical puro, signos neurológicos, ataxia marcada o imposibilidad de caminar, y examen HINTS central."),
      qa("¿Qué es el examen HINTS?", "Impulso cefálico (normal sugiere central), nistagmo (que cambia de dirección sugiere central) y desviación oblicua o skew (presente sugiere central). En el síndrome vestibular agudo continuo es más sensible que la resonancia temprana para ACV."),
      qa("¿Qué caracteriza a la enfermedad de Ménière?", "Crisis de vértigo de 20 minutos a 12 horas con hipoacusia neurosensorial fluctuante, acúfenos y plenitud ótica, por hidrops endolinfático."),
      qa("¿Cómo se hace la maniobra de Dix-Hallpike?", "Paciente sentado, se gira la cabeza 45° hacia un lado y se lo acuesta rápido con la cabeza 20–30° por debajo de la camilla; se observa el nistagmo y se repite del otro lado."),
    ],
  },
};
