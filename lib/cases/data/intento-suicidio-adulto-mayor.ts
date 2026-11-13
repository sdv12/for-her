import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const intentoSuicidioAdultoMayor: ClinicalCase = {
  id: "intento-suicidio-adulta-mayor",
  level: 3,
  area: "Salud mental",
  setting: "Guardia",
  patient: { age: 76, ageUnit: "años", sex: "F", context: "Artrosis grave con dolor crónico. Toma amitriptilina para dormir. Vive sola desde que su hija se mudó a España." },
  frequency: "frecuente",
  intro: "La trae la vecina: “La encontré muy dormida, con la caja de pastillas vacía y una carta para la hija.”",
  vitals: { TA: "98/60 mmHg", FC: "122 lpm", FR: "16 rpm", "T°": "37,4 °C", "SatO₂": "95 %", Glasgow: "11/15" },
  anamnesis: [
    act("pastillas", "¿Qué pastillas eran y cuántas?", "clave", "“Amitriptilina, la caja de 30 estaba casi llena.”", "Tricíclico: muy tóxico."),
    act("carta", "¿Qué decía la carta?", "clave", "“Que la perdone, que no aguantaba más el dolor y la soledad.”", "Intención clara."),
    act("hora", "¿Cuándo pudo tomarlas?", "clave", "“Anoche, la vi a las 9.”", "Tiempo."),
    act("previos", "¿Habló antes de matarse?", "util", "“Decía que estaba cansada de vivir.”", "Señales previas."),
    act("otros", "¿Otras pastillas o alcohol?", "util", "“Ibuprofeno.”", "Coingesta."),
    act("hija", "¿Avisaron a la hija?", "neutro", "“Todavía no.”", "No orienta."),
  ],
  exam: [
    act("anticolinergico", "Piel, pupilas y ruidos intestinales", "clave", "Piel seca y caliente, midriasis, ruidos disminuidos, globo vesical.", "Toxíndrome anticolinérgico."),
    act("neuro", "Conciencia", "clave", "Somnolienta, responde al dolor.", "Depresión del SNC."),
    act("dolor", "Rodillas", "util", "Artrosis avanzada.", "Dolor crónico."),
  ],
  studies: [
    study("Electrofisiología", "ecg", "ECG", "clave", "Taquicardia sinusal, QRS de 120 ms, R en aVR mayor de 3 mm.", "Cardiotoxicidad tricíclica."),
    study("Laboratorio", "lab", "Gases, ionograma, paracetamol, glucemia", "clave", "pH 7,34; paracetamol negativo.", "Acidosis empeora la toxicidad."),
    study("Otros", "monitor", "Monitoreo cardíaco continuo", "util", "Extrasístoles ventriculares.", "Arritmias."),
    study("Otros", "flumazenil", "Flumazenil empírico", "riesgoso", "No se indicó.", "Convulsiones en intoxicación por tricíclicos."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("intento-triciclicos", "Intento de suicidio por intoxicación grave con amitriptilina, con cardiotoxicidad, en adulta mayor con depresión y dolor crónico", true, "Carta de despedida, toxíndrome anticolinérgico, QRS ancho y R en aVR."),
      dx("accidental", "Intoxicación accidental por error de dosis", false, "Hay carta y caja casi completa."),
      dx("acv", "ACV", false, "Toxíndrome claro."),
      dx("sepsis", "Sepsis", false, "Cuadro tóxico."),
      dx("benzodiacepinas", "Intoxicación por benzodiacepinas", false, "Anticolinérgico y QRS ancho."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("bicarbonato", "Bicarbonato de sodio EV por QRS mayor de 100 ms", "clave", "Antídoto de la cardiotoxicidad."),
      mg("uti", "Terapia intensiva y vía aérea", "clave", "Deterioro posible."),
      mg("salud-mental", "Evaluación de salud mental y acompañamiento permanente", "clave", "Riesgo suicida alto."),
      mg("dolor", "Abordar el dolor crónico y la soledad en el plan", "util", "Factores de riesgo."),
      mg("fisostigmina", "Fisostigmina para el anticolinérgico", "riesgoso", "Asistolia en intoxicación por tricíclicos."),
      mg("sin-evaluacion", "Alta al recuperar la conciencia", "riesgoso", "Riesgo de repetir."),
    ],
  },
  debrief: {
    diagnosis: "Intento de suicidio por intoxicación grave con amitriptilina y cardiotoxicidad, en mujer de 76 años con depresión, dolor crónico y aislamiento.",
    pathologies: [
      { name: "Intento de suicidio en la vejez", role: "principal", why: "Alta letalidad." },
      { name: "Intoxicación por tricíclicos", role: "asociada", why: "Bloqueo de canales de sodio." },
      { name: "Intoxicación accidental, ACV", role: "diferencial", why: "Otras causas de coma." },
    ],
    reasoning: [
      "Causa: depresión no diagnosticada, dolor crónico y aislamiento.",
      "Mecanismo: la amitriptilina bloquea canales de sodio y receptores muscarínicos.",
      "Consecuencia: QRS ancho, arritmias, convulsiones y coma.",
    ],
    epidemiology:
      "Los adultos mayores tienen la tasa de suicidio consumado más alta, porque usan métodos más letales y lo planifican. El dolor crónico, la soledad y la viudez son factores de riesgo. Los tricíclicos que se indican para dormir o para el dolor son un medio frecuente.",
    management: [
      "Vía aérea y ECG.",
      "Bicarbonato.",
      "Salud mental.",
      "Factores de riesgo.",
    ],
    sources: ["Ley 27.130 de Prevención del Suicidio y Ministerio de Salud de la Nación — Lineamientos de atención.", "American College of Medical Toxicology — Tricyclic Antidepressant Toxicity."],
    pearls: ["Tricíclicos: mirá el QRS y aVR.", "Bicarbonato.", "En el anciano, el intento es muy letal."],
    pitfalls: ["Fisostigmina.", "Subestimar."],
    tribunal: [
      qa("¿Qué hallazgo del ECG predice convulsiones y arritmias?", "QRS mayor de 100 ms y onda R en aVR mayor de 3 mm."),
      qa("¿Por qué sirve el bicarbonato?", "La carga de sodio y la alcalinización revierten el bloqueo de canales de sodio."),
      qa("¿Qué cambiarías en la prescripción?", "Evitar tricíclicos en adultos mayores con riesgo y dar cantidades limitadas."),
    ],
  },
};
