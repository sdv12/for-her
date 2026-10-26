import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const panico: ClinicalCase = {
  id: "ataque-de-panico",
  level: 2,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Estudiante y trabaja en un call center." },
  frequency: "muy-frecuente",
  intro: "“Estaba en el subte y de golpe sentí que el corazón se me salía, no podía respirar, me hormigueaban las manos y pensé que me iba a morir. Es la tercera vez este mes.”",
  vitals: { TA: "128/80 mmHg", FC: "104 lpm", FR: "24 rpm", "T°": "36,5 °C", "SatO₂": "99 %", Glucemia: "92 mg/dl" },
  anamnesis: [
    act("pico", "¿Cuánto tardó en llegar al máximo y cuánto duró?", "clave", "“Fue de golpe, a los cinco minutos estaba peor que nunca. En media hora se fue calmando.”", "Las crisis de pánico llegan a su pico en minutos y ceden en menos de una hora."),
    act("organico", "¿Tuvo dolor de pecho con el esfuerzo, desmayos, palpitaciones en reposo o falta de aire al caminar?", "clave", "“No, solo cuando me pasan estas crisis.”", "Busca causas orgánicas: arritmias, cardiopatía, TEP, asma."),
    act("sustancias", "¿Toma café, energizantes, alcohol o consume alguna sustancia? ¿Toma alguna medicación?", "clave", "“Mucho café y energizantes para estudiar. Nada más.”", "Cafeína, estimulantes, cocaína y abstinencia alcohólica o de benzodiacepinas producen o precipitan crisis."),
    act("evitacion", "¿Dejó de ir a lugares o de hacer cosas por miedo a que le pase?", "clave", "“Tengo miedo de volver al subte. Ya no voy al gimnasio.”", "La preocupación persistente y la evitación definen el trastorno de pánico y orientan a agorafobia."),
    act("suicidio", "¿Se sintió muy triste o tuvo pensamientos de hacerse daño?", "clave", "“Triste sí, por el cansancio. Pensamientos de hacerme daño no.”", "Se pregunta siempre: la ansiedad y la depresión se asocian con frecuencia, y preguntar no induce la idea."),
    act("tiroides", "¿Bajó de peso, tiene calor, temblor o diarrea?", "util", "“No.”", "El hipertiroidismo puede imitar ansiedad."),
    act("anticonceptivos", "¿Usa anticonceptivos? ¿Viajó lejos o tiene alguna pierna hinchada?", "util", "“Uso pastillas. No viajé.”", "Permite valorar el riesgo de TEP, un diferencial grave de disnea con taquicardia."),
    act("serie", "¿Qué serie está mirando?", "neutro", "“Ninguna, no tengo tiempo.”", "No orienta, aunque habla del estrés."),
  ],
  exam: [
    act("cardio", "Auscultación cardíaca y pulso", "clave", "Taquicardia regular de 104 lpm, sin soplos.", "Ritmo regular, sin soplos: aleja arritmias y valvulopatías."),
    act("pulmonar", "Auscultación pulmonar", "clave", "Murmullo vesicular normal, sin sibilancias.", "Descarta broncoespasmo."),
    act("tiroides", "Palpación de la tiroides y signos tiroideos", "util", "Tiroides normal, sin temblor fino ni exoftalmos.", "Hace menos probable el hipertiroidismo."),
    act("piernas", "Miembros inferiores", "util", "Sin edemas ni asimetrías.", "Junto con la saturación normal, aleja TEP."),
    act("tetania", "Signos de Trousseau y Chvostek", "neutro", "Negativos.", "Las parestesias de la hiperventilación son por alcalosis respiratoria; no suelen dar estos signos."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "Electrocardiograma", "clave", "Taquicardia sinusal, PR y QT normales, sin preexcitación ni signos de Brugada.", "Descarta arritmias (preexcitación, QT largo, taquicardias supraventriculares) antes de atribuir los síntomas a la ansiedad."),
    study("Laboratorio", "glucemia", "Glucemia capilar", "util", "92 mg/dl.", "La hipoglucemia puede dar síntomas adrenérgicos similares."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal (se pide para el seguimiento ambulatorio).", "Descarta hipertiroidismo."),
    study("Laboratorio", "dimero", "Dímero D", "innecesario", "Levemente elevado.", "Con saturación normal, sin factores mayores, piernas normales y síntomas que ceden, la probabilidad de TEP es muy baja; un dímero inespecífico solo agrega estudios."),
    study("Imágenes", "tc", "Tomografía de cerebro", "innecesario", "No se realizó.", "No hay síntomas neurológicos que la justifiquen."),
    study("Laboratorio", "troponina", "Troponina seriada", "innecesario", "Normal.", "Sin dolor torácico isquémico ni cambios en el ECG en una mujer joven, no aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("panico", "Crisis de pánico (probable trastorno de pánico con agorafobia)", true, "Crisis recurrentes e inesperadas, con pico en minutos, síntomas autonómicos y miedo a morir, preocupación por nuevas crisis y evitación; examen y ECG normales."),
      dx("tsv", "Taquicardia supraventricular paroxística", false, "Da palpitaciones de inicio y fin bruscos con FC muy alta (150–250) y ECG en crisis con taquicardia regular de QRS angosto; acá la FC es sinusal."),
      dx("hipertiroidismo", "Hipertiroidismo", false, "Síntomas persistentes (no en crisis), pérdida de peso, temblor, intolerancia al calor."),
      dx("tep", "Tromboembolismo pulmonar", false, "Hipoxemia, taquicardia persistente y factores de riesgo; los síntomas no ceden en minutos."),
      dx("simulacion", "No tiene nada, son nervios", false, "Las crisis de pánico son un trastorno real, frecuente y tratable; “no tiene nada” invalida a la paciente y no ofrece tratamiento."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("explicar", "Explicarle qué es una crisis de pánico, que no es peligrosa y que tiene tratamiento", "clave", "La psicoeducación reduce el miedo a morir, que alimenta el círculo de la crisis."),
      mg("respiracion", "Enseñarle técnicas de respiración lenta y de anclaje", "clave", "Ayudan a cortar la hiperventilación y la escalada de síntomas."),
      mg("derivacion", "Derivación a salud mental para terapia cognitivo-conductual y evaluación de un antidepresivo ISRS", "clave", "La TCC y los ISRS son el tratamiento de primera línea del trastorno de pánico."),
      mg("cafeina", "Reducir cafeína y energizantes", "util", "Son disparadores frecuentes."),
      mg("bzd-cronica", "Benzodiacepinas diarias por tiempo indefinido", "riesgoso", "Generan tolerancia y dependencia; si se usan, es por poco tiempo mientras actúa el tratamiento de fondo."),
      mg("bolsa", "Respirar dentro de una bolsa de papel", "riesgoso", "Puede producir hipoxemia y es peligroso si la causa real es orgánica."),
      mg("alta-nada", "Alta diciendo que “no tiene nada”, sin seguimiento", "innecesario", "Deja sin tratamiento un trastorno frecuente y aumenta las consultas repetidas."),
    ],
  },
  debrief: {
    diagnosis: "Crisis de pánico recurrentes con agorafobia incipiente (probable trastorno de pánico), con causas orgánicas razonablemente descartadas; consumo alto de cafeína.",
    pathologies: [
      { name: "Trastorno de pánico", role: "principal", why: "Crisis recurrentes, inesperadas, con preocupación persistente y evitación." },
      { name: "Agorafobia", role: "asociada", why: "Evitación de lugares donde escapar sería difícil (subte)." },
      { name: "Arritmias (TSV, preexcitación)", role: "diferencial", why: "Se descartan con el ECG." },
      { name: "Hipertiroidismo", role: "diferencial", why: "Ansiedad con signos tiroideos." },
      { name: "Tromboembolismo pulmonar", role: "diferencial", why: "Disnea y taquicardia, pero con hipoxemia y sin resolución en minutos." },
    ],
    reasoning: [
      "Causa: vulnerabilidad biológica (genética, sensibilidad al CO₂) más estrés y disparadores (cafeína, falta de sueño).",
      "Mecanismo: una sensación corporal (palpitaciones) se interpreta como catastrófica; el miedo activa el sistema simpático (amígdala, locus coeruleus), que aumenta los síntomas y confirma el miedo: es un círculo que escala en minutos.",
      "Consecuencia: palpitaciones, disnea, opresión torácica, sudoración, temblor, mareo y sensación de muerte. La hiperventilación produce alcalosis respiratoria → parestesias en manos y alrededor de la boca.",
      "El miedo a tener otra crisis lleva a evitar lugares (agorafobia) y a consultar repetidas veces a la guardia.",
    ],
    epidemiology:
      "Los trastornos de ansiedad son los trastornos mentales más frecuentes en la Argentina según el Estudio Epidemiológico de Salud Mental. Las crisis de pánico son una consulta muy frecuente en guardia, sobre todo con dolor torácico o disnea. El trastorno de pánico es dos veces más frecuente en mujeres, y empieza típicamente entre los 20 y los 35 años.",
    management: [
      "Descartar causas orgánicas con una evaluación razonable (examen, ECG, glucemia), sin estudios excesivos.",
      "Contener, explicar y validar; técnicas de respiración y anclaje.",
      "Evaluar el riesgo (ideación suicida, consumo de sustancias).",
      "Derivar a salud mental: TCC y, si corresponde, ISRS; benzodiacepinas solo por tiempo breve.",
      "Atención en el marco de la Ley Nacional de Salud Mental 26.657, con abordaje en el primer nivel y la red comunitaria.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Lineamientos para la atención de la urgencia en salud mental.",
      "Ley Nacional de Salud Mental 26.657.",
      "Estudio Epidemiológico de Salud Mental en población general de la República Argentina (Stagnaro et al.).",
    ],
    pearls: [
      "Antes de decir pánico: examen, ECG y glucemia.",
      "Las parestesias son por alcalosis respiratoria de la hiperventilación.",
      "Tratamiento de fondo: TCC e ISRS; las benzodiacepinas, cortas.",
    ],
    pitfalls: ["Decirle que “no tiene nada”.", "Pedir todos los estudios posibles.", "Dejar benzodiacepinas indefinidas."],
  },
};
