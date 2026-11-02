import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ictericiaIncompatibilidad: ClinicalCase = {
  id: "ictericia-neonatal-incompatibilidad-abo",
  level: 2,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 1, ageUnit: "días", sex: "M", context: "Nacido a término hace 20 horas en internación conjunta. Madre grupo 0 Rh positivo." },
  frequency: "frecuente",
  intro: "“Lo veo amarillo desde hace unas horas, de la cara hasta la panza. Toma bien el pecho.” (relata la madre durante la recorrida)",
  vitals: { FC: "138 lpm", FR: "42 rpm", "T°": "36,8 °C", Peso: "3,2 kg" },
  anamnesis: [
    act("inicio", "¿Cuándo empezó la coloración amarilla?", "clave", "“Hace unas horas, antes del día de vida.”", "Ictericia en las primeras 24 h: siempre patológica, sugiere hemólisis."),
    act("grupo", "¿Cuál es el grupo y factor de la madre? ¿Hermanos con ictericia?", "clave", "“Soy 0 positivo. Mi primer hijo también estuvo en luminoterapia.”", "Madre 0: riesgo de incompatibilidad ABO con hijo A o B."),
    act("alimentacion", "¿Cómo se prende al pecho? ¿Cuántos pañales moja?", "util", "“Bien, ya mojó varios.”", "Descarta deshidratación."),
    act("parto", "¿Cómo fue el parto? ¿Tiene hematomas?", "util", "“Normal, sin golpes.”", "Los cefalohematomas aumentan la bilirrubina."),
    act("infeccion", "¿Tuviste fiebre o rotura de bolsa prolongada?", "util", "“No.”", "Descarta sepsis."),
    act("nombre", "¿Cómo se llama?", "neutro", "“Bautista.”", "No orienta."),
  ],
  exam: [
    act("ictericia-ex", "Extensión de la ictericia (zonas de Kramer)", "clave", "Hasta el abdomen (zona 3).", "Estimación clínica; se confirma con bilirrubina."),
    act("neuro", "Tono, succión y llanto", "clave", "Buen tono, succión vigorosa.", "Sin signos de encefalopatía bilirrubínica."),
    act("palidez", "Palidez y hepatoesplenomegalia", "util", "Leve palidez, sin visceromegalias.", "Hemólisis moderada."),
  ],
  studies: [
    study("Laboratorio", "bilirrubina", "Bilirrubina total y directa", "clave", "Bilirrubina total 11 mg/dl a las 20 h, directa 0,5.", "Por encima del umbral de luminoterapia para su edad en horas."),
    study("Laboratorio", "grupo", "Grupo y factor del recién nacido y Coombs directa", "clave", "Grupo A Rh positivo, Coombs directa positiva.", "Incompatibilidad ABO con hemólisis inmune."),
    study("Laboratorio", "hemograma", "Hemograma con reticulocitos y frotis", "clave", "Hb 13,8, reticulocitos 9 %, esferocitos.", "Hemólisis."),
    study("Otros", "esperar", "Esperar al tercer día para medir porque “es fisiológica”", "riesgoso", "No se realizó.", "La ictericia en las primeras 24 h nunca es fisiológica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("abo", "Ictericia neonatal patológica por enfermedad hemolítica por incompatibilidad ABO", true, "Ictericia en las primeras 24 h, madre 0 e hijo A, Coombs directa positiva, reticulocitos altos y esferocitos."),
      dx("fisiologica", "Ictericia fisiológica", false, "Aparece después de las 24 h y no tiene hemólisis."),
      dx("lactancia", "Ictericia por lactancia insuficiente", false, "Toma bien y es muy precoz con hemólisis."),
      dx("rh", "Isoinmunización Rh", false, "Madre Rh positiva."),
      dx("atresia", "Atresia de vías biliares", false, "Daría bilirrubina directa alta y acolia, más tarde."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("luminoterapia", "Luminoterapia intensiva según las curvas por horas de vida y factores de riesgo", "clave", "Transforma la bilirrubina en productos que se eliminan."),
      mg("control", "Bilirrubina cada 4–6 h y hemoglobina", "clave", "Detecta si se acerca al umbral de exanguinotransfusión."),
      mg("lactancia", "Continuar la lactancia frecuente", "clave", "Favorece la eliminación de bilirrubina."),
      mg("igiv", "Gammaglobulina EV si la bilirrubina sigue subiendo pese a la luminoterapia", "util", "Reduce la hemólisis inmune y la necesidad de exanguinotransfusión."),
      mg("agua", "Darle agua o suero glucosado", "riesgoso", "No baja la bilirrubina y desplaza la leche."),
      mg("sol", "Alta con indicación de exponerlo al sol", "riesgoso", "No es eficaz ni seguro; la hemólisis requiere control en internación."),
    ],
  },
  debrief: {
    diagnosis: "Ictericia neonatal patológica de inicio en las primeras 24 h por enfermedad hemolítica por incompatibilidad ABO (madre 0, hijo A, Coombs positiva), con indicación de luminoterapia intensiva.",
    pathologies: [
      { name: "Enfermedad hemolítica por incompatibilidad ABO", role: "principal", why: "Anticuerpos maternos anti-A que atraviesan la placenta." },
      { name: "Riesgo de encefalopatía bilirrubínica", role: "asociada", why: "Complicación a prevenir." },
      { name: "Ictericia fisiológica, por lactancia, Rh, atresia biliar", role: "diferencial", why: "Otras causas de ictericia neonatal." },
    ],
    reasoning: [
      "Causa: la madre de grupo 0 tiene anticuerpos IgG anti-A y anti-B naturales.",
      "Mecanismo: atraviesan la placenta y destruyen los glóbulos rojos del bebé de grupo A; el hígado inmaduro no conjuga tanta bilirrubina.",
      "Consecuencia: ictericia precoz con bilirrubina indirecta alta; si supera umbrales, kernicterus (daño neurológico permanente).",
    ],
    epidemiology:
      "La incompatibilidad ABO ocurre en alrededor del 15 % de los embarazos y produce hemólisis en una minoría, en general más leve que la Rh. Puede afectar al primer hijo y suele repetirse en los siguientes. Es la causa más frecuente de enfermedad hemolítica del recién nacido.",
    management: [
      "Toda ictericia en las primeras 24 h: bilirrubina, grupo, Coombs y hemograma.",
      "Luminoterapia según curvas por horas de vida y factores de riesgo.",
      "Gammaglobulina o exanguinotransfusión según la evolución.",
      "Control de bilirrubina después del alta.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones para el manejo de la hiperbilirrubinemia en recién nacidos de 35 semanas o más.", "Guía AAP de hiperbilirrubinemia neonatal."],
    pearls: ["Ictericia antes de las 24 h = patológica.", "Madre 0 + hijo A o B = buscar ABO.", "Usar curvas por horas de vida."],
    pitfalls: ["Asumir que es fisiológica.", "Dar agua o sol."],
    tribunal: [
      qa("¿Qué caracteriza a la ictericia fisiológica?", "Aparece después de las 24 h, alcanza su pico al tercer o cuarto día, la bilirrubina sube menos de 5 mg/dl por día, es indirecta, en un bebé sano, y desaparece antes de las 2 semanas (3 en prematuros)."),
      qa("¿Qué es el kernicterus?", "El daño neurológico por depósito de bilirrubina indirecta en los ganglios basales: en la fase aguda, letargia, hipotonía, llanto agudo, opistótonos; en la crónica, parálisis cerebral coreoatetósica, sordera y alteraciones de la mirada."),
      qa("¿Qué diferencias hay entre la incompatibilidad Rh y la ABO?", "La Rh requiere sensibilización previa (no afecta al primer hijo), es más grave y se previene con gammaglobulina anti-D; la ABO puede afectar al primero, es más leve y no tiene profilaxis."),
    ],
  },
};
