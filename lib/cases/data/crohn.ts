import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const crohn: ClinicalCase = {
  id: "enfermedad-de-crohn",
  level: 3,
  area: "Gastroenterología",
  setting: "Consultorio",
  patient: { age: 24, ageUnit: "años", sex: "M", context: "Fumador de 10 cigarrillos diarios. Estudiante." },
  frequency: "poco-frecuente",
  intro: "“Hace seis meses tengo diarrea y dolor abajo a la derecha. Bajé 8 kilos y a veces tengo fiebrita. Además me salió una herida al lado del ano.”",
  vitals: { TA: "112/70 mmHg", FC: "92 lpm", "T°": "37,6 °C", Peso: "58 kg" },
  anamnesis: [
    act("diarrea", "¿Cómo es la diarrea? ¿Tiene sangre? ¿Te despierta de noche?", "clave", "“Líquida, a veces con moco, sin mucha sangre. Sí, me despierta.”", "La diarrea nocturna orienta a causa orgánica."),
    act("tiempo", "¿Hace cuánto? ¿Viajaste o comiste algo raro?", "clave", "“Seis meses, nada raro.”", "Cuadro crónico: aleja lo infeccioso agudo."),
    act("extra", "¿Dolor en las articulaciones, los ojos o lesiones en la piel?", "clave", "“Me duelen las rodillas y tuve unos bultos rojos en las piernas.”", "Manifestaciones extraintestinales."),
    act("tabaco", "¿Fumás?", "util", "“Sí.”", "El tabaco empeora el Crohn."),
    act("familia", "¿Hay enfermedad intestinal en tu familia?", "util", "“Un tío operado del intestino.”", "Antecedente familiar."),
    act("carrera", "¿Qué estudiás?", "neutro", "“Diseño.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor y empastamiento en fosa ilíaca derecha, sin defensa.", "Compromiso ileocecal."),
    act("perianal", "Región perianal", "clave", "Fístula perianal con secreción y plicomas.", "La enfermedad perianal es muy típica de Crohn."),
    act("piel", "Piel y boca", "util", "Eritema nodoso y aftas orales.", "Manifestaciones asociadas."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, albúmina, vitamina B12, hierro", "clave", "Hb 10,5, PCR 48, albúmina 3, B12 baja.", "Inflamación, malabsorción y déficit de B12 por compromiso ileal."),
    study("Microbiología", "heces", "Coprocultivo, C. difficile, parasitológico y calprotectina", "clave", "Cultivos negativos; calprotectina muy elevada.", "Excluye infección y confirma inflamación intestinal."),
    study("Imágenes", "colono", "Ileocolonoscopía con biopsias", "clave", "Úlceras serpiginosas salteadas en íleon terminal, empedrado; granulomas no caseificantes.", "Confirma el diagnóstico."),
    study("Imágenes", "entero", "Enterorresonancia", "util", "Engrosamiento de 15 cm de íleon, estenosis leve, sin abscesos.", "Extensión y complicaciones."),
    study("Laboratorio", "tacc", "Anticuerpos para celiaquía", "util", "Negativos.", "Diferencial de diarrea crónica."),
    study("Otros", "laparoscopia", "Laparoscopía diagnóstica de entrada", "innecesario", "No se realizó.", "Endoscopía e imágenes alcanzan: no hace falta operar para diagnosticar."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crohn", "Enfermedad de Crohn ileocolónica con fístula perianal", true, "Diarrea crónica, dolor en FID, descenso de peso, enfermedad perianal, lesiones salteadas y granulomas."),
      dx("cu", "Colitis ulcerosa", false, "Da compromiso continuo desde el recto, sangrado predominante y no afecta el íleon ni causa fístulas."),
      dx("sii", "Síndrome de intestino irritable", false, "No da pérdida de peso, fiebre, diarrea nocturna ni inflamación."),
      dx("tbc", "Tuberculosis intestinal", false, "Es un diferencial importante, pero sin necrosis caseosa ni respuesta micobacteriana."),
      dx("celiaca", "Enfermedad celíaca", false, "Anticuerpos negativos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tabaco", "Dejar de fumar", "clave", "Es la medida modificable que más cambia la evolución."),
      mg("induccion", "Inducción con corticoides (budesonida o prednisona) y antibiótico para la fístula", "clave", "Controla el brote y la infección perianal."),
      mg("biologico", "Derivar para biológico anti-TNF con o sin inmunomodulador, tras descartar TBC y hepatitis B", "clave", "La enfermedad perianal es de mal pronóstico y justifica tratamiento temprano."),
      mg("soporte", "Reponer B12 y hierro, vacunas y control nutricional", "util", "Corrige déficits y previene infecciones."),
      mg("corticoide-largo", "Corticoides como mantenimiento prolongado", "riesgoso", "No mantienen la remisión y tienen muchos efectos adversos."),
      mg("loperamida", "Solo loperamida", "riesgoso", "No trata la inflamación y puede empeorar complicaciones."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad de Crohn ileocolónica con fístula perianal y manifestaciones extraintestinales, en varón de 24 años fumador.",
    pathologies: [
      { name: "Enfermedad de Crohn", role: "principal", why: "Inflamación transmural y discontinua." },
      { name: "Fístula perianal, malabsorción", role: "asociada", why: "Complicaciones de la enfermedad." },
      { name: "Colitis ulcerosa, TBC intestinal, intestino irritable", role: "diferencial", why: "Otras causas de diarrea crónica." },
    ],
    reasoning: [
      "Causa: respuesta inmune desregulada a la microbiota en personas predispuestas, favorecida por el tabaco.",
      "Mecanismo: inflamación transmural, con granulomas, en cualquier tramo del tubo digestivo y con áreas salteadas.",
      "Consecuencia: dolor, diarrea, descenso de peso, estenosis, fístulas y abscesos.",
    ],
    epidemiology:
      "La enfermedad inflamatoria intestinal aumenta en Argentina y suele comenzar entre los 15 y los 35 años. El Crohn se asocia con el tabaco, mientras que la colitis ulcerosa es más frecuente en no fumadores. Hay que descartar TBC antes de usar biológicos.",
    management: [
      "Excluir infección e iniciar estudios endoscópicos e imágenes.",
      "Inducir la remisión con corticoides y tratar la fístula.",
      "Mantener con inmunomoduladores o biológicos.",
      "Cirugía para complicaciones; dejar de fumar.",
    ],
    sources: ["Grupo Argentino de Enfermedad Inflamatoria Intestinal — Recomendaciones.", "ECCO — Guías de enfermedad de Crohn."],
    pearls: ["Crohn: transmural, salteado, de la boca al ano, con fístulas y granulomas.", "Tabaco empeora Crohn.", "Antes del anti-TNF: TBC y hepatitis B."],
    pitfalls: ["Etiquetarlo como intestino irritable con signos de alarma.", "Mantener corticoides a largo plazo."],
    tribunal: [
      qa("¿Qué diferencia a Crohn de colitis ulcerosa?", "Crohn: cualquier tramo, salteado, transmural, granulomas, fístulas, respeta el recto. Colitis ulcerosa: colon, continua desde el recto, mucosa, sangrado, sin fístulas."),
      qa("¿Qué manifestaciones extraintestinales tiene la EII?", "Artritis, espondilitis, eritema nodoso, pioderma gangrenoso, uveítis, epiescleritis y colangitis esclerosante, esta última más ligada a colitis ulcerosa."),
      qa("¿Por qué falta B12 en el Crohn ileal?", "Porque la vitamina B12 se absorbe en el íleon terminal; la inflamación o la resección reducen su absorción."),
    ],
  },
};
