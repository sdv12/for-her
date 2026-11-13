import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const acvLacunar: ClinicalCase = {
  id: "acv-lacunar",
  level: 2,
  area: "Neurología",
  setting: "Guardia",
  patient: { age: 66, ageUnit: "años", sex: "M", context: "Hipertenso hace 20 años, abandonó la medicación. Diabético." },
  frequency: "frecuente",
  intro: "“Me desperté bien, y a las 9 se me empezó a aflojar el brazo y la pierna derecha. Puedo hablar y entiendo todo.”",
  vitals: { TA: "186/102 mmHg", FC: "78 lpm", FR: "16 rpm", "T°": "36,4 °C", "SatO₂": "97 %", Glucemia: "164 mg/dl" },
  anamnesis: [
    act("hora", "¿A qué hora lo vieron bien por última vez?", "clave", "“A las 9 menos cuarto, desayunando.”", "Ventana terapéutica."),
    act("sintomas", "¿Le cuesta hablar, ver o tragar?", "clave", "“No, solo la debilidad.”", "Sin signos corticales."),
    act("anticoagulantes", "¿Toma anticoagulantes? ¿Cirugías o sangrados recientes?", "clave", "“No.”", "Contraindicaciones de trombólisis."),
    act("palpitaciones", "¿Palpitaciones o arritmias?", "util", "“No.”", "Embolia."),
    act("previos", "¿Tuvo episodios previos?", "util", "“No.”", "AIT."),
    act("trabajo", "¿Trabaja?", "neutro", "“Soy portero de un edificio.”", "No orienta."),
  ],
  exam: [
    act("motor", "Fuerza y sensibilidad", "clave", "Hemiparesia derecha proporcionada (cara, brazo y pierna) sin déficit sensitivo.", "Síndrome motor puro."),
    act("cortical", "Lenguaje, campo visual y negligencia", "clave", "Normales.", "Sin signos corticales: lacunar."),
    act("nihss", "NIHSS", "util", "6 puntos.", "Gravedad moderada."),
  ],
  studies: [
    study("Imágenes", "tc", "TC de cerebro sin contraste urgente", "clave", "Sin hemorragia; leucoaraiosis periventricular.", "Permite trombolisis."),
    study("Laboratorio", "lab", "Glucemia, plaquetas, coagulograma", "clave", "Normales.", "Requisitos."),
    study("Electrofisiología", "ecg", "ECG", "util", "Sinusal, hipertrofia ventricular izquierda.", "Daño hipertensivo."),
    study("Imágenes", "rm-espera", "Esperar RM para decidir la trombólisis", "riesgoso", "No se esperó.", "Pierde tiempo; la TC alcanza."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("lacunar", "ACV isquémico lacunar (síndrome motor puro) en ventana", true, "Hemiparesia proporcionada sin signos corticales, hipertenso y diabético, TC sin sangrado."),
      dx("hemorragia", "Hemorragia intraparenquimatosa", false, "TC sin sangre."),
      dx("cardioembolico", "ACV cardioembólico cortical", false, "Sin signos corticales ni FA."),
      dx("todd", "Parálisis de Todd", false, "Sin convulsión."),
      dx("hipoglucemia", "Hipoglucemia", false, "Glucemia alta."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("trombolisis", "Trombólisis EV bajando antes la TA a menos de 185/110", "clave", "Dentro de las 4,5 horas."),
      mg("unidad", "Unidad de ACV con monitoreo neurológico", "clave", "Mejora el pronóstico."),
      mg("prevencion", "Prevención secundaria: antiagregación a las 24 horas, estatina y control de la presión", "clave", "Riesgo de recurrencia."),
      mg("deglucion", "Evaluar deglución antes de dar comida", "util", "Aspiración."),
      mg("bajar-mucho", "Bajar la presión a 120/80 en la primera hora sin trombolisis", "riesgoso", "Reduce la perfusión de la penumbra."),
      mg("aspirina-antes", "Aspirina antes de la trombólisis", "riesgoso", "Aumenta el sangrado."),
    ],
  },
  debrief: {
    diagnosis: "ACV isquémico lacunar con síndrome motor puro derecho, en ventana para trombólisis, en varón hipertenso y diabético de 66 años.",
    pathologies: [
      { name: "ACV lacunar", role: "principal", why: "Oclusión de una arteria perforante." },
      { name: "Hipertensión no tratada y diabetes", role: "asociada", why: "Lipohialinosis de pequeños vasos." },
      { name: "Hemorragia, ACV cardioembólico", role: "diferencial", why: "Otros subtipos." },
    ],
    reasoning: [
      "Causa: enfermedad de pequeño vaso por hipertensión y diabetes.",
      "Mecanismo: oclusión de una arteria perforante hacia la cápsula interna.",
      "Consecuencia: hemiparesia proporcionada sin compromiso cortical.",
    ],
    epidemiology:
      "Los infartos lacunares son alrededor de un cuarto de los ACV isquémicos. La hipertensión no controlada es el factor principal. Aunque son pequeños, también se trombolisan si están en ventana.",
    management: [
      "Hora de inicio.",
      "TC.",
      "Trombólisis.",
      "Prevención secundaria.",
    ],
    sources: ["Sociedad Neurológica Argentina — Guía de ACV isquémico agudo.", "AHA/ASA — Guidelines for the Early Management of Acute Ischemic Stroke."],
    pearls: ["Sin signos corticales: lacunar.", "También se trombolisa.", "La hipertensión es la causa."],
    pitfalls: ["Esperar RM.", "Bajar la presión de golpe."],
    tribunal: [
      qa("¿Cuáles son los síndromes lacunares clásicos?", "Motor puro, sensitivo puro, sensitivo-motor, hemiparesia atáxica y disartria-mano torpe."),
      qa("¿Qué presión se tolera en el ACV no trombolisado?", "Hasta 220/120 en las primeras 24 horas."),
      qa("¿Qué es la leucoaraiosis?", "Hipodensidad de la sustancia blanca por enfermedad de pequeño vaso."),
    ],
  },
};
