import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const invaginacion: ClinicalCase = {
  id: "invaginacion-intestinal",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 9, ageUnit: "meses", sex: "M", context: "Lo traen los papás a la noche." },
  frequency: "frecuente",
  intro: "“Desde la tarde tiene ataques de llanto muy fuerte, encoge las piernas, se pone pálido y después se calma un rato. Vomitó dos veces. Recién hizo una caca con sangre y moco.”",
  vitals: { FC: "156 lpm", FR: "34 rpm", "T°": "37,4 °C", "SatO₂": "98 %", Peso: "9 kg" },
  anamnesis: [
    act("episodios", "¿Cómo son los ataques de llanto y qué hace entre uno y otro?", "clave", "“Llora desesperado unos minutos, encoge las piernas, y después queda tranquilo o dormido. Cada 15 o 20 minutos.”", "Dolor cólico paroxístico con intervalos libres: típico de la invaginación."),
    act("heces", "¿Cómo era la caca con sangre?", "clave", "“Como jalea de grosella, roja oscura con moco.”", "Las heces en jalea de grosella son un signo tardío de isquemia de la mucosa."),
    act("vomitos", "¿Cómo son los vómitos?", "util", "“Primero comida, el último verdoso.”", "Vómitos biliosos indican obstrucción intestinal."),
    act("virus", "¿Estuvo resfriado o con diarrea los días previos?", "util", "“Una semana con mocos.”", "La hiperplasia linfoide por infecciones virales actúa como cabeza de invaginación."),
    act("letargia", "¿Está más dormido o decaído?", "clave", "“Entre los llantos está muy dormido.”", "La letargia puede ser la única manifestación en algunos lactantes."),
    act("vacuna", "¿Recibió la vacuna contra rotavirus? ¿Cuándo?", "util", "“Sí, a los 2 y 4 meses.”", "La vacuna tiene un riesgo muy bajo de invaginación en la semana siguiente a la dosis; no es el caso."),
    act("juguete", "¿Tiene hermanos?", "neutro", "“No.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Palpación abdominal (entre episodios)", "clave", "Masa alargada, en salchicha, en hipocondrio derecho; fosa ilíaca derecha vacía.", "Signo de Dance y masa en salchicha: muy sugestivos."),
    act("tacto", "Tacto rectal", "util", "Moco con sangre en el guante.", "Confirma el sangrado."),
    act("hidratacion", "Hidratación y perfusión", "clave", "Mucosas secas, relleno capilar 3 s.", "Requiere hidratación antes de la reducción."),
    act("peritonismo", "Signos peritoneales", "clave", "Sin defensa ni distensión importante.", "La peritonitis o el shock contraindican la reducción no quirúrgica."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía abdominal", "clave", "Imagen en diana (corte transversal) y en pseudorriñón en el flanco derecho: invaginación ileocólica.", "Es el estudio de elección: sensibilidad y especificidad cercanas al 100 %."),
    study("Laboratorio", "lab", "Ionograma, hemograma y gases", "util", "Leve acidosis metabólica.", "Guía la hidratación."),
    study("Imágenes", "rx", "Radiografía de abdomen", "util", "Escaso gas en el colon derecho, sin neumoperitoneo.", "Útil para descartar perforación antes de la reducción."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "La ecografía alcanza y evita radiación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("invaginacion", "Invaginación intestinal ileocólica", true, "Lactante de 9 meses con dolor cólico paroxístico, vómitos, heces en jalea de grosella, masa en salchicha e imagen en diana."),
      dx("gastroenteritis", "Gastroenteritis aguda", false, "Diarrea abundante con dolor continuo, sin intervalos libres ni masa."),
      dx("colico", "Cólico del lactante", false, "Ocurre en los primeros 3–4 meses, sin vómitos biliosos, sangre ni masa."),
      dx("apendicitis", "Apendicitis", false, "Rara a esta edad, sin heces con sangre ni masa en salchicha."),
      dx("hernia", "Hernia inguinal atascada", false, "Habría un bulto inguinal o escrotal doloroso e irreductible."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hidratacion", "Hidratación endovenosa, ayuno y sonda nasogástrica si vomita", "clave", "Estabiliza antes del procedimiento."),
      mg("reduccion", "Reducción hidrostática (o neumática) guiada por ecografía o radioscopia con cirugía disponible", "clave", "Sin peritonitis ni shock, la reducción no quirúrgica es exitosa en la mayoría."),
      mg("cirugia", "Cirugía si falla la reducción o hay perforación o peritonitis", "clave", "Reducción manual o resección del segmento necrótico."),
      mg("observacion", "Observación posterior por recurrencia", "util", "Recurre en alrededor del 10 %, sobre todo en las primeras 24 h."),
      mg("alta", "Alta con antiespasmódicos y control al día siguiente", "riesgoso", "La demora lleva a isquemia, perforación y peritonitis."),
      mg("enema-sin", "Enema evacuante casero", "riesgoso", "No reduce la invaginación y puede perforar."),
    ],
  },
  debrief: {
    diagnosis: "Invaginación intestinal ileocólica idiopática en lactante de 9 meses, sin peritonitis.",
    pathologies: [
      { name: "Invaginación intestinal", role: "principal", why: "Un segmento de intestino se introduce en el siguiente." },
      { name: "Gastroenteritis y cólico del lactante", role: "diferencial", why: "Llanto y vómitos en lactantes." },
      { name: "Hernia inguinal atascada", role: "diferencial", why: "Otra obstrucción a esta edad." },
    ],
    reasoning: [
      "Causa: en lactantes suele ser idiopática, con hiperplasia de las placas de Peyer (tras virosis) como cabeza de invaginación; en mayores se busca una causa (divertículo de Meckel, pólipo, linfoma).",
      "Mecanismo: el íleon se introduce en el colon arrastrando su mesenterio; se comprime el retorno venoso, se produce edema y luego isquemia.",
      "Consecuencia: dolor cólico paroxístico, vómitos, heces en jalea de grosella por la mucosa isquémica, y si no se resuelve, necrosis, perforación y shock.",
    ],
    epidemiology:
      "Es la causa más frecuente de obstrucción intestinal entre los 3 meses y los 3 años, con pico entre los 5 y 10 meses. Es más frecuente en varones (3:2) y tiene relación estacional con las infecciones virales.",
    management: [
      "Sospechar ante dolor cólico paroxístico con letargia, vómitos o sangre en heces en un lactante.",
      "Ecografía para confirmar.",
      "Hidratación y reducción hidrostática o neumática si no hay contraindicaciones.",
      "Cirugía ante falla, perforación o peritonitis.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones sobre dolor abdominal agudo en pediatría.", "Sociedad Argentina de Cirugía Infantil — Guía de invaginación intestinal."],
    pearls: ["Llanto paroxístico + piernas encogidas + intervalos libres = invaginación.", "La jalea de grosella es tardía.", "Ecografía: imagen en diana."],
    pitfalls: ["Esperar la sangre en heces para sospecharla.", "Dar el alta como cólico."],
    tribunal: [
      qa("¿Cuál es la tríada clásica de la invaginación?", "Dolor abdominal cólico, vómitos y heces en jalea de grosella; está completa en menos de la mitad de los casos."),
      qa("¿Cuándo está contraindicada la reducción hidrostática?", "Ante perforación (neumoperitoneo), peritonitis o shock: va directo a cirugía."),
      qa("¿Qué causas de obstrucción intestinal hay según la edad en pediatría?", "Recién nacido: atresias, malrotación con vólvulo, Hirschsprung, íleo meconial. Lactante: estenosis hipertrófica de píloro (primeros meses), hernia inguinal atascada, invaginación. Mayores: apendicitis complicada, bridas, divertículo de Meckel."),
    ],
  },
};
