import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cancerOvario: ClinicalCase = {
  id: "cancer-de-ovario",
  level: 3,
  area: "Oncología",
  setting: "Consultorio",
  patient: { age: 58, ageUnit: "años", sex: "F", context: "Sin hijos. Su madre y su tía tuvieron cáncer de mama antes de los 50." },
  frequency: "poco-frecuente",
  intro: "“Hace meses tengo la panza hinchada, me lleno enseguida y orino seguido. Me dijeron que era colon irritable, pero el pantalón ya no me cierra.”",
  vitals: { TA: "122/76 mmHg", FC: "88 lpm", FR: "20 rpm", "T°": "36,6 °C", "SatO₂": "96 %", Peso: "61 kg" },
  anamnesis: [
    act("sintomas", "¿Desde cuándo? ¿Son diarios?", "clave", "“Hace 5 meses, todos los días.”", "Síntomas persistentes de inicio reciente en esta edad son señal de alerta."),
    act("familia", "¿Cáncer de mama u ovario en la familia? ¿A qué edad?", "clave", "“Mamá y tía, antes de los 50.”", "Sugiere mutación BRCA."),
    act("hormonal", "¿Embarazos, anticonceptivos, menopausia?", "clave", "“Sin embarazos; nunca tomé pastillas.”", "Más ciclos ovulatorios aumentan el riesgo; los anticonceptivos protegen."),
    act("peso", "¿Bajaste de peso?", "util", "“Sí, aunque tengo más panza.”", "Consunción con ascitis."),
    act("digestivo", "¿Sangrado, cambios de ritmo?", "util", "“Constipación.”", "Diferencial digestivo."),
    act("planta", "¿Te gustan las plantas?", "neutro", "“Sí.”", "No orienta."),
  ],
  exam: [
    act("abdomen", "Abdomen", "clave", "Distendido, matidez que cambia con la posición, masa en epiplón.", "Ascitis y carcinomatosis."),
    act("pelvico", "Tacto bimanual y rectovaginal", "clave", "Masa anexial derecha fija, irregular, nódulos en fondo de saco.", "Sospecha de malignidad."),
    act("pleura", "Tórax y ganglios", "util", "Matidez basal derecha, sin adenopatías.", "Derrame pleural."),
  ],
  studies: [
    study("Imágenes", "eco", "Ecografía transvaginal", "clave", "Masa compleja de 11 cm, con áreas sólidas y flujo, y ascitis.", "Criterios de malignidad."),
    study("Laboratorio", "ca125", "CA-125 y marcadores", "clave", "CA-125 de 1.400 U/ml.", "Apoya, y sirve para seguimiento; no se usa para tamizaje."),
    study("Imágenes", "tac", "TC de tórax, abdomen y pelvis", "clave", "Implantes peritoneales, epiplón, derrame pleural.", "Estadificación."),
    study("Otros", "ascitis", "Paracentesis con citología", "util", "Células de adenocarcinoma.", "Confirma diseminación."),
    study("Otros", "punzar", "Punción transvaginal de la masa", "riesgoso", "No se realizó.", "Puede diseminar un tumor limitado."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("ovario", "Carcinoma de ovario avanzado con carcinomatosis peritoneal", true, "Síntomas inespecíficos persistentes, masa compleja, ascitis, CA-125 alto e implantes."),
      dx("sii", "Colon irritable", false, "Hay masa y ascitis, en una mujer mayor con síntomas nuevos."),
      dx("cirrosis", "Cirrosis con ascitis", false, "No hay estigmas, y la citología es positiva."),
      dx("krukenberg", "Tumor de Krukenberg", false, "Es un diferencial; sin tumor digestivo primario."),
      dx("quiste", "Quiste de ovario benigno", false, "Áreas sólidas e implantes orientan a maligno."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("onco", "Derivar a ginecología oncológica: citorreducción y quimioterapia con platino y taxano", "clave", "Dejar el menor tumor residual mejora la sobrevida."),
      mg("genetica", "Estudio de BRCA y asesoramiento familiar", "clave", "Cambia el tratamiento (inhibidores de PARP) y la prevención familiar."),
      mg("paliativos", "Cuidados paliativos desde el inicio", "util", "Mejoran síntomas y calidad de vida."),
      mg("nutricion", "Soporte nutricional y drenaje de ascitis si molesta", "util", "Alivia síntomas."),
      mg("colon", "Tratamiento para colon irritable y control en 6 meses", "riesgoso", "Demora el diagnóstico."),
      mg("tamizaje", "Recomendar CA-125 de rutina a todas sus amigas", "innecesario", "No reduce la mortalidad en la población general."),
    ],
  },
  debrief: {
    diagnosis: "Carcinoma de ovario estadio avanzado con ascitis, carcinomatosis y derrame pleural, en mujer de 58 años con antecedentes familiares de cáncer de mama.",
    pathologies: [
      { name: "Cáncer de ovario", role: "principal", why: "Mayor mortalidad entre los tumores ginecológicos." },
      { name: "Ascitis y derrame", role: "asociada", why: "Diseminación." },
      { name: "Colon irritable, cirrosis, Krukenberg", role: "diferencial", why: "Otras causas." },
    ],
    reasoning: [
      "Causa: muchos serosos de alto grado nacen en la trompa, a veces con mutación BRCA.",
      "Mecanismo: exfoliación temprana hacia la cavidad peritoneal.",
      "Consecuencia: distensión, saciedad y diagnóstico en estadio avanzado.",
    ],
    epidemiology:
      "Es la causa ginecológica de muerte más frecuente después del cuello y la mama en muchos países. Cerca de 3 de cada 4 se diagnostican en estadio avanzado porque los síntomas son vagos y no hay tamizaje eficaz. Los anticonceptivos y las ligaduras reducen el riesgo.",
    management: [
      "Sospechar ante síntomas persistentes.",
      "Ecografía, CA-125 y TC.",
      "Cirugía citorreductora y quimioterapia.",
      "Estudio genético a todas.",
    ],
    sources: ["Instituto Nacional del Cáncer — Cáncer de ovario.", "Sociedad Argentina de Ginecología Oncológica — Recomendaciones."],
    pearls: ["Distensión persistente después de los 50: examiná la pelvis.", "Ecografía antes de “colon irritable”.", "Toda paciente: BRCA."],
    pitfalls: ["Punzar una masa sospechosa.", "Usar CA-125 como tamizaje."],
    tribunal: [
      qa("¿Qué es el síndrome de Meigs?", "Tumor benigno de ovario (fibroma), con ascitis y derrame pleural que se resuelven tras extirparlo."),
      qa("¿Qué es el tumor de Krukenberg?", "Metástasis ováricas bilaterales, generalmente de cáncer gástrico, con células en anillo de sello."),
      qa("¿Qué medidas reducen el riesgo en BRCA?", "Anexectomía bilateral profiláctica cuando se completó la paridad, y anticonceptivos."),
    ],
  },
};
