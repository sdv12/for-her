import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const depresionMayor: ClinicalCase = {
  id: "depresion-mayor",
  level: 1,
  area: "Salud mental",
  setting: "CAPS",
  patient: { age: 42, ageUnit: "años", sex: "F", context: "Docente. Se separó hace cuatro meses." },
  frequency: "muy-frecuente",
  intro: "“Vengo porque no duermo bien y estoy cansada todo el tiempo. No tengo ganas de nada, ni de ver a mis hijos. Pensé que era el estrés.”",
  vitals: { TA: "118/76 mmHg", FC: "72 lpm", "T°": "36,3 °C", Peso: "61 kg" },
  anamnesis: [
    act("animo", "¿Cómo está tu ánimo la mayor parte del día? ¿Disfrutás lo que antes te gustaba?", "clave", "“Triste casi todos los días. No disfruto nada, ni cocinar, que me encantaba.”", "Ánimo deprimido y anhedonia: los dos síntomas centrales de la depresión."),
    act("tiempo", "¿Desde cuándo te sentís así?", "clave", "“Hace unos dos meses, todos los días.”", "Para el diagnóstico de episodio depresivo mayor se requieren al menos dos semanas."),
    act("suicidio", "¿Pensaste que no vale la pena vivir o en hacerte daño?", "clave", "“A veces pienso que sería mejor no despertarme, pero no haría nada por mis hijos.”", "Preguntar por ideación suicida no la induce y es obligatorio: define el riesgo y la conducta."),
    act("somaticos", "¿Cómo dormís, comés y te concentrás?", "clave", "“Me despierto a las 4 y no me duermo más. Bajé 4 kilos. No me concentro en las clases.”", "Insomnio, pérdida de peso y de concentración completan los criterios."),
    act("bipolar", "¿Alguna vez tuviste días de mucha energía, sin dormir y haciendo muchas cosas?", "clave", "“No, nunca.”", "Descartar bipolaridad antes de indicar un antidepresivo (puede inducir manía)."),
    act("consumo", "¿Tomás alcohol, pastillas para dormir u otras sustancias?", "util", "“Una copa de vino a la noche para dormir.”", "El consumo puede causar o agravar los síntomas."),
    act("red", "¿Con quién contás?", "util", "“Mi hermana y una amiga.”", "La red de apoyo es un factor protector."),
    act("materia", "¿Qué materia das?", "neutro", "“Lengua.”", "No orienta."),
  ],
  exam: [
    act("aspecto", "Aspecto, discurso y psicomotricidad", "clave", "Hipomímica, discurso lento, llanto fácil; lúcida y orientada.", "Signos objetivos del episodio depresivo; sin psicosis."),
    act("tiroides", "Palpación tiroidea y signos de hipotiroidismo", "util", "Tiroides normal, sin bradicardia ni piel seca.", "El hipotiroidismo es un diferencial a descartar."),
    act("lesiones", "Buscar lesiones autoinfligidas", "util", "Sin lesiones.", "Parte de la evaluación del riesgo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, TSH, glucemia, función renal y hepática", "util", "Normales.", "Descartan causas orgánicas (anemia, hipotiroidismo) antes del tratamiento."),
    study("Otros", "phq9", "Cuestionario PHQ-9", "util", "Puntaje 17: depresión moderadamente grave.", "Mide la gravedad y permite seguir la respuesta al tratamiento."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "innecesario", "No se realizó.", "Sin signos neurológicos no aporta al diagnóstico de depresión."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("depresion", "Episodio depresivo mayor moderado, con ideación de muerte pasiva sin plan", true, "Ánimo deprimido y anhedonia por más de dos semanas, con insomnio, pérdida de peso, cansancio y dificultad para concentrarse, que afectan su vida."),
      dx("duelo", "Reacción de adaptación normal a la separación", false, "La intensidad, la duración y el deterioro funcional superan una reacción esperable."),
      dx("bipolar", "Trastorno bipolar en fase depresiva", false, "Nunca tuvo episodios de manía ni hipomanía."),
      dx("hipotiroidismo", "Hipotiroidismo", false, "Examen y TSH normales."),
      dx("ansiedad", "Trastorno de ansiedad generalizada", false, "Predominan la tristeza y la anhedonia, no la preocupación excesiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("isrs", "Antidepresivo ISRS (sertralina o fluoxetina) con aumento gradual, explicando que tarda 2 a 4 semanas en hacer efecto", "clave", "Primera línea en la depresión moderada; la adherencia mejora si se anticipan la demora y los efectos adversos."),
      mg("psicoterapia", "Psicoterapia (por ejemplo, cognitivo-conductual) y seguimiento por el equipo de salud mental", "clave", "Combinada con medicación es lo más eficaz en la depresión moderada."),
      mg("plan", "Plan de seguridad: pautas de alarma, red de apoyo y control en 1 a 2 semanas", "clave", "Hay ideación de muerte: el seguimiento cercano es parte del tratamiento."),
      mg("alcohol", "Suspender el alcohol y medidas de higiene del sueño", "util", "El alcohol empeora el ánimo y el sueño."),
      mg("benzo", "Benzodiacepinas como único tratamiento", "riesgoso", "No tratan la depresión, generan dependencia y son peligrosas en sobredosis."),
      mg("internacion", "Internación involuntaria", "innecesario", "No hay riesgo cierto e inminente (Ley 26.657): se trata en forma ambulatoria."),
    ],
  },
  debrief: {
    diagnosis: "Episodio depresivo mayor moderado, con ideación de muerte pasiva sin plan, en mujer de 42 años con estresor reciente.",
    pathologies: [
      { name: "Episodio depresivo mayor", role: "principal", why: "Cumple los criterios: cinco o más síntomas por más de dos semanas con deterioro." },
      { name: "Consumo de alcohol para dormir", role: "asociada", why: "Agrava el cuadro." },
      { name: "Trastorno bipolar, hipotiroidismo, duelo", role: "diferencial", why: "Se descartan con el interrogatorio y el laboratorio." },
    ],
    reasoning: [
      "Causa: interacción entre vulnerabilidad (genética, antecedentes) y estresores (la separación, la sobrecarga).",
      "Mecanismo: alteración de los circuitos de la recompensa y del ánimo (serotonina, noradrenalina, dopamina), con hiperactividad del eje del estrés.",
      "Consecuencia: tristeza, anhedonia, síntomas somáticos (sueño, apetito, energía), deterioro funcional y riesgo de suicidio.",
    ],
    epidemiology:
      "La depresión es uno de los trastornos mentales más frecuentes y una de las principales causas de discapacidad en el mundo. Es casi el doble de frecuente en mujeres, con pico entre los 20 y los 50 años. La mayoría se atiende y se puede tratar en el primer nivel de atención.",
    management: [
      "Diagnóstico clínico con criterios y evaluación del riesgo suicida en cada consulta.",
      "Descartar causas orgánicas, consumo y bipolaridad.",
      "Leve: psicoterapia y seguimiento. Moderada a grave: antidepresivo más psicoterapia.",
      "Mantener el antidepresivo 6 a 12 meses después de la remisión.",
      "Derivar o internar si hay riesgo cierto e inminente, psicosis o falta de respuesta.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos para la atención de la depresión en el primer nivel.", "Ley 26.657 de Salud Mental.", "Ley 27.130 de Prevención del Suicidio."],
    pearls: ["Ánimo deprimido o anhedonia, más de dos semanas.", "Siempre preguntar por suicidio.", "Antes del antidepresivo, preguntar por manía."],
    pitfalls: ["Tratar solo el insomnio con benzodiacepinas.", "Suspender el antidepresivo apenas mejora."],
    tribunal: [
      qa("¿Cuáles son los criterios de episodio depresivo mayor?", "Cinco o más síntomas durante al menos dos semanas, con ánimo deprimido o anhedonia obligatoriamente: alteración del sueño, del apetito o peso, fatiga, enlentecimiento o agitación, culpa o inutilidad, dificultad para concentrarse e ideas de muerte o suicidio, con malestar o deterioro."),
      qa("¿Cuándo hace efecto un ISRS y cuánto tiempo se mantiene?", "Empieza a actuar en 2 a 4 semanas y el efecto pleno se ve a las 6 a 8; se mantiene al menos 6 a 12 meses después de la remisión y se retira en forma gradual."),
      qa("¿Qué es el síndrome serotoninérgico?", "Un exceso de serotonina por fármacos (ISRS combinados con tramadol, IMAO, triptanes u otros) con agitación, temblor, clonus, hiperreflexia, fiebre, taquicardia y diarrea; se suspenden los fármacos y se dan medidas de sostén."),
    ],
  },
};
