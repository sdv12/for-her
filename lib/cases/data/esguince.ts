import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const esguince: ClinicalCase = {
  id: "esguince-tobillo",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 16, ageUnit: "años", sex: "M", context: "Jugaba al fútbol en el club." },
  frequency: "muy-frecuente",
  intro: "“Pisé mal a otro jugador y se me dobló el tobillo derecho para adentro. Escuché como un crack y se me hinchó enseguida.”",
  vitals: { TA: "118/70 mmHg", FC: "88 lpm" },
  anamnesis: [
    act("mecanismo", "¿Cómo se dobló exactamente?", "clave", "“La planta se fue para adentro, como pisando con el borde de afuera del pie.”", "La inversión con flexión plantar lesiona el ligamento peroneoastragalino anterior, el más frecuentemente afectado."),
    act("apoyo", "¿Pudo apoyar el pie y caminar después?", "clave", "“Salí rengueando, pude dar unos pasos con ayuda.”", "No poder dar 4 pasos (inmediatamente ni en la guardia) es criterio de Ottawa para pedir radiografía."),
    act("previos", "¿Se esguinzó antes ese tobillo?", "util", "“Sí, el año pasado.”", "Los esguinces recurrentes sugieren inestabilidad crónica y necesidad de rehabilitación propioceptiva."),
    act("hormigueo", "¿Siente hormigueo o el pie frío?", "util", "“No.”", "Descarta compromiso vasculonervioso."),
    act("vacunas", "¿Tiene la antitetánica al día?", "neutro", "“Sí.”", "Sin herida, no cambia la conducta."),
  ],
  exam: [
    act("ottawa", "Palpación según reglas de Ottawa: borde posterior y punta de ambos maléolos, base del 5.º metatarsiano, escafoides", "clave", "Sin dolor óseo en maléolos, base del 5.º metatarsiano ni escafoides. Dolor en partes blandas por delante del maléolo externo.", "Las reglas de Ottawa tienen sensibilidad cercana al 100 % para fractura: si son negativas, no hace falta radiografía."),
    act("marcha", "Prueba de marcha (4 pasos)", "clave", "Da 4 pasos rengueando, sin ayuda.", "Poder caminar 4 pasos es parte de las reglas de Ottawa."),
    act("inspeccion", "Inspección: edema y equimosis", "util", "Edema y equimosis en la cara lateral del tobillo.", "Orienta a la gravedad del esguince (grado I a III)."),
    act("cajon", "Cajón anterior", "util", "Levemente aumentado respecto del otro lado, con tope final.", "La laxitud sin tope sugiere rotura completa (grado III)."),
    act("pulsos", "Pulsos y sensibilidad del pie", "util", "Pulso pedio presente, sensibilidad normal.", "Descarta lesión vascular o nerviosa."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de tobillo frente, perfil y mortaja", "innecesario", "Sin fracturas.", "Con reglas de Ottawa negativas no está indicada: evita radiación y demoras."),
    study("Imágenes", "eco", "Ecografía de partes blandas", "innecesario", "Engrosamiento del ligamento peroneoastragalino anterior.", "No cambia el tratamiento inicial del esguince agudo."),
    study("Imágenes", "rmn", "Resonancia magnética de tobillo", "innecesario", "No se realizó.", "Se reserva para dolor persistente o sospecha de lesiones osteocondrales."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("esguince", "Esguince de tobillo lateral grado II (ligamento peroneoastragalino anterior)", true, "Mecanismo de inversión, dolor y edema anterolateral, equimosis, leve laxitud con tope y reglas de Ottawa negativas."),
      dx("fractura", "Fractura de maléolo externo", false, "Daría dolor óseo en el borde posterior o la punta del maléolo (Ottawa positiva)."),
      dx("quinto", "Fractura de la base del 5.º metatarsiano", false, "Mismo mecanismo, pero con dolor en la base del 5.º metatarsiano."),
      dx("aquiles", "Rotura del tendón de Aquiles", false, "Dolor posterior, “pedrada” en la pantorrilla, Thompson positivo, en general al impulsarse."),
      dx("sindesmosis", "Esguince alto (sindesmosis)", false, "Mecanismo de rotación externa, dolor por encima del tobillo y prueba de compresión positiva."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("price", "Protección, reposo relativo, hielo, compresión y elevación las primeras 48–72 h", "clave", "Controla el edema y el dolor en la fase aguda."),
      mg("apoyo", "Apoyo precoz según tolerancia con vendaje funcional o tobillera", "clave", "La movilización temprana acelera la recuperación frente a la inmovilización rígida."),
      mg("rehab", "Ejercicios de movilidad, fuerza y propiocepción antes de volver al deporte", "clave", "Previene recurrencias e inestabilidad crónica (ya tuvo un esguince previo)."),
      mg("analgesia", "Analgésicos o AINE por pocos días", "util", "Alivio sintomático."),
      mg("yeso", "Bota de yeso por 4 semanas", "innecesario", "La inmovilización prolongada en un grado II retrasa la recuperación."),
      mg("cirugia", "Derivar a cirugía de reparación ligamentaria", "innecesario", "Incluso los grado III se tratan de entrada en forma funcional; la cirugía se reserva para inestabilidad crónica."),
    ],
  },
  debrief: {
    diagnosis: "Esguince de tobillo lateral grado II, sin fractura (reglas de Ottawa negativas).",
    pathologies: [
      { name: "Esguince lateral de tobillo", role: "principal", why: "Lesión del ligamento peroneoastragalino anterior por inversión." },
      { name: "Fractura maleolar o del 5.º metatarsiano", role: "diferencial", why: "Se descartan con las reglas de Ottawa." },
      { name: "Lesión de la sindesmosis", role: "diferencial", why: "Esguince alto con recuperación más lenta." },
      { name: "Rotura del tendón de Aquiles", role: "diferencial", why: "Otra lesión deportiva frecuente." },
    ],
    reasoning: [
      "Causa: inversión forzada del pie con flexión plantar, típica del fútbol y el básquet.",
      "Mecanismo: el ligamento peroneoastragalino anterior es el que está más tenso en flexión plantar y se rompe primero; si sigue la fuerza, se lesiona el peroneocalcáneo.",
      "Consecuencia: rotura de fibras con sangrado → edema, equimosis, dolor y, según el grado, laxitud articular (grado I distensión, II rotura parcial, III completa).",
      "Las reglas de Ottawa buscan dolor óseo en los lugares donde se fractura con este mecanismo: si no hay, la fractura es muy improbable.",
    ],
    epidemiology:
      "Es la lesión deportiva más frecuente y una de las consultas traumatológicas más comunes en guardia. Predomina entre los 15 y 35 años. En adolescentes y jóvenes es más frecuente en varones (por más deportes de contacto); en adultos mayores de 30 se iguala o predomina en mujeres. Hasta un tercio queda con síntomas o inestabilidad si no se rehabilita.",
    management: [
      "Aplicar las reglas de Ottawa: radiografía solo si hay dolor óseo en las zonas definidas o no puede dar 4 pasos.",
      "Fase aguda: protección, hielo, compresión, elevación y analgesia.",
      "Apoyo precoz con soporte funcional (vendaje o tobillera); evitar inmovilización rígida prolongada.",
      "Rehabilitación con propiocepción y fortalecimiento; volver al deporte progresivamente.",
      "Derivar a traumatología si hay inestabilidad persistente o dolor que no mejora en 4–6 semanas.",
    ],
    sources: [
      "Reglas de Ottawa para tobillo y pie (Stiell et al.), adoptadas en la Asociación Argentina de Ortopedia y Traumatología.",
      "Asociación Argentina de Traumatología del Deporte — recomendaciones de manejo del esguince de tobillo.",
    ],
    pearls: [
      "Ottawa negativa = no hace falta radiografía.",
      "El ligamento que más se lesiona es el peroneoastragalino anterior.",
      "Movilización temprana y propiocepción, no yeso.",
    ],
    pitfalls: ["Radiografiar todos los tobillos.", "Enyesar un esguince grado II.", "Volver al deporte sin rehabilitación."],
  },
};
