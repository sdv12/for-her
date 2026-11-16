import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cefaleaPostpuncion: ClinicalCase = {
  id: "cefalea-postpuncion",
  level: 2,
  area: "Neurología",
  setting: "Internación",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Cesárea programada hace 2 días con anestesia raquídea. Amamanta." },
  frequency: "frecuente",
  intro: "“Cuando me siento a darle la teta me explota la cabeza. Acostada se me pasa.”",
  vitals: { TA: "118/74 mmHg", FC: "78 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("postural", "¿Cambia con la posición?", "clave", "“De pie o sentada es terrible a los pocos minutos; acostada mejora en un rato.”", "Cefalea ortostática: hipotensión de líquido cefalorraquídeo."),
    act("inicio", "¿Cuándo empezó?", "clave", "“Ayer a la mañana, al día siguiente de la cesárea.”", "Entre 24 y 72 horas de la punción."),
    act("localizacion", "¿Dónde duele?", "util", "“Frente y nuca, y me tira el cuello.”", "Típico."),
    act("alarma", "¿Fiebre, vista borrosa, convulsiones, debilidad?", "clave", "“No. Escucho como un zumbido.”", "Descarta preeclampsia, meningitis y trombosis venosa."),
    act("presion", "¿Tuvo presión alta en el embarazo?", "clave", "“No, siempre bien.”", "La preeclampsia posparto es el diferencial que no se puede perder."),
    act("bebe", "¿Cómo está el bebé?", "neutro", "“Hermoso.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Sin foco, sin rigidez de nuca verdadera, fondo de ojo normal.", "Normal: apoya causa benigna."),
    act("puncion", "Sitio de punción", "util", "Sin signos de infección.", "Descarta absceso."),
    act("ta-de-pie", "Presión de pie", "util", "122/76 mmHg.", "Sin hipertensión."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Cefalea ortostática después de una punción dural.", "No requiere estudios si el examen es normal."),
    study("Laboratorio", "lab-preeclampsia", "Hemograma, plaquetas, transaminasas y proteinuria", "util", "Normales.", "Descarta preeclampsia posparto."),
    study("Imágenes", "rmn", "Resonancia con gadolinio", "innecesario", "No se pidió.", "Se reserva para atípicos o con signos de alarma."),
    study("Otros", "puncion-lumbar", "Nueva punción lumbar para medir presión", "riesgoso", "No se hizo.", "Agrega otra pérdida de líquido."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cppd", "Cefalea pospunción dural después de anestesia raquídea", true, "Cefalea ortostática a las 24 horas de la raquídea, con acúfenos, examen normal y sin hipertensión."),
      dx("preeclampsia", "Preeclampsia posparto", false, "Presión y laboratorio normales."),
      dx("trombosis", "Trombosis venosa cerebral", false, "No es postural y suele dar foco o convulsiones."),
      dx("meningitis", "Meningitis", false, "Sin fiebre ni rigidez."),
      dx("tensional", "Cefalea tensional por el cansancio", false, "La relación postural es demasiado clara."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("analgesia", "Paracetamol y AINE compatibles con la lactancia", "clave", "Primera línea."),
      mg("cafeina", "Cafeína", "util", "Alivio transitorio; dosis moderadas en lactancia."),
      mg("hidratacion", "Hidratación adecuada y reposo a demanda", "clave", "Sostén."),
      mg("parche", "Parche hemático epidural si persiste 24–48 horas o es invalidante", "clave", "Tratamiento definitivo con alta eficacia."),
      mg("explicar", "Explicar la causa y que suele resolverse en 1 semana", "util", "Tranquiliza."),
      mg("opioides", "Morfina", "riesgoso", "Sedación del bebé y no trata la causa."),
      mg("suspender-lactancia", "Suspender la lactancia por la cefalea", "innecesario", "No hay motivo."),
    ],
  },
  debrief: {
    diagnosis: "Cefalea pospunción dural a las 24 horas de una anestesia raquídea para cesárea, en una puérpera de 31 años.",
    pathologies: [
      { name: "Cefalea pospunción dural", role: "principal", why: "Pérdida de LCR por el orificio dural." },
      { name: "Puerperio", role: "asociada", why: "Grupo de mayor riesgo." },
      { name: "Preeclampsia posparto, trombosis venosa cerebral", role: "diferencial", why: "Graves y obligatorios de descartar." },
    ],
    reasoning: [
      "Causa: orificio en la duramadre por la aguja.",
      "Mecanismo: la pérdida de LCR desciende el encéfalo de pie y dilata compensatoriamente las venas.",
      "Consecuencia: cefalea ortostática que puede durar días.",
    ],
    epidemiology:
      "Ocurre en el 1 al 2 % de las raquídeas con agujas finas punta de lápiz y en más de la mitad de las punciones accidentales con aguja epidural. Es más frecuente en mujeres jóvenes, embarazadas y personas de bajo peso.",
    management: [
      "Descartar causas graves.",
      "Analgesia, hidratación y cafeína.",
      "Parche hemático si persiste o es invalidante.",
    ],
    sources: ["Federación Argentina de Asociaciones de Anestesia — Cefalea pospunción dural.", "Obstetric Anaesthetists' Association — Treatment of obstetric post-dural puncture headache."],
    pearls: ["Ortostática = pospunción.", "Siempre descartá preeclampsia en la puérpera.", "Parche hemático: más del 70 % de éxito."],
    pitfalls: ["Atribuir toda cefalea posparto a la punción.", "Morfina."],
    tribunal: [
      qa("¿Qué características tiene la cefalea pospunción dural?", "Aparece dentro de los 5 días, empeora en minutos de pie y mejora acostada; puede dar acúfenos, rigidez de nuca y fotofobia."),
      qa("¿Cómo se previene?", "Con agujas finas de punta de lápiz; el reposo en cama posterior no la previene."),
      qa("¿Qué es el parche hemático epidural?", "La inyección de sangre autóloga en el espacio epidural que sella el orificio dural y alivia en horas."),
    ],
  },
};
