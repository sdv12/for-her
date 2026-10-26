import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const otitis: ClinicalCase = {
  id: "otitis-media-aguda",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 2, ageUnit: "años", sex: "F", context: "Agosto. La trae el papá a la noche." },
  frequency: "muy-frecuente",
  intro: "“Está resfriada hace cuatro días y hoy a la tarde empezó con fiebre. Llora mucho, se toca la oreja derecha y no quiere dormir.”",
  vitals: { FC: "132 lpm", FR: "26 rpm", "T°": "38,9 °C", "SatO₂": "98 %", Peso: "12 kg" },
  anamnesis: [
    act("inicio", "¿Cómo empezó el cuadro?", "clave", "“Primero mocos y tos, como un resfrío. Hoy de golpe la fiebre y el dolor de oído.”", "La otitis media aguda suele aparecer como complicación de una infección viral de la vía aérea superior, que inflama y obstruye la trompa de Eustaquio."),
    act("otorrea", "¿Le salió líquido o pus del oído?", "clave", "“No, nada.”", "La otorrea indicaría perforación timpánica espontánea: cambia la conducta (siempre antibiótico, no gotas ototóxicas)."),
    act("atb", "¿Tomó antibióticos en el último mes?", "clave", "“No.”", "Si recibió amoxicilina en los últimos 30 días, se elige amoxicilina-clavulánico por posible germen productor de betalactamasa."),
    act("alergia", "¿Es alérgica a algún medicamento?", "clave", "“No que sepamos.”", "La alergia a penicilina cambia el antibiótico de elección."),
    act("previas", "¿Tuvo otitis antes?", "util", "“Una el invierno pasado.”", "Tres o más episodios en 6 meses (o cuatro en un año) es otitis recurrente y requiere derivación a ORL."),
    act("guarderia", "¿Va al jardín maternal? ¿Alguien fuma en la casa?", "util", "“Va al jardín desde marzo. Nadie fuma.”", "El jardín, el tabaquismo pasivo y el uso de chupete o mamadera acostada son factores de riesgo."),
    act("vacunas", "¿Tiene el calendario completo?", "util", "“Sí, todas las vacunas.”", "La vacuna antineumocócica conjugada del Calendario Nacional reduce las otitis por neumococo."),
    act("vomitos", "¿Vomitó o tuvo convulsiones? ¿Está decaída entre los picos de fiebre?", "util", "“No. Cuando le baja la fiebre juega.”", "Buen estado entre picos tranquiliza; la letargia o el compromiso neurológico harían pensar en una infección más grave."),
    act("comida", "¿Qué comió hoy?", "neutro", "“Lo de siempre, comió poco.”", "No orienta."),
  ],
  exam: [
    act("otoscopia", "Otoscopía", "clave", "Oído derecho: membrana timpánica abombada, eritematosa, opaca, sin reflejo luminoso ni movilidad. Oído izquierdo: normal.", "El abombamiento de la membrana es el signo más específico de otitis media aguda. El eritema solo, con fiebre y llanto, no alcanza."),
    act("faringe", "Fauces", "util", "Congestión leve, sin exudado.", "Busca otro foco de fiebre."),
    act("meningeos", "Signos meníngeos y estado neurológico", "clave", "Sin rigidez de nuca, conectada, reactiva.", "Ante fiebre y llanto en un niño pequeño, descartar meningitis es obligatorio."),
    act("mastoides", "Región mastoidea", "clave", "Sin dolor, eritema ni despegamiento del pabellón.", "La mastoiditis es la complicación supurada más frecuente y requiere internación."),
    act("pulmonar", "Auscultación pulmonar", "util", "Buena entrada de aire bilateral, sin ruidos agregados.", "Descarta un foco respiratorio bajo."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma y PCR", "innecesario", "Leucocitos 13.800, PCR 18 mg/l.", "El diagnóstico es clínico y otoscópico: el laboratorio no cambia la conducta."),
    study("Imágenes", "rx", "Radiografía de senos paranasales", "innecesario", "Engrosamiento mucoso inespecífico.", "En niños pequeños no sirve para el diagnóstico de sinusitis ni de otitis; irradia sin beneficio."),
    study("Microbiología", "cultivo", "Timpanocentesis con cultivo", "innecesario", "No se realizó.", "Solo para fallas de tratamiento, inmunocomprometidos o recién nacidos, y la hace el especialista."),
    study("Laboratorio", "orina", "Orina completa", "neutro", "Normal.", "En una niña de 2 años con fiebre sin foco sería útil; acá el foco está claro."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("oma", "Otitis media aguda derecha", true, "Comienzo agudo, otalgia (se toca la oreja, llanto), fiebre y membrana timpánica abombada: los tres criterios."),
      dx("ome", "Otitis media con efusión (serosa)", false, "Hay líquido en el oído medio pero sin signos agudos: sin fiebre, sin otalgia ni abombamiento inflamatorio."),
      dx("externa", "Otitis externa", false, "Dolor a la tracción del pabellón, conducto edematoso; es más típica de la edad escolar y del verano (natación)."),
      dx("meningitis", "Meningitis bacteriana", false, "Daría compromiso del estado general, letargia, vómitos o signos meníngeos."),
      dx("mastoiditis", "Mastoiditis aguda", false, "Dolor, eritema y tumefacción retroauricular con despegamiento del pabellón."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("amoxi", "Amoxicilina 80–90 mg/kg/día en 2 tomas por 10 días", "clave", "En menores de 2 años o con fiebre ≥ 39 °C se indica antibiótico. Dosis alta para cubrir neumococo con sensibilidad disminuida; 10 días en menores de 2 años."),
      mg("analgesia", "Ibuprofeno o paracetamol para el dolor y la fiebre", "clave", "El dolor es el síntoma principal y se trata siempre, con o sin antibiótico."),
      mg("control", "Control en 48–72 h y pautas de alarma", "clave", "Si no mejora en 48–72 h, reevaluar y rotar a amoxicilina-clavulánico."),
      mg("gotas", "Gotas óticas con antibiótico y corticoide", "innecesario", "Con tímpano íntegro no llegan al oído medio; no tratan la otitis media."),
      mg("antihist", "Antihistamínicos y descongestivos", "innecesario", "No aceleran la curación y tienen efectos adversos en niños pequeños."),
      mg("ceftri", "Ceftriaxona intramuscular", "innecesario", "Se reserva para quien no tolera la vía oral o tras falla de tratamiento."),
      mg("observar", "Esperar sin antibiótico y controlar (observación)", "innecesario", "Es válido en mayores de 2 años con cuadro leve y unilateral; en esta niña con fiebre alta no corresponde."),
    ],
  },
  debrief: {
    diagnosis: "Otitis media aguda derecha en niña de 2 años, sin complicaciones.",
    pathologies: [
      { name: "Otitis media aguda", role: "principal", why: "Inicio agudo, otalgia, fiebre y membrana abombada." },
      { name: "Infección viral de vía aérea superior", role: "asociada", why: "Es el disparador habitual: inflama la trompa de Eustaquio." },
      { name: "Otitis media con efusión", role: "diferencial", why: "Líquido sin inflamación aguda; no requiere antibiótico." },
      { name: "Meningitis", role: "diferencial", why: "A descartar ante fiebre y llanto en un niño pequeño." },
      { name: "Mastoiditis", role: "diferencial", why: "Complicación supurada que requiere internación." },
    ],
    reasoning: [
      "Causa: neumococo, Haemophilus influenzae no tipificable y Moraxella catarrhalis, casi siempre después de una infección viral.",
      "Mecanismo: la trompa de Eustaquio del niño pequeño es más corta, horizontal y colapsable. La inflamación viral la obstruye, el oído medio queda con presión negativa y el moco se contamina con flora de la rinofaringe.",
      "Consecuencia: el exudado purulento a presión abomba la membrana timpánica → dolor intenso, fiebre, irritabilidad; si la presión rompe el tímpano aparece otorrea y el dolor alivia.",
      "Por eso el diagnóstico exige ver la membrana: el abombamiento separa la otitis aguda de la efusión y del tímpano rojo por llanto o fiebre.",
    ],
    epidemiology:
      "Es la infección bacteriana más frecuente en la infancia y la primera causa de prescripción de antibióticos en pediatría. El pico es entre los 6 y los 24 meses, en otoño e invierno, y es algo más frecuente en varones. Aumentan el riesgo el jardín maternal, el tabaquismo pasivo, la mamadera acostada y la falta de lactancia.",
    management: [
      "Confirmar el diagnóstico con otoscopía (abombamiento) y descartar complicaciones (mastoiditis, meningitis, parálisis facial).",
      "Analgesia en todos los casos.",
      "Antibiótico de entrada en menores de 6 meses, de 6 a 24 meses con diagnóstico confirmado, otorrea, fiebre ≥ 39 °C, otalgia intensa o bilateral; en el resto se puede observar 48–72 h.",
      "Amoxicilina a dosis alta (80–90 mg/kg/día); amoxicilina-clavulánico si recibió amoxicilina en los 30 días previos o falla de tratamiento.",
      "Control a las 48–72 h; derivar a ORL si es recurrente o complicada.",
    ],
    sources: [
      "Sociedad Argentina de Pediatría — Consenso de otitis media aguda.",
      "Ministerio de Salud de la Nación — Calendario Nacional de Vacunación (antineumocócica conjugada).",
    ],
    pearls: [
      "Sin abombamiento de la membrana no hay diagnóstico firme de otitis media aguda.",
      "Dosis alta de amoxicilina: el neumococo con sensibilidad intermedia se vence con concentración.",
      "Otitis + conjuntivitis purulenta sugiere Haemophilus: ahí conviene amoxicilina-clavulánico.",
    ],
    pitfalls: ["Diagnosticar otitis por un tímpano rojo en un niño que lloró.", "Indicar gotas óticas para una otitis media.", "Olvidar la analgesia."],
  },
};
