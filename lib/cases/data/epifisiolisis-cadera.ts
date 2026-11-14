import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const epifisiolisisCadera: ClinicalCase = {
  id: "epifisiolisis-femoral-proximal",
  level: 3,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 13, ageUnit: "años", sex: "M", context: "Obesidad (IMC 31). Hace un mes le duele la rodilla izquierda." },
  frequency: "poco-frecuente",
  intro: "“Hace un mes me duele la rodilla izquierda y renqueo. Hoy me resbalé y no puedo apoyar.”",
  vitals: { TA: "122/76 mmHg", FC: "96 lpm", "T°": "36,6 °C", Peso: "78 kg" },
  anamnesis: [
    act("evolucion", "¿Cuánto hace que te duele?", "clave", "“Un mes, la rodilla.”", "Dolor referido de cadera."),
    act("apoyo", "¿Podés apoyar ahora?", "clave", "“No.”", "Epifisiólisis inestable."),
    act("endocrino", "¿Problemas de tiroides o retraso en el desarrollo?", "clave", "“No.”", "Causas endocrinas."),
    act("otra-cadera", "¿Te duele la otra pierna?", "util", "“Un poco.”", "Bilateralidad."),
    act("fiebre", "¿Fiebre?", "util", "“No.”", "Infección."),
    act("juego", "¿Qué te gusta?", "neutro", "“Los videojuegos.”", "No orienta."),
  ],
  exam: [
    act("posicion", "Posición del miembro", "clave", "Rotación externa y acortamiento.", "Desplazamiento epifisario."),
    act("drehmann", "Signo de Drehmann", "clave", "Al flexionar la cadera rota hacia afuera.", "Típico."),
    act("rodilla", "Rodilla", "util", "Normal.", "Dolor referido."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de ambas caderas frente y perfil (rana con cuidado)", "clave", "Desplazamiento posterior de la epífisis izquierda; línea de Klein no corta la epífisis.", "Epifisiólisis."),
    study("Laboratorio", "tsh", "TSH", "util", "Normal.", "Causa endocrina."),
    study("Imágenes", "rx-contralateral", "Evaluar la cadera derecha", "util", "Sin desplazamiento.", "Bilateralidad."),
    study("Otros", "kinesio", "Kinesiología y apoyo", "riesgoso", "No se indicó.", "Aumenta el desplazamiento y la necrosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("epifisiolisis", "Epifisiólisis femoral proximal izquierda inestable", true, "Adolescente obeso, dolor de rodilla previo, rotación externa, Drehmann y desplazamiento epifisario sin poder apoyar."),
      dx("perthes", "Perthes", false, "Edad y radiografía distintas."),
      dx("esguince-rodilla", "Esguince de rodilla", false, "La rodilla es normal."),
      dx("fractura-cuello", "Fractura del cuello femoral", false, "El desplazamiento es en la fisis."),
      dx("artritis", "Artritis séptica", false, "Sin fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("no-apoyo", "No apoyar, silla de ruedas o camilla", "clave", "Evita más desplazamiento."),
      mg("fijacion", "Fijación quirúrgica in situ urgente", "clave", "Estabiliza la epífisis."),
      mg("contralateral", "Vigilar o fijar la otra cadera", "clave", "Riesgo bilateral."),
      mg("peso", "Abordar la obesidad", "util", "Factor de riesgo."),
      mg("reduccion-forzada", "Reducción forzada manual", "riesgoso", "Necrosis avascular."),
      mg("alta-muletas", "Alta con muletas y control en un mes", "riesgoso", "Progresión."),
    ],
  },
  debrief: {
    diagnosis: "Epifisiólisis femoral proximal izquierda inestable, en adolescente obeso de 13 años.",
    pathologies: [
      { name: "Epifisiólisis femoral proximal", role: "principal", why: "Deslizamiento de la epífisis." },
      { name: "Obesidad", role: "asociada", why: "Factor de riesgo principal." },
      { name: "Perthes, esguince", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: sobrecarga mecánica sobre una fisis debilitada en el estirón.",
      "Mecanismo: la epífisis se desliza posterior e inferiormente.",
      "Consecuencia: cojera, rotación externa y riesgo de necrosis avascular.",
    ],
    epidemiology:
      "Es el trastorno de cadera más frecuente en adolescentes, sobre todo varones obesos de 10 a 16 años. Hasta un tercio es bilateral. El dolor de rodilla retrasa el diagnóstico.",
    management: [
      "Radiografía de ambas caderas.",
      "No apoyar.",
      "Fijación urgente.",
      "Otra cadera.",
    ],
    sources: ["Sociedad Argentina de Ortopedia y Traumatología Infantil — Epifisiólisis.", "AAOS — Slipped Capital Femoral Epiphysis."],
    pearls: ["Adolescente obeso con dolor de rodilla.", "Drehmann.", "Línea de Klein."],
    pitfalls: ["Radiografiar solo la rodilla.", "Dejarlo apoyar."],
    tribunal: [
      qa("¿Qué es la línea de Klein?", "Línea por el borde superior del cuello femoral que normalmente corta la epífisis."),
      qa("¿Qué diferencia hay entre estable e inestable?", "La inestable impide apoyar aun con muletas y tiene más riesgo de necrosis."),
      qa("¿Qué causas endocrinas se asocian?", "Hipotiroidismo, déficit de hormona de crecimiento e hipogonadismo."),
    ],
  },
};
