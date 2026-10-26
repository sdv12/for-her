import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const bronquiolitis: ClinicalCase = {
  id: "bronquiolitis-lactante",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 7, ageUnit: "meses", sex: "M", context: "Julio. Lo trae la mamá." },
  frequency: "muy-frecuente",
  intro:
    "“Hace tres días que tiene mocos y tos, y desde ayer respira agitado. Toma menos la teta y está más molesto.” Es invierno y la guardia está llena de lactantes con cuadros respiratorios.",
  vitals: { FC: "158 lpm", FR: "58 rpm", "T°": "37,8 °C", "SatO₂": "94 % (aire ambiente)", Peso: "8 kg" },
  anamnesis: [
    act("inicio", "¿Cómo empezó y desde cuándo?", "clave", "“Primero fueron mocos y estornudos, hace tres días. Después empezó la tos y ayer la respiración rápida.”", "El pródromo catarral de 2–3 días seguido de tos y dificultad respiratoria es la evolución típica de la bronquiolitis viral."),
    act("primer", "¿Es la primera vez que le pasa algo así?", "clave", "“Sí, nunca le había pasado.”", "Bronquiolitis = primer episodio de sibilancias en menores de 2 años. Si fuera recurrente, pensarías en síndrome bronquial obstructivo recurrente o asma del lactante."),
    act("alimentacion", "¿Cómo está comiendo? ¿Moja los pañales?", "clave", "“Toma la mitad de lo de siempre, se cansa al tomar. Hoy mojó cuatro pañales.”", "La tolerancia oral y la diuresis definen si puede seguir en casa: el trabajo respiratorio aumentado le impide alimentarse y lo expone a deshidratarse."),
    act("antecedentes", "¿Nació a término? ¿Tiene alguna enfermedad o internación?", "clave", "“Nació a las 39 semanas, sano. Nunca estuvo internado.”", "Prematurez, cardiopatías congénitas, displasia broncopulmonar, inmunodeficiencias y edad menor de 3 meses son factores de riesgo de evolución grave."),
    act("apneas", "¿Hizo pausas en la respiración o se puso morado?", "clave", "“No, nunca.”", "Las apneas son criterio de internación, sobre todo en menores de 3 meses."),
    act("contactos", "¿Hay alguien resfriado en la casa? ¿Va a guardería?", "util", "“El hermano de 4 años está resfriado. Él no va a guardería.”", "Contexto epidemiológico: contagio intradomiciliario en temporada de virus respiratorios."),
    act("tabaco", "¿Alguien fuma en la casa?", "util", "“El papá fuma, pero en el patio.”", "El humo de tabaco (aun fuera del ambiente) es factor de riesgo de bronquiolitis y de peor evolución: es una intervención de prevención."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí, todas las del calendario.”", "Permite indicar antigripal si correspondiera y revisar prevención; no cambia el manejo agudo."),
    act("diarrea", "¿Tuvo diarrea?", "neutro", "“No.”", "No orienta en este cuadro."),
  ],
  exam: [
    act("trabajo", "Inspección del trabajo respiratorio", "clave", "Tiraje subcostal e intercostal; sin aleteo nasal ni quejido. Tórax hiperinsuflado.", "El tiraje mide el esfuerzo respiratorio y entra en el puntaje de gravedad."),
    act("auscultacion", "Auscultación pulmonar", "clave", "Sibilancias inspiratorias y espiratorias bilaterales, rales crepitantes finos en ambas bases, espiración prolongada.", "Sibilancias + crepitantes difusos y bilaterales: obstrucción de la vía aérea pequeña. Un foco localizado haría pensar en neumonía."),
    act("tal", "Puntaje de Tal", "clave", "FR 58 → 2 · sibilancias inspiratorias y espiratorias → 2 · tiraje subcostal e intercostal → 2 · cianosis no → 0. Total: 6 (obstrucción moderada).", "El puntaje de Tal (frecuencia respiratoria, sibilancias, tiraje y cianosis o saturación, según la versión) clasifica la gravedad: hasta 4 leve, 5 a 8 moderada, 9 o más grave. Guía el tratamiento y la internación."),
    act("hidratacion", "Estado de hidratación", "clave", "Mucosas semihúmedas, llora con lágrimas, relleno capilar menor de 2 segundos.", "No hay deshidratación: puede intentarse la vía oral fraccionada."),
    act("otoscopia", "Otoscopía", "util", "Tímpanos normales.", "La otitis media aguda acompaña con frecuencia a las infecciones virales en lactantes; si la tuviera, sí cambiaría el tratamiento."),
    act("abdomen", "Palpación abdominal", "neutro", "Abdomen blando; hígado palpable a 2 cm del reborde, descendido por la hiperinsuflación.", "El “hígado bajo” en bronquiolitis suele ser descenso por el diafragma aplanado, no hepatomegalia real."),
  ],
  studies: [
    study("Otros", "oximetria", "Oximetría de pulso seriada", "clave", "94–95 % en aire ambiente en controles sucesivos.", "Define la necesidad de oxígeno: es la medición que sí cambia la conducta."),
    study("Microbiología", "viral", "Panel viral en aspirado nasofaríngeo", "util", "Virus sincicial respiratorio (VSR) positivo.", "No cambia el tratamiento; sirve en internados para agrupar pacientes (cohortes) y para la vigilancia epidemiológica."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "Hiperinsuflación y engrosamiento peribronquial; atelectasia laminar en lóbulo superior derecho.", "No se pide de rutina: la bronquiolitis es un diagnóstico clínico. La atelectasia suele confundirse con neumonía y lleva a indicar antibióticos sin necesidad."),
    study("Laboratorio", "hemograma", "Hemograma y PCR", "innecesario", "Leucocitos 11.200 con linfocitosis; PCR levemente elevada.", "No ayuda a decidir: no diferencia viral de bacteriana en este contexto."),
    study("Laboratorio", "gases", "Gasometría arterial", "innecesario", "pH 7,37, pCO₂ 42.", "Reservada para formas graves con sospecha de insuficiencia respiratoria (agotamiento, hipercapnia)."),
    study("Microbiología", "hemocultivo", "Hemocultivos", "innecesario", "Sin desarrollo.", "Sin sospecha de infección bacteriana invasiva no corresponden."),
  ],
  diagnosis: {
    prompt: "Con lo que tenés, ¿cuál es tu diagnóstico principal?",
    options: [
      dx("bronquiolitis", "Bronquiolitis aguda, obstrucción moderada", true, "Primer episodio de sibilancias en un menor de 2 años, en invierno, con pródromo catarral y signos de obstrucción difusa de la vía aérea pequeña."),
      dx("neumonia", "Neumonía bacteriana", false, "Pensarías en neumonía ante fiebre alta, mal estado general y hallazgos focales (rales localizados, soplo tubario, consolidación). Acá todo es difuso y bilateral."),
      dx("sbor", "Síndrome bronquial obstructivo recurrente", false, "Requiere episodios repetidos de sibilancias. Este es el primero."),
      dx("cuerpo", "Cuerpo extraño en la vía aérea", false, "Se sospecha ante un inicio brusco, con atragantamiento y sin pródromo catarral, y con hallazgos asimétricos."),
      dx("cardio", "Insuficiencia cardíaca por cardiopatía congénita", false, "Daría soplo, hepatomegalia verdadera, sudoración con la alimentación y mala progresión de peso desde antes."),
    ],
  },
  management: {
    prompt: "Tal 6, SatO₂ 94 %, toma la mitad de lo habitual. ¿Qué indicás? Marcá todo lo que harías.",
    options: [
      mg("aspiracion", "Aspiración de secreciones nasales y posición semisentada", "clave", "Los lactantes respiran por la nariz: desobstruirla mejora el trabajo respiratorio y la alimentación."),
      mg("hidratacion", "Alimentación fraccionada y sostener la lactancia; hidratación por sonda o EV si no tolera", "clave", "Asegurar el aporte es parte central del tratamiento de sostén."),
      mg("oxigeno", "Oxígeno solo si la saturación cae por debajo del umbral recomendado (en general < 92 %)", "clave", "La hipoxemia es la indicación del oxígeno; con 94 % se controla de forma seriada."),
      mg("reevaluar", "Reevaluar en 1–2 horas: si empeora o no tolera la vía oral, internar; si mejora, alta con pautas de alarma y control en 24 h", "clave", "La decisión de internar depende de la evolución, la saturación, la alimentación y los factores de riesgo."),
      mg("salbutamol", "Prueba con salbutamol en aerosol y continuar solo si hay respuesta clara", "util", "No se usa de rutina; puede probarse y se suspende si no hay mejoría objetiva."),
      mg("corticoides", "Corticoides sistémicos", "innecesario", "No modifican la evolución de la bronquiolitis."),
      mg("antibioticos", "Amoxicilina", "innecesario", "La etiología es viral: solo si hay sobreinfección bacteriana documentada (por ejemplo, otitis media aguda)."),
      mg("kine", "Kinesioterapia respiratoria de rutina", "innecesario", "No mostró beneficio en bronquiolitis y molesta al lactante."),
      mg("antitusivos", "Antitusivos o mucolíticos", "riesgoso", "Contraindicados en menores de 2 años: no sirven y pueden ser tóxicos."),
    ],
  },
  debrief: {
    diagnosis: "Bronquiolitis aguda (probable VSR), obstrucción moderada (Tal 6), sin hipoxemia.",
    pathologies: [
      { name: "Bronquiolitis aguda", role: "principal", why: "Primer episodio de obstrucción bronquial en un menor de 2 años, en invierno, con pródromo catarral." },
      { name: "Neumonía", role: "diferencial", why: "Se piensa ante fiebre alta, compromiso general y hallazgos focales." },
      { name: "Síndrome bronquial obstructivo recurrente / asma del lactante", role: "diferencial", why: "Si los episodios se repiten." },
      { name: "Cuerpo extraño en vía aérea", role: "diferencial", why: "Inicio súbito con atragantamiento, sin pródromo, hallazgos asimétricos." },
      { name: "Cardiopatía congénita con insuficiencia cardíaca", role: "diferencial", why: "Soplo, hepatomegalia verdadera, mala progresión de peso." },
      { name: "Otitis media aguda", role: "asociada", why: "Complicación frecuente de las infecciones virales en lactantes." },
    ],
    reasoning: [
      "Causa: el VSR (también rinovirus, metapneumovirus, influenza, parainfluenza, adenovirus) infecta el epitelio de la vía aérea pequeña.",
      "Mecanismo: necrosis del epitelio ciliado, edema de la submucosa y tapones de moco y detritus en bronquiolos muy finos. Como la resistencia aumenta a la cuarta potencia de la caída del radio (Poiseuille), un poco de edema obstruye mucho en un lactante.",
      "Consecuencia: atrapamiento aéreo (hiperinsuflación, sibilancias, espiración prolongada), atelectasias en parches y alteración V/Q → hipoxemia; más trabajo respiratorio (taquipnea, tiraje) que le impide alimentarse → riesgo de deshidratación.",
      "Por eso el tratamiento es de sostén: oxígeno si hay hipoxemia, hidratación y nariz libre. Broncodilatadores y corticoides no cambian el curso en la mayoría.",
    ],
    epidemiology:
      "Es la primera causa de internación en menores de 2 años durante el invierno en Argentina (infecciones respiratorias agudas bajas, campaña de invierno). Pico entre los 2 y 6 meses, algo más frecuente en varones. Riesgo de forma grave: menores de 3 meses, prematuros, cardiopatías congénitas, displasia broncopulmonar, inmunodeficiencias, falta de lactancia, hacinamiento y humo de tabaco.",
    management: [
      "Evaluar gravedad con el puntaje de Tal y la oximetría; buscar factores de riesgo y criterios de internación (hipoxemia, apneas, mala tolerancia oral, Tal grave, menores de 3 meses con dificultad respiratoria).",
      "Tratamiento de sostén: desobstrucción nasal, posición semisentada, alimentación fraccionada, hidratación y oxígeno cuando hay hipoxemia.",
      "Prueba broncodilatadora opcional, suspendiéndola si no hay respuesta. No corticoides, no antibióticos sin foco bacteriano, no antitusivos ni mucolíticos, no kinesioterapia de rutina.",
      "Alta con pautas de alarma (dificultad respiratoria, rechazo del alimento, apneas, cianosis, fiebre persistente) y control en 24 horas.",
      "Prevención: lactancia, ambiente libre de humo, lavado de manos. Calendario Nacional: vacuna contra VSR para embarazadas entre las 32 y 36 semanas y antigripal a partir de los 6 meses; anticuerpo monoclonal (palivizumab) para prematuros y cardiópatas según criterios del Ministerio de Salud.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Recomendaciones para el manejo de las infecciones respiratorias agudas bajas en menores de 2 años.",
      "Ministerio de Salud de la Nación — Infecciones respiratorias agudas: campaña de invierno y vigilancia.",
      "Ministerio de Salud de la Nación — Calendario Nacional de Vacunación (vacuna contra VSR en embarazadas, antigripal).",
    ],
    pearls: [
      "La bronquiolitis es un diagnóstico clínico: no hace falta radiografía ni laboratorio en la forma típica.",
      "Definición para el tribunal: primer episodio de sibilancias en un menor de 2 años, precedido por un cuadro catarral, en época epidémica.",
      "Tratamiento en tres palabras: oxígeno, hidratación, desobstrucción.",
    ],
    pitfalls: [
      "Pedir radiografía, ver una atelectasia y tratarla como neumonía con antibióticos.",
      "Indicar corticoides o mucolíticos.",
      "Olvidar preguntar por la alimentación y la diuresis.",
    ],
  },
};
