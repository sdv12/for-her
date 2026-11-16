import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const celulitisNino: ClinicalCase = {
  id: "celulitis-nino",
  level: 1,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 7, ageUnit: "años", sex: "M", context: "Enero. Lo picaron mosquitos y se rascó mucho la pierna. Vacunas completas." },
  frequency: "muy-frecuente",
  intro: "La mamá: “Tiene la pierna colorada, caliente y se queja al caminar. Ayer levantó 38.”",
  vitals: { FC: "104 lpm", FR: "22 rpm", "T°": "38,1 °C", Peso: "25 kg" },
  anamnesis: [
    act("puerta", "¿Cómo empezó?", "clave", "“De una picadura que se rascó hasta lastimarse.”", "Puerta de entrada."),
    act("evolucion", "¿Se agranda rápido?", "clave", "“Un poco desde ayer.”", "Velocidad de progresión."),
    act("dolor-desproporcionado", "¿El dolor es muy fuerte comparado con lo que se ve?", "clave", "“No, normal.”", "Descarta fascitis necrotizante."),
    act("previas", "¿Tuvo forúnculos antes o alguien en casa?", "util", "“El hermano tuvo un forúnculo.”", "Sospechar SAMR comunitario."),
    act("alergia", "¿Es alérgico a algún antibiótico?", "util", "“No.”", "Elección."),
    act("pileta", "¿Va a la pileta?", "neutro", "“A la colonia.”", "No orienta."),
  ],
  exam: [
    act("lesion", "Pierna", "clave", "Placa eritematosa caliente de 6 cm de bordes difusos en la pantorrilla, con excoriación; sin fluctuación.", "Celulitis sin absceso."),
    act("alarma", "Signos de alarma", "clave", "Sin ampollas, necrosis ni crepitación.", "No es necrotizante."),
    act("ganglios", "Ganglios inguinales", "util", "Adenopatía dolorosa.", "Reactiva."),
  ],
  studies: [
    study("Otros", "marcar", "Marcar los bordes con birome", "clave", "Marcado.", "Seguir la evolución."),
    study("Imágenes", "eco", "Ecografía de partes blandas", "util", "Edema subcutáneo, sin colección.", "Descarta absceso si hay dudas."),
    study("Laboratorio", "hemocultivo", "Hemocultivos", "innecesario", "No se pidieron.", "No indicados en celulitis leve."),
    study("Imágenes", "rmn", "Resonancia", "innecesario", "No se pidió.", "Sin sospecha de osteomielitis ni fascitis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("celulitis", "Celulitis no purulenta de pierna por rascado de picaduras", true, "Placa eritematosa caliente de bordes difusos con puerta de entrada, fiebre leve y sin colección."),
      dx("absceso", "Absceso", false, "Sin fluctuación ni colección."),
      dx("fascitis", "Fascitis necrotizante", false, "Sin dolor desproporcionado ni signos de necrosis."),
      dx("reaccion", "Reacción local a picaduras", false, "Fiebre, calor y progresión."),
      dx("osteomielitis", "Osteomielitis", false, "Compromiso cutáneo superficial."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cefalexina", "Cefalexina oral 5–7 días", "clave", "Cubre estreptococo y S. aureus sensible."),
      mg("tms-si", "Agregar TMS si hay sospecha de SAMR o no responde", "util", "Hermano con forúnculo."),
      mg("control", "Control en 48 horas", "clave", "Respuesta."),
      mg("elevar", "Elevar la pierna y cortar las uñas", "util", "Edema y rascado."),
      mg("repelente", "Repelente y tela mosquitera", "util", "Prevención."),
      mg("internar", "Internar para antibiótico endovenoso", "innecesario", "Buen estado y lesión limitada."),
      mg("corticoide", "Crema con corticoide", "riesgoso", "Puede empeorar la infección."),
    ],
  },
  debrief: {
    diagnosis: "Celulitis no purulenta de pierna por rascado de picaduras, en un niño de 7 años.",
    pathologies: [
      { name: "Celulitis", role: "principal", why: "Infección de dermis e hipodermis." },
      { name: "Picaduras con excoriación", role: "asociada", why: "Puerta de entrada." },
      { name: "Absceso, fascitis", role: "diferencial", why: "Cambian el tratamiento." },
    ],
    reasoning: [
      "Causa: estreptococo del grupo A o S. aureus.",
      "Mecanismo: ingresa por la piel lesionada.",
      "Consecuencia: infección que puede extenderse o abscedarse.",
    ],
    epidemiology:
      "Las infecciones de piel y partes blandas son muy frecuentes en niños en verano, por picaduras y rascado. En Argentina el SAMR de la comunidad es frecuente en infecciones purulentas.",
    management: [
      "Marcar bordes.",
      "Descartar absceso.",
      "Cefalexina; TMS si hay sospecha de SAMR.",
      "Control.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Infecciones de piel y partes blandas.", "IDSA — Practice guidelines for skin and soft tissue infections."],
    pearls: ["No purulenta: estreptococo.", "Purulenta: drenar y pensar SAMR.", "Marcá los bordes."],
    pitfalls: ["Internar sin necesidad.", "Corticoides tópicos."],
    tribunal: [
      qa("¿Qué diferencia hay entre erisipela y celulitis?", "La erisipela es más superficial, con bordes netos y sobreelevados; la celulitis es más profunda y de bordes difusos."),
      qa("¿Cuándo se sospecha SAMR comunitario?", "En infecciones purulentas, forúnculos recurrentes, contactos con forúnculos o falta de respuesta a cefalosporinas."),
      qa("¿Qué signos sugieren fascitis necrotizante?", "Dolor desproporcionado, ampollas hemorrágicas, necrosis, crepitación, anestesia cutánea y toxicidad sistémica."),
    ],
  },
};
