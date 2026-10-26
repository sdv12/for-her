import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const zoster: ClinicalCase = {
  id: "herpes-zoster",
  level: 1,
  area: "Dermatología",
  setting: "Consultorio",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Vive con su nieto de 8 meses." },
  frequency: "frecuente",
  intro: "“Hace cuatro días me empezó un ardor tremendo en el costado derecho, como si me quemara. Ayer me salieron unas ampollitas en la misma zona.”",
  vitals: { TA: "138/82 mmHg", FC: "82 lpm", "T°": "37,2 °C" },
  anamnesis: [
    act("dolor", "¿El dolor empezó antes que las ampollas?", "clave", "“Sí, dos días antes. Pensé que era del corazón o de la vesícula.”", "El dolor prodrómico urente en un dermatoma precede a las lesiones y puede confundir con causas cardíacas o abdominales."),
    act("inicio", "¿Cuándo salieron las ampollas exactamente?", "clave", "“Ayer a la tarde.”", "El antiviral es más útil si se inicia dentro de las 72 h de aparición de las lesiones."),
    act("ojo", "¿Tiene lesiones en la cara, la frente o la punta de la nariz? ¿Le molesta el ojo?", "clave", "“No, solo en el costado.”", "El zóster oftálmico (rama V1) puede afectar el ojo: requiere evaluación oftalmológica urgente."),
    act("inmuno", "¿Tiene alguna enfermedad o toma corticoides o tratamientos para el cáncer?", "clave", "“No, solo pastillas para la presión.”", "La inmunosupresión aumenta el riesgo de zóster diseminado y cambia el tratamiento."),
    act("varicela", "¿Tuvo varicela de chica?", "util", "“Sí, creo que sí.”", "El zóster es la reactivación del virus de la varicela."),
    act("contactos", "¿Convive con bebés, embarazadas o personas que no tuvieron varicela?", "clave", "“Con mi nieto de 8 meses.”", "Las lesiones con vesículas pueden contagiar varicela a quien no la tuvo ni está vacunado: hay que cubrirlas."),
    act("jardin", "¿Le gustan las plantas?", "neutro", "“Tengo muchas.”", "No orienta."),
  ],
  exam: [
    act("lesiones", "Inspección de las lesiones", "clave", "Vesículas agrupadas sobre base eritematosa, en banda, en el hemitórax derecho siguiendo el dermatoma T6, sin cruzar la línea media.", "Distribución unilateral y dermatomérica: patognomónica del herpes zóster."),
    act("diseminacion", "Buscar lesiones fuera del dermatoma", "util", "No hay.", "Más de 20 lesiones fuera del dermatoma indicarían zóster diseminado."),
    act("ocular", "Examen ocular y signo de Hutchinson", "util", "Ojos normales, sin lesiones en la punta de la nariz.", "Lesión en la punta de la nariz (nervio nasociliar) predice compromiso ocular."),
    act("cardio", "Auscultación cardíaca", "neutro", "Normal.", "No aporta, aunque el dolor previo hizo pensar en el corazón."),
  ],
  studies: [
    study("Microbiología", "pcr", "PCR para virus varicela zóster de una vesícula", "innecesario", "Positiva.", "El diagnóstico es clínico; se reserva para presentaciones atípicas o inmunocomprometidos."),
    study("Laboratorio", "lab", "Hemograma y función renal", "util", "Normales; creatinina 0,9.", "En adultos mayores ajusta la dosis del antiviral, que se elimina por riñón."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "innecesario", "Normal.", "Con las lesiones ya visibles, el dolor tiene explicación."),
    study("Otros", "tzanck", "Citodiagnóstico de Tzanck", "innecesario", "Células gigantes multinucleadas.", "No distingue herpes simple de zóster y está en desuso."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("zoster", "Herpes zóster torácico (T6 derecho)", true, "Dolor urente prodrómico seguido de vesículas agrupadas sobre base eritematosa en un dermatoma, unilateral, en una mujer de 72 años."),
      dx("simple", "Herpes simple recurrente", false, "Suele ser labial o genital, con dolor leve y recurrencias en el mismo lugar; no sigue un dermatoma torácico."),
      dx("contacto", "Dermatitis de contacto", false, "Pica más de lo que duele y sigue el lugar del contacto, no un dermatoma."),
      dx("impetigo", "Impétigo ampollar", false, "Ampollas que se rompen y dejan costras melicéricas, sin dolor neuropático ni distribución en banda."),
      dx("varicela", "Varicela", false, "Lesiones en distintos estadios en todo el cuerpo, con fiebre."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("antiviral", "Valaciclovir 1 g cada 8 h (o aciclovir 800 mg 5 veces por día) por 7 días", "clave", "Dentro de las 72 h y en mayores de 50 acelera la curación y reduce el dolor agudo."),
      mg("analgesia", "Analgesia adecuada (paracetamol, AINE con precaución; pregabalina o gabapentina si el dolor es neuropático intenso)", "clave", "El dolor es el síntoma principal y un buen control podría reducir el riesgo de neuralgia posherpética."),
      mg("cubrir", "Cubrir las lesiones y evitar el contacto del bebé con ellas hasta que estén en costra", "clave", "Previene la transmisión de varicela a personas susceptibles."),
      mg("vacuna", "Recomendar la vacuna contra el zóster después del episodio", "util", "La vacuna recombinante reduce recurrencias y neuralgia posherpética en mayores de 50."),
      mg("corticoide", "Prednisona oral de rutina", "innecesario", "No previene la neuralgia posherpética y suma efectos adversos en adultos mayores."),
      mg("aciclovir-crema", "Aciclovir en crema como único tratamiento", "innecesario", "No sirve para el zóster."),
    ],
  },
  debrief: {
    diagnosis: "Herpes zóster torácico T6 derecho, no complicado, en mujer de 72 años inmunocompetente, de menos de 72 h de evolución.",
    pathologies: [
      { name: "Herpes zóster", role: "principal", why: "Reactivación del VVZ en un dermatoma." },
      { name: "Neuralgia posherpética", role: "asociada", why: "Complicación más frecuente, sobre todo en mayores de 60." },
      { name: "Herpes simple", role: "diferencial", why: "Vesículas agrupadas, pero sin distribución dermatomérica torácica." },
      { name: "Dolor torácico cardíaco o biliar", role: "diferencial", why: "En la fase prodrómica." },
    ],
    reasoning: [
      "Causa: el virus varicela zóster queda latente en los ganglios sensitivos de la raíz dorsal después de la varicela.",
      "Mecanismo: con la edad (o la inmunosupresión) cae la inmunidad celular específica y el virus se reactiva, viajando por el nervio hasta la piel del dermatoma.",
      "Consecuencia: primero dolor neuropático urente (inflamación del ganglio y el nervio), después vesículas en banda unilateral. El daño del nervio puede dejar dolor persistente: neuralgia posherpética.",
      "Las vesículas contienen virus: una persona sin inmunidad puede contagiarse y desarrollar varicela (no zóster).",
    ],
    epidemiology:
      "Una de cada tres personas tendrá herpes zóster en la vida. La incidencia aumenta mucho después de los 50 años y es mayor en mujeres. Los dermatomas torácicos son los más afectados. La neuralgia posherpética aparece en hasta un 20 % de los mayores de 60. La inmunosupresión (VIH, cáncer, corticoides) aumenta el riesgo y la gravedad.",
    management: [
      "Diagnóstico clínico.",
      "Antiviral (valaciclovir, aciclovir o famciclovir) dentro de las 72 h, o después si aparecen lesiones nuevas, hay compromiso oftálmico o inmunosupresión.",
      "Analgesia escalonada y tratamiento del dolor neuropático.",
      "Zóster oftálmico: derivación urgente a oftalmología. Diseminado o inmunosuprimido: aciclovir endovenoso.",
      "Cubrir lesiones; vacunación contra zóster en mayores de 50 (vacuna recombinante).",
    ],
    sources: [
      "Sociedad Argentina de Dermatología — Consenso de herpes zóster.",
      "Sociedad Argentina de Infectología — Recomendaciones de vacunación en adultos (vacuna contra herpes zóster).",
    ],
    pearls: [
      "Dolor urente en banda unilateral en un adulto mayor: mirá la piel en los días siguientes.",
      "Antiviral dentro de las 72 h.",
      "Lesión en la punta de la nariz = riesgo ocular (signo de Hutchinson).",
    ],
    pitfalls: ["Usar aciclovir en crema.", "Olvidar el dolor.", "No advertir el riesgo de contagio de varicela a susceptibles."],
  },
};
