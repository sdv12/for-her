import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const malaria: ClinicalCase = {
  id: "malaria-importada",
  level: 3,
  area: "Infectología",
  setting: "Guardia",
  patient: { age: 39, ageUnit: "años", sex: "M", context: "Ingeniero. Volvió hace 10 días de trabajar 2 meses en Angola. No tomó profilaxis." },
  frequency: "raro",
  intro: "“Tengo fiebre muy alta con escalofríos que me hacen temblar, dolor de cabeza y estoy muy débil.”",
  vitals: { TA: "104/64 mmHg", FC: "116 lpm", FR: "22 rpm", "T°": "40,1 °C", "SatO₂": "96 %", Glucemia: "68 mg/dl" },
  anamnesis: [
    act("viaje", "¿Viajó en el último año? ¿Dónde?", "clave", "“Dos meses en Angola.”", "Zona de P. falciparum."),
    act("profilaxis", "¿Tomó profilaxis o usó repelente?", "clave", "“Nada.”", "Sin protección."),
    act("fiebre", "¿Cómo es la fiebre?", "clave", "“Con escalofríos fuertes, transpiro y vuelve.”", "Paroxismos."),
    act("orina", "¿Orina oscura o poca?", "util", "“Más oscura.”", "Hemólisis o falla renal."),
    act("confusion", "¿Confusión o convulsiones?", "util", "“Un poco confundido hoy.”", "Malaria cerebral."),
    act("obra", "¿Qué construía?", "neutro", "“Un puente.”", "No orienta."),
  ],
  exam: [
    act("ictericia", "Piel y escleras", "clave", "Subictericia.", "Hemólisis."),
    act("bazo", "Bazo", "clave", "Esplenomegalia leve.", "Malaria."),
    act("neuro", "Examen neurológico", "util", "Desorientado, sin rigidez de nuca.", "Gravedad."),
  ],
  studies: [
    study("Laboratorio", "gota", "Gota gruesa y frotis, test rápido", "clave", "Plasmodium falciparum, parasitemia 6 %.", "Malaria grave."),
    study("Laboratorio", "lab", "Hemograma, glucemia, creatinina, bilirrubina, lactato", "clave", "Hb 9; plaquetas 40.000; creatinina 2,1; glucemia 68.", "Criterios de gravedad."),
    study("Microbiología", "hemocultivos", "Hemocultivos", "util", "Negativos.", "Coinfección."),
    study("Laboratorio", "esperar-serologia", "Esperar serología de dengue para decidir", "riesgoso", "No se esperó.", "Malaria por falciparum puede matar en horas."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("malaria-grave", "Malaria grave por Plasmodium falciparum importada de África", true, "Viaje a Angola sin profilaxis, fiebre con escalofríos, parasitemia del 6 %, alteración de conciencia, IRA e hipoglucemia."),
      dx("dengue", "Dengue", false, "Gota gruesa positiva."),
      dx("tifoidea", "Fiebre tifoidea", false, "Parásitos en sangre."),
      dx("leptospirosis", "Leptospirosis", false, "Parásitos en sangre."),
      dx("vivax", "Malaria por vivax no complicada", false, "Es falciparum con criterios de gravedad."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("artesunato", "Artesunato EV", "clave", "Elección en malaria grave."),
      mg("uti", "Terapia intensiva", "clave", "Falla orgánica."),
      mg("glucosa", "Corregir la hipoglucemia", "clave", "Frecuente en malaria grave."),
      mg("notificar", "Notificación inmediata", "util", "Argentina está libre de transmisión local."),
      mg("cloroquina", "Cloroquina oral", "riesgoso", "Resistencia y no sirve en grave."),
      mg("ambulatorio", "Manejo ambulatorio", "riesgoso", "Mortalidad alta."),
    ],
  },
  debrief: {
    diagnosis: "Malaria grave por Plasmodium falciparum importada de Angola, con alteración de conciencia, insuficiencia renal e hipoglucemia, en varón de 39 años.",
    pathologies: [
      { name: "Malaria grave por falciparum", role: "principal", why: "Infección parasitaria potencialmente mortal." },
      { name: "Falla renal, hemólisis, hipoglucemia", role: "asociada", why: "Criterios de gravedad." },
      { name: "Dengue, tifoidea", role: "diferencial", why: "Fiebre en el viajero." },
    ],
    reasoning: [
      "Causa: picadura de Anopheles infectado en África.",
      "Mecanismo: los glóbulos rojos parasitados se adhieren a los capilares y se destruyen.",
      "Consecuencia: anemia, falla renal, compromiso cerebral y muerte.",
    ],
    epidemiology:
      "Argentina fue certificada libre de malaria en 2019; los casos actuales son importados. Falciparum de África es la forma más grave. Ante fiebre en un viajero se pide gota gruesa el mismo día.",
    management: [
      "Preguntar por viajes.",
      "Gota gruesa.",
      "Artesunato.",
      "Notificar.",
    ],
    sources: ["Ministerio de Salud de la Nación — Guía de paludismo.", "OMS — Guidelines for Malaria."],
    pearls: ["Fiebre y viaje: gota gruesa.", "Falciparum mata rápido.", "Artesunato."],
    pitfalls: ["No preguntar por viajes.", "Cloroquina."],
    tribunal: [
      qa("¿Qué especies de Plasmodium dan recaídas?", "Vivax y ovale, por los hipnozoítos hepáticos; se agrega primaquina."),
      qa("¿Qué profilaxis se usa en zonas de falciparum?", "Atovacuona-proguanil, doxiciclina o mefloquina, más repelentes."),
      qa("¿Qué define malaria grave?", "Parasitemia alta, compromiso neurológico, falla renal, acidosis, hipoglucemia, anemia grave o shock."),
    ],
  },
};
