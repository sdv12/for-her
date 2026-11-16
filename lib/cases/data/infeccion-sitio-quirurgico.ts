import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const infeccionSitioQuirurgico: ClinicalCase = {
  id: "infeccion-sitio-quirurgico",
  level: 2,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 49, ageUnit: "años", sex: "F", context: "Diabética, IMC 36. Le hicieron una colecistectomía abierta hace 6 días por una colecistitis complicada." },
  frequency: "frecuente",
  intro: "“La herida me supura y está colorada. Ayer tuve fiebre.”",
  vitals: { TA: "126/78 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,2 °C" },
  anamnesis: [
    act("inicio", "¿Cuándo empezó a ponerse colorada?", "clave", "“Hace dos días.”", "Entre el día 4 y 7: típico de infección de la herida."),
    act("secrecion", "¿Cómo es lo que sale?", "clave", "“Pus amarillento con olor.”", "Secreción purulenta: criterio diagnóstico."),
    act("dolor-abdominal", "¿Le duele la panza por dentro, vomita, tiene diarrea?", "clave", "“No, solo la herida.”", "Ayuda a distinguir de una infección de órgano o espacio."),
    act("glucemias", "¿Cómo tiene las glucemias?", "clave", "“Altas, de 250.”", "La hiperglucemia favorece y empeora la infección."),
    act("curaciones", "¿Quién le hace las curaciones?", "util", "“Yo, con lo que tengo.”", "Técnica y adherencia."),
    act("alergias", "¿Es alérgica a algún antibiótico?", "util", "“No.”", "Necesario antes de indicar."),
  ],
  exam: [
    act("herida", "Herida quirúrgica", "clave", "Eritema de 3 cm alrededor del tercio medio de la incisión subcostal, fluctuación y salida de pus al presionar. Aponeurosis indemne al explorar.", "Infección incisional superficial con colección."),
    act("abdomen", "Abdomen profundo", "clave", "Blando, sin defensa.", "No sugiere colección intraabdominal."),
    act("crepitacion", "Crepitación y necrosis", "clave", "No hay.", "Descarta infección necrotizante."),
  ],
  studies: [
    study("Microbiología", "cultivo", "Cultivo del pus por punción o tejido", "clave", "Staphylococcus aureus sensible a meticilina.", "Útil si hace falta antibiótico."),
    study("Laboratorio", "lab", "Hemograma, glucemia y función renal", "clave", "Leucocitos 13.200, glucemia 268 mg/dl.", "Sistémico y control metabólico."),
    study("Imágenes", "eco", "Ecografía de pared y abdomen", "util", "Colección subcutánea de 3 cm; sin colecciones intraabdominales.", "Define profundidad."),
    study("Microbiología", "hisopado-superficial", "Hisopado superficial de la piel", "innecesario", "No se tomó.", "Recupera colonizantes y confunde."),
    study("Imágenes", "tac", "TC de abdomen de urgencia", "innecesario", "No se pidió.", "Sin clínica de órgano o espacio y con eco tranquilizadora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("isq-superficial", "Infección del sitio quirúrgico incisional superficial", true, "Pus en piel y subcutáneo al sexto día, con aponeurosis indemne y sin colección profunda."),
      dx("isq-profunda", "Infección incisional profunda", false, "La aponeurosis está indemne."),
      dx("organo-espacio", "Absceso subhepático", false, "Sin dolor profundo y eco sin colecciones."),
      dx("seroma", "Seroma", false, "El seroma no es purulento ni da fiebre."),
      dx("fascitis", "Fascitis necrotizante", false, "Sin crepitación, necrosis ni dolor desproporcionado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("abrir", "Abrir la herida, drenar y lavar", "clave", "El drenaje es el tratamiento principal."),
      mg("curaciones", "Curaciones diarias y cierre por segunda intención", "clave", "Herida abierta que granula."),
      mg("cefalexina", "Cefalexina oral por eritema mayor de 5 cm o signos sistémicos", "util", "Con fiebre y celulitis perilesional se agrega antibiótico."),
      mg("glucemia", "Mejorar el control glucémico", "clave", "Con glucemia alta la herida no cura."),
      mg("solo-atb", "Solo antibiótico sin abrir la herida", "riesgoso", "El pus encerrado no se esteriliza con antibióticos."),
      mg("reoperar", "Relaparotomía", "innecesario", "No hay compromiso profundo."),
    ],
  },
  debrief: {
    diagnosis: "Infección del sitio quirúrgico incisional superficial por S. aureus al sexto día de una colecistectomía abierta, en una mujer diabética y obesa.",
    pathologies: [
      { name: "Infección incisional superficial", role: "principal", why: "Compromete piel y subcutáneo dentro de los 30 días." },
      { name: "Diabetes mal controlada y obesidad", role: "asociada", why: "Factores de riesgo." },
      { name: "Infección de órgano o espacio", role: "diferencial", why: "Se descarta con clínica e imágenes." },
    ],
    reasoning: [
      "Causa: contaminación de la herida por flora cutánea, sobre todo S. aureus.",
      "Mecanismo: hiperglucemia, tejido adiposo poco irrigado y cirugía contaminada.",
      "Consecuencia: colección purulenta subcutánea que requiere drenaje.",
    ],
    epidemiology:
      "Es la infección asociada al cuidado de la salud más frecuente en pacientes quirúrgicos: entre el 2 y el 5 % de las cirugías, y hasta un 20 % en las abdominales contaminadas. La obesidad, la diabetes, el tabaco y la cirugía de urgencia aumentan el riesgo.",
    management: [
      "Abrir y drenar.",
      "Curaciones y cierre por segunda intención.",
      "Antibiótico solo si hay celulitis extensa o compromiso sistémico.",
      "Control de la glucemia.",
    ],
    sources: ["Sociedad Argentina de Infectología — Prevención de la infección del sitio quirúrgico.", "CDC — Surgical Site Infection Event (SSI) definitions."],
    pearls: ["Superficial, profunda u órgano-espacio: definí el nivel.", "Pus se drena.", "Glucemia controlada, herida que cura."],
    pitfalls: ["Tratar solo con antibióticos.", "Cultivar con hisopado superficial."],
    tribunal: [
      qa("¿Cómo se clasifican las infecciones del sitio quirúrgico?", "Incisional superficial (piel y subcutáneo), incisional profunda (fascia y músculo) y de órgano o espacio."),
      qa("¿Qué medidas previenen la infección del sitio quirúrgico?", "Profilaxis antibiótica en la hora previa, no rasurar con hoja, antisepsia con clorhexidina alcohólica, normotermia y control de la glucemia."),
      qa("¿Cuándo se agrega antibiótico al drenaje?", "Con eritema mayor de 5 cm, induración, signos sistémicos o inmunocompromiso."),
    ],
  },
};
