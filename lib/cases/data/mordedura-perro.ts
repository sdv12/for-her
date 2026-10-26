import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const mordeduraPerro: ClinicalCase = {
  id: "mordedura-de-perro",
  level: 1,
  area: "Salud comunitaria",
  setting: "Guardia",
  patient: { age: 8, ageUnit: "años", sex: "M", context: "Lo mordió el perro del vecino mientras jugaba en la vereda." },
  frequency: "muy-frecuente",
  intro: "“Le quiso sacar la pelota al perro del vecino y lo mordió en la mano y el antebrazo. Sangró bastante.”",
  vitals: { FC: "104 lpm", "T°": "36,6 °C", Peso: "27 kg" },
  anamnesis: [
    act("perro", "¿Conocen al perro? ¿Está vacunado contra la rabia? ¿Se lo puede observar?", "clave", "“Es del vecino, lo conocemos, dice que tiene las vacunas. Está en la casa.”", "Un perro conocido, observable y sano permite la observación por 10 días: si sigue sano, no hubo transmisión de rabia."),
    act("provocado", "¿El perro lo atacó sin motivo o fue provocado?", "util", "“Le sacó la pelota.”", "Una mordedura provocada es menos sugestiva de rabia que un ataque sin motivo."),
    act("antitetanica", "¿Tiene las vacunas al día? ¿Cuándo recibió la última antitetánica?", "clave", "“Tiene todas, la última a los 5 años.”", "Define si necesita refuerzo antitetánico (con esquema completo y menos de 5 años desde la última dosis en una herida tetanígena, no)."),
    act("cuando", "¿Hace cuánto fue?", "util", "“Hace una hora.”", "Las heridas de menos de 6–8 h se manejan mejor; las mordeduras tardías se infectan más."),
    act("alergia", "¿Es alérgico a algún antibiótico?", "util", "“No.”", "Para elegir la profilaxis antibiótica."),
    act("color", "¿De qué color es el perro?", "neutro", "“Marrón.”", "No orienta."),
  ],
  exam: [
    act("herida", "Inspección y exploración de las heridas", "clave", "Dos heridas punzantes en el dorso de la mano derecha y una laceración de 3 cm en el antebrazo, sin exposición de tendones.", "Las heridas punzantes en la mano tienen alto riesgo de infección."),
    act("funcion", "Movilidad, sensibilidad y circulación de la mano", "clave", "Flexión y extensión de los dedos completas, sensibilidad y relleno capilar normales.", "Descarta lesión de tendones, nervios o vasos."),
    act("otras", "Buscar otras mordeduras (cara, cuello)", "util", "No hay.", "Las mordeduras en cabeza y cuello son de mayor riesgo."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de mano", "util", "Sin fracturas ni cuerpos extraños.", "Útil en mordeduras profundas de la mano para descartar fractura o un diente retenido."),
    study("Microbiología", "cultivo", "Cultivo de la herida", "innecesario", "No se realizó.", "En una herida reciente sin infección no sirve."),
    study("Laboratorio", "lab", "Hemograma", "innecesario", "Normal.", "No aporta."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mordedura", "Mordedura de perro conocido y observable, en mano y antebrazo, con riesgo de infección", true, "Heridas punzantes en mano y laceración en antebrazo por un perro identificado, sin compromiso funcional."),
      dx("rabia", "Rabia", false, "No hay rabia: el riesgo depende del animal; un perro observable y sano a los 10 días descarta la transmisión."),
      dx("tetanos", "Tétanos", false, "Es una complicación prevenible; no hay síntomas."),
      dx("tendon", "Lesión del tendón extensor", false, "La movilidad de los dedos es completa."),
      dx("celulitis", "Celulitis por Pasteurella", false, "Aparece en 12–24 h con dolor, eritema y edema; todavía no hay infección."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lavado", "Lavado abundante con agua y jabón por 10–15 minutos y antisepsia", "clave", "Es la medida más eficaz para prevenir la rabia y la infección."),
      mg("observacion", "Observación del perro por 10 días (zoonosis) y notificación al SNVS", "clave", "Si el perro sigue sano, se descarta la rabia; si enferma, muere o desaparece, se inicia la profilaxis."),
      mg("atb", "Profilaxis con amoxicilina-clavulánico por 3–5 días", "clave", "Las mordeduras punzantes en la mano tienen alto riesgo de infección por Pasteurella, estreptococos, estafilococos y anaerobios."),
      mg("control", "Control de la herida en 48 h y pautas de alarma", "util", "Detecta la infección temprano."),
      mg("sutura", "Sutura primaria hermética de las heridas punzantes de la mano", "riesgoso", "Cerrar heridas punzantes en la mano aumenta mucho el riesgo de infección; se dejan abiertas (la laceración del antebrazo puede aproximarse)."),
      mg("rabia-ya", "Vacuna antirrábica y gammaglobulina inmediatas", "innecesario", "Con un perro conocido, observable y sano, se observa al animal; la profilaxis se indica si enferma, muere o no puede observarse."),
    ],
  },
  debrief: {
    diagnosis: "Mordedura de perro conocido y observable en mano y antebrazo, sin compromiso funcional, con riesgo de infección.",
    pathologies: [
      { name: "Herida por mordedura de perro", role: "principal", why: "Heridas punzantes y laceración." },
      { name: "Infección de la herida (Pasteurella)", role: "diferencial", why: "Complicación más frecuente." },
      { name: "Rabia", role: "diferencial", why: "Se previene con lavado, observación del animal y profilaxis si corresponde." },
      { name: "Tétanos", role: "diferencial", why: "Prevenible con el esquema al día." },
    ],
    reasoning: [
      "Causa: la boca del perro tiene flora mixta (Pasteurella multocida, Capnocytophaga, estreptococos, estafilococos, anaerobios).",
      "Mecanismo: los dientes inoculan esa flora en profundidad; las heridas punzantes de la mano tienen poca irrigación y espacios cerrados (vainas tendinosas), ideales para la infección.",
      "Consecuencia: riesgo de celulitis, tenosinovitis y artritis. El virus rábico, si el animal estuviera infectado, viaja por los nervios hacia el sistema nervioso central; el período de incubación permite la profilaxis.",
      "Un perro que transmite rabia por la saliva muere en pocos días: por eso 10 días de observación descartan la transmisión.",
    ],
    epidemiology:
      "Las mordeduras de perro son una consulta muy frecuente en la Argentina y un evento de notificación. Los niños de 5 a 14 años son los más afectados, más los varones, y en ellos las mordeduras en cara y cuello son más comunes. La mayoría las produce un perro conocido. La rabia canina está controlada en gran parte del país, pero persisten casos en animales (sobre todo murciélagos) y en zonas limítrofes del norte.",
    management: [
      "Lavado inmediato con agua y jabón; evaluar la herida y la función.",
      "Clasificar la exposición y el animal: perro observable → observación 10 días; no observable, sospechoso o con signos → vacuna (y gammaglobulina en exposiciones graves).",
      "Antitetánica según esquema.",
      "Profilaxis antibiótica en mordeduras de mano, cara, punzantes profundas o en inmunocomprometidos.",
      "Notificar al SNVS y a zoonosis; educación en prevención.",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía para la prevención, vigilancia y control de la rabia en Argentina.",
      "Sociedad Argentina de Pediatría — Recomendaciones sobre mordeduras.",
    ],
    pearls: ["Lavado con agua y jabón: la primera profilaxis antirrábica.", "Perro observable y sano a los 10 días = sin rabia.", "Heridas punzantes de la mano: no se suturan."],
    pitfalls: ["Suturar herméticamente la mano.", "Vacunar contra la rabia sin evaluar al animal.", "Olvidar la antitetánica."],
  },
};
