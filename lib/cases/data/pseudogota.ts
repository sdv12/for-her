import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pseudogota: ClinicalCase = {
  id: "pseudogota",
  level: 2,
  area: "Reumatología",
  setting: "Internación",
  patient: { age: 81, ageUnit: "años", sex: "F", context: "Internada hace 4 días por neumonía. Hipertensa. Artrosis de rodillas." },
  frequency: "frecuente",
  intro: "La enfermera: “La paciente de la 8 tiene la rodilla derecha hinchada, caliente y volvió a levantar fiebre.”",
  vitals: { TA: "134/76 mmHg", FC: "94 lpm", "T°": "38 °C" },
  anamnesis: [
    act("inicio", "¿Cuándo empezó la rodilla?", "clave", "“Anoche, de golpe, no la puedo mover.”", "Monoartritis aguda."),
    act("previos", "¿Le pasó antes?", "util", "“Hace dos años la otra, después de una operación.”", "Recurrente, gatillada por estrés agudo."),
    act("trauma", "¿Se golpeó o le pusieron algo en la rodilla?", "clave", "“No.”", "Descarta trauma y artritis séptica por infiltración."),
    act("diureticos", "¿Toma diuréticos?", "util", "“Hidroclorotiazida.”", "Sería más gota, pero no descarta."),
    act("hiperpara", "¿Problemas de tiroides, calcio o hierro?", "util", "“Me dijeron que tenía el calcio un poco alto.”", "Hiperparatiroidismo y hemocromatosis predisponen a pseudogota."),
    act("comida", "¿Qué le dan de comer?", "neutro", "“Dieta blanda.”", "No orienta."),
  ],
  exam: [
    act("rodilla", "Rodilla derecha", "clave", "Derrame a tensión, calor, eritema y dolor a la movilización.", "Monoartritis aguda."),
    act("otras", "Otras articulaciones", "util", "Crepitación en ambas rodillas, muñecas sin sinovitis.", "Artrosis."),
    act("pulmon", "Pulmones", "util", "Crepitantes en base izquierda en mejoría.", "Neumonía en tratamiento."),
  ],
  studies: [
    study("Otros", "artrocentesis", "Artrocentesis con recuento, Gram, cultivo y cristales", "clave", "Líquido inflamatorio de 22.000 células, Gram negativo, cristales romboidales con birrefringencia positiva débil.", "Pirofosfato de calcio. El cultivo se espera igual."),
    study("Imágenes", "rx", "Radiografía de rodillas y muñecas", "clave", "Condrocalcinosis en meniscos y en el ligamento triangular del carpo.", "Depósito de pirofosfato."),
    study("Laboratorio", "lab", "Calcio, fósforo, magnesio, PTH, ferritina", "util", "Calcio 10,8 mg/dl, PTH alta.", "Hiperparatiroidismo asociado."),
    study("Laboratorio", "acido-urico", "Ácido úrico para el diagnóstico", "innecesario", "No se pidió.", "El diagnóstico lo dan los cristales."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pseudogota", "Artritis aguda por cristales de pirofosfato de calcio (pseudogota)", true, "Monoartritis de rodilla en una adulta mayor internada, cristales romboidales de birrefringencia positiva y condrocalcinosis."),
      dx("septica", "Artritis séptica", false, "Gram negativo y cristales que explican el cuadro; igual se espera el cultivo."),
      dx("gota", "Gota", false, "Los urato son agujas de birrefringencia negativa."),
      dx("artrosis", "Artrosis descompensada", false, "Líquido inflamatorio con cristales."),
      dx("ar", "Artritis reumatoidea", false, "Monoartritis aguda sin poliartritis."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenar-infiltrar", "Drenaje del derrame e infiltración con corticoide si el cultivo es negativo", "clave", "Muy eficaz en una sola articulación."),
      mg("colchicina", "Colchicina en dosis bajas ajustada a la función renal", "util", "Alternativa."),
      mg("hielo", "Hielo y reposo relativo", "util", "Alivio."),
      mg("pth", "Estudiar y tratar el hiperparatiroidismo", "clave", "Causa asociada."),
      mg("aines-altos", "AINE en dosis altas", "riesgoso", "Riesgo renal y digestivo en una adulta mayor."),
      mg("alopurinol", "Alopurinol", "innecesario", "No sirve en pirofosfato."),
    ],
  },
  debrief: {
    diagnosis: "Artritis aguda por pirofosfato de calcio de rodilla derecha, con condrocalcinosis e hiperparatiroidismo, en una mujer de 81 años internada.",
    pathologies: [
      { name: "Pseudogota", role: "principal", why: "Inflamación por cristales de pirofosfato." },
      { name: "Hiperparatiroidismo primario", role: "asociada", why: "Favorece el depósito." },
      { name: "Artritis séptica", role: "diferencial", why: "Siempre a descartar con Gram y cultivo." },
    ],
    reasoning: [
      "Causa: depósito de pirofosfato de calcio en el cartílago con la edad.",
      "Mecanismo: liberación de cristales con el estrés agudo (internación, cirugía) que activan el inflamasoma.",
      "Consecuencia: monoartritis aguda similar a la gota o a una séptica.",
    ],
    epidemiology:
      "La condrocalcinosis aparece en el 10–15 % de los mayores de 65 y en más del 30 % de los mayores de 85. La pseudogota es la causa más frecuente de monoartritis aguda en adultos mayores internados. Antes de los 55 años obliga a buscar hiperparatiroidismo, hemocromatosis o hipomagnesemia.",
    management: [
      "Artrocentesis siempre.",
      "Drenaje e infiltración o colchicina.",
      "Buscar causas metabólicas.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Artropatías por cristales.", "EULAR — Recommendations for calcium pyrophosphate deposition."],
    pearls: ["Rodilla de un anciano internado.", "Romboidales, birrefringencia positiva.", "Condrocalcinosis en meniscos."],
    pitfalls: ["No punzar.", "AINE en dosis altas en ancianos."],
    tribunal: [
      qa("¿Cómo se diferencian los cristales de urato y de pirofosfato?", "Urato: agujas con birrefringencia negativa fuerte; pirofosfato: romboidales con birrefringencia positiva débil."),
      qa("¿Qué enfermedades se asocian a la condrocalcinosis en jóvenes?", "Hiperparatiroidismo, hemocromatosis, hipomagnesemia e hipofosfatasia."),
      qa("¿Por qué siempre hay que cultivar el líquido aunque haya cristales?", "Porque los cristales pueden coexistir con una artritis séptica."),
    ],
  },
};
