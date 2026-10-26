import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const crup: ClinicalCase = {
  id: "laringitis-crup",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "M", context: "Son las 3 de la mañana. Octubre." },
  frequency: "muy-frecuente",
  intro: "“Se despertó con una tos rarísima, como de perro, y hace un ruido cuando respira. Estaba un poco resfriado desde ayer.”",
  vitals: { FC: "128 lpm", FR: "34 rpm", "T°": "37,8 °C", "SatO₂": "97 %", Peso: "13 kg" },
  anamnesis: [
    act("tos", "¿Cómo es la tos? ¿Le cambió la voz?", "clave", "“Como un ladrido. Está ronco.”", "Tos perruna, disfonía y estridor inspiratorio son la tríada del crup."),
    act("inicio", "¿Empezó de golpe o venía resfriado?", "clave", "“Venía con mocos y un poco de fiebre desde ayer. Hoy a la noche empezó la tos.”", "El pródromo catarral orienta a viral; un inicio brusco sin pródromo haría pensar en cuerpo extraño."),
    act("babeo", "¿Babea, no puede tragar o quiere estar sentado inclinado?", "clave", "“No, toma agua bien.”", "Babeo, disfagia, posición en trípode y aspecto tóxico sugieren epiglotitis o absceso: emergencias de vía aérea."),
    act("atragantamiento", "¿Pudo haberse atragantado con algo?", "util", "“No, estaba durmiendo.”", "Descarta cuerpo extraño."),
    act("vacunas", "¿Tiene las vacunas al día?", "util", "“Sí.”", "La vacuna contra Haemophilus b hizo rara la epiglotitis; la antidiftérica previene el crup diftérico."),
    act("previos", "¿Le pasó antes?", "util", "“Una vez, el invierno pasado.”", "El crup puede repetirse; si es muy recurrente o atípico, se estudia la vía aérea."),
    act("comida", "¿Qué cenó?", "neutro", "“Fideos.”", "No orienta."),
  ],
  exam: [
    act("estridor", "Estridor: en reposo o solo con agitación", "clave", "Estridor inspiratorio solo cuando llora; en reposo, tranquilo, no se escucha.", "El estridor en reposo marca crup moderado o grave."),
    act("tiraje", "Trabajo respiratorio", "clave", "Tiraje supraesternal leve.", "Junto con el estridor, la entrada de aire, la cianosis y la conciencia forma el puntaje de Westley."),
    act("conciencia", "Estado general y conciencia", "clave", "Alerta, juega en brazos de la mamá, sin aspecto tóxico.", "El aspecto tóxico orientaría a traqueítis bacteriana o epiglotitis."),
    act("auscultacion", "Auscultación pulmonar", "util", "Buena entrada de aire bilateral, sin sibilancias.", "La entrada de aire disminuida es un signo de gravedad."),
    act("faringe", "Examen de fauces con baja lengua forzado", "riesgoso", "Se agita, llora y el estridor empeora; no se ve nada que cambie la conducta.", "Si hubiera sospecha de epiglotitis, forzar el examen puede precipitar una obstrucción completa: el niño se examina tranquilo, en brazos."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de cuello (signo de la aguja)", "innecesario", "Estrechamiento subglótico.", "El diagnóstico es clínico; la radiografía no cambia la conducta y moviliza a un niño que conviene mantener tranquilo."),
    study("Laboratorio", "lab", "Hemograma y PCR", "innecesario", "Normales.", "No aportan en el crup viral."),
    study("Otros", "oximetria", "Oximetría de pulso", "util", "97 %.", "La hipoxemia es un signo tardío y grave; es útil como control."),
    study("Microbiología", "viral", "Panel viral", "innecesario", "Parainfluenza 1.", "No cambia el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crup", "Laringotraqueítis viral (crup) leve", true, "Pródromo catarral, tos perruna, disfonía, estridor solo con la agitación, buen estado general y saturación normal: Westley de 1–2."),
      dx("epiglotitis", "Epiglotitis", false, "Inicio brusco, fiebre alta, aspecto tóxico, babeo, sin tos perruna, posición en trípode. Rara gracias a la vacuna anti-Haemophilus."),
      dx("cuerpo", "Cuerpo extraño en vía aérea", false, "Inicio súbito con atragantamiento, sin pródromo viral."),
      dx("traqueitis", "Traqueítis bacteriana", false, "Crup que empeora con fiebre alta y aspecto tóxico, sin respuesta al tratamiento."),
      dx("asma", "Crisis asmática", false, "Daría sibilancias espiratorias, no estridor inspiratorio con tos perruna."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("dexa", "Dexametasona oral en dosis única (0,15–0,6 mg/kg)", "clave", "Los corticoides reducen el edema subglótico, las consultas y las internaciones, incluso en el crup leve."),
      mg("calma", "Mantenerlo tranquilo en brazos de los padres", "clave", "La agitación y el llanto aumentan la obstrucción."),
      mg("pautas", "Pautas de alarma: estridor en reposo, dificultad para respirar, babeo, coloración azulada", "clave", "El crup empeora típicamente de noche; los padres tienen que saber cuándo volver."),
      mg("adrenalina", "Adrenalina nebulizada", "innecesario", "Se reserva para crup moderado o grave (estridor en reposo); requiere observación de 2–4 h por efecto rebote."),
      mg("atb", "Amoxicilina", "innecesario", "Es viral: el antibiótico no ayuda."),
      mg("vapor", "Vaporizaciones con agua caliente en el baño", "innecesario", "No tienen beneficio demostrado y el agua caliente expone a quemaduras."),
    ],
  },
  debrief: {
    diagnosis: "Laringotraqueítis viral aguda (crup) leve en niño de 2 años.",
    pathologies: [
      { name: "Laringotraqueítis viral (crup)", role: "principal", why: "Tos perruna, disfonía y estridor inspiratorio tras un pródromo catarral." },
      { name: "Epiglotitis", role: "diferencial", why: "Emergencia de vía aérea: babeo, aspecto tóxico, sin tos." },
      { name: "Cuerpo extraño", role: "diferencial", why: "Inicio súbito sin pródromo." },
      { name: "Traqueítis bacteriana", role: "diferencial", why: "Crup que se agrava con aspecto tóxico." },
    ],
    reasoning: [
      "Causa: virus parainfluenza (sobre todo el tipo 1), y también VSR, influenza y otros.",
      "Mecanismo: el virus inflama la laringe y la tráquea; el edema se concentra en la región subglótica, rodeada por el anillo cricoideo, que no se puede expandir.",
      "Consecuencia: en un niño pequeño la subglotis es la parte más angosta de la vía aérea, y por la ley de Poiseuille un milímetro de edema reduce mucho el calibre → estridor inspiratorio, tos perruna y disfonía (inflamación de las cuerdas vocales).",
      "Por eso los corticoides (que bajan el edema) son el tratamiento central, y la adrenalina (vasoconstrictora) se usa como rescate.",
    ],
    epidemiology:
      "Es la causa más frecuente de estridor agudo en la infancia. Afecta sobre todo a niños de 6 meses a 3 años, con predominio en varones (1,5:1). Es más común en otoño y comienzo del invierno, cuando circula el parainfluenza, y los síntomas empeoran de noche.",
    management: [
      "Valorar la gravedad con el puntaje de Westley (estridor, tiraje, entrada de aire, cianosis, conciencia).",
      "Leve: dexametasona oral en dosis única y alta con pautas de alarma.",
      "Moderado o grave: dexametasona más adrenalina nebulizada y observación de 2–4 h; internar si persiste el estridor en reposo o necesita más de una nebulización.",
      "Mantener al niño tranquilo; oxígeno solo si hay hipoxemia.",
      "Ante aspecto tóxico, babeo o falta de respuesta, pensar en epiglotitis o traqueítis bacteriana.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Consenso sobre infecciones respiratorias agudas bajas y Guía de laringitis aguda (crup).",
      "Ministerio de Salud de la Nación — Calendario Nacional de Vacunación (Haemophilus b).",
    ],
    pearls: [
      "Tos perruna + disfonía + estridor inspiratorio = crup.",
      "La dexametasona también va en el crup leve.",
      "Sospecha de epiglotitis: no bajalenguas, no acostarlo, vía aérea en quirófano.",
    ],
    pitfalls: ["Pedir radiografía de cuello de rutina.", "Dar antibióticos.", "Mandarlo a casa tras adrenalina sin observar el rebote."],
  },
};
