import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const bulimiaNerviosa: ClinicalCase = {
  id: "bulimia-nerviosa",
  level: 2,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 20, ageUnit: "años", sex: "F", context: "Estudia Nutrición. Viene porque se desmayó en la facultad." },
  frequency: "frecuente",
  intro: "“Me mareé y me caí. Vengo cansada, con palpitaciones y me hinchan las mejillas. No me pasa nada grave.”",
  vitals: { TA: "96/60 mmHg", FC: "108 lpm", "T°": "36,4 °C", "SatO₂": "99 %", Peso: "59 kg", Glucemia: "88 mg/dl" },
  anamnesis: [
    act("atracones", "¿Hay momentos en que comés sin poder parar?", "clave", "“Tres o cuatro veces por semana.”", "Atracones."),
    act("compensa", "¿Qué hacés después? ¿Vomitás, laxantes, ejercicio?", "clave", "“Vomito, y tomo diuréticos.”", "Compensación."),
    act("riesgo", "¿Te lastimás o pensaste en morir?", "clave", "“A veces pensé que sería mejor no estar.”", "Riesgo suicida: preguntar siempre."),
    act("imagen", "¿Cómo te ves? ¿Influye en cómo te sentís?", "util", "“Si engordo no valgo nada.”", "Autoimagen."),
    act("menstruacion", "¿Menstruás regularmente?", "util", "“Más o menos.”", "Compromiso."),
    act("cursada", "¿Cuántas materias cursás?", "neutro", "“Tres.”", "No orienta."),
  ],
  exam: [
    act("boca", "Boca y mejillas", "clave", "Parótidas aumentadas, erosión dental.", "Vómitos repetidos."),
    act("manos", "Manos", "clave", "Callosidades en nudillos (signo de Russell).", "Inducción de vómito."),
    act("peso", "IMC y signos vitales ortostáticos", "util", "IMC 22; taquicardia al pararse.", "Peso normal no descarta."),
  ],
  studies: [
    study("Laboratorio", "iono", "Ionograma, magnesio, fósforo, gases", "clave", "K 2,7; alcalosis metabólica; Mg bajo.", "Potencialmente mortal."),
    study("Electrofisiología", "ecg", "ECG", "clave", "QT prolongado, ondas U.", "Arritmias."),
    study("Laboratorio", "lab", "Amilasa, función renal, beta-hCG, TSH", "clave", "Amilasa salival alta; beta-hCG negativa.", "Compromiso."),
    study("Imágenes", "tc-cerebro", "TC de cerebro por síncope sin signos neurológicos", "innecesario", "No se realizó.", "El síncope se explica."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("bulimia", "Bulimia nerviosa con hipopotasemia grave", true, "Atracones con purgas, IMC normal, signo de Russell e hipopotasemia con alcalosis."),
      dx("anorexia", "Anorexia nerviosa", false, "Requiere peso bajo."),
      dx("atracon", "Trastorno por atracón", false, "No hay conductas compensatorias."),
      dx("hiperaldo", "Hiperaldosteronismo", false, "No hay HTA y los vómitos explican."),
      dx("arritmia", "Síncope por arritmia primaria", false, "Hay causa electrolítica clara."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("reponer", "Internar, corregir potasio y magnesio con monitor", "clave", "Riesgo de arritmias."),
      mg("salud-mental", "Evaluación por salud mental y plan de seguridad", "clave", "Hay ideación."),
      mg("tcc", "Terapia cognitivo-conductual y equipo interdisciplinario", "clave", "Primera línea."),
      mg("fluoxetina", "Fluoxetina", "util", "Aprobada para bulimia."),
      mg("bupropion", "Bupropión", "riesgoso", "Contraindicado: riesgo de convulsiones."),
      mg("dieta", "Dieta para bajar de peso", "riesgoso", "Perpetúa el ciclo."),
    ],
  },
  debrief: {
    diagnosis: "Bulimia nerviosa con hipopotasemia grave, alcalosis y QT prolongado, con ideación suicida, en mujer de 20 años.",
    pathologies: [
      { name: "Bulimia nerviosa", role: "principal", why: "Trastorno de la conducta alimentaria." },
      { name: "Hipopotasemia, riesgo suicida", role: "asociada", why: "Complicaciones." },
      { name: "Anorexia, atracones", role: "diferencial", why: "Otros trastornos." },
    ],
    reasoning: [
      "Causa: factores biológicos, psicológicos y culturales.",
      "Mecanismo: restricción, atracón y purga en un ciclo.",
      "Consecuencia: pérdidas, alcalosis, arritmias, erosión.",
    ],
    epidemiology:
      "Afecta a alrededor del 1 % de las mujeres jóvenes, con mucho subdiagnóstico, porque el peso suele ser normal. Se asocia a depresión, consumo de sustancias e intentos de suicidio. La Ley 26.396 incluye estos trastornos en la cobertura obligatoria.",
    management: [
      "Preguntar.",
      "Labs y ECG.",
      "Corregir.",
      "Tratamiento interdisciplinario.",
    ],
    sources: ["Ministerio de Salud de la Nación — Trastornos de la conducta alimentaria.", "American Psychiatric Association — Eating Disorders Guideline."],
    pearls: ["Peso normal no excluye bulimia.", "Signo de Russell.", "Bupropión contraindicado."],
    pitfalls: ["No preguntar por purgas.", "No evaluar suicidio."],
    tribunal: [
      qa("¿Qué trastorno ácido-base da el vómito?", "Alcalosis metabólica hipoclorémica con hipopotasemia."),
      qa("¿Cuáles son los criterios de bulimia?", "Atracones y compensación al menos una vez por semana por 3 meses, con autoevaluación influida por el peso."),
      qa("¿Qué es el síndrome de realimentación?", "Fósforo, potasio y magnesio caen al reiniciar la ingesta tras desnutrición grave."),
    ],
  },
};
