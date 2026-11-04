import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ciatica: ClinicalCase = {
  id: "lumbociatalgia-hernia-discal",
  level: 1,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 38, ageUnit: "años", sex: "M", context: "Trabaja de repositor en un supermercado, levanta cajas." },
  frequency: "muy-frecuente",
  intro: "“Hace dos semanas me agaché a levantar un cajón y me agarró un dolor en la cintura que me baja por la pierna izquierda hasta el pie, como una corriente.”",
  vitals: { TA: "126/78 mmHg", FC: "76 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("irradiacion", "¿Hasta dónde baja el dolor?", "clave", "“Por la parte de atrás del muslo y la pantorrilla hasta el costado del pie.”", "Dolor radicular que pasa la rodilla: ciática (raíz S1)."),
    act("alarma", "¿Te cuesta orinar o controlar la caca? ¿Sentís dormida la zona de la cola? ¿Perdiste fuerza?", "clave", "“No, nada de eso.”", "Sin banderas rojas de cola de caballo ni déficit progresivo."),
    act("otras-alarma", "¿Fiebre, pérdida de peso, cáncer, dolor de noche en reposo?", "clave", "“No.”", "Sin banderas rojas de infección o tumor."),
    act("toser", "¿Empeora al toser o estornudar?", "util", "“Sí, me tira.”", "Aumento de presión intradiscal."),
    act("trabajo", "¿Podés trabajar?", "util", "“Con mucho dolor.”", "Impacto laboral; puede ser accidente de trabajo."),
    act("hinchada", "¿De qué cuadro sos?", "neutro", "“De Instituto.”", "No orienta."),
  ],
  exam: [
    act("lasegue", "Maniobra de Lasègue", "clave", "Positiva a 40° en la pierna izquierda.", "Signo de tensión radicular."),
    act("neuro", "Fuerza, reflejos y sensibilidad", "clave", "Reflejo aquiliano izquierdo disminuido, hipoestesia en borde lateral del pie, fuerza conservada.", "Compromiso de la raíz S1 sin déficit motor."),
    act("perineal", "Sensibilidad perineal", "util", "Normal.", "Descarta cola de caballo."),
  ],
  studies: [
    study("Imágenes", "rmn-ya", "Resonancia de columna en la primera consulta", "innecesario", "No se realizó.", "Sin banderas rojas, la mayoría mejora en 6 semanas; la resonancia se pide si persiste o hay déficit."),
    study("Imágenes", "rx", "Radiografía de columna lumbar", "innecesario", "No se realizó.", "No muestra la hernia."),
    study("Otros", "reevaluacion", "Reevaluación clínica en 4–6 semanas", "clave", "Mejoría parcial a las 4 semanas.", "Define la necesidad de estudios."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ciatica", "Lumbociatalgia izquierda por probable hernia de disco L5-S1, sin déficit motor ni banderas rojas", true, "Dolor lumbar con irradiación radicular por la cara posterior hasta el borde lateral del pie, Lasègue positivo y aquiliano disminuido, tras esfuerzo."),
      dx("lumbalgia", "Lumbalgia mecánica inespecífica", false, "Hay dolor radicular y signos neurológicos."),
      dx("cola-caballo", "Síndrome de cola de caballo", false, "Sin alteraciones esfinterianas ni anestesia perineal."),
      dx("estenosis", "Estenosis de canal lumbar", false, "Esa da claudicación neurógena en mayores, que mejora al flexionar."),
      dx("sacroileitis", "Sacroileítis", false, "No hay dolor glúteo inflamatorio ni maniobras sacroilíacas positivas."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("activo", "Mantenerse activo, evitar el reposo en cama prolongado", "clave", "El reposo prolongado empeora la evolución."),
      mg("analgesia", "AINE o paracetamol por tiempo limitado", "clave", "Control del dolor."),
      mg("pautas", "Pautas de alarma (pérdida de fuerza, alteración urinaria, anestesia perineal)", "clave", "Detectan complicaciones."),
      mg("kinesio", "Kinesiología y adecuación de tareas; evaluar ART si fue en el trabajo", "util", "Retorno laboral."),
      mg("opioides", "Opioides fuertes de larga duración", "riesgoso", "Sin beneficio a largo plazo y con dependencia."),
      mg("cirugia-ya", "Cirugía de entrada", "innecesario", "Se reserva para déficit progresivo, cola de caballo o dolor que no mejora en 6–12 semanas."),
    ],
  },
  debrief: {
    diagnosis: "Lumbociatalgia izquierda aguda por probable hernia de disco L5-S1 con radiculopatía S1 sensitiva, sin déficit motor ni banderas rojas, en trabajador de 38 años con esfuerzo de carga.",
    pathologies: [
      { name: "Lumbociatalgia por hernia discal", role: "principal", why: "Compresión radicular S1." },
      { name: "Posible accidente laboral", role: "asociada", why: "Esfuerzo en el trabajo." },
      { name: "Lumbalgia mecánica, cola de caballo, estenosis", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: degeneración del disco con esfuerzo de flexión y carga.",
      "Mecanismo: el núcleo pulposo protruye y comprime e inflama la raíz nerviosa.",
      "Consecuencia: dolor radicular, alteraciones sensitivas y de reflejos; la mayoría mejora sola en semanas.",
    ],
    epidemiology:
      "El dolor lumbar es una de las principales causas de consulta y de ausentismo laboral en Argentina. La hernia de disco con ciática afecta sobre todo a adultos de 30 a 50 años, más a varones con trabajos de carga. El 90 % mejora sin cirugía.",
    management: [
      "Buscar banderas rojas.",
      "Sin banderas rojas: tratamiento conservador, actividad y analgesia.",
      "Resonancia si persiste más de 6 semanas o hay déficit.",
      "Cirugía si hay cola de caballo, déficit progresivo o dolor refractario.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de práctica clínica de lumbalgia.", "Asociación Argentina de Neurocirugía — Recomendaciones sobre hernia de disco."],
    pearls: ["Dolor que pasa la rodilla = radicular.", "Lasègue positivo.", "Sin banderas rojas: sin resonancia al inicio."],
    pitfalls: ["Reposo prolongado.", "Imágenes de rutina."],
    tribunal: [
      qa("¿Qué es la maniobra de Lasègue?", "Con el paciente acostado, se eleva la pierna extendida; es positiva si reproduce el dolor radicular por debajo de la rodilla entre 30 y 70°, por tensión de las raíces L5–S1."),
      qa("¿Qué raíz se afecta en cada hernia lumbar frecuente?", "Una hernia L4-L5 posterolateral comprime la raíz L5 (debilidad para la flexión dorsal del hallux, sensibilidad del dorso del pie); una L5-S1 comprime S1 (aquiliano disminuido, borde lateral del pie)."),
      qa("¿Qué es la claudicación neurógena?", "Dolor y parestesias en las piernas al caminar o estar de pie que mejoran al sentarse o flexionar la columna; es típica de la estenosis de canal lumbar en adultos mayores."),
    ],
  },
};
