import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const anemiaPerniciosa: ClinicalCase = {
  id: "anemia-megaloblastica-perniciosa",
  level: 2,
  area: "Hematología",
  setting: "Consultorio",
  patient: { age: 57, ageUnit: "años", sex: "F", context: "Vitíligo e hipotiroidismo autoinmune. No toma metformina ni es vegetariana." },
  frequency: "frecuente",
  intro: "“Estoy muy cansada, me hormiguean los pies y me duele la lengua. Hace meses camino como borracha.”",
  vitals: { TA: "116/70 mmHg", FC: "96 lpm", "T°": "36,6 °C", "SatO₂": "98 %", Peso: "60 kg" },
  anamnesis: [
    act("neuro", "¿Hormigueo, torpeza, problemas de memoria?", "clave", "“Hormigueo y olvidos.”", "Mielopatía y cognitivo."),
    act("dieta", "¿Qué comés? ¿Cirugías del estómago?", "clave", "“De todo; sin cirugías.”", "Otras causas."),
    act("autoinmune", "¿Vitíligo, tiroides, diabetes tipo 1?", "clave", "“Vitíligo y tiroides.”", "Asociación."),
    act("farmacos", "¿Metformina, IBP, óxido nitroso?", "util", "“No.”", "Otras causas."),
    act("alcohol", "¿Alcohol?", "util", "“No.”", "Otros."),
    act("pasion", "¿Qué te gusta cocinar?", "neutro", "“Empanadas.”", "No orienta."),
  ],
  exam: [
    act("lengua", "Lengua y piel", "clave", "Glositis lisa y dolorosa; ictericia leve.", "Hunter."),
    act("neuro-ex", "Vibración, propiocepción y reflejos", "clave", "Vibración abolida, Babinski, Romberg positivo.", "Degeneración combinada."),
    act("palidez", "Palidez", "util", "Pálida, con vitíligo.", "Anemia."),
  ],
  studies: [
    study("Laboratorio", "hemograma", "Hemograma con frotis", "clave", "Hb 7,6; VCM 118; neutrófilos hipersegmentados.", "Megaloblástica."),
    study("Laboratorio", "b12", "B12, folato, ácido metilmalónico", "clave", "B12 110; ácido metilmalónico alto.", "Confirma déficit."),
    study("Laboratorio", "anti", "Anticuerpos anti-factor intrínseco y anticélula parietal", "clave", "Positivos.", "Autoinmune."),
    study("Otros", "veda", "Endoscopía con biopsia", "clave", "Gastritis atrófica del cuerpo.", "Riesgo gástrico."),
    study("Otros", "mo", "Biopsia de médula de rutina", "innecesario", "No se realizó.", "Causa clara."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("perniciosa", "Anemia perniciosa con degeneración combinada subaguda", true, "Macrocitosis, B12 baja, anticuerpo anti-FI, y mielopatía."),
      dx("folato", "Déficit de folato", false, "Folato normal, y no da mielopatía."),
      dx("mds", "Mielodisplasia", false, "Causa clara."),
      dx("ms", "Esclerosis múltiple", false, "Hay anemia con déficit de B12."),
      dx("hipotiroidismo", "Macrocitosis por hipotiroidismo", false, "No explica el resto."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("b12", "Cobalamina IM con carga, luego mantenimiento de por vida", "clave", "Sin factor intrínseco."),
      mg("potasio", "Control de potasio al inicio", "clave", "Puede caer con la reposición."),
      mg("endo", "Vigilancia endoscópica", "clave", "Cáncer gástrico y carcinoide."),
      mg("rehab", "Rehabilitación neurológica", "util", "Secuelas."),
      mg("folato-solo", "Ácido fólico sin B12", "riesgoso", "Empeora la neuropatía."),
      mg("transfundir", "Transfundir de rutina", "riesgoso", "Riesgo de sobrecarga con anemia crónica compensada."),
    ],
  },
  debrief: {
    diagnosis: "Anemia perniciosa con degeneración combinada subaguda de médula, en mujer de 57 años con autoinmunidad.",
    pathologies: [
      { name: "Anemia perniciosa", role: "principal", why: "Déficit autoinmune de B12." },
      { name: "Degeneración combinada", role: "asociada", why: "Secuela." },
      { name: "Folato, mielodisplasia, EM", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: anticuerpos contra células parietales y factor intrínseco.",
      "Mecanismo: sin factor intrínseco no se absorbe B12.",
      "Consecuencia: anemia, neuropatía y mielopatía.",
    ],
    epidemiology:
      "Es la principal causa de déficit de B12 en adultos mayores y se asocia a otras enfermedades autoinmunes. Es más frecuente en mujeres. Hay riesgo aumentado de cáncer gástrico y tumores carcinoides. Si se demora el tratamiento, las secuelas neurológicas pueden ser permanentes.",
    management: [
      "VCM y frotis.",
      "B12 y anticuerpos.",
      "Cobalamina IM.",
      "Vigilancia.",
    ],
    sources: ["Sociedad Argentina de Hematología — Anemias megaloblásticas.", "British Society for Haematology — Cobalamin and Folate Disorders Guideline."],
    pearls: ["Hipersegmentados.", "Ácido fólico solo no.", "B12 de por vida."],
    pitfalls: ["No buscar neuropatía.", "Solo fólico."],
    tribunal: [
      qa("¿Cómo se clasifican las anemias por VCM?", "Microcítica: ferropenia y talasemia. Normocítica: crónica o aguda. Macrocítica: megaloblástica, hipotiroidismo y alcohol."),
      qa("¿Cómo diferencia B12 y folato?", "En déficit de B12 suben homocisteína y ácido metilmalónico; en folato solo sube homocisteína."),
      qa("¿Qué respuesta esperás a los días?", "Reticulocitosis entre los días 5 y 7."),
    ],
  },
};
