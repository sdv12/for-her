import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const pancreatitisPostCpre: ClinicalCase = {
  id: "pancreatitis-post-cpre",
  level: 3,
  area: "Gastroenterología",
  setting: "Internación",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Le hicieron una CPRE ayer por coledocolitiasis; la canulación fue difícil. Recibió indometacina rectal." },
  frequency: "frecuente",
  intro: "La enfermera: “La paciente de la CPRE tiene un dolor fuerte en el estómago que va a la espalda y vomitó.”",
  vitals: { TA: "122/76 mmHg", FC: "106 lpm", FR: "20 rpm", "SatO₂": "96 %", "T°": "37,6 °C" },
  anamnesis: [
    act("dolor", "¿Cómo es el dolor?", "clave", "“En la boca del estómago, como un cinturón hacia la espalda.”", "Dolor pancreático."),
    act("inicio", "¿Cuándo empezó?", "clave", "“A las 4 horas del estudio.”", "Típico de pancreatitis post-CPRE."),
    act("procedimiento", "¿Cómo fue la CPRE?", "clave", "Canulación difícil, varias inyecciones de contraste en el Wirsung.", "Factores de riesgo."),
    act("fiebre", "¿Escalofríos o ictericia?", "util", "“No.”", "Colangitis."),
    act("perforacion", "¿Dolor en el hombro o en el cuello?", "util", "“No.”", "Perforación duodenal."),
    act("visita", "¿Quién la acompaña?", "neutro", "“Mi hermana.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor epigástrico, sin defensa generalizada.", "Pancreatitis sin peritonitis."),
    act("crepitacion", "Enfisema subcutáneo", "clave", "No hay.", "Descarta perforación retroperitoneal."),
    act("hidratacion", "Hidratación", "util", "Mucosas secas.", "Aporte."),
  ],
  studies: [
    study("Laboratorio", "lipasa", "Lipasa", "clave", "6 veces el valor normal.", "Más de 3 veces con dolor: pancreatitis."),
    study("Laboratorio", "lab", "Hemograma, urea, creatinina, calcio", "clave", "Hto 42 %, urea 32, calcio normal.", "Gravedad."),
    study("Imágenes", "rx-abdomen", "Radiografía de abdomen de pie", "util", "Sin neumoperitoneo ni aire retroperitoneal.", "Descarta perforación."),
    study("Imágenes", "tac-temprana", "TC con contraste en las primeras 24 horas", "innecesario", "No se pidió.", "Subestima la necrosis; se pide a las 72 horas si no mejora."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("pep", "Pancreatitis aguda post-CPRE leve", true, "Dolor pancreático a las horas de una CPRE difícil, lipasa mayor de 3 veces, sin falla orgánica ni perforación."),
      dx("perforacion", "Perforación duodenal", false, "Sin aire libre ni retroperitoneal."),
      dx("colangitis", "Colangitis", false, "Sin fiebre alta ni ictericia."),
      dx("hiperamilasemia", "Hiperamilasemia asintomática", false, "Hay dolor típico."),
      dx("sangrado", "Hemorragia post-esfinterotomía", false, "Sin anemia ni melena."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ringer", "Ringer lactato a ritmo moderado guiado por metas", "clave", "Hidratación."),
      mg("analgesia", "Analgesia con opioides", "clave", "Dolor."),
      mg("dieta", "Dieta oral precoz cuando tolere", "clave", "Mejora la evolución."),
      mg("control", "Control clínico y de laboratorio en 24–48 horas", "util", "Evolución."),
      mg("atb-profilactico", "Antibióticos profilácticos", "innecesario", "No previenen infección de necrosis."),
      mg("ayuno-prolongado", "Ayuno y sonda nasogástrica por días", "riesgoso", "Empeora la barrera intestinal."),
    ],
  },
  debrief: {
    diagnosis: "Pancreatitis aguda post-CPRE leve, en una mujer de 36 años tras una canulación difícil.",
    pathologies: [
      { name: "Pancreatitis post-CPRE", role: "principal", why: "Complicación más frecuente de la CPRE." },
      { name: "Coledocolitiasis", role: "asociada", why: "Indicación." },
      { name: "Perforación, colangitis, sangrado", role: "diferencial", why: "Otras complicaciones." },
    ],
    reasoning: [
      "Causa: trauma papilar, inyección de contraste en el Wirsung y edema.",
      "Mecanismo: obstrucción transitoria del drenaje pancreático y activación enzimática.",
      "Consecuencia: pancreatitis, casi siempre leve.",
    ],
    epidemiology:
      "Ocurre en el 3–10 % de las CPRE, y hasta en el 15 % en mujeres jóvenes con canulación difícil o sospecha de disfunción del esfínter. La indometacina rectal y el stent pancreático en alto riesgo la reducen.",
    management: [
      "Prevención: indicación precisa, indometacina rectal, stent pancreático.",
      "Hidratación, analgesia y dieta precoz.",
      "Imagen si no mejora.",
    ],
    sources: ["Sociedad Argentina de Gastroenterología — Complicaciones de la CPRE.", "ESGE — Prophylaxis of post-ERCP pancreatitis."],
    pearls: ["Mujer joven + canulación difícil.", "Indometacina rectal la previene.", "Comer temprano."],
    pitfalls: ["Antibióticos profilácticos.", "TC en las primeras horas."],
    tribunal: [
      qa("¿Qué factores aumentan el riesgo de pancreatitis post-CPRE?", "Sexo femenino, edad joven, canulación difícil, inyección del Wirsung, pancreatitis previa y sospecha de disfunción del esfínter de Oddi."),
      qa("¿Cómo se previene?", "Con indicaciones precisas, indometacina o diclofenac rectal, hidratación con Ringer y stent pancreático en alto riesgo."),
      qa("¿Qué criterios diagnostican pancreatitis aguda?", "Dos de tres: dolor típico, lipasa o amilasa mayor de 3 veces el normal e imagen compatible."),
    ],
  },
};
