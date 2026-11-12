import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerTesticulo: ClinicalCase = {
  id: "cancer-testiculo-seminoma",
  level: 2,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 27, ageUnit: "años", sex: "M", context: "Criptorquidia derecha operada de chico. Sin hijos, quiere tener." },
  frequency: "poco-frecuente",
  intro: "“Me noté el testículo derecho más grande y pesado. No duele. Me da vergüenza consultar.”",
  vitals: { TA: "118/74 mmHg", FC: "72 lpm", "T°": "36,4 °C" },
  anamnesis: [
    act("evolucion", "¿Desde cuándo? ¿Duele?", "clave", "“Dos meses, sin dolor.”", "Masa indolora."),
    act("criptorquidia", "¿Testículo no descendido de chico?", "clave", "“Sí, me operaron.”", "Factor de riesgo."),
    act("sistemico", "¿Dolor de espalda, tos, mamas agrandadas?", "clave", "“No.”", "Metástasis."),
    act("infeccion", "¿Ardor o secreción?", "util", "“No.”", "Orquiepididimitis."),
    act("fertilidad", "¿Querés tener hijos?", "util", "“Sí.”", "Banco de semen."),
    act("trabajo", "¿Qué hacés?", "neutro", "“Diseño gráfico.”", "No orienta."),
  ],
  exam: [
    act("testiculo", "Testículo", "clave", "Masa dura, indolora, que no se separa del testículo; transiluminación negativa.", "Sospecha de tumor."),
    act("abdomen", "Abdomen y ganglios", "clave", "Sin masas; sin ganglios supraclaviculares.", "Estadio."),
    act("mamas", "Mamas", "util", "Normales.", "Ginecomastia."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía escrotal", "clave", "Lesión sólida hipoecoica intratesticular.", "Confirma tumor."),
    study("Laboratorio", "marcadores", "Alfafetoproteína, beta-hCG y LDH antes de operar", "clave", "AFP normal; beta-hCG levemente alta; LDH alta.", "Pronóstico y seguimiento."),
    study("Imágenes", "tc", "TC de tórax, abdomen y pelvis", "clave", "Sin metástasis.", "Estadio I."),
    study("Otros", "biopsia-escrotal", "Biopsia transescrotal", "riesgoso", "No se realizó.", "Altera el drenaje linfático."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("seminoma", "Tumor testicular de células germinales (seminoma) estadio I", true, "Masa intratesticular indolora, AFP normal, criptorquidia y TC sin metástasis."),
      dx("orquitis", "Orquiepididimitis", false, "No duele ni hay infección."),
      dx("hidrocele", "Hidrocele", false, "Transiluminación negativa; sólido."),
      dx("varicocele", "Varicocele", false, "Es masa intratesticular."),
      dx("no-seminoma", "No seminomatoso", false, "AFP normal; la anatomía patológica lo define."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("orquiectomia", "Orquiectomía radical por vía inguinal", "clave", "Diagnóstico y tratamiento."),
      mg("semen", "Criopreservación de semen antes", "clave", "Fertilidad."),
      mg("seguimiento", "Vigilancia activa o tratamiento adyuvante según riesgo", "clave", "Estadio I."),
      mg("autoexamen", "Enseñar autoexamen del testículo restante", "util", "Riesgo contralateral."),
      mg("antibiotico", "Antibióticos y control en un mes", "riesgoso", "Demora."),
      mg("escrotal", "Abordaje por escroto", "riesgoso", "Riesgo de diseminación."),
    ],
  },
  debrief: {
    diagnosis: "Seminoma testicular derecho estadio I, en varón de 27 años con criptorquidia previa.",
    pathologies: [
      { name: "Tumor de células germinales", role: "principal", why: "Cáncer sólido más frecuente en varones jóvenes." },
      { name: "Criptorquidia", role: "asociada", why: "Factor de riesgo." },
      { name: "Orquitis, hidrocele, varicocele", role: "diferencial", why: "Otras masas escrotales." },
    ],
    reasoning: [
      "Causa: alteración de células germinales primordiales.",
      "Mecanismo: proliferación con diseminación linfática retroperitoneal.",
      "Consecuencia: masa indolora y metástasis ganglionares.",
    ],
    epidemiology:
      "Es el tumor sólido más frecuente en varones de 15 a 35 años. La criptorquidia multiplica el riesgo, incluso operada. Se cura en más del 95 % de los casos, aun avanzado. La vergüenza retrasa la consulta.",
    management: [
      "Ecografía.",
      "Marcadores.",
      "Orquiectomía inguinal.",
      "Fertilidad y seguimiento.",
    ],
    sources: ["Sociedad Argentina de Urología — Tumores de testículo.", "European Association of Urology — Testicular Cancer Guidelines."],
    pearls: ["Masa indolora: tumor hasta probar lo contrario.", "Vía inguinal.", "Banco de semen."],
    pitfalls: ["Tratar como orquitis.", "Biopsia escrotal."],
    tribunal: [
      qa("¿Qué marcadores eleva cada tipo?", "Seminoma: a veces beta-hCG, nunca AFP. No seminoma: AFP o beta-hCG elevadas."),
      qa("¿Por qué la vía inguinal?", "Para no alterar el drenaje linfático escrotal y evitar diseminación."),
      qa("¿A qué ganglios drena el testículo?", "A los retroperitoneales paraaórticos."),
    ],
  },
};
