import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const diverticulitisAbsceso: ClinicalCase = {
  id: "diverticulitis-complicada-absceso",
  level: 3,
  area: "Cirugía",
  setting: "Guardia",
  patient: { age: 52, ageUnit: "años", sex: "F", context: "Obesa. Tuvo un episodio de diverticulitis tratado en casa hace un año." },
  frequency: "frecuente",
  intro: "“Hace cinco días me duele abajo a la izquierda, tengo fiebre con escalofríos y me cuesta ir de cuerpo.”",
  vitals: { TA: "118/72 mmHg", FC: "108 lpm", FR: "20 rpm", "T°": "38,9 °C", "SatO₂": "97 %" },
  anamnesis: [
    act("dolor", "¿Dónde duele y cómo evolucionó?", "clave", "“Fosa izquierda, cada día peor.”", "Diverticulitis."),
    act("previo", "¿Le pasó antes?", "clave", "“Hace un año, me trataron con pastillas.”", "Recurrencia."),
    act("urinario", "¿Aire o materia fecal al orinar?", "clave", "“No.”", "Fístula colovesical."),
    act("sangre", "¿Sangre en la materia fecal?", "util", "“No.”", "Otras causas."),
    act("colonoscopia", "¿Se hizo colonoscopia?", "util", "“Nunca.”", "Descartar cáncer luego."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy niñera.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Dolor y defensa localizada en fosa ilíaca izquierda, masa palpable dolorosa, sin peritonitis generalizada.", "Plastrón o absceso."),
    act("tacto", "Tacto rectal", "clave", "Doloroso en el fondo de saco.", "Colección pélvica."),
    act("hemodinamia", "Perfusión", "util", "Conservada.", "Sin shock."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de abdomen y pelvis con contraste", "clave", "Diverticulitis sigmoidea con absceso pericólico de 5 cm, sin aire libre.", "Hinchey II."),
    study("Laboratorio", "lab", "Hemograma, PCR, función renal", "clave", "Leucocitos 19.000; PCR 22.", "Inflamación."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Pendientes.", "Sepsis."),
    study("Otros", "colonoscopia-aguda", "Colonoscopia en la fase aguda", "riesgoso", "No se realizó.", "Riesgo de perforación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hinchey-ii", "Diverticulitis aguda complicada con absceso pericólico (Hinchey II)", true, "Dolor en fosa izquierda, fiebre, masa y absceso de 5 cm en la TC."),
      dx("no-complicada", "Diverticulitis no complicada", false, "Hay absceso."),
      dx("peritonitis", "Peritonitis purulenta (Hinchey III)", false, "Sin peritonitis generalizada ni aire libre."),
      dx("cancer", "Cáncer de colon perforado", false, "Hay que descartarlo luego, la TC muestra diverticulitis."),
      dx("ovario", "Absceso tuboovárico", false, "Origen colónico en la TC."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("drenaje", "Drenaje percutáneo guiado por imágenes", "clave", "Absceso mayor de 4 cm."),
      mg("atb", "Antibióticos EV para gramnegativos y anaerobios", "clave", "Infección."),
      mg("colonoscopia-diferida", "Colonoscopia a las 6 a 8 semanas", "clave", "Descartar cáncer."),
      mg("cirugia-electiva", "Evaluar cirugía electiva según recurrencias", "util", "Episodios complicados."),
      mg("ambulatorio", "Tratamiento ambulatorio con antibiótico oral", "riesgoso", "Absceso y fiebre alta."),
      mg("hartmann-urgente", "Cirugía de Hartmann de urgencia sin intentar drenaje", "riesgoso", "Morbilidad innecesaria en Hinchey II estable."),
    ],
  },
  debrief: {
    diagnosis: "Diverticulitis aguda sigmoidea complicada con absceso pericólico (Hinchey II), en mujer de 52 años.",
    pathologies: [
      { name: "Diverticulitis complicada", role: "principal", why: "Absceso pericólico." },
      { name: "Obesidad", role: "asociada", why: "Factor de riesgo." },
      { name: "Cáncer de colon, absceso tuboovárico", role: "diferencial", why: "Otras masas inflamatorias." },
    ],
    reasoning: [
      "Causa: microperforación de un divertículo sigmoideo.",
      "Mecanismo: inflamación pericólica que se contiene formando un absceso.",
      "Consecuencia: fiebre, masa y riesgo de peritonitis si se rompe.",
    ],
    epidemiology:
      "La diverticulosis aumenta con la edad y con dietas pobres en fibra. Una parte de las diverticulitis se complica con absceso, fístula o perforación. Los abscesos grandes se drenan por vía percutánea.",
    management: [
      "TC.",
      "Hinchey.",
      "Drenaje y antibiótico.",
      "Colonoscopia diferida.",
    ],
    sources: ["Sociedad Argentina de Coloproctología — Enfermedad diverticular.", "ASCRS — Clinical Practice Guidelines for Left-sided Colonic Diverticulitis."],
    pearls: ["Absceso mayor de 4 cm: drenar.", "Colonoscopia después.", "Hinchey guía la conducta."],
    pitfalls: ["Colonoscopia en agudo.", "Manejo ambulatorio con absceso."],
    tribunal: [
      qa("¿Qué es la clasificación de Hinchey?", "I: absceso pericólico; II: absceso pélvico o a distancia; III: peritonitis purulenta; IV: fecaloidea."),
      qa("¿Por qué colonoscopia diferida?", "Para descartar un cáncer que puede simular una diverticulitis."),
      qa("¿Cuál es la fístula más frecuente?", "La colovesical, con neumaturia y fecaluria."),
    ],
  },
};
