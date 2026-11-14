import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const sinovitisTransitoriaCadera: ClinicalCase = {
  id: "sinovitis-transitoria-cadera",
  level: 2,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 5, ageUnit: "años", sex: "M", context: "Hace 10 días tuvo un resfrío. Lo trae el papá." },
  frequency: "muy-frecuente",
  intro: "“Se levantó rengueando y dice que le duele la rodilla derecha. Ayer jugaba bien.”",
  vitals: { FC: "100 lpm", FR: "22 rpm", "T°": "37,3 °C", Peso: "19 kg" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“Al despertarse.”", "Inicio agudo."),
    act("fiebre", "¿Fiebre alta?", "clave", "“No, a lo sumo 37 y algo.”", "Criterios de Kocher."),
    act("virosis", "¿Estuvo enfermo hace poco?", "clave", "“Resfrío hace 10 días.”", "Postviral."),
    act("trauma", "¿Se golpeó?", "util", "“No vimos nada.”", "Fractura."),
    act("apoyo", "¿Puede apoyar la pierna?", "util", "“Sí, rengueando.”", "Kocher."),
    act("jardin", "¿Va al jardín?", "neutro", "“Sí, sala de 5.”", "No orienta."),
  ],
  exam: [
    act("cadera", "Movilidad de la cadera derecha", "clave", "Dolor a la rotación interna, posición en flexión y rotación externa.", "El dolor de rodilla puede venir de la cadera."),
    act("rodilla", "Rodilla", "clave", "Normal.", "Dolor referido."),
    act("general", "Estado general", "util", "Buen estado.", "Sin aspecto séptico."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, VSG y PCR", "clave", "Leucocitos 9.000; VSG 15; PCR 0,6.", "Kocher 0."),
    study("Imágenes", "eco", "Ecografía de cadera", "clave", "Derrame articular leve.", "Sinovitis."),
    study("Imágenes", "rx", "Radiografía de cadera", "util", "Normal.", "Excluye Perthes y fracturas."),
    study("Otros", "artrocentesis", "Artrocentesis de rutina", "innecesario", "No se realizó.", "Bajo riesgo de artritis séptica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("sinovitis", "Sinovitis transitoria de cadera", true, "Niño de 5 años con cojera postviral, buen estado, sin fiebre alta, laboratorio normal y derrame leve."),
      dx("artritis-septica", "Artritis séptica de cadera", false, "Kocher 0 y buen estado."),
      dx("perthes", "Enfermedad de Perthes", false, "Radiografía normal y cuadro agudo."),
      dx("fractura", "Fractura de los primeros pasos", false, "No hay dolor óseo ni trauma."),
      dx("leucemia", "Leucemia", false, "Hemograma normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("aines", "Ibuprofeno y reposo relativo", "clave", "Mejora en días."),
      mg("control", "Control en 24 a 48 horas", "clave", "Reevaluar."),
      mg("alarma", "Pautas: fiebre, no apoya o empeora", "clave", "Artritis séptica."),
      mg("seguimiento-rx", "Radiografía si persiste más de 2 semanas", "util", "Descartar Perthes."),
      mg("atb", "Antibióticos empíricos", "riesgoso", "Sin indicación y enmascaran."),
      mg("yeso", "Inmovilización con yeso", "riesgoso", "Innecesario."),
    ],
  },
  debrief: {
    diagnosis: "Sinovitis transitoria de cadera derecha postviral, en niño de 5 años.",
    pathologies: [
      { name: "Sinovitis transitoria", role: "principal", why: "Causa más frecuente de cojera aguda infantil." },
      { name: "Dolor referido a la rodilla", role: "asociada", why: "Trampa clínica." },
      { name: "Artritis séptica, Perthes", role: "diferencial", why: "Lo que no hay que perder." },
    ],
    reasoning: [
      "Causa: inflamación sinovial postviral.",
      "Mecanismo: derrame articular que causa dolor y cojera.",
      "Consecuencia: cuadro autolimitado en días.",
    ],
    epidemiology:
      "Es la causa más frecuente de dolor de cadera en niños de 3 a 10 años, más en varones. La clave es diferenciarla de la artritis séptica con los criterios de Kocher. El dolor de cadera puede sentirse en la rodilla.",
    management: [
      "Examinar la cadera.",
      "Kocher.",
      "AINE y control.",
      "Pautas.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Cojera en la infancia.", "Kocher MS et al. — Criteria for Septic Arthritis of the Hip in Children."],
    pearls: ["Dolor de rodilla: mirá la cadera.", "Kocher.", "Control a las 48 horas."],
    pitfalls: ["Antibióticos sin indicación.", "Perder una artritis séptica."],
    tribunal: [
      qa("¿Cuáles son los criterios de Kocher?", "Fiebre mayor de 38,5, no apoyar, VSG mayor de 40 y leucocitos mayores de 12.000."),
      qa("¿Qué probabilidad hay con 4 criterios?", "Más del 90 % de artritis séptica."),
      qa("¿Por qué duele la rodilla?", "Por dolor referido del nervio obturador."),
    ],
  },
};
