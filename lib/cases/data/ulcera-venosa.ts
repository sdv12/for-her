import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ulceraVenosa: ClinicalCase = {
  id: "ulcera-venosa-pierna",
  level: 2,
  area: "Cardiovascular",
  setting: "CAPS",
  patient: { age: 71, ageUnit: "años", sex: "F", context: "Várices desde joven. Tuvo una trombosis en la pierna izquierda hace 15 años. Trabajó de pie como cocinera." },
  frequency: "frecuente",
  intro: "“Tengo una herida en el tobillo izquierdo hace cuatro meses que no cierra. Le pongo cremas que me recomiendan y no mejora.”",
  vitals: { TA: "134/80 mmHg", FC: "76 lpm", "T°": "36,4 °C", Peso: "78 kg" },
  anamnesis: [
    act("pesadez", "¿Las piernas se hinchan y pesan al final del día? ¿Mejoran al levantarlas?", "clave", "“Sí, a la tarde están pesadas; mejoran con las piernas en alto.”", "Síntomas de insuficiencia venosa."),
    act("claudicacion", "¿Te duelen las pantorrillas al caminar y se calman al parar?", "clave", "“No.”", "Descarta enfermedad arterial (claudicación)."),
    act("diabetes", "¿Tenés diabetes o fumás?", "clave", "“No.”", "Descarta causa diabética o arterial."),
    act("cremas", "¿Qué cremas usaste?", "util", "“Una con antibiótico y otra con neomicina.”", "Pueden causar dermatitis de contacto."),
    act("tvp", "¿Tuviste una trombosis?", "util", "“Hace 15 años en esa pierna.”", "Síndrome postrombótico."),
    act("cocina", "¿Qué te gustaba cocinar?", "neutro", "“Empanadas.”", "No orienta."),
  ],
  exam: [
    act("ulcera", "Características de la úlcera", "clave", "Úlcera de 4 cm en el maléolo interno, bordes irregulares, lecho con fibrina y granulación, exudado moderado, poco dolorosa.", "Localización y aspecto típicos de úlcera venosa."),
    act("piel", "Piel alrededor", "clave", "Hiperpigmentación ocre, lipodermatoesclerosis, várices, edema.", "Signos de insuficiencia venosa crónica."),
    act("pulsos", "Pulsos pedios y tibiales", "clave", "Presentes.", "Necesario antes de indicar compresión."),
  ],
  studies: [
    study("Otros", "itb", "Índice tobillo-brazo", "clave", "1,0.", "Descarta enfermedad arterial significativa: permite compresión."),
    study("Imágenes", "doppler", "Ecodoppler venoso", "util", "Insuficiencia de la safena interna y del sistema profundo, sin trombosis activa.", "Define el tratamiento."),
    study("Microbiología", "cultivo", "Hisopado de rutina de la úlcera", "innecesario", "No se realizó.", "Todas las úlceras crónicas están colonizadas; solo se cultiva si hay infección clínica."),
    study("Otros", "biopsia", "Biopsia si no cicatriza en 3 meses de tratamiento adecuado o tiene aspecto atípico", "util", "No fue necesaria.", "Descarta malignidad (úlcera de Marjolin)."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("venosa", "Úlcera venosa crónica en maléolo interno por insuficiencia venosa crónica (CEAP C6) con síndrome postrombótico", true, "Úlcera en el maléolo interno con dermatitis ocre, lipodermatoesclerosis, várices, edema, pulsos presentes e índice tobillo-brazo normal."),
      dx("arterial", "Úlcera arterial", false, "Las arteriales son dolorosas, en dedos o zonas de presión, con pulsos ausentes e ITB bajo."),
      dx("neuropatica", "Úlcera neuropática diabética", false, "No es diabética y la localización no es de apoyo plantar."),
      dx("pioderma", "Pioderma gangrenoso", false, "Bordes violáceos socavados, muy doloroso."),
      dx("cancer", "Carcinoma espinocelular", false, "Se sospecha si no cicatriza con tratamiento o tiene bordes elevados."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("compresion", "Terapia compresiva (vendaje multicapa o medias de compresión)", "clave", "Es el tratamiento principal: acelera la cicatrización y previene recurrencias."),
      mg("curacion", "Curación con limpieza, desbridamiento y apósitos según el exudado", "clave", "Favorece la cicatrización."),
      mg("elevacion", "Elevar las piernas, caminar y control del peso", "clave", "Mejora el retorno venoso."),
      mg("suspender-neomicina", "Suspender cremas con antibióticos y neomicina", "util", "Sensibilizan la piel."),
      mg("atb-oral", "Antibiótico oral por estar colonizada", "innecesario", "Sin infección clínica no está indicado."),
      mg("compresion-sin-itb", "Compresión fuerte sin evaluar los pulsos", "riesgoso", "En enfermedad arterial puede causar necrosis."),
    ],
  },
  debrief: {
    diagnosis: "Úlcera venosa crónica del maléolo interno izquierdo por insuficiencia venosa crónica con síndrome postrombótico, sin enfermedad arterial, en mujer de 71 años.",
    pathologies: [
      { name: "Úlcera venosa crónica", role: "principal", why: "Complicación de la hipertensión venosa." },
      { name: "Síndrome postrombótico", role: "asociada", why: "Daño valvular por TVP previa." },
      { name: "Úlcera arterial, neuropática, pioderma, cáncer", role: "diferencial", why: "Otras úlceras de pierna." },
    ],
    reasoning: [
      "Causa: insuficiencia de las válvulas venosas por várices y trombosis previa.",
      "Mecanismo: la hipertensión venosa produce extravasación de líquido, fibrina y hematíes (hemosiderina), inflamación y fibrosis.",
      "Consecuencia: edema, dermatitis ocre, lipodermatoesclerosis y úlcera con cicatrización lenta.",
    ],
    epidemiology:
      "Las úlceras venosas son la causa más frecuente de úlceras de pierna (70 %), afectan sobre todo a mujeres mayores y tienen alta recurrencia. Generan gran costo y deterioro de la calidad de vida.",
    management: [
      "Diferenciar el tipo de úlcera; índice tobillo-brazo antes de comprimir.",
      "Compresión, curación y elevación.",
      "Tratamiento de las várices para prevenir recurrencias.",
      "Biopsia si no cicatriza.",
    ],
    sources: ["Sociedad Argentina de Flebología y Linfología — Consenso de úlceras venosas.", "Clasificación CEAP de enfermedad venosa crónica."],
    pearls: ["Maléolo interno + dermatitis ocre = venosa.", "ITB antes de comprimir.", "La compresión es el tratamiento."],
    pitfalls: ["Antibióticos por colonización.", "Comprimir sin evaluar los pulsos."],
    tribunal: [
      qa("¿Qué es el índice tobillo-brazo?", "El cociente entre la presión sistólica del tobillo y la del brazo; normal entre 0,9 y 1,3; menor de 0,9 indica enfermedad arterial y menor de 0,5, isquemia grave; mayor de 1,3 sugiere arterias calcificadas (diabetes)."),
      qa("¿Qué diferencia una úlcera venosa de una arterial?", "Venosa: maléolo interno, poco dolorosa, bordes irregulares, exudativa, con edema y dermatitis ocre, pulsos presentes. Arterial: dedos o zonas de presión, muy dolorosa, bordes netos en sacabocado, lecho pálido, piel fría, pulsos ausentes."),
      qa("¿Qué es la clasificación CEAP?", "La clasificación de la enfermedad venosa crónica por clínica (C0 a C6: telangiectasias, várices, edema, cambios cutáneos, úlcera cicatrizada y activa), etiología, anatomía y fisiopatología."),
    ],
  },
};
