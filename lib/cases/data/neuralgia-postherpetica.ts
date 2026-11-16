import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const neuralgiaPostherpetica: ClinicalCase = {
  id: "neuralgia-postherpetica",
  level: 2,
  area: "Neurología",
  setting: "Consultorio",
  patient: { age: 76, ageUnit: "años", sex: "F", context: "Viuda, vive sola. Tuvo culebrilla en el costado derecho hace 4 meses; empezó el antiviral al quinto día." },
  frequency: "frecuente",
  intro: "“Las ampollas se fueron, pero me sigue quemando. No soporto ni el roce de la ropa.”",
  vitals: { TA: "138/80 mmHg", FC: "74 lpm", Peso: "58 kg" },
  anamnesis: [
    act("tiempo", "¿Cuánto hace del herpes?", "clave", "“Cuatro meses.”", "Dolor más de 3 meses después del rash: neuralgia posherpética."),
    act("caracter", "¿Cómo es el dolor?", "clave", "“Quemante, con pinchazos, y la ropa me duele.”", "Dolor neuropático con alodinia."),
    act("sueno-animo", "¿Duerme? ¿Cómo está de ánimo?", "clave", "“No duermo y lloro seguido.”", "Impacto en sueño y ánimo: hay que buscar depresión."),
    act("medicacion", "¿Qué tomó para el dolor?", "clave", "“Ibuprofeno y paracetamol, no hacen nada.”", "Los analgésicos comunes no sirven en dolor neuropático."),
    act("caidas", "¿Se cayó alguna vez? ¿Se marea?", "util", "“El año pasado, una vez.”", "Importa para elegir fármacos sedantes."),
    act("renal", "¿Tiene problemas de riñón?", "util", "“Me dijeron que funciona un poco menos.”", "Ajuste de gabapentinoides."),
  ],
  exam: [
    act("dermatoma", "Dermatoma T6 derecho", "clave", "Cicatrices hipopigmentadas, alodinia al roce con algodón e hipoestesia.", "Alodinia en el dermatoma afectado."),
    act("otros", "Resto del examen neurológico", "util", "Normal.", "Sin otros déficits."),
    act("tórax", "Tórax", "util", "Sin lesiones nuevas.", "No hay reactivación."),
  ],
  studies: [
    study("Otros", "clinico", "Diagnóstico clínico", "clave", "Dolor neuropático persistente en el dermatoma del zóster.", "No requiere estudios."),
    study("Laboratorio", "creatinina", "Creatinina para ajustar la dosis", "util", "Clearance de 48 ml/min.", "Ajuste de pregabalina."),
    study("Imágenes", "rmn", "Resonancia de columna dorsal", "innecesario", "No se pidió.", "El cuadro está explicado."),
    study("Laboratorio", "pcr-vzv", "PCR de virus varicela zóster en sangre", "innecesario", "No se pidió.", "No hay infección activa."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nph", "Neuralgia posherpética en dermatoma T6 derecho", true, "Dolor quemante con alodinia que persiste más de 3 meses después de un zóster en el mismo dermatoma."),
      dx("zoster-activo", "Herpes zóster activo", false, "No hay lesiones nuevas."),
      dx("radiculopatia", "Radiculopatía dorsal por hernia", false, "Coincide con el dermatoma del zóster y no hay otra causa."),
      dx("angina", "Dolor torácico coronario", false, "Es superficial, quemante y con alodinia."),
      dx("fibromialgia", "Fibromialgia", false, "Es localizado a un dermatoma."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("lidocaina", "Parches de lidocaína al 5 %", "clave", "Primera línea en mayores: casi sin efectos sistémicos."),
      mg("pregabalina", "Pregabalina o gabapentina en dosis bajas, ajustadas a la función renal", "clave", "Primera línea sistémica; subir lento por mareo y caídas."),
      mg("animo", "Evaluar depresión y acompañamiento", "clave", "El dolor crónico la deprime y viceversa."),
      mg("capsaicina", "Capsaicina tópica", "util", "Alternativa."),
      mg("vacuna", "Vacuna recombinante contra el zóster para prevenir otro episodio", "util", "Indicada en mayores de 50."),
      mg("amitriptilina-alta", "Amitriptilina en dosis altas", "riesgoso", "Anticolinérgica: caídas, confusión y arritmias en mayores."),
      mg("aines-cronicos", "Seguir con ibuprofeno indefinidamente", "riesgoso", "No sirve y daña riñón y estómago."),
    ],
  },
  debrief: {
    diagnosis: "Neuralgia posherpética de dermatoma T6 derecho con alodinia y alteración del sueño, en una mujer de 76 años.",
    pathologies: [
      { name: "Neuralgia posherpética", role: "principal", why: "Dolor neuropático por daño del ganglio y el nervio." },
      { name: "Insomnio y síntomas depresivos", role: "asociada", why: "Impacto del dolor crónico." },
      { name: "Radiculopatía, zóster activo", role: "diferencial", why: "Dolor en el mismo territorio." },
    ],
    reasoning: [
      "Causa: reactivación del virus varicela zóster que daña el ganglio sensitivo.",
      "Mecanismo: sensibilización periférica y central con descargas ectópicas.",
      "Consecuencia: dolor quemante y alodinia que pueden durar meses o años.",
    ],
    epidemiology:
      "Es la complicación más frecuente del zóster: afecta al 10–20 % y a más del 30 % de los mayores de 80. El riesgo aumenta con la edad, el dolor intenso en la fase aguda y el compromiso oftálmico. La vacuna recombinante reduce el riesgo en un 90 %.",
    management: [
      "Lidocaína tópica.",
      "Gabapentinoides ajustados.",
      "Abordar sueño y ánimo.",
      "Vacunar contra el zóster.",
    ],
    sources: ["Sociedad Argentina de Infectología — Herpes zóster y vacunación.", "NICE — Neuropathic pain in adults: pharmacological management."],
    pearls: ["Más de 3 meses = neuralgia posherpética.", "Lidocaína tópica en mayores.", "La vacuna la previene."],
    pitfalls: ["Amitriptilina en dosis altas en ancianos.", "AINE crónicos."],
    tribunal: [
      qa("¿Cuándo se habla de neuralgia posherpética?", "Cuando el dolor persiste más de 90 días después de la aparición del rash del zóster."),
      qa("¿Qué es la alodinia?", "Dolor provocado por un estímulo que normalmente no duele, como el roce de la ropa."),
      qa("¿Qué reduce el riesgo de neuralgia posherpética?", "La vacuna contra el zóster y el antiviral iniciado dentro de las 72 horas del rash."),
    ],
  },
};
