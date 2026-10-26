import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const vaginosis: ClinicalCase = {
  id: "vaginosis-bacteriana",
  level: 1,
  area: "Ginecología y obstetricia",
  setting: "CAPS",
  patient: { age: 29, ageUnit: "años", sex: "F" },
  frequency: "muy-frecuente",
  intro: "“Tengo un flujo con olor feo, como a pescado, sobre todo después de las relaciones. No me pica.”",
  vitals: { TA: "112/72 mmHg", "T°": "36,5 °C" },
  anamnesis: [
    act("caracteristicas", "¿Cómo es el flujo? ¿Color, cantidad?", "clave", "“Grisáceo, finito, bastante.”", "Flujo homogéneo, grisáceo y maloliente: típico de vaginosis bacteriana."),
    act("prurito", "¿Tiene picazón, ardor o dolor?", "clave", "“No, solo el olor.”", "La vaginosis casi no da inflamación; el prurito y el ardor orientan a candidiasis o tricomoniasis."),
    act("dolor", "¿Tiene dolor en la panza, fiebre o dolor en las relaciones?", "clave", "“No.”", "Dolor pelviano, fiebre o dispareunia profunda harían pensar en enfermedad pelviana inflamatoria."),
    act("embarazo", "¿Puede estar embarazada?", "clave", "“No, tengo un implante.”", "La vaginosis en el embarazo se asocia a parto prematuro y cambia el seguimiento."),
    act("duchas", "¿Usa duchas vaginales o jabones íntimos?", "util", "“Sí, me lavo por dentro para sacar el olor.”", "Las duchas vaginales alteran la flora y favorecen la vaginosis."),
    act("pareja", "¿Su pareja tiene síntomas? ¿Nueva pareja?", "util", "“Nueva pareja hace dos meses, él no tiene nada.”", "Una pareja nueva es factor de riesgo; también abre la conversación sobre ITS."),
    act("deporte", "¿Hace deporte?", "neutro", "“Corro.”", "No orienta."),
  ],
  exam: [
    act("especulo", "Especuloscopía", "clave", "Flujo blanco grisáceo, homogéneo, adherido a las paredes, sin inflamación vaginal; cuello sano.", "Un cuello friable con secreción purulenta sugeriría cervicitis (clamidia, gonococo)."),
    act("bimanual", "Tacto bimanual", "util", "Sin dolor a la movilización del cuello ni masas anexiales.", "Descarta enfermedad pelviana inflamatoria."),
    act("vulva", "Inspección vulvar", "util", "Sin eritema, fisuras ni lesiones.", "El eritema y las fisuras orientan a candidiasis."),
  ],
  studies: [
    study("Laboratorio", "ph", "pH vaginal con tira", "clave", "5,2.", "pH > 4,5 es criterio de Amsel (la candidiasis tiene pH normal)."),
    study("Laboratorio", "aminas", "Prueba de aminas con hidróxido de potasio", "clave", "Positiva: olor a pescado.", "Las aminas que producen los anaerobios son criterio de Amsel."),
    study("Microbiología", "fresco", "Examen en fresco y Gram del flujo", "clave", "Células clave (clue cells) en más del 20 %; escasos leucocitos; sin tricomonas ni levaduras. Gram: Nugent 8.", "Las clue cells son células epiteliales cubiertas de bacterias. Tres de cuatro criterios de Amsel confirman."),
    study("Microbiología", "cultivo", "Cultivo de flujo para Gardnerella", "innecesario", "Gardnerella vaginalis presente.", "Gardnerella está en muchas mujeres sanas: su cultivo no diagnostica vaginosis."),
    study("Imágenes", "eco", "Ecografía transvaginal", "innecesario", "Normal.", "No aporta en una vulvovaginitis sin dolor pelviano."),
    study("Laboratorio", "its", "Ofrecer testeo de VIH, sífilis y hepatitis B", "util", "No reactivos.", "Pareja nueva y sin preservativo: oportunidad de prevención."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vb", "Vaginosis bacteriana", true, "Flujo grisáceo homogéneo con olor a pescado, sin inflamación, pH > 4,5, aminas positivas y clue cells: cumple los 4 criterios de Amsel."),
      dx("candida", "Candidiasis vulvovaginal", false, "Prurito intenso, flujo blanco grumoso, eritema vulvar y pH normal (≤ 4,5)."),
      dx("trico", "Tricomoniasis", false, "Flujo amarillo verdoso espumoso, prurito, cuello en frutilla, tricomonas móviles en el fresco. Es una ITS: se trata a la pareja."),
      dx("cervicitis", "Cervicitis por clamidia o gonococo", false, "Secreción mucopurulenta desde el cuello, friable, sangrado poscoital."),
      dx("fisiologico", "Flujo fisiológico", false, "Es transparente o blanquecino, sin olor y con pH normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("metro", "Metronidazol 500 mg cada 12 h por 7 días (oral) o gel vaginal", "clave", "Tratamiento de elección; evitar alcohol durante el tratamiento (efecto disulfiram)."),
      mg("duchas", "Suspender duchas vaginales y jabones íntimos", "clave", "Previene recurrencias al respetar la flora de lactobacilos."),
      mg("preservativo", "Consejería sobre preservativo", "util", "Reduce recurrencias y previene ITS."),
      mg("pareja", "Tratar a la pareja masculina", "innecesario", "No reduce las recurrencias: la vaginosis no es una ITS clásica."),
      mg("fluco", "Fluconazol 150 mg", "innecesario", "Es para candidiasis; acá no hay levaduras."),
      mg("ceftri", "Ceftriaxona más doxiciclina", "innecesario", "Es el esquema para enfermedad pelviana inflamatoria o cervicitis; no corresponde."),
    ],
  },
  debrief: {
    diagnosis: "Vaginosis bacteriana (4/4 criterios de Amsel), favorecida por duchas vaginales.",
    pathologies: [
      { name: "Vaginosis bacteriana", role: "principal", why: "Criterios de Amsel completos." },
      { name: "Candidiasis vulvovaginal", role: "diferencial", why: "Prurito, flujo grumoso, pH normal." },
      { name: "Tricomoniasis", role: "diferencial", why: "ITS con flujo espumoso y prurito." },
      { name: "Cervicitis", role: "diferencial", why: "Secreción desde el cuello." },
    ],
    reasoning: [
      "Causa: desequilibrio de la flora vaginal. Disminuyen los lactobacilos productores de ácido láctico y peróxido, y proliferan Gardnerella y anaerobios.",
      "Mecanismo: sin lactobacilos sube el pH; los anaerobios producen aminas volátiles (trimetilamina) y forman una biopelícula sobre el epitelio.",
      "Consecuencia: flujo abundante, homogéneo y con olor a pescado, que empeora tras las relaciones (el semen es alcalino y libera las aminas). Como no invade, casi no hay inflamación ni leucocitos.",
      "Las duchas vaginales, el tabaco y las parejas nuevas favorecen el desequilibrio.",
    ],
    epidemiology:
      "Es la causa más frecuente de flujo vaginal anormal en mujeres en edad reproductiva: la prevalencia ronda el 15–30 %, más alta en consultas por síntomas genitales. Recurre en hasta la mitad de las pacientes al año. En el embarazo se asocia a rotura prematura de membranas y parto prematuro.",
    management: [
      "Diagnóstico con criterios de Amsel (3 de 4) o Gram con puntaje de Nugent.",
      "Tratar a las sintomáticas y a las embarazadas sintomáticas: metronidazol oral o vaginal, o clindamicina.",
      "No tratar a la pareja masculina de rutina.",
      "Medidas: evitar duchas vaginales; preservativo.",
      "Ofrecer testeo de ITS; ante recurrencias frecuentes, esquemas supresivos.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de diagnóstico y tratamiento de las infecciones de transmisión sexual y flujo vaginal.",
      "Sociedad de Obstetricia y Ginecología de Buenos Aires (SOGIBA) — Consenso de vulvovaginitis.",
    ],
    pearls: [
      "Amsel: flujo homogéneo, pH > 4,5, aminas positivas, clue cells (3 de 4).",
      "Olor a pescado sin prurito: vaginosis. Prurito con flujo grumoso: cándida.",
      "Metronidazol: nada de alcohol.",
    ],
    pitfalls: ["Diagnosticar por cultivo de Gardnerella.", "Tratar con fluconazol todo flujo.", "Indicar duchas vaginales."],
  },
};
