import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const paralisisBellEmbarazada: ClinicalCase = {
  id: "paralisis-bell-embarazada",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Embarazo de 34 semanas. Presión normal en los controles." },
  frequency: "frecuente",
  intro: "“Me levanté con la cara torcida del lado derecho, no puedo cerrar el ojo y se me cae el mate de la boca.”",
  vitals: { TA: "124/78 mmHg", FC: "88 lpm", "T°": "36,6 °C" },
  anamnesis: [
    act("inicio", "¿Cómo empezó?", "clave", "“Al despertar, con dolor detrás de la oreja.”", "Instalación aguda."),
    act("otros", "¿Debilidad en brazo o pierna, visión doble, dificultad para hablar?", "clave", "“No.”", "Descartar ACV."),
    act("presion", "¿Dolor de cabeza fuerte, visión borrosa?", "clave", "“No.”", "Preeclampsia."),
    act("oido", "¿Ampollas en el oído o pérdida de audición?", "util", "“No.”", "Ramsay Hunt."),
    act("gusto", "¿Cambió el gusto?", "util", "“La comida sabe raro.”", "Cuerda del tímpano."),
    act("nombre", "¿Cómo va a llamarse el bebé?", "neutro", "“Lucas.”", "No orienta."),
  ],
  exam: [
    act("facial", "Pares craneales", "clave", "Parálisis facial periférica derecha completa incluida la frente.", "Periférica."),
    act("oido-ex", "Oído", "clave", "Sin vesículas.", "No es Ramsay Hunt."),
    act("neuro", "Resto del examen", "util", "Normal; TA normal; sin proteinuria.", "Sin otro foco."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Típico.", "No requiere imágenes."),
    study("Laboratorio", "proteinuria", "Proteinuria y glucemia", "clave", "Normales.", "Descartar preeclampsia y diabetes."),
    study("Laboratorio", "lyme", "Serología para Lyme", "innecesario", "No se realizó.", "No endémico en Argentina."),
    study("Imágenes", "tc", "TC de cerebro de rutina", "innecesario", "No se realizó.", "Periférica típica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bell", "Parálisis de Bell en el tercer trimestre del embarazo", true, "Parálisis facial periférica aguda que incluye la frente, sin vesículas ni otros signos, en embarazada."),
      dx("acv", "ACV", false, "Compromete la frente: periférica."),
      dx("ramsay", "Síndrome de Ramsay Hunt", false, "Sin vesículas ni hipoacusia."),
      dx("preeclampsia", "Preeclampsia con compromiso neurológico", false, "TA y proteinuria normales."),
      dx("tumor", "Tumor del ángulo pontocerebeloso", false, "Inicio agudo sin otros pares."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoides", "Prednisona por 10 días dentro de las 72 horas", "clave", "Mejora la recuperación, segura en el embarazo."),
      mg("ojo", "Protección ocular: lágrimas, gel y oclusión nocturna", "clave", "Evitar úlcera corneal."),
      mg("controles", "Control de presión y glucemia con el corticoide", "clave", "Riesgo de preeclampsia y diabetes."),
      mg("tranquilizar", "Explicar que la mayoría se recupera", "util", "Ansiedad."),
      mg("sin-tratar", "No dar corticoides por estar embarazada", "riesgoso", "Peor recuperación."),
      mg("cesarea", "Indicar cesárea por la parálisis", "riesgoso", "No es indicación."),
    ],
  },
  debrief: {
    diagnosis: "Parálisis de Bell derecha en embarazada de 34 semanas.",
    pathologies: [
      { name: "Parálisis de Bell", role: "principal", why: "Neuropatía facial idiopática." },
      { name: "Embarazo del tercer trimestre", role: "asociada", why: "Factor de riesgo." },
      { name: "ACV, Ramsay Hunt", role: "diferencial", why: "Otras parálisis faciales." },
    ],
    reasoning: [
      "Causa: probablemente reactivación viral con inflamación del nervio.",
      "Mecanismo: edema del nervio facial en el canal óseo.",
      "Consecuencia: parálisis de toda la hemicara.",
    ],
    epidemiology:
      "El embarazo, sobre todo el tercer trimestre y el puerperio, triplica el riesgo de parálisis de Bell. Se asocia con más frecuencia a preeclampsia, por eso se controla la presión. La mayoría se recupera en meses.",
    management: [
      "Central o periférica.",
      "Prednisona.",
      "Proteger el ojo.",
      "Presión y glucemia.",
    ],
    sources: ["Sociedad Neurológica Argentina — Parálisis facial periférica.", "AAO-HNS — Clinical Practice Guideline: Bell's Palsy."],
    pearls: ["Frente comprometida: periférica.", "Corticoides también en el embarazo.", "Controlá la presión."],
    pitfalls: ["No tratar.", "No proteger el ojo."],
    tribunal: [
      qa("¿Qué escala gradúa la parálisis facial?", "La escala de House-Brackmann."),
      qa("¿Qué asociación tiene con el embarazo?", "Mayor riesgo en el tercer trimestre y relación con preeclampsia."),
      qa("¿Cuándo se agrega antiviral?", "En casos graves, junto al corticoide, con beneficio discutido."),
    ],
  },
};
