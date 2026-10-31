import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const candidiasisVulvovaginal: ClinicalCase = {
  id: "candidiasis-vulvovaginal",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 26, ageUnit: "años", sex: "F", context: "Terminó amoxicilina por una angina hace 4 días." },
  frequency: "muy-frecuente",
  intro: "“Tengo una picazón terrible allá abajo, me arde al orinar y tengo un flujo blanco, como leche cortada.”",
  vitals: { TA: "110/70 mmHg", "T°": "36,5 °C" },
  anamnesis: [
    act("prurito", "¿Qué le molesta más: la picazón, el olor o el flujo?", "clave", "“La picazón, no la soporto. No tiene olor.”", "El prurito intenso sin mal olor es típico de la candidiasis; el olor a pescado orienta a vaginosis."),
    act("atb", "¿Tomó antibióticos hace poco?", "clave", "“Amoxicilina la semana pasada.”", "Los antibióticos alteran la flora de lactobacilos y favorecen la proliferación de Candida."),
    act("diabetes", "¿Tiene diabetes o la vigilaron por azúcar alto?", "util", "“No.”", "La diabetes descompensada favorece la candidiasis recurrente."),
    act("embarazo", "¿Puede estar embarazada?", "clave", "“No, me vino hace una semana.”", "En el embarazo se usan solo tratamientos tópicos (no fluconazol oral)."),
    act("previas", "¿Cuántas veces le pasó este año?", "util", "“Es la primera vez.”", "Cuatro o más episodios por año es candidiasis recurrente."),
    act("disuria", "¿El ardor es al pasar la orina por la vulva?", "util", "“Sí, cuando toca afuera.”", "Disuria externa por inflamación vulvar, distinta de la cistitis."),
    act("pareja", "¿Su pareja tiene síntomas?", "neutro", "“No.”", "No se trata a la pareja asintomática."),
  ],
  exam: [
    act("vulva", "Inspección vulvar", "clave", "Eritema y edema vulvar con fisuras y lesiones satélites.", "Vulvitis típica de la candidiasis."),
    act("especulo", "Especuloscopía", "clave", "Flujo blanco grumoso adherido a las paredes, cuello sano.", "Flujo en “leche cortada”."),
    act("bimanual", "Tacto bimanual", "util", "Indoloro.", "Descarta enfermedad pelviana."),
  ],
  studies: [
    study("Laboratorio", "ph", "pH vaginal", "util", "4,2.", "pH normal (≤ 4,5): orienta a candidiasis y aleja vaginosis y tricomoniasis."),
    study("Microbiología", "fresco", "Examen en fresco con hidróxido de potasio", "util", "Levaduras y pseudohifas.", "Confirma en el momento si hay dudas."),
    study("Microbiología", "cultivo", "Cultivo micológico", "innecesario", "No se realizó.", "Se reserva para casos recurrentes o que no responden (especies no albicans)."),
    study("Laboratorio", "glucemia", "Glucemia", "neutro", "92 mg/dl.", "Útil en recurrencias."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("candida", "Candidiasis vulvovaginal no complicada", true, "Prurito intenso, flujo grumoso blanco sin olor, vulvitis, pH normal y levaduras, tras antibióticos."),
      dx("vb", "Vaginosis bacteriana", false, "Flujo gris con olor a pescado, sin prurito importante y pH mayor de 4,5."),
      dx("trico", "Tricomoniasis", false, "Flujo amarillo verdoso espumoso, pH alto, cuello en frutilla; es una ITS."),
      dx("cistitis", "Cistitis", false, "Disuria interna con polaquiuria y urgencia, sin flujo ni vulvitis."),
      dx("contacto", "Dermatitis de contacto vulvar", false, "Prurito y eritema por jabones o protectores, sin flujo grumoso."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluconazol", "Fluconazol 150 mg oral en dosis única (o un azol vaginal)", "clave", "Tratamiento eficaz de la candidiasis no complicada."),
      mg("medidas", "Ropa interior de algodón, evitar duchas vaginales y jabones perfumados", "util", "Reducen la irritación y las recurrencias."),
      mg("explicar", "Explicar que no es una ITS y que se relaciona con el antibiótico", "clave", "Evita culpa y tratamientos innecesarios a la pareja."),
      mg("pareja", "Tratar a la pareja", "innecesario", "No reduce recurrencias si la pareja no tiene síntomas."),
      mg("metronidazol", "Metronidazol", "innecesario", "Trata vaginosis y tricomoniasis, no Candida; además puede empeorarla."),
      mg("corticoide-solo", "Crema con corticoide sola para la picazón", "riesgoso", "Sin antifúngico favorece la infección."),
    ],
  },
  debrief: {
    diagnosis: "Candidiasis vulvovaginal no complicada tras tratamiento antibiótico.",
    pathologies: [
      { name: "Candidiasis vulvovaginal", role: "principal", why: "Sobrecrecimiento de Candida albicans." },
      { name: "Vaginosis y tricomoniasis", role: "diferencial", why: "Otras causas de flujo." },
      { name: "Cistitis", role: "diferencial", why: "Disuria." },
    ],
    reasoning: [
      "Causa: Candida albicans, que forma parte de la flora vaginal de muchas mujeres.",
      "Mecanismo: los antibióticos reducen los lactobacilos que la controlan; también influyen los estrógenos (embarazo, anticonceptivos), la diabetes y la inmunosupresión.",
      "Consecuencia: inflamación de vagina y vulva con prurito intenso, ardor, disuria externa y flujo grumoso; el pH se mantiene normal.",
    ],
    epidemiology:
      "Tres de cada cuatro mujeres tendrán al menos un episodio de candidiasis vulvovaginal en su vida, sobre todo en la edad reproductiva. Es más frecuente tras antibióticos, en el embarazo, con diabetes mal controlada e inmunosupresión. No se considera una infección de transmisión sexual.",
    management: [
      "Diagnóstico clínico, con pH y fresco si hay dudas.",
      "No complicada: fluconazol oral único o azoles tópicos.",
      "Embarazo: solo azoles tópicos por 7 días.",
      "Recurrente (4 o más por año): cultivo, buscar factores (diabetes) y tratamiento supresivo.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento de flujo vaginal e ITS.", "SOGIBA — Consenso de vulvovaginitis."],
    pearls: ["Prurito + flujo grumoso + pH normal = Candida.", "No es una ITS.", "Embarazo: tratamiento tópico."],
    pitfalls: ["Indicar metronidazol.", "Tratar a la pareja asintomática."],
    tribunal: [
      qa("¿Qué diferencia los tres flujos más frecuentes?", "Candidiasis: flujo blanco grumoso, prurito intenso, pH normal. Vaginosis bacteriana: flujo gris homogéneo con olor a pescado, pH alto, sin inflamación. Tricomoniasis: flujo amarillo verdoso espumoso, prurito, pH alto, cuello en frutilla; es una ITS y se trata a la pareja."),
      qa("¿Qué es una candidiasis complicada?", "La recurrente (4 o más episodios por año), la grave, la causada por especies no albicans, o la que ocurre en embarazadas, diabéticas descompensadas o inmunocomprometidas."),
      qa("¿Por qué el pH ayuda?", "Porque la candidiasis no altera el pH ácido (4–4,5) que mantienen los lactobacilos, mientras que la vaginosis y la tricomoniasis lo elevan por encima de 4,5."),
    ],
  },
};
