import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const artrosisCadera: ClinicalCase = {
  id: "artrosis-cadera",
  level: 1,
  area: "Reumatología",
  setting: "Consultorio",
  patient: { age: 70, ageUnit: "años", sex: "M", context: "Jubilado de la construcción. Hipertenso. Toma diclofenac por su cuenta." },
  frequency: "muy-frecuente",
  intro: "“Me duele la ingle derecha al caminar, me cuesta ponerme las medias y atarme los cordones.”",
  vitals: { TA: "148/88 mmHg", FC: "74 lpm", "T°": "36,4 °C", Peso: "86 kg" },
  anamnesis: [
    act("dolor", "¿Dónde y cuándo duele?", "clave", "“En la ingle, al caminar, mejora con reposo.”", "Dolor mecánico de cadera."),
    act("rigidez", "¿Rigidez a la mañana?", "clave", "“Menos de media hora.”", "No inflamatoria."),
    act("funcion", "¿Qué no puede hacer?", "clave", "“Ponerme medias y subir al colectivo.”", "Limitación de la rotación."),
    act("aines", "¿Qué toma?", "util", "“Diclofenac todos los días.”", "Riesgo renal y CV."),
    act("noche", "¿Dolor nocturno o fiebre?", "util", "“No.”", "Alarma."),
    act("nietos", "¿Qué le gusta hacer?", "neutro", "“Pescar.”", "No orienta."),
  ],
  exam: [
    act("rotacion", "Rotación interna de cadera", "clave", "Limitada y dolorosa a derecha.", "Signo clave de artrosis de cadera."),
    act("marcha", "Marcha", "clave", "Claudicación antiálgica.", "Repercusión."),
    act("columna", "Columna lumbar", "util", "Sin dolor radicular.", "Excluye origen lumbar."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de pelvis frente", "clave", "Pinzamiento superolateral, osteofitos y esclerosis subcondral derecha.", "Artrosis."),
    study("Laboratorio", "renal", "Función renal", "util", "Creatinina 1,4.", "Efecto de AINE."),
    study("Laboratorio", "vsg", "VSG y PCR", "util", "Normales.", "No inflamatoria."),
    study("Imágenes", "rm", "RM de cadera de rutina", "innecesario", "No se realizó.", "La radiografía alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("coxartrosis", "Artrosis de cadera derecha (coxartrosis)", true, "Dolor inguinal mecánico, limitación de rotación interna y radiografía típica."),
      dx("lumbar", "Lumbociatalgia", false, "Dolor inguinal con rotación limitada."),
      dx("bursitis", "Bursitis trocantérea", false, "El dolor es inguinal, no lateral."),
      dx("necrosis", "Necrosis avascular", false, "Radiografía con artrosis."),
      dx("pmr", "Polimialgia reumática", false, "Reactantes normales y unilateral."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ejercicio", "Ejercicio de fortalecimiento y kinesiología", "clave", "Primera línea."),
      mg("peso", "Bajar de peso", "clave", "Reduce la carga."),
      mg("aines-revisar", "Suspender diclofenac diario; paracetamol o AINE tópico/intermitente", "clave", "Hipertenso y creatinina alta."),
      mg("protesis", "Evaluar prótesis si el dolor limita pese al tratamiento", "util", "Muy eficaz."),
      mg("reposo", "Reposo absoluto", "riesgoso", "Rigidez y atrofia."),
      mg("opioides-fuertes", "Opioides fuertes de entrada", "riesgoso", "Caídas y dependencia."),
    ],
  },
  debrief: {
    diagnosis: "Artrosis de cadera derecha con limitación funcional, en varón de 70 años con uso crónico de AINE.",
    pathologies: [
      { name: "Coxartrosis", role: "principal", why: "Degeneración del cartílago." },
      { name: "Uso crónico de AINE", role: "asociada", why: "Daño renal e hipertensión." },
      { name: "Lumbociatalgia, bursitis", role: "diferencial", why: "Otros dolores de cadera." },
    ],
    reasoning: [
      "Causa: edad, sobrecarga laboral y obesidad.",
      "Mecanismo: pérdida de cartílago con remodelación ósea.",
      "Consecuencia: dolor mecánico y pérdida de rotación.",
    ],
    epidemiology:
      "La artrosis de cadera es causa frecuente de dolor y discapacidad en mayores. El dolor es inguinal, no lateral. La prótesis tiene excelentes resultados en casos avanzados.",
    management: [
      "Clínica y radiografía.",
      "Ejercicio y peso.",
      "Analgesia segura.",
      "Prótesis.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Artrosis.", "OARSI — Guidelines for the Non-surgical Management of Osteoarthritis."],
    pearls: ["Dolor inguinal.", "Rotación interna limitada.", "Ojo con los AINE crónicos."],
    pitfalls: ["Reposo.", "AINE diarios en hipertenso."],
    tribunal: [
      qa("¿Por qué el dolor de cadera puede sentirse en la rodilla?", "Por inervación compartida del nervio obturador."),
      qa("¿Qué hallazgos radiológicos tiene la artrosis?", "Pinzamiento, osteofitos, esclerosis subcondral y geodas."),
      qa("¿Qué complicaciones tiene la prótesis?", "Infección, luxación, TVP y aflojamiento."),
    ],
  },
};
