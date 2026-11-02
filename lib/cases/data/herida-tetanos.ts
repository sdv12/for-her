import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const heridaTetanos: ClinicalCase = {
  id: "herida-cortante-profilaxis-tetanica",
  level: 1,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 58, ageUnit: "años", sex: "M", context: "Trabaja en una huerta. Sin enfermedades conocidas." },
  frequency: "muy-frecuente",
  intro: "“Me corté con una chapa oxidada en el gallinero, hace unas tres horas. Ya no sangra mucho.”",
  vitals: { TA: "130/80 mmHg", FC: "84 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("vacuna", "¿Cuándo fue tu última vacuna antitetánica? ¿Te vacunaste de chico?", "clave", "“No me acuerdo... la última vez creo que en la colimba.”", "Si no se conoce el esquema o pasaron más de 10 años, hay que vacunar; con herida sucia y esquema incierto, además gammaglobulina."),
    act("mecanismo", "¿Con qué te cortaste y dónde estaba?", "clave", "“Una chapa vieja, con tierra y bosta.”", "Herida contaminada con tierra o heces: de alto riesgo para tétanos."),
    act("tiempo", "¿Hace cuánto fue?", "clave", "“Tres horas.”", "Dentro de las 6–8 h puede cerrarse con sutura primaria si está bien lavada; las heridas contaminadas a veces se dejan abiertas."),
    act("sensibilidad", "¿Sentís bien los dedos? ¿Los podés mover?", "util", "“Sí, todo bien.”", "Descarta lesión de nervios o tendones."),
    act("diabetes", "¿Tenés diabetes o tomás corticoides?", "util", "“No.”", "Mayor riesgo de infección."),
    act("alergias", "¿Sos alérgico a algún medicamento?", "util", "“No.”", "Por si hace falta antibiótico."),
    act("huerta", "¿Qué plantás?", "neutro", "“Tomates y lechuga.”", "No orienta."),
  ],
  exam: [
    act("herida", "Inspección de la herida", "clave", "Herida de 3 cm en el dorso de la mano izquierda, bordes irregulares, con restos de tierra.", "Herida contaminada: lavado y desbridamiento."),
    act("neurovascular", "Examen neurovascular y tendinoso distal", "clave", "Sensibilidad, movilidad y pulsos conservados.", "Sin lesión de estructuras profundas."),
    act("exploracion", "Exploración bajo anestesia local", "util", "Sin cuerpos extraños ni exposición tendinosa.", "Asegura que no queden restos ni lesiones ocultas."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de mano", "util", "Sin cuerpos extraños metálicos ni fracturas.", "Útil si se sospecha cuerpo extraño radiopaco."),
    study("Laboratorio", "lab", "Laboratorio completo", "innecesario", "No se realizó.", "No cambia la conducta en una herida simple."),
    study("Microbiología", "cultivo", "Cultivo de la herida al ingreso", "innecesario", "No se realizó.", "En heridas sin signos de infección no orienta el tratamiento."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("herida", "Herida cortante contaminada en mano, con esquema antitetánico incierto", true, "Corte con material sucio con tierra y heces, sin lesión profunda, y sin vacunación documentada en más de 10 años."),
      dx("tetanos", "Tétanos", false, "No hay trismus, rigidez ni espasmos: es una herida con riesgo de tétanos."),
      dx("tendon", "Lesión de tendón extensor", false, "La movilidad está conservada y la exploración no muestra exposición."),
      dx("celulitis", "Celulitis", false, "Herida de tres horas sin eritema ni calor."),
      dx("limpia", "Herida limpia y menor", false, "Está contaminada con tierra y bosta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lavado", "Lavado abundante con solución fisiológica, desbridamiento y cierre según evaluación", "clave", "Es la medida más importante para prevenir infección y tétanos."),
      mg("vacuna", "Vacuna doble adultos (dT) y completar el esquema", "clave", "Esquema desconocido: se inicia o completa (3 dosis) y luego refuerzo cada 10 años."),
      mg("igat", "Gammaglobulina antitetánica (250 UI IM, en otro sitio que la vacuna)", "clave", "Herida sucia con esquema incompleto o desconocido."),
      mg("atb", "Antibiótico profiláctico en heridas contaminadas de mano según criterio", "util", "Puede indicarse en heridas de mano muy contaminadas; no reemplaza el lavado."),
      mg("sutura-sin-lavar", "Sutura inmediata sin lavar para que no se infecte", "riesgoso", "Cerrar una herida sucia sin limpiar favorece la infección y el tétanos."),
      mg("solo-vacuna-si-sintomas", "Vacunar solo si aparecen síntomas", "riesgoso", "La vacuna no trata el tétanos establecido: la prevención es ahora."),
    ],
  },
  debrief: {
    diagnosis: "Herida cortante contaminada en el dorso de la mano, sin lesión de estructuras profundas, en varón de 58 años con esquema antitetánico desconocido.",
    pathologies: [
      { name: "Herida cortante contaminada", role: "principal", why: "Corte con material sucio en la mano." },
      { name: "Riesgo de tétanos", role: "asociada", why: "Herida sucia sin inmunidad documentada." },
      { name: "Lesión tendinosa o nerviosa, cuerpo extraño", role: "diferencial", why: "Se descartan con el examen y la radiografía." },
    ],
    reasoning: [
      "Causa: las esporas de Clostridium tetani viven en la tierra y las heces de animales y entran por heridas.",
      "Mecanismo: en tejido mal oxigenado germinan y producen tetanospasmina, que bloquea la liberación de los neurotransmisores inhibitorios (glicina, GABA) en la médula.",
      "Consecuencia: contracturas y espasmos dolorosos (trismus, risa sardónica, opistótonos) y falla respiratoria; la vacuna y la gammaglobulina lo previenen.",
    ],
    epidemiology:
      "El tétanos es raro en Argentina gracias a la vacunación, pero los casos actuales ocurren casi siempre en adultos mayores, sobre todo varones de zonas rurales, que nunca completaron el esquema o no recibieron refuerzos. Las heridas en manos y pies son las más frecuentes en la guardia.",
    management: [
      "Lavado, desbridamiento y evaluación de estructuras profundas.",
      "Evaluar el tipo de herida (limpia o sucia) y el estado de vacunación.",
      "Esquema incompleto o desconocido: vacuna dT; si la herida es sucia, sumar gammaglobulina antitetánica.",
      "Esquema completo: refuerzo si la última dosis fue hace más de 10 años (herida limpia) o más de 5 años (herida sucia).",
    ],
    sources: ["Ministerio de Salud de la Nación — Normas nacionales de vacunación (profilaxis antitetánica en heridas).", "Calendario Nacional de Vacunación."],
    pearls: ["Herida sucia + esquema desconocido = vacuna + gammaglobulina.", "Refuerzo de dT cada 10 años.", "El lavado es la mejor profilaxis."],
    pitfalls: ["No preguntar por la vacuna.", "Suturar sin lavar."],
    tribunal: [
      qa("¿Cuándo se indica gammaglobulina antitetánica?", "En heridas sucias o de riesgo (tierra, heces, saliva, necrosis, quemaduras, mordeduras) cuando el esquema es incompleto (menos de tres dosis) o desconocido."),
      qa("¿Cómo se manifiesta el tétanos?", "Trismus (lo más precoz), risa sardónica, rigidez del cuello y la espalda (opistótonos), espasmos dolorosos ante estímulos con conciencia conservada, disautonomía y falla respiratoria."),
      qa("¿Qué es el tétanos neonatal y cómo se previene?", "El tétanos del recién nacido por infección del cordón umbilical en madres no vacunadas; se previene vacunando a las embarazadas y con parto y cuidado del cordón limpios."),
    ],
  },
};
