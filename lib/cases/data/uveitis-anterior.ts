import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const uveitisAnterior: ClinicalCase = {
  id: "uveitis-anterior-aguda",
  level: 2,
  area: "Oftalmología",
  setting: "Guardia",
  patient: { age: 31, ageUnit: "años", sex: "M", context: "Hace años tiene dolor lumbar que mejora con el ejercicio. Nunca consultó." },
  frequency: "frecuente",
  intro: "“Hace dos días tengo el ojo derecho rojo, me duele, me molesta mucho la luz y veo un poco borroso.”",
  vitals: { TA: "122/78 mmHg", FC: "74 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("fotofobia", "¿Le molesta la luz?", "clave", "“Muchísimo.”", "Inflamación del iris."),
    act("lumbar", "¿Dolor de espalda?", "clave", "“A la mañana estoy duro, mejora moviéndome.”", "Lumbalgia inflamatoria."),
    act("secrecion", "¿Lagañas o secreción?", "clave", "“No, solo lagrimeo.”", "No es conjuntivitis."),
    act("lentes", "¿Usa lentes de contacto o se golpeó?", "util", "“No.”", "Queratitis o trauma."),
    act("previos", "¿Le pasó antes?", "util", "“Una vez en el otro ojo.”", "Recurrente y alternante."),
    act("trabajo", "¿Qué hace?", "neutro", "“Soy repartidor.”", "No orienta."),
  ],
  exam: [
    act("ojo-rojo", "Tipo de ojo rojo", "clave", "Inyección ciliar (perilímbica), sin secreción.", "Patrón de uveítis."),
    act("pupila", "Pupila", "clave", "Miótica, poco reactiva.", "Espasmo del esfínter del iris."),
    act("lampara", "Lámpara de hendidura", "util", "Células y flare en cámara anterior, precipitados finos.", "Confirma."),
  ],
  studies: [
    study("Otros", "agudeza", "Agudeza visual y presión intraocular", "clave", "AV 7/10; PIO 14.", "Base y diferencial con glaucoma."),
    study("Laboratorio", "hla", "HLA-B27", "clave", "Positivo.", "Asociación con espondiloartritis."),
    study("Imágenes", "rx-sacroiliacas", "Radiografía o RM de sacroilíacas", "util", "Sacroileítis bilateral.", "Espondilitis anquilosante."),
    study("Otros", "atb-topico", "Tratar como conjuntivitis con antibiótico tópico", "riesgoso", "No se hizo.", "Retrasa el tratamiento y deja sinequias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("uveitis", "Uveítis anterior aguda HLA-B27 asociada a espondilitis anquilosante", true, "Ojo rojo doloroso con fotofobia, inyección ciliar, miosis, células en cámara anterior y lumbalgia inflamatoria."),
      dx("conjuntivitis", "Conjuntivitis", false, "Sin secreción y con dolor, fotofobia y miosis."),
      dx("glaucoma", "Glaucoma agudo", false, "Pupila miótica y PIO normal."),
      dx("queratitis", "Queratitis", false, "Córnea sin úlcera."),
      dx("escleritis", "Escleritis", false, "Inflamación en cámara anterior y dolor menos intenso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide-topico", "Corticoide tópico frecuente indicado por oftalmología", "clave", "Controla la inflamación."),
      mg("cicloplejico", "Ciclopléjico (ciclopentolato o atropina)", "clave", "Dolor y prevención de sinequias."),
      mg("derivar", "Derivación oftalmológica en el día", "clave", "Seguimiento con lámpara."),
      mg("reuma", "Derivar a reumatología por la espondiloartritis", "util", "Enfermedad de base."),
      mg("corticoide-sin-control", "Corticoide tópico prolongado sin control oftalmológico", "riesgoso", "Glaucoma y catarata."),
      mg("parche", "Oclusión con parche", "innecesario", "No aporta."),
    ],
  },
  debrief: {
    diagnosis: "Uveítis anterior aguda HLA-B27 positiva asociada a espondilitis anquilosante no diagnosticada, en varón de 31 años.",
    pathologies: [
      { name: "Uveítis anterior aguda", role: "principal", why: "Inflamación del iris y cuerpo ciliar." },
      { name: "Espondilitis anquilosante", role: "asociada", why: "Enfermedad sistémica asociada." },
      { name: "Conjuntivitis, glaucoma agudo", role: "diferencial", why: "Otros ojos rojos." },
    ],
    reasoning: [
      "Causa: inflamación inmunomediada asociada a HLA-B27.",
      "Mecanismo: ruptura de la barrera hematoacuosa con células en la cámara anterior.",
      "Consecuencia: dolor, fotofobia y riesgo de sinequias, glaucoma y catarata.",
    ],
    epidemiology:
      "La uveítis anterior es la forma más frecuente de uveítis, y la mitad se asocia a HLA-B27. Muchas veces es la primera manifestación de una espondiloartritis. La lumbalgia inflamatoria en un joven con ojo rojo doloroso es la pista.",
    management: [
      "Diferenciar ojo rojo.",
      "Corticoide y ciclopléjico.",
      "Oftalmología.",
      "Buscar enfermedad sistémica.",
    ],
    sources: ["Consejo Argentino de Oftalmología — Uveítis.", "SUN Working Group — Standardization of Uveitis Nomenclature."],
    pearls: ["Ojo rojo con dolor, fotofobia y miosis.", "Inyección ciliar.", "Preguntá por la espalda."],
    pitfalls: ["Tratar como conjuntivitis.", "Corticoides sin control."],
    tribunal: [
      qa("¿Qué es la inyección ciliar?", "Enrojecimiento alrededor del limbo corneal, típico de inflamación intraocular."),
      qa("¿Qué otras enfermedades se asocian a uveítis?", "Artritis idiopática juvenil, sarcoidosis, Behçet, enfermedad inflamatoria intestinal, toxoplasmosis y sífilis."),
      qa("¿Por qué se usa ciclopléjico?", "Alivia el espasmo ciliar y evita adherencias del iris al cristalino."),
    ],
  },
};
