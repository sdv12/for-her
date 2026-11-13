import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiponatremiaEjercicio: ClinicalCase = {
  id: "hiponatremia-asociada-ejercicio",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 32, ageUnit: "años", sex: "F", context: "Corrió un maratón de montaña de 42 km en 6 horas. Tomó agua en cada puesto por miedo a deshidratarse." },
  frequency: "poco-frecuente",
  intro: "La trae la ambulancia de la carrera: “Al llegar dijo que le dolía mucho la cabeza, vomitó, está confundida y tuvo una convulsión breve.”",
  vitals: { TA: "128/78 mmHg", FC: "96 lpm", FR: "20 rpm", "T°": "37,4 °C", "SatO₂": "96 %", Peso: "59 kg (salió con 57)", Glasgow: "12/15" },
  anamnesis: [
    act("liquidos", "¿Cuánto tomó durante la carrera?", "clave", "“Unos 6 litros de agua, en cada puesto.”", "Ingesta excesiva."),
    act("peso", "¿Cuánto pesaba antes?", "clave", "“57 kilos.”", "Aumento de peso: sobrecarga de agua."),
    act("aines", "¿Tomó ibuprofeno?", "clave", "“Sí, antes de largar.”", "Favorece la retención de agua."),
    act("orina", "¿Orinó durante la carrera?", "util", "“Muy poco.”", "ADH alta."),
    act("trauma", "¿Se cayó?", "util", "“No.”", "TEC."),
    act("club", "¿Corre con un grupo?", "neutro", "“Con un running team.”", "No orienta."),
  ],
  exam: [
    act("neuro", "Examen neurológico", "clave", "Confusa, sin foco.", "Encefalopatía hiponatrémica."),
    act("volemia", "Volemia", "clave", "Edema leve de manos.", "Euvolémica o hipervolémica."),
    act("temperatura", "Temperatura central", "util", "37,4.", "Excluye golpe de calor."),
  ],
  studies: [
    study("Laboratorio", "ionograma", "Sodio, glucemia, CPK, función renal", "clave", "Na 119; glucemia normal; CPK 3.200.", "Hiponatremia grave."),
    study("Laboratorio", "osm", "Osmolaridad plasmática y urinaria, sodio urinario", "util", "Osm plasmática 252; urinaria 420.", "Hipotónica con ADH activa."),
    study("Imágenes", "tc", "TC de cerebro", "util", "Edema cerebral leve.", "Gravedad."),
    study("Otros", "fisiologica", "Solución fisiológica rápida como si fuera deshidratación", "riesgoso", "No se indicó.", "No corrige y agrega volumen."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("eah", "Hiponatremia grave asociada al ejercicio con encefalopatía", true, "Ingesta excesiva de agua, aumento de peso, AINE, Na 119 y convulsión."),
      dx("golpe-calor", "Golpe de calor", false, "Temperatura normal."),
      dx("deshidratacion", "Deshidratación", false, "Aumentó de peso."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia normal."),
      dx("siadh-cronico", "SIADH crónico", false, "Cuadro agudo por ejercicio."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("hipertonica", "Bolo de solución salina hipertónica al 3 %, repetible", "clave", "Hiponatremia sintomática grave."),
      mg("restriccion", "Restringir agua", "clave", "Detener el aporte."),
      mg("controles", "Sodio cada 2 a 4 horas sin superar 8 a 10 mEq en 24 horas", "clave", "Evitar desmielinización."),
      mg("educacion", "Educación: beber según sed en carreras largas", "util", "Prevención."),
      mg("agua", "Darle más agua o bebida deportiva", "riesgoso", "Empeora la hiponatremia."),
      mg("esperar", "Esperar que orine sola sin tratar", "riesgoso", "Edema cerebral y herniación."),
    ],
  },
  debrief: {
    diagnosis: "Hiponatremia grave asociada al ejercicio con encefalopatía y convulsión, en corredora de 32 años.",
    pathologies: [
      { name: "Hiponatremia asociada al ejercicio", role: "principal", why: "Sobrecarga de agua con ADH elevada." },
      { name: "Edema cerebral y rabdomiólisis leve", role: "asociada", why: "Consecuencias." },
      { name: "Golpe de calor, deshidratación", role: "diferencial", why: "Otras urgencias en corredores." },
    ],
    reasoning: [
      "Causa: beber más de lo que se pierde, con AINE y ADH estimulada por el ejercicio.",
      "Mecanismo: dilución del sodio y entrada de agua a las neuronas.",
      "Consecuencia: edema cerebral, convulsiones y riesgo de muerte.",
    ],
    epidemiology:
      "Aparece en carreras de larga duración, más en mujeres, corredores lentos y quienes beben en exceso. El aumento de peso durante la carrera es la pista. La recomendación actual es beber según la sed.",
    management: [
      "Sodio.",
      "Hipertónica.",
      "Restringir agua.",
      "Corrección controlada.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Hiponatremia.", "Wilderness Medical Society — Clinical Practice Guidelines for Exercise-associated Hyponatremia."],
    pearls: ["Ganó peso en la carrera.", "Síntomas graves: hipertónica.", "Beber según sed."],
    pitfalls: ["Más agua.", "Fisiológica pensando en deshidratación."],
    tribunal: [
      qa("¿Qué es la mielinólisis osmótica?", "Desmielinización del tronco por corrección rápida de una hiponatremia crónica."),
      qa("¿Por qué en esta hiponatremia aguda el riesgo principal es otro?", "Porque el peligro es el edema cerebral; no hubo tiempo de adaptación."),
      qa("¿Por qué influyen los AINE?", "Potencian el efecto de la ADH en el riñón y reducen la excreción de agua."),
    ],
  },
};
