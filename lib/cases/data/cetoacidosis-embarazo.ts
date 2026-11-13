import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cetoacidosisEmbarazo: ClinicalCase = {
  id: "cetoacidosis-diabetica-embarazo",
  level: 4,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 27, ageUnit: "años", sex: "F", context: "Diabetes tipo 1 desde los 12 años. Embarazo de 26 semanas. Recibió betametasona hace 2 días por amenaza de parto prematuro." },
  frequency: "poco-frecuente",
  intro: "“Vomito desde ayer, tengo mucha sed, me duele la panza y respiro rápido.”",
  vitals: { TA: "100/60 mmHg", FC: "118 lpm", FR: "30 rpm", "T°": "36,9 °C", "SatO₂": "99 %", Glucemia: "236 mg/dl" },
  anamnesis: [
    act("insulina", "¿Cómo se está aplicando la insulina?", "clave", "“Bajé la dosis porque no podía comer.”", "Déficit de insulina."),
    act("corticoides", "¿Recibió algún medicamento nuevo?", "clave", "“Dos inyecciones para los pulmones del bebé.”", "Los corticoides aumentan la glucemia."),
    act("bebe", "¿Cómo se mueve el bebé?", "clave", "“Menos.”", "Compromiso fetal."),
    act("infeccion", "¿Fiebre, ardor al orinar, tos?", "util", "“Ardor al orinar.”", "Desencadenante."),
    act("previas", "¿Tuvo cetoacidosis antes?", "util", "“Una vez de chica.”", "Antecedente."),
    act("pareja", "¿Quién la acompaña?", "neutro", "“Mi marido.”", "No orienta."),
  ],
  exam: [
    act("kussmaul", "Respiración", "clave", "Respiración de Kussmaul, aliento cetónico.", "Acidosis metabólica."),
    act("volemia", "Volemia", "clave", "Mucosas secas, relleno lento.", "Deshidratación."),
    act("lcf", "Monitoreo fetal", "util", "Variabilidad disminuida.", "Afectación fetal por la acidosis."),
  ],
  studies: [
    study("Laboratorio", "gases", "Gases, cetonemia, ionograma, anión gap", "clave", "pH 7,14; HCO3 9; cetonemia 5,2; anión gap 24; K 4,6.", "Cetoacidosis con glucemia menor de 250."),
    study("Laboratorio", "orina", "Orina completa y urocultivo", "clave", "Leucocituria y nitritos.", "Desencadenante."),
    study("Otros", "monitoreo", "Monitoreo fetal continuo", "util", "Desaceleraciones tardías.", "Mejoran al corregir la acidosis."),
    study("Otros", "cesarea", "Cesárea urgente por el monitoreo", "riesgoso", "No se realizó.", "El monitoreo mejora al tratar a la madre."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("cad-embarazo", "Cetoacidosis diabética casi euglucémica en el embarazo, precipitada por corticoides, infección urinaria y reducción de insulina", true, "DM1 embarazada, pH 7,14, cetonemia alta y anión gap elevado con glucemia de 236."),
      dx("hiperemesis", "Hiperemesis gravídica", false, "Acidosis con anión gap alto y DM1."),
      dx("preeclampsia", "Preeclampsia", false, "Presión normal."),
      dx("pielonefritis-sola", "Pielonefritis sin acidosis", false, "Hay cetoacidosis grave."),
      dx("cetosis-ayuno", "Cetosis de ayuno", false, "pH muy bajo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Cristaloides EV", "clave", "Hipovolemia."),
      mg("insulina", "Insulina EV en infusión con dextrosa desde el inicio por la glucemia casi normal", "clave", "Corrige la cetosis sin hipoglucemia."),
      mg("potasio", "Reponer potasio según controles", "clave", "Baja al dar insulina."),
      mg("atb", "Antibiótico para la infección urinaria", "util", "Desencadenante."),
      mg("sin-insulina", "No dar insulina porque la glucemia no es tan alta", "riesgoso", "La cetosis progresa."),
      mg("bicarbonato", "Bicarbonato de rutina", "riesgoso", "Sin beneficio con pH mayor de 7 y empeora la oxigenación fetal."),
    ],
  },
  debrief: {
    diagnosis: "Cetoacidosis diabética casi euglucémica en embarazada de 26 semanas con DM1, precipitada por corticoides, infección urinaria y reducción de insulina.",
    pathologies: [
      { name: "Cetoacidosis diabética en el embarazo", role: "principal", why: "Emergencia materno-fetal." },
      { name: "Infección urinaria y corticoides", role: "asociada", why: "Desencadenantes." },
      { name: "Hiperemesis, preeclampsia", role: "diferencial", why: "Otras causas de vómitos." },
    ],
    reasoning: [
      "Causa: déficit de insulina con aumento de hormonas contrarreguladoras y corticoides.",
      "Mecanismo: el embarazo favorece la cetogénesis y la alcalosis respiratoria reduce el bicarbonato.",
      "Consecuencia: acidosis con glucemias más bajas y sufrimiento fetal.",
    ],
    epidemiology:
      "La cetoacidosis aparece en una minoría de embarazadas con diabetes pero tiene alta mortalidad fetal. En el embarazo puede ocurrir con glucemias menores de 250. Los corticoides para maduración pulmonar y los betamiméticos son desencadenantes conocidos.",
    management: [
      "Gases y cetonas.",
      "Fluidos e insulina con dextrosa.",
      "Potasio.",
      "Monitoreo fetal.",
    ],
    sources: ["Sociedad Argentina de Diabetes — Diabetes y embarazo.", "ACOG — Practice Bulletin on Pregestational Diabetes Mellitus."],
    pearls: ["En el embarazo, cetoacidosis con glucemia casi normal.", "Corticoides suben la glucemia.", "Tratar a la madre trata al feto."],
    pitfalls: ["No dar insulina.", "Cesárea con la madre inestable."],
    tribunal: [
      qa("¿Por qué el embarazo favorece la cetoacidosis?", "Por resistencia a la insulina, mayor lipólisis y menor bicarbonato por la alcalosis respiratoria."),
      qa("¿Qué se hace con la insulina si recibe corticoides?", "Aumentarla de forma anticipada y controlar glucemias más seguido."),
      qa("¿Qué pasa con el monitoreo fetal al corregir la acidosis?", "Suele mejorar; por eso no se decide cesárea antes de estabilizar."),
    ],
  },
};
