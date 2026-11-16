import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const laringomalacia: ClinicalCase = {
  id: "laringomalacia",
  level: 2,
  area: "Pediatría",
  setting: "Consultorio",
  patient: { age: 1, ageUnit: "meses", sex: "M", context: "Seis semanas de vida. Nació a término. Toma pecho y algo de fórmula." },
  frequency: "frecuente",
  intro: "La mamá: “Hace un ruido al respirar, como un ronquido agudo, sobre todo cuando llora o está boca arriba.”",
  vitals: { FC: "142 lpm", FR: "40 rpm", "SatO₂": "98 %", Peso: "4,6 kg (percentil 50)" },
  anamnesis: [
    act("ruido", "¿Cuándo empezó el ruido y cuándo empeora?", "clave", "“A las dos semanas. Peor cuando llora, come o está boca arriba; mejora boca abajo.”", "Estridor inspiratorio posicional: típico de laringomalacia."),
    act("alimentacion", "¿Cómo come? ¿Se ahoga, se pone morado?", "clave", "“Come bien, a veces regurgita.”", "Sin dificultades graves para alimentarse."),
    act("peso", "¿Aumenta bien de peso?", "clave", "“Sí, me dijeron que bárbaro.”", "Crecimiento normal: forma leve."),
    act("apneas", "¿Hace pausas para respirar o se pone azul?", "clave", "“No.”", "Signos de gravedad."),
    act("intubacion", "¿Estuvo intubado al nacer?", "util", "“No.”", "Descarta estenosis subglótica adquirida."),
    act("llanto", "¿Cómo es el llanto?", "util", "“Normal, fuerte.”", "Llanto débil o ronco orienta a cuerdas vocales."),
  ],
  exam: [
    act("estridor", "Respiración", "clave", "Estridor inspiratorio que aumenta con el llanto y en decúbito supino, sin tiraje.", "Laringomalacia leve."),
    act("crecimiento", "Peso y talla", "clave", "Percentil 50.", "Sin falla de crecimiento."),
    act("cardio", "Corazón", "util", "Sin soplos.", "Descarta anillo vascular asociado a cardiopatía."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Estridor inspiratorio posicional con buen crecimiento.", "En casos leves alcanza."),
    study("Otros", "fibrolaringoscopia", "Nasofibrolaringoscopía flexible si hay dudas o gravedad", "util", "Epiglotis en omega y repliegues aritenoepiglóticos cortos que colapsan en la inspiración.", "Confirma."),
    study("Imágenes", "tac", "TC de cuello", "innecesario", "No se pidió.", "No aporta en un caso típico leve."),
    study("Imágenes", "rx", "Radiografía de tórax", "innecesario", "No se pidió.", "No ve la laringe dinámica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("laringomalacia", "Laringomalacia leve", true, "Estridor inspiratorio desde las 2 semanas, peor con el llanto y en supino, con buen crecimiento y sin apneas."),
      dx("crup", "Laringitis (crup)", false, "No hay fiebre ni tos perruna, y lleva semanas."),
      dx("paralisis-cuerdas", "Parálisis de cuerdas vocales", false, "El llanto es normal."),
      dx("estenosis-subglotica", "Estenosis subglótica", false, "Sin intubación previa y estridor posicional."),
      dx("cuerpo-extrano", "Cuerpo extraño", false, "Edad y evolución no compatibles."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("tranquilizar", "Explicar que suele mejorar solo entre los 12 y 24 meses", "clave", "Evolución natural."),
      mg("control", "Control de peso y signos de alarma", "clave", "Detecta formas graves."),
      mg("alarma", "Consultar si hay pausas, cianosis, dificultad para comer o no sube de peso", "clave", "Criterios de derivación."),
      mg("reflujo", "Medidas para el reflujo", "util", "El reflujo empeora el edema laríngeo."),
      mg("dormir-boca-arriba", "Seguir durmiendo boca arriba", "clave", "La prevención de muerte súbita se mantiene."),
      mg("boca-abajo", "Indicar que duerma boca abajo para el ruido", "riesgoso", "Aumenta el riesgo de muerte súbita."),
      mg("cirugia", "Supraglotoplastia", "innecesario", "Solo en formas graves."),
    ],
  },
  debrief: {
    diagnosis: "Laringomalacia leve, en un lactante de 6 semanas con buen crecimiento.",
    pathologies: [
      { name: "Laringomalacia", role: "principal", why: "Colapso inspiratorio de estructuras supraglóticas." },
      { name: "Reflujo gastroesofágico", role: "asociada", why: "Frecuente y agravante." },
      { name: "Parálisis de cuerdas vocales, estenosis subglótica", role: "diferencial", why: "Otras causas de estridor en lactantes." },
    ],
    reasoning: [
      "Causa: inmadurez del cartílago y del tono neuromuscular supraglótico.",
      "Mecanismo: la presión negativa inspiratoria colapsa la epiglotis y los aritenoides.",
      "Consecuencia: estridor inspiratorio que empeora con el esfuerzo y mejora con el crecimiento.",
    ],
    epidemiology:
      "Es la causa más frecuente de estridor en lactantes: más del 60 % de los casos. Aparece en las primeras semanas, empeora hasta los 6–8 meses y se resuelve en la mayoría antes de los 2 años. Solo el 10 % tiene formas graves que requieren cirugía.",
    management: [
      "Diagnóstico clínico.",
      "Laringoscopía si hay dudas o gravedad.",
      "Controles de crecimiento.",
      "Cirugía solo en formas graves.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Estridor en el lactante.", "International Pediatric Otolaryngology Group — Consensus on laryngomalacia."],
    pearls: ["Estridor inspiratorio posicional.", "Si crece bien, esperar.", "Siempre a dormir boca arriba."],
    pitfalls: ["Hacerlo dormir boca abajo.", "No pesar en cada control."],
    tribunal: [
      qa("¿Qué signos indican laringomalacia grave?", "Apneas, cianosis, dificultad para alimentarse, falla de crecimiento, tiraje importante y cor pulmonale."),
      qa("¿Qué tipo de estridor da la laringomalacia?", "Inspiratorio, porque la lesión es supraglótica y colapsa con la presión negativa de la inspiración."),
      qa("¿Qué es la supraglotoplastia?", "La sección endoscópica de los repliegues aritenoepiglóticos para evitar el colapso en casos graves."),
    ],
  },
};
