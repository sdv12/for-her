import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const deshidratacionAdultaMayor: ClinicalCase = {
  id: "gastroenteritis-deshidratacion-adulta-mayor",
  level: 2,
  area: "Gastroenterología",
  setting: "Guardia",
  patient: { age: 86, ageUnit: "años", sex: "F", context: "Vive en un geriátrico donde hay varios casos de diarrea. Toma enalapril, furosemida y metformina." },
  frequency: "frecuente",
  intro: "“Desde hace dos días tiene vómitos y diarrea, casi no come ni toma agua y hoy está muy dormida y se mareó al pararse.” (relata la enfermera)",
  vitals: { TA: "88/52 mmHg", FC: "112 lpm", FR: "20 rpm", "T°": "37,4 °C", "SatO₂": "96 %", Glucemia: "112 mg/dl" },
  anamnesis: [
    act("diarrea", "¿Cuántas deposiciones por día? ¿Tienen sangre o moco?", "clave", "“Seis o siete acuosas, sin sangre.”", "Diarrea acuosa: probable viral (norovirus en brotes institucionales)."),
    act("brote", "¿Hay otros residentes o personal con lo mismo?", "clave", "“Cinco residentes y dos enfermeras.”", "Brote: medidas de control y notificación."),
    act("farmacos", "¿Siguió tomando la medicación?", "clave", "“Sí, todo igual.”", "Diuréticos, IECA y metformina empeoran la deshidratación, la función renal y el riesgo de acidosis láctica."),
    act("atb", "¿Tomó antibióticos recientemente?", "util", "“No.”", "Descarta Clostridioides difficile."),
    act("orina", "¿Cuándo orinó por última vez?", "util", "“Esta mañana, muy poco.”", "Oliguria: compromiso renal."),
    act("radio", "¿Qué programa de radio escucha?", "neutro", "“Uno de tangos.”", "No orienta."),
  ],
  exam: [
    act("hidratacion", "Signos de deshidratación (mucosas, axilas, ortostatismo)", "clave", "Lengua seca, axilas secas, hipotensión.", "En adultos mayores el signo del pliegue no es confiable; las mucosas y axilas secas sí orientan."),
    act("conciencia", "Estado de conciencia", "clave", "Somnolienta, desorientada.", "Delirium por deshidratación."),
    act("abdomen", "Abdomen", "util", "Blando, ruidos aumentados, sin defensa.", "Descarta abdomen agudo."),
  ],
  studies: [
    study("Laboratorio", "lab", "Ionograma, urea, creatinina, gases, lactato, glucemia", "clave", "Na 148, K 3,0, urea 110, creatinina 2,1 (basal 0,9), bicarbonato 18.", "Hipernatremia, hipopotasemia, insuficiencia renal aguda prerrenal y acidosis."),
    study("Microbiología", "heces", "Estudio de heces (PCR viral, coprocultivo) por el brote", "util", "Norovirus positivo.", "Confirma la causa del brote."),
    study("Electrofisiología", "ecg", "Electrocardiograma", "util", "Taquicardia sinusal, ondas U.", "Hipopotasemia."),
    study("Imágenes", "tc", "Tomografía de abdomen", "innecesario", "No se realizó.", "Sin signos de abdomen agudo."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("gea", "Gastroenteritis aguda por norovirus con deshidratación grave, insuficiencia renal aguda prerrenal, hipernatremia, hipopotasemia y delirium", true, "Diarrea acuosa y vómitos en un brote institucional, con hipotensión, mucosas secas, delirium, creatinina que se duplicó y alteraciones electrolíticas, agravado por diuréticos e IECA."),
      dx("cdiff", "Colitis por Clostridioides difficile", false, "Sin antibióticos recientes y con norovirus positivo."),
      dx("isquemia", "Isquemia mesentérica", false, "Abdomen blando, sin dolor desproporcionado; brote con otros casos."),
      dx("sepsis", "Sepsis de otro foco", false, "El cuadro se explica por pérdidas digestivas."),
      dx("acv", "ACV", false, "Sin foco; el delirium se explica por la deshidratación."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("fluidos", "Hidratación EV con cristaloides, reponiendo potasio y corrigiendo el sodio en forma gradual", "clave", "Restaura la volemia y la función renal."),
      mg("suspender", "Suspender transitoriamente furosemida, enalapril y metformina", "clave", "Empeoran la volemia, la función renal y el riesgo de acidosis."),
      mg("aislamiento", "Precauciones de contacto, lavado de manos con agua y jabón y notificar el brote", "clave", "El norovirus es muy contagioso y resiste el alcohol en gel."),
      mg("delirium", "Medidas no farmacológicas para el delirium y control de diuresis", "util", "Previene complicaciones."),
      mg("loperamida", "Loperamida en dosis altas", "innecesario", "No trata la causa y puede causar íleo en adultos mayores."),
      mg("antibiotico", "Ciprofloxacina empírica", "innecesario", "Es viral."),
    ],
  },
  debrief: {
    diagnosis: "Gastroenteritis aguda por norovirus en un brote institucional, con deshidratación grave, insuficiencia renal aguda prerrenal, hipernatremia, hipopotasemia, acidosis y delirium, agravada por diuréticos, IECA y metformina, en mujer de 86 años.",
    pathologies: [
      { name: "Gastroenteritis aguda por norovirus", role: "principal", why: "Diarrea acuosa en brote con PCR positiva." },
      { name: "Insuficiencia renal aguda prerrenal y trastornos electrolíticos", role: "asociada", why: "Por las pérdidas y los fármacos." },
      { name: "C. difficile, isquemia mesentérica", role: "diferencial", why: "Otras causas de diarrea grave en adultos mayores." },
    ],
    reasoning: [
      "Causa: norovirus, muy contagioso, que se propaga en instituciones.",
      "Mecanismo: pérdidas de agua y electrolitos por vómitos y diarrea, con menor sensación de sed en la vejez y fármacos que impiden compensar (diuréticos, IECA).",
      "Consecuencia: hipovolemia, insuficiencia renal, alteraciones del sodio y potasio, delirium y caídas.",
    ],
    epidemiology:
      "Los adultos mayores tienen más riesgo de deshidratación grave por diarrea: menos sed, menos agua corporal, dependencia para tomar líquidos y polifarmacia. El norovirus es la principal causa de brotes de gastroenteritis en geriátricos, hospitales y cruceros.",
    management: [
      "Evaluar la volemia, la función renal y los electrolitos.",
      "Hidratación oral si es posible; EV si hay deshidratación grave o intolerancia.",
      "Revisar y suspender fármacos de riesgo (sick day rules).",
      "Control del brote: aislamiento, higiene de manos con agua y jabón, limpieza con lavandina.",
    ],
    sources: ["Ministerio de Salud de la Nación — Vigilancia de diarreas y brotes de enfermedades transmitidas por alimentos.", "Sociedad Argentina de Gerontología y Geriatría — Recomendaciones sobre deshidratación en adultos mayores."],
    pearls: ["Adulto mayor con diarrea = revisar diuréticos, IECA y metformina.", "Norovirus: agua y jabón, no alcohol.", "Delirium puede ser lo único."],
    pitfalls: ["Confiar en el signo del pliegue.", "Seguir con los diuréticos."],
    tribunal: [
      qa("¿Qué son las “reglas del día enfermo” (sick day rules)?", "Indicaciones para suspender transitoriamente fármacos de riesgo cuando hay vómitos, diarrea o fiebre con poca ingesta: IECA, ARA II, diuréticos, metformina, AINE e iSGLT2, y reanudarlos al recuperar la ingesta."),
      qa("¿Cómo se diferencia la insuficiencia renal prerrenal de la necrosis tubular aguda?", "En la prerrenal la orina está concentrada, el sodio urinario es menor de 20 mEq/l, la fracción excretada de sodio es menor de 1 % y la relación urea/creatinina está aumentada; en la necrosis tubular el sodio urinario es mayor de 40, la fracción excretada mayor de 2 % y hay cilindros granulosos."),
      qa("¿Por qué los adultos mayores se deshidratan más?", "Por menor sensación de sed, menor agua corporal total, menor capacidad renal de concentrar la orina, dependencia funcional o cognitiva para acceder a líquidos y fármacos como diuréticos y laxantes."),
    ],
  },
};
