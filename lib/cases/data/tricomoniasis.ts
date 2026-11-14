import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tricomoniasis: ClinicalCase = {
  id: "tricomoniasis",
  level: 1,
  area: "Infectología",
  setting: "CAPS",
  patient: { age: 31, ageUnit: "años", sex: "F", context: "Pareja nueva hace 3 meses. Usa implante anticonceptivo." },
  frequency: "frecuente",
  intro: "“Tengo un flujo amarillo verdoso, espumoso, con mal olor, me pica y arde al orinar.”",
  vitals: { TA: "116/72 mmHg", FC: "76 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("flujo", "¿Cómo es el flujo?", "clave", "“Amarillo verdoso y con espuma.”", "Típico de Trichomonas."),
    act("pareja", "¿Pareja nueva o varias parejas?", "clave", "“Una nueva, sin preservativo.”", "ITS."),
    act("disuria", "¿Arde al orinar o dolor en las relaciones?", "clave", "“Las dos cosas.”", "Vaginitis."),
    act("fiebre", "¿Fiebre o dolor abdominal bajo?", "util", "“No.”", "EPI."),
    act("embarazo", "¿Podés estar embarazada?", "util", "“No.”", "Manejo."),
    act("trabajo", "¿Trabajás?", "neutro", "“En un call center.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Flujo espumoso amarillo verdoso, cuello en fresa.", "Tricomoniasis."),
    act("vulva", "Vulva", "clave", "Eritematosa.", "Vulvovaginitis."),
    act("tacto", "Tacto", "util", "Sin dolor a la movilización.", "Sin EPI."),
  ],
  studies: [
    study("Laboratorio", "fresco", "Examen en fresco y pH", "clave", "Trofozoítos móviles; pH 6.", "Diagnóstico."),
    study("Laboratorio", "its", "VIH, VDRL, hepatitis B, clamidia y gonococo", "clave", "Negativos.", "Otras ITS."),
    study("Laboratorio", "naat", "Prueba molecular si el fresco es negativo", "util", "No hizo falta.", "Más sensible."),
    study("Imágenes", "eco", "Ecografía transvaginal", "innecesario", "No se realizó.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tricomoniasis", "Tricomoniasis vaginal", true, "Flujo espumoso verdoso, cuello en fresa, pH alto y trofozoítos móviles."),
      dx("vaginosis", "Vaginosis bacteriana", false, "Hay inflamación, prurito y trofozoítos."),
      dx("candidiasis", "Candidiasis", false, "Flujo grumoso con pH normal."),
      dx("epi", "Enfermedad pélvica inflamatoria", false, "Sin dolor a la movilización."),
      dx("cistitis", "Cistitis", false, "El ardor es vulvar y hay flujo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metronidazol", "Metronidazol oral por 7 días", "clave", "Tratamiento en la mujer."),
      mg("pareja", "Tratar a la pareja sexual", "clave", "Evita la reinfección."),
      mg("abstinencia", "Evitar relaciones hasta terminar el tratamiento de ambos", "clave", "Transmisión."),
      mg("control", "Control a los 3 meses", "util", "Reinfección frecuente."),
      mg("alcohol", "Tomar alcohol durante el tratamiento", "riesgoso", "Efecto disulfiram."),
      mg("ovulos-solos", "Solo óvulos vaginales de metronidazol", "riesgoso", "Menos eficaces: la infección también es uretral."),
    ],
  },
  debrief: {
    diagnosis: "Tricomoniasis vaginal, en mujer de 31 años con pareja nueva.",
    pathologies: [
      { name: "Tricomoniasis", role: "principal", why: "ITS no viral más frecuente." },
      { name: "Riesgo de otras ITS", role: "asociada", why: "Pesquisa." },
      { name: "Vaginosis, candidiasis", role: "diferencial", why: "Otras vulvovaginitis." },
    ],
    reasoning: [
      "Causa: Trichomonas vaginalis por contacto sexual.",
      "Mecanismo: el parásito daña el epitelio vaginal y uretral.",
      "Consecuencia: vaginitis, uretritis y mayor riesgo de adquirir VIH.",
    ],
    epidemiology:
      "Es la ITS curable más frecuente en el mundo. Los varones suelen ser asintomáticos, por eso se trata a la pareja. En el embarazo se asocia a parto prematuro.",
    management: [
      "Fresco.",
      "Metronidazol.",
      "Pareja.",
      "Pesquisa de ITS.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de ITS.", "CDC — Sexually Transmitted Infections Treatment Guidelines: Trichomoniasis."],
    pearls: ["Espumoso y verdoso.", "Cuello en fresa.", "Tratar a la pareja."],
    pitfalls: ["No tratar a la pareja.", "Alcohol con metronidazol."],
    tribunal: [
      qa("¿Qué es el cuello en fresa?", "Colpitis macular con hemorragias puntiformes en el cuello uterino."),
      qa("¿Por qué se trata a la pareja aunque no tenga síntomas?", "Porque los varones suelen ser portadores asintomáticos y reinfectan."),
      qa("¿Qué pH vaginal tiene la tricomoniasis?", "Mayor de 4,5, como la vaginosis."),
    ],
  },
};
