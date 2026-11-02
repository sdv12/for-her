import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sarnaCostrosa: ClinicalCase = {
  id: "escabiosis-costrosa-geriatrico",
  level: 2,
  area: "Dermatología",
  setting: "Domicilio",
  patient: { age: 84, ageUnit: "años", sex: "M", context: "Vive en un geriátrico. Tiene demencia avanzada y toma corticoides por EPOC. Varias enfermeras tienen picazón." },
  frequency: "poco-frecuente",
  intro: "“Tiene la piel de las manos y los codos con costras gruesas hace semanas. Le pusimos cremas con corticoide y está peor. Ahora el personal tiene picazón.” (relata la enfermera del geriátrico)",
  vitals: { TA: "128/72 mmHg", FC: "82 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("brote", "¿Cuántas personas del geriátrico tienen picazón?", "clave", "“Cinco del personal y dos residentes.”", "Brote institucional: sugiere sarna, y una sarna costrosa como foco muy contagioso."),
    act("corticoides", "¿Qué medicación recibe? ¿Corticoides?", "clave", "“Prednisona por la EPOC y crema de betametasona.”", "La inmunosupresión favorece la sarna costrosa con millones de ácaros."),
    act("picazon", "¿Se rasca?", "util", "“Poco, está muy demenciado.”", "En la sarna costrosa el prurito puede ser escaso."),
    act("tiempo", "¿Desde cuándo?", "util", "“Más de un mes.”", "Evolución prolongada."),
    act("ropa", "¿Cómo se lava la ropa y las sábanas?", "util", "“Junto con la de todos.”", "Fómites: la sarna costrosa contagia por ropa de cama."),
    act("familia", "¿Lo visita la familia?", "neutro", "“Los domingos.”", "No orienta."),
  ],
  exam: [
    act("piel", "Examen de la piel", "clave", "Placas hiperqueratósicas grisáceas, costrosas y fisuradas en manos, codos, rodillas y entre los dedos; uñas engrosadas.", "Sarna costrosa (noruega)."),
    act("sobreinfeccion", "Buscar sobreinfección", "util", "Fisuras con secreción en una mano.", "Riesgo de sepsis por estafilococo o estreptococo."),
    act("personal", "Revisar al personal con picazón", "clave", "Pápulas y surcos en muñecas e interdigitales.", "Sarna clásica secundaria."),
  ],
  studies: [
    study("Microbiología", "raspado", "Raspado de las costras al microscopio", "clave", "Abundantes ácaros, huevos y heces de Sarcoptes scabiei.", "Confirma: en la costrosa hay miles a millones de ácaros."),
    study("Laboratorio", "hemograma", "Hemograma", "util", "Eosinofilia.", "Frecuente."),
    study("Otros", "biopsia", "Biopsia de piel", "innecesario", "No se realizó.", "El raspado confirmó."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("costrosa", "Escabiosis costrosa (noruega) en adulto mayor inmunosuprimido, foco de un brote institucional", true, "Placas hiperqueratósicas en manos y codos con poco prurito, corticoides, raspado con abundantes ácaros y casos de sarna en el personal."),
      dx("psoriasis", "Psoriasis", false, "No contagia y el raspado muestra ácaros."),
      dx("dermatitis", "Dermatitis por contacto", false, "No explica el brote ni los ácaros."),
      dx("micosis", "Dermatofitosis extensa", false, "El raspado muestra Sarcoptes."),
      dx("clasica", "Sarna clásica", false, "La hiperqueratosis extensa y la carga de ácaros definen la forma costrosa."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("combinado", "Permetrina tópica en todo el cuerpo repetida más ivermectina oral en varias dosis, y queratolíticos en las costras", "clave", "La sarna costrosa requiere tratamiento combinado y prolongado."),
      mg("aislamiento", "Aislamiento de contacto, guantes y camisolín", "clave", "Es extremadamente contagiosa."),
      mg("todos", "Tratar al mismo tiempo a residentes, personal y convivientes, y lavar ropa y sábanas a más de 60 °C", "clave", "Sin tratamiento simultáneo, el brote continúa."),
      mg("corticoide", "Suspender los corticoides tópicos y revisar los sistémicos", "util", "Favorecen la proliferación del ácaro."),
      mg("solo-crema", "Una sola aplicación de permetrina", "riesgoso", "Insuficiente para la forma costrosa."),
      mg("mas-corticoide", "Aumentar el corticoide tópico", "riesgoso", "Empeora la sarna."),
    ],
  },
  debrief: {
    diagnosis: "Escabiosis costrosa (noruega) en varón de 84 años con demencia e inmunosupresión por corticoides, como foco de un brote de sarna en un geriátrico.",
    pathologies: [
      { name: "Escabiosis costrosa", role: "principal", why: "Infestación masiva por Sarcoptes scabiei." },
      { name: "Brote institucional de sarna", role: "asociada", why: "Contagio a personal y residentes." },
      { name: "Psoriasis, dermatitis, micosis", role: "diferencial", why: "Otras dermatosis descamativas." },
    ],
    reasoning: [
      "Causa: Sarcoptes scabiei en una persona inmunosuprimida o que no puede rascarse.",
      "Mecanismo: sin respuesta inmune eficaz ni rascado, el ácaro prolifera sin control y forma costras con millones de ácaros.",
      "Consecuencia: hiperqueratosis, sobreinfección, sepsis y brotes por contacto y fómites.",
    ],
    epidemiology:
      "La sarna costrosa es rara, pero frecuente en instituciones geriátricas y en personas con inmunosupresión, demencia, discapacidad o VIH. Es un foco habitual de brotes porque se diagnostica tarde, confundida con psoriasis o dermatitis.",
    management: [
      "Sospechar ante dermatosis costrosa con brote de prurito en el entorno.",
      "Raspado para confirmar.",
      "Ivermectina oral repetida más permetrina y queratolíticos.",
      "Control del brote: tratamiento simultáneo, aislamiento, ropa y ambiente.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de escabiosis.", "Ministerio de Salud de la Nación — Recomendaciones para el control de brotes de escabiosis en instituciones."],
    pearls: ["Brote de picazón en el personal = buscar una sarna costrosa.", "Ivermectina + permetrina.", "Tratar a todos a la vez."],
    pitfalls: ["Confundirla con psoriasis.", "Poner más corticoide."],
    tribunal: [
      qa("¿Cómo se trata la escabiosis clásica?", "Permetrina al 5 % en todo el cuerpo del cuello a los pies (incluyendo cuero cabelludo en lactantes) por 8–12 h, repetida a los 7 días, o ivermectina oral en dos dosis en mayores de 15 kg; tratar a todos los convivientes a la vez y lavar la ropa."),
      qa("¿Por qué la picazón puede seguir después del tratamiento?", "Por la reacción de hipersensibilidad a los restos del ácaro, que puede durar 2 a 4 semanas; no significa fracaso si no aparecen lesiones nuevas."),
      qa("¿Dónde se localiza la sarna clásica?", "En espacios interdigitales, muñecas, codos, axilas, cintura, glúteos, genitales y areolas; en lactantes también palmas, plantas y cabeza; respeta la cara en adultos."),
    ],
  },
};
