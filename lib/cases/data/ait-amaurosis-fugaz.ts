import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const aitAmaurosisFugaz: ClinicalCase = {
  id: "ait-amaurosis-fugaz",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 72, ageUnit: "años", sex: "F", context: "Hipertensa y dislipémica. Ex fumadora." },
  frequency: "frecuente",
  intro: "“Esta mañana se me nubló la vista del ojo izquierdo como si bajara una cortina, duró cinco minutos y se fue.”",
  vitals: { TA: "158/88 mmHg", FC: "74 lpm", "T°": "36,4 °C", "SatO₂": "97 %", Glucemia: "102 mg/dl" },
  anamnesis: [
    act("vision", "¿Cómo fue la pérdida de visión?", "clave", "“Como una cortina que bajó en el ojo izquierdo.”", "Amaurosis fugaz monocular."),
    act("duracion", "¿Cuánto duró?", "clave", "“Cinco minutos.”", "Transitorio."),
    act("otros", "¿Debilidad, hormigueo o dificultad para hablar?", "clave", "“No.”", "Sin otros territorios."),
    act("cefalea", "¿Dolor de cabeza o al masticar?", "util", "“No.”", "Arteritis temporal."),
    act("previos", "¿Le pasó antes?", "util", "“Hace dos semanas, más corto.”", "Recurrente."),
    act("hobby", "¿Qué le gusta?", "neutro", "“Hacer crucigramas.”", "No orienta."),
  ],
  exam: [
    act("soplo", "Auscultación carotídea", "clave", "Soplo carotídeo izquierdo.", "Estenosis."),
    act("fondo", "Fondo de ojo", "clave", "Émbolo brillante de colesterol en una rama arterial izquierda.", "Placa de Hollenhorst."),
    act("neuro", "Examen neurológico", "util", "Normal.", "Sin déficit."),
  ],
  studies: [
    study("Imágenes", "doppler", "Doppler carotídeo", "clave", "Estenosis del 80 % de la carótida interna izquierda.", "Causa."),
    study("Imágenes", "tc", "TC o RM de cerebro", "clave", "Sin infartos.", "Base."),
    study("Laboratorio", "vsg", "VSG y PCR", "util", "Normales.", "Excluye arteritis."),
    study("Otros", "alta", "Alta con control en un mes", "riesgoso", "No se dio.", "Alto riesgo de ACV en los primeros días."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ait-retina", "AIT retiniano (amaurosis fugaz) por estenosis carotídea izquierda sintomática", true, "Pérdida monocular transitoria en cortina, soplo, émbolo de colesterol y estenosis del 80 %."),
      dx("migrana", "Aura migrañosa", false, "Monocular, sin cefalea ni fenómenos positivos."),
      dx("desprendimiento", "Desprendimiento de retina", false, "Fue transitorio."),
      dx("arteritis", "Arteritis temporal", false, "VSG normal."),
      dx("oclusion-retina", "Oclusión de arteria central de la retina", false, "Se resolvió."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("endarterectomia", "Endarterectomía carotídea en las primeras 2 semanas", "clave", "Estenosis sintomática mayor del 70 %."),
      mg("antiagregacion", "Antiagregación y estatina de alta intensidad", "clave", "Prevención."),
      mg("internacion", "Internar o estudiar en forma inmediata", "clave", "Riesgo temprano."),
      mg("presion", "Control de presión", "util", "Factor de riesgo."),
      mg("anticoagular", "Anticoagulación", "riesgoso", "No es cardioembólico."),
      mg("esperar-cirugia", "Esperar tres meses para operar", "riesgoso", "El beneficio cae con la demora."),
    ],
  },
  debrief: {
    diagnosis: "AIT retiniano (amaurosis fugaz) por estenosis carotídea izquierda sintomática del 80 %, en mujer de 72 años.",
    pathologies: [
      { name: "Amaurosis fugaz", role: "principal", why: "AIT de la arteria oftálmica." },
      { name: "Estenosis carotídea aterosclerótica", role: "asociada", why: "Fuente de émbolos." },
      { name: "Migraña, arteritis", role: "diferencial", why: "Otras pérdidas transitorias de visión." },
    ],
    reasoning: [
      "Causa: placa aterosclerótica en la carótida interna.",
      "Mecanismo: émbolos que ocluyen transitoriamente la arteria oftálmica.",
      "Consecuencia: ceguera monocular transitoria y riesgo de ACV.",
    ],
    epidemiology:
      "La amaurosis fugaz es un AIT y anuncia un riesgo alto de ACV, sobre todo en los primeros días. La estenosis carotídea sintomática del 70 al 99 % se beneficia de cirugía temprana. Muchos pacientes no consultan porque se les pasó.",
    management: [
      "Tratar como AIT.",
      "Doppler.",
      "Cirugía temprana.",
      "Prevención secundaria.",
    ],
    sources: ["Sociedad Neurológica Argentina — Ataque isquémico transitorio.", "ESVS — Management of Atherosclerotic Carotid and Vertebral Artery Disease Guidelines."],
    pearls: ["Cortina que baja en un ojo: carótida.", "Es un AIT.", "Operar pronto."],
    pitfalls: ["Alta sin estudio.", "Anticoagular."],
    tribunal: [
      qa("¿Qué es la placa de Hollenhorst?", "Émbolo de colesterol brillante en una arteriola retiniana."),
      qa("¿Qué es el ABCD2?", "Escala de riesgo de ACV tras un AIT: edad, presión, clínica, duración y diabetes."),
      qa("¿Cuándo se opera una estenosis asintomática?", "En casos seleccionados con estenosis grave y bajo riesgo quirúrgico."),
    ],
  },
};
