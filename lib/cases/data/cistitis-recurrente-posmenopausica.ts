import { act, dx, mg, qa, study } from "../build";
import type { ClinicalCase } from "../types";

export const cistitisRecurrentePosmenopausica: ClinicalCase = {
  id: "cistitis-recurrente-posmenopausica",
  level: 2,
  area: "Nefrourología",
  setting: "Consultorio",
  patient: { age: 64, ageUnit: "años", sex: "F", context: "Menopausia a los 50. Cuatro cistitis este año. Sequedad vaginal." },
  frequency: "muy-frecuente",
  intro: "“Otra vez me arde al orinar y voy a cada rato. Ya es la cuarta vez este año.”",
  vitals: { TA: "128/78 mmHg", FC: "76 lpm", "T°": "36,6 °C", Glucemia: "98 mg/dl" },
  anamnesis: [
    act("frecuencia", "¿Cuántas al año? ¿Confirmadas con cultivo?", "clave", "“Cuatro, dos con cultivo.”", "Recurrente."),
    act("sequedad", "¿Sequedad vaginal o dolor en relaciones?", "clave", "“Sí.”", "Atrofia."),
    act("alarma", "¿Fiebre, dolor lumbar, sangre en la orina?", "clave", "“No.”", "Pielonefritis o tumor."),
    act("vaciamiento", "¿Vaciás bien? ¿Bulto vaginal?", "util", "“Sí, bien.”", "Prolapso."),
    act("diabetes", "¿Diabetes?", "util", "“No.”", "Riesgo."),
    act("hobby", "¿Qué hacés?", "neutro", "“Soy jubilada.”", "No orienta."),
  ],
  exam: [
    act("genital", "Examen genital", "clave", "Mucosa atrófica, sin prolapso.", "Factor."),
    act("lumbar", "Puño percusión", "clave", "Negativa.", "Sin pielonefritis."),
    act("abdomen", "Abdomen", "util", "Dolor suprapúbico.", "Cistitis."),
  ],
  studies: [
    study("Laboratorio", "urocultivo", "Urocultivo", "clave", "E. coli; resistente a TMS.", "Elección."),
    study("Otros", "residuo", "Residuo posmiccional", "util", "Bajo.", "Vaciamiento."),
    study("Imágenes", "eco", "Ecografía renal y vesical", "util", "Normal.", "Excluye anomalía."),
    study("Otros", "cistoscopia", "Cistoscopia de rutina sin hematuria", "innecesario", "No se realizó.", "Sin indicación."),
  ],
  diagnosis: {
    prompt: "¿Cuál es tu diagnóstico?",
    options: [
      dx("recurrente", "Cistitis recurrente por atrofia urogenital posmenopáusica", true, "Cuatro episodios al año, atrofia y cultivo positivo."),
      dx("pielo", "Pielonefritis", false, "Sin fiebre ni lumbar."),
      dx("cancer", "Cáncer de vejiga", false, "Sin hematuria; se evalúa si aparece."),
      dx("vejiga", "Vejiga hiperactiva", false, "Cultivo positivo."),
      dx("its", "ITS", false, "Atrofia y cultivo."),
    ],
  },
  management: {
    prompt: "¿Qué indicás?",
    options: [
      mg("atb", "Nitrofurantoína o fosfomicina según cultivo", "clave", "Episodio actual."),
      mg("estrogeno", "Estrógenos vaginales", "clave", "Reduce recurrencias."),
      mg("prevencion", "Hidratación y vaciamiento frecuente", "util", "Prevención."),
      mg("profilaxis", "Profilaxis antibiótica si persiste", "util", "Selectiva."),
      mg("quinolonas-siempre", "Ciprofloxacina en cada episodio", "riesgoso", "Resistencia y efectos."),
      mg("bacteriuria", "Tratar bacteriurias sin síntomas", "riesgoso", "Resistencia."),
    ],
  },
  debrief: {
    diagnosis: "Cistitis recurrente asociada a atrofia urogenital posmenopáusica, en mujer de 64 años.",
    pathologies: [
      { name: "Cistitis recurrente", role: "principal", why: "Infección repetida." },
      { name: "Atrofia urogenital", role: "asociada", why: "Factor." },
      { name: "Pielonefritis, cáncer de vejiga", role: "diferencial", why: "A excluir." },
    ],
    reasoning: [
      "Causa: falta de estrógenos.",
      "Mecanismo: pérdida de lactobacilos y aumento del pH vaginal.",
      "Consecuencia: colonización por E. coli y recurrencias.",
    ],
    epidemiology:
      "Es frecuente en mujeres posmenopáusicas. Los estrógenos vaginales reducen las recurrencias de forma importante y son seguros. Las quinolonas no son de primera línea por resistencia y efectos adversos.",
    management: [
      "Cultivo.",
      "Tratar.",
      "Estrógeno vaginal.",
      "Profilaxis selectiva.",
    ],
    sources: ["Sociedad Argentina de Infectología — Infección urinaria.", "European Association of Urology — Urological Infections Guidelines."],
    pearls: ["Estrógeno vaginal.", "Cultivo.", "No quinolonas de rutina."],
    pitfalls: ["Tratar bacteriuria.", "Ignorar atrofia."],
    tribunal: [
      qa("¿Qué define ITU recurrente?", "Dos o más en 6 meses o tres o más en un año."),
      qa("¿Qué es el síndrome genitourinario de la menopausia?", "Sequedad, dispareunia y síntomas urinarios por déficit de estrógenos."),
      qa("¿Cuándo se estudia una hematuria?", "Si persiste fuera de la infección, sobre todo en mayores o fumadores."),
    ],
  },
};
