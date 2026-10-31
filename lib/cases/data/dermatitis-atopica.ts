import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const dermatitisAtopica: ClinicalCase = {
  id: "dermatitis-atopica-lactante",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 10, ageUnit: "meses", sex: "F", context: "La traen los papás preocupados. El papá tiene asma." },
  frequency: "muy-frecuente",
  intro: "“Desde los tres meses tiene la piel muy seca y manchas rojas en las mejillas y los brazos que le pican mucho. No duerme por rascarse. Probamos de todo.”",
  vitals: { "T°": "36,6 °C", Peso: "8,9 kg (percentil 50)" },
  anamnesis: [
    act("prurito", "¿Le pica? ¿Cómo duerme?", "clave", "“Muchísimo, se despierta rascándose.”", "El prurito es el síntoma central: sin prurito no hay dermatitis atópica."),
    act("atopia", "¿Alguien de la familia tiene asma, rinitis o eccema?", "clave", "“El papá tiene asma y yo rinitis.”", "Antecedente familiar de atopía: dato muy orientador."),
    act("evolucion", "¿Mejora y empeora? ¿Qué lo empeora?", "util", "“Empeora con el calor, la ropa de lana y los baños largos.”", "Curso en brotes con desencadenantes."),
    act("cremas", "¿Qué le pusieron?", "util", "“Cremas caseras, aceite y una crema con antibiótico.”", "Muchas cremas irritan o sensibilizan."),
    act("alimentos", "¿Lo relacionan con algún alimento? ¿Hicieron dietas?", "util", "“Le sacamos la leche de vaca por las dudas.”", "Las dietas de exclusión sin indicación no mejoran la piel y ponen en riesgo la nutrición."),
    act("crecimiento", "¿Cómo está creciendo?", "util", "“Bien, según el pediatra.”", "Un mal crecimiento obligaría a buscar otras causas."),
    act("hermanos", "¿Tiene hermanos?", "neutro", "“No.”", "No orienta."),
  ],
  exam: [
    act("lesiones", "Inspección de la piel", "clave", "Xerosis generalizada, placas eritematosas con excoriaciones y costras en mejillas, cuello y superficies extensoras de los brazos; respeta la zona del pañal.", "Distribución típica del lactante (cara y extensoras) con respeto del pañal."),
    act("sobreinfeccion", "Buscar sobreinfección", "clave", "Sin costras melicéricas ni vesículas agrupadas.", "La sobreinfección por estafilococo o por herpes (eczema herpético) cambia la conducta."),
    act("pliegues", "Pliegues y cuero cabelludo", "util", "Sin escamas grasas en cuero cabelludo.", "La dermatitis seborreica afecta cuero cabelludo y pliegues, con escamas amarillentas y poco prurito."),
  ],
  studies: [
    study("Laboratorio", "ige", "IgE total y pruebas de alergia alimentaria de rutina", "innecesario", "No se realizaron.", "Pueden dar positivos sin relevancia y llevar a dietas innecesarias; solo si hay reacciones claras a alimentos."),
    study("Microbiología", "cultivo", "Cultivo de piel", "innecesario", "No se realizó.", "Solo si se sospecha sobreinfección."),
    study("Otros", "biopsia", "Biopsia de piel", "innecesario", "No se realizó.", "El diagnóstico es clínico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("da", "Dermatitis atópica del lactante, moderada", true, "Prurito, xerosis y eccema en cara y extensoras desde los 3 meses, con antecedentes familiares de atopía y curso en brotes."),
      dx("seborreica", "Dermatitis seborreica", false, "Escamas amarillentas en cuero cabelludo y pliegues, poco prurito, en los primeros meses."),
      dx("escabiosis", "Escabiosis", false, "Lesiones en palmas, plantas y pliegues con surcos y convivientes con prurito."),
      dx("alergia", "Alergia a la proteína de la leche de vaca", false, "Da síntomas digestivos o reacciones inmediatas; no es la causa habitual del eccema."),
      dx("contacto", "Dermatitis de contacto", false, "Lesiones limitadas a la zona de contacto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("emolientes", "Emolientes varias veces por día y baños cortos y tibios con syndet", "clave", "Restauran la barrera cutánea: son la base del tratamiento y previenen brotes."),
      mg("corticoide", "Corticoide tópico de baja potencia en los brotes, por pocos días", "clave", "Controla la inflamación y el prurito; usado bien es seguro."),
      mg("medidas", "Ropa de algodón, evitar lana, perfumes y calor; uñas cortas", "util", "Reducen desencadenantes."),
      mg("dieta", "Reincorporar la leche de vaca (sin dieta de exclusión)", "clave", "Las dietas de exclusión sin diagnóstico de alergia no mejoran el eccema y afectan la nutrición."),
      mg("antibiotico", "Crema con antibiótico de uso continuo", "riesgoso", "Selecciona resistencias y puede sensibilizar."),
      mg("corticoide-oral", "Corticoides orales", "innecesario", "Producen rebote y efectos adversos; no se usan en la dermatitis atópica."),
    ],
  },
  debrief: {
    diagnosis: "Dermatitis atópica moderada del lactante, con antecedentes familiares de atopía.",
    pathologies: [
      { name: "Dermatitis atópica", role: "principal", why: "Eccema crónico pruriginoso con alteración de la barrera." },
      { name: "Dermatitis seborreica", role: "diferencial", why: "Otro eccema del lactante." },
      { name: "Escabiosis", role: "diferencial", why: "Prurito intenso en lactantes." },
    ],
    reasoning: [
      "Causa: predisposición genética (mutaciones de la filagrina) y ambiente.",
      "Mecanismo: la barrera cutánea defectuosa pierde agua y deja pasar irritantes y alérgenos; se activa una inflamación tipo Th2 que aumenta el prurito y el rascado daña más la barrera.",
      "Consecuencia: piel seca, eccema pruriginoso en brotes y mayor riesgo de sobreinfección; muchos niños desarrollan luego asma y rinitis (marcha atópica).",
    ],
    epidemiology:
      "La dermatitis atópica afecta a alrededor del 15–20 % de los niños y suele empezar antes del año de vida. La mayoría mejora con los años. Es más frecuente con antecedentes familiares de atopía y en zonas urbanas. No hay grandes diferencias por sexo.",
    management: [
      "Diagnóstico clínico.",
      "Emolientes diarios y cuidado de la piel como base.",
      "Corticoides tópicos (o inhibidores de calcineurina) en los brotes.",
      "Tratar la sobreinfección; evitar desencadenantes.",
      "No indicar dietas de exclusión sin diagnóstico de alergia alimentaria.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Consenso de dermatitis atópica.", "Sociedad Argentina de Pediatría — Guía de dermatitis atópica."],
    pearls: ["Sin prurito no es atópica.", "Emolientes todos los días.", "Las dietas no curan el eccema."],
    pitfalls: ["Miedo excesivo a los corticoides tópicos.", "Indicar dietas de exclusión sin estudio."],
    tribunal: [
      qa("¿Qué es la marcha atópica?", "La secuencia frecuente en niños atópicos: dermatitis atópica en el lactante, alergia alimentaria, luego asma y rinitis alérgica."),
      qa("¿Cómo cambia la distribución según la edad?", "Lactante: mejillas, cuero cabelludo y superficies extensoras, respetando el pañal. Niño: pliegues de codos y rodillas, cuello, muñecas. Adulto: pliegues, cara, cuello y manos."),
      qa("¿Qué es el eczema herpético?", "La sobreinfección por herpes simple en una dermatitis atópica: vesículas y erosiones en sacabocado con fiebre; es una urgencia que se trata con aciclovir."),
    ],
  },
};
