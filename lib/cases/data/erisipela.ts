import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const erisipela: ClinicalCase = {
  id: "erisipela-facial",
  level: 1,
  area: "Dermatología",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Tuvo un resfrío con mucha secreción nasal la semana pasada." },
  frequency: "frecuente",
  intro: "“Desde ayer tengo la mejilla roja, caliente e hinchada, y anoche tuve fiebre con escalofríos.”",
  vitals: { TA: "128/80 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,7 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“De golpe: primero fiebre y escalofríos, después la mancha roja.”", "Inicio brusco con fiebre: típico de la erisipela por estreptococo."),
    act("ojo", "¿Ves bien? ¿Te duele mover el ojo?", "clave", "“Veo bien, no me duele.”", "Descarta celulitis orbitaria, que es una urgencia."),
    act("puerta", "¿Tuviste lastimaduras en la nariz, el oído o la cara?", "util", "“Me lastimé la nariz de tanto sonarme.”", "Puerta de entrada."),
    act("alergia", "¿Sos alérgica a la penicilina?", "clave", "“No.”", "Define el antibiótico."),
    act("diabetes", "¿Tenés diabetes u otra enfermedad?", "util", "“No.”", "Factores de mala evolución."),
    act("jardin", "¿Te gusta la jardinería?", "neutro", "“Sí, rosas.”", "No orienta."),
  ],
  exam: [
    act("lesion", "Inspección y palpación de la lesión", "clave", "Placa roja brillante, caliente, dolorosa, con bordes elevados y bien definidos, en mejilla y nariz.", "Bordes netos y sobreelevados: erisipela (dermis superficial)."),
    act("ojo-ex", "Movilidad ocular y agudeza visual", "clave", "Normales, sin proptosis.", "No hay compromiso orbitario."),
    act("ganglios", "Ganglios", "util", "Adenopatías submandibulares dolorosas.", "Linfangitis regional."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma y PCR", "util", "Leucocitos 14.000, PCR elevada.", "Inflamación; no indispensable en casos leves."),
    study("Microbiología", "cultivo", "Cultivo de la piel", "innecesario", "No se realizó.", "Rara vez positivo; no cambia la conducta."),
    study("Imágenes", "tc-orbita", "Tomografía de órbitas", "innecesario", "No se realizó.", "Solo si hay signos de compromiso orbitario."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("erisipela", "Erisipela facial", true, "Placa eritematosa, caliente, de bordes netos y elevados con fiebre de inicio brusco tras una lesión nasal."),
      dx("orbitaria", "Celulitis orbitaria", false, "Movilidad ocular y visión normales, sin proptosis."),
      dx("zoster", "Herpes zoster", false, "Daría vesículas en un dermatoma."),
      dx("lupus", "Eritema malar del lupus", false, "No da fiebre aguda, calor ni bordes elevados dolorosos."),
      dx("dermatitis", "Dermatitis de contacto", false, "Pica, no duele, sin fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("penicilina", "Penicilina o amoxicilina por 7–10 días (cefalexina como alternativa)", "clave", "La erisipela es casi siempre por estreptococo."),
      mg("marcar", "Marcar el borde y control en 48 h", "clave", "Permite evaluar la respuesta."),
      mg("alarma", "Pautas de alarma: dolor ocular, visión doble, somnolencia", "clave", "Detecta complicaciones orbitarias o intracraneales."),
      mg("sintomaticos", "Antitérmicos y frío local", "util", "Alivio."),
      mg("corticoide", "Corticoide tópico", "riesgoso", "No trata la infección y puede empeorarla."),
      mg("internar", "Internación de rutina", "innecesario", "Sin criterios de gravedad se trata en forma ambulatoria."),
    ],
  },
  debrief: {
    diagnosis: "Erisipela facial por estreptococo, sin compromiso orbitario, en mujer de 63 años con lesión nasal como puerta de entrada.",
    pathologies: [
      { name: "Erisipela", role: "principal", why: "Infección de dermis superficial y linfáticos." },
      { name: "Celulitis orbitaria", role: "diferencial", why: "Complicación grave a descartar." },
      { name: "Zoster, lupus, dermatitis", role: "diferencial", why: "Otras lesiones faciales." },
    ],
    reasoning: [
      "Causa: Streptococcus pyogenes que entra por una pequeña lesión de la piel.",
      "Mecanismo: infección de la dermis superficial y los linfáticos, que da bordes netos.",
      "Consecuencia: placa roja, caliente, dolorosa, con fiebre; puede recurrir si hay linfedema.",
    ],
    epidemiology:
      "La erisipela es más frecuente en adultos mayores y en piernas (por linfedema, insuficiencia venosa e intertrigo); la facial es menos común. Muchas veces la puerta de entrada pasa desapercibida.",
    management: [
      "Diagnóstico clínico.",
      "Penicilina o amoxicilina; cefalexina o clindamicina como alternativas.",
      "Buscar y tratar la puerta de entrada.",
      "Internar si hay sepsis, compromiso orbitario o falta de respuesta.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de infecciones de piel y partes blandas.", "Sociedad Argentina de Infectología — Recomendaciones de infecciones de piel."],
    pearls: ["Bordes netos y elevados = erisipela.", "Penicilina.", "En la cara, revisar el ojo."],
    pitfalls: ["No evaluar la órbita.", "Usar corticoides tópicos."],
    tribunal: [
      qa("¿Qué diferencia la erisipela de la celulitis?", "La erisipela afecta la dermis superficial y los linfáticos, con bordes netos y elevados, casi siempre por estreptococo; la celulitis afecta la dermis profunda y el tejido subcutáneo, con bordes difusos, por estreptococo o estafilococo."),
      qa("¿Qué signos sugieren fascitis necrotizante?", "Dolor desproporcionado a la lesión, ampollas violáceas, anestesia de la piel, crepitación, necrosis, progresión rápida y toxicidad sistémica; es una urgencia quirúrgica."),
      qa("¿Qué es el triángulo de peligro de la cara?", "La zona entre la comisura labial y el puente nasal, cuyas venas drenan sin válvulas al seno cavernoso; las infecciones allí pueden producir trombosis del seno cavernoso."),
    ],
  },
};
