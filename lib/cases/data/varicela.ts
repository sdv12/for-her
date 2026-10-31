import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const varicela: ClinicalCase = {
  id: "varicela-nina",
  level: 1,
  area: "Pediatría",
  setting: "CAPS",
  patient: { age: 5, ageUnit: "años", sex: "F", context: "Septiembre. No recibió la vacuna. Tiene un hermano de 3 meses." },
  frequency: "frecuente",
  intro: "“Ayer tuvo fiebre y hoy le salieron granitos con agua por todo el cuerpo, empezando por la panza y la cara. Le pican mucho.”",
  vitals: { FC: "112 lpm", FR: "22 rpm", "T°": "38,2 °C", Peso: "19 kg" },
  anamnesis: [
    act("evolucion", "¿Cómo fueron apareciendo las lesiones?", "clave", "“Salen nuevas todo el tiempo; algunas ya tienen costra.”", "Lesiones en distintos estadios (cielo estrellado) son típicas de la varicela."),
    act("contacto", "¿Estuvo con alguien con varicela?", "clave", "“En el jardín hubo casos hace dos semanas.”", "La incubación es de 10 a 21 días."),
    act("vacuna", "¿Recibió la vacuna contra la varicela?", "util", "“No, ese día estaba enferma y no volvimos.”", "Está en el Calendario Nacional a los 15 meses."),
    act("convivientes", "¿Hay en la casa embarazadas, bebés o personas con defensas bajas?", "clave", "“El hermanito de 3 meses.”", "Los contactos de riesgo pueden necesitar profilaxis."),
    act("aspirina", "¿Le dieron algo para la fiebre?", "clave", "“Ibuprofeno.”", "En la varicela se usa paracetamol: los AINE se asocian a infecciones graves de piel (fascitis) y la aspirina a síndrome de Reye."),
    act("respira", "¿Tose, le cuesta respirar o está muy decaída?", "util", "“No.”", "La neumonía y la encefalitis son complicaciones."),
    act("color", "¿Cuál es su color favorito?", "neutro", "“Violeta.”", "No orienta."),
  ],
  exam: [
    act("piel", "Inspección de la piel", "clave", "Máculas, pápulas, vesículas “en gota de rocío” y costras en tronco, cara y cuero cabelludo, en distintos estadios.", "Exantema polimorfo centrípeto: típico."),
    act("mucosas", "Mucosas", "util", "Algunas vesículas en el paladar.", "Frecuentes en la varicela."),
    act("sobreinfeccion", "Buscar lesiones sobreinfectadas", "clave", "Sin eritema ni pus alrededor de las lesiones.", "La sobreinfección bacteriana (estreptococo) es la complicación más frecuente."),
    act("neuro", "Estado neurológico y marcha", "util", "Normal.", "La ataxia cerebelosa es una complicación neurológica típica."),
  ],
  studies: [
    study("Microbiología", "pcr", "PCR de una vesícula", "innecesario", "No se realizó.", "El diagnóstico es clínico; se reserva para inmunocomprometidos o dudas."),
    study("Laboratorio", "hemograma", "Hemograma", "innecesario", "Normal.", "No cambia la conducta."),
    study("Imágenes", "rx", "Radiografía de tórax", "neutro", "No se realizó.", "Solo si hay tos o dificultad respiratoria."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("varicela", "Varicela no complicada", true, "Fiebre y exantema vesicular pruriginoso polimorfo, centrípeto, con contacto previo, en una niña no vacunada."),
      dx("impetigo", "Impétigo", false, "Costras melicéricas localizadas, sin exantema generalizado polimorfo."),
      dx("zoster", "Herpes zóster", false, "Lesiones agrupadas en un dermatoma, unilaterales."),
      dx("estrofulo", "Prúrigo por picaduras", false, "Pápulas en zonas expuestas, sin fiebre ni vesículas en mucosas."),
      dx("mano-pie-boca", "Enfermedad mano-pie-boca", false, "Vesículas en manos, pies y boca, por enterovirus."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("sintomatico", "Paracetamol para la fiebre, antihistamínico para el prurito, uñas cortas y baño diario", "clave", "Tratamiento sintomático de la varicela no complicada en niños sanos."),
      mg("aislamiento", "No ir al jardín hasta que todas las lesiones estén en costra", "clave", "Es contagiosa desde 1–2 días antes del exantema hasta que todas las lesiones son costras."),
      mg("bebe", "Evaluar al hermano de 3 meses y a otros contactos de riesgo para profilaxis", "clave", "Los lactantes pequeños, embarazadas susceptibles e inmunocomprometidos pueden requerir inmunoglobulina o aciclovir."),
      mg("ibuprofeno", "Seguir con ibuprofeno para la fiebre", "riesgoso", "Los AINE se asocian a infecciones invasivas por estreptococo en la varicela."),
      mg("aspirina", "Aspirina para la fiebre", "riesgoso", "Asociada a síndrome de Reye (encefalopatía y falla hepática)."),
      mg("aciclovir", "Aciclovir oral de rutina", "innecesario", "En niños sanos menores de 12 años el beneficio es mínimo; se indica en adolescentes, adultos y grupos de riesgo."),
    ],
  },
  debrief: {
    diagnosis: "Varicela no complicada en niña de 5 años no vacunada, con conviviente lactante de riesgo.",
    pathologies: [
      { name: "Varicela", role: "principal", why: "Primoinfección por virus varicela zóster." },
      { name: "Sobreinfección bacteriana de piel", role: "diferencial", why: "Complicación más frecuente." },
      { name: "Impétigo y mano-pie-boca", role: "diferencial", why: "Otros exantemas vesiculares en niños." },
    ],
    reasoning: [
      "Causa: virus varicela zóster, transmitido por vía respiratoria y por contacto con las vesículas.",
      "Mecanismo: se replica en la vía respiratoria, produce viremia y llega a la piel, donde causa vesículas intraepidérmicas en brotes sucesivos.",
      "Consecuencia: exantema polimorfo pruriginoso con fiebre; queda latente en los ganglios sensitivos y puede reactivarse como herpes zóster.",
    ],
    epidemiology:
      "Es una enfermedad muy contagiosa de la infancia, con pico entre los 2 y 8 años, a fines del invierno y en primavera. Desde la incorporación de la vacuna al Calendario Nacional (2015) disminuyeron mucho los casos y las internaciones. En adultos y embarazadas es más grave.",
    management: [
      "Diagnóstico clínico; tratamiento sintomático con paracetamol, sin AINE ni aspirina.",
      "Aciclovir en mayores de 12 años, adultos, embarazadas e inmunocomprometidos.",
      "Aislamiento hasta que todas las lesiones estén en costra.",
      "Profilaxis de contactos susceptibles de riesgo (vacuna dentro de 3–5 días, inmunoglobulina o aciclovir según el caso).",
      "Vacunación según el Calendario Nacional.",
    ],
    sources: ["Ministerio de Salud de la Nación — Lineamientos técnicos de la vacuna contra varicela.", "Sociedad Argentina de Pediatría — Recomendaciones sobre varicela."],
    pearls: ["Lesiones en distintos estadios = varicela.", "Paracetamol sí; aspirina e ibuprofeno no.", "Contagia hasta que todo es costra."],
    pitfalls: ["Usar AINE o aspirina.", "No pensar en los contactos de riesgo."],
    tribunal: [
      qa("¿Qué complicaciones tiene la varicela?", "Sobreinfección bacteriana de la piel (la más frecuente; puede llegar a fascitis necrotizante), neumonía (más en adultos y embarazadas), ataxia cerebelosa, encefalitis, hepatitis y síndrome de Reye con aspirina."),
      qa("¿Qué es la varicela congénita?", "La infección materna en las primeras 20 semanas puede dar lesiones cicatrizales de piel, hipoplasia de miembros, alteraciones oculares y neurológicas; la varicela materna cerca del parto puede dar varicela neonatal grave."),
      qa("¿Cuándo es contagiosa?", "Desde 1–2 días antes de la aparición del exantema hasta que todas las lesiones están en costra (en general unos 5–7 días)."),
    ],
  },
};
