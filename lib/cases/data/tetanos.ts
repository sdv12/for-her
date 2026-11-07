import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const tetanos: ClinicalCase = {
  id: "tetanos-generalizado",
  level: 4,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "M", context: "Trabajador rural de Santiago del Estero, sin vacunas desde el servicio militar." },
  frequency: "raro",
  intro: "“Hace dos días no puedo abrir bien la boca, se me endurece el cuello y la espalda. Ahora me dan contracciones fuertes cuando hay ruido.”",
  vitals: { TA: "168/98 mmHg", FC: "122 lpm", FR: "28 rpm", "T°": "38 °C", "SatO₂": "93 %", Glasgow: "15/15" },
  anamnesis: [
    act("herida", "¿Tuviste alguna herida en las últimas semanas?", "clave", "“Me clavé una astilla en el pie hace 10 días, no le di importancia.”", "Herida contaminada, a veces mínima."),
    act("vacuna", "¿Cuándo fue tu última antitetánica?", "clave", "“Hace más de 40 años.”", "Falta de inmunización: el factor de riesgo principal."),
    act("conciencia", "¿Estás lúcido durante las contracciones?", "clave", "“Sí, me duelen muchísimo.”", "La conciencia conservada es típica."),
    act("farmacos", "¿Tomás antipsicóticos o metoclopramida?", "util", "“No.”", "Distonía farmacológica: diferencial."),
    act("mordedura", "¿Te mordió algún animal?", "util", "“No.”", "Orienta contra rabia."),
    act("tradicion", "¿Tomás mate?", "neutro", "“Todos los días.”", "No orienta."),
  ],
  exam: [
    act("trismus", "Trismus y facies", "clave", "Trismus, risa sardónica, rigidez de nuca.", "Forma generalizada típica."),
    act("espasmos", "Espasmos y rigidez", "clave", "Opistótonos, abdomen en tabla y espasmos ante estímulos.", "Riesgo de compromiso respiratorio."),
    act("herida-pie", "Revisar el pie", "clave", "Herida punzante con secreción en la planta.", "Foco que se debe desbridar."),
  ],
  studies: [
    study("Laboratorio", "lab", "Laboratorio general, CPK, gases", "util", "CPK alta, leucocitos normales.", "Busca rabdomiólisis e hipoventilación."),
    study("Otros", "clinico", "El diagnóstico es clínico", "clave", "No hay una prueba confirmatoria útil.", "Se trata ante la sospecha."),
    study("Otros", "lcr", "Punción lumbar si hay duda con meningitis", "util", "LCR normal.", "En el tétanos es normal."),
    study("Microbiología", "esperar", "Esperar cultivo de la herida para tratar", "riesgoso", "No se realizó.", "El cultivo rara vez es positivo y demora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tetanos", "Tétanos generalizado", true, "Trismus, risa sardónica, opistótonos, espasmos con estímulos y conciencia conservada, sin vacunación y con herida."),
      dx("meningitis", "Meningitis", false, "Altera la conciencia y no da trismus con espasmos."),
      dx("distonia", "Distonía por fármacos", false, "No toma fármacos y responde a anticolinérgicos."),
      dx("estricnina", "Intoxicación por estricnina", false, "Es muy similar, pero no hay exposición y no da trismus inicial."),
      dx("rabia", "Rabia", false, "Sin mordedura; suele haber hidrofobia y compromiso de conciencia."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("igt", "Inmunoglobulina antitetánica y vacuna en otro sitio", "clave", "Neutraliza la toxina libre. La enfermedad no da inmunidad."),
      mg("desbridar", "Desbridar la herida y metronidazol", "clave", "Elimina el foco productor de toxina."),
      mg("benzo", "Benzodiacepinas y ambiente tranquilo", "clave", "Controlan los espasmos."),
      mg("uti", "Terapia intensiva, protección temprana de la vía aérea", "clave", "El espasmo de glotis es la causa de muerte. También se usa sulfato de magnesio."),
      mg("ruidos", "Dejarlo en sala general con estímulos frecuentes", "riesgoso", "Los estímulos desencadenan espasmos."),
      mg("corticoide", "Corticoides de rutina", "innecesario", "No están indicados."),
    ],
  },
  debrief: {
    diagnosis: "Tétanos generalizado por herida punzante plantar en varón de 71 años sin vacunación vigente.",
    pathologies: [
      { name: "Tétanos generalizado", role: "principal", why: "Toxina de Clostridium tetani." },
      { name: "Insuficiencia respiratoria, disautonomía", role: "asociada", why: "Principales causas de muerte." },
      { name: "Meningitis, distonía, estricnina", role: "diferencial", why: "Otras causas de rigidez." },
    ],
    reasoning: [
      "Causa: esporas de C. tetani que germinan en heridas con poco oxígeno.",
      "Mecanismo: la tetanospasmina bloquea la liberación de GABA y glicina en las interneuronas inhibitorias.",
      "Consecuencia: rigidez y espasmos con conciencia conservada, disautonomía, falla respiratoria.",
    ],
    epidemiology:
      "En Argentina es poco frecuente gracias a la vacunación, pero sigue apareciendo en adultos mayores, sobre todo varones y personas de zonas rurales con refuerzos incompletos. Es de notificación obligatoria. La vacuna doble adultos se refuerza cada 10 años.",
    management: [
      "Tratar ante la sospecha.",
      "Inmunoglobulina, vacuna y desbridamiento.",
      "Metronidazol, benzodiacepinas y terapia intensiva.",
      "Notificar y completar esquema de vacunación.",
    ],
    sources: ["Ministerio de Salud de la Nación — Normas nacionales de vacunación.", "Sociedad Argentina de Infectología — Recomendaciones."],
    pearls: ["Trismus + conciencia conservada: tétanos.", "No da inmunidad: vacunar igual.", "Refuerzo cada 10 años."],
    pitfalls: ["No buscar la herida.", "Demorar la vía aérea."],
    tribunal: [
      qa("¿Cómo actúa la toxina tetánica?", "Viaja por transporte axonal retrógrado y bloquea la liberación de GABA y glicina, por lo que desinhibe las motoneuronas."),
      qa("¿Qué diferencia tiene con la toxina botulínica?", "La botulínica bloquea la liberación de acetilcolina en la placa motora y causa parálisis flácida; la tetánica causa rigidez espástica."),
      qa("¿Qué profilaxis se indica en una herida sucia?", "Si tiene menos de 3 dosis o desconoce su esquema: vacuna e inmunoglobulina. Con 3 o más dosis: vacuna si pasaron más de 5 años."),
    ],
  },
};
