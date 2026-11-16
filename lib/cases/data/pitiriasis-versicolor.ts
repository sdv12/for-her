import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pitiriasisVersicolor: ClinicalCase = {
  id: "pitiriasis-versicolor",
  level: 1,
  area: "Dermatología",
  setting: "CAPS",
  patient: { age: 19, ageUnit: "años", sex: "M", context: "Albañil, trabaja al sol. Enero en Rosario, transpira mucho." },
  frequency: "muy-frecuente",
  intro: "“Me salieron manchas blancas en la espalda y el pecho. Se notan más ahora que estoy bronceado.”",
  vitals: { TA: "118/72 mmHg", FC: "70 lpm" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo y cómo empezaron?", "clave", "“Hace un mes, manchitas que se fueron juntando.”", "Lesiones confluentes."),
    act("prurito", "¿Pican?", "clave", "“Un poco cuando transpiro.”", "Prurito leve o ausente."),
    act("calor", "¿Empeoran en verano?", "clave", "“El año pasado también me pasó en verano.”", "Recurrencia con calor y humedad."),
    act("cremas", "¿Usa aceites o cremas en el cuerpo?", "util", "“Protector con aceite.”", "Los lípidos favorecen a Malassezia."),
    act("sensibilidad", "¿Las manchas tienen menos sensibilidad?", "clave", "“No, siento normal.”", "Descarta lepra."),
    act("equipo", "¿De qué cuadro es?", "neutro", "“De Central.”", "No orienta."),
  ],
  exam: [
    act("lesiones", "Inspección de tronco", "clave", "Máculas hipocrómicas redondeadas y confluentes en tronco y hombros.", "Típico."),
    act("besnier", "Rascado con la uña (signo de Besnier)", "clave", "Descama una escama fina furfurácea.", "Signo de la uñada."),
    act("wood", "Luz de Wood", "util", "Fluorescencia amarillo-verdosa.", "Apoya."),
  ],
  studies: [
    study("Microbiología", "koh", "Examen directo con KOH o cinta adhesiva", "clave", "Hifas cortas y levaduras en 'spaghetti con albóndigas'.", "Confirma Malassezia."),
    study("Microbiología", "cultivo", "Cultivo micológico", "innecesario", "No se pidió.", "Malassezia necesita medios especiales y el directo alcanza."),
    study("Otros", "biopsia", "Biopsia", "innecesario", "No se hizo.", "Sin dudas diagnósticas."),
    study("Laboratorio", "glucemia", "Glucemia", "util", "Normal.", "Razonable si es extenso o recurrente."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pv", "Pitiriasis versicolor (Malassezia)", true, "Máculas hipocrómicas furfuráceas confluentes en tronco, con Besnier positivo y KOH con hifas y levaduras."),
      dx("vitiligo", "Vitiligo", false, "Es acrómico, sin escama, y el KOH es negativo."),
      dx("pitiriasis-alba", "Pitiriasis alba", false, "Típica de la cara de niños atópicos."),
      dx("lepra", "Lepra indeterminada", false, "Sensibilidad conservada y KOH positivo."),
      dx("tina", "Tiña corporal", false, "Placas anulares con borde activo y dermatofitos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ketoconazol-shampoo", "Ketoconazol en shampoo sobre el cuerpo por 5 minutos, 5–7 días", "clave", "Tratamiento de elección en formas extensas."),
      mg("azol-crema", "Crema de azol en lesiones limitadas", "util", "Alternativa."),
      mg("explicar-color", "Explicar que el color tarda meses en volver", "clave", "Las manchas no son fracaso del tratamiento."),
      mg("prevencion", "Repetir el shampoo una vez al mes en verano", "util", "Previene recurrencias."),
      mg("itraconazol", "Itraconazol oral si es muy extenso o recurrente", "util", "Alternativa sistémica."),
      mg("ketoconazol-oral", "Ketoconazol oral", "riesgoso", "Hepatotóxico; desaconsejado."),
      mg("corticoide", "Crema con corticoide", "riesgoso", "Favorece la proliferación fúngica."),
    ],
  },
  debrief: {
    diagnosis: "Pitiriasis versicolor hipocrómica extensa, en un hombre de 19 años expuesto a calor y sudor.",
    pathologies: [
      { name: "Pitiriasis versicolor", role: "principal", why: "Micosis superficial por Malassezia." },
      { name: "Vitiligo", role: "diferencial", why: "Otra mancha blanca." },
      { name: "Lepra", role: "diferencial", why: "Mancha hipocrómica con alteración de la sensibilidad." },
    ],
    reasoning: [
      "Causa: Malassezia, levadura de la flora normal que pasa a forma micelial.",
      "Mecanismo: calor, humedad y sebo favorecen la proliferación; el ácido azelaico inhibe los melanocitos.",
      "Consecuencia: manchas hipo o hipercrómicas con escama fina y recurrencias.",
    ],
    epidemiology:
      "Es una de las micosis superficiales más frecuentes, sobre todo en adolescentes y adultos jóvenes en climas cálidos y húmedos. Recurre en hasta el 60 % el primer año y el 80 % a los dos años.",
    management: [
      "Signo de Besnier y KOH.",
      "Azoles tópicos o shampoo.",
      "Profilaxis en verano.",
    ],
    sources: ["Sociedad Argentina de Dermatología — Micosis superficiales.", "British Association of Dermatologists — Pityriasis versicolor."],
    pearls: ["Mancha que descama con la uña.", "Spaghetti con albóndigas.", "El color vuelve lento."],
    pitfalls: ["Ketoconazol oral.", "Confundir con vitiligo."],
    tribunal: [
      qa("¿Qué es el signo de Besnier?", "La descamación furfurácea que aparece al rascar la lesión con la uña, típica de la pitiriasis versicolor."),
      qa("¿Qué se ve en el examen directo?", "Hifas cortas y levaduras agrupadas, con imagen de spaghetti con albóndigas."),
      qa("¿Por qué quedan manchas después del tratamiento?", "Porque la repigmentación necesita meses de exposición solar aunque el hongo ya se haya eliminado."),
    ],
  },
};
