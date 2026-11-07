import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neurolepticoMaligno: ClinicalCase = {
  id: "sindrome-neuroleptico-maligno",
  level: 4,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 28, ageUnit: "años", sex: "M", context: "Esquizofrenia. Hace 5 días le dieron haloperidol inyectable por una descompensación." },
  frequency: "raro",
  intro: "“Desde ayer está con mucha fiebre, duro como una tabla, transpira, no responde bien y le late rápido el corazón.” (relata la madre)",
  vitals: { TA: "168/104 mmHg", FC: "128 lpm", FR: "28 rpm", "T°": "40,2 °C", "SatO₂": "95 %", Glasgow: "12/15" },
  anamnesis: [
    act("antipsicotico", "¿Qué antipsicótico recibió? ¿Cuándo? ¿Cambió la dosis?", "clave", "“Haloperidol, subieron la dosis hace 5 días.”", "Primeros días o semanas tras iniciar o aumentar."),
    act("serotoninergicos", "¿Toma antidepresivos, tramadol, éxtasis?", "clave", "“No.”", "Síndrome serotoninérgico: diferencial."),
    act("drogas", "¿Cocaína, abstinencia de alcohol, o suspendió algún fármaco como levodopa?", "clave", "“Nada de eso.”", "Otros diferenciales."),
    act("fiebre", "¿Tos, cefalea o foco infeccioso?", "util", "“Nada claro.”", "Busca infección."),
    act("deshidratacion", "¿Tomó líquidos? ¿Hace calor?", "util", "“Poco.”", "Factor de riesgo y golpe de calor."),
    act("musica", "¿Qué le gusta?", "neutro", "“El rock.”", "No orienta."),
  ],
  exam: [
    act("rigidez", "Tono muscular", "clave", "Rigidez en caño de plomo, generalizada.", "Clave. El serotoninérgico da clonus e hiperreflexia."),
    act("autonomo", "Signos autonómicos", "clave", "Fiebre, sudoración, presión lábil.", "Disautonomía."),
    act("mental", "Estado mental y reflejos", "clave", "Confuso, reflejos normales, sin clonus.", "Encefalopatía."),
  ],
  studies: [
    study("Laboratorio", "cpk", "CPK, función renal, electrolitos, orina", "clave", "CPK 18.000, creatinina 2,3, mioglobinuria, K 5,6.", "Rabdomiólisis e insuficiencia renal."),
    study("Laboratorio", "infeccion", "Hemograma, cultivos y Rx de tórax", "clave", "Leucocitos 16.000; cultivos negativos.", "Se excluye sepsis."),
    study("Imágenes", "tc-lcr", "TC y punción lumbar", "util", "Normales.", "Excluyen encefalitis y meningitis."),
    study("Otros", "repetir", "Probar otra dosis de antipsicótico para “calmarlo”", "riesgoso", "No se realizó.", "Es la causa: empeora y puede matar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("snm", "Síndrome neuroléptico maligno por haloperidol con rabdomiólisis", true, "Antipsicótico reciente, fiebre alta, rigidez en caño de plomo, disautonomía y CPK alta."),
      dx("serotonina", "Síndrome serotoninérgico", false, "Se da con clonus, hiperreflexia, diarrea y en horas, sin este fármaco."),
      dx("meningitis", "Meningoencefalitis", false, "LCR normal."),
      dx("hipertermia", "Hipertermia maligna", false, "Ocurre tras anestesia con halogenados o succinilcolina."),
      dx("catatonia", "Catatonía maligna", false, "Es muy parecida, aunque hay un fármaco desencadenante claro."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender", "Suspender de inmediato el antipsicótico", "clave", "Es lo más importante."),
      mg("soporte", "Terapia intensiva, enfriamiento activo, hidratación agresiva", "clave", "Previene la falla renal."),
      mg("benzo", "Benzodiacepinas", "clave", "Reducen rigidez y agitación."),
      mg("dantroleno", "Dantroleno o bromocriptina en formas graves", "util", "Relajante muscular y agonista dopaminérgico."),
      mg("alerta", "Reintroducir un antipsicótico solo tras 2 semanas, en baja dosis y de otro tipo", "util", "Riesgo de recurrencia."),
      mg("metoclopramida", "Metoclopramida o más haloperidol", "riesgoso", "Bloquean dopamina, y empeoran el cuadro."),
    ],
  },
  debrief: {
    diagnosis: "Síndrome neuroléptico maligno por haloperidol con rabdomiólisis e insuficiencia renal aguda, en varón de 28 años con esquizofrenia.",
    pathologies: [
      { name: "Síndrome neuroléptico maligno", role: "principal", why: "Reacción grave a bloqueantes de dopamina." },
      { name: "Rabdomiólisis e insuficiencia renal", role: "asociada", why: "Complicaciones." },
      { name: "Serotoninérgico, meningitis, catatonía", role: "diferencial", why: "Otras causas de fiebre y rigidez." },
    ],
    reasoning: [
      "Causa: bloqueo de dopamina por antipsicóticos, sobre todo de primera generación y al subir la dosis.",
      "Mecanismo: el bloqueo en hipotálamo y vía nigroestriatal causa hipertermia y rigidez.",
      "Consecuencia: rabdomiólisis, insuficiencia renal, disautonomía y muerte en 10 a 20 %.",
    ],
    epidemiology:
      "Se presenta en menos de 1 de cada 1.000 pacientes con antipsicóticos. Es más frecuente en varones jóvenes, con deshidratación, agitación y dosis altas o inyectables. También lo causan antieméticos como la metoclopramida o suspender levodopa.",
    management: [
      "Suspender el fármaco.",
      "Soporte, enfriamiento y líquidos.",
      "Benzodiacepinas; bromocriptina o dantroleno.",
      "Reinicio cauteloso.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de uso racional de psicofármacos.", "ANMAT — Farmacovigilancia."],
    pearls: ["Fiebre + rigidez + antipsicótico: SNM.", "Caño de plomo: SNM. Clonus: serotonina.", "CPK muy alta."],
    pitfalls: ["Dar más antipsicótico.", "Confundir con infección."],
    tribunal: [
      qa("¿Qué diferencia SNM del síndrome serotoninérgico?", "SNM: días, rigidez en caño de plomo, bradicinesia, hiporreflexia. Serotoninérgico: horas, hiperreflexia y clonus, diarrea, midriasis."),
      qa("¿Qué efectos extrapiramidales dan los antipsicóticos?", "Distonía aguda, acatisia, parkinsonismo y discinesia tardía."),
      qa("¿Qué efecto adverso tiene la clozapina?", "Agranulocitosis, convulsiones y miocarditis, por lo que requiere hemogramas."),
    ],
  },
};
