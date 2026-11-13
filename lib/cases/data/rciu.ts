import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const rciu: ClinicalCase = {
  id: "restriccion-crecimiento-intrauterino",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 36, ageUnit: "años", sex: "F", context: "Embarazo de 33 semanas. Fuma 15 cigarrillos por día. Hipertensa crónica." },
  frequency: "frecuente",
  intro: "“En el control me dijeron que la panza está chica para las semanas que tengo.”",
  vitals: { TA: "142/92 mmHg", FC: "84 lpm", "T°": "36,5 °C", Peso: "61 kg" },
  anamnesis: [
    act("fecha", "¿La fecha está confirmada por ecografía temprana?", "clave", "“Sí, con una de 9 semanas.”", "Edad gestacional segura."),
    act("tabaco", "¿Cuánto fuma?", "clave", "“Quince por día.”", "Factor de riesgo."),
    act("movimientos", "¿Cómo se mueve el bebé?", "clave", "“Menos que antes.”", "Bienestar fetal."),
    act("hta", "¿Qué toma para la presión?", "util", "“Alfametildopa, a veces me olvido.”", "Insuficiencia placentaria."),
    act("infecciones", "¿Tuvo fiebre o erupciones en el embarazo?", "util", "“No.”", "Causas infecciosas."),
    act("hijos", "¿Tiene otros hijos?", "neutro", "“Una nena de 8.”", "No orienta."),
  ],
  exam: [
    act("altura", "Altura uterina", "clave", "28 cm a las 33 semanas.", "Menor al percentil 10."),
    act("ta", "Presión y proteinuria", "clave", "142/92; proteinuria negativa con tira.", "Sin preeclampsia por ahora."),
    act("lcf", "Latidos fetales", "util", "140 lpm.", "Vitalidad."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía con biometría y líquido amniótico", "clave", "Peso fetal estimado en percentil 2, oligoamnios leve.", "Restricción."),
    study("Imágenes", "doppler", "Doppler de arteria umbilical, cerebral media y ductus venoso", "clave", "Umbilical con índice de pulsatilidad alto y flujo diastólico presente; cerebral media con vasodilatación; ductus normal.", "Insuficiencia placentaria con redistribución."),
    study("Otros", "monitoreo", "Monitoreo fetal", "util", "Reactivo.", "Bienestar."),
    study("Otros", "induccion-ya", "Interrupción inmediata solo por el percentil", "riesgoso", "No se realizó.", "Prematurez sin necesidad con doppler estable."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("rciu", "Restricción del crecimiento intrauterino tardía por insuficiencia placentaria", true, "Peso menor al percentil 3 con doppler umbilical alterado y redistribución, en hipertensa fumadora."),
      dx("pequeno-sano", "Feto pequeño constitucional", false, "Doppler alterado y percentil 2."),
      dx("error-fecha", "Error en la edad gestacional", false, "Fecha confirmada en el primer trimestre."),
      dx("cromosomopatia", "Cromosomopatía", false, "Inicio tardío y doppler placentario."),
      dx("preeclampsia", "Preeclampsia", false, "Sin proteinuria ni criterios de daño."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("vigilancia", "Doppler y monitoreo seriados en alto riesgo", "clave", "Definir el momento del parto."),
      mg("corticoides", "Maduración pulmonar con corticoides si se planifica nacimiento antes de las 34 semanas", "clave", "Prematurez."),
      mg("tabaco", "Cesación tabáquica", "clave", "Mejora el crecimiento."),
      mg("ta-control", "Ajustar el antihipertensivo y vigilar preeclampsia", "util", "Riesgo asociado."),
      mg("reposo-absoluto", "Reposo absoluto en cama", "riesgoso", "Sin beneficio y aumenta el riesgo de trombosis."),
      mg("enalapril", "Cambiar a enalapril", "riesgoso", "Contraindicado en el embarazo."),
    ],
  },
  debrief: {
    diagnosis: "Restricción del crecimiento intrauterino tardía por insuficiencia placentaria, en embarazada de 33 semanas hipertensa crónica y fumadora.",
    pathologies: [
      { name: "Restricción del crecimiento intrauterino", role: "principal", why: "Feto que no alcanza su potencial." },
      { name: "Hipertensión crónica y tabaquismo", role: "asociada", why: "Causas de insuficiencia placentaria." },
      { name: "Pequeño constitucional, error de fecha", role: "diferencial", why: "Fetos pequeños sanos." },
    ],
    reasoning: [
      "Causa: placentación deficiente por hipertensión y tabaco.",
      "Mecanismo: menor flujo y oxigenación fetal con redistribución hacia el cerebro.",
      "Consecuencia: bajo peso, oligoamnios y riesgo de muerte fetal.",
    ],
    epidemiology:
      "La restricción de crecimiento es una causa importante de mortalidad perinatal y de morbilidad a largo plazo. El tabaco, la hipertensión y la preeclampsia son causas frecuentes y prevenibles. La altura uterina en cada control es la herramienta de pesquisa.",
    management: [
      "Fecha segura.",
      "Ecografía y doppler.",
      "Vigilancia.",
      "Nacimiento oportuno.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de restricción del crecimiento intrauterino.", "FIGO — Initiative on Fetal Growth Guidelines."],
    pearls: ["Medí la altura uterina.", "El doppler decide.", "Dejar de fumar sirve."],
    pitfalls: ["Interrumpir solo por percentil.", "IECA en embarazo."],
    tribunal: [
      qa("¿Qué diferencia hay entre restricción precoz y tardía?", "La precoz aparece antes de las 32 semanas y es más grave; la tardía es más frecuente y con doppler más sutil."),
      qa("¿Qué es la redistribución?", "Vasodilatación cerebral fetal para proteger al cerebro ante hipoxemia."),
      qa("¿Qué hallazgo del doppler es más grave?", "Flujo diastólico ausente o reverso en la umbilical y ductus venoso alterado."),
    ],
  },
};
