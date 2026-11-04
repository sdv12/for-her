import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const espondilitis: ClinicalCase = {
  id: "espondilitis-anquilosante",
  level: 2,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 26, ageUnit: "años", sex: "M", context: "Programador. Le diagnosticaron lumbalgia muscular varias veces." },
  frequency: "poco-frecuente",
  intro: "“Hace dos años me duele la cintura y los glúteos. Me despierta de madrugada y a la mañana estoy duro más de una hora. Mejora cuando hago ejercicio.”",
  vitals: { TA: "122/76 mmHg", FC: "70 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("inflamatorio", "¿El dolor mejora con el movimiento o con el reposo? ¿Cuánto dura la rigidez?", "clave", "“Mejora con el ejercicio, empeora en reposo; rigidez más de una hora.”", "Dolor lumbar inflamatorio."),
    act("edad", "¿A qué edad empezó?", "clave", "“A los 24.”", "Inicio antes de los 40 años."),
    act("ojo", "¿Tuviste el ojo rojo y doloroso con luz?", "clave", "“Sí, una vez el año pasado.”", "Uveítis anterior: manifestación extraarticular."),
    act("aine", "¿Mejora con antiinflamatorios?", "util", "“Mucho.”", "Respuesta a AINE: dato a favor."),
    act("otros", "¿Diarrea crónica, psoriasis, talón doloroso?", "util", "“Me duele el talón a veces.”", "Entesitis."),
    act("serie", "¿Qué serie mirás?", "neutro", "“Una de ciencia ficción.”", "No orienta."),
  ],
  exam: [
    act("schober", "Prueba de Schober y expansión torácica", "clave", "Schober 3 cm (disminuido), expansión torácica reducida.", "Limitación de la movilidad lumbar."),
    act("sacroiliacas", "Maniobras sacroilíacas", "clave", "Positivas bilaterales.", "Sacroileítis."),
    act("talones", "Inserciones tendinosas", "util", "Dolor en la inserción del tendón de Aquiles.", "Entesitis."),
  ],
  studies: [
    study("Imágenes", "rmn", "Resonancia de sacroilíacas (o radiografía de pelvis)", "clave", "Edema óseo en ambas sacroilíacas; radiografía con esclerosis bilateral.", "Sacroileítis."),
    study("Laboratorio", "hla", "HLA-B27, VSG y PCR", "util", "HLA-B27 positivo, PCR elevada.", "Apoyan el diagnóstico."),
    study("Laboratorio", "fr", "Factor reumatoideo para diagnosticar", "innecesario", "No se realizó.", "Las espondiloartritis son seronegativas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ea", "Espondiloartritis axial (espondilitis anquilosante) con uveítis previa y entesitis", true, "Varón joven con dolor lumbar inflamatorio de más de 3 meses, rigidez prolongada, mejoría con ejercicio y AINE, sacroileítis, HLA-B27 y uveítis."),
      dx("mecanica", "Lumbalgia mecánica", false, "El dolor es inflamatorio, mejora con el ejercicio y hay sacroileítis."),
      dx("hernia", "Hernia de disco", false, "No hay dolor radicular."),
      dx("ar", "Artritis reumatoidea", false, "Compromiso axial y seronegativo."),
      dx("fibromialgia", "Fibromialgia", false, "Hay sacroileítis y PCR alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aine", "AINE en dosis plenas", "clave", "Primera línea."),
      mg("ejercicio", "Ejercicio y kinesiología, postura", "clave", "Mantiene la movilidad."),
      mg("biologicos", "Derivar a reumatología para biológicos (anti-TNF o anti-IL-17) si no responde", "clave", "Eficaces en la enfermedad activa."),
      mg("tabaco", "Evitar el tabaco", "util", "Empeora la progresión."),
      mg("reposo", "Reposo en cama", "riesgoso", "Empeora el dolor inflamatorio y la rigidez."),
      mg("corticoide-oral", "Corticoides orales crónicos", "innecesario", "Poco eficaces en el compromiso axial."),
    ],
  },
  debrief: {
    diagnosis: "Espondiloartritis axial (espondilitis anquilosante) HLA-B27 positiva, con sacroileítis bilateral, entesitis aquiliana y uveítis anterior previa, en varón de 26 años.",
    pathologies: [
      { name: "Espondilitis anquilosante", role: "principal", why: "Inflamación crónica del esqueleto axial." },
      { name: "Uveítis y entesitis", role: "asociada", why: "Manifestaciones extraarticulares." },
      { name: "Lumbalgia mecánica, hernia, fibromialgia", role: "diferencial", why: "Otras causas de lumbalgia." },
    ],
    reasoning: [
      "Causa: predisposición genética (HLA-B27) con factores ambientales.",
      "Mecanismo: inflamación de las entesis y sacroilíacas que lleva a erosión y luego a formación de hueso nuevo (sindesmofitos).",
      "Consecuencia: dolor inflamatorio, rigidez, pérdida de movilidad y, sin tratamiento, columna en caña de bambú.",
    ],
    epidemiology:
      "La espondilitis anquilosante comienza en adultos jóvenes (antes de los 40 años), es más frecuente en varones y suele diagnosticarse con varios años de demora, confundida con lumbalgia mecánica, que es mucho más frecuente.",
    management: [
      "Sospechar ante lumbalgia inflamatoria en menores de 40.",
      "Imagen de sacroilíacas y HLA-B27.",
      "AINE, ejercicio y biológicos si no responde.",
      "Controlar la uveítis y otras manifestaciones.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de espondiloartritis.", "Criterios ASAS de espondiloartritis axial."],
    pearls: ["Dolor lumbar que mejora con ejercicio = inflamatorio.", "Joven + uveítis + sacroileítis = espondiloartritis.", "AINE y ejercicio."],
    pitfalls: ["Diagnosticar lumbalgia muscular repetidamente.", "Indicar reposo."],
    tribunal: [
      qa("¿Qué caracteriza al dolor lumbar inflamatorio?", "Inicio antes de los 40, comienzo insidioso, mejora con el ejercicio, no mejora con el reposo y dolor nocturno que mejora al levantarse (criterios ASAS: 4 de 5)."),
      qa("¿Qué incluyen las espondiloartritis?", "Espondilitis anquilosante, artritis psoriásica, artritis reactiva, artritis asociada a enfermedad inflamatoria intestinal y formas indiferenciadas; comparten HLA-B27, compromiso axial, entesitis y uveítis."),
      qa("¿Qué es la artritis reactiva?", "Una artritis estéril que aparece días a semanas después de una infección intestinal o genitourinaria (Chlamydia, Salmonella, Shigella), con oligoartritis de miembros inferiores, conjuntivitis y uretritis."),
    ],
  },
};
