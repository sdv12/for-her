import { act, dx, mg, study } from "../build";
import type { ClinicalCase } from "../types";

export const celulitis: ClinicalCase = {
  id: "celulitis-pierna",
  level: 2,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 67, ageUnit: "años", sex: "F", context: "Obesidad, várices. Diabética tipo 2." },
  frequency: "frecuente",
  intro: "“Se me puso roja, caliente y dura la pierna izquierda desde hace dos días. Hoy tuve escalofríos.”",
  vitals: { TA: "132/78 mmHg", FC: "98 lpm", FR: "18 rpm", "T°": "38,3 °C", Glucemia: "212 mg/dl" },
  anamnesis: [
    act("herida", "¿Tuvo alguna herida, picadura o lastimadura en los pies?", "clave", "“Tengo los dedos paspados, me pica entre los dedos del pie.”", "El intertrigo micótico interdigital es la puerta de entrada más frecuente de la celulitis de pierna."),
    act("dolor", "¿Cómo es el dolor? ¿Es mucho más fuerte de lo que se ve?", "clave", "“Me duele, pero se aguanta.”", "Un dolor desproporcionado a la lesión es la principal señal de alarma de fascitis necrotizante."),
    act("previas", "¿Le pasó antes?", "util", "“Hace dos años, en la misma pierna.”", "La celulitis recurrente se asocia a linfedema, insuficiencia venosa y puertas de entrada no tratadas."),
    act("pantorrilla", "¿Estuvo en cama o viajó? ¿Tuvo trombosis?", "util", "“No.”", "La trombosis venosa profunda es el principal diferencial de una pierna roja e hinchada."),
    act("diabetes", "¿Cómo controla la diabetes? ¿Qué toma?", "clave", "“Tomo metformina, pero no me cuido mucho.”", "La diabetes descompensada empeora la evolución y es un factor de riesgo de infección grave."),
    act("alergia", "¿Es alérgica a la penicilina?", "clave", "“No.”", "Permite usar betalactámicos."),
    act("tv", "¿Qué novela mira?", "neutro", "“Una turca.”", "No orienta."),
  ],
  exam: [
    act("lesion", "Inspección y palpación de la lesión", "clave", "Placa eritematosa, caliente, dolorosa y edematosa en la cara anterior de la pierna izquierda, de bordes difusos, sin fluctuación, sin ampollas ni necrosis.", "Celulitis no purulenta; la fluctuación indicaría absceso (drenaje)."),
    act("pies", "Examen de los pies (interdigitales y uñas)", "clave", "Maceración y fisuras interdigitales con descamación (intertrigo).", "Puerta de entrada: hay que tratarla para evitar recurrencias."),
    act("alarma", "Buscar crepitación, ampollas, necrosis o anestesia cutánea", "clave", "Ausentes.", "Su presencia sugeriría infección necrotizante: urgencia quirúrgica."),
    act("ganglios", "Ganglios inguinales", "util", "Adenopatía inguinal izquierda dolorosa.", "Linfadenitis reactiva."),
    act("marcar", "Marcar los bordes de la lesión", "util", "Bordes marcados con fibra.", "Permite controlar la evolución con objetividad."),
  ],
  studies: [
    study("Laboratorio", "lab", "Hemograma, PCR, glucemia, creatinina", "util", "Leucocitos 13.800, PCR 85 mg/l, creatinina 1,0, glucemia 218.", "Valora respuesta sistémica, función renal (dosis) y glucemia."),
    study("Imágenes", "doppler", "Ecografía doppler venosa", "util", "Sin trombosis.", "Útil si hay dudas con TVP (por ejemplo, edema asimétrico sin puerta de entrada)."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "neutro", "Negativos.", "Su rendimiento es bajo en celulitis; se reservan para casos graves o inmunocomprometidos."),
    study("Imágenes", "rmn", "Resonancia de pierna", "innecesario", "No se realizó.", "Solo ante sospecha de fascitis u osteomielitis, y nunca debe retrasar la cirugía si la clínica es clara."),
    study("Microbiología", "hisopado", "Hisopado de la piel intacta", "innecesario", "Flora mixta.", "Sin lesión abierta ni pus no sirve: el cultivo de superficie no refleja el germen."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("celulitis", "Celulitis no purulenta de pierna con intertrigo como puerta de entrada", true, "Placa eritematosa, caliente, dolorosa, de bordes difusos, con fiebre, en una paciente con intertrigo, várices, obesidad y diabetes."),
      dx("tvp", "Trombosis venosa profunda", false, "Edema y dolor en la pantorrilla, en general sin fiebre ni placa eritematosa con calor; el doppler es normal."),
      dx("fascitis", "Fascitis necrotizante", false, "Dolor desproporcionado, ampollas, necrosis, crepitación y toxicidad sistémica. Ninguno está presente."),
      dx("absceso", "Absceso de partes blandas", false, "Colección fluctuante; requiere drenaje."),
      dx("estasis", "Dermatitis de estasis", false, "Bilateral, crónica, con prurito, sin fiebre ni calor marcado."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cefalexina", "Cefalexina oral 500 mg cada 6 h por 5–7 días (o cefazolina EV si no tolera vía oral)", "clave", "Cubre Streptococcus pyogenes y S. aureus sensible a meticilina, los gérmenes habituales en la celulitis no purulenta."),
      mg("elevacion", "Elevación del miembro y control de los bordes marcados en 48 h", "clave", "La elevación reduce el edema y acelera la mejoría; si se extiende pese al antibiótico, se reevalúa."),
      mg("intertrigo", "Tratar el intertrigo con antifúngico tópico", "clave", "Elimina la puerta de entrada y reduce recurrencias."),
      mg("glucemia", "Ajuste del control glucémico", "util", "La hiperglucemia empeora la respuesta inmune."),
      mg("vancomicina", "Vancomicina endovenosa de entrada", "innecesario", "Sin pus, sin factores de riesgo de SAMR y sin sepsis, no se justifica cubrir SAMR."),
      mg("corticoide", "Corticoides para el edema", "innecesario", "No tienen papel en la celulitis no complicada."),
    ],
  },
  debrief: {
    diagnosis: "Celulitis no purulenta de pierna izquierda, con intertrigo micótico como puerta de entrada, en mujer de 67 años diabética, obesa y con insuficiencia venosa.",
    pathologies: [
      { name: "Celulitis", role: "principal", why: "Infección de la dermis profunda y el tejido subcutáneo." },
      { name: "Intertrigo micótico (tinea pedis)", role: "asociada", why: "Puerta de entrada." },
      { name: "Trombosis venosa profunda", role: "diferencial", why: "Pierna roja e hinchada." },
      { name: "Fascitis necrotizante", role: "diferencial", why: "La emergencia a no perder." },
      { name: "Absceso", role: "diferencial", why: "Requiere drenaje." },
    ],
    reasoning: [
      "Causa: Streptococcus pyogenes (y otros estreptococos beta hemolíticos) o S. aureus que entran por una lesión de la piel.",
      "Mecanismo: las fisuras interdigitales rompen la barrera cutánea; el edema por insuficiencia venosa y obesidad y la diabetes facilitan la proliferación y diseminación por la dermis y el tejido subcutáneo.",
      "Consecuencia: inflamación aguda (eritema, calor, edema, dolor) de bordes difusos, con fiebre y linfadenitis. La erisipela es la forma más superficial, con bordes netos y sobreelevados.",
      "Si la infección sigue los planos de la fascia, aparece la fascitis necrotizante: dolor desproporcionado y deterioro rápido.",
    ],
    epidemiology:
      "Es una de las infecciones de piel más frecuentes en la guardia y en internación clínica. Predomina en personas de 45–65 años o más, con algo más de frecuencia en mujeres en la celulitis de miembro inferior. Los factores de riesgo son obesidad, insuficiencia venosa, linfedema, diabetes e intertrigo. Recurre en hasta un tercio de los casos.",
    management: [
      "Diagnóstico clínico; distinguir celulitis no purulenta, purulenta (absceso) e infección necrotizante.",
      "Celulitis no purulenta leve a moderada: cefalexina oral; internar si hay sepsis, falla del tratamiento oral o comorbilidades graves.",
      "Absceso: drenaje (y antibiótico con cobertura de SAMR según la gravedad y la epidemiología).",
      "Elevación, marcado de bordes, control en 48–72 h; tratar la puerta de entrada y el edema.",
      "Signos de alarma de fascitis necrotizante: cirugía urgente sin demorar por imágenes.",
    ],
    sources: [
      "Sociedad Argentina de Infectología — Guía de infecciones de piel y partes blandas.",
      "Sociedad Argentina de Dermatología — Consenso de infecciones bacterianas de piel.",
    ],
    pearls: [
      "Dolor desproporcionado = pensar en fascitis necrotizante.",
      "Marcá los bordes: es el mejor control evolutivo.",
      "Buscá y tratá la puerta de entrada entre los dedos.",
    ],
    pitfalls: ["Cubrir SAMR a todos de entrada.", "Hacer hisopado de la piel intacta.", "Olvidar el intertrigo."],
  },
};
