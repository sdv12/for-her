import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const mordeduraPerroCaraNina: ClinicalCase = {
  id: "mordedura-perro-cara-nina",
  level: 2,
  area: "Pediatría",
  setting: "Guardia",
  patient: { age: 4, ageUnit: "años", sex: "F", context: "La mordió en la cara el perro de la abuela, mientras lo abrazaba. Hace 2 horas." },
  frequency: "frecuente",
  intro: "La mamá, llorando: “El perro la mordió en el cachete. Le sangra mucho.”",
  vitals: { FC: "128 lpm", FR: "26 rpm", "T°": "36,7 °C", Peso: "17 kg" },
  anamnesis: [
    act("perro", "¿El perro está vacunado contra la rabia y se puede observar?", "clave", "“Sí, vacunado este año, vive con la abuela.”", "Perro conocido, vacunado y observable."),
    act("circunstancia", "¿Cómo pasó?", "clave", "“Lo abrazó mientras comía.”", "Mordedura provocada: más tranquilizador."),
    act("vacunas", "¿Tiene las vacunas al día?", "clave", "“Sí.”", "Antitetánica."),
    act("ojos", "¿Le tocó el ojo?", "util", "“No.”", "Lesiones de párpado o vía lagrimal."),
    act("otros", "¿Tiene más mordeduras?", "util", "“No.”", "Examen completo."),
    act("nombre-perro", "¿Cómo se llama el perro?", "neutro", "“Toby.”", "No orienta."),
  ],
  exam: [
    act("herida", "Herida", "clave", "Laceración de 3 cm en la mejilla con colgajo, sin pérdida de tejido; dos punciones pequeñas.", "Herida facial."),
    act("facial", "Nervio facial y conducto parotídeo", "clave", "Movimientos faciales simétricos, sin salida de saliva por la herida.", "Estructuras indemnes."),
    act("ojo", "Ojo y párpados", "util", "Indemnes.", "Sin compromiso ocular."),
  ],
  studies: [
    study("Otros", "clinico", "Evaluación clínica de la herida", "clave", "Herida limpia de menos de 6 horas en la cara.", "Define el cierre."),
    study("Imágenes", "rx-craneo", "Radiografía de cráneo", "innecesario", "No se pidió.", "Sin sospecha de fractura."),
    study("Microbiología", "cultivo-herida", "Cultivo de una herida no infectada", "innecesario", "No se tomó.", "No predice infección."),
    study("Otros", "irrigacion", "Irrigación abundante a presión con solución fisiológica", "clave", "Realizada.", "La medida que más reduce la infección."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("mordedura-facial", "Mordedura de perro en la cara con laceración no complicada, perro vacunado y observable", true, "Laceración de mejilla sin compromiso del facial, conducto parotídeo ni ojo, perro conocido y vacunado."),
      dx("lesion-facial", "Lesión del nervio facial", false, "Movimientos simétricos."),
      dx("parotida", "Lesión del conducto de Stensen", false, "Sin salida de saliva."),
      dx("infectada", "Herida infectada", false, "Tiene 2 horas."),
      dx("maltrato", "Maltrato infantil", false, "El relato es coherente y hay un perro identificado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lavado", "Lavado con agua y jabón e irrigación abundante", "clave", "Prevención de infección y rabia."),
      mg("sutura", "Sutura primaria por ser en la cara (con cirugía plástica si es compleja)", "clave", "Cosmética; el riesgo de infección en la cara es bajo."),
      mg("amoxi-clav", "Amoxicilina-clavulánico profiláctico 3–5 días", "clave", "Mordedura en la cara."),
      mg("observar-perro", "Observar al perro 10 días y notificar", "clave", "Si sigue sano, no hay rabia."),
      mg("educar", "Educar sobre no abrazar perros mientras comen", "util", "Prevención."),
      mg("vacuna-rabia", "Vacuna antirrábica inmediata", "innecesario", "Perro vacunado y observable."),
      mg("dejar-abierta", "Dejar la herida facial abierta por segunda intención", "riesgoso", "Cicatriz peor sin beneficio en la cara."),
    ],
  },
  debrief: {
    diagnosis: "Mordedura de perro conocido y vacunado en la mejilla, con laceración no complicada, en una niña de 4 años.",
    pathologies: [
      { name: "Mordedura de perro en la cara", role: "principal", why: "Herida contaminada en zona de riesgo estético." },
      { name: "Riesgo de rabia", role: "asociada", why: "Se evalúa siempre." },
      { name: "Lesión de facial o conducto parotídeo", role: "diferencial", why: "Estructuras a revisar." },
    ],
    reasoning: [
      "Causa: perro de la familia, en una situación de amenaza para el animal.",
      "Mecanismo: herida por desgarro y punción con flora oral (Pasteurella, estreptococos, anaerobios).",
      "Consecuencia: riesgo de infección, cicatriz y, raramente, rabia.",
    ],
    epidemiology:
      "Los niños pequeños son las víctimas más frecuentes y la cara es el sitio más afectado por su altura. La mayoría de las mordeduras son de perros conocidos. En Argentina la rabia canina urbana está controlada, pero siempre se evalúa.",
    management: [
      "Lavado e irrigación.",
      "Sutura primaria en la cara.",
      "Antibiótico profiláctico en cara, manos o heridas profundas.",
      "Evaluación antirrábica y antitetánica.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía para la prevención y control de la rabia.", "Sociedad Argentina de Pediatría — Mordeduras de perro."],
    pearls: ["En la cara se sutura.", "Perro observable 10 días.", "Lavado: la mejor profilaxis."],
    pitfalls: ["Dejar abierta una herida facial.", "Vacunar siempre sin evaluar."],
    tribunal: [
      qa("¿Cuándo se indica antibiótico profiláctico en una mordedura?", "En heridas de cara, manos, genitales, punciones profundas, cerca de articulaciones, con edema o en inmunosuprimidos."),
      qa("¿Qué germen es típico de mordeduras de perro y gato?", "Pasteurella multocida; en esplenectomizados, Capnocytophaga canimorsus puede causar sepsis grave."),
      qa("¿Cuándo se vacuna contra la rabia tras una mordedura?", "Si el animal no puede observarse, desarrolla síntomas en los 10 días, es silvestre o la exposición es de alto riesgo."),
    ],
  },
};
