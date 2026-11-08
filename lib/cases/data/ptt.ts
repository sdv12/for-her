import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const ptt: ClinicalCase = {
  id: "purpura-trombotica-trombocitopenica",
  level: 4,
  area: "Hematología",
  setting: "Guardia",
  patient: { age: 37, ageUnit: "años", sex: "F", context: "Docente, sana. Hace una semana se sentía con gripe." },
  frequency: "raro",
  intro: "“Tengo moretones, estoy muy cansada y hoy se me durmió el brazo derecho y me costó hablar por unos minutos.”",
  vitals: { TA: "128/78 mmHg", FC: "102 lpm", FR: "20 rpm", "T°": "37,9 °C", "SatO₂": "98 %" },
  anamnesis: [
    act("neuro", "¿Cuánto duró? ¿Volvió a pasar?", "clave", "“Unos minutos; dos veces.”", "Déficit fluctuante."),
    act("diarrea", "¿Diarrea con sangre?", "clave", "“No.”", "SUH."),
    act("farmacos", "¿Remedios, embarazo o quimioterapia?", "clave", "“Nada.”", "Otras causas."),
    act("orina", "¿Orina oscura?", "util", "“Sí, a veces.”", "Hemólisis."),
    act("vih", "¿Prueba de VIH?", "util", "“No.”", "Asociación."),
    act("cursos", "¿Qué grado das?", "neutro", "“Tercero.”", "No orienta."),
  ],
  exam: [
    act("piel", "Piel y mucosas", "clave", "Petequias, equimosis, ictericia leve.", "Plaquetas bajas y hemólisis."),
    act("neuro-ex", "Examen neurológico", "clave", "Sin déficit en este momento.", "Fluctúa."),
    act("abdomen", "Bazo y abdomen", "util", "Sin esplenomegalia.", "Excluye otras."),
  ],
  studies: [
    study("Laboratorio", "frotis", "Hemograma con frotis", "clave", "Hb 8,1; plaquetas 14.000; esquistocitos.", "Anemia hemolítica microangiopática."),
    study("Laboratorio", "lab", "LDH, bilirrubina, Coombs, coagulograma, creatinina", "clave", "LDH 1.450; Coombs negativo; coagulación normal; creatinina 1,1.", "No es CID."),
    study("Laboratorio", "adamts", "Actividad de ADAMTS13, extraída antes del plasma", "clave", "Menor de 5 %, inhibidor positivo.", "Confirma."),
    study("Otros", "plaquetas", "Transfundir plaquetas para el número", "riesgoso", "No se realizó.", "Puede empeorar la trombosis."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ptt", "Púrpura trombótica trombocitopénica inmune", true, "Anemia microangiopática, trombocitopenia, síntomas neurológicos y ADAMTS13 menor de 5 %."),
      dx("pti", "PTI", false, "No tiene hemólisis."),
      dx("cid", "CID", false, "Coagulación normal."),
      dx("evans", "Síndrome de Evans", false, "Coombs negativo."),
      dx("suh", "SUH", false, "Sin diarrea, y compromiso renal leve."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("plasmaferesis", "Recambio plasmático urgente", "clave", "Reduce la mortalidad de cerca de 90 % a 10 a 20 %."),
      mg("corticoide", "Corticoides y rituximab", "clave", "Inmunosupresión."),
      mg("uti", "Terapia intensiva", "clave", "Riesgo de muerte súbita."),
      mg("plasma", "Plasma fresco si hay demora del recambio", "util", "Puente."),
      mg("plaquetas-mal", "Plaquetas de entrada", "riesgoso", "Aumenta la trombosis."),
      mg("alta", "Alta con hematología en una semana", "riesgoso", "Letal."),
    ],
  },
  debrief: {
    diagnosis: "Púrpura trombótica trombocitopénica inmune con déficit neurológico fluctuante, en mujer de 37 años.",
    pathologies: [
      { name: "PTT", role: "principal", why: "Microangiopatía por déficit de ADAMTS13." },
      { name: "Hemólisis y AIT recurrentes", role: "asociada", why: "Consecuencias." },
      { name: "PTI, CID, SUH", role: "diferencial", why: "Otras trombocitopenias." },
    ],
    reasoning: [
      "Causa: autoanticuerpos contra ADAMTS13.",
      "Mecanismo: multímeros grandes de von Willebrand forman trombos plaquetarios.",
      "Consecuencia: anemia hemolítica, plaquetopenia, isquemia.",
    ],
    epidemiology:
      "Es rara, predomina en mujeres jóvenes y puede desencadenarse por infecciones, embarazo o VIH. Sin tratamiento la mortalidad supera el 90 %. Hay que sospecharla ante plaquetopenia con esquistocitos: el recambio plasmático no debe esperar el resultado de ADAMTS13.",
    management: [
      "Frotis ante plaquetopenia.",
      "Extraer antes del plasma.",
      "Recambio plasmático.",
      "Evitar plaquetas.",
    ],
    sources: ["Sociedad Argentina de Hematología — Microangiopatías trombóticas.", "ISTH — Guidelines for TTP."],
    pearls: ["Esquistocitos con plaquetas bajas.", "Coombs y coagulación normales.", "Plaquetas no."],
    pitfalls: ["Esperar el ADAMTS13.", "Transfundir plaquetas."],
    tribunal: [
      qa("¿Qué péntada clásica tiene la PTT?", "Fiebre, anemia hemolítica, plaquetopenia, síntomas neurológicos y compromiso renal; rara vez aparecen las cinco."),
      qa("¿Qué es el score PLASMIC?", "Una herramienta que estima probabilidad de déficit grave de ADAMTS13."),
      qa("¿En qué se diferencia del SUH típico?", "El SUH se asocia a diarrea por E. coli productora de Shiga y falla renal importante, sobre todo en niños."),
    ],
  },
};
