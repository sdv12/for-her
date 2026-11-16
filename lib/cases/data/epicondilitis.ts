import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epicondilitis: ClinicalCase = {
  id: "epicondilitis",
  level: 1,
  area: "Traumatología",
  setting: "Consultorio",
  patient: { age: 45, ageUnit: "años", sex: "M", context: "Pintor de obra. Diestro. Empezó a jugar al pádel hace 3 meses." },
  frequency: "muy-frecuente",
  intro: "“Me duele el codo por afuera cuando agarro el rodillo o la paleta. No puedo ni levantar la pava.”",
  vitals: { TA: "126/80 mmHg", FC: "72 lpm" },
  anamnesis: [
    act("ubicacion", "¿Dónde duele exactamente?", "clave", "“Acá, en el huesito de afuera del codo derecho.”", "Epicóndilo lateral."),
    act("actividad", "¿Qué movimientos lo empeoran?", "clave", "“Agarrar con fuerza, estirar la muñeca, pintar techos.”", "Sobrecarga de extensores."),
    act("trauma", "¿Se golpeó?", "clave", "“No.”", "Descarta fractura."),
    act("hormigueo", "¿Hormigueo en los dedos o dolor de cuello?", "clave", "“No.”", "Descarta radiculopatía C6 y atrapamiento del radial."),
    act("tiempo", "¿Hace cuánto?", "util", "“Dos meses.”", "Subagudo."),
    act("pala", "¿Qué paleta usa?", "neutro", "“Una prestada.”", "Poco relevante, aunque una paleta pesada suma."),
  ],
  exam: [
    act("palpacion", "Palpación del epicóndilo", "clave", "Dolor 1 cm distal al epicóndilo lateral.", "Origen del extensor radial corto."),
    act("cozen", "Maniobra de Cozen (extensión resistida de la muñeca)", "clave", "Reproduce el dolor.", "Positiva."),
    act("movilidad", "Movilidad del codo", "util", "Completa, sin derrame.", "Sin artropatía."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Dolor en el epicóndilo con Cozen positivo.", "No requiere estudios."),
    study("Imágenes", "eco", "Ecografía si no mejora a los 3 meses", "util", "Engrosamiento hipoecoico del tendón común.", "Confirma tendinopatía."),
    study("Imágenes", "rmn", "Resonancia de entrada", "innecesario", "No se pidió.", "Cara y sin cambio de conducta."),
    study("Electrofisiología", "emg", "Electromiograma", "innecesario", "No se pidió.", "Sin síntomas neurológicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epicondilitis", "Epicondilitis lateral (codo de tenista)", true, "Dolor en el epicóndilo lateral por sobrecarga, con Cozen positivo y sin alteraciones neurológicas."),
      dx("epitrocleitis", "Epitrocleítis", false, "Duele del lado interno."),
      dx("radial", "Síndrome del túnel radial", false, "El dolor es más distal y en el supinador."),
      dx("artrosis", "Artrosis de codo", false, "Movilidad completa."),
      dx("radiculopatia", "Radiculopatía C6", false, "Sin dolor cervical ni parestesias."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reducir", "Modificar la actividad que lo provoca, sin reposo absoluto", "clave", "Reduce la sobrecarga."),
      mg("excentricos", "Ejercicios excéntricos de extensores con kinesiología", "clave", "Mejor evidencia a mediano plazo."),
      mg("brazalete", "Brazalete epicondíleo", "util", "Alivio sintomático."),
      mg("aines", "AINE tópico por pocos días", "util", "Dolor."),
      mg("explicar", "Explicar que mejora en 6–12 meses en la mayoría", "clave", "Expectativa."),
      mg("infiltraciones", "Infiltraciones repetidas con corticoide", "riesgoso", "Mejoran a corto plazo pero empeoran a largo y debilitan el tendón."),
      mg("cirugia", "Cirugía de entrada", "innecesario", "Solo si falla un año de tratamiento."),
    ],
  },
  debrief: {
    diagnosis: "Epicondilitis lateral derecha por sobrecarga laboral y deportiva, en un hombre de 45 años.",
    pathologies: [
      { name: "Epicondilitis lateral", role: "principal", why: "Tendinopatía del extensor radial corto del carpo." },
      { name: "Sobrecarga laboral", role: "asociada", why: "Prensión repetida." },
      { name: "Túnel radial, radiculopatía C6", role: "diferencial", why: "Dolor lateral del codo." },
    ],
    reasoning: [
      "Causa: movimientos repetidos de extensión de muñeca y prensión.",
      "Mecanismo: microdesgarros con degeneración tendinosa más que inflamación.",
      "Consecuencia: dolor al agarrar y extender la muñeca.",
    ],
    epidemiology:
      "Afecta al 1–3 % de los adultos, con pico entre los 40 y 50 años, en el brazo dominante. Es más frecuente en trabajadores manuales que en tenistas. La mayoría mejora en un año con tratamiento conservador.",
    management: [
      "Diagnóstico clínico.",
      "Modificar la carga.",
      "Excéntricos.",
      "Evitar infiltraciones repetidas.",
    ],
    sources: ["Sociedad Argentina de Ortopedia y Traumatología — Patología del codo.", "Coombes BK et al. — Management of lateral elbow tendinopathy (BMJ)."],
    pearls: ["Dolor lateral al agarrar.", "Cozen positivo.", "Es tendinosis: excéntricos."],
    pitfalls: ["Infiltrar seguido.", "Resonancia de entrada."],
    tribunal: [
      qa("¿Qué tendón se afecta en la epicondilitis lateral?", "El extensor radial corto del carpo en su origen en el epicóndilo lateral."),
      qa("¿Qué es la maniobra de Cozen?", "Extensión resistida de la muñeca con el codo extendido y el antebrazo en pronación, que reproduce el dolor epicondíleo."),
      qa("¿Por qué no se recomiendan las infiltraciones repetidas?", "Porque alivian a corto plazo, pero empeoran los resultados al año y aumentan las recurrencias."),
    ],
  },
};
