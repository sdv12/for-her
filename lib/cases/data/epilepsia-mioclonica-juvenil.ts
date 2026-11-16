import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epilepsiaMioclonicaJuvenil: ClinicalCase = {
  id: "epilepsia-mioclonica-juvenil",
  level: 3,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 17, ageUnit: "años", sex: "M", context: "Último año del secundario. Volvía de una fiesta: durmió 3 horas." },
  frequency: "frecuente",
  intro: "La mamá: “Se cayó convulsionando en el desayuno. Hace meses que se le cae la taza a la mañana.”",
  vitals: { TA: "122/76 mmHg", FC: "94 lpm", "T°": "36,8 °C", Glucemia: "102 mg/dl" },
  anamnesis: [
    act("sacudidas", "¿Cómo es eso de que se le cae la taza?", "clave", "“Son sacudones de los brazos, sin perder el conocimiento, en la primera hora después de levantarme.”", "Mioclonías matinales: clave de la epilepsia mioclónica juvenil."),
    act("crisis", "¿Cómo fue la convulsión?", "clave", "“Se puso rígido y después se sacudió todo, un minuto, se mordió la lengua.”", "Crisis tónico-clónica generalizada."),
    act("gatillos", "¿Durmió poco o tomó alcohol?", "clave", "“Tres horas, y tomé cerveza.”", "Privación de sueño y alcohol: gatillos típicos."),
    act("ausencias", "¿Se queda 'colgado' unos segundos?", "util", "“A veces en clase.”", "Ausencias asociadas."),
    act("familia", "¿Alguien en la familia con epilepsia?", "util", "“Una tía.”", "Componente genético."),
    act("tóxicos", "¿Consumió otras drogas?", "clave", "“No.”", "Descarta crisis provocadas por tóxicos."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Normal, poscrítico resuelto.", "Epilepsia generalizada genética: examen normal."),
    act("lengua", "Lengua", "util", "Mordedura lateral.", "Sugiere crisis epiléptica."),
    act("trauma", "Traumatismos", "util", "Contusión en la frente sin pérdida de conciencia agregada.", "Descartar TEC."),
  ],
  studies: [
    study("Electrofisiología", "eeg", "EEG con privación de sueño y fotoestimulación", "clave", "Polipunta-onda generalizada a 4–6 Hz, con respuesta fotoparoxística.", "Confirma el síndrome."),
    study("Laboratorio", "lab", "Glucemia, ionograma, calcio, magnesio, tóxicos", "clave", "Normales.", "Descarta crisis provocadas."),
    study("Imágenes", "rmn", "Resonancia de cerebro", "util", "Normal.", "Esperable; se pide si hay dudas."),
    study("Laboratorio", "nivel-alcohol", "Alcoholemia para culparlo", "innecesario", "No se pidió.", "No cambia la conducta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("emj", "Epilepsia mioclónica juvenil", true, "Adolescente con mioclonías matinales, crisis tónico-clónica tras privación de sueño, ausencias y EEG con polipunta-onda generalizada."),
      dx("crisis-provocada", "Crisis provocada aislada por alcohol", false, "Las mioclonías de meses y el EEG indican una epilepsia."),
      dx("sincope", "Síncope convulsivo", false, "Mordedura lateral, poscrítico y EEG epileptiforme."),
      dx("ausencias", "Epilepsia de ausencias infantil", false, "Edad y mioclonías no corresponden."),
      dx("focal", "Epilepsia focal", false, "El EEG es generalizado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("valproato-varon", "Ácido valproico (en varones) o levetiracetam", "clave", "Fármacos de amplio espectro de elección."),
      mg("sueno", "Higiene del sueño y evitar el alcohol", "clave", "Los gatillos son los que más desencadenan crisis."),
      mg("conducir", "No manejar hasta estar libre de crisis según la normativa", "clave", "Seguridad."),
      mg("largo-plazo", "Explicar que suele requerir tratamiento de por vida", "util", "La recaída al suspender es alta."),
      mg("carbamazepina", "Carbamazepina", "riesgoso", "Empeora mioclonías y ausencias."),
      mg("sin-tratamiento", "No tratar porque fue la primera convulsión", "riesgoso", "Ya tiene un síndrome epiléptico definido."),
    ],
  },
  debrief: {
    diagnosis: "Epilepsia mioclónica juvenil con crisis tónico-clónica tras privación de sueño y alcohol, en un adolescente de 17 años.",
    pathologies: [
      { name: "Epilepsia mioclónica juvenil", role: "principal", why: "Epilepsia generalizada genética." },
      { name: "Privación de sueño y alcohol", role: "asociada", why: "Gatillos." },
      { name: "Crisis provocada, síncope", role: "diferencial", why: "Otras causas de un episodio convulsivo." },
    ],
    reasoning: [
      "Causa: predisposición genética a hiperexcitabilidad tálamo-cortical.",
      "Mecanismo: descargas generalizadas que aparecen al despertar y con privación de sueño.",
      "Consecuencia: mioclonías, tónico-clónicas y ausencias que recaen si se suspende el fármaco.",
    ],
    epidemiology:
      "Es una de las epilepsias generalizadas más frecuentes: entre el 5 y el 10 % de todas las epilepsias. Empieza entre los 12 y 18 años. Las mioclonías suelen pasar desapercibidas durante meses hasta la primera crisis generalizada.",
    management: [
      "Preguntar por sacudidas matinales.",
      "EEG con privación de sueño.",
      "Valproato o levetiracetam; lamotrigina con cuidado.",
      "Evitar carbamazepina, fenitoína.",
      "Higiene del sueño.",
    ],
    sources: ["Sociedad Argentina de Neurología — Guía de epilepsia.", "ILAE — Classification of the epilepsies."],
    pearls: ["Se le cae la taza a la mañana.", "Primer convulsión con mioclonías previas: ya es epilepsia.", "Carbamazepina la empeora."],
    pitfalls: ["No preguntar por mioclonías.", "Valproato en mujeres en edad fértil sin evaluar."],
    tribunal: [
      qa("¿Qué fármacos empeoran la epilepsia mioclónica juvenil?", "Carbamazepina, oxcarbazepina, fenitoína y gabapentina, que pueden agravar mioclonías y ausencias."),
      qa("¿Por qué se evita el valproato en mujeres en edad fértil?", "Por su teratogenicidad: malformaciones y deterioro del neurodesarrollo; se prefiere levetiracetam."),
      qa("¿Qué es una mioclonía?", "Una sacudida muscular breve, brusca e involuntaria, que en esta epilepsia ocurre sin pérdida de conciencia."),
    ],
  },
};
