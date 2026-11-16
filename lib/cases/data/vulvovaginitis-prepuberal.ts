import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const vulvovaginitisPrepuberal: ClinicalCase = {
  id: "vulvovaginitis-prepuberal",
  level: 2,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 6, ageUnit: "años", sex: "F", context: "Primer grado. Se limpia sola en el baño desde este año. Usa calzas todo el día." },
  frequency: "muy-frecuente",
  intro: "La mamá: “Se rasca abajo, le arde al hacer pis y mancha la bombacha.”",
  vitals: { FC: "92 lpm", "T°": "36,6 °C", Peso: "21 kg" },
  anamnesis: [
    act("higiene", "¿Cómo se limpia después de ir al baño?", "clave", "“De atrás para adelante, me dijo.”", "Higiene inadecuada: causa principal de vulvovaginitis inespecífica."),
    act("flujo", "¿Cómo es la mancha?", "clave", "“Amarillenta, sin mucho olor.”", "Inespecífica; el flujo verde o con sangre orienta a germen específico o cuerpo extraño."),
    act("prurito-noche", "¿Se rasca más de noche, cerca de la cola?", "clave", "“Sí, a la noche.”", "Oxiuros: causa frecuente asociada."),
    act("abuso", "¿Hubo algún cambio de conducta, algún adulto nuevo o algo que la niña haya contado?", "clave", "“No, nada. Está contenta.”", "Siempre hay que evaluar abuso sexual con delicadeza."),
    act("irritantes", "¿Baños de espuma, jabones perfumados?", "util", "“Le encanta la espuma.”", "Irritantes químicos."),
    act("dibujos", "¿Qué dibujos animados mira?", "neutro", "“Bluey.”", "No orienta."),
  ],
  exam: [
    act("vulva", "Inspección vulvar en posición de rana con la madre presente", "clave", "Eritema vulvar, flujo amarillento escaso, himen sin lesiones.", "Vulvovaginitis inespecífica sin signos de trauma."),
    act("perianal", "Región perianal", "util", "Lesiones de rascado perianal.", "Sugiere oxiuros."),
    act("piel", "Piel del resto del cuerpo", "util", "Sin dermatitis atópica activa.", "Diferencial."),
  ],
  studies: [
    study("Otros", "test-graham", "Test de Graham (cinta adhesiva) por 3 mañanas", "clave", "Huevos de Enterobius vermicularis.", "Confirma oxiuriasis."),
    study("Microbiología", "cultivo", "Cultivo de flujo si persiste o es purulento", "util", "Flora mixta.", "Busca estreptococo, Shigella o gonococo."),
    study("Otros", "especuloscopia", "Especuloscopía", "riesgoso", "No se hizo.", "Traumática y no indicada en una niña."),
    study("Laboratorio", "orina", "Orina completa", "util", "Normal.", "El ardor es externo, no una ITU."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("vv-inespecifica", "Vulvovaginitis inespecífica prepuberal asociada a oxiuriasis", true, "Niña de 6 años con higiene inadecuada, irritantes, prurito nocturno, eritema vulvar y Graham positivo, sin signos de abuso."),
      dx("candidiasis", "Candidiasis vulvovaginal", false, "Rara antes de la pubertad salvo con pañal, diabetes o antibióticos."),
      dx("abuso", "Infección de transmisión sexual por abuso", false, "No hay indicios en la historia ni el examen, aunque se sigue alerta."),
      dx("cuerpo-extrano", "Cuerpo extraño vaginal", false, "El flujo sería fétido y con sangre."),
      dx("itu", "Infección urinaria", false, "Orina normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("higiene", "Enseñar a limpiarse de adelante hacia atrás y orinar con las piernas separadas", "clave", "Corrige la causa."),
      mg("ropa", "Ropa interior de algodón, evitar calzas apretadas, jabones y baños de espuma", "clave", "Elimina irritantes."),
      mg("mebendazol", "Mebendazol o albendazol a toda la familia, repetir a las 2 semanas", "clave", "Trata la oxiuriasis."),
      mg("banos", "Baños de asiento con agua tibia", "util", "Alivio."),
      mg("estar-atentos", "Seguimiento y estar atentos a señales de abuso si recurre", "util", "Siempre."),
      mg("antifungico", "Óvulos de clotrimazol", "riesgoso", "No indicados y traumáticos."),
      mg("atb-sistemico", "Antibiótico oral empírico", "innecesario", "No hay germen específico."),
    ],
  },
  debrief: {
    diagnosis: "Vulvovaginitis inespecífica prepuberal por higiene inadecuada e irritantes, asociada a oxiuriasis, en una niña de 6 años.",
    pathologies: [
      { name: "Vulvovaginitis inespecífica", role: "principal", why: "Irritación de una mucosa hipoestrogénica." },
      { name: "Oxiuriasis", role: "asociada", why: "Migración de los parásitos a la vulva." },
      { name: "Abuso sexual infantil", role: "diferencial", why: "Siempre a evaluar." },
    ],
    reasoning: [
      "Causa: higiene de atrás hacia adelante, ropa ajustada, jabones y oxiuros.",
      "Mecanismo: la mucosa sin estrógenos es fina y con pH neutro, fácil de irritar.",
      "Consecuencia: eritema, ardor y flujo inespecífico.",
    ],
    epidemiology:
      "Es el problema ginecológico más frecuente en niñas prepúberes, sobre todo entre los 3 y 8 años, cuando empiezan a higienizarse solas. Entre el 25 y el 75 % son inespecíficas. Un germen de transmisión sexual obliga a investigar abuso.",
    management: [
      "Medidas de higiene.",
      "Eliminar irritantes.",
      "Tratar oxiuros.",
      "Cultivo si persiste.",
      "Estar atentos al abuso.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Ginecología infantojuvenil.", "SAGIJ — Vulvovaginitis en la infancia."],
    pearls: ["Higiene de adelante hacia atrás.", "Prurito nocturno: Graham.", "ITS en una niña: abuso hasta demostrar lo contrario."],
    pitfalls: ["Óvulos o especuloscopía.", "No preguntar por abuso."],
    tribunal: [
      qa("¿Por qué la mucosa vulvovaginal prepuberal es más vulnerable?", "Porque sin estrógenos es fina, sin glucógeno ni lactobacilos y con pH neutro."),
      qa("¿Qué hallazgos en una niña obligan a investigar abuso sexual?", "Gonococo, clamidia, tricomonas, sífilis o VIH sin transmisión perinatal, lesiones del himen o relato de la niña."),
      qa("¿Qué sugiere un flujo fétido con sangre en una niña?", "Un cuerpo extraño vaginal, a menudo papel higiénico."),
    ],
  },
};
