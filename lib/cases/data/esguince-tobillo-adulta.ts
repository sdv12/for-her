import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const esguinceTobilloAdulta: ClinicalCase = {
  id: "esguince-tobillo-adulta",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 45, ageUnit: "años", sex: "F", context: "Enfermera. Se torció el tobillo bajando un cordón con zapatos de plataforma." },
  frequency: "muy-frecuente",
  intro: "“Se me dobló el pie para adentro y se me hinchó enseguida. Quiero una placa.”",
  vitals: { TA: "124/78 mmHg", FC: "84 lpm" },
  anamnesis: [
    act("mecanismo", "¿Cómo se dobló?", "clave", "“La planta hacia adentro.”", "Inversión: ligamento peroneoastragalino anterior."),
    act("apoyo", "¿Pudo caminar después?", "clave", "“Sí, rengueando, unos 4 pasos y más.”", "Criterio de Ottawa."),
    act("crack", "¿Escuchó un crac?", "util", "“No.”", "Orienta a fractura o rotura completa."),
    act("previos", "¿Se esguinzó antes?", "util", "“De joven, varias veces.”", "Inestabilidad crónica."),
    act("osteoporosis", "¿Tiene osteoporosis?", "util", "“No que sepa.”", "Riesgo de fractura."),
    act("zapatos", "¿De qué color eran los zapatos?", "neutro", "“Negros.”", "No orienta."),
  ],
  exam: [
    act("ottawa", "Reglas de Ottawa: palpación del borde posterior y punta de ambos maléolos, base del 5.º metatarsiano y escafoides", "clave", "Sin dolor óseo en esos puntos; camina 4 pasos.", "Ottawa negativo: no hace falta radiografía."),
    act("ligamento", "Palpación del ligamento", "clave", "Dolor y edema por delante del maléolo externo.", "Lesión del peroneoastragalino anterior."),
    act("cajon", "Cajón anterior (diferido)", "util", "Se difiere a los 4–5 días por el dolor.", "Más fiable en diferido."),
  ],
  studies: [
    study("Otros", "ottawa-est", "Aplicar las reglas de Ottawa", "clave", "Negativas.", "Sensibilidad cercana al 100 % para fractura."),
    study("Imágenes", "rx", "Radiografía de tobillo", "innecesario", "No se pidió.", "Ottawa negativo."),
    study("Imágenes", "rmn", "Resonancia", "innecesario", "No se pidió.", "No en el agudo."),
    study("Imágenes", "eco", "Ecografía si persiste la inestabilidad", "util", "No hizo falta.", "Más adelante."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("esguince-lateral", "Esguince lateral de tobillo (ligamento peroneoastragalino anterior) grado I–II", true, "Inversión, dolor y edema anterolateral, Ottawa negativo."),
      dx("fractura-maleolo", "Fractura de maléolo externo", false, "Ottawa negativo."),
      dx("quinto-meta", "Fractura de la base del 5.º metatarsiano", false, "Sin dolor en la base."),
      dx("aquiles", "Rotura del Aquiles", false, "Mecanismo y ubicación diferentes."),
      dx("sindesmosis", "Esguince alto (sindesmosis)", false, "Mecanismo de rotación externa y dolor más alto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("proteccion", "Protección, frío, compresión y elevación los primeros días", "clave", "Fase aguda."),
      mg("carga-precoz", "Carga precoz según tolerancia con tobillera semirrígida", "clave", "Mejor que la inmovilización rígida."),
      mg("propiocepcion", "Ejercicios de propiocepción", "clave", "Previenen recurrencias, sobre todo con esguinces previos."),
      mg("aines", "AINE por pocos días", "util", "Dolor."),
      mg("yeso", "Bota de yeso por 3 semanas", "innecesario", "Más rigidez y peor recuperación en esguinces leves."),
      mg("explicar", "Explicar por qué no hace falta la placa", "util", "Expectativa de la paciente."),
    ],
  },
  debrief: {
    diagnosis: "Esguince lateral de tobillo derecho grado I–II con reglas de Ottawa negativas, en una mujer de 45 años.",
    pathologies: [
      { name: "Esguince lateral de tobillo", role: "principal", why: "Lesión del ligamento peroneoastragalino anterior." },
      { name: "Inestabilidad crónica", role: "asociada", why: "Esguinces previos." },
      { name: "Fracturas de maléolo y 5.º metatarsiano", role: "diferencial", why: "Ottawa las descarta." },
    ],
    reasoning: [
      "Causa: inversión forzada del pie en flexión plantar.",
      "Mecanismo: estiramiento o rotura del peroneoastragalino anterior, el más débil.",
      "Consecuencia: dolor, edema y riesgo de inestabilidad si no se rehabilita.",
    ],
    epidemiology:
      "Es la lesión musculoesquelética más frecuente en guardia. Solo el 15 % de las radiografías de tobillo por trauma muestran fractura; las reglas de Ottawa reducen hasta un 40 % las radiografías innecesarias.",
    management: [
      "Reglas de Ottawa.",
      "Protección y carga precoz.",
      "Propiocepción.",
    ],
    sources: ["Sociedad Argentina de Medicina y Cirugía del Pie y la Pierna — Esguince de tobillo.", "Stiell IG et al. — Ottawa ankle rules (JAMA)."],
    pearls: ["Ottawa negativo: sin placa.", "Carga precoz.", "Propiocepción evita el próximo."],
    pitfalls: ["Radiografía a todos.", "Yeso en esguince leve."],
    tribunal: [
      qa("¿Qué son las reglas de Ottawa para el tobillo?", "Se pide radiografía si hay dolor maleolar y dolor óseo en el borde posterior o punta de algún maléolo, o incapacidad de caminar 4 pasos."),
      qa("¿Qué ligamento se lesiona primero en la inversión?", "El peroneoastragalino anterior, y si sigue la fuerza, el peroneocalcáneo."),
      qa("¿Por qué se recomienda carga precoz en lugar de yeso?", "Porque acelera la vuelta a la actividad, reduce la rigidez y no aumenta la inestabilidad en esguinces leves y moderados."),
    ],
  },
};
