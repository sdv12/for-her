import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const impetigo: ClinicalCase = {
  id: "impetigo-nino",
  level: 1,
  area: "Dermatología",
  setting: "CAPS",
  patient: { age: 4, ageUnit: "años", sex: "M", context: "Enero. Va a una colonia de vacaciones." },
  frequency: "muy-frecuente",
  intro: "“Le salieron unas lastimaduras alrededor de la nariz y la boca con costras amarillas, como de miel. Se rasca y se le están pasando a la cara.”",
  vitals: { "T°": "36,7 °C", Peso: "17 kg" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“Primero un granito con agua, se rompió y quedó la costra.”", "Vesícula o pústula que se rompe y deja costra melicérica: impétigo no ampollar."),
    act("picaduras", "¿Tenía picaduras, raspones o mocos antes?", "util", "“Picaduras de mosquito y mocos.”", "Las lesiones previas de la piel son la puerta de entrada."),
    act("fiebre", "¿Tiene fiebre o está decaído?", "clave", "“No, está bien.”", "Sin compromiso general: tratamiento tópico."),
    act("contactos", "¿Hay otros chicos con lo mismo?", "util", "“Dos en la colonia.”", "Es muy contagioso por contacto."),
    act("orina", "¿Notaron la orina oscura o la cara hinchada?", "util", "“No.”", "La glomerulonefritis posestreptocócica puede seguir al impétigo (no se previene con antibiótico)."),
    act("alergia", "¿Es alérgico a algún antibiótico?", "util", "“No.”", "Para elegir el tratamiento."),
    act("dibujos", "¿Qué dibujitos mira?", "neutro", "“Paw Patrol.”", "No orienta."),
  ],
  exam: [
    act("lesiones", "Inspección de las lesiones", "clave", "Lesiones erosivas con costras melicéricas en región perinasal y peribucal, unas 6, menos del 2 % de la superficie.", "Impétigo localizado: alcanza con tratamiento tópico."),
    act("ganglios", "Ganglios", "util", "Adenopatía submaxilar pequeña.", "Linfadenitis reactiva."),
    act("extension", "Buscar lesiones en otras zonas", "clave", "Sin otras lesiones.", "Las formas extensas requieren antibiótico oral."),
    act("cabeza", "Cuero cabelludo", "util", "Sin piojos ni lesiones.", "La pediculosis rascada se impetiginiza."),
  ],
  studies: [
    study("Microbiología", "cultivo", "Cultivo de la lesión", "innecesario", "Staphylococcus aureus.", "No hace falta en el impétigo típico; sí en recurrencias o fallas."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "Normal.", "No aporta."),
    study("Laboratorio", "orina", "Orina completa", "neutro", "Normal.", "Solo si aparecen edemas, hipertensión u orina oscura."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("impetigo", "Impétigo no ampollar localizado", true, "Lesiones con costras melicéricas en la cara, sin compromiso general, en un niño en verano."),
      dx("herpes", "Herpes simple", false, "Vesículas agrupadas sobre base eritematosa, dolorosas, con costras serohemáticas, no melicéricas."),
      dx("dermatitis", "Dermatitis atópica sobreinfectada", false, "Habría eccema previo en pliegues y prurito crónico."),
      dx("tina", "Tiña de la cara", false, "Placa anular con borde activo descamativo, sin costras melicéricas."),
      dx("varicela", "Varicela", false, "Vesículas en distintos estadios en todo el cuerpo, con fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("topico", "Mupirocina o ácido fusídico tópico 2–3 veces por día por 5–7 días, tras lavar y retirar costras", "clave", "Tratamiento de elección del impétigo localizado."),
      mg("higiene", "Lavado de manos, uñas cortas, toalla propia; volver a la colonia 24 h después de iniciar el tratamiento", "clave", "Corta el contagio."),
      mg("oral", "Cefalexina oral si fuera extenso o con lesiones múltiples", "util", "Para formas extensas, ampollares o con fallo del tópico."),
      mg("corticoide", "Crema con corticoide", "riesgoso", "Empeora la infección bacteriana."),
      mg("oral-ya", "Antibiótico oral de entrada en este caso", "innecesario", "Con pocas lesiones alcanza el tópico; el oral suma efectos adversos y resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Impétigo no ampollar localizado en cara, en niño de 4 años.",
    pathologies: [
      { name: "Impétigo no ampollar", role: "principal", why: "Infección superficial de la piel con costras melicéricas." },
      { name: "Herpes simple", role: "diferencial", why: "Vesículas agrupadas en la cara." },
      { name: "Glomerulonefritis posestreptocócica", role: "asociada", why: "Complicación posible a las 3–6 semanas." },
    ],
    reasoning: [
      "Causa: Staphylococcus aureus y Streptococcus pyogenes que colonizan la piel.",
      "Mecanismo: entran por pequeñas lesiones (picaduras, raspones, rascado) e infectan la epidermis.",
      "Consecuencia: vesículas o pústulas frágiles que se rompen y dejan costras amarillentas (melicéricas), muy contagiosas por contacto.",
    ],
    epidemiology:
      "Es la infección bacteriana de piel más frecuente en niños de 2 a 5 años, sobre todo en verano y en climas cálidos y húmedos, con hacinamiento y escasa higiene. Se contagia fácilmente en jardines y colonias.",
    management: [
      "Diagnóstico clínico.",
      "Localizado: higiene y antibiótico tópico.",
      "Extenso, ampollar o con síntomas generales: antibiótico oral (cefalexina).",
      "Medidas para evitar el contagio y control de complicaciones.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de infecciones de piel y partes blandas en pediatría.", "Sociedad Argentina de Pediatría — Guía de infecciones de piel."],
    pearls: ["Costras color miel = impétigo.", "Pocas lesiones: tópico.", "No corticoides."],
    pitfalls: ["Indicar corticoides tópicos.", "Dar antibiótico oral a todos."],
    tribunal: [
      qa("¿Qué diferencia el impétigo ampollar del no ampollar?", "El no ampollar (el más frecuente) da costras melicéricas, por estafilococo o estreptococo. El ampollar es por toxinas exfoliativas de S. aureus: ampollas flácidas que dejan erosiones, más en lactantes."),
      qa("¿Qué es el síndrome de piel escaldada estafilocócica?", "Una forma generalizada por toxinas exfoliativas de S. aureus en niños pequeños: eritema doloroso, ampollas y desprendimiento de la piel (Nikolsky positivo); requiere internación y antibiótico endovenoso."),
      qa("¿Qué complicaciones tiene el impétigo estreptocócico?", "Celulitis, linfangitis, bacteriemia y glomerulonefritis posestreptocócica (no fiebre reumática)."),
    ],
  },
};
