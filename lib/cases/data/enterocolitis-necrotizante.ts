import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const enterocolitisNecrotizante: ClinicalCase = {
  id: "enterocolitis-necrotizante",
  level: 4,
  area: "Pediatría",
  setting: "Internación",
  patient: { age: 12, ageUnit: "días", sex: "F", context: "Pretérmino de 29 semanas, alimentada con fórmula, con aumento rápido de volúmenes." },
  frequency: "poco-frecuente",
  intro: "Enfermería avisa: “Dejó residuo verde, tiene la panza distendida, hizo una deposición con sangre y hace apneas”.",
  vitals: { FC: "178 lpm", FR: "58 rpm", "T°": "36 °C", "SatO₂": "88 %", Peso: "1,28 kg", Glucemia: "48 mg/dl" },
  anamnesis: [
    act("alimentacion", "¿Cómo la alimentan? ¿Hubo cambios?", "clave", "“Fórmula, duplicamos el volumen en dos días.”", "Prematurez y fórmula: mayores factores de riesgo."),
    act("residuo", "¿Cómo son los residuos y las deposiciones?", "clave", "“Biliosos y con sangre.”", "Signos clásicos."),
    act("hemodinamia", "¿Tuvo apneas, cambios de color?", "clave", "“Más apneas, se puso gris.”", "Signos sistémicos."),
    act("ductus", "¿Tuvo ductus o indometacina?", "util", "“Ductus con ibuprofeno.”", "Isquemia y fármacos."),
    act("atb", "¿Antibióticos prolongados?", "util", "“Sí, al nacer.”", "Altera microbiota."),
    act("hermano", "¿Tiene hermanos?", "neutro", "“Uno.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Muy distendido, doloroso, pared roja y brillante, sin ruidos.", "Sugiere peritonitis."),
    act("perfusion", "Perfusión", "clave", "Relleno de 4 segundos, marmórea.", "Shock."),
    act("sangre", "Heces", "util", "Sangre macroscópica.", "Lesión mucosa."),
  ],
  studies: [
    study("Imágenes", "rx", "Radiografía de abdomen seriada, con decúbito lateral", "clave", "Neumatosis intestinal, gas portal; sin aire libre aún.", "Signos de Bell II-III."),
    study("Laboratorio", "lab", "Hemograma, plaquetas, PCR, gases, hemocultivos, coagulación", "clave", "Plaquetas 68.000, acidosis metabólica, leucopenia.", "Gravedad."),
    study("Imágenes", "eco", "Ecografía abdominal", "util", "Gas en pared, líquido complejo.", "Complementa."),
    study("Imágenes", "contraste", "Enema baritado", "riesgoso", "No se realizó.", "Riesgo de perforación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("nec", "Enterocolitis necrotizante (Bell II-III) con shock", true, "Prematura con fórmula, residuos biliosos, sangre, neumatosis, gas portal y plaquetopenia."),
      dx("sepsis", "Sepsis neonatal aislada", false, "Puede coexistir, pero la neumatosis define."),
      dx("malrotacion", "Malrotación con vólvulo", false, "Puede dar bilis, sin neumatosis típica ni contexto."),
      dx("alergia", "Alergia a la proteína de leche", false, "No da neumatosis ni shock."),
      dx("hirschsprung", "Enfermedad de Hirschsprung", false, "No en esta presentación, y es de término en general."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("ayuno", "Suspender alimentación, sonda orogástrica y nutrición parenteral", "clave", "Reposo intestinal."),
      mg("atb", "Antibióticos de amplio espectro con anaerobios", "clave", "Cubre translocación."),
      mg("soporte", "Soporte: líquidos, vasopresores, respirador, transfusión de plaquetas", "clave", "Shock."),
      mg("cirugia", "Interconsulta con cirugía infantil, y operar si hay perforación", "clave", "Aire libre o falla al tratamiento."),
      mg("sigue", "Seguir alimentando en menor volumen", "riesgoso", "Empeora la isquemia."),
      mg("lactancia", "Promover leche humana para la recuperación y la prevención", "util", "Principal factor protector."),
    ],
  },
  debrief: {
    diagnosis: "Enterocolitis necrotizante con neumatosis y gas portal, shock y plaquetopenia, en recién nacida prematura de 29 semanas alimentada con fórmula.",
    pathologies: [
      { name: "Enterocolitis necrotizante", role: "principal", why: "Necrosis inflamatoria intestinal del prematuro." },
      { name: "Shock y plaquetopenia", role: "asociada", why: "Gravedad." },
      { name: "Sepsis, malrotación, alergia", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: prematurez, fórmula, isquemia, disbiosis.",
      "Mecanismo: barrera inmadura, bacterias que invaden la pared y gas intramural.",
      "Consecuencia: necrosis, perforación, sepsis y síndrome de intestino corto.",
    ],
    epidemiology:
      "Es la urgencia digestiva más frecuente en prematuros, sobre todo los de muy bajo peso, con mortalidad de hasta 20 a 30 % en casos quirúrgicos. La leche humana es la principal medida protectora, junto con avances graduales de la alimentación.",
    management: [
      "Reposo intestinal y antibióticos.",
      "Radiografías seriadas.",
      "Cirugía si hay perforación o deterioro.",
      "Prevención: leche humana.",
    ],
    sources: ["Sociedad Argentina de Pediatría — Recomendaciones de neonatología.", "Ministerio de Salud de la Nación — Guía de seguimiento del recién nacido de riesgo."],
    pearls: ["Residuo bilioso en un prematuro: alarma.", "Neumatosis = signo clave.", "Leche humana protege."],
    pitfalls: ["Seguir alimentando.", "Hacer contraste."],
    tribunal: [
      qa("¿Qué son los estadios de Bell?", "I: sospecha, signos inespecíficos. II: definida, con neumatosis. III: avanzada, con shock y peritonitis o perforación."),
      qa("¿Cuál es la indicación absoluta de cirugía?", "El neumoperitoneo. También se considera en deterioro clínico pese al tratamiento."),
      qa("¿Qué secuelas deja?", "Estenosis intestinal, síndrome de intestino corto y alteraciones del neurodesarrollo."),
    ],
  },
};
