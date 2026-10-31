import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const hiponatremia: ClinicalCase = {
  id: "hiponatremia-tiazida",
  level: 3,
  area: "Nefrourología",
  setting: "Guardia",
  patient: { age: 80, ageUnit: "años", sex: "F", context: "Hipertensa. Le agregaron hidroclorotiazida hace tres semanas. Toma mucha agua por el calor." },
  frequency: "frecuente",
  intro: "“Desde hace dos días está confundida, se cayó en el baño, tiene náuseas y hoy vomitó. Está muy lenta.” (relata el hijo)",
  vitals: { TA: "134/78 mmHg", FC: "82 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "96 %", Glucemia: "104 mg/dl" },
  anamnesis: [
    act("farmacos", "¿Qué remedios toma? ¿Cambió alguno?", "clave", "“Le agregaron una pastilla para orinar, hidroclorotiazida, hace tres semanas. También toma sertralina.”", "Las tiazidas y los ISRS son causas frecuentes de hiponatremia en adultos mayores."),
    act("agua", "¿Cuánto líquido toma?", "clave", "“Mucho, más de tres litros, por el calor; y come poco.”", "Mucha agua y poca sal (dieta de té y tostadas) favorecen la hiponatremia."),
    act("convulsion", "¿Tuvo convulsiones?", "clave", "“No.”", "Las convulsiones indican hiponatremia grave sintomática: corrección urgente."),
    act("tiempo", "¿Desde cuándo está así?", "util", "“Dos días, pero venía rara hace una semana.”", "Más de 48 h: hiponatremia crónica, que debe corregirse lentamente."),
    act("vomitos", "¿Vomitó o tuvo diarrea?", "util", "“Vomitó hoy dos veces.”", "Los vómitos son un síntoma de gravedad."),
    act("caida", "¿Se golpeó la cabeza al caer?", "util", "“No, se cayó sentada.”", "Un hematoma subdural sería otra causa de confusión."),
    act("hobby", "¿Qué le gusta hacer?", "neutro", "“Crucigramas.”", "No orienta."),
  ],
  exam: [
    act("volemia", "Evaluación de la volemia (mucosas, yugulares, edemas, ortostatismo)", "clave", "Euvolémica: mucosas húmedas, sin edemas ni ingurgitación, sin ortostatismo.", "La volemia orienta la causa y el tratamiento."),
    act("neuro", "Examen neurológico", "clave", "Somnolienta, desorientada, sin foco; marcha inestable.", "Síntomas moderados a graves de hiponatremia."),
    act("cabeza", "Inspección de cráneo", "util", "Sin lesiones.", "Descarta trauma craneal."),
  ],
  studies: [
    study("Laboratorio", "iono", "Ionograma, glucemia, urea, creatinina", "clave", "Na 118 mEq/l, K 3,2, glucemia normal, creatinina 0,8.", "Hiponatremia grave con hipopotasemia (por la tiazida)."),
    study("Laboratorio", "osm", "Osmolaridad plasmática, osmolaridad y sodio urinarios", "clave", "Osm plasmática 248; osm urinaria 410; Na urinario 52.", "Hiponatremia hipotónica con orina inapropiadamente concentrada y sodio urinario alto: tiazida o SIADH."),
    study("Laboratorio", "tsh", "TSH y cortisol", "util", "Normales.", "El hipotiroidismo y la insuficiencia suprarrenal son causas a descartar."),
    study("Imágenes", "tc", "Tomografía de cerebro", "util", "Sin lesiones agudas.", "Por la caída y la confusión."),
    study("Laboratorio", "corregir-rapido", "Corregir hasta sodio normal (135) en las primeras 24 h", "riesgoso", "No se realizó.", "La corrección rápida de una hiponatremia crónica produce desmielinización osmótica (mielinólisis pontina)."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("tiazida", "Hiponatremia hipotónica euvolémica grave y crónica, sintomática, por tiazida y sertralina con alta ingesta de agua", true, "Na 118 con osmolaridad baja, orina concentrada, sodio urinario alto, euvolemia y fármacos causales, con confusión y vómitos."),
      dx("pseudo", "Pseudohiponatremia", false, "La osmolaridad sería normal (hiperlipidemia, hiperproteinemia)."),
      dx("hiperglucemia", "Hiponatremia por hiperglucemia", false, "La glucemia es normal."),
      dx("hipovolemica", "Hiponatremia hipovolémica por vómitos", false, "Habría signos de deshidratación y sodio urinario bajo."),
      dx("ic", "Hiponatremia hipervolémica por insuficiencia cardíaca", false, "Habría edemas y congestión."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("salina", "Solución salina hipertónica al 3 % en bolo (100–150 ml) por los síntomas graves, con controles de sodio frecuentes", "clave", "Con vómitos y confusión moderada a grave, subir 4–6 mEq/l en pocas horas alivia el edema cerebral."),
      mg("limite", "Limitar la corrección a 8–10 mEq/l en 24 h", "clave", "Previene el síndrome de desmielinización osmótica."),
      mg("suspender", "Suspender la tiazida (y revisar la sertralina), restringir el agua y reponer potasio", "clave", "Trata la causa."),
      mg("controles", "Sodio cada 2–4 h y diuresis; frenar con agua libre o desmopresina si sube muy rápido", "util", "Al retirar la causa puede haber una diuresis acuosa y sobrecorrección."),
      mg("fisiologica", "Solo solución fisiológica a chorro", "innecesario", "En una hiponatremia euvolémica con orina concentrada puede no subir el sodio o incluso bajarlo."),
    ],
  },
  debrief: {
    diagnosis: "Hiponatremia hipotónica euvolémica grave (Na 118), crónica y sintomática, por hidroclorotiazida y sertralina con alta ingesta de agua, en mujer de 80 años.",
    pathologies: [
      { name: "Hiponatremia hipotónica grave", role: "principal", why: "Sodio de 118 con síntomas neurológicos." },
      { name: "Hipopotasemia por tiazida", role: "asociada", why: "Efecto adverso del diurético." },
      { name: "SIADH, hipotiroidismo, insuficiencia suprarrenal", role: "diferencial", why: "Otras causas euvolémicas." },
    ],
    reasoning: [
      "Causa: la tiazida impide diluir la orina (actúa en el túbulo distal) y la sertralina estimula la ADH; sumado a mucha agua y poca sal.",
      "Mecanismo: se retiene agua libre y el sodio plasmático se diluye; el agua entra a las neuronas por ósmosis y el cerebro se edematiza.",
      "Consecuencia: náuseas, vómitos, confusión, caídas, convulsiones y coma; el cerebro se adapta en 48 h perdiendo osmoles, por eso corregir rápido una hiponatremia crónica lo daña (desmielinización).",
    ],
    epidemiology:
      "La hiponatremia es la alteración electrolítica más frecuente en pacientes internados y en adultos mayores. Es más frecuente en mujeres mayores, de bajo peso, con tiazidas, ISRS, antiepilépticos o alta ingesta de agua. Aumenta el riesgo de caídas, fracturas y mortalidad.",
    management: [
      "Confirmar hiponatremia hipotónica (osmolaridad) y evaluar volemia, osmolaridad y sodio urinarios.",
      "Síntomas graves: salina hipertónica en bolo con control estrecho.",
      "Límite de corrección: 8–10 mEq/l en 24 h (menos en alto riesgo).",
      "Tratar la causa: suspender fármacos, restricción hídrica en SIADH, volumen en hipovolemia.",
    ],
    sources: ["Sociedad Argentina de Nefrología — Recomendaciones sobre trastornos del sodio.", "Guía europea de diagnóstico y tratamiento de la hiponatremia."],
    pearls: ["Tiazidas + ISRS + adulta mayor = hiponatremia.", "No más de 8–10 mEq/l en 24 h.", "Síntomas graves: salina al 3 %."],
    pitfalls: ["Corregir demasiado rápido.", "Dar solo solución fisiológica sin evaluar."],
    tribunal: [
      qa("¿Cómo se clasifica la hiponatremia?", "Según la osmolaridad (hipotónica, isotónica o pseudohiponatremia, hipertónica por glucosa o manitol) y, la hipotónica, según la volemia: hipovolémica (vómitos, diarrea, diuréticos), euvolémica (SIADH, tiazidas, hipotiroidismo, insuficiencia suprarrenal, polidipsia) e hipervolémica (insuficiencia cardíaca, cirrosis, síndrome nefrótico)."),
      qa("¿Qué es el SIADH?", "La secreción inapropiada de hormona antidiurética: hiponatremia hipotónica euvolémica con orina concentrada (más de 100 mOsm/kg) y sodio urinario alto, sin hipotiroidismo ni insuficiencia suprarrenal. Causas: fármacos, cáncer de pulmón, enfermedades pulmonares y del sistema nervioso, dolor, posoperatorio."),
      qa("¿Qué es el síndrome de desmielinización osmótica?", "Una lesión de la mielina (sobre todo pontina) por la corrección rápida de una hiponatremia crónica: aparece días después con disartria, disfagia, cuadriparesia y alteración de la conciencia; es en gran parte irreversible."),
    ],
  },
};
