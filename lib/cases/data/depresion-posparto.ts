import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const depresionPosparto: ClinicalCase = {
  id: "depresion-posparto",
  level: 2,
  area: "Salud mental",
  setting: "CAPS",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Seis semanas posparto. Vino al control de su bebé." },
  frequency: "frecuente",
  intro: "“El bebé está bien, pero yo no. Lloro todo el día, no disfruto de nada, siento que soy una mala madre. Él duerme y yo no puedo dormir.”",
  vitals: { TA: "112/70 mmHg", FC: "80 lpm", Peso: "64 kg" },
  anamnesis: [
    act("tiempo", "¿Desde cuándo se siente así? ¿Todos los días?", "clave", "“Desde hace un mes, casi todo el día, todos los días.”", "Más de dos semanas con ánimo deprimido o anhedonia la mayor parte del día: episodio depresivo, no tristeza posparto."),
    act("suicidio", "¿Tuvo pensamientos de hacerse daño o de que estaría mejor muerta?", "clave", "“A veces pienso que el bebé estaría mejor sin mí, pero no haría nada.”", "Ideación pasiva sin plan: se evalúa y se hace seguimiento cercano. Preguntar no induce la idea."),
    act("bebe", "¿Tuvo pensamientos de dañar al bebé? ¿Escucha voces o cree cosas extrañas?", "clave", "“No, jamás le haría nada. Voces no.”", "Descarta psicosis puerperal (urgencia) y riesgo para el bebé."),
    act("apoyo", "¿Quién la ayuda? ¿Cómo está con su pareja?", "util", "“Mi pareja trabaja todo el día. Estoy sola con el bebé.”", "La falta de apoyo es un factor de riesgo importante y un blanco de intervención."),
    act("previos", "¿Tuvo depresión antes o durante el embarazo?", "util", "“En la adolescencia estuve muy mal.”", "El antecedente de depresión aumenta el riesgo."),
    act("lactancia", "¿Está amamantando?", "util", "“Sí, exclusivo.”", "Orienta la elección del antidepresivo."),
    act("nombre", "¿Cómo se llama el bebé?", "neutro", "“Benicio.”", "No orienta, pero acerca."),
  ],
  exam: [
    act("mental", "Examen del estado mental", "clave", "Hipotímica, llanto fácil, discurso lento, sin alteraciones del juicio ni de la sensopercepción.", "Compatible con depresión sin síntomas psicóticos."),
    act("tiroides", "Palpación tiroidea", "util", "Normal.", "La tiroiditis posparto puede dar síntomas depresivos."),
    act("vinculo", "Observar el vínculo con el bebé", "util", "Lo sostiene con cuidado, bebé bien cuidado.", "Evalúa el cuidado y el vínculo."),
  ],
  studies: [
    study("Otros", "epds", "Escala de Edimburgo (EPDS)", "clave", "Puntaje 18.", "Instrumento de tamizaje validado: ≥ 10–12 sugiere depresión; cualquier puntaje en la pregunta 10 (autolesión) exige evaluación."),
    study("Laboratorio", "tsh", "TSH y hemograma", "util", "TSH normal; Hb 11,6.", "Descarta tiroiditis posparto y anemia."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "Sin signos neurológicos no aporta."),
    study("Laboratorio", "hormonas", "Dosaje de estrógeno y progesterona", "innecesario", "No se realizó.", "No tienen utilidad diagnóstica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("dpp", "Depresión posparto (episodio depresivo mayor con inicio en el periparto)", true, "Un mes de ánimo deprimido, anhedonia, culpa, insomnio pese a que el bebé duerme, ideación pasiva, EPDS 18."),
      dx("blues", "Tristeza posparto (baby blues)", false, "Es leve, en los primeros días posparto, y se resuelve sola antes de las dos semanas."),
      dx("psicosis", "Psicosis puerperal", false, "Inicio brusco en las primeras semanas con alucinaciones, delirios y confusión: urgencia psiquiátrica."),
      dx("tiroiditis", "Tiroiditis posparto", false, "La TSH es normal."),
      dx("cansancio", "Cansancio normal del puerperio", false, "No explica la anhedonia, la culpa ni la ideación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("psicoterapia", "Derivación a salud mental para psicoterapia y seguimiento cercano", "clave", "La psicoterapia es eficaz y la base del tratamiento."),
      mg("isrs", "Antidepresivo compatible con lactancia (sertralina) por la gravedad", "clave", "En una depresión moderada a grave se suma un ISRS; la sertralina pasa muy poco a la leche."),
      mg("red", "Armar red de apoyo: pareja, familia, licencias, grupos de crianza", "clave", "Reduce la carga y mejora la evolución."),
      mg("seguridad", "Plan de seguridad y pautas de alarma (ideas de hacerse daño, de dañar al bebé)", "util", "Ante ideación, plan de seguridad y control cercano."),
      mg("suspender", "Suspender la lactancia para medicarla", "innecesario", "No hace falta: hay antidepresivos compatibles."),
      mg("normal", "Decirle que es normal y que se le va a pasar sola", "riesgoso", "Una depresión posparto no tratada puede agravarse, afecta el vínculo y el desarrollo del bebé y conlleva riesgo suicida."),
    ],
  },
  debrief: {
    diagnosis: "Depresión posparto moderada a grave con ideación pasiva, sin síntomas psicóticos, en puérpera de 6 semanas con escasa red de apoyo.",
    pathologies: [
      { name: "Depresión posparto", role: "principal", why: "Episodio depresivo mayor en el periparto." },
      { name: "Tristeza posparto", role: "diferencial", why: "Leve y transitoria." },
      { name: "Psicosis puerperal", role: "diferencial", why: "Urgencia." },
      { name: "Tiroiditis posparto y anemia", role: "diferencial", why: "Causas orgánicas tratables." },
    ],
    reasoning: [
      "Causa: vulnerabilidad previa (antecedente de depresión) más la caída abrupta de estrógenos y progesterona tras el parto, privación de sueño y estresores psicosociales.",
      "Mecanismo: los cambios hormonales afectan la regulación de neurotransmisores (serotonina, GABA) y el eje del estrés en personas susceptibles.",
      "Consecuencia: ánimo deprimido, anhedonia, culpa, insomnio, ideas de ser mala madre; puede afectar el vínculo y el desarrollo del bebé.",
      "Por eso se pesquisa en los controles del bebé y de la madre.",
    ],
    epidemiology:
      "La depresión posparto afecta a una de cada siete a diez puérperas, y en la Argentina los estudios muestran cifras similares o mayores en poblaciones vulnerables. Es más frecuente con antecedentes de depresión, violencia, falta de apoyo, embarazo no deseado y estrés económico. La tristeza posparto, en cambio, afecta a la mayoría de las puérperas y es transitoria.",
    management: [
      "Pesquisar en el embarazo y el puerperio (escala de Edimburgo).",
      "Evaluar riesgo suicida, riesgo para el bebé y síntomas psicóticos.",
      "Leve: psicoterapia y apoyo; moderada a grave: psicoterapia más ISRS compatible con lactancia.",
      "Psicosis puerperal o riesgo alto: internación conjunta si es posible.",
      "Red de apoyo, seguimiento cercano y articulación con el equipo de salud del bebé.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Recomendaciones para el abordaje de la salud mental perinatal.",
      "Ley Nacional de Salud Mental 26.657.",
    ],
    pearls: ["Más de 2 semanas = no es baby blues.", "Siempre preguntar por ideas de hacerse daño o dañar al bebé.", "Sertralina: compatible con lactancia."],
    pitfalls: ["Normalizarlo como cansancio.", "Suspender la lactancia innecesariamente.", "No pesquisar en los controles del bebé."],
  },
};
