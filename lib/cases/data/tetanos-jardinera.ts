import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tetanosJardinera: ClinicalCase = {
  id: "tetanos-jardinera",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 63, ageUnit: "años", sex: "F", context: "Jubilada, cultiva rosas. No recuerda cuándo se vacunó. Hace 10 días se clavó una espina." },
  frequency: "raro",
  intro: "“No puedo abrir bien la boca y se me endurece el cuello. Me cuesta tragar.”",
  vitals: { TA: "152/90 mmHg", FC: "108 lpm", FR: "20 rpm", "SatO₂": "96 %", "T°": "37,6 °C" },
  anamnesis: [
    act("herida", "¿Se lastimó en los últimos días?", "clave", "“Con una espina de rosal, en el dedo, hace 10 días.”", "Puerta de entrada."),
    act("vacuna", "¿Cuándo se vacunó contra el tétanos?", "clave", "“Creo que de chica.”", "Sin refuerzos: susceptible."),
    act("trismus", "¿Desde cuándo no puede abrir la boca?", "clave", "“Hace 2 días.”", "Trismus: primer signo."),
    act("espasmos", "¿Tiene contracciones con ruidos o al tocarla?", "clave", "“Sí, con el portazo de un vecino.”", "Espasmos reflejos."),
    act("perro", "¿La mordió algún animal?", "util", "“No.”", "Diferencial con rabia."),
    act("rosas", "¿Qué rosas cultiva?", "neutro", "“Rosas rojas.”", "No orienta."),
  ],
  exam: [
    act("trismus-ex", "Apertura bucal", "clave", "1 cm, risa sardónica.", "Tétanos."),
    act("rigidez", "Tono", "clave", "Rigidez de cuello, abdomen en tabla, opistótonos leve con estímulos.", "Generalizado."),
    act("herida-ex", "Dedo", "util", "Pequeña herida con costra y secreción.", "Puerta de entrada."),
    act("conciencia", "Conciencia", "util", "Lúcida.", "El tétanos no afecta la conciencia."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Trismus, rigidez y espasmos con herida y sin vacunas.", "No hay prueba diagnóstica."),
    study("Laboratorio", "lab", "CPK, función renal, gases", "util", "CPK alta.", "Rabdomiólisis por espasmos."),
    study("Otros", "puncion", "Punción lumbar", "innecesario", "No se hizo.", "Conciencia conservada y cuadro típico."),
    study("Laboratorio", "anticuerpos-espera", "Esperar anticuerpos antitetánicos para tratar", "riesgoso", "No se esperó.", "El tratamiento es inmediato."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tetanos", "Tétanos generalizado", true, "Trismus, risa sardónica, rigidez y espasmos reflejos con conciencia conservada, herida y sin refuerzos de vacuna."),
      dx("distonia", "Distonía por fármacos", false, "Sin fármacos y con espasmos generalizados."),
      dx("meningitis", "Meningitis", false, "Conciencia normal, sin fiebre alta."),
      dx("estricnina", "Intoxicación por estricnina", false, "Hay herida y trismus de inicio."),
      dx("absceso-dental", "Absceso dentario con trismus", false, "Rigidez generalizada."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("igat", "Gammaglobulina antitetánica humana", "clave", "Neutraliza la toxina libre."),
      mg("vacuna", "Vacuna doble adultos en otro sitio", "clave", "La enfermedad no deja inmunidad."),
      mg("metronidazol", "Metronidazol y limpieza de la herida", "clave", "Elimina la fuente."),
      mg("uti", "Terapia intensiva, ambiente tranquilo, benzodiacepinas y vía aérea", "clave", "Espasmos y riesgo de laringoespasmo."),
      mg("magnesio", "Sulfato de magnesio para espasmos y disautonomía", "util", "Coadyuvante."),
      mg("alta", "Analgesia y alta", "riesgoso", "Riesgo de muerte."),
      mg("penicilina-solo", "Solo antibiótico sin inmunoglobulina", "riesgoso", "No neutraliza la toxina."),
    ],
  },
  debrief: {
    diagnosis: "Tétanos generalizado tras una herida con espina de rosal, en una mujer de 63 años sin refuerzos de vacuna.",
    pathologies: [
      { name: "Tétanos generalizado", role: "principal", why: "Toxina tetanospasmina." },
      { name: "Falta de refuerzos de vacuna", role: "asociada", why: "Causa prevenible." },
      { name: "Distonía, estricnina", role: "diferencial", why: "Otras causas de espasmos." },
    ],
    reasoning: [
      "Causa: esporas de Clostridium tetani en tierra.",
      "Mecanismo: la toxina bloquea la liberación de GABA y glicina en las interneuronas inhibitorias.",
      "Consecuencia: rigidez, espasmos, disautonomía y paro respiratorio.",
    ],
    epidemiology:
      "En Argentina hay pocos casos por año, casi todos en mayores de 60 sin refuerzos, con heridas menores en tareas rurales o de jardinería. La mortalidad llega al 20–30 % aun con terapia intensiva.",
    management: [
      "Inmunoglobulina y vacuna.",
      "Metronidazol y herida.",
      "Terapia intensiva.",
      "Refuerzos cada 10 años.",
    ],
    sources: ["Ministerio de Salud de la Nación — Tétanos: guía de vigilancia y control.", "OMS — Current recommendations for treatment of tetanus."],
    pearls: ["Trismus = tétanos hasta demostrar lo contrario.", "Conciencia conservada.", "Doble adultos cada 10 años."],
    pitfalls: ["Olvidar la inmunoglobulina.", "Estimular al paciente."],
    tribunal: [
      qa("¿Cuál es el mecanismo de la toxina tetánica?", "Viaja por transporte axonal retrógrado e impide la liberación de GABA y glicina en las interneuronas inhibitorias."),
      qa("¿Cada cuánto se refuerza la vacuna antitetánica en adultos?", "Cada 10 años con la doble adultos, o antes ante heridas tetanígenas si pasaron más de 5 años."),
      qa("¿Por qué hay que vacunar después de tener tétanos?", "Porque la cantidad de toxina que causa la enfermedad no alcanza para generar inmunidad."),
    ],
  },
};
