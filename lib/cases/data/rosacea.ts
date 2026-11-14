import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const rosacea: ClinicalCase = {
  id: "rosacea",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 41, ageUnit: "años", sex: "F", context: "Piel clara. Trabaja en un vivero. Usa corticoide en crema que le dio una amiga." },
  frequency: "frecuente",
  intro: "“Tengo la cara roja, granitos y me arde. Me pongo colorada con el mate caliente, el sol y el vino.”",
  vitals: { TA: "118/74 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("gatillos", "¿Qué la empeora?", "clave", "“Sol, calor, mate, vino, picante.”", "Gatillos típicos."),
    act("cremas", "¿Qué se pone en la cara?", "clave", "“Una crema con corticoide.”", "Empeora y genera rebote."),
    act("ojos", "¿Ojos irritados o con arena?", "clave", "“Sí, a veces.”", "Rosácea ocular."),
    act("comedones", "¿Tenía acné de adolescente?", "util", "“Poco.”", "Diferencial."),
    act("sistemico", "¿Dolores articulares, sol que le da manchas?", "util", "“No.”", "Lupus."),
    act("plantas", "¿Qué plantas vende?", "neutro", "“Suculentas.”", "No orienta."),
  ],
  exam: [
    act("cara", "Cara", "clave", "Eritema centrofacial, telangiectasias, pápulas y pústulas sin comedones.", "Rosácea papulopustulosa."),
    act("parpados", "Párpados", "clave", "Blefaritis.", "Compromiso ocular."),
    act("surcos", "Surcos nasogenianos", "util", "Sin descamación.", "Excluye seborreica."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Suficiente.", "Típico."),
    study("Laboratorio", "fan", "FAN si hubiera dudas con lupus", "util", "Negativo.", "Excluye."),
    study("Otros", "oftalmo", "Evaluación oftalmológica", "util", "Blefaritis y ojo seco.", "Rosácea ocular."),
    study("Otros", "biopsia", "Biopsia", "innecesario", "No se realizó.", "Clínica típica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rosacea", "Rosácea papulopustulosa con compromiso ocular, agravada por corticoides tópicos", true, "Eritema centrofacial con gatillos, telangiectasias, pápulas sin comedones y blefaritis."),
      dx("acne", "Acné vulgar", false, "No hay comedones."),
      dx("lupus", "Lupus cutáneo", false, "FAN negativo y gatillos típicos."),
      dx("seborreica", "Dermatitis seborreica", false, "Sin descamación en surcos."),
      dx("contacto", "Dermatitis de contacto", false, "Patrón centrofacial crónico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("suspender-corticoide", "Suspender el corticoide tópico", "clave", "Empeora la rosácea."),
      mg("topico", "Metronidazol, ácido azelaico o ivermectina tópicos", "clave", "Tratamiento de las pápulas."),
      mg("fotoproteccion", "Fotoprotección y evitar gatillos", "clave", "Prevención."),
      mg("doxiciclina", "Doxiciclina en dosis bajas por el compromiso ocular", "util", "Formas moderadas y oculares."),
      mg("exfoliantes", "Exfoliantes y peelings", "riesgoso", "Irritan."),
      mg("corticoide-mas", "Corticoide más potente", "riesgoso", "Rosácea esteroidea."),
    ],
  },
  debrief: {
    diagnosis: "Rosácea papulopustulosa con compromiso ocular, agravada por corticoides tópicos, en mujer de 41 años.",
    pathologies: [
      { name: "Rosácea", role: "principal", why: "Dermatosis inflamatoria crónica facial." },
      { name: "Rosácea ocular", role: "asociada", why: "Blefaritis." },
      { name: "Acné, lupus", role: "diferencial", why: "Otras lesiones faciales." },
    ],
    reasoning: [
      "Causa: alteración vascular e inmune con Demodex y gatillos.",
      "Mecanismo: vasodilatación e inflamación facial recurrente.",
      "Consecuencia: eritema, pápulas, telangiectasias y fimas.",
    ],
    epidemiology:
      "Es frecuente en adultos de piel clara entre 30 y 50. Los corticoides tópicos la empeoran. Hasta la mitad tiene compromiso ocular.",
    management: [
      "Clínica.",
      "Suspender corticoides.",
      "Tópicos.",
      "Gatillos y ojos.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Rosácea.", "ROSCO — Global Rosacea Consensus."],
    pearls: ["Sin comedones.", "Gatillos: sol, calor, alcohol.", "Mirá los ojos."],
    pitfalls: ["Corticoides.", "Tratar como acné."],
    tribunal: [
      qa("¿Qué es el rinofima?", "Engrosamiento de la piel de la nariz por hiperplasia sebácea, en rosácea avanzada."),
      qa("¿Qué ácaro se asocia?", "Demodex folliculorum."),
      qa("¿Cómo diferenciás del acné?", "El acné tiene comedones y la rosácea no."),
    ],
  },
};
