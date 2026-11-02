import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const brucelosis: ClinicalCase = {
  id: "brucelosis",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 42, ageUnit: "años", sex: "M", context: "Criador de cabras en el norte de Córdoba. Hace queso de cabra con leche cruda." },
  frequency: "poco-frecuente",
  intro: "“Hace un mes tengo fiebre que va y viene, sobre todo a la tarde, con mucha transpiración de noche, cansancio y dolor en la espalda baja.”",
  vitals: { TA: "122/76 mmHg", FC: "92 lpm", "T°": "38,4 °C", Peso: "70 kg" },
  anamnesis: [
    act("animales", "¿Trabajás con animales? ¿Asististe partos o abortos de cabras?", "clave", "“Sí, este año hubo varios abortos en las cabras y ayudé sin guantes.”", "Contacto con fluidos de partos y abortos: exposición de alto riesgo a Brucella."),
    act("lacteos", "¿Tomás leche o comés queso sin pasteurizar?", "clave", "“Queso de cabra casero, todos los días.”", "Vía alimentaria."),
    act("fiebre", "¿Cómo es la fiebre?", "clave", "“Sube a la tarde, baja de noche con mucha sudoración que tiene olor fuerte.”", "Fiebre ondulante con sudoración profusa."),
    act("espalda", "¿Cómo es el dolor de espalda? ¿Te despierta?", "util", "“En la cintura, empeora de noche.”", "Sospechar sacroileítis o espondilodiscitis brucelar."),
    act("testiculos", "¿Te duele algún testículo?", "util", "“El derecho, un poco.”", "Orquiepididimitis: complicación frecuente."),
    act("cabras", "¿Cuántas cabras tenés?", "neutro", "“Unas cuarenta.”", "No orienta por sí."),
  ],
  exam: [
    act("hepatoesplenomegalia", "Hígado, bazo y ganglios", "clave", "Hepatoesplenomegalia leve, adenopatías pequeñas.", "Compromiso del sistema reticuloendotelial."),
    act("columna", "Columna y sacroilíacas", "clave", "Dolor a la palpación lumbar L4–L5 y maniobras sacroilíacas positivas a la derecha.", "Compromiso osteoarticular."),
    act("testicular", "Examen testicular", "util", "Epidídimo derecho engrosado y doloroso.", "Orquiepididimitis."),
  ],
  studies: [
    study("Laboratorio", "serologia", "Serologías para Brucella (BPA, aglutinación, 2-mercaptoetanol)", "clave", "Positivas con títulos altos.", "Confirman."),
    study("Microbiología", "hemocultivos", "Hemocultivos (avisar al laboratorio por el riesgo)", "clave", "Brucella melitensis.", "Confirma; riesgo de contagio en el laboratorio."),
    study("Imágenes", "rmn", "Resonancia de columna lumbar", "util", "Espondilodiscitis L4–L5 sin absceso.", "Define la duración del tratamiento."),
    study("Laboratorio", "hemograma", "Hemograma y hepatograma", "util", "Leucopenia leve con linfocitosis, transaminasas levemente altas.", "Hallazgos frecuentes."),
    study("Otros", "biopsia-ganglio", "Biopsia ganglionar de rutina", "innecesario", "No se realizó.", "El diagnóstico se hizo por serología y cultivo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("brucelosis", "Brucelosis (Brucella melitensis) con espondilodiscitis lumbar y orquiepididimitis", true, "Fiebre ondulante con sudoración, contacto con abortos caprinos y queso casero, hepatoesplenomegalia, espondilodiscitis, serologías y hemocultivo positivos."),
      dx("tbc", "Tuberculosis vertebral (mal de Pott)", false, "El contexto, las serologías y el cultivo muestran Brucella."),
      dx("fiebre-q", "Fiebre Q", false, "Comparte exposición, pero los cultivos muestran Brucella."),
      dx("linfoma", "Linfoma", false, "Los estudios confirman una infección."),
      dx("endocarditis", "Endocarditis", false, "Sin soplos; foco osteoarticular confirmado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Doxiciclina más un aminoglucósido (o rifampicina) por al menos 3 meses por la espondilodiscitis", "clave", "Las formas osteoarticulares requieren tratamiento combinado prolongado."),
      mg("notificar", "Notificar y avisar a SENASA para controlar el rebaño", "clave", "Es una zoonosis de notificación obligatoria; el control animal previene casos."),
      mg("familia", "Estudiar a la familia que consume el queso", "clave", "Exposición común."),
      mg("prevencion", "Pasteurizar o hervir la leche, guantes y protección en partos", "util", "Prevención."),
      mg("monoterapia", "Doxiciclina sola por 7 días", "riesgoso", "Alta tasa de recaída."),
      mg("corticoides", "Corticoides para la fiebre", "innecesario", "No tienen indicación."),
    ],
  },
  debrief: {
    diagnosis: "Brucelosis por Brucella melitensis con espondilodiscitis L4–L5 y orquiepididimitis, en criador de cabras con exposición a abortos y consumo de queso de leche cruda.",
    pathologies: [
      { name: "Brucelosis", role: "principal", why: "Zoonosis bacteriana." },
      { name: "Espondilodiscitis y orquiepididimitis", role: "asociada", why: "Complicaciones focales." },
      { name: "TBC vertebral, fiebre Q, linfoma", role: "diferencial", why: "Otras causas de fiebre prolongada." },
    ],
    reasoning: [
      "Causa: Brucella melitensis de cabras, por contacto con fluidos o consumo de lácteos sin pasteurizar.",
      "Mecanismo: bacteria intracelular que sobrevive en los macrófagos y se disemina al hígado, bazo, médula, huesos y genitales.",
      "Consecuencia: fiebre ondulante, sudoración, artralgias, complicaciones focales y recaídas.",
    ],
    epidemiology:
      "La brucelosis es endémica en zonas caprinas del norte de Córdoba, La Rioja, Catamarca, Mendoza, Santiago del Estero y Salta, y también por ganado bovino y porcino. Afecta a productores rurales, veterinarios, trabajadores de frigoríficos y consumidores de lácteos sin pasteurizar.",
    management: [
      "Sospechar ante fiebre prolongada con exposición rural o lácteos crudos.",
      "Serologías y hemocultivos (avisar al laboratorio).",
      "Tratamiento combinado; más prolongado en formas focales.",
      "Notificación y control veterinario.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para el equipo de salud: brucelosis.", "SENASA — Programa de control de brucelosis caprina y bovina."],
    pearls: ["Fiebre prolongada + cabras o queso casero = brucelosis.", "Tratamiento combinado y prolongado.", "Avisar al laboratorio."],
    pitfalls: ["Monoterapia corta.", "No notificar."],
    tribunal: [
      qa("¿Qué es la fiebre de origen desconocido?", "Fiebre de más de 38,3 °C por más de 3 semanas sin diagnóstico tras una evaluación inicial adecuada; sus causas principales son infecciones (TBC, endocarditis, abscesos, brucelosis), neoplasias (linfoma), enfermedades autoinmunes (Still, arteritis) y fármacos."),
      qa("¿Qué zoonosis son importantes en Argentina?", "Brucelosis, hidatidosis, leptospirosis, triquinosis, hantavirus, rabia, psitacosis, síndrome urémico hemolítico (por E. coli de bovinos), toxoplasmosis y fiebre Q."),
      qa("¿Por qué hay que avisar al laboratorio ante sospecha de brucelosis?", "Porque Brucella se transmite por aerosoles en el laboratorio y es una de las infecciones de laboratorio más frecuentes; los cultivos se manejan con nivel de bioseguridad 3."),
    ],
  },
};
