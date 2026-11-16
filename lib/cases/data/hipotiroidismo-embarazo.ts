import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hipotiroidismoEmbarazo: ClinicalCase = {
  id: "hipotiroidismo-embarazo",
  level: 2,
  area: "Ginecología y obstetricia",
  setting: "Consultorio",
  patient: { age: 30, ageUnit: "años", sex: "F", context: "Embarazo de 7 semanas, primero. Su madre y su hermana tienen Hashimoto." },
  frequency: "frecuente",
  intro: "“En el primer análisis del embarazo me dio la tiroides alterada. ¿Le hace mal al bebé?”",
  vitals: { TA: "110/68 mmHg", FC: "68 lpm", Peso: "62 kg" },
  anamnesis: [
    act("sintomas", "¿Cansancio, frío, constipación?", "clave", "“Cansada, pero pensé que era el embarazo.”", "Síntomas que se superponen con el embarazo."),
    act("familia", "¿Problemas de tiroides en la familia?", "clave", "“Mamá y hermana con Hashimoto.”", "Riesgo de autoinmunidad tiroidea."),
    act("abortos", "¿Embarazos o pérdidas previas?", "util", "“No.”", "El hipotiroidismo aumenta el riesgo de aborto."),
    act("medicacion", "¿Toma algo?", "util", "“Ácido fólico.”", "Interacciones con levotiroxina (hierro, calcio)."),
    act("sal", "¿Usa sal yodada?", "util", "“Sí.”", "Yodo suficiente."),
    act("antojos", "¿Tiene antojos?", "neutro", "“Helado.”", "No orienta."),
  ],
  exam: [
    act("tiroides", "Tiroides", "clave", "Bocio difuso pequeño, firme.", "Compatible con Hashimoto."),
    act("piel", "Piel y reflejos", "util", "Normales.", "Hipotiroidismo leve."),
    act("obstetrico", "Control obstétrico", "util", "Ecografía con embrión con latidos.", "Embarazo viable."),
  ],
  studies: [
    study("Laboratorio", "tsh", "TSH y T4 libre", "clave", "TSH 6,8 mUI/l, T4 libre normal-baja.", "TSH por encima del rango del primer trimestre."),
    study("Laboratorio", "atpo", "Anticuerpos anti-TPO", "clave", "Positivos.", "Autoinmunidad: más riesgo de progresión y aborto."),
    study("Imágenes", "centellograma", "Centellograma tiroideo", "riesgoso", "No se hizo.", "Contraindicado en el embarazo."),
    study("Imágenes", "eco-tiroides", "Ecografía tiroidea", "innecesario", "No se pidió.", "No cambia la conducta sin nódulos palpables."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("hipo-subclinico-embarazo", "Hipotiroidismo subclínico autoinmune (Hashimoto) en el primer trimestre del embarazo", true, "TSH de 6,8 con T4 libre normal, anti-TPO positivos y antecedente familiar."),
      dx("normal", "Variación normal del embarazo", false, "En el primer trimestre la TSH baja, no sube."),
      dx("hipo-manifiesto", "Hipotiroidismo manifiesto", false, "La T4 libre es normal."),
      dx("tirotoxicosis", "Tirotoxicosis gestacional", false, "TSH alta."),
      dx("deficit-iodo", "Déficit de yodo", false, "Usa sal yodada y tiene anti-TPO positivos."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("levotiroxina", "Levotiroxina con meta de TSH menor de 2,5 en el primer trimestre", "clave", "TSH mayor de 4 o mayor de 2,5 con anti-TPO positivos."),
      mg("control", "TSH cada 4 semanas hasta la mitad del embarazo", "clave", "Las necesidades aumentan."),
      mg("separar", "Tomarla en ayunas, separada del hierro y el calcio", "clave", "Absorción."),
      mg("posparto", "Volver a la dosis previa y controlar en el posparto", "util", "Riesgo de tiroiditis posparto."),
      mg("no-tratar", "No tratar por ser subclínico", "riesgoso", "Con anti-TPO positivos aumenta el riesgo de aborto y parto prematuro."),
      mg("metimazol", "Metimazol", "riesgoso", "Es para el hipertiroidismo."),
    ],
  },
  debrief: {
    diagnosis: "Hipotiroidismo subclínico autoinmune en el primer trimestre de un embarazo de 7 semanas, en una mujer de 30 años.",
    pathologies: [
      { name: "Hipotiroidismo subclínico en el embarazo", role: "principal", why: "TSH alta con T4 libre normal." },
      { name: "Tiroiditis de Hashimoto", role: "asociada", why: "Anti-TPO positivos." },
      { name: "Tiroiditis posparto", role: "diferencial", why: "Riesgo posterior." },
    ],
    reasoning: [
      "Causa: autoinmunidad tiroidea.",
      "Mecanismo: el embarazo aumenta la demanda de hormona tiroidea un 30–50 % y la tiroides dañada no la cubre.",
      "Consecuencia: más riesgo de aborto, parto prematuro y posibles efectos en el neurodesarrollo fetal.",
    ],
    epidemiology:
      "El hipotiroidismo subclínico afecta al 2–5 % de las embarazadas y la autoinmunidad tiroidea a más del 10 %. El feto depende de la T4 materna en el primer trimestre. Las mujeres con antecedentes familiares o autoinmunidad deben pedir TSH antes o al inicio del embarazo.",
    management: [
      "TSH al inicio del embarazo en grupos de riesgo.",
      "Anti-TPO si la TSH es alta.",
      "Levotiroxina con metas por trimestre.",
      "Control en el posparto.",
    ],
    sources: ["Sociedad Argentina de Endocrinología y Metabolismo — Tiroides y embarazo.", "ATA — Guidelines for thyroid disease during pregnancy and the postpartum."],
    pearls: ["En el primer trimestre la TSH normal es más baja.", "Anti-TPO cambia la conducta.", "Separar del hierro y el calcio."],
    pitfalls: ["Considerarla normal del embarazo.", "Pedir centellograma."],
    tribunal: [
      qa("¿Por qué la TSH baja en el primer trimestre del embarazo?", "Porque la hCG tiene acción similar a la TSH y estimula la tiroides."),
      qa("¿Por qué se aumenta la levotiroxina en el embarazo?", "Por más globulina transportadora, mayor volumen de distribución, paso placentario y degradación por la placenta."),
      qa("¿Qué riesgos tiene el hipotiroidismo no tratado en el embarazo?", "Aborto, preeclampsia, desprendimiento, parto prematuro, bajo peso y alteración del neurodesarrollo fetal."),
    ],
  },
};
