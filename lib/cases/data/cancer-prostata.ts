import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerProstata: ClinicalCase = {
  id: "cancer-de-prostata",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Su hermano tuvo cáncer de próstata. Nunca se hizo controles." },
  frequency: "frecuente",
  intro: "“Hace unos meses me levanto dos o tres veces a orinar de noche y el chorro es más flojo. Mi hermano tuvo cáncer de próstata y estoy preocupado.”",
  vitals: { TA: "136/84 mmHg", FC: "74 lpm", "T°": "36,5 °C", Peso: "80 kg" },
  anamnesis: [
    act("urinarios", "¿Cómo orinás? ¿Te cuesta empezar, el chorro es débil, te quedás con ganas?", "clave", "“Me cuesta empezar, el chorro es débil y me levanto de noche.”", "Síntomas del tracto urinario inferior: los produce sobre todo la hiperplasia benigna; el cáncer temprano suele ser asintomático."),
    act("familia", "¿A qué edad tuvo el cáncer tu hermano?", "clave", "“A los 58.”", "Familiar de primer grado con cáncer de próstata antes de los 65: mayor riesgo."),
    act("huesos", "¿Te duelen los huesos o la espalda? ¿Bajaste de peso?", "clave", "“No.”", "Descarta enfermedad metastásica sintomática."),
    act("hematuria", "¿Viste sangre en la orina?", "util", "“No.”", "Descarta otras patologías urológicas."),
    act("decision", "¿Qué sabés sobre los estudios de próstata y qué te preocupa?", "util", "“Que existe un análisis de sangre; quiero saber si tengo algo.”", "El rastreo con PSA requiere una decisión compartida."),
    act("jardin", "¿Tenés huerta?", "neutro", "“Sí, tomates.”", "No orienta."),
  ],
  exam: [
    act("tacto", "Tacto rectal", "clave", "Próstata aumentada de tamaño, con un nódulo duro e irregular en el lóbulo derecho.", "Un nódulo pétreo sugiere cáncer."),
    act("vejiga", "Palpación de la vejiga", "util", "Sin globo vesical.", "Sin retención."),
    act("columna", "Palpación de la columna", "util", "Sin dolor.", "Sin signos de metástasis óseas."),
  ],
  studies: [
    study("Laboratorio", "psa", "PSA total", "clave", "PSA 14 ng/ml.", "Elevado; con tacto anormal, indica estudio."),
    study("Imágenes", "rmn", "Resonancia multiparamétrica de próstata", "clave", "Lesión PI-RADS 5 en la zona periférica derecha.", "Guía la biopsia."),
    study("Otros", "biopsia", "Biopsia prostática guiada", "clave", "Adenocarcinoma, Gleason 4+3=7 (ISUP 3).", "Confirma y gradúa."),
    study("Imágenes", "estadificacion", "Centellograma óseo y tomografía (estadificación)", "util", "Sin metástasis.", "Enfermedad localizada."),
    study("Laboratorio", "fosfatasa", "Marcadores tumorales múltiples (CEA, CA 19-9)", "innecesario", "No se realizó.", "No sirven en el cáncer de próstata."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cap", "Adenocarcinoma de próstata localizado de riesgo intermedio (PSA 14, ISUP 3)", true, "Nódulo pétreo al tacto, PSA de 14, resonancia PI-RADS 5 y biopsia con Gleason 4+3, sin metástasis, en varón con antecedente familiar."),
      dx("hpb", "Hiperplasia prostática benigna sola", false, "La HPB agranda la próstata en forma lisa y elástica; aquí hay nódulo y biopsia positiva."),
      dx("prostatitis", "Prostatitis", false, "Habría fiebre, dolor y próstata dolorosa."),
      dx("metastasico", "Cáncer de próstata metastásico", false, "La estadificación es negativa."),
      dx("vejiga", "Cáncer de vejiga", false, "No hay hematuria y la lesión es prostática."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("opciones", "Derivar a urología y oncología para decidir en conjunto entre prostatectomía radical o radioterapia con hormonoterapia", "clave", "Son opciones curativas en el riesgo intermedio, con efectos adversos distintos que deben discutirse."),
      mg("efectos", "Informar sobre incontinencia y disfunción eréctil como efectos posibles", "clave", "Parte de la decisión compartida."),
      mg("familia", "Informar a hijos y hermanos varones sobre su riesgo y el asesoramiento", "util", "Antecedente familiar en dos generaciones."),
      mg("hpb", "Tratar también los síntomas urinarios (alfa bloqueante)", "util", "Mejora la calidad de vida."),
      mg("ignorar", "No hacer nada porque el cáncer de próstata “crece lento”", "riesgoso", "La vigilancia activa es para bajo riesgo; con ISUP 3 se recomienda tratar."),
      mg("castracion", "Hormonoterapia sola de por vida desde ahora", "innecesario", "En enfermedad localizada se prefieren tratamientos con intención curativa."),
    ],
  },
  debrief: {
    diagnosis: "Adenocarcinoma de próstata localizado de riesgo intermedio desfavorable (PSA 14, Gleason 4+3, ISUP 3) con síntomas urinarios por hiperplasia asociada, en varón de 66 años con antecedente familiar.",
    pathologies: [
      { name: "Cáncer de próstata localizado", role: "principal", why: "Adenocarcinoma sin metástasis." },
      { name: "Hiperplasia prostática benigna", role: "asociada", why: "Causa probable de los síntomas urinarios." },
      { name: "Prostatitis, cáncer de vejiga", role: "diferencial", why: "Otras causas de síntomas urinarios o PSA alto." },
    ],
    reasoning: [
      "Causa: edad, antecedentes familiares (y mutaciones como BRCA2) y factores hormonales (andrógenos).",
      "Mecanismo: proliferación de células glandulares de la zona periférica de la próstata, dependiente de andrógenos.",
      "Consecuencia: en etapas tempranas, asintomático (se detecta por PSA o tacto); luego, síntomas urinarios y metástasis óseas.",
    ],
    epidemiology:
      "El cáncer de próstata es el cáncer más frecuente en varones en Argentina y una de las principales causas de muerte por cáncer en ellos. Aumenta con la edad y con antecedentes familiares; muchos tumores son de crecimiento lento y no llegan a dar síntomas.",
    management: [
      "Rastreo con PSA como decisión compartida desde los 50 años (antes con antecedentes familiares), informando beneficios y daños.",
      "PSA elevado o tacto anormal: resonancia y biopsia.",
      "Clasificar riesgo: bajo (vigilancia activa), intermedio o alto (cirugía o radioterapia).",
      "Metastásico: hormonoterapia y otros tratamientos sistémicos.",
    ],
    sources: ["Instituto Nacional del Cáncer — Recomendaciones sobre cáncer de próstata.", "Sociedad Argentina de Urología — Consenso de cáncer de próstata."],
    pearls: ["Nódulo pétreo al tacto = biopsia.", "PSA: decisión compartida.", "Bajo riesgo: vigilancia activa."],
    pitfalls: ["Atribuir todo síntoma urinario a la HPB sin tacto.", "Pedir PSA sin explicar."],
    tribunal: [
      qa("¿Qué es el score de Gleason (ISUP)?", "Una graduación histológica que suma los dos patrones más frecuentes del tumor (de 3 a 5); se agrupa en grados ISUP 1 a 5: ISUP 1 (Gleason 6) de bajo riesgo, ISUP 2–3 (7) intermedio, ISUP 4–5 (8–10) alto."),
      qa("¿Por qué el rastreo con PSA es una decisión compartida?", "Porque puede reducir la mortalidad por cáncer de próstata, pero genera falsos positivos, biopsias innecesarias y sobrediagnóstico de tumores que nunca habrían dado problemas, con riesgo de incontinencia y disfunción eréctil por tratamientos."),
      qa("¿Qué diferencia la HPB del cáncer de próstata?", "La HPB crece en la zona de transición, es benigna, da próstata lisa, elástica y aumentada con síntomas obstructivos; el cáncer se origina sobre todo en la zona periférica, suele ser asintomático al inicio y da nódulos duros al tacto."),
    ],
  },
};
