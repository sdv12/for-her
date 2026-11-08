import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ectopicoRotoDiu: ClinicalCase = {
  id: "embarazo-ectopico-roto-diu",
  level: 3,
  area: "Ginecología y obstetricia",
  setting: "Guardia",
  patient: { age: 37, ageUnit: "años", sex: "F", context: "Tiene DIU de cobre hace 4 años. Atraso de 6 semanas. Llega en ambulancia." },
  frequency: "frecuente",
  intro: "“Me dio un dolor terrible en la parte baja de la panza, me desmayé en el baño. Tengo un sangrado chiquito y me duele el hombro.”",
  vitals: { TA: "78/44 mmHg", FC: "136 lpm", FR: "26 rpm", "T°": "36,1 °C", "SatO₂": "96 %", Glasgow: "14/15" },
  anamnesis: [
    act("atraso", "¿Cuándo menstruaste?", "clave", "“Hace 8 semanas.”", "Atraso."),
    act("dolor", "¿Cómo empezó el dolor? ¿Al hombro?", "clave", "“De golpe; el hombro.”", "Irritación diafragmática."),
    act("riesgo", "¿DIU, EPI o cirugías de trompas?", "clave", "“DIU y una infección hace años.”", "Factores."),
    act("rh", "¿Grupo y factor?", "util", "“A negativo.”", "Anti-D."),
    act("anticoagulantes", "¿Remedios?", "util", "“No.”", "Sangrado."),
    act("hijos", "¿Cuántos hijos?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, con defensa y Blumberg.", "Hemoperitoneo."),
    act("perfusion", "Perfusión", "clave", "Fría, pálida, confusa.", "Shock."),
    act("gineco", "Especuloscopía breve", "util", "Sangrado escaso, hilos del DIU visibles.", "Sin demorar."),
  ],
  studies: [
    study("Laboratorio", "hcg", "Beta-hCG rápida", "clave", "Positiva.", "Embarazo."),
    study("Imágenes", "fast", "Ecografía FAST al lado de la cama", "clave", "Líquido libre; útero vacío.", "Confirma."),
    study("Laboratorio", "grupo", "Grupo, Hb, coagulograma, transfusión", "clave", "Hb 6,4; A negativo.", "Preparar sangre."),
    study("Imágenes", "tc", "TC de abdomen antes de operar", "riesgoso", "No se realizó.", "Inestable: quirófano."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ectopico", "Embarazo ectópico roto con shock hemorrágico", true, "Atraso, DIU, dolor súbito, hCG positiva, líquido libre y shock."),
      dx("quiste", "Quiste ovárico roto", false, "hCG positiva y shock."),
      dx("apendicitis", "Apendicitis", false, "Sin líquido hemático ni hCG."),
      dx("aborto", "Aborto incompleto", false, "No da hemoperitoneo."),
      dx("torsion", "Torsión ovárica", false, "No da shock hemorrágico."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("cirugia", "Cirugía de urgencia (salpingectomía)", "clave", "Detiene el sangrado."),
      mg("reanimar", "Dos vías, sangre y protocolo de transfusión masiva", "clave", "Shock."),
      mg("rh", "Inmunoglobulina anti-D", "clave", "Factor negativo."),
      mg("diu", "Retirar DIU y consejería anticonceptiva", "util", "Después."),
      mg("mtx", "Metotrexato", "riesgoso", "Contraindicado en rotura e inestabilidad."),
      mg("expectante", "Observación y hCG en 48 horas", "riesgoso", "Mortal."),
    ],
  },
  debrief: {
    diagnosis: "Embarazo ectópico roto con hemoperitoneo y shock hemorrágico, en mujer de 37 años con DIU.",
    pathologies: [
      { name: "Embarazo ectópico roto", role: "principal", why: "Rotura tubárica." },
      { name: "Shock hemorrágico", role: "asociada", why: "Complicación." },
      { name: "Quiste, apendicitis, aborto", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: daño tubario e implantación en la trompa.",
      "Mecanismo: la trompa se rompe.",
      "Consecuencia: hemoperitoneo y shock.",
    ],
    epidemiology:
      "Es la principal causa de muerte materna en el primer trimestre. El DIU reduce el riesgo de embarazo, pero cuando este ocurre aumenta la probabilidad de que sea ectópico. Toda mujer en edad fértil con dolor o síncope requiere una prueba de embarazo inmediata.",
    management: [
      "hCG.",
      "FAST.",
      "Quirófano.",
      "Anti-D y anticoncepción.",
    ],
    sources: ["FASGO — Consenso de embarazo ectópico.", "ACOG — Practice Bulletin on Tubal Ectopic Pregnancy."],
    pearls: ["Mujer fértil con síncope: hCG.", "Dolor de hombro: sangre bajo el diafragma.", "Shock: quirófano."],
    pitfalls: ["Descartar embarazo por el DIU.", "Pedir TC."],
    tribunal: [
      qa("¿Qué define el umbral discriminatorio?", "Nivel de beta-hCG, cerca de 1.500 a 3.500 mUI/ml, en el que debería verse el saco por ecografía transvaginal."),
      qa("¿Cuáles son los criterios para metotrexato?", "Estabilidad, sin rotura, hCG baja, masa menor de 3,5 cm y sin latidos, con función hepática y renal normales."),
      qa("¿Dónde es más frecuente?", "En la ampolla de la trompa de Falopio."),
    ],
  },
};
