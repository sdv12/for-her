import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const gotaMujer: ClinicalCase = {
  id: "gota-mujer-diuretico",
  level: 1,
  area: "Reumatología",
  setting: "Guardia",
  patient: { age: 71, ageUnit: "años", sex: "F", context: "Hipertensa con hidroclorotiazida, enfermedad renal leve. Tiene bultitos en los dedos hace años." },
  frequency: "frecuente",
  intro: "“Me desperté con la rodilla derecha hinchada, caliente y muy dolorida. No me puedo apoyar.”",
  vitals: { TA: "148/86 mmHg", FC: "88 lpm", "T°": "37,8 °C" },
  anamnesis: [
    act("farmacos", "¿Qué remedios toma? ¿Cambió alguno?", "clave", "“Hidroclorotiazida hace dos años para la presión.”", "Las tiazidas reducen la excreción de ácido úrico: causa frecuente de gota en mujeres mayores."),
    act("previos", "¿Tuvo episodios parecidos?", "clave", "“Sí, en el dedo gordo y el tobillo, más cortos.”", "Ataques previos de artritis aguda."),
    act("fiebre", "¿Tuvo escalofríos, una herida o una infección?", "clave", "“No.”", "La artritis séptica es el diferencial más importante."),
    act("renal", "¿Le dijeron algo de los riñones?", "util", "“Que funcionan un poco menos.”", "La enfermedad renal favorece la hiperuricemia y limita los fármacos."),
    act("alcohol", "¿Toma alcohol o gaseosas?", "util", "“Un vaso de gaseosa común por día.”", "La fructosa sube el ácido úrico."),
    act("tejido", "¿Qué teje?", "neutro", "“Bufandas para los nietos.”", "No orienta."),
  ],
  exam: [
    act("rodilla", "Examen de la rodilla", "clave", "Derrame, calor, eritema y dolor intenso a la movilización.", "Monoartritis aguda."),
    act("tofos", "Manos, orejas y codos", "clave", "Nódulos amarillentos en interfalángicas distales y pabellón auricular.", "Tofos: gota crónica tofácea (en mujeres suelen ubicarse sobre nódulos de artrosis)."),
    act("piel", "Buscar heridas o puerta de entrada", "util", "Sin lesiones.", "Baja el riesgo de artritis séptica."),
  ],
  studies: [
    study("Otros", "artrocentesis", "Artrocentesis con recuento celular, Gram, cultivo y cristales", "clave", "Líquido inflamatorio, 28.000 leucocitos, Gram negativo, cristales de urato con forma de aguja y birrefringencia negativa.", "Confirma gota y descarta infección."),
    study("Laboratorio", "lab", "Uricemia, creatinina, hemograma", "util", "Uricemia 9,2 mg/dl, filtrado 48.", "Hiperuricemia y función renal (la uricemia puede ser normal en la crisis)."),
    study("Imágenes", "rx", "Radiografía de rodilla y manos", "util", "Erosiones en sacabocado en manos.", "Gota crónica."),
    study("Imágenes", "rmn", "Resonancia de rodilla", "innecesario", "No se realizó.", "No aporta al diagnóstico."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gota", "Gota aguda de rodilla sobre gota crónica tofácea, asociada a tiazida y enfermedad renal", true, "Monoartritis aguda con cristales de urato en el líquido, tofos, uricemia alta, tiazida y filtrado reducido."),
      dx("septica", "Artritis séptica", false, "El Gram es negativo; se espera el cultivo, pero los cristales explican el cuadro."),
      dx("pseudogota", "Condrocalcinosis (pseudogota)", false, "Daría cristales romboidales de birrefringencia positiva."),
      dx("artrosis", "Artrosis de rodilla", false, "No da un líquido inflamatorio con 28.000 leucocitos."),
      dx("ar", "Artritis reumatoidea", false, "Es poliarticular, simétrica y sin cristales."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("corticoide", "Corticoide (oral o intraarticular) para la crisis", "clave", "Con enfermedad renal, los AINE y la colchicina en dosis altas tienen más riesgo."),
      mg("tiazida", "Cambiar la tiazida por otro antihipertensivo (losartán, que además baja el úrico)", "clave", "Elimina una causa."),
      mg("alopurinol", "Alopurinol en dosis baja ajustada a la función renal, con aumento gradual y meta de uricemia menor de 6 (menor de 5 con tofos)", "clave", "Gota tofácea: indicación de tratamiento hipouricemiante, con profilaxis de crisis."),
      mg("habitos", "Evitar gaseosas azucaradas y alcohol", "util", "Reducen la uricemia."),
      mg("aine-dosis-altas", "Indometacina en dosis altas por una semana", "riesgoso", "Riesgo de falla renal y sangrado en una mujer mayor con filtrado bajo."),
      mg("atb", "Antibióticos empíricos de amplio espectro", "innecesario", "Gram negativo con cristales: no hay infección."),
    ],
  },
  debrief: {
    diagnosis: "Crisis de gota en rodilla derecha sobre gota crónica tofácea, asociada a hidroclorotiazida y enfermedad renal crónica, en mujer de 71 años.",
    pathologies: [
      { name: "Gota aguda y crónica tofácea", role: "principal", why: "Cristales de urato con tofos." },
      { name: "Enfermedad renal crónica e hipertensión con tiazida", role: "asociada", why: "Causas de hiperuricemia." },
      { name: "Artritis séptica, pseudogota", role: "diferencial", why: "Otras monoartritis agudas." },
    ],
    reasoning: [
      "Causa: menor excreción renal de ácido úrico por tiazida y enfermedad renal.",
      "Mecanismo: el urato precipita en cristales en la articulación y activa el inflamasoma de los macrófagos (IL-1).",
      "Consecuencia: artritis aguda muy dolorosa; con años, tofos y daño articular.",
    ],
    epidemiology:
      "La gota es la artritis inflamatoria más frecuente en adultos y predomina en varones, pero después de la menopausia aumenta en mujeres, en quienes suele asociarse a diuréticos, enfermedad renal y obesidad, con presentaciones atípicas en rodilla o en manos con artrosis.",
    management: [
      "Artrocentesis ante una monoartritis aguda para descartar infección y ver cristales.",
      "Crisis: colchicina, AINE o corticoides según comorbilidades.",
      "Tratamiento hipouricemiante con meta de uricemia en tofos, crisis frecuentes o enfermedad renal.",
      "Revisar fármacos que suben el úrico.",
    ],
    sources: ["Sociedad Argentina de Reumatología — Guías de gota.", "Recomendaciones EULAR de gota."],
    pearls: ["Monoartritis = punzar.", "Cristales en aguja con birrefringencia negativa.", "Tiazidas suben el úrico."],
    pitfalls: ["Dar AINE en dosis altas con enfermedad renal.", "No suspender la tiazida."],
    tribunal: [
      qa("¿Cuándo se inicia tratamiento hipouricemiante?", "Con tofos, dos o más crisis por año, artropatía gotosa en imágenes, litiasis renal, enfermedad renal crónica o uricemia muy alta; la meta es menor de 6 mg/dl (menor de 5 con tofos)."),
      qa("¿Qué diferencia los cristales de gota y de pseudogota?", "Urato monosódico (gota): forma de aguja, birrefringencia negativa intensa. Pirofosfato de calcio (pseudogota): romboidales, birrefringencia positiva débil; la pseudogota afecta más la rodilla y la muñeca en mayores."),
      qa("¿Por qué no se empieza o suspende el alopurinol durante la crisis?", "Porque los cambios bruscos de la uricemia movilizan cristales y prolongan la crisis; si ya lo tomaba, se continúa, y si no, se inicia con profilaxis de crisis cuando el ataque cede (algunas guías permiten iniciarlo antes con cobertura)."),
    ],
  },
};
