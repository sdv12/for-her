import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const ofidismo: ClinicalCase = {
  id: "ofidismo-yarara",
  level: 4,
  area: "Toxicología",
  setting: "Guardia",
  patient: { age: 42, ageUnit: "años", sex: "M", context: "Peón rural en el norte de Córdoba. Noviembre. Llega en camioneta desde el campo." },
  frequency: "poco-frecuente",
  intro: "“Me mordió una víbora en el tobillo mientras desmalezaba, hace dos horas. Me hice un torniquete con el cinto. La pierna se me está hinchando mucho y me sangran las encías.”",
  vitals: { TA: "104/64 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "36,8 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("vibora", "¿Cómo era la víbora? ¿La trajo o le sacó una foto?", "clave", "“Le saqué una foto: marrón con dibujos como letras ‘C’ o teléfonos a los costados, cabeza triangular.”", "Patrón de yarará (Bothrops), responsable de la gran mayoría de los accidentes ofídicos en la Argentina."),
    act("neuro", "¿Ve doble, se le caen los párpados o le cuesta tragar?", "clave", "“No.”", "Los síntomas neurológicos sin edema local orientarían a cascabel (Crotalus) o coral (Micrurus), que requieren otro antiveneno."),
    act("tiempo", "¿Hace cuánto fue? ¿Qué hizo después?", "clave", "“Dos horas. Me hice un torniquete y me cortaron con un cuchillo para sacar el veneno.”", "Torniquete e incisión empeoran el daño local y no sacan el veneno."),
    act("antitetanica", "¿Tiene la antitetánica al día?", "util", "“No me acuerdo.”", "Las mordeduras son heridas tetanígenas."),
    act("orina", "¿Cómo orina?", "util", "“Normal.”", "La insuficiencia renal es una complicación del envenenamiento."),
    act("equipo", "¿Hace cuánto trabaja en el campo?", "neutro", "“Toda la vida.”", "No orienta."),
  ],
  exam: [
    act("local", "Miembro afectado", "clave", "Dos marcas de colmillos en el tobillo derecho, edema duro que sube hasta la rodilla, equimosis y una ampolla serosa; corte de cuchillo en la zona.", "Edema progresivo, dolor y equimosis: envenenamiento botrópico con efecto local proteolítico."),
    act("sangrado", "Buscar sangrados", "clave", "Gingivorragia; sangrado persistente en el lugar del corte.", "Coagulopatía por consumo: efecto sistémico."),
    act("pulsos", "Pulsos distales y compartimientos", "util", "Pulsos presentes; pierna tensa pero sin signos de síndrome compartimental.", "El síndrome compartimental es raro y se confirma midiendo presiones: la fasciotomía empírica empeora el sangrado."),
    act("neuro", "Examen neurológico", "util", "Sin ptosis, oftalmoplejía ni debilidad.", "Descarta un envenenamiento neurotóxico."),
  ],
  studies: [
    study("Laboratorio", "tc20", "Tiempo de coagulación en tubo seco a los 20 minutos (y coagulograma)", "clave", "Sangre incoagulable a los 20 minutos. Fibrinógeno indetectable, RIN no medible.", "Prueba simple y rápida que confirma la coagulopatía y guía el antiveneno y la respuesta."),
    study("Laboratorio", "lab", "Hemograma, plaquetas, función renal, CPK, orina", "clave", "Plaquetas 98.000, creatinina 1,2, CPK 900.", "Evalúa complicaciones (insuficiencia renal, rabdomiólisis)."),
    study("Imágenes", "eco", "Ecografía de partes blandas", "innecesario", "No se realizó.", "No cambia la conducta inicial."),
    study("Laboratorio", "plasma", "Plasma fresco antes del antiveneno para corregir la coagulación", "riesgoso", "No se realizó.", "La coagulopatía se corrige neutralizando el veneno con antiveneno; dar factores sin neutralizar el veneno solo “alimenta” el consumo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("botropico", "Envenenamiento botrópico (yarará) moderado a grave con coagulopatía", true, "Mordedura por yarará identificada, edema progresivo, equimosis, ampolla, gingivorragia y sangre incoagulable, sin síntomas neurológicos."),
      dx("crotalico", "Envenenamiento crotálico (cascabel)", false, "Poco edema local, con síntomas neurotóxicos (ptosis, “facies neurotóxica”), mialgias y orina oscura."),
      dx("elapidico", "Envenenamiento elapídico (coral)", false, "Sin edema local; parálisis neuromuscular progresiva."),
      dx("seca", "Mordedura “seca” sin envenenamiento", false, "No habría edema progresivo ni coagulopatía."),
      dx("celulitis", "Celulitis", false, "No explica la coagulopatía ni el inicio tras la mordedura."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiveneno", "Antiveneno antibotrópico endovenoso en dosis según la gravedad, lo antes posible, en el hospital", "clave", "Es el único tratamiento específico: neutraliza el veneno y corrige la coagulopatía en horas."),
      mg("retirar", "Retirar el torniquete en forma controlada, anillos y calzado; miembro inmovilizado y a la altura del corazón", "clave", "El torniquete aumenta la isquemia y el daño local."),
      mg("controles", "Repetir el tiempo de coagulación a las 6–12 h; antitetánica y analgesia (sin AINE)", "clave", "Si la sangre sigue incoagulable, se repite el antiveneno."),
      mg("notificar", "Notificación al SNVS", "util", "Los accidentes ofídicos son de notificación obligatoria."),
      mg("fasciotomia", "Fasciotomía preventiva por el edema", "riesgoso", "Con coagulopatía puede causar un sangrado grave; solo se hace con síndrome compartimental confirmado y coagulación corregida."),
      mg("hielo", "Hielo local, succión o nuevos cortes", "riesgoso", "No sirven y empeoran la lesión local."),
    ],
  },
  debrief: {
    diagnosis: "Envenenamiento botrópico (yarará) moderado a grave, con edema progresivo, ampollas y coagulopatía de consumo (sangre incoagulable), agravado por torniquete e incisión.",
    pathologies: [
      { name: "Envenenamiento botrópico", role: "principal", why: "Efectos local y hemorrágico típicos." },
      { name: "Coagulopatía por consumo", role: "asociada", why: "Fibrinógeno indetectable, sangre incoagulable." },
      { name: "Envenenamiento crotálico y elapídico", role: "diferencial", why: "Neurotóxicos, con otro antiveneno." },
      { name: "Síndrome compartimental", role: "diferencial", why: "Complicación rara a vigilar." },
    ],
    reasoning: [
      "Causa: veneno de Bothrops (yarará), con enzimas proteolíticas, procoagulantes y hemorraginas.",
      "Mecanismo: las proteasas destruyen tejidos y vasos en el lugar de la mordedura; las enzimas tipo trombina consumen el fibrinógeno; las hemorraginas dañan el endotelio.",
      "Consecuencia: edema progresivo, equimosis, ampollas y necrosis local; coagulopatía con sangre incoagulable y sangrados (encías, heridas, a veces cerebrales); insuficiencia renal.",
      "El antiveneno neutraliza el veneno circulante: así se recupera la coagulación.",
    ],
    epidemiology:
      "En la Argentina se notifican entre 500 y 1.000 accidentes ofídicos por año, la gran mayoría por yarará, con mayor incidencia en el NOA, el NEA y el norte de Córdoba, entre octubre y abril. Afectan sobre todo a varones jóvenes y adultos en tareas rurales, y la mayoría de las mordeduras son en los miembros inferiores.",
    management: [
      "Identificar la serpiente (foto) y clasificar la gravedad: leve, moderada o grave.",
      "No torniquete, no incisión, no succión, no hielo: inmovilizar y trasladar.",
      "Antiveneno específico endovenoso según la gravedad, con preparación para reacciones alérgicas.",
      "Control de la coagulación (tubo seco), función renal, antitetánica, analgesia sin AINE.",
      "Notificación y prevención (botas, cuidado al levantar leña o pasto).",
    ],
    sources: [
      "Ministerio de Salud de la Nación — Guía de prevención, diagnóstico, tratamiento y vigilancia epidemiológica de los envenenamientos por serpientes.",
      "ANLIS-Malbrán e Instituto Nacional de Producción de Biológicos — Antivenenos ofídicos.",
    ],
    pearls: ["Edema progresivo + sangre incoagulable = yarará.", "Tubo seco a los 20 minutos: la prueba clave.", "Nada de torniquetes ni cortes."],
    pitfalls: ["Hacer una fasciotomía con coagulopatía.", "Corregir con plasma sin antiveneno.", "Usar AINE."],
  },
};
