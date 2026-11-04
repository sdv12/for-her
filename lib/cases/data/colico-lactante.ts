import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const colicoLactante: ClinicalCase = {
  id: "colico-del-lactante",
  level: 1,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 1, ageUnit: "meses", sex: "M", context: "6 semanas de vida. Primer hijo. Lactancia exclusiva. Padres agotados." },
  frequency: "muy-frecuente",
  intro: "“Llora todas las tardes por horas, se pone rojo, encoge las piernas y no hay nada que lo calme. Ya no sabemos qué hacer.” (relatan los padres a las 21 horas)",
  vitals: { FC: "148 lpm", FR: "40 rpm", "T°": "36,8 °C", Peso: "4,6 kg" },
  anamnesis: [
    act("patron", "¿Cuántas horas llora, cuántos días por semana y desde cuándo?", "clave", "“Unas cuatro horas por la tarde, casi todos los días, desde hace tres semanas.”", "Regla de los 3: más de 3 horas, más de 3 días por semana, más de 3 semanas."),
    act("alimentacion", "¿Toma bien? ¿Aumenta de peso?", "clave", "“Toma bien el pecho y aumentó en el control.”", "Buen crecimiento: dato tranquilizador."),
    act("alarma", "¿Fiebre, vómitos, sangre en la caca, rechazo del alimento, decaimiento entre los episodios?", "clave", "“No, entre los llantos está bien.”", "Sin signos de alarma de causa orgánica."),
    act("padres", "¿Cómo están ustedes? ¿Pudieron descansar? ¿Alguna vez sintieron que podían perder el control?", "clave", "“Estamos agotados, a veces desesperados.”", "El agotamiento parental es un factor de riesgo de síndrome del bebé sacudido: hay que preguntar y contener."),
    act("tabaco", "¿Alguien fuma en la casa?", "util", "“El papá, afuera.”", "Asociado a más llanto."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Lorenzo.”", "No orienta."),
  ],
  exam: [
    act("examen", "Examen físico completo", "clave", "Normal: buen estado, fontanela normotensa, abdomen blando, sin hernias, sin lesiones.", "Descarta causas orgánicas (hernia atascada, otitis, fracturas, lesiones)."),
    act("piel", "Piel y fondo de ojo si hay dudas de lesiones", "util", "Sin hematomas.", "Descarta maltrato."),
    act("crecimiento", "Peso y curva", "util", "Percentilo 50, ganancia adecuada.", "Crecimiento normal."),
  ],
  studies: [
    study("Laboratorio", "lab", "Laboratorio y orina", "innecesario", "No se realizó.", "Examen normal y crecimiento adecuado: no se necesitan estudios."),
    study("Imágenes", "eco", "Ecografía abdominal", "innecesario", "No se realizó.", "Sin indicación."),
    study("Otros", "diario", "Registro del llanto", "util", "Llanto vespertino de 3–4 h.", "Confirma el patrón."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("colico", "Cólico del lactante con agotamiento parental", true, "Llanto vespertino de más de 3 horas, más de 3 días por semana, por más de 3 semanas, en un lactante sano que crece bien, con examen normal."),
      dx("aplv", "Alergia a la proteína de leche de vaca", false, "No hay sangre en heces, dermatitis, vómitos ni mal progreso de peso."),
      dx("reflujo", "Enfermedad por reflujo", false, "No hay vómitos ni rechazo del alimento."),
      dx("itu", "Infección urinaria", false, "Sin fiebre, crece bien y está bien entre episodios."),
      dx("hambre", "Hambre por leche insuficiente", false, "Gana peso adecuadamente."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("contener", "Explicar que es benigno y transitorio (mejora a los 3–4 meses) y contener a los padres", "clave", "La tranquilidad y la información son el tratamiento principal."),
      mg("sacudir", "Advertir que nunca hay que sacudir al bebé; si se desbordan, dejarlo seguro en la cuna y pedir ayuda", "clave", "Previene el síndrome del bebé sacudido."),
      mg("lactancia", "Continuar la lactancia exclusiva", "clave", "No hay motivo para cambiarla."),
      mg("medidas", "Medidas de calma: arrullo, contacto piel con piel, ruido blanco, turnarse entre adultos", "util", "Alivian a la familia."),
      mg("formula", "Cambiar a leche de fórmula", "riesgoso", "Interrumpe la lactancia sin beneficio."),
      mg("medicamentos", "Antiespasmódicos o simeticona", "innecesario", "Sin eficacia demostrada; algunos antiespasmódicos son peligrosos en lactantes."),
    ],
  },
  debrief: {
    diagnosis: "Cólico del lactante en varón de 6 semanas de vida, sano, con buen crecimiento, con agotamiento parental.",
    pathologies: [
      { name: "Cólico del lactante", role: "principal", why: "Llanto excesivo sin causa orgánica." },
      { name: "Agotamiento parental", role: "asociada", why: "Riesgo de maltrato involuntario." },
      { name: "Alergia a la leche de vaca, reflujo, infección urinaria", role: "diferencial", why: "Causas orgánicas a descartar." },
    ],
    reasoning: [
      "Causa: desconocida; se proponen inmadurez digestiva y del sistema nervioso, microbiota y factores del entorno.",
      "Mecanismo: llanto intenso, sobre todo vespertino, difícil de calmar.",
      "Consecuencia: es autolimitado, pero genera mucho estrés familiar, abandono de la lactancia y riesgo de bebé sacudido.",
    ],
    epidemiology:
      "El cólico del lactante afecta a alrededor del 20 % de los lactantes, con pico a las 6 semanas y resolución a los 3–4 meses, sin diferencias por sexo. Es una consulta muy frecuente en guardias pediátricas, sobre todo de noche y con padres primerizos.",
    management: [
      "Descartar causas orgánicas con anamnesis y examen.",
      "Tranquilizar e informar.",
      "Apoyar a los padres y prevenir el bebé sacudido.",
      "Mantener la lactancia.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones sobre el llanto del lactante.", "Programa de prevención del síndrome del bebé sacudido."],
    pearls: ["Regla de los 3.", "Crece bien y examen normal = no estudiar.", "Nunca sacudir."],
    pitfalls: ["Cambiar la leche.", "No preguntar cómo están los padres."],
    tribunal: [
      qa("¿Qué es el síndrome del bebé sacudido?", "Lesiones por sacudir con violencia a un lactante: hematoma subdural, hemorragias retinianas y encefalopatía, a veces sin signos externos; el desencadenante más frecuente es el llanto inconsolable."),
      qa("¿Qué signos de alarma hacen sospechar una causa orgánica del llanto?", "Fiebre, vómitos, sangre en heces, rechazo del alimento, mal progreso de peso, llanto agudo o diferente, decaimiento entre episodios, inicio después de los 4 meses y alteraciones del examen."),
      qa("¿Qué es la alergia a la proteína de leche de vaca?", "Una reacción inmune a las proteínas de la leche que puede dar sangre en heces, vómitos, diarrea, dermatitis, mal progreso de peso o anafilaxia; en lactantes amamantados se trata con dieta materna sin lácteos."),
    ],
  },
};
