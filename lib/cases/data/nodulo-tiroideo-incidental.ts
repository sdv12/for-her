import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const noduloTiroideoIncidental: ClinicalCase = {
  id: "nodulo-tiroideo-incidental-benigno",
  level: 1,
  area: "Endocrinología",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "En un Doppler de carótidas le encontraron un nódulo tiroideo. Sin radiación en el cuello." },
  frequency: "muy-frecuente",
  intro: "“En una ecografía de las arterias del cuello vieron un nódulo en la tiroides. ¿Es cáncer?”",
  vitals: { TA: "132/82 mmHg", FC: "74 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("radiacion", "¿Recibió radioterapia en el cuello?", "clave", "“Nunca.”", "Factor de riesgo."),
    act("familia", "¿Familiares con cáncer de tiroides?", "clave", "“No.”", "Riesgo."),
    act("compresivos", "¿Ronquera, dificultad para tragar o respirar?", "clave", "“No.”", "Síntomas compresivos."),
    act("hipertiroidismo", "¿Palpitaciones, pérdida de peso?", "util", "“No.”", "Función."),
    act("crecimiento", "¿Notó que crece?", "util", "“No lo sentía.”", "Evolución."),
    act("hobby", "¿Qué hace?", "neutro", "“Ajedrez.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Palpación tiroidea", "clave", "Nódulo de 1,5 cm, blando, móvil.", "Características benignas."),
    act("ganglios", "Ganglios cervicales", "clave", "No palpables.", "Sin metástasis."),
    act("voz", "Voz", "util", "Normal.", "Sin compromiso recurrencial."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH", "clave", "Normal.", "Nódulo no funcionante."),
    study("Imágenes", "eco", "Ecografía tiroidea con clasificación TI-RADS", "clave", "Nódulo de 1,5 cm espongiforme, TI-RADS 2.", "Benigno."),
    study("Otros", "paaf", "Punción con aguja fina", "innecesario", "No se realizó.", "TI-RADS 2 no requiere punción."),
    study("Otros", "tiroidectomia", "Tiroidectomía", "riesgoso", "No se indicó.", "Sin indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nodulo-benigno", "Nódulo tiroideo incidental benigno (espongiforme, TI-RADS 2)", true, "Hallazgo incidental, TSH normal, aspecto espongiforme sin rasgos sospechosos."),
      dx("cancer", "Carcinoma papilar", false, "Sin microcalcificaciones, hipoecogenicidad ni bordes irregulares."),
      dx("adenoma-toxico", "Adenoma tóxico", false, "TSH normal."),
      dx("quiste-paratiroideo", "Adenoma paratiroideo", false, "Está dentro de la tiroides."),
      dx("hashimoto", "Hashimoto", false, "Es un nódulo aislado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tranquilizar", "Explicar que es benigno", "clave", "La mayoría lo son."),
      mg("sin-seguimiento", "Sin punción; seguimiento ecográfico opcional", "clave", "TI-RADS 2."),
      mg("consultar", "Consultar si crece o aparecen síntomas", "clave", "Pautas."),
      mg("evitar-sobreestudio", "Evitar estudios innecesarios", "util", "Sobrediagnóstico."),
      mg("levotiroxina", "Levotiroxina para achicarlo", "riesgoso", "Sin beneficio y con efectos adversos."),
      mg("pet", "PET-TC", "riesgoso", "Innecesario."),
    ],
  },
  debrief: {
    diagnosis: "Nódulo tiroideo incidental benigno (espongiforme, TI-RADS 2), en varón de 58 años.",
    pathologies: [
      { name: "Nódulo tiroideo benigno", role: "principal", why: "Hallazgo frecuente." },
      { name: "Sobrediagnóstico", role: "asociada", why: "Riesgo de estudios y cirugías innecesarias." },
      { name: "Cáncer, adenoma tóxico", role: "diferencial", why: "Lo que se descarta." },
    ],
    reasoning: [
      "Causa: hiperplasia nodular benigna.",
      "Mecanismo: crecimiento focal de folículos.",
      "Consecuencia: nódulo sin repercusión.",
    ],
    epidemiology:
      "Hasta la mitad de los adultos tiene nódulos tiroideos en la ecografía, y más del 90 % son benignos. La clasificación ecográfica decide la punción. El aumento de ecografías llevó a sobrediagnóstico de cánceres de bajo riesgo.",
    management: [
      "TSH.",
      "Ecografía con TI-RADS.",
      "Punción solo si corresponde.",
      "Evitar sobreestudio.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Nódulo tiroideo.", "ACR — TI-RADS White Paper."],
    pearls: ["Espongiforme: benigno.", "TSH primero.", "No punzar todo."],
    pitfalls: ["Levotiroxina supresiva.", "Cirugía innecesaria."],
    tribunal: [
      qa("¿Qué rasgos ecográficos sugieren cáncer?", "Hipoecogenicidad marcada, microcalcificaciones, bordes irregulares y más alto que ancho."),
      qa("¿Por qué se pide primero la TSH?", "Si está baja, se hace centellograma: un nódulo caliente casi nunca es maligno."),
      qa("¿Qué es la clasificación de Bethesda?", "Sistema para informar la citología de la punción tiroidea."),
    ],
  },
};
