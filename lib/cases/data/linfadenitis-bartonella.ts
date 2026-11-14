import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const linfadenitisBartonella: ClinicalCase = {
  id: "enfermedad-arano-gato",
  level: 2,
  area: "Infectología",
  setting: "Consultorio",
  patient: { age: 11, ageUnit: "años", sex: "M", context: "Adoptaron un gatito hace un mes. Lo arañó varias veces en el brazo derecho." },
  frequency: "frecuente",
  intro: "“Le salió un bulto en la axila derecha que le duele, hace dos semanas, y tuvo algo de fiebre.”",
  vitals: { FC: "90 lpm", "T°": "37,8 °C", Peso: "36 kg" },
  anamnesis: [
    act("gato", "¿Tiene gatos? ¿Lo arañaron o lamieron?", "clave", "“Un gatito nuevo que lo araña.”", "Bartonella henselae."),
    act("lesion", "¿Tuvo una lesión en el brazo antes del bulto?", "clave", "“Un granito en el brazo hace un mes.”", "Pápula de inoculación."),
    act("sistemicos", "¿Bajó de peso, sudores, fiebre prolongada?", "clave", "“Fiebre unos días, no bajó de peso.”", "Descartar linfoma."),
    act("vision", "¿Ve bien?", "util", "“Sí.”", "Neurorretinitis."),
    act("otros", "¿Otros bultos?", "util", "“No.”", "Localizado."),
    act("escuela", "¿Qué grado?", "neutro", "“Sexto.”", "No orienta."),
  ],
  exam: [
    act("ganglio", "Adenopatía", "clave", "Ganglio axilar derecho de 3 cm, doloroso, móvil, sin fluctuación.", "Linfadenitis regional."),
    act("piel", "Brazo", "clave", "Pápula costrosa en el antebrazo derecho.", "Inoculación."),
    act("bazo", "Hígado y bazo", "util", "Normales.", "Sin forma sistémica."),
  ],
  studies: [
    study("Laboratorio", "serologia", "Serología para Bartonella henselae", "clave", "IgG 1/512.", "Confirma."),
    study("Imágenes", "eco", "Ecografía del ganglio", "util", "Ganglio hipoecoico sin absceso.", "Descarta supuración."),
    study("Laboratorio", "hemograma", "Hemograma y VSG", "util", "Normales.", "Sin signos de linfoma."),
    study("Otros", "biopsia-excisional", "Biopsia excisional de entrada", "innecesario", "No se realizó.", "Cuadro típico con serología."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bartonella", "Enfermedad por arañazo de gato (Bartonella henselae)", true, "Arañazos de un gatito, pápula de inoculación, adenopatía regional y serología positiva."),
      dx("linfoma", "Linfoma", false, "Ganglio regional con puerta de entrada y serología."),
      dx("tbc-ganglionar", "Tuberculosis ganglionar", false, "Contacto con gato y serología."),
      dx("adenitis-estafilococica", "Adenitis bacteriana piógena", false, "Sin fluctuación ni celulitis."),
      dx("toxoplasmosis", "Toxoplasmosis ganglionar", false, "Serología de Bartonella."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("azitromicina", "Azitromicina por 5 días", "clave", "Acelera la reducción del ganglio."),
      mg("explicar", "Explicar que es benigna y puede durar semanas", "clave", "Tranquilidad."),
      mg("control", "Control clínico y reevaluar si crece o no mejora", "clave", "Excluir otras causas."),
      mg("gato", "No hace falta deshacerse del gato; lavar arañazos y control de pulgas", "util", "Prevención."),
      mg("drenaje-quirurgico", "Incisión y drenaje", "riesgoso", "Puede dejar fístula."),
      mg("sacrificar-gato", "Sacrificar al gato", "riesgoso", "Innecesario."),
    ],
  },
  debrief: {
    diagnosis: "Enfermedad por arañazo de gato (Bartonella henselae) con linfadenitis axilar, en niño de 11 años.",
    pathologies: [
      { name: "Enfermedad por arañazo de gato", role: "principal", why: "Zoonosis por Bartonella." },
      { name: "Linfadenitis regional", role: "asociada", why: "Manifestación típica." },
      { name: "Linfoma, TBC ganglionar", role: "diferencial", why: "Otras adenopatías." },
    ],
    reasoning: [
      "Causa: Bartonella henselae transmitida por gatos jóvenes con pulgas.",
      "Mecanismo: inoculación cutánea y respuesta granulomatosa en el ganglio regional.",
      "Consecuencia: adenopatía que dura semanas y rara vez formas sistémicas.",
    ],
    epidemiology:
      "Es una causa frecuente de adenopatía regional subaguda en niños. Los gatitos menores de un año son los principales transmisores. Neurorretinitis y compromiso hepatoesplénico son formas raras.",
    management: [
      "Preguntar por gatos.",
      "Serología.",
      "Azitromicina.",
      "Control evolutivo.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Adenopatías en pediatría.", "Red Book (AAP) — Bartonella henselae Infections."],
    pearls: ["Adenopatía más gatito.", "Buscá la pápula.", "Sin drenaje quirúrgico."],
    pitfalls: ["Biopsia apurada.", "Drenar."],
    tribunal: [
      qa("¿Qué es el síndrome oculoglandular de Parinaud?", "Conjuntivitis granulomatosa con adenopatía preauricular por inoculación ocular."),
      qa("¿Qué signos de alarma te harían biopsiar?", "Adenopatía que crece, supraclavicular, dura y fija, o síntomas B."),
      qa("¿Qué es la angiomatosis bacilar?", "Lesiones vasculares por Bartonella en inmunodeprimidos con VIH."),
    ],
  },
};
