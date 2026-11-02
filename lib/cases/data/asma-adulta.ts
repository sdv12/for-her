import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const asmaAdulta: ClinicalCase = {
  id: "crisis-asmatica-adulta-grave",
  level: 2,
  area: "Respiratorio",
  setting: "Guardia",
  patient: { age: 34, ageUnit: "años", sex: "F", context: "Asmática desde la infancia. Usa solo salbutamol “cuando lo necesita”. Tomó ibuprofeno por un dolor de muelas." },
  frequency: "frecuente",
  intro: "“No puedo respirar... el aerosol no me hace nada... me hice diez puffs.” Habla con frases cortadas.",
  vitals: { TA: "138/84 mmHg", FC: "124 lpm", FR: "30 rpm", "T°": "36,8 °C", "SatO₂": "90 %" },
  anamnesis: [
    act("salbutamol", "¿Cuánto salbutamol usaste estos días?", "clave", "“Un aerosol entero en la semana.”", "Uso creciente de salbutamol: asma no controlada y riesgo de crisis grave."),
    act("controlador", "¿Usás algún inhalador todos los días?", "clave", "“No, me dijeron que use uno con corticoide pero lo dejé.”", "Sin corticoide inhalado: principal factor de riesgo de crisis y muerte por asma."),
    act("aine", "¿Tomaste algo nuevo? ¿Te pasó antes con aspirina o ibuprofeno?", "clave", "“Ibuprofeno ayer. Una vez con aspirina me pasó algo parecido.”", "Asma exacerbada por AINE (enfermedad respiratoria exacerbada por aspirina)."),
    act("internaciones", "¿Estuviste internada o intubada por asma?", "clave", "“Una vez en terapia hace dos años.”", "Antecedente de crisis casi fatal: riesgo alto."),
    act("nariz", "¿Tenés pólipos o la nariz tapada siempre?", "util", "“Sí, me operaron de pólipos.”", "Pólipos nasales + asma + intolerancia a AINE: tríada de Samter."),
    act("perro", "¿Tenés mascotas?", "neutro", "“Un perro.”", "No explica esta crisis."),
  ],
  exam: [
    act("habla", "Capacidad de hablar y posición", "clave", "Habla con palabras sueltas, sentada inclinada hacia delante.", "Signo de crisis grave."),
    act("musculos", "Uso de músculos accesorios", "clave", "Tiraje supraclavicular e intercostal.", "Trabajo respiratorio aumentado."),
    act("auscultacion", "Auscultación", "clave", "Sibilancias espiratorias e inspiratorias difusas, con murmullo disminuido.", "Un tórax silencioso sería aún más grave."),
    act("conciencia", "Estado de conciencia", "util", "Ansiosa, lúcida.", "Somnolencia indicaría agotamiento y riesgo de paro."),
  ],
  studies: [
    study("Otros", "pef", "Flujo pico (si puede)", "clave", "35 % del mejor personal.", "Menos del 50 %: crisis grave."),
    study("Laboratorio", "gases", "Gases arteriales", "clave", "pH 7,40, pCO₂ 42, pO₂ 58.", "Una pCO₂ normal en una crisis grave indica agotamiento inminente (debería estar baja)."),
    study("Imágenes", "rx", "Radiografía de tórax", "util", "Hiperinsuflación, sin neumotórax ni neumonía.", "Descarta complicaciones."),
    study("Laboratorio", "ige", "IgE y prick test", "innecesario", "No se realizó.", "No sirven en la urgencia."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("crisis-grave", "Crisis asmática grave con riesgo vital, desencadenada por AINE, en asma no controlada", true, "Habla con palabras, saturación 90 %, flujo pico de 35 %, pCO₂ normalizada, sin controlador y con internación previa en terapia."),
      dx("crisis-leve", "Crisis asmática leve", false, "Hay signos de gravedad."),
      dx("anafilaxia", "Anafilaxia", false, "No hay urticaria, hipotensión ni otro sistema afectado."),
      dx("epoc", "Exacerbación de EPOC", false, "Asmática desde la infancia y no fumadora."),
      dx("neumotorax", "Neumotórax", false, "Sibilancias difusas y la radiografía no lo muestra."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("o2", "Oxígeno para saturación de 93–95 %", "clave", "Corrige la hipoxemia."),
      mg("broncodilatadores", "Salbutamol más bromuro de ipratropio nebulizados o con aerocámara, repetidos en la primera hora", "clave", "Broncodilatación rápida."),
      mg("corticoide", "Corticoide sistémico precoz (prednisona VO o hidrocortisona EV)", "clave", "Reduce la inflamación, las recaídas y la internación."),
      mg("magnesio", "Sulfato de magnesio EV", "util", "En crisis graves que no responden."),
      mg("uti", "Evaluación por terapia intensiva por pCO₂ normal y antecedente casi fatal", "clave", "Riesgo de falla respiratoria."),
      mg("sedantes", "Sedantes para calmar la ansiedad", "riesgoso", "Deprimen el centro respiratorio."),
    ],
  },
  debrief: {
    diagnosis: "Crisis asmática grave con riesgo vital, desencadenada por ibuprofeno, en mujer de 34 años con asma no controlada sin corticoide inhalado y enfermedad respiratoria exacerbada por aspirina.",
    pathologies: [
      { name: "Crisis asmática grave", role: "principal", why: "Obstrucción grave con hipoxemia y pCO₂ normalizada." },
      { name: "Enfermedad respiratoria exacerbada por AINE", role: "asociada", why: "Asma, pólipos nasales e intolerancia a AINE." },
      { name: "Anafilaxia, EPOC, neumotórax", role: "diferencial", why: "Otras causas de disnea aguda." },
    ],
    reasoning: [
      "Causa: inflamación bronquial no controlada (sin corticoide inhalado) y un desencadenante (AINE).",
      "Mecanismo: los AINE bloquean la COX-1 y desvían el metabolismo hacia leucotrienos, que contraen el músculo bronquial; se suman edema y moco.",
      "Consecuencia: obstrucción grave, atrapamiento aéreo, hipoxemia, agotamiento muscular e hipercapnia.",
    ],
    epidemiology:
      "El asma afecta a alrededor del 6 % de los adultos en Argentina. La mayoría de las muertes por asma son evitables y se asocian a falta de corticoide inhalado, sobreuso de salbutamol e internaciones previas. Alrededor del 7 % de los asmáticos adultos tiene empeoramiento con AINE.",
    management: [
      "Evaluar gravedad: habla, conciencia, saturación, flujo pico, gases.",
      "Oxígeno, broncodilatadores y corticoide sistémico precoz.",
      "Magnesio y terapia intensiva en crisis graves.",
      "Al alta: corticoide inhalado siempre, plan de acción y evitar AINE.",
    ],
    sources: ["Asociación Argentina de Medicina Respiratoria — Guía de asma.", "GINA — Estrategia global para el asma."],
    pearls: ["pCO₂ normal en crisis grave = agotamiento.", "Nunca asma solo con salbutamol.", "Asmática + pólipos + AINE = Samter."],
    pitfalls: ["Sedar a la paciente.", "Dar el alta sin corticoide inhalado."],
    tribunal: [
      qa("¿Por qué ya no se recomienda tratar el asma solo con salbutamol?", "Porque no trata la inflamación y su uso solo se asocia a más crisis graves y muertes; GINA recomienda que todo adulto con asma reciba corticoide inhalado, por ejemplo budesonida-formoterol a demanda o de mantenimiento."),
      qa("¿Qué signos indican crisis asmática con riesgo vital?", "Tórax silencioso, cianosis, esfuerzo respiratorio débil, bradicardia, hipotensión, confusión o coma, agotamiento, saturación menor de 92 %, flujo pico menor de 33 % y pCO₂ normal o alta."),
      qa("¿Qué es la tríada de Samter?", "Asma, poliposis nasal con rinosinusitis crónica e intolerancia a la aspirina y otros AINE inhibidores de la COX-1; hoy se llama enfermedad respiratoria exacerbada por AINE."),
    ],
  },
};
