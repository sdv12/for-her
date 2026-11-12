import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const fracturaEscafoides: ClinicalCase = {
  id: "fractura-de-escafoides",
  level: 1,
  area: "Traumatología",
  setting: "Guardia",
  patient: { age: 21, ageUnit: "años", sex: "M", context: "Skater. Se cayó ayer con la mano extendida." },
  frequency: "frecuente",
  intro: "“Me caí con la mano estirada y me duele la muñeca del lado del pulgar. No está tan hinchada.”",
  vitals: { TA: "122/76 mmHg", FC: "76 lpm", "T°": "36,5 °C" },
  anamnesis: [
    act("mecanismo", "¿Cómo te caíste?", "clave", "“Con la mano extendida.”", "Mecanismo típico."),
    act("dolor", "¿Dónde duele exactamente?", "clave", "“En la base del pulgar.”", "Escafoides."),
    act("dominante", "¿Es tu mano dominante? ¿Trabajo?", "clave", "“Diestro; soy barista.”", "Impacto."),
    act("otros", "¿Otras lesiones?", "util", "“No.”", "Lesiones asociadas."),
    act("previo", "¿Lesiones previas?", "util", "“No.”", "Base."),
    act("tabla", "¿Qué tabla usás?", "neutro", "“Una de 8 pulgadas.”", "No orienta."),
  ],
  exam: [
    act("tabaquera", "Tabaquera anatómica", "clave", "Dolor a la palpación.", "Muy sugestivo."),
    act("tuberculo", "Tubérculo del escafoides y compresión axial del pulgar", "clave", "Dolorosos.", "Aumenta la sospecha."),
    act("neurovascular", "Pulsos y sensibilidad", "util", "Normales.", "Sin compromiso."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografías de muñeca con proyección de escafoides", "clave", "Sin fractura visible.", "Puede ser negativa al principio."),
    study("Imágenes", "rmn", "RM o TC si la sospecha persiste", "clave", "Fractura no desplazada del tercio medio.", "Confirma."),
    study("Imágenes", "rx-control", "Radiografía a las 10 a 14 días si no hay RM", "util", "Alternativa.", "Línea visible tras reabsorción."),
    study("Otros", "alta", "Alta sin inmovilizar por radiografía negativa", "riesgoso", "No se realizó.", "Riesgo de seudoartrosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("escafoides", "Fractura no desplazada del tercio medio del escafoides", true, "Caída con mano extendida, tabaquera dolorosa y RM."),
      dx("esguince", "Esguince de muñeca", false, "Hay fractura en RM."),
      dx("colles", "Fractura de Colles", false, "Radio distal normal."),
      dx("tendinitis", "Tenosinovitis de De Quervain", false, "Hay trauma agudo."),
      dx("luxacion", "Luxación del semilunar", false, "Alineación normal."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("inmovilizar", "Inmovilización con yeso", "clave", "Consolidación."),
      mg("seguimiento", "Controles radiológicos y de consolidación", "clave", "Riesgo de necrosis."),
      mg("cirugia", "Cirugía si está desplazada o en el polo proximal", "util", "Mayor riesgo."),
      mg("sospecha", "Ante sospecha sin imagen, inmovilizar igual", "clave", "Previene complicaciones."),
      mg("sin-control", "Alta sin control", "riesgoso", "Seudoartrosis."),
      mg("masaje", "Masajes y uso normal", "riesgoso", "Desplaza."),
    ],
  },
  debrief: {
    diagnosis: "Fractura no desplazada del tercio medio del escafoides derecho, en varón de 21 años.",
    pathologies: [
      { name: "Fractura de escafoides", role: "principal", why: "Fractura del carpo más común." },
      { name: "Riesgo de necrosis avascular", role: "asociada", why: "Irrigación retrógrada." },
      { name: "Esguince, Colles, De Quervain", role: "diferencial", why: "Otras lesiones." },
    ],
    reasoning: [
      "Causa: caída con muñeca en extensión.",
      "Mecanismo: el escafoides se comprime contra el radio.",
      "Consecuencia: riesgo de seudoartrosis y necrosis por irrigación distal.",
    ],
    epidemiology:
      "Es la fractura más frecuente del carpo, sobre todo en varones jóvenes activos. La radiografía inicial puede ser normal hasta en un 20 %. El dolor en tabaquera anatómica obliga a inmovilizar aunque la placa sea normal.",
    management: [
      "Examen.",
      "Rx.",
      "Inmovilizar.",
      "Confirmar con RM o control.",
    ],
    sources: ["Asociación Argentina de Ortopedia y Traumatología — Fracturas de muñeca.", "NICE — Fractures (non-complex) Guideline."],
    pearls: ["Dolor en tabaquera.", "Rx normal no descarta.", "Inmovilizar ante la sospecha."],
    pitfalls: ["Alta con Rx negativa.", "No controlar."],
    tribunal: [
      qa("¿Por qué hay necrosis avascular?", "Porque la irrigación entra por el polo distal; las fracturas proximales cortan el aporte."),
      qa("¿Qué límites tiene la tabaquera anatómica?", "Tendones del extensor largo del pulgar, y del abductor largo y extensor corto."),
      qa("¿Qué es una seudoartrosis?", "Falta de consolidación luego del tiempo esperado."),
    ],
  },
};
